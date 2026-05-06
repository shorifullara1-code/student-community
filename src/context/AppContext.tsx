import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, Notice, Leader } from '../types';
import { supabase } from '../lib/supabase';

const defaultContent: SiteContent = {
  siteTitle: 'সাভার স্টুডেন্ট কমিউনিটি',
  siteSubtitle: 'শিক্ষার্থীদের কল্যাণে নিবেদিত একটি স্বেচ্ছাসেবী সংগঠন',
  logoText: 'S',
  aboutText: 'সাভার স্টুডেন্ট কমিউনিটি হলো সাভার এলাকার শিক্ষার্থীদের একটি অরাজনৈতিক, সামাজিক ও স্বেচ্ছাসেবী সংগঠন। আমাদের লক্ষ্য শিক্ষার্থীদের মধ্যে ঐক্য, ভ্রাতৃত্ববোধ এবং সামাজিক দায়বদ্ধতা বৃদ্ধি করা।',
  contactEmail: 'contact@savarstudentcommunity.org',
  notices: [
    {
      id: '1',
      title: 'সাভার স্টুডেন্ট কমিউনিটির নতুন কার্যকরী কমিটি গঠন প্রসঙ্গে',
      date: '০৫-০৩-২০২৬',
      isNew: true,
      type: 'সাধারণ'
    },
    {
      id: '2',
      title: 'সুবিধাবঞ্চিত শিশুদের জন্য শীতবস্ত্র বিতরণ কর্মসূচি ও স্বেচ্ছাসেবক আহ্বান',
      date: '০১-০৩-২০২৬',
      isNew: true,
      type: 'সাধারণ'
    },
    {
      id: '3',
      title: 'রক্তদান কর্মসূচি ও ফ্রি ব্লাড গ্রুপিং ক্যাম্পেইন - ২০২৬ আয়োজন প্রসঙ্গে',
      date: '২৮-০২-২০২৬',
      isNew: false,
      type: 'সাধারণ'
    }
  ],
  newsText: 'সাভার স্টুডেন্ট কমিউনিটির উদ্যোগে আয়োজিত হতে যাচ্ছে বই পড়া উৎসব...',
  latestNews: [
    'সাভার অঞ্চলে বৃক্ষরোপণ কর্মসূচিতে অংশগ্রহণকারীদের সার্টিফিকেট প্রদান।',
    'আসন্ন এসএসসি পরীক্ষার্থীদের জন্য ফ্রি দিকনির্দেশনামূলক সেমিনার অনুষ্ঠিত।'
  ],
  leaders: [
    {
      id: '1',
      role: 'সভাপতি',
      name: 'জনাব শরীফুল আজম',
      title: 'সভাপতি, সাভার স্টুডেন্ট কমিউনিটি',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300&h=300'
    },
    {
      id: '2',
      role: 'সাধারণ সম্পাদক',
      name: 'জনাব রাকিবুল ইসলাম',
      title: 'সাধারণ সম্পাদক, সাভার স্টুডেন্ট কমিউনিটি',
      image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=300&h=300'
    }
  ],
  newsArticles: [],
  heroImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
};

interface AppContextType {
  content: SiteContent;
  updateContent: (newContent: Partial<SiteContent>) => Promise<{success: boolean, message?: string}>;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('data')
        .eq('id', 1)
        .single();
      
      if (data?.data && Object.keys(data.data).length > 0) {
        setContent({ ...defaultContent, ...(data.data as Partial<SiteContent>) });
      } else if (error && error.code !== 'PGRST116') {
        console.error("Error fetching content from Supabase:", error);
      }
    } catch (err) {
      console.error("Supabase fetch failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateContent = async (newContent: Partial<SiteContent>): Promise<{success: boolean, message?: string}> => {
    const updatedContent = { ...content, ...newContent };
    
    // Optimistic UI update
    setContent(updatedContent);

    try {
      const { error } = await supabase
        .from('settings')
        .upsert({ id: 1, data: updatedContent });
        
      if (error) {
        console.error("Error saving content to Supabase:", error);
        
        let errorMsg = "Supabase Error: " + error.message;
        if (error.message.includes('Invalid API key')) {
          errorMsg = "Vercel-এ VITE_SUPABASE_ANON_KEY ঠিকমতো সেট করা নেই অথবা ভুল আছে। দয়া করে Project settings থেকে ঠিক করুন।";
        } else if (error.code === 'PGRST116' || error.message.includes('relation "public.settings" does not exist')) {
          errorMsg = "Supabase Database-এ 'settings' table তৈরি করা হয়নি। দয়া করে SQL Editor এ গিয়ে টেবিল তৈরি করুন।";
        } else if (error.message.includes('row-level security policy') || error.code === '42501') {
          errorMsg = "Supabase Error: Row-Level Security (RLS) ব্লক করেছে। অনুগ্রহ করে Supabase SQL Editor-এ গিয়ে 'ALTER TABLE settings DISABLE ROW LEVEL SECURITY;' রান করুন।";
        }
        
        // Revert optimistic update
        setContent(content);
        return { success: false, message: errorMsg };
      }
      return { success: true };
    } catch (err: any) {
      console.error("Supabase upsert failed", err);
      // Revert optimistic update
      setContent(content);
      return { success: false, message: "Network error or Supabase connection failed." };
    }
  };

  return (
    <AppContext.Provider value={{ content, updateContent, isLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
