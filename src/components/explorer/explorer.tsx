"use client";

import { useEffect, useState } from "react";
import supabase from "@/supabase/client";
import type { File } from "@/types/supabase";

import ExplorerEntry from "./explorer-entry";
import CreateFileButton from "./create-file-button";

type Props = {
  files: File[] | null;
};

export default function Explorer({ files }: Props) {
  const [localFiles, setLocalFiles] = useState(() => files || []);

  useEffect(() => {
    const channel = supabase
      .channel("realtime files")
      .on("postgres_changes", { event: "*", schema: "public", table: "files" }, (payload) => {
        switch (payload.eventType) {
          case "INSERT":
            setLocalFiles([payload.new as File, ...localFiles]);
            break;

          case "DELETE":
            setLocalFiles(localFiles.filter((file) => file.id !== payload.old.id));
            break;
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [localFiles]);

  return (
    <nav className="w-64 overflow-y-auto border-r border-gray-200 p-4">
      <CreateFileButton />

      <ul className="space-y-1">
        {localFiles.map((file) => (
          <ExplorerEntry key={file.id} id={file.id} name={file.name} />
        ))}
      </ul>
    </nav>
  );
}
