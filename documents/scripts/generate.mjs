#!/usr/bin/env node
/* eslint-disable no-console, prefer-template */
/**
 * documents/scripts/generate.mjs
 *
 * Renders branded print-ready PDFs from HTML templates using Puppeteer.
 *
 * Usage:
 *   npm run docs:generate                          # generate all safety manual PDFs
 *   npm run docs:generate -- --template cover      # cover only
 *   npm run docs:generate -- --template spine      # spine only
 *   npm run docs:generate -- --template tabs       # all tab dividers
 *   npm run docs:generate -- --template sections   # all 44 section PDFs
 *   npm run docs:generate -- --template section --section 11  # single section
 *   npm run docs:generate -- --template toolbox-talk          # standalone form
 *   node documents/scripts/generate.mjs --template cover
 *
 * Output directory: documents/output/
 *   safety-manual-cover.pdf
 *   safety-manual-spine.pdf
 *   safety-manual-tabs.pdf
 *   sections/
 *     00-table-of-contents.pdf
 *     01-injury-free-workplace-plan.pdf
 *     …
 *   forms/
 *     toolbox-talk.pdf
 */

import puppeteer from "puppeteer";
import QRCode from "qrcode";
import { PDFDocument } from "pdf-lib";
import {
  readFile,
  writeFile,
  mkdir,
  readdir,
  copyFile,
} from "node:fs/promises";
import { readFileSync, existsSync, unlinkSync } from "node:fs";
import { join, resolve, dirname, extname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const SITE_URL = "https://www.mhc-gc.com";
const PDF_METADATA_AUTHOR = "Matt Ramsey, Editor-in-Chief";
const PDF_METADATA_CREATOR = "MH Construction Document Pipeline";
const PDF_METADATA_SUBJECT = "Accident · Injury · Safety · Health Program";
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const DOCS_DIR = join(ROOT, "documents");
const OUTPUT_DIR = join(DOCS_DIR, "output");
const MANIFEST = join(DOCS_DIR, "content/safety-manual.json");
const FORMS_DIR = join(DOCS_DIR, "forms");

// ── Argument parsing ──────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const getArg = (flag) => {
  const i = args.indexOf(flag);
  if (i === -1) return null;
  return args[i + 1];
};
const template = getArg("--template") || "all";
const sectionNo = getArg("--section");
const revDateArg = getArg("--rev-date"); // e.g. "04/07/2026"
const revNumArg = getArg("--rev-number"); // e.g. "2"

// ── Brand loader ──────────────────────────────────────────────────────────────
const brandId = getArg("--brand") || "mhc";
const BRAND_DIR = join(DOCS_DIR, "brands");

let BRAND;
try {
  BRAND = JSON.parse(
    await readFile(join(BRAND_DIR, `${brandId}.json`), "utf-8"),
  );
} catch {
  console.error(`❌  Brand config not found: documents/brands/${brandId}.json`);
  process.exit(1);
}

// ── Runtime revision overrides (from CLI args or git metadata) ───────────────
const _today = () => {
  const d = new Date();
  return `${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}/${d.getFullYear()}`;
};
BRAND.revisionDate = revDateArg || BRAND.revisionDate || _today();
BRAND.revisionNumber = revNumArg || BRAND.revisionNumber || "1";

