import type { Metadata } from "next";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";
import { COMPANY_INFO } from "@/lib/constants/company";

const siteUrl = COMPANY_INFO.urls.getSiteUrl();

export const metadata: Metadata = withGeoMetadata({
  title: "Safety Culture | MH Construction",
  description:
    "MH Construction Safety Culture page covering credentials, standards, and safety leadership.",
  alternates: {
    canonical: `${siteUrl}/safety`,
  },
  robots: {
    index: false,
    follow: false,
  },
});

export default function SafetyHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
