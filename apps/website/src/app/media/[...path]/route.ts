import { NextResponse, type NextRequest } from "next/server";
import { getR2Bucket, type R2Bucket } from "@/lib/cloudflare/r2";
import { logger } from "@/lib/utils/logger";

export const dynamic = "force-dynamic";

const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".pdf": "application/pdf",
};

function contentTypeFor(path: string): string {
  const dot = path.lastIndexOf(".");
  const ext = dot >= 0 ? path.slice(dot).toLowerCase() : "";
  return CONTENT_TYPES[ext] ?? "application/octet-stream";
}

function fallbackPublicPath(segments: string[]): string | null {
  if (segments.length < 2) return null;

  // Pilot migration path:
  // /media/qr-codes/**  -> /images/qr-codes/**
  if (segments[0] === "qr-codes") {
    return `/images/${segments.join("/")}`;
  }

  return null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const segments = path;

  const SAFE_SEGMENT = /^[\w\-.]+$/;
  if (!segments.length || segments.some((s) => !SAFE_SEGMENT.test(s))) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  const key = `media/${segments.join("/")}`;

  let bucket: R2Bucket | null;
  try {
    bucket = getR2Bucket("FILE_ASSETS");
  } catch {
    bucket = null;
  }

  if (bucket) {
    try {
      const object = await bucket.get(key);

      if (object) {
        const contentType =
          object.httpMetadata?.["contentType"] || contentTypeFor(key);

        return new NextResponse(object.body as ReadableStream, {
          status: 200,
          headers: {
            "Content-Type": contentType,
            "Cache-Control":
              "public, max-age=86400, stale-while-revalidate=604800",
            "X-Content-Type-Options": "nosniff",
          },
        });
      }
    } catch (error) {
      logger.error("R2 fetch error for media proxy:", error);
    }
  }

  const fallbackPath = fallbackPublicPath(segments);
  if (fallbackPath) {
    return NextResponse.redirect(new URL(fallbackPath, request.url), {
      status: 307,
    });
  }

  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
