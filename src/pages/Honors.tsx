import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Eye, Star, ChevronLeft, Award, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getHonorsChampions, HonorChampion } from '../lib/supabase';

export const Honors: React.FC = () => {
  const [champions, setChampions] = useState<HonorChampion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getHonorsChampions();
      setChampions(data);
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

      <div className="max-w-6xl mx-auto relative z-10">
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
            تكريماً للمدرسين الرواد بناءً على نشاطهم في المحتوى وتفاعل الطلاب.
          </p>
        </header>

        {loading ? (
             <div className="flex justify-center flex-col items-center py-20">
                <div className="w-16 h-16 border-4 border-white border-t-[#C0272D] animate-spin"></div>
             </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 justify-center">
            {champions.length === 0 ? (
                <div className="md:col-span-2 text-center text-white text-2xl font-black opacity-50 bg-[#2A2A2A] p-12 border-4 border-dashed border-gray-600">
                    // لا يوجد أبطال حالياً، في انتظار تفاعل الطلاب!
                </div>
            ) : champions.map((teacher, idx) => (
              <motion.div
                key={`${teacher.id}-${teacher.champion_type}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative group max-w-lg mx-auto w-full"
              >
                {/* Winner Title Badge */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-6 py-3 bg-[#C0272D] text-white border-4 border-white z-20 font-black text-xl shadow-2xl whitespace-nowrap rotate-2 group-hover:rotate-0 transition-transform">
                  {teacher.champion_type === 'visits' ? '👑 بطل الزيارات' : '✍️ بطل المحتوى'}
                </div>

                <div className="bg-[#2A2A2A] border-4 border-white p-2 shadow-[24px_24px_0_rgba(192,39,45,0.4)]">
                  <div className="relative aspect-[4/5] overflow-hidden border-4 border-[#1A1A1A] bg-gray-900 group">
                    {teacher.profile_picture ? (
                      <img src={teacher.profile_picture} alt={teacher.name} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-700">
                        <Award className="w-32 h-32" />
                      </div>
                    )}
                    
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent opacity-60"></div>

                    {/* Stats Overlay Cards */}
                    <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-3 z-10 translate-y-4 group-hover:translate-y-0 transition-transform">
                        <div className="flex gap-2">
                           {teacher.champion_type === 'visits' ? (
                               <div className="bg-white px-4 py-2 border-2 border-[#1A1A1A] flex items-center gap-2 font-black">
                                   <Eye className="w-5 h-5 text-[#C0272D]" />
                                   <span className="font-oswald text-xl">{teacher.views_count} زيارة</span>
                               </div>
                           ) : (
                               <div className="bg-white px-4 py-2 border-2 border-[#1A1A1A] flex items-center gap-2 font-black">
                                   <FileText className="w-5 h-5 text-[#C0272D]" />
                                   <span className="font-oswald text-xl">{teacher.post_count} منشور</span>
                               </div>
                           )}
                           <div className="bg-yellow-500 px-4 py-2 border-2 border-[#1A1A1A] flex items-center gap-2 font-black">
                               <Star className="w-4 h-4 fill-black" />
                               <span className="font-oswald">{teacher.rating}</span>
                           </div>
                        </div>
                    </div>
                  </div>

                  <div className="p-10 text-center bg-white mt-1 border-t-8 border-[#1A1A1A]">
                    <h2 className="text-4xl font-black text-[#1A1A1A] mb-2 leading-none">{teacher.name}</h2>
                    <p className="text-[#C0272D] font-black uppercase text-lg mb-8 font-oswald">// {teacher.subject} specialist</p>
                    
                    <Link 
                      to={`/profile/${teacher.id}`}
                      className="inline-flex w-full justify-center items-center gap-4 bg-[#1A1A1A] text-white px-10 py-5 font-black hover:bg-[#C0272D] transition-all text-xl shadow-[8px_8px_0_#F0EDE8] hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                    >
                      زيارة ملف البطل <ChevronLeft className="w-6 h-6" />
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
