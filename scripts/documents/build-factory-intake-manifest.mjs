import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const ecosystemRoot = path.join(root, "documents/content/mh-ecosystem");
const contractPath = path.join(ecosystemRoot, "factory-sync-contract.json");
const outputPath = path.join(ecosystemRoot, "factory-intake-manifest.json");
const check = process.argv.includes("--check");

function parseCsv(source) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (quoted) {
      if (character === '"' && source[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') quoted = false;
      else field += character;
    } else if (character === '"') quoted = true;
    else if (character === ",") {
      row.push(field);
      field = "";
    } else if (character === "\n") {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      field = "";
    } else field += character;
  }
  if (field || row.length) {
    row.push(field.replace(/\r$/, ""));
    rows.push(row);
  }
  const [headers, ...records] = rows.filter((candidate) =>
    candidate.some(Boolean),
  );
  return records.map((record) =>
    Object.fromEntries(
      headers.map((header, index) => [header, record[index] ?? ""]),
    ),
  );
}

const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const contract = JSON.parse(await readFile(contractPath, "utf8"));
const authorityText = await readFile(
  path.join(root, contract.sourceAuthority),
  "utf8",
);
const candidateText = await readFile(
  path.join(root, contract.candidateManifest),
  "utf8",
);
const candidate = JSON.parse(candidateText);

const records = parseCsv(authorityText)
  .map((record) => ({
    enterpriseUid: record.enterprise_uid,
    permanentDocumentId: record.permanent_document_id || null,
    documentIdStatus: record.document_id_status,
    controlledPath: record.controlled_path,
    package: record.package,
    version: record.version,
    lifecycleStatus: record.lifecycle_status,
    operationalValidity: record.operational_validity,
    publicationClass: record.publication_class,
    qrAccessClass: record.qr_access_class,
    evidenceStatus: record.evidence_status,
    sourceSha256: record.docx_sha256,
    generatedPdfSha256: record.pdf_sha256,
  }))
  .sort((a, b) => a.enterpriseUid.localeCompare(b.enterpriseUid));

if (
  records.length !== 354 ||
  new Set(records.map((record) => record.enterpriseUid)).size !== 354
) {
  throw new Error(
    "Phase 1 factory intake requires 354 unique Enterprise UIDs.",
  );
}
if (records.some((record) => record.lifecycleStatus !== "DRAFT")) {
  throw new Error(
    "Factory intake must remain Draft until controlled approval changes metadata.",
  );
}

const inventorySha256 = sha256(JSON.stringify(records));
const manifest = {
  schemaVersion: 2,
  contractVersion: contract.contractVersion,
  governanceSchema: contract.governanceSchema,
  sourceRepository: contract.sourceRepository,
  factoryRepository: contract.factoryRepository,
  sourceAuthority: contract.sourceAuthority,
  sourceAuthoritySha256: sha256(authorityText),
  candidateManifest: contract.candidateManifest,
  candidateManifestSha256: sha256(candidateText),
  candidateArchiveSha256: candidate.sourceArchiveSha256,
  lifecycleStatus: candidate.lifecycleStatus,
  publicationAllowed: false,
  recordCount: records.length,
  inventorySha256,
  records,
};
const serialized = `${JSON.stringify(manifest, null, 2)}\n`;

if (check) {
  const current = await readFile(outputPath, "utf8").catch(() => "");
  if (current !== serialized) {
    console.error(
      "Factory intake manifest is stale. Run: pnpm ecosystem:factory-manifest",
    );
    process.exit(1);
  }
  console.log(
    `Factory intake manifest current: ${records.length} records; ${inventorySha256}.`,
  );
} else {
  await writeFile(outputPath, serialized, "utf8");
  console.log(
    `Wrote factory intake manifest: ${records.length} records; ${inventorySha256}.`,
  );
}
