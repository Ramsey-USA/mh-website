import type { Metadata } from "next";
import { getServicesSEO } from "@/lib/seo/page-seo-utils";
import { StructuredData } from "@/components/seo/SeoMeta";

// Enhanced SEO metadata for Services
const seoData = getServicesSEO();
const { schemas, ...metadataProps } = seoData;
export const metadata: Metadata = metadataProps;

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <StructuredData data={schemas} />
      {children}
    </>
  );
}
