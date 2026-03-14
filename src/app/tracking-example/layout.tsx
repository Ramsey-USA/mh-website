import type { Metadata } from "next";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";

export const metadata: Metadata = withGeoMetadata({
  title: "Analytics Tracking Example | MH Construction",
  description:
    "Internal reference page demonstrating analytics tracking components and instrumentation patterns.",
  alternates: {
    canonical: "https://www.mhc-gc.com/tracking-example",
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Analytics Tracking Example | MH Construction",
    description: "Internal analytics implementation example page.",
    type: "website",
    locale: "en_US",
    url: "https://www.mhc-gc.com/tracking-example",
  },
  twitter: {
    card: "summary",
    title: "Analytics Tracking Example | MH Construction",
    description:
      "Internal reference page for analytics event tracking patterns.",
  },
});

export default function TrackingExampleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
