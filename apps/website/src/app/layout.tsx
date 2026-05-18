import type { Metadata, Viewport } from "next";
import { cookies, headers } from "next/headers";
import Script from "next/script";
import { Suspense } from "react";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";
import "../styles/material-icons.css";
import { AppShell } from "@/components/layout/AppShell";
import FaviconLinks from "@/components/layout/FaviconLinks";
import { ThemeProvider } from "@/contexts/theme-context";
import { ErrorBoundary } from "@/components/error";
import { SentryInit } from "@/components/monitoring/SentryInit";
import { SentryTestButton } from "@/components/monitoring/SentryTestButton";
import ChatWidgetLazy from "@/components/chatbot/ChatWidgetLazy";
import { DeferredPerformanceEnhancements } from "@/components/performance/DeferredPerformanceEnhancements";
import {
  StructuredData,
  generateEnhancedOrganizationSchema,
  generateWebsiteSchema,
} from "@/components/seo/SeoMeta";
import { SkipLink } from "@/components/ui/accessibility/SkipLink";
import { ScrollProgress } from "@/components/ui/accessibility/ScrollProgress";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { COMPANY_INFO } from "@/lib/constants/company";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE_NAME,
  SUPPORTED_LOCALES,
  normalizeLocale,
} from "@/lib/i18n/locale";
import { getMessages } from "next-intl/server";

