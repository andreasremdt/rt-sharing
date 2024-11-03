"use server";

import createClient from "@/supabase/server";

export default async function createFile(formData: FormData) {
  const supabase = await createClient();
  const session = await supabase.auth.getUser();

  if (!session.data.user) {
    return null;
  }

  const { data } = await supabase
    .from("files")
    .insert({ name: formData.get("name") as string, user_id: session.data.user.id })
    .select()
    .single();

  return data?.id || null;
}
