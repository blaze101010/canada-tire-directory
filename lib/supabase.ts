import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/database';

// Get environment variables and trim whitespace
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || '';

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env.local file.'
  );
}

// Create Supabase client for browser using SSR-compatible client
// This ensures sessions work with both client and server (middleware)
export const supabase = createBrowserClient<Database>(
  supabaseUrl,
  supabaseAnonKey
);
