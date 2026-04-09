import { type NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/utils/logger";
import { createDbClient } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";
import { requireRole } from "@/lib/auth/middleware";
import { type JWTUser } from "@/lib/auth/jwt";
import {
  notFound,
  internalServerError,
  serviceUnavailable,
} from "@/lib/api/responses";
import { getR2Bucket, R2StorageService } from "@/lib/cloudflare/r2";

export const dynamic = "force-dynamic";

interface SubmissionFileRow {
  file_key: string;
  content_type: string;
  original_filename: string;
}

interface RouteParams {
  params: Promise<{ id: string }>;
}

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
    const row = await db.queryOne<SubmissionFileRow>(
      `SELECT file_key, content_type, original_filename
         FROM safety_intake_submissions
        WHERE id = ?`,
      id,
    );

    if (!row) {
      return notFound("Intake submission not found");
    }

    const r2Bucket = getR2Bucket("SAFETY_INTAKE");
    if (!r2Bucket) {
      return serviceUnavailable("Safety intake storage is not configured");
    }

    const r2Service = new R2StorageService(
      r2Bucket,
      "mh-construction-safety-intake",
    );
    const result = await r2Service.getFile(row.file_key);

    if (!result.success || !result.data) {
      logger.warn("Intake file not found in R2", { id, fileKey: row.file_key });
      return notFound("File not found in storage");
    }

    const contentType =
      result.contentType ?? row.content_type ?? "application/octet-stream";
    const safeFilename = row.original_filename
      .replace(/[^\w.\-]/g, "_")
      .slice(0, 200);

    return new NextResponse(result.data, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${safeFilename}"`,
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    logger.error("Error retrieving intake file", error);
    return internalServerError("Failed to retrieve intake file");
  }
}

export const GET = requireRole(["admin"], handleGET);
