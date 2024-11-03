"use client";

import updateFile from "@/actions/update-file";
import debounce from "@/lib/debounce";
import supabase from "@/supabase/client";
import type { File } from "@/types/supabase";
import { useEffect, useRef, useState, type ChangeEvent } from "react";

type Props = {
  file: File;
};

function Editor({ file }: Props) {
  const [version, setVersion] = useState(() => file.version);
  const ref = useRef<HTMLTextAreaElement>(null);

  const debouncedHandleChange = debounce(handleChange);

  useEffect(() => {
    const channel = supabase
      .channel(file.id)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "files", filter: `id=eq.${file.id}` },
        (payload) => {
          if (payload.new.version === version || !ref.current) {
            return;
          }

          if (ref.current.value !== payload.new.content) {
            ref.current.value = payload.new.content;
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [version, file.id]);

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setVersion(version + 1);
    updateFile(file.id, event.target.value, version + 1);
  }

  return (
    <textarea
      ref={ref}
      className="h-screen w-full resize-none px-8 py-4 font-mono font-medium outline-none"
      defaultValue={file.content || ""}
      onInput={debouncedHandleChange}
      placeholder="Start typing to edit..."
      spellCheck={false}
    />
  );
}

export default Editor;
