#!/usr/bin/env node
/* eslint-disable no-console, prefer-template */
/**
 * documents/scripts/merge.mjs
 *
 * Merges all individual safety manual PDFs into a single downloadable file.
 * Order: cover → tab dividers → sections 00–44.
 *
 * Usage:
 *   npm run docs:merge                       # merge from documents/output/
 *   node documents/scripts/merge.mjs         # same
 *
 * Input:  documents/output/ (cover, tabs, sections/)
 * Output: documents/output/safety-manual-complete.pdf
 *
 * Requires: pdf-lib (devDependency)
 */

import { PDFDocument } from "pdf-lib";
import { readFile, writeFile, readdir } from "fs/promises";
import { join, resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const OUTPUT_DIR = join(ROOT, "documents/output");
const SECTIONS = join(OUTPUT_DIR, "sections");
const OUT_FILE = join(OUTPUT_DIR, "safety-manual-complete.pdf");
const OUT_FILE_DIGITAL = join(OUTPUT_DIR, "safety-manual-digital.pdf");
const PDF_METADATA_AUTHOR = "Matt Ramsey, Editor-in-Chief";
const PDF_METADATA_CREATOR = "MH Construction Document Pipeline";
const PDF_METADATA_SUBJECT = "Accident · Injury · Safety · Health Program";

// ── CLI flags ─────────────────────────────────────────────────────────────
const noTabs = process.argv.includes("--no-tabs");

/**
 * Merge safety manual PDFs into a single downloadable file.
 * @param {object} opts
 * @param {boolean} opts.includeTabs  Whether to include tab divider pages
 * @param {string}  opts.outFile      Absolute path for the output PDF
 * @param {string}  opts.title        Document metadata title
 */
async function merge({ includeTabs, outFile, title }) {
  console.log(
    `📦 MH Construction — Safety Manual Merge${includeTabs ? "" : " (Digital — no tabs)"}`,
  );
  console.log("==========================================\n");

  // ── Validate required inputs exist ──────────────────────────────────────
  const coverPath = join(OUTPUT_DIR, "safety-manual-cover.pdf");
  const tabsPath = join(OUTPUT_DIR, "safety-manual-tabs.pdf");

  if (!existsSync(coverPath)) {
    console.error(
      "❌  Cover PDF not found. Run `npm run docs:generate` first.",
    );
    process.exit(1);
  }
  if (includeTabs && !existsSync(tabsPath)) {
    console.error("❌  Tabs PDF not found. Run `npm run docs:generate` first.");
    process.exit(1);
  }
  if (!existsSync(SECTIONS)) {
    console.error(
      "❌  Sections directory not found. Run `npm run docs:generate` first.",
    );
    process.exit(1);
  }

  // ── Discover section PDFs in numeric order ──────────────────────────────
  const files = await readdir(SECTIONS);
  const sectionFiles = files
    .filter((f) => f.endsWith(".pdf"))
    .sort((a, b) => {
      const numA = parseInt(a.split("-")[0], 10);
      const numB = parseInt(b.split("-")[0], 10);
      return numA - numB;
    });

  if (sectionFiles.length === 0) {
    console.error("❌  No section PDFs found in documents/output/sections/.");
    process.exit(1);
  }

  console.log(`  Cover:    safety-manual-cover.pdf`);
  if (includeTabs) {
    console.log(`  Tabs:     safety-manual-tabs.pdf`);
  }
  console.log(
    `  Sections: ${sectionFiles.length} PDFs (${sectionFiles[0]} … ${sectionFiles.at(-1)})\n`,
  );

  // ── Create merged document ──────────────────────────────────────────────
  const merged = await PDFDocument.create();

  // Set document metadata
  merged.setTitle(title);
  merged.setSubject(PDF_METADATA_SUBJECT);
  merged.setAuthor(PDF_METADATA_AUTHOR);
  merged.setCreator(PDF_METADATA_CREATOR);
  merged.setProducer("pdf-lib");

  /**
   * Append all pages from a source PDF into the merged document.
   * @param {string} label  Display label for console output
   * @param {string} path   Absolute path to the source PDF
   */
  async function appendPdf(label, path) {
    const bytes = await readFile(path);
    const srcDoc = await PDFDocument.load(bytes);
    const pages = await merged.copyPages(srcDoc, srcDoc.getPageIndices());
    for (const page of pages) {
      merged.addPage(page);
    }
    console.log(
      `  ✓  ${label} (${pages.length} page${pages.length !== 1 ? "s" : ""})`,
    );
  }

  // 1. Cover page
  await appendPdf("Cover", coverPath);

  // 2. Tab dividers (skip for digital/no-tabs variant)
  if (includeTabs) {
    await appendPdf("Tab Dividers", tabsPath);
  }

  // 3. All section PDFs in order (00–44)
  for (const file of sectionFiles) {
    const num = file.split("-")[0];
    await appendPdf(`Section ${num}`, join(SECTIONS, file));
  }

  // ── Write merged PDF ───────────────────────────────────────────────────
  const mergedBytes = await merged.save();
  await writeFile(outFile, mergedBytes);

  const sizeMB = (mergedBytes.length / (1024 * 1024)).toFixed(1);
  const totalPages = merged.getPageCount();
  const rel = outFile.replace(ROOT + "/", "");

  console.log(`\n✅  Merged PDF: ${rel}`);
  console.log(`    ${totalPages} pages · ${sizeMB} MB`);
}

async function main() {
  if (noTabs) {
    // Digital variant: cover + sections only (no tabs, no spine)
    await merge({
      includeTabs: false,
      outFile: OUT_FILE_DIGITAL,
      title: "MH Construction Safety Manual — Digital",
    });
  } else {
    // Default: complete binder version (cover + tabs + sections)
    await merge({
      includeTabs: true,
      outFile: OUT_FILE,
      title: "MH Construction Safety Manual — Complete",
    });
  }
}

main().catch((err) => {
  console.error("\n❌ Fatal error:", err);
  process.exit(1);
});
