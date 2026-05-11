import type { Metadata } from "next";
import { getFAQSEO } from "@/lib/seo/page-seo-utils";
import { StructuredData } from "@/components/seo/SeoMeta";

// Enhanced SEO metadata for FAQ page
const seoData = getFAQSEO();
const { schemas, ...metadataProps } = seoData;
export const metadata: Metadata = metadataProps;

export default function FAQLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params?: { category?: string };
}>) {
  return (
    <>
      {params?.category ? null : <StructuredData data={schemas} />}
      {children}
    </>
  );
}
