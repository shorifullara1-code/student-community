import React from 'react';
import { Search, Globe, Home, ChevronDown, ChevronRight, Calendar, FileText, CheckCircle, ArrowUp } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen text-gray-800 pb-10">
      {/* Boxed Container */}
      <div className="max-w-[1000px] mx-auto bg-white min-h-screen shadow-2xl overflow-hidden relative">
        
        {/* Scroll to Top Button (Floating) */}
        <div className="fixed bottom-10 right-10 bg-white border border-gray-200 p-2 rounded-full shadow-lg cursor-pointer text-gray-500 hover:text-blue-600 xl:translate-x-32 hidden lg:flex">
          <ArrowUp size={24} />
        </div>

        {/* --- Top Bar --- */}
        <div className="bg-[#1d4ed8] text-white flex justify-between items-center px-4 py-2 text-sm">
          <div className="flex gap-4 items-center">
            <span>সাভার স্টুডেন্ট কমিউনিটি</span>
            <div className="flex bg-[#1e40af] rounded overflow-hidden">
              <button className="px-3 hover:bg-black/10 flex items-center gap-1 py-1">
                অধিনস্থ দপ্তর <ChevronDown size={14} />
              </button>
              <button className="px-3 hover:bg-black/10 flex items-center gap-1 py-1">
                শাখা <ChevronDown size={14} />
              </button>
              <button className="bg-[#ee2d24] px-4 font-bold py-1">দেখুন</button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="এখানে খুঁজুন..." 
                className="pl-3 pr-8 py-1 rounded-full text-black outline-none w-48 text-sm"
              />
              <Search size={16} className="absolute right-2 top-1.5 text-gray-500" />
            </div>
            <button className="flex items-center gap-1 font-semibold hover:text-gray-200">
              <Globe size={16} /> English
            </button>
          </div>
        </div>

        {/* --- Hero Banner --- */}
        <div 
          className="h-[200px] bg-cover bg-center relative"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=2000')" 
          }}
        >
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
          
          <div className="absolute inset-0 flex items-center px-8">
            <div className="flex gap-4 items-center mb-4">
              {/* Logo placeholder */}
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center p-1 shadow border-2 border-blue-500">
                <div className="w-full h-full bg-[#1d4ed8] rounded-full flex items-center justify-center text-white text-3xl font-bold border-2 border-red-500">
                  <span className="font-tiro">S</span>
                </div>
              </div>
              <div className="text-white drop-shadow-md">
                <h1 className="text-4xl font-bold font-tiro tracking-wide mb-1">সাভার স্টুডেন্ট কমিউনিটি</h1>
                <p className="text-xl">শিক্ষার্থীদের কল্যাণে নিবেদিত একটি স্বেচ্ছাসেবী সংগঠন</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- Nav Bar --- */}
        <nav className="bg-[#2563eb] text-white flex justify-between px-2 text-base font-medium sticky top-0 z-10 shadow-md">
          <div className="flex">
            <button className="px-4 py-3 hover:bg-[#1d4ed8] flex items-center">
              <Home size={20} />
            </button>
            <button className="px-4 py-3 hover:bg-[#1d4ed8] flex items-center gap-1">
              আমাদের সম্পর্কিত <ChevronDown size={16} />
            </button>
            <button className="px-4 py-3 hover:bg-[#1d4ed8] flex items-center gap-1">
              কমিটি সমূহ <ChevronDown size={16} />
            </button>
            <button className="px-4 py-3 hover:bg-[#1d4ed8] flex items-center gap-1">
              প্রকল্পসমূহ <ChevronDown size={16} />
            </button>
            <button className="px-4 py-3 hover:bg-[#1d4ed8] flex items-center gap-1">
              যোগাযোগ ও মতামত <ChevronDown size={16} />
            </button>
            <button className="px-4 py-3 hover:bg-[#1d4ed8] flex items-center gap-1">
              গ্যালারি <ChevronDown size={16} />
            </button>
          </div>
          <div className="flex">
            <button className="px-4 py-3 bg-[#3b82f6] hover:bg-[#1d4ed8] flex items-center gap-1 font-bold">
              <span className="font-sans">≡</span> আরও
            </button>
          </div>
        </nav>

        {/* --- Main Body Flex/Grid --- */}
        <div className="p-4 grid grid-cols-1 md:grid-cols-12 gap-6 relative">
          
          {/* Main Content Area */}
          <div className="md:col-span-8 flex flex-col gap-6">
            
            {/* Notice Board */}
            <div className="border border-gray-200 rounded">
              <div className="flex items-center gap-2 p-4 pb-2 border-b-2 border-gray-100">
                <FileText className="text-blue-600" size={24} />
                <h2 className="text-2xl font-bold text-gray-800">নোটিশ বোর্ড</h2>
              </div>
              
              <div className="flex flex-col">
                {/* Notice Item 1 */}
                <a href="#" className="flex items-center justify-between p-4 border-b border-dashed border-gray-300 hover:bg-gray-50 transition">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0"></div>
                    <div>
                      <p className="text-gray-800 hover:text-[#1d4ed8] font-medium transition cursor-pointer text-[15px]">
                        সাভার স্টুডেন্ট কমিউনিটির নতুন কার্যকরী কমিটি গঠন প্রসঙ্গে
                      </p>
                      <div className="flex gap-2 items-center mt-2 text-sm text-gray-500">
                        <Calendar size={14} /> ০৫-০৩-২০২৬ 
                        <span className="bg-[#ee2d24] text-white text-xs px-2 py-0.5 rounded-full">নতুন</span>
                        <span className="bg-[#f0ece1] text-gray-700 text-xs px-2 py-0.5 rounded-full">সাধারণ</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-gray-400 shrink-0" />
                </a>

                {/* Notice Item 2 */}
                <a href="#" className="flex items-center justify-between p-4 border-b border-dashed border-gray-300 hover:bg-gray-50 transition">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0"></div>
                    <div>
                      <p className="text-gray-800 hover:text-[#1d4ed8] font-medium transition cursor-pointer text-[15px]">
                        সুবিধাবঞ্চিত শিশুদের জন্য শীতবস্ত্র বিতরণ কর্মসূচি ও স্বেচ্ছাসেবক আহ্বান
                      </p>
                      <div className="flex gap-2 items-center mt-2 text-sm text-gray-500">
                        <Calendar size={14} /> ০১-০৩-২০২৬ 
                        <span className="bg-[#ee2d24] text-white text-xs px-2 py-0.5 rounded-full">নতুন</span>
                        <span className="bg-[#f0ece1] text-gray-700 text-xs px-2 py-0.5 rounded-full">সাধারণ</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-gray-400 shrink-0" />
                </a>

                {/* Notice Item 3 */}
                <a href="#" className="flex items-center justify-between p-4 hover:bg-gray-50 transition">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0"></div>
                    <div>
                      <p className="text-gray-800 hover:text-[#1d4ed8] font-medium transition cursor-pointer text-[15px]">
                        রক্তদান কর্মসূচি ও ফ্রি ব্লাড গ্রুপিং ক্যাম্পেইন - ২০২৬ আয়োজন প্রসঙ্গে
                      </p>
                      <div className="flex gap-2 items-center mt-2 text-sm text-gray-500">
                        <Calendar size={14} /> ২৮-০২-২০২৬ 
                        <span className="bg-[#ee2d24] text-white text-xs px-2 py-0.5 rounded-full">নতুন</span>
                        <span className="bg-[#f0ece1] text-gray-700 text-xs px-2 py-0.5 rounded-full">সাধারণ</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-gray-400 shrink-0" />
                </a>
              </div>

              <div className="flex justify-end p-4 pt-2">
                <button className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white px-4 py-1.5 rounded text-sm flex items-center gap-1 transition">
                  সকল নোটিশ দেখুন <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* News Ticker */}
            <div className="border border-gray-200 rounded bg-[#fcfcfc] flex items-center overflow-hidden">
              <div className="bg-[#e9ded5] text-[#ee2d24] font-bold px-4 py-3 shrink-0 uppercase tracking-widest relative">
                খবর
                <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-4 h-4 bg-[#e9ded5] rotate-45 z-0"></div>
              </div>
              <div className="flex-1 overflow-hidden px-4">
                <div className="text-gray-600 truncate text-sm">
                  সাভার স্টুডেন্ট কমিউনিটির উদ্যোগে আয়োজিত হতে যাচ্ছে বই পড়া উৎসব...
                </div>
              </div>
              <button className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white px-4 py-3 text-sm font-medium shrink-0">
                সকল
              </button>
            </div>

            {/* Latest News Items */}
            <div>
              <div className="bg-[#1d4ed8] text-white px-3 py-2 font-bold flex items-center gap-2">
                সর্বশেষ খবর
              </div>
              <div className="border border-t-0 border-gray-200 p-2 flex flex-col gap-2">
                <a href="#" className="flex gap-2 items-start text-sm text-gray-700 hover:text-blue-700 mt-2">
                  <CheckCircle size={14} className="text-blue-600 shrink-0 mt-0.5" />
                  <span>সাভার অঞ্চলে বৃক্ষরোপণ কর্মসূচিতে অংশগ্রহণকারীদের সার্টিফিকেট প্রদান।</span>
                </a>
                <a href="#" className="flex gap-2 items-start text-sm text-gray-700 hover:text-blue-700 border-b border-dotted border-gray-300 pb-2">
                  <CheckCircle size={14} className="text-blue-600 shrink-0 mt-0.5" />
                  <span>আসন্ন এসএসসি পরীক্ষার্থীদের জন্য ফ্রি দিকনির্দেশনামূলক সেমিনার অনুষ্ঠিত।</span>
                </a>
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="md:col-span-4 flex flex-col gap-4">
            
            {/* Person Card 1 */}
            <div className="border border-gray-200 rounded overflow-hidden">
              <div className="bg-[#2563eb] text-white font-bold p-2 text-center text-sm shadow-sm z-10 relative">
                সভাপতি
              </div>
              <div className="bg-[#f0f0f0]">
                <img 
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300&h=300" 
                  alt="President" 
                  className="w-full aspect-square object-cover"
                />
              </div>
              <div className="p-3 text-center bg-white border-t-4 border-[#1e40af]">
                <h3 className="font-bold text-gray-800 text-lg">জনাব শরীফুল আজম</h3>
                <p className="text-sm text-gray-600 font-medium">সভাপতি, সাভার স্টুডেন্ট কমিউনিটি</p>
              </div>
            </div>

            {/* Person Card 2 */}
            <div className="border border-gray-200 rounded overflow-hidden mt-2">
              <div className="bg-[#2563eb] text-white font-bold p-2 text-center text-sm shadow-sm z-10 relative">
                সাধারণ সম্পাদক
              </div>
              <div className="bg-[#f0f0f0]">
                <img 
                  src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=300&h=300" 
                  alt="General Secretary" 
                  className="w-full aspect-square object-cover"
                />
              </div>
              <div className="p-3 text-center bg-white border-t-4 border-[#1e40af]">
                <h3 className="font-bold text-gray-800 text-lg">জনাব রাকিবুল ইসলাম</h3>
                <p className="text-sm text-gray-600 font-medium">সাধারণ সম্পাদক, সাভার স্টুডেন্ট কমিউনিটি</p>
              </div>
            </div>

            {/* Helpline / Info Banner */}
            <div className="border border-gray-200 rounded p-4 text-center mt-2 flex flex-col items-center shadow-inner bg-gradient-to-b from-white to-gray-50">
              <div className="bg-red-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-2 animate-pulse">
                ৯৯৯
              </div>
              <p className="font-bold text-gray-800">জাতীয় জরুরী সেবা</p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

