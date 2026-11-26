import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Repwise",
  description: "Egyszerű, átlátható napi forgalom- és kasszakezelés.",
  applicationName: "Repwise",
};

export const viewport: Viewport = {
  themeColor: "#123d2b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hu">
      <body>{children}</body>
    </html>
  );
}
