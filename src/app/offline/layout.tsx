import type { Metadata } from "next";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";
import { COMPANY_INFO } from "@/lib/constants/company";

const siteUrl = COMPANY_INFO.urls.getSiteUrl();

export const metadata: Metadata = withGeoMetadata({
  title: "Offline Mode | MH Construction PWA",
  description:
    "Offline fallback experience for the MH Construction progressive web app.",
  alternates: {
    canonical: `${siteUrl}/offline`,
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Offline Mode | MH Construction PWA",
    description:
      "Offline fallback page for cached MH Construction website content.",
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/offline`,
  },
  twitter: {
    card: "summary",
    title: "Offline Mode | MH Construction",
    description: "PWA offline fallback and reconnect guidance.",
  },
});

export default function OfflineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
