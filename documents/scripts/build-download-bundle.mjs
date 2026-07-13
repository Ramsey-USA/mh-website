#!/usr/bin/env node
/* eslint-disable no-console */

import { copyFile, mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");
const SOURCE_DIR = join(ROOT, "documents/generated-pdfs");
const DOWNLOADS_DIR = join(ROOT, "documents/downloads");

const SAFETY_MANUAL_FILES = [
  "safety-manual-complete.pdf",
  "safety-manual-digital.pdf",
  "safety-manual-reference.pdf",
  "safety-manual-cover.pdf",
  "safety-manual-spine.pdf",
  "safety-manual-tabs.pdf",
  "safety-manual-toc.pdf",
];

const EMPLOYEE_HANDBOOK_FILES = [
  "employee-handbook-complete.pdf",
  "employee-handbook-digital.pdf",
  "employee-handbook-cover.pdf",
  "employee-handbook-spine.pdf",
  "employee-handbook-tabs.pdf",
  "employee-handbook-toc.pdf",
];

const SHARED_FILES = ["MHC-company-letterhead.pdf", "website-image-needs.pdf"];
const FORM_SET_FILES = [
  "employee-handbook-forms-package.pdf",
  "safety-manual-forms-package.pdf",
];

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

function formatPathList(folderName, fileNames) {
  return fileNames
    .map(
      (fileName) =>
        `- [${folderName}/${fileName}](./${folderName}/${fileName})`,
    )
    .join("\n");
}

async function writeDownloadIndex(formFiles) {
  const content = `# Download Bundle\n\nThis folder is the download-friendly view of the generated PDFs.\n\n- [safety-manual/](./safety-manual/) - final Safety Manual PDFs for download\n- [employee-handbook/](./employee-handbook/) - final Employee Handbook PDFs for download\n- [shared/](./shared/) - common print assets like the company letterhead\n- [forms/](./forms/) - final form package PDFs for download\n\nExact download locations:\n\n## Safety Manual\n\n${formatPathList("safety-manual", SAFETY_MANUAL_FILES)}\n\n## Employee Handbook\n\n${formatPathList("employee-handbook", EMPLOYEE_HANDBOOK_FILES)}\n\n## Shared\n\n${formatPathList("shared", SHARED_FILES)}\n\n## Form Sets\n\n${formatPathList("forms", FORM_SET_FILES)}\n\n## Forms\n\n${formatPathList("forms", formFiles)}\n\nRefresh it with:\n\n\`\`\`bash\npnpm --filter @mhc/website run docs:bundle:downloads\n\`\`\`\n`;

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

  await copyFiles(
    SAFETY_MANUAL_FILES,
    SOURCE_DIR,
    join(DOWNLOADS_DIR, "safety-manual"),
  );
  await copyFiles(
    EMPLOYEE_HANDBOOK_FILES,
    SOURCE_DIR,
    join(DOWNLOADS_DIR, "employee-handbook"),
  );
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
      `Missing aggregate form-set PDFs in documents/generated-pdfs/form-packages/: ${missingFormSets.join(", ")}. Run docs:generate:forms first.`,
    );
  }
  await writeDownloadIndex(formFiles);

  console.log("✅  Download bundle written to: documents/downloads/");
}

await main();
