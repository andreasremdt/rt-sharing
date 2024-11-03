"use server";

import createClient from "@/supabase/server";

async function updateFile(formData: FormData) {
  const supabase = await createClient();

  try {
    await supabase.from("files").insert({ name: formData.get("name") });
  } catch (error) {
    console.log(error);
  }
}

export default updateFile;
