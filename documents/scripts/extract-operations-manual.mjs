#!/usr/bin/env node
/* eslint-disable no-console, prefer-template */

import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const SOURCE_DIR = join(
  ROOT,
  "documents/content/mhc-operations-manual-drafts/02-section-drafts",
);
const OUTPUT_DIR = join(
  ROOT,
  "documents/content/mhc-operations-manual-2026/sections",
);
const MANIFEST_PATH = join(ROOT, "documents/content/operations-manual.json");

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-|-$/g, "");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
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

async function main() {
  if (!existsSync(SOURCE_DIR)) {
    throw new Error(`Source directory not found: ${SOURCE_DIR}`);
  }

  const entries = await readdir(SOURCE_DIR);
  const markdownFiles = entries
    .filter((entry) => extname(entry).toLowerCase() === ".md")
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  if (markdownFiles.length === 0) {
    throw new Error(`No markdown files found in ${SOURCE_DIR}`);
  }

  await mkdir(OUTPUT_DIR, { recursive: true });

  const sections = [];
  for (let index = 0; index < markdownFiles.length; index += 1) {
    const fileName = markdownFiles[index];
    const sectionNumber = index + 1;
    const numberStr = String(sectionNumber).padStart(2, "0");
    const sourcePath = join(SOURCE_DIR, fileName);
    const markdown = await readFile(sourcePath, "utf-8");
    const titleLine =
      markdown
        .split("\n")
        .map((line) => line.trim())
        .find((line) => line.startsWith("# ")) || `# Chapter ${numberStr}`;
    const title = titleLine.replace(/^#\s+/, "").trim();
    const bodyMarkdown = markdown.replace(/^#\s+.+$/m, "").trim();
    const htmlBody = markdownToHtml(bodyMarkdown);
    const slug = slugify(title || fileName.replace(/\.md$/i, ""));
    const outputFileName = `${numberStr}-${slug}.html`;
    const outputPath = join(OUTPUT_DIR, outputFileName);

    const html = `<!--\n  Operations Manual — Chapter ${numberStr}: ${title} (GENERATED SOURCE)\n  ------------------------------------------------------------------\n  Generated from section drafts by documents/scripts/extract-operations-manual.mjs.\n  Edit freely after regeneration. Source markdown remains authoritative.\n-->\n${htmlBody}\n`;

    await writeFile(outputPath, html, "utf-8");

    sections.push({
      number: sectionNumber,
      title,
      slug,
      subtitle: "",
      pages: "TBD",
      bodyFile: `documents/content/mhc-operations-manual-2026/sections/${outputFileName}`,
      forms: [],
    });
  }

  const manifest = {
    document: {
      id: "operations-manual",
      title: "Operations Manual",
      subtitle: "MH Construction Operations Policies and Procedures",
      revisionYear: 2026,
      revisionDate: "2026-07-29",
      revisionVersion: "2.0",
      company: "MH Construction, Inc.",
      address: "3111 N. Capitol Ave., Pasco, WA 99301",
      phone: "(509) 308-6489",
      website: "https://www.mhc-gc.com",
      totalPages: 0,
      source: "markdown-html-fragments",
      sourceDirectory:
        "documents/content/mhc-operations-manual-drafts/02-section-drafts",
      manualFamily: "operations",
      separateFrom: "employee-handbook",
      formsManifest: "documents/forms/forms-manifest.json",
      formsPolicy: "operations-owned",
      extractedAt: new Date().toISOString(),
    },
    sections,
  };

  await writeFile(
    MANIFEST_PATH,
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf-8",
  );

  console.log("📄 MH Construction — Operations Manual Extractor");
  console.log("================================================");
  console.log(`Source:   ${SOURCE_DIR}`);
  console.log(`Sections: ${OUTPUT_DIR}`);
  console.log(`Manifest: ${MANIFEST_PATH}`);
  console.log(`\n✅ Generated ${sections.length} operations chapter file(s).`);
}

main().catch((error) => {
  console.error(`\n❌ Fatal error: ${error.message}`);
  process.exit(1);
});
