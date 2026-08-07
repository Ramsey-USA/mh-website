import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const authorityPath = path.join(root, "documents/content/mh-ecosystem/phase-0-reconciliation.json");
const contractPath = path.join(root, "documents/content/mh-ecosystem/factory-sync-contract.json");
const outputPath = path.join(root, "documents/content/mh-ecosystem/factory-intake-manifest.json");
const check = process.argv.includes("--check");

const authority = JSON.parse(await readFile(authorityPath, "utf8"));
const contract = JSON.parse(await readFile(contractPath, "utf8"));
const records = authority.records
  .filter((record) => record.repositoryPath)
  .map((record) => ({
    controlledRecordId: record.controlledRecordId,
    documentId: record.documentId,
    package: record.package,
    version: record.version,
    lifecycleStatus: record.lifecycleStatus,
    sourcePath: record.repositoryPath,
    sourceSha256: record.repositorySha256,
    baselineDocxSha256: record.docxSha256,
    disposition: record.repositoryDisposition,
    publicationClassification: record.publicationClassification,
  }))
  .sort((a, b) => a.controlledRecordId.localeCompare(b.controlledRecordId));

const inventorySha256 = createHash("sha256")
  .update(JSON.stringify(records))
  .digest("hex");
const manifest = {
  schemaVersion: 1,
  contractVersion: contract.contractVersion,
  sourceRepository: contract.sourceRepository,
  factoryRepository: contract.factoryRepository,
  baselineSha256: authority.sealedArtifact.sha256,
  lifecycleStatus: authority.lifecycleStatus,
  publicationAllowed: false,
  recordCount: records.length,
  inventorySha256,
  records,
};
const serialized = `${JSON.stringify(manifest, null, 2)}\n`;

if (check) {
  const current = await readFile(outputPath, "utf8").catch(() => "");
  if (current !== serialized) {
    console.error("Factory intake manifest is stale. Run: pnpm ecosystem:factory-manifest");
    process.exit(1);
  }
  console.log(`Factory intake manifest current: ${records.length} records; ${inventorySha256}.`);
} else {
  await writeFile(outputPath, serialized, "utf8");
  console.log(`Wrote factory intake manifest: ${records.length} records; ${inventorySha256}.`);
}

