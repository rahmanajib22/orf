import { createClient } from '@supabase/supabase-js';
import { Profile, CommunityPost } from '../types';

// Replace these with your actual Supabase project URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://grpywlkwyqfhxatgyhmp.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdycHl3bGt3eXFmaHhhdGd5aG1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxMTI0MTAsImV4cCI6MjA4OTY4ODQxMH0.R3HSA8PpYsNM0WeM4RX7qq-G9xlv4G7eu_T-dcBSQlY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// In a real app, we would fetch this from Supabase.
// For now, we will use mock data if the API keys are not provided.
export async function getProfiles(): Promise<Profile[]> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('rating', { ascending: false });
      
    if (error) {
      console.warn('Supabase fetch failed (probably keys missing), using mock data.');
      throw error;
    }
    return data as Profile[];
  } catch (err) {
    // Fallback to mock data generated locally
    const { mockProfiles } = await import('../data/mockProfiles');
    return mockProfiles;
  }
}

export async function getProfileById(id: string): Promise<Profile | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      return data as Profile;
    } catch (err) {
      const { mockProfiles } = await import('../data/mockProfiles');
      return mockProfiles.find(p => p.id === id) || null;
    }
  }

export async function getCommunityPosts(): Promise<CommunityPost[]> {
  try {
    const { data, error } = await supabase
      .from('community_posts')
      .select('*, profiles(name, profile_picture)')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    // Format the data to match our interface
    return data.map(post => ({
      ...post,
      author_name: post.profiles?.name || 'مدرس مجهول',
      author_image: post.profiles?.profile_picture || 'https://i.pravatar.cc/150'
    }));
  } catch (err) {
    // Return mock data for local testing
    return [
      {
        id: '1',
        title: 'روود ماب الفيزياء للثانوية',
        content: 'دي خارطة طريق كاملة عشان تقفل الفيزياء في 3 شهور بس..',
        type: 'roadmap',
        author_name: 'أ. أحمد علي',
        created_at: new Date().toISOString(),
        tags: ['فيزياء', 'ثانوية عامة'],
        likes_count: 12
      },
      {
         id: '2',
         title: 'ورشة عمل: أساسيات البرمجة',
         content: 'أكاديمية المستقبل بتعلن عن ورشة يوم الجمعة الجاية...',
         type: 'announcement',
         author_name: 'أكاديمية المستقبل',
         created_at: new Date().toISOString(),
         tags: ['برمجة', 'كورس'],
         likes_count: 5
      }
    ];
  }
}

export async function likePost(postId: string): Promise<void> {
  try {
    const { error } = await supabase
      .rpc('increment_likes', { post_id: postId });
      
    if (error) throw error;
  } catch (err) {
    console.error("Failed to like post", err);
  }
}

export async function getPostById(id: string): Promise<CommunityPost | null> {
  try {
    const { data, error } = await supabase
      .from('community_posts')
      .select('*, profiles(name, profile_picture)')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    
    return {
      ...data,
      author_name: data.profiles?.name || 'مدرس مجهول',
      author_image: data.profiles?.profile_picture || 'https://i.pravatar.cc/150'
    };
  } catch (err) {
     return null;
  }
}

export async function subscribeToNewPosts(email: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('community_subscribers')
      .insert([{ email }]);
      
    if (error && error.code !== '23505') throw error; // Ignore if already exists (unique constraint)
  } catch (err) {
    console.error("Failed to subscribe", err);
    throw err;
  }
}