// ── Logo base64 (used in Puppeteer header templates which need data URLs) ──────
const _logoPath = join(DOCS_DIR, BRAND.logo.color.replace(/^\.\.\//, ""));
let LOGO_COLOR_B64 = "";
try {
  const _logoBuf = await readFile(_logoPath);
  LOGO_COLOR_B64 = `data:image/png;base64,${_logoBuf.toString("base64")}`;
} catch {
  /* logo file not found — header will render without image */
}

// ── AGC partner logo base64 (used in Puppeteer footer template) ────────────
const _agcPath = join(DOCS_DIR, "assets/nwagc-logo.png");
let AGC_LOGO_B64 = "";
try {
  const _agcBuf = await readFile(_agcPath);
  AGC_LOGO_B64 = `data:image/png;base64,${_agcBuf.toString("base64")}`;
} catch {
  /* AGC logo not found — footer will render without it */
}

// ── BBB Accredited Business seal base64 (used in Puppeteer footer template) ────
const _bbbPath = join(DOCS_DIR, "assets/bbb/bbb-accredited-seal.png");
let BBB_LOGO_B64 = "";
try {
  const _bbbBuf = await readFile(_bbbPath);
  BBB_LOGO_B64 = `data:image/png;base64,${_bbbBuf.toString("base64")}`;
} catch {
  /* BBB logo not found — footer will render without it */
}

// ── Travelers Insurance logo base64 (used in Puppeteer footer template) ────
const _travelersPath = join(
  DOCS_DIR,
  "assets/Travelers-logo-2color-Small-600px.png",
);
let TRAVELERS_LOGO_B64 = "";
try {
  const _travelersBuf = await readFile(_travelersPath);
  TRAVELERS_LOGO_B64 = `data:image/png;base64,${_travelersBuf.toString("base64")}`;
} catch {
  /* Travelers logo not found — footer will render without it */
}

const CANONICAL_OWNERSHIP_TAGLINE =
  "Founded 2010, Veteran-Owned Since January 2025";

/**
 * Build a flat token map from the brand config.
 * Every key becomes {{BRAND_KEY}} in templates.
 * Image paths are converted to absolute file:// URLs for Puppeteer.
 */
function buildBrandTokens(brand) {
  const licStr = Object.entries(brand.licenses || {})
    .filter(([, v]) => v)
    .map(([state, num]) => `${state} Lic: ${num}`)
    .join("  ·  ");

  // Helper: convert relative doc paths to base64 data URIs for self-contained HTML.
  // Brand JSON paths are relative to the brands/ directory.
  const resolvePath = (relPath) => {
    if (!relPath) return "";
    const absPath = resolve(BRAND_DIR, relPath);
    try {
      const buf = readFileSync(absPath);
      const ext = extname(absPath).slice(1).toLowerCase();
      const imageExt = ext === "jpg" ? "jpeg" : ext;
      const mime = ext === "svg" ? "image/svg+xml" : `image/${imageExt}`;
      return `data:${mime};base64,${buf.toString("base64")}`;
    } catch {
      // Fallback to file:// URL if file cannot be read
      return pathToFileURL(absPath).href;
    }
  };

  return {
    "{{BRAND_ID}}": brand.id,
    "{{BRAND_COMPANY_NAME}}": brand.companyName,
    "{{BRAND_COMPANY_SHORT}}": brand.companyShort,
    "{{BRAND_TAGLINE}}": brand.tagline,
    "{{BRAND_VETERAN}}": brand.veteranOwned ? CANONICAL_OWNERSHIP_TAGLINE : "",
    "{{BRAND_ADDRESS}}": brand.address,
    "{{BRAND_ADDRESS_STREET}}": brand.addressStreet,
    "{{BRAND_ADDRESS_CITYSTATEZIP}}": brand.addressCityStateZip,
    "{{BRAND_PHONE}}": brand.phone,
    "{{BRAND_WEBSITE}}": brand.website,
    "{{BRAND_EMAIL}}": brand.email,
    "{{BRAND_REVISION_YEAR}}": brand.revisionYear,
    "{{BRAND_REVISION_DATE}}": brand.revisionDate || "",
    "{{BRAND_REVISION_NUMBER}}": brand.revisionNumber || "1",
    "{{BRAND_LICENSE_WA}}": brand.licenses?.WA || "",
    "{{BRAND_LICENSE_OR}}": brand.licenses?.OR || "",
    "{{BRAND_LICENSE_ID}}": brand.licenses?.ID || "",
    "{{BRAND_LICENSES_INLINE}}": licStr,
    "{{BRAND_COLOR_PRIMARY}}": brand.colors.primary,
    "{{BRAND_COLOR_PRIMARY_DARK}}": brand.colors.primaryDark,
    "{{BRAND_COLOR_PRIMARY_DARKER}}": brand.colors.primaryDarker,
    "{{BRAND_COLOR_PRIMARY_LIGHT}}": brand.colors.primaryLight,
    "{{BRAND_COLOR_SECONDARY}}": brand.colors.secondary,
    "{{BRAND_COLOR_SECONDARY_LIGHT}}": brand.colors.secondaryLight,
    "{{BRAND_COLOR_SECONDARY_TEXT}}": brand.colors.secondaryText,
    "{{BRAND_COLOR_BRONZE}}": brand.colors.bronze,
    "{{BRAND_COLOR_BRONZE_LIGHT}}": brand.colors.bronzeLight,
    "{{BRAND_COLOR_BRONZE_DARK}}": brand.colors.bronzeDark,
    "{{BRAND_LOGO_WHITE}}": resolvePath(brand.logo.white),
    "{{BRAND_LOGO_COLOR}}": LOGO_COLOR_B64 || resolvePath(brand.logo.color),
    "{{BRAND_LOGO_DARKBG}}": resolvePath(brand.logo.darkBg),
    "{{BRAND_AGC_HORIZONTAL}}": resolvePath(
      brand.partnerLogos?.agcHorizontal || "",
    ),
    "{{BRAND_AGC_STACKED}}": resolvePath(brand.partnerLogos?.agcStacked || ""),
    "{{BRAND_BBB_HORIZONTAL}}":
      BBB_LOGO_B64 || resolvePath(brand.partnerLogos?.bbbHorizontal || ""),
    "{{BRAND_BBB_VERTICAL}}": resolvePath(
      brand.partnerLogos?.bbbVertical || "",
    ),
    "{{BRAND_BBB_SEAL}}":
      BBB_LOGO_B64 || resolvePath(brand.partnerLogos?.bbbSeal || ""),
    "{{BRAND_QR_DASHBOARD}}": resolvePath(brand.qrCodes?.dashboard || ""),
  };
}

const BRAND_TOKENS = buildBrandTokens(BRAND);
const BRAND_LICENSES_INLINE = BRAND_TOKENS["{{BRAND_LICENSES_INLINE}}"];
const BRAND_COLORS = {
  primary: BRAND.colors.primary,
  secondary: BRAND.colors.secondary,
  secondaryText: BRAND.colors.secondaryText,
};

/** Apply all brand tokens to an HTML string. */
function applyBrandTokens(html) {
  let out = html;
  for (const [token, value] of Object.entries(BRAND_TOKENS)) {
    out = out.replaceAll(token, value);
  }
  return out;
}

// ── Physical Tab + Tier mapping ────────────────────────────────────────────
/**
 * Map a MISH section number to a physical binder tab reference.
 * MISH 01–33 → numeric tabs "1"–"33"
 * MISH 34–44 → alpha tabs "A"–"K"
 * Section 00 (TOC) returns "TOC".
 */
function sectionToTab(sectionNumber) {
  const n = Number(sectionNumber);
  if (n === 0) return "TOC";
  if (n >= 1 && n <= 33) return String(n);
  // 34→A, 35→B, … 44→K
  return String.fromCodePoint(65 + (n - 34));
}

/**
 * Four-tier structural classification.
 * Tier 1 (Admin Anchor):      MISH 01–03  — Senior Management Ownership
 * Tier 2 (Field Cadence):     MISH 04–09  — Planning & Orientation
 * Tier 3 (Engineering):       MISH 10–37  — OSHA 1926/WAC 296-155 Technical Standards
 * Tier 4 (Specialized Risk):  MISH 38–44  — Subcontractors, CDL & Specific Exposures
 */
function sectionToTier(sectionNumber) {
  const n = Number(sectionNumber);
  if (n === 0) return null; // TOC has no tier
  if (n <= 3) {
    return {
      num: 1,
      label: "Admin Anchor",
      desc: "Senior Management Ownership",
    };
  }
  if (n <= 9) {
    return { num: 2, label: "Field Cadence", desc: "Planning & Orientation" };
  }
  if (n <= 37) {
    return { num: 3, label: "Engineering", desc: "OSHA 1926/WAC 296-155" };
  }
  return {
    num: 4,
    label: "Specialized Risk",
    desc: "Subcontractors, CDL & Exposures",
  };
}

// ── Puppeteer header / footer templates ────────────────────────────────────
/**
 * Build the per-section running header HTML.
 * Puppeteer injects this into the physical top margin of EVERY printed page.
 * Logo must be a data URL since the header renders in an isolated context.
 *
 * Layout: LEFT (MISH + title) | CENTER (logo) | RIGHT (tab location + rev).
 */
function buildSectionHeaderHtml(sectionNum, sectionTitle, revNum, revDate) {
  const titleShort =
    sectionTitle.length > 40 ? sectionTitle.slice(0, 37) + "…" : sectionTitle;
  const tabRef = sectionToTab(sectionNum);
  const font = "'Helvetica Neue',Arial,sans-serif";
  const pad = "padding:0 0.75in 0 1.25in";
  return [
    `<div style="width:100%;background:white;border-bottom:1.5pt solid ${BRAND_COLORS.secondary};`,
    `${pad};height:0.65in;display:flex;align-items:center;`,
    `justify-content:space-between;font-family:${font};`,
    `-webkit-print-color-adjust:exact;print-color-adjust:exact;box-sizing:border-box;">`,

    // LEFT — section designator + title
    `<div style="flex:1;display:flex;flex-direction:column;justify-content:center;overflow:hidden;">`,
    `<span style="font-size:10pt;font-weight:900;color:${BRAND_COLORS.primary};line-height:1;">MISH ${sectionNum}</span>`,
    `<span style="font-size:8pt;font-weight:700;color:${BRAND_COLORS.primary};line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${titleShort}</span>`,
    `</div>`,

    // CENTER — single high-resolution MHC logo, centered in header block
    `<div style="flex:0 0 auto;display:flex;justify-content:center;align-items:center;padding:0 14pt;">`,
    LOGO_COLOR_B64
      ? `<img src="${LOGO_COLOR_B64}" style="height:34pt;width:auto;" alt="MH Construction" />`
      : `<span style="font-size:13pt;font-weight:900;color:${BRAND_COLORS.primary};letter-spacing:0.04em;">MHC</span>`,
    `</div>`,

    // RIGHT — binder tab location + revision metadata
    `<div style="flex:1;display:flex;flex-direction:column;align-items:flex-end;justify-content:center;">`,
    `<span style="font-size:7pt;font-weight:700;color:${BRAND_COLORS.secondary};line-height:1.2;letter-spacing:0.04em;">BINDER LOCATION: TAB ${tabRef}</span>`,
    `<span style="font-size:7.5pt;color:${BRAND_COLORS.secondaryText};white-space:nowrap;line-height:1.3;">Rev. ${revNum}&nbsp;|&nbsp;${revDate}</span>`,
    `</div>`,

    `</div>`,
  ].join("");
}

/**
 * Standard footer HTML for all section PDFs.
 * Uses Puppeteer's native <span class="pageNumber"> / <span class="totalPages"> injection.
 */
// PRECISION OVERRIDE 4 — Universal footer per cover page match:
// Left: Company + contact  |  Center: MHC-APP identifier + Veteran Owned + compliance  |  Right: Page
const SECTION_FOOTER_HTML = [
  // Outer container — matches cover-bottom layout (light variant)
  `<div style="width:100%;border-top:0.75pt solid ${BRAND_COLORS.secondary};`,
  `padding:0 0.75in 0 1.25in;height:0.65in;display:flex;align-items:center;`,
  `justify-content:space-between;gap:0.2in;font-family:'Helvetica Neue',Arial,sans-serif;`,
  `-webkit-print-color-adjust:exact;print-color-adjust:exact;box-sizing:border-box;">`,

  // LEFT — Company contact (mirrors cover-bottom-left)
  `<div style="flex:1;min-width:0;color:${BRAND_COLORS.secondaryText};font-size:8pt;line-height:1.65;">`,
  `<strong style="color:${BRAND_COLORS.primary};">${BRAND.companyName}</strong>`,
  `<span style="color:${BRAND_COLORS.secondaryText};margin:0 5pt;">|</span>${BRAND.phone}<br>`,
  `${BRAND.addressStreet}, ${BRAND.addressCityStateZip}<br>`,
  `${BRAND.website}</div>`,

  // RIGHT — Licenses + BBB + AGC logos (mirrors cover-bottom-right)
  `<div style="flex-shrink:0;display:flex;align-items:center;gap:0.12in;">`,
  `<div style="text-align:right;font-size:7pt;color:${BRAND_COLORS.secondaryText};white-space:nowrap;line-height:1.65;">`,
  `${BRAND_LICENSES_INLINE.replaceAll("  ·  ", "&nbsp;&middot;&nbsp;")}<br>`,
  `<span style="color:${BRAND_COLORS.secondary};font-weight:700;">Revision ${BRAND.revisionYear}</span></div>`,
  BBB_LOGO_B64
    ? `<img src="${BBB_LOGO_B64}" style="height:0.34in;width:auto;display:block;flex-shrink:0;" alt="BBB Accredited A+" />`
    : "",
  AGC_LOGO_B64
    ? `<img src="${AGC_LOGO_B64}" style="height:0.34in;width:auto;display:block;flex-shrink:0;" alt="AGC Member" />`
    : "",
  TRAVELERS_LOGO_B64
    ? `<img src="${TRAVELERS_LOGO_B64}" style="height:0.28in;width:auto;display:block;flex-shrink:0;" alt="Travelers Insurance Partner" />`
    : "",
  `</div>`,

  `</div>`,
].join("");

/**
 * Generate a QR code as a base64 PNG data URL for embedding in HTML.
 * Uses the brand primary color for the dark modules.
 */
function buildQrDataUrl(url) {
  return QRCode.toDataURL(url, {
    type: "image/png",
    width: 180,
    margin: 1,
    color: {
      dark: BRAND.colors.primary,
      light: "#ffffff",
    },
    errorCorrectionLevel: "M",
  });
}

// ── Helpers ───────────────────────────────────────────────────────────────────
async function ensureDir(dir) {
  await mkdir(dir, { recursive: true });
}

/**
 * Render an HTML string to a PDF using Puppeteer (via temp file).
 * @param {string} html      — HTML string (already token-substituted)
 * @param {string} pdfPath   — absolute path for the output PDF
 * @param {object} pageOpts  — Puppeteer PDF options override
 * @param {string} [tmpName] — optional explicit temp file name
 */
async function renderHtmlToPdf(
  html,
  pdfPath,
  pageOpts = {},
  tmpName = "_tmp_render.html",
) {
  const tmpHtml = join(DOCS_DIR, tmpName);
  await writeFile(tmpHtml, html, "utf-8");
  await renderPdf(tmpHtml, pdfPath, pageOpts);
  unlinkSync(tmpHtml);
}

/**
 * Launch (or reuse) a Puppeteer browser instance.
 */
let _browser;
async function getBrowser() {
  if (!_browser) {
    _browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  }
  return _browser;
}

/**
 * Render an HTML file to a PDF using Puppeteer.
 * @param {string} htmlPath  — absolute path to the HTML template
 * @param {string} pdfPath   — absolute path for the output PDF
 * @param {object} pageOpts  — Puppeteer PDF options override
 */
async function renderPdf(htmlPath, pdfPath, pageOpts = {}) {
  const browser = await getBrowser();
  const page = await browser.newPage();

  // Load the HTML file via file:// protocol so relative CSS paths resolve
  await page.goto(pathToFileURL(htmlPath).toString(), {
    waitUntil: "networkidle0",
  });

  const defaultOpts = {
    format: "Letter",
    printBackground: true,
    preferCSSPageSize: false,
    margin: {
      top: "0.75in",
      right: "0.75in",
      bottom: "0.75in",
      left: "1.25in",
    },
  };

  await page.pdf({ path: pdfPath, ...defaultOpts, ...pageOpts });
  await page.close();

  // Normalize metadata so standalone PDFs match merged manual metadata fields.
  const pdfBytes = await readFile(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  pdfDoc.setAuthor(PDF_METADATA_AUTHOR);
  pdfDoc.setCreator(PDF_METADATA_CREATOR);
  pdfDoc.setSubject(PDF_METADATA_SUBJECT);
  const outBytes = await pdfDoc.save();
  await writeFile(pdfPath, outBytes);

  const rel = pdfPath.replace(ROOT + "/", "");
  console.log(`  ✓  ${rel}`);
}

// ── Template: Cover ───────────────────────────────────────────────────────────
async function generateCover() {
  console.log("\n📄 Generating cover…");
  await ensureDir(OUTPUT_DIR);
  const raw = await readFile(
    join(DOCS_DIR, "manuals/safety-manual-cover.html"),
    "utf-8",
  );
  const qrDataUrl = await buildQrDataUrl(BRAND.qrCodes.digitalManual);
  const html = applyBrandTokens(raw).replace(
    "{{QR_DIGITAL_MANUAL}}",
    qrDataUrl,
  );
  const pdfPath = join(OUTPUT_DIR, "safety-manual-cover.pdf");
  await renderHtmlToPdf(
    html,
    pdfPath,
    { margin: { top: 0, right: 0, bottom: 0, left: 0 } },
    "manuals/_tmp_cover.html",
  );
}

// ── Template: Spine ───────────────────────────────────────────────────────────
async function generateSpine() {
  console.log("\n📐 Generating spine…");
  await ensureDir(OUTPUT_DIR);
  const raw = await readFile(
    join(DOCS_DIR, "manuals/safety-manual-spine.html"),
    "utf-8",
  );
  const html = applyBrandTokens(raw);
  const pdfPath = join(OUTPUT_DIR, "safety-manual-spine.pdf");
  await renderHtmlToPdf(
    html,
    pdfPath,
    { margin: { top: 0, right: 0, bottom: 0, left: 0 } },
    "manuals/_tmp_spine.html",
  );
}

// ── Template: Tab Dividers ────────────────────────────────────────────────────
async function generateTabs() {
  console.log("\n🗂  Generating tab dividers…");
  await ensureDir(OUTPUT_DIR);
  const raw = await readFile(
    join(DOCS_DIR, "manuals/safety-manual-tabs.html"),
    "utf-8",
  );
  const html = applyBrandTokens(raw);
  const pdfPath = join(OUTPUT_DIR, "safety-manual-tabs.pdf");
  await renderHtmlToPdf(
    html,
    pdfPath,
    { margin: { top: 0, right: 0, bottom: 0, left: 0 } },
    "_tmp_tabs.html",
  );
}

function buildContentsPdfHtml(sections) {
  const generatedOn = new Date().toLocaleDateString("en-US");
  const rows = sections
    .map((section) => {
      const number = String(section.numberStr || section.number).padStart(
        2,
        "0",
      );
      return (
        `<tr>` +
        `<td class="num">MISH ${number}</td>` +
        `<td class="title">${escapeHtml(section.title || "")}</td>` +
        `</tr>`
      );
    })
    .join("\n");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Safety Manual Table of Contents</title>
    <style>
      @page { size: Letter; margin: 0.75in 0.75in 0.75in 1.0in; }
      body {
        font-family: "Inter", "Segoe UI", Arial, sans-serif;
        color: #1f2937;
        font-size: 11pt;
        line-height: 1.35;
      }
      .header {
        margin-bottom: 0.3in;
        padding-bottom: 0.12in;
        border-bottom: 2px solid {{BRAND_COLOR_PRIMARY}};
      }
      .brand {
        font-size: 10pt;
        color: #4b5563;
        margin-bottom: 0.06in;
      }
      h1 {
        font-size: 20pt;
        margin: 0;
        color: {{BRAND_COLOR_PRIMARY}};
      }
      .meta {
        margin-top: 0.08in;
        font-size: 9pt;
        color: #6b7280;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      tr {
        border-bottom: 1px solid #e5e7eb;
      }
      td {
        padding: 0.1in 0;
        vertical-align: top;
      }
      .num {
        width: 1.15in;
        font-weight: 700;
        color: #111827;
        white-space: nowrap;
      }
      .title {
        color: #1f2937;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <div class="brand">{{BRAND_COMPANY_NAME}}</div>
      <h1>Safety Manual Table of Contents</h1>
      <div class="meta">Generated ${generatedOn} • Revision {{BRAND_REVISION_NUMBER}} ({{BRAND_REVISION_DATE}})</div>
    </div>

    <table aria-label="Safety manual section index">
      <tbody>
        ${rows}
      </tbody>
    </table>
  </body>
</html>`;
}

function buildReferencePdfHtml(sections) {
  const generatedOn = new Date().toLocaleDateString("en-US");
  const rows = sections
    .map((section) => {
      const number = String(section.numberStr || section.number).padStart(
        2,
        "0",
      );
      const category = section.category || "General";
      const oshaRef = section.oshaRef || "-";
      const pages = section.pages ? String(section.pages) : "-";

      return (
        `<tr>` +
        `<td class="num">${escapeHtml(number)}</td>` +
        `<td class="title">${escapeHtml(section.title || "")}</td>` +
        `<td class="cat">${escapeHtml(category)}</td>` +
        `<td class="ref">${escapeHtml(oshaRef)}</td>` +
        `<td class="pages">${escapeHtml(pages)}</td>` +
        `</tr>`
      );
    })
    .join("\n");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Safety Manual Reference Guide</title>
    <style>
      @page { size: Letter; margin: 0.65in 0.5in 0.65in 0.5in; }
      body {
        font-family: "Inter", "Segoe UI", Arial, sans-serif;
        color: #1f2937;
        font-size: 9.5pt;
        line-height: 1.3;
      }
      .header {
        margin-bottom: 0.25in;
        padding-bottom: 0.1in;
        border-bottom: 2px solid {{BRAND_COLOR_PRIMARY}};
      }
      .brand {
        font-size: 9pt;
        color: #4b5563;
        margin-bottom: 0.04in;
      }
      h1 {
        font-size: 17pt;
        margin: 0;
        color: {{BRAND_COLOR_PRIMARY}};
      }
      .meta {
        margin-top: 0.06in;
        font-size: 8pt;
        color: #6b7280;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      thead th {
        text-align: left;
        font-size: 8pt;
        letter-spacing: 0.01em;
        color: #374151;
        border-bottom: 1px solid #9ca3af;
        padding: 0.06in 0.04in;
      }
      tbody td {
        border-bottom: 1px solid #e5e7eb;
        padding: 0.06in 0.04in;
        vertical-align: top;
      }
      .num {
        width: 0.55in;
        font-weight: 700;
        color: #111827;
        white-space: nowrap;
      }
      .title {
        width: 3.35in;
        color: #111827;
      }
      .cat {
        width: 1.35in;
        color: #1f2937;
      }
      .ref {
        width: 1.1in;
        color: #374151;
      }
      .pages {
        width: 0.55in;
        text-align: right;
        color: #374151;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <div class="brand">{{BRAND_COMPANY_NAME}}</div>
      <h1>Safety Manual Reference Guide</h1>
      <div class="meta">Generated ${generatedOn} • Revision {{BRAND_REVISION_NUMBER}} ({{BRAND_REVISION_DATE}})</div>
    </div>

    <table aria-label="Safety manual reference index">
      <thead>
        <tr>
          <th>MISH</th>
          <th>Section Title</th>
          <th>Category</th>
          <th>OSHA Ref</th>
          <th>Pages</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  </body>
</html>`;
}

// ── Template: Section PDFs ────────────────────────────────────────────────────
async function generateSections(filter = null) {
  if (!existsSync(MANIFEST)) {
    console.error(
      "\n❌  safety-manual.json not found. Run `npm run docs:extract` first.",
    );
    process.exit(1);
  }

  const { sections } = JSON.parse(await readFile(MANIFEST, "utf-8"));
  const sectionsDir = join(OUTPUT_DIR, "sections");
  await ensureDir(sectionsDir);

  // Optional: render only a single section
  const targets =
    filter === null
      ? sections
      : sections.filter((s) => String(s.number) === String(filter));

  console.log(`\n📑 Generating ${targets.length} section PDF(s)…`);

  const templateHtml = await readFile(
    join(DOCS_DIR, "manuals/safety-manual-section.html"),
    "utf-8",
  );

  for (const section of targets) {
    // Generate branded QR code pointing to the section's web page
    const sectionUrl = `${SITE_URL}/resources/safety-manual/section/${section.slug}`;
    const qrDataUrl = await buildQrDataUrl(sectionUrl);

    let sectionBody;
    if (section.number === 0) {
      sectionBody = textToTocHtml(section.body);
    } else if (section.body.trimStart().startsWith("<")) {
      sectionBody = cleanWordHtml(section.body);
    } else {
      sectionBody = textToHtml(section.body);
    }

    // Inject section data + brand tokens; run section-specific post-processing
    let html = applyBrandTokens(
      templateHtml
        .replaceAll("{{SECTION_NUMBER}}", section.numberStr)
        .replaceAll("{{SECTION_TITLE}}", escapeHtml(section.title))
        .replaceAll("{{SECTION_BODY}}", sectionBody)
        .replaceAll("{{REVISION_YEAR}}", BRAND.revisionYear || "2026")
        .replaceAll("{{TOTAL_SECTIONS}}", String(sections.length))
        .replaceAll("{{QR_CODE_DATA_URL}}", qrDataUrl)
        .replaceAll("{{SECTION_URL}}", escapeHtml(sectionUrl)),
    );

    // Post-process: 3-Hour Rule callout, Addendum A table, form page breaks
    html = postProcessSectionHtml(html, section.number);

    // Build per-section Puppeteer native header and footer
    const headerHtml = buildSectionHeaderHtml(
      section.numberStr,
      section.title,
      BRAND.revisionNumber,
      BRAND.revisionDate,
    );

    const pdfName = `${section.numberStr}-${section.slug}.pdf`;
    const pdfPath = join(sectionsDir, pdfName);
    await renderHtmlToPdf(
      html,
      pdfPath,
      {
        displayHeaderFooter: true,
        headerTemplate: headerHtml,
        footerTemplate: SECTION_FOOTER_HTML,
        margin: {
          top: "1.0in", // accommodates 0.65in header + 0.35in gap
          right: "0.75in",
          bottom: "0.9in", // accommodates 0.65in footer + 0.25in gap
          left: "1.25in",
        },
      },
      `manuals/_tmp_section_${section.numberStr}.html`,
    );
  }

  // Keep a top-level TOC artifact for quick access without opening section folders.
  // If legacy section 00 exists, copy it. Otherwise synthesize a TOC PDF from the manifest.
  if (filter === null) {
    const tocTarget = join(OUTPUT_DIR, "safety-manual-contents.pdf");
    const referenceTarget = join(OUTPUT_DIR, "safety-manual-reference.pdf");
    const tocSection = sections.find((section) => Number(section.number) === 0);

    if (tocSection) {
      const tocSource = join(
        sectionsDir,
        `${tocSection.numberStr}-${tocSection.slug}.pdf`,
      );
      if (existsSync(tocSource)) {
        await copyFile(tocSource, tocTarget);
        const rel = tocTarget.replace(ROOT + "/", "");
        console.log(`  ✓  ${rel}`);
      }
    } else {
      const tocHtml = applyBrandTokens(buildContentsPdfHtml(sections));
      await renderHtmlToPdf(
        tocHtml,
        tocTarget,
        {},
        "manuals/_tmp_safety_manual_contents.html",
      );
    }

    const referenceHtml = applyBrandTokens(buildReferencePdfHtml(sections));
    await renderHtmlToPdf(
      referenceHtml,
      referenceTarget,
      {},
      "manuals/_tmp_safety_manual_reference.html",
    );
  }
}

// ── Template: Standalone Forms ────────────────────────────────────────────────
async function generateForm(name) {
  const formsDir = join(OUTPUT_DIR, "forms");
  await ensureDir(formsDir);

  const htmlPath = join(DOCS_DIR, `forms/${name}.html`);
  if (!existsSync(htmlPath)) {
    console.error(`\n❌  Form template not found: forms/${name}.html`);
    process.exit(1);
  }

  console.log(`\n📋 Generating form: ${name}…`);
  const raw = await readFile(htmlPath, "utf-8");
  const html = applyBrandTokens(raw);
  const pdfPath = join(formsDir, `${name}.pdf`);
  await renderHtmlToPdf(html, pdfPath, {}, `forms/_tmp_${name}.html`);
}

async function listStandaloneFormTemplates() {
  try {
    const entries = await readdir(FORMS_DIR, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
      .map((entry) => entry.name.replace(/\.html$/, ""))
      .sort((a, b) => a.localeCompare(b));
  } catch (error) {
    if (error && typeof error === "object" && "code" in error) {
      if (error.code === "ENOENT") {
        return [];
      }
    }
    throw error;
  }
}

async function generateForms() {
  const formNames = await listStandaloneFormTemplates();

  if (formNames.length === 0) {
    console.log("ℹ️  No standalone form templates found in documents/forms/.");
    return;
  }

  for (const formName of formNames) {
    await generateForm(formName);
  }
}

// ── Utilities ─────────────────────────────────────────────────────────────────
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/**
 * Convert the raw Table of Contents text (section 00) into structured HTML.
 *
 * The source PDF body contains artifact header lines followed by a
 * "TABLE OF CONTENTS" heading and then rows like:
 *   MISH 01 Injury Free Workplace Plan 2 04/07/2026
 *
 * This function:
 *  - Skips all artifact/preamble lines before the TABLE OF CONTENTS heading
 *  - Converts each "MISH ## Title..." line to a .toc-entry row
 *  - Strips the column-header row ("NUMBER TITLE REV EFF. DATE")
 *  - Strips per-page artifact banners (company header repeated on each page)
 */
const TOC_ARTIFACT_PATTERNS = [
  /^--\s*\d+\s*of\s*\d+\s*--$/,
  /^MH CONSTRUCTION\s*$/i,
  /^Industrial Safety and Health Program\s*$/i,
  /^MISH\s+TOC\s*$/i,
  /^Veteran Owned\s*$/i,
  /^MH Construction,?\s*Inc\.?\s*\|/i,
  /^Aligned with AGC/i,
  /^NUMBER\s+TITLE\s+REV/i,
];

function isAllCapsSubhead(line) {
  return (
    line.length < 90 &&
    line === line.toUpperCase() &&
    /[A-Z]{2}/.test(line) &&
    !/^\d/.test(line)
  );
}

function parseTocEntry(line) {
  const tocMatch = /^MISH\s+(\d+)\s+(.+)$/.exec(line);
  if (!tocMatch) return null;

  const numInt = Number(tocMatch[1]);
  const num = tocMatch[1].padStart(2, "0");
  const title = tocMatch[2]
    .replace(/\s+\d+\s+\d{2}\/\d{2}\/\d{4}\s*$/, "")
    .trim();

  return {
    num,
    numInt,
    title,
    tabRef: sectionToTab(numInt),
    tier: sectionToTier(numInt),
  };
}

function renderTocTierHeading(tier) {
  return (
    `<div class="toc-tier-heading">` +
    `<span class="toc-tier-label">TIER ${tier.num}</span>` +
    `<span class="toc-tier-desc">${tier.label} — ${tier.desc}</span>` +
    `</div>`
  );
}

function renderTocEntry(entry) {
  return (
    `<div class="toc-entry">` +
    `<span class="toc-tab">TAB ${entry.tabRef}</span>` +
    `<span class="toc-number">MISH\u00a0${entry.num}</span>` +
    `<span class="toc-title">${escapeHtml(entry.title)}</span>` +
    `<span class="toc-dots"></span>` +
    `</div>`
  );
}

function processTocLine(line, state) {
  if (!line) return;

  if (/^TABLE\s+OF\s+CONTENTS\s*$/i.test(line)) {
    state.inToc = true;
    state.parts.push(`<h4 class="sec-subhead">TABLE OF CONTENTS</h4>`);
    return;
  }

  if (!state.inToc) return;
  if (TOC_ARTIFACT_PATTERNS.some((p) => p.test(line))) return;

  const entry = parseTocEntry(line);
  if (entry) {
    if (entry.tier && state.lastTier !== entry.tier.num) {
      state.parts.push(renderTocTierHeading(entry.tier));
      state.lastTier = entry.tier.num;
    }
    state.parts.push(renderTocEntry(entry));
    return;
  }

  if (isAllCapsSubhead(line)) {
    state.parts.push(`<h4 class="sec-subhead">${escapeHtml(line)}</h4>`);
  }
}

function textToTocHtml(text) {
  if (!text) return "";

  const state = { inToc: false, lastTier: null, parts: [] };
  for (const raw of text.split("\n")) {
    processTocLine(raw.trim(), state);
  }

  return state.parts.join("\n");
}

/**
 * Clean HTML produced by mammoth (Word .docx extraction) for use in section bodies.
 * - Remaps h1/h2/h3 → <h4 class="sec-subhead"> to match the section heading style
 * - Adds class="sec-list" to <ul> and <ol>
 * - Adds class="sec-bullet" to <li>
 * - Strips inline style="" attributes left by mammoth
 * - Strips boilerplate <p> blocks (MH header lines, page number artifacts)
 * @param {string} html  Raw HTML from mammoth.convertToHtml()
 * @returns {string} Clean HTML ready for {{SECTION_BODY}}
 */
function cleanWordHtml(html) {
  if (!html) return "<p><em>No content provided.</em></p>";

  const STRIP = [
    /^MH CONSTRUCTION\s*$/i,
    /^Industrial Safety and Health Program\s*$/i,
    /^MISH\s+\d+\s*$/i,
    /^Veteran Owned\s*$/i,
    /^MH Construction,?\s*Inc\.?\s*\|/i,
    /^Aligned with AGC CSEA/i,
    /^Core Values:/i,
    /^"Building projects/i,
    /^--\s*\d+\s*of\s*\d+\s*--$/,
    /^AGC CSEA Alignment\s*$/,
    /^OSHA Core Element\s*$/,
    /^Senior Management Ownership and Participation\s*$/i,
    /^Management Leadership\s*$/i,
    /^Worker Engagement.*Participation\s*$/i,
    /^Hazard Prevention and Control\s*$/i,
    /^Document:\s*MISH/i,
    /^Section Summary\s*$/i,
    /^AGC Safety Standards Compliant\s*$/i,
    /^Page\s+\d+\s*\|\s*AGC/i,
    /^Aligned with AGC CSEA Best Practices/i,
    /^\d{3,4}\s+N\.\s+Capitol/i,
    /^\(509\)\s*308/i,
    /^office@mhc-gc\.com/i,
    /^www\.mhc-gc\.com/i,
  ];

  let out = html;

  // Strip inline style attributes
  out = out.replaceAll(/\s+style="[^"]*"/gi, "");

  // Strip colour/font spans that add no semantic value
  out = out.replaceAll(/<span[^>]*>([^<]*)<\/span>/gi, "$1");

  // Remove empty / whitespace-only paragraphs
  out = out.replaceAll(/<p>(\s|&nbsp;)*<\/p>/gi, "");

  // Remove boilerplate <p> blocks
  out = out.replaceAll(/<p>([\s\S]*?)<\/p>/gi, (match, inner) => {
    const text = inner.replaceAll(/<[^>]+>/g, "").trim();
    if (!text) return "";
    if (STRIP.some((p) => p.test(text))) return "";
    return match;
  });

  // Remap heading levels to sec-subhead style
  out = out.replaceAll(
    /<h[123](\s[^>]*)?>([\s\S]*?)<\/h[123]>/gi,
    (_, attrs, content) => `<h4 class="sec-subhead">${content}</h4>`,
  );

  // Add sec-list class to lists
  out = out.replaceAll(/<(ul|ol)(\s[^>]*)?>/gi, '<$1 class="sec-list">');

  // Add sec-bullet class to list items
  out = out.replaceAll(/<li(\s[^>]*)?>/gi, '<li class="sec-bullet">');

  return out.trim();
}

/**
 * Convert plain text extracted from PDF into structured HTML.
 * - Filters PDF-header artifact lines (page marks, repeated MISH headers, etc.)
 * - Renders dotted section numbers (2.3, 2.3.1) as flush-left headings
 * - Renders bullet points as list items
 * - All-caps short lines become sub-headings
 * @param {string} text
 * @returns {string} HTML
 */
function textToHtml(text) {
  if (!text) return "<p><em>No content extracted. See source PDF.</em></p>";

  // Source-PDF artifacts that should be stripped from every section body
  const STRIP = [
    /^MH CONSTRUCTION\s*$/i,
    /^Industrial Safety and Health Program\s*$/i,
    /^MISH\s+\d+\s*$/i,
    /^Veteran Owned\s*$/i,
    /^MH Construction,?\s*Inc\.?\s*\|/i,
    /^Aligned with AGC CSEA/i,
    /^Core Values:/i,
    /^"Building projects/i,
    /^--\s*\d+\s*of\s*\d+\s*--$/,
    /^AGC CSEA Alignment\s*$/,
    /^OSHA Core Element\s*$/,
    /^Senior Management Ownership and Participation\s*$/i,
    /^Management Leadership\s*$/i,
    /^Worker Engagement.*Participation\s*$/i,
    /^Hazard Prevention and Control\s*$/i,
    /^Document:\s*MISH/i,
    /^Section Summary\s*$/i,
    /^AGC Safety Standards Compliant\s*$/i,
  ];

  const lines = text.split("\n");
  const parts = [];
  let para = [];

  const flush = () => {
    if (!para.length) return;
    parts.push(`<p>${para.join(" ")}</p>`);
    para = [];
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flush();
      continue;
    }
    if (STRIP.some((p) => p.test(line))) continue;

    // Dotted section number: "2.3", "2.3.1", "2.3.1.1" — flush-left heading
    const sectionNumberRegex = /^(\d+\.\d+(?:\.\d+)*)\s+(.+)$/;
    const numMatch = sectionNumberRegex.exec(line);
    if (numMatch && line.length < 160) {
      flush();
      parts.push(
        `<div class="sec-num-row">` +
          `<span class="sec-num">${escapeHtml(numMatch[1])}</span>` +
          `<span class="sec-num-text">${escapeHtml(numMatch[2].trim())}</span>` +
          `</div>`,
      );
      continue;
    }

    // Bullet point (• character)
    if (line.startsWith("\u2022")) {
      flush();
      parts.push(
        `<li class="sec-bullet">${escapeHtml(line.slice(1).trim())}</li>`,
      );
      continue;
    }

    // All-caps short line → sub-heading (skip bare numbers and strip lines)
    if (
      line.length < 90 &&
      line === line.toUpperCase() &&
      /[A-Z]{2}/.test(line) &&
      !/^\d/.test(line)
    ) {
      flush();
      parts.push(`<h4 class="sec-subhead">${escapeHtml(line)}</h4>`);
      continue;
    }

    para.push(escapeHtml(line));
  }
  flush();

  // Wrap orphaned <li> elements in <ul>
  let html = parts.join("\n");
  html = html.replaceAll(
    /(<li[\s\S]*?<\/li>\n?)+/g,
    (m) => `<ul class="sec-list">${m}</ul>`,
  );
  return html;
}

// ── Section-specific post-processing ─────────────────────────────────────────

/**
 * Inject a 3-Hour Rule callout box.  Applied to MISH 01, MISH 02, and MISH 38.
 *
 * MISH 02 — anchors after the paragraph that explicitly mentions "3 hours to
 *            provide a sample / collection".
 * MISH 01 — that detail lives in MISH 02; anchor after the Drug Free Workplace
 *            paragraph that references "post accident/incident … testing" to
 *            plant a forward-reference callout.
 * MISH 38 — Commercial Drivers Drug and Alcohol Program; anchor after the
 *            random testing paragraph to enforce the 3-hour compliance window
 *            for DOT-regulated commercial driver testing.
 *
 * @param {string} html         — section body HTML
 * @param {number} sectionNumber — 1, 2, or 38
 */
function injectThreeHourCallout(html, sectionNumber) {
  // ── Generic callout used for MISH 01, MISH 38 (and as MISH 02 last-resort fallback) ──
  const callout = [
    `<div class="three-hour-rule-box no-break">`,
    `<div class="thr-header"><span class="thr-icon">&#9888;</span>&nbsp;3-HOUR RULE &#x2014; TIME-CRITICAL FIELD ACTION</div>`,
    `<div class="thr-body">`,
    `<p class="thr-warning">FAILURE TO COMPLY WITHIN THE 3-HOUR WINDOW = DEEMED POSITIVE</p>`,
    `<p class="thr-detail">Upon notification, the employee must report to the designated collection facility `,
    `within 3 hours. Failure to appear, refusal, or no-show at the collection site constitutes an `,
    `automatic positive result and is subject to full disciplinary action per Section 2.6.</p>`,
    `</div></div>`,
  ].join("");

  if (sectionNumber === 2) {
    // PRECISION OVERRIDE 2 — Visual Field Triggers (MISH 02)
    // The Word-extracted body contains raw <table> wrappers around each 3-HOUR RULE notice.
    // Replace both tables with proper .three-hour-rule-box callout divs so the light-grey
    // background + 2pt MHC Green border renders correctly and the bold-warning achieves 12pt.
    let replaced = false;

    html = html.replaceAll(
      /<table><tr><td>(?:<p><strong>3-HOUR RULE[^<]*<\/strong><\/p>[\s\S]*?)<\/td><\/tr><\/table>/gi,
      (match) => {
        replaced = true;
        const isSupervisor = /SUPERVISOR ENFORCEMENT REMINDER/i.test(match);

        if (isSupervisor) {
          return [
            `<div class="three-hour-rule-box no-break">`,
            `<div class="thr-header"><span class="thr-icon">&#9888;</span>&nbsp;3-HOUR RULE &#x2014; SUPERVISOR ENFORCEMENT REMINDER</div>`,
            `<div class="thr-body">`,
            `<p class="thr-detail">Testing <strong>MUST</strong> be completed within 3 HOURS of employee notification.</p>`,
            `<p class="thr-warning">IF TESTING IS NOT COMPLETE WITHIN THE 3-HOUR WINDOW = DEEMED POSITIVE</p>`,
            `<p class="thr-detail">Supervisors: Document the exact notification time. Escort the employee to the collection facility. Do not allow the window to expire.</p>`,
            `</div></div>`,
          ].join("");
        } else {
          return [
            `<div class="three-hour-rule-box no-break">`,
            `<div class="thr-header"><span class="thr-icon">&#9888;</span>&nbsp;3-HOUR RULE &#x2014; TIME-CRITICAL FIELD ACTION</div>`,
            `<div class="thr-body">`,
            `<p class="thr-detail">Upon notification, the employee has exactly <strong>3 HOURS</strong> to report to the designated testing facility and provide a sample.</p>`,
            `<p class="thr-warning">FAILURE TO COMPLY WITHIN THE 3-HOUR WINDOW = DEEMED POSITIVE</p>`,
            `<p class="thr-detail">Failure to appear at the testing location within 3 hours shall be treated as a positive test result &mdash; subject to immediate disciplinary action (&sect;2.6).</p>`,
            `</div></div>`,
          ].join("");
        }
      },
    );

    // If table-based replacement succeeded, skip paragraph-based injection
    if (replaced) return html;

    // Fallback: inject after the 3-hours/sample paragraph if table was not found
    const result = html.replace(
      /(<p>[^<]*3[\s-]*hours?[^<]*(sample|provide|collection)[^<]*<\/p>)/i,
      `$1${callout}`,
    );
    if (result !== html) return result;
  }

  if (sectionNumber === 38) {
    // MISH 38 — Commercial Drivers Drug and Alcohol Program
    // Anchor after the random testing paragraph or any testing-related paragraph
    let result = html.replace(
      /(<p>[^<]*random[^<]*test[^<]*<\/p>)/i,
      `$1${callout}`,
    );
    if (result !== html) return result;

    // Fallback: anchor after post-accident testing paragraph
    result = html.replace(
      /(<p>[^<]*post.accident[^<]*test[^<]*<\/p>)/i,
      `$1${callout}`,
    );
    if (result !== html) return result;

    // Last-resort: insert before the first sec-subhead
    return html.replace(/(<h4 class="sec-subhead">)/, `${callout}$1`);
  }

  // MISH 01 (or MISH 02 final fallback): anchor after the Drug Free Workplace / testing paragraph
  const result = html.replace(
    /(<p>[^<]*Drug Free Workplace[^<]*testing[^<]*<\/p>)/i,
    `$1${callout}`,
  );
  // Last-resort: append before the first sec-subhead (section is short — better than nothing)
  if (result === html) {
    return html.replace(/(<h4 class="sec-subhead">)/, `${callout}$1`);
  }
  return result;
}

/**
 * Inject the hardcoded Addendum A substance threshold cutoff table for MISH 02.
 * The table data is per DOT 49 CFR Part 40 / SAMHSA HHS Mandatory Guidelines.
 */
function injectAddendumATable(html) {
  const table = [
    `<div class="addendum-section page-break-before">`,
    `<h4 class="sec-subhead">ADDENDUM &#x201C;A&#x201D; &#x2014; SUBSTANCE THRESHOLD CUTOFF LEVELS</h4>`,
    `<p class="addendum-note">Per U.S. Department of Transportation (DOT) 49 CFR Part 40 and SAMHSA/HHS `,
    `Mandatory Guidelines for Federal Workplace Drug Testing Programs.</p>`,
    `<table class="threshold-table">`,
    `<thead><tr>`,
    `<th>Substance / Drug Class</th>`,
    `<th>Initial Screen Cutoff (EMIT)</th>`,
    `<th>Confirmation Cutoff (GC/MS)</th>`,
    `<th>Disciplinary Action</th>`,
    `</tr></thead><tbody>`,
    `<tr><td>Marijuana Metabolites (THC-COOH)</td><td>50 ng/mL</td><td>15 ng/mL</td><td>Per §2.6</td></tr>`,
    `<tr><td>Cocaine Metabolites (Benzoylecgonine)</td><td>150 ng/mL</td><td>100 ng/mL</td><td>Per §2.6</td></tr>`,
    `<tr><td>Opioids &#x2014; Codeine / Morphine</td><td>2,000 ng/mL</td><td>2,000 ng/mL</td><td>Per §2.6</td></tr>`,
    `<tr><td>Opioids &#x2014; Oxycodone / Oxymorphone</td><td>100 ng/mL</td><td>100 ng/mL</td><td>Per §2.6</td></tr>`,
    `<tr><td>Opioids &#x2014; Hydrocodone / Hydromorphone</td><td>300 ng/mL</td><td>100 ng/mL</td><td>Per §2.6</td></tr>`,
    `<tr class="alert-row"><td><strong>6-Acetylmorphine (Heroin marker)</strong></td>`,
    `<td class="alert-cell"><strong>10 ng/mL</strong></td>`,
    `<td class="alert-cell"><strong>10 ng/mL</strong></td>`,
    `<td class="alert-cell"><strong>Immediate Termination</strong></td></tr>`,
    `<tr><td>Phencyclidine (PCP)</td><td>25 ng/mL</td><td>25 ng/mL</td><td>Per §2.6</td></tr>`,
    `<tr><td>Amphetamines / Methamphetamine</td><td>500 ng/mL</td><td>250 ng/mL</td><td>Per §2.6</td></tr>`,
    `<tr><td>MDMA / MDA (Ecstasy)</td><td>500 ng/mL</td><td>250 ng/mL</td><td>Per §2.6</td></tr>`,
    `<tr class="alert-row"><td><strong>Alcohol (BAC)</strong></td>`,
    `<td class="alert-cell"><strong>0.02%</strong> (send home)</td>`,
    `<td class="alert-cell"><strong>0.04%</strong> (suspension)</td>`,
    `<td>§2.4.4: 1st infraction home; 2nd suspension</td></tr>`,
    `</tbody></table>`,
    `<p class="addendum-note"><strong>Note:</strong> All positive initial screens above listed cutoffs are `,
    `confirmed by GC/MS analysis. A confirmed positive triggers disciplinary action per Section 2.6. `,
    `Zero tolerance applies to 6-AM (heroin metabolite).</p>`,
    `</div>`,
  ].join("");

  // Insert before the ADDENDUM B heading if present; else append
  if (/ADDENDUM[^<]{0,10}B/i.test(html)) {
    return html.replace(
      /(<h4[^>]*>[^<]*ADDENDUM[^<]*B[^<]*<\/h4>)/i,
      `${table}$1`,
    );
  }
  return html + table;
}

/**
 * Inject page-break + form header badges for FORM 02-A (Applicant Consent)
 * and FORM 02-B (Return-to-Work) within the section 02 body HTML.
 *
 * PRECISION OVERRIDE 3 — Form & Signature Isolation: forces each form to
 * start on a new page and replaces the plain paragraph title with a styled
 * dark-green badge header.
 *
 * The Word-extracted body uses <p><strong>FORM 02-X — …</strong></p> for
 * form titles (not <h4> elements), so regexes target that pattern.
 */
function injectFormPageBreaks(html) {
  const makeHeader = (formId, formName) =>
    [
      `<div class="page-break-before"></div>`,
      `<div class="form-standalone-header">`,
      `<span class="form-badge">FORM ${formId}</span>`,
      `<span class="form-badge-title">${formName}</span>`,
      `</div>`,
    ].join("");

  // FORM 02-A — replace the <p><strong>FORM 02-A…</strong></p> paragraph
  html = html.replace(
    /<p><strong>FORM\s+02-A[^<]*<\/strong><\/p>/i,
    makeHeader("02-A", "Applicant Consent to Drug &amp; Alcohol Testing"),
  );

  // FORM 02-B — replace the <p><strong>FORM 02-B…</strong></p> paragraph
  html = html.replace(
    /<p><strong>FORM\s+02-B[^<]*<\/strong><\/p>/i,
    makeHeader("02-B", "Return-to-Work Agreement"),
  );

  return html;
}

/**
 * Replace long underscore sequences with styled non-breaking signature lines.
 */
function injectSignatureLines(html) {
  return html.replaceAll(/_{8,}/g, '<span class="sig-line-underline"></span>');
}

/**
 * PRECISION OVERRIDE 3 — Signature Table Isolation (MISH 02)
 *
 * The Word-extracted body has four separate single-row <table> elements for
 * each signature field in FORM 02-A and FORM 02-B.  Consolidate each group
 * of four into a single bordered .signature-table so:
 *  - All fields are perfectly column-aligned
 *  - The block cannot break across pages (break-inside: avoid)
 *  - Labels use the MHC green-tint background; fill cells stay white
 */
function injectSignatureTables(html) {
  // ── FORM 02-A ─────────────────────────────────────────────────────────────
  const form02aBlock = [
    `<table><tr><td><p><strong>Applicant Name (Print):</strong></p></td><td></td></tr></table>`,
    `<table><tr><td><p><strong>Applicant Signature:</strong></p></td><td></td></tr></table>`,
    `<table><tr><td><p><strong>Witness Signature:</strong></p></td><td></td>`,
    `<td><p><strong>Today's Date:</strong></p></td><td></td></tr></table>`,
    `<table><tr><td><p><strong>Applicant SSN (Last 4):</strong></p></td><td></td>`,
    `<td><p><strong>Employer:</strong></p></td><td></td></tr></table>`,
  ].join("");

  const form02aTable = [
    `<table class="signature-table no-break">`,
    `<tr><td class="sig-label">Applicant Name (Print):</td><td class="sig-fill"></td></tr>`,
    `<tr><td class="sig-label">Applicant Signature:</td><td class="sig-fill"></td></tr>`,
    `<tr>`,
    `<td class="sig-label">Witness Signature:</td><td class="sig-fill"></td>`,
    `<td class="sig-label">Today&#8217;s Date:</td><td class="sig-fill sig-narrow"></td>`,
    `</tr>`,
    `<tr>`,
    `<td class="sig-label">Applicant SSN (Last 4):</td><td class="sig-fill"></td>`,
    `<td class="sig-label">Employer:</td><td class="sig-fill"></td>`,
    `</tr>`,
    `</table>`,
  ].join("");

  html = html.replace(form02aBlock, form02aTable);

  // ── FORM 02-B ─────────────────────────────────────────────────────────────
  const form02bBlock = [
    `<table><tr><td><p><strong>Employee Name (Print):</strong></p></td><td></td></tr></table>`,
    `<table><tr><td><p><strong>Employee Signature:</strong></p></td><td></td></tr></table>`,
    `<table><tr><td><p><strong>Supervisor Signature:</strong></p></td><td></td>`,
    `<td><p><strong>Today's Date:</strong></p></td><td></td></tr></table>`,
    `<table><tr><td><p><strong>Witness Signature:</strong></p></td><td></td>`,
    `<td><p><strong>HR Representative:</strong></p></td><td></td></tr></table>`,
  ].join("");

  const form02bTable = [
    `<table class="signature-table no-break">`,
    `<tr><td class="sig-label">Employee Name (Print):</td><td class="sig-fill"></td></tr>`,
    `<tr><td class="sig-label">Employee Signature:</td><td class="sig-fill"></td></tr>`,
    `<tr>`,
    `<td class="sig-label">Supervisor Signature:</td><td class="sig-fill"></td>`,
    `<td class="sig-label">Today&#8217;s Date:</td><td class="sig-fill sig-narrow"></td>`,
    `</tr>`,
    `<tr>`,
    `<td class="sig-label">Witness Signature:</td><td class="sig-fill"></td>`,
    `<td class="sig-label">HR Representative:</td><td class="sig-fill"></td>`,
    `</tr>`,
    `</table>`,
  ].join("");

  return html.replace(form02bBlock, form02bTable);
}

// ─────────────────────────────────────────────────────────────────────────────
// MISH 03 ── Zero-Tolerance Violations Box
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Wrap the Master Safety Rules bullet list in a 1.5pt bordered zero-tolerance
 * box.  Signals to bonding agencies (Travelers, etc.) that MHC has explicit,
 * documented zero-tolerance policy for variable human systems.
 *
 * Anchor: the paragraph ending "… may result in immediate dismissal."
 * The <ul class="sec-list"> that follows that paragraph is wrapped.
 */
function injectZeroToleranceBox(html) {
  // Matches: dismissal paragraph + the immediately following sec-list
  return html.replace(
    /(<p>[^<]*(?:immediate dismissal|result in dismissal)[^<]*<\/p>\n?)(<ul class="sec-list">[\s\S]*?<\/ul>)/i,
    (_, introPara, list) => {
      const boxHtml = [
        `<div class="zero-tolerance-box">`,
        `<div class="zero-tolerance-header">`,
        `<span class="zero-tolerance-icon">&#9888;</span>`,
        `&nbsp;MASTER SAFETY RULES &#x2014; ZERO TOLERANCE VIOLATIONS`,
        `</div>`,
        `<p class="zero-tolerance-intro">`,
        `The following violations are subject to immediate dismissal. `,
        `This list is not all-inclusive. MHC reserves the right to terminate at will `,
        `based on the severity of the hazard created by the behavior.`,
        `</p>`,
        list,
        `</div>`,
      ].join("");
      return introPara + boxHtml;
    },
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MISH 04 ── Orientation Form 04-A Sign-Off Sheet
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Replace the raw "ORIENTATION CHECKLIST SIGN-OFF SHEET" section with a
 * clean, bordered multi-row sign-off table on its own page break.
 *
 * The source PDF has: NAME / SIGNATURE / DATE / COMPANY / SS # LAST 4
 * as separate lines after the heading.  We replace all of them with a
 * structured 12-row table providing space for 12 employee sign-offs per day.
 */
function injectOrientationForm(html) {
  // Build the 12-row sign-in table
  const rows = Array.from(
    { length: 12 },
    () => `
    <tr>
      <td class="cell-value" style="width:25%">&nbsp;</td>
      <td class="cell-value" style="width:30%">&nbsp;</td>
      <td class="cell-value" style="width:15%">&nbsp;</td>
      <td class="cell-value" style="width:20%">&nbsp;</td>
      <td class="cell-value" style="width:10%">&nbsp;</td>
    </tr>
  `,
  ).join("");

  const form = [
    `<div class="page-break-before"></div>`,
    `<div class="form-standalone-header">`,
    `<span class="form-badge">FORM 04-A</span>`,
    `<span class="form-badge-title">Safety Orientation Record</span>`,
    `</div>`,
    `<p class="form04a-header">FORM 04-A: SAFETY ORIENTATION RECORD</p>`,
    `<p style="font-size:8.5pt;margin:0 0 8pt;margin-left:0;color:#555;">`,
    `Complete one row per employee before they begin work activities. `,
    `This form satisfies the documentation requirement of MISH 04 § 2.2.2.`,
    `</p>`,
    `<table class="orientation-record-table">`,
    `<thead><tr>`,
    `<th style="width:25%">Employee Name (Print)</th>`,
    `<th style="width:30%">Signature</th>`,
    `<th style="width:15%">Date</th>`,
    `<th style="width:20%">Company</th>`,
    `<th style="width:10%">SSN Last 4</th>`,
    `</tr></thead>`,
    `<tbody>`,
    rows,
    `</tbody>`,
    `</table>`,
  ].join("");

  // Replace from the heading to end of section-body but STOP at the qr-footer div
  // so that the QR footer block and closing </body></html> are preserved.
  const replaced = html.replace(
    /(<h4[^>]*>[^<]*ORIENTATION CHECKLIST SIGN.OFF SHEET[^<]*<\/h4>)[\s\S]*?(?=<div class="qr-footer"|<\/body>)/i,
    form,
  );
  // Fallback: the heading might be a paragraph
  if (replaced === html) {
    return html.replace(
      /(<p>[^<]*ORIENTATION CHECKLIST SIGN.OFF SHEET[^<]*<\/p>)[\s\S]*?(?=<div class="qr-footer"|<\/body>)/i,
      form,
    );
  }
  return replaced;
}

// ─────────────────────────────────────────────────────────────────────────────
// MISH 05 ── Pre-Task Plan Form (bordered grid + injured checkboxes)
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Replace the raw "MH CONSTRUCTION PRE-TASK PLAN" form block with a clean,
 * bordered HTML grid.  Key improvements:
 *   - Metadata fields (Date, Supervisor, Location, Scope) in a 2-column grid
 *   - Hazard checklist with proper checkbox columns
 *   - 24-row sign-in table with "Were you injured yesterday? ☐ Yes  ☐ No"
 *     in a dedicated right column so the Safety Coordinator can scan in 2 sec
 */
function injectPtpForm(html) {
  const HAZARDS = [
    "Falls over 6 ft (OR) / 10 ft (WA)",
    "Excavations / Trenching",
    "Confined Space Entry",
    "Hoisting and Rigging",
    "Welding / Cutting",
    "Hazardous Material (SDS Available)",
    "Ladders",
    "Electrical Hazard",
    "Heat / Cold Stress",
    "Other (describe below)",
  ];

  const hazardRows = HAZARDS.map(
    (h) =>
      `<tr>` +
      `<td class="ptp-cb">&#9744;</td>` +
      `<td>${escapeHtml(h)}</td>` +
      `<td style="width:55%"></td>` +
      `</tr>`,
  ).join("");

  // 24 employee rows; two columns per rendered row (12 rows × 2 cols = 24 slots)
  const injuredRows = Array.from(
    { length: 12 },
    () =>
      `<tr>` +
      `<td style="width:30%">&nbsp;</td>` +
      `<td class="ptp-yn">&#9744;&nbsp;Yes &nbsp; &#9744;&nbsp;No</td>` +
      `<td style="width:30%">&nbsp;</td>` +
      `<td class="ptp-yn">&#9744;&nbsp;Yes &nbsp; &#9744;&nbsp;No</td>` +
      `</tr>`,
  ).join("");

  const ptpHtml = [
    `<div class="page-break-before"></div>`,
    `<div class="form-standalone-header">`,
    `<span class="form-badge">FORM 05-B</span>`,
    `<span class="form-badge-title">Pre-Task Plan (PTP)</span>`,
    `</div>`,
    `<div class="ptp-form">`,
    `<div class="ptp-form-header">MH CONSTRUCTION &#x2014; PRE-TASK PLAN (PTP)</div>`,

    // Metadata row
    `<table class="ptp-meta-table">`,
    `<tr>`,
    `<td class="ptp-label">Date</td><td class="ptp-value"></td>`,
    `<td class="ptp-label">Supervisor</td><td class="ptp-value"></td>`,
    `</tr>`,
    `<tr>`,
    `<td class="ptp-label">Location</td><td class="ptp-value"></td>`,
    `<td class="ptp-label">Project No.</td><td class="ptp-value"></td>`,
    `</tr>`,
    `<tr>`,
    `<td class="ptp-label">Scope of Work</td>`,
    `<td class="ptp-value" colspan="3" style="height:36pt;vertical-align:top;padding-top:4pt;"></td>`,
    `</tr>`,
    `</table>`,

    // Hazards section
    `<div class="ptp-section-label">Hazard Identification &#x2014; Check all that apply and describe controls</div>`,
    `<table class="ptp-hazards-table">`,
    `<thead><tr>`,
    `<th style="width:28pt">&#10003;</th>`,
    `<th style="width:35%">Hazard Type</th>`,
    `<th>Controls / Corrective Measures</th>`,
    `</tr></thead>`,
    `<tbody>${hazardRows}</tbody>`,
    `</table>`,

    // PPE row
    `<div class="ptp-section-label">Minimum PPE Required</div>`,
    `<table class="ptp-meta-table">`,
    `<tr>`,
    [
      "Hard Hat",
      "Safety Glasses",
      "Fall Harness + Lanyard",
      "Face Shield",
      "Hi-Vis Vest",
      "Hearing Protection",
      "Other",
    ]
      .map(
        (p) =>
          `<td style="text-align:center;padding:4pt 6pt;border:0.75pt solid #aaa;">&#9744; ${escapeHtml(p)}</td>`,
      )
      .join(""),
    `</tr>`,
    `</table>`,

    // Employee sign-in + injured
    `<div class="ptp-section-label">Employee Sign-In &mdash; Were You Injured Yesterday?</div>`,
    `<table class="ptp-injured-table">`,
    `<thead><tr>`,
    `<th style="width:30%">Employee Name (Print / Sign)</th>`,
    `<th style="width:60pt;text-align:center;">Injured Yesterday?</th>`,
    `<th style="width:30%">Employee Name (Print / Sign)</th>`,
    `<th style="width:60pt;text-align:center;">Injured Yesterday?</th>`,
    `</tr></thead>`,
    `<tbody>${injuredRows}</tbody>`,
    `</table>`,

    `</div>`, // .ptp-form
  ].join("");

  // Anchor: the ALL-CAPS heading "MH CONSTRUCTION PRE-TASK PLAN" becomes a sec-subhead
  // Stop before the qr-footer div to preserve closing structure.
  const replaced = html.replace(
    /(<h4[^>]*>[^<]*MH CONSTRUCTION PRE.TASK PLAN[^<]*<\/h4>)[\s\S]*?(?=<div class="qr-footer"|<\/body>)/i,
    ptpHtml,
  );
  if (replaced !== html) return replaced;

  // Fallback: look for it as a paragraph
  return html.replace(
    /(<p>[^<]*MH CONSTRUCTION PRE.TASK PLAN[^<]*<\/p>)[\s\S]*?(?=<div class="qr-footer"|<\/body>)/i,
    ptpHtml,
  );
}

/**
 * Apply all section-specific post-processing rules based on section number.
 */
function postProcessSectionHtml(html, sectionNumber) {
  if (sectionNumber === 1 || sectionNumber === 2 || sectionNumber === 38) {
    html = injectThreeHourCallout(html, sectionNumber);
  }
  if (sectionNumber === 2) {
    html = injectAddendumATable(html);
    html = injectFormPageBreaks(html);
    html = injectSignatureTables(html); // consolidate individual sig tables → unified bordered table
    html = injectSignatureLines(html);
  }
  if (sectionNumber === 3) {
    html = injectZeroToleranceBox(html);
  }
  if (sectionNumber === 4) {
    html = injectOrientationForm(html);
    html = injectSignatureLines(html);
  }
  if (sectionNumber === 5) {
    html = injectPtpForm(html);
    html = injectSignatureLines(html);
  }
  return html;
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log("🏗  MH Construction — Document Generator");
  console.log("==========================================");

  try {
    switch (template) {
      case "all":
        await generateCover();
        await generateSpine();
        await generateTabs();
        await generateSections();
        break;
      case "cover":
        await generateCover();
        break;
      case "spine":
        await generateSpine();
        break;
      case "tabs":
        await generateTabs();
        break;
      case "sections":
        await generateSections();
        break;
      case "forms":
        await generateForms();
        break;
      case "section":
        if (!sectionNo) {
          console.error(
            "❌  --section <number> required when --template section",
          );
          process.exit(1);
        }
        await generateSections(sectionNo);
        break;
      default:
        // Treat as a standalone form name (e.g. toolbox-talk)
        await generateForm(template);
        break;
    }

    console.log(`\n✅  Done. PDFs written to: documents/output/`);
  } finally {
    if (_browser) await _browser.close();
  }
}

try {
  await main();
} catch (err) {
  console.error("\n❌ Fatal error:", err);
  if (_browser) _browser.close();
  process.exit(1);
}
