import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Settings, LogOut, LayoutDashboard, FileText, Users, Globe, Menu, Shield } from 'lucide-react';

export default function AdminLayout() {
  const location = useLocation();

  const links = [
    { name: 'ড্যাশবোর্ড', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'ওয়েবসাইটের তথ্য', path: '/admin/settings', icon: <Settings size={20} /> },
    { name: 'নোটিশ বোর্ড', path: '/admin/notices', icon: <FileText size={20} /> },
    { name: 'নেতৃবৃন্দ', path: '/admin/leaders', icon: <Users size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col shrink-0">
        <div className="p-4 flex items-center gap-3 border-b border-gray-800">
          <div className="bg-blue-500 text-white p-2 rounded-lg">
            <Shield size={24} />
          </div>
          <h2 className="text-xl font-bold tracking-wide">এডমিন প্যানেল</h2>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-2">
          {links.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  active ? 'bg-blue-600 text-white font-medium shadow-md' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800 flex flex-col gap-2">
          <Link to="/" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition">
            <Globe size={18} /> ওয়েবসাইটে যান
          </Link>
          <button className="flex items-center gap-2 px-4 py-2 hover:bg-red-500 hover:text-white rounded-lg text-gray-400 transition w-full text-left">
            <LogOut size={18} /> লগ আউট
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white px-8 py-4 shadow-sm border-b border-gray-200 flex justify-between items-center z-10">
          <div className="flex items-center gap-2 text-gray-800 font-bold text-xl">
             <Menu size={24} className="text-gray-500 cursor-pointer lg:hidden" />
             সাভার স্টুডেন্ট কমিউনিটি
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex justify-center items-center font-bold">
              A
            </div>
            <div className="text-sm">
              <p className="font-bold text-gray-800">এডমিন</p>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <div className="p-8 flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
