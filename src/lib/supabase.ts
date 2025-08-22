import { createClient } from '@supabase/supabase-js';

// Mock client that works without environment variables
const mockSupabase = {
  auth: {
    signInWithPassword: () => Promise.resolve({ 
      data: { 
        user: { 
          id: 'mock-user-id', 
          email: 'demo@cosmic777.com',
          user_metadata: { username: 'CosmicPlayer' }
        } 
      }, 
      error: null 
    }),
    signUp: () => Promise.resolve({ 
      data: { 
        user: { 
          id: 'mock-user-id', 
          email: 'demo@cosmic777.com' 
        } 
      }, 
      error: null 
    }),
    signOut: () => Promise.resolve({ error: null }),
    getSession: () => Promise.resolve({ 
      data: { 
        session: {
          user: {
            id: 'mock-user-id',
            email: 'demo@cosmic777.com',
            user_metadata: { username: 'CosmicPlayer' }
          }
        }
      }, 
      error: null 
    }),
    onAuthStateChange: () => ({ 
      data: { 
        subscription: { 
          unsubscribe: () => {} 
        } 
      } 
    })
  },
  from: () => ({
    select: () => Promise.resolve({ data: [], error: null }),
    insert: () => Promise.resolve({ data: [], error: null }),
    update: () => Promise.resolve({ data: [], error: null }),
    delete: () => Promise.resolve({ data: [], error: null }),
    single: () => Promise.resolve({ data: null, error: null })
  })
};

export const supabase = mockSupabase;