import { Suspense, type ReactNode } from "react";

import Header from "@/components/header";
import { Explorer, ExplorerSkeleton } from "@/components/explorer";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex h-screen">
      <Suspense fallback={<ExplorerSkeleton />}>
        <Explorer />
      </Suspense>

      <div className="flex-1">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}
