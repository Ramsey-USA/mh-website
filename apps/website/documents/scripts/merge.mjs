#!/usr/bin/env node
/* eslint-disable no-console, prefer-template */
/**
 * documents/scripts/merge.mjs
 *
 * Merges all individual safety manual PDFs into a single downloadable file.
 * Order: cover → TOC → tab dividers → sections 01–50.
 *
 * Usage:
 *   npm run docs:merge                       # merge from documents/output/
 *   node documents/scripts/merge.mjs         # same
 *
 * Input:  documents/output/ (cover, toc, tabs, sections/)
 * Output: documents/output/safety-manual-complete.pdf
 *
 * Requires: pdf-lib (devDependency)
 */

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { readFile, writeFile, readdir } from "fs/promises";
import { join, resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const OUTPUT_DIR = join(ROOT, "documents/output");
const SECTIONS = join(OUTPUT_DIR, "sections");
const FORM_PACKAGES_DIR = join(OUTPUT_DIR, "form-packages");
const FORMS_MANIFEST_PATH = join(ROOT, "documents/forms/forms-manifest.json");
const OUT_FILE = join(OUTPUT_DIR, "safety-manual-complete.pdf");
const OUT_FILE_DIGITAL = join(OUTPUT_DIR, "safety-manual-digital.pdf");
const PDF_METADATA_AUTHOR = "Matt Ramsey, Safety Officer";
const PDF_METADATA_CREATOR = "MH Construction Document Pipeline";
const PDF_METADATA_SUBJECT = "Accident · Injury · Safety · Health Program";

// ── CLI flags ─────────────────────────────────────────────────────────────
const noTabs = process.argv.includes("--no-tabs");
const noForms = process.argv.includes("--no-forms");

const FORMS_TOC_ROWS_FIRST_PAGE = 28;
const FORMS_TOC_ROWS_OTHER_PAGES = 34;

function normalizeSlug(value) {
  return String(value || "")
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-+|-+$/g, "");
}

function parseFormOrder(source) {
  const trimmed = String(source || "").trim();
  const mishMatch = /^(?:FORM\s+)?MISH\s*(\d{1,2})$/i.exec(trimmed);
  if (mishMatch) {
    return {
      num: Number.parseInt(mishMatch[1], 10),
      letter: "A",
    };
  }

  const idMatch = /^FORM\s+(\d+)-([A-Z])$/i.exec(trimmed);
  if (idMatch) {
    return {
      num: Number.parseInt(idMatch[1], 10),
      letter: idMatch[2].toUpperCase(),
    };
  }

  const fileMatch = /^form-mish-(\d{1,2})(?:-|$)/i.exec(trimmed);
  if (fileMatch) {
    return {
      num: Number.parseInt(fileMatch[1], 10),
      letter: "A",
    };
  }

  const legacyFileMatch = /^form-(\d+)-([a-z])(?:-|$)/i.exec(trimmed);
  if (legacyFileMatch) {
    return {
      num: Number.parseInt(legacyFileMatch[1], 10),
      letter: legacyFileMatch[2].toUpperCase(),
    };
  }

  return {
    num: Number.POSITIVE_INFINITY,
    letter: "ZZ",
  };
}

function fallbackFormIdFromFilename(fileName) {
  const mishMatch = /form-mish-(\d{1,2})/i.exec(fileName);
  if (mishMatch) {
    return `MISH ${String(Number.parseInt(mishMatch[1], 10)).padStart(2, "0")}`;
  }

  const match = /^form-(\d+)-([a-z])(?:-|$)/i.exec(fileName);
  if (match) {
    return `FORM ${match[1]}-${match[2].toUpperCase()}`;
  }

  return fileName.replace(/\.pdf$/i, "").toUpperCase();
}

