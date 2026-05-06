import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Settings, LogOut, LayoutDashboard, FileText, Users, Globe, Menu, Shield, Lock, User } from 'lucide-react';

export default function AdminLayout() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem('admin_logged_in') === 'true'
  );
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const validUser = import.meta.env.VITE_ADMIN_USER || 'admin';
    const validPass = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

    if (username === validUser && password === validPass) {
      setIsLoggedIn(true);
      sessionStorage.setItem('admin_logged_in', 'true');
      setError('');
    } else {
      setError('ভুল ইউজারনেম অথবা পাসওয়ার্ড!');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_logged_in');
    setIsLoggedIn(false);
  };

  const links = [
    { name: 'ড্যাশবোর্ড', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'ওয়েবসাইটের তথ্য', path: '/admin/settings', icon: <Settings size={20} /> },
    { name: 'নোটিশ বোর্ড', path: '/admin/notices', icon: <FileText size={20} /> },
    { name: 'নেতৃবৃন্দ', path: '/admin/leaders', icon: <Users size={20} /> },
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border border-gray-200">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 text-white p-4 rounded-full shadow-md">
              <Shield size={40} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">এডমিন লগইন</h2>
          <p className="text-center text-gray-500 mb-8">নিরাপদ প্যানেলে অ্যাক্সেস করুন</p>
          
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded mb-4 text-sm text-center border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ইউজারনেম</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="admin"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">পাসওয়ার্ড</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg transition duration-200 mt-4 shadow-md"
            >
              লগইন করুন
            </button>
          </form>

          <div className="mt-6 text-center">
             <Link to="/" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
               &larr; ওয়েবসাইটে ফিরে যান
             </Link>
          </div>
        </div>
      </div>
    );
  }

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
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 hover:bg-red-500 hover:text-white rounded-lg text-gray-400 transition w-full text-left">
            <LogOut size={18} /> লগ আউট
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Top Header */}
        <header className="bg-white px-8 py-4 shadow-sm border-b border-gray-200 flex justify-between items-center z-10 shrink-0">
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
        <div className="p-4 md:p-8 flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
