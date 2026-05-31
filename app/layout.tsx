import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JiangLabs",
  description: "Private home portal for JiangLabs. Sign in to open your services.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

