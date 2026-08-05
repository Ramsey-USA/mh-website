#!/usr/bin/env node
/* eslint-disable no-console, prefer-template */
/**
 * documents/scripts/extract-word.mjs
 *
 * Extracts section text from DOCX files under documents/input/04-safety-and-field-ops/
 * and writes a structured manifest to documents/content/safety-manual.json.
 *
 * Usage:
 *   npm run docs:extract-word
 *   node documents/scripts/extract-word.mjs
 *   node documents/scripts/extract-word.mjs --input documents/input/04-safety-and-field-ops
 */

import { readdir, writeFile } from "fs/promises";
import { readFileSync } from "fs";
import { join, resolve, dirname, extname, basename } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const DEFAULT_INPUT_DIR = join(ROOT, "documents/input/04-safety-and-field-ops");
const OUTPUT = join(ROOT, "documents/content/safety-manual.json");
const COMBINED_MANUAL_PATTERN = /^mish[-_ ]manual.*\.docx$/i;

const args = process.argv.slice(2);
const getArg = (flag) => {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : null;
};

const INPUT_DIR = getArg("--input")
  ? resolve(ROOT, getArg("--input"))
  : DEFAULT_INPUT_DIR;

function normalizeWhitespace(text) {
  return text.replace(/\s+/g, " ").trim();
}

function buildSummary(text, maxChars = 380) {
  const clean = normalizeWhitespace(text);
  const sentences = clean.match(/[^.!?]*[.!?]+/g) || [];
  let summary = "";
  for (const s of sentences) {
    if ((summary + s).length > maxChars) break;
    summary += s + " ";
  }
  if (summary.trim()) return summary.trim();
  if (!clean) return "";
  return clean.length > maxChars ? clean.slice(0, maxChars) + "…" : clean;
}

function buildSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function decodeBasicEntities(text) {
  const ENTITY_MAP = {
    amp: "&",
    quot: '"',
    "#39": "'",
    nbsp: " ",
  };

  // Decode only known entities in one pass to avoid accidental double-unescaping.
  return text.replace(
    /&(amp|quot|#39|nbsp);/g,
    (_, entity) => ENTITY_MAP[entity],
  );
}

function escapeHtml(text) {
  return String(text || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function resolveCanonicalTitleFromBody(html, fallbackTitle) {
  // Primary source: section opener line like "MISH 01 — Safety & Health Program Overview"
  const headingMatch = html.match(/MISH\s*\d{1,2}\s*[—:-]\s*([^<\n]+)/i);
  if (!headingMatch) {
    return fallbackTitle;
  }

  const candidate = normalizeWhitespace(decodeBasicEntities(headingMatch[1]));
  return candidate || fallbackTitle;
}

function buildAssociatedFormId(sectionNumber, index, total) {
  const base = `FORM ${String(sectionNumber).padStart(2, "0")}`;
  return total > 1 ? `${base}-${index + 1}` : base;
}

function parseAssociatedFormsFromTitle(title, sectionNumber) {
  const numericSection = Number(sectionNumber);
  if (!Number.isFinite(numericSection) || numericSection <= 0) {
    return [];
  }

  const match = String(title || "").match(/\(\s*Forms?:\s*([^)]+)\)/i);
  if (!match) {
    return [];
  }

  const labels = String(match[1] || "")
    .split(/\s*&\s*|\s+and\s+/i)
    .map((label) => normalizeWhitespace(label))
    .filter(Boolean);

  return labels.map((label, index) => ({
    id: buildAssociatedFormId(numericSection, index, labels.length),
    title: label,
  }));
}

function parseSectionFromFilename(filename) {
  const name = basename(filename, extname(filename));
  const match = name.match(/MISH[-_](\d{1,2})(?:[-_](.*))?$/i);
  if (!match) return null;

  const number = parseInt(match[1], 10);
  const numberStr = String(number).padStart(2, "0");
  const rawTitle = (match[2] || "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const title = rawTitle || `Section ${numberStr}`;

  return {
    number,
    numberStr,
    key: `MISH_${numberStr}`,
    title,
  };
}

async function listDocxFilesRecursive(dirPath) {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listDocxFilesRecursive(fullPath)));
      continue;
    }

    if (entry.isFile() && extname(entry.name).toLowerCase() === ".docx") {
      files.push(fullPath);
    }
  }

  return files;
}

async function extractDocxHtml(filePath) {
  const mammoth = await import("mammoth");
  const result = await mammoth.convertToHtml({
    buffer: readFileSync(filePath),
  });
  // Preserve native tables/lists/paragraphs; strip surrounding whitespace runs.
  return (result.value || "").replace(/\s+/g, " ").trim();
}

