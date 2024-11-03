import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/supabase";

export default createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);
