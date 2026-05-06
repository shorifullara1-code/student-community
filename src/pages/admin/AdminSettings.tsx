import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Save } from 'lucide-react';

export default function AdminSettings() {
  const { content, updateContent } = useAppContext();
  const [formData, setFormData] = useState({
    siteTitle: content.siteTitle,
    siteSubtitle: content.siteSubtitle,
    logoText: content.logoText,
    aboutText: content.aboutText,
    newsText: content.newsText
  });
  const [saved, setSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setSaved(false);
    setErrorMsg(null);
  };

  const handleSave = async () => {
    setErrorMsg(null);
    setSaved(false);
    const result = await updateContent(formData);
    
    if (result.success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      setErrorMsg(result.message || 'Unknown error occurred while saving.');
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">ওয়েবসাইটের তথ্য পরিচালনা</h1>
        <button 
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium shadow-sm flex items-center gap-2 transition"
        >
          <Save size={18} /> সেভ করুন
        </button>
      </div>

      {errorMsg && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errorMsg}
        </div>
      )}

      {saved && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
          তথ্য সফলভাবে সেভ করা হয়েছে!
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">ওয়েবসাইটের নাম</label>
              <input 
                type="text" 
                name="siteTitle"
                value={formData.siteTitle} 
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">লোগোর অক্ষর (Logo Text)</label>
              <input 
                type="text" 
                name="logoText"
                value={formData.logoText} 
                onChange={handleChange}
                maxLength={2}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">সাবটাইটেল / স্লোগান</label>
            <input 
              type="text" 
              name="siteSubtitle"
              value={formData.siteSubtitle} 
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">চলমান খবর (Ticker Text)</label>
            <input 
              type="text" 
              name="newsText"
              value={formData.newsText} 
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">আমাদের সম্পর্কে (About Us)</label>
            <textarea 
              name="aboutText"
              value={formData.aboutText} 
              onChange={handleChange}
              rows={6}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-y"
            ></textarea>
          </div>

        </div>
      </div>
    </div>
  );
}
