import { type Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title:
    "Contact Us | MH Construction - Concrete, Carpentry & General Contracting",
  description:
    "Connect with MH Construction for expert concrete, carpentry, and general contracting services in Pasco, WA. Call (509) 308-6489 or visit us at 3111 N. Capital Ave. Building for the Owner, NOT the Dollar.",
  keywords: [
    "contact MH Construction",
    "Pasco construction contact",
    "concrete services Pasco",
    "carpentry services Tri-Cities",
    "general contractor Washington",
    "construction consultation",
    "urgent construction support",
  ],
  openGraph: {
    title: "Contact MH Construction | Your Partnership Team",
    description:
      "Reach out to MH Construction for professional concrete, carpentry, and construction services in the Pacific Northwest.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact MH Construction",
    description:
      "Connect with your partnership team for expert construction services in Pasco, WA.",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
