import createClient from "@/supabase/server";
import Navigation from "@/components/navigation";
import type { File } from "@/types/supabase";
import Header from "@/components/header";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data } = await supabase.from("files").select().returns<File[]>();

  return (
    <div className="flex h-screen">
      <Navigation files={data} />

      <div className="flex-1">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}
