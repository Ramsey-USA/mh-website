import { type NextRequest } from "next/server";
import {
  handleFormSubmission,
  handleFormRetrieval,
} from "@/lib/api/formHandler";

export const runtime = "edge";
export const dynamic = "force-dynamic";

// Consultation API routes using consolidated form handler

interface ConsultationData {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  projectDescription?: string;
  location?: string;
  budget?: number;
  timeline?: string;
  selectedDate?: string;
  selectedTime?: string;
  notes?: string;
}

export function POST(request: NextRequest) {
  return handleFormSubmission<ConsultationData>(request, {
    tableName: "consultations",
    submissionType: "Consultation",

    validateFields: (data) => {
      if (!data.name || !data.email || !data.projectType) {
        return {
          valid: false,
          error:
            "Missing required fields: name, email, and projectType are required",
        };
      }
      return { valid: true };
    },

    transformData: (data) => ({
      client_name: data.name,
      email: data.email,
      phone: data.phone || null,
      project_type: data.projectType,
      project_description: data.projectDescription || null,
      location: data.location || null,
      budget: data.budget ? data.budget.toString() : null,
      selected_date:
        data.selectedDate || new Date().toISOString().split("T")[0],
      selected_time: data.selectedTime || "10:00",
      additional_notes: data.notes || null,
      metadata: JSON.stringify({
        timeline: data.timeline,
        submittedAt: new Date().toISOString(),
      }),
    }),

    emailSubject: (data) =>
      `New Consultation Request: ${data.projectType} - ${data.name}`,

    emailMessage: (data) =>
      `
New Consultation Request Received

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "Not provided"}
Project Type: ${data.projectType}

Project Details:
${data.projectDescription || "Not provided"}

Location: ${data.location || "Not specified"}
Budget: ${data.budget ? `$${data.budget.toLocaleString()}` : "Not specified"}
Timeline: ${data.timeline || "Not specified"}

Notes:
${data.notes || "No additional notes"}

Submitted: ${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })} PST
    `.trim(),
  });
}

export function GET() {
  return handleFormRetrieval("consultations");
}
