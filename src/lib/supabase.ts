import { createClient } from '@supabase/supabase-js';
import { Profile } from '../types';

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
