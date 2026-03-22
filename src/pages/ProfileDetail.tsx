import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, MapPin, Clock, BookOpen, Facebook, BadgeCheck, FileText, Target, Award, Eye } from 'lucide-react';
import { getProfileById, incrementProfileViews } from '../lib/supabase';
import { Profile } from '../types';
import { getProfileStyle } from '../lib/styleUtils';

export const ProfileDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      if (!id) return;
      try {
        const data = await getProfileById(id);
        setProfile(data);
        // Track the view
        incrementProfileViews(id);
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F0EDE8] flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-[#1A1A1A] border-t-[#C0272D] animate-spin mb-4"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#F0EDE8] flex flex-col justify-center items-center font-cairo" dir="rtl">
        <h2 className="text-4xl font-black text-[#1A1A1A] mb-4">البروفايل مش موجود!</h2>
        <Link to="/" className="text-[#F0EDE8] bg-[#C0272D] px-6 py-3 font-bold">ارجع للرئيسية</Link>
      </div>
    );
  }

  const pStyle = getProfileStyle(profile.id);

  return (
    <div className="min-h-screen bg-[#F0EDE8] text-[#1A1A1A] font-cairo selection:bg-[#C0272D] selection:text-[#F0EDE8] pb-20 overflow-x-hidden relative" dir="rtl">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" style={{ backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 20px)`}}></div>
      <div className="fixed top-[-10vh] left-[-10vw] text-[30vw] font-oswald font-black opacity-[0.02] select-none scale-150 rotate-[-10deg] pointer-events-none -z-10 tracking-widest text-[#1A1A1A]">
        {(profile.id.split('-')[0]).toUpperCase()}
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-10 relative z-10">
        
        {/* Navigation */}
        <Link to="/" className="inline-flex items-center gap-2 font-bold mb-8 hover:!text-[#C0272D] transition-colors bg-white px-4 py-2 border-2 border-[#1A1A1A] shadow-[4px_4px_0_#1A1A1A]">
          <ArrowRight className="w-5 h-5" /> رجوع للبحث
        </Link>

        {/* Hero Floating Card - Slides from side */}
        <motion.div 
           initial={{ opacity: 0, x: 150 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ type: "spring", stiffness: 100, damping: 15 }}
           className="bg-white border-4 border-[#1A1A1A] w-full flex flex-col md:flex-row shadow-[12px_12px_0px_#1A1A1A] hover:shadow-[16px_16px_0px_#C0272D] transition-all mb-12 relative"
           style={{ boxShadow: pStyle.shadowMove }}
        >
          {/* Top Label */}
          <div 
            className="absolute -top-4 right-6 text-white px-4 py-1 text-sm font-black tracking-widest flex items-center gap-2"
            style={{ backgroundColor: pStyle.accent }}
          >
            <BadgeCheck className="w-4 h-4" /> {profile.rating >= 4.5 ? 'مدرس توب' : 'موثوق'}
          </div>

          {/* Square Image Container */}
          <div className="w-full md:w-1/3 aspect-[4/5] md:aspect-auto border-b-4 md:border-b-0 md:border-l-4 border-[#1A1A1A] relative group p-6 flex flex-col items-center justify-center bg-gray-50">
             <div className="relative w-48 h-48 sm:w-56 sm:h-56 select-none shadow-lg">
                <div 
                  className="absolute inset-0 translate-x-2 translate-y-2 border-2 border-[#1A1A1A]"
                  style={{ backgroundColor: pStyle.accent }}
                ></div>
                <img 
                  src={profile.profile_picture} 
                  alt={profile.name}
                  className="w-full h-full object-cover relative z-10 border-2 border-[#1A1A1A] grayscale transition-all duration-500 group-hover:grayscale-0"
                />
             </div>
          </div>

          <div className="w-full md:w-2/3 p-6 md:p-10 flex flex-col justify-center">
            
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h1 className="text-4xl md:text-5xl font-black mb-2 text-[#1A1A1A] tracking-tight hover:text-[#C0272D] transition-colors">{profile.name}</h1>
                  <h2 className="text-xl md:text-2xl font-bold flex gap-2 items-center text-gray-600">
                    <BookOpen className="w-6 h-6 text-[#C0272D]" /> {profile.specialization} — {profile.subject}
                  </h2>
               </div>
               <div className="bg-[#1A1A1A] text-white flex flex-col items-center justify-center w-16 h-16 border-2 border-gray-300 transform rotate-3 shadow-[4px_4px_0_#C0272D]">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="font-bold text-lg leading-none mt-1 font-oswald">{profile.rating}</span>
               </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {profile.tags?.map((tag, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1 bg-gray-100 border-2 border-[#1A1A1A] text-sm font-bold text-[#1A1A1A]"
                  style={{ boxShadow: `2px 2px 0 ${pStyle.accent}` }}
                >
                  #{tag}
                </span>
              ))}
              {profile.teaching_style && (
                 <span className="px-3 py-1 bg-[#1A1A1A] border-2 border-[#1A1A1A] text-white text-sm font-bold">
                   {profile.teaching_style}
                 </span>
              )}
            </div>

            <div className="flex flex-wrap gap-6 text-sm md:text-base font-bold text-gray-600 mt-auto">
               <div className="flex items-center gap-2">
                 <MapPin className="w-5 h-5" style={{ color: pStyle.accent }} /> {profile.city} {profile.location_preference && `(${profile.location_preference})`}
               </div>
               <div className="flex items-center gap-2">
                 <Clock className="w-5 h-5" style={{ color: pStyle.accent }} /> {profile.session_type}
               </div>
               <div className="flex items-center gap-2">
                 <Target className="w-5 h-5" style={{ color: pStyle.accent }} /> {profile.target_audience.join('، ')}
               </div>
            </div>

          </div>
        </motion.div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           
           {/* Details Cards */}
           <div className="md:col-span-2 space-y-8 perspective-[1000px]">
              
              {/* Bio Card - "Flip Flop" (Continuous 3D Sway) */}
              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ rotateY: [-5, 5, -5], rotateX: [2, -2, 2], opacity: 1, y: 0 }}
                 transition={{ 
                    opacity: { duration: 0.5 },
                    y: { duration: 0.5 },
                    rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                    rotateX: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                 }}
                 className="bg-white p-8 border-4 border-[#1A1A1A] shadow-[8px_8px_0_#1A1A1A] relative"
                 style={{ transformStyle: 'preserve-3d' }}
              >
                 <h3 className="text-2xl font-black flex items-center gap-3 mb-4 border-b-2 border-gray-100 pb-4">
                    <FileText className="w-6 h-6" style={{ color: pStyle.accent }} /> نبذة عن المدرس
                 </h3>
                 <p className="text-lg leading-relaxed text-gray-700 font-medium translate-z-10">
                   {profile.bio}
                 </p>
              </motion.div>

              {/* Skills Card - "تعوم" (Floating Up and Down) */}
              {profile.skills && profile.skills.length > 0 && (
                <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ y: [0, -12, 0], opacity: 1 }}
                   transition={{ 
                     opacity: { duration: 0.5 },
                     y: { duration: 4, repeat: Infinity, ease: "easeInOut" } 
                   }}
                   className="bg-white p-8 border-4 border-[#1A1A1A] shadow-[8px_8px_0_#1A1A1A] relative"
                >
                   <h3 className="text-2xl font-black flex items-center gap-3 mb-6 border-b-2 border-gray-100 pb-4">
                      <Target className="w-6 h-6" style={{ color: pStyle.accent }} /> القدرات و المهارات
                   </h3>
                   <div className="flex flex-wrap gap-4">
                      {profile.skills.map((skill, index) => (
                        <div key={index} className="flex items-center gap-2 bg-gray-50 border-2 border-gray-200 px-4 py-2 font-bold text-gray-800 hover:border-[#C0272D] transition-colors">
                           <div className="w-2 h-2 rounded-full" style={{ backgroundColor: pStyle.accent }}></div>
                           {skill}
                        </div>
                      ))}
                   </div>
                </motion.div>
              )}

              {/* Achievements Card - "أنيمشن آخر" (Pulsing / Breathing Scale) */}
              {profile.achievements && profile.achievements.length > 0 && (
                <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ scale: [1, 1.02, 1], opacity: 1 }}
                   transition={{ 
                     opacity: { duration: 0.5 },
                     scale: { duration: 3, repeat: Infinity, ease: "easeInOut" } 
                   }}
                   className="bg-[#1A1A1A] p-8 border-4 border-[#1A1A1A] text-white relative"
                   style={{ boxShadow: pStyle.shadowMove }}
                >
                   <h3 className="text-2xl font-black flex items-center gap-3 mb-6 border-b-2 border-gray-700 pb-4">
                      <Award className="w-6 h-6" style={{ color: pStyle.accent }} /> الإنجازات
                   </h3>
                   <ul className="space-y-4">
                      {profile.achievements.map((ach, index) => (
                        <li key={index} className="flex items-start gap-4 p-4 border-2 border-gray-800 transition-colors bg-[#222]">
                           <span className="font-oswald font-black text-xl leading-none" style={{ color: pStyle.accent }}>0{index + 1}</span>
                           <span className="font-bold text-lg">{ach}</span>
                        </li>
                      ))}
                   </ul>
                </motion.div>
              )}

           </div>

           {/* Sidebar Action Card - "Slow Rotate & Float" */}
           <div className="md:col-span-1 space-y-8">
              
              {/* TRUE FLIP FLOP CARD (Two-Sided) */}
              <div className="relative w-full h-40 perspective-[1000px] z-10">
                 <motion.div
                   animate={{ rotateY: [0, 180, 180, 0, 0] }}
                   transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 0.5, 0.9, 1] }}
                   className="w-full h-full relative"
                   style={{ transformStyle: 'preserve-3d' }}
                 >
                    {/* Front Face */}
                    <div className="absolute w-full h-full bg-white border-4 border-[#1A1A1A] p-6 flex flex-col items-center justify-center shadow-[8px_8px_0_#1A1A1A]" style={{ backfaceVisibility: 'hidden' }}>
                        <Award className="w-12 h-12 mb-3" style={{ color: pStyle.accent }} />
                        <h3 className="font-oswald font-black tracking-widest text-[#1A1A1A] uppercase text-xl">Verified</h3>
                    </div>
                    
                    {/* Back Face */}
                    <div className="absolute w-full h-full bg-[#1A1A1A] border-4 border-[#1A1A1A] p-6 flex flex-col items-center justify-center shadow-[-8px_8px_0_#C0272D]" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                        <h3 className="text-3xl font-cairo font-black text-white mb-2">{profile.subject}</h3>
                        <p className="font-bold text-gray-400 font-cairo bg-white/10 px-4 py-1 rounded-full">{profile.city}</p>
                    </div>
                 </motion.div>
              </div>

              <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0, y: [0, -5, 0], rotateZ: [0, 1, -1, 0] }}
                 transition={{ 
                    opacity: { duration: 0.5 },
                    x: { duration: 0.5 },
                    y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 },
                    rotateZ: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }
                 }}
                 className="bg-white p-6 border-4 border-[#1A1A1A] shadow-[8px_8px_0_#1A1A1A] sticky top-8 flex flex-col gap-6"
              >
                 <div className="text-center font-bold pb-6 border-b-2 border-gray-100">
                    <span className="text-5xl font-black font-oswald block" style={{ color: pStyle.accent }}>{profile.years_of_experience}</span>
                    <span className="text-lg mr-2 font-black leading-none text-gray-400">سنة خبرة</span>
                 </div>

                 <a 
                   href={profile.whatsapp_link}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-full text-white py-4 font-black flex items-center justify-center gap-3 transition-colors border-2 border-[#1A1A1A] hover:opacity-90 tracking-widest text-lg"
                   style={{ backgroundColor: pStyle.accent }}
                 >
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
                   كلمه واتساب
                 </a>

                 {profile.facebook_link && (
                   <a 
                     href={profile.facebook_link}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="w-full bg-[#1877F2] hover:bg-[#145DBF] text-white py-3 font-bold flex items-center justify-center gap-3 transition-colors border-2 border-[#1A1A1A]"
                   >
                     <Facebook className="w-5 h-5" fill="currentColor" /> حجز من فيسبوك
                   </a>
                 )}

                 {profile.video_intro_url && (
                    <div className="mt-4">
                      <span className="block font-black mb-2 text-[#1A1A1A]">فيديو تعريفي //</span>
                      <div className="aspect-video relative border-2 border-[#1A1A1A]">
                        <iframe 
                          src={profile.video_intro_url} 
                          title="Intro Video"
                          className="absolute inset-0 w-full h-full"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                 )}
              </motion.div>
           </div>

        </div>

      </div>
    </div>
  );
};
