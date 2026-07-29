#!/usr/bin/env node
/* eslint-disable no-console */

import puppeteer from "puppeteer";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const DOCS_DIR = join(ROOT, "documents");
const MANUAL_DIR = join(DOCS_DIR, "content", "mhc-operations-manual-drafts");
const DRAFTS_DIR = join(MANUAL_DIR, "02-section-drafts");
const APPENDICES_DIR = join(MANUAL_DIR, "03-forms-appendices");
const OUTPUT_DIR = join(DOCS_DIR, "generated-pdfs");
const PREVIEW_DIR = join(DOCS_DIR, "output", "operations-manual");
const BRAND_PATH = join(DOCS_DIR, "brands", "mhc.json");
const OUT_HTML = join(PREVIEW_DIR, "operations-manual-rough-draft.html");
const OUT_PDF = join(OUTPUT_DIR, "operations-manual-rough-draft.pdf");
const CANONICAL_LAYOUT = Object.freeze({
  leftInsetIn: 0.92,
  rightInsetIn: 0.9,
  pageTopMarginIn: 1.3,
  pageBottomMarginIn: 0.95,
  laneTopBorderPt: 1.2,
  laneSecondaryPt: 0.5,
  laneSecondaryOffsetPt: 2.4,
});
const MENDL_DUSK_FONT_FILES = Object.freeze({
  regular: [
    "MendlSansDusk-Regular.woff2",
    "mendl-sans-dusk-regular.woff2",
    "mendl-sans-dusk.woff2",
    "Mendl Fonts/fonnts.com-Mendl_Sans_Dusk_Regular.otf",
  ],
  semibold: [
    "MendlSansDusk-SemiBold.woff2",
    "mendl-sans-dusk-semibold.woff2",
    "Mendl Fonts/fonnts.com-Mendl_Sans_Dusk_SemiBold.otf",
  ],
  bold: [
    "MendlSansDusk-Bold.woff2",
    "mendl-sans-dusk-bold.woff2",
    "Mendl Fonts/fonnts.com-Mendl_Sans_Dusk_Bold.otf",
  ],
});

function defaultBrand() {
  return {
    companyName: "MH Construction, Inc.",
    companyShort: "MH Construction",
    phone: "(509) 308-6489",
    website: "www.mhc-gc.com",
    tagline: "Built on Quality, Backed by Trust.",
    colors: {
      primary: "#386851",
      primaryDark: "#1E392C",
      secondary: "#BD9264",
      secondaryLight: "#D9BD93",
      secondaryText: "#8A6B49",
    },
    licenses: {
      WA: "MHCONCI907R7",
      OR: "194331",
      ID: "RCE-49250",
    },
  };
}

