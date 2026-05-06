import { createClient } from '@supabase/supabase-js';

const envUrl = import.meta.env.VITE_SUPABASE_URL;
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Ensure we don't accidentally use an empty string or literal "undefined" from misconfigured Vercel environments
const supabaseUrl = (envUrl && envUrl !== 'undefined' && envUrl.trim() !== '') 
  ? envUrl.trim() 
  : 'https://aobfohlsidjwxofnrmuv.supabase.co';

const supabaseAnonKey = (envKey && envKey !== 'undefined' && envKey.trim() !== '' && envKey.length > 50) 
  ? envKey.trim() 
  : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvYmZvaGxzaWRqd3hvZm5ybXV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5ODkwMzMsImV4cCI6MjA5MzU2NTAzM30.w9YLIOcjYbFxAyERj8icH-_VoHXiN2WZSLkHGYL6SQs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
