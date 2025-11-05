import { NextResponse } from "next/server";
import { logger } from "@/lib/utils/logger";

export const runtime = "edge";
export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  try {
    // For branding, return inline content for now
    // In production, this could be stored in Cloudflare KV
    const branding = {
      content: `# MH Construction Branding

## Company Overview
MH Construction is a veteran-owned construction company dedicated to excellence.

## Brand Values
- Quality craftsmanship
- Veteran integrity
- Community commitment
- Professional service

## Visual Identity
Our brand emphasizes strength, reliability, and patriotic service.
`,
      title: "MH Construction Branding",
      excerpt: "Brand guidelines and identity for MH Construction",
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json(branding);
  } catch (error) {
    logger.error("Error loading branding:", error);
    return NextResponse.json(
      { error: "Failed to load branding content" },
      { status: 500 },
    );
  }
}
