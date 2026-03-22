const fs = require('fs');

const subjects = ['الرياضيات', 'الفيزياء', 'اللغة الإنجليزية', 'اللغة العربية', 'البرمجة', 'الكيمياء', 'الأحياء', 'الدراسات الاجتماعية', 'الفرنساوي', 'القرآن الكريم'];
const maleNames = ['أستاذ محمود', 'مستر أحمد كمال', 'أستاذ محمد الدسوقي', 'مستر خالد زيدان', 'الشيخ عبد الله', 'كابتن حسن', 'مستر طارق'];
const femaleNames = ['مس سارة', 'مس فاطمة', 'أستاذة هند', 'مس نورهان', 'أستاذة إيمان الدسوقي'];
const citiesDb = ['شنوان', 'شبين الكوم', 'الباجور'];

const teachingStyles = ['تأسيس', 'مراجعات', 'حل عقدة'];
const locations = ['بيجي البيت', 'في سنتر', 'أونلاين'];
const possibleTags = ['باله طويل', 'ابن المنطقة', 'شديد وناجح', 'بيشرح بضمير', 'بتاع امتحانات', 'معاك لحد باب اللجنه', 'أسلوب مبسط', 'خبرة سنين'];
const glowColors = [
  '#C0272D', '#8A1C20', '#E53E3E', '#9B2C2C', '#F56565', '#2D3748', '#1A202C', '#E2E8F0' // Valorant-ish shades
];

const skillsDb = ['إدارة الوقت', 'صناعة المحتوى', 'التفكير النقدي', 'القيادة', 'التواصل الفعال'];
const achievementsDb = ['خبرة أكثر من 15 سنة', 'مدرس أوائل المحافظة', 'مؤلف كتب مراجعة'];

let sql = `
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
`;

const values = [];

for (let i = 1; i <= 30; i++) {
  const isFemale = i % 3 === 0;
  const name = isFemale ? (femaleNames[i % femaleNames.length] + (i > 10 ? ' ' + i : '')) : (maleNames[i % maleNames.length] + (i > 10 ? ' ' + i : ''));
  const gender = isFemale ? 'أنثى' : 'ذكر';

  const specialization = i % 5 === 0 ? 'محفظ' : 'مدرس';
  const subject = specialization === 'محفظ' ? 'القرآن الكريم' : subjects[i % subjects.length];
  const target = [['ابتدائي'], ['إعدادي', 'ثانوي'], ['عام'], ['ابتدائي', 'إعدادي', 'ثانوي']][i % 4];
  
  const teaching_style = teachingStyles[i % teachingStyles.length];
  const location_preference = locations[i % locations.length];
  const session_type = location_preference === 'أونلاين' ? 'أونلاين' : 'أوفلاين';
  
  const bio = 'أنا ' + name + '، ' + (teaching_style === 'تأسيس' ? 'متخصص في بناء أساس قوي للطلاب من الصفر' : 'معروف بمراجعاتي النهائية اللي ماتخرجش منها الامتحانات') + ' في منطقة ' + citiesDb[i % citiesDb.length] + '.';
  
  const years = (i % 15) + 3;
  const rating = parseFloat(((Math.random() * 0.5) + 4.5).toFixed(1)); // top ratings
  const whatsapp = 'https://wa.me/20100000000' + i;
  const facebook = i % 2 === 0 ? 'https://facebook.com/profile' + i : '';
  const pic = isFemale ? ('https://i.pravatar.cc/300?img=' + (i + 40)) : ('https://i.pravatar.cc/300?img=' + (i + 10));
  
  const mySkills = [skillsDb[i % skillsDb.length], skillsDb[(i+1) % skillsDb.length]];
  const myArchs = [achievementsDb[i % achievementsDb.length]];
  const myTags = [possibleTags[i % possibleTags.length], possibleTags[(i+3) % possibleTags.length]];
  
  const randomColor = glowColors[i % glowColors.length];
  const vid = i % 4 === 0 ? 'https://www.youtube.com/embed/dQw4w9WgXcQ' : '';
  const city = citiesDb[i % citiesDb.length];

  let fbStr = facebook ? "'" + facebook + "'" : "NULL";
  let vidStr = vid ? "'" + vid + "'" : "NULL";

  values.push(`('${name}', '${specialization}', '${subject}', ARRAY['${target.join("', '")}'], '${session_type}', '${bio}', ${years}, ${rating}, '${whatsapp}', ${fbStr}, '${pic}', '${randomColor}', ARRAY['${mySkills.join("', '")}'], ARRAY['${myArchs.join("', '")}'], ${vidStr}, '${city}', '${teaching_style}', '${location_preference}', ARRAY['${myTags.join("', '")}'], '${gender}')`);
}

sql += values.join(',\n') + ';';
fs.writeFileSync('C:/Users/rahma/.gemini/antigravity/scratch/edu-village/magic-update-v4.sql', sql);
