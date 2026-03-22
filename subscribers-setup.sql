-- Create subscribers table
CREATE TABLE IF NOT EXISTS community_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- (Optional) If we want a trigger to notify, we usually use Supabase Edge Functions.
-- For now, we'll store the emails correctly.
