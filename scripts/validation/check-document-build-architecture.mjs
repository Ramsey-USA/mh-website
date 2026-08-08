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

if (failures.length > 0) {
  console.error("Document build-architecture integration check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  "Document build-architecture integration check passed: 193 Draft records, schema 2.2-development, zero approved resolvers.",
);