function normalizeWebsite(website) {
  const value = String(website || "").trim();
  if (!value) return "https://www.mhc-gc.com";
  if (/^https?:\/\//i.test(value)) return value;
  return `https://${value}`;
}

function resolvePdfFontPath(fileName) {
  const candidates = [
    resolve(DOCS_DIR, `../public/fonts/${fileName}`),
    resolve(ROOT, `public/fonts/${fileName}`),
    resolve(ROOT, `apps/website/public/fonts/${fileName}`),
  ];
  return candidates.find((candidate) => existsSync(candidate)) || null;
}

function resolveFirstPdfFontPath(fileNames) {
  for (const fileName of fileNames) {
    const resolved = resolvePdfFontPath(fileName);
    if (resolved) return resolved;
  }
  return null;
}

function cssFontFormatForFilePath(fontPath) {
  const extension = extname(fontPath).toLowerCase();
  if (extension === ".woff2") return "woff2";
  if (extension === ".woff") return "woff";
  if (extension === ".otf") return "opentype";
  if (extension === ".ttf") return "truetype";
  return "woff2";
}

function buildPdfMendlStyleTag() {
  const regularPath = resolveFirstPdfFontPath(MENDL_DUSK_FONT_FILES.regular);
  const semiboldPath = resolveFirstPdfFontPath(MENDL_DUSK_FONT_FILES.semibold);
  const boldPath = resolveFirstPdfFontPath(MENDL_DUSK_FONT_FILES.bold);
  const faces = [
    [regularPath, 400],
    [semiboldPath, 600],
    [boldPath, 700],
  ].filter(([path]) => Boolean(path));

  if (faces.length === 0) {
    return "";
  }

  const familyNames = ["mendl-sans-dusk", "Mendl Sans Dusk"];
  const declarations = [];

  for (const [fontPath, weight] of faces) {
    const fontUrl = pathToFileURL(fontPath).toString();
    const fontFormat = cssFontFormatForFilePath(fontPath);
    for (const familyName of familyNames) {
      declarations.push(
        `@font-face{font-family:"${familyName}";font-style:normal;font-weight:${weight};font-display:swap;src:url("${fontUrl}") format("${fontFormat}");}`,
      );
    }
  }

  return `<style>${declarations.join("")}</style>`;
}

function buildPdfMendlHeaderFooterFontStyle() {
  const weights = [
    [MENDL_DUSK_FONT_FILES.regular, 400],
    [MENDL_DUSK_FONT_FILES.semibold, 600],
    [MENDL_DUSK_FONT_FILES.bold, 700],
  ];
  const faces = [];

  for (const [files, weight] of weights) {
    const fontPath = resolveFirstPdfFontPath(files);
    if (!fontPath) continue;
    const fmt = cssFontFormatForFilePath(fontPath);
    const mime =
      fmt === "opentype"
        ? "font/otf"
        : fmt === "truetype"
          ? "font/ttf"
          : fmt === "woff"
            ? "font/woff"
            : "font/woff2";
    const b64 = readFileSync(fontPath).toString("base64");
    faces.push(
      `@font-face{font-family:"mendl-sans-dusk";font-style:normal;font-weight:${weight};font-display:swap;src:url("data:${mime};base64,${b64}") format("${fmt}");}`,
    );
  }

  return faces.length ? `<style>${faces.join("")}</style>` : "";
}

async function loadBrand() {
  const fallback = defaultBrand();
  if (!existsSync(BRAND_PATH)) return fallback;

  try {
    const raw = await readFile(BRAND_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    const colors = { ...fallback.colors, ...(parsed.colors || {}) };
    const licenses = { ...fallback.licenses, ...(parsed.licenses || {}) };
    return {
      ...fallback,
      ...parsed,
      colors,
      licenses,
      websiteUrl: normalizeWebsite(parsed.website || fallback.website),
      tagline: fallback.tagline,
    };
  } catch {
    return fallback;
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-|-$/g, "");
}

function formatInline(text) {
  let html = escapeHtml(text);
  html = html.replaceAll(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replaceAll(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replaceAll(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replaceAll(
    /\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2" target="_blank" rel="noreferrer">$1</a>',
  );
  return html;
}

function isOrderedListLine(line) {
  return /^\d+\.\s+/.test(line);
}

function isTableLine(line) {
  return line.includes("|");
}

function isTableSeparator(line) {
  return /^\s*\|?(\s*:?-{2,}:?\s*\|)+\s*:?-{2,}:?\s*\|?\s*$/.test(line);
}

function renderTableRow(line, cellTag = "td") {
  const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  const cells = trimmed.split("|").map((cell) => cell.trim());
  const renderedCells = cells
    .map((cell) => `<${cellTag}>${formatInline(cell)}</${cellTag}>`)
    .join("");
  return `<tr>${renderedCells}</tr>`;
}

function markdownToHtml(markdown) {
  const lines = markdown.replaceAll("\r\n", "\n").split("\n");
  const parts = [];

  let inUl = false;
  let inOl = false;
  let inCode = false;
  let inTable = false;
  let paragraphBuffer = [];

  const flushParagraph = () => {
    if (paragraphBuffer.length === 0) return;
    const text = paragraphBuffer.join(" ").trim();
    if (text) {
      parts.push(`<p>${formatInline(text)}</p>`);
    }
    paragraphBuffer = [];
  };

  const closeLists = () => {
    if (inUl) {
      parts.push("</ul>");
      inUl = false;
    }
    if (inOl) {
      parts.push("</ol>");
      inOl = false;
    }
  };

  const closeTable = () => {
    if (inTable) {
      parts.push("</tbody></table>");
      inTable = false;
    }
  };

  for (let i = 0; i < lines.length; i += 1) {
    const rawLine = lines[i];
    const line = rawLine.trimEnd();

    if (line.startsWith("```")) {
      flushParagraph();
      closeLists();
      closeTable();
      if (!inCode) {
        inCode = true;
        parts.push("<pre><code>");
      } else {
        inCode = false;
        parts.push("</code></pre>");
      }
      continue;
    }

    if (inCode) {
      parts.push(`${escapeHtml(rawLine)}\n`);
      continue;
    }

    if (line.trim() === "") {
      flushParagraph();
      closeLists();
      closeTable();
      continue;
    }

    const headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      closeLists();
      closeTable();
      const level = Math.min(headingMatch[1].length + 1, 6);
      const text = headingMatch[2].trim();
      const id = slugify(text);
      parts.push(`<h${level} id="${id}">${formatInline(text)}</h${level}>`);
      continue;
    }

    if (line.startsWith("- ")) {
      flushParagraph();
      closeTable();
      if (!inUl) {
        closeLists();
        inUl = true;
        parts.push("<ul>");
      }
      parts.push(`<li>${formatInline(line.slice(2).trim())}</li>`);
      continue;
    }

    if (isOrderedListLine(line)) {
      flushParagraph();
      closeTable();
      if (!inOl) {
        closeLists();
        inOl = true;
        parts.push("<ol>");
      }
      parts.push(`<li>${formatInline(line.replace(/^\d+\.\s+/, ""))}</li>`);
      continue;
    }

    if (
      isTableLine(line) &&
      i + 1 < lines.length &&
      isTableSeparator(lines[i + 1])
    ) {
      flushParagraph();
      closeLists();
      closeTable();
      inTable = true;
      parts.push("<table><thead>");
      parts.push(renderTableRow(line, "th"));
      parts.push("</thead><tbody>");
      i += 1;
      continue;
    }

    if (inTable && isTableLine(line)) {
      parts.push(renderTableRow(line, "td"));
      continue;
    }

    if (inTable && !isTableLine(line)) {
      closeTable();
    }

    paragraphBuffer.push(line.trim());
  }

  flushParagraph();
  closeLists();
  closeTable();

  return parts.join("\n");
}

async function loadSectionFiles(dirPath) {
  if (!existsSync(dirPath)) return [];
  const entries = await readdir(dirPath);
  const markdownFiles = entries
    .filter((entry) => extname(entry).toLowerCase() === ".md")
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const sections = [];
  for (const fileName of markdownFiles) {
    const filePath = join(dirPath, fileName);
    const text = await readFile(filePath, "utf-8");
    const titleLine =
      text
        .split("\n")
        .map((line) => line.trim())
        .find((line) => line.startsWith("# ")) || `# ${fileName}`;
    const title = titleLine.replace(/^#\s+/, "").trim();
    const sectionId = slugify(`${fileName}-${title}`);
    sections.push({ fileName, filePath, title, sectionId, markdown: text });
  }

  return sections;
}

function toPreviewRelativePath(filePath) {
  return relative(PREVIEW_DIR, filePath).replaceAll("\\", "/");
}

export function renderHtmlDocument(drafts, appendices, brand) {
  const generatedDate = new Date().toISOString().slice(0, 10);
  const mendlFontStyleTag = buildPdfMendlStyleTag();
  const logoPath = toPreviewRelativePath(
    join(DOCS_DIR, "assets", "logo-color.png"),
  );
  const agcLogoPath = toPreviewRelativePath(
    join(DOCS_DIR, "assets", "02-nwagc-logo.png"),
  );
  const bbbLogoPath = toPreviewRelativePath(
    join(DOCS_DIR, "assets", "bbb", "bbb-accredited-seal.png"),
  );
  const vobLogoPath = toPreviewRelativePath(
    join(
      ROOT,
      "apps",
      "website",
      "public",
      "images",
      "logo",
      "veteran-owned-business.webp",
    ),
  );
  const pascoLogoPath = toPreviewRelativePath(
    join(
      ROOT,
      "apps",
      "website",
      "public",
      "images",
      "credentials",
      "Pasco-Chamber-logo-color-transparent.png",
    ),
  );
  const kennewickLogoPath = toPreviewRelativePath(
    join(
      ROOT,
      "apps",
      "website",
      "public",
      "images",
      "credentials",
      "Kennewick-TriCity-Regional-Chamber-logo-horizontal.png",
    ),
  );
  const richlandLogoPath = toPreviewRelativePath(
    join(
      ROOT,
      "apps",
      "website",
      "public",
      "images",
      "credentials",
      "Richland-Chamber-logo-full-color.png",
    ),
  );
  const licenseLine = Object.entries(brand.licenses || {})
    .map(([state, value]) => `${state} ${value}`)
    .join(" | ");
  const allSections = [
    ...drafts.map((entry) => ({ ...entry, group: "Section Draft" })),
    ...appendices.map((entry) => ({ ...entry, group: "Appendix" })),
  ];

  const tocItems = allSections
    .map(
      (entry) =>
        `<li><a href="#${entry.sectionId}">${escapeHtml(entry.title)}</a><span class="toc-meta">${escapeHtml(entry.group)} · ${escapeHtml(entry.fileName)}</span></li>`,
    )
    .join("\n");

  const sectionBlocks = allSections
    .map((entry) => {
      const bodyMarkdown = entry.markdown.replace(/^#\s+.+$/m, "").trim();
      const htmlBody = markdownToHtml(bodyMarkdown);
      return `
      <section class="page" aria-label="${escapeHtml(entry.title)}">
        <div class="page-frame">
          <div class="left-ribbon"></div>
          <div class="page-content">
            <div class="section-header-row">
              <div class="section-meta">${escapeHtml(entry.group)} · ${escapeHtml(entry.fileName)}</div>
              <div class="section-accent"></div>
            </div>
            <div class="manual-section-heading">
              <div class="manual-section-kicker">Operations Manual</div>
              <h2 class="manual-section-title">${escapeHtml(entry.title)}</h2>
            </div>
            <div class="manual-section-meta">Rough Draft · Congruence Track</div>
            <div class="section-info-strip">
              <div class="info-pill">Draft Review</div>
              <div class="info-pill">Employee Handbook Alignment</div>
              <div class="info-pill">MISH Crosswalk</div>
            </div>
            <div class="manual-section-body">${htmlBody}</div>
          </div>
          <footer class="page-footer footer" aria-hidden="true">
            <div class="contact">
              <div class="name">${escapeHtml(brand.companyName)}</div>
              <div class="address">${escapeHtml(brand.addressStreet || brand.address || "")}</div>
              <div class="address">${escapeHtml(brand.addressCityStateZip || brand.address || "")}</div>
              <div class="address">${escapeHtml(`${brand.phone} · ${brand.website}`)}</div>
              <div class="licenses">${escapeHtml(licenseLine)}</div>
            </div>
            <div class="trust">
              <div class="logos">
                <img class="logo-agc" src="${agcLogoPath}" alt="AGC membership" />
                <img class="logo-bbb" src="${bbbLogoPath}" alt="BBB accredited business" />
                <img class="logo-vob" src="${vobLogoPath}" alt="Washington certified veteran owned business" />
              </div>
            </div>
          </footer>
        </div>
      </section>`;
    })
    .join("\n");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="MH Construction Operations Manual rough draft for internal command governance and process control." />
  <title>MHC Operations Manual Rough Draft</title>
  ${mendlFontStyleTag}
  <style>
    @page {
      size: Letter;
      margin: 0;
    }
    :root {
      --mh-primary: ${brand.colors.primary};
      --mh-primary-dark: ${brand.colors.primaryDark};
      --mh-secondary: ${brand.colors.secondary};
      --mh-secondary-light: ${brand.colors.secondaryLight};
      --mh-secondary-text: ${brand.colors.secondaryText};
      --mh-ink: #13251d;
      --mh-surface: #f8faf8;
      --mh-paper: #ffffff;
    }
    * { box-sizing: border-box; }
    body {
      font-family: "mendl-sans-dusk", "Mendl Sans Dusk", sans-serif;
      color: var(--mh-ink);
      line-height: 1.45;
      margin: 0;
      font-size: 11px;
      background: var(--mh-paper);
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .page {
      position: relative;
      width: 8.5in;
      min-height: 11in;
      margin: 0 0 12px;
      page-break-after: always;
    }
    .page:last-child {
      margin-bottom: 0;
      page-break-after: auto;
    }
    .page-frame {
      position: relative;
      width: 100%;
      min-height: 11in;
      overflow: hidden;
      background: var(--mh-paper);
      padding: 0;
    }
    .page-frame::before {
      content: "";
      position: absolute;
      inset: 0.22in;
      border: 1.2pt solid var(--mh-primary);
      pointer-events: none;
    }
    .page-frame::after {
      content: "";
      position: absolute;
      inset: 0.33in;
      border: 0.6pt solid var(--mh-secondary);
      pointer-events: none;
    }
    .left-ribbon {
      position: absolute;
      top: 0.45in;
      bottom: 0.45in;
      left: 0.45in;
      width: 0.28in;
      background: linear-gradient(180deg, var(--mh-primary) 0%, var(--mh-primary) 68%, var(--mh-secondary) 100%);
      pointer-events: none;
    }
    .page-content {
      position: relative;
      z-index: 1;
      min-height: 11in;
      display: flex;
      flex-direction: column;
    }
    .page-footer,
    .footer {
      position: absolute;
      left: 0.92in;
      right: 0.9in;
      bottom: 0.12in;
      z-index: 2;
      padding-top: 7pt;
      background: var(--mh-paper);
      border-top: 1.2pt solid var(--mh-primary);
      display: grid;
      grid-template-columns: 1.45fr 1fr;
      gap: 0.18in;
      align-items: end;
    }
    .page-footer::before {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 2.5pt;
      height: 0.6pt;
      background: var(--mh-secondary);
    }
    .contact {
      font-size: 7pt;
      line-height: 1.3;
      color: var(--mh-primary-darker);
    }
    .contact .name {
      font-size: 7.8pt;
      font-weight: 800;
      color: var(--mh-primary);
      margin-bottom: 2pt;
    }
    .contact .address {
      color: var(--mh-primary-darker);
    }
    .contact .licenses {
      margin-top: 4pt;
      font-size: 7.2pt;
      color: var(--mh-secondary);
      font-weight: 700;
    }
    .trust {
      text-align: right;
    }
    .logos {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      gap: 9pt;
    }
    .logos img {
      display: block;
      width: auto;
    }
    .logo-agc {
      height: 0.36in;
    }
    .logo-bbb {
      height: 0.39in;
    }
    .logo-vob {
      height: 0.5in;
    }
    .cover-hero {
      position: absolute;
      top: 1.35in;
      left: 1.02in;
      right: 1.02in;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }
    .cover-identity {
      position: absolute;
      top: 0.62in;
      left: 0.92in;
      right: 0.9in;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 7.2pt;
      font-weight: 700;
      letter-spacing: 0.11em;
      text-transform: uppercase;
      color: var(--mh-primary);
    }
    .cover-identity .dot {
      color: var(--mh-secondary);
      margin: 0 7pt;
    }
    .cover-logo {
      width: 2.85in;
      height: auto;
      display: block;
      margin: 0 auto 0.28in;
    }
    .cover-chip {
      width: fit-content;
      margin: 0 auto 0.18in;
      background: var(--mh-primary);
      border: 0.8pt solid var(--mh-secondary);
      color: #ffffff;
      text-transform: uppercase;
      letter-spacing: 0.18em;
      font-size: 6.5pt;
      font-weight: 800;
      padding: 2pt 10pt;
      border-radius: 1.5pt;
      box-shadow: inset 0 -1pt 0 var(--mh-secondary);
    }
    .cover-kicker {
      text-align: center;
      font-size: 8.4px;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--mh-primary);
      font-weight: 800;
      margin-bottom: 8pt;
    }
    .cover-title {
      margin: 0;
      text-align: center;
      text-transform: uppercase;
      color: var(--mh-primary);
      font-size: 48pt;
      line-height: 0.9;
      letter-spacing: 0.01em;
      font-weight: 900;
    }
    .cover-subtitle {
      margin: 0.16in 0 0;
      text-align: center;
      color: var(--mh-primary);
      text-transform: uppercase;
      letter-spacing: 0.15em;
      font-size: 10pt;
      font-weight: 700;
    }
    .cover-trust-line {
      margin: 0.07in 0 0;
      text-align: center;
      font-size: 8.2px;
      color: var(--mh-secondary-text);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      font-weight: 700;
    }
    .cover-meta {
      margin-top: 0.1in;
      font-size: 9px;
      color: var(--mh-secondary-text);
      line-height: 1.4;
      text-align: center;
    }
    .cover-summary-card {
      position: absolute;
      left: 1.02in;
      right: 2.95in;
      bottom: 2.33in;
      background: #ffffff;
      border: 1pt solid #d7e3dc;
      padding: 10.5pt 12.5pt 9.5pt;
    }
    .cover-summary-head {
      font-size: 7.2pt;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--mh-secondary);
      font-weight: 800;
      margin-bottom: 6pt;
    }
    .cover-summary-list {
      margin: 0;
      padding: 0;
      list-style: none;
      font-size: 9pt;
      line-height: 1.45;
      color: var(--mh-primary-darker);
    }
    .cover-summary-list li {
      margin: 0 0 3pt;
    }
    .cover-summary-list strong {
      color: var(--mh-primary);
      font-weight: 800;
    }
    .cover-qr-card {
      position: absolute;
      right: 1.02in;
      bottom: 2.33in;
      width: 1.74in;
      border: 1pt solid var(--mh-secondary);
      background: #fff;
      padding: 7.5pt;
      text-align: center;
    }
    .cover-qr-head {
      margin: 0 0 5pt;
      font-size: 6.8pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.17em;
      color: var(--mh-primary);
    }
    .cover-qr-box {
      width: 1.36in;
      height: 1.36in;
      display: block;
      margin: 0 auto;
      border: 0.6pt solid #d6d6d6;
      background: #f7f7f7;
    }
    .cover-qr-label {
      margin-top: 6pt;
      font-size: 6.6pt;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: var(--mh-secondary);
      font-weight: 800;
    }
    .cover-veteran-strip {
      position: absolute;
      left: 0.92in;
      right: 0.9in;
      bottom: 0.42in;
      text-align: center;
      font-size: 6.6pt;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      font-weight: 800;
      color: var(--mh-secondary);
      z-index: 2;
    }
    .cover-veteran-strip .sep {
      color: var(--mh-secondary);
      margin: 0 6pt;
    }
    .toc-block {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 8px;
      padding-top: 0.2in;
    }
    .toc-header {
      display: flex;
      flex-direction: column;
      gap: 3px;
      margin-bottom: 6px;
      padding-bottom: 6px;
      border-bottom: 0.6pt solid rgba(56, 104, 81, 0.2);
    }
    .toc-label {
      font-size: 7pt;
      font-weight: 800;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--mh-secondary);
    }
    .toc-block h2 {
      margin: 0;
      color: var(--mh-primary-dark);
      font-size: 20px;
      line-height: 1.1;
    }
    .toc-block ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      gap: 6px;
    }
    .toc-block li {
      margin: 0;
      padding: 0;
      break-inside: avoid;
    }
    .toc-block a {
      color: var(--mh-primary-dark);
      text-decoration: none;
      font-weight: 700;
    }
    .toc-meta {
      display: block;
      color: var(--mh-secondary-text);
      font-size: 8.6px;
      margin-top: 2px;
    }
    .section-header-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
    }
    .section-meta {
      font-size: 8.5px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--mh-secondary-text);
      font-weight: 700;
    }
    .section-accent {
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, var(--mh-secondary), transparent);
    }
    .manual-section-heading {
      margin: 0 0 5pt;
      padding-bottom: 6pt;
      border-bottom: 0.7pt solid rgba(56, 104, 81, 0.24);
      position: relative;
    }
    .manual-section-heading::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -0.5pt;
      width: 0.8in;
      height: 2pt;
      background: linear-gradient(90deg, var(--mh-primary), var(--mh-secondary));
    }
    .manual-section-kicker {
      margin: 0 0 2pt;
      font-size: 7.2pt;
      font-weight: 800;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--mh-primary);
    }
    .manual-section-title {
      margin: 0;
      font-size: 22px;
      line-height: 1.12;
      color: var(--mh-primary-dark);
      font-weight: 800;
    }
    .manual-section-meta {
      margin: 0 0 7px;
      font-size: 7.8px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--mh-secondary-text);
    }
    .section-info-strip {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin: 0 0 9px;
    }
    .info-pill {
      display: inline-flex;
      align-items: center;
      padding: 3pt 7pt;
      border: 0.6pt solid rgba(189, 146, 100, 0.38);
      border-radius: 999px;
      background: #fcf7f1;
      color: var(--mh-primary-dark);
      font-size: 7.2px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .manual-section-body {
      margin-top: 4pt;
      font-size: 10px;
      line-height: 1.62;
      color: var(--mh-ink);
      letter-spacing: 0.002em;
      padding-bottom: 20pt;
    }
    .manual-section-body h2,
    .manual-section-body h3,
    .manual-section-body h4,
    .manual-section-body h5,
    .manual-section-body h6 {
      color: var(--mh-primary-dark);
      margin-top: 10px;
      margin-bottom: 6px;
      line-height: 1.2;
    }
    .manual-section-body p {
      margin: 0 0 8.5px;
    }
    .manual-section-body > p + p {
      margin-top: 5px;
    }
    .manual-section-body ul,
    .manual-section-body ol {
      margin: 0 0 9px 18px;
      padding: 0;
    }
    .manual-section-body li {
      margin-bottom: 5px;
    }
    .manual-section-body strong {
      color: var(--mh-primary-dark);
      font-weight: 700;
    }
    .manual-section-body code {
      background: #f4f8f6;
      border: 1px solid #d7e2db;
      border-radius: 3px;
      padding: 0 3px;
      font-size: 0.95em;
    }
    .manual-section-body pre {
      background: #f4f8f6;
      border: 1px solid #d7e2db;
      border-radius: 6px;
      padding: 8px;
      overflow: auto;
      white-space: pre-wrap;
      word-break: break-word;
      margin: 0 0 10px;
    }
    .manual-section-body table {
      width: 100%;
      border-collapse: collapse;
      margin: 0 0 10px;
      font-size: 9.3px;
    }
    .manual-section-body th, .manual-section-body td {
      border: 1px solid #d5ddd7;
      padding: 5px 6px;
      text-align: left;
      vertical-align: top;
    }
    .manual-section-body th {
      background: #f7faf8;
      color: var(--mh-primary-dark);
    }
    .manual-section-body a {
      color: var(--mh-primary);
    }
  </style>
</head>
<body>
  <section class="page" aria-label="Operations Manual Cover">
    <div class="page-frame">
      <div class="left-ribbon"></div>
      <div class="page-content">
        <div class="cover-hero">
          <div class="cover-identity">
            <div>${escapeHtml(brand.companyShort)}<span class="dot">•</span>${escapeHtml(brand.addressCityStateZip || brand.address || "")}</div>
            <div>Veteran-Owned</div>
          </div>
          <img class="cover-logo" src="${logoPath}" alt="MH Construction logo" />
          <div class="cover-chip">Operations Manual</div>
          <div class="cover-kicker">Internal Command Document</div>
          <h1 class="cover-title">MHC Operations Manual</h1>
          <p class="cover-subtitle">Rough Draft Review Edition · Congruence Track with the Employee Handbook</p>
          <p class="cover-trust-line">Veteran-Owned · Safety-Driven · Built on Quality, Backed by Trust.</p>
          <div class="cover-meta">
            <div>Generated: ${generatedDate}</div>
            <div>Scope: Sections 01-14 + Appendices A-F</div>
            <div>${escapeHtml(brand.phone)} · ${escapeHtml(brand.website)} · ${escapeHtml(licenseLine)}</div>
          </div>
          <aside class="cover-summary-card" aria-label="manual scope overview">
            <div class="cover-summary-head">Manual Snapshot</div>
            <ul class="cover-summary-list">
              <li><strong>Purpose:</strong> Field operations and site execution guide for the company.</li>
              <li><strong>Audience:</strong> Supervisors, crews, and project leadership.</li>
              <li><strong>Structure:</strong> Table of contents plus section-based operations guidance.</li>
              <li><strong>Revision:</strong> ${generatedDate}</li>
            </ul>
          </aside>
          <aside class="cover-qr-card" aria-label="digital manual access">
            <p class="cover-qr-head">Manual Online</p>
            <div class="cover-qr-box"></div>
            <div class="cover-qr-label">Scan for latest version</div>
          </aside>
        </div>
        <div class="cover-veteran-strip">Veteran-Owned <span class="sep">★</span> Safety-Driven <span class="sep">★</span> Built on Quality, Backed by Trust</div>
      </div>
      <div class="page-footer">
        <div class="contact">
          <div class="name">${escapeHtml(brand.companyName)}</div>
          <div class="address">${escapeHtml(brand.addressStreet || brand.address || "")}</div>
          <div class="address">${escapeHtml(brand.addressCityStateZip || brand.address || "")}</div>
          <div class="address">${escapeHtml(`${brand.phone} · ${brand.website}`)}</div>
          <div class="licenses">${escapeHtml(licenseLine)}</div>
        </div>
        <div class="trust">
          <div class="logos">
            <img class="logo-agc" src="${agcLogoPath}" alt="AGC membership" />
            <img class="logo-bbb" src="${bbbLogoPath}" alt="BBB accredited business" />
            <img class="logo-vob" src="${vobLogoPath}" alt="Washington certified veteran owned business" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="page" aria-label="Table of Contents">
    <div class="page-frame">
      <div class="left-ribbon"></div>
      <div class="page-content toc-block">
        <div class="toc-header">
          <div class="toc-label">Contents</div>
          <h2>Table of Contents</h2>
        </div>
        <ul>${tocItems}</ul>
      </div>
      <footer class="page-footer footer" aria-hidden="true">
        <div class="contact">
          <div class="name">${escapeHtml(brand.companyName)}</div>
          <div class="address">${escapeHtml(brand.addressStreet || brand.address || "")}</div>
          <div class="address">${escapeHtml(brand.addressCityStateZip || brand.address || "")}</div>
          <div class="address">${escapeHtml(`${brand.phone} · ${brand.website}`)}</div>
          <div class="licenses">${escapeHtml(licenseLine)}</div>
        </div>
        <div class="trust">
          <div class="logos">
            <img class="logo-agc" src="${agcLogoPath}" alt="AGC membership" />
            <img class="logo-bbb" src="${bbbLogoPath}" alt="BBB accredited business" />
            <img class="logo-vob" src="${vobLogoPath}" alt="Washington certified veteran owned business" />
          </div>
        </div>
      </footer>
    </div>
  </section>

  ${sectionBlocks}
</body>
</html>`;
}

async function main() {
  const brand = await loadBrand();
  const drafts = await loadSectionFiles(DRAFTS_DIR);
  const appendices = await loadSectionFiles(APPENDICES_DIR);

  if (drafts.length === 0) {
    throw new Error(`No section draft markdown files found in ${DRAFTS_DIR}`);
  }

  await mkdir(PREVIEW_DIR, { recursive: true });
  await mkdir(OUTPUT_DIR, { recursive: true });

  const html = renderHtmlDocument(drafts, appendices, brand);
  await writeFile(OUT_HTML, html, "utf-8");

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.goto(pathToFileURL(OUT_HTML).toString(), {
      waitUntil: "networkidle0",
    });

    const headerFooterFontStyle = buildPdfMendlHeaderFooterFontStyle();
    const leftInset = `${CANONICAL_LAYOUT.leftInsetIn}in`;
    const rightInset = `${CANONICAL_LAYOUT.rightInsetIn}in`;
    const lineWeight = `${CANONICAL_LAYOUT.laneTopBorderPt}pt`;
    const separatorWeight = `${CANONICAL_LAYOUT.laneSecondaryPt}pt`;
    const separatorOffset = `${CANONICAL_LAYOUT.laneSecondaryOffsetPt}pt`;
    const compactContact = `${escapeHtml(brand.companyName)} · ${escapeHtml(brand.phone)} · ${escapeHtml(brand.website)}`;
    const licensesCompact = Object.entries(brand.licenses || {})
      .map(([state, value]) => `${escapeHtml(state)} ${escapeHtml(value)}`)
      .join(" · ");

    const headerTemplate = `${headerFooterFontStyle}<div style="width:100%;height:100%;box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact;display:flex;flex-direction:column;justify-content:flex-end;"></div>`;
    const footerTemplate = `${headerFooterFontStyle}<div style="width:100%;height:100%;box-sizing:border-box;font-family:'mendl-sans-dusk','Mendl Sans Dusk',sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact;display:flex;flex-direction:column;justify-content:flex-end;"><div style="width:100%;padding:0 ${rightInset} 0 ${leftInset};display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:end;gap:5pt;line-height:1.1;"><span style="font-size:6.1pt;color:${brand.colors.secondaryText};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${compactContact}</span><span style="font-size:6.8pt;font-weight:800;color:${brand.colors.primaryDark};white-space:nowrap;">Page <span class=\"pageNumber\"></span> of <span class=\"totalPages\"></span></span></div><div style="width:100%;padding:0 ${rightInset} 0 ${leftInset};display:flex;justify-content:flex-start;align-items:center;line-height:1.05;"><span style="font-size:5.6pt;color:${brand.colors.secondaryText};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;">${licensesCompact}</span></div></div>`;

    await page.pdf({
      path: OUT_PDF,
      format: "Letter",
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: true,
      headerTemplate,
      footerTemplate,
      margin: {
        top: `${CANONICAL_LAYOUT.pageTopMarginIn}in`,
        right: `${CANONICAL_LAYOUT.rightInsetIn}in`,
        bottom: `${CANONICAL_LAYOUT.pageBottomMarginIn}in`,
        left: `${CANONICAL_LAYOUT.leftInsetIn}in`,
      },
    });
  } finally {
    await browser.close();
  }

  console.log(`HTML written: ${OUT_HTML}`);
  console.log(`PDF written:  ${OUT_PDF}`);
}

const isDirectRun =
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).toString();

if (isDirectRun) {
  try {
    await main();
  } catch (error) {
    console.error(
      "❌ Operations manual PDF build failed:",
      error?.message || error,
    );
    process.exit(1);
  }
}
