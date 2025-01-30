import { createClient } from '@supabase/supabase-js';

// @ts-ignore - These variables are injected by Lovable
const supabaseUrl = window.SUPABASE_URL;
// @ts-ignore - These variables are injected by Lovable
const supabaseAnonKey = window.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase configuration missing:', { supabaseUrl, supabaseAnonKey });
  throw new Error('Les clés Supabase ne sont pas disponibles. Assurez-vous d\'être connecté à Supabase via l\'intégration Lovable.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);