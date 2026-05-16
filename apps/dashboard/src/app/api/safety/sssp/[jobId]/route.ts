/**
 * SSSP API – per-job collection endpoint
 * GET   /api/safety/sssp/[jobId]  – get current SSSP record + source files (admin)
 * PATCH /api/safety/sssp/[jobId]  – update status or notes (admin)
 */

import { type NextRequest } from "next/server";
import { logger } from "@/lib/utils/logger";
import { createDbClient } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";
import { requireRole } from "@/lib/auth/middleware";
import { type JWTUser } from "@/lib/auth/jwt";
import { withSecurity } from "@/middleware/security";
import { rateLimit, rateLimitPresets } from "@/lib/security/rate-limiter";
import {
  createSuccessResponse,
  badRequest,
  internalServerError,
  serviceUnavailable,
} from "@/lib/api/responses";
import type { SsspRecord, SsspSourceFile } from "@/lib/dashboard/safety";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ jobId: string }>;
}

const ALLOWED_STATUS = new Set(["draft", "generating", "ready", "approved"]);

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
      `SELECT * FROM sssp WHERE job_id = ? ORDER BY created_at DESC LIMIT 1`,
      jobId,
    );

    const sourceFiles = await db.query<SsspSourceFile>(
      `SELECT * FROM sssp_source_files WHERE job_id = ? ORDER BY uploaded_at DESC`,
      jobId,
    );

    return createSuccessResponse({ sssp, sourceFiles });
  } catch (_error) {
    logger._error("Error fetching SSSP:", error);
    return internalServerError("Failed to fetch SSSP");
  }
}

async function handlePATCH(
  request: NextRequest,
  user: JWTUser,
  context?: unknown,
) {
  try {
    const { jobId } = await (context as RouteParams).params;
    const body = await request.json();
    const { status, notes } = body ?? {};

    if (status !== undefined) {
      if (typeof status !== "string" || !ALLOWED_STATUS.has(status)) {
        return badRequest(
          "status must be one of: draft, generating, ready, approved",
        );
      }
    }

    if (notes !== undefined && typeof notes !== "string") {
      return badRequest("notes must be a string");
    }

    const DB = getD1Database();
    if (!DB) {
      return serviceUnavailable("Database not available");
    }

    const db = createDbClient({ DB });

    const existing = await db.queryOne<SsspRecord>(
      `SELECT * FROM sssp WHERE job_id = ? ORDER BY created_at DESC LIMIT 1`,
      jobId,
    );

    if (!existing) {
      return badRequest("No SSSP found for this job");
    }

    const updates: Record<string, unknown> = {};
    if (status !== undefined) {
      updates["status"] = status;
      if (status === "approved") {
        updates["approved_by"] = user.name ?? user.uid;
        updates["approved_at"] = new Date().toISOString();
      }
    }
    if (notes !== undefined) {
      updates["notes"] = notes;
    }

    if (Object.keys(updates).length === 0) {
      return badRequest("No valid fields provided for update");
    }

    await db.update("sssp", existing.id, updates);

    const updated = await db.queryOne<SsspRecord>(
      `SELECT * FROM sssp WHERE id = ?`,
      existing.id,
    );

    return createSuccessResponse(updated);
  } catch (_error) {
    logger._error("Error updating SSSP:", error);
    return internalServerError("Failed to update SSSP");
  }
}

export const GET = requireRole(["admin"], withSecurity(handleGET));
export const PATCH = rateLimit(rateLimitPresets.api)(
  requireRole(["admin"], withSecurity(handlePATCH)),
);
