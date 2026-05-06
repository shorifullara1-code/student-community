import { createClient } from '@supabase/supabase-js';

// Use environment variables or fallback to the provided keys for convenience
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://aobfohlsidjwxofnrmuv.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvYmZvaGxzaWRqd3hvZm5ybXV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5ODkwMzMsImV4cCI6MjA5MzU2NTAzM30.w9YLIOcjYbFxAyERj8icH-_VoHXiN2WZSLkHGYL6SQs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
