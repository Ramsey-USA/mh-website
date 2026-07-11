#!/usr/bin/env node

/**
 * QR Code Download Bundle Builder
 *
 * Mirrors the generated QR code PNGs into a download-friendly folder with
 * the same category structure so the assets are easier to browse and
 * download from the repository.
 */

const fs = require("node:fs");
const {
  copyFileSync,
  mkdirSync,
  readdirSync,
  rmSync,
  writeFileSync,
} = require("node:fs");
const path = require("node:path");

const ROOT = path.join(__dirname, "../../..");
const SOURCE_DIR = path.join(ROOT, "apps/website/public/images/qr-codes");
const DOWNLOAD_DIR = path.join(ROOT, "apps/website/public/images/qr-downloads");
const MANIFEST_PATH = path.join(SOURCE_DIR, "qr-codes-manifest.json");

function readManifest() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    throw new Error(
      `Missing QR manifest: ${MANIFEST_PATH}. Run qr:generate before building the download bundle.`,
    );
  }

  return JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
}

function removePngFiles(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return;
  }

  const entries = readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      removePngFiles(fullPath);
      continue;
    }

    if (entry.isFile() && entry.name.toLowerCase().endsWith(".png")) {
      rmSync(fullPath);
    }
  }
}

function copyPng(relativePath) {
  const sourcePath = path.join(SOURCE_DIR, relativePath);
  const targetPath = path.join(DOWNLOAD_DIR, relativePath);

  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Missing source QR image: ${sourcePath}`);
  }

  mkdirSync(path.dirname(targetPath), { recursive: true });
  copyFileSync(sourcePath, targetPath);
  console.log(`  ✓  ${targetPath.replace(`${ROOT}/`, "")}`);
}

function buildReadme(manifest) {
  const folderCounts = new Map();
  const uniqueNames = new Set();

  for (const qr of manifest.qrCodes || []) {
    const folder = qr.folder || "core";
    folderCounts.set(folder, (folderCounts.get(folder) || 0) + 1);
    if (qr.name) {
      uniqueNames.add(qr.name);
    }
  }

  const folderLines = [...folderCounts.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(
      ([folder, count]) =>
        `- [${folder}/](./${folder}/) - ${count} PNG${count === 1 ? "" : "s"}`,
    )
    .join("\n");

  return `# QR Code Downloads\n\nThis folder is the download-friendly mirror of the generated QR code assets.\n\n- **Total PNGs:** ${(manifest.qrCodes || []).length}\n- **Unique QR names:** ${uniqueNames.size}\n- **Source:** [../qr-codes/](../qr-codes/)\n\nBrowse the mirrored folders below:\n\n${folderLines}\n\nRefresh it with:\n\n\`\`\`bash\npnpm --filter @mhc/website run qr:bundle:downloads\n\`\`\`\n`;
}

function main() {
  const manifest = readManifest();

  console.log("📦 Building QR download bundle…");
  removePngFiles(DOWNLOAD_DIR);

  for (const qr of manifest.qrCodes || []) {
    if (!qr.relativePath) {
      continue;
    }

    copyPng(qr.relativePath);
  }

  mkdirSync(DOWNLOAD_DIR, { recursive: true });
  writeFileSync(path.join(DOWNLOAD_DIR, "README.md"), buildReadme(manifest));

  console.log("✅  QR download bundle written to: public/images/qr-downloads/");
}

main();
