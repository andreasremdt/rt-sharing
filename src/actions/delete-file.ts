"use server";

import createClient from "@/supabase/server";

export default async function deleteFile(id: string) {
  const supabase = await createClient();
  const session = await supabase.auth.getUser();

  if (!session.data.user) {
    return null;
  }

  await supabase.from("files").delete().eq("id", id).eq("user_id", session.data.user.id);
}
