import { createClient } from '@supabase/supabase-js';

const DESIGNS_PROJECT_URL = import.meta.env.VITE_BAG_DESIGNS_PROJECT_URL;
const DESIGNS_ANON_KEY = import.meta.env.VITE_BAG_DESIGNS_ANON_KEY;

if (!DESIGNS_PROJECT_URL || !DESIGNS_ANON_KEY) {
  console.warn('Designs Supabase credentials are missing. Storage operations will fail.');
}

/**
 * Separate Supabase client for the TD Studios designs bucket.
 * This connects to a different Supabase project than the main client.
 */
export const designsSupabase = createClient(DESIGNS_PROJECT_URL, DESIGNS_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
