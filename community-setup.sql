-- Create the community_posts table
CREATE TABLE IF NOT EXISTS community_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT CHECK (type IN ('article', 'announcement', 'roadmap')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  image_url TEXT,
  tags TEXT[] DEFAULT '{}'
);

-- Add some demo content linked to different teachers
-- Note: Replace author_id with actual IDs if needed, otherwise we'll link them randomly in the mock later.
INSERT INTO community_posts (title, content, type, tags)
VALUES 
('الطريق المختصر لتقفيل الفيزياء', 'أهلاً يا أبطال، دي روود ماب كاملة للباب الأول عشان متتوهوش في التفاصيل اللي ملهاش لازمة...', 'roadmap', ARRAY['فيزياء', 'ثانوية عامة']),
('ورشة عمل: أساسيات البرمجة للأطفال', 'أكاديمية إيدو تعلن عن بدء التسجيل لورشة "المبرمج الصغير" يوم الجمعة القادم...', 'announcement', ARRAY['برمجة', 'أطفال', 'ورشة']),
('شرح مبسط لقواعد اللغة الإنجليزية', 'كتير منكم بيغلط في الـ Present Perfect، خلونا نبسطها النهاردة بمثال واحد بس...', 'article', ARRAY['إنجليزي', 'تأسيس']);
