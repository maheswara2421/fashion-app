/*
 * File: src/lib/supabaseClient.ts
 * Purpose: Creates and exports a singleton Supabase client for the web app.
 * Notes:
 * - Uses @supabase/supabase-js v2.57.4.
 * - Reads env via Vite: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
 * - In development, see README to configure .env and Docker env.
 */
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL: string = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY: string = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // eslint-disable-next-line no-console
  console.warn('Supabase env vars are missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
