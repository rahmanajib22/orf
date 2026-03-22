import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Target, Menu, X, Rocket } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b-4 border-[#1A1A1A] bg-white relative z-50 shadow-sm" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Group */}
          <div className="flex items-center gap-3 w-1/3">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-[#C0272D] flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-[4px_4px_0_#1A1A1A]">
                <Target className="w-6 h-6 text-[#F0EDE8]" />
              </div>
              <div className="flex flex-col">
                 <span className="font-cairo text-2xl font-black text-[#1A1A1A] tracking-tighter leading-none">إيدو فيليج</span>
                 <span className="text-[10px] font-oswald tracking-[0.2em] font-bold text-gray-400 uppercase">System // On</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center gap-8 font-cairo w-1/3">
            <Link to="/" className="font-bold text-[#1A1A1A] hover:text-[#C0272D] transition-colors">الرئيسية</Link>
            <a href="#" className="font-bold text-[#1A1A1A] hover:text-[#C0272D] transition-colors">المدرسين</a>
            <a href="#" className="font-bold text-[#1A1A1A] hover:text-[#C0272D] transition-colors">المواد</a>
          </nav>

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
            <a href="#" className="block text-[#F0EDE8] hover:text-[#C0272D] py-2 border-b border-gray-800">المدرسين</a>
            <a href="#" className="block text-[#F0EDE8] hover:text-[#C0272D] py-2 border-b border-gray-800">المواد</a>
            <button className="w-full bg-[#C0272D] text-[#F0EDE8] px-4 py-3 font-black mt-4 flex justify-center items-center gap-2">
               انضم كمعلم <Rocket className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
