import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/utils/logger";
import { createDbClient, type Consultation } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";

export const runtime = "edge";
export const dynamic = "force-dynamic";

// Consultation API routes using Cloudflare D1 database

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.projectType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Create consultation record
    const consultationId = crypto.randomUUID();
    const consultation: Omit<Consultation, "created_at" | "updated_at"> = {
      id: consultationId,
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
      status: "new",
      metadata: JSON.stringify({
        timeline: data.timeline,
        submittedAt: new Date().toISOString(),
      }),
    };

    // Store in D1 database (when deployed to Cloudflare)
    // For local development, this will gracefully skip
    try {
      const DB = getD1Database();
      if (DB) {
        const db = createDbClient({ DB });
        await db.insert("consultations", consultation);
        logger.info("Consultation stored in database", { id: consultationId });
      } else {
        logger.info("D1 database not available, consultation not persisted", {
          id: consultationId,
        });
      }
    } catch (dbError) {
      logger.error("Failed to store consultation in database:", dbError);
      // Continue to send email even if DB fails
    }

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

Consultation ID: ${consultationId}
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
              consultationId,
              projectType: data.projectType,
              budget: data.budget,
              location: data.location,
            },
          }),
        },
      );

      if (!emailResponse.ok) {
        logger.error("Failed to send consultation email notification");
      }
    } catch (emailError) {
      logger.error("Error sending consultation email:", emailError);
      // Continue even if email fails - don't block the consultation submission
    }

    return NextResponse.json({
      success: true,
      message: "Consultation request received",
      data: { ...consultation, id: consultationId },
    });
  } catch (error) {
    logger.error("Error creating consultation:", error);
    return NextResponse.json(
      { error: "Failed to create consultation" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Retrieve consultations from D1 database (when deployed to Cloudflare)
    try {
      const DB = getD1Database();
      if (DB) {
        const db = createDbClient({ DB });
        const consultations = await db.query<Consultation>(
          `SELECT * FROM consultations ORDER BY created_at DESC LIMIT 100`,
        );

        return NextResponse.json({
          success: true,
          data: consultations,
          count: consultations.length,
        });
      }
    } catch (dbError) {
      logger.error("Error fetching from database:", dbError);
    }

    // Fallback for local development
    return NextResponse.json({
      success: true,
      data: [],
      count: 0,
      message: "D1 database not available in this environment",
    });
  } catch (error) {
    logger.error("Error fetching consultations:", error);
    return NextResponse.json(
      { error: "Failed to fetch consultations" },
      { status: 500 },
    );
  }
}
