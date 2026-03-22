-- وظيفة لجلب أبطال لوحة الشرف (التعادل مسموح)
CREATE OR REPLACE FUNCTION get_honors_champions()
RETURNS TABLE (
  profile_id UUID,
  name TEXT,
  subject TEXT,
  profile_picture TEXT,
  views_count INTEGER,
  post_count BIGINT,
  champion_type TEXT -- 'visits' or 'posts'
) AS $$
DECLARE
  max_views INTEGER;
  max_posts BIGINT;
BEGIN
  -- 1. نحدد أعلى رقم زيارات موجود
  SELECT MAX(profiles.views_count) INTO max_views FROM profiles;
  
  -- 2. نحدد أعلى عدد منشورات وصل له أي مدرس
  SELECT MAX(p_count) INTO max_posts FROM (
    SELECT COUNT(*) as p_count FROM community_posts GROUP BY author_id
  ) as subquery;

  -- 3. نرجع المدرسين المتعادلين في الزيارات
  RETURN QUERY 
  SELECT p.id, p.name, p.subject, p.profile_picture, p.views_count, 
         (SELECT COUNT(*) FROM community_posts WHERE author_id = p.id), 'visits'
  FROM profiles p
  WHERE p.views_count = max_views AND max_views > 0;

  -- 4. نرجع المدرسين المتعادلين في عدد المنشورات
  RETURN QUERY
  SELECT p.id, p.name, p.subject, p.profile_picture, p.views_count, 
         (SELECT COUNT(*) FROM community_posts WHERE author_id = p.id) as p_count, 'posts'
  FROM profiles p
  WHERE (SELECT COUNT(*) FROM community_posts WHERE author_id = p.id) = max_posts AND max_posts > 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
