import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const authorityPath = join(
  root,
  "documents/content/mh-ecosystem/enterprise-platform.json",
);
const terminologyPath = join(
  root,
  "documents/content/terminology-library.json",
);
const ribbonsPath = join(
  root,
  "apps/website/src/content/jeremy-page-ribbons.md",
);

const authority = JSON.parse(readFileSync(authorityPath, "utf8"));
const terminology = JSON.parse(readFileSync(terminologyPath, "utf8"));
const ribbons = readFileSync(ribbonsPath, "utf8");

const errors = [];

if (authority.baseline?.status !== "draft") {
  errors.push("MH Ecosystem baseline must remain draft until the Review gate.");
}

const baseline = authority.baseline ?? {};
if (baseline.docxCount !== 193 || baseline.pdfCount !== 193) {
  errors.push(
    "Complete Master Draft baseline must contain 193 DOCX/PDF pairs.",
  );
}

if (baseline.packageCount !== 10 || baseline.companyBibleSeparate !== true) {
  errors.push(
    "Release structure must retain ten ZIP packages and a separately controlled Company Bible.",
  );
}

if (
  baseline.releaseArtifact !==
  "mh-ecosystem-draft-native-rebuild-master-governance-corrected-2026-08-06.zip"
) {
  errors.push("Complete Master Draft release artifact identity is incorrect.");
}

if (!/^[a-f0-9]{64}$/.test(baseline.releaseSha256 ?? "")) {
  errors.push("Complete Master Draft must carry its SHA-256 release identity.");
}

if (baseline.renderedPageCount !== 1008) {
  errors.push("Native rebuild baseline must reconcile to 1,008 PDF pages.");
}

if (baseline.fieldEffective !== false) {
  errors.push("Draft Ecosystem must not be represented as field-effective policy.");
}

const releaseControls = authority.pdfGenerator?.releaseControls ?? {};
if (
  releaseControls.publishOnDocumentChange !== false ||
  releaseControls.productionApprovalRequired !== true ||
  releaseControls.gitCommitCountIsRevision !== false ||
  releaseControls.directProductionUploadFromBuildJob !== false
) {
  errors.push(
    "PDF release controls must separate generation from approved production publication.",
  );
}

if (authority.publicDownloadPolicy?.draftDownloadsAllowed !== false) {
  errors.push(
    "Draft Ecosystem downloads must remain blocked from public release.",
  );
}

if (
  terminology.library?.source?.ecosystemAuthority !==
  "documents/content/mh-ecosystem/enterprise-platform.json"
) {
  errors.push(
    "Terminology library must point to the MH Ecosystem authority file.",
  );
}

const ribbonCount = (ribbons.match(/^##\s+/gm) ?? []).length;
if (ribbonCount < 48) {
  errors.push(
    `Words from the General requires at least 48 entries; found ${ribbonCount}.`,
  );
}

if (!ribbons.includes("Status: Approved for publication")) {
  errors.push("Words from the General publication approval is missing.");
}

const activePublicFiles = [
  "messages/en.json",
  "messages/es.json",
  "apps/website/src/lib/data/about-timeline.ts",
  "apps/website/src/app/employee-handbook/page.tsx",
  "apps/website/src/app/resources/page.tsx",
  "apps/website/src/app/resources/safety-manual/contents/page.tsx",
  "apps/website/src/components/pwa/PWAInstallCTA.tsx",
  "documents/content/terminology-library.json",
  "docs/branding/brand-constants.md",
  "docs/branding/strategy/dual-terminology-standard.md",
  "docs/branding/strategy/universal-terminology-guide.md",
];

const prohibited = [
  /High-Level CRM/i,
  /Dashboard \(Staff Hub\)/i,
  /Chief Preconstruction Officer/i,
  /\bCPCO\b/i,
  /Chief of Operations/i,
];

for (const relative of activePublicFiles) {
  const text = readFileSync(join(root, relative), "utf8");
  for (const pattern of prohibited) {
    if (pattern.test(text)) {
      errors.push(`${relative} contains obsolete terminology: ${pattern}`);
    }
  }
}

if (errors.length) {
  console.error("MH Ecosystem authority gate failed:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `MH Ecosystem authority gate passed: ${baseline.docxCount} controlled pairs, ${baseline.renderedPageCount} rendered pages, ${ribbonCount} approved Words from the General entries; Draft publication boundary enforced.`,
);
