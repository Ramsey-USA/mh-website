import type { Metadata } from "next";
import { getTeamSEO } from "@/lib/seo/page-seo-utils";
import { StructuredData } from "@/components/seo/enhanced-seo";

// Enhanced SEO metadata for Team page
const seoData = getTeamSEO();
const { schemas, ...metadataProps } = seoData;
export const metadata: Metadata = metadataProps;

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Enhanced Team Structured Data for SEO */}
      <StructuredData data={schemas} />
      {children}
    </>
  );
}
