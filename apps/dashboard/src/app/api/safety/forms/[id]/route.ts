/**
 * Safety Form Submissions API – single submission endpoint
 * GET   /api/safety/forms/[id]  – get submission (superintendent or admin)
 * PATCH /api/safety/forms/[id]  – update status or increment print_count (admin)
 */

import { type NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/utils/logger";
import { createDbClient } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";
import { requireRole } from "@/lib/auth/middleware";
import { type JWTUser } from "@/lib/auth/jwt";
import { type SafetyFormSubmission } from "../route";
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
    const scopedSubmittedBy = user.name ?? user.uid;
    const sql =
      user.role === "admin"
        ? `SELECT sfs.*, j.job_number, j.job_name
           FROM safety_form_submissions sfs
           LEFT JOIN jobs j ON j.id = sfs.job_id
           WHERE sfs.id = ?`
        : `SELECT sfs.*, j.job_number, j.job_name
           FROM safety_form_submissions sfs
           LEFT JOIN jobs j ON j.id = sfs.job_id
           WHERE sfs.id = ? AND sfs.submitted_by = ?`;
    const params = user.role === "admin" ? [id] : [id, scopedSubmittedBy];

    const submission = await db.queryOne<
      SafetyFormSubmission & { job_number: string; job_name: string }
    >(sql, ...params);

    if (!submission) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: submission });
  } catch (error) {
    logger.error("Error fetching submission:", error);
    return NextResponse.json(
      { error: "Failed to fetch submission" },
      { status: 500 },
    );
  }
}

const ALLOWED_STATUS = new Set(["submitted", "reviewed", "archived"]);

async function handlePATCH(
  request: NextRequest,
  _user: JWTUser,
  context?: unknown,
) {
  try {
    const { id } = await (context as RouteParams).params;
    const body = await request.json();

    const DB = getD1Database();
    if (!DB) {
      return NextResponse.json(
        { error: "Database not available" },
        { status: 503 },
      );
    }

    const db = createDbClient({ DB });

    const updates: Record<string, unknown> = {};

    if (typeof body.status === "string") {
      if (!ALLOWED_STATUS.has(body.status)) {
        return NextResponse.json(
          { error: "status must be one of: submitted, reviewed, archived" },
          { status: 400 },
        );
      }
      updates["status"] = body.status;
    }

    if (body.increment_print === true) {
      // Increment print_count directly in SQL instead of reading first
      const DB2 = getD1Database();
      if (!DB2) {
        return NextResponse.json(
          { error: "Database not available" },
          { status: 503 },
        );
      }
      const db2 = createDbClient({ DB: DB2 });
      await db2.execute(
        `UPDATE safety_form_submissions SET print_count = print_count + 1 WHERE id = ?`,
        id,
      );
    }

    if (Object.keys(updates).length > 0) {
      const updated = await db.update("safety_form_submissions", id, updates);
      if (!updated) {
        return NextResponse.json(
          { error: "Submission not found" },
          { status: 404 },
        );
      }
    }

    const submission = await db.queryOne<SafetyFormSubmission>(
      `SELECT * FROM safety_form_submissions WHERE id = ?`,
      id,
    );

    return NextResponse.json({ success: true, data: submission });
  } catch (error) {
    logger.error("Error updating submission:", error);
    return NextResponse.json(
      { error: "Failed to update submission" },
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
