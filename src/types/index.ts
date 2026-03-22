export type Specialization = 'مدرس' | 'مدرب' | 'محفظ';
export type SessionType = 'أونلاين' | 'أوفلاين' | 'كلاهما';
export type TargetAudience = 'ابتدائي' | 'إعدادي' | 'ثانوي' | 'عام';

export interface Profile {
  id: string; // UUID from Supabase
  name: string;
  specialization: Specialization;
  subject: string;
  target_audience: TargetAudience[];
  session_type: SessionType;
  bio: string;
  years_of_experience: number;
  rating: number; // 0 to 5
  whatsapp_link: string;
  facebook_link?: string;
  profile_picture: string;
  random_glow_color?: string; // Assigned for the unique styling per profile
  skills: string[];
  achievements: string[];
  // Optional mockup video link
  video_intro_url?: string;
  city: string;
  teaching_style?: string;
  location_preference?: string;
  tags?: string[];
  gender?: string;
  views_count?: number;
}

export type PostType = 'article' | 'announcement' | 'roadmap';

export interface CommunityPost {
  id: string;
  author_id?: string;
  author_name?: string;
  author_image?: string;
  title: string;
  content: string;
  type: PostType;
  created_at: string;
  image_url?: string;
  tags?: string[];
  likes_count: number;
}


