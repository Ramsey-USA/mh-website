#!/usr/bin/env node

import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const repoRoot = resolve(import.meta.dirname, "../..");
const packageRoot = resolve(
  repoRoot,
  "documents/content/mh-ecosystem/governance/build-architecture-decoupling-2026-08-08",
);
const failures = [];

function fail(message) {
  failures.push(message);
}

function read(relativePath) {
  return readFileSync(resolve(packageRoot, relativePath), "utf8");
}

function readJson(relativePath) {
  return JSON.parse(read(relativePath));
}

function sha256(relativePath) {
  return createHash("sha256")
    .update(readFileSync(resolve(packageRoot, relativePath)))
    .digest("hex");
}

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
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
      continue;
    }

    if (character === '"') {
      quoted = true;
    } else if (character === ",") {
      row.push(field);
      field = "";
    } else if (character === "\n") {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += character;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field.replace(/\r$/, ""));
    rows.push(row);
  }

  const [headers, ...records] = rows.filter((candidate) =>
    candidate.some((value) => value.length > 0),
  );

  return records.map((record) =>
    Object.fromEntries(
      headers.map((header, index) => [header, record[index] ?? ""]),
    ),
  );
}

if (!existsSync(packageRoot)) {
  fail("Build-architecture decoupling package is missing.");
}

const checksumLines = read("SHA256SUMS.txt").split(/\r?\n/).filter(Boolean);

for (const line of checksumLines) {
  const match = line.match(/^([a-f0-9]{64})\s{2}(.+)$/);
  if (!match) {
    fail(`Malformed checksum entry: ${line}`);
    continue;
  }

  const [, expected, filename] = match;
  if (!existsSync(resolve(packageRoot, filename))) {
    fail(`Checksum target is missing: ${filename}`);
    continue;
  }

  const actual = sha256(filename);
  if (actual !== expected) {
    fail(
      `Checksum mismatch for ${filename}: expected ${expected}, got ${actual}`,
    );
  }
}

const qa = readJson("MH-BUILD-ARCHITECTURE-DECOUPLING-QA.json");
if (qa.result !== "PASS" || qa.schemaVersion !== "2.2-development") {
  fail("Received decoupling QA must remain PASS at schema 2.2-development.");
}

for (const [field, expected] of Object.entries({
  documentsRegenerated: 0,
  permanentIdsChanged: 0,
  resolverRoutesChanged: 0,
  documentsIssued: 0,
  documentsSuperseded: 0,
})) {
  if (qa.counts?.[field] !== expected) {
    fail(`QA count ${field} must remain ${expected}.`);
  }
}

const schema = readJson("MH-ENTERPRISE-DOCUMENT-REGISTER-SCHEMA.json");
if (
  schema.$id !== "urn:mh:enterprise-document-register-schema:2.2-development"
) {
  fail("Enterprise Document Register schema ID drifted from 2.2-development.");
}

const buildMetadata = schema.properties?.buildMetadata?.properties ?? {};
if (!buildMetadata.lastBuildUnit || buildMetadata.lastBuildUnit.enum) {
  fail(
    "lastBuildUnit must remain topology-neutral and must not enumerate build units.",
  );
}
if (buildMetadata.lastBuildBatch?.deprecated !== true) {
  fail("lastBuildBatch must remain a deprecated compatibility alias.");
}

const scorecard = parseCsv(
  read("MH-DOCUMENT-GOVERNANCE-READINESS-SCORECARD.csv"),
);
if (scorecard.length !== 193) {
  fail(
    `Readiness scorecard must contain 193 records; found ${scorecard.length}.`,
  );
}

const count = (field, value) =>
  scorecard.filter((record) => record[field] === value).length;

for (const [label, actual, expected] of [
  ["Rough Draft records", count("Lifecycle", "Rough Draft"), 193],
  ["established Document IDs", count("Document ID Status", "ESTABLISHED"), 64],
  [
    "not-established Document IDs",
    count("Document ID Status", "NOT_ESTABLISHED"),
    129,
  ],
  ["ready QR targets", count("QR Target Ready", "YES"), 0],
  ["ready resolvers", count("Resolver Ready", "YES"), 0],
  ["QR hard blockers", count("QR Hard Blocker", "YES"), 159],
]) {
  if (actual !== expected) {
    fail(`${label} must equal ${expected}; found ${actual}.`);
  }
}

const decisions = parseCsv(
  read("MH-GOVERNANCE-MANAGEMENT-DECISION-REGISTER.csv"),
);
const resolverDecision = decisions.find(
  (decision) => decision["Decision ID"] === "A-QR-001",
);
if (
  !resolverDecision ||
  resolverDecision.Status !== "PENDING MANAGEMENT APPROVAL" ||
  resolverDecision.Implemented !== "No"
) {
  fail("A-QR-001 must remain pending and unimplemented.");
}

const integration = readJson("integration-manifest.json");
if (
  integration.controlStatus !== "draft-not-controlled" ||
  integration.implementationStatus !== "validation-only" ||
  integration.publicRelease?.allowed !== false ||
  integration.qrPolicy?.productionRoutesApproved !== false ||
  integration.qrPolicy?.productionRoutesDeployed !== false
) {
  fail(
    "Integration manifest must keep the received package Draft and fail closed.",
  );
}

