import type { Metadata } from "next";
import { getAIEstimatorSEO } from "@/lib/seo/page-seo-utils";

// Enhanced SEO metadata for AI Estimator
const seoData = getAIEstimatorSEO();
const { schemas, ...metadataProps } = seoData;
export const metadata: Metadata = metadataProps;

import { StructuredData } from "@/components/seo/enhanced-seo";

export default function EstimatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Enhanced AI Estimator Structured Data for SEO */}
      <StructuredData data={schemas} />
      {children}
    </>
  );
}
