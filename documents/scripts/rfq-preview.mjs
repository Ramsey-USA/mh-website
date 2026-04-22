#!/usr/bin/env node
/* eslint-disable no-console */

import puppeteer from "puppeteer";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { basename, dirname, extname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const DOCS_DIR = join(ROOT, "documents");
const BRAND_DIR = join(DOCS_DIR, "brands");
const VENDORS_DIR = join(ROOT, "public/images/vendors");
const QR_DIR = join(ROOT, "public/images/qr-codes");
const DEFAULT_OUT_DIR = join(DOCS_DIR, "output/rfq-preview");

function getArg(flag) {
  const args = process.argv.slice(2);
  const index = args.indexOf(flag);
  if (index === -1) return null;
  return args[index + 1] ?? null;
}

const inputArg = getArg("--input");
const brandId = getArg("--brand") || "mhc";
const outDirArg = getArg("--out-dir");
const clientLogoArg = getArg("--client-logo");

if (!inputArg) {
  console.error("❌  --input <path-to-markdown> is required.");
  process.exit(1);
}

const INPUT_PATH = resolve(inputArg);
const OUT_DIR = outDirArg ? resolve(outDirArg) : DEFAULT_OUT_DIR;
const SLUG = basename(INPUT_PATH, extname(INPUT_PATH));
const HTML_PATH = join(OUT_DIR, `${SLUG}.preview.html`);
const PDF_PATH = join(OUT_DIR, `${SLUG}.preview.pdf`);

const KV_PATTERN = /^([^:]{1,42}):\s+(.+)$/;
const EXHIBIT_PATTERN = /^Exhibit\s+([A-Z]):\s+(.+)$/i;
const EXHIBIT_FILE_PATTERN = /^Exhibit\s+([A-Z])\s+File:\s+(.+)$/i;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function inlineFormat(text) {
  return autoLink(
    escapeHtml(text)
      .replaceAll(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replaceAll(/\*(.+?)\*/g, "<em>$1</em>"),
  );
}

function autoLink(text) {
  return text
    .replaceAll(
      /(?<![">])(file:\/\/\/[^\s<]+)/g,
      '<a href="$1" target="_blank" rel="noreferrer">$1</a>',
    )
    .replaceAll(
      /(?<![">])(https?:\/\/[^\s<]+)/g,
      '<a href="$1" target="_blank" rel="noreferrer">$1</a>',
    )
    .replaceAll(
      /(?<![\w/"'=])(www\.[^\s<]+)/g,
      '<a href="https://$1" target="_blank" rel="noreferrer">$1</a>',
    )
    .replaceAll(
      /(?<![">])\b([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})\b/gi,
      '<a href="mailto:$1">$1</a>',
    )
    .replaceAll(
      /(?<![">])\b(\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4})\b/g,
      (_match, phone) => {
        const normalized = phone.replaceAll(/[^\d]/g, "");
        return `<a href="tel:${normalized}">${phone}</a>`;
      },
    );
}

function formatLine(text, tagName) {
  const match = text.match(KV_PATTERN);
  if (!match) return `<${tagName}>${inlineFormat(text)}</${tagName}>`;

  const [, label, value] = match;
  return `<${tagName} class="kv-row"><span class="kv-label">${inlineFormat(label)}:</span> <span class="kv-value">${inlineFormat(value)}</span></${tagName}>`;
}

function renderHeading(line, level) {
  return `<h${level}>${inlineFormat(line.slice(level + 1))}</h${level}>`;
}

function renderListItem(line) {
  return formatLine(line.slice(2), "li");
}

function normalizeMarkdown(markdown) {
  return markdown.replaceAll("\r\n", "\n");
}

function ensureList(parts, inList) {
  if (inList) return inList;
  parts.push("<ul>");
  return true;
}

function closeList(parts, inList) {
  if (inList) {
    parts.push("</ul>");
  }
}

function buildId(value) {
  return value
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-|-$/g, "");
}

function extractExhibit(line) {
  const match = line.match(EXHIBIT_PATTERN);
  if (!match) return null;
  const title = match[2]
    .replaceAll(/file:\/\/\/\S+/g, "")
    .replaceAll(/\s+/g, " ")
    .trim();
  return {
    id: `exhibit-${match[1].toLowerCase()}`,
    label: `Exhibit ${match[1].toUpperCase()}`,
    title,
    href: "",
    status: "Pending asset",
  };
}

function extractExhibitFile(line) {
  const match = line.match(EXHIBIT_FILE_PATTERN);
  if (!match) return null;
  return {
    id: `exhibit-${match[1].toLowerCase()}`,
    href: match[2].trim().startsWith("file:///") ? match[2].trim() : "",
    status: match[2].trim().startsWith("file:///")
      ? "Linked exhibit file ready"
      : match[2].trim(),
  };
}

function summarizeSection(lines) {
  const firstBodyLine = lines.find((line) => line && !line.startsWith("- "));
  if (!firstBodyLine) {
    return "Qualifications details and supporting owner-facing information.";
  }
  return firstBodyLine.replaceAll(/\[(.*?)\]/g, "$1");
}

function tokenizeTitle(value) {
  return value
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter((token) => token.length > 2);
}

function findClientLogo(title) {
  if (!title) return "";

  const tokens = tokenizeTitle(title);
  if (tokens.length === 0) return "";

  try {
    const files = readdirSync(VENDORS_DIR);
    const match = files
      .map((file) => {
        const lower = file.toLowerCase();
        const score = tokens.filter((token) => lower.includes(token)).length;
        return { file, score };
      })
      .filter((entry) => entry.score > 0)
      .sort((left, right) => right.score - left.score)[0];
    return match ? join(VENDORS_DIR, match.file) : "";
  } catch {
    return "";
  }
}

function buildCoverTitle(title, brand) {
  if (!title) return `${brand.companyShort} Qualifications Package`;

  return title
    .replace("MH Construction RFQ Response Draft - ", "Qualifications Package - ")
    .replace("RFQ Response Draft", "Qualifications Package");
}

function finalizeSection(section, sections) {
  if (!section) return;
  section.summary = summarizeSection(section.lines);
  sections.push(section);
}

function createSection(heading) {
  return {
    heading,
    id: buildId(heading),
    lines: [],
    summary: "",
  };
}

function upsertExhibit(exhibit, exhibits) {
  const existing = exhibits.find((item) => item.id === exhibit.id);
  if (!existing) {
    exhibits.push(exhibit);
    return;
  }

  if (!existing.title && exhibit.title) existing.title = exhibit.title;
  if (!existing.href && exhibit.href) existing.href = exhibit.href;
  if (
    (existing.status === "Pending asset" || !existing.status) &&
    exhibit.status
  ) {
    existing.status = exhibit.status;
  }
}

function trackExhibit(line, exhibits) {
  const exhibitLine = line.startsWith("- ") ? line.slice(2) : line;
  const exhibit = extractExhibit(exhibitLine);
  if (exhibit) upsertExhibit(exhibit, exhibits);

  const exhibitFile = extractExhibitFile(exhibitLine);
  if (exhibitFile) upsertExhibit(exhibitFile, exhibits);
}

function parsePacket(markdown) {
  const lines = normalizeMarkdown(markdown).split("\n");
  const sections = [];
  const exhibits = [];
  let title = "";
  let currentSection = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line === "") {
      if (currentSection) currentSection.lines.push(line);
      continue;
    }

    if (title === "" && line.startsWith("# ")) {
      title = line.slice(2).trim();
      continue;
    }

    if (line.startsWith("## ")) {
      finalizeSection(currentSection, sections);
      currentSection = createSection(line.slice(3).trim());
      continue;
    }

    if (!currentSection) continue;
    currentSection.lines.push(line);
    trackExhibit(line, exhibits);
  }

  finalizeSection(currentSection, sections);

  return { title, sections, exhibits };
}

function renderLines(lines) {
  return markdownToHtml(lines.join("\n")).body;
}

function renderTocItems(items, className) {
  return items
    .map((item, index) => {
      const titleText = item.heading || `${item.label} - ${item.title}`;
      const summaryHtml = item.summary
        ? `<span>${escapeHtml(item.summary)}</span>`
        : "";
      return `<li class="${className}"><a href="#${item.id}">${index + 1}. ${escapeHtml(titleText)}</a>${summaryHtml}</li>`;
    })
    .join("\n");
}

function sortSectionsForPacket(sections) {
  const order = [
    "relevant project experience",
    "approach for occupied inpatient facility and client privacy",
    "safety and emr",
    "self-performed work",
    "project management approach",
    "proposed subcontractors",
    "business information",
    "babaa compliance",
    "submission header",
    "digital verification and exhibit links",
    "open items before final submission",
    "signature block",
  ];

  const rankFor = (heading) => {
    const normalized = heading.toLowerCase();
    const index = order.findIndex((entry) => normalized.includes(entry));
    return index === -1 ? order.length : index;
  };

  return [...sections].sort((left, right) => {
    const rankDelta = rankFor(left.heading) - rankFor(right.heading);
    if (rankDelta !== 0) return rankDelta;
    return left.heading.localeCompare(right.heading);
  });
}

function renderSectionPages(packet) {
  return sortSectionsForPacket(packet.sections)
    .map(
      (section) => `
        <section class="packet-page content-page" id="${section.id}">
          <div class="page-chrome">
            <div class="content-wrap">
              <p class="section-kicker">Qualifications Section</p>
              <h1>${escapeHtml(section.heading)}</h1>
              <p class="section-summary">${escapeHtml(section.summary)}</p>
              <div class="content">
                ${renderLines(section.lines)}
              </div>
            </div>
          </div>
        </section>`,
    )
    .join("\n");
}

function renderQrGuidePanel(cards) {
  if (cards.length === 0) return "";

  return `
    <div class="qr-panel">
      <p class="panel-title">QR Guide</p>
      <p class="panel-copy">Scan these to jump directly to MH Construction pages during review.</p>
      <div class="qr-grid">
        ${renderQrCards(cards)}
      </div>
    </div>`;
}

function renderExhibitPages(exhibits) {
  if (exhibits.length === 0) return "";

  return exhibits
    .map(
      (exhibit) => `
        <section class="packet-page exhibit-page" id="${exhibit.id}">
          <div class="page-chrome exhibit-shell">
            <p class="section-kicker">Supporting Exhibit</p>
            <h1>${escapeHtml(exhibit.label)}</h1>
            <p class="exhibit-title">${escapeHtml(exhibit.title)}</p>
            <p class="exhibit-copy">${escapeHtml(exhibit.status || "Pending asset")}</p>
            ${exhibit.href ? `<p class="exhibit-link"><a href="${exhibit.href}" target="_blank" rel="noreferrer">Open linked exhibit file</a></p>` : ""}
          </div>
        </section>`,
    )
    .join("\n");
}

function resolveAssetPath(assetPath, baseDir = ROOT) {
  if (!assetPath) return "";
  const absPath = assetPath.startsWith("/")
    ? assetPath
    : resolve(baseDir, assetPath);
  try {
    const buffer = readFileSync(absPath);
    const ext = extname(absPath).slice(1).toLowerCase();
    const imageExt = ext === "jpg" ? "jpeg" : ext;
    const mime = ext === "svg" ? "image/svg+xml" : `image/${imageExt}`;
    return `data:${mime};base64,${buffer.toString("base64")}`;
  } catch {
    return pathToFileURL(absPath).href;
  }
}

function processMarkdownLine(line, state) {
  if (line === "") {
    closeList(state.parts, state.inList);
    state.inList = false;
    return;
  }

  if (line.startsWith("# ")) {
    closeList(state.parts, state.inList);
    state.inList = false;
    if (state.firstTitle === "") {
      state.firstTitle = line.slice(2).trim();
      return;
    }
    state.parts.push(renderHeading(line, 1));
    return;
  }

  if (line.startsWith("## ")) {
    closeList(state.parts, state.inList);
    state.inList = false;
    state.parts.push(renderHeading(line, 2));
    return;
  }

  if (line.startsWith("### ")) {
    closeList(state.parts, state.inList);
    state.inList = false;
    state.parts.push(renderHeading(line, 3));
    return;
  }

  if (line.startsWith("- ")) {
    state.inList = ensureList(state.parts, state.inList);
    state.parts.push(renderListItem(line));
    return;
  }

  closeList(state.parts, state.inList);
  state.inList = false;
  state.parts.push(formatLine(line, "p"));
}

function markdownToHtml(markdown) {
  const lines = normalizeMarkdown(markdown).split("\n");
  const state = {
    parts: [],
    inList: false,
    firstTitle: "",
  };

  for (const rawLine of lines) {
    processMarkdownLine(rawLine.trim(), state);
  }

  closeList(state.parts, state.inList);
  state.inList = false;
  return { title: state.firstTitle, body: state.parts.join("\n") };
}

function resolveBrandAsset(relPath) {
  if (!relPath) return "";
  return resolveAssetPath(relPath, BRAND_DIR);
}

function resolveQrCodeAsset(name) {
  const pngPath = join(QR_DIR, `qr-${name}-color.png`);
  if (existsSync(pngPath)) return resolveAssetPath(pngPath);

  const webpPath = join(QR_DIR, `qr-${name}-color.webp`);
  if (existsSync(webpPath)) return resolveAssetPath(webpPath);

  const bwPngPath = join(QR_DIR, `qr-${name}-bw.png`);
  if (existsSync(bwPngPath)) return resolveAssetPath(bwPngPath);

  const bwWebpPath = join(QR_DIR, `qr-${name}-bw.webp`);
  if (existsSync(bwWebpPath)) return resolveAssetPath(bwWebpPath);

  return "";
}

function buildQrCards() {
  const destinations = [
    {
      keys: ["traho-overview", "homepage"],
      title: "MH Homepage",
      subtitle: "Company overview and credentials",
      href: "https://www.mhc-gc.com",
    },
    {
      keys: ["traho-projects", "projects"],
      title: "Project Portfolio",
      subtitle: "Representative project examples",
      href: "https://www.mhc-gc.com/projects",
    },
    {
      keys: ["traho-services", "services"],
      title: "Service Lines",
      subtitle: "Capabilities and delivery scope",
      href: "https://www.mhc-gc.com/services",
    },
    {
      keys: ["traho-contact", "contact"],
      title: "Direct Contact",
      subtitle: "Schedule and communication path",
      href: "https://www.mhc-gc.com/contact",
    },
    {
      keys: ["traho-safety", "safety-dashboard"],
      title: "Safety Dashboard",
      subtitle: "Safety program visibility",
      href: "https://www.mhc-gc.com/safety",
    },
  ];

  return destinations
    .map((destination) => {
      const key = destination.keys.find((entry) => resolveQrCodeAsset(entry));
      return {
        ...destination,
        src: key ? resolveQrCodeAsset(key) : "",
      };
    })
    .filter((destination) => destination.src);
}

function renderQrCards(cards) {
  if (cards.length === 0) return "";

  return cards
    .map(
      (card) => `
        <article class="qr-card">
          <img class="qr-image" src="${card.src}" alt="QR code for ${escapeHtml(card.title)}" />
          <div>
            <p class="qr-title">${escapeHtml(card.title)}</p>
            <p class="qr-subtitle">${escapeHtml(card.subtitle)}</p>
            <a class="qr-link" href="${card.href}" target="_blank" rel="noreferrer">${escapeHtml(card.href)}</a>
          </div>
        </article>`,
    )
    .join("\n");
}

async function buildHtml(markdown) {
  const brand = JSON.parse(
    await readFile(join(BRAND_DIR, `${brandId}.json`), "utf-8"),
  );
  const { title } = markdownToHtml(markdown);
  const packet = parsePacket(markdown);
  const logo = resolveBrandAsset(brand.logo?.color);
  const detectedClientLogo = findClientLogo(title || packet.title);
  let clientLogo = "";
  if (clientLogoArg) {
    clientLogo = resolveAssetPath(clientLogoArg);
  } else if (detectedClientLogo) {
    clientLogo = resolveAssetPath(detectedClientLogo);
  }
  const websiteUrl = brand.website.startsWith("http")
    ? brand.website
    : `https://${brand.website}`;
  const coverTitle = buildCoverTitle(title || packet.title, brand);
  const qrCards = buildQrCards();
  const qrGuidePanel = renderQrGuidePanel(qrCards);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${escapeHtml(SLUG)} Preview</title>
    <style>
      @page {
        size: letter;
        margin: 0.62in 0.62in 0.72in 0.62in;
      }

      * { box-sizing: border-box; }
      html, body {
        margin: 0;
        padding: 0;
        color: #1f2933;
        font-family: "Helvetica Neue", Arial, sans-serif;
        font-size: 10.5pt;
        line-height: 1.55;
        background: #fff;
      }

      body {
        padding-bottom: 0.2in;
        background: #f3efe8;
      }

      a {
        color: ${brand.colors.primary};
        text-decoration-color: ${brand.colors.secondary};
      }

      .page-shell {
        border: 1px solid #dfd4c7;
        border-radius: 16px;
        overflow: hidden;
        background: white;
      }

      .packet-page {
        break-after: page;
        margin: 0 0 18px;
      }

      .packet-page:last-child {
        break-after: auto;
      }

      .page-chrome {
        border: 1px solid #dfd4c7;
        border-radius: 16px;
        overflow: hidden;
        background: white;
        min-height: 9.15in;
      }

      .cover-page {
        position: relative;
        break-inside: avoid;
        background: white;
        color: ${brand.colors.primaryDark};
      }

      .cover-grid {
        min-height: 9.15in;
        padding: 0.68in 0.64in;
        display: grid;
        grid-template-rows: auto 1fr auto;
        gap: 18px;
      }

      .cover-top {
        display: flex;
        justify-content: space-between;
        gap: 18px;
        align-items: center;
        padding-bottom: 14px;
        border-bottom: 1px solid #dfd4c7;
      }

      .cover-logo {
        height: 62px;
        width: auto;
        background: white;
        border-radius: 14px;
        padding: 0;
      }

      .cover-client-logo {
        max-height: 44px;
        width: auto;
        background: white;
        border-radius: 12px;
        padding: 6px 10px;
        border: 1px solid #dfd4c7;
      }

      .cover-kicker,
      .section-kicker {
        margin: 0 0 10px;
        color: ${brand.colors.secondaryText};
        text-transform: uppercase;
        letter-spacing: 0.16em;
        font-size: 7.5pt;
        font-weight: 800;
      }

      .cover-brand {
        display: flex;
        align-items: center;
        gap: 14px;
      }

      .cover-heading {
        max-width: 6.15in;
        align-self: center;
      }

      .cover-title {
        margin: 0 0 10px;
        font-size: 24pt;
        line-height: 1.04;
        font-weight: 900;
        color: ${brand.colors.primaryDark};
      }

      .cover-subtitle {
        margin: 0 0 14px;
        max-width: 5.8in;
        color: #52606d;
        font-size: 10pt;
      }

      .cover-summary {
        display: block;
      }

      .cover-panel {
        background: #f8f5f0;
        border: 1px solid #dfd4c7;
        border-radius: 16px;
        padding: 14px 16px;
      }

      .cover-panel p {
        margin: 0 0 8px;
      }

      .cover-links {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 10px;
      }

      .cover-link {
        color: ${brand.colors.primary};
        text-decoration: none;
        border-bottom: 1px solid #d9c7b3;
        font-size: 9pt;
      }

      .cover-client {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
      }

      .cover-recipient {
        min-width: 2.2in;
        text-align: right;
      }

      .cover-recipient-label {
        margin: 0 0 8px;
        color: ${brand.colors.secondaryText};
        font-size: 7pt;
        font-weight: 800;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }

      .cover-facts {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 10px;
      }

      .cover-fact {
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        border: 1px solid #dfd4c7;
        background: white;
        padding: 6px 10px;
        color: ${brand.colors.primaryDark};
        font-size: 7.4pt;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        font-weight: 800;
      }

      .toc-page .content-wrap {
        min-height: 9.15in;
      }

      .qr-panel {
        margin: 0 0 18px;
      }

      .qr-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
        margin-top: 10px;
      }

      .qr-card {
        display: grid;
        grid-template-columns: 84px 1fr;
        gap: 12px;
        align-items: center;
        border: 1px solid #e6dbcf;
        border-radius: 12px;
        background: #fff;
        padding: 10px;
      }

      .qr-image {
        width: 84px;
        height: 84px;
        border-radius: 8px;
        border: 1px solid #eadfd3;
        background: #fff;
      }

      .qr-title {
        margin: 0 0 2px;
        color: ${brand.colors.primaryDark};
        font-size: 9.3pt;
        font-weight: 800;
      }

      .qr-subtitle {
        margin: 0 0 4px;
        color: #52606d;
        font-size: 8.6pt;
      }

      .qr-link {
        font-size: 8.2pt;
        font-weight: 700;
        word-break: break-word;
      }

      .toc-grid {
        display: grid;
        grid-template-columns: 1.35fr 1fr;
        gap: 18px;
      }

      .toc-list {
        margin: 0;
        padding: 0;
        list-style: none;
      }

      .toc-item {
        margin: 0 0 12px;
        padding: 0 0 12px;
        border-bottom: 1px solid #eadfd3;
        list-style: none;
      }

      .toc-item::before {
        display: none;
      }

      .toc-item a {
        display: block;
        color: ${brand.colors.primaryDark};
        text-decoration: none;
        font-weight: 800;
      }

      .toc-item span {
        display: block;
        margin-top: 4px;
        color: #52606d;
        font-size: 9pt;
      }

      .content-page .content-wrap {
        min-height: 9.15in;
      }

      .section-summary {
        margin: -6px 0 18px;
        color: #52606d;
        font-size: 10pt;
      }

      .exhibit-page {
        background: linear-gradient(180deg, #fffaf5 0%, #f7f1e9 100%);
      }

      .exhibit-shell {
        min-height: 9.15in;
        display: grid;
        place-items: center;
        text-align: center;
        padding: 0.8in;
      }

      .exhibit-title {
        margin: 0 0 12px;
        max-width: 5.5in;
        color: ${brand.colors.primaryDark};
        font-size: 16pt;
        font-weight: 800;
      }

      .exhibit-copy {
        margin: 0;
        max-width: 4.9in;
        color: #52606d;
        font-size: 10pt;
      }

      .exhibit-link {
        margin: 14px 0 0;
        font-size: 10pt;
        font-weight: 700;
      }

      .hero {
        background:
          radial-gradient(circle at top right, rgba(189,146,100,0.25), transparent 38%),
          linear-gradient(135deg, ${brand.colors.primaryDark} 0%, ${brand.colors.primary} 58%, #4f7e67 100%);
        color: white;
        padding: 26px 28px 22px;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: stretch;
        gap: 22px;
      }

      .header-left {
        display: flex;
        align-items: flex-start;
        gap: 16px;
        flex: 1;
      }

      .logo {
        height: 54px;
        width: auto;
        background: rgba(255,255,255,0.96);
        border-radius: 12px;
        padding: 7px 10px;
        box-shadow: 0 10px 24px rgba(0,0,0,0.18);
      }

      .eyebrow {
        margin: 0 0 4px;
        color: #efe2d2;
        text-transform: uppercase;
        letter-spacing: 0.16em;
        font-size: 7.5pt;
        font-weight: 700;
      }

      .title {
        margin: 0 0 6px;
        color: white;
        font-size: 21pt;
        line-height: 1.05;
        font-weight: 900;
      }

      .tagline {
        margin: 0;
        max-width: 5.6in;
        color: rgba(255,255,255,0.9);
        font-size: 10pt;
        line-height: 1.45;
      }

      .meta {
        min-width: 2.5in;
        background: rgba(255,255,255,0.12);
        border: 1px solid rgba(255,255,255,0.18);
        border-radius: 14px;
        padding: 14px 16px;
        font-size: 8.5pt;
        color: rgba(255,255,255,0.92);
        backdrop-filter: blur(4px);
      }

      .meta-kicker {
        margin: 0 0 6px;
        color: #efe2d2;
        font-size: 7pt;
        text-transform: uppercase;
        letter-spacing: 0.18em;
        font-weight: 700;
      }

      .meta-value {
        margin: 0 0 10px;
        font-size: 10pt;
        font-weight: 700;
        line-height: 1.35;
      }

      .trust-strip {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 18px;
        margin-top: 18px;
        padding-top: 14px;
        border-top: 1px solid rgba(255,255,255,0.18);
      }

      .trust-badges {
        display: flex;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
      }

      .badge {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        border-radius: 999px;
        border: 1px solid rgba(255,255,255,0.16);
        background: rgba(255,255,255,0.1);
        padding: 6px 11px;
        color: white;
        font-size: 7.5pt;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        font-weight: 800;
      }

      .partner-logo {
        height: 26px;
        width: auto;
        background: rgba(255,255,255,0.96);
        border-radius: 9px;
        padding: 4px 7px;
      }

      .hero-links {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
      }

      .hero-link {
        color: white;
        text-decoration: none;
        border-bottom: 1px solid rgba(255,255,255,0.3);
        font-size: 8.5pt;
      }

      .content-wrap {
        padding: 24px 28px 24px;
        background:
          linear-gradient(180deg, #fcfbf9 0%, white 160px),
          white;
      }

      .intro-panel {
        display: grid;
        grid-template-columns: 1.6fr 1fr;
        gap: 16px;
        margin-bottom: 18px;
      }

      .panel {
        background: white;
        border: 1px solid #e2d7ca;
        border-radius: 14px;
        padding: 14px 16px;
        box-shadow: 0 10px 24px rgba(18,35,27,0.05);
      }

      .panel-title {
        margin: 0 0 7px;
        color: ${brand.colors.secondaryText};
        font-size: 7.2pt;
        font-weight: 800;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }

      .panel-copy {
        margin: 0;
        color: #334155;
        font-size: 9.5pt;
        line-height: 1.55;
      }

      h1 {
        margin: 0 0 18px;
        color: ${brand.colors.primaryDark};
        font-size: 19pt;
        line-height: 1.15;
        font-weight: 900;
      }

      h2 {
        display: flex;
        align-items: center;
        gap: 10px;
        margin: 22px 0 10px;
        padding: 10px 12px;
        border: 1px solid #e2d7ca;
        border-radius: 12px;
        background: linear-gradient(180deg, #ffffff 0%, #f7f2ec 100%);
        color: ${brand.colors.primaryDark};
        font-size: 13pt;
        font-weight: 800;
      }

      h2::before {
        content: "";
        width: 10px;
        height: 10px;
        border-radius: 999px;
        background: ${brand.colors.secondary};
        box-shadow: 0 0 0 6px rgba(189,146,100,0.15);
        flex: 0 0 auto;
      }

      h3 {
        margin: 16px 0 8px;
        color: ${brand.colors.primary};
        font-size: 11pt;
        font-weight: 700;
      }

      p {
        margin: 0 0 9px;
      }

      p.kv-row,
      li.kv-row {
        list-style: none;
      }

      .kv-label {
        color: ${brand.colors.primaryDark};
        font-weight: 800;
      }

      .kv-value {
        color: #334155;
      }

      ul {
        margin: 0 0 12px 0;
        padding: 0;
      }

      li {
        margin: 0 0 6px;
        padding-left: 16px;
        position: relative;
        list-style: none;
      }

      li::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0.58em;
        width: 6px;
        height: 6px;
        border-radius: 999px;
        background: ${brand.colors.secondary};
      }

      .content strong {
        color: ${brand.colors.primaryDark};
      }

      .content h2 + p,
      .content h3 + p {
        color: #475569;
      }

      .content h2:has(+ ul),
      .content h2:has(+ p + ul) {
        margin-bottom: 12px;
      }

      .footer {
        margin-top: 22px;
        padding-top: 12px;
        border-top: 1px solid #d9c7b3;
        font-size: 8pt;
        color: #7b8794;
        display: flex;
        justify-content: space-between;
        gap: 10px;
      }

      .footer strong {
        color: ${brand.colors.primaryDark};
      }

      @media print {
        .page-shell {
          border: none;
          border-radius: 0;
        }
      }
    </style>
  </head>
  <body>
    <section class="packet-page cover-page">
      <div class="page-chrome cover-page">
        <div class="cover-grid">
          <div class="cover-top">
            <div class="cover-brand">
              ${logo ? `<img class="cover-logo" src="${logo}" alt="${escapeHtml(brand.companyName)}" />` : ""}
              <div>
                <p class="cover-kicker">MH Construction Qualifications Package</p>
                <p style="margin:0;color:${brand.colors.secondaryText};font-size:9pt;">${escapeHtml(brand.tagline)}</p>
              </div>
            </div>
            <div class="cover-recipient">
              <p class="cover-recipient-label">Prepared For</p>
              ${clientLogo ? `<img class="cover-client-logo" src="${clientLogo}" alt="Traho Architects" />` : `<p style="margin:0;color:${brand.colors.primaryDark};font-weight:800;">Traho Architects</p>`}
            </div>
          </div>

          <div class="cover-heading">
            <p class="cover-kicker">Request For Qualifications Response</p>
            <h1 class="cover-title">${escapeHtml(coverTitle)}</h1>
            <p class="cover-subtitle">Prepared for Traho Architects, P.S. as a shortlist-ready qualifications package with direct regulatory verification, relevant project references, and supporting exhibit structure.</p>
            <div class="cover-summary">
              <div class="cover-panel">
                <p><strong>${escapeHtml(brand.companyName)}</strong></p>
                <p>${escapeHtml(brand.address)}</p>
                <div class="cover-links">
                  <a class="cover-link" href="${websiteUrl}">${escapeHtml(brand.website)}</a>
                  <a class="cover-link" href="https://secure.lni.wa.gov/verify/Detail.aspx?UBI=603069508&LIC=MHCONCI907R7&SAW=false">WA L&amp;I Verification</a>
                  <a class="cover-link" href="https://www.bbb.org/us/wa/pasco/profile/construction/mh-construction-inc-1296-1000191036/#sealclick">BBB Accredited Profile</a>
                </div>
                <div class="cover-facts">
                  <span class="cover-fact">${packet.sections.length} Sections</span>
                  <span class="cover-fact">${packet.exhibits.length} Exhibits</span>
                  <span class="cover-fact">Veteran-Owned</span>
                  <span class="cover-fact">A+ BBB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="packet-page toc-page" id="table-of-contents">
      <div class="page-chrome">
        <div class="content-wrap">
          <p class="section-kicker">Navigation</p>
          <h1>Table of Contents</h1>
          <div class="panel" style="margin-bottom: 18px;">
            <p class="panel-title">Review Notes</p>
            <p class="panel-copy">This packet is intentionally simple: cover, navigation, qualifications sections, and supporting exhibits. Use the QR codes below to jump directly to MH Construction web pages during review.</p>
          </div>
          <div class="toc-grid">
            <div class="panel">
              <p class="panel-title">Qualifications Sections</p>
              <ol class="toc-list">
                ${renderTocItems(packet.sections, "toc-item")}
              </ol>
            </div>
            <div class="panel">
              <p class="panel-title">Supporting Exhibits</p>
              <ol class="toc-list">
                ${renderTocItems(packet.exhibits, "toc-item")}
              </ol>
              ${qrGuidePanel}
            </div>
          </div>
        </div>
      </div>
    </section>

    ${renderSectionPages(packet)}
    ${renderExhibitPages(packet.exhibits)}
  </body>
</html>`;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const markdown = await readFile(INPUT_PATH, "utf-8");
  const html = await buildHtml(markdown);
  await writeFile(HTML_PATH, html, "utf-8");

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.goto(pathToFileURL(HTML_PATH).toString(), {
      waitUntil: "networkidle0",
    });
    await page.pdf({
      path: PDF_PATH,
      format: "Letter",
      printBackground: true,
      preferCSSPageSize: true,
    });
  } finally {
    await browser.close();
  }

  console.log(`HTML preview: ${HTML_PATH}`);
  console.log(`PDF preview:  ${PDF_PATH}`);
}

try {
  await main();
} catch (error) {
  console.error("❌ Preview generation failed:", error?.message || error);
  process.exit(1);
}
