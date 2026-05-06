import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Calendar, User, FileText } from 'lucide-react';

export default function News() {
  const { content } = useAppContext();
  
  const news = content.newsArticles || [];

  return (
    <div className="bg-white border border-gray-200 rounded p-6 md:p-8 shadow-sm min-h-[400px]">
      <div className="flex items-center gap-2 mb-8 border-b border-gray-200 pb-4">
        <FileText className="text-blue-600" size={28} />
        <h1 className="text-3xl font-bold text-gray-800 font-tiro">খবর ও আপডেট</h1>
      </div>

      {news.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mx-auto mb-4">
            <FileText size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-700 mb-2">কোনো খবর পাওয়া যায়নি</h2>
          <p className="text-gray-500">বর্তমানে প্রদর্শনের জন্য কোনো খবর নেই। পরবর্তীতে আবার চেক করুন।</p>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {news.map((item) => (
            <article key={item.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white flex flex-col md:flex-row">
              {item.image && (
                <div className="md:w-1/3 bg-gray-100 shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex gap-4 items-center mb-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {item.date}</span>
                  {item.author && <span className="flex items-center gap-1"><User size={14} /> {item.author}</span>}
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition cursor-pointer font-tiro leading-snug">
                  {item.title}
                </h2>
                <div className="text-gray-600 mb-4 whitespace-pre-wrap leading-relaxed">
                  {item.content}
                </div>
                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-end">
                  <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm transition">
                    বিস্তারিত পড়ুন &rarr;
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
