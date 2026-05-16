import { type NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/utils/logger";

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

    logger.info("[File Handler] Received files:", fileInfo);

    const { hasImages, hasPDFs } = files.reduce(
      (acc, file) => {
        if (file instanceof File) {
          if (file.type.startsWith("image/")) acc.hasImages = true;
          else if (file.type === "application/pdf") acc.hasPDFs = true;
        }
        return acc;
      },
      { hasImages: false, hasPDFs: false },
    );

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

    return NextResponse.redirect(new URL("/contact", request.url), {
      status: 303,
    });
  } catch (error) {
    logger.error("[File Handler] Error processing files:", error);
    return NextResponse.json(
      { error: "Failed to process files" },
      { status: 500 },
    );
  }
}

export function GET(request: NextRequest) {
  return NextResponse.redirect(new URL("/contact", request.url), {
    status: 302,
  });
}
