import { NextResponse, type NextRequest } from "next/server";
import registry from "@/lib/data/controlled-document-redirects.json";

export const dynamic = "force-dynamic";
const SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ stableId: string }> },
) {
  const { stableId } = await params;
  if (!SAFE_ID.test(stableId)) {
    return NextResponse.json({ error: "Invalid document ID" }, { status: 400 });
  }
  const record = registry.redirects.find(
    (entry) => entry.stableId === stableId,
  );
  if (!record || (record as { status: string }).status === "retired") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const response = NextResponse.redirect(
    new URL(record.target, request.url),
    307,
  );
  response.headers.set("Cache-Control", registry.defaultCacheControl);
  response.headers.set("X-MH-Document-ID", stableId);
  response.headers.set("X-MH-Document-Classification", record.classification);
  return response;
}
