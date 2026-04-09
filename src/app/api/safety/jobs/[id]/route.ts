/**
 * Safety Jobs API – single job endpoint
 * GET   /api/safety/jobs/[id]  – get job details (superintendent or admin)
 * PATCH /api/safety/jobs/[id]  – update job status (admin only)
 */

import { type NextRequest } from "next/server";
import { logger } from "@/lib/utils/logger";
import { createDbClient } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";
import { requireRole } from "@/lib/auth/middleware";
import { type JWTUser } from "@/lib/auth/jwt";
import { type Job } from "../route";
import { withSecurity } from "@/middleware/security";
import { rateLimit, rateLimitPresets } from "@/lib/security/rate-limiter";
import {
  createSuccessResponse,
  badRequest,
  notFound,
  internalServerError,
  serviceUnavailable,
} from "@/lib/api/responses";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ id: string }>;
}

async function handleGET(
  _request: NextRequest,
  user: JWTUser,
  context?: unknown,
) {
  try {
    const { id } = await (context as RouteParams).params;

    const DB = getD1Database();
    if (!DB) {
      return serviceUnavailable("Database not available");
    }

    const db = createDbClient({ DB });
    const sql =
      user.role === "admin"
        ? `SELECT * FROM jobs WHERE id = ?`
        : `SELECT * FROM jobs WHERE id = ? AND status = 'active'`;
    const job = await db.queryOne<Job>(sql, id);

    if (!job) {
      return notFound("Job not found");
    }

    return createSuccessResponse(job);
  } catch (error) {
    logger.error("Error fetching job:", error);
    return internalServerError("Failed to fetch job");
  }
}

const ALLOWED_STATUS = new Set(["active", "closed", "archived"]);

async function handlePATCH(
  request: NextRequest,
  _user: JWTUser,
  context?: unknown,
) {
  try {
    const { id } = await (context as RouteParams).params;
    const body = await request.json();
    const { status } = body ?? {};

    if (typeof status !== "string" || !ALLOWED_STATUS.has(status)) {
      return badRequest("status must be one of: active, closed, archived");
    }

    const DB = getD1Database();
    if (!DB) {
      return serviceUnavailable("Database not available");
    }

    const db = createDbClient({ DB });
    const updated = await db.update("jobs", id, { status });

    if (!updated) {
      return notFound("Job not found");
    }

    const job = await db.queryOne<Job>(`SELECT * FROM jobs WHERE id = ?`, id);
    return createSuccessResponse(job);
  } catch (error) {
    logger.error("Error updating job:", error);
    return internalServerError("Failed to update job");
  }
}

export const GET = requireRole(
  ["admin", "superintendent"],
  withSecurity(handleGET),
);
export const PATCH = rateLimit(rateLimitPresets.api)(
  requireRole(["admin"], withSecurity(handlePATCH)),
);
