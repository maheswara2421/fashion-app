import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

// Read values from app.json -> expo.extra or manifest.extra (fallback for older runtimes)
const extra = (Constants?.expoConfig?.extra ?? (Constants as any)?.manifest?.extra ?? {}) as {
  SUPABASE_URL?: string;
  SUPABASE_ANON_KEY?: string;
};

const SUPABASE_URL = extra.SUPABASE_URL ?? '';
const SUPABASE_ANON_KEY = extra.SUPABASE_ANON_KEY ?? '';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // eslint-disable-next-line no-console
  console.warn(
    '[supabase] Missing SUPABASE_URL or SUPABASE_ANON_KEY. Add them to mobile/stylediscover-expo/app.json under expo.extra.'
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
