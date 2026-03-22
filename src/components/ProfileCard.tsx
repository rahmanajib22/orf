import React from 'react';
import { Star, MapPin, Clock } from 'lucide-react';
import { Profile } from '../types';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProfileStyle } from '../lib/styleUtils';

interface Props {
  profile: Profile;
}

export const ProfileCard: React.FC<Props> = ({ profile }) => {
  const pStyle = getProfileStyle(profile.id);
  
  // Deterministic animation seed
  const charSum = profile.id.split('').slice(0, 5).reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const animMode = charSum % 3; // 0: float, 1: scale-pulse, 2: rotate-sway

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: animMode === 0 ? [0, -10, 0] : 0,
        scale: animMode === 1 ? [1, 1.04, 1] : 1,
        rotate: animMode === 2 ? [-1.5, 1.5, -1.5] : 0
      }}
      transition={{ 
        opacity: { duration: 0.5 },
        scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" }
      }}
      whileHover={{ y: -15, scale: 1.05, rotate: pStyle.rotate, boxShadow: pStyle.shadowMove, zIndex: 10 }}
      className="bg-white w-full flex flex-col relative group transition-all duration-300 shadow-[8px_8px_0px_#1A1A1A] overflow-hidden rounded-none"
      style={{ border: `4px solid #1A1A1A` }}
    >
      {/* CARD ID WATERMARK */}
      <div className="absolute top-0 right-0 p-2 font-mono text-[10px] text-gray-500 font-bold z-10 uppercase select-none bg-white/80">
         كود // {profile.id.split('-')[0]}
      </div>
      
      {/* HEADER TAPE / STICKER */}
      <div 
         className="absolute top-4 left-0 text-[#F0EDE8] text-xs font-black px-4 py-1 z-20 font-cairo shadow-md"
         style={{ backgroundColor: pStyle.accent }}
      >
        {profile.rating >= 4.5 ? 'مدرس توب' : 'موثوق'}
      </div>

      <div className="relative overflow-hidden aspect-square border-b-4 border-[#1A1A1A]">
        {/* Grayscale on hover out, colored on hover in */}
        <img 
          src={profile.profile_picture} 
          alt={profile.name} 
          className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500 ease-out"
        />
        {/* Color overlay blend mode */}
        <div 
           className="absolute inset-0 mix-blend-multiply opacity-0 group-hover:opacity-20 transition-opacity duration-300"
           style={{ backgroundColor: pStyle.accent }}
        ></div>
      </div>

      <div className="p-5 flex flex-col flex-grow bg-white relative z-20">
        <div className="flex justify-between items-start mb-2" dir="rtl">
          <div>
            <h3 
              className="text-2xl font-black text-[#1A1A1A] leading-none mb-1 transition-colors font-cairo"
            >
              <span className="group-hover:hidden">{profile.name}</span>
              <span className="hidden group-hover:inline" style={{ color: pStyle.accent }}>{profile.name}</span>
            </h3>
            <p className="text-sm font-bold text-gray-500 font-cairo cursor-default">{profile.specialization} — {profile.subject}</p>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 border-2 border-[#1A1A1A]">
            <Star className="w-3 h-3 text-[#1A1A1A] fill-[#1A1A1A]" />
            <span className="font-bold text-[#1A1A1A] text-xs font-oswald">{profile.rating}</span>
          </div>
        </div>

        <div className="space-y-2 mb-4 text-xs font-bold text-[#1A1A1A] font-cairo" dir="rtl">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#C0272D]" /> {profile.city || 'المدينة مجهولة'}
            {profile.location_preference && <span className="bg-gray-100 px-2 py-0.5 rounded-none border border-gray-300 mr-1">{profile.location_preference}</span>}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#C0272D]" /> {profile.session_type}
            {profile.teaching_style && <span className="bg-gray-100 px-2 py-0.5 rounded-none border border-gray-300 mr-1">{profile.teaching_style}</span>}
          </div>
        </div>

        <div className="mt-auto border-t-2 border-gray-100 pt-4 flex gap-2">
           <Link 
             to={`/profile/${profile.id}`}
             className="flex-1 bg-[#1A1A1A] text-[#F0EDE8] py-2 flex items-center justify-center font-cairo font-black text-sm border-2 border-[#1A1A1A] hover:bg-white hover:text-[#1A1A1A] transition-colors"
           >
             شوف البروفايل
           </Link>
           {profile.whatsapp_link && (
             <a 
               href={profile.whatsapp_link}
               target="_blank"
               rel="noopener noreferrer"
               className="w-10 flex items-center justify-center bg-gray-100 border-2 border-[#1A1A1A] hover:text-[#F0EDE8] transition-colors group/btn"
               style={{ '--hover-bg': pStyle.accent } as React.CSSProperties}
             >
               <style>{'.group\\/btn:hover { background-color: var(--hover-bg); border-color: var(--hover-bg); }'}</style>
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#1A1A1A] group-hover/btn:text-[#F0EDE8] transition-colors"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
             </a>
           )}
        </div>
      </div>
    </motion.div>
  );
};
