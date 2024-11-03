import { redirect } from "next/navigation";

import createClient from "@/supabase/server";
import type { File } from "@/types/supabase";
import Explorer from "./explorer";

export default async function ExplorerLoader() {
  const supabase = await createClient();
  const session = await supabase.auth.getUser();

  if (!session.data.user) {
    redirect("/auth/login");
  }

  const { data: files } = await supabase
    .from("files")
    .select()
    .eq("user_id", session.data.user.id)
    .returns<File[]>();

  return <Explorer files={files} />;
}
