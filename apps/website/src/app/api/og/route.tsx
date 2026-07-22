import { NextResponse } from "next/server";
import {
  OG_DEFAULT_IMAGE_PATH,
  resolveOgTemplateRecord,
} from "@/lib/seo/og-image";
import { MARKETING_PHASES } from "@/lib/data/project-marketing";
import { getProjectMarketingRecordBySlug } from "@/lib/data/project-marketing-records";
import { getPublishedProjectCaseStudyBySlug } from "@/lib/data/project-case-studies";

const CACHE_CONTROL =
  "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800";

const PROJECT_VARIANT_WIDTH = 1200;
const PROJECT_VARIANT_HEIGHT = 630;

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

function escapeSvgText(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function isMarketingPhase(
  value: string,
): value is (typeof MARKETING_PHASES)[number] {
  return MARKETING_PHASES.includes(value as (typeof MARKETING_PHASES)[number]);
}

function renderProjectVariantSvg(title: string, phaseLabel: string): string {
  const safeTitle = escapeSvgText(title);
  const safePhase = escapeSvgText(phaseLabel);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${PROJECT_VARIANT_WIDTH}" height="${PROJECT_VARIANT_HEIGHT}" viewBox="0 0 ${PROJECT_VARIANT_WIDTH} ${PROJECT_VARIANT_HEIGHT}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${safeTitle} project share image">
  <rect width="${PROJECT_VARIANT_WIDTH}" height="${PROJECT_VARIANT_HEIGHT}" fill="#111111" />
  <rect width="24" height="${PROJECT_VARIANT_HEIGHT}" fill="#386851" />
  <text x="72" y="118" fill="#E6E1D7" font-size="28" font-family="Mendl Sans Dusk, Arial, sans-serif" letter-spacing="6">MH CONSTRUCTION</text>
  <rect x="72" y="160" rx="14" ry="14" width="280" height="56" fill="#BD9264" />
  <text x="212" y="196" text-anchor="middle" fill="#111111" font-size="24" font-weight="700" font-family="Mendl Sans Dusk, Arial, sans-serif" letter-spacing="2">${safePhase.toUpperCase()}</text>
  <text x="72" y="300" fill="#FFFFFF" font-size="58" font-weight="800" font-family="Mendl Sans Dusk, Arial, sans-serif">${safeTitle}</text>
</svg>`;
}

/**
 * Preserve the legacy /api/og endpoint while serving the static share image.
 * This avoids bundling next/og and its wasm/font payloads into the worker.
 */
export function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const variant = requestUrl.searchParams.get("variant");

  if (variant === "project") {
    const slug = requestUrl.searchParams.get("slug");
    const phase = requestUrl.searchParams.get("phase");

    if (!slug || !phase) {
      return NextResponse.json(
        { error: "Project variant requires slug and phase parameters." },
        { status: 400 },
      );
    }

    if (!isMarketingPhase(phase)) {
      return NextResponse.json(
        { error: "Invalid project marketing phase." },
        { status: 400 },
      );
    }

    const record = getProjectMarketingRecordBySlug(slug);
    if (!record) {
      return NextResponse.json(
        { error: "Unknown project slug for project variant." },
        { status: 400 },
      );
    }

    if (record.marketingPhase !== phase) {
      return NextResponse.json(
        { error: "Phase does not match project marketing record." },
        { status: 400 },
      );
    }

    const caseStudy = getPublishedProjectCaseStudyBySlug(slug);
    if (!caseStudy) {
      return NextResponse.json(
        { error: "Project case study not found." },
        { status: 400 },
      );
    }

    const svg = renderProjectVariantSvg(caseStudy.title, phase);
    return new NextResponse(svg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": CACHE_CONTROL,
        "X-Robots-Tag": "noindex",
      },
    });
  }

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
