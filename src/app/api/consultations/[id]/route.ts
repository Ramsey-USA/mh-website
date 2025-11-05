import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/utils/logger";

export const runtime = "edge";
export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, context: RouteParams) {
  try {
    const { id } = await context.params;

    // TODO: Retrieve consultation from Cloudflare KV or D1
    // For now, return mock data
    const consultation = {
      id,
      name: "Sample Consultation",
      status: "pending",
    };

    return NextResponse.json({
      success: true,
      data: consultation,
    });
  } catch (error) {
    logger.error("Error fetching consultation:", error);
    return NextResponse.json(
      { error: "Failed to fetch consultation" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, context: RouteParams) {
  try {
    const { id } = await context.params;
    const updates = await request.json();

    // TODO: Update consultation in Cloudflare KV or D1
    logger.info("Updating consultation:", id, updates);

    return NextResponse.json({
      success: true,
      message: "Consultation updated",
      data: { id, ...updates },
    });
  } catch (error) {
    logger.error("Error updating consultation:", error);
    return NextResponse.json(
      { error: "Failed to update consultation" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: RouteParams) {
  try {
    const { id } = await context.params;

    // TODO: Delete consultation from Cloudflare KV or D1
    logger.info("Deleting consultation:", id);

    return NextResponse.json({
      success: true,
      message: "Consultation deleted",
    });
  } catch (error) {
    logger.error("Error deleting consultation:", error);
    return NextResponse.json(
      { error: "Failed to delete consultation" },
      { status: 500 }
    );
  }
}
