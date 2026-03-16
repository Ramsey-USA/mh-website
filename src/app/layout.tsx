import type { Metadata, Viewport } from "next";
import "./globals.css";
import "../styles/material-icons.css";
import { Navigation, Footer } from "@/components/layout";
import FaviconLinks from "@/components/layout/FaviconLinks";
import { AuthProvider } from "@/lib/auth/auth-context";
import { ThemeProvider } from "@/contexts/theme-context";
import { WebVitalsReporter } from "@/components/performance/WebVitalsReporter";
import { MobilePerformanceMonitor } from "@/components/performance/MobilePerformanceMonitor";
import { ErrorBoundary } from "@/components/error";
import {
  StructuredData,
  generateEnhancedOrganizationSchema,
  generateWebsiteSchema,
} from "@/components/seo/SeoMeta";
import { SkipLink } from "@/components/ui/accessibility/SkipLink";
import { ScrollProgress } from "@/components/ui/accessibility/ScrollProgress";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { PWAManager } from "@/components/pwa";
import { COMPANY_INFO } from "@/lib/constants/company";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";

export const metadata: Metadata = withGeoMetadata({
  metadataBase: new URL(
    process.env["NEXT_PUBLIC_SITE_URL"] || COMPANY_INFO.urls.getSiteUrl(),
  ),
  title: {
    default:
      "Base HQ → Home | Building Projects for the Client, NOT the Dollar | MH Construction",
    template: "%s | MH Construction",
  },
  description:
    "Base HQ → Home: Your Tri-Cities Construction Command Center. Founded 2010, veteran-owned since 2025. General contractor serving the Tri-Cities (Richland, Pasco, Kennewick), Benton County, Franklin County, and Pacific Northwest. Dual-label approach: Military Operations → Construction Services. Service-earned values meet construction excellence with military precision, authentic partnerships, and transparent communication. Chain of Command structure with 150+ years combined expertise. Licensed in WA, OR, ID.",
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
    "Omak general contractor",
    "Pendleton Oregon general contractor",
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
      "Your Tri-Cities Construction Command Center. Founded 2010, veteran-owned since 2025. Dual-label approach: Military Operations → Construction Services. Service-earned values meet construction excellence. Chain of Command structure with 150+ years combined expertise. Military precision, authentic partnerships, transparent communication.",
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
      "Your Tri-Cities Construction Command Center. Founded 2010, veteran-owned since 2025. Dual-label: Military Operations → Construction Services. Service-earned values, battle-tested excellence.",
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
});

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
    <html lang="en">
      <head>
        <FaviconLinks />
        {/* Google Analytics */}
        {process.env["NEXT_PUBLIC_GOOGLE_ANALYTICS_ID"] && (
          <GoogleAnalytics
            measurementId={process.env["NEXT_PUBLIC_GOOGLE_ANALYTICS_ID"]}
          />
        )}
        {/* Cloudflare Email Protection - async non-blocking script */}
        <script
          async
          data-cfasync="false"
          dangerouslySetInnerHTML={{
            __html: `
              if (window.CloudFlare) {
                window.CloudFlare.emailDecode = window.CloudFlare.emailDecode || function() {};
              }
            `,
          }}
        />
        {/* Preload self-hosted Material Icons font for optimal performance */}
        <link
          rel="preload"
          href="/fonts/MaterialIcons-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Preload critical hero image for faster LCP */}
        <link
          rel="preload"
          href="/images/logo/mh-veteran-bg.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
        {/* Enhanced Schema Markup */}
        <StructuredData
          data={[generateEnhancedOrganizationSchema(), generateWebsiteSchema()]}
        />
      </head>
      <body className="font-sans">
        <WebVitalsReporter />
        <MobilePerformanceMonitor />
        <SkipLink />
        <ScrollProgress />
        <PWAManager />
        <ThemeProvider defaultTheme="light" storageKey="mh-construction-theme">
          <AuthProvider>
            <ErrorBoundary>
              <Navigation />
              <div className="flex flex-col bg-white dark:bg-gray-900 min-h-screen">
                <main id="main-content" className="flex-grow">
                  {children}
                </main>
                <Footer />
              </div>
            </ErrorBoundary>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
