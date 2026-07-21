import { NextResponse } from "next/server";
import {
  OG_DEFAULT_IMAGE_PATH,
  resolveOgTemplateRecord,
} from "@/lib/seo/og-image";

const CACHE_CONTROL =
  "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800";

function contentTypeForImagePath(imagePath: string): string {
  if (imagePath.endsWith(".webp")) {
    return "image/webp";
  }
  if (imagePath.endsWith(".png")) {
    return "image/png";
  }

  return "image/jpeg";
}

function redirectToImage(requestUrl: string, imagePath: string): NextResponse {
  const response = NextResponse.redirect(new URL(imagePath, requestUrl), {
    status: 307,
  });

  response.headers.set("Cache-Control", CACHE_CONTROL);
  response.headers.set("Content-Type", contentTypeForImagePath(imagePath));
  response.headers.set("X-Robots-Tag", "noindex");
  return response;
}

/**
 * Preserve the legacy /api/og endpoint while serving the static share image.
 * This avoids bundling next/og and its wasm/font payloads into the worker.
 */
export function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const type = requestUrl.searchParams.get("type");
  const id = requestUrl.searchParams.get("id");

  // Legacy no-arg requests continue to resolve to the branded default image.
  if (!type && !id) {
    return redirectToImage(request.url, OG_DEFAULT_IMAGE_PATH);
  }

  if (!type || !id) {
    return NextResponse.json(
      { error: "Both type and id parameters are required." },
      { status: 400 },
    );
  }

  const resolved = resolveOgTemplateRecord(type, id);
  if (!resolved.ok) {
    const status =
      resolved.code === "invalid-type" || resolved.code === "invalid-id"
        ? 400
        : 404;

    return NextResponse.json(
      {
        error: resolved.message,
      },
      { status },
    );
  }

  return redirectToImage(request.url, resolved.record.imagePath);
}
