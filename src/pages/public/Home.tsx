import React from 'react';
import { FileText, ChevronRight, Calendar, CheckCircle, Info, HeartHandshake, BookOpen, Users, Link as LinkIcon, Camera } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';

export default function Home() {
  const { content } = useAppContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative">
      
      {/* Main Content Area */}
      <div className="md:col-span-8 flex flex-col gap-6">
        
        {/* About Us Summary */}
        <div className="border border-gray-200 rounded shadow-sm bg-white p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-0 opacity-50"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Info className="text-blue-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-800 font-tiro">আমাদের সম্পর্কে</h2>
            </div>
            <p className="text-gray-700 leading-relaxed max-h-24 overflow-hidden relative">
              {content.aboutText}
              <span className="absolute bottom-0 right-0 bg-gradient-to-l from-white via-white to-transparent w-full h-8 block"></span>
            </p>
            <Link to="/about" className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1 mt-2 inline-flex">
              বিস্তারিত পড়ুন <ChevronRight size={14} />
            </Link>
          </div>
        </div>

        {/* Notice Board */}
        <div className="border border-gray-200 rounded shadow-sm bg-white">
          <div className="flex items-center gap-2 p-4 pb-2 border-b-2 border-gray-100">
            <FileText className="text-blue-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-800 font-tiro">নোটিশ বোর্ড</h2>
          </div>
          
          <div className="flex flex-col">
            {content.notices?.map((notice) => (
              <a key={notice.id} href="#" className="flex items-center justify-between p-4 border-b last:border-b-0 border-dashed border-gray-300 hover:bg-gray-50 transition group">
                <div className="flex items-start gap-3 w-full">
                  <div className="mt-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0 group-hover:bg-[#ee2d24] transition-colors"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 group-hover:text-[#1d4ed8] font-medium transition cursor-pointer text-sm md:text-[15px] leading-snug">
                      {notice.title}
                    </p>
                    <div className="flex flex-wrap gap-2 items-center mt-2 text-xs md:text-sm text-gray-500">
                      <span className="flex items-center gap-1 shrink-0"><Calendar size={14} /> {notice.date}</span>
                      {notice.isNew && <span className="bg-[#ee2d24] text-white text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0">নতুন</span>}
                      {notice.type && <span className="bg-[#f0ece1] text-gray-700 text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0">{notice.type}</span>}
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-400 shrink-0 group-hover:text-[#1d4ed8] transition-colors hidden sm:block ml-2" />
              </a>
            ))}
          </div>

          <div className="flex justify-end p-4 pt-3 bg-gray-50 rounded-b">
            <button className="bg-[#1d4ed8] hover:bg-[#1e40af] shadow-sm text-white px-4 py-1.5 rounded text-sm flex items-center gap-1 transition">
              সকল নোটিশ দেখুন <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Our Activities */}
        <div>
          <div className="flex items-center gap-2 mb-4 mt-2">
            <HeartHandshake className="text-blue-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-800 font-tiro">আমাদের কার্যক্রম</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <BookOpen size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">শিক্ষামূলক সহায়তা</h3>
              <p className="text-gray-600 text-sm">গরিব ও মেধাবী শিক্ষার্থীদের শিক্ষা সামগ্রী প্রদান, বৃত্তি প্রদান এবং ক্যারিয়ার গাইডেন্স সেমিনার আয়োজন।</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-4">
                <HeartHandshake size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">স্বেচ্ছায় রক্তদান</h3>
              <p className="text-gray-600 text-sm">নিয়মিত রক্তদান কর্মসূচির আয়োজন এবং মুমূর্ষু রোগীদের জন্য জরুরি রক্তের ব্যবস্থা করা।</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">সামাজিক উন্নয়ন</h3>
              <p className="text-gray-600 text-sm">শীতবস্ত্র বিতরণ, বৃক্ষরোপণ, এবং দুর্যোগে ক্ষতিগ্রস্তদের মধ্যে ত্রাণ সহায়তা প্রদান।</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4">
                <FileText size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">সাংস্কৃতিক অনুষ্ঠান</h3>
              <p className="text-gray-600 text-sm">বার্ষিক বনভোজন, বিতর্ক প্রতিযোগিতা এবং জাতীয় দিবসগুলো পালনের মাধ্যমে সংস্কৃতির চর্চা।</p>
            </div>
          </div>
        </div>

        {/* Latest News Items */}
        <div className="mt-2">
          <div className="shadow-sm">
            <div className="bg-[#1d4ed8] text-white px-3 py-2 font-bold flex items-center gap-2">
              সর্বশেষ খবর
            </div>
            <div className="border border-t-0 border-gray-200 p-3 bg-white flex flex-col gap-3 rounded-b">
              {content.latestNews?.map((news, idx) => (
                <a key={idx} href="#" className={`flex gap-2 items-start text-[15px] text-gray-700 hover:text-blue-700 ${idx !== (content.latestNews?.length || 0) - 1 ? 'border-b border-dotted border-gray-300 pb-3' : ''}`}>
                  <CheckCircle size={16} className="text-blue-600 shrink-0 mt-0.5" />
                  <span>{news}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Photo Gallery Preview */}
        <div className="border border-gray-200 rounded shadow-sm bg-white overflow-hidden mt-2">
          <div className="flex items-center justify-between p-4 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Camera className="text-blue-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-800 font-tiro">ফটো গ্যালারি</h2>
            </div>
          </div>
          <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=400&h=300" alt="Gallery 1" className="w-full h-24 sm:h-32 object-cover rounded shadow-sm hover:opacity-90 transition cursor-pointer" />
            <img src="https://images.unsplash.com/photo-1526976663112-00a1c50b25ba?auto=format&fit=crop&q=80&w=400&h=300" alt="Gallery 2" className="w-full h-24 sm:h-32 object-cover rounded shadow-sm hover:opacity-90 transition cursor-pointer" />
            <img src="https://images.unsplash.com/photo-1511632765486-a01c80cb41add?auto=format&fit=crop&q=80&w=400&h=300" alt="Gallery 3" className="w-full h-24 sm:h-32 object-cover rounded shadow-sm hover:opacity-90 transition cursor-pointer hidden sm:block" />
          </div>
          <div className="flex justify-center p-3 bg-gray-50 border-t border-gray-100">
             <Link to="/gallery" className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1 transition">
              সম্পূর্ণ গ্যালারি দেখুন <ChevronRight size={14} />
            </Link>
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="bg-gradient-to-r from-blue-700 to-[#2563eb] rounded-lg p-5 sm:p-6 shadow-sm text-white flex flex-col sm:flex-row items-center justify-between gap-5 mt-2 text-center sm:text-left">
          <div>
            <h3 className="text-xl font-bold mb-2 font-tiro">কমিউনিটির সাথে যুক্ত হোন!</h3>
            <p className="text-sm opacity-90 max-w-md">আমাদের স্বেচ্ছাসেবক দলে যোগ দিয়ে সমাজের উন্নয়নে অবদান রাখুন। নতুন সদস্য নিবন্ধনের ফর্ম সংগ্রহ করতে যোগাযোগ করুন।</p>
          </div>
          <button className="bg-white text-blue-700 px-6 py-2.5 rounded shadow whitespace-nowrap font-bold hover:bg-gray-100 transition w-full sm:w-auto">
            নিবন্ধন করুন
          </button>
        </div>

        {/* Our Impact Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2 mb-2">
          <div className="bg-[#e9ded5] text-[#ee2d24] rounded-lg p-4 text-center shadow-sm">
            <h3 className="text-3xl font-bold font-mono mb-1">৫০০+</h3>
            <p className="text-sm font-bold">সদস্য</p>
          </div>
          <div className="bg-[#f0ece1] text-[#1d4ed8] rounded-lg p-4 text-center shadow-sm">
            <h3 className="text-3xl font-bold font-mono mb-1">৫০+</h3>
            <p className="text-sm font-bold">রক্তদান</p>
          </div>
          <div className="bg-[#e9ded5] text-[#ee2d24] rounded-lg p-4 text-center shadow-sm">
            <h3 className="text-3xl font-bold font-mono mb-1">২০+</h3>
            <p className="text-sm font-bold">প্রকল্প</p>
          </div>
          <div className="bg-[#f0ece1] text-[#1d4ed8] rounded-lg p-4 text-center shadow-sm">
            <h3 className="text-3xl font-bold font-mono mb-1">৩</h3>
            <p className="text-sm font-bold">বছর</p>
          </div>
        </div>

      </div>

      {/* Sidebar */}
      <div className="md:col-span-4 flex flex-col gap-4">
        
        {content.leaders?.map((leader) => (
          <div key={leader.id} className="border border-gray-200 rounded overflow-hidden shadow-sm bg-white">
            <div className="bg-[#2563eb] text-white font-bold p-2 text-center text-sm shadow-sm z-10 relative">
              {leader.role}
            </div>
            <div className="bg-[#f0f0f0]">
              <img 
                src={leader.image} 
                alt={leader.role} 
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="p-3 text-center bg-white border-t-4 border-[#1e40af]">
              <h3 className="font-bold text-gray-800 text-lg">{leader.name}</h3>
              <p className="text-sm text-gray-600 font-medium">{leader.title}</p>
            </div>
          </div>
        ))}

        {/* Important Links */}
        <div className="border border-gray-200 rounded shadow-sm bg-white mt-2 overflow-hidden">
          <div className="bg-[#2563eb] text-white font-bold p-2 text-center text-sm shadow-sm z-10 flex items-center justify-center gap-2">
            <LinkIcon size={16} /> গুরুত্বপূর্ণ লিংক
          </div>
          <div className="p-2 flex flex-col gap-1 bg-gray-50">
            <a href="#" className="bg-white border rounded p-2 text-sm text-gray-700 hover:text-blue-600 hover:border-blue-300 transition flex items-center gap-2">
              <ChevronRight size={14} className="text-gray-400" /> বাংলাদেশ জাতীয় তথ্য বাতায়ন
            </a>
            <a href="#" className="bg-white border rounded p-2 text-sm text-gray-700 hover:text-blue-600 hover:border-blue-300 transition flex items-center gap-2">
              <ChevronRight size={14} className="text-gray-400" /> শিক্ষা মন্ত্রণালয়
            </a>
            <a href="#" className="bg-white border rounded p-2 text-sm text-gray-700 hover:text-blue-600 hover:border-blue-300 transition flex items-center gap-2">
              <ChevronRight size={14} className="text-gray-400" /> ঢাকা শিক্ষা বোর্ড
            </a>
            <a href="#" className="bg-white border rounded p-2 text-sm text-gray-700 hover:text-blue-600 hover:border-blue-300 transition flex items-center gap-2">
              <ChevronRight size={14} className="text-gray-400" /> সাভার উপজেলা প্রশাসন
            </a>
          </div>
        </div>

        {/* Facebook Page Plugin */}
        <div className="border border-gray-200 rounded shadow-sm bg-white mt-2 overflow-hidden">
           <div className="bg-[#1877F2] text-white font-bold p-3 text-sm shadow-sm z-10 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                </svg>
               আমাদের ফেসবুক পেজ
            </div>
          </div>
          <div className="p-4 bg-gray-50 flex flex-col items-center justify-center">
             <div className="w-16 h-16 bg-white rounded-full shadow-sm border border-gray-200 mb-2 overflow-hidden flex items-center justify-center text-blue-600 font-bold text-2xl font-tiro p-2 relative">
                <div className="absolute inset-2 border border-red-500 rounded-full"></div>
                S
             </div>
             <p className="font-bold text-gray-800 text-sm">সাভার স্টুডেন্ট কমিউনিটি</p>
             <p className="text-xs text-gray-500 mb-3">5.2K likes</p>
             <button className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-1.5 rounded text-sm font-medium w-full flex justify-center items-center gap-2 transition">
               Like Page
             </button>
          </div>
        </div>

        {/* Helpline / Info Banner */}
        <div className="border border-gray-200 rounded p-4 text-center mt-2 flex flex-col items-center shadow-sm bg-gradient-to-b from-white to-gray-50">
          <div className="bg-red-500 text-white w-14 h-14 rounded-full flex items-center justify-center font-bold text-2xl mb-2 animate-pulse shadow-lg ring-4 ring-red-100">
            ৯৯৯
          </div>
          <p className="font-bold text-gray-800">জাতীয় জরুরী সেবা</p>
        </div>

      </div>

    </div>
  );
}
