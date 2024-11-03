"use client";

import createFile from "@/actions/create-file";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateFileButton() {
  const router = useRouter();
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <form
      className="mb-4"
      action={async (formData) => {
        setIsFormVisible(false);
        const id = await createFile(formData);

        if (id) {
          router.push(`/files/${id}`);
        }
      }}
    >
      <button
        type="button"
        className="has-outline mb-1 h-10 w-full rounded-md bg-rose-600 px-6 font-medium text-white outline-offset-2 hover:bg-rose-500 focus-visible:bg-rose-500"
        onClick={() => setIsFormVisible(true)}
      >
        Create File
      </button>

      {isFormVisible ? (
        <>
          <input type="hidden" />
          <input
            className="has-outline h-10 w-full rounded-md border border-gray-200 px-4 -outline-offset-1"
            type="text"
            name="name"
            placeholder="Untitled"
            onBlur={(event) => {
              if (event.target.value.length > 0) {
                event.currentTarget.form?.requestSubmit();
              }

              setIsFormVisible(false);
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setIsFormVisible(false);
              }
            }}
            autoFocus
          />
        </>
      ) : null}
    </form>
  );
}
