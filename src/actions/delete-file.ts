"use server";

import createClient from "@/supabase/server";

async function deleteFile(id: string) {
  const supabase = await createClient();

  try {
    await supabase.from("files").delete().eq("id", id);
  } catch (error) {
    console.log(error);
  }
}

export default deleteFile;
