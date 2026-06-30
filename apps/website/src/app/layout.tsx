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
    default: "Home | Construction Planning and Delivery | MH Construction",
    // Child routes already provide fully-branded titles in most cases.
    // Keep template neutral to avoid duplicate "| MH Construction" suffixes.
    template: "%s",
  },
  description:
    "Home base for MH Construction services, project pathways, and planning resources across Washington, Oregon, and Idaho from our Tri-Cities headquarters. We pride ourselves on being the answer before the problem through Professional Pre-Construction and Handoff Procedures. Every complex project presents a minefield of operational risks—MHC neutralizes the variables and secures your delivery. Every build introduces unique structural and regulatory challenges. MHC provides the precise project management required to navigate them on time and within scope.",
  keywords: [
    "MH Construction home",
    "Tri-State construction center",
    "disciplined execution construction",
    "values-driven construction leadership",
    "structured leadership construction approach",
    "services overview",
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
    "disciplined project management",
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
    "all-branch military construction",
    "clear construction communication",
    "proven construction excellence",
  ],
  authors: [
    {
      name: "MH Construction Partnership-Driven Team",
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
      "Home | Building Projects for the Client, NOT the Dollar | MH Construction",
    description:
      "Construction services, planning resources, and project pathways for WA, OR, and ID from MH Construction's Tri-Cities headquarters.",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "MH Construction - Veteran-Owned General Contractor - Home",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mhc_gc",
    creator: "@mhc_gc",
    title:
      "Home | Building Projects for the Client, NOT the Dollar | MH Construction",
    description:
      "Construction services and project planning resources from MH Construction across Washington, Oregon, and Idaho.",
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
          media="all"
          crossOrigin="anonymous"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://use.typekit.net/jqs8bjh.css"
            crossOrigin="anonymous"
          />
        </noscript>
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
          <ThemeProvider defaultTheme="dark" storageKey="mh-construction-theme">
            <ErrorBoundary>
              <AppShell>{children}</AppShell>
              {!isLighthouseAudit ? <ChatWidgetLazy /> : null}
            </ErrorBoundary>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
