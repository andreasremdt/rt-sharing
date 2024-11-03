"use client";

import { ArrowRightStartOnRectangleIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import supabase from "@/supabase/client";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <header className="relative flex items-center justify-end gap-4 border-b border-gray-200 px-8 py-4 shadow-sm">
      <button
        type="button"
        title="Copy to clipboard"
        className="has-outline flex aspect-square h-10 items-center justify-center rounded-md hover:bg-gray-100 focus-visible:bg-gray-100"
      >
        <ClipboardIcon width={20} height={20} className="size-5" />
      </button>

      <button
        type="button"
        onClick={() => {
          supabase.auth.signOut();
          router.push("/");
        }}
        className="has-outline flex h-10 items-center justify-center gap-2 rounded-md px-4 font-medium text-gray-900 hover:bg-gray-100 focus-visible:bg-gray-100"
      >
        <ArrowRightStartOnRectangleIcon width={20} height={20} className="size-5" />
        Logout
      </button>
    </header>
  );
}
