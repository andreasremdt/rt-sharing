import type { Metadata } from "next";
import "./globals.css";
import { Source_Sans_3, Source_Code_Pro } from "next/font/google";
import cn from "@/lib/cn";

const sourceSans = Source_Sans_3({ subsets: ["latin"], variable: "--font-source-sans" });
const sourceCode = Source_Code_Pro({ subsets: ["latin"], variable: "--font-source-mono" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          sourceSans.variable,
          sourceCode.variable,
          "font-sans text-gray-600 antialiased",
        )}
      >
        {children}
      </body>
    </html>
  );
}
