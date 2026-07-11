#!/usr/bin/env node

/**
 * Revision Congruency Check
 *
 * Enforces canonical revision metadata across documents, dashboard brand config,
 * and website-facing source bindings.
 */

const fs = require("node:fs");
const path = require("node:path");

const APP_ROOT = process.cwd();
const REPO_ROOT = path.resolve(APP_ROOT, "..", "..");

const CANONICAL = {
  revisionNumber: "3.0",
  revisionDate: "7/1/2026",
  legacyDates: ["04/07/2026", "05/01/2026", "June 2026"],
};

const FILES = {
  documentsBrand: path.join(REPO_ROOT, "documents", "brands", "mhc.json"),
  dashboardBrand: path.join(
    REPO_ROOT,
    "apps",
    "dashboard",
    "documents",
    "brands",
    "mhc.json",
  ),
  formsManifest: path.join(
    REPO_ROOT,
    "documents",
    "forms",
    "forms-manifest.json",
  ),
  docsGenerator: path.join(REPO_ROOT, "documents", "scripts", "generate.mjs"),
  docsData: path.join(APP_ROOT, "src", "lib", "data", "documents.ts"),
  safetyContentsPage: path.join(
    APP_ROOT,
    "src",
    "app",
    "resources",
    "safety-manual",
    "contents",
    "page.tsx",
  ),
  safetyClusterPage: path.join(
    APP_ROOT,
    "src",
    "app",
    "resources",
    "safety-manual",
    "[cluster]",
    "page.tsx",
  ),
  handbookPage: path.join(
    APP_ROOT,
    "src",
    "app",
    "employee-handbook",
    "page.tsx",
  ),
  safetyPage: path.join(APP_ROOT, "src", "app", "safety", "page.tsx"),
};

const errors = [];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function rel(filePath) {
  return path.relative(REPO_ROOT, filePath).split(path.sep).join("/");
}

function checkBrandFile(filePath, label) {
  const json = readJson(filePath);
  assert(
    json.revisionNumber === CANONICAL.revisionNumber,
    `${label} revisionNumber must be ${CANONICAL.revisionNumber} in ${rel(filePath)} (found ${json.revisionNumber}).`,
  );
  assert(
    json.revisionDate === CANONICAL.revisionDate,
    `${label} revisionDate must be ${CANONICAL.revisionDate} in ${rel(filePath)} (found ${json.revisionDate}).`,
  );
}

function checkFormsManifest() {
  const manifest = readJson(FILES.formsManifest);
  const forms = Array.isArray(manifest.forms) ? manifest.forms : [];

  assert(
    forms.length > 0,
    `${rel(FILES.formsManifest)} must contain forms[] entries.`,
  );

  for (const form of forms) {
    const id = form.id || form.slug || "unknown-form";
    if (form.revision !== CANONICAL.revisionNumber) {
      errors.push(
        `Form ${id} revision must be ${CANONICAL.revisionNumber} in ${rel(FILES.formsManifest)} (found ${form.revision}).`,
      );
    }
    if (form.effectiveDate !== CANONICAL.revisionDate) {
      errors.push(
        `Form ${id} effectiveDate must be ${CANONICAL.revisionDate} in ${rel(FILES.formsManifest)} (found ${form.effectiveDate}).`,
      );
    }
  }
}

function checkGeneratorEnforcement() {
  const src = readText(FILES.docsGenerator);

  assert(
    /const\s+ENFORCED_REVISION_DATE\s*=\s*"7\/1\/2026";/.test(src),
    `${rel(FILES.docsGenerator)} must enforce ENFORCED_REVISION_DATE = "${CANONICAL.revisionDate}".`,
  );
  assert(
    /const\s+ENFORCED_REVISION_NUMBER\s*=\s*"3\.0";/.test(src),
    `${rel(FILES.docsGenerator)} must enforce ENFORCED_REVISION_NUMBER = "${CANONICAL.revisionNumber}".`,
  );
}

