#!/usr/bin/env node
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

import puppeteer from 'puppeteer';
import QRCode from 'qrcode';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { readFileSync } from 'fs';
import { join, resolve, dirname, extname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { existsSync } from 'fs';

const SITE_URL   = 'https://www.mhc-gc.com';
const __dirname  = dirname(fileURLToPath(import.meta.url));
const ROOT       = resolve(__dirname, '../..');
const DOCS_DIR   = join(ROOT, 'documents');
const OUTPUT_DIR = join(DOCS_DIR, 'output');
const MANIFEST   = join(DOCS_DIR, 'content/safety-manual.json');

// ── Argument parsing ──────────────────────────────────────────────────────────
const args      = process.argv.slice(2);
const getArg    = (flag) => { const i = args.indexOf(flag); return i !== -1 ? args[i + 1] : null; };
const template    = getArg('--template') || 'all';
const sectionNo   = getArg('--section');
const revDateArg  = getArg('--rev-date');    // e.g. "04/07/2026"
const revNumArg   = getArg('--rev-number');  // e.g. "2"

// ── Brand loader ──────────────────────────────────────────────────────────────
const brandId   = getArg('--brand') || 'mhc';
const BRAND_DIR = join(DOCS_DIR, 'brands');

let BRAND;
try {
  BRAND = JSON.parse(await readFile(join(BRAND_DIR, `${brandId}.json`), 'utf-8'));
} catch {
  console.error(`❌  Brand config not found: documents/brands/${brandId}.json`);
  process.exit(1);
}

// ── Runtime revision overrides (from CLI args or git metadata) ───────────────
const _today = () => {
  const d = new Date();
  return `${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')}/${d.getFullYear()}`;
};
BRAND.revisionDate   = revDateArg   || BRAND.revisionDate   || _today();
BRAND.revisionNumber = revNumArg    || BRAND.revisionNumber || '1';

// ── Logo base64 (used in Puppeteer header templates which need data URLs) ──────
const _logoPath = join(DOCS_DIR, BRAND.logo.color.replace(/^\.\.\//, ''));
let LOGO_COLOR_B64 = '';
try {
  const _logoBuf = await readFile(_logoPath);
  LOGO_COLOR_B64 = `data:image/png;base64,${_logoBuf.toString('base64')}`;
} catch { /* logo file not found — header will render without image */ }

// ── AGC partner logo base64 (used in Puppeteer footer template) ────────────
const _agcPath = join(DOCS_DIR, 'assets/nwagc-logo.png');
let AGC_LOGO_B64 = '';
try {
  const _agcBuf = await readFile(_agcPath);
  AGC_LOGO_B64 = `data:image/png;base64,${_agcBuf.toString('base64')}`;
} catch { /* AGC logo not found — footer will render without it */ }

/**
 * Build a flat token map from the brand config.
 * Every key becomes {{BRAND_KEY}} in templates.
 * Image paths are converted to absolute file:// URLs for Puppeteer.
 */
function buildBrandTokens(brand) {
  const licStr = Object.entries(brand.licenses || {})
    .filter(([, v]) => v)
    .map(([state, num]) => `${state} Lic: ${num}`)
    .join('  ·  ');

  // Helper: convert relative doc paths to base64 data URIs for self-contained HTML.
  // Brand JSON paths are relative to the brands/ directory.
  const resolvePath = (relPath) => {
    if (!relPath) return '';
    const absPath = resolve(BRAND_DIR, relPath);
    try {
      const buf = readFileSync(absPath);
      const ext = extname(absPath).slice(1).toLowerCase();
      const mime = ext === 'svg' ? 'image/svg+xml' : `image/${ext === 'jpg' ? 'jpeg' : ext}`;
      return `data:${mime};base64,${buf.toString('base64')}`;
    } catch {
      // Fallback to file:// URL if file cannot be read
      return pathToFileURL(absPath).href;
    }
  };

  return {
    '{{BRAND_ID}}':                   brand.id,
    '{{BRAND_COMPANY_NAME}}':         brand.companyName,
    '{{BRAND_COMPANY_SHORT}}':        brand.companyShort,
    '{{BRAND_TAGLINE}}':              brand.tagline,
    '{{BRAND_VETERAN}}':              brand.veteranOwned ? 'Veteran-Owned' : '',
    '{{BRAND_ADDRESS}}':              brand.address,
    '{{BRAND_ADDRESS_STREET}}':       brand.addressStreet,
    '{{BRAND_ADDRESS_CITYSTATEZIP}}': brand.addressCityStateZip,
    '{{BRAND_PHONE}}':                brand.phone,
    '{{BRAND_WEBSITE}}':              brand.website,
    '{{BRAND_EMAIL}}':                brand.email,
    '{{BRAND_REVISION_YEAR}}':        brand.revisionYear,
    '{{BRAND_REVISION_DATE}}':         brand.revisionDate   || '',
    '{{BRAND_REVISION_NUMBER}}':       brand.revisionNumber || '1',
    '{{BRAND_LICENSE_WA}}':           brand.licenses?.WA  || '',
    '{{BRAND_LICENSE_OR}}':           brand.licenses?.OR  || '',
    '{{BRAND_LICENSE_ID}}':           brand.licenses?.ID  || '',
    '{{BRAND_LICENSES_INLINE}}':      licStr,
    '{{BRAND_COLOR_PRIMARY}}':        brand.colors.primary,
    '{{BRAND_COLOR_PRIMARY_DARK}}':   brand.colors.primaryDark,
    '{{BRAND_COLOR_PRIMARY_DARKER}}': brand.colors.primaryDarker,
    '{{BRAND_COLOR_PRIMARY_LIGHT}}':  brand.colors.primaryLight,
    '{{BRAND_COLOR_SECONDARY}}':      brand.colors.secondary,
    '{{BRAND_COLOR_SECONDARY_LIGHT}}':brand.colors.secondaryLight,
    '{{BRAND_COLOR_SECONDARY_TEXT}}': brand.colors.secondaryText,
    '{{BRAND_COLOR_BRONZE}}':         brand.colors.bronze,
    '{{BRAND_COLOR_BRONZE_LIGHT}}':   brand.colors.bronzeLight,
    '{{BRAND_COLOR_BRONZE_DARK}}':    brand.colors.bronzeDark,
    '{{BRAND_LOGO_WHITE}}':           resolvePath(brand.logo.white),
    '{{BRAND_LOGO_COLOR}}':           LOGO_COLOR_B64 || resolvePath(brand.logo.color),
    '{{BRAND_LOGO_DARKBG}}':          resolvePath(brand.logo.darkBg),
    '{{BRAND_AGC_HORIZONTAL}}':       resolvePath(brand.partnerLogos?.agcHorizontal || ''),
    '{{BRAND_AGC_STACKED}}':          resolvePath(brand.partnerLogos?.agcStacked    || ''),
    '{{BRAND_QR_DASHBOARD}}':         resolvePath(brand.qrCodes?.dashboard          || ''),
  };
}

const BRAND_TOKENS = buildBrandTokens(BRAND);

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
  if (n === 0) return 'TOC';
  if (n >= 1 && n <= 33) return String(n);
  // 34→A, 35→B, … 44→K
  return String.fromCharCode(65 + (n - 34));
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
  if (n === 0) return null;  // TOC has no tier
  if (n <= 3)  return { num: 1, label: 'Admin Anchor',     desc: 'Senior Management Ownership' };
  if (n <= 9)  return { num: 2, label: 'Field Cadence',    desc: 'Planning & Orientation' };
  if (n <= 37) return { num: 3, label: 'Engineering',      desc: 'OSHA 1926/WAC 296-155' };
  return             { num: 4, label: 'Specialized Risk', desc: 'Subcontractors, CDL & Exposures' };
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
  const titleShort = sectionTitle.length > 40
    ? sectionTitle.slice(0, 37) + '…'
    : sectionTitle;
  const tabRef = sectionToTab(sectionNum);
  const font = '\'Helvetica Neue\',Arial,sans-serif';
  const pad  = 'padding:0 0.75in 0 1.25in';
  return [
    `<div style="width:100%;background:white;border-bottom:1.5pt solid #BD9264;`,
    `${pad};height:0.65in;display:flex;align-items:center;`,
    `justify-content:space-between;font-family:${font};`,
    `-webkit-print-color-adjust:exact;print-color-adjust:exact;box-sizing:border-box;">`,

    // LEFT — section designator + title
    `<div style="flex:1;display:flex;flex-direction:column;justify-content:center;overflow:hidden;">`,
    `<span style="font-size:10pt;font-weight:900;color:#386851;line-height:1;">MISH ${sectionNum}</span>`,
    `<span style="font-size:8pt;font-weight:700;color:#386851;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${titleShort}</span>`,
    `</div>`,

    // CENTER — single high-resolution MHC logo, centered in header block
    `<div style="flex:0 0 auto;display:flex;justify-content:center;align-items:center;padding:0 14pt;">`,
    LOGO_COLOR_B64
      ? `<img src="${LOGO_COLOR_B64}" style="height:34pt;width:auto;" alt="MH Construction" />`
      : `<span style="font-size:13pt;font-weight:900;color:#386851;letter-spacing:0.04em;">MHC</span>`,
    `</div>`,

    // RIGHT — binder tab location + revision metadata
    `<div style="flex:1;display:flex;flex-direction:column;align-items:flex-end;justify-content:center;">`,
    `<span style="font-size:7pt;font-weight:700;color:#BD9264;line-height:1.2;letter-spacing:0.04em;">BINDER LOCATION: TAB ${tabRef}</span>`,
    `<span style="font-size:7.5pt;color:#8A6B49;white-space:nowrap;line-height:1.3;">Rev. ${revNum}&nbsp;|&nbsp;${revDate}</span>`,
    `</div>`,

    `</div>`,
  ].join('');
}

/**
 * Standard footer HTML for all section PDFs.
 * Uses Puppeteer's native <span class="pageNumber"> / <span class="totalPages"> injection.
 */
// PRECISION OVERRIDE 4 — Universal footer per cover page match:
// Left: Company + contact  |  Center: MHC-APP identifier + Veteran Owned + compliance  |  Right: Page
const SECTION_FOOTER_HTML = [
  // Outer container — matches cover-bottom layout (light variant)
  `<div style="width:100%;border-top:0.75pt solid #BD9264;`,
  `padding:0 0.75in 0 1.25in;height:0.65in;display:flex;align-items:center;`,
  `justify-content:space-between;gap:0.2in;font-family:'Helvetica Neue',Arial,sans-serif;`,
  `-webkit-print-color-adjust:exact;print-color-adjust:exact;box-sizing:border-box;">`,

  // LEFT — Company contact (mirrors cover-bottom-left)
  `<div style="flex:1;min-width:0;color:#8A6B49;font-size:8pt;line-height:1.65;">`,
  `<strong style="color:#386851;">MH Construction, Inc.</strong>`,
  `<span style="color:#8A6B49;margin:0 5pt;">|</span>(509) 308-6489<br>`,
  `3111 N. Capitol Ave., Pasco, WA 99301<br>`,
  `www.mhc-gc.com</div>`,

  // RIGHT — Licenses + AGC logo (mirrors cover-bottom-right)
  `<div style="flex-shrink:0;display:flex;align-items:center;gap:0.18in;">`,
  `<div style="text-align:right;font-size:7pt;color:#8A6B49;white-space:nowrap;line-height:1.65;">`,
  `WA Lic: MHCONCI907R7&nbsp;&middot;&nbsp;OR Lic: 765043-99&nbsp;&middot;&nbsp;ID Lic: RCE-49250<br>`,
  `<span style="color:#BD9264;font-weight:700;">Revision 2026</span></div>`,
  AGC_LOGO_B64
    ? `<img src="${AGC_LOGO_B64}" style="height:0.38in;width:auto;display:block;flex-shrink:0;" alt="AGC Member" />`
    : '',
  `</div>`,

  `</div>`,
].join('');

/**
 * Generate a QR code as a base64 PNG data URL for embedding in HTML.
 * Uses the brand primary color for the dark modules.
 */
async function buildQrDataUrl(url) {
  return QRCode.toDataURL(url, {
    type:   'image/png',
    width:  180,
    margin: 1,
    color: {
      dark:  BRAND.colors.primary,
      light: '#ffffff',
    },
    errorCorrectionLevel: 'M',
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
async function renderHtmlToPdf(html, pdfPath, pageOpts = {}, tmpName = '_tmp_render.html') {
  const tmpHtml = join(DOCS_DIR, tmpName);
  await writeFile(tmpHtml, html, 'utf-8');
  await renderPdf(tmpHtml, pdfPath, pageOpts);
  await import('fs').then(fs => fs.default.unlinkSync(tmpHtml));
}

/**
 * Launch (or reuse) a Puppeteer browser instance.
 */
let _browser;
async function getBrowser() {
  if (!_browser) {
    _browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
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
  const page    = await browser.newPage();

  // Load the HTML file via file:// protocol so relative CSS paths resolve
  await page.goto(pathToFileURL(htmlPath).toString(), { waitUntil: 'networkidle0' });

  const defaultOpts = {
    format:             'Letter',
    printBackground:    true,
    preferCSSPageSize:  false,
    margin: {
      top:    '0.75in',
      right:  '0.75in',
      bottom: '0.75in',
      left:   '1.25in',
    },
  };

  await page.pdf({ path: pdfPath, ...defaultOpts, ...pageOpts });
  await page.close();

  const rel = pdfPath.replace(ROOT + '/', '');
  console.log(`  ✓  ${rel}`);
}

// ── Template: Cover ───────────────────────────────────────────────────────────
async function generateCover() {
  console.log('\n📄 Generating cover…');
  await ensureDir(OUTPUT_DIR);
  const raw     = await readFile(join(DOCS_DIR, 'manuals/safety-manual-cover.html'), 'utf-8');
  const html    = applyBrandTokens(raw);
  const pdfPath = join(OUTPUT_DIR, 'safety-manual-cover.pdf');
  await renderHtmlToPdf(html, pdfPath, { margin: { top: 0, right: 0, bottom: 0, left: 0 } }, '_tmp_cover.html');
}

// ── Template: Spine ───────────────────────────────────────────────────────────
async function generateSpine() {
  console.log('\n📐 Generating spine…');
  await ensureDir(OUTPUT_DIR);
  const raw     = await readFile(join(DOCS_DIR, 'manuals/safety-manual-spine.html'), 'utf-8');
  const html    = applyBrandTokens(raw);
  const pdfPath = join(OUTPUT_DIR, 'safety-manual-spine.pdf');
  await renderHtmlToPdf(html, pdfPath, { margin: { top: 0, right: 0, bottom: 0, left: 0 } }, '_tmp_spine.html');
}

// ── Template: Tab Dividers ────────────────────────────────────────────────────
async function generateTabs() {
  console.log('\n🗂  Generating tab dividers…');
  await ensureDir(OUTPUT_DIR);
  const raw     = await readFile(join(DOCS_DIR, 'manuals/safety-manual-tabs.html'), 'utf-8');
  const html    = applyBrandTokens(raw);
  const pdfPath = join(OUTPUT_DIR, 'safety-manual-tabs.pdf');
  await renderHtmlToPdf(html, pdfPath, { margin: { top: 0, right: 0, bottom: 0, left: 0 } }, '_tmp_tabs.html');
}

// ── Template: Section PDFs ────────────────────────────────────────────────────
async function generateSections(filter = null) {
  if (!existsSync(MANIFEST)) {
    console.error('\n❌  safety-manual.json not found. Run `npm run docs:extract` first.');
    process.exit(1);
  }

  const { sections } = JSON.parse(await readFile(MANIFEST, 'utf-8'));
  const sectionsDir  = join(OUTPUT_DIR, 'sections');
  await ensureDir(sectionsDir);

  // Optional: render only a single section
  const targets = filter !== null
    ? sections.filter(s => String(s.number) === String(filter))
    : sections;

  console.log(`\n📑 Generating ${targets.length} section PDF(s)…`);

  const templateHtml = await readFile(join(DOCS_DIR, 'manuals/safety-manual-section.html'), 'utf-8');

  for (const section of targets) {
    // Generate branded QR code pointing to the section's web page
    const sectionUrl   = `${SITE_URL}/resources/safety-manual/section/${section.slug}`;
    const qrDataUrl    = await buildQrDataUrl(sectionUrl);

    // Inject section data + brand tokens; run section-specific post-processing
    let html = applyBrandTokens(
      templateHtml
        .replace(/\{\{SECTION_NUMBER\}\}/g,  section.numberStr)
        .replace(/\{\{SECTION_TITLE\}\}/g,   escapeHtml(section.title))
        .replace(/\{\{SECTION_BODY\}\}/g,    section.number === 0
            ? textToTocHtml(section.body)
            : section.body.trimStart().startsWith('<')
              ? cleanWordHtml(section.body)
              : textToHtml(section.body))
        .replace(/\{\{REVISION_YEAR\}\}/g,   BRAND.revisionYear || '2026')
        .replace(/\{\{TOTAL_SECTIONS\}\}/g,  String(sections.length))
        .replace(/\{\{QR_CODE_DATA_URL\}\}/g, qrDataUrl)
        .replace(/\{\{SECTION_URL\}\}/g,     escapeHtml(sectionUrl))
    );

    // Post-process: 3-Hour Rule callout, Addendum A table, form page breaks
    html = postProcessSectionHtml(html, section.number);

    // Build per-section Puppeteer native header and footer
    const headerHtml = buildSectionHeaderHtml(
      section.numberStr,
      section.title,
      BRAND.revisionNumber,
      BRAND.revisionDate
    );

    const pdfName = `${section.numberStr}-${section.slug}.pdf`;
    const pdfPath = join(sectionsDir, pdfName);
    await renderHtmlToPdf(html, pdfPath, {
      displayHeaderFooter: true,
      headerTemplate:      headerHtml,
      footerTemplate:      SECTION_FOOTER_HTML,
      margin: {
        top:    '1.0in',    // accommodates 0.65in header + 0.35in gap
        right:  '0.75in',
        bottom: '0.9in',    // accommodates 0.65in footer + 0.25in gap
        left:   '1.25in',
      },
    }, `manuals/_tmp_section_${section.numberStr}.html`);
  }
}

// ── Template: Standalone Forms ────────────────────────────────────────────────
async function generateForm(name) {
  const formsDir = join(OUTPUT_DIR, 'forms');
  await ensureDir(formsDir);

  const htmlPath = join(DOCS_DIR, `forms/${name}.html`);
  if (!existsSync(htmlPath)) {
    console.error(`\n❌  Form template not found: forms/${name}.html`);
    process.exit(1);
  }

  console.log(`\n📋 Generating form: ${name}…`);
  const raw     = await readFile(htmlPath, 'utf-8');
  const html    = applyBrandTokens(raw);
  const pdfPath = join(formsDir, `${name}.pdf`);
  await renderHtmlToPdf(html, pdfPath, {}, `forms/_tmp_${name}.html`);
}

// ── Utilities ─────────────────────────────────────────────────────────────────
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
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
function textToTocHtml(text) {
  if (!text) return '';

  const TOC_ARTIFACT = [
    /^--\s*\d+\s*of\s*\d+\s*--$/,
    /^MH CONSTRUCTION\s*$/i,
    /^Industrial Safety and Health Program\s*$/i,
    /^MISH\s+TOC\s*$/i,
    /^Veteran Owned\s*$/i,
    /^MH Construction,?\s*Inc\.?\s*\|/i,
    /^Aligned with AGC/i,
    /^NUMBER\s+TITLE\s+REV/i,
  ];

  const lines  = text.split('\n');
  const parts  = [];
  let   inToc  = false;
  let   lastTier = null;

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;

    // Everything before the TABLE OF CONTENTS heading is preamble — skip it
    if (/^TABLE\s+OF\s+CONTENTS\s*$/i.test(line)) {
      inToc = true;
      parts.push(`<h4 class="sec-subhead">TABLE OF CONTENTS</h4>`);
      continue;
    }
    if (!inToc) continue;

    // Suppress per-page artifact lines
    if (TOC_ARTIFACT.some(p => p.test(line))) continue;

    // "MISH ## Section Title [Rev Date]" — the core TOC entry
    const tocMatch = line.match(/^MISH\s+(\d+)\s+(.+)$/);
    if (tocMatch) {
      const num   = tocMatch[1].padStart(2, '0');
      const numInt = Number(tocMatch[1]);
      // Strip trailing " 2 04/07/2026" style revision/date suffix
      const title = tocMatch[2].replace(/\s+\d+\s+\d{2}\/\d{2}\/\d{4}\s*$/, '').trim();
      const tabRef = sectionToTab(numInt);
      const tier   = sectionToTier(numInt);

      // Insert tier heading when entering a new tier
      if (tier && (!lastTier || lastTier !== tier.num)) {
        parts.push(
          `<div class="toc-tier-heading">` +
          `<span class="toc-tier-label">TIER ${tier.num}</span>` +
          `<span class="toc-tier-desc">${tier.label} — ${tier.desc}</span>` +
          `</div>`
        );
        lastTier = tier.num;
      }

      parts.push(
        `<div class="toc-entry">` +
        `<span class="toc-tab">TAB ${tabRef}</span>` +
        `<span class="toc-number">MISH\u00a0${num}</span>` +
        `<span class="toc-title">${escapeHtml(title)}</span>` +
        `<span class="toc-dots"></span>` +
        `</div>`
      );
      continue;
    }

    // All-caps short lines after the heading become sub-section markers
    if (line.length < 90 && line === line.toUpperCase() && /[A-Z]{2}/.test(line) && !/^\d/.test(line)) {
      parts.push(`<h4 class="sec-subhead">${escapeHtml(line)}</h4>`);
    }
  }

  return parts.join('\n');
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
  if (!html) return '<p><em>No content provided.</em></p>';

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
  out = out.replace(/\s+style="[^"]*"/gi, '');

  // Strip colour/font spans that add no semantic value
  out = out.replace(/<span[^>]*>([^<]*)<\/span>/gi, '$1');

  // Remove empty / whitespace-only paragraphs
  out = out.replace(/<p>(\s|&nbsp;)*<\/p>/gi, '');

  // Remove boilerplate <p> blocks
  out = out.replace(/<p>([\s\S]*?)<\/p>/gi, (match, inner) => {
    const text = inner.replace(/<[^>]+>/g, '').trim();
    if (!text) return '';
    if (STRIP.some(p => p.test(text))) return '';
    return match;
  });

  // Remap heading levels to sec-subhead style
  out = out.replace(/<h[123](\s[^>]*)?>([\s\S]*?)<\/h[123]>/gi,
    (_, attrs, content) => `<h4 class="sec-subhead">${content}</h4>`);

  // Add sec-list class to lists
  out = out.replace(/<(ul|ol)(\s[^>]*)?>/gi, '<$1 class="sec-list">');

  // Add sec-bullet class to list items
  out = out.replace(/<li(\s[^>]*)?>/gi, '<li class="sec-bullet">');

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
  if (!text) return '<p><em>No content extracted. See source PDF.</em></p>';

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

  const lines = text.split('\n');
  const parts = [];
  let para = [];

  const flush = () => {
    if (!para.length) return;
    parts.push(`<p>${para.join(' ')}</p>`);
    para = [];
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { flush(); continue; }
    if (STRIP.some(p => p.test(line))) continue;

    // Dotted section number: "2.3", "2.3.1", "2.3.1.1" — flush-left heading
    const numMatch = line.match(/^(\d+\.\d+(?:\.\d+)*)\s+(.+)$/);
    if (numMatch && line.length < 160) {
      flush();
      parts.push(
        `<div class="sec-num-row">` +
        `<span class="sec-num">${escapeHtml(numMatch[1])}</span>` +
        `<span class="sec-num-text">${escapeHtml(numMatch[2].trim())}</span>` +
        `</div>`
      );
      continue;
    }

    // Bullet point (• character)
    if (line.startsWith('\u2022')) {
      flush();
      parts.push(`<li class="sec-bullet">${escapeHtml(line.slice(1).trim())}</li>`);
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
  let html = parts.join('\n');
  html = html.replace(/(<li[\s\S]*?<\/li>\n?)+/g, m => `<ul class="sec-list">${m}</ul>`);
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
  ].join('');

  if (sectionNumber === 2) {
    // PRECISION OVERRIDE 2 — Visual Field Triggers (MISH 02)
    // The Word-extracted body contains raw <table> wrappers around each 3-HOUR RULE notice.
    // Replace both tables with proper .three-hour-rule-box callout divs so the light-grey
    // background + 2pt MHC Green border renders correctly and the bold-warning achieves 12pt.
    let replaced = false;

    html = html.replace(
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
          ].join('');
        } else {
          return [
            `<div class="three-hour-rule-box no-break">`,
            `<div class="thr-header"><span class="thr-icon">&#9888;</span>&nbsp;3-HOUR RULE &#x2014; TIME-CRITICAL FIELD ACTION</div>`,
            `<div class="thr-body">`,
            `<p class="thr-detail">Upon notification, the employee has exactly <strong>3 HOURS</strong> to report to the designated testing facility and provide a sample.</p>`,
            `<p class="thr-warning">FAILURE TO COMPLY WITHIN THE 3-HOUR WINDOW = DEEMED POSITIVE</p>`,
            `<p class="thr-detail">Failure to appear at the testing location within 3 hours shall be treated as a positive test result &mdash; subject to immediate disciplinary action (&sect;2.6).</p>`,
            `</div></div>`,
          ].join('');
        }
      }
    );

    // If table-based replacement succeeded, skip paragraph-based injection
    if (replaced) return html;

    // Fallback: inject after the 3-hours/sample paragraph if table was not found
    const result = html.replace(
      /(<p>[^<]*3[\s-]*hours?[^<]*(sample|provide|collection)[^<]*<\/p>)/i,
      `$1${callout}`
    );
    if (result !== html) return result;
  }

  if (sectionNumber === 38) {
    // MISH 38 — Commercial Drivers Drug and Alcohol Program
    // Anchor after the random testing paragraph or any testing-related paragraph
    let result = html.replace(
      /(<p>[^<]*random[^<]*test[^<]*<\/p>)/i,
      `$1${callout}`
    );
    if (result !== html) return result;

    // Fallback: anchor after post-accident testing paragraph
    result = html.replace(
      /(<p>[^<]*post.accident[^<]*test[^<]*<\/p>)/i,
      `$1${callout}`
    );
    if (result !== html) return result;

    // Last-resort: insert before the first sec-subhead
    return html.replace(/(<h4 class="sec-subhead">)/, `${callout}$1`);
  }

  // MISH 01 (or MISH 02 final fallback): anchor after the Drug Free Workplace / testing paragraph
  const result = html.replace(
    /(<p>[^<]*Drug Free Workplace[^<]*testing[^<]*<\/p>)/i,
    `$1${callout}`
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
  ].join('');

  // Insert before the ADDENDUM B heading if present; else append
  if (/ADDENDUM[^<]{0,10}B/i.test(html)) {
    return html.replace(
      /(<h4[^>]*>[^<]*ADDENDUM[^<]*B[^<]*<\/h4>)/i,
      `${table}$1`
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
  const makeHeader = (formId, formName) => [
    `<div class="page-break-before"></div>`,
    `<div class="form-standalone-header">`,
    `<span class="form-badge">FORM ${formId}</span>`,
    `<span class="form-badge-title">${formName}</span>`,
    `</div>`,
  ].join('');

  // FORM 02-A — replace the <p><strong>FORM 02-A…</strong></p> paragraph
  html = html.replace(
    /<p><strong>FORM\s+02-A[^<]*<\/strong><\/p>/i,
    makeHeader('02-A', 'Applicant Consent to Drug &amp; Alcohol Testing')
  );

  // FORM 02-B — replace the <p><strong>FORM 02-B…</strong></p> paragraph
  html = html.replace(
    /<p><strong>FORM\s+02-B[^<]*<\/strong><\/p>/i,
    makeHeader('02-B', 'Return-to-Work Agreement')
  );

  return html;
}

/**
 * Replace long underscore sequences with styled non-breaking signature lines.
 */
function injectSignatureLines(html) {
  return html.replace(
    /_{8,}/g,
    '<span class="sig-line-underline"></span>'
  );
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
  ].join('');

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
  ].join('');

  html = html.replace(form02aBlock, form02aTable);

  // ── FORM 02-B ─────────────────────────────────────────────────────────────
  const form02bBlock = [
    `<table><tr><td><p><strong>Employee Name (Print):</strong></p></td><td></td></tr></table>`,
    `<table><tr><td><p><strong>Employee Signature:</strong></p></td><td></td></tr></table>`,
    `<table><tr><td><p><strong>Supervisor Signature:</strong></p></td><td></td>`,
    `<td><p><strong>Today's Date:</strong></p></td><td></td></tr></table>`,
    `<table><tr><td><p><strong>Witness Signature:</strong></p></td><td></td>`,
    `<td><p><strong>HR Representative:</strong></p></td><td></td></tr></table>`,
  ].join('');

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
  ].join('');

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
      ].join('');
      return introPara + boxHtml;
    }
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
  const rows = Array.from({ length: 12 }, (_, i) => `
    <tr>
      <td class="cell-value" style="width:25%">&nbsp;</td>
      <td class="cell-value" style="width:30%">&nbsp;</td>
      <td class="cell-value" style="width:15%">&nbsp;</td>
      <td class="cell-value" style="width:20%">&nbsp;</td>
      <td class="cell-value" style="width:10%">&nbsp;</td>
    </tr>
  `).join('');

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
  ].join('');

  // Replace from the heading to end of section-body but STOP at the qr-footer div
  // so that the QR footer block and closing </body></html> are preserved.
  const replaced = html.replace(
    /(<h4[^>]*>[^<]*ORIENTATION CHECKLIST SIGN.OFF SHEET[^<]*<\/h4>)[\s\S]*?(?=<div class="qr-footer"|<\/body>)/i,
    form
  );
  // Fallback: the heading might be a paragraph
  if (replaced === html) {
    return html.replace(
      /(<p>[^<]*ORIENTATION CHECKLIST SIGN.OFF SHEET[^<]*<\/p>)[\s\S]*?(?=<div class="qr-footer"|<\/body>)/i,
      form
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
    'Falls over 6 ft (OR) / 10 ft (WA)',
    'Excavations / Trenching',
    'Confined Space Entry',
    'Hoisting and Rigging',
    'Welding / Cutting',
    'Hazardous Material (SDS Available)',
    'Ladders',
    'Electrical Hazard',
    'Heat / Cold Stress',
    'Other (describe below)',
  ];

  const hazardRows = HAZARDS.map(h =>
    `<tr>` +
    `<td class="ptp-cb">&#9744;</td>` +
    `<td>${escapeHtml(h)}</td>` +
    `<td style="width:55%"></td>` +
    `</tr>`
  ).join('');

  // 24 employee rows; two columns per rendered row (12 rows × 2 cols = 24 slots)
  const injuredRows = Array.from({ length: 12 }, () =>
    `<tr>` +
    `<td style="width:30%">&nbsp;</td>` +
    `<td class="ptp-yn">&#9744;&nbsp;Yes &nbsp; &#9744;&nbsp;No</td>` +
    `<td style="width:30%">&nbsp;</td>` +
    `<td class="ptp-yn">&#9744;&nbsp;Yes &nbsp; &#9744;&nbsp;No</td>` +
    `</tr>`
  ).join('');

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
      'Hard Hat', 'Safety Glasses', 'Fall Harness + Lanyard',
      'Face Shield', 'Hi-Vis Vest', 'Hearing Protection', 'Other',
    ].map(p => `<td style="text-align:center;padding:4pt 6pt;border:0.75pt solid #aaa;">&#9744; ${escapeHtml(p)}</td>`).join(''),
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
  ].join('');

  // Anchor: the ALL-CAPS heading "MH CONSTRUCTION PRE-TASK PLAN" becomes a sec-subhead
  // Stop before the qr-footer div to preserve closing structure.
  const replaced = html.replace(
    /(<h4[^>]*>[^<]*MH CONSTRUCTION PRE.TASK PLAN[^<]*<\/h4>)[\s\S]*?(?=<div class="qr-footer"|<\/body>)/i,
    ptpHtml
  );
  if (replaced !== html) return replaced;

  // Fallback: look for it as a paragraph
  return html.replace(
    /(<p>[^<]*MH CONSTRUCTION PRE.TASK PLAN[^<]*<\/p>)[\s\S]*?(?=<div class="qr-footer"|<\/body>)/i,
    ptpHtml
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
    html = injectSignatureTables(html);   // consolidate individual sig tables → unified bordered table
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
  console.log('🏗  MH Construction — Document Generator');
  console.log('==========================================');

  try {
    switch (template) {
      case 'all':
        await generateCover();
        await generateSpine();
        await generateTabs();
        await generateSections();
        break;
      case 'cover':
        await generateCover();
        break;
      case 'spine':
        await generateSpine();
        break;
      case 'tabs':
        await generateTabs();
        break;
      case 'sections':
        await generateSections();
        break;
      case 'section':
        if (!sectionNo) {
          console.error('❌  --section <number> required when --template section');
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

main().catch(err => {
  console.error('\n❌ Fatal error:', err);
  if (_browser) _browser.close();
  process.exit(1);
});
