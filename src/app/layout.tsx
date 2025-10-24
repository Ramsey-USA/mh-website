import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navigation, Footer } from "@/components/layout";
import FaviconLinks from "@/components/layout/FaviconLinks";
import { AuthProvider } from "@/lib/auth/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { GlobalChatbotProvider } from "@/providers/GlobalChatbotProvider";
import { WebVitalsReporter } from "@/components/performance/optimized-components";
import {
  StructuredData,
  generateEnhancedOrganizationSchema,
  generateWebsiteSchema,
} from "@/components/seo/enhanced-seo";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.mhc-gc.com"
  ),
  title: "MH Construction - AI-Powered Veteran-Owned Construction Excellence",
  description:
    "Revolutionary AI-powered construction intelligence with General MH military assistant. Veteran-owned excellence serving Pacific Northwest communities with authentic partnerships, transparent communication, and cutting-edge technology.",
  keywords: [
    "AI construction assistant",
    "veteran-owned contractor",
    "military precision construction",
    "Pacific Northwest builder",
    "AI cost estimator",
    "General MH military AI",
    "construction intelligence",
    "veteran benefits construction",
    "Tri-Cities WA contractor",
    "transparent construction partnerships",
    "real-time cost estimation",
    "military-style project management",
    "Washington Oregon Idaho contractor",
    "sustainable construction technology",
    "community-focused building",
  ],
  authors: [
    { name: "MH Construction - Veteran-Owned Partnership-Driven Team" },
  ],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MH Construction",
    startupImage: [
      {
        url: "/icons/icon-512x512.png",
        media: "(device-width: 768px) and (device-height: 1024px)",
      },
    ],
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/icons/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [
      { url: "/icons/icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#386851",
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="font-sans">
      <head>
        <FaviconLinks />
        {/* Preconnect to Google Fonts for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Google Material Icons - Now optimized with font-display in globals.css */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons&display=swap"
          rel="stylesheet"
        />
        {/* Enhanced Schema Markup */}
        <StructuredData
          data={[generateEnhancedOrganizationSchema(), generateWebsiteSchema()]}
        />
      </head>
      <body className="font-sans">
        <WebVitalsReporter />
        {/* <AnalyticsProvider
          measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
          enableScrollTracking={true}
          enableTimeTracking={true}
        > */}
        <ThemeProvider defaultTheme="light" storageKey="mh-construction-theme">
          <AuthProvider>
            <GlobalChatbotProvider>
              <Navigation />
              <div className="flex flex-col bg-white dark:bg-gray-900 min-h-screen">
                <main className="flex-grow">{children}</main>
                <Footer />
              </div>
            </GlobalChatbotProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
