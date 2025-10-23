import type { Metadata } from "next";
import { getProjectsSEO } from "@/lib/seo/page-seo-utils";
import { StructuredData } from "@/components/seo/enhanced-seo";

// Enhanced SEO metadata for Projects page
const seoData = getProjectsSEO();
const { schemas, ...metadataProps } = seoData;
export const metadata: Metadata = metadataProps;

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Enhanced Projects Structured Data for SEO */}
      <StructuredData data={schemas} />
      {children}
    </>
  );
}
