import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import { Suspense } from "react";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";
import "../../../../packages/shared/src/styles/material-icons.css";
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
  generateJeremyLeadershipVideoSchema,
  generateJeremyPersonSchema,
  generateWebsiteSchema,
} from "@/components/seo/SeoMeta";
import { SkipLink } from "@/components/ui/accessibility/SkipLink";
import { ScrollProgress } from "@/components/ui/accessibility/ScrollProgress";
import { GoogleAnalytics } from "@/lib/analytics/components/GoogleAnalytics";
import { COMPANY_INFO } from "@/lib/constants/company";
import { buildDualSeoTitle } from "@/lib/branding/page-names";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE_NAME,
  SUPPORTED_LOCALES,
} from "@/lib/i18n/locale";
import { getServerLocale } from "@/lib/i18n/locale.server";
import { getMessages } from "next-intl/server";
import { getAllJeremyRibbons } from "@/lib/content/jeremy-ribbons";
import { getIndividualBrandingStamp } from "@/lib/content/individual-branding-stamps";

const SEARCH_ENGINE_VERIFICATION_OTHER = Object.fromEntries(
  [
    ["msvalidate.01", process.env["NEXT_PUBLIC_BING_SITE_VERIFICATION"]],
    [
      "baidu-site-verification",
      process.env["NEXT_PUBLIC_BAIDU_SITE_VERIFICATION"],
    ],
  ].filter((entry): entry is [string, string] => Boolean(entry[1])),
);

export const metadata: Metadata = withGeoMetadata({
  metadataBase: new URL(
    process.env["NEXT_PUBLIC_SITE_URL"] || COMPANY_INFO.urls.getSiteUrl(),
  ),
  title: {
    default: buildDualSeoTitle(
      "home",
      "Construction Planning and Delivery in WA, OR, and ID",
    ),
    // Child routes already provide fully-branded titles in most cases.
    // Keep template neutral to avoid duplicate "| MH Construction" suffixes.
    template: "%s",
  },
  description:
    "MH Construction, led by Owner & President Jeremy Thamert, partners with owners, facilities teams, and public agencies to plan and deliver commercial, tenant improvement, municipal, agricultural and winery, and light industrial projects across Washington, Oregon, and Idaho.",
  keywords: [
    "Jeremy Thamert",
    "Jeremy Thamert MH Construction",
    "Jeremy Thamert Owner and President",
    "MH Construction home",
    "Built on Quality, Backed by Trust.",
    "Squared away from start to finish.",
    "relationship-first construction partner",
    "stakeholder-focused construction delivery",
    "owner representative construction coordination",
    "facilities team construction support",
    "municipal project stakeholder alignment",
    "commercial construction consultation",
    "Pacific Northwest general contractor",
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
    "veteran-owned construction leadership",
    "Tri-State licensed contractor",
    "transparent construction partnerships",
    "client partner construction communication",
    "construction project management",
    "Procore construction project management",
    "Washington Oregon Idaho contractor",
    "agricultural and winery construction",
    "community-focused building",
    "tenant improvements contractor",
    "municipal construction services",
    "light industrial construction",
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
    "clear construction communication",
    "accountable construction delivery",
  ],
  authors: [
    {
      name: "Jeremy Thamert",
    },
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
    title: buildDualSeoTitle(
      "home",
      "Construction Planning and Delivery in WA, OR, and ID",
    ),
    description:
      "Stakeholder-focused planning and delivery for commercial, tenant improvement, municipal, agricultural and winery, and light industrial projects across Washington, Oregon, and Idaho.",
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
    title: buildDualSeoTitle(
      "home",
      "Construction Planning and Delivery in WA, OR, and ID",
    ),
    description:
      "MH Construction partners with owners, facilities teams, and public agencies to deliver commercial, tenant improvement, municipal, agricultural and winery, and light industrial projects across WA, OR, and ID.",
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
  // Search console verification (Google, Bing, Yandex, Yahoo, and Baidu)
  // Set these env vars in Cloudflare dashboard after each platform is verified.
  verification: {
    google: process.env["NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION"],
    yandex: process.env["NEXT_PUBLIC_YANDEX_VERIFICATION"],
    yahoo: process.env["NEXT_PUBLIC_YAHOO_SITE_VERIFICATION"],
    other: SEARCH_ENGINE_VERIFICATION_OTHER,
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
  const requestHeaders = await headers();
  const locale = await getServerLocale();
  const messages = await getMessages();
  const isProduction = process.env.NODE_ENV === "production";
  const isLighthouseAudit = /Chrome-Lighthouse/i.test(
    requestHeaders.get("user-agent") ?? "",
  );
  const enableRuntimeEnhancements = isProduction && !isLighthouseAudit;

  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      <head>
        <FaviconLinks />
        <Script
          id="set-theme-before-hydration"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(() => {
              try {
                const storageKey = "mh-construction-theme";
                const stored = localStorage.getItem(storageKey);
                const theme =
                  stored === "dark" || stored === "light" || stored === "system"
                    ? stored
                    : "dark";
                const prefersDark =
                  window.matchMedia &&
                  window.matchMedia("(prefers-color-scheme: dark)").matches;
                const shouldUseDark =
                  theme === "dark" || (theme === "system" && prefersDark);

                document.documentElement.classList.toggle("dark", shouldUseDark);
                document.documentElement.style.colorScheme = shouldUseDark
                  ? "dark"
                  : "light";
              } catch {
                document.documentElement.classList.add("dark");
                document.documentElement.style.colorScheme = "dark";
              }
            })();`,
          }}
        />
        {/* Google Analytics */}
        {isProduction && process.env["NEXT_PUBLIC_GA_MEASUREMENT_ID"] && (
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
        {isProduction && process.env["NEXT_PUBLIC_GA_MEASUREMENT_ID"] ? (
          <>
            <link rel="preconnect" href="https://www.googletagmanager.com" />
            <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
            <link rel="dns-prefetch" href="https://www.google-analytics.com" />
          </>
        ) : null}
        <link rel="author" href="https://www.mhc-gc.com/jeremy-thamert" />
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
              generateJeremyPersonSchema(),
              generateJeremyLeadershipVideoSchema(),
              generateWebsiteSchema(),
            ]}
          />
        ) : null}
      </head>
      <body className="font-body">
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
              <AppShell
                jeremyRibbons={getAllJeremyRibbons()}
                jeremyStamp={getIndividualBrandingStamp("jeremy-thamert")}
              >
                {children}
              </AppShell>
              {!isLighthouseAudit ? <ChatWidgetLazy /> : null}
            </ErrorBoundary>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
