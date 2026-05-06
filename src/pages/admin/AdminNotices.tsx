import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Notice } from '../../types';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

export default function AdminNotices() {
  const { content, updateContent } = useAppContext();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Notice>>({});
  const [isAdding, setIsAdding] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleEdit = (notice: Notice) => {
    setEditingId(notice.id);
    setFormData(notice);
    setIsAdding(false);
    setErrorMsg(null);
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({ id: Date.now().toString(), title: '', date: new Date().toLocaleDateString('bn-BD'), isNew: true, type: 'সাধারণ' });
    setErrorMsg(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('আপনি কি এই নোটিশটি মুছে ফেলতে চান?')) {
      const updated = content.notices.filter(n => n.id !== id);
      const result = await updateContent({ notices: updated });
      if (!result.success) {
         setErrorMsg(result.message || 'Error deleting notice');
      } else {
         setErrorMsg(null);
      }
    }
  };

  const handleSave = async () => {
    if (!formData.title) return;
    setErrorMsg(null);
    
    let updatedNotices;
    if (isAdding) {
      updatedNotices = [formData as Notice, ...content.notices];
    } else {
      updatedNotices = content.notices?.map(n => n.id === editingId ? formData as Notice : n) || [];
    }
    
    const result = await updateContent({ notices: updatedNotices });
    
    if (result.success) {
      setEditingId(null);
      setIsAdding(false);
      setFormData({});
    } else {
      setErrorMsg(result.message || 'Unknown error occurred while saving.');
    }
  };

  return (
    <div className="max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">নোটিশ বোর্ড পরিচালনা</h1>
        <button 
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm flex items-center gap-2 transition"
        >
          <Plus size={18} /> নতুন নোটিশ যোগ করুন
        </button>
      </div>

      {errorMsg && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 flex justify-between items-center">
          <p>{errorMsg}</p>
          <button onClick={() => setErrorMsg(null)} className="text-red-500 hover:text-red-700">
            <X size={18} />
          </button>
        </div>
      )}

      {(isAdding || editingId) && (
        <div className="bg-white rounded-xl shadow-sm border border-blue-200 p-6 mb-6">
          <h2 className="text-lg font-bold mb-4">{isAdding ? 'নতুন নোটিশ' : 'নোটিশ এডিট করুন'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">নোটিশের শিরোনাম</label>
              <input 
                type="text" 
                value={formData.title || ''} 
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">তারিখ</label>
              <input 
                type="text" 
                value={formData.date || ''} 
                onChange={e => setFormData({...formData, date: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">ধরন</label>
              <input 
                type="text" 
                value={formData.type || ''} 
                onChange={e => setFormData({...formData, type: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="flex items-center gap-2 md:col-span-2 mt-2">
              <input 
                type="checkbox" 
                id="isNew"
                checked={formData.isNew || false} 
                onChange={e => setFormData({...formData, isNew: e.target.checked})}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <label htmlFor="isNew" className="text-sm font-semibold text-gray-700">নতুন ট্যাগ যুক্ত করুন (New Badge)</label>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-blue-700"><Save size={16}/> সেভ করুন</button>
            <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-gray-300"><X size={16}/> বাতিল</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm">
              <th className="px-6 py-3 font-semibold">শিরোনাম</th>
              <th className="px-6 py-3 font-semibold w-32">তারিখ</th>
              <th className="px-6 py-3 font-semibold w-24">স্ট্যাটাস</th>
              <th className="px-6 py-3 font-semibold text-center w-32">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {content.notices?.map(notice => (
              <tr key={notice.id} className="border-b last:border-0 border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-800">{notice.title}</td>
                <td className="px-6 py-4 text-gray-600 text-sm">{notice.date}</td>
                <td className="px-6 py-4">
                  {notice.isNew ? <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold">নতুন</span> : <span className="text-gray-400 text-xs">-</span>}
                </td>
                <td className="px-6 py-4 flex items-center justify-center gap-3">
                  <button onClick={() => handleEdit(notice)} className="text-blue-500 hover:text-blue-700 transition" title="এডিট"><Edit2 size={18}/></button>
                  <button onClick={() => handleDelete(notice.id)} className="text-red-500 hover:text-red-700 transition" title="ডিলিট"><Trash2 size={18}/></button>
                </td>
              </tr>
            ))}
            {content.notices.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">কোনো নোটিশ পাওয়া যায়নি।</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
