/**
 * SSSP Source File Upload
 * POST /api/safety/sssp/[jobId]/upload
 *
 * Uploads a project plan file (PDF/image) to R2 and records it in
 * sssp_source_files. Accepts multipart/form-data with a single `file` field.
 */

import { type NextRequest } from "next/server";
import { logger } from "@/lib/utils/logger";
import { createDbClient } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";
import { requireRole } from "@/lib/auth/middleware";
import { type JWTUser } from "@/lib/auth/jwt";
import { withSecurity } from "@/middleware/security";
import { rateLimit } from "@/lib/security/rate-limiter";
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
import { HttpStatus } from "@/lib/types/api";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ jobId: string }>;
}

const ALLOWED_FILE_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB

function sanitizeFilename(name: string): string {
  return name
    .replace(/[/\\:*?"<>|\x00-\x1f\x7f]/g, "_")
    .replace(/\.{2,}/g, ".")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 200);
}

async function handlePOST(
  request: NextRequest,
  user: JWTUser,
  context?: unknown,
) {
  try {
    const { jobId } = await (context as RouteParams).params;

    const DB = getD1Database();
    if (!DB) {
      return serviceUnavailable("Database not available");
    }

    const db = createDbClient({ DB });

    const job = await db.queryOne<{ id: string }>(
      `SELECT id FROM jobs WHERE id = ?`,
      jobId,
    );
    if (!job) {
      return badRequest("Job not found");
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return badRequest("No file provided");
    }

    if (!ALLOWED_FILE_TYPES.has(file.type)) {
      return badRequest(
        "Invalid file type. Allowed types: PDF, PNG, JPG, WEBP.",
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return badRequest("File size exceeds 25 MB limit");
    }

    const r2Bucket = getR2Bucket("SSSP_PLANS");
    const r2Service = new R2StorageService(r2Bucket, "sssp-plans");

    if (!r2Bucket) {
      return serviceUnavailable("SSSP plan storage is not configured");
    }

    const safeName = sanitizeFilename(file.name);
    const fileKey = generateFileKey("sssp-plans", safeName, jobId);

    const uploadResult = await r2Service.uploadFile(file, fileKey, file.type, {
      jobId,
      uploadedBy: user.name ?? user.uid,
      uploadedAt: new Date().toISOString(),
      originalFilename: safeName,
    });

    if (!uploadResult.success) {
      logger.error("Failed to upload SSSP plan file", {
        error: uploadResult.error,
      });
      return internalServerError("Failed to upload file");
    }

    const fileId = await db.insert("sssp_source_files", {
      job_id: jobId,
      sssp_id: null,
      original_filename: safeName,
      file_key: fileKey,
      content_type: file.type || "application/octet-stream",
      file_size: file.size,
      uploaded_by: user.name ?? user.uid,
    });

    logger.info("SSSP source file uploaded", { fileId, jobId, fileKey });

    return createSuccessResponse(
      {
        id: fileId,
        job_id: jobId,
        original_filename: safeName,
        file_key: fileKey,
        content_type: file.type,
        file_size: file.size,
        uploaded_by: user.name ?? user.uid,
      },
      "Plan file uploaded successfully.",
      HttpStatus.CREATED,
    );
  } catch (_error) {
    logger._error("Error uploading SSSP plan file:", error);
    return internalServerError("Failed to upload plan file");
  }
}

export const POST = rateLimit({ maxRequests: 10, windowMs: 60_000 })(
  requireRole(["admin"], withSecurity(handlePOST)),
);
