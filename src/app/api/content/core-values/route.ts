import { NextResponse } from "next/server";
import { loadMarkdownContent } from "@/lib/content/markdownLoader";

export async function GET() {
  try {
    const coreValues = await loadMarkdownContent("business/CORE_VALUES.md");
    return NextResponse.json(coreValues);
  } catch (error) {
    console.error("Error loading core values:", error);
    return NextResponse.json(
      { error: "Failed to load core values content" },
      { status: 500 },
    );
  }
}