function fallbackFormTitleFromFilename(fileName) {
  const base = fileName.replace(/\.pdf$/i, "");
  const trimmed = base
    .replace(/^form-mish-\d+-/i, "")
    .replace(/^form-\d+-[a-z]-/i, "");
  return trimmed
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function normalizeManualSection(manualSection) {
  if (Array.isArray(manualSection) && manualSection.length > 0) {
    return manualSection.join(", ");
  }
  if (typeof manualSection === "string" && manualSection.trim()) {
    return manualSection.trim();
  }
  return "";
}

async function loadFormManifestIndex() {
  if (!existsSync(FORMS_MANIFEST_PATH)) {
    return new Map();
  }

  const bytes = await readFile(FORMS_MANIFEST_PATH, "utf-8");
  const manifest = JSON.parse(bytes);
  const forms = Array.isArray(manifest?.forms) ? manifest.forms : [];

  const index = new Map();
  for (const form of forms) {
    const slug = normalizeSlug(form?.slug || form?.id || "");
    if (!slug) continue;

    index.set(slug, {
      id: form?.id || null,
      title: form?.title || null,
      manualSection: normalizeManualSection(form?.manualSection),
      order: parseFormOrder(form?.id || ""),
    });
  }

  return index;
}

function paginateFormEntries(entries) {
  const pages = [];
  let cursor = 0;
  while (cursor < entries.length) {
    const rowCap =
      pages.length === 0
        ? FORMS_TOC_ROWS_FIRST_PAGE
        : FORMS_TOC_ROWS_OTHER_PAGES;
    pages.push(entries.slice(cursor, cursor + rowCap));
    cursor += rowCap;
  }
  return pages.length > 0 ? pages : [[]];
}

async function buildFormsTocPdf(entries) {
  const doc = await PDFDocument.create();
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);

  const pageWidth = 612;
  const pageHeight = 792;
  const marginX = 54;
  const titleY = 742;
  const subtitleY = 724;
  const tableTopY = 690;
  const rowHeight = 18;
  const colIdX = marginX;
  const colTitleX = 128;
  const colMishX = 404;
  const colPageX = 544;

  const pages = paginateFormEntries(entries);
  const totalPages = pages.length;

  function drawHeader(page, pageIndex) {
    page.drawText("FORMS APPENDIX TABLE OF CONTENTS", {
      x: marginX,
      y: titleY,
      size: 14,
      font: fontBold,
      color: rgb(0.08, 0.13, 0.2),
    });
    page.drawText("MH Construction Industrial Safety and Health Program", {
      x: marginX,
      y: subtitleY,
      size: 9,
      font: fontRegular,
      color: rgb(0.28, 0.33, 0.4),
    });

    page.drawLine({
      start: { x: marginX, y: tableTopY + 6 },
      end: { x: pageWidth - marginX, y: tableTopY + 6 },
      thickness: 1,
      color: rgb(0.75, 0.79, 0.84),
    });

    page.drawText("FORM ID", {
      x: colIdX,
      y: tableTopY,
      size: 9,
      font: fontBold,
      color: rgb(0.08, 0.13, 0.2),
    });
    page.drawText("TITLE", {
      x: colTitleX,
      y: tableTopY,
      size: 9,
      font: fontBold,
      color: rgb(0.08, 0.13, 0.2),
    });
    page.drawText("MISH REF", {
      x: colMishX,
      y: tableTopY,
      size: 9,
      font: fontBold,
      color: rgb(0.08, 0.13, 0.2),
    });
    page.drawText("PAGE", {
      x: colPageX,
      y: tableTopY,
      size: 9,
      font: fontBold,
      color: rgb(0.08, 0.13, 0.2),
    });

    page.drawText(`Page ${pageIndex + 1} of ${totalPages}`, {
      x: pageWidth - marginX - 70,
      y: 34,
      size: 8,
      font: fontRegular,
      color: rgb(0.45, 0.49, 0.55),
    });
  }

  function fit(text, maxChars) {
    const raw = String(text || "").trim();
    if (raw.length <= maxChars) return raw;
    return `${raw.slice(0, maxChars - 1).trimEnd()}…`;
  }

  pages.forEach((entriesOnPage, pageIndex) => {
    const page = doc.addPage([pageWidth, pageHeight]);
    drawHeader(page, pageIndex);

    let y = tableTopY - 20;
    for (const entry of entriesOnPage) {
      page.drawText(fit(entry.id, 14), {
        x: colIdX,
        y,
        size: 8.75,
        font: fontRegular,
        color: rgb(0.13, 0.16, 0.22),
      });
      page.drawText(fit(entry.title, 48), {
        x: colTitleX,
        y,
        size: 8.75,
        font: fontRegular,
        color: rgb(0.13, 0.16, 0.22),
      });
      page.drawText(fit(entry.manualSection, 18), {
        x: colMishX,
        y,
        size: 8.5,
        font: fontRegular,
        color: rgb(0.2, 0.24, 0.3),
      });

      const pageLabel = String(entry.pageStart);
      const textWidth = fontRegular.widthOfTextAtSize(pageLabel, 8.75);
      page.drawText(pageLabel, {
        x: colPageX + 24 - textWidth,
        y,
        size: 8.75,
        font: fontRegular,
        color: rgb(0.13, 0.16, 0.22),
      });

      y -= rowHeight;
    }
  });

  return doc.save();
}

