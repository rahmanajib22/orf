-- 1. إضافة عمود عداد الزيارات لجدول المدرسين
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS views_count INTEGER DEFAULT 0;

-- 2. إنشاء وظيفة لزيادة عداد الزيارات بأمان (Prevent Race Conditions)
CREATE OR REPLACE FUNCTION increment_profile_views(profile_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE profiles
  SET views_count = views_count + 1
  WHERE id = profile_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
