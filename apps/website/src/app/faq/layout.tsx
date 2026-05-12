import type { Metadata } from "next";
import { getFAQSEO } from "@/lib/seo/page-seo-utils";
import { StructuredData } from "@/components/seo/SeoMeta";
import { SectionShell } from "@/components/layout";
import { faqCategories } from "@/lib/data/faq-data";

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
      <SectionShell
        navTitle="FAQ Hub"
        navLabel="FAQ categories"
        navItems={faqCategories.map((category) => ({
          href: `/faq/${category.id}`,
          label: category.title,
        }))}
        navNote="Use the topic rail to move from orientation to specifics without losing the decision trail for your project team."
      >
        {children}
      </SectionShell>
    </>
  );
}
