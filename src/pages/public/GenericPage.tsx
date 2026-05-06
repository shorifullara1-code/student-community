import React from 'react';
import { useAppContext } from '../../context/AppContext';

export default function GenericPage({ title, contentKey }: { title: string, contentKey?: 'aboutText' }) {
  const { content } = useAppContext();
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm min-h-[500px]">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2 inline-block font-tiro">{title}</h1>
      <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
        {contentKey ? content[contentKey] : 'এই পাতার কন্টেন্ট খুব শীঘ্রই সংযুক্ত করা হবে।'}
      </div>
    </div>
  );
}
