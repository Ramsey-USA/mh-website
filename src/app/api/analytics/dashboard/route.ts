/**
 * Analytics Dashboard API
 * Provides analytics data for admin dashboard
 */

import { type NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/middleware";
import { withSecurity } from "@/middleware/security";
import { logger } from "@/lib/utils/logger";
import { analyticsEngine } from "@/lib/analytics/index";

export const dynamic = "force-dynamic";

// Fixed cache key — all admins see the same dashboard snapshot.
const DASHBOARD_CACHE_KEY = new Request(
  "https://cache.internal/analytics/dashboard",
  { method: "GET" },
);

function handler(request: NextRequest) {
  if (request.method !== "GET") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const dashboardData = analyticsEngine.getDashboardData();

    logger.info("Dashboard data fetched successfully");

    return NextResponse.json(dashboardData);
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
    // caches.default is a Cloudflare Workers Cache API extension not in standard TS types
    const cache = (caches as unknown as { default: Cache }).default;
    const cached = await cache.match(DASHBOARD_CACHE_KEY);
    if (cached) return cached;

    const response = handler(request);

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
