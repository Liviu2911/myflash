import { createClient } from "@supabase/supabase-js";

const url = "https://izpsrhzyunpvyudqurzk.supabase.co";
const key = import.meta.env.VITE_SUPABASE_KEY;
if (!key) {
  console.log("on client");
  console.log(process.env.VITE_SUPABASE_KEY);
}

const supabase = createClient(url, key);

export default supabase;
