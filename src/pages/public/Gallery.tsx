import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Image, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface GalleryPhoto {
  id: number;
  url: string;
  title: string;
  created_at: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function Gallery() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

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
        setErrorMsg('গ্যালারির জন্য ডেটাবেস টেবিল প্রস্তুত নয়। অ্যাডমিনকে জানান।');
      } else {
        setErrorMsg('ডেটা লোড করতে সমস্যা হয়েছে।');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div className="w-full space-y-8 pb-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-extrabold text-blue-900 border-b-4 border-blue-500 pb-2 inline-flex items-center gap-3 font-tiro tracking-tight mb-4">
          <Image size={36} className="text-blue-600" />
          ফটো গ্যালারি
        </h1>
        <p className="text-gray-600 font-medium text-lg ml-1">সাভার স্টুডেন্ট কমিউনিটির স্মৃতিময় মূহুর্তসমূহ</p>
      </motion.div>

      {errorMsg ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-50 border border-red-200 text-red-700 p-5 rounded-xl flex items-start gap-3 shadow-sm">
          <AlertCircle className="shrink-0 mt-0.5" />
          <p className="font-medium text-lg">{errorMsg}</p>
        </motion.div>
      ) : loading ? (
        <div className="flex flex-col items-center justify-center p-20 gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
          <p className="text-gray-500 font-medium animate-pulse">ছবিগুলো লোড হচ্ছে...</p>
        </div>
      ) : photos.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-50 border border-gray-200 border-dashed rounded-2xl p-16 text-center shadow-inner">
          <div className="w-20 h-20 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Image size={32} />
          </div>
          <p className="text-gray-500 font-medium text-lg">গ্যালারিতে এখনো কোনো ছবি যোগ করা হয়নি।</p>
        </motion.div>
      ) : (
        <motion.div
           variants={containerVariants}
           initial="hidden"
           animate="show"
           className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {photos.map((photo) => (
             <motion.div key={photo.id} variants={itemVariants} className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
               <div className="w-full h-56 relative overflow-hidden bg-gray-100">
                  <motion.img 
                     whileHover={{ scale: 1.05 }}
                     transition={{ duration: 0.4 }}
                     src={photo.url} 
                     alt={photo.title} 
                     className="w-full h-full object-cover" 
                     loading="lazy"
                  />
               </div>
               <div className="p-4 bg-white flex flex-col justify-center h-20 shrink-0">
                  <p className="font-bold text-gray-800 line-clamp-2" title={photo.title}>{photo.title}</p>
               </div>
             </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
