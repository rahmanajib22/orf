-- Create the profiles table
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    specialization TEXT NOT NULL CHECK (specialization IN ('مدرس', 'مدرب', 'محفظ')),
    subject TEXT NOT NULL,
    target_audience TEXT[] NOT NULL,
    session_type TEXT NOT NULL CHECK (session_type IN ('أونلاين', 'أوفلاين', 'كلاهما')),
    bio TEXT NOT NULL,
    years_of_experience INTEGER NOT NULL DEFAULT 0,
    rating NUMERIC(2,1) NOT NULL DEFAULT 5.0,
    whatsapp_link TEXT NOT NULL,
    profile_picture TEXT NOT NULL,
    random_glow_color TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON profiles
    FOR SELECT
    USING (true);

-- Create policy to allow authenticated users to insert/update (Optional for admin)
CREATE POLICY "Allow authenticated users to manage profiles" ON profiles
    FOR ALL
    USING (auth.role() = 'authenticated');
