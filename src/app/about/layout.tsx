import type { Metadata } from "next";
import { getAboutSEO } from "@/lib/seo/page-seo-utils";
import { StructuredData } from "@/components/seo/seo-meta";

// Enhanced SEO metadata for About page
const seoData = getAboutSEO();
const { schemas, ...metadataProps } = seoData;
export const metadata: Metadata = metadataProps;

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Enhanced About Structured Data for SEO */}
      <StructuredData data={schemas} />
      {children}
    </>
  );
}
