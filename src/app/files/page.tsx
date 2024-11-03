import { DocumentPlusIcon } from "@heroicons/react/24/outline";

export default function Page() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <DocumentPlusIcon width={32} height={32} className="size-8" />
      <h1 className="mb-4 mt-2">You don&apos;t have any files opened at the moment.</h1>
      <button
        type="button"
        className="has-outline h-10 rounded-md bg-rose-600 px-6 font-medium text-white outline-offset-2 hover:bg-rose-500 focus-visible:bg-rose-500"
      >
        Create File
      </button>
    </div>
  );
}
