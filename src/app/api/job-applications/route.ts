import { type NextRequest } from "next/server";
import {
  handleFormSubmission,
  handleFormRetrieval,
} from "@/lib/api/formHandler";

export const runtime = "edge";
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

export function POST(request: NextRequest) {
  return handleFormSubmission<JobApplicationData>(request, {
    tableName: "job_applications",
    submissionType: "Job Application",

    validateFields: (data) => {
      if (!data.firstName || !data.lastName || !data.email || !data.position) {
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
  });
}

export function GET() {
  return handleFormRetrieval("job_applications");
}