async function getFormPackages() {
  if (!existsSync(FORM_PACKAGES_DIR)) {
    return [];
  }

  const files = await readdir(FORM_PACKAGES_DIR);
  const pdfFiles = files.filter((f) => f.endsWith(".pdf"));
  const manifestIndex = await loadFormManifestIndex();

  const packages = [];
  for (const file of pdfFiles) {
    const absPath = join(FORM_PACKAGES_DIR, file);
    const bytes = await readFile(absPath);
    const doc = await PDFDocument.load(bytes);

    const slug = normalizeSlug(file.replace(/\.pdf$/i, ""));
    const manifestMeta = manifestIndex.get(slug);
    const id = manifestMeta?.id || fallbackFormIdFromFilename(file);
    const title = manifestMeta?.title || fallbackFormTitleFromFilename(file);

    packages.push({
      file,
      bytes,
      pageCount: doc.getPageCount(),
      id,
      title,
      manualSection: manifestMeta?.manualSection || "",
      order: manifestMeta?.order || parseFormOrder(file),
    });
  }

  packages.sort((a, b) => {
    if (a.order.num !== b.order.num) return a.order.num - b.order.num;
    if (a.order.letter !== b.order.letter) {
      return a.order.letter.localeCompare(b.order.letter);
    }
    return a.file.localeCompare(b.file);
  });

  return packages;
}

/**
 * Merge safety manual PDFs into a single downloadable file.
 * @param {object} opts
 * @param {boolean} opts.includeTabs  Whether to include tab divider pages
 * @param {boolean} opts.includeForms Whether to include forms appendix and forms TOC
 * @param {string}  opts.outFile      Absolute path for the output PDF
 * @param {string}  opts.title        Document metadata title
 */
