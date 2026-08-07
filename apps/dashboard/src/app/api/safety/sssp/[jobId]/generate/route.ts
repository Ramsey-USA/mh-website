/**
 * SSSP Generation Trigger
 * POST /api/safety/sssp/[jobId]/generate
 *
 * Creates or resets the SSSP record only after the private document factory
 * transport is fully configured. Dispatch is awaited and failures are recorded
 * instead of leaving an orphaned "generating" record.
 */

import { type NextRequest } from "next/server";
import { logger } from "@/lib/utils/logger";
import { createDbClient } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";
import { requireRole } from "@/lib/auth/middleware";
import { type JWTUser } from "@/lib/auth/jwt";
import { withSecurity } from "@/middleware/security";
import { rateLimit } from "@/lib/security/rate-limiter";
import {
  createSuccessResponse,
  badRequest,
  internalServerError,
  serviceUnavailable,
} from "@/lib/api/responses";
import {
  dispatchSsspFactoryWorkOrder,
  isSsspFactoryConfigured,
} from "@/lib/safety/sssp-factory";
import type { SsspRecord, SsspSourceFile, Job } from "@/lib/dashboard/safety";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ jobId: string }>;
}

async function handlePOST(
  _request: NextRequest,
  user: JWTUser,
  context?: unknown,
) {
  try {
    const { jobId } = await (context as RouteParams).params;

    if (!isSsspFactoryConfigured()) {
      return serviceUnavailable(
        "Private SSSP factory transport is not configured",
      );
    }

    const DB = getD1Database();
    if (!DB) {
      return serviceUnavailable("Database not available");
    }

    const db = createDbClient({ DB });

    const job = await db.queryOne<Job>(
      `SELECT * FROM jobs WHERE id = ?`,
      jobId,
    );
    if (!job) {
      return badRequest("Job not found");
    }

    const sourceFiles = await db.query<SsspSourceFile>(
      `SELECT * FROM sssp_source_files WHERE job_id = ? ORDER BY uploaded_at ASC`,
      jobId,
    );

    if (sourceFiles.length === 0) {
      return badRequest(
        "No plan files uploaded. Upload at least one project plan before generating.",
      );
    }

    const existing = await db.queryOne<SsspRecord>(
      `SELECT * FROM sssp WHERE job_id = ? ORDER BY created_at DESC LIMIT 1`,
      jobId,
    );

    let ssspId: string;
    if (existing) {
      await db.update("sssp", existing.id, {
        status: "generating",
        content: null,
        r2_key: null,
        generated_at: null,
        approved_by: null,
        approved_at: null,
      });
      ssspId = existing.id;
    } else {
      ssspId = await db.insert("sssp", {
        job_id: jobId,
        status: "generating",
      });
    }

    for (const file of sourceFiles) {
      if (!file.sssp_id) {
        await db.update("sssp_source_files", file.id, { sssp_id: ssspId });
      }
    }

    const dispatch = await dispatchSsspFactoryWorkOrder({
      ssspId,
      jobId,
      jobNumber: job.job_number,
      jobName: job.job_name,
      location: job.location,
      pmName: job.pm_name,
      superName: job.super_name,
      sourceFiles: sourceFiles.map((file) => ({
        id: file.id,
        fileKey: file.file_key,
        originalFilename: file.original_filename,
        contentType: file.content_type,
      })),
      triggeredBy: user.name ?? user.uid,
    });

    if (!dispatch.success) {
      await db.update("sssp", ssspId, {
        status: "draft",
      });
      logger.error("SSSP generation dispatch rejected", {
        ssspId,
        jobId,
        error: dispatch.error,
      });
      return serviceUnavailable(
        "Private SSSP factory did not accept the work order",
      );
    }

    logger.info("SSSP generation triggered", { ssspId, jobId });

    return createSuccessResponse(
      { ssspId, status: "generating" },
      "SSSP generation started.",
    );
  } catch (_error) {
    logger.error("Error triggering SSSP generation:", _error);
    return internalServerError("Failed to trigger SSSP generation");
  }
}

export const POST = rateLimit({ maxRequests: 5, windowMs: 60_000 })(
  requireRole(["admin"], withSecurity(handlePOST)),
);
