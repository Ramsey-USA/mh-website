#!/usr/bin/env node
/* eslint-disable no-console, prefer-template */

import { execFileSync } from "node:child_process";
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const MANIFEST_PATH = join(ROOT, "documents/content/employee-handbook.json");
const DEFAULT_SOURCE_PDF = join(
  ROOT,
  "documents/content/mhc-employee-handbook-2026/sections/MHC_Employee_Handbook_Rev4.pdf",
);
const DEFAULT_SECTION_DIR = join(
  ROOT,
  "documents/content/mhc-employee-handbook-2026/sections",
);
const HANDBOOK_HEADER = "MH CONSTRUCTION, INC. • EMPLOYEE HANDBOOK";
const FOOTER_PATTERN =
  /^MH Construction, Inc\. \| Employee Handbook Rev .* \| Confidential(?: \d+)?$/;
const PAGE_NUMBER_PATTERN = /^\d+\.?$/;
const REVISION_LINE_PATTERN = /^Revision\s+\d+(?:\.\d+)?\s+•\s+Effective\s+/i;
const CHAPTER_START_PATTERN = /^CH\s+(\d{2}):\s*(.*)$/;
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

const SOURCE_PDF = getArg("--input")
  ? resolve(ROOT, getArg("--input"))
  : DEFAULT_SOURCE_PDF;
const SECTION_DIR = getArg("--output-dir")
  ? resolve(ROOT, getArg("--output-dir"))
  : DEFAULT_SECTION_DIR;

function runTextTool(command, toolArgs) {
  try {
    return execFileSync(command, toolArgs, {
      cwd: ROOT,
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch (error) {
    const message = error.stderr?.trim() || error.message;
    throw new Error(`${command} failed: ${message}`);
  }
}

function parsePdfPageCount(pdfPath) {
  const pdfInfo = runTextTool("pdfinfo", [pdfPath]);
  const match = pdfInfo.match(/^Pages:\s+(\d+)$/m);
  return match ? Number(match[1]) : 0;
}

function extractRawPdfText(pdfPath) {
  return runTextTool("pdftotext", ["-raw", pdfPath, "-"]).replace(
    /\r\n?/g,
    "\n",
  );
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
    line === HANDBOOK_HEADER ||
    FOOTER_PATTERN.test(line) ||
    PAGE_NUMBER_PATTERN.test(line) ||
    REVISION_LINE_PATTERN.test(line)
  );
}

function splitChapters(rawText) {
  const lines = rawText.split("\n");
  const chapters = new Map();
  let currentNumber = null;
  let capturingTitle = false;

  for (const rawLine of lines) {
    const line = normalizeWhitespace(rawLine.replace(/\f/g, " "));
    if (!line) {
      if (currentNumber) {
        chapters.get(currentNumber).push("");
      }
      continue;
    }

    const chapterMatch = line.match(CHAPTER_START_PATTERN);
    if (chapterMatch) {
      currentNumber = Number(chapterMatch[1]);
      chapters.set(currentNumber, []);
      capturingTitle = true;
      const remainder = chapterMatch[2].replace(/\s+—\s*$/, "").trim();
      if (remainder) {
        chapters.get(currentNumber).push(`__TITLE__ ${remainder}`);
      }
      continue;
    }

    if (!currentNumber) {
      continue;
    }

    if (capturingTitle) {
      if (REVISION_LINE_PATTERN.test(line)) {
        capturingTitle = false;
        continue;
      }
      chapters
        .get(currentNumber)
        .push(`__TITLE__ ${line.replace(/\s+—\s*$/, "").trim()}`);
      continue;
    }

    chapters.get(currentNumber).push(line);
  }

  return chapters;
}

function collectContentLines(lines) {
  return lines.filter((line) => {
    if (line.startsWith("__TITLE__ ")) {
      return false;
    }
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
  return `<!--\n  Employee Handbook — Chapter ${String(section.number).padStart(2, "0")}: ${section.title} (GENERATED SOURCE)\n  ------------------------------------------------------------------\n  Generated from MHC_Employee_Handbook_Rev4.pdf by documents/scripts/extract-handbook-pdf.mjs.\n  Edit freely after regeneration. The uploaded Rev 4 PDF is the authoritative replacement source.\n-->\n${body}\n`;
}

function legacyBuildListHtml(block) {
  const items = [];
  let current = [];

  for (const line of block) {
    if (/^\u2022\s*/u.test(line)) {
      if (current.length > 0) {
        items.push(cleanJoinedText(current.join(" ")));
      }
      current = [line.replace(/^\u2022\s*/u, "")];
      continue;
    }

    if (current.length === 0) {
      current = [line];
      continue;
    }

    current.push(line);
  }

  if (current.length > 0) {
    items.push(cleanJoinedText(current.join(" ")));
  }

  const listItems = items
    .map((item) => `  <li class="sec-bullet">${escapeHtml(item)}</li>`)
    .join("\n");

  return `<ul class="sec-list">\n${listItems}\n</ul>`;
}

async function removeExistingSectionHtml(sectionDir) {
  const entries = await readdir(sectionDir, { withFileTypes: true });
  const deletions = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
    .map((entry) => rm(join(sectionDir, entry.name)));
  await Promise.all(deletions);
}

async function main() {
  console.log("📄 MH Construction — Employee Handbook PDF Extractor");
  console.log("====================================================");
  console.log(`Input:    ${SOURCE_PDF}`);
  console.log(`Manifest: ${MANIFEST_PATH}`);
  console.log(`Output:   ${SECTION_DIR}\n`);

  const manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf-8"));
  const sections = Array.isArray(manifest.sections) ? manifest.sections : [];
  if (sections.length === 0) {
    throw new Error("employee-handbook.json does not contain any sections.");
  }

  const rawText = extractRawPdfText(SOURCE_PDF);
  const chapterMap = splitChapters(rawText);
  const totalPages = parsePdfPageCount(SOURCE_PDF);

  await mkdir(SECTION_DIR, { recursive: true });
  await removeExistingSectionHtml(SECTION_DIR);

  for (const section of sections) {
    const chapterLines = chapterMap.get(Number(section.number));
    if (!chapterLines) {
      throw new Error(
        `Unable to locate chapter ${section.number} in ${SOURCE_PDF}`,
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
    revisionVersion: "4.0",
    revisionYear: 2026,
    source: "combined-pdf-html-fragments",
    sourcePdf:
      "documents/content/mhc-employee-handbook-2026/sections/MHC_Employee_Handbook_Rev4.pdf",
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
