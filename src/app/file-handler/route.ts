import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files");

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    // Log file information
    const fileInfo = files
      .map((file) => {
        if (file instanceof File) {
          return {
            name: file.name,
            type: file.type,
            size: file.size,
          };
        }
        return null;
      })
      .filter(Boolean);

    console.info("[File Handler] Received files:", fileInfo);

    // Determine action based on file types
    const hasImages = files.some(
      (file) => file instanceof File && file.type.startsWith("image/"),
    );
    const hasPDFs = files.some(
      (file) => file instanceof File && file.type === "application/pdf",
    );

    // Route based on file type
    if (hasImages) {
      // Redirect to contact page with indication to share project photos
      return NextResponse.redirect(
        new URL("/contact?action=share-photos", request.url),
        { status: 303 },
      );
    } else if (hasPDFs) {
      // Redirect to contact page with indication to share documents
      return NextResponse.redirect(
        new URL("/contact?action=share-documents", request.url),
        { status: 303 },
      );
    }

    // Default: redirect to contact page
    return NextResponse.redirect(new URL("/contact", request.url), {
      status: 303,
    });
  } catch (error) {
    console.error("[File Handler] Error processing files:", error);
    return NextResponse.json(
      { error: "Failed to process files" },
      { status: 500 },
    );
  }
}

export async function GET() {
  // Handle GET requests by redirecting to contact
  return NextResponse.redirect("/contact", { status: 302 });
}
