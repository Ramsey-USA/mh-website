/**
 * Safety Jobs API – collection endpoint
 * GET  /api/safety/jobs  – list active jobs (superintendent or admin)
 * POST /api/safety/jobs  – create a new job (admin only)
 */

import { type NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/utils/logger";
import { createDbClient } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";
import { requireRole } from "@/lib/auth/middleware";
import { type JWTUser } from "@/lib/auth/jwt";
import { withSecurity } from "@/middleware/security";
import { rateLimit, rateLimitPresets } from "@/lib/security/rate-limiter";

export const dynamic = "force-dynamic";

export interface Job {
  id: string;
  job_number: string;
  job_name: string;
  location: string | null;
  pm_name: string | null;
  super_name: string | null;
  status: "active" | "closed" | "archived";
  created_at: string;
  updated_at: string;
}

async function handleGET(_request: NextRequest, _user: JWTUser) {
  try {
    const DB = getD1Database();
    if (!DB) {
      return NextResponse.json(
        { error: "Database not available" },
        { status: 503 },
      );
    }

    const db = createDbClient({ DB });
    const jobs = await db.query<Job>(
      `SELECT * FROM jobs WHERE status = 'active' ORDER BY job_number ASC`,
    );

    return NextResponse.json({ success: true, data: jobs });
  } catch (error) {
    logger.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 },
    );
  }
}

async function handlePOST(request: NextRequest, _user: JWTUser) {
  try {
    const body = await request.json();
    const { job_number, job_name, location, pm_name, super_name } = body ?? {};

    if (
      typeof job_number !== "string" ||
      !job_number.trim() ||
      typeof job_name !== "string" ||
      !job_name.trim()
    ) {
      return NextResponse.json(
        { error: "job_number and job_name are required" },
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
    const id = await db.insert("jobs", {
      job_number: job_number.trim(),
      job_name: job_name.trim(),
      location: typeof location === "string" ? location.trim() || null : null,
      pm_name: typeof pm_name === "string" ? pm_name.trim() || null : null,
      super_name:
        typeof super_name === "string" ? super_name.trim() || null : null,
      status: "active",
    });

    const job = await db.queryOne<Job>(`SELECT * FROM jobs WHERE id = ?`, id);

    logger.info(`Created job: ${job_number} – ${job_name}`);
    return NextResponse.json({ success: true, data: job }, { status: 201 });
  } catch (error) {
    logger.error("Error creating job:", error);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 },
    );
  }
}

// GET: superintendent/admin only
export const GET = requireRole(
  ["admin", "superintendent"],
  withSecurity(handleGET),
);
// POST: admin only
export const POST = rateLimit(rateLimitPresets.api)(
  requireRole(["admin"], withSecurity(handlePOST)),
);
