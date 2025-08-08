import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: any;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase environment variables are required. Please click "Connect to Supabase" button in the top right to set up your Supabase project.');
  // Create a mock client that will show helpful error messages
  supabase = {
    auth: {
      signInWithPassword: () => Promise.reject(new Error('Please connect to Supabase first. Click the "Connect to Supabase" button in the top right corner.')),
      signUp: () => Promise.reject(new Error('Please connect to Supabase first. Click the "Connect to Supabase" button in the top right corner.')),
      signOut: () => Promise.resolve({ error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    from: () => ({
      select: () => Promise.reject(new Error('Please connect to Supabase first')),
      insert: () => Promise.reject(new Error('Please connect to Supabase first')),
      update: () => Promise.reject(new Error('Please connect to Supabase first')),
      delete: () => Promise.reject(new Error('Please connect to Supabase first'))
    })
  };
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };