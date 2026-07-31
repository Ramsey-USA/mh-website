#!/usr/bin/env node
/* eslint-disable no-console, prefer-template */

import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const SOURCE_MD = join(ROOT, "docs/sales/sales-estimating-guide.md");
const SOURCE_DOCX = join(
  ROOT,
  "documents/input/sales strategy/MHC-Sales-Estimating-Guide-v3.docx",
);
const OUTPUT_DIR = join(
  ROOT,
  "documents/content/mhc-sales-estimating-guide-2026/sections",
);
const MANIFEST_PATH = join(
  ROOT,
  "documents/content/sales-estimating-guide.json",
);

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

function splitSections(markdown) {
  const lines = markdown.replaceAll("\r\n", "\n").split("\n");
  const sections = [];
  let current = null;

  const flush = () => {
    if (!current) return;
    sections.push(current);
    current = null;
  };

  for (const line of lines) {
    const headingMatch =
      /^##\s+(?:Chapter\s+)?(\d+)(?:\.\s*|\s*:\s*)(.+)$/.exec(line.trim());
    if (headingMatch) {
      flush();
      current = {
        title: headingMatch[2].trim(),
        bodyLines: [],
      };
      continue;
    }

    if (!current) continue;
    current.bodyLines.push(line);
  }

  flush();
  return sections;
}

function splitInlineBullets(line) {
  return String(line)
    .split(/\s+-\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function textLinesToHtml(lines) {
  const parts = [];

  for (const rawLine of lines) {
    const line = String(rawLine || "").trim();
    if (!line) continue;

    const bulletParts = splitInlineBullets(line);
    if (bulletParts.length > 1) {
      const intro = bulletParts.shift();
      if (intro) {
        parts.push(`<p>${formatInline(intro)}</p>`);
      }
      parts.push("<ul>");
      for (const bullet of bulletParts) {
        parts.push(`<li>${formatInline(bullet)}</li>`);
      }
      parts.push("</ul>");
      continue;
    }

    parts.push(`<p>${formatInline(line)}</p>`);
  }

  return parts.join("\n");
}

async function loadSectionsFromDocx(sourcePath) {
  const mammothMod = await import("mammoth");
  const extractRawText =
    mammothMod?.extractRawText || mammothMod?.default?.extractRawText;
  if (typeof extractRawText !== "function") {
    throw new Error("mammoth.extractRawText is unavailable");
  }

  const result = await extractRawText({ path: sourcePath });
  const lines = String(result?.value || "")
    .replaceAll("\r\n", "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const sections = [];
  let current = null;

  const flush = () => {
    if (!current) return;
    sections.push(current);
    current = null;
  };

  for (const line of lines) {
    const headingMatch = /^(\d+)\.\s+(.+)$/.exec(line);
    if (headingMatch) {
      flush();
      current = {
        title: headingMatch[2].trim(),
        bodyHtmlLines: [],
      };
      continue;
    }

    if (!current) continue;
    current.bodyHtmlLines.push(line);
  }

  flush();

  return sections.map((section) => ({
    title: section.title,
    bodyHtml: textLinesToHtml(section.bodyHtmlLines),
  }));
}

async function main() {
  const sourcePath = existsSync(SOURCE_MD)
    ? SOURCE_MD
    : existsSync(SOURCE_DOCX)
      ? SOURCE_DOCX
      : null;
  if (!sourcePath) {
    throw new Error(`Source file not found: ${SOURCE_MD} or ${SOURCE_DOCX}`);
  }
  const usingDocx = sourcePath === SOURCE_DOCX;

  const rawSections = usingDocx
    ? await loadSectionsFromDocx(sourcePath)
    : splitSections(await readFile(sourcePath, "utf-8"));
  if (rawSections.length === 0) {
    throw new Error(`No sections found in ${sourcePath}`);
  }

  await rm(OUTPUT_DIR, { recursive: true, force: true });
  await mkdir(OUTPUT_DIR, { recursive: true });

  const sections = [];
  rawSections.forEach((entry, index) => {
    const number = index + 1;
    const numberStr = String(number).padStart(2, "0");
    const title = entry.title.replace(/^\d+\.\s*/, "").trim();
    const slug = slugify(title);
    const bodyMarkdown = Array.isArray(entry.bodyLines)
      ? entry.bodyLines.join("\n").trim()
      : "";
    const html =
      typeof entry.bodyHtml === "string" && entry.bodyHtml.trim()
        ? entry.bodyHtml
        : markdownToHtml(bodyMarkdown);
    const outputFileName = `${numberStr}-${slug}.html`;

    sections.push({
      number,
      title,
      slug,
      subtitle: "",
      pages: "TBD",
      bodyFile: `documents/content/mhc-sales-estimating-guide-2026/sections/${outputFileName}`,
      forms: [],
    });

    const fragment = `<!--
  Sales/Estimating Guide — Section ${numberStr}: ${title} (GENERATED SOURCE)
  ------------------------------------------------------------------
  Generated from ${sourcePath.replace(ROOT + "/", "")} by documents/scripts/extract-sales-estimating-guide.mjs.
  Edit freely after regeneration.
-->
${html}
`;
    sections[sections.length - 1].outputPath = join(OUTPUT_DIR, outputFileName);
    sections[sections.length - 1].fragment = fragment;
  });

  for (const section of sections) {
    await writeFile(section.outputPath, section.fragment, "utf-8");
    delete section.outputPath;
    delete section.fragment;
  }

  const manifest = {
    document: {
      id: "sales-estimating-guide",
      title: "Sales/Estimating Guide",
      subtitle: "Lead Qualification and Proposal Discipline Operating Guide",
      revisionYear: 2026,
      revisionDate: "2026-07-31",
      revisionVersion: "2.0.3",
      company: "MH Construction, Inc.",
      address: "3111 N. Capitol Ave., Pasco, WA 99301",
      phone: "(509) 308-6489",
      website: "https://www.mhc-gc.com",
      totalPages: 0,
      source: usingDocx ? "docx-guide-extracted" : "markdown-guide-extracted",
      sourceDirectory: sourcePath.replace(ROOT + "/", ""),
      manualFamily: "sales",
      separateFrom: "employee-handbook",
      formsManifest: "documents/forms/forms-manifest.json",
      formsPolicy: "none",
      extractedAt: new Date().toISOString(),
    },
    sections,
  };

  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf-8");

  console.log(`✅ Extracted ${sections.length} sales guide section(s).`);
  console.log(`   Manifest → ${MANIFEST_PATH}`);
  console.log(`   Sections → ${OUTPUT_DIR}`);
}

main().catch((error) => {
  console.error("\n❌ Fatal error:", error);
  process.exit(1);
});
