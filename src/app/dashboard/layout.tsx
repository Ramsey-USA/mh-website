import type { Metadata } from "next";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";

export const metadata: Metadata = withGeoMetadata({
  title: "Analytics Dashboard | MH Construction",
  description:
    "Internal analytics dashboard for MH Construction performance and conversion intelligence.",
  alternates: {
    canonical: "https://www.mhc-gc.com/dashboard",
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Analytics Dashboard | MH Construction",
    description: "Internal dashboard view for MH Construction analytics.",
    type: "website",
    locale: "en_US",
    url: "https://www.mhc-gc.com/dashboard",
  },
  twitter: {
    card: "summary",
    title: "Analytics Dashboard | MH Construction",
    description: "Internal analytics and geographic intelligence dashboard.",
  },
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
