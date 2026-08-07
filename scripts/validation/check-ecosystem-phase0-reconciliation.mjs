import { readFile } from "node:fs/promises";

const registerPath = new URL(
  "../../documents/content/mh-ecosystem/phase-0-reconciliation.json",
  import.meta.url,
);
const authorityPath = new URL(
  "../../documents/content/mh-ecosystem/enterprise-platform.json",
  import.meta.url,
);
const register = JSON.parse(await readFile(registerPath, "utf8"));
const authority = JSON.parse(await readFile(authorityPath, "utf8"));
const failures = [];

function requireControl(condition, message) {
  if (!condition) failures.push(message);
}

const records = register.records ?? [];
const recordIds = records.map((record) => record.controlledRecordId);
const allowedDispositions = new Set([
  "repository-exact-sealed-source",
  "repository-working-copy-diverged-from-sealed-baseline",
  "sealed-authorized-distribution-copy",
]);

requireControl(
  register.schemaVersion === 1,
  "Phase 0 register schema must be Version 1.",
);
requireControl(
  register.lifecycleStatus === "Rough Draft",
  "Phase 0 lifecycle must remain Rough Draft.",
);
requireControl(
  records.length === 193,
  `Expected 193 controlled records; found ${records.length}.`,
);
requireControl(
  new Set(recordIds).size === 193,
  "Controlled record IDs must be unique.",
);
requireControl(
  register.sealedArtifact.docxCount === 193,
  "Sealed DOCX count must be 193.",
);
requireControl(
  register.sealedArtifact.pdfCount === 193,
  "Sealed PDF count must be 193.",
);
requireControl(
  register.sealedArtifact.renderedPageCount === 1008,
  "Sealed rendered-page count must be 1,008.",
);
requireControl(
  register.sealedArtifact.numberedPackageCount === 10,
  "Package count must be ten.",
);
requireControl(
  register.sealedArtifact.companyBibleSeparate,
  "Company Bible must remain separately controlled.",
);
requireControl(
  register.repositoryIntake.docxCount === 191,
  "Repository intake must report 191 DOCX files.",
);
requireControl(
  register.repositoryIntake.matchedRecordCount === 191,
  "All 191 repository DOCX files must map to controlled records.",
);
requireControl(
  register.repositoryIntake.unmatchedRepositoryPaths.length === 0,
  "Repository intake contains an unmatched DOCX file.",
);
requireControl(
  records.every((record) =>
    allowedDispositions.has(record.repositoryDisposition),
  ),
  "Every controlled record must have an allowed Phase 0 disposition.",
);
requireControl(
  records.every(
    (record) => record.publicationClassification === "not-public-draft",
  ),
  "Every Rough Draft record must remain classified as not public.",
);
requireControl(
  !records.some(
    (record) =>
      record.repositoryDisposition === "unexplained-repository-omission",
  ),
  "Phase 0 contains an unexplained repository omission.",
);
requireControl(
  register.dispositionCounts[
    "repository-working-copy-diverged-from-sealed-baseline"
  ] === 98,
  "Expected 98 governed repository working-copy divergences.",
);
requireControl(
  register.dispositionCounts["repository-exact-sealed-source"] === 93,
  "Expected 93 exact sealed TBT/SDS sources in repository intake.",
);
requireControl(
  register.dispositionCounts["sealed-authorized-distribution-copy"] === 2,
  "Expected two authorized distribution copies.",
);
requireControl(
  authority.websiteIntegration.currentGate ===
    "phase-1-authority-pipeline-foundation",
  "Enterprise authority must advance to the Phase 1 gate after Phase 0 closes.",
);
requireControl(
  authority.websiteIntegration.phase0Status === "complete",
  "Enterprise authority must record Phase 0 as complete.",
);
requireControl(
  !register.controls.publicDraftDownloadsAllowed,
  "Draft public downloads must remain blocked.",
);
requireControl(
  !register.controls.fieldEffective,
  "Rough Draft records cannot be field-effective.",
);

if (failures.length > 0) {
  console.error("Phase 0 reconciliation gate failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  "Ecosystem reconciliation gate passed: 193 controlled records disposed, 98 governed working copies mapped, 93 exact TBT/SDS sources ingested, and two distribution copies governed.",
);
