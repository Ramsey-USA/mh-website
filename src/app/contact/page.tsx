import ContactPageClient from "./ContactPageClient";
import { StructuredData } from "@/components/seo/SeoMeta";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";
import { COMPANY_INFO } from "@/lib/constants/company";

const generalContractorSchema = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: COMPANY_INFO.name,
  description:
    "Expert concrete, carpentry, and general contracting services in Pasco, WA and the Pacific Northwest",
  url: COMPANY_INFO.urls.site,
  telephone: COMPANY_INFO.phone.tel,
  email: COMPANY_INFO.email.main,
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY_INFO.address.street,
    addressLocality: COMPANY_INFO.address.city,
    addressRegion: COMPANY_INFO.address.stateCode,
    postalCode: COMPANY_INFO.address.zip,
    addressCountry: COMPANY_INFO.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: COMPANY_INFO.coordinates.latitude.toString(),
    longitude: COMPANY_INFO.coordinates.longitude.toString(),
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "07:00",
    closes: "16:00",
  },
  areaServed: {
    "@type": "State",
    name: "Washington",
  },
  slogan: "Building projects for the Client, NOT the Dollar",
};

export default function ContactPage() {
  return (
    <>
      <StructuredData
        data={generateBreadcrumbSchema(breadcrumbPatterns.contact)}
      />
      <StructuredData data={generalContractorSchema} />
      <ContactPageClient />
    </>
  );
}