function checkWebsiteBindings() {
  const docsData = readText(FILES.docsData);
  const safetyContents = readText(FILES.safetyContentsPage);
  const safetyCluster = readText(FILES.safetyClusterPage);
  const handbookPage = readText(FILES.handbookPage);
  const safetyPage = readText(FILES.safetyPage);

  assert(
    /SAFETY_PROGRAM_REVISION_NUMBER\s*=\s*mhcBrand\.revisionNumber\s*\|\|\s*"3\.0";/.test(
      docsData,
    ),
    `${rel(FILES.docsData)} must set safety revision fallback to ${CANONICAL.revisionNumber}.`,
  );
  assert(
    /SAFETY_PROGRAM_REVISION_DATE\s*=\s*mhcBrand\.revisionDate\s*\|\|\s*"7\/1\/2026";/.test(
      docsData,
    ),
    `${rel(FILES.docsData)} must set safety revision date fallback to ${CANONICAL.revisionDate}.`,
  );
  assert(
    /EMPLOYEE_HANDBOOK_REVISION_NUMBER\s*=\s*"3\.0";/.test(docsData),
    `${rel(FILES.docsData)} must set handbook revision number to ${CANONICAL.revisionNumber}.`,
  );
  assert(
    /EMPLOYEE_HANDBOOK_REVISION_DATE\s*=\s*"7\/1\/2026";/.test(docsData),
    `${rel(FILES.docsData)} must set handbook revision date to ${CANONICAL.revisionDate}.`,
  );

  assert(
    /revisionNumber\s*=\s*manual\?\.revisionNumber\s*\?\?\s*"3\.0";/.test(
      safetyContents,
    ),
    `${rel(FILES.safetyContentsPage)} must default revisionNumber to ${CANONICAL.revisionNumber}.`,
  );
  assert(
    /revisionDate\s*=\s*manual\?\.revisionDate\s*\?\?\s*"7\/1\/2026";/.test(
      safetyContents,
    ),
    `${rel(FILES.safetyContentsPage)} must default revisionDate to ${CANONICAL.revisionDate}.`,
  );

  assert(
    /REVISION_NUMBER\s*=\s*safetyManualEntry\?\.revisionNumber\s*\?\?\s*"3\.0";/.test(
      safetyCluster,
    ),
    `${rel(FILES.safetyClusterPage)} must default REVISION_NUMBER to ${CANONICAL.revisionNumber}.`,
  );
  assert(
    /REVISION_DATE\s*=\s*safetyManualEntry\?\.revisionDate\s*\?\?\s*"7\/1\/2026";/.test(
      safetyCluster,
    ),
    `${rel(FILES.safetyClusterPage)} must default REVISION_DATE to ${CANONICAL.revisionDate}.`,
  );

  assert(
    /revisionNumber\s*=\s*manual\?\.revisionNumber\s*\?\?\s*"3\.0";/.test(
      handbookPage,
    ),
    `${rel(FILES.handbookPage)} must default revisionNumber to ${CANONICAL.revisionNumber}.`,
  );
  assert(
    /revisionDate\s*=\s*manual\?\.revisionDate\s*\?\?\s*"7\/1\/2026";/.test(
      handbookPage,
    ),
    `${rel(FILES.handbookPage)} must default revisionDate to ${CANONICAL.revisionDate}.`,
  );

  assert(
    safetyPage.includes("Revision 3.0, effective July 1, 2026"),
    `${rel(FILES.safetyPage)} FAQ revision statement must use "Revision 3.0, effective July 1, 2026".`,
  );
}

function checkLegacyDateLeakage() {
  const scopedFiles = [
    FILES.documentsBrand,
    FILES.dashboardBrand,
    FILES.formsManifest,
    FILES.docsData,
    FILES.safetyContentsPage,
    FILES.safetyClusterPage,
    FILES.handbookPage,
    FILES.safetyPage,
  ];

  for (const filePath of scopedFiles) {
    const src = readText(filePath);
    for (const legacy of CANONICAL.legacyDates) {
      if (src.includes(legacy)) {
        errors.push(
          `${rel(filePath)} still contains legacy revision token: ${legacy}`,
        );
      }
    }
  }
}

function main() {
  checkBrandFile(FILES.documentsBrand, "Documents brand");
  checkBrandFile(FILES.dashboardBrand, "Dashboard brand");
  checkFormsManifest();
  checkGeneratorEnforcement();
  checkWebsiteBindings();
  checkLegacyDateLeakage();

  if (errors.length) {
    console.error("\nRevision congruency check failed:\n");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log(
    `PASS: Revision metadata is congruent at Rev ${CANONICAL.revisionNumber} / ${CANONICAL.revisionDate} across documents, dashboard, and website sources.`,
  );
}

main();
