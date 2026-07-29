#!/usr/bin/env node
/* eslint-disable no-console, prefer-template */

import { mkdir, readFile, readdir, writeFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const SOURCE_MD = join(ROOT, "docs/marketing/marketing-strategy-guide.md");
const OUTPUT_DIR = join(
  ROOT,
  "documents/content/mhc-marketing-strategy-guide-2026/sections",
);
const MANIFEST_PATH = join(
  ROOT,
  "documents/content/marketing-strategy-guide.json",
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
    const headingMatch = /^##\s+(\d+)\.\s+(.+)$/.exec(line.trim());
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

async function main() {
  if (!existsSync(SOURCE_MD)) {
    throw new Error(`Source markdown not found: ${SOURCE_MD}`);
  }

  const source = await readFile(SOURCE_MD, "utf-8");
  const rawSections = splitSections(source);
  if (rawSections.length === 0) {
    throw new Error(`No sections found in ${SOURCE_MD}`);
  }

  await rm(OUTPUT_DIR, { recursive: true, force: true });
  await mkdir(OUTPUT_DIR, { recursive: true });

  const sections = [];
  rawSections.forEach((entry, index) => {
    const number = index + 1;
    const numberStr = String(number).padStart(2, "0");
    const title = entry.title.replace(/^\d+\.\s*/, "").trim();
    const slug = slugify(title);
    const bodyMarkdown = entry.bodyLines.join("\n").trim();
    const html = markdownToHtml(bodyMarkdown);
    const outputFileName = `${numberStr}-${slug}.html`;

    sections.push({
      number,
      title,
      slug,
      subtitle: "",
      pages: "TBD",
      bodyFile: `documents/content/mhc-marketing-strategy-guide-2026/sections/${outputFileName}`,
      forms: [],
    });

    const fragment = `<!--\n  Marketing Strategy Guide — Section ${numberStr}: ${title} (GENERATED SOURCE)\n  ------------------------------------------------------------------\n  Generated from docs/marketing/marketing-strategy-guide.md by documents/scripts/extract-marketing-strategy-guide.mjs.\n  Edit freely after regeneration. The markdown guide remains the authoritative source.\n-->\n${html}\n`;
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
      id: "marketing-strategy-guide",
      title: "Marketing Strategy Guide",
      subtitle: "36-Week Project Marketing Roadmap and Operating Guide",
      revisionYear: 2026,
      revisionDate: "2026-07-29",
      revisionVersion: "1.0",
      company: "MH Construction, Inc.",
      address: "3111 N. Capitol Ave., Pasco, WA 99301",
      phone: "(509) 308-6489",
      website: "https://www.mhc-gc.com",
      totalPages: 0,
      source: "markdown-guide-extracted",
      sourceDirectory: "docs/marketing/marketing-strategy-guide.md",
      manualFamily: "marketing",
      separateFrom: "employee-handbook",
      formsManifest: "documents/forms/forms-manifest.json",
      formsPolicy: "none",
      extractedAt: new Date().toISOString(),
    },
    sections,
  };

  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf-8");

  console.log(`✅ Extracted ${sections.length} marketing guide section(s).`);
  console.log(`   Manifest → ${MANIFEST_PATH}`);
  console.log(`   Sections → ${OUTPUT_DIR}`);
}

main().catch((error) => {
  console.error("\n❌ Fatal error:", error);
  process.exit(1);
});
