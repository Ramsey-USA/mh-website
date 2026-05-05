/**
 * POST /api/testimonials/publish
 *
 * Triggers social-media posting and optional email blast for a testimonial.
 * Protected — admin role required.
 *
 * Body:
 *   { testimonialId: string; platforms: ("facebook"|"instagram"|"linkedin"|"twitter")[]; emailBlast?: boolean }
 *
 * The endpoint:
 *  1. Looks up the testimonial by ID
 *  2. Fires the n8n "testimonial-publish" webhook with a structured payload
 *  3. n8n routes the payload to each social platform and optionally triggers
 *     the email-blast sub-workflow (see docs/media/media-strategy.md §7–8)
 */

import { type NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/middleware";
import { withSecurity } from "@/middleware/security";
import { sendToN8n } from "@/lib/notifications/n8n-webhook";
import { getAllTestimonials } from "@/lib/data/testimonials";
import { badRequest, internalServerError } from "@/lib/api/responses";
import { logger } from "@/lib/utils/logger";
import { COMPANY_INFO } from "@/lib/constants/company";

export const dynamic = "force-dynamic";

type Platform = "facebook" | "instagram" | "linkedin" | "twitter";

interface PublishRequest {
  testimonialId: string;
  platforms: Platform[];
  emailBlast?: boolean;
}

const VALID_PLATFORMS = new Set<Platform>([
  "facebook",
  "instagram",
  "linkedin",
  "twitter",
]);

async function handler(request: NextRequest): Promise<NextResponse> {
  try {
    const body: PublishRequest = await request.json();
    const { testimonialId, platforms, emailBlast = false } = body;

    // --- Validate input ---
    if (!testimonialId || typeof testimonialId !== "string") {
      return badRequest("testimonialId is required");
    }
    if (!Array.isArray(platforms) || platforms.length === 0) {
      return badRequest("platforms must be a non-empty array");
    }
    const invalid = platforms.filter((p) => !VALID_PLATFORMS.has(p));
    if (invalid.length > 0) {
      return badRequest(`Unknown platforms: ${invalid.join(", ")}`);
    }

    // --- Look up testimonial ---
    const all = getAllTestimonials();
    const testimonial = all.find((t) => t.id === testimonialId);
    if (!testimonial) {
      return badRequest(`No testimonial found with id "${testimonialId}"`);
    }

    const siteUrl = COMPANY_INFO.urls.site ?? "https://www.mhc-gc.com";

    // --- Build n8n payload ---
    const result = await sendToN8n({
      type: "testimonial-publish",
      data: {
        id: testimonial.id,
        quote: testimonial.quote,
        clientName: testimonial.name,
        location: testimonial.location ?? null,
        projectType: testimonial.project ?? null,
        company: testimonial.company ?? null,
        rating: testimonial.rating ?? 5,
        type: testimonial.type,
        category: testimonial.category ?? null,
        // Absolute URLs for social platforms (must be publicly reachable)
        imageUrl: testimonial.socialCard
          ? `${siteUrl}${testimonial.socialCard}`
          : testimonial.image
            ? `${siteUrl}${testimonial.image}`
            : null,
        projectPhotoUrl: testimonial.projectPhoto
          ? `${siteUrl}${testimonial.projectPhoto}`
          : null,
        pageUrl: `${siteUrl}/testimonials`,
        platforms,
        emailBlast,
      },
      submittedAt: new Date().toISOString(),
    });

    if (!result.success) {
      logger.error("n8n testimonial-publish webhook failed", {
        testimonialId,
        error: result.error,
      });
      // Return success anyway — the site shouldn't surface internal webhook
      // failures to the admin UI as a hard error; n8n will retry.
      return NextResponse.json(
        {
          ok: true,
          warning: "n8n webhook delivery failed — check n8n logs for retry",
          testimonialId,
          platforms,
          emailBlast,
        },
        { status: 202 },
      );
    }

    logger.info("Testimonial publish triggered", {
      testimonialId,
      platforms,
      emailBlast,
    });

    return NextResponse.json(
      {
        ok: true,
        testimonialId,
        platforms,
        emailBlast,
      },
      { status: 200 },
    );
  } catch (err) {
    logger.error("Unexpected error in testimonials/publish", { err });
    return internalServerError("Failed to publish testimonial");
  }
}

export const POST = requireRole(["admin"], withSecurity(handler));
