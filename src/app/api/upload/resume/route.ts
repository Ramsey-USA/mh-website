import { type NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/utils/logger";
import { LIMITS } from "@/lib/constants/limits";
import { sendToN8nAsync } from "@/lib/notifications/n8n-webhook";
import {
  getR2Bucket,
  R2StorageService,
  generateFileKey,
} from "@/lib/cloudflare/r2";
import { rateLimit } from "@/lib/security/rate-limiter";
import { requireRole } from "@/lib/auth/middleware";
import { withSecurity } from "@/middleware/security";
import {
  badRequest,
  createSuccessResponse,
  internalServerError,
} from "@/lib/api/responses";
export const dynamic = "force-dynamic";

/**
 * Sanitize a user-supplied filename: strip path separators, control chars,
 * limit to 200 chars, and collapse runs of dots / spaces.
 */
function sanitizeFilename(name: string): string {
  return name
    .replace(/[/\\:*?"<>|\x00-\x1f\x7f]/g, "_") // strip dangerous chars
    .replace(/\.{2,}/g, ".") // collapse sequential dots
    .replace(/\s+/g, " ") // collapse whitespace
    .trim()
    .slice(0, 200);
}

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

    // Sanitize filename before storing
    const safeName = sanitizeFilename(file.name);

    // Generate unique key
    const fileKey = generateFileKey(
      "resumes",
      safeName,
      applicantEmail || undefined,
    );

    // Upload to R2
    const uploadResult = await r2Service.uploadFile(file, fileKey, file.type, {
      applicantEmail: applicantEmail || "unknown",
      uploadedAt: new Date().toISOString(),
      originalFilename: safeName,
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

    // Send n8n notification for new resume upload
    sendToN8nAsync({
      type: "job-application",
      data: {
        formType: "resume-upload",
        applicantEmail: applicantEmail || "Not provided",
        filename: safeName,
        fileSize: `${Math.round(file.size / 1024)} KB`,
        fileType: file.type,
        storageKey: uploadResult.key,
      },
    });

    return createSuccessResponse(
      {
        key: uploadResult.key,
        url: uploadResult.url,
        size: uploadResult.size,
        filename: safeName,
      },
      "Resume uploaded successfully",
    );
  } catch (error) {
    logger.error("Error processing resume upload:", error);
    return internalServerError("Failed to process upload");
  }
}

/**
 * GET endpoint to retrieve a resume — admin only
 */
async function handleGET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");

    if (!key) {
      return NextResponse.json({ error: "No key provided" }, { status: 400 });
    }

    // Validate key format — must start with "resumes/" and contain no
    // path-traversal sequences like ".." or null bytes
    if (
      !key.startsWith("resumes/") ||
      key.includes("..") ||
      key.includes("\0")
    ) {
      return NextResponse.json({ error: "Invalid file key" }, { status: 400 });
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

    // Sanitize the filename for Content-Disposition header
    const downloadName = sanitizeFilename(key.split("/").pop() || "resume");

    return new NextResponse(result.data, {
      headers: {
        "Content-Type": result.contentType || "application/octet-stream",
        "Content-Disposition": `attachment; filename="${downloadName}"`,
      },
    });
  } catch (error) {
    logger.error("Error retrieving resume:", error);
    return internalServerError("Failed to retrieve file");
  }
}

// Require admin role to download resumes; rate-limit + security-audit uploads (3 per minute)
export const GET = requireRole(["admin"], withSecurity(handleGET));
export const POST = rateLimit({
  maxRequests: 3,
  windowMs: 60000,
})(withSecurity(handlePOST));
