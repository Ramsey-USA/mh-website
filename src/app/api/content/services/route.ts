import { NextResponse } from "next/server";
import { getContent } from "@/lib/content/contentCache";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const content = await getContent("services");

    if (!content) {
      return NextResponse.json(
        { error: "Services content not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(content);
  } catch (error) {
    console.error("Error loading services:", error);
    return NextResponse.json(
      { error: "Failed to load services content" },
      { status: 500 }
    );
  }
}
