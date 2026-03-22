import { Profile } from '../types';

const subjects = ['الرياضيات', 'الفيزياء', 'اللغة الإنجليزية', 'اللغة العربية', 'البرمجة', 'الكيمياء', 'التصميم', 'القرآن الكريم', 'التجويد', 'اللياقة البدنية'];
const names = ['أحمد محمود', 'سارة كمال', 'محمد عبد الله', 'نور الدين', 'فاطمة الزهراء', 'كريم حسن', 'ياسر علي', 'منى إبراهيم', 'طارق يوسف', 'هند سمير', 'عمر الفاروق', 'سلمى صبحي', 'خالد زيدان', 'عائشة رجب', 'محمود سعد', 'زينب فؤاد', 'يوسف نعيم', 'رؤى جمال', 'مصطفى عادل', 'حنان مجدي'];

// Array of distinctive colors for the "Random Stylized Touch"
const glowColors = [
  'rgba(139, 92, 246, 0.6)', // Purple
  'rgba(16, 185, 129, 0.6)', // Emerald
  'rgba(239, 68, 68, 0.6)',  // Red
  'rgba(59, 130, 246, 0.6)', // Blue
  'rgba(245, 158, 11, 0.6)', // Amber
  'rgba(236, 72, 153, 0.6)', // Pink
  'rgba(14, 165, 233, 0.6)', // Light Blue
  'rgba(99, 102, 241, 0.6)', // Indigo
];

const generateMockData = (): Profile[] => {
  const profiles: Profile[] = [];
  for (let i = 1; i <= 30; i++) {
    const specialization = i % 5 === 0 ? 'محفظ' : i % 4 === 0 ? 'مدرب' : 'مدرس';
    let subject = '';
    if (specialization === 'محفظ') subject = ['القرآن الكريم', 'التجويد'][i % 2];
    else if (specialization === 'مدرب') subject = ['اللياقة البدنية', 'تطوير الذات', 'البرمجة'][i % 3];
    else subject = subjects[i % 7];

    const randomColor = glowColors[i % glowColors.length];
    
    profiles.push({
      id: `mock-uuid-${i}`,
      name: names[i % names.length] + (i > 19 ? ' ' + i : ''),
      specialization: specialization as any,
      subject: subject,
      target_audience: [['ابتدائي'], ['إعدادي', 'ثانوي'], ['عام'], ['ابتدائي', 'إعدادي', 'ثانوي']][i % 4] as any,
      session_type: ['أونلاين', 'أوفلاين', 'كلاهما'][i % 3] as any,
      bio: `أنا ${names[i % names.length]}، متخصص في ${subject} بشغف كبير لنقل المعرفة بأحدث الأساليب وتطوير المهارات لمن أعمل معهم. هدفي هو بناء أساس قوي لطلابي.`,
      years_of_experience: (i % 15) + 1,
      rating: parseFloat(((Math.random() * 1.5) + 3.5).toFixed(1)), // Rating between 3.5 and 5.0
      whatsapp_link: `https://wa.me/20100000000${i}`,
      profile_picture: `https://i.pravatar.cc/300?img=${i + 10}`,
      random_glow_color: randomColor,
      skills: ['شرح مبسط', 'حل المشكلات', 'التفاعل', 'التحفيز'],
      achievements: ['تخرج أكثر من 100 طالب', 'خبرة عملية واسعة'],
      city: ['شنوان', 'شبين الكوم', 'الباجور'][i % 3],
      gender: i % 2 === 0 ? 'ذكر' : 'أنثى',
      teaching_style: ['تأسيس', 'مراجعات', 'حل عقدة'][i % 3],
      location_preference: ['بيجي البيت', 'في سنتر', 'أونلاين'][i % 3],
      is_featured: i % 5 === 0,
      views_count: Math.floor(Math.random() * 1000),
      tags: ['باله طويل', 'ابن المنطقة', 'شديد وناجح'].slice(0, (i % 3) + 1)
    });
  }
  
  // Test case: Adding Malak Emad from a new city "قويسنا"
  profiles.push({
    id: 'mock-malak-emad',
    name: 'ملك عماد',
    specialization: 'مدرس',
    subject: 'الكيمياء',
    target_audience: ['ثانوي'],
    session_type: 'أوفلاين',
    bio: 'أنا ملك عماد، أستاذة الكيمياء للثانوية العامة في قويسنا وبنها.',
    years_of_experience: 3,
    rating: 4.9,
    whatsapp_link: 'https://wa.me/201234567890',
    profile_picture: 'https://i.pravatar.cc/300?img=48',
    city: 'قويسنا',
    gender: 'أنثى',
    teaching_style: 'حل عقدة',
    location_preference: 'في سنتر',
    is_featured: false,
    skills: ['كيمياء عضوية', 'تبسيط المناهج'],
    achievements: ['أفضل معلمة شابة 2025'],
    tags: ['ابن المنطقة', 'بيشرح بضمير']
  });
  
  return profiles;
};

export const mockProfiles = generateMockData();
