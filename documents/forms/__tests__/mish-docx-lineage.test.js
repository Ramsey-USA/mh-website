const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const manifestPath = path.join(__dirname, "..", "forms-manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const manifestEntries = Array.isArray(manifest.forms) ? manifest.forms : [];

const expectedLineage = {
  "MISH 51":
    "MHC-MISH-59-Forms/FORM-MISH-51-leading-indicators-and-safety-performance-metrics.docx",
  "MISH 52":
    "MHC-MISH-59-Forms/FORM-MISH-52-safety-culture-assessment-and-continuous-improvement.docx",
  "MISH 53": "MHC-MISH-59-Forms/FORM-MISH-53-management-of-change-moc.docx",
  "MISH 54": "MHC-MISH-59-Forms/FORM-MISH-54-fatigue-risk-management.docx",
  "MISH 55":
    "MHC-MISH-59-Forms/FORM-MISH-55-mental-health-and-workforce-wellbeing.docx",
  "MISH 56":
    "MHC-MISH-59-Forms/FORM-MISH-56-near-miss-reporting-and-analysis.docx",
  "MISH 57":
    "MHC-MISH-59-Forms/FORM-MISH-57-contractor-prequalification-and-safety-data-management.docx",
  "MISH 58":
    "MHC-MISH-59-Forms/FORM-MISH-58-safety-technology-and-digital-tools.docx",
  "MISH 59":
    "MHC-MISH-59-Forms/FORM-MISH-59-stop-work-authority-swa-program.docx",
};

for (const [id, expectedDocxPath] of Object.entries(expectedLineage)) {
  const entry = manifestEntries.find((item) => item.id === id);
  assert.ok(entry, `Missing manifest entry for ${id}`);
  assert.equal(
    entry.docxPath,
    expectedDocxPath,
    `${id} should target ${expectedDocxPath}`,
  );
  const resolvedPath = path.join(__dirname, "..", entry.docxPath);
  assert.ok(fs.existsSync(resolvedPath), `${entry.docxPath} is missing`);
}

console.log("Verified manifest DOCX lineage for MISH 51-59.");
