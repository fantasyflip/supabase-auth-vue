import { createClient } from "@supabase/supabase-js";

console.log("supabase.js: " + process.env.VUE_APP_SUPABASE_URL);
const supabaseUrl = process.env.VUE_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.VUE_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
