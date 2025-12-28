import { getLocationBySlug } from "@/lib/data/locations";
import { LocationPageContent } from "@/components/locations/LocationPageContent";
import { generateLocationMetadata } from "@/lib/seo/location-metadata";

const location = getLocationBySlug("spokane")!;

export const metadata = generateLocationMetadata(location);

export default function SpokaneLocationPage() {
  return <LocationPageContent location={location} />;
}
