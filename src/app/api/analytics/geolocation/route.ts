/**
 * Geolocation API
 * Provides geographic location data from Cloudflare Workers cf object.
 *
 * NOTE: Only CF-IPCountry is a real HTTP header added by Cloudflare.
 * All other geo properties (city, region, timezone, etc.) are available
 * exclusively on the Workers `request.cf` object, accessed via
 * getCloudflareContext() from @opennextjs/cloudflare — NOT as headers.
 */

import { type NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { logger } from "@/lib/utils/logger";
import { rateLimit, rateLimitPresets } from "@/lib/security/rate-limiter";

export const GET = rateLimit(rateLimitPresets.public)(async (
  request: NextRequest,
) => {
  try {
    // CF-IPCountry is the only real Cloudflare HTTP header for geo.
    // All other geo data comes from the Workers cf object.
    const country = request.headers.get("CF-IPCountry") || undefined;

    // Access the Cloudflare Workers cf object for all other geo properties.
    // Wrapped in try/catch so the route doesn't throw outside a CF context.
    let city: string | undefined;
    let region: string | undefined;
    let regionCode: string | undefined;
    let latitude: string | undefined;
    let longitude: string | undefined;
    let timezone: string | undefined;
    let postalCode: string | undefined;
    try {
      const { cf } = getCloudflareContext();
      city = cf?.city ?? undefined;
      region = cf?.region ?? undefined;
      regionCode = cf?.regionCode ?? undefined;
      latitude = cf?.latitude !== undefined ? String(cf.latitude) : undefined;
      longitude =
        cf?.longitude !== undefined ? String(cf.longitude) : undefined;
      timezone = cf?.timezone ?? undefined;
      postalCode = cf?.postalCode ?? undefined;
    } catch {
      // Not in a Cloudflare Workers context (local dev fallback below handles this)
    }

    // For development, return mock data for testing
    if (process.env.NODE_ENV === "development") {
      logger.debug("Using mock geolocation data for development");
      return NextResponse.json({
        country: "United States",
        countryCode: "US",
        city: "Pasco",
        state: "Washington",
        region: "North America",
        regionCode: "WA",
        latitude: 46.2396,
        longitude: -119.1006,
        timezone: "America/Los_Angeles",
        zip: "99301",
        source: "cloudflare",
        isDevelopment: true,
      });
    }

    // If no Cloudflare headers, return null (will trigger fallback)
    if (!country) {
      return NextResponse.json(
        {
          error: "No geolocation data available",
        },
        { status: 404 },
      );
    }

    // Map Cloudflare data to our format.
    // CF-IPCountry is always a 2-letter ISO code (e.g. "US") — there is no
    // full country-name header, so both `country` and `countryCode` carry the
    // same value.  Consumers that need a display name should resolve it locally
    // (e.g.  new Intl.DisplayNames(["en"],{type:"region"}).of(countryCode)).
    const locationData = {
      country: country,
      countryCode: country,
      city: city,
      state: regionCode, // State code (e.g., "WA")
      region: region, // Full region name
      latitude: latitude ? parseFloat(latitude) : undefined,
      longitude: longitude ? parseFloat(longitude) : undefined,
      timezone: timezone,
      zip: postalCode,
      source: "cloudflare",
    };

    logger.debug("Geolocation data:", locationData);

    return NextResponse.json(locationData);
  } catch (error) {
    logger.error("Geolocation API error:", error);
    return NextResponse.json(
      { error: "Failed to get geolocation" },
      { status: 500 },
    );
  }
});
