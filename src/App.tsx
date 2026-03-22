import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Home } from './pages/Home';
import { ProfileDetail } from './pages/ProfileDetail';
import { Community } from './pages/Community';
import { PostDetail } from './pages/PostDetail';
import { Honors } from './pages/Honors';
import { Header } from './components/Header';

import { getPlatformConfig } from './lib/supabase';
import { AlertTriangle } from 'lucide-react';

function App() {
  const [config, setConfig] = React.useState<Record<string, string>>({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function init() {
      const data = await getPlatformConfig();
      setConfig(data);
      if (data.site_title) {
        document.title = data.site_title;
      }
      setLoading(false);
    }
    init();
  }, []);

  if (!loading && config.is_under_maintenance === 'true') {
    return (
      <div className="min-h-screen bg-[#F0EDE8] flex items-center justify-center p-6 font-cairo" dir="rtl">
        <div className="max-w-2xl w-full bg-white border-8 border-[#1A1A1A] p-12 shadow-[20px_20px_0_#C0272D] text-center relative overflow-hidden">
          {/* Deco lines */}
          <div className="absolute top-0 left-0 w-full h-4 bg-repeating-linear-gradient(45deg, #1A1A1A, #1A1A1A 10px, #F0EDE8 10px, #F0EDE8 20px)"></div>
          <div className="absolute bottom-0 left-0 w-full h-4 bg-repeating-linear-gradient(45deg, #1A1A1A, #1A1A1A 10px, #F0EDE8 10px, #F0EDE8 20px)"></div>
          
          <div className="mb-8 inline-block p-4 bg-[#C0272D] border-4 border-[#1A1A1A] rotate-3">
             <AlertTriangle className="w-16 h-16 text-white" />
          </div>
          
          <h1 className="text-6xl font-black text-[#1A1A1A] mb-6 leading-none tracking-tighter uppercase">
            نحن في <span className="text-[#C0272D]">إجازة</span> برمجية //
          </h1>
          
          <p className="text-2xl font-bold text-[#1A1A1A] mb-12 leading-relaxed">
            الموقع حالياً تحت الصيانة لتحسين تجربتكم. <br/>
            سنعود أقوى وأسرع من السابق خلال ساعات قليلة.
          </p>
          
          <div className="flex flex-col items-center gap-4">
             <div className="text-sm font-black text-gray-400 uppercase tracking-widest">// System Status: REBUILDING</div>
             <div className="w-48 h-2 bg-[#1A1A1A] relative">
                <div className="absolute top-0 left-0 h-full bg-[#C0272D] animate-progress w-1/2"></div>
             </div>
          </div>

          <div className="mt-16 pt-8 border-t-4 border-dashed border-[#1A1A1A]/20">
             <p className="font-black text-[#1A1A1A]">نعتذر على الإزعاج. — فريق إيدو فيليج</p>
          </div>
        </div>
      </div>
    );
  }

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
               <h2 className="text-3xl font-black text-[#1A1A1A] tracking-tighter mb-1">{config.site_title || "إيدو فيليج //"}</h2>
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
