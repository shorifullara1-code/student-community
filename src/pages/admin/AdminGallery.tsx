import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Image, Trash2, Plus, AlertCircle, Link as LinkIcon, Edit3 } from 'lucide-react';

interface GalleryPhoto {
  id: number;
  url: string;
  title: string;
  created_at: string;
}

export default function AdminGallery() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [adding, setAdding] = useState(false);

  const fetchPhotos = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const { data, error } = await supabase
        .from('gallery_photos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPhotos(data || []);
    } catch (err: any) {
      if (err.message?.includes('does not exist') || err.message?.includes('SQL') || err.message?.includes('API')) {
        setErrorMsg('Supabase টেবিল "gallery_photos" পাওয়া যায়নি। নিচের SQL কোড ব্যবহার করুন।');
      } else {
        setErrorMsg(err.message || 'ডেটা লোড করতে সমস্যা হয়েছে।');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;

    setAdding(true);
    try {
      const { error } = await supabase
        .from('gallery_photos')
        .insert([
          { url: newUrl, title: newTitle || 'আনটাইটেল্ড' }
        ]);

      if (error) throw error;
      
      setNewUrl('');
      setNewTitle('');
      fetchPhotos();
    } catch (err: any) {
      alert('ফটো যোগ করতে সমস্যা হয়েছে: ' + err.message);
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('আপনি কি নিশ্চিত যে এই ফটোটি মুছে ফেলতে চান?')) return;

    try {
      const { error } = await supabase
        .from('gallery_photos')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchPhotos();
    } catch (err: any) {
      alert('ফটো মুছে ফেলতে সমস্যা হয়েছে: ' + err.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-tiro tracking-tight flex items-center gap-3">
          <Image className="text-blue-600" size={32} />
          ফটো গ্যালারি ম্যানেজমেন্ট
        </h1>
        <p className="text-gray-500 mt-2">ওয়েবসাইটের গ্যালারিতে নতুন ছবি যোগ করুন বা মুছে ফেলুন</p>
      </div>

      {errorMsg ? (
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl flex flex-col gap-4 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertCircle className="shrink-0 mt-0.5" />
            <p className="font-medium text-lg">{errorMsg}</p>
          </div>
          {(errorMsg.includes('SQL') || errorMsg.includes('API') || errorMsg.includes('does not exist')) && (
            <div className="bg-white p-5 rounded-lg border border-red-100 font-mono text-sm overflow-x-auto text-gray-800 shadow-inner">
              <p className="mb-3 text-red-600 font-bold">// নিচের SQL টি Supabase এর SQL Editor এ রান করুন:</p>
              <pre className="whitespace-pre-wrap"><code>
{`CREATE TABLE IF NOT EXISTS gallery_photos (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  title TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Allow unrestricted access for everyone
ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all for everyone" ON gallery_photos FOR ALL USING (true) WITH CHECK (true);`}
              </code></pre>
            </div>
          )}
          <button 
            onClick={fetchPhotos} 
            className="self-start px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 font-bold rounded-lg transition-colors"
          >
            পুনরায় চেষ্টা করুন
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Add Form */}
          <div className="md:col-span-1 border border-gray-200 bg-white shadow-sm rounded-2xl p-6 self-start">
            <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-3">নতুন ছবি যোগ করুন</h2>
            <form onSubmit={handleAddPhoto} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">ছবির URL (লিঙ্ক)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LinkIcon size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="url"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">ছবির ক্যাপশন / টাইটেল</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Edit3 size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    placeholder="যেমন: রক্তদান কর্মসূচী ২০২৪"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={adding || !newUrl}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg mt-2"
              >
                {adding ? (
                  <span className="animate-pulse">যোগ করা হচ্ছে...</span>
                ) : (
                  <>
                    <Plus size={18} />
                    ছবি যোগ করুন
                  </>
                )}
              </button>
            </form>
            
            {newUrl && (
              <div className="mt-6 border border-gray-200 rounded-lg p-2 bg-gray-50">
                <p className="text-xs text-center text-gray-500 mb-2 font-medium">প্রিভিউ</p>
                <img src={newUrl} alt="Preview" className="w-full h-32 object-cover rounded shadow-sm" onError={(e) => (e.currentTarget.style.display = 'none')} />
              </div>
            )}
          </div>

          {/* Photo List */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-3">গ্যালারির ছবিসমূহ</h2>
            
            {loading ? (
              <div className="flex justify-center p-10">
                <div className="animate-spin h-8 w-8 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
              </div>
            ) : photos.length === 0 ? (
              <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-12 text-center text-gray-500">
                <Image size={40} className="mx-auto mb-3 opacity-30" />
                <p className="font-medium text-lg">এখনও কোনো ছবি যোগ করা হয়নি।</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {photos.map((photo) => (
                  <div key={photo.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                    <div className="h-40 w-full relative bg-gray-100">
                      <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button
                          onClick={() => handleDelete(photo.id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transform scale-50 group-hover:scale-100 transition-all"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col justify-between items-start gap-2 h-20">
                      <p className="font-bold text-gray-800 line-clamp-1 truncate w-full" title={photo.title}>{photo.title}</p>
                      <p className="text-xs text-gray-500">{new Date(photo.created_at).toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
