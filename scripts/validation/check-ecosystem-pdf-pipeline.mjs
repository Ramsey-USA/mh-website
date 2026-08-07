import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

const repositoryRoot = path.resolve(process.argv[2] ?? ".");
const manifest = JSON.parse(
  await readFile(
    path.join(
      repositoryRoot,
      "documents/content/mh-ecosystem/ecosystem-pdf-manifest.json",
    ),
    "utf8",
  ),
);
const qrGenerator = await readFile(
  path.join(repositoryRoot, "apps/website/scripts/generate-qr-codes.js"),
  "utf8",
);
const failures = [];

function requireControl(condition, message) {
  if (!condition) failures.push(message);
}

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

requireControl(
  manifest.schemaVersion === 1,
  "Ecosystem PDF manifest schema must be Version 1.",
);
requireControl(
  manifest.lifecycleStatus === "Rough Draft",
  "Ecosystem PDFs must remain Rough Draft.",
);
requireControl(
  manifest.entries.length === 193,
  "Ecosystem PDF manifest must contain 193 controlled PDFs.",
);
requireControl(
  manifest.counts.tbt === 82,
  "Ecosystem PDF manifest must contain 82 TBT PDFs.",
);
requireControl(
  manifest.counts.sds === 11,
  "Ecosystem PDF manifest must contain 11 SDS PDFs.",
);
requireControl(
  manifest.counts.printForms === 64,
  "Ecosystem PDF manifest must classify 64 print forms.",
);
requireControl(
  manifest.binderPlan.packageBinderCount === 10,
  "Binder plan must include ten package binders.",
);
requireControl(
  manifest.binderPlan.companyBibleFirst,
  "Master notebook must begin with the Company Bible.",
);
requireControl(
  manifest.binderPlan.masterCover,
  "Master notebook must include a branded cover.",
);
requireControl(
  manifest.binderPlan.masterToc,
  "Master notebook must include a table of contents.",
);
requireControl(
  manifest.binderPlan.packageCovers,
  "Package binders must include branded covers.",
);
requireControl(
  manifest.binderPlan.packageTocs,
  "Package binders must include tables of contents.",
);
requireControl(
  manifest.binderPlan.dividerTabs,
  "Package and master binders must include divider tabs.",
);
requireControl(
  manifest.binderPlan.printableSpines,
  "Binder pipeline must produce printable spines.",
);
requireControl(
  manifest.binderPlan.masterNotebookRecordCount === 191,
  "Master notebook must contain 191 unique records.",
);
requireControl(
  !manifest.publicationEligible,
  "Draft Ecosystem PDFs cannot be publication eligible.",
);
requireControl(
  qrGenerator.includes("loadApprovedEcosystemDocumentQRCodes"),
  "QR generator must load the controlled Ecosystem PDF manifest.",
);
requireControl(
  qrGenerator.includes(
    ".filter((entry) => entry.publicationEligible === true)",
  ),
  "QR generator must exclude documents without publication approval.",
);

for (const entry of manifest.entries) {
  try {
    const pdf = await readFile(path.join(repositoryRoot, entry.sourcePdf));
    requireControl(
      sha256(pdf) === entry.pdfSha256,
      `PDF hash mismatch: ${entry.sourcePdf}`,
    );
    requireControl(
      !entry.publicationEligible,
      `Draft PDF cannot publish: ${entry.documentId}`,
    );
    requireControl(
      entry.qrPipelineStatus === "queued-until-document-publication-approval",
      `QR entry is not held for document approval: ${entry.documentId}`,
    );
    if (entry.treatment.class === "print-form") {
      requireControl(
        !entry.treatment.individualCover,
        `Form cannot receive a cover: ${entry.documentId}`,
      );
      requireControl(
        entry.treatment.printPageStartIndex === 1,
        `Form control cover is not omitted: ${entry.documentId}`,
      );
      requireControl(
        entry.treatment.printPageCount >= 1,
        `Form has no printable application page: ${entry.documentId}`,
      );
      requireControl(
        entry.treatment.printPageCount <= 2,
        `Form exceeds two printable pages: ${entry.documentId}`,
      );
      requireControl(
        entry.treatment.printOptimized,
        `Form is not print optimized: ${entry.documentId}`,
      );
    }
    if (
      entry.treatment.class === "field-brief" ||
      entry.treatment.class === "extended-field-brief" ||
      entry.treatment.class === "chemical-reference-card"
    ) {
      requireControl(
        !entry.treatment.individualCover,
        `Field reference cannot receive a cover: ${entry.documentId}`,
      );
      requireControl(
        entry.treatment.printPageStartIndex === 1,
        `Field-reference control cover is not omitted: ${entry.documentId}`,
      );
      requireControl(
        entry.treatment.printOptimized,
        `Field reference is not print optimized: ${entry.documentId}`,
      );
    }
  } catch (error) {
    failures.push(error instanceof Error ? error.message : String(error));
  }
}

if (failures.length > 0) {
  console.error("Ecosystem PDF/QR pipeline gate failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  "Ecosystem PDF/QR pipeline gate passed: 193 source PDFs verified; covers, TOCs, tabs, spines, form limits, package binders, and the 191-record master notebook are controlled; Draft QR targets remain held for approval.",
);
