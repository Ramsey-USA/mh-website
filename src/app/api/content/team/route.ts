import { NextResponse } from "next/server";
import { loadMarkdownContent } from "../../../../lib/content/markdownLoader";

export async function GET() {
  try {
    const team = await loadMarkdownContent("business/TEAM_ROSTER.md");
    return NextResponse.json(team);
  } catch (error) {
    console.error("Error loading team:", error);
    return NextResponse.json(
      { error: "Failed to load team content" },
      { status: 500 }
    );
  }
}
