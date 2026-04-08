/**
 * Safety Jobs API – single job endpoint
 * GET   /api/safety/jobs/[id]  – get job details (superintendent or admin)
 * PATCH /api/safety/jobs/[id]  – update job status (admin only)
 */

import { type NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/utils/logger";
import { createDbClient } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";
import { requireRole } from "@/lib/auth/middleware";
import { type JWTUser } from "@/lib/auth/jwt";
import { type Job } from "../route";
import { withSecurity } from "@/middleware/security";
import { rateLimit, rateLimitPresets } from "@/lib/security/rate-limiter";

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
      return NextResponse.json(
        { error: "Database not available" },
        { status: 503 },
      );
    }

    const db = createDbClient({ DB });
    const sql =
      user.role === "admin"
        ? `SELECT * FROM jobs WHERE id = ?`
        : `SELECT * FROM jobs WHERE id = ? AND status = 'active'`;
    const job = await db.queryOne<Job>(sql, id);

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: job });
  } catch (error) {
    logger.error("Error fetching job:", error);
    return NextResponse.json({ error: "Failed to fetch job" }, { status: 500 });
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
      return NextResponse.json(
        { error: "status must be one of: active, closed, archived" },
        { status: 400 },
      );
    }

    const DB = getD1Database();
    if (!DB) {
      return NextResponse.json(
        { error: "Database not available" },
        { status: 503 },
      );
    }

    const db = createDbClient({ DB });
    const updated = await db.update("jobs", id, { status });

    if (!updated) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const job = await db.queryOne<Job>(`SELECT * FROM jobs WHERE id = ?`, id);
    return NextResponse.json({ success: true, data: job });
  } catch (error) {
    logger.error("Error updating job:", error);
    return NextResponse.json(
      { error: "Failed to update job" },
      { status: 500 },
    );
  }
}

export const GET = requireRole(
  ["admin", "superintendent"],
  withSecurity(handleGET),
);
export const PATCH = rateLimit(rateLimitPresets.api)(
  requireRole(["admin"], withSecurity(handlePATCH)),
);
