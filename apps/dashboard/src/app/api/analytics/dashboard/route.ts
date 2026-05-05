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
  getDashboardSnapshot,
  type KVDashboardSnapshot,
} from "@/lib/analytics/kv-store";

export const dynamic = "force-dynamic";

// Fixed cache key — all admins see the same dashboard snapshot.
const DASHBOARD_CACHE_KEY = new Request(
  "https://cache.internal/analytics/dashboard",
  { method: "GET" },
);

function buildDashboardResponse(snapshot: KVDashboardSnapshot) {
  const avgDuration =
    snapshot.sessions.count > 0
      ? Math.round(snapshot.sessions.totalDuration / snapshot.sessions.count)
      : 0;

  // Top pages sorted by views
  const topPages = Object.entries(snapshot.pageviews.pages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([page, views]) => ({ page, views }));

  return {
    pageviews: snapshot.pageviews,
    conversions: snapshot.conversions,
    clicks: snapshot.clicks,
    sessions: {
      ...snapshot.sessions,
      averageDuration: avgDuration,
    },
    topPages,
    today: {
      pageviews: snapshot.dailyPageviews?.total ?? 0,
      sessions: snapshot.dailySessions?.count ?? 0,
    },
  };
}

async function handler(_request: NextRequest) {
  try {
    const snapshot = await getDashboardSnapshot();

    if (!snapshot) {
      logger.warn(
        "ANALYTICS KV not available — returning empty dashboard data. " +
          "Provision with: wrangler kv namespace create ANALYTICS",
      );
      return NextResponse.json({
        pageviews: { pages: {}, total: 0, lastUpdated: "" },
        conversions: {
          contacts: 0,
          consultations: 0,
          total: 0,
          lastUpdated: "",
        },
        clicks: [],
        sessions: {
          count: 0,
          totalDuration: 0,
          averageDuration: 0,
          lastUpdated: "",
        },
        topPages: [],
        today: { pageviews: 0, sessions: 0 },
        kvStatus: "unavailable",
      });
    }

    const data = buildDashboardResponse(snapshot);
    logger.info("Dashboard data fetched from KV");
    return NextResponse.json({ ...data, kvStatus: "connected" });
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
