import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Leader } from '../../types';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

export default function AdminLeaders() {
  const { content, updateContent } = useAppContext();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Leader>>({});
  const [isAdding, setIsAdding] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleEdit = (leader: Leader) => {
    setEditingId(leader.id);
    setFormData(leader);
    setIsAdding(false);
    setErrorMsg(null);
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({ id: Date.now().toString(), name: '', role: '', title: '', image: '' });
    setErrorMsg(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('আপনি কি এই সদস্যকে মুছে ফেলতে চান?')) {
      const updated = content.leaders.filter(n => n.id !== id);
      const result = await updateContent({ leaders: updated });
      if (!result.success) {
         setErrorMsg(result.message || 'Error deleting leader');
      } else {
         setErrorMsg(null);
      }
    }
  };

  const handleSave = async () => {
    if (!formData.name) return;
    setErrorMsg(null);
    
    let updated;
    if (isAdding) {
      updated = [...content.leaders, formData as Leader];
    } else {
      updated = content.leaders.map(n => n.id === editingId ? formData as Leader : n);
    }
    
    const result = await updateContent({ leaders: updated });
    
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
        <h1 className="text-2xl font-bold text-gray-800">নেতৃবৃন্দ পরিচালনা</h1>
        <button 
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm flex items-center gap-2 transition"
        >
          <Plus size={18} /> নতুন সদস্য যোগ করুন
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
          <h2 className="text-lg font-bold mb-4">{isAdding ? 'নতুন সদস্য' : 'সদস্য এডিট করুন'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">নাম</label>
              <input 
                type="text" 
                value={formData.name || ''} 
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">মূল পদবি (যেমন: সভাপতি)</label>
              <input 
                type="text" 
                value={formData.role || ''} 
                onChange={e => setFormData({...formData, role: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">বিস্তারিত পদবি</label>
              <input 
                type="text" 
                value={formData.title || ''} 
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="সভাপতি, সাভার স্টুডেন্ট কমিউনিটি"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">ছবির URL</label>
              <input 
                type="text" 
                value={formData.image || ''} 
                onChange={e => setFormData({...formData, image: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="https://..."
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-blue-700"><Save size={16}/> সেভ করুন</button>
            <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-gray-300"><X size={16}/> বাতিল</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.leaders.map(leader => (
          <div key={leader.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            <div className="bg-gray-50 h-48 border-b border-gray-200 flex items-center justify-center overflow-hidden">
                {leader.image ? (
                  <img src={leader.image} alt={leader.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-gray-400">ছবি নেই</div>
                )}
            </div>
            <div className="p-5 flex-1 relative">
                <span className="absolute -top-3 right-4 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">{leader.role}</span>
                <h3 className="font-bold text-lg text-gray-800">{leader.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{leader.title}</p>
            </div>
            <div className="bg-gray-50 border-t border-gray-100 p-3 flex justify-between">
                <button onClick={() => handleDelete(leader.id)} className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1 font-medium"><Trash2 size={16}/> মুছুন</button>
                <button onClick={() => handleEdit(leader)} className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1 font-medium"><Edit2 size={16}/> এডিট</button>
            </div>
          </div>
        ))}
        {content.leaders.length === 0 && (
          <div className="col-span-full text-center py-10 bg-white border border-gray-200 rounded-xl text-gray-500">
            কোনো সদস্য পাওয়া যায়নি।
          </div>
        )}
      </div>

    </div>
  );
}
