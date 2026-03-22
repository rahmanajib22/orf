import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getProfiles } from '../lib/supabase';
import { Profile } from '../types';
import { ProfileCard } from '../components/ProfileCard';
import { FilterBar } from '../components/FilterBar';

export const Home: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  const heroMessages = [
    { line1: 'اختار', line2: 'مدرسك' },
    { line1: 'ابني', line2: 'مستقبلك' },
    { line1: 'هات', line2: 'المجموع' },
    { line1: 'ذاكر', line2: 'بذكاء' }
  ];
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % heroMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  
  // Pending Filters 
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedAudience, setSelectedAudience] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedTeachingStyle, setSelectedTeachingStyle] = useState('');
  const [selectedGender, setSelectedGender] = useState(''); // NEW GENDER STATE

  // Applied Filters //
  const [appliedFilters, setAppliedFilters] = useState({
    search: '',
    spec: '',
    location: '',
    audience: '',
    rating: '',
    city: '',
    teaching_style: '',
    gender: '' // NEW GENDER STATE
  });

  useEffect(() => {
    async function loadProfiles() {
      try {
        const data = await getProfiles();
        setProfiles(data);
      } catch (err) {
        console.error("Failed to load profiles", err);
      } finally {
        setLoading(false);
      }
    }
    loadProfiles();
  }, []);

  const handleSearch = () => {
    setAppliedFilters({
      search: searchTerm,
      spec: selectedSpec,
      location: selectedLocation,
      audience: selectedAudience,
      rating: selectedRating,
      city: selectedCity,
      teaching_style: selectedTeachingStyle,
      gender: selectedGender // NEW GENDER STATE
    });
  };

  const handleQuickChip = (filterType: string, value: string) => {
    if (filterType === 'teaching_style') {
      setSelectedTeachingStyle(value);
      setAppliedFilters(prev => ({ ...prev, teaching_style: value }));
    } else if (filterType === 'location') {
      setSelectedLocation(value);
      setAppliedFilters(prev => ({ ...prev, location: value }));
    } else if (filterType === 'spec') {
      setSelectedSpec(value);
      setAppliedFilters(prev => ({ ...prev, spec: value }));
    } else if (filterType === 'gender') {  // NEW GENDER LOGIC
      setSelectedGender(value);
      setAppliedFilters(prev => ({ ...prev, gender: value }));
    }
  };

  const filteredProfiles = profiles.filter(p => {
    const matchesSearch = p.name.includes(appliedFilters.search) || p.subject.includes(appliedFilters.search);
    const matchesSpec = appliedFilters.spec ? p.specialization === appliedFilters.spec : true;
    const matchesLocation = appliedFilters.location ? p.location_preference === appliedFilters.location : true;
    const matchesAudience = appliedFilters.audience ? p.target_audience.includes(appliedFilters.audience as any) : true;
    const matchesRating = appliedFilters.rating ? p.rating >= parseFloat(appliedFilters.rating) : true;
    const matchesCity = appliedFilters.city ? p.city === appliedFilters.city : true;
    const matchesTeaching = appliedFilters.teaching_style ? p.teaching_style === appliedFilters.teaching_style : true;
    const matchesGender = appliedFilters.gender ? p.gender === appliedFilters.gender : true; // NEW GENDER LOGIC
    
    return matchesSearch && matchesSpec && matchesLocation && matchesAudience && matchesRating && matchesCity && matchesTeaching && matchesGender;
  });

  return (
    <div className="min-h-[100vh] bg-[#F0EDE8] py-16 px-4 sm:px-8 relative font-cairo z-0 overflow-x-hidden">
      
      {/* SWINGING LIGHT ANIMATION */}
      <motion.div 
        animate={{ rotate: [-20, 20, -20] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-0 left-1/4 -translate-x-1/2 z-40 pointer-events-none origin-top hidden lg:block"
      >
        <div className="w-[2px] h-48 bg-[#1A1A1A] mx-auto"></div>
        <div className="w-12 h-12 bg-[#C0272D] border-4 border-[#1A1A1A] shadow-[0_0_50px_rgba(192,39,45,0.4)] flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full blur-[2px] animate-pulse"></div>
        </div>
      </motion.div>

      {/* BACKGROUND DECO */}
      <div className="absolute top-0 right-0 w-full md:w-[50vw] h-full opacity-[0.03] pointer-events-none z-[-1] overflow-hidden" 
           style={{ backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 20px)`}}>
      </div>
      <div className="absolute top-20 left-10 text-[15vw] font-oswald font-black text-[#1A1A1A] opacity-[0.02] -z-[1] select-none pointer-events-none tracking-tighter mix-blend-multiply">
         المدرسين
      </div>

          <div className="max-w-7xl mx-auto z-10 relative">
        <header className="flex flex-col md:flex-row justify-between items-end mb-16 border-b-8 border-[#1A1A1A] pb-8 pt-8" dir="rtl">
            <div className="flex flex-col w-full md:w-1/2">
              <span className="text-xl font-bold tracking-[0.05em] text-[#C0272D] mb-4 flex items-center gap-2 font-cairo">
                 <span className="w-8 h-px bg-[#C0272D]"></span> الموقع شغال
              </span>
              <div className="h-[120px] md:h-[200px] relative w-full perspective-[1000px]">
                <AnimatePresence mode="wait">
                  <motion.h1 
                    key={heroIndex}
                    initial={{ y: 50, opacity: 0, rotateX: -90 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    exit={{ y: -50, opacity: 0, rotateX: 90 }}
                    transition={{ duration: 0.5, type: "spring", bounce: 0 }}
                    className="text-6xl md:text-8xl font-black text-[#1A1A1A] tracking-tighter leading-[1] mb-0 absolute top-0 right-0 origin-bottom"
                    dir="rtl"
                  >
                    {heroMessages[heroIndex].line1}<br/>
                    <span className="text-[#C0272D]">{heroMessages[heroIndex].line2}</span>
                  </motion.h1>
                </AnimatePresence>
              </div>
            </div>
            
            <div className="mt-6 md:mt-0 max-w-[300px] text-right" dir="rtl">
              <p className="text-[#1A1A1A] font-black text-sm tracking-widest mb-2 border-r-4 border-[#C0272D] pr-2 uppercase font-oswald">// Data System</p>
              <p className="text-[#1A1A1A] font-bold leading-relaxed text-sm">
                المنصة الأولى لدعم اختيار المعلم المثالي. تصفح الملفات والقدرات لكل مدرس في منطقتك دلوقتي وابدأ رحلتك.
              </p>
            </div>
        </header>

        {/* FEATURED SLIDER SECTION */}
        {!loading && profiles.length > 0 && (
          <div className="mb-20 relative bg-white border-4 border-[#1A1A1A] p-8 shadow-[12px_12px_0_#1A1A1A]">
            <div className="flex flex-row-reverse justify-between items-center mb-8">
               <h3 className="text-2xl font-black text-[#1A1A1A] flex items-center gap-3">
                  <span className="w-4 h-4 bg-[#C0272D] animate-pulse"></span> مدرسين متميزين // FEATURED
               </h3>
               
               {/* SLIDER ARROWS */}
               <div className="flex gap-2">
                  <button 
                    onClick={() => {
                        const container = document.getElementById('featured-slider');
                        if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
                    }}
                    className="p-3 bg-[#1A1A1A] text-white hover:bg-[#C0272D] transition-colors border-2 border-white shadow-[2px_2px_0_#1A1A1A]"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => {
                        const container = document.getElementById('featured-slider');
                        if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
                    }}
                    className="p-3 bg-[#1A1A1A] text-white hover:bg-[#C0272D] transition-colors border-2 border-white shadow-[2px_2px_0_#1A1A1A]"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
               </div>
            </div>

            <div 
              id="featured-slider"
              className="flex gap-8 overflow-x-auto scrollbar-hide pb-10 scroll-smooth snap-x" 
              dir="rtl"
            >
              {profiles.slice(0, 8).map((p, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: [0, -12, 0],
                    rotate: idx % 2 === 0 ? [-1, 1, -1] : [1, -1, 1] 
                  }}
                  transition={{ 
                    opacity: { duration: 0.5 },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 },
                    rotate: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }
                  }}
                  className="w-80 flex-shrink-0 snap-center"
                >
                  <ProfileCard profile={p} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <FilterBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
          selectedSpec={selectedSpec}
          setSelectedSpec={setSelectedSpec}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedAudience={selectedAudience}
          setSelectedAudience={setSelectedAudience}
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
          onSearch={handleSearch}
          onQuickChip={handleQuickChip}
          dynamicCities={[...new Set(profiles.map(p => p.city).filter(Boolean))] as string[]}
          dynamicSpecs={[...new Set(profiles.map(p => p.specialization).filter(Boolean))] as string[]}
          dynamicAudiences={[...new Set(profiles.flatMap(p => p.target_audience).filter(Boolean))] as string[]}
          dynamicLocations={[...new Set(profiles.map(p => p.location_preference).filter(Boolean))] as string[]}
        />

        {loading ? (
          <div className="flex justify-center flex-col items-center py-32">
            <div className="w-16 h-16 border-4 border-[#1A1A1A] border-t-[#C0272D] animate-spin mb-4"></div>
            <p className="font-cairo font-bold tracking-widest text-[#1A1A1A]">بنحمل بيانات المدرسين...</p>
          </div>
        ) : (
          <React.Fragment>
              <div className="flex flex-row-reverse justify-between items-end mb-8 border-b border-[#1A1A1A]/20 pb-4" dir="rtl">
                 <h2 className="text-3xl font-black text-[#1A1A1A]">المتاحين للتوظيف</h2>
                 <span className="font-cairo text-[#C0272D] font-black text-xl bg-[#1A1A1A] text-[#F0EDE8] px-4 py-1">
                    {filteredProfiles.length} مدرس
                 </span>
              </div>
              
              <motion.div 
                layout="position" 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                dir="rtl"
              >
                <AnimatePresence>
                  {filteredProfiles.length > 0 ? (
                    filteredProfiles.map((p) => (
                      <ProfileCard key={p.id} profile={p} />
                    ))
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="col-span-full flex flex-col items-center justify-center p-20 bg-white border-2 border-dashed border-[#1A1A1A] mt-10"
                    >
                      <h3 className="text-4xl text-[#C0272D] font-cairo font-black tracking-tighter">مفيش نتيجة زبدة زيك //</h3>
                      <p className="font-bold mt-2 text-[#1A1A1A]">أعد ضبط الفلاتر وجرب تاني.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};
