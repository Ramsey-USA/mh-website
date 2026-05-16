/**
 * SSSP Document Download
 * GET /api/safety/sssp/[jobId]/download
 *
 * Returns the generated SSSP document for the given job. Serves from R2 if
 * available, otherwise falls back to the inline content stored in the DB.
 * Admin-only.
 */

import { type NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/utils/logger";
import { createDbClient } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";
import { requireRole } from "@/lib/auth/middleware";
import { type JWTUser } from "@/lib/auth/jwt";
import { withSecurity } from "@/middleware/security";
import {
  notFound,
  internalServerError,
  serviceUnavailable,
} from "@/lib/api/responses";
import { getR2Bucket, R2StorageService } from "@/lib/cloudflare/r2";
import type { SsspRecord } from "@/lib/dashboard/safety";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ jobId: string }>;
}

async function handleGET(
  _request: NextRequest,
  _user: JWTUser,
  context?: unknown,
) {
  try {
    const { jobId } = await (context as RouteParams).params;

    const DB = getD1Database();
    if (!DB) {
      return serviceUnavailable("Database not available");
    }

    const db = createDbClient({ DB });

    const sssp = await db.queryOne<SsspRecord>(
      `SELECT * FROM sssp WHERE job_id = ? AND status IN ('ready', 'approved') ORDER BY created_at DESC LIMIT 1`,
      jobId,
    );

    if (!sssp) {
      return notFound("No approved or ready SSSP found for this job");
    }

    // Try R2 first
    if (sssp.r2_key) {
      const r2Bucket = getR2Bucket("SSSP_OUTPUT");
      if (r2Bucket) {
        const r2Service = new R2StorageService(r2Bucket, "sssp-output");
        const result = await r2Service.getFile(sssp.r2_key);

        if (result.success && result.data) {
          return new NextResponse(result.data, {
            headers: {
              "Content-Type": result.contentType ?? "text/markdown",
              "Content-Disposition": `attachment; filename="sssp-${jobId}.md"`,
              "Cache-Control": "no-store",
            },
          });
        }
        logger.warn("SSSP R2 fetch failed, falling back to inline content", {
          ssspId: sssp.id,
          r2Key: sssp.r2_key,
        });
      }
    }

    // Fall back to inline DB content
    if (!sssp.content) {
      return notFound("SSSP content not yet available");
    }

    return new NextResponse(sssp.content, {
      headers: {
        "Content-Type": "text/markdown",
        "Content-Disposition": `attachment; filename="sssp-${jobId}.md"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (_error) {
    logger._error("Error downloading SSSP:", error);
    return internalServerError("Failed to download SSSP");
  }
}

export const GET = requireRole(["admin"], withSecurity(handleGET));
