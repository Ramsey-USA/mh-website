#!/usr/bin/env node
/* eslint-disable no-console */

import { readdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, resolve, dirname, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const DOCS_DIR = join(ROOT, "documents");
const SOURCE_DIR = join(DOCS_DIR, "forms/MHC-MISH-47-Forms");
const APP_MANIFEST = join(DOCS_DIR, "forms/forms-manifest.json");
const ROOT_MANIFEST = join(ROOT, "documents/forms/forms-manifest.json");

const TITLE_ACRONYMS = new Set([
  "cfr",
  "co",
  "coi",
  "jha",
  "jsa",
  "mish",
  "mvr",
  "osha",
  "ppe",
  "roa",
  "roi",
  "sds",
  "wa",
  "wac",
]);

function normalizeTitle(fileName) {
  const base = basename(fileName, extname(fileName));
  const trimmed = base.replace(/^FORM-MISH-\d+-/i, "");
  return trimmed
    .split("-")
    .filter(Boolean)
    .map((word) => {
      const lower = word.toLowerCase();
      if (TITLE_ACRONYMS.has(lower)) return lower.toUpperCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ")
    .replace(/\bAnd\b/g, "and")
    .replace(/\bOf\b/g, "of")
    .replace(/\bTo\b/g, "to")
    .replace(/\bIn\b/g, "in")
    .replace(/\bFor\b/g, "for")
    .replace(/\bOn\b/g, "on");
}

function buildSlug(fileName) {
  return basename(fileName, extname(fileName))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildId(number) {
  return `MISH ${String(number).padStart(2, "0")}`;
}

function buildManualSection(number) {
  return [buildId(number)];
}

function parseNumber(fileName) {
  const match = /^FORM-MISH-(\d{1,2})-/i.exec(basename(fileName));
  if (!match) return null;
  return Number.parseInt(match[1], 10);
}

async function listDocxFiles(dirPath) {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listDocxFiles(fullPath)));
      continue;
    }
    if (entry.isFile() && extname(entry.name).toLowerCase() === ".docx") {
      files.push(fullPath);
    }
  }
  return files;
}

async function main() {
  if (!existsSync(SOURCE_DIR)) {
    throw new Error(`Source folder not found: ${SOURCE_DIR}`);
  }

  const files = (await listDocxFiles(SOURCE_DIR))
    .map((filePath) => ({ filePath, fileName: basename(filePath) }))
    .map((entry) => ({ ...entry, number: parseNumber(entry.fileName) }))
    .filter((entry) => Number.isInteger(entry.number))
    .sort(
      (a, b) => a.number - b.number || a.fileName.localeCompare(b.fileName),
    );

  if (files.length === 0) {
    throw new Error(
      `No DOCX files matched FORM-MISH-## naming under ${SOURCE_DIR}`,
    );
  }

  const forms = files.map(({ fileName, number }) => ({
    id: buildId(number),
    slug: buildSlug(fileName),
    title: normalizeTitle(fileName),
    category: "MHC-cat2-safety",
    categoryLabel: "Safety Forms",
    categoryIcon: "🛡",
    manualSection: buildManualSection(number),
    docxPath: `MHC-MISH-47-Forms/${fileName}`,
    revision: "1.0",
    effectiveDate: "June 2026",
    owner: "Safety Officer (Matt Ramsey)",
  }));

  const manifest = {
    brand: "mhc",
    generatedAt: new Date().toISOString(),
    notes:
      "DOCX-backed safety forms manifest used by generate.mjs and merge.mjs. Keep ids aligned with the uploaded MISH form source files.",
    forms,
  };

  const json = `${JSON.stringify(manifest, null, 2)}\n`;
  await writeFile(APP_MANIFEST, json, "utf8");
  if (ROOT_MANIFEST !== APP_MANIFEST) {
    await writeFile(ROOT_MANIFEST, json, "utf8");
  }

  console.log(`Wrote ${forms.length} forms to:`);
  console.log(`  ${APP_MANIFEST}`);
  if (ROOT_MANIFEST !== APP_MANIFEST) {
    console.log(`  ${ROOT_MANIFEST}`);
  }
}

main().catch((err) => {
  console.error(err?.message || err);
  process.exit(1);
});
