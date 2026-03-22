import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User, Heart, Share2, Bookmark } from 'lucide-react';
import { getPostById } from '../lib/supabase';
import { CommunityPost } from '../types';

export const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<CommunityPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      if (!id) return;
      try {
        const data = await getPostById(id);
        setPost(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F0EDE8] flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-[#1A1A1A] border-t-[#C0272D] animate-spin mb-4"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#F0EDE8] flex flex-col justify-center items-center font-cairo" dir="rtl">
        <h2 className="text-4xl font-black text-[#1A1A1A] mb-4">المنشور مش موجود!</h2>
        <Link to="/community" className="text-[#F0EDE8] bg-[#C0272D] px-6 py-3 font-bold">ارجع للساحة</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0EDE8] text-[#1A1A1A] font-cairo pb-20" dir="rtl">
      <div className="max-w-4xl mx-auto px-4 pt-16">
        
        {/* Navigation */}
        <Link to="/community" className="inline-flex items-center gap-2 font-bold mb-12 hover:text-[#C0272D] transition-colors bg-white px-4 py-2 border-2 border-[#1A1A1A] shadow-[4px_4px_0_#1A1A1A]">
          <ArrowRight className="w-5 h-5" /> رجوع للساحة
        </Link>

        {/* Hero Section */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="bg-white border-4 border-[#1A1A1A] p-8 md:p-12 shadow-[12px_12px_0_#1A1A1A] relative"
        >
          {/* Badge */}
          <div className="absolute -top-4 right-8 bg-[#C0272D] text-white px-6 py-1 text-sm font-black uppercase tracking-widest">
            {post.type === 'roadmap' ? 'خارطة طريق // ROADMAP' : post.type === 'announcement' ? 'إعلان // EVENT' : 'شرح // ARTICLE'}
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-8 mb-12 py-6 border-y-2 border-dashed border-gray-200">
             <div className="flex items-center gap-3">
                <div className="w-12 h-12 border-2 border-[#1A1A1A] bg-gray-100 p-1">
                   {post.author_image ? <img src={post.author_image} className="w-full h-full object-cover" /> : <User />}
                </div>
                <div>
                  <p className="text-xs font-black opacity-50 font-oswald">// AUTHOR</p>
                  <p className="font-bold text-lg">{post.author_name}</p>
                </div>
             </div>
             
             <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 border-2 border-gray-200">
                   <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-black opacity-50 font-oswald">// POSTED AT</p>
                  <p className="font-bold text-lg">{new Date(post.created_at).toLocaleDateString('ar-EG')}</p>
                </div>
             </div>

             <div className="flex items-center gap-3 mr-auto bg-[#F0EDE8] p-4 border-2 border-[#1A1A1A]">
                <Heart className="w-6 h-6 text-[#C0272D] fill-current" />
                <span className="font-oswald text-2xl font-black">{post.likes_count}</span>
             </div>
          </div>

          {/* Main Content */}
          <div className="prose prose-xl max-w-none">
             <p className="text-2xl leading-relaxed text-[#1A1A1A] font-medium whitespace-pre-wrap">
               {post.content}
             </p>
          </div>

          {/* Tags */}
          <div className="mt-16 pt-8 border-t-2 border-gray-100 border-dashed flex flex-wrap gap-3">
             {post.tags?.map(tag => (
               <span key={tag} className="bg-gray-100 border-2 border-[#1A1A1A] px-4 py-1 font-black text-sm">
                 #{tag}
               </span>
             ))}
          </div>
        </motion.div>

        {/* Action Bar Footer */}
        <div className="mt-12 flex gap-4">
           <button className="flex-1 bg-[#1A1A1A] text-white py-4 font-black flex items-center justify-center gap-3 hover:bg-[#C0272D] transition-colors border-4 border-[#1A1A1A]">
              <Share2 className="w-5 h-5" /> شارك المنشور
           </button>
           <button className="flex-1 bg-white text-[#1A1A1A] py-4 font-black flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors border-4 border-[#1A1A1A]">
              <Bookmark className="w-5 h-5" /> احفظ المحتوى
           </button>
        </div>

      </div>
    </div>
  );
};
