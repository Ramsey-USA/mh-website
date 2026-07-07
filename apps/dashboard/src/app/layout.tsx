import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/theme-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

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

export default function DashboardRootLayout(
  props: Readonly<{ children: React.ReactNode }>,
) {
  const { children } = props;
  const enableAdobeFonts =
    process.env["NEXT_PUBLIC_ENABLE_ADOBE_FONTS"] !== "false";

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {enableAdobeFonts ? (
          <>
            <link rel="preconnect" href="https://use.typekit.net" />
            <link rel="dns-prefetch" href="https://use.typekit.net" />
            <link
              rel="stylesheet"
              href="https://use.typekit.net/jqs8bjh.css"
              media="all"
              crossOrigin="anonymous"
            />
          </>
        ) : null}
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-brand-light/40 dark:bg-brand-primary-darker font-body antialiased"
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