async function extractDocxRawText(filePath) {
  const mammoth = await import("mammoth");
  const result = await mammoth.extractRawText({
    buffer: readFileSync(filePath),
  });
  return String(result.value || "").trim();
}

function sanitizeCombinedManualSectionHtml(html) {
  return html
    .replace(
      /<p>\s*&lt;div class="[^"]+"&gt;&lt;h3&gt;([\s\S]*?)&lt;\/h3&gt;&lt;\/div&gt;\s*<\/p>/gi,
      (_, headingText) => `<h3>${headingText.trim()}</h3>`,
    )
    .replace(/<p>\s*<\/p>/gi, "")
    .trim();
}

function extractSectionsFromCombinedManual(html, sourceName) {
  const headingPattern =
    /<h[1-6][^>]*>\s*MISH\s*(\d{1,2})\s*[—:-]\s*([\s\S]*?)<\/h[1-6]>/gi;
  const matches = [];

  for (const match of html.matchAll(headingPattern)) {
    const number = Number(match[1]);
    if (!Number.isFinite(number) || number <= 0) {
      continue;
    }

    matches.push({
      number,
      title: normalizeWhitespace(
        decodeBasicEntities(String(match[2] || "").replace(/<[^>]+>/g, " ")),
      ),
      index: match.index ?? 0,
      length: match[0].length,
    });
  }

  const extractedSections = new Map();
  for (let index = 0; index < matches.length; index += 1) {
    const current = matches[index];
    const next = matches[index + 1];
    const sectionHtml = sanitizeCombinedManualSectionHtml(
      html.slice(current.index, next ? next.index : html.length),
    );

    if (!sectionHtml) {
      continue;
    }

    const numberStr = String(current.number).padStart(2, "0");
    extractedSections.set(current.number, {
      id: `section-${numberStr}`,
      number: current.number,
      numberStr,
      key: `MISH_${numberStr}`,
      title: current.title || `Section ${numberStr}`,
      slug: buildSlug(current.title || `Section ${numberStr}`),
      filename: `${sourceName}#MISH-${numberStr}`,
      pages: 0,
      wordCount: htmlToPlainText(sectionHtml).split(/\s+/).filter(Boolean)
        .length,
      summary: buildSummary(htmlToPlainText(sectionHtml)),
      forms: parseAssociatedFormsFromTitle(
        current.title || `Section ${numberStr}`,
        current.number,
      ),
      body: sectionHtml,
    });
  }

  return extractedSections;
}

function linesToHtml(lines) {
  return lines
    .map((line) => normalizeWhitespace(line))
    .filter(Boolean)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");
}

