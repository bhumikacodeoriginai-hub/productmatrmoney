import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { LanguageProvider } from "@/components/language-provider";
import { LanguageRuntime } from "@/components/language-runtime";

export const metadata: Metadata = {
  title: "Advaita Matrimony — Meaningful connections. Built on trust.",
  description: "A trusted, inclusive matrimony platform designed for meaningful relationships.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><LanguageProvider><LanguageRuntime>{children}</LanguageRuntime></LanguageProvider></body></html>;
}
