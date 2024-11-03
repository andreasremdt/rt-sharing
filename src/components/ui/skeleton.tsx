import cn from "@/lib/cn";
import type { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"div">;

export default function Skeleton({ className, ...props }: Props) {
  return (
    <div className={cn("h-10 w-full animate-pulse rounded-md bg-gray-200", className)} {...props} />
  );
}
