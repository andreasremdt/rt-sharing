"use server";

import createClient from "@/supabase/server";

async function updateFile(id: string, content: string, version: number) {
  const supabase = await createClient();

  try {
    await supabase.from("files").update({ content, version }).eq("id", id);
  } catch (error) {
    console.log(error);
  }
}

export default updateFile;
