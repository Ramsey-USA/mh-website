import { NextResponse } from "next/server";
import { getContent } from "@/lib/content/contentCache";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const content = await getContent("core-values");

    if (!content) {
      return NextResponse.json(
        { error: "Core values content not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(content);
  } catch (error) {
    console.error("Error loading core values:", error);
    return NextResponse.json(
      { error: "Failed to load core values content" },
      { status: 500 }
    );
  }
}
