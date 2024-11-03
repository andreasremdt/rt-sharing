import Skeleton from "@/components/ui/skeleton";

export default function ExplorerSkeleton() {
  return (
    <nav className="w-64 overflow-y-auto border-r border-gray-200 p-4">
      <Skeleton className="mb-4" />
      <Skeleton className="mb-4 h-6 w-2/3" />
      <Skeleton className="mb-4 h-6 w-1/3" />
      <Skeleton className="h-6 w-1/2" />
    </nav>
  );
}
