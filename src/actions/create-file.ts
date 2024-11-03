"use server";

import createClient from "@/supabase/server";

async function updateFile(formData: FormData) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("files")
    .insert({ name: formData.get("name") })
    .select();

  if (data) {
    return data[0].id;
  }

  return null;
}

export default updateFile;
