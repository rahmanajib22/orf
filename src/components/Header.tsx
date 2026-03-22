import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket, User, Bell } from 'lucide-react';
import { getFeaturedTeacher, getCommunityPosts } from '../lib/supabase';
import { Profile } from '../types';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [featured, setFeatured] = useState<Profile | null>(null);
  const [notifCount, setNotifCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    async function loadData() {
      // Load featured teacher
      const fData = await getFeaturedTeacher();
      setFeatured(fData);

      // Load notifications logic
      const posts = await getCommunityPosts();
      const lastSeenCount = parseInt(localStorage.getItem('edu_last_seen_posts') || '0');
      if (posts.length > lastSeenCount) {
        setNotifCount(posts.length - lastSeenCount);
      }
    }
    loadData();
  }, []);

  // Clear notifications when visiting community page
  useEffect(() => {
    if (location.pathname === '/community') {
      getCommunityPosts().then(posts => {
        localStorage.setItem('edu_last_seen_posts', posts.length.toString());
        setNotifCount(0);
      });
    }
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="border-b-4 border-[#1A1A1A] bg-white relative z-50 shadow-sm" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center gap-8 font-cairo w-1/3">
            <Link 
              to="/" 
              className={`font-bold transition-colors ${isActive('/') ? 'text-[#C0272D] underline decoration-4 underline-offset-8' : 'text-[#1A1A1A] hover:text-[#C0272D]'}`}
            >
              الرئيسية
            </Link>
            <Link 
              to="/community" 
              className={`font-bold transition-colors relative ${isActive('/community') ? 'text-[#C0272D] underline decoration-4 underline-offset-8' : 'text-[#1A1A1A] hover:text-[#C0272D]'}`}
            >
              الساحة
              {notifCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-[#C0272D] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce">
                  {notifCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Featured Teacher Billboard (Top Bar) - REAL DATA LINKED */}
          {featured && (
            <Link to="/honors" className="hidden lg:flex items-center gap-4 bg-[#F0EDE8] border-r-8 border-l-4 border-y-2 border-[#1A1A1A] px-4 py-2 shadow-[4px_4px_0_#C0272D] animate-pulse hover:shadow-none transition-all group">
              <div className="flex flex-col text-right">
                <span className="text-[10px] font-black text-[#C0272D] uppercase tracking-tighter leading-none mb-1">🥇 ملوك الساحة هذا الأسبوع</span>
                <span className="text-sm font-black text-[#1A1A1A] leading-none group-hover:text-[#C0272D]">{featured.name} ومدرسين آخرين...</span>
              </div>
              <div className="w-10 h-10 border-2 border-[#1A1A1A] bg-gray-200 overflow-hidden shrink-0">
                 {featured.profile_picture ? (
                   <img src={featured.profile_picture} alt={featured.name} className="w-full h-full object-cover" />
                 ) : (
                   <User className="w-full h-full p-2 text-gray-400" />
                 )}
              </div>
            </Link>
          )}

          {/* Action Button */}
          <div className="hidden md:flex justify-end w-1/3">
            <button className="bg-[#1A1A1A] hover:bg-[#C0272D] text-[#F0EDE8] px-6 py-2 font-black transition-colors border-2 border-[#1A1A1A] shadow-[4px_4px_0_#C0272D] flex flex-row items-center gap-2">
              انضم كمعلم <Rocket className="w-4 h-4 ml-1" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#1A1A1A] hover:text-[#C0272D] p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#1A1A1A] border-b-4 border-[#C0272D]">
          <div className="px-6 pt-4 pb-6 space-y-4 font-cairo font-bold">
            <Link to="/" className="block text-[#F0EDE8] hover:text-[#C0272D] py-2 border-b border-gray-800">الرئيسية</Link>
            <Link to="/community" className="block text-[#C0272D] hover:bg-gray-800 py-2 border-b border-gray-800">ساحة الطلاب</Link>
            <a href="#" className="block text-[#F0EDE8] hover:text-[#C0272D] py-2 border-b border-gray-800">المدرسين</a>
            <button className="w-full bg-[#C0272D] text-[#F0EDE8] px-4 py-3 font-black mt-4 flex justify-center items-center gap-2">
               انضم كمعلم <Rocket className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
