/**
 * Analytics Dashboard API
 * Provides analytics data for admin dashboard.
 *
 * Reads aggregated metrics from Cloudflare KV (cross-visitor data).
 * Falls back to zero-value response when KV is unavailable.
 */

import { type NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/middleware";
import { withSecurity } from "@/middleware/security";
import { logger } from "@/lib/utils/logger";
import {
  getAccessLogAnalytics,
  getAnalyticsOverview,
  getDriversAnalytics,
  getLeadsAnalytics,
  getSafetyAnalytics,
} from "@/lib/dashboard/read-model";

export const dynamic = "force-dynamic";

// Fixed cache key — all admins see the same dashboard snapshot.
const DASHBOARD_CACHE_KEY = new Request(
  "https://cache.internal/analytics/dashboard",
  { method: "GET" },
);

async function handler(_request: NextRequest) {
  try {
    const [overview, leads, safety, drivers, accessLog] = await Promise.all([
      getAnalyticsOverview(),
      getLeadsAnalytics(),
      getSafetyAnalytics(),
      getDriversAnalytics(),
      getAccessLogAnalytics(),
    ]);

    logger.info("Dashboard compatibility payload fetched");
    return NextResponse.json({
      ...overview,
      sections: {
        leads,
        safety,
        drivers,
        accessLog,
      },
    });
  } catch (error) {
    logger.error("Dashboard data fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics data" },
      { status: 500 },
    );
  }
}

async function cachedHandler(request: NextRequest): Promise<Response> {
  // Worker Cache API: cache the dashboard for 30 s to avoid recomputing the
  // analytics aggregate on every admin page refresh.
  try {
    const cache = (caches as unknown as { default: Cache }).default;
    const cached = await cache.match(DASHBOARD_CACHE_KEY);
    if (cached) return cached;

    const response = await handler(request);

    try {
      const toCache = response.clone();
      toCache.headers.set("Cache-Control", "private, max-age=30, s-maxage=30");
      await cache.put(DASHBOARD_CACHE_KEY, toCache);
    } catch {
      // Best-effort; do not block the response.
    }

    return response;
  } catch {
    // Cache API unavailable; fall back to uncached handler.
    return handler(request);
  }
}

export const GET = requireRole(["admin"], withSecurity(cachedHandler));
