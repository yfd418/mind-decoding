-- 评论共鸣记录表迁移脚本
-- 请在 Supabase SQL Editor 中执行此脚本

-- 评论共鸣记录表
CREATE TABLE IF NOT EXISTS public.comment_resonances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  comment_id UUID NOT NULL REFERENCES public.comments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(comment_id, user_id)
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_comment_resonances_comment_id ON public.comment_resonances(comment_id);
CREATE INDEX IF NOT EXISTS idx_comment_resonances_user_id ON public.comment_resonances(user_id);

-- 启用行级安全策略
ALTER TABLE public.comment_resonances ENABLE ROW LEVEL SECURITY;

-- comment_resonances 表策略
CREATE POLICY "comment_resonances_select_policy" ON public.comment_resonances
  FOR SELECT USING (true);

CREATE POLICY "comment_resonances_insert_policy" ON public.comment_resonances
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "comment_resonances_delete_policy" ON public.comment_resonances
  FOR DELETE USING (auth.uid() = user_id);

-- 创建更新评论共鸣计数的函数
CREATE OR REPLACE FUNCTION public.update_comment_resonance_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.comments SET resonance_count = resonance_count + 1 WHERE id = NEW.comment_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.comments SET resonance_count = GREATEST(resonance_count - 1, 0) WHERE id = OLD.comment_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- 创建触发器
DROP TRIGGER IF EXISTS on_comment_resonance_change ON public.comment_resonances;
CREATE TRIGGER on_comment_resonance_change
  AFTER INSERT OR DELETE ON public.comment_resonances
  FOR EACH ROW EXECUTE FUNCTION public.update_comment_resonance_count();
