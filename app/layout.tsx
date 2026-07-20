import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Game designer / systems thinker",
  description:
    "A bilingual game design portfolio exploring UX, systems, and technical design.",
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
