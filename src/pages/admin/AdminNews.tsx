import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Plus, Edit2, Trash2, X, FileText, Image as ImageIcon } from 'lucide-react';
import { NewsArticle } from '../../types';

export default function AdminNews() {
  const { content, updateContent } = useAppContext();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<NewsArticle>>({});
  const [isAdding, setIsAdding] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleEdit = (news: NewsArticle) => {
    setEditingId(news.id);
    setFormData(news);
    setIsAdding(false);
    setErrorMsg(null);
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({ id: Date.now().toString(), title: '', content: '', date: new Date().toLocaleDateString('bn-BD'), author: 'সাভার স্টুডেন্ট কমিউনিটি' });
    setErrorMsg(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('আপনি কি এই খবরটি মুছে ফেলতে চান?')) {
      const updated = (content.newsArticles || []).filter(n => n.id !== id);
      const result = await updateContent({ newsArticles: updated });
      if (!result.success) {
         setErrorMsg(result.message || 'Error deleting news');
      } else {
         setErrorMsg(null);
      }
    }
  };

  const handleSave = async () => {
    if (!formData.title) return;
    setErrorMsg(null);
    
    let updated;
    if (isAdding) {
      updated = [formData as NewsArticle, ...(content.newsArticles || [])];
    } else {
      updated = (content.newsArticles || []).map(n => n.id === editingId ? formData as NewsArticle : n);
    }
    
    const result = await updateContent({ newsArticles: updated });
    
    if (result.success) {
      setEditingId(null);
      setIsAdding(false);
      setFormData({});
    } else {
      setErrorMsg(result.message || 'Unknown error occurred while saving.');
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">খবর ব্যবস্থাপনা</h1>
          <p className="text-gray-500 text-sm mt-1">ওয়েবসাইটের খবরের পাতার জন্য খবর পোস্ট করুন</p>
        </div>
        <button 
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm flex items-center gap-2 transition"
        >
          <Plus size={18} /> নতুন খবর
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
          <h2 className="text-lg font-bold mb-4">{isAdding ? 'নতুন খবর' : 'খবর এডিট করুন'}</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">শিরোনাম</label>
              <input 
                type="text"
                value={formData.title || ''}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">বিস্তারিত</label>
              <textarea 
                value={formData.content || ''}
                onChange={e => setFormData({...formData, content: e.target.value})}
                rows={6}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none resize-y"
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <label className="block text-sm font-semibold text-gray-700 mb-1">লেখক/প্রকাশক</label>
                <input 
                  type="text"
                  value={formData.author || ''}
                  onChange={e => setFormData({...formData, author: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">ছবির লিংক (ঐচ্ছিক)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ImageIcon size={16} className="text-gray-400" />
                  </div>
                  <input 
                    type="text"
                    value={formData.image || ''}
                    placeholder="https://..."
                    onChange={e => setFormData({...formData, image: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 justify-end mt-4">
              <button 
                onClick={() => {
                  setIsAdding(false);
                  setEditingId(null);
                  setErrorMsg(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                বাতিল
              </button>
              <button 
                onClick={handleSave}
                disabled={!formData.title}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-2 rounded-lg font-medium transition"
              >
                সেভ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {(!content.newsArticles || content.newsArticles.length === 0) ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
            <FileText size={32} />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">কোনো খবর নেই</h3>
          <p className="text-gray-500 mb-6">আপনার ওয়েবসাইটের জন্য এখনো কোনো খবর পোস্ট করা হয়নি।</p>
          <button 
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-sm flex items-center gap-2 transition mx-auto"
          >
            <Plus size={18} /> প্রথম খবর পোস্ট করুন
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 font-semibold text-gray-700">খবর</th>
                  <th className="px-6 py-3 font-semibold text-gray-700">তারিখ ও লেখক</th>
                  <th className="px-6 py-3 font-semibold text-gray-700 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody>
                {content.newsArticles?.map(news => (
                  <tr key={news.id} className="border-b last:border-0 border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {news.image ? (
                          <img src={news.image} alt="" className="w-12 h-12 rounded object-cover border border-gray-200" />
                        ) : (
                          <div className="w-12 h-12 rounded bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400">
                            <FileText size={20} />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-800 line-clamp-1">{news.title}</p>
                          <p className="text-sm text-gray-500 line-clamp-1 mt-0.5">{news.content}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-800">{news.date}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{news.author}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleEdit(news)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(news.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
