/**
 * Safety Form Submissions API – collection endpoint
 * GET  /api/safety/forms  – list submissions, filterable (admin only)
 * POST /api/safety/forms  – submit a new form (superintendent)
 */

import { type NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/utils/logger";
import { createDbClient } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";
import { requireRole } from "@/lib/auth/middleware";
import { type JWTUser } from "@/lib/auth/jwt";
import { withSecurity } from "@/middleware/security";
import { rateLimit, rateLimitPresets } from "@/lib/security/rate-limiter";
import { sendToN8nAsync } from "@/lib/notifications/n8n-webhook";

export const dynamic = "force-dynamic";

export type FormType =
  | "toolbox-talk"
  | "site-safety-inspection"
  | "incident-report"
  | "jha";

export interface SafetyFormSubmission {
  id: string;
  job_id: string;
  form_type: FormType;
  submitted_by: string;
  submitted_at: string;
  data: string; // JSON
  print_count: number;
  status: "submitted" | "reviewed" | "archived";
}

const VALID_FORM_TYPES = new Set<FormType>([
  "toolbox-talk",
  "site-safety-inspection",
  "incident-report",
  "jha",
]);

async function handleGET(request: NextRequest, user: JWTUser) {
  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get("job_id");
    const formType = searchParams.get("form_type");
    const status = searchParams.get("status");
    // submitted_by: admin may pass any value; superintendent is locked to their own name
    const submittedByParam = searchParams.get("submitted_by");
    const submittedBy =
      user.role === "superintendent"
        ? (user.name ?? user.uid)
        : submittedByParam;

    const DB = getD1Database();
    if (!DB) {
      return NextResponse.json(
        { error: "Database not available" },
        { status: 503 },
      );
    }

    const db = createDbClient({ DB });

    const conditions: string[] = [];
    const params: string[] = [];

    if (jobId) {
      conditions.push("job_id = ?");
      params.push(jobId);
    }
    if (formType) {
      conditions.push("form_type = ?");
      params.push(formType);
    }
    if (status) {
      conditions.push("status = ?");
      params.push(status);
    }
    if (submittedBy) {
      conditions.push("submitted_by = ?");
      params.push(submittedBy);
    }

    const where =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
    const sql = `
      SELECT sfs.*, j.job_number, j.job_name
      FROM safety_form_submissions sfs
      LEFT JOIN jobs j ON j.id = sfs.job_id
      ${where}
      ORDER BY sfs.submitted_at DESC
      LIMIT 200
    `;

    const submissions = await db.query<
      SafetyFormSubmission & { job_number: string; job_name: string }
    >(sql, ...params);

    return NextResponse.json({ success: true, data: submissions });
  } catch (error) {
    logger.error("Error fetching form submissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch submissions" },
      { status: 500 },
    );
  }
}

async function handlePOST(request: NextRequest, user: JWTUser) {
  try {
    const body = await request.json();
    const { job_id, form_type, data } = body ?? {};

    if (typeof job_id !== "string" || !job_id) {
      return NextResponse.json(
        { error: "job_id is required" },
        { status: 400 },
      );
    }

    if (!VALID_FORM_TYPES.has(form_type as FormType)) {
      return NextResponse.json(
        {
          error:
            "form_type must be one of: toolbox-talk, site-safety-inspection, incident-report, jha",
        },
        { status: 400 },
      );
    }

    if (typeof data !== "object" || data === null) {
      return NextResponse.json(
        { error: "data is required and must be an object" },
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

    // Verify job exists
    const job = await db.queryOne<{ id: string }>(
      `SELECT id FROM jobs WHERE id = ? AND status = 'active'`,
      job_id,
    );
    if (!job) {
      return NextResponse.json(
        { error: "Job not found or not active" },
        { status: 404 },
      );
    }

    const id = await db.insert("safety_form_submissions", {
      job_id,
      form_type,
      submitted_by: user.name ?? user.uid,
      data: JSON.stringify(data),
      print_count: 0,
      status: "submitted",
    });

    const submission = await db.queryOne<SafetyFormSubmission>(
      `SELECT * FROM safety_form_submissions WHERE id = ?`,
      id,
    );

    // Send to n8n for notification (fire-and-forget)
    sendToN8nAsync({
      type: "safety-form",
      data: {
        id,
        formType: form_type,
        jobId: job_id,
        submittedBy: user.name ?? user.uid,
        ...data,
      },
    });

    logger.info(`Safety form submitted: ${form_type} for job ${job_id}`);
    return NextResponse.json(
      { success: true, data: submission },
      { status: 201 },
    );
  } catch (error) {
    logger.error("Error submitting safety form:", error);
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 },
    );
  }
}

// GET: admin/superintendent only — supers see only their own submissions (enforced above)
export const GET = requireRole(
  ["admin", "superintendent"],
  withSecurity(handleGET),
);
// POST: admin/superintendent only (superintendent submits)
export const POST = rateLimit(rateLimitPresets.api)(
  requireRole(["admin", "superintendent"], withSecurity(handlePOST)),
);
