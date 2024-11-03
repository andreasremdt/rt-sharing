import Editor from "@/components/editor";
import createClient from "@/supabase/server";
import { notFound, redirect } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const id = (await params).id;
  const supabase = await createClient();
  const session = await supabase.auth.getUser();

  if (!session.data.user) {
    return null;
  }

  const { data } = await supabase
    .from("files")
    .select()
    .eq("id", id)
    .eq("user_id", session.data.user.id)
    .single();

  return {
    title: data?.name,
  };
}

export default async function Page({ params }: Props) {
  const id = (await params).id;
  const supabase = await createClient();
  const session = await supabase.auth.getUser();

  if (!session.data.user) {
    redirect("/auth/login");
  }

  const { data } = await supabase
    .from("files")
    .select()
    .eq("id", id)
    .eq("user_id", session.data.user.id)
    .single();

  if (!data) {
    notFound();
  }

  return <Editor file={data} />;
}
