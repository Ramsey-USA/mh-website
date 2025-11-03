import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

// Job applications API using Cloudflare storage
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email || !data.position) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Add metadata
    const application = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: "new",
    };

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
Application ID: ${application.id}
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
        }
      );

      if (!emailResponse.ok) {
        console.error("Failed to send email notification");
      }
    } catch (emailError) {
      console.error("Error sending email notification:", emailError);
      // Continue even if email fails - don't block the application submission
    }

    // TODO: Store in Cloudflare D1 database or KV
    console.log("New job application:", application);

    // In production, you might want to:
    // 1. Store in Cloudflare D1 database
    // 2. Upload resume to Cloudflare R2
    // 3. Send email notification to HR
    // 4. Add to applicant tracking system

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      data: { id: application.id },
    });
  } catch (error) {
    console.error("Error submitting job application:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // TODO: Retrieve job applications from Cloudflare KV or D1
    // This would typically require authentication
    const applications: any[] = [];

    return NextResponse.json({
      success: true,
      data: applications,
    });
  } catch (error) {
    console.error("Error fetching job applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}
