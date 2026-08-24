import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Advaita Matrimony — Meaningful connections. Built on trust.",
  description: "A trusted, inclusive matrimony platform designed for meaningful relationships.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
