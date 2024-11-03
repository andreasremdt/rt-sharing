import Editor from "@/components/editor";
import createClient from "@/supabase/server";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const id = (await params).id;
  const supabase = await createClient();
  const { data } = await supabase.from("files").select().match({ id }).single();

  return {
    title: data?.name,
  };
}

export default async function Page({ params }: Props) {
  const id = (await params).id;
  const supabase = await createClient();
  const { data } = await supabase.from("files").select().match({ id }).single();

  if (!data) {
    notFound();
  }

  return <Editor file={data} />;
}
