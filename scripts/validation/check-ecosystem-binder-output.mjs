import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { PDFDocument } from "pdf-lib";

const repositoryRoot = path.resolve(process.argv[2] ?? ".");
const outputRoot = path.join(
  repositoryRoot,
  "apps/website/documents/generated-pdfs/controlled-ecosystem",
);
const buildManifestPath = path.join(outputRoot, "binder-build-manifest.json");
const build = JSON.parse(await readFile(buildManifestPath, "utf8"));
const failures = [];
const expectedCounts = { binder: 11, spine: 11, "print-ready": 157 };

function requireControl(condition, message) {
  if (!condition) failures.push(message);
}

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

requireControl(
  build.schemaVersion === 1,
  "Binder build manifest schema must be Version 1.",
);
requireControl(
  build.lifecycleStatus === "Rough Draft",
  "Binder artifacts must remain Rough Draft.",
);
requireControl(
  Array.isArray(build.outputs),
  "Binder build manifest outputs must be an array.",
);

const seenPaths = new Set();
for (const output of build.outputs ?? []) {
  requireControl(
    !seenPaths.has(output.path),
    `Duplicate binder artifact path: ${output.path}`,
  );
  seenPaths.add(output.path);
  requireControl(
    Object.hasOwn(expectedCounts, output.artifactType),
    `Unknown binder artifact type: ${output.artifactType}`,
  );
  const absolutePath = path.resolve(outputRoot, output.path);
  requireControl(
    absolutePath.startsWith(`${path.resolve(outputRoot)}${path.sep}`),
    `Artifact escapes output root: ${output.path}`,
  );
  try {
    const bytes = await readFile(absolutePath);
    requireControl(
      sha256(bytes) === output.sha256,
      `Artifact hash mismatch: ${output.path}`,
    );
    const pdf = await PDFDocument.load(bytes);
    requireControl(
      pdf.getPageCount() === output.pages,
      `Artifact page-count mismatch: ${output.path}`,
    );
    if (
      output.artifactType === "print-ready" &&
      output.treatmentClass === "print-form"
    ) {
      requireControl(
        output.pages >= 1 && output.pages <= 2,
        `Print-ready artifact exceeds two pages: ${output.path}`,
      );
    }
  } catch (error) {
    failures.push(error instanceof Error ? error.message : String(error));
  }
}

for (const [artifactType, count] of Object.entries(expectedCounts)) {
  requireControl(
    (build.outputs ?? []).filter(
      (output) => output.artifactType === artifactType,
    ).length === count,
    `Expected ${count} ${artifactType} artifacts.`,
  );
}

const master = (build.outputs ?? []).find(
  (output) => output.path === "mh-ecosystem-master-notebook-v1-0-draft.pdf",
);
requireControl(
  master?.artifactType === "binder",
  "Master notebook binder is missing.",
);
requireControl(
  master?.records === 191,
  "Master notebook must contain 191 unique records.",
);
requireControl(
  master?.pages === 726,
  "Master notebook must contain 726 rendered pages.",
);

if (failures.length) {
  console.error("Ecosystem binder artifact gate failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  "Ecosystem binder artifact gate passed: 11 binders, 11 spines, 157 print-ready files, and the 726-page master notebook verified by hash and page count.",
);
