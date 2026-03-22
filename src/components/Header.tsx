import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Target, Menu, X, Rocket } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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
              className={`font-bold transition-colors ${isActive('/community') ? 'text-[#C0272D] underline decoration-4 underline-offset-8' : 'text-[#1A1A1A] hover:text-[#C0272D]'}`}
            >
              الساحة
            </Link>
          </nav>

          {/* Featured Teacher Billboard (Top Bar) */}
          <div className="hidden lg:flex items-center gap-4 bg-[#F0EDE8] border-r-8 border-l-4 border-y-2 border-[#1A1A1A] px-4 py-2 shadow-[4px_4px_0_#C0272D] animate-pulse">
            <div className="flex flex-col text-right">
              <span className="text-[10px] font-black text-[#C0272D] uppercase tracking-tighter leading-none mb-1">// مدرس الأسبوع المتميز</span>
              <span className="text-sm font-black text-[#1A1A1A] leading-none">أ. محمود علي (فيزياء)</span>
            </div>
            <div className="w-10 h-10 border-2 border-[#1A1A1A] bg-gray-200 overflow-hidden shrink-0">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Featured" className="w-full h-full object-cover" />
            </div>
          </div>

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
