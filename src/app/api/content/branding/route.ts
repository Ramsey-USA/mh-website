import { NextResponse } from "next/server";
import { loadMarkdownContent } from "../../../../lib/content/markdownLoader";

export async function GET() {
  try {
    const branding = await loadMarkdownContent("business/MH_BRANDING.md");
    return NextResponse.json(branding);
  } catch (error) {
    console.error("Error loading branding:", error);
    return NextResponse.json(
      { error: "Failed to load branding content" },
      { status: 500 }
    );
  }
}
