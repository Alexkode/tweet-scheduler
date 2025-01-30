import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://uhbnffhnuefvonddhnax.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoYm5mZmhudWVmdm9uZGRobmF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyNTg1ODYsImV4cCI6MjA1MzgzNDU4Nn0.fEd569zkRkQK742nOW2pALns8INZyuNn45T8s6dPYdg";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Les clés Supabase ne sont pas disponibles. Assurez-vous d\'être connecté à Supabase via l\'intégration Lovable.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);