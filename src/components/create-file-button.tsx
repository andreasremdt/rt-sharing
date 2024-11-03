"use client";

import createFile from "@/actions/create-file";
import { useState } from "react";

export default function CreateFileButton() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setIsFormVisible(true)}>
        Create File
      </button>

      {isFormVisible ? (
        <form action={createFile}>
          <input
            type="text"
            name="name"
            placeholder="Enter a file name"
            defaultValue="Untitled"
            autoFocus
          />
          <button type="submit">Go</button>
        </form>
      ) : null}
    </>
  );
}
