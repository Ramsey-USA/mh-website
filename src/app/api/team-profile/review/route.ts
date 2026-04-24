/**
 * Team Profile Review API
 *
 * GET  /api/team-profile/review  – List all pending profile submissions
 * POST /api/team-profile/review  – Approve or reject a submission
 *
 * Restricted to the designated approver (Matt).
 * Protected: admin role + approver email check.
 */

import { type NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/middleware";
import { withSecurity } from "@/middleware/security";
import { getD1Database } from "@/lib/db/env";
import { createDbClient } from "@/lib/db/client";
import { logger } from "@/lib/utils/logger";
import {
  createSuccessResponse,
  badRequest,
  forbidden,
  notFound,
  internalServerError,
  serviceUnavailable,
} from "@/lib/api/responses";
import type { JWTUser } from "@/lib/auth/jwt";
import {
  vintageTeamMembers,
  APPROVER_EMAIL,
} from "@/lib/data/vintage-team";

export const dynamic = "force-dynamic";

// ─── DB row type ──────────────────────────────────────────────────────────────

interface PendingRow {
  slug: string;
  bio: string | null;
  fun_fact: string | null;
  certifications: string | null;
  hobbies: string | null;
  special_interests: string | null;
  career_highlights: string | null;
  specialties: string | null;
  skills: string | null;
  current_year_stats: string | null;
  career_stats: string | null;
  years_with_company: number | null;
  hometown: string | null;
  education: string | null;
  nickname: string | null;
  status: string;
  submitted_at: string | null;
  updated_at: string | null;
  updated_by: string | null;
  reviewed_at: string | null;
  reviewed_by: string | null;
  rejection_reason: string | null;
}

// ─── Authorization helper ─────────────────────────────────────────────────────

function assertApprover(user: JWTUser): NextResponse | null {
  if (user.email?.toLowerCase() !== APPROVER_EMAIL.toLowerCase()) {
    return forbidden("Only the designated approver can access this resource");
  }
  return null;
}

// ─── GET — list pending submissions ──────────────────────────────────────────

async function handleGet(
  _request: NextRequest,
  user: JWTUser,
): Promise<NextResponse> {
  const deny = assertApprover(user);
  if (deny) return deny;

  const DB = getD1Database();
  if (!DB) return serviceUnavailable("Database not available");

  try {
    const db = createDbClient({ DB });
    const rows = await db.query<PendingRow>(
      "SELECT * FROM team_profiles WHERE status = 'pending_approval' ORDER BY submitted_at ASC",
    );

    // Enrich each row with the member's display name for the review UI
    const submissions = rows.map((row) => {
      const member = vintageTeamMembers.find((m) => m.slug === row.slug);
      return {
        slug: row.slug,
        name: member?.name ?? row.slug,
        role: member?.role ?? "",
        submittedAt: row.submitted_at,
        updatedAt: row.updated_at,
        // Field preview
        bio: row.bio,
        funFact: row.fun_fact,
        certifications: row.certifications,
        hobbies: row.hobbies,
        specialInterests: row.special_interests,
        hometown: row.hometown,
        education: row.education,
        nickname: row.nickname,
        yearsWithCompany: row.years_with_company,
        careerHighlights: safeParseJson<string[]>(row.career_highlights),
        specialties: safeParseJson<string[]>(row.specialties),
        skills: safeParseJson<Record<string, number>>(row.skills),
        currentYearStats: safeParseJson<Record<string, unknown>>(
          row.current_year_stats,
        ),
        careerStats: safeParseJson<Record<string, number>>(row.career_stats),
      };
    });

    return createSuccessResponse({ submissions, count: submissions.length });
  } catch (err) {
    logger.error("team-profile/review GET: DB query failed", { err });
    return internalServerError("Failed to load pending submissions");
  }
}

// ─── POST — approve or reject a submission ────────────────────────────────────

async function handlePost(
  request: NextRequest,
  user: JWTUser,
): Promise<NextResponse> {
  const deny = assertApprover(user);
  if (deny) return deny;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return badRequest("Invalid JSON body");
  }

  if (typeof body !== "object" || body === null) {
    return badRequest("Request body must be a JSON object");
  }

  const src = body as Record<string, unknown>;
  const slug = typeof src["slug"] === "string" ? src["slug"].trim() : null;
  const action = src["action"];
  const rejectionReason =
    typeof src["rejectionReason"] === "string"
      ? src["rejectionReason"].trim().slice(0, 500)
      : null;

  if (!slug) return badRequest("slug is required");
  if (action !== "approve" && action !== "reject") {
    return badRequest("action must be 'approve' or 'reject'");
  }
  if (action === "reject" && !rejectionReason) {
    return badRequest("rejectionReason is required when rejecting");
  }

  // Verify slug is a known team member
  const member = vintageTeamMembers.find((m) => m.slug === slug);
  if (!member) return notFound("Team member not found");

  const DB = getD1Database();
  if (!DB) return serviceUnavailable("Database not available");

  try {
    const db = createDbClient({ DB });
    const now = new Date().toISOString();
    const newStatus = action === "approve" ? "approved" : "rejected";

    // Verify a pending row actually exists
    const existing = await db.queryOne<{ status: string }>(
      "SELECT status FROM team_profiles WHERE slug = ?",
      slug,
    );

    if (!existing) {
      return notFound("No submission found for this team member");
    }

    if (existing.status !== "pending_approval") {
      return badRequest(
        `Submission is already '${existing.status}' and cannot be reviewed again`,
      );
    }

    await db.execute(
      `UPDATE team_profiles
       SET status = ?,
           reviewed_at = ?,
           reviewed_by = ?,
           rejection_reason = ?
       WHERE slug = ?`,
      newStatus,
      now,
      user.uid,
      action === "reject" ? rejectionReason : null,
      slug,
    );

    logger.info("Team profile review decision", {
      slug,
      action: newStatus,
      reviewer: user.uid,
    });

    const message =
      action === "approve"
        ? `${member.name}'s profile has been approved and will appear on the team page within 1 hour.`
        : `${member.name}'s profile has been rejected.`;

    return createSuccessResponse({ slug, status: newStatus }, message);
  } catch (err) {
    logger.error("team-profile/review POST: DB update failed", { err, slug });
    return internalServerError("Failed to process review decision");
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function safeParseJson<T>(value: string | null): T | undefined {
  if (!value) return undefined;
  try {
    return JSON.parse(value) as T;
  } catch {
    return undefined;
  }
}

// ─── Route exports ────────────────────────────────────────────────────────────

export const GET = requireRole(["admin"], withSecurity(handleGet));
export const POST = requireRole(["admin"], withSecurity(handlePost));
