import type { Metadata } from "next";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";
import { COMPANY_INFO } from "@/lib/constants/company";

const siteUrl = COMPANY_INFO.urls.getSiteUrl();

export const metadata: Metadata = withGeoMetadata({
  title: "Field Safety Hub | MH Construction",
  description:
    "Restricted field resource hub for MH Construction Superintendents — download safety manual sections, submit Toolbox Talks, Site Safety Inspections, Job Hazard Analyses, and Incident Reports.",
  alternates: {
    canonical: `${siteUrl}/safety/hub`,
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
