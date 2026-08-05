#!/usr/bin/env node
/* eslint-disable no-console, prefer-template */

import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const MANIFEST_PATH = join(ROOT, "documents/content/employee-handbook.json");
const DEFAULT_SOURCE_DOCX = join(
  ROOT,
  "documents/input/08-forms-ehb/mh-employee-handbook-v3-0-draft.docx",
);
const DEFAULT_SECTION_DIR = join(
  ROOT,
  "documents/content/mhc-employee-handbook-2026/sections",
);
const SOURCE_PAGE_PATTERN = /^SOURCE PAGE\s+(\d+)$/i;
const SECTION_START_PATTERN = /^SECTION\s+(\d{2})\s+REVISION$/i;
const SINGLE_MARKER_PATTERN = /^\d+\.$/;
const HEADING_PATTERN = /^[A-Z0-9&/(),.' -]+$/;
const KNOWN_ACRONYMS = new Map([
  ["Ai", "AI"],
  ["Agc", "AGC"],
  ["Coo", "COO"],
  ["Eap", "EAP"],
  ["Hr", "HR"],
  ["Id", "ID"],
  ["Llm", "LLM"],
  ["Mh", "MH"],
  ["Mish", "MISH"],
  ["Osha", "OSHA"],
  ["Or", "OR"],
  ["Ppe", "PPE"],
  ["Pto", "PTO"],
  ["Sssp", "SSSP"],
  ["Wa", "WA"],
  ["Wac/Wisha", "WAC/WISHA"],
  ["Or-Osha", "OR-OSHA"],
]);

const args = process.argv.slice(2);

const getArg = (flag) => {
  const index = args.indexOf(flag);
  return index === -1 ? null : args[index + 1] || null;
};

const SOURCE_DOCX = getArg("--input")
  ? resolve(ROOT, getArg("--input"))
  : DEFAULT_SOURCE_DOCX;
const SECTION_DIR = getArg("--output-dir")
  ? resolve(ROOT, getArg("--output-dir"))
  : DEFAULT_SECTION_DIR;

async function extractRawDocxText(docxPath) {
  const mammoth = await import("mammoth");
  const result = await mammoth.extractRawText({ path: docxPath });
  return String(result.value || "").replace(/\r\n?/g, "\n");
}

function parseDocxPageCount(rawText) {
  const matches = [...String(rawText || "").matchAll(/SOURCE PAGE\s+(\d+)/gi)];
  if (matches.length === 0) return 0;
  return Math.max(...matches.map((match) => Number(match[1]) || 0));
}

function normalizeWhitespace(text) {
  return text.replace(/\s+/g, " ").trim();
}

function cleanJoinedText(text) {
  return normalizeWhitespace(
    text
      .replace(/([A-Za-z])-\s+([a-z])/g, "$1$2")
      .replace(/\s+([,.;:!?])/g, "$1")
      .replace(/\(\s+/g, "(")
      .replace(/\s+\)/g, ")"),
  );
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function toTitleCase(text) {
  const lowered = text.toLowerCase();
  const titled = lowered.replace(/\b([a-z])(\w*)/g, (_, first, rest) => {
    return `${first.toUpperCase()}${rest}`;
  });

  let restored = titled;
  for (const [needle, replacement] of KNOWN_ACRONYMS.entries()) {
    restored = restored.replace(
      new RegExp(`\\b${needle}\\b`, "g"),
      replacement,
    );
  }
  return restored;
}

function shouldSkipLine(line) {
  return (
    !line ||
    SOURCE_PAGE_PATTERN.test(line) ||
    /^MH CONSTRUCTION\s+[•|].*PASCO/i.test(line) ||
    /^HB\s+\d{2}$/i.test(line) ||
    /^HANDBOOK SECTION\s+\d{2}$/i.test(line) ||
    /^TAB\s+\d{2}\s+REV\s+/i.test(line) ||
    /^SECTION\s+\d{2}\s+REVISION$/i.test(line) ||
    /^DOCUMENT$/i.test(line) ||
    /^PROGRAM$/i.test(line) ||
    /^FOUNDED 2010, VETERAN-OWNED SINCE JANUARY 2025$/i.test(line) ||
    /^VETERAN-\s*OWNED .* BUILT ON QUALITY, BACKED BY TRUST$/i.test(line)
  );
}

function splitChapters(rawText) {
  const lines = rawText.split("\n");
  const chapters = new Map();
  let currentNumber = null;

  for (const rawLine of lines) {
    const line = normalizeWhitespace(rawLine.replace(/\f/g, " "));
    if (!line) {
      if (currentNumber) {
        chapters.get(currentNumber).push("");
      }
      continue;
    }

    const chapterMatch = line.match(SECTION_START_PATTERN);
    if (chapterMatch) {
      currentNumber = Number(chapterMatch[1]);
      chapters.set(currentNumber, []);
      continue;
    }

    if (!currentNumber) {
      continue;
    }

    if (
      /^FORMS APPENDIX TABLE OF CONTENTS$/i.test(line) ||
      /^HANDBOOK-FORM-\d+/i.test(line)
    ) {
      currentNumber = null;
      continue;
    }

    chapters.get(currentNumber).push(line);
  }

  return chapters;
}

function collectContentLines(lines) {
  return lines.filter((line) => {
    if (shouldSkipLine(line)) {
      return false;
    }
    return !SINGLE_MARKER_PATTERN.test(line);
  });
}

function isHeadingLine(line) {
  const combined = line.trim();
  return (
    combined.length > 0 &&
    combined.length <= 120 &&
    HEADING_PATTERN.test(combined) &&
    combined === combined.toUpperCase()
  );
}

function buildListHtml(items) {
  const normalizedItems = items
    .map((item) => cleanJoinedText(item.join(" ")))
    .filter(Boolean);

  const listItems = normalizedItems
    .map((item) => `  <li class="sec-bullet">${escapeHtml(item)}</li>`)
    .join("\n");

  return `<ul class="sec-list">\n${listItems}\n</ul>`;
}

function buildHeadingHtml(lines) {
  const text = cleanJoinedText(lines.join(" "));
  if (!text) {
    return "";
  }

  if (text === "BUILT ON QUALITY, BACKED BY TRUST.") {
    return `<p><strong>${escapeHtml("Built on Quality, Backed by Trust.")}</strong></p>`;
  }

  return `<h2 class="sec-subhead">${escapeHtml(toTitleCase(text))}</h2>`;
}

function buildParagraphHtml(lines) {
  const text = cleanJoinedText(lines.join(" "));
  return text ? `<p>${escapeHtml(text)}</p>` : "";
}

function buildStructuredHtml(lines) {
  const fragments = [];
  const contentLines = collectContentLines(lines);
  let paragraphLines = [];
  let bulletItems = [];
  let currentBullet = [];

  const flushParagraph = () => {
    const html = buildParagraphHtml(paragraphLines);
    if (html) {
      fragments.push(html);
    }
    paragraphLines = [];
  };

  const flushList = () => {
    if (currentBullet.length > 0) {
      bulletItems.push(currentBullet);
      currentBullet = [];
    }
    if (bulletItems.length > 0) {
      fragments.push(buildListHtml(bulletItems));
      bulletItems = [];
    }
  };

  for (let index = 0; index < contentLines.length; index += 1) {
    const line = contentLines[index];

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    if (isHeadingLine(line)) {
      flushParagraph();
      flushList();
      const headingLines = [line];
      while (
        index + 1 < contentLines.length &&
        isHeadingLine(contentLines[index + 1])
      ) {
        headingLines.push(contentLines[index + 1]);
        index += 1;
      }
      const html = buildHeadingHtml(headingLines);
      if (html) {
        fragments.push(html);
      }
      continue;
    }

    if (/^\u2022\s*/u.test(line)) {
      flushParagraph();
      if (currentBullet.length > 0) {
        bulletItems.push(currentBullet);
      }
      currentBullet = [line.replace(/^\u2022\s*/u, "")];
      continue;
    }

    if (currentBullet.length > 0) {
      currentBullet.push(line);
      continue;
    }

    paragraphLines.push(line);
  }

  flushParagraph();
  flushList();
  return fragments.join("\n");
}

function buildSectionHtml(section, lines) {
  const body = buildStructuredHtml(lines);
  return `<!--\n  Employee Handbook — Chapter ${String(section.number).padStart(2, "0")}: ${section.title} (GENERATED SOURCE)\n  ------------------------------------------------------------------\n  Generated from mh-employee-handbook-v3-0-draft.docx by documents/scripts/extract-handbook-pdf.mjs.\n  Edit freely after regeneration. The numbered 08-forms-ehb DOCX is the authoritative replacement source.\n-->\n${body}\n`;
}

async function removeExistingSectionHtml(sectionDir) {
  const entries = await readdir(sectionDir, { withFileTypes: true });
  const deletions = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
    .map((entry) => rm(join(sectionDir, entry.name)));
  await Promise.all(deletions);
}

async function main() {
  console.log("📄 MH Construction — Employee Handbook DOCX Extractor");
  console.log("=====================================================");
  console.log(`Input:    ${SOURCE_DOCX}`);
  console.log(`Manifest: ${MANIFEST_PATH}`);
  console.log(`Output:   ${SECTION_DIR}\n`);

  const manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf-8"));
  const sections = Array.isArray(manifest.sections) ? manifest.sections : [];
  if (sections.length === 0) {
    throw new Error("employee-handbook.json does not contain any sections.");
  }

  const rawText = await extractRawDocxText(SOURCE_DOCX);
  const chapterMap = splitChapters(rawText);
  const totalPages = parseDocxPageCount(rawText);

  await mkdir(SECTION_DIR, { recursive: true });
  await removeExistingSectionHtml(SECTION_DIR);

  for (const section of sections) {
    const chapterLines = chapterMap.get(Number(section.number));
    if (!chapterLines) {
      throw new Error(
        `Unable to locate chapter ${section.number} in ${SOURCE_DOCX}`,
      );
    }

    const outputPath = String(section.bodyFile).startsWith("documents/")
      ? join(ROOT, String(section.bodyFile))
      : join(SECTION_DIR, String(section.bodyFile));
    const html = buildSectionHtml(section, chapterLines);
    await writeFile(outputPath, html, "utf-8");
    console.log(
      `  ✓ Chapter ${String(section.number).padStart(2, "0")} → ${outputPath}`,
    );
  }

  manifest.document = {
    ...manifest.document,
    totalPages,
    revisionDate: "2026-07-01",
    revisionVersion: "3.0",
    revisionYear: 2026,
    source: "combined-docx-html-fragments",
    sourceDirectory: "documents/input/08-forms-ehb",
    sourceFile:
      "documents/input/08-forms-ehb/mh-employee-handbook-v3-0-draft.docx",
    extractedAt: new Date().toISOString(),
  };

  await writeFile(
    MANIFEST_PATH,
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf-8",
  );

  console.log(`\n✅ Regenerated ${sections.length} handbook chapter file(s).`);
  console.log(
    `   Updated manifest revision metadata and total pages (${totalPages}).`,
  );
}

main().catch((error) => {
  console.error(`\n❌ Fatal error: ${error.message}`);
  process.exit(1);
});
