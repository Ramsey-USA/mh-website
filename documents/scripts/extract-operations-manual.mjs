#!/usr/bin/env node
/* eslint-disable no-console, prefer-template */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const SOURCE_DOCX = join(
  ROOT,
  "documents/input/01-core-doctrine/mh-operations-manual-v1-0-draft.docx",
);
const SOURCE_MD = join(ROOT, "docs/operations/operations-manual.md");
const OUTPUT_DIR = join(
  ROOT,
  "documents/content/mhc-operations-manual-2026/sections",
);
const MANIFEST_PATH = join(ROOT, "documents/content/operations-manual.json");

export function resolveOperationsManualSourcePath() {
  if (existsSync(SOURCE_DOCX)) {
    return SOURCE_DOCX;
  }
  if (existsSync(SOURCE_MD)) {
    return SOURCE_MD;
  }
  return null;
}

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
  const sourcePath = resolveOperationsManualSourcePath();
  if (!sourcePath) {
    throw new Error(`Source file not found: ${SOURCE_DOCX} or ${SOURCE_MD}`);
  }

  const usingDocx = sourcePath === SOURCE_DOCX;
  let sectionEntries = [];

  if (usingDocx) {
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

    const sectionTitles = lines
      .filter((line) => /^OPS-\d+/i.test(line))
      .map((line) => line.replace(/^OPS-\d+\s*\|\s*/i, "").trim())
      .filter(Boolean);

    sectionEntries = sectionTitles.map((title, index) => ({
      fileName: `${String(index + 1).padStart(2, "0")}-${slugify(title)}.md`,
      markdown: `# ${title}`,
    }));

    if (sectionEntries.length === 0) {
      sectionEntries = [
        {
          fileName: "01-operations-manual-overview.md",
          markdown: "# Operations Manual Overview",
        },
      ];
    }
  } else {
    const markdown = await readFile(sourcePath, "utf-8");
    sectionEntries = markdown
      .split(/\n(?=##\s+)/)
      .filter(Boolean)
      .map((chunk, index) => ({
        fileName: `${String(index + 1).padStart(2, "0")}-${slugify(chunk.split(/\n/)[0].replace(/^#\s+/, ""))}.md`,
        markdown: chunk,
      }));
  }

  if (sectionEntries.length === 0) {
    throw new Error(`No section content found in ${sourcePath}`);
  }

  await mkdir(OUTPUT_DIR, { recursive: true });

  const sections = [];
  for (let index = 0; index < sectionEntries.length; index += 1) {
    const entry = sectionEntries[index];
    const sectionNumber = index + 1;
    const numberStr = String(sectionNumber).padStart(2, "0");
    const fileName = entry.fileName;
    const markdown = entry.markdown;
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

    const html = `<!--\n  Operations Manual — Chapter ${numberStr}: ${title} (GENERATED SOURCE)\n  ------------------------------------------------------------------\n  Generated from ${sourcePath.replace(ROOT + "/", "")} by documents/scripts/extract-operations-manual.mjs.\n  Edit freely after regeneration.\n-->\n${htmlBody}\n`;

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
      source: usingDocx ? "docx-guide-extracted" : "markdown-html-fragments",
      sourceDirectory: sourcePath.replace(ROOT + "/", ""),
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
  console.log(`Source:   ${sourcePath.replace(ROOT + "/", "")}`);
  console.log(`Sections: ${OUTPUT_DIR}`);
  console.log(`Manifest: ${MANIFEST_PATH}`);
  console.log(`\n✅ Generated ${sections.length} operations chapter file(s).`);
}

const invokedDirectly =
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (invokedDirectly) {
  main().catch((error) => {
    console.error(`\n❌ Fatal error: ${error.message}`);
    process.exit(1);
  });
}
