import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Users, FileText, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const { content } = useAppContext();

  const stats = [
    { title: 'মোট নোটিশ', value: content.notices.length, icon: <FileText size={24} className="text-blue-500" />, bg: 'bg-blue-50' },
    { title: 'কমিটি সদস্য', value: content.leaders.length, icon: <Users size={24} className="text-blue-500" />, bg: 'bg-blue-50' },
    { title: 'সর্বশেষ খবর', value: content.latestNews.length, icon: <CheckCircle size={24} className="text-purple-500" />, bg: 'bg-purple-50' },
    { title: 'পেন্ডিং রিকোয়েস্ট', value: '০', icon: <Clock size={24} className="text-orange-500" />, bg: 'bg-orange-50' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">স্বাগতম, এডমিন ড্যাশবোর্ড</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center gap-4 hover:shadow-md transition">
            <div className={`p-4 rounded-full ${stat.bg}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">{stat.title}</p>
              <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-lg font-bold text-gray-800">সাম্প্রতিক নোটিশ</h2>
            <Link to="/admin/notices" className="text-blue-600 text-sm font-medium hover:underline">সব দেখুন</Link>
          </div>
          <div className="space-y-4">
            {content.notices.slice(0, 3).map(notice => (
              <div key={notice.id} className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium text-gray-800 text-sm">{notice.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{notice.date}</p>
                </div>
                {notice.isNew && <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-xs font-bold">নতুন</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-lg font-bold text-gray-800">কুইক এক্সেস</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/admin/settings" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition flex flex-col items-center justify-center gap-2 text-gray-700">
              <FileText size={24} className="text-blue-600" />
              <span className="font-medium">সাইট সেটিং</span>
            </Link>
            <Link to="/admin/leaders" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition flex flex-col items-center justify-center gap-2 text-gray-700">
              <Users size={24} className="text-blue-600" />
              <span className="font-medium">লিডার ম্যানেজমেন্ট</span>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
