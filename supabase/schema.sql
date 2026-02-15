-- 心理解码数据库表结构
-- 请在 Supabase SQL Editor 中执行此脚本

-- 启用 UUID 扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 先删除已存在的表（注意顺序：先删子表，再删父表）
DROP TRIGGER IF EXISTS on_comment_change ON public.comments;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.update_post_comment_count();
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP TABLE IF EXISTS public.comments CASCADE;
DROP TABLE IF EXISTS public.posts CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- 用户资料表
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  forest_name TEXT NOT NULL UNIQUE,
  avatar TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  agreed_to_terms BOOLEAN DEFAULT FALSE
);

-- 帖子表
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  zone TEXT NOT NULL CHECK (zone IN ('recognition', 'practice', 'recovery', 'emotion')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  resonance_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  is_resolved BOOLEAN DEFAULT FALSE,
  needs_decoding BOOLEAN DEFAULT FALSE,
  tags TEXT[]
);

-- 评论表
CREATE TABLE public.comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resonance_count INTEGER DEFAULT 0,
  is_author_reply BOOLEAN DEFAULT FALSE
);

-- 创建索引以提高查询性能
CREATE INDEX idx_posts_author_id ON public.posts(author_id);
CREATE INDEX idx_posts_zone ON public.posts(zone);
CREATE INDEX idx_posts_created_at ON public.posts(created_at DESC);
CREATE INDEX idx_comments_post_id ON public.comments(post_id);
CREATE INDEX idx_comments_author_id ON public.comments(author_id);

-- 启用行级安全策略 (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- profiles 表策略
CREATE POLICY "profiles_select_policy" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "profiles_insert_policy" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_policy" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- posts 表策略
CREATE POLICY "posts_select_policy" ON public.posts
  FOR SELECT USING (true);

CREATE POLICY "posts_insert_policy" ON public.posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "posts_update_policy" ON public.posts
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "posts_delete_policy" ON public.posts
  FOR DELETE USING (auth.uid() = author_id);

-- comments 表策略
CREATE POLICY "comments_select_policy" ON public.comments
  FOR SELECT USING (true);

CREATE POLICY "comments_insert_policy" ON public.comments
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "comments_update_policy" ON public.comments
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "comments_delete_policy" ON public.comments
  FOR DELETE USING (auth.uid() = author_id);

-- 创建触发器函数：新用户注册时自动创建 profile
-- 使用注册时存储在 raw_user_meta_data 中的 forest_name
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, forest_name, agreed_to_terms)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      NEW.raw_user_meta_data->>'forest_name',
      '新来的萤火'
    ),
    COALESCE(
      (NEW.raw_user_meta_data->>'agreed_to_terms')::BOOLEAN,
      FALSE
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 创建触发器
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 创建更新帖子评论计数的函数
CREATE OR REPLACE FUNCTION public.update_post_comment_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.posts SET comment_count = comment_count + 1 WHERE id = NEW.post_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.posts SET comment_count = GREATEST(comment_count - 1, 0) WHERE id = OLD.post_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_comment_change
  AFTER INSERT OR DELETE ON public.comments
  FOR EACH ROW EXECUTE FUNCTION public.update_post_comment_count();
