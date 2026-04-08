import { type NextRequest, NextResponse } from "next/server";
import {
  handleFormSubmission,
  handleFormRetrieval,
} from "@/lib/api/form-handler";
import { requireRole } from "@/lib/auth/middleware";
import { rateLimit, rateLimitPresets } from "@/lib/security/rate-limiter";
import { withSecurity } from "@/middleware/security";
import { getR2Bucket, R2StorageService } from "@/lib/cloudflare/r2";

export const dynamic = "force-dynamic";

// Job applications API using consolidated form handler

interface JobApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  position: string;
  experience: string;
  availability?: string;
  coverLetter?: string;
  resumeUrl?: string;
  resumeKey?: string;
  resumeFileName?: string;
  resumeFileSize?: number;
  veteranStatus?: string;
  referralSource?: string;
}

async function handlePOST(request: NextRequest): Promise<NextResponse> {
  // Parse the body once so we can validate resumeKey before handing off
  let body: JobApplicationData;
  try {
    body = (await request.json()) as JobApplicationData;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  // If a resumeKey is provided, verify it actually exists in R2 before persisting
  if (body.resumeKey) {
    const bucket = getR2Bucket("RESUMES");
    const storageService = new R2StorageService(
      bucket,
      "mh-construction-resumes",
    );
    const exists = await storageService.fileExists(body.resumeKey);
    if (!exists) {
      return NextResponse.json(
        { error: "Resume file not found. Please upload your resume again." },
        { status: 400 },
      );
    }
  }

  // Reconstruct a Request from the already-parsed body for handleFormSubmission
  const reconstructed = new Request(request.url, {
    method: "POST",
    headers: request.headers,
    body: JSON.stringify(body),
  });

  return handleFormSubmission<JobApplicationData>(
    reconstructed as NextRequest,
    {
      tableName: "job_applications",
      submissionType: "Job Application",

      validateFields: (data) => {
        if (
          !data.firstName ||
          !data.lastName ||
          !data.email ||
          !data.position
        ) {
          return {
            valid: false,
            error:
              "Missing required fields: firstName, lastName, email, and position are required",
          };
        }
        return { valid: true };
      },

      transformData: (data) => ({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address || null,
        city: data.city || null,
        state: data.state || null,
        zip_code: data.zipCode || null,
        position: data.position,
        experience: data.experience,
        availability: data.availability || null,
        cover_letter: data.coverLetter || null,
        resume_url: data.resumeUrl || null,
        veteran_status: data.veteranStatus || null,
        referral_source: data.referralSource || null,
        metadata: JSON.stringify({
          resumeFileName: data.resumeFileName,
          resumeFileSize: data.resumeFileSize,
          resumeKey: data.resumeKey,
          submittedAt: new Date().toISOString(),
        }),
      }),

      emailSubject: (data) =>
        `New Job Application: ${data.position} - ${data.firstName} ${data.lastName}`,

      emailMessage: (data) =>
        `
New Job Application Received

Position: ${data.position}
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
Experience: ${data.experience}
Availability: ${data.availability || "Not specified"}
Veteran Status: ${data.veteranStatus || "Not specified"}

Address:
${data.address || ""}
${data.city || ""}, ${data.state || ""} ${data.zipCode || ""}

Cover Letter:
${data.coverLetter || "Not provided"}

Resume: ${data.resumeUrl ? `Available - Download at: ${data.resumeUrl}` : "Not provided"}
${data.resumeFileName ? `Filename: ${data.resumeFileName}` : ""}
${data.resumeFileSize ? `Size: ${(data.resumeFileSize / 1024).toFixed(2)} KB` : ""}

Referral Source: ${data.referralSource || "Not specified"}

Submitted: ${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })} PST
    `.trim(),
    },
  );
}

export const POST = rateLimit(rateLimitPresets.api)(withSecurity(handlePOST));

export const GET = requireRole(["admin"], () =>
  handleFormRetrieval("job_applications"),
);
