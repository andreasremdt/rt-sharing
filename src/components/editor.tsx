"use client";

import updateFile from "@/actions/update-file";
import debounce from "@/lib/debounce";
import supabase from "@/supabase/client";
import { useEffect, useRef, useState, type ChangeEvent } from "react";

type Props = {
  id: string;
  defaultValue?: string;
  defaultVersion: number;
};

function Editor({ id, defaultValue = "", defaultVersion = 1 }: Props) {
  const [version, setVersion] = useState(defaultVersion);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const debouncedHandleChange = debounce(handleChange);

  useEffect(() => {
    function handleUpdates(payload: unknown) {
      if (payload.new.version === version) {
        return;
      }

      const old = textareaRef.current?.value;

      if (old !== payload.new.content) {
        textareaRef.current!.value = payload.new.content;
      }
    }

    const channel = supabase
      .channel(id)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "files", filter: `id=eq.${id}` },
        handleUpdates,
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [version, id]);

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setVersion(version + 1);
    updateFile(id, event.target.value, version + 1);
  }

  return (
    <textarea
      ref={textareaRef}
      className="h-96 w-full bg-gray-200"
      defaultValue={defaultValue}
      onInput={debouncedHandleChange}
    />
  );
}

export default Editor;
