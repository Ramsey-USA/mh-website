import { type Metadata } from "next";
import ContactPageClient from "./ContactPageClient";
import { StructuredData } from "@/components/seo/seo-meta";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";

export const metadata: Metadata = {
  title:
    "Rally Point → Contact | Your Project. Our Expertise. Let's Connect. | MH Construction",
  description:
    "Rally Point → Contact: Your Project. Our Expertise. Let's Connect. Schedule your free mission brief - start with SITREP-level clarity. Connect with MH Construction for expert concrete, carpentry, and general contracting services in Pasco, WA. Call (509) 308-6489 or visit us at 3111 N. Capitol Ave. Building projects for the client, NOT the dollar.",
  keywords: [
    "Rally Point Contact mission brief",
    "SITREP-level clarity consultation",
    "contact MH Construction",
    "Pasco construction contact",
    "concrete services Pasco",
    "carpentry services Tri-Cities",
    "general contractor Washington",
    "construction consultation",
    "urgent construction support",
  ],
  openGraph: {
    title:
      "Rally Point → Contact | Your Project. Our Expertise. | MH Construction",
    description:
      "Schedule your free mission brief. Reach out to MH Construction for professional construction services with military precision and partnership approach.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rally Point → Contact | MH Construction",
    description:
      "Schedule your free mission brief. Connect with your partnership team for expert construction services in Pasco, WA.",
  },
  alternates: {
    canonical: "/contact",
  },
};

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
