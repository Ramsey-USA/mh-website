/**
 * SSSP Generation Result Callback
 * POST /api/safety/sssp/[jobId]/result
 *
 * Called by the n8n workflow after AI generation completes. Receives the
 * generated SSSP content, stores the document to R2, and marks the sssp
 * record as 'ready' for admin review.
 *
 * Authentication: shared secret via SSSP_CALLBACK_SECRET env var.
 */

import { type NextRequest } from "next/server";
import { logger } from "@/lib/utils/logger";
import { createDbClient } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";
import { withSecurity } from "@/middleware/security";
import { rateLimit } from "@/lib/security/rate-limiter";
import {
  createSuccessResponse,
  badRequest,
  unauthorized,
  internalServerError,
  serviceUnavailable,
} from "@/lib/api/responses";
import {
  generateFileKey,
  getR2Bucket,
  R2StorageService,
} from "@/lib/cloudflare/r2";
import type { SsspRecord } from "@/lib/dashboard/safety";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ jobId: string }>;
}

async function handlePOST(request: NextRequest, context?: unknown) {
  try {
    const { jobId } = await (context as RouteParams).params;

    // Verify shared secret
    const secret = process.env["SSSP_CALLBACK_SECRET"];
    const authHeader = request.headers.get("authorization");
    if (!secret || authHeader !== `Bearer ${secret}`) {
      return unauthorized("Invalid callback secret");
    }

    const body = await request.json();
    const { ssspId, content } = body ?? {};

    if (typeof ssspId !== "string" || !ssspId) {
      return badRequest("ssspId is required");
    }

    if (typeof content !== "string" || !content.trim()) {
      return badRequest("content is required and must be a non-empty string");
    }

    const DB = getD1Database();
    if (!DB) {
      return serviceUnavailable("Database not available");
    }

    const db = createDbClient({ DB });

    const existing = await db.queryOne<SsspRecord>(
      `SELECT * FROM sssp WHERE id = ? AND job_id = ?`,
      ssspId,
      jobId,
    );

    if (!existing) {
      return badRequest("SSSP record not found");
    }

    // Store generated content in R2
    const r2Bucket = getR2Bucket("SSSP_OUTPUT");
    const r2Service = new R2StorageService(r2Bucket, "sssp-output");

    let r2Key: string | null = null;

    if (r2Bucket) {
      const fileKey = generateFileKey("sssp-output", `${ssspId}.md`, jobId);
      const encoder = new TextEncoder();
      const buffer = encoder.encode(content).buffer as ArrayBuffer;

      const uploadResult = await r2Service.uploadFile(
        buffer,
        fileKey,
        "text/markdown",
        { ssspId, jobId, generatedAt: new Date().toISOString() },
      );

      if (uploadResult.success) {
        r2Key = fileKey;
      } else {
        logger.warn("Failed to store SSSP output in R2, storing inline only", {
          error: uploadResult.error,
        });
      }
    }

    await db.update("sssp", ssspId, {
      status: "ready",
      content,
      r2_key: r2Key,
      generated_at: new Date().toISOString(),
    });

    logger.info("SSSP generation complete", { ssspId, jobId });

    return createSuccessResponse(
      { ssspId, status: "ready" },
      "SSSP ready for review.",
    );
  } catch (error) {
    logger.error("Error processing SSSP result callback:", error);
    return internalServerError("Failed to process SSSP result");
  }
}

// No JWT auth — uses shared secret instead. Rate-limit tightly.
export const POST = rateLimit({ maxRequests: 20, windowMs: 60_000 })(
  withSecurity(handlePOST),
);
