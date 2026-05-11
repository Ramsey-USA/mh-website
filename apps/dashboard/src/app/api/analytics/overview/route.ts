import { NextResponse, type NextRequest } from "next/server";
import { requireRole } from "@/lib/auth/middleware";
import { withSecurity } from "@/middleware/security";
import { getAnalyticsOverview } from "@/lib/dashboard/read-model";

export const dynamic = "force-dynamic";

async function handler(_request: NextRequest) {
  const data = await getAnalyticsOverview();
  const response = NextResponse.json(data);
  response.headers.set("Cache-Control", "private, max-age=15, s-maxage=15");
  return response;
}

export const GET = requireRole(["admin"], withSecurity(handler));
