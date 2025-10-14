import { NextResponse } from "next/server";
import { loadMarkdownContent } from "@/lib/content/markdownLoader";

export async function GET() {
  try {
    const services = await loadMarkdownContent("business/SERVICES.md");
    return NextResponse.json(services);
  } catch (error) {
    console.error("Error loading services:", error);
    return NextResponse.json(
      { error: "Failed to load services content" },
      { status: 500 }
    );
  }
}