async function merge({ includeTabs, includeForms, outFile, title }) {
  console.log(
    `📦 MH Construction — Safety Manual Merge${includeTabs ? "" : " (Digital — no tabs)"}`,
  );
  console.log("==========================================\n");

  // ── Validate required inputs exist ──────────────────────────────────────
  const coverPath = join(OUTPUT_DIR, "safety-manual-cover.pdf");
  const tocPath = join(OUTPUT_DIR, "safety-manual-toc.pdf");
  const tabsPath = join(OUTPUT_DIR, "safety-manual-tabs.pdf");

  if (!existsSync(coverPath)) {
    console.error(
      "❌  Cover PDF not found. Run `npm run docs:generate` first.",
    );
    process.exit(1);
  }
  if (!existsSync(tocPath)) {
    console.error("❌  TOC PDF not found. Run `npm run docs:generate` first.");
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
  if (includeForms && !existsSync(FORM_PACKAGES_DIR)) {
    console.error(
      "❌  Form packages directory not found. Run `npm run docs:generate:forms` first.",
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
  console.log(`  TOC:      safety-manual-toc.pdf`);
  if (includeTabs) {
    console.log(`  Tabs:     safety-manual-tabs.pdf`);
  }
  if (includeForms) {
    console.log(`  Forms:    form-packages/*.pdf (with appendix TOC)`);
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
  async function appendPdfBytes(label, bytes) {
    const srcDoc = await PDFDocument.load(bytes);
    const pages = await merged.copyPages(srcDoc, srcDoc.getPageIndices());
    for (const page of pages) {
      merged.addPage(page);
    }
    console.log(
      `  ✓  ${label} (${pages.length} page${pages.length !== 1 ? "s" : ""})`,
    );
    return pages.length;
  }

  async function appendPdf(label, path) {
    const bytes = await readFile(path);
    return appendPdfBytes(label, bytes);
  }

  // 1. Cover page
  await appendPdf("Cover", coverPath);

  // 2. Table of contents
  await appendPdf("Table of Contents", tocPath);

  // 3. Tab dividers (skip for digital/no-tabs variant)
  if (includeTabs) {
    await appendPdf("Tab Dividers", tabsPath);
  }

  // 4. All section PDFs in order (01–50)
  for (const file of sectionFiles) {
    const num = file.split("-")[0];
    await appendPdf(`Section ${num}`, join(SECTIONS, file));
  }

  // 5. Forms appendix with dedicated TOC page(s)
  if (includeForms) {
    const formPackages = await getFormPackages();
    if (formPackages.length === 0) {
      console.error(
        "❌  No form packages found in documents/output/form-packages/. Run `npm run docs:generate:forms` first.",
      );
      process.exit(1);
    }

    const unmapped = formPackages.filter((pkg) => !pkg.manualSection);
    if (unmapped.length > 0) {
      console.error(
        "❌  Forms appendix requires MISH mapping for every form package.",
      );
      for (const pkg of unmapped) {
        console.error(
          `    - ${pkg.id} (${pkg.file}) is missing manualSection in documents/forms/forms-manifest.json`,
        );
      }
      process.exit(1);
    }

    console.log(
      `  ✓  Forms mapped to MISH sections: ${formPackages.length}/${formPackages.length}`,
    );

    const formsTocPages = paginateFormEntries(formPackages).length;
    let nextFormPage = merged.getPageCount() + formsTocPages + 1;

    const tocEntries = formPackages.map((pkg) => {
      const entry = {
        id: pkg.id,
        title: pkg.title,
        manualSection: pkg.manualSection,
        pageStart: nextFormPage,
      };
      nextFormPage += pkg.pageCount;
      return entry;
    });

    const formsTocBytes = await buildFormsTocPdf(tocEntries);
    await appendPdfBytes("Forms Appendix TOC", formsTocBytes);

    for (const pkg of formPackages) {
      await appendPdfBytes(`${pkg.id} — ${pkg.title}`, pkg.bytes);
    }
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
    // Digital variant: cover + TOC + sections (+ forms unless --no-forms)
    await merge({
      includeTabs: false,
      includeForms: !noForms,
      outFile: OUT_FILE_DIGITAL,
      title: "MH Construction Safety Manual — Digital",
    });
  } else {
    // Default: complete binder version (cover + TOC + tabs + sections + forms)
    await merge({
      includeTabs: true,
      includeForms: !noForms,
      outFile: OUT_FILE,
      title: "MH Construction Safety Manual — Complete",
    });
  }
}

main().catch((err) => {
  console.error("\n❌ Fatal error:", err);
  process.exit(1);
});
