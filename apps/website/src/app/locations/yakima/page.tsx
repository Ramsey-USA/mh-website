import { getLocationBySlug } from "@/lib/data/locations";
import { LocationPageContent } from "@/components/locations/LocationPageContent";
import { generateLocationMetadata } from "@/lib/seo/location-metadata";

export const revalidate = 86400; // 24 h ISR

const location = getLocationBySlug("yakima")!;

export const metadata = generateLocationMetadata(location);

export default function YakimaLocationPage() {
  return <LocationPageContent location={location} />;
}
