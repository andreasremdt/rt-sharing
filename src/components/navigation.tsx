"use client";

import { useEffect, useState } from "react";
import supabase from "@/supabase/client";
import Link from "next/link";
import CreateFileButton from "./create-file-button";
import deleteFile from "@/actions/delete-file";

type Props = {
  files: any[];
};

export default function Navigation({ files }: Props) {
  const [localFiles, setLocalFiles] = useState(files);

  useEffect(() => {
    function handleUpdates(payload: unknown) {
      switch (payload.eventType) {
        case "INSERT":
          setLocalFiles([...localFiles, payload.new]);
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
    <nav>
      <CreateFileButton />

      <ul>
        {localFiles.map((file) => (
          <li key={file.id}>
            <Link href={`/files/${file.id}`}>{file.name}</Link>
            <button type="button" onClick={() => deleteFile(file.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
