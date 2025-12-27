/**
 * Geographic Location Tracking
 *
 * Provides IP-based geolocation for analytics.
 * Uses multiple fallback strategies:
 * 1. Cloudflare headers (CF-IPCountry, CF-IPCity) - fastest, free
 * 2. ipapi.co API - fallback, free tier 1k/day
 * 3. Timezone-based inference - last resort
 */

import { logger } from "@/lib/utils/logger";

export interface GeographicLocation {
  country?: string;
  countryCode?: string;
  state?: string;
  city?: string;
  zip?: string;
  latitude?: number;
  longitude?: number;
  region?: string;
  timezone?: string;
  source: "cloudflare" | "ipapi" | "timezone" | "unknown";
}

/**
 * Get geographic location from Cloudflare headers
 * This is the fastest method and doesn't require external API calls
 */
async function getLocationFromCloudflare(): Promise<GeographicLocation | null> {
  try {
    // In production, Cloudflare adds headers to requests
    // We can access these via a server-side API endpoint
    const response = await fetch("/api/analytics/geolocation", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      if (data.country) {
        return {
          ...data,
          source: "cloudflare" as const,
        };
      }
    }
  } catch (error) {
    logger.debug("Cloudflare location not available:", error);
  }
  return null;
}

/**
 * Get geographic location from ipapi.co
 * Free tier: 1,000 requests per day
 */
async function getLocationFromIPAPI(): Promise<GeographicLocation | null> {
  try {
    const response = await fetch("https://ipapi.co/json/", {
      method: "GET",
      headers: {
        "User-Agent": "MH-Construction-Analytics/1.0",
      },
    });

    if (response.ok) {
      const data = await response.json();

      // Check if we hit rate limit
      if (data.error) {
        logger.warn("IPAPI error:", data.reason);
        return null;
      }

      return {
        country: data.country_name,
        countryCode: data.country_code,
        state: data.region,
        city: data.city,
        zip: data.postal,
        latitude: data.latitude,
        longitude: data.longitude,
        region: data.continent_code,
        timezone: data.timezone,
        source: "ipapi" as const,
      };
    }
  } catch (error) {
    logger.debug("IPAPI location failed:", error);
  }
  return null;
}

/**
 * Infer basic location from timezone
 * This is a fallback that provides regional-level data
 */
function getLocationFromTimezone(): GeographicLocation {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

  // Basic timezone to region mapping
  let region = "Unknown";
  let country = "Unknown";
  let state: string | undefined;

  if (timezone.includes("America/")) {
    region = "Americas";

    // Infer state from common US timezones
    if (timezone.includes("Los_Angeles") || timezone.includes("Pacific")) {
      country = "United States";
      state = "West Coast";
    } else if (timezone.includes("New_York") || timezone.includes("Eastern")) {
      country = "United States";
      state = "East Coast";
    } else if (timezone.includes("Chicago") || timezone.includes("Central")) {
      country = "United States";
      state = "Central";
    } else if (timezone.includes("Denver") || timezone.includes("Mountain")) {
      country = "United States";
      state = "Mountain";
    } else if (timezone.includes("Phoenix") || timezone.includes("Arizona")) {
      country = "United States";
      state = "Arizona";
    } else if (timezone.includes("Boise")) {
      country = "United States";
      state = "Idaho";
    }
  } else if (timezone.includes("Europe/")) {
    region = "Europe";
  } else if (timezone.includes("Asia/")) {
    region = "Asia";
  } else if (timezone.includes("Pacific/")) {
    region = "Pacific";
  }

  return {
    country,
    region,
    ...(state && { state }),
    timezone,
    source: "timezone" as const,
  };
}

/**
 * Cache for geographic location to avoid repeated API calls
 */
let locationCache: GeographicLocation | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

/**
 * Get user's geographic location with multiple fallback strategies
 * Results are cached for 1 hour to minimize API calls
 */
export async function getGeographicLocation(): Promise<GeographicLocation> {
  // Return cached location if available and fresh
  if (locationCache && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return locationCache;
  }

  // Try Cloudflare first (fastest, most accurate in production)
  const cloudflareLocation = await getLocationFromCloudflare();
  if (cloudflareLocation) {
    locationCache = cloudflareLocation;
    cacheTimestamp = Date.now();
    return cloudflareLocation;
  }

  // Try ipapi.co as fallback
  const ipapiLocation = await getLocationFromIPAPI();
  if (ipapiLocation) {
    locationCache = ipapiLocation;
    cacheTimestamp = Date.now();
    return ipapiLocation;
  }

  // Last resort: timezone-based inference
  const timezoneLocation = getLocationFromTimezone();
  locationCache = timezoneLocation;
  cacheTimestamp = Date.now();
  return timezoneLocation;
}

/**
 * Clear location cache (useful for testing)
 */
export function clearLocationCache(): void {
  locationCache = null;
  cacheTimestamp = 0;
}

/**
 * Format location for display
 */
export function formatLocation(location: GeographicLocation): string {
  const parts: string[] = [];

  if (location.city) parts.push(location.city);
  if (location.state) parts.push(location.state);
  if (location.country && location.country !== "Unknown") {
    parts.push(location.country);
  }

  return parts.length > 0 ? parts.join(", ") : "Unknown Location";
}

/**
 * Check if location is in target market (Washington, Oregon, Idaho)
 */
export function isTargetMarket(location: GeographicLocation): boolean {
  const targetStates = ["Washington", "Oregon", "Idaho", "WA", "OR", "ID"];

  if (location.state) {
    return targetStates.some((state) =>
      location.state?.toLowerCase().includes(state.toLowerCase()),
    );
  }

  return false;
}
