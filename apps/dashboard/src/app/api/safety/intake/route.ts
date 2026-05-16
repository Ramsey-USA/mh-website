import { type NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/utils/logger";
import { LIMITS } from "@/lib/constants/limits";
import { sendToN8nAsync } from "@/lib/notifications/n8n-webhook";
import {
  createSuccessResponse,
  badRequest,
  internalServerError,
  serviceUnavailable,
} from "@/lib/api/responses";
import {
  generateFileKey,
  getR2Bucket,
  R2StorageService,
} from "@/lib/cloudflare/r2";
import { verifyTurnstileToken } from "@/lib/security/turnstile";
import { createDbClient } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";
import { rateLimit } from "@/lib/security/rate-limiter";
import { requireRole } from "@/lib/auth/middleware";
import { type JWTUser } from "@/lib/auth/jwt";
import { withSecurity } from "@/middleware/security";

export const dynamic = "force-dynamic";

type SafetyIntakeCategory =
  | "bonding-document"
  | "field-form"
  | "certificate"
  | "program-update"
  | "other";

interface SafetyIntakeSubmissionRow {
  id: string;
  submitter_name: string;
  submitter_email: string;
  company_name: string | null;
  category: SafetyIntakeCategory;
  notes: string | null;
  original_filename: string;
  file_key: string;
  content_type: string;
  file_size: number;
  status: "pending_review" | "reviewed" | "approved" | "rejected";
  source_ip: string | null;
  turnstile_verified: number;
  created_at: string;
  updated_at: string;
}

const VALID_CATEGORIES = new Set<SafetyIntakeCategory>([
  "bonding-document",
  "field-form",
  "certificate",
  "program-update",
  "other",
]);

const ALLOWED_FILE_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
]);

function sanitizeFilename(name: string): string {
  return name
    .replace(/[/\\:*?"<>|\x00-\x1f\x7f]/g, "_")
    .replace(/\.{2,}/g, ".")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 200);
}

function sanitizeText(
  value: FormDataEntryValue | null,
  maxLength: number,
): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function getClientIp(request: NextRequest): string | undefined {
  const cfIp = request.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp;

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;

  const forwardedFor = request.headers.get("x-forwarded-for");
  if (!forwardedFor) return undefined;

  return forwardedFor.split(",")[0]?.trim() || undefined;
}

async function handlePOST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const submitterName = sanitizeText(formData.get("name"), 120);
    const submitterEmail = sanitizeText(
      formData.get("email"),
      160,
    ).toLowerCase();
    const companyName = sanitizeText(formData.get("company"), 160);
    const category = sanitizeText(
      formData.get("category"),
      40,
    ) as SafetyIntakeCategory;
    const notes = sanitizeText(formData.get("notes"), 2000);
    const turnstileToken = sanitizeText(formData.get("turnstileToken"), 2048);

    if (!file) {
      return badRequest("No file provided");
    }

    if (!submitterName) {
      return badRequest("Name is required");
    }

    if (!submitterEmail || !submitterEmail.includes("@")) {
      return badRequest("A valid email address is required");
    }

    if (!VALID_CATEGORIES.has(category)) {
      return badRequest(
        "category must be one of: bonding-document, field-form, certificate, program-update, other",
      );
    }

    if (!turnstileToken) {
      return badRequest("Turnstile verification is required");
    }

    if (!ALLOWED_FILE_TYPES.has(file.type)) {
      return badRequest(
        "Invalid file type. Allowed types: PDF, DOC, DOCX, PNG, JPG.",
      );
    }

    if (file.size > LIMITS.FILE.MAX_SAFETY_INTAKE_SIZE) {
      return badRequest("File size exceeds 25MB limit");
    }

    const sourceIp = getClientIp(request);
    const turnstileResult = await verifyTurnstileToken(
      turnstileToken,
      sourceIp,
    );

    if (!turnstileResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Turnstile verification failed",
          errorCodes: turnstileResult.errorCodes,
        },
        { status: 400 },
      );
    }

    const r2Bucket = getR2Bucket("SAFETY_INTAKE");
    const r2Service = new R2StorageService(
      r2Bucket,
      "mh-construction-safety-intake",
    );

    if (!r2Bucket) {
      return serviceUnavailable("Safety intake storage is not configured");
    }

    const DB = getD1Database();
    if (!DB) {
      return serviceUnavailable("Database not available");
    }

    const safeName = sanitizeFilename(file.name);
    const fileKey = generateFileKey("safety-intake", safeName, submitterEmail);
    const uploadResult = await r2Service.uploadFile(file, fileKey, file.type, {
      category,
      submitterEmail,
      submitterName,
      uploadedAt: new Date().toISOString(),
      originalFilename: safeName,
    });

    if (!uploadResult.success) {
      logger.error("Failed to upload Safety intake file", {
        error: uploadResult.error,
      });
      return internalServerError("Failed to upload file");
    }

    const db = createDbClient({ DB });
    const submissionId = await db.insert("safety_intake_submissions", {
      submitter_name: submitterName,
      submitter_email: submitterEmail,
      company_name: companyName || null,
      category,
      notes: notes || null,
      original_filename: safeName,
      file_key: fileKey,
      content_type: file.type || "application/octet-stream",
      file_size: file.size,
      status: "pending_review",
      source_ip: sourceIp || null,
      turnstile_verified: 1,
    });

    logger.info("Safety intake submission created", {
      submissionId,
      category,
      fileKey,
    });

    // Send n8n notification for safety document upload
    sendToN8nAsync({
      type: "safety-form",
      data: {
        formType: "safety-intake",
        submissionId,
        submitterName,
        submitterEmail,
        companyName: companyName || "N/A",
        category,
        filename: safeName,
        notes: notes || "None",
      },
    });

    return createSuccessResponse(
      {
        id: submissionId,
        filename: safeName,
        category,
        status: "pending_review",
      },
      "Safety document received and queued for review.",
      201,
    );
  } catch (error) {
    logger.error("Error processing Safety intake upload", error);
    return internalServerError("Failed to process Safety intake upload");
  }
}

async function handleGET(request: NextRequest, _user: JWTUser) {
  try {
    const DB = getD1Database();
    if (!DB) {
      return serviceUnavailable("Database not available");
    }

    const { searchParams } = new URL(request.url);
    const status = sanitizeText(searchParams.get("status"), 40);
    const category = sanitizeText(searchParams.get("category"), 40) as
      | SafetyIntakeCategory
      | "";

    const filters: string[] = [];
    const params: string[] = [];

    if (status) {
      filters.push("status = ?");
      params.push(status);
    }

    if (category && VALID_CATEGORIES.has(category)) {
      filters.push("category = ?");
      params.push(category);
    }

    const whereClause = filters.length ? `WHERE ${filters.join(" AND ")}` : "";

    const db = createDbClient({ DB });
    const rows = await db.query<SafetyIntakeSubmissionRow>(
      `
        SELECT *
        FROM safety_intake_submissions
        ${whereClause}
        ORDER BY created_at DESC
        LIMIT 200
      `,
      ...params,
    );

    return createSuccessResponse(rows);
  } catch (error) {
    logger.error("Error fetching Safety intake submissions", error);
    return internalServerError("Failed to fetch Safety intake submissions");
  }
}

export const GET = requireRole(["admin"], withSecurity(handleGET));
export const POST = rateLimit({
  maxRequests: 3,
  windowMs: 60_000,
  message: "Safety intake is rate limited. Please try again shortly.",
})(withSecurity(handlePOST));
