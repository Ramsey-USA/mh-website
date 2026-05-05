import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/theme-context";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0B4DA2" },
    { media: "(prefers-color-scheme: dark)", color: "#1e293b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env["NEXT_PUBLIC_SITE_URL"] || "https://www.mhc-gc.com",
  ),
  title: {
    default: "Operations Hub | MH Construction",
    template: "%s | MH Construction",
  },
  description:
    "MH Construction Operations Hub — admin dashboard and field staff portal.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-slate-50 dark:bg-gray-950 font-body antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
