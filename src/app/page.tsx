import Editor from "@/components/editor";
import createClient from "@/supabase/server";

const id = "5d26b47c-0625-4356-938a-73ab220ed67e";

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.from("files").select().eq("id", id).limit(1).single();

  return (
    <div>
      <Editor defaultValue={data.content} defaultVersion={data.version} />
    </div>
  );
}
