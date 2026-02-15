-- 共鸣（点赞）记录表迁移脚本
-- 请在 Supabase SQL Editor 中执行此脚本

-- 共鸣记录表：记录用户对帖子的点赞状态
CREATE TABLE IF NOT EXISTS public.post_resonances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_post_resonances_post_id ON public.post_resonances(post_id);
CREATE INDEX IF NOT EXISTS idx_post_resonances_user_id ON public.post_resonances(user_id);

-- 启用行级安全策略
ALTER TABLE public.post_resonances ENABLE ROW LEVEL SECURITY;

-- post_resonances 表策略
CREATE POLICY "post_resonances_select_policy" ON public.post_resonances
  FOR SELECT USING (true);

CREATE POLICY "post_resonances_insert_policy" ON public.post_resonances
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "post_resonances_delete_policy" ON public.post_resonances
  FOR DELETE USING (auth.uid() = user_id);

-- 创建更新帖子共鸣计数的函数
CREATE OR REPLACE FUNCTION public.update_post_resonance_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.posts SET resonance_count = resonance_count + 1 WHERE id = NEW.post_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.posts SET resonance_count = GREATEST(resonance_count - 1, 0) WHERE id = OLD.post_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- 创建触发器
DROP TRIGGER IF EXISTS on_resonance_change ON public.post_resonances;
CREATE TRIGGER on_resonance_change
  AFTER INSERT OR DELETE ON public.post_resonances
  FOR EACH ROW EXECUTE FUNCTION public.update_post_resonance_count();
