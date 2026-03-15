import ContactPageClient from "./ContactPageClient";
import { StructuredData } from "@/components/seo/SeoMeta";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";

export default function ContactPage() {
  return (
    <>
      <StructuredData
        data={generateBreadcrumbSchema(breadcrumbPatterns.contact)}
      />
      <ContactPageClient />
    </>
  );
}
