-- 1. Create the community_posts table first if it doesn't exist
CREATE TABLE IF NOT EXISTS community_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT CHECK (type IN ('article', 'announcement', 'roadmap')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  likes_count INTEGER DEFAULT 0
);

-- 2. Function to increment likes (to handle concurrent likes safely)
CREATE OR REPLACE FUNCTION increment_likes(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE community_posts
  SET likes_count = likes_count + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;

-- 3. Cleanup any old data to avoid duplication
DELETE FROM community_posts;

-- 4. INSERT the high-quality real content
INSERT INTO community_posts (title, content, type, tags, likes_count)
VALUES 
(
  'خارطة الطريق الذهبية لتقفيل الفيزياء 2024', 
  'عشان تقفل الفيزياء لازم تمشي بنظام الـ 3 دوائر: الدائرة الأولى هي التأسيس الرياضي (وحدات القياس والتحويلات)، الدائرة الثانية هي فهم العلاقات الفيزيائية مش حفظ القوانين، والدائرة الثالثة هي حل 30 سؤال متنوع يومياً. ابدأ بالفصل الأول وركز على قانون أوم وقوانين كيرشوف لأنهم أساس المنهج كله.', 
  'roadmap', 
  ARRAY['فيزياء', 'ثانوية عامة', 'نصائح'],
  42
),
(
  'أسرار النحو: ليه بنغلط في الهمزات؟', 
  'الهمزة المتطرفة والميدانية هي أكتر حاجة بتنقص درجات في التعبير. القاعدة بسيطة: الهمزة تتبع الحركة الأقوى. (الكسرة أقوى من الضمة، والضمة أقوى من الفتحة). لو عرفت تنطق الكلمة صح، هتكتب الهمزة صح 100%. مثلاً كلمة "شاطِئ" كتبت على ياء لأن ما قبلها مكسور.', 
  'article', 
  ARRAY['لغة عربية', 'نحو', 'تأسيس'],
  28
),
(
  'كيف تذاكر الإنجليزية بذكاء (خطة الـ 90 يوم)', 
  'الإنجليزي مش كلمات وقواعد بس، الإنجليزي ممارسة. عشان تلم المنهج في 3 شهور: 1. خصص ساعة يومياً للـ Vocab وحط الكلمات في جمل من تأليفك. 2. افهم الـ Grammar كويس وطبق عليه بأسئلة "تحويل الجمل". الاستمرارية أهم بكتير من المذاكرة الكتير المتقطعة.', 
  'roadmap', 
  ARRAY['إنجليزي', 'لغات', 'ثانوية عامة'],
  56
);
