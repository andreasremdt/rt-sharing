"use server";

import createClient from "@/supabase/server";

async function updateFile(id: string, content: string, version: number) {
  const supabase = await createClient();
  const session = await supabase.auth.getUser();

  if (!session.data.user) {
    return null;
  }

  await supabase
    .from("files")
    .update({ content, version })
    .eq("id", id)
    .eq("user_id", session.data.user.id);
}

export default updateFile;
