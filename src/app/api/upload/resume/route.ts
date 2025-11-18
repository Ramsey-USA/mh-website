import { type NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/utils/logger";
import {
  getR2Bucket,
  R2StorageService,
  generateFileKey,
} from "@/lib/cloudflare/r2";

export const runtime = "edge";
export const dynamic = "force-dynamic";

/**
 * Resume Upload API - Handles file uploads to R2
 * Accepts multipart/form-data with resume file
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const applicantEmail = formData.get("email") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "Invalid file type. Only PDF, DOC, and DOCX files are allowed.",
        },
        { status: 400 },
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File size exceeds 10MB limit" },
        { status: 400 },
      );
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
      return NextResponse.json(
        { error: "Failed to upload file" },
        { status: 500 },
      );
    }

    logger.info("Resume uploaded successfully", {
      key: uploadResult.key,
      size: uploadResult.size,
      email: applicantEmail,
    });

    return NextResponse.json({
      success: true,
      data: {
        key: uploadResult.key,
        url: uploadResult.url,
        size: uploadResult.size,
        filename: file.name,
      },
    });
  } catch (error) {
    logger.error("Error processing resume upload:", error);
    return NextResponse.json(
      { error: "Failed to process upload" },
      { status: 500 },
    );
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
    return NextResponse.json(
      { error: "Failed to retrieve file" },
      { status: 500 },
    );
  }
}