const enterprisePlatform = JSON.parse(
  readFileSync(
    resolve(
      repoRoot,
      "documents/content/mh-ecosystem/enterprise-platform.json",
    ),
    "utf8",
  ),
);
const architecture =
  enterprisePlatform.websiteIntegration?.documentBuildArchitecture;
if (
  architecture?.schemaVersion !== "2.2-development" ||
  architecture?.fixedBatchCount !== false ||
  architecture?.implementationStatus !== "validation-only" ||
  architecture?.productionResolverRoutesApproved !== false
) {
  fail(
    "Enterprise platform metadata is not aligned with the decoupled Draft architecture.",
  );
}

for (const forbidden of [
  "apps/website/src/app/qr-codes/page.tsx",
  ".github/workflows/generate-pdfs.yml",
]) {
  if (existsSync(resolve(repoRoot, forbidden))) {
    fail(`Draft architecture forbids active website artifact: ${forbidden}`);
  }
}


const nativeReleaseRoot = resolve(
  repoRoot,
  "documents/content/mh-ecosystem/releases/native-rebuild-schema-2-2-tbt-integrated-2026-08-08",
);

function readNative(relativePath) {
  return readFileSync(resolve(nativeReleaseRoot, relativePath), "utf8");
}

function readNativeJson(relativePath) {
  return JSON.parse(readNative(relativePath));
}

const nativeManifest = readNativeJson("integration-manifest.json");
if (
  nativeManifest.sourceArchiveSha256 !==
    "7d2fc0656603853ae17b7dae6f4c92c6aa5282691d71ff70a18bd8dacda8985d" ||
  nativeManifest.lifecycleStatus !== "DRAFT" ||
  nativeManifest.controlStatus !== "NOT_CONTROLLED" ||
  nativeManifest.publication?.publicReleaseAllowed !== false
) {
  fail("Native schema 2.2 TBT rebuild manifest must remain Draft, private, and fail closed.");
}

const nativeQa = readNativeJson("mh-ecosystem-tbt-integration-final-qa.json");
if (
  nativeQa.result !== "PASS" ||
  nativeQa.schemaVersion !== "2.2-development" ||
  nativeQa.baselinePairs !== 205 ||
  nativeQa.totalPairs !== 346 ||
  nativeQa.tbtPairs !== 223 ||
  nativeQa.newOriginalTbtPairs !== 141 ||
  nativeQa.binderPages !== 1271
) {
  fail("Native schema 2.2 TBT rebuild QA totals drifted.");
}

for (const [field, expected] of Object.entries({
  permanentIdsFabricated: 0,
  resolverRoutesDeployed: 0,
  documentsIssued: 0,
  documentsSuperseded: 0,
  signatureBlocksInNewTbts: 0,
})) {
  if (nativeQa[field] !== expected) {
    fail(`Native rebuild safeguard ${field} must remain ${expected}.`);
  }
}

const nativeMetadata = parseCsv(
  readNative("mh-ecosystem-document-metadata-index.csv"),
);
if (
  nativeMetadata.length !== 346 ||
  nativeMetadata.some(
    (record) =>
      record.lifecycle_status !== "DRAFT" ||
      record.docx_present !== "YES" ||
      record.pdf_present !== "YES" ||
      record.schema_version !== "2.2-development",
  )
) {
  fail("Native rebuild metadata must retain 346 paired Draft schema 2.2 records.");
}

const tbtRegister = parseCsv(readNative("tbt-integration-register.csv"));
if (
  tbtRegister.length !== 141 ||
  tbtRegister.some(
    (record) =>
      record.controlStatus !== "NOT_CONTROLLED" ||
      record.sourceTextCopied !== "NO" ||
      record.qrTargetStatus !== "NOT_ESTABLISHED" ||
      record.schemaVersion !== "2.2-development",
  )
) {
  fail("TBT integration register must retain 141 original, uncontrolled, unresolved Draft records.");
}

const binaryReleaseMembers = [
  "01-core-doctrine.zip",
  "02-strategy-and-business-dev.zip",
  "03-project-delivery.zip",
  "04-safety-and-field-ops.zip",
  "05-it-and-infrastructure.zip",
  "06-tbt-library.zip",
  "07-sds-library.zip",
  "08-forms-ehb.zip",
  "09-forms-operations.zip",
  "10-forms-mish.zip",
  "mh-ecosystem-binder-spine-schema-2-2-tbt-integrated.pdf",
  "mh-ecosystem-complete-field-binder-schema-2-2-tbt-integrated-v3-0-draft.pdf",
];
for (const member of binaryReleaseMembers) {
  if (existsSync(resolve(nativeReleaseRoot, member))) {
    fail(`Private native release binary must not enter website repository: ${member}`);
  }
}

const nativePlatform =
  enterprisePlatform.websiteIntegration?.nativeRebuildSchema22TbtIntegrated;
if (
  nativePlatform?.sourceArchiveSha256 !==
    "7d2fc0656603853ae17b7dae6f4c92c6aa5282691d71ff70a18bd8dacda8985d" ||
  nativePlatform?.inventory?.totalPairs !== 346 ||
  nativePlatform?.inventory?.tbtPairs !== 223 ||
  nativePlatform?.repositoryIntegration !== "metadata-and-validation-authority"
) {
  fail("Enterprise platform metadata is not aligned with the current native rebuild.");
}

if (failures.length > 0) {
  console.error("Document build-architecture integration check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  "Document build-architecture and native rebuild checks passed: 346 Draft pairs, 223 TBT pairs, schema 2.2-development, zero approved resolvers.",
);
