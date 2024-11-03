"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { DocumentIcon, TrashIcon } from "@heroicons/react/24/outline";

import deleteFile from "@/actions/delete-file";
import cn from "@/lib/cn";

type Props = {
  id: string;
  name: string;
};

export default function ExplorerEntry({ id, name }: Props) {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  return (
    <li
      className={cn(
        "group flex h-10 gap-4 rounded-md text-gray-900 focus-within:bg-gray-100 hover:bg-gray-100",
        {
          "bg-rose-50 text-rose-600 focus-within:bg-rose-100 hover:bg-rose-100": id === params.id,
        },
      )}
    >
      <Link
        href={`/files/${id}`}
        className="has-outline peer flex h-full flex-1 items-center gap-2 rounded-md pl-2 font-medium"
      >
        <DocumentIcon
          width={20}
          height={20}
          className={cn("size-5 text-gray-400", {
            "text-rose-300": id === params.id,
          })}
        />
        {name}
      </Link>
      <button
        type="button"
        onClick={async () => {
          await deleteFile(id);
          router.push("/files");
        }}
        className={cn(
          "has-outline ml-auto flex aspect-square h-10 items-center justify-center rounded-md opacity-0 hover:bg-gray-200 focus-visible:bg-gray-200 focus-visible:opacity-100 group-hover:opacity-100 peer-focus-visible:opacity-100",
          {
            "hover:bg-rose-200 focus-visible:bg-rose-200": id === params.id,
          },
        )}
      >
        <TrashIcon
          width={20}
          height={20}
          className={cn("size-5", {
            "text-rose-600": id === params.id,
          })}
        />
      </button>
    </li>
  );
}
