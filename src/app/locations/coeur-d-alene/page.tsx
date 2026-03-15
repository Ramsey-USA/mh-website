import { getLocationBySlug } from "@/lib/data/locations";
import { LocationPageContent } from "@/components/locations/LocationPageContent";
import { generateLocationMetadata } from "@/lib/seo/location-metadata";

const location = getLocationBySlug("coeur-d-alene")!;

export const metadata = generateLocationMetadata(location);

export default function CoeurDAleneLocationPage() {
  return <LocationPageContent location={location} />;
}
