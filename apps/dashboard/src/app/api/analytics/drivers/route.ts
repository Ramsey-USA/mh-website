import { NextResponse, type NextRequest } from "next/server";
import { requireRole } from "@/lib/auth/middleware";
import { withSecurity } from "@/middleware/security";
import { getDriversAnalytics } from "@/lib/dashboard/read-model";

export const dynamic = "force-dynamic";

async function handler(_request: NextRequest) {
  const data = await getDriversAnalytics();
  const response = NextResponse.json(data);
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const GET = requireRole(["admin"], withSecurity(handler));
