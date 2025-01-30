import { createClient } from '@supabase/supabase-js';

// @ts-ignore - Ces variables sont injectées par l'intégration Lovable Supabase
const supabaseUrl = window.SUPABASE_URL;
// @ts-ignore - Ces variables sont injectées par l'intégration Lovable Supabase
const supabaseAnonKey = window.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Les clés Supabase ne sont pas disponibles. Assurez-vous d\'être connecté à Supabase via l\'intégration Lovable.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);