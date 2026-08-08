import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const event = JSON.parse(await readFile(process.env.GITHUB_EVENT_PATH, "utf8"));
const payload = event.client_payload ?? {};
for (const field of [
  "factoryRepository",
  "factoryCommit",
  "releaseId",
  "releaseManifestSha256",
  "documents",
]) {
  if (!payload[field]) throw new Error(`Release event missing ${field}.`);
}
if (payload.factoryRepository !== "Ramsey-USA/mh-document-factory")
  throw new Error("Untrusted factory repository.");
if (!/^[0-9a-f]{40}$/i.test(payload.factoryCommit))
  throw new Error("Factory commit must be exact.");
if (!/^[0-9a-f]{64}$/i.test(payload.releaseManifestSha256))
  throw new Error("Release manifest SHA-256 is invalid.");
if (
  !Array.isArray(payload.documents) ||
  payload.documents.length < 1 ||
  payload.documents.length > 25
) {
  throw new Error("Release event must contain 1-25 documents.");
}
for (const document of payload.documents) {
  if (
    !document.enterpriseUid ||
    !document.version ||
    !/^[0-9a-f]{64}$/i.test(document.sha256 ?? "")
  ) {
    throw new Error("Release document identity or hash is invalid.");
  }
  if (
    !/^controlled-documents\/[a-z0-9.-]+\/[0-9.]+\/[a-f0-9]{64}\.pdf$/.test(
      document.r2Key ?? "",
    )
  ) {
    throw new Error("Release document R2 key is mutable or invalid.");
  }
}
const receiptRoot = path.join(process.cwd(), "build/document-factory-receipts");
await mkdir(receiptRoot, { recursive: true });
await writeFile(
  path.join(receiptRoot, `${payload.releaseId}.json`),
  `${JSON.stringify(
    {
      receiptVersion: 1,
      receivedAt: new Date().toISOString(),
      factoryRepository: payload.factoryRepository,
      factoryCommit: payload.factoryCommit,
      releaseId: payload.releaseId,
      releaseManifestSha256: payload.releaseManifestSha256,
      documentCount: payload.documents.length,
      documents: payload.documents,
      status: "VALIDATED_NOT_AUTHORIZED_TO_ROUTE",
    },
    null,
    2,
  )}\n`,
);
console.log(
  `Validated release receipt ${payload.releaseId}; redirect mutation remains prohibited.`,
);
