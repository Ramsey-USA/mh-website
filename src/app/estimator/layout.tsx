import type { Metadata } from "next";
import { getAutomatedEstimatorSEO } from "@/lib/seo/page-seo-utils";

// Enhanced SEO metadata for AI Budget Estimator
const seoData = getAutomatedEstimatorSEO();
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
      {/* Enhanced AI Budget Estimator Structured Data for SEO */}
      <StructuredData data={schemas} />
      {children}
    </>
  );
}
