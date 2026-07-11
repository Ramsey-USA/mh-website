#!/usr/bin/env node
/* eslint-disable no-console, prefer-template */
/**
 * documents/scripts/merge.mjs
 *
 * Merges all individual safety manual PDFs into a single downloadable file.
 * Order: cover → TOC → tab dividers → sections 01–50.
 *
 * Usage:
 *   npm run docs:merge                       # merge from documents/generated-pdfs/
 *   node documents/scripts/merge.mjs         # same
 *
 * Input:  documents/generated-pdfs/ (cover, toc, tabs, sections/)
 * Output: documents/generated-pdfs/safety-manual-complete.pdf
 *
 * Requires: pdf-lib (devDependency)
 */

import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { readFile, writeFile, readdir } from "fs/promises";
import { join, resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const OUTPUT_DIR = join(ROOT, "documents/generated-pdfs");
const SECTIONS = join(OUTPUT_DIR, "sections");
const FORM_PACKAGES_DIR = join(OUTPUT_DIR, "form-packages");
const FORMS_MANIFEST_PATH = join(ROOT, "documents/forms/forms-manifest.json");

// ── CLI flags ─────────────────────────────────────────────────────────────
const manualIndex = process.argv.indexOf("--manual");
const manualArg =
  manualIndex !== -1 && manualIndex + 1 < process.argv.length
    ? process.argv[manualIndex + 1]
    : process.argv.find((arg) => arg.startsWith("--manual="))?.split("=")[1] ||
      "safety";
const isEmployeeHandbook =
  manualArg === "employee" ||
  manualArg === "employee-handbook" ||
  manualArg === "handbook";
const noTabs = process.argv.includes("--no-tabs");
const noForms = process.argv.includes("--no-forms");

const MANUAL_LABEL = isEmployeeHandbook ? "Employee Handbook" : "Safety Manual";
const COVER_FILE = isEmployeeHandbook
  ? "employee-handbook-cover.pdf"
  : "safety-manual-cover.pdf";
const TOC_FILE = isEmployeeHandbook
  ? "employee-handbook-toc.pdf"
  : "safety-manual-toc.pdf";
const TABS_FILE = isEmployeeHandbook
  ? "employee-handbook-tabs.pdf"
  : "safety-manual-tabs.pdf";
const OUT_FILE = isEmployeeHandbook
  ? join(OUTPUT_DIR, "employee-handbook-complete.pdf")
  : join(OUTPUT_DIR, "safety-manual-complete.pdf");
const OUT_FILE_DIGITAL = isEmployeeHandbook
  ? join(OUTPUT_DIR, "employee-handbook-digital.pdf")
  : join(OUTPUT_DIR, "safety-manual-digital.pdf");
const PDF_METADATA_AUTHOR = isEmployeeHandbook
  ? "MH Construction Human Resources"
  : "Matt Ramsey, Safety Officer";
const PDF_METADATA_CREATOR = "MH Construction Document Pipeline";
const PDF_METADATA_SUBJECT = isEmployeeHandbook
  ? "Employee Handbook · Policies · Procedures"
  : "Accident · Injury · Safety · Health Program";

const FORMS_TOC_ROWS_FIRST_PAGE = 28;
const FORMS_TOC_ROWS_OTHER_PAGES = 34;
const MENDL_DUSK_FONT_FILES = Object.freeze({
  bold: [
    "Mendl Fonts/fonnts.com-Mendl_Sans_Dusk_Bold.otf",
    "Mendl Fonts/fonnts.com-Mendl_Sans_Dusk_SemiBold.otf",
  ],
});
const MENDL_BODY_FONT_FILES = Object.freeze({
  regular: ["Mendl Fonts/fonnts.com-Mendl_Sans_Dusk_Regular.otf"],
});

function resolvePdfFontPath(fileName) {
  const candidates = [
    resolve(ROOT, `public/fonts/${fileName}`),
    resolve(ROOT, `apps/website/public/fonts/${fileName}`),
    resolve(ROOT, `../website/public/fonts/${fileName}`),
    resolve(ROOT, `../../apps/website/public/fonts/${fileName}`),
  ];
  return candidates.find((candidate) => existsSync(candidate)) || null;
}

function resolveFirstPdfFontPath(fileNames) {
  for (const fileName of fileNames) {
    const path = resolvePdfFontPath(fileName);
    if (path) {
      return path;
    }
  }
  return null;
}

async function embedMendlMergeFont(pdfDoc, { bold = false } = {}) {
  const fontPath = bold
    ? resolveFirstPdfFontPath(MENDL_DUSK_FONT_FILES.bold)
    : resolveFirstPdfFontPath(MENDL_BODY_FONT_FILES.regular);

  if (!fontPath) {
    throw new Error(
      `Unable to locate ${bold ? "Mendl heading" : "Mendl body"} font for merge output.`,
    );
  }

  pdfDoc.registerFontkit(fontkit);
  const fontBytes = await readFile(fontPath);
  return pdfDoc.embedFont(fontBytes, { subset: true });
}

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
  const fontRegular = await embedMendlMergeFont(doc);
  const fontBold = await embedMendlMergeFont(doc, { bold: true });

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
    `📦 MH Construction — ${MANUAL_LABEL} Merge${includeTabs ? "" : " (Digital — no tabs)"}`,
  );
  console.log("==========================================\n");

  // ── Validate required inputs exist ──────────────────────────────────────
  const coverPath = join(OUTPUT_DIR, COVER_FILE);
  const tocPath = join(OUTPUT_DIR, TOC_FILE);
  const tabsPath = join(OUTPUT_DIR, TABS_FILE);

  if (!existsSync(coverPath)) {
    console.error(
      `❌  Cover PDF not found: ${COVER_FILE}. Run \`npm run docs:generate\` first.`,
    );
    process.exit(1);
  }
  if (!existsSync(tocPath)) {
    console.error(
      `❌  TOC PDF not found. Run \`npm run docs:generate\` first.`,
    );
    process.exit(1);
  }
  if (includeTabs && !existsSync(tabsPath)) {
    console.error(
      `❌  Tabs PDF not found. Run \`npm run docs:generate\` first.`,
    );
    process.exit(1);
  }
  if (!isEmployeeHandbook && !existsSync(SECTIONS)) {
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
  let sectionFiles = [];
  if (!isEmployeeHandbook) {
    const files = await readdir(SECTIONS);
    sectionFiles = files
      .filter((f) => f.endsWith(".pdf"))
      .sort((a, b) => {
        const numA = parseInt(a.split("-")[0], 10);
        const numB = parseInt(b.split("-")[0], 10);
        return numA - numB;
      });

    if (sectionFiles.length === 0) {
      console.error(
        "❌  No section PDFs found in documents/generated-pdfs/sections/.",
      );
      process.exit(1);
    }
  }

  console.log(`  Cover:    ${COVER_FILE}`);
  console.log(`  TOC:      ${TOC_FILE}`);
  if (includeTabs) {
    console.log(`  Tabs:     ${TABS_FILE}`);
  }
  if (includeForms) {
    console.log(`  Forms:    form-packages/*.pdf (with appendix TOC)`);
  }
  if (sectionFiles.length > 0) {
    console.log(
      `  Sections: ${sectionFiles.length} PDFs (${sectionFiles[0]} … ${sectionFiles.at(-1)})`,
    );
  }
  console.log("");

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

  // 4. All section PDFs in order (01–50) — MISH only
  if (!isEmployeeHandbook) {
    for (const file of sectionFiles) {
      const num = file.split("-")[0];
      await appendPdf(`Section ${num}`, join(SECTIONS, file));
    }
  }

  // 5. Forms appendix with dedicated TOC page(s)
  if (includeForms) {
    const formPackages = await getFormPackages();
    if (formPackages.length === 0) {
      if (!isEmployeeHandbook) {
        console.error(
          "❌  No form packages found in documents/generated-pdfs/form-packages/. Run `npm run docs:generate:forms` first.",
        );
        process.exit(1);
      } else {
        console.log(
          `  ℹ  No form packages found (handbook uses DOCX form templates)`,
        );
      }
    } else {
      // Filter to canonical manual form IDs only; exclude helper artifacts.
      const filtered = isEmployeeHandbook
        ? formPackages.filter((pkg) => /^HANDBOOK-FORM-\d+$/i.test(pkg.id))
        : formPackages.filter((pkg) => /^MISH\s+\d{1,2}$/i.test(pkg.id));

      if (filtered.length === 0) {
        console.log(
          `  ℹ  No ${isEmployeeHandbook ? "handbook" : "MISH"} form packages found`,
        );
      } else {
        const unmapped = filtered.filter((pkg) => !pkg.manualSection);
        if (unmapped.length > 0) {
          console.warn(
            `  ⚠  ${unmapped.length} form(s) missing manualSection mapping (will skip)`,
          );
          filtered.splice(
            0,
            filtered.length,
            ...filtered.filter((pkg) => pkg.manualSection),
          );
        }

        if (filtered.length > 0) {
          console.log(
            `  ✓  Forms mapped: ${filtered.length}/${filtered.length}`,
          );

          const formsTocPages = paginateFormEntries(filtered).length;
          let nextFormPage = merged.getPageCount() + formsTocPages + 1;

          const tocEntries = filtered.map((pkg) => {
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

          for (const pkg of filtered) {
            await appendPdfBytes(`${pkg.id} — ${pkg.title}`, pkg.bytes);
          }
        }
      }
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
    const title = isEmployeeHandbook
      ? "MH Construction Employee Handbook — Digital"
      : "MH Construction Safety Manual — Digital";
    await merge({
      includeTabs: false,
      includeForms: !noForms,
      outFile: OUT_FILE_DIGITAL,
      title,
    });
  } else {
    // Default: complete binder version (cover + TOC + tabs + sections + forms)
    const title = isEmployeeHandbook
      ? "MH Construction Employee Handbook — Complete"
      : "MH Construction Safety Manual — Complete";
    await merge({
      includeTabs: true,
      includeForms: !noForms,
      outFile: OUT_FILE,
      title,
    });
  }
}

main().catch((err) => {
  console.error("\n❌ Fatal error:", err);
  process.exit(1);
});
