import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navigation, Footer } from "@/components/layout";
import FaviconLinks from "@/components/layout/FaviconLinks";
import { AuthProvider } from "@/lib/auth/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { GlobalChatbotProvider } from "@/providers/GlobalChatbotProvider";
import { WebVitalsReporter } from "@/components/performance/optimized-components";
import { ErrorBoundary } from "@/components/error";
import {
  StructuredData,
  generateEnhancedOrganizationSchema,
  generateWebsiteSchema,
} from "@/components/seo/seo-meta";
import { SkipLink } from "@/components/ui/accessibility/SkipLink";
import { ScrollProgress } from "@/components/ui/accessibility/ScrollProgress";
import { PWAManager } from "@/components/pwa";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env["NEXT_PUBLIC_SITE_URL"] || "https://www.mhc-gc.com",
  ),
  title: {
    default:
      "Base HQ → Home | Building projects for the client, NOT the dollar | MH Construction",
    template: "%s | MH Construction",
  },
  description:
    "Base HQ → Home: Your Tri-Cities Construction Command Center. Veteran-owned general contractor serving the Tri-Cities (Richland, Pasco, Kennewick), Benton County, Franklin County, and Pacific Northwest since 2010. Dual-label approach: Military Operations → Construction Services. Service-earned values meet construction excellence with military precision, authentic partnerships, and transparent communication. Chain of Command structure with 150+ years combined expertise. Licensed in WA, OR, ID.",
  keywords: [
    "Base HQ Home construction command center",
    "dual-label military civilian construction",
    "veteran-owned contractor",
    "military precision construction",
    "service-earned construction values",
    "Chain of Command construction approach",
    "Operations Services dual messaging",
    "Mission Project dual terminology",
    "Rally Point Contact construction",
    "Pacific Northwest builder",
    "general contractor",
    "general contractor Tri-Cities",
    "Richland general contractor",
    "Pasco general contractor",
    "Kennewick general contractor",
    "Benton County general contractor",
    "Franklin County general contractor",
    "Tri-Cities construction company",
    "general contractor Richland WA",
    "general contractor Pasco WA",
    "general contractor Kennewick WA",
    "construction services",
    "veteran benefits construction",
    "Tri-Cities WA contractor",
    "transparent construction partnerships",
    "construction project management",
    "military-style project management",
    "Washington Oregon Idaho contractor",
    "community-focused building",
    "concrete services",
    "carpentry contractor",
    "commercial construction",
    "Yakima general contractor",
    "Spokane general contractor",
    "Walla Walla general contractor",
    "Hermiston general contractor",
    "Coeur d'Alene general contractor",
    "Eastern Washington contractor",
    "Army veteran-owned construction",
    "all-branch military construction",
    "SITREP-level construction communication",
    "battle-tested construction excellence",
  ],
  authors: [
    { name: "MH Construction - Veteran-Owned Partnership-Driven Team" },
  ],
  creator: "MH Construction, Inc.",
  publisher: "MH Construction, Inc.",
  alternates: {
    canonical: "https://www.mhc-gc.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.mhc-gc.com",
    siteName: "MH Construction",
    title:
      "Base HQ → Home | Building projects for the client, NOT the dollar | MH Construction",
    description:
      "Your Tri-Cities Construction Command Center. Veteran-owned general contractor since 2010. Dual-label approach: Military Operations → Construction Services. Service-earned values meet construction excellence. Chain of Command structure with 150+ years combined expertise. Military precision, authentic partnerships, transparent communication.",
    images: [
      {
        url: "/images/logo/mh-logo.png",
        width: 1200,
        height: 630,
        alt: "MH Construction - Veteran-Owned General Contractor - Base HQ → Home",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mhc_gc",
    creator: "@mhc_gc",
    title:
      "Base HQ → Home | Building projects for the client, NOT the dollar | MH Construction",
    description:
      "Your Tri-Cities Construction Command Center. Veteran-owned since 2010. Dual-label: Military Operations → Construction Services. Service-earned values, battle-tested excellence.",
    images: ["/images/logo/mh-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
        {/* Google Material Icons - Direct load for immediate rendering */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons&display=block"
          rel="stylesheet"
        />
        {/* Preload critical hero image for faster LCP */}
        <link
          rel="preload"
          href="/images/logo/mh-veteran-bg.webp"
          as="image"
          type="image/png"
        />
        {/* Prefetch common navigation routes for faster page transitions */}
        <link rel="prefetch" href="/services" />
        <link rel="prefetch" href="/contact" />
        <link rel="prefetch" href="/projects" />
        <link rel="prefetch" href="/about" />
        {/* Enhanced Schema Markup */}
        <StructuredData
          data={[generateEnhancedOrganizationSchema(), generateWebsiteSchema()]}
        />
      </head>
      <body className="font-sans">
        <WebVitalsReporter />
        <SkipLink />
        <ScrollProgress />
        <PWAManager />
        <ThemeProvider defaultTheme="light" storageKey="mh-construction-theme">
          <AuthProvider>
            <GlobalChatbotProvider>
              <ErrorBoundary>
                <Navigation />
                <div className="flex flex-col bg-white dark:bg-gray-900 min-h-screen">
                  <main id="main-content" className="flex-grow">
                    {children}
                  </main>
                  <Footer />
                </div>
              </ErrorBoundary>
            </GlobalChatbotProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
