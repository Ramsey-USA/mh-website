import { type NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/middleware";
import { withSecurity } from "@/middleware/security";
import { rateLimit } from "@/lib/security/rate-limiter";
import { logger } from "@/lib/utils/logger";
import {
  brandDocxDocument,
  brandPdfDocument,
  getBrandedFilename,
} from "@/lib/dashboard/document-branding";
import { badRequest, internalServerError } from "@/lib/api/responses";

export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 20 * 1024 * 1024;

const DOCX_MIME =
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const PDF_MIME = "application/pdf";

function isDocxFile(file: File): boolean {
  return file.type === DOCX_MIME || file.name.toLowerCase().endsWith(".docx");
}

function isPdfFile(file: File): boolean {
  return file.type === PDF_MIME || file.name.toLowerCase().endsWith(".pdf");
}

async function handlePOST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return badRequest("A single file is required under the `file` field.");
    }

    if (file.size <= 0) {
      return badRequest("Uploaded file is empty.");
    }

    if (file.size > MAX_FILE_SIZE) {
      return badRequest("File size exceeds 20 MB limit.");
    }

    const source = new Uint8Array(await file.arrayBuffer());

    if (isPdfFile(file)) {
      const branded = await brandPdfDocument(source);
      const filename = getBrandedFilename(file.name);
      const payload = new Uint8Array(branded).buffer;

      return new NextResponse(payload, {
        status: 200,
        headers: {
          "Content-Type": PDF_MIME,
          "Content-Disposition": `attachment; filename="${filename}"`,
          "Cache-Control": "no-store",
        },
      });
    }

    if (isDocxFile(file)) {
      const branded = await brandDocxDocument(source);
      const filename = getBrandedFilename(file.name);
      const payload = new Uint8Array(branded).buffer;

      return new NextResponse(payload, {
        status: 200,
        headers: {
          "Content-Type": DOCX_MIME,
          "Content-Disposition": `attachment; filename="${filename}"`,
          "Cache-Control": "no-store",
        },
      });
    }

    return badRequest(
      "Unsupported file type. Upload PDF or Word (.docx) files.",
    );
  } catch (_error) {
    logger.error("Document branding error", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return internalServerError("Unable to brand the uploaded document.");
  }
}

export const POST = rateLimit({ maxRequests: 20, windowMs: 60_000 })(
  requireRole(["admin"], withSecurity(handlePOST)),
);
