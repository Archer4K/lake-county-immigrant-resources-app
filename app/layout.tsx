import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "./language";

export const metadata: Metadata = {
  title: "Lake County Immigrant Resources",
  description: "Find local help with legal questions, healthcare, food, housing, work and English classes in Lake County, Illinois.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased"><LanguageProvider>{children}</LanguageProvider></body>
    </html>
  );
}
