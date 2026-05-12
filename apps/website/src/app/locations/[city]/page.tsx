import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LocationPageContent } from "@/components/locations/LocationPageContent";
import { getLocationBySlug, getLocationSlugs } from "@/lib/data/locations";
import { generateLocationMetadata } from "@/lib/seo/location-metadata";

export const revalidate = 86400;
export const dynamicParams = false;

export function generateStaticParams(): Array<{ city: string }> {
  return getLocationSlugs().map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const location = getLocationBySlug(city);

  if (!location) {
    return {
      title: "Locations | MH Construction",
      robots: { index: false, follow: false },
    };
  }

  return generateLocationMetadata(location);
}

export default async function LocationPage({
  params,
}: Readonly<{
  params: Promise<{ city: string }>;
}>) {
  const { city } = await params;
  const location = getLocationBySlug(city);

  if (!location) {
    notFound();
  }

  return <LocationPageContent location={location} />;
}
