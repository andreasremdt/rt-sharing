import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return <main className="grid h-screen place-items-center">{children}</main>;
}
