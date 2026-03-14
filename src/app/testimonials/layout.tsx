import type { Metadata } from "next";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";

export const metadata: Metadata = withGeoMetadata({
  title:
    "Commendations → Reviews | Trusted Results from Pacific Northwest Client Partners | MH Construction",
  description:
    "Read verified client testimonials and project feedback from commercial, industrial, and public-sector partners across Tri-Cities and the Pacific Northwest.",
  keywords: [
    "construction testimonials",
    "client reviews MH Construction",
    "Tri-Cities contractor reviews",
    "veteran-owned construction feedback",
    "commercial construction testimonials",
    "Pacific Northwest construction reputation",
  ],
  alternates: {
    canonical: "https://www.mhc-gc.com/testimonials",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Commendations → Reviews | MH Construction",
    description:
      "Verified testimonials from clients across Washington, Oregon, and Idaho.",
    type: "website",
    locale: "en_US",
    url: "https://www.mhc-gc.com/testimonials",
  },
  twitter: {
    card: "summary_large_image",
    title: "Client Testimonials | MH Construction",
    description:
      "Verified client feedback and construction success stories across the Pacific Northwest.",
  },
});

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
