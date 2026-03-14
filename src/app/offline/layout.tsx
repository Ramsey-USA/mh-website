import type { Metadata } from "next";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";

export const metadata: Metadata = withGeoMetadata({
  title: "Offline Mode | MH Construction PWA",
  description:
    "Offline fallback experience for the MH Construction progressive web app.",
  alternates: {
    canonical: "https://www.mhc-gc.com/offline",
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
    url: "https://www.mhc-gc.com/offline",
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
