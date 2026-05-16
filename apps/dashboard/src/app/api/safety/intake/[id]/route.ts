import { type NextRequest } from "next/server";
import { logger } from "@/lib/utils/logger";
import { createDbClient } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";
import { requireRole } from "@/lib/auth/middleware";
import { type JWTUser } from "@/lib/auth/jwt";
import {
  badRequest,
  notFound,
  createSuccessResponse,
  internalServerError,
  serviceUnavailable,
} from "@/lib/api/responses";

export const dynamic = "force-dynamic";

type IntakeStatus = "pending_review" | "reviewed" | "approved" | "rejected";

interface SafetyIntakeSubmissionRow {
  id: string;
  submitter_name: string;
  submitter_email: string;
  company_name: string | null;
  category: string;
  notes: string | null;
  original_filename: string;
  file_key: string;
  content_type: string;
  file_size: number;
  status: IntakeStatus;
  review_notes: string | null;
  source_ip: string | null;
  turnstile_verified: number;
  created_at: string;
  updated_at: string;
}

interface RouteParams {
  params: Promise<{ id: string }>;
}

const VALID_STATUSES = new Set<IntakeStatus>([
  "pending_review",
  "reviewed",
  "approved",
  "rejected",
]);

async function handleGET(
  _request: NextRequest,
  _user: JWTUser,
  context?: unknown,
) {
  try {
    const { id } = await (context as RouteParams).params;

    const DB = getD1Database();
    if (!DB) {
      return serviceUnavailable("Database not available");
    }

    const db = createDbClient({ DB });
    const row = await db.queryOne<SafetyIntakeSubmissionRow>(
      `SELECT * FROM safety_intake_submissions WHERE id = ?`,
      id,
    );

    if (!row) {
      return notFound("Intake submission not found");
    }

    return createSuccessResponse(row);
  } catch (error) {
    logger.error("Error fetching intake submission", error);
    return internalServerError("Failed to fetch intake submission");
  }
}

async function handlePATCH(
  request: NextRequest,
  _user: JWTUser,
  context?: unknown,
) {
  try {
    const { id } = await (context as RouteParams).params;

    let body: Record<string, unknown>;
    try {
      body = (await request.json()) as Record<string, unknown>;
    } catch {
      return badRequest("Request body must be valid JSON");
    }

    const updates: Record<string, unknown> = {};

    if ("status" in body) {
      const status = body["status"];
      if (
        typeof status !== "string" ||
        !VALID_STATUSES.has(status as IntakeStatus)
      ) {
        return badRequest(
          "status must be one of: pending_review, reviewed, approved, rejected",
        );
      }
      updates["status"] = status;
    }

    if ("review_notes" in body) {
      const notes = body["review_notes"];
      if (notes !== null && typeof notes !== "string") {
        return badRequest("review_notes must be a string or null");
      }
      updates["review_notes"] =
        typeof notes === "string" ? notes.trim().slice(0, 4000) : null;
    }

    if (Object.keys(updates).length === 0) {
      return badRequest("No updatable fields provided (status, review_notes)");
    }

    const DB = getD1Database();
    if (!DB) {
      return serviceUnavailable("Database not available");
    }

    const db = createDbClient({ DB });
    const updated = await db.update("safety_intake_submissions", id, updates);

    if (!updated) {
      return notFound("Intake submission not found");
    }

    const row = await db.queryOne<SafetyIntakeSubmissionRow>(
      `SELECT * FROM safety_intake_submissions WHERE id = ?`,
      id,
    );

    logger.info("Intake submission updated", {
      id,
      updates: Object.keys(updates),
    });
    return createSuccessResponse(row, "Intake submission updated");
  } catch (error) {
    logger.error("Error updating intake submission", error);
    return internalServerError("Failed to update intake submission");
  }
}

export const GET = requireRole(["admin"], handleGET);
export const PATCH = requireRole(["admin"], handlePATCH);