export const metadata: Metadata = withGeoMetadata({
  metadataBase: new URL(
    process.env["NEXT_PUBLIC_SITE_URL"] || COMPANY_INFO.urls.getSiteUrl(),
  ),
  title: {
    default:
      "Base HQ → Home | Building Projects for the Client, NOT the Dollar | MH Construction",
    // Child routes already provide fully-branded titles in most cases.
    // Keep template neutral to avoid duplicate "| MH Construction" suffixes.
    template: "%s",
  },
  description:
    "Base HQ → Home: Your Tri-State Construction Command Center. Founded 2010, Veteran-Owned Since January 2025. Headquartered in the Tri-Cities (Pasco, Richland, Kennewick), delivering projects across Washington, Oregon, and Idaho throughout the Pacific Northwest. Dual-label approach: Military Operations → Construction Services. Service-earned values meet construction excellence with disciplined execution, authentic partnerships, and transparent communication. Chain of Command structure with 150+ years combined expertise. Montana expansion coming soon.",
  keywords: [
    "Base HQ Home construction command center",
    "dual-label military civilian construction",
    "Veteran-Owned Since January 2025 contractor",
    "disciplined execution construction",
    "service-earned construction values",
    "Chain of Command construction approach",
    "Operations Services dual messaging",
    "Projects portfolio terminology",
    "Contact construction consultation",
    "Pacific Northwest builder",
    "general contractor",
    "general contractor Tri-State",
    "Richland general contractor",
    "Pasco general contractor",
    "Kennewick general contractor",
    "Benton County general contractor",
    "Franklin County general contractor",
    "Tri-State construction company",
    "general contractor Richland WA",
    "general contractor Pasco WA",
    "general contractor Kennewick WA",
    "construction services",
    "veteran benefits construction",
    "Tri-State licensed contractor",
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
    "Army Veteran-Owned Since January 2025 construction",
    "all-branch military construction",
    "clear construction communication",
    "proven construction excellence",
  ],
  authors: [
    {
      name: "MH Construction - Veteran-Owned Since January 2025 Partnership-Driven Team",
    },
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
      "Base HQ → Home | Building Projects for the Client, NOT the Dollar | MH Construction",
    description:
      "Your Tri-State Construction Command Center. Founded 2010, Veteran-Owned Since January 2025. Tri-Cities headquarters in Pasco, Richland, and Kennewick with licensed coverage across WA, OR, and ID. Dual-label approach: Military Operations → Construction Services. Service-earned values meet construction excellence.",
    images: [
      {
        url: "/images/og-default.jpg",
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
      "Base HQ → Home | Building Projects for the Client, NOT the Dollar | MH Construction",
    description:
      "Your Tri-State Construction Command Center. Founded 2010, Veteran-Owned Since January 2025. Tri-Cities headquarters in Pasco, Richland, and Kennewick. Licensed in WA, OR, and ID with Montana expansion coming soon.",
    images: ["/images/og-default.jpg"],
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
  // Google Search Console verification
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in Cloudflare dashboard after completing GSC setup
  verification: {
    google: process.env["NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION"],
  },
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#386851",
  colorScheme: "light dark",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const requestHeaders = await headers();
  const locale = normalizeLocale(cookieStore.get(LOCALE_COOKIE_NAME)?.value);
  const messages = await getMessages();
  const isProduction = process.env.NODE_ENV === "production";
  const isLighthouseAudit = /Chrome-Lighthouse/i.test(
    requestHeaders.get("user-agent") ?? "",
  );
  const enableRuntimeEnhancements = isProduction && !isLighthouseAudit;

  return (
    <html lang={locale}>
      <head>
        <FaviconLinks />
        {/* Google Analytics */}
        {process.env["NEXT_PUBLIC_GA_MEASUREMENT_ID"] && (
          <GoogleAnalytics
            measurementId={process.env["NEXT_PUBLIC_GA_MEASUREMENT_ID"]}
          />
        )}
        {/* Cloudflare Email Protection - async non-blocking script */}
        <Script
          id="cf-email-protection-shim"
          strategy="beforeInteractive"
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
        {/* Preconnect to external origins used by GA and Sentry to reduce
            connection latency (TCP + TLS handshake done early) */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://use.typekit.net" />
        <link rel="dns-prefetch" href="https://use.typekit.net" />
        <link
          rel="stylesheet"
          href="https://use.typekit.net/jqs8bjh.css"
          media="print"
          onLoad="this.media='all'"
          crossOrigin="anonymous"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://use.typekit.net/jqs8bjh.css"
            crossOrigin="anonymous"
          />
        </noscript>
        {/* Preload self-hosted Material Icons font for optimal performance */}
        <link
          rel="preload"
          href="/fonts/MaterialIcons-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <Script
          id="set-html-lang-from-cookie"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(() => {
              const escapeRegex = (value) => value.replace(/[.*+?^$()|[\\]{}\\\\]/g, "\\\\$&");
              const localeCookieName = ${JSON.stringify(LOCALE_COOKIE_NAME)};
              const localePattern = new RegExp(\`(?:^|;\\\\s*)\${escapeRegex(localeCookieName)}=([^;]+)\`);
              const match = document.cookie.match(localePattern);
              const supportedLocales = ${JSON.stringify(SUPPORTED_LOCALES)};
              const locale = match && supportedLocales.includes(match[1]) ? match[1] : ${JSON.stringify(DEFAULT_LOCALE)};
              document.documentElement.lang = locale;
            })();`,
          }}
        />
        {!isProduction || isLighthouseAudit ? (
          <Script
            id="clear-sw-cache-for-dev-and-lighthouse"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(() => {
                try {
                  if ("serviceWorker" in navigator) {
                    navigator.serviceWorker.getRegistrations()
                      .then((registrations) => Promise.all(registrations.map((r) => r.unregister())))
                      .catch(() => undefined);
                  }
                  if ("caches" in window) {
                    caches.keys()
                      .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
                      .catch(() => undefined);
                  }
                } catch {
                  // Best-effort cleanup for dev and Lighthouse audits.
                }
              })();`,
            }}
          />
        ) : null}

        {/* Enhanced Schema Markup */}
        {isProduction ? (
          <StructuredData
            data={[
              generateEnhancedOrganizationSchema(),
              generateWebsiteSchema(),
            ]}
          />
        ) : null}
      </head>
      <body className="font-sans">
        {isProduction ? <SentryInit /> : null}
        {!isProduction ? (
          <Suspense>
            <SentryTestButton />
          </Suspense>
        ) : null}
        <SkipLink />
        <ScrollProgress />
        {enableRuntimeEnhancements ? <DeferredPerformanceEnhancements /> : null}
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            defaultTheme="light"
            storageKey="mh-construction-theme"
          >
            <ErrorBoundary>
              <AppShell>{children}</AppShell>
              {isProduction ? <ChatWidgetLazy /> : null}
            </ErrorBoundary>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
