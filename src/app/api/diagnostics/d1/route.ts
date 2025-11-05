import { NextRequest, NextResponse } from "next/server";
import { getD1Database, isCloudflareWorkers } from "@/lib/db/env";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const isCloudflare = isCloudflareWorkers();
  const DB = getD1Database();

  const diagnostics: any = {
    environment: process.env.NODE_ENV,
    isCloudflareWorkers: isCloudflare,
    hasDB: DB !== null,
    hasGetRequestContext:
      typeof globalThis !== "undefined" && "getRequestContext" in globalThis,
    timestamp: new Date().toISOString(),
  };

  if (DB) {
    try {
      const result = await DB.prepare(
        "SELECT name FROM sqlite_master WHERE type='table'"
      ).all();
      diagnostics.tables = result.results;
    } catch (error) {
      diagnostics.dbError = String(error);
    }
  }

  return NextResponse.json(diagnostics);
}
