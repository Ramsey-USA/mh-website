import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/utils/logger";
import { createDbClient, type JobApplication } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";

export const runtime = "edge";
export const dynamic = "force-dynamic";

// Job applications API using Cloudflare D1 database
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email || !data.position) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Create job application record
    const applicationId = crypto.randomUUID();
    const application: Omit<JobApplication, "created_at" | "updated_at"> = {
      id: applicationId,
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
      resume_url: data.resumeUrl || null, // Will be populated after R2 upload
      veteran_status: data.veteranStatus || null,
      referral_source: data.referralSource || null,
      status: "new",
      metadata: JSON.stringify({
        resumeFileName: data.resumeFileName,
        submittedAt: new Date().toISOString(),
      }),
    };

    // Store in D1 database
    try {
      const DB = getD1Database();
      if (DB) {
        const db = createDbClient({ DB });
        await db.insert("job_applications", application);
        logger.info("Job application stored in database", {
          id: applicationId,
        });
      } else {
        logger.info("D1 database not available, application not persisted", {
          id: applicationId,
        });
      }
    } catch (dbError) {
      logger.error("Failed to store job application in database:", dbError);
      // Continue to send email even if DB fails
    }

    // Send email notification to office@mhc-gc.com
    try {
      const emailSubject = `New Job Application: ${data.position} - ${data.firstName} ${data.lastName}`;
      const emailBody = `
New Job Application Received

Position: ${data.position}
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
Experience: ${data.experience}
Availability: ${data.availability}
Veteran Status: ${data.veteranStatus || "Not specified"}

Address:
${data.address || "Not provided"}
${data.city ? `${data.city}, ` : ""}${data.state || ""} ${data.zipCode || ""}

Cover Letter:
${data.coverLetter || "Not provided"}

Resume: ${data.resumeFileName || "Not uploaded"}
Referral Source: ${data.referralSource || "Not provided"}

Submitted: ${new Date().toLocaleString()}
Application ID: ${applicationId}
      `.trim();

      // Send email using fetch to a mail service endpoint
      // This assumes you have an email service configured
      const emailResponse = await fetch(
        `${request.nextUrl.origin}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            phone: data.phone,
            subject: emailSubject,
            message: emailBody,
            type: "job-application",
            recipientEmail: "office@mhc-gc.com",
          }),
        },
      );

      if (!emailResponse.ok) {
        logger.error("Failed to send email notification");
      }
    } catch (emailError) {
      logger.error("Error sending email notification:", emailError);
      // Continue even if email fails - don't block the application submission
    }

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      data: { id: applicationId, status: "new" },
    });
  } catch (error) {
    logger.error("Error submitting job application:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Retrieve job applications from D1 database (when deployed to Cloudflare)
    // This endpoint should typically require authentication
    try {
      const DB = getD1Database();
      if (DB) {
        const db = createDbClient({ DB });
        const applications = await db.query<JobApplication>(
          `SELECT * FROM job_applications ORDER BY created_at DESC LIMIT 100`,
        );

        return NextResponse.json({
          success: true,
          data: applications,
          count: applications.length,
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
    logger.error("Error fetching job applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 },
    );
  }
}
