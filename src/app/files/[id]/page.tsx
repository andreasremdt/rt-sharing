import Editor from "@/components/editor";
import createClient from "@/supabase/server";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const id = (await params).id;
  const supabase = await createClient();
  const { data, error } = await supabase.from("files").select().eq("id", id).limit(1).single();

  if (error) {
    notFound();
  }

  return (
    <div>
      <Editor defaultValue={data.content} defaultVersion={data.version} />
    </div>
  );
}
