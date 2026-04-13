/**
 * Health Check API Endpoint
 *
 * Provides service health status for monitoring:
 * - Cloudflare D1, KV, R2, AI bindings
 * - Resend email configuration
 * - Twilio SMS configuration (optional)
 *
 * This endpoint is intentionally unauthenticated for uptime monitoring tools.
 * It does not expose sensitive data—only service availability status.
 */

import { NextResponse } from "next/server";
import {
  checkAllServices,
  getQuickHealthStatus,
} from "@/lib/services/health-check";

export const dynamic = "force-dynamic";

/**
 * GET /api/health
 *
 * Quick health check: Returns basic status without async DB checks
 * Query param: ?full=true for comprehensive service health
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const fullCheck = url.searchParams.get("full") === "true";

  if (fullCheck) {
    // Full async health check (includes D1, KV, R2 connectivity)
    const report = await checkAllServices();

    return NextResponse.json(
      {
        status: report.overall,
        timestamp: report.timestamp,
        services: report.services.reduce(
          (acc, svc) => {
            acc[svc.name] = {
              status: svc.status,
              ...(svc.latency !== undefined && { latency_ms: svc.latency }),
            };
            return acc;
          },
          {} as Record<string, { status: string; latency_ms?: number }>,
        ),
      },
      {
        status: report.overall === "unhealthy" ? 503 : 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      },
    );
  }

  // Quick sync-only check (no DB calls)
  const quickStatus = getQuickHealthStatus();

  return NextResponse.json(
    {
      status: "healthy",
      timestamp: new Date().toISOString(),
      services: {
        email: quickStatus.email ? "configured" : "unconfigured",
        sms: quickStatus.sms ? "configured" : "unconfigured (optional)",
      },
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );
}
