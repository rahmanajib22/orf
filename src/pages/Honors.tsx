import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Eye, Star, ChevronLeft, Award, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getTopViewedTeachers } from '../lib/supabase';
import { Profile } from '../types';

export const Honors: React.FC = () => {
  const [topTeachers, setTopTeachers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getTopViewedTeachers(2); // Get the top 2
      setTopTeachers(data);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-[#1A1A1A] py-20 px-4 md:px-8 font-cairo overflow-hidden relative" dir="rtl">
      {/* Decorative Golden Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#C0272D] blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-600 blur-3xl rounded-full"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <header className="text-center mb-20">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-block p-4 bg-[#C0272D] border-4 border-white mb-6"
          >
            <Trophy className="w-12 h-12 text-white" />
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4 leading-none uppercase">
            لوحة <span className="text-[#C0272D]">الشرف</span>
          </h1>
          <p className="text-xl font-bold text-gray-400 max-w-2xl mx-auto">
            تكريماً للمدرسين الأكثر تفاعلاً وزيارةً من قبل الطلاب خلال هذا الأسبوع.
          </p>
        </header>

        {loading ? (
             <div className="flex justify-center flex-col items-center py-20">
                <div className="w-16 h-16 border-4 border-white border-t-[#C0272D] animate-spin"></div>
             </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {topTeachers.map((teacher, idx) => (
              <motion.div
                key={teacher.id}
                initial={{ opacity: 0, x: idx === 0 ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="relative group"
              >
                {/* Ranking Badge */}
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-white border-4 border-[#1A1A1A] z-20 flex items-center justify-center font-black text-2xl text-[#C0272D] shadow-xl rotate-12">
                  #{idx + 1}
                </div>

                <div className="bg-[#2A2A2A] border-4 border-white p-2 shadow-[20px_20px_0_rgba(192,39,45,0.3)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all duration-500">
                  <div className="relative aspect-square overflow-hidden border-4 border-[#1A1A1A] bg-gray-800">
                    {teacher.profile_picture ? (
                      <img src={teacher.profile_picture} alt={teacher.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600">
                        <Award className="w-24 h-24" />
                      </div>
                    )}
                    
                    {/* Overlay Stats */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-10">
                        <div className="bg-white px-4 py-2 border-2 border-[#1A1A1A] flex items-center gap-2 font-black">
                            <Eye className="w-4 h-4 text-[#C0272D]" />
                            <span className="font-oswald">{teacher.views_count} زيارة</span>
                        </div>
                        <div className="bg-[#C0272D] px-4 py-2 border-2 border-[#1A1A1A] flex items-center gap-2 font-black text-white">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="font-oswald">{teacher.rating}</span>
                        </div>
                    </div>
                  </div>

                  <div className="p-8 text-center bg-white mt-1 border-t-4 border-[#1A1A1A]">
                    <h2 className="text-3xl font-black text-[#1A1A1A] mb-2">{teacher.name}</h2>
                    <p className="text-[#C0272D] font-black uppercase tracking-widest text-sm mb-6 pb-4 border-b-2 border-gray-100 font-oswald">// {teacher.subject} specialist</p>
                    
                    <Link 
                      to={`/profile/${teacher.id}`}
                      className="inline-flex items-center gap-3 bg-[#1A1A1A] text-white px-8 py-3 font-black hover:bg-[#C0272D] transition-colors"
                    >
                      زيارة الملف الشخصي <ChevronLeft className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Call to Action */}
        <div className="mt-24 text-center">
            <Link to="/" className="text-gray-400 hover:text-white font-bold text-lg flex items-center justify-center gap-2 transition-colors">
                <ChevronLeft className="w-5 h-5" /> العودة للبحث عن مدرسين آخرين
            </Link>
        </div>
      </div>
    </div>
  );
};
