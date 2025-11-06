import { NextResponse } from "next/server";
import { logger } from "@/lib/utils/logger";

export const runtime = "edge";
export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  try {
    // Branding documentation is now in /docs/branding/
    // This API provides metadata and links to the actual documentation
    const branding = {
      content: `# MH Construction Branding

## Documentation Structure

For complete branding guidelines, see:

- **[Branding Index](/docs/branding/branding-index.md)** - Main navigation hub
- **[Consistency Guide](/docs/development/consistency-guide.md)** - Complete implementation standards
- **[Brand Strategy](/docs/branding/strategy/)** - Brand identity and messaging
- **[Visual Standards](/docs/branding/standards/)** - Colors, typography, components
- **[Master Brand Guide](/docs/business/mh-branding.md)** - Comprehensive reference

## Core Brand Identity

- **Company**: MH Construction LLC
- **Tagline**: "Building for the Owner, NOT the Dollar"
- **Primary Color**: Hunter Green (#386851)
- **Secondary Color**: Leather Tan (#BD9264)
- **Icon System**: Google Material Icons (no emojis in code)
- **Typography**: Inter font family
`,
      title: "MH Construction Branding",
      excerpt: "Brand guidelines and identity for MH Construction",
      lastUpdated: new Date().toISOString(),
      documentation: {
        index: "/docs/branding/branding-index.md",
        consistency: "/docs/development/consistency-guide.md",
        strategy: "/docs/branding/strategy/",
        standards: "/docs/branding/standards/",
        master: "/docs/business/mh-branding.md",
      },
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
