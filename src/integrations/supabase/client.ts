// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://uhbnffhnuefvonddhnax.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoYm5mZmhudWVmdm9uZGRobmF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyNTg1ODYsImV4cCI6MjA1MzgzNDU4Nn0.fEd569zkRkQK742nOW2pALns8INZyuNn45T8s6dPYdg";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);