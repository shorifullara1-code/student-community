import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Users, FileText, CheckCircle, Clock, Globe, Settings, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const { content } = useAppContext();

  const stats = [
    { title: 'মোট নোটিশ', value: content.notices?.length || 0, icon: <FileText size={24} className="text-blue-600" />, bg: 'bg-blue-100', border: 'border-blue-200' },
    { title: 'কমিটি সদস্য', value: content.leaders?.length || 0, icon: <Users size={24} className="text-emerald-600" />, bg: 'bg-emerald-100', border: 'border-emerald-200' },
    { title: 'মোট খবর', value: content.newsArticles?.length || 0, icon: <Globe size={24} className="text-purple-600" />, bg: 'bg-purple-100', border: 'border-purple-200' },
    { title: 'পেন্ডিং প্রজেক্ট', value: '০', icon: <Clock size={24} className="text-amber-600" />, bg: 'bg-amber-100', border: 'border-amber-200' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-tiro tracking-tight">ড্যাশবোর্ড ওভারভিউ</h1>
          <p className="text-gray-500 mt-1">ওয়েবসাইটের বর্তমান অবস্থার একটি সারাংশ</p>
        </div>
        <div className="text-sm bg-white border border-gray-200 px-4 py-2 rounded-lg text-gray-600 shadow-sm flex items-center gap-2">
           <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
           সিস্টেম লাইভ আছে
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className={`bg-white rounded-2xl shadow-sm border ${stat.border} p-6 flex flex-col hover:shadow-md transition duration-300 relative overflow-hidden group`}>
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-white to-gray-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
            
            <div className="flex items-center gap-4 relative z-10">
              <div className={`p-4 rounded-xl ${stat.bg}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-1">{stat.title}</p>
                <h3 className="text-3xl font-black text-gray-900 tracking-tight">{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Quick Access */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden lg:col-span-1">
          <div className="bg-gray-50/50 border-b border-gray-100 p-5 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800">কুইক এক্সেস</h2>
          </div>
          <div className="p-5 grid grid-cols-2 gap-4">
            <Link to="/admin/news" className="group p-4 border border-gray-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all flex flex-col items-center justify-center gap-3 text-gray-700 shadow-sm">
              <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                 <Globe size={20} />
              </div>
              <span className="font-semibold text-sm">খবর যোগ</span>
            </Link>
            <Link to="/admin/notices" className="group p-4 border border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all flex flex-col items-center justify-center gap-3 text-gray-700 shadow-sm">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                 <FileText size={20} />
              </div>
              <span className="font-semibold text-sm">নোটিশ যোগ</span>
            </Link>
            <Link to="/admin/leaders" className="group p-4 border border-gray-200 rounded-xl hover:border-emerald-400 hover:bg-emerald-50 transition-all flex flex-col items-center justify-center gap-3 text-gray-700 shadow-sm">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                 <Users size={20} />
              </div>
              <span className="font-semibold text-sm">কমিটি</span>
            </Link>
            <Link to="/admin/settings" className="group p-4 border border-gray-200 rounded-xl hover:border-amber-400 hover:bg-amber-50 transition-all flex flex-col items-center justify-center gap-3 text-gray-700 shadow-sm">
              <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                 <Settings size={20} />
              </div>
              <span className="font-semibold text-sm">সেটিংস</span>
            </Link>
          </div>
        </div>

        {/* Recent Notices */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden lg:col-span-2 flex flex-col">
          <div className="bg-gray-50/50 border-b border-gray-100 p-5 flex justify-between items-center shrink-0">
            <h2 className="text-lg font-bold text-gray-800">সাম্প্রতিক নোটিশসমূহ</h2>
            <Link to="/admin/notices" className="text-blue-600 text-sm font-semibold hover:text-blue-800 flex items-center gap-1 group">
               সব দেখুন <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="p-5 flex-1 overflow-auto space-y-1">
            {(!content.notices || content.notices.length === 0) ? (
               <div className="h-full flex flex-col items-center justify-center text-gray-400 py-10">
                 <FileText size={32} className="mb-2 opacity-50" />
                 <p>সাম্প্রতিক কোনো নোটিশ নেই</p>
               </div>
            ) : (
              content.notices?.slice(0, 4).map(notice => (
                <Link to="/admin/notices" key={notice.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg group transition border border-transparent hover:border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                       <FileText size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm group-hover:text-blue-600 transition">{notice.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{notice.date} • {notice.type}</p>
                    </div>
                  </div>
                  {notice.isNew && <span className="bg-red-100 text-red-600 px-2.5 py-1 rounded-md text-xs font-bold shrink-0">নতুন</span>}
                </Link>
              ))
            )}
          </div>
        </div>
        
      </div>

    </div>
  );
}
