import { NextResponse } from "next/server";

/**
 * Preserve the legacy /api/og endpoint while serving the static share image.
 * This avoids bundling next/og and its wasm/font payloads into the worker.
 */
export function GET(request: Request) {
  return NextResponse.redirect(new URL("/images/og-default.jpg", request.url), {
    status: 307,
  });
}
