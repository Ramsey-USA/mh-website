/**
 * Analytics Dashboard API
 * Provides analytics data for admin dashboard
 */

import { type NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/middleware";
import { withSecurity } from "@/middleware/security";
import { logger } from "@/lib/utils/logger";
import { analyticsEngine } from "@/lib/analytics/index";

export const runtime = "edge";
export const dynamic = "force-dynamic";

function handler(request: NextRequest) {
  if (request.method !== "GET") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    // Get analytics data from the engine
    const dashboardData = analyticsEngine.getDashboardData();

    // Add sample/mock data if the engine returns empty data
    const enrichedData = {
      overview: dashboardData.overview,
      userBehavior: dashboardData.userBehavior,
      performance: dashboardData.performance,
      conversions: dashboardData.conversions,
      veteranInsights: dashboardData.veteranInsights,
      realTime: dashboardData.realTime,
    };

    logger.info("Dashboard data fetched successfully");

    return NextResponse.json(enrichedData);
  } catch (error) {
    logger.error("Dashboard data fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics data" },
      { status: 500 },
    );
  }
}

export const GET = requireRole(["admin"], withSecurity(handler));
