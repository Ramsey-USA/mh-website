#!/usr/bin/env node
/* eslint-disable no-console, prefer-template */
/**
 * documents/scripts/extract-word.mjs
 *
 * Extracts section text from DOCX files under documents/content/safety-manual-word/
 * and writes a structured manifest to documents/content/safety-manual.json.
 *
 * Usage:
 *   npm run docs:extract-word
 *   node documents/scripts/extract-word.mjs
 *   node documents/scripts/extract-word.mjs --input documents/content/safety-manual-word
 */

import { readdir, writeFile } from "fs/promises";
import { readFileSync } from "fs";
import { join, resolve, dirname, extname, basename } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const DEFAULT_INPUT_DIR = join(
  ROOT,
  "documents/content/safety-manual-word/2026-MHC-MISH-Safety-Program-v3-Word-Docs",
);
const OUTPUT = join(ROOT, "documents/content/safety-manual.json");

const args = process.argv.slice(2);
const getArg = (flag) => {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : null;
};

const INPUT_DIR = getArg("--input")
  ? resolve(ROOT, getArg("--input"))
  : DEFAULT_INPUT_DIR;

function normalizeWhitespace(text) {
  return text.replace(/\s+/g, " ").trim();
}

function buildSummary(text, maxChars = 380) {
  const clean = normalizeWhitespace(text);
  const sentences = clean.match(/[^.!?]*[.!?]+/g) || [];
  let summary = "";
  for (const s of sentences) {
    if ((summary + s).length > maxChars) break;
    summary += s + " ";
  }
  if (summary.trim()) return summary.trim();
  if (!clean) return "";
  return clean.length > maxChars ? clean.slice(0, maxChars) + "…" : clean;
}

function buildSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseSectionFromFilename(filename) {
  const name = basename(filename, extname(filename));
  const match = name.match(/MISH[-_](\d{1,2})(?:[-_](.*))?$/i);
  if (!match) return null;

  const number = parseInt(match[1], 10);
  const numberStr = String(number).padStart(2, "0");
  const rawTitle = (match[2] || "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const title = rawTitle || `Section ${numberStr}`;

  return {
    number,
    numberStr,
    key: `MISH_${numberStr}`,
    title,
  };
}

async function listDocxFilesRecursive(dirPath) {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listDocxFilesRecursive(fullPath)));
      continue;
    }

    if (entry.isFile() && extname(entry.name).toLowerCase() === ".docx") {
      files.push(fullPath);
    }
  }

  return files;
}

async function extractDocxText(filePath) {
  const mammoth = await import("mammoth");
  const result = await mammoth.extractRawText({
    buffer: readFileSync(filePath),
  });
  return normalizeWhitespace(result.value || "");
}

async function main() {
  console.log("📄 MH Construction — Safety Manual DOCX Extractor");
  console.log("=================================================");
  console.log(`Input:  ${INPUT_DIR}`);
  console.log(`Output: ${OUTPUT}\n`);

  const allDocx = await listDocxFilesRecursive(INPUT_DIR);
  if (allDocx.length === 0) {
    throw new Error(`No DOCX files found under: ${INPUT_DIR}`);
  }

  const parsed = allDocx
    .map((filePath) => ({ filePath, meta: parseSectionFromFilename(filePath) }))
    .filter((item) => item.meta)
    .sort((a, b) => a.meta.number - b.meta.number);

  if (parsed.length === 0) {
    throw new Error(
      "No section files matched expected MISH-## naming. Example: MISH-01_Section-Title.docx",
    );
  }

  console.log(
    `Found ${allDocx.length} DOCX files (${parsed.length} matched section naming).\n`,
  );

  const sections = [];

  for (const { filePath, meta } of parsed) {
    process.stdout.write(`  [${meta.numberStr}] ${meta.title.padEnd(55)} `);

    try {
      const text = await extractDocxText(filePath);
      const wordCount = text.split(/\s+/).filter(Boolean).length;
      const summary = buildSummary(text);

      sections.push({
        id: `section-${meta.numberStr}`,
        number: meta.number,
        numberStr: meta.numberStr,
        key: meta.key,
        title: meta.title,
        slug: buildSlug(meta.title),
        filename: basename(filePath),
        pages: 0,
        wordCount,
        summary,
        body: text,
      });

      console.log(`✓  (${wordCount} words)`);
    } catch (err) {
      console.log(`✗  ERROR: ${err.message}`);
      sections.push({
        id: `section-${meta.numberStr}`,
        number: meta.number,
        numberStr: meta.numberStr,
        key: meta.key,
        title: meta.title,
        slug: buildSlug(meta.title),
        filename: basename(filePath),
        pages: 0,
        wordCount: 0,
        summary: "Content extraction failed. See source DOCX.",
        body: "",
        error: err.message,
      });
    }
  }

  const manifest = {
    document: {
      id: "safety-manual",
      title: "Safety Manual",
      subtitle: "MISH Safety Program",
      revisionYear: 2026,
      revisionDate: "2026-01-01",
      company: "MH Construction, Inc.",
      address: "3111 N. Capitol Ave., Pasco, WA 99301",
      phone: "(509) 308-6489",
      website: "https://www.mhc-gc.com",
      licenses: {
        WA: "MHCONCI907R7",
        OR: "194331",
        ID: "RCE-49250",
      },
      totalSections: sections.length,
      totalPages: 0,
      extractedAt: new Date().toISOString(),
      source: "docx",
      sourceRoot: INPUT_DIR,
    },
    sections,
  };

  await writeFile(OUTPUT, JSON.stringify(manifest, null, 2), "utf-8");

  console.log(`\n✅ Extraction complete.`);
  console.log(`   ${sections.length} sections`);
  console.log(`   Output → ${OUTPUT}`);
}

main().catch((err) => {
  if (err.message.includes("Cannot find package 'mammoth'")) {
    console.error("\n❌ Missing optional dependency: mammoth");
    console.error("   Install with: npm install mammoth");
  }
  console.error("\n❌ Fatal error:", err.message || err);
  process.exit(1);
});
