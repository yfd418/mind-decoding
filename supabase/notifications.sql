-- 通知系统增量迁移脚本
-- 请在 Supabase SQL Editor 中执行此脚本

-- 通知表
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('comment', 'resonance', 'system')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  data JSONB,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 用户通知设置表
CREATE TABLE IF NOT EXISTS public.notification_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  comment_notify BOOLEAN DEFAULT TRUE,
  resonance_notify BOOLEAN DEFAULT TRUE,
  system_notify BOOLEAN DEFAULT TRUE,
  email_notify BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON public.notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notification_settings_user_id ON public.notification_settings(user_id);

-- 启用行级安全策略
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_settings ENABLE ROW LEVEL SECURITY;

-- notifications 表策略
CREATE POLICY "notifications_select_policy" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "notifications_insert_policy" ON public.notifications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "notifications_update_policy" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "notifications_delete_policy" ON public.notifications
  FOR DELETE USING (auth.uid() = user_id);

-- notification_settings 表策略
CREATE POLICY "notification_settings_select_policy" ON public.notification_settings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "notification_settings_insert_policy" ON public.notification_settings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "notification_settings_update_policy" ON public.notification_settings
  FOR UPDATE USING (auth.uid() = user_id);

-- 创建评论通知触发器函数
CREATE OR REPLACE FUNCTION public.create_comment_notification()
RETURNS TRIGGER AS $$
DECLARE
  post_author_id UUID;
  post_title TEXT;
  author_forest_name TEXT;
BEGIN
  SELECT p.author_id, p.title INTO post_author_id, post_title
  FROM public.posts p
  WHERE p.id = NEW.post_id;
  
  SELECT pr.forest_name INTO author_forest_name
  FROM public.profiles pr
  WHERE pr.id = NEW.author_id;
  
  IF post_author_id IS NOT NULL AND post_author_id != NEW.author_id THEN
    INSERT INTO public.notifications (user_id, type, title, content, data)
    VALUES (
      post_author_id,
      'comment',
      '收到新评论',
      author_forest_name || ' 评论了你的帖子：' || COALESCE(NEW.content, '')::TEXT,
      jsonb_build_object(
        'post_id', NEW.post_id,
        'comment_id', NEW.id,
        'author_name', author_forest_name,
        'post_title', post_title
      )
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 创建评论通知触发器
DROP TRIGGER IF EXISTS on_comment_created ON public.comments;
CREATE TRIGGER on_comment_created
  AFTER INSERT ON public.comments
  FOR EACH ROW EXECUTE FUNCTION public.create_comment_notification();

-- 为现有用户创建默认通知设置
INSERT INTO public.notification_settings (user_id, comment_notify, resonance_notify, system_notify, email_notify)
SELECT id, TRUE, TRUE, TRUE, FALSE
FROM public.profiles
WHERE id NOT IN (SELECT user_id FROM public.notification_settings)
ON CONFLICT (user_id) DO NOTHING;
