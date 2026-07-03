import type { Metadata } from "next";
import {
  formatDualPageName,
  PAGE_TERMINOLOGY,
} from "@/lib/branding/page-names";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";
import { COMPANY_INFO } from "@/lib/constants/company";

const siteUrl = COMPANY_INFO.urls.getSiteUrl();

export const metadata: Metadata = withGeoMetadata({
  title: `${formatDualPageName(PAGE_TERMINOLOGY.offline.seoName, PAGE_TERMINOLOGY.offline.mhBrandName)} | MH Construction PWA`,
  description:
    "Offline hub experience for the MH Construction progressive web app.",
  alternates: {
    canonical: `${siteUrl}/offline`,
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: `${formatDualPageName(PAGE_TERMINOLOGY.offline.seoName, PAGE_TERMINOLOGY.offline.mhBrandName)} | MH Construction PWA`,
    description: "Offline hub page for cached MH Construction website content.",
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/offline`,
  },
  twitter: {
    card: "summary",
    title: `${formatDualPageName(PAGE_TERMINOLOGY.offline.seoName, PAGE_TERMINOLOGY.offline.mhBrandName)} | MH Construction`,
    description: "PWA offline hub and reconnect guidance.",
  },
});

export default function OfflineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
