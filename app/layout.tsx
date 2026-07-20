import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ayphil 75 — Game design portfolio",
  description:
    "A bilingual portfolio for Ayphil 75, exploring UX, systems, and technical design across games and interactive projects.",
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
      <body>{children}</body>
    </html>
  );
}
