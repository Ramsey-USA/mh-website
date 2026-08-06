#!/usr/bin/env node
/* eslint-disable no-console */

import { copyFile, mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");
const SOURCE_DIR = join(ROOT, "documents/generated-pdfs");
const INPUT_SERIES_SOURCE_DIR = join(SOURCE_DIR, "input-series");
const DOWNLOADS_DIR = join(ROOT, "documents/downloads");

const MANUAL_PDF_SUFFIXES = [
  "complete.pdf",
  "digital.pdf",
  "cover.pdf",
  "spine.pdf",
  "tabs.pdf",
  "toc.pdf",
];

const MANUAL_FAMILIES = [
  { id: "safety-manual", label: "Safety Manual" },
  { id: "employee-handbook", label: "Employee Handbook" },
  { id: "operations-manual", label: "Operations Manual" },
  { id: "marketing-strategy-guide", label: "Marketing Strategy Guide" },
  { id: "sales-estimating-guide", label: "Sales and Estimating Guide" },
];

const SHARED_FILES = ["MHC-company-letterhead.pdf", "website-image-needs.pdf"];
const FORM_SET_FILES = [
  "employee-handbook-forms-package.pdf",
  "safety-manual-forms-package.pdf",
];

function manualFilesFor(manualId) {
  return MANUAL_PDF_SUFFIXES.map((suffix) => `${manualId}-${suffix}`);
}

function buildManualFamilyEntries() {
  return MANUAL_FAMILIES.map((family) => ({
    ...family,
    files: manualFilesFor(family.id),
  }));
}

function toSeriesLabel(seriesId) {
  const parts = String(seriesId).split("-");
  if (parts.length <= 1) return seriesId;
  const numeric = parts.shift();
  const title = parts
    .map((part) => {
      if (
        part === "ehb" ||
        part === "mish" ||
        part === "sds" ||
        part === "tbt"
      ) {
        return part.toUpperCase();
      }
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
  return `${numeric} ${title}`;
}

async function removePdfFiles(dirPath) {
  if (!existsSync(dirPath)) {
    return;
  }

  const entries = await readdir(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);
    if (entry.isDirectory()) {
      await removePdfFiles(fullPath);
      continue;
    }

    if (entry.isFile() && entry.name.toLowerCase().endsWith(".pdf")) {
      await rm(fullPath);
    }
  }
}

async function copyFiles(fileNames, sourceDir, targetDir) {
  await mkdir(targetDir, { recursive: true });

  for (const fileName of fileNames) {
    const sourcePath = join(sourceDir, fileName);
    const targetPath = join(targetDir, fileName);

    if (!existsSync(sourcePath)) {
      throw new Error(`Missing source PDF: ${sourcePath}`);
    }

    await copyFile(sourcePath, targetPath);
    console.log(`  ✓  ${targetPath.replace(ROOT + "/", "")}`);
  }
}

async function copyDirectoryPdfs(sourceDir, targetDir) {
  if (!existsSync(sourceDir)) {
    throw new Error(`Missing source directory: ${sourceDir}`);
  }

  const entries = await readdir(sourceDir, { withFileTypes: true });
  const pdfFiles = entries
    .filter(
      (entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".pdf"),
    )
    .map((entry) => entry.name)
    .sort((left, right) =>
      left.localeCompare(right, undefined, { numeric: true }),
    );

  await mkdir(targetDir, { recursive: true });

  for (const fileName of pdfFiles) {
    const sourcePath = join(sourceDir, fileName);
    const targetPath = join(targetDir, fileName);
    await copyFile(sourcePath, targetPath);
    console.log(`  ✓  ${targetPath.replace(ROOT + "/", "")}`);
  }

  return pdfFiles;
}

async function copyInputSeriesBundles() {
  if (!existsSync(INPUT_SERIES_SOURCE_DIR)) {
    throw new Error(
      `Missing input-series PDF source folder: ${INPUT_SERIES_SOURCE_DIR}. Run docs:generate:input-series first.`,
    );
  }

  const entries = await readdir(INPUT_SERIES_SOURCE_DIR, {
    withFileTypes: true,
  });
  const seriesEntries = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const seriesId = entry.name;
    const sourceFamilyDir = join(INPUT_SERIES_SOURCE_DIR, seriesId);
    const targetFamilyDir = join(DOWNLOADS_DIR, "series", seriesId);
    const files = await copyDirectoryPdfs(sourceFamilyDir, targetFamilyDir);
    if (files.length === 0) continue;
    seriesEntries.push({
      id: seriesId,
      label: toSeriesLabel(seriesId),
      files,
    });
  }

  seriesEntries.sort((a, b) =>
    a.id.localeCompare(b.id, undefined, { numeric: true }),
  );

  if (seriesEntries.length === 0) {
    throw new Error(
      "No one-to-one series PDFs were found under documents/generated-pdfs/input-series/.",
    );
  }

  return seriesEntries;
}

function formatPathList(folderName, fileNames) {
  return fileNames
    .map(
      (fileName) =>
        `- [${folderName}/${fileName}](./${folderName}/${fileName})`,
    )
    .join("\n");
}

function buildManualOverviewList(manualFamilies) {
  return manualFamilies
    .map(
      (family) =>
        `- [${family.id}/](./${family.id}/) - final ${family.label} PDFs for download`,
    )
    .join("\n");
}

function buildManualSectionBlocks(manualFamilies) {
  return manualFamilies
    .map(
      (family) =>
        `## ${family.label}\n\n${formatPathList(family.id, family.files)}`,
    )
    .join("\n\n");
}

function buildSeriesOverviewList(seriesEntries) {
  return seriesEntries
    .map(
      (entry) =>
        `- [series/${entry.id}/](./series/${entry.id}/) - ${entry.label} one-to-one bundle (input DOCX filename parity)`,
    )
    .join("\n");
}

function buildSeriesSectionBlocks(seriesEntries) {
  return seriesEntries
    .map(
      (entry) =>
        `## ${entry.label}\n\n${formatPathList(`series/${entry.id}`, entry.files)}`,
    )
    .join("\n\n");
}

async function writeDownloadIndex(formFiles, manualFamilies, seriesEntries) {
  const content = `# Download Bundle\n\nThis folder is the download-friendly view of the generated PDFs.\n\n${buildManualOverviewList(manualFamilies)}\n- [shared/](./shared/) - common print assets like the company letterhead\n- [forms/](./forms/) - final form package PDFs for download\n- [series/](./series/) - numbered input-series bundles generated one-to-one from input DOCX files\n\nExact download locations:\n\n${buildManualSectionBlocks(manualFamilies)}\n\n## Shared\n\n${formatPathList("shared", SHARED_FILES)}\n\n## Form Sets\n\n${formatPathList("forms", FORM_SET_FILES)}\n\n## Forms\n\n${formatPathList("forms", formFiles)}\n\n## Numbered Ecosystem Series (One-to-One Input Parity)\n\n${buildSeriesOverviewList(seriesEntries)}\n\n${buildSeriesSectionBlocks(seriesEntries)}\n\nRefresh it with:\n\n\`\`\`bash\npnpm --filter @mhc/website run docs:bundle:downloads\n\`\`\`\n`;

  const targetPath = join(DOWNLOADS_DIR, "README.md");
  await mkdir(DOWNLOADS_DIR, { recursive: true });
  await writeFile(targetPath, content);
}

async function main() {
  if (!existsSync(SOURCE_DIR)) {
    throw new Error(
      `Generated PDF source folder not found: ${SOURCE_DIR}. Run docs generation first.`,
    );
  }

  console.log("📦 Building download bundle…");
  await removePdfFiles(DOWNLOADS_DIR);

  const manualFamilies = buildManualFamilyEntries();
  for (const family of manualFamilies) {
    await copyFiles(family.files, SOURCE_DIR, join(DOWNLOADS_DIR, family.id));
  }

  const seriesEntries = await copyInputSeriesBundles();

  await copyFiles(SHARED_FILES, SOURCE_DIR, join(DOWNLOADS_DIR, "shared"));
  const formFiles = await copyDirectoryPdfs(
    join(SOURCE_DIR, "form-packages"),
    join(DOWNLOADS_DIR, "forms"),
  );

  const missingFormSets = FORM_SET_FILES.filter(
    (fileName) => !formFiles.includes(fileName),
  );
  if (missingFormSets.length > 0) {
    throw new Error(
      `Missing aggregate form-set PDFs in documents/generated-pdfs/form-packages/: ${missingFormSets.join(", ")}. Run docs:generate:forms and docs:generate:forms:handbook first.`,
    );
  }

  await writeDownloadIndex(formFiles, manualFamilies, seriesEntries);

  console.log("✅  Download bundle written to: documents/downloads/");
}

await main();
