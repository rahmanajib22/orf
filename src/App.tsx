import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Home } from './pages/Home';
import { ProfileDetail } from './pages/ProfileDetail';
import { Community } from './pages/Community';
import { PostDetail } from './pages/PostDetail';
import { Honors } from './pages/Honors';
import { Header } from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <div className="bg-[#F0EDE8] min-h-screen text-[#1A1A1A] flex flex-col font-cairo" dir="rtl">
        <Header />
        <main className="flex-1 relative">
           <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/community" element={<Community />} />
              <Route path="/community/post/:id" element={<PostDetail />} />
              <Route path="/profile/:id" element={<ProfileDetail />} />
              <Route path="/honors" element={<Honors />} />
            </Routes>
          </AnimatePresence>
        </main>
        
        {/* Bold Brutalist Footer */}
        <footer className="border-t-8 border-[#1A1A1A] bg-white py-12 mt-auto z-10 relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C0272D] translate-x-16 -translate-y-16 rotate-45 pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
            <div>
               <h2 className="text-3xl font-black text-[#1A1A1A] tracking-tighter mb-1">إيدو فيليج //</h2>
               <p className="font-bold text-gray-500 font-oswald tracking-widest uppercase text-xs">Platform v4.0.0 — EG</p>
            </div>
            
            <div className="text-center md:text-left font-bold text-[#1A1A1A] text-sm">
               &copy; {new Date().getFullYear()} الشبكة التعليمية الأولى في مصر. <br/>
               <span className="text-[#C0272D]">مصمم للثانوية وما قبلها.</span>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
