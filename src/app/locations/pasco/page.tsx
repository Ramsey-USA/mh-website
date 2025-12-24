import { type Metadata } from "next";
import { getLocationBySlug } from "@/lib/data/locations";
import { LocationPageContent } from "@/components/locations/LocationPageContent";

const location = getLocationBySlug("pasco")!;

export const metadata: Metadata = {
  title: location.seo.title,
  description: location.seo.metaDescription,
  keywords: location.seo.keywords,
  alternates: {
    canonical: `https://www.mhc-gc.com/locations/${location.slug}`,
  },
  openGraph: {
    title: location.seo.title,
    description: location.seo.openGraphDescription,
    url: `https://www.mhc-gc.com/locations/${location.slug}`,
    siteName: "MH Construction",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `General Contractor ${location.city} ${location.state} | MH Construction`,
    description: location.seo.twitterDescription,
    creator: "@mhc_gc",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PascoLocationPage() {
  return <LocationPageContent location={location} />;
}
