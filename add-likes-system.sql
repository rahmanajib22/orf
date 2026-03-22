-- Add likes_count column to community_posts
ALTER TABLE community_posts 
ADD COLUMN IF NOT EXISTS likes_count INTEGER DEFAULT 0;

-- Function to increment likes (to handle concurrent likes safely)
CREATE OR REPLACE FUNCTION increment_likes(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE community_posts
  SET likes_count = likes_count + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;