function extractSectionsFromCombinedManualText(text, sourceName) {
  const lines = String(text || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const sections = new Map();
  let current = null;

  const commitCurrent = () => {
    if (!current || current.lines.length === 0) {
      return;
    }

    const numberStr = String(current.number).padStart(2, "0");
    const combinedText = current.lines.join(" ");
    sections.set(current.number, {
      id: `section-${numberStr}`,
      number: current.number,
      numberStr,
      key: `MISH_${numberStr}`,
      title: current.title,
      slug: buildSlug(current.title || `Section ${numberStr}`),
      filename: `${sourceName}#MISH-${numberStr}`,
      pages: 0,
      wordCount: combinedText.split(/\s+/).filter(Boolean).length,
      summary: buildSummary(combinedText),
      forms: parseAssociatedFormsFromTitle(current.title, current.number),
      body: linesToHtml(current.lines),
    });
  };

  for (const line of lines) {
    const headingMatch = /^MISH[-\s]?(\d{1,2})\.0:\s*(.+)$/i.exec(line);
    if (headingMatch) {
      commitCurrent();
      current = {
        number: Number(headingMatch[1]),
        title: normalizeWhitespace(headingMatch[2]),
        lines: [line],
      };
      continue;
    }

    if (current) {
      current.lines.push(line);
    }
  }

  commitCurrent();
  return sections;
}

function htmlToPlainText(html) {
  return normalizeWhitespace(html.replace(/<[^>]+>/g, " "));
}

async function main() {
  console.log("📄 MH Construction — Safety Manual DOCX Extractor");
  console.log("=================================================");
  console.log(`Input:  ${INPUT_DIR}`);
  console.log(`Output: ${OUTPUT}\n`);

  const allDocx = await listDocxFilesRecursive(INPUT_DIR);
  if (allDocx.length === 0) {
    throw new Error(`No DOCX files found under: ${INPUT_DIR}`);
  }

  const parsed = allDocx
    .map((filePath) => ({ filePath, meta: parseSectionFromFilename(filePath) }))
    .filter((item) => item.meta)
    .sort((a, b) => a.meta.number - b.meta.number);
  const combinedManualPath = allDocx.find((filePath) =>
    COMBINED_MANUAL_PATTERN.test(basename(filePath)),
  );

  if (parsed.length === 0 && !combinedManualPath) {
    throw new Error(
      "No MISH section DOCX files or combined MISH manual were found in the selected input folder.",
    );
  }

  console.log(
    `Found ${allDocx.length} DOCX files (${parsed.length} matched section naming).\n`,
  );

  const sections = [];
  const presentNumbers = new Set();

  for (const { filePath, meta } of parsed) {
    process.stdout.write(`  [${meta.numberStr}] ${meta.title.padEnd(55)} `);

    try {
      const html = await extractDocxHtml(filePath);
      const text = htmlToPlainText(html);
      const canonicalTitle = resolveCanonicalTitleFromBody(html, meta.title);
      const wordCount = text.split(/\s+/).filter(Boolean).length;
      const summary = buildSummary(text);

      sections.push({
        id: `section-${meta.numberStr}`,
        number: meta.number,
        numberStr: meta.numberStr,
        key: meta.key,
        title: canonicalTitle,
        slug: buildSlug(canonicalTitle),
        filename: basename(filePath),
        pages: 0,
        wordCount,
        summary,
        forms: parseAssociatedFormsFromTitle(canonicalTitle, meta.number),
        body: html,
      });
      presentNumbers.add(meta.number);

      console.log(`✓  (${wordCount} words)`);
    } catch (err) {
      console.log(`✗  ERROR: ${err.message}`);
      sections.push({
        id: `section-${meta.numberStr}`,
        number: meta.number,
        numberStr: meta.numberStr,
        key: meta.key,
        title: meta.title,
        slug: buildSlug(meta.title),
        filename: basename(filePath),
        pages: 0,
        wordCount: 0,
        summary: "Content extraction failed. See source DOCX.",
        forms: parseAssociatedFormsFromTitle(meta.title, meta.number),
        body: "",
        error: err.message,
      });
      presentNumbers.add(meta.number);
    }
  }

  if (combinedManualPath) {
    console.log(
      `\n  ℹ  Scanning combined manual: ${basename(combinedManualPath)}`,
    );
    const combinedHtml = await extractDocxHtml(combinedManualPath);
    let combinedSections = extractSectionsFromCombinedManual(
      combinedHtml,
      basename(combinedManualPath),
    );
    if (combinedSections.size === 0) {
      console.log("  ℹ  Falling back to raw-text MISH parser.");
      const combinedText = await extractDocxRawText(combinedManualPath);
      combinedSections = extractSectionsFromCombinedManualText(
        combinedText,
        basename(combinedManualPath),
      );
    }
    let supplementedCount = 0;

    for (const [number, section] of [...combinedSections.entries()].sort(
      (a, b) => a[0] - b[0],
    )) {
      if (presentNumbers.has(number)) {
        continue;
      }

      sections.push(section);
      presentNumbers.add(number);
      supplementedCount += 1;
      console.log(
        `  [+${section.numberStr}] ${section.title.padEnd(55)} ✓  (combined manual)`,
      );
    }

    if (supplementedCount === 0) {
      console.log(
        "  ℹ  No additional sections were needed from the combined manual.",
      );
    }
  }

  sections.sort((a, b) => a.number - b.number);

  const manifest = {
    document: {
      id: "safety-manual",
      title: "Safety Manual",
      subtitle: "MISH Safety Program",
      revisionYear: 2026,
      revisionDate: "2026-01-01",
      company: "MH Construction, Inc.",
      address: "3111 N. Capitol Ave., Pasco, WA 99301",
      phone: "(509) 308-6489",
      website: "https://www.mhc-gc.com",
      licenses: {
        WA: "MHCONCI907R7",
        OR: "194331",
        ID: "RCE-49250",
      },
      totalSections: sections.length,
      totalPages: 0,
      manualFamily: "mish",
      separateFrom: "employee-handbook",
      formsManifest: "documents/forms/forms-manifest.json",
      formsPolicy: "shared",
      extractedAt: new Date().toISOString(),
      source: "docx",
      sourceRoot: INPUT_DIR,
    },
    sections,
  };

  await writeFile(OUTPUT, JSON.stringify(manifest, null, 2), "utf-8");

  console.log(`\n✅ Extraction complete.`);
  console.log(`   ${sections.length} sections`);
  console.log(`   Output → ${OUTPUT}`);
}

main().catch((err) => {
  if (err.message.includes("Cannot find package 'mammoth'")) {
    console.error("\n❌ Missing optional dependency: mammoth");
    console.error("   Install with: npm install mammoth");
  }
  console.error("\n❌ Fatal error:", err.message || err);
  process.exit(1);
});
