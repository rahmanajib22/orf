DROP TABLE IF EXISTS profiles;

CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    specialization TEXT NOT NULL,
    subject TEXT NOT NULL,
    target_audience TEXT[] NOT NULL,
    session_type TEXT NOT NULL,
    bio TEXT NOT NULL,
    years_of_experience INTEGER NOT NULL DEFAULT 0,
    rating NUMERIC(2,1) NOT NULL DEFAULT 5.0,
    whatsapp_link TEXT NOT NULL,
    facebook_link TEXT,
    profile_picture TEXT NOT NULL,
    random_glow_color TEXT,
    skills TEXT[] DEFAULT '{}'::TEXT[],
    achievements TEXT[] DEFAULT '{}'::TEXT[],
    video_intro_url TEXT,
    city TEXT NOT NULL,
    teaching_style TEXT NOT NULL CHECK (teaching_style IN ('تأسيس', 'مراجعات', 'حل عقدة')),
    location_preference TEXT NOT NULL CHECK (location_preference IN ('بيجي البيت', 'في سنتر', 'أونلاين')),
    tags TEXT[] DEFAULT '{}'::TEXT[],
    gender TEXT NOT NULL CHECK (gender IN ('ذكر', 'أنثى')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON profiles FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to manage profiles" ON profiles FOR ALL USING (auth.role() = 'authenticated');

INSERT INTO profiles (name, specialization, subject, target_audience, session_type, bio, years_of_experience, rating, whatsapp_link, facebook_link, profile_picture, random_glow_color, skills, achievements, video_intro_url, city, teaching_style, location_preference, tags, gender) VALUES 
('أستاذ محمود', 'مدرس', 'اللغة العربية', ARRAY['ابتدائي'], 'أونلاين', 'أنا أستاذ محمود، متخصص في بناء أساس قوي للطلاب من الصفر في منطقة شنوان.', 4, 4.6, 'https://wa.me/201000000001', NULL, 'https://i.pravatar.cc/300?img=11', '#8A1C20', ARRAY['إدارة الوقت', 'صناعة المحتوى'], ARRAY['مدرس أوائل المحافظة'], NULL, 'شنوان', 'تأسيس', 'أونلاين', ARRAY['باله طويل', 'بيشرح بضمير'], 'ذكر'),
('مستر أحمد كمال', 'مدرس', 'الفيزياء', ARRAY['إعدادي', 'ثانوي'], 'أوفلاين', 'أنا مستر أحمد كمال، معروف بمراجعاتي النهائية اللي ماتخرجش منها الامتحانات في منطقة شبين الكوم.', 5, 4.8, 'https://wa.me/201000000002', 'https://facebook.com/profile2', 'https://i.pravatar.cc/300?img=12', '#E53E3E', ARRAY['صناعة المحتوى', 'التفكير النقدي'], ARRAY['مؤلف كتب مراجعة'], NULL, 'شبين الكوم', 'مراجعات', 'في سنتر', ARRAY['ابن المنطقة', 'بتاع امتحانات'], 'ذكر'),
('مس سارة', 'مدرس', 'اللغة الإنجليزية', ARRAY['عام'], 'أونلاين', 'أنا مس سارة، معروف بمراجعاتي النهائية اللي ماتخرجش منها الامتحانات في منطقة الباجور.', 6, 4.9, 'https://wa.me/201000000003', NULL, 'https://i.pravatar.cc/300?img=43', '#9B2C2C', ARRAY['التفكير النقدي', 'القيادة'], ARRAY['خبرة أكثر من 15 سنة'], NULL, 'الباجور', 'حل عقدة', 'أونلاين', ARRAY['شديد وناجح', 'معاك لحد باب اللجنه'], 'أنثى'),
('أستاذ محمد الدسوقي', 'مدرس', 'البرمجة', ARRAY['ابتدائي', 'إعدادي', 'ثانوي'], 'أوفلاين', 'أنا أستاذ محمد الدسوقي، متخصص في بناء أساس قوي للطلاب من الصفر في منطقة شنوان.', 7, 4.5, 'https://wa.me/201000000004', 'https://facebook.com/profile4', 'https://i.pravatar.cc/300?img=14', '#F56565', ARRAY['القيادة', 'التواصل الفعال'], ARRAY['مدرس أوائل المحافظة'], 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'شنوان', 'تأسيس', 'بيجي البيت', ARRAY['بيشرح بضمير', 'أسلوب مبسط'], 'ذكر'),
('مستر خالد زيدان', 'محفظ', 'القرآن الكريم', ARRAY['ابتدائي'], 'أوفلاين', 'أنا مستر خالد زيدان، معروف بمراجعاتي النهائية اللي ماتخرجش منها الامتحانات في منطقة شبين الكوم.', 8, 4.7, 'https://wa.me/201000000005', NULL, 'https://i.pravatar.cc/300?img=15', '#2D3748', ARRAY['التواصل الفعال', 'إدارة الوقت'], ARRAY['مؤلف كتب مراجعة'], NULL, 'شبين الكوم', 'مراجعات', 'في سنتر', ARRAY['بتاع امتحانات', 'خبرة سنين'], 'ذكر'),
('مس فاطمة', 'مدرس', 'الكيمياء', ARRAY['إعدادي', 'ثانوي'], 'أونلاين', 'أنا مس فاطمة، رئيسة القسم ومتخصصة في بناء أساس قوي للطلاب في منطقة الباجور.', 9, 4.6, 'https://wa.me/201000000006', 'https://facebook.com/profile6', 'https://i.pravatar.cc/300?img=46', '#1A202C', ARRAY['إدارة الوقت', 'صناعة المحتوى'], ARRAY['خبرة أكثر من 15 سنة'], NULL, 'الباجور', 'حل عقدة', 'أونلاين', ARRAY['معاك لحد باب اللجنه', 'باله طويل'], 'أنثى');
