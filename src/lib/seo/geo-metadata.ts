import { type Metadata } from "next";
import { COMPANY_INFO } from "@/lib/constants/company";

interface GeoOverride {
  placename?: string;
  region?: string;
  latitude?: number;
  longitude?: number;
}

/**
 * Adds stable GEO metadata tags used by search engines and location-aware crawlers.
 */
export function withGeoMetadata(
  metadata: Metadata,
  geoOverride?: GeoOverride,
): Metadata {
  const latitude = geoOverride?.latitude ?? COMPANY_INFO.coordinates.latitude;
  const longitude =
    geoOverride?.longitude ?? COMPANY_INFO.coordinates.longitude;
  const placename = geoOverride?.placename ?? COMPANY_INFO.address.city;
  const region =
    geoOverride?.region ??
    `${COMPANY_INFO.address.country}-${COMPANY_INFO.address.stateCode}`;

  const existingOther = normalizeOther(metadata.other);

  return {
    ...metadata,
    other: {
      ...existingOther,
      "geo.region": region,
      "geo.placename": placename,
      "geo.position": `${latitude};${longitude}`,
      ICBM: `${latitude}, ${longitude}`,
      "business:contact_data:locality": placename,
      "business:contact_data:region": COMPANY_INFO.address.stateCode,
      "business:contact_data:postal_code": COMPANY_INFO.address.zip,
      "business:contact_data:country_name": "USA",
    },
  };
}

function normalizeOther(metadataOther: Metadata["other"]): {
  [name: string]: string | number | (string | number)[];
} {
  if (!metadataOther) {
    return {};
  }

  const normalized: { [name: string]: string | number | (string | number)[] } =
    {};

  for (const [key, value] of Object.entries(metadataOther)) {
    if (value !== undefined) {
      normalized[key] = value;
    }
  }

  return normalized;
}
