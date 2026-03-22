import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MessageSquare, Calendar, Compass, FileText, ChevronLeft, User, Search, Heart, Bell, Send } from 'lucide-react';
import { getCommunityPosts, likePost, subscribeToNewPosts } from '../lib/supabase';
import { CommunityPost, PostType } from '../types';
import { normalizeArabic } from '../utils/arabic';

export const Community: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<PostType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Newsletter state
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  
  // Track liked posts locally to prevent double clicking and show visual state
  const [likedPosts, setLikedPosts] = useState<string[]>(() => {
    const saved = localStorage.getItem('edu_village_likes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getCommunityPosts();
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribing(true);
    try {
      await subscribeToNewPosts(email);
      setSubscribed(true);
      setEmail('');
    } catch (err) {
      alert("حدث خطأ أثناء الاشتراك.");
    } finally {
      setSubscribing(false);
    }
  };

  const handleLike = async (postId: string) => {
    if (likedPosts.includes(postId)) return;

    // Optimistic update
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes_count: p.likes_count + 1 } : p));
    const newLiked = [...likedPosts, postId];
    setLikedPosts(newLiked);
    localStorage.setItem('edu_village_likes', JSON.stringify(newLiked));

    // Update DB
    await likePost(postId);
  };

  const filteredPosts = posts.filter(post => {
    const normalizedQuery = normalizeArabic(searchQuery);
    const matchesTab = activeTab === 'all' || post.type === activeTab;
    const matchesSearch = normalizeArabic(post.title).includes(normalizedQuery) || 
                         normalizeArabic(post.content).includes(normalizedQuery);
    return matchesTab && matchesSearch;
  });

  const availableTypes = [...new Set(posts.map(p => p.type))];

  const getTypeStyle = (type: PostType) => {
    switch (type) {
      case 'article': return { color: '#1A1A1A', icon: <FileText className="w-4 h-4" />, label: 'شرح تعليمي' };
      case 'announcement': return { color: '#C0272D', icon: <Calendar className="w-4 h-4" />, label: 'إعلان / ورشة' };
      case 'roadmap': return { color: '#000', icon: <Compass className="w-4 h-4" />, label: 'خارطة طريق' };
      default: return { color: '#1A1A1A', icon: <MessageSquare className="w-4 h-4" />, label: 'منشور' };
    }
  };

  return (
    <div className="min-h-screen bg-[#F0EDE8] py-16 px-4 sm:px-8 relative font-cairo z-0 overflow-x-hidden" dir="rtl">
      {/* DECORATIVE BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" style={{ backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 20px)`}}></div>
      
      <div className="max-w-7xl mx-auto z-10 relative">
        <header className="mb-12 border-b-8 border-[#1A1A1A] pb-8 pt-8">
            <span className="text-xl font-bold tracking-[0.05em] text-[#C0272D] mb-4 flex items-center gap-2">
                <span className="w-8 h-px bg-[#C0272D]"></span> ساحة إيدو // Community
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-[#1A1A1A] tracking-tighter leading-tight mb-4 uppercase">
               آخر <br/> <span className="text-[#C0272D]">التحديثات</span>
            </h1>
            <p className="text-xl font-bold text-[#1A1A1A] max-w-2xl opacity-80 leading-relaxed">
              مكان الطلاب والمدرسين.. شروحات، إعلانات ورش عمل، وخرائط طريق للنجاح. كل اللي تحتاجه عشان تطور مستواك.
            </p>
        </header>

        {/* CONTROLS */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center">
            {/* Search */}
            <div className="relative w-full md:w-96 group">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#1A1A1A] transition-colors" />
                <input 
                   type="text" 
                   placeholder="ابحث عن شرح أو ورشة..."
                   className="w-full bg-white border-4 border-[#1A1A1A] p-4 pr-12 font-bold focus:outline-none focus:shadow-[8px_8px_0_#C0272D] transition-all"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Tabs */}
            <div className="flex bg-white border-4 border-[#1A1A1A] p-2 gap-2 overflow-x-auto w-full md:w-auto scrollbar-hide">
                <button
                    onClick={() => setActiveTab('all')}
                    className={`px-6 py-2 font-black transition-all whitespace-nowrap ${
                        activeTab === 'all' 
                        ? 'bg-[#C0272D] text-white shadow-[4px_4px_0_#1A1A1A]' 
                        : 'hover:bg-gray-100 text-[#1A1A1A]'
                    }`}
                >
                    الكل
                </button>
                {availableTypes.filter(Boolean).map((type) => (
                    <button
                        key={type}
                        onClick={() => setActiveTab(type as any)}
                        className={`px-6 py-2 font-black transition-all whitespace-nowrap ${
                            activeTab === type 
                            ? 'bg-[#C0272D] text-white shadow-[4px_4px_0_#1A1A1A]' 
                            : 'hover:bg-gray-100 text-[#1A1A1A]'
                        }`}
                    >
                        {type === 'article' ? 'شروحات' : type === 'announcement' ? 'ورش عمل' : type === 'roadmap' ? 'روود ماب' : type}
                    </button>
                ))}
            </div>
        </div>

        {/* FEED GRID */}
        {loading ? (
             <div className="flex justify-center flex-col items-center py-32">
                <div className="w-16 h-16 border-4 border-[#1A1A1A] border-t-[#C0272D] animate-spin mb-4"></div>
                <p className="font-bold tracking-widest text-[#1A1A1A]">بنحمل آخر المنشورات...</p>
             </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                    {filteredPosts.map((post, idx) => {
                        const style = getTypeStyle(post.type);
                        return (
                            <motion.div
                                key={post.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white border-4 border-[#1A1A1A] flex flex-col hover:shadow-[12px_12px_0_#1A1A1A] transition-all relative overflow-hidden group"
                            >
                                {/* Post Type Banner */}
                                <div className="p-3 border-b-4 border-[#1A1A1A] flex justify-between items-center bg-gray-50 group-hover:bg-[#1A1A1A] transition-colors group-hover:text-white">
                                    <div className="flex items-center gap-2 font-black text-xs uppercase tracking-widest">
                                        <span className="p-1 bg-[#C0272D] text-white">{style.icon}</span>
                                        {style.label}
                                    </div>
                                    <span className="text-[10px] font-black opacity-50 font-oswald uppercase">00{idx+1} //</span>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <h2 className="text-2xl font-black text-[#1A1A1A] mb-3 leading-tight group-hover:text-[#C0272D] transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-600 font-bold text-sm leading-relaxed mb-6 line-clamp-3">
                                        {post.content}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {post.tags?.map(tag => (
                                            <span key={tag} className="text-[10px] bg-[#F0EDE8] border-2 border-[#1A1A1A] px-2 py-0.5 font-black text-[#1A1A1A]">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Author Footer */}
                                <div className="p-4 bg-white border-t-4 border-[#1A1A1A] flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-none border-2 border-[#1A1A1A] overflow-hidden bg-gray-200">
                                            {post.author_image ? (
                                                <img src={post.author_image} alt={post.author_name} className="w-full h-full object-cover" />
                                            ) : (
                                                <User className="w-full h-full p-1" />
                                            )}
                                        </div>
                                        <span className="font-black text-xs">{post.author_name}</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-4">
                                        <button 
                                            onClick={() => handleLike(post.id)}
                                            className={`flex items-center gap-1.5 font-bold text-xs transition-colors ${
                                                likedPosts.includes(post.id) ? 'text-[#C0272D]' : 'text-gray-400 hover:text-[#C0272D]'
                                            }`}
                                        >
                                            <Heart className={`w-4 h-4 ${likedPosts.includes(post.id) ? 'fill-current' : ''}`} />
                                            <span className="font-oswald">{post.likes_count}</span>
                                        </button>
                                        <Link 
                                            to={`/community/post/${post.id}`}
                                            className="bg-[#1A1A1A] text-white p-2 hover:bg-[#C0272D] transition-colors shadow-[2px_2px_0_#C0272D]"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        )}

        {/* NEWSLETTER SECTION */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-32 bg-[#C0272D] border-4 border-[#1A1A1A] p-8 md:p-12 shadow-[12px_12px_0_#1A1A1A] relative overflow-hidden"
        >
            {/* Background Icon */}
            <Bell className="absolute -right-8 -bottom-8 w-64 h-64 text-white opacity-10 rotate-12" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
                <div className="max-w-xl text-center md:text-right">
                    <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">خليك أول واحد يعرف!</h2>
                    <p className="text-xl font-bold opacity-90 leading-relaxed font-cairo">
                        اشترك في بريد الساحة وعشان يوصلك إشعار فوري بمجرد ما أي مدرس ينزل شرح جديد أو خارطة طريق.
                    </p>
                </div>

                <div className="w-full md:w-auto">
                    {subscribed ? (
                        <motion.div 
                            initial={{ scale: 0.8 }} 
                            animate={{ scale: 1 }}
                            className="bg-white text-[#C0272D] p-6 border-4 border-[#1A1A1A] font-black text-2xl flex items-center gap-3 shadow-[8px_8px_0_#1A1A1A]"
                        >
                            <Send className="w-8 h-8" /> استعد للجديد.. تم الاشتراك!
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                            <input 
                                type="email" 
                                required
                                placeholder="اكتب إيميلك هنا..."
                                className="bg-white border-4 border-[#1A1A1A] p-4 text-[#1A1A1A] font-bold text-lg min-w-[300px] outline-none focus:bg-[#F0EDE8] transition-colors"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button 
                                type="submit"
                                disabled={subscribing}
                                className="bg-[#1A1A1A] hover:bg-gray-800 text-white px-8 py-4 font-black text-xl flex items-center justify-center gap-2 transition-all border-4 border-[#1A1A1A] shadow-[8px_8px_0_#F0EDE8] hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                            >
                                {subscribing ? 'جاري الاشتراك...' : 'اشترك دلوقتي'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </motion.div>

      </div>
    </div>
  );
};
