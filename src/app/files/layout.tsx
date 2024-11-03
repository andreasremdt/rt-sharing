import createClient from "@/supabase/server";
import Navigation from "@/components/navigation";
import type { File } from "@/types/supabase";
import Header from "@/components/header";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const session = await supabase.auth.getUser();

  if (!session.data.user) {
    redirect("/auth/login");
  }

  const files = await supabase
    .from("files")
    .select()
    .eq("user_id", session.data.user.id)
    .returns<File[]>();

  return (
    <div className="flex h-screen">
      <Navigation files={files.data} />

      <div className="flex-1">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}
