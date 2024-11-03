"use client";

import { useEffect, useState } from "react";
import supabase from "@/supabase/client";
import CreateFileButton from "./create-file-button";
import NavigationEntry from "./navigation-entry";

type Props = {
  files: any[];
};

export default function Navigation({ files }: Props) {
  const [localFiles, setLocalFiles] = useState(files);

  useEffect(() => {
    function handleUpdates(payload: unknown) {
      switch (payload.eventType) {
        case "INSERT":
          setLocalFiles([payload.new, ...localFiles]);
          break;

        case "DELETE":
          setLocalFiles(localFiles.filter((file) => file.id !== payload.old.id));
          break;
      }
    }

    const channel = supabase
      .channel("realtime files")
      .on("postgres_changes", { event: "*", schema: "public", table: "files" }, handleUpdates)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [localFiles]);

  return (
    <nav className="w-64 overflow-y-auto border-r border-gray-200 px-4 py-4">
      <CreateFileButton />

      <ul className="space-y-1">
        {localFiles.map((file) => (
          <NavigationEntry key={file.id} id={file.id} name={file.name} />
        ))}
      </ul>
    </nav>
  );
}
