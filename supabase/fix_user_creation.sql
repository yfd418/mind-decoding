-- 修复用户昵称问题的脚本
-- 请在 Supabase SQL Editor 中执行

-- 1. 删除现有触发器
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 2. 重新创建触发器函数
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  v_forest_name TEXT;
  v_adjectives TEXT[] := ARRAY['清醒的', '坚定的', '向阳的', '温柔的', '破茧的', '勇敢的', '安静的', '自由的', '坚韧的', '温暖的', '明亮的', '沉静的', '新生的', '宁静的', '淡然的'];
  v_nouns TEXT[] := ARRAY['小鹿', '橡树', '藤蔓', '松鼠', '萤火', '银杏', '蝴蝶', '蒲公英', '山雀', '白桦', '青苔', '溪流', '山风', '晨露', '月光'];
BEGIN
  -- 获取前端传递的 forest_name
  v_forest_name := NEW.raw_user_meta_data->>'forest_name';
  
  -- 如果没有传递，生成一个随机昵称
  IF v_forest_name IS NULL OR v_forest_name = '' THEN
    v_forest_name := v_adjectives[FLOOR(RANDOM() * ARRAY_LENGTH(v_adjectives, 1) + 1)::INT]
                  || v_nouns[FLOOR(RANDOM() * ARRAY_LENGTH(v_nouns, 1) + 1)::INT];
  END IF;

  -- 插入 profile
  INSERT INTO public.profiles (id, email, forest_name, agreed_to_terms)
  VALUES (
    NEW.id,
    NEW.email,
    v_forest_name,
    COALESCE(
      (NEW.raw_user_meta_data->>'agreed_to_terms')::BOOLEAN,
      FALSE
    )
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. 重新创建触发器
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. 为现有用户更新昵称（将带 UUID 后缀的改为随机森林昵称）
UPDATE public.profiles 
SET forest_name = 
  CASE 
    WHEN forest_name LIKE '新来的萤火_%' THEN 
      (ARRAY['清醒的', '坚定的', '向阳的', '温柔的', '破茧的', '勇敢的', '安静的', '自由的', '坚韧的', '温暖的'])[FLOOR(RANDOM() * 10 + 1)::INT]
      || (ARRAY['小鹿', '橡树', '藤蔓', '松鼠', '萤火', '银杏', '蝴蝶', '蒲公英', '山雀', '白桦'])[FLOOR(RANDOM() * 10 + 1)::INT]
    ELSE forest_name
  END
WHERE forest_name LIKE '新来的萤火_%';
