import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Search, Globe, Home, ChevronDown, ArrowUp, User } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function PublicLayout() {
  const { content } = useAppContext();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-[#1d4ed8]' : 'hover:bg-[#1d4ed8]';
  };

  return (
    <div className="min-h-screen text-gray-800 pb-10">
      <div className="max-w-[1000px] mx-auto bg-white min-h-screen shadow-2xl overflow-hidden relative flex flex-col">
        
        {/* Scroll to Top Button (Floating) */}
        <div className="fixed bottom-10 right-10 bg-white border border-gray-200 p-2 rounded-full shadow-lg cursor-pointer text-gray-500 hover:text-blue-600 xl:translate-x-32 hidden lg:flex">
          <ArrowUp size={24} />
        </div>

        {/* --- Top Bar --- */}
        <div className="bg-[#1d4ed8] text-white flex flex-col md:flex-row justify-between items-center px-4 py-2 text-sm gap-3">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center w-full md:w-auto text-center sm:text-left">
            <span className="font-bold hidden sm:block">{content.siteTitle}</span>
            <div className="flex bg-[#1e40af] rounded overflow-hidden w-full sm:w-auto justify-center">
              <button className="px-3 hover:bg-black/10 flex items-center gap-1 py-1 flex-1 sm:flex-none justify-center">
                অধিনস্থ দপ্তর <ChevronDown size={14} />
              </button>
              <button className="bg-[#ee2d24] px-4 font-bold py-1">দেখুন</button>
            </div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-auto order-last sm:order-none">
              <input 
                type="text" 
                placeholder="এখানে খুঁজুন..." 
                className="pl-3 pr-8 py-1.5 sm:py-1 rounded-full text-black outline-none w-full sm:w-48 text-sm"
              />
              <Search size={16} className="absolute right-3 sm:right-2 top-2 sm:top-1.5 text-gray-500" />
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1 font-semibold hover:text-gray-200">
                <Globe size={16} /> English
              </button>
              <Link to="/admin" className="flex items-center gap-1 bg-[#2563eb] px-3 py-1 rounded text-white shadow-sm hover:bg-blue-600 font-medium text-xs sm:text-sm">
                <User size={14} /> এডমিন
              </Link>
            </div>
          </div>
        </div>

        {/* --- Hero Banner --- */}
        <div 
          className="h-[200px] bg-cover bg-center relative shrink-0"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=2000')" 
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          
          <div className="absolute inset-0 flex items-center px-4 md:px-8">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center mb-4 text-center sm:text-left w-full">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center p-1 shadow border-2 border-blue-500 shrink-0">
                <div className="w-full h-full bg-[#1d4ed8] rounded-full flex items-center justify-center text-white text-2xl md:text-3xl font-bold border-2 border-red-500">
                  <span className="font-tiro">{content.logoText}</span>
                </div>
              </div>
              <div className="text-white drop-shadow-md">
                <h1 className="text-2xl md:text-4xl font-bold font-tiro tracking-wide mb-1 leading-tight">{content.siteTitle}</h1>
                <p className="text-sm md:text-xl opacity-90">{content.siteSubtitle}</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- Nav Bar --- */}
        <nav className="bg-[#2563eb] text-white flex justify-between text-sm md:text-base font-medium sticky top-0 z-10 shadow-md shrink-0 overflow-x-auto no-scrollbar whitespace-nowrap">
          <div className="flex flex-nowrap shrink-0">
            <Link to="/" className={`px-4 py-3 flex items-center transition shrink-0 ${isActive('/')}`}>
              <Home size={20} />
            </Link>
            <Link to="/about" className={`px-3 md:px-4 py-3 flex items-center gap-1 transition shrink-0 ${isActive('/about')}`}>
              আমাদের সম্পর্কিত <ChevronDown size={14} className="opacity-50 hidden md:block"/>
            </Link>
            <Link to="/committees" className={`px-3 md:px-4 py-3 flex items-center gap-1 transition shrink-0 ${isActive('/committees')}`}>
              কমিটি সমূহ <ChevronDown size={14} className="opacity-50 hidden md:block"/>
            </Link>
            <Link to="/projects" className={`px-3 md:px-4 py-3 flex items-center gap-1 transition shrink-0 ${isActive('/projects')}`}>
              প্রকল্পসমূহ <ChevronDown size={14} className="opacity-50 hidden md:block"/>
            </Link>
            <Link to="/contact" className={`px-3 md:px-4 py-3 flex items-center gap-1 transition shrink-0 ${isActive('/contact')}`}>
              যোগাযোগ <ChevronDown size={14} className="opacity-50 hidden md:block"/>
            </Link>
            <Link to="/gallery" className={`px-3 md:px-4 py-3 flex items-center gap-1 transition shrink-0 ${isActive('/gallery')}`}>
              গ্যালারি <ChevronDown size={14} className="opacity-50 hidden md:block"/>
            </Link>
          </div>
          <div className="flex shrink-0 sticky right-0">
            <button className="px-4 py-3 bg-[#3b82f6] hover:bg-[#1d4ed8] flex items-center gap-1 font-bold shadow-[-4px_0_10px_rgba(37,99,235,0.5)] md:shadow-none">
              <span className="font-sans">≡</span> <span className="hidden md:inline">আরও</span>
            </button>
          </div>
        </nav>

        {/* --- News Ticker --- */}
        <div className="border-b border-gray-200 bg-[#fcfcfc] flex items-center overflow-hidden shrink-0 shadow-sm relative z-0 text-sm md:text-base">
          <div className="bg-[#e9ded5] text-[#ee2d24] font-bold px-3 md:px-4 py-2.5 md:py-3 shrink-0 uppercase tracking-widest relative z-10">
            খবর
            <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-4 h-4 bg-[#e9ded5] rotate-45 z-0"></div>
          </div>
          <div className="flex-1 ticker-wrap px-2 md:px-4">
            <div className="ticker-text text-gray-600 md:text-[15px] font-medium py-2.5 md:py-3">
              {content.newsText}
            </div>
          </div>
          <button className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white px-3 md:px-4 py-2.5 md:py-3 font-medium shrink-0 relative z-10">
            সকল
          </button>
        </div>

        {/* --- Main Content Area (Outlet) --- */}
        <div className="flex-1 p-4">
          <Outlet />
        </div>
        
        {/* Footer */}
        <footer className="bg-gray-800 text-white p-6 mt-auto shrink-0">
          <div className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} {content.siteTitle}. সর্বস্বত্ব সংরক্ষিত। | <Link to="/admin" className="text-blue-500 hover:underline">এডমিন প্যানেল</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
