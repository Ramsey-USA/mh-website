import { NextResponse, type NextRequest } from "next/server";
import { requireRole } from "@/lib/auth/middleware";
import { withSecurity } from "@/middleware/security";
import { getSafetyAnalytics } from "@/lib/dashboard/read-model";

export const dynamic = "force-dynamic";

async function handler(_request: NextRequest) {
  const data = await getSafetyAnalytics();
  const response = NextResponse.json(data);
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const GET = requireRole(["admin"], withSecurity(handler));
