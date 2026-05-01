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
 *   safety-manual-toc.pdf
 *   sections/
 *     01-injury-free-workplace-plan.pdf
 *     …
 *   forms/
 *     toolbox-talk.pdf
 */

import puppeteer from "puppeteer";
import QRCode from "qrcode";
import { PDFDocument } from "pdf-lib";
import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
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

// ── Runtime revision enforcement (master-operator consistency requirement) ───
const ENFORCED_REVISION_DATE = "04/07/2026";
const ENFORCED_REVISION_NUMBER = "3";
BRAND.revisionDate = ENFORCED_REVISION_DATE;
BRAND.revisionNumber = ENFORCED_REVISION_NUMBER;

// ── Logo base64 (used in Puppeteer header templates which need data URLs) ──────
const _logoPath = join(DOCS_DIR, BRAND.logo.color.replace(/^\.\.\//, ""));
let LOGO_COLOR_DATA_URL = "";
try {
  const _logoBuf = await readFile(_logoPath);
  const _logoExt = extname(_logoPath).slice(1).toLowerCase();
  const _logoImageExt = _logoExt === "jpg" ? "jpeg" : _logoExt;
  const _logoMime =
    _logoExt === "svg" ? "image/svg+xml" : `image/${_logoImageExt}`;
  LOGO_COLOR_DATA_URL = `data:${_logoMime};base64,${_logoBuf.toString("base64")}`;
} catch {
  /* logo file not found — header will render without image */
}

// ── BBB Accredited Business seal data URL (SVG preferred, PNG fallback) ───────
const _bbbSvgPath = join(DOCS_DIR, "assets/bbb/bbb-accredited-seal.svg");
const _bbbPngPath = join(DOCS_DIR, "assets/bbb/bbb-accredited-seal.png");
let BBB_LOGO_DATA_URL = "";
try {
  const _bbbSvgBuf = await readFile(_bbbSvgPath);
  BBB_LOGO_DATA_URL = `data:image/svg+xml;base64,${_bbbSvgBuf.toString("base64")}`;
} catch {
  try {
    const _bbbPngBuf = await readFile(_bbbPngPath);
    BBB_LOGO_DATA_URL = `data:image/png;base64,${_bbbPngBuf.toString("base64")}`;
  } catch {
    /* BBB logo not found — footer/template tokens will use brand-config fallback */
  }
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
    "{{BRAND_LOGO_COLOR}}":
      LOGO_COLOR_DATA_URL || resolvePath(brand.logo.color),
    "{{BRAND_LOGO_DARKBG}}": resolvePath(brand.logo.darkBg),
    "{{BRAND_AGC_HORIZONTAL}}": resolvePath(
      brand.partnerLogos?.agcHorizontal || "",
    ),
    "{{BRAND_AGC_STACKED}}": resolvePath(brand.partnerLogos?.agcStacked || ""),
    "{{BRAND_BBB_HORIZONTAL}}":
      BBB_LOGO_DATA_URL || resolvePath(brand.partnerLogos?.bbbHorizontal || ""),
    "{{BRAND_BBB_VERTICAL}}": resolvePath(
      brand.partnerLogos?.bbbVertical || "",
    ),
    "{{BRAND_BBB_SEAL}}":
      BBB_LOGO_DATA_URL || resolvePath(brand.partnerLogos?.bbbSeal || ""),
    "{{BRAND_WA_VOB_LOGO}}": resolvePath(brand.certificationLogos?.waVob || ""),
    "{{BRAND_QR_DASHBOARD}}": resolvePath(brand.qrCodes?.dashboard || ""),
  };
}

const BRAND_TOKENS = buildBrandTokens(BRAND);
const BRAND_LICENSES_INLINE = BRAND_TOKENS["{{BRAND_LICENSES_INLINE}}"];
const BRAND_COLORS = {
  primary: BRAND.colors.primary,
  primaryDark: BRAND.colors.primaryDark,
  secondary: BRAND.colors.secondary,
  secondaryDark: BRAND.colors.secondaryDark,
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
 * Map a MISH section number to its structural MISH reference code.
 * MISH 0.0         — Table of Contents
 * MISH 1.1–1.3     — Tier 1: Admin Anchor        (MISH 01–03)
 * MISH 2.1–2.6     — Tier 2: Field Cadence       (MISH 04–09)
 * MISH 3.1–3.28    — Tier 3: Engineering         (MISH 10–37)
 * MISH 4.1–4.7     — Tier 4: Specialized Risk    (MISH 38–44)
 * MISH 5.1–5.6     — Tier 5: Program Compliance  (MISH 45–50)
 */
function sectionToMishRef(sectionNumber) {
  const n = Number(sectionNumber);
  if (n === 0) return "0.0";
  if (n <= 3) return `1.${n}`;
  if (n <= 9) return `2.${n - 3}`;
  if (n <= 37) return `3.${n - 9}`;
  if (n <= 44) return `4.${n - 37}`;
  return `5.${n - 44}`;
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

// ── TOC Cluster & Callout Configuration ──────────────────────────────────────
/**
 * Operational cluster groupings for the MISH Program Table of Contents.
 * Each entry maps a display name to an inclusive MISH number range [min, max].
 *
 * When safety-manual.json is updated (sections added or removed), generateToc()
 * automatically reflects the changes: sections within a range appear only if
 * they exist in the manifest; sections outside all defined ranges are collected
 * into a catch-all "Additional Programs" cluster appended at the end.
 *
 * To reorganise clusters or rename a heading, update this array and re-run:
 *   npm run docs:generate -- --template toc
 */
const TOC_CLUSTERS = [
  { name: "Program Foundation", min: 1, max: 3 },
  { name: "Field Onboarding & Communication", min: 4, max: 9 },
  { name: "Safety Oversight & Industrial Hygiene", min: 10, max: 19 },
  { name: "Fall & Access Safety", min: 20, max: 24 },
  { name: "Excavation, Confined Spaces & Energy Control", min: 25, max: 27 },
  { name: "Energy & Fire Hazards", min: 28, max: 32 },
  { name: "Motor Vehicles & Heavy Equipment", min: 33, max: 41 },
  { name: "Tools & Materials", min: 42, max: 45 },
  { name: "Program Compliance & Continuity", min: 46, max: 50 },
];

/**
 * MISH item numbers that receive a Tan Leather callout highlight (#BD9264).
 * MISH 21 (Fall Protection) and MISH 48 (Emergency Response Plan) are
 * designated critical safety protocols because fall hazards are the leading
 * cause of construction fatalities (OSHA 1926.502) and emergency response
 * readiness is a mandatory program element for all job sites.
 * Add or remove numbers here to change which entries are highlighted.
 */
const TOC_CALLOUT_ITEMS = new Set([21, 48]);

/**
 * Fallback MISH title map.
 * Used only when safety-manual.json has not yet been generated (i.e., the
 * user has not run `npm run docs:extract`). Keys are section numbers (integer),
 * values are plain-text display titles.
 *
 * Keep this list in sync with the Word source documents so that a standalone
 * `--template toc` run still produces accurate output before extraction.
 */
const FALLBACK_MISH_TITLES = new Map([
  [1, "Safety & Health Program Overview"],
  [2, "Injury-Free Workplace Commitment"],
  [3, "Safety Roles & Responsibilities"],
  [4, "Safety & Health Orientation"],
  [5, "Safety Bulletin Boards & Communication"],
  [6, "Drug & Alcohol Policy & Testing"],
  [7, "Drug & Alcohol Field Operations"],
  [8, "Short-Service Employee Program"],
  [9, "Pre-Job Safety Plan"],
  [10, "Safety & Health Meetings & Inspections"],
  [11, "Accident Reporting & Investigation"],
  [12, "Personal Protective Equipment"],
  [13, "HAZCOM Program"],
  [14, "Industrial Hygiene Program"],
  [15, "Heat Stress"],
  [16, "Respiratory Protection"],
  [17, "Silica Safety Program"],
  [18, "Bloodborne Pathogens"],
  [19, "Housekeeping"],
  [20, "Signs, Signals & Barricades"],
  [21, "Fall Protection"],
  [22, "Scaffolding Use & Handling"],
  [23, "Ladder Use & Care"],
  [24, "Open Floors & Holes"],
  [25, "Excavation, Trenching & Shoring"],
  [26, "Confined Space Entry"],
  [27, "Lockout & Tagout"],
  [28, "Electrical Safety"],
  [29, "Welding, Cutting & Heating"],
  [30, "Flammable & Combustible Liquids"],
  [31, "Fire Prevention"],
  [32, "Compressed Gas & Air"],
  [33, "Motor Vehicle Safety Program"],
  [34, "Distracted Driving & Mobile Device Policy"],
  [35, "Motor Vehicle Records Program"],
  [36, "Equipment Maintenance & Inspection"],
  [37, "Aerial Lifts & Elevated Work Platforms"],
  [38, "Crane & Suspended Work Platforms"],
  [39, "Rigging Procedures"],
  [40, "Forklift & Power Industrial Truck Safety"],
  [41, "Construction Equipment Modification & Fabrication"],
  [42, "Hand & Power Tools"],
  [43, "General Waste Management"],
  [44, "Concrete & Masonry"],
  [45, "Miscellaneous Safety Requirements"],
  [46, "Subcontractor Management Plan"],
  [47, "Insurance Requirements & Contractual Risk Transfer"],
  [48, "Emergency Response Plan"],
  [49, "Incident Investigation & Root-Cause Analysis"],
  [50, "Return-to-Work Program"],
]);

/**
 * Render one <li> entry for a single MISH section.
 * Applies the .callout modifier for items in TOC_CALLOUT_ITEMS.
 * Includes MISH structural reference for binder navigation.
 */
function buildTocEntryHtml(num, title) {
  const code = `MISH ${String(num).padStart(2, "0")}`;
  const mishRef = sectionToMishRef(num);
  const isCallout = TOC_CALLOUT_ITEMS.has(num);
  const cls = isCallout ? "mish-entry callout" : "mish-entry";
  return (
    `<li class="${cls}">` +
    `<span class="mish-code">${escapeHtml(code)}</span>` +
    `<span class="mish-wbs">MISH ${escapeHtml(mishRef)}</span>` +
    `<span class="mish-title">${escapeHtml(title)}</span>` +
    `</li>`
  );
}

/**
 * Render one <div class="cluster"> block.
 * Empty clusters (no live sections) are omitted.
 */
function buildClusterHtml(clusterName, nums, titleMap) {
  if (nums.length === 0) return "";
  const rows = nums.map((n) =>
    buildTocEntryHtml(n, titleMap.get(n) || `Section ${n}`),
  );
  return (
    `<div class="cluster">` +
    `<h2 class="cluster-head">${escapeHtml(clusterName)}</h2>` +
    `<ul class="mish-list">${rows.join("")}</ul>` +
    `</div>`
  );
}

/**
 * Build the full {{TOC_CLUSTERS_HTML}} block from live section data.
 *
 * Algorithm:
 *  1. Walk TOC_CLUSTERS in order; collect section numbers in each range that
 *     are present in presentNums and render a cluster div.
 *  2. Any section numbers not covered by any defined cluster range are
 *     collected into a trailing "Additional Programs" cluster so that newly
 *     added MISH items are never silently dropped from the TOC.
 *
 * @param {Map<number, string>} titleMap   MISH number → display title
 * @param {Set<number>}  presentNums       Section numbers present in manifest
 * @returns {string} HTML injected into {{TOC_CLUSTERS_HTML}}
 */
function buildTocClustersHtml(titleMap, presentNums) {
  const parts = [];
  const assignedNums = new Set();

  for (const cluster of TOC_CLUSTERS) {
    const nums = [];
    for (let n = cluster.min; n <= cluster.max; n++) {
      if (presentNums.has(n)) {
        nums.push(n);
        assignedNums.add(n);
      }
    }
    const html = buildClusterHtml(cluster.name, nums, titleMap);
    if (html) parts.push(html);
  }

  // Catch-all: sections outside every defined range (future additions)
  const overflow = [...presentNums]
    .filter((n) => !assignedNums.has(n))
    .sort((a, b) => a - b);
  const overflowHtml = buildClusterHtml(
    "Additional Programs",
    overflow,
    titleMap,
  );
  if (overflowHtml) parts.push(overflowHtml);

  return parts.join("\n");
}

// ── Puppeteer header / footer templates ────────────────────────────────────
/**
 * Build the per-section running header HTML.
 * Puppeteer injects this into the physical top margin of EVERY printed page.
 * Logo must be a data URL since the header renders in an isolated context.
 *
 * Layout (4 zones, left → right):
 *   ZONE 1  LEFT   — MISH number + MISH reference + title
 *   ZONE 2  CENTER — MHC logo
 *   ZONE 3  RIGHT  — Page bubble (Pg X / Y) + binder tab reference + revision
 *   ZONE 4  FAR R  — Section QR code (thumb-accessible scan target)
 */
function buildSectionHeaderHtml(
  sectionNum,
  sectionTitle,
  revNum,
  revDate,
  qrDataUrl,
) {
  const titleShort =
    sectionTitle.length > 38 ? sectionTitle.slice(0, 35) + "…" : sectionTitle;
  const tabRef = sectionToTab(sectionNum);
  const mishRef = sectionToMishRef(sectionNum);
  const font = "'DIN 2014','Helvetica Neue',Arial,sans-serif";
  const pad = "padding:0 0.55in 0 1.25in";

  // Page bubble — Puppeteer replaces <span class="pageNumber"> / <span class="totalPages">
  const pageBubble = [
    `<span style="display:inline-flex;align-items:center;gap:3pt;`,
    `background:${BRAND_COLORS.primary};color:#fff;padding:2pt 8pt;`,
    `border-radius:9pt;font-size:8pt;font-weight:700;letter-spacing:0.03em;`,
    `white-space:nowrap;margin-bottom:2pt;">`,
    `Pg.\u00a0<span class="pageNumber"></span>\u00a0/\u00a0<span class="totalPages"></span>`,
    `</span>`,
  ].join("");

  const qrMark = qrDataUrl
    ? [
        `<div style="display:flex;flex-direction:column;align-items:center;gap:2pt;`,
        `flex:0 0 auto;padding-left:8pt;">`,
        `<img src="${qrDataUrl}" alt="Scan MISH ${sectionNum}"`,
        ` style="width:32pt;height:32pt;border-radius:2pt;`,
        `border:0.5pt solid ${BRAND_COLORS.secondary};display:block;" />`,
        `<span style="font-size:5pt;font-weight:700;color:${BRAND_COLORS.secondaryText};`,
        `text-transform:uppercase;letter-spacing:0.06em;">MISH ${sectionNum}</span>`,
        `</div>`,
      ].join("")
    : "";

  return [
    `<div style="width:100%;background:white;border-bottom:1.5pt solid ${BRAND_COLORS.secondary};`,
    `${pad};height:0.75in;display:flex;align-items:flex-start;position:relative;`,
    `justify-content:space-between;font-family:${font};padding-top:6pt;`,
    `-webkit-print-color-adjust:exact;print-color-adjust:exact;box-sizing:border-box;gap:8pt;overflow:hidden;">`,

    // ZONE 1 — MISH structural reference chip (matches body card chip) + title
    `<div style="flex:1;min-width:0;display:flex;flex-direction:column;justify-content:flex-start;overflow:hidden;gap:2pt;">`,
    `<span style="display:inline-block;align-self:flex-start;background:${BRAND_COLORS.primary};color:#ffffff;`,
    `font-size:7.5pt;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;`,
    `padding:1.5pt 8pt;border-radius:9pt;line-height:1.1;white-space:nowrap;`,
    `-webkit-print-color-adjust:exact;print-color-adjust:exact;">`,
    `MISH\u00a0${sectionNum}\u00a0\u2014\u00a0MISH\u00a0${mishRef}`,
    `</span>`,
    `<span style="font-size:7.5pt;font-weight:700;color:${BRAND_COLORS.primary};line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${titleShort}</span>`,
    `</div>`,

    // ZONE 2 — MHC logo truly centered via absolute positioning
    `<div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;justify-content:center;align-items:center;pointer-events:none;">`,
    LOGO_COLOR_DATA_URL
      ? `<img src="${LOGO_COLOR_DATA_URL}" style="height:36pt;max-width:144pt;width:auto;object-fit:contain;image-rendering:-webkit-optimize-contrast;" alt="MH Construction" />`
      : `<span style="font-size:12pt;font-weight:900;color:${BRAND_COLORS.primary};letter-spacing:0.04em;">MHC</span>`,
    `</div>`,

    // ZONE 3 — page bubble + tab location + revision
    `<div style="flex:0 0 auto;display:flex;flex-direction:column;align-items:flex-end;justify-content:flex-start;gap:1pt;">`,
    pageBubble,
    `<span style="font-size:6.5pt;font-weight:700;color:${BRAND_COLORS.secondary};line-height:1.2;letter-spacing:0.04em;">BINDER LOCATION: TAB\u00a0${tabRef}</span>`,
    `<span style="font-size:6.5pt;color:${BRAND_COLORS.secondaryText};white-space:nowrap;line-height:1.3;">Rev.\u00a0${revNum}\u00a0${revDate}</span>`,
    `</div>`,

    // ZONE 4 — section QR code
    qrMark,

    `</div>`,
  ].join("");
}

/**
 * Build the per-section footer HTML rendered by Puppeteer on EVERY printed page.
 *
 * UX REFRESH 2026 — clean, cover-aligned footer hierarchy:
 *   Tier 1: Page chip · trademark line · revision
 *   Section QR remains in the header only.
 *
 * Styles are inlined because Puppeteer's footer template runs in an isolated
 * document context with no access to components.css.
 */
function buildSectionFooterHtml() {
  const year = new Date().getFullYear();
  const font = `'DIN 2014','Helvetica Neue',Arial,sans-serif`;
  const contactMeta = "Company Contact";
  const trustMeta = "Accreditation and Trust";
  const trademark = `\u00a9 ${year} ${BRAND.companyName}`;
  // Use precomputed base64 data URLs from BRAND_TOKENS — file:// cannot load in
  // Puppeteer's isolated header/footer context.
  const agcLogo = BRAND_TOKENS["{{BRAND_AGC_HORIZONTAL}}"];
  const bbbLogo = BBB_LOGO_DATA_URL || BRAND_TOKENS["{{BRAND_BBB_SEAL}}"];
  const vobLogo = BRAND_TOKENS["{{BRAND_WA_VOB_LOGO}}"];

  // Cover-matching ribbon: same gradient + 0.22in height (proportional to a running footer)
  const ribbonBar = [
    `<div style="width:100%;height:0.22in;flex-shrink:0;`,
    `background:linear-gradient(90deg,${BRAND_COLORS.primaryDark} 0%,${BRAND_COLORS.primary} 68%,${BRAND_COLORS.secondary} 100%);`,
    `-webkit-print-color-adjust:exact;print-color-adjust:exact;"></div>`,
  ].join("");

  // Cover footer grid: Company Contact (left 57%) | Accreditation & Trust (right)
  // Logo heights scaled from cover (AGC 0.38in→22pt, BBB 0.41in→24pt, VOB 0.55in→28pt)
  const contentRow = [
    `<div style="width:100%;display:grid;grid-template-columns:1.35fr 1fr;align-items:end;`,
    `gap:10pt;padding:4pt 0.75in 5pt 1.25in;background:#ffffff;box-sizing:border-box;">`,

    // LEFT — Company Contact
    `<div style="min-width:0;font-family:${font};line-height:1.3;color:${BRAND_COLORS.primaryDark};">`,
    `<div style="font-size:6pt;letter-spacing:0.13em;text-transform:uppercase;font-weight:800;color:${BRAND_COLORS.secondaryText};margin-bottom:2pt;">${contactMeta}</div>`,
    `<div style="font-size:7.5pt;font-weight:800;color:${BRAND_COLORS.primaryDark};white-space:nowrap;">${BRAND.companyName}</div>`,
    `<div style="font-size:7pt;color:${BRAND_COLORS.secondaryText};white-space:nowrap;">${BRAND.addressStreet}</div>`,
    `<div style="font-size:7pt;color:${BRAND_COLORS.secondaryText};white-space:nowrap;">${BRAND.addressCityStateZip}</div>`,
    `<div style="font-size:7pt;color:${BRAND_COLORS.secondaryText};white-space:nowrap;">${BRAND.phone} \u00b7 ${BRAND.website}</div>`,
    `<div style="font-size:6.5pt;color:${BRAND_COLORS.secondaryText};white-space:nowrap;">${BRAND_LICENSES_INLINE}</div>`,
    `</div>`,

    // CENTER-RIGHT — Accreditation & Trust (mirrors cover .trust block)
    `<div style="min-width:0;display:flex;flex-direction:column;align-items:flex-end;justify-content:flex-end;gap:3pt;font-family:${font};">`,
    `<div style="font-size:6pt;letter-spacing:0.13em;text-transform:uppercase;font-weight:800;color:${BRAND_COLORS.secondaryText};text-align:right;white-space:nowrap;">${trustMeta}</div>`,
    `<div style="display:flex;align-items:flex-end;justify-content:flex-end;gap:9pt;">`,
    agcLogo
      ? `<img src="${agcLogo}" alt="AGC membership" style="height:22pt;width:auto;display:block;" />`
      : `<span style="font-size:6pt;font-weight:700;color:${BRAND_COLORS.secondaryText};">AGC</span>`,
    bbbLogo
      ? `<img src="${bbbLogo}" alt="BBB accredited business" style="height:24pt;width:auto;display:block;" />`
      : `<span style="font-size:6pt;font-weight:700;color:${BRAND_COLORS.secondaryText};">BBB</span>`,
    vobLogo
      ? `<img src="${vobLogo}" alt="Washington certified veteran owned business" style="height:28pt;width:auto;display:block;" />`
      : `<span style="font-size:6pt;font-weight:700;color:${BRAND_COLORS.secondaryText};">VOB</span>`,
    `</div>`,
    `</div>`,

    `</div>`,
  ].join("");

  return [
    `<div style="width:100%;height:100%;font-family:${font};`,
    `box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact;`,
    `display:flex;flex-direction:column;justify-content:flex-end;">`,
    ribbonBar,
    contentRow,
    `</div>`,
  ].join("");
}

function buildQrDataUrl(url) {
  return QRCode.toDataURL(url, {
    type: "image/png",
    width: 300,
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
  if (!process.env.DEBUG_KEEP_HTML) unlinkSync(tmpHtml);
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

  let lastErr;
  for (let attempt = 0; attempt < 2; attempt++) {
    const browser = await getBrowser();
    const page = await browser.newPage();
    try {
      // Load the HTML file via file:// protocol so relative CSS paths resolve
      await page.goto(pathToFileURL(htmlPath).toString(), {
        waitUntil: "load",
        timeout: 60000,
      });

      await page.pdf({ path: pdfPath, ...defaultOpts, ...pageOpts });
      lastErr = undefined;
      break;
    } catch (err) {
      lastErr = err;
      const isRetryable =
        attempt === 0 &&
        err instanceof Error &&
        (err.message.includes("Page.printToPDF") ||
          err.message.includes("Printing failed"));

      if (!isRetryable) {
        throw err;
      }

      if (_browser) {
        await _browser.close().catch(() => {});
        _browser = undefined;
      }
    } finally {
      await page.close().catch(() => {});
    }
  }

  if (lastErr) {
    throw lastErr;
  }

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

// ── Template: MISH Table of Contents ─────────────────────────────────────────
/**
 * Generate the high-fidelity MISH Program Table of Contents PDF.
 *
 * Section titles and the set of present MISH numbers are read from
 * safety-manual.json (the manifest produced by `npm run docs:extract`).
 * If the manifest is absent or unreadable the function falls back to
 * FALLBACK_MISH_TITLES so a standalone `--template toc` run still works
 * before extraction has been performed.
 *
 * Cluster groupings are defined in TOC_CLUSTERS (in generate.mjs).
 * Sections added to or removed from the manifest are automatically reflected
 * the next time this function runs — no manual edits to the template needed.
 *
 * Output: documents/output/safety-manual-toc.pdf
 */
async function generateToc() {
  console.log("\n📋 Generating MISH Table of Contents…");
  await ensureDir(OUTPUT_DIR);

  // ── 1. Resolve section titles ───────────────────────────────────────────
  let titleMap = new Map(FALLBACK_MISH_TITLES);
  let presentNums = new Set(FALLBACK_MISH_TITLES.keys());

  if (existsSync(MANIFEST)) {
    try {
      const { sections } = JSON.parse(await readFile(MANIFEST, "utf-8"));
      // Rebuild from manifest — skip Section 00 (legacy TOC section)
      const liveMap = new Map();
      const liveNums = new Set();
      for (const s of sections) {
        const n = Number(s.number);
        if (n > 0) {
          liveMap.set(n, s.title || `Section ${n}`);
          liveNums.add(n);
        }
      }
      if (liveNums.size > 0) {
        titleMap = liveMap;
        presentNums = liveNums;
        console.log(`  ℹ  Using manifest: ${liveNums.size} section(s) found`);
      }
    } catch {
      console.warn(
        "  ⚠  safety-manual.json unreadable — using fallback titles",
      );
    }
  } else {
    console.log("  ℹ  safety-manual.json not found — using fallback titles");
  }

  // ── 2. Build cluster HTML and inject into template ──────────────────────
  const tocClustersHtml = buildTocClustersHtml(titleMap, presentNums);
  // QR code pointing to the public web TOC page (not the full manual)
  const tocQrDataUrl = await buildQrDataUrl(BRAND.qrCodes.tableOfContents);
  const raw = await readFile(
    join(DOCS_DIR, "manuals/safety-manual-toc.html"),
    "utf-8",
  );
  // Use replaceAll with function form: the template has the placeholder in both
  // the developer comment and the <main> body — .replace() would only hit the
  // comment. Function form also prevents $ in the replacement being interpreted
  // as a special pattern (e.g. $& would re-insert the match).
  const html = applyBrandTokens(raw)
    .replaceAll("{{TOC_CLUSTERS_HTML}}", () => tocClustersHtml)
    .replace("{{QR_TOC_URL}}", tocQrDataUrl);

  // ── 3. Render to PDF ────────────────────────────────────────────────────
  const pdfPath = join(OUTPUT_DIR, "safety-manual-toc.pdf");
  await renderHtmlToPdf(
    html,
    pdfPath,
    {
      displayHeaderFooter: false,
      margin: {
        top: "0.42in",
        right: "0.5in",
        bottom: "0.42in",
        left: "0.5in",
      },
    },
    "manuals/_tmp_toc.html",
  );
  return pdfPath;
}

// ── Template: Tab Dividers ────────────────────────────────────────────────────
/**
 * Generate tab divider PDFs with per-section QR codes.
 *
 * Each tab page in safety-manual-tabs.html contains a {{QR_TAB_NN}} token
 * (where NN is the zero-padded section number 00–44). This function generates
 * a section-specific QR code for each token and injects it before rendering.
 *
 * Tab 00 QR → public MISH Table of Contents URL
 * Tab 01–44 QR → individual section page URL
 */
async function generateTabs() {
  console.log("\n🗂  Generating tab dividers…");
  await ensureDir(OUTPUT_DIR);
  let html = await readFile(
    join(DOCS_DIR, "manuals/safety-manual-tabs.html"),
    "utf-8",
  );

  // ── Replace dashboard QR placeholder in footer (shared across all tabs) ──
  const dashboardQrDataUrl = await buildQrDataUrl(BRAND.qrCodes.dashboard);
  html = html.replaceAll("{{BRAND_QR_DASHBOARD}}", dashboardQrDataUrl);

  // ── Generate and inject per-tab section QR codes ─────────────────────────
  // Tabs 00–44 map to public section URLs; tab 00 = TOC landing page.
  for (let n = 0; n <= 44; n++) {
    const nn = String(n).padStart(2, "0");
    const token = `{{QR_TAB_${nn}}}`;
    if (!html.includes(token)) continue;

    const sectionUrl =
      n === 0
        ? `${SITE_URL}/resources/safety-manual`
        : `${SITE_URL}/resources/safety-manual/section/mish-${nn}`;

    const qrDataUrl = await buildQrDataUrl(sectionUrl);
    html = html.replaceAll(token, qrDataUrl);
  }

  // ── Apply remaining brand tokens ─────────────────────────────────────────
  html = applyBrandTokens(html);

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
        font-family: "DIN 2014", "Segoe UI", Arial, sans-serif;
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
        font-family: "Abolition", "Segoe UI", Arial, sans-serif;
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
        font-family: "DIN 2014", "Segoe UI", Arial, sans-serif;
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
        font-family: "Abolition", "Segoe UI", Arial, sans-serif;
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
        .replaceAll("{{SECTION_MISH_REF}}", sectionToMishRef(section.number))
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
      qrDataUrl,
    );

    // UX REFRESH 2026 — three-tier footer + thumb-zone QR FAB on every page
    const footerHtml = buildSectionFooterHtml();

    const pdfName = `${section.numberStr}-${section.slug}.pdf`;
    const pdfPath = join(sectionsDir, pdfName);
    await renderHtmlToPdf(
      html,
      pdfPath,
      {
        displayHeaderFooter: true,
        headerTemplate: headerHtml,
        footerTemplate: footerHtml,
        margin: {
          top: "1.25in", // accommodates enlarged header logo + 0.35in gap
          right: "0.75in",
          bottom: "1.75in", // clears full footer + line-height buffer (must match @page rule in safety-manual-section.html)
          left: "1.25in",
        },
      },
      `manuals/_tmp_section_${section.numberStr}.html`,
    );
  }

  if (filter === null) {
    // Generate the TOC from the static template
    await generateToc();

    const referenceTarget = join(OUTPUT_DIR, "safety-manual-reference.pdf");
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

  // Normalize known legacy numbering references to the current program range.
  out = out.replaceAll(/\bMISH\s*1-42\b/gi, "MISH 1-50");

  // Remove legacy internal revision year labels from old approval rows.
  out = out.replaceAll(/\bRevision\s*(?:2024|2025)\b/gi, "");

  // Drop any leading approval/program metadata block before the first
  // canonical section heading. Prefer 1.x, then fall back to any dotted heading.
  out = out.replace(/^[\s\S]*?(?=<\w+[^>]*>\s*1\.[\d.]+\s+[A-Z])/i, "");
  out = out.replace(/^[\s\S]*?(?=<\w+[^>]*>\s*\d+\.[\d.]+\b)/i, "");

  // Some Word extractions place legacy approval metadata and the first
  // canonical heading in the same paragraph. Keep only content from 1.x onward.
  out = out.replaceAll(
    /<p>[\s\S]*?\b(1\.\d+(?:\.\d+)*\s+[A-Z][\s\S]*?)<\/p>/gi,
    (_match, keep) => `<p>${keep}</p>`,
  );

  // Remove legacy approval/signature cluster fragments that can remain inline
  // in migrated sections (old "Revision 1 / Approved By / Effective Date").
  out = out.replaceAll(
    /Representative\s+Jeremy\s+Thamert[\s\S]*?Effective\s*Date\s*\d{1,2}\/\d{1,2}\/\d{4}/gi,
    "",
  );
  out = out.replaceAll(
    /Jeremy\s+Thamert[\s\S]*?Number\s+Mish\s+\d+[\s\S]*?Effective\s*Date\s*\d{1,2}\/\d{1,2}\/\d{4}/gi,
    "",
  );

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
 * Classify a single trimmed line of section text and render it as HTML.
 * Returns the rendered HTML string for structural lines (dotted section
 * numbers, numbered list items, bullets, all-caps sub-headings), or `null`
 * if the line should be treated as paragraph prose by the caller.
 */
function renderTextLine(line) {
  // Dotted section number: "2.3", "2.3.1", "2.3.1.1" — flush-left heading
  const numMatch = /^(\d+\.\d+(?:\.\d+)*)\s+(.+)$/.exec(line);
  if (numMatch) {
    return (
      `<div class="sec-num-row">` +
      `<span class="sec-num">${escapeHtml(numMatch[1])}</span>` +
      `<span class="sec-num-text">${escapeHtml(numMatch[2].trim())}</span>` +
      `</div>`
    );
  }

  // Plain numbered list item: "1. Item text…" or "10. Item text…"
  const numListMatch = /^(\d{1,2})\.\s+(.+)$/.exec(line);
  if (numListMatch) {
    return (
      `<div class="sec-num-row">` +
      `<span class="sec-num">${escapeHtml(numListMatch[1])}.</span>` +
      `<span class="sec-num-text">${escapeHtml(numListMatch[2].trim())}</span>` +
      `</div>`
    );
  }

  // Bullet point (• character)
  if (line.startsWith("\u2022")) {
    return `<li class="sec-bullet">${escapeHtml(line.slice(1).trim())}</li>`;
  }

  // All-caps short line → sub-heading (skip bare numbers and strip lines)
  if (
    line.length < 90 &&
    line === line.toUpperCase() &&
    /[A-Z]{2}/.test(line) &&
    !/^\d/.test(line)
  ) {
    return `<h4 class="sec-subhead">${escapeHtml(line)}</h4>`;
  }

  return null;
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

  // Normalize known legacy numbering references to the current program range.
  text = text.replaceAll(/\bMISH\s*1-42\b/gi, "MISH 1-50");

  // Remove legacy internal revision year labels from old approval rows.
  text = text.replaceAll(/\bRevision\s*(?:2024|2025)\b/gi, "");

  // Strip everything from the start of the body up to the first canonical
  // section heading. Prefer "1.x ..." to avoid retaining legacy approval rows
  // that often include "3.0 April 2026 ..." before the true body.
  const firstSectionIdx = text.search(/\b1\.\d+(?:\.\d+)*\s+[A-Z]/);
  if (firstSectionIdx > 0) {
    text = text.slice(firstSectionIdx);
  } else {
    const bodyTrimRx =
      /(?=\b(?:PURPOSE|GENERAL|SCOPE|MISSION|PLAN\s+ELEMENTS)\b)/;
    const trimIdx = text.search(bodyTrimRx);
    if (trimIdx > 0) text = text.slice(trimIdx);
  }

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
    // Approval block fragments (names, roles, metadata)
    /^Jeremy Thamert\s*$/i,
    /^Matt Ramsey\s*$/i,
    /^President\s*(?:&|and)\s*Owner\s*$/i,
    /^President.*Safety Officer\s*$/i,
    /^AGC Representative\s*(?:&|and)\s*Safety Officer\s*$/i,
    /^Travelers Risk Control Consultant\s*$/i,
    /^AGC Representative\s*$/i,
    /^Signature\s*\/\s*Date\s*$/i,
    /^Name\s+Date\s*$/i,
    /^Effective\s*Date\s*$/i,
    /^Approved\s*By\s*$/i,
    /^Page\s+\d+\s+of\s+\d+\s*$/i,
    /^Mh Construction Industrial Safety And Health Program/i,
    /^Number\s+Mish\s+/i,
    /^Revision\s+\d+\s*$/i,
  ];

  // Source-PDF signature blocks: extract long inline phrases that represent
  // form sign-off rows and replace them with sentinel tokens. Tokens are
  // post-rendered into branded .sig-container blocks below.
  const SIG_BLOCK_PATTERNS = [
    {
      token: "@@SIG_ORIENTATION@@",
      regex:
        /Orientation Checklist Sign[-\s]?Off Sheet\s+NAME\s+Signature\s+DATE\s+Company\s+Ss\s*#\s*Last\s*4/gi,
    },
    {
      token: "@@SIG_APPLICANT@@",
      regex:
        /Applicant Name\s*\(please print\)[\s\S]{0,80}?Today['\u2019]?s Date\s+Employer\s+M[hH]\s+Construction/gi,
    },
    {
      token: "@@SIG_NAMESIGDATE@@",
      // Standalone "Name Signature Date" sign-off line at end of a consent
      // paragraph (drug & alcohol acknowledgements). May be preceded by a
      // long underscore form-blank line, end of sentence, or line break.
      // Lookbehind preserves the boundary character so prose isn't truncated.
      regex: /(?<=[.\n_])[ \t_]*Name\s+Signature\s+Date(?=\s|$)/g,
    },
  ];
  for (const { token, regex } of SIG_BLOCK_PATTERNS) {
    text = text.replace(regex, `\n\n${token}\n\n`);
  }

  // Some extracted section bodies arrive as one long line. Reconstruct
  // logical line breaks for WBS numbering and common bullet glyphs.
  const normalized = text
    // Strip lines that consist entirely of underscores (form blank-fill rows from source PDFs)
    // Must run before the per-char underscore strip so the whole line disappears cleanly.
    .replaceAll(/^[ \t]*_{5,}[ \t]*$/gm, "")
    // Strip any remaining inline underscore runs (e.g. "Name: ________")
    .replaceAll(/_{5,}/g, "")
    // Bullet glyphs → newline + standard bullet
    .replaceAll(/\s+([\u2022\u25AA\u25CF\u25E6\uF0B7])\s*/g, "\n\u2022 ")
    // WBS dotted numbers: "1.0 HEADING", "2.1.3 Sub-item"
    .replaceAll(/\s(?=\d+\.\d+(?:\.\d+)*\s+[A-Z(])/g, "\n")
    // Plain numbered list items: "1. Item" or "10. Item"
    .replaceAll(/\s(?=\d{1,2}\.\s+[A-Z(])/g, "\n")
    // ALL-CAPS section headings followed by a period: "GENERAL. " "MISSION. "
    .replaceAll(/\s(?=[A-Z]{2}[A-Z\s]*\.\s+[A-Z(])/g, "\n")
    // Split Training & Reference Resources section into individual lines
    .replaceAll(/\s+(?=Training\s*&\s*Reference\s*Resources)/gi, "\n")
    .replaceAll(
      /\s+(?=Travelers\s+(?:Risk\s+Control|Training\s+Library):)/gi,
      "\n",
    )
    .replaceAll(/\s+(?=OSHA\s+Reference:)/gi, "\n")
    .replaceAll(/\s+(?=AGC\s+Safety\s+Resources:)/gi, "\n")
    .replaceAll(/\s+(?=WISHA\s*\/)/gi, "\n")
    .replaceAll(/\s+(?=NOTE:\s+WISHA)/gi, "\n")
    // Signature/header table artifacts on same line as content — strip them
    .replaceAll(/\s*_{3,}\s*\/\s*Date\s*/g, "");

  const lines = normalized.split("\n");
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

    const rendered = renderTextLine(line);
    if (rendered !== null) {
      flush();
      parts.push(rendered);
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

  // Replace signature sentinel tokens with branded sig-container blocks.
  // The token may have been wrapped as <p> or as <h4 class="sec-subhead"> by
  // renderTextLine() (since it's all-caps), so accept either wrapper.
  const sigTokenRx = (token) =>
    new RegExp(`<(?:p|h4[^>]*)>${token}</(?:p|h4)>`, "g");
  html = html.replace(
    sigTokenRx("@@SIG_ORIENTATION@@"),
    buildSigContainer({
      title: "Orientation Checklist — Sign-Off Sheet",
      icon: "✍",
      columns: ["Name", "Signature", "Date", "Company", "SS# (Last 4)"],
      rows: 6,
    }),
  );
  html = html.replace(
    sigTokenRx("@@SIG_APPLICANT@@"),
    buildSigContainer({
      title: "Applicant Consent — Drug & Alcohol Testing",
      icon: "✍",
      columns: [
        "Applicant Name (Print)",
        "Applicant Signature",
        "Witness Signature",
        "SS#",
        "Date",
      ],
      rows: 3,
      footer: "Employer: MH Construction, Inc.",
    }),
  );
  html = html.replace(
    sigTokenRx("@@SIG_NAMESIGDATE@@"),
    buildSigContainer({
      title: "Acknowledgement — Sign & Date",
      icon: "✍",
      columns: ["Name", "Signature", "Date"],
      rows: 3,
    }),
  );
  return html;
}

/**
 * Build a branded signature container (matches binder-tab visual treatment).
 * Renders a primary-green header bar with white text + a blank entry table.
 */
function buildSigContainer({ title, icon, columns, rows = 4, footer }) {
  const head = columns
    .map((c) => `<th scope="col">${escapeHtml(c)}</th>`)
    .join("");
  const blankRow = `<tr>${columns.map(() => "<td>&nbsp;</td>").join("")}</tr>`;
  const body = Array(rows).fill(blankRow).join("");
  const footHtml = footer
    ? `<div class="sig-container-footer">${escapeHtml(footer)}</div>`
    : "";
  return [
    `<div class="sig-container">`,
    `<div class="sig-container-header">`,
    `<span class="sig-container-icon" aria-hidden="true">${icon}</span>`,
    `<span>${escapeHtml(title)}</span>`,
    `</div>`,
    `<table class="sig-container-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`,
    footHtml,
    `</div>`,
  ].join("");
}

/**
 * Build a branded reference-data container (matches binder-tab visual style).
 * Same green gradient header as .sig-container, but populated with reference
 * data rows. Use for OSHA threshold tables, fall-protection trigger heights,
 * heat-stress index, electrical approach boundaries, etc.
 *
 * @param {object} cfg
 * @param {string}   cfg.title
 * @param {string}   cfg.icon
 * @param {string[]} cfg.columns
 * @param {Array<Array<string>>} cfg.data   — array of row arrays
 * @param {string=}  cfg.footer             — optional footnote (italic)
 */
function buildDataContainer({ title, icon, columns, data, footer }) {
  const head = columns
    .map((c) => `<th scope="col">${escapeHtml(c)}</th>`)
    .join("");
  const body = data
    .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
    .join("");
  const footHtml = footer
    ? `<div class="data-container-footer">${footer}</div>`
    : "";
  return [
    `<div class="data-container">`,
    `<div class="data-container-header">`,
    `<span class="data-container-icon" aria-hidden="true">${icon}</span>`,
    `<span>${escapeHtml(title)}</span>`,
    `</div>`,
    `<table class="data-container-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`,
    footHtml,
    `</div>`,
  ].join("");
}

// ── Canonical reference data tables (anchored per-section) ───────────────────

const REF_FALL_TRIGGER_HEIGHTS = buildDataContainer({
  title: "Fall-Protection Trigger Heights — Quick Reference",
  icon: "▲",
  columns: ["Activity / Surface", "Trigger Height", "Standard"],
  data: [
    ["General Construction", "6 ft (1.8 m)", "29 CFR 1926.501"],
    ["Steel Erection", "15 ft (4.6 m)", "29 CFR 1926.760"],
    ["Scaffolding", "10 ft (3.0 m)", "29 CFR 1926.451"],
    ["Residential Construction", "6 ft (1.8 m)", "29 CFR 1926.501(b)(13)"],
    ["Stairways &amp; Ladders", "4 ft (1.2 m)", "29 CFR 1926.1052"],
    ["Excavation Edge", "6 ft (1.8 m)", "29 CFR 1926.501(b)(7)"],
    ["Hoist Areas", "Any height with opening", "29 CFR 1926.501(b)(3)"],
  ],
  footer:
    "Always provide fall protection at the lower of the listed trigger or the level required by job-specific JHA.",
});

const REF_CONFINED_SPACE_ATMOSPHERE = buildDataContainer({
  title: "Permit-Required Confined Space — Atmospheric Action Levels",
  icon: "⚠",
  columns: ["Hazard", "Acceptable Range", "Action Level"],
  data: [
    ["Oxygen (O₂)", "19.5% – 23.5%", "STOP &amp; ventilate / re-test"],
    ["Lower Explosive Limit", "&lt; 10% LEL", "Evacuate; correct source"],
    ["Carbon Monoxide (CO)", "&lt; 25 ppm", "Evacuate; ventilate"],
    [
      "Hydrogen Sulfide (H₂S)",
      "&lt; 10 ppm (TWA)",
      "Evacuate; SCBA required &gt; 10 ppm",
    ],
    [
      "Other toxic / IDLH",
      "&lt; PEL per SDS",
      "Use respiratory PPE per SDS &amp; JHA",
    ],
  ],
  footer:
    "Calibrated 4-gas meter required prior to entry and continuously while occupied. Test bottom, middle, and top of space.",
});

const REF_HEAT_INDEX_TIERS = buildDataContainer({
  title: "Heat-Index Action Tiers — On-Site Response",
  icon: "☀",
  columns: ["Heat Index", "Risk Tier", "Required Controls"],
  data: [
    [
      "&lt; 91°F",
      "Caution",
      "Standard hydration; encourage water breaks every 60 min",
    ],
    [
      "91 – 103°F",
      "Extreme Caution",
      "Hourly water breaks; shaded rest areas; buddy-check protocol",
    ],
    [
      "103 – 115°F",
      "Danger",
      "Mandatory 15-min rest each hour in shade; supervisor monitoring; modified work pace",
    ],
    [
      "&gt; 115°F",
      "Extreme Danger",
      "Stop non-essential work; re-schedule; emergency-response plan active",
    ],
  ],
  footer:
    "Heat Index = combined air temperature + relative humidity. Use NWS chart or InspectionApp; account for direct sun and PPE adjustments.",
});

const REF_ELECTRICAL_APPROACH = buildDataContainer({
  title: "Electrical Approach Boundaries — Qualified vs. Unqualified",
  icon: "⚡",
  columns: [
    "Voltage Range (Phase-to-Phase)",
    "Limited Approach",
    "Restricted Approach",
  ],
  data: [
    ["50 V – 750 V", "3 ft 6 in", "1 ft 0 in"],
    ["751 V – 15 kV", "5 ft 0 in", "2 ft 2 in"],
    ["15.1 kV – 36 kV", "6 ft 0 in", "2 ft 7 in"],
    ["36.1 kV – 46 kV", "8 ft 0 in", "2 ft 9 in"],
    ["46.1 kV – 72.5 kV", "8 ft 0 in", "3 ft 3 in"],
  ],
  footer:
    "Distances per NFPA 70E. Unqualified personnel must remain outside the Limited Approach boundary unless escorted by a qualified person.",
});

const REF_NOISE_EXPOSURE = buildDataContainer({
  title: "Occupational Noise Exposure — Permissible Limits",
  icon: "♪",
  columns: ["Sound Level (dBA, slow)", "Max Daily Duration", "Required Action"],
  data: [
    ["80 dBA", "Unlimited", "Hearing-conservation awareness"],
    [
      "85 dBA",
      "8 hours (Action Level)",
      "Enroll in HCP; offer hearing protection &amp; annual audiogram",
    ],
    ["90 dBA", "8 hours (PEL)", "Hearing protection mandatory"],
    [
      "95 dBA",
      "4 hours",
      "Hearing protection mandatory; engineering controls evaluated",
    ],
    ["100 dBA", "2 hours", "Double hearing protection considered"],
    ["105 dBA", "1 hour", "Double protection required"],
    ["115 dBA", "15 minutes", "Maximum exposure ceiling"],
  ],
  footer:
    "Per OSHA 29 CFR 1910.95 and WAC 296-817. Noise exposure averaged over an 8-hour TWA. Impact/impulse noise must not exceed 140 dB peak SPL.",
});

const REF_RESPIRATOR_APF = buildDataContainer({
  title: "Assigned Protection Factors (APF) — Respirator Selection",
  icon: "◉",
  columns: ["Respirator Type", "APF", "Typical Use"],
  data: [
    [
      "Filtering Facepiece / Half-Mask (Air-Purifying)",
      "10",
      "Nuisance dust, low-level particulate",
    ],
    [
      "Full Facepiece (Air-Purifying)",
      "50",
      "Higher particulate / vapor concentrations",
    ],
    [
      "Powered Air-Purifying Respirator (PAPR), Loose-Fitting Hood",
      "25",
      "Comfort use, general dust",
    ],
    [
      "PAPR, Tight-Fitting Full Facepiece",
      "1,000",
      "High particulate, lead, silica abatement",
    ],
    [
      "Supplied-Air Respirator, Demand Mode (Half-Mask)",
      "10",
      "Limited continuous-flow use",
    ],
    [
      "Supplied-Air Respirator, Pressure-Demand (Full Facepiece)",
      "1,000",
      "Welding fume, abrasive blasting",
    ],
    [
      "Self-Contained Breathing Apparatus (SCBA), Pressure-Demand",
      "10,000",
      "IDLH atmospheres, confined-space rescue",
    ],
  ],
  footer:
    "Per OSHA 29 CFR 1910.134(d)(3)(i)(A), Table 1. Maximum Use Concentration (MUC) = APF × PEL. Fit-testing required for all tight-fitting respirators.",
});

const REF_LADDER_DUTY_RATINGS = buildDataContainer({
  title: "Ladder Duty Ratings — ANSI A14 / OSHA Selection",
  icon: "‖",
  columns: ["Class", "Duty Rating", "Capacity (lbs)", "Typical Use"],
  data: [
    [
      "Type IAA",
      "Special Duty",
      "375",
      "Heavy industrial, rugged construction",
    ],
    [
      "Type IA",
      "Extra Heavy Duty",
      "300",
      "Industrial, professional construction",
    ],
    ["Type I", "Heavy Duty", "250", "General industrial &amp; trade work"],
    ["Type II", "Medium Duty", "225", "Light commercial, painting"],
    [
      "Type III",
      "Light Duty",
      "200",
      "Household — NOT permitted on MH job-sites",
    ],
  ],
  footer:
    "Per ANSI A14.1/A14.2/A14.5. MH Construction job-sites require Type IA or better. Capacity includes worker, clothing, tools, and materials carried.",
});

const REF_FLAMMABLE_CLASSIFICATION = buildDataContainer({
  title: "Flammable & Combustible Liquid Classification",
  icon: "◆",
  columns: ["Class", "Flash Point", "Boiling Point", "Examples"],
  data: [
    ["IA", "&lt; 73°F", "&lt; 100°F", "Diethyl ether, pentane"],
    ["IB", "&lt; 73°F", "≥ 100°F", "Gasoline, acetone, toluene"],
    ["IC", "73°F – &lt; 100°F", "—", "Mineral spirits, xylene"],
    ["II", "100°F – &lt; 140°F", "—", "Diesel fuel, kerosene"],
    ["IIIA", "140°F – &lt; 200°F", "—", "Heating oil, paint thinners"],
    ["IIIB", "≥ 200°F", "—", "Lubricating oils, motor oil"],
  ],
  footer:
    "Per NFPA 30 / OSHA 29 CFR 1910.106. Class I = Flammable; Class II/III = Combustible. Storage quantities and container types governed by class.",
});

const REF_AERIAL_LIFT_CLEARANCE = buildDataContainer({
  title: "Minimum Clearance From Energized Power Lines — Aerial Work",
  icon: "⚠",
  columns: [
    "Voltage Range (Phase-to-Phase)",
    "Min. Clearance (Operating)",
    "Min. Clearance (Transit)",
  ],
  data: [
    ["0 – 50 kV", "10 ft", "4 ft"],
    ["50 – 200 kV", "15 ft", "10 ft"],
    ["200 – 350 kV", "20 ft", "15 ft"],
    ["350 – 500 kV", "25 ft", "20 ft"],
    ["500 – 750 kV", "35 ft", "25 ft"],
    ["750 – 1000 kV", "45 ft", "35 ft"],
  ],
  footer:
    "Per OSHA 29 CFR 1910.333(c)(3) Table S-5 and 1926.1408. If voltage is unknown, assume the highest possible class. Spotter required for all lifts within twice the listed clearance.",
});

const REF_SAFETY_SIGN_COLORS = buildDataContainer({
  title: "Safety Sign & Tag Colors — ANSI Z535 / OSHA",
  icon: "▣",
  columns: ["Color", "Signal Word", "Use / Hazard Level"],
  data: [
    [
      "Red",
      "DANGER",
      "Imminent hazard — will result in death or serious injury",
    ],
    [
      "Orange",
      "WARNING",
      "Hazardous situation — could result in death or serious injury",
    ],
    [
      "Yellow",
      "CAUTION",
      "Hazardous situation — could result in minor or moderate injury",
    ],
    [
      "Green",
      "SAFETY / FIRST AID",
      "Safety equipment, emergency egress, first-aid station",
    ],
    [
      "Blue",
      "NOTICE",
      "Information not directly hazard-related (policy, instruction)",
    ],
    [
      "Fluorescent Orange / Red",
      "BIOHAZARD",
      "Biological hazard, contaminated PPE/waste",
    ],
  ],
  footer:
    "Per ANSI Z535.1 / Z535.2 and OSHA 29 CFR 1910.145. Letter height for Exit signs ≥ 6 in., principal stroke ≥ ¾ in.",
});

const REF_SCAFFOLD_DUTY_CLASSES = buildDataContainer({
  title: "Scaffold Load-Duty Classifications",
  icon: "▦",
  columns: ["Duty Class", "Intended Load (per sq. ft.)", "Typical Use"],
  data: [
    [
      "Light Duty",
      "25 lbs / sq. ft.",
      "Workers + light hand tools (painting, inspection)",
    ],
    [
      "Medium Duty",
      "50 lbs / sq. ft.",
      "Workers + materials (plastering, masonry)",
    ],
    [
      "Heavy Duty",
      "75 lbs / sq. ft.",
      "Workers + heavy materials (stone setting, brick)",
    ],
    [
      "Special Duty",
      "&gt; 75 lbs / sq. ft.",
      "Engineered design required; PE-stamped drawings",
    ],
  ],
  footer:
    "Per OSHA 29 CFR 1926.451(a). Scaffolds and components shall support their own weight + 4× the maximum intended load without failure. Working planks must be scaffold-grade lumber.",
});

const REF_WELDING_FILTER_SHADES = buildDataContainer({
  title: "Welding & Cutting — Minimum Filter Lens Shade",
  icon: "◑",
  columns: ["Operation", "Electrode / Plate Size", "Min. Shade Number"],
  data: [
    ["Shielded Metal Arc (SMAW)", "Up to 5/32 in. electrode", "10"],
    ["Shielded Metal Arc (SMAW)", "5/32 – 1/4 in. electrode", "12"],
    ["Gas Metal Arc / Flux-Cored (GMAW/FCAW)", "Up to 1/4 in.", "11"],
    ["Gas Tungsten Arc (GTAW / TIG)", "Light-current work", "10"],
    ["Carbon Arc Cutting / Air Arc", "Heavy", "14"],
    ["Plasma Arc Cutting", "Light (≤ 300 A)", "9"],
    ["Oxy-Fuel Cutting", "Light (plate &lt; 1 in.)", "3 – 4"],
    ["Oxy-Fuel Cutting", "Heavy (plate &gt; 6 in.)", "5 – 6"],
    ["Torch Brazing / Soldering", "—", "3 – 4"],
  ],
  footer:
    "Per OSHA 29 CFR 1910.252(b)(2)(ii) Table Q-2 and ANSI Z49.1. Use next-darker shade if vision strain occurs. Auto-darkening lenses must meet ANSI Z87.1+.",
});

const REF_FIRE_EXTINGUISHER_CLASSES = buildDataContainer({
  title: "Portable Fire Extinguisher Classes",
  icon: "▲",
  columns: ["Class", "Fuel Type", "Recommended Agent"],
  data: [
    [
      "A",
      "Ordinary combustibles — wood, paper, cloth, trash",
      "Water, foam, dry chemical (ABC)",
    ],
    [
      "B",
      "Flammable liquids &amp; gases — gasoline, oil, propane",
      "Foam, CO₂, dry chemical (BC or ABC)",
    ],
    [
      "C",
      "Energized electrical equipment",
      "CO₂, dry chemical (BC or ABC) — non-conductive",
    ],
    [
      "D",
      "Combustible metals — magnesium, sodium, titanium",
      "Specialty dry powder (Class D only)",
    ],
    [
      "K",
      "Cooking media — animal/vegetable oils &amp; fats",
      "Wet chemical (potassium acetate)",
    ],
  ],
  footer:
    "Per NFPA 10 and OSHA 29 CFR 1910.157. Job-site extinguishers must be inspected monthly and serviced annually. MH standard: minimum 2A:10B:C rating per 3,000 sq. ft. of work area.",
});

const REF_DOT_DRUG_TEST_TYPES = buildDataContainer({
  title: "DOT/FMCSA Controlled-Substance Test Categories — Commercial Drivers",
  icon: "◉",
  columns: ["Test Type", "When Required", "Driver Action Window"],
  data: [
    [
      "Pre-Employment",
      "Before performing any safety-sensitive function",
      "Negative result on file before first dispatch",
    ],
    [
      "Random",
      "Unannounced, computer-selected throughout the year",
      "Report to collection site immediately upon notice",
    ],
    [
      "Post-Accident",
      "Following any DOT-recordable accident",
      "Alcohol within 8 hours; drugs within 32 hours",
    ],
    [
      "Reasonable Suspicion",
      "Trained supervisor observes signs of impairment",
      "Test conducted as soon as possible after observation",
    ],
    [
      "Return-to-Duty",
      "After any policy violation, before resuming driving",
      "Negative test required after SAP evaluation",
    ],
    [
      "Follow-Up",
      "Per Substance Abuse Professional (SAP) plan",
      "Minimum 6 unannounced tests in first 12 months",
    ],
  ],
  footer:
    "Per 49 CFR Part 382 (FMCSA) and 49 CFR Part 40 (DOT). Refusal to test or failure to comply within the specified window is treated as a positive result.",
});

const REF_GHS_PICTOGRAMS = buildDataContainer({
  title: "GHS Hazard Pictograms — SDS & Container Labels",
  icon: "◆",
  columns: ["Pictogram (Name)", "Hazard Class", "Examples"],
  data: [
    [
      "Health Hazard",
      "Carcinogen, mutagen, reproductive toxin, respiratory sensitizer",
      "Crystalline silica, asbestos, formaldehyde",
    ],
    [
      "Flame",
      "Flammable, self-reactive, pyrophoric, self-heating",
      "Gasoline, acetone, propane",
    ],
    [
      "Exclamation Mark",
      "Irritant (skin/eye), narcotic effect, respiratory tract irritant",
      "Cleaning agents, paints, ammonia",
    ],
    [
      "Gas Cylinder",
      "Gases under pressure (compressed, liquefied, dissolved)",
      "Oxygen, acetylene, nitrogen, propane cylinders",
    ],
    [
      "Corrosion",
      "Skin corrosion / burns, eye damage, corrosive to metals",
      "Sulfuric acid, sodium hydroxide, muriatic acid",
    ],
    [
      "Exploding Bomb",
      "Explosives, self-reactives, organic peroxides",
      "Blasting agents, ammonium nitrate",
    ],
    [
      "Flame Over Circle",
      "Oxidizers (solid, liquid, gas)",
      "Hydrogen peroxide, nitric acid, oxygen",
    ],
    [
      "Skull &amp; Crossbones",
      "Acute toxicity (severe) — fatal or toxic",
      "Hydrogen sulfide, methanol, lead compounds",
    ],
    [
      "Environment (non-mandatory)",
      "Aquatic toxicity",
      "Pesticides, solvents, heavy metals",
    ],
  ],
  footer:
    "Per OSHA 29 CFR 1910.1200 (HCS 2012) aligned with UN GHS Rev. 7. All hazardous chemical containers must display the appropriate pictogram(s), signal word, and hazard statements.",
});

const REF_OSHA_SOIL_CLASSIFICATION = buildDataContainer({
  title: "OSHA Soil Classification — Sloping & Benching Requirements",
  icon: "▲",
  columns: ["Soil Type", "Description", "Max Allowable Slope (H : V)"],
  data: [
    [
      "Stable Rock",
      "Natural solid mineral matter; remains intact while exposed",
      "90° (vertical)",
    ],
    [
      "Type A",
      "Cohesive soils — clay, silty clay, sandy clay, hardpan (≥ 1.5 tsf)",
      "0.75 : 1 (53° from horizontal)",
    ],
    [
      "Type B",
      "Cohesive (0.5 – 1.5 tsf), granular cohesionless, previously disturbed soils",
      "1 : 1 (45° from horizontal)",
    ],
    [
      "Type C",
      "Granular soils (gravel, sand, loamy sand), submerged soil, soil with seeping water",
      "1.5 : 1 (34° from horizontal)",
    ],
    [
      "Layered (C-over-A/B)",
      "Type C overlying stable soil",
      "1.5 : 1 (use Type C for entire excavation)",
    ],
  ],
  footer:
    "Per OSHA 29 CFR 1926, Subpart P, Appendix B. Excavations ≥ 5 ft deep require a protective system unless made entirely in stable rock. Competent Person must classify soil daily.",
});

const REF_HAZARDOUS_ENERGY_TYPES = buildDataContainer({
  title: "Hazardous Energy Sources — Lockout/Tagout Isolation",
  icon: "⚡",
  columns: ["Energy Type", "Examples", "Isolation / Verification"],
  data: [
    [
      "Electrical",
      "Live circuits, capacitors, batteries, control panels",
      "Open disconnect; lock device; verify zero voltage with calibrated meter",
    ],
    [
      "Mechanical",
      "Rotating shafts, flywheels, conveyor drives, springs",
      "Block / pin moving parts; release stored spring energy",
    ],
    [
      "Hydraulic",
      "Pressurized fluid lines, accumulators, presses",
      "Bleed lines to atmosphere; lock isolation valves; verify 0 psi",
    ],
    [
      "Pneumatic",
      "Compressed air systems, pneumatic tools, accumulators",
      "Close supply valve; bleed downstream; lock valve",
    ],
    [
      "Chemical",
      "Process lines, reactor vessels, piping with hazardous contents",
      "Double block-and-bleed; line break permits; flush &amp; purge",
    ],
    [
      "Thermal",
      "Steam lines, hot surfaces, cryogenic systems",
      "Allow cool-down or warm-up; verify safe touch temperature",
    ],
    [
      "Gravitational",
      "Suspended loads, raised platforms, elevators",
      "Lower load; install mechanical blocks or cribbing",
    ],
  ],
  footer:
    "Per OSHA 29 CFR 1910.147 and 1926.417. ALL energy sources must be identified, isolated, locked, and verified BEFORE work begins. Each authorized worker applies their own lock.",
});

const REF_INCIDENT_RESPONSE_TIMELINE = buildDataContainer({
  title: "Incident Response & Investigation Timeline",
  icon: "◷",
  columns: ["Phase", "Time Window", "Required Actions"],
  data: [
    [
      "Immediate Response",
      "0 – 4 hours",
      "Secure scene; first aid / 911; notify Safety Officer &amp; PM; preserve evidence; D&amp;A test if required",
    ],
    [
      "Initial Investigation",
      "Within 24 hours",
      "Photograph scene; interview witnesses separately; collect physical evidence; review training/inspection records",
    ],
    [
      "Root-Cause Analysis",
      "Within 72 hours",
      "5-Why method to system / program level; complete MHC Incident Investigation Report (Form 49-A)",
    ],
    [
      "Corrective Actions",
      "Within 7 days",
      "Assign owner &amp; deadline for each root cause; verify completion before close-out",
    ],
    [
      "Lessons Learned",
      "Next safety meeting",
      "Communicate findings &amp; corrective actions to all affected crews; update JHA / training as needed",
    ],
  ],
  footer:
    "Per MISH 49 and OSHA 29 CFR 1926.20. Investigation is non-punitive — focus is on system failures, not blame. All incidents, near-misses, and property damage events require investigation.",
});

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
 * Section-specific reference corrections to enforce current 1-50 WBS mapping.
 */
function applySectionReferenceFixes(html, sectionNumber) {
  let out = html;

  if (sectionNumber === 4) {
    out = out
      .replaceAll(/Attachment\s+MISH\s*4-A/gi, "Attachment MISH 04-A")
      .replaceAll(/FORM\s+4-A/gi, "FORM 04-A");
  }

  if (sectionNumber === 9) {
    out = out.replaceAll(
      /Fall\s+Protection([^<]{0,120}?)MISH\s*11/gi,
      "Fall Protection$1MISH 21",
    );
    out = out.replaceAll(
      /MISH\s*11\s*\(\s*Fall\s*Protection\s*\)/gi,
      "MISH 21 (Fall Protection)",
    );
  }

  if (sectionNumber === 10) {
    out = out
      .replaceAll(/\bMISH\s*9-A\b/gi, "MISH 10-A")
      .replaceAll(/\bMISH\s*9-B\b/gi, "MISH 10-B")
      .replaceAll(/\b9-A\b/g, "10-A")
      .replaceAll(/\b9-B\b/g, "10-B");
  }

  return out;
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
  html = applySectionReferenceFixes(html, sectionNumber);
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
  if (
    sectionNumber === 11 ||
    sectionNumber === 13 ||
    sectionNumber === 17 ||
    sectionNumber === 21
  ) {
    html = injectSignatureLines(html);
  }
  // Canonical reference data tables — anchored after 1.0 PURPOSE row so the
  // quick-reference card is visible in the first body screenful of the section.
  if (sectionNumber === 7) {
    html = injectAfterPurpose(html, REF_DOT_DRUG_TEST_TYPES);
  }
  if (sectionNumber === 12) {
    html = injectAfterPurpose(html, REF_NOISE_EXPOSURE);
  }
  if (sectionNumber === 13) {
    html = injectAfterPurpose(html, REF_GHS_PICTOGRAMS);
  }
  if (sectionNumber === 15) {
    html = injectAfterPurpose(html, REF_HEAT_INDEX_TIERS);
  }
  if (sectionNumber === 16) {
    html = injectAfterPurpose(html, REF_RESPIRATOR_APF);
  }
  if (sectionNumber === 20) {
    html = injectAfterPurpose(html, REF_SAFETY_SIGN_COLORS);
  }
  if (sectionNumber === 21) {
    html = injectAfterPurpose(html, REF_FALL_TRIGGER_HEIGHTS);
  }
  if (sectionNumber === 22) {
    html = injectAfterPurpose(html, REF_SCAFFOLD_DUTY_CLASSES);
  }
  if (sectionNumber === 23) {
    html = injectAfterPurpose(html, REF_LADDER_DUTY_RATINGS);
  }
  if (sectionNumber === 25) {
    html = injectAfterPurpose(html, REF_OSHA_SOIL_CLASSIFICATION);
  }
  if (sectionNumber === 26) {
    html = injectAfterPurpose(html, REF_CONFINED_SPACE_ATMOSPHERE);
  }
  if (sectionNumber === 27) {
    html = injectAfterPurpose(html, REF_HAZARDOUS_ENERGY_TYPES);
  }
  if (sectionNumber === 28) {
    html = injectAfterPurpose(html, REF_ELECTRICAL_APPROACH);
  }
  if (sectionNumber === 29) {
    html = injectAfterPurpose(html, REF_WELDING_FILTER_SHADES);
  }
  if (sectionNumber === 30) {
    html = injectAfterPurpose(html, REF_FLAMMABLE_CLASSIFICATION);
  }
  if (sectionNumber === 31) {
    html = injectAfterPurpose(html, REF_FIRE_EXTINGUISHER_CLASSES);
  }
  if (sectionNumber === 37) {
    html = injectAfterPurpose(html, REF_AERIAL_LIFT_CLEARANCE);
  }
  if (sectionNumber === 49) {
    html = injectAfterPurpose(html, REF_INCIDENT_RESPONSE_TIMELINE);
  }
  return html;
}

/**
 * Insert a block of HTML immediately after the rendered "1.0 PURPOSE" row.
 * Falls back to no-op if the anchor isn't found.
 */
function injectAfterPurpose(html, blockHtml) {
  const purposeRowRx =
    /(<div class="sec-num-row"><span class="sec-num">1\.0<\/span>[\s\S]*?<\/div>)/;
  const m = purposeRowRx.exec(html);
  if (!m) return html;
  return html.replace(purposeRowRx, `${m[1]}\n${blockHtml}`);
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
        await generateToc();
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
      case "toc":
        await generateToc();
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
