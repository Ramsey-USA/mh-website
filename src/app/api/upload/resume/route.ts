import { type NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/utils/logger";
import { LIMITS } from "@/lib/constants/limits";
import {
  getR2Bucket,
  R2StorageService,
  generateFileKey,
} from "@/lib/cloudflare/r2";
import { rateLimit } from "@/lib/security/rateLimiter";
import {
  badRequest,
  createSuccessResponse,
  internalServerError,
} from "@/lib/api/responses";

export const runtime = "edge";
export const dynamic = "force-dynamic";

/**
 * Resume Upload API - Handles file uploads to R2
 * Accepts multipart/form-data with resume file
 */
async function handlePOST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const applicantEmail = formData.get("email") as string | null;

    if (!file) {
      return badRequest("No file provided");
    }

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      return badRequest(
        "Invalid file type. Only PDF, DOC, and DOCX files are allowed.",
      );
    }

    // Validate file size (max 10MB)
    const maxSize = LIMITS.FILE.MAX_RESUME_SIZE;
    if (file.size > maxSize) {
      return badRequest("File size exceeds 10MB limit");
    }

    // Get R2 bucket
    const r2Bucket = getR2Bucket("RESUMES");
    const r2Service = new R2StorageService(r2Bucket, "mh-construction-resumes");

    // Generate unique key
    const fileKey = generateFileKey(
      "resumes",
      file.name,
      applicantEmail || undefined,
    );

    // Upload to R2
    const uploadResult = await r2Service.uploadFile(file, fileKey, file.type, {
      applicantEmail: applicantEmail || "unknown",
      uploadedAt: new Date().toISOString(),
      originalFilename: file.name,
    });

    if (!uploadResult.success) {
      logger.error("Failed to upload resume to R2", {
        error: uploadResult.error,
      });
      return internalServerError("Failed to upload file");
    }

    logger.info("Resume uploaded successfully", {
      key: uploadResult.key,
      size: uploadResult.size,
      email: applicantEmail,
    });

    return createSuccessResponse(
      {
        key: uploadResult.key,
        url: uploadResult.url,
        size: uploadResult.size,
        filename: file.name,
      },
      "Resume uploaded successfully",
    );
  } catch (error) {
    logger.error("Error processing resume upload:", error);
    return internalServerError("Failed to process upload");
  }
}

/**
 * GET endpoint to retrieve a resume (requires authentication in production)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");

    if (!key) {
      return NextResponse.json({ error: "No key provided" }, { status: 400 });
    }

    const r2Bucket = getR2Bucket("RESUMES");
    const r2Service = new R2StorageService(r2Bucket, "mh-construction-resumes");

    const result = await r2Service.getFile(key);

    if (!result.success || !result.data) {
      return NextResponse.json(
        { error: result.error || "File not found" },
        { status: 404 },
      );
    }

    return new NextResponse(result.data, {
      headers: {
        "Content-Type": result.contentType || "application/octet-stream",
        "Content-Disposition": `attachment; filename="${key.split("/").pop()}"`,
      },
    });
  } catch (error) {
    logger.error("Error retrieving resume:", error);
    return internalServerError("Failed to retrieve file");
  }
}

// Apply rate limiting to file uploads (3 requests per minute)
export const POST = rateLimit({
  maxRequests: 3,
  windowMs: 60000,
  skipSuccessfulRequests: false,
})(handlePOST);
