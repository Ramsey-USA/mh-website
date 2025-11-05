import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/utils/logger";

export const runtime = "edge";
export const dynamic = "force-dynamic";

// Consultation API routes using Cloudflare storage (D1, KV, or external DB)

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.projectType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Add metadata
    const consultation = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: "pending",
    };

    // Send email notification to office@mhc-gc.com
    try {
      const emailSubject = `New Consultation Request: ${data.projectType} - ${data.name}`;
      const emailMessage = `
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

Consultation ID: ${consultation.id}
Submitted: ${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })} PST
      `.trim();

      // Send email using the contact API endpoint
      const emailResponse = await fetch(
        `${request.nextUrl.origin}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone,
            subject: emailSubject,
            message: emailMessage,
            type: "consultation",
            recipientEmail: "office@mhc-gc.com",
            metadata: {
              consultationId: consultation.id,
              projectType: data.projectType,
              budget: data.budget,
              location: data.location,
            },
          }),
        }
      );

      if (!emailResponse.ok) {
        logger.error("Failed to send consultation email notification");
      }
    } catch (emailError) {
      logger.error("Error sending consultation email:", emailError);
      // Continue even if email fails - don't block the consultation submission
    }

    // TODO: Store in Cloudflare KV or D1 database
    logger.info("New consultation:", consultation);

    // In production, you might want to:
    // 1. Store in Cloudflare D1 database
    // 2. Add to CRM system

    return NextResponse.json({
      success: true,
      message: "Consultation request received",
      data: consultation,
    });
  } catch (error) {
    logger.error("Error creating consultation:", error);
    return NextResponse.json(
      { error: "Failed to create consultation" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // TODO: Retrieve consultations from Cloudflare KV or D1
    // For now, return empty array
    const consultations: any[] = [];

    return NextResponse.json({
      success: true,
      data: consultations,
    });
  } catch (error) {
    logger.error("Error fetching consultations:", error);
    return NextResponse.json(
      { error: "Failed to fetch consultations" },
      { status: 500 }
    );
  }
}
