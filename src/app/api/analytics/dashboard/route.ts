export const runtime = "edge";

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

export const GET = requireRole(["admin"], withSecurity(handler));
