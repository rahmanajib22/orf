import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, BookOpen, Users, Star, Home } from 'lucide-react';

interface FilterProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedSpec: string;
  setSelectedSpec: (val: string) => void;
  selectedLocation: string;
  setSelectedLocation: (val: string) => void;
  selectedAudience: string;
  setSelectedAudience: (val: string) => void;
  selectedRating: string;
  setSelectedRating: (val: string) => void;
  selectedCity: string;
  setSelectedCity: (val: string) => void;
  selectedGender: string;
  setSelectedGender: (val: string) => void;
  onSearch: () => void;
  onQuickChip: (filterType: string, value: string) => void;
  dynamicCities?: string[];
  dynamicSpecs?: string[];
  dynamicAudiences?: string[];
  dynamicLocations?: string[];
}

export const FilterBar: React.FC<FilterProps> = ({
  searchTerm, setSearchTerm,
  selectedSpec, setSelectedSpec,
  selectedLocation, setSelectedLocation,
  selectedAudience, setSelectedAudience,
  selectedRating, setSelectedRating,
  selectedCity, setSelectedCity,
  selectedGender, setSelectedGender,
  onSearch, onQuickChip,
  dynamicCities = [], dynamicSpecs = [],
  dynamicAudiences = [], dynamicLocations = []
}) => {
  const [selectedSmartSentence, setSelectedSmartSentence] = useState("");

  // Handle Smart Sentence parsing (translating sentence drop-down to filter states directly)
  const handleSmartSentence = (val: string) => {
    setSelectedSmartSentence(val);
    
    // Clear other preset filters when picking a smart sentence 
    onQuickChip('smart_reset', ''); // Not strictly needed if we just overwrite

    if (val === 'تأسيس') {
      onQuickChip('teaching_style', 'تأسيس');
    } else if (val === 'مراجعات') {
      onQuickChip('teaching_style', 'مراجعات');
    } else if (val === 'بيجي البيت') {
      onQuickChip('location', 'بيجي البيت');
    } else if (val === 'محفظ') {
      onQuickChip('spec', 'محفظ');
    } else if (val === 'حل عقدة') {
      onQuickChip('teaching_style', 'حل عقدة');
    } else if (val === 'معلمة') {
      onQuickChip('gender', 'أنثى');
    } else {
      // Clear out Quick Chips effects if back to default (can handle in Home.tsx ideally, but this is okay locally)
      onQuickChip('teaching_style', '');
    }
  };

  return (
    <motion.div 
      animate={{ 
        y: [0, -20, 0],
        boxShadow: [
          '8px 8px 0px #C0272D',
          '8px 28px 20px rgba(192, 39, 45, 0.2)',
          '8px 8px 0px #C0272D'
        ]
      }}
      transition={{ 
        duration: 5, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      className="bg-white p-6 md:p-8 border-b-4 border-l-4 border-t-2 border-r-2 border-[#1A1A1A] mb-12 w-full relative z-20" dir="rtl"
    >
      
      {/* Tiny decorative elements */}
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#C0272D] border-2 border-[#1A1A1A]"></div>
      <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#C0272D] border-2 border-[#1A1A1A]"></div>

      <div className="relative z-10 flex flex-col gap-6">
        
        {/* Header / Title inside filter */}
        <div className="flex justify-between items-center border-b-4 border-gray-100 pb-4">
           <span className="font-cairo font-black text-[#1A1A1A] text-2xl">محرك البحث الذكي //</span>
           <span className="font-oswald text-xs text-[#C0272D] font-black tracking-widest uppercase bg-gray-100 px-3 py-1 border-2 border-[#1A1A1A]">v4.0 Engine</span>
        </div>

        {/* The New Conversational Smart Dropdown & Manual Search */}
        <div className="flex flex-col md:flex-row gap-6 items-center w-full">
           
           {/* Smart Sentences Dropdown (The Massive Choice System) */}
           <div className="relative w-full md:w-2/3 group">
              <select 
                 className="block w-full pr-12 pl-4 py-4 bg-gray-50 border-4 border-[#1A1A1A] text-[#1A1A1A] text-base md:text-lg font-black outline-none focus:border-[#C0272D] focus:bg-white appearance-none cursor-pointer rounded-none hover:border-[#C0272D] transition-colors shadow-inner"
                 value={selectedSmartSentence}
                 onChange={(e) => handleSmartSentence(e.target.value)}
              >
                 <option value="">بتدور على إيه بالظبط؟ (افتح القايمة واختار)...</option>
                 <option value="تأسيس">عايز أحسن مدرس "تأسيس" يبدأ معايا من الصفر!</option>
                 <option value="مراجعات">مين أحسن حد يلملي المنهج بـ "مراجعات نهائية"؟</option>
                 <option value="حل عقدة">محتاج مدرس يقدر "يحللي عقدتي" في المادة دي!</option>
                 <option value="بيجي البيت">بدور على مدرس ممتاز "بيجي لحد البيت".</option>
                 <option value="محفظ">محتاج "محفظ قرآن" قريب مني يتابعني.</option>
                 <option value="معلمة">عايز "معلمة" (بنت) عشان بنتي تدرس معاها براحتها!</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                 <Search className="h-6 w-6 text-[#1A1A1A] group-hover:text-[#C0272D]" />
              </div>
           </div>

           {/* Manual Search Input text (Smaller) */}
           <div className="relative w-full md:w-1/3 group">
            <input
              type="text"
              className="block w-full pr-4 pl-12 py-4 bg-white border-4 border-gray-200 outline-none text-[#1A1A1A] font-bold placeholder-gray-400 focus:border-[#1A1A1A] focus:bg-gray-50 transition-all rounded-none text-center md:text-right"
              placeholder="...أو اكتب إسم المدرس هنا"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Row 2: Base filters - Visual separation */}
        <div className="pt-2">
            <h4 className="font-oswald text-xs font-black uppercase text-gray-400 mb-3 tracking-widest">// تصفية متقدمة</h4>
            <div className="flex flex-col md:flex-row gap-6 items-center w-full justify-between">
            
            <div className="flex w-full md:w-auto gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                {/* Spec */}
                <div className="relative flex-none w-40 md:flex-1 md:w-48 group">
                 <select 
                     className="block w-full pr-10 pl-4 py-3 bg-gray-50 border-2 border-[#1A1A1A] text-[#1A1A1A] font-bold outline-none focus:border-[#C0272D] focus:bg-white appearance-none cursor-pointer rounded-none hover:border-gray-500"
                     value={selectedSpec}
                     onChange={(e) => setSelectedSpec(e.target.value)}
                 >
                     <option value="">كل التخصصات</option>
                     {dynamicSpecs.length > 0 ? (
                        dynamicSpecs.map(spec => <option key={spec} value={spec}>{spec}</option>)
                     ) : (
                        <>
                          <option value="مدرس">مدرس أكاديمي</option>
                          <option value="مدرب">مدرب مهارات</option>
                          <option value="محفظ">محفظ قرآن</option>
                        </>
                     )}
                 </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <BookOpen className="h-4 w-4 text-[#1A1A1A]" />
                </div>
                </div>

                {/* City */}
                <div className="relative flex-none w-36 md:flex-1 md:w-40 group">
                     <select 
                         className="block w-full pr-10 pl-4 py-3 bg-gray-50 border-2 border-[#1A1A1A] text-[#1A1A1A] font-bold outline-none focus:border-[#C0272D] focus:bg-white appearance-none cursor-pointer rounded-none hover:border-gray-500"
                         value={selectedCity}
                         onChange={(e) => setSelectedCity(e.target.value)}
                     >
                         <option value="">كل المدن</option>
                         {dynamicCities.length > 0 ? (
                            dynamicCities.map(city => <option key={city} value={city}>{city}</option>)
                         ) : (
                            <>
                              <option value="شنوان">شنوان</option>
                              <option value="شبين الكوم">شبين الكوم</option>
                              <option value="الباجور">الباجور</option>
                            </>
                         )}
                     </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <MapPin className="h-4 w-4 text-[#1A1A1A]" />
                    </div>
                </div>

                {/* Target Audience */}
                <div className="relative flex-none w-44 md:flex-1 md:w-48 group">
                     <select 
                         className="block w-full pr-10 pl-4 py-3 bg-gray-50 border-2 border-[#1A1A1A] text-[#1A1A1A] font-bold outline-none focus:border-[#C0272D] focus:bg-white appearance-none cursor-pointer rounded-none hover:border-gray-500"
                         value={selectedAudience}
                         onChange={(e) => setSelectedAudience(e.target.value)}
                     >
                         <option value="">كل المراحل</option>
                         {dynamicAudiences.length > 0 ? (
                            dynamicAudiences.map(aud => <option key={aud} value={aud}>{aud}</option>)
                         ) : (
                            <>
                              <option value="ابتدائي">ابتدائي</option>
                              <option value="إعدادي">إعدادي</option>
                              <option value="ثانوي">ثانوي</option>
                            </>
                         )}
                     </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <Users className="h-4 w-4 text-[#1A1A1A]" />
                    </div>
                </div>

                {/* Gender */}
                <div className="relative flex-none w-36 md:flex-1 md:w-40 group">
                    <select 
                        className="block w-full pr-10 pl-4 py-3 bg-gray-50 border-2 border-[#1A1A1A] text-[#1A1A1A] font-bold outline-none focus:border-[#C0272D] focus:bg-white appearance-none cursor-pointer rounded-none hover:border-gray-500"
                        value={selectedGender}
                        onChange={(e) => setSelectedGender(e.target.value)}
                    >
                        <option value="">نوع المدرس</option>
                        <option value="ذكر">ذكر</option>
                        <option value="أنثى">أنثى</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <Users className="h-4 w-4 text-[#1A1A1A]" />
                    </div>
                </div>

                {/* Location Pref */}
                <div className="relative flex-none w-44 md:flex-1 md:w-48 group">
                 <select 
                     className="block w-full pr-10 pl-4 py-3 bg-gray-50 border-2 border-[#1A1A1A] text-[#1A1A1A] font-bold outline-none focus:border-[#C0272D] focus:bg-white appearance-none cursor-pointer rounded-none hover:border-gray-500"
                     value={selectedLocation}
                     onChange={(e) => setSelectedLocation(e.target.value)}
                 >
                     <option value="">مكان الحصة</option>
                     {dynamicLocations.length > 0 ? (
                        dynamicLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)
                     ) : (
                        <>
                          <option value="بيجي البيت">بيجي البيت</option>
                          <option value="في سنتر">في سنتر</option>
                          <option value="أونلاين">أونلاين</option>
                        </>
                     )}
                 </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Home className="h-4 w-4 text-[#1A1A1A]" />
                </div>
                </div>

                {/* Rating */}
                <div className="relative flex-none w-40 md:flex-1 md:w-40 group">
                    <select 
                        className="block w-full pr-10 pl-4 py-3 bg-gray-50 border-2 border-[#1A1A1A] text-[#1A1A1A] font-bold outline-none focus:border-[#C0272D] focus:bg-white appearance-none cursor-pointer rounded-none hover:border-gray-500"
                        value={selectedRating}
                        onChange={(e) => setSelectedRating(e.target.value)}
                    >
                        <option value="">تقييم أعلى من</option>
                        <option value="4.5">4.5 نجوم</option>
                        <option value="4.0">4.0 نجوم</option>
                        <option value="3.5">3.5 نجوم</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <Star className="h-4 w-4 text-[#1A1A1A]" />
                    </div>
                </div>

            </div>

            <button 
                onClick={onSearch}
                className="w-full bg-[#C0272D] text-white hover:bg-[#1A1A1A] font-cairo text-2xl font-black py-4 px-6 transition-all border-none flex items-center justify-center gap-2 mt-6 group shadow-md"
            >
                <Search className="w-6 h-6 group-hover:scale-110 transition-transform" /> دور دلوقتي
            </button>
            </div>
        </div>

      </div>
    </motion.div>
  );
};
