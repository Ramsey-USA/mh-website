/**
 * PDF Proxy Route — serves PDFs from Cloudflare R2 instead of the build bundle.
 *
 * All requests to /docs/** are caught here and proxied to the FILE_ASSETS R2
 * bucket using the key prefix "docs/".  This keeps PDFs out of the Next.js
 * build output and git history while preserving every existing URL.
 */

import { NextResponse, type NextRequest } from "next/server";
import { getR2Bucket, type R2Bucket } from "@/lib/cloudflare/r2";
import { logger } from "@/lib/utils/logger";

export const dynamic = "force-dynamic";

/** Content-type map for files we expect in the docs bucket. */
const CONTENT_TYPES: Record<string, string> = {
  ".pdf": "application/pdf",
  ".docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

function contentTypeFor(path: string): string {
  const ext = path.slice(path.lastIndexOf(".")).toLowerCase();
  return CONTENT_TYPES[ext] ?? "application/octet-stream";
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const segments = path;

  // Validate: only allow alphanumeric, hyphens, underscores, dots in segments
  const SAFE_SEGMENT = /^[\w\-.]+$/;
  if (!segments.length || segments.some((s) => !SAFE_SEGMENT.test(s))) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  const key = `docs/${segments.join("/")}`;

  let bucket: R2Bucket | null;
  try {
    bucket = getR2Bucket("FILE_ASSETS");
  } catch {
    bucket = null;
  }

  if (!bucket) {
    logger.warn("FILE_ASSETS R2 bucket not available");
    return NextResponse.json({ error: "Storage unavailable" }, { status: 503 });
  }

  try {
    const object = await bucket.get(key);

    if (!object) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const contentType = contentTypeFor(key);
    const filename = segments[segments.length - 1];

    return new NextResponse(object.body as ReadableStream, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${filename}"`,
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    logger.error("R2 fetch error for docs proxy:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
