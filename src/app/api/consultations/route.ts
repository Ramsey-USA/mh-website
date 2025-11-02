import { NextRequest, NextResponse } from "next/server";

// Enable Edge Runtime for Cloudflare Pages
export const runtime = "edge";

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

    // TODO: Store in Cloudflare KV or D1 database
    // For now, we'll just log it
    console.log("New consultation:", consultation);

    // In production, you might want to:
    // 1. Store in Cloudflare D1 database
    // 2. Send email notification
    // 3. Add to CRM system

    return NextResponse.json({
      success: true,
      message: "Consultation request received",
      data: consultation,
    });
  } catch (error) {
    console.error("Error creating consultation:", error);
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
    console.error("Error fetching consultations:", error);
    return NextResponse.json(
      { error: "Failed to fetch consultations" },
      { status: 500 }
    );
  }
}
