/**
 * Geolocation API
 * Provides geographic location data from Cloudflare headers
 */

import { type NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/utils/logger";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    // Extract Cloudflare geolocation headers
    // These are automatically added by Cloudflare in production
    const country = request.headers.get("CF-IPCountry") || undefined;
    const city = request.headers.get("CF-IPCity") || undefined;
    const region = request.headers.get("CF-Region") || undefined;
    const regionCode = request.headers.get("CF-Region-Code") || undefined;
    const latitude = request.headers.get("CF-IPLatitude") || undefined;
    const longitude = request.headers.get("CF-IPLongitude") || undefined;
    const timezone = request.headers.get("CF-Timezone") || undefined;
    const postalCode = request.headers.get("CF-PostalCode") || undefined;

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

    // Map Cloudflare data to our format
    const locationData = {
      country: country,
      countryCode: country, // Cloudflare returns country code
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
}
