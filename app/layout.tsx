import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Emmanuel Cyr — Game design portfolio",
  description:
    "Emmanuel Cyr's bilingual portfolio of game design, UX, systems, and technical design work.",
  referrer: "strict-origin-when-cross-origin",
  icons: {
    icon: "/Portfolio/favicon.svg",
    shortcut: "/Portfolio/favicon.svg",
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
