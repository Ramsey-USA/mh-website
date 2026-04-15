#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * documents/scripts/extract-word.mjs
 *
 * Reads .docx files from documents/content/MHC_Safety_Program_2026_Word/ and
 * updates the matching section bodies in documents/content/safety-manual.json
 * with clean HTML produced by mammoth (preserves real paragraph marks from Word).
 *
 * Usage:
 *   npm run docs:extract-word
 *   node documents/scripts/extract-word.mjs
 *
 * File naming: Word files must start with the AISH_XX prefix, e.g.:
 *   AISH_01_Injury_Free_Workplace_Plan.docx
 *
 * Backward-compatible: sections without a .docx keep their existing body.
 */

import mammoth from "mammoth";
import { readFile, writeFile, readdir, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { join, resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const WORD_DIR = join(ROOT, "documents/content/MHC_Safety_Program_2026_Word");
const MANIFEST = join(ROOT, "documents/content/safety-manual.json");

// ── Mammoth style map ─────────────────────────────────────────────────────────
// Maps common Word heading styles to clean HTML elements.
// Add extra entries here if your Word docs use custom style names.
const STYLE_MAP = [
  "p[style-name='Heading 1'] => h2:fresh",
  "p[style-name='Heading 2'] => h3:fresh",
  "p[style-name='Heading 3'] => h4:fresh",
  "p[style-name='Heading 4'] => h5:fresh",
  // Treat "Title" paragraph style as a heading too
  "p[style-name='Title'] => h2:fresh",
  // Body text variants — map to plain <p>
  "p[style-name='Body Text'] => p:fresh",
  "p[style-name='Body Text 2'] => p:fresh",
  "p[style-name='Body Text 3'] => p:fresh",
  // List styles — mammoth handles <ul>/<ol> automatically; these map extras
  "p[style-name='List Bullet'] => li:fresh",
  "p[style-name='List Bullet 2'] => li:fresh",
  "p[style-name='List Number'] => li:fresh",
  "p[style-name='List Number 2'] => li:fresh",
].join("\n");

// ── Boilerplate patterns to strip from Word body ──────────────────────────────
// These are MH Construction header/footer lines that appear on every page in
// the original Word docs but should not appear in the generated body content.
const STRIP_PATTERNS = [
  /^MH CONSTRUCTION\s*$/i,
  /^Industrial Safety and Health Program\s*$/i,
  /^MISH\s+\d+\s*$/i,
  /^(MISH\s+)?(TOC|0{1,2})\s*$/i,
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
  // Page header/footer lines that sneak into Word body
  /^Page\s+\d+\s*\|\s*AGC/i,
  /^Aligned with AGC CSEA Best Practices/i,
  /^\d{3,4}\s+N\.\s+Capitol/i,
  /^\(509\)\s*308/i,
  /^office@mhc-gc\.com/i,
  /^www\.mhc-gc\.com/i,
];

/**
 * Strip boilerplate <p> elements from mammoth HTML output.
 * Removes:
 *  - Paragraphs whose text content matches any STRIP_PATTERNS entry
 *  - Non-breaking-space-only paragraphs (<p>&nbsp;</p>, <p> </p>, <p></p>)
 *  - Inline style="" attributes (mammoth can emit these from Word formatting)
 */
function stripBoilerplate(html) {
  // Remove empty / whitespace-only paragraphs
  let out = html.replace(/<p>(\s|&nbsp;)*<\/p>/gi, "");

  // Remove inline style attributes
  out = out.replace(/\s+style="[^"]*"/gi, "");

  // Strip colour/font spans that add no semantic value (mammoth occasionally emits these)
  out = out.replace(/<span[^>]*>([^<]*)<\/span>/gi, "$1");

  // Remove boilerplate <p>…</p> blocks whose plain-text matches a strip pattern
  out = out.replace(/<p>([\s\S]*?)<\/p>/gi, (match, inner) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    if (!text) return "";
    if (STRIP_PATTERNS.some((p) => p.test(text))) return "";
    return match;
  });

  // Collapse multiple consecutive newlines introduced by removals
  out = out.replace(/\n{3,}/g, "\n\n").trim();

  return out;
}

/**
 * Extract AISH key (e.g. "AISH_01") from a filename.
 * Returns null if the filename doesn't match.
 */
function extractKey(filename) {
  const m = filename.match(/^(AISH_\d{2})/i);
  return m ? m[1].toUpperCase() : null;
}

async function main() {
  console.log("📄  MH Construction — Word Document Extractor");
  console.log("=============================================");
  console.log(`Input:  ${WORD_DIR}`);
  console.log(`Output: ${MANIFEST}\n`);

  // ── Ensure Word input folder exists ────────────────────────────────────────
  if (!existsSync(WORD_DIR)) {
    await mkdir(WORD_DIR, { recursive: true });
    console.log(`📁  Created: documents/content/MHC_Safety_Program_2026_Word/`);
    console.log(
      `    Drop your .docx files there (AISH_XX_*.docx) then re-run.\n`,
    );
    return;
  }

  // ── Load existing manifest ─────────────────────────────────────────────────
  const manifest = JSON.parse(await readFile(MANIFEST, "utf-8"));

  // Build a lookup: AISH_XX → section object (by reference so we can mutate)
  const sectionByKey = {};
  for (const s of manifest.sections) {
    sectionByKey[s.key.toUpperCase()] = s;
  }

  // ── Discover .docx files ───────────────────────────────────────────────────
  const files = (await readdir(WORD_DIR))
    .filter((f) => f.toLowerCase().endsWith(".docx"))
    .sort();

  if (!files.length) {
    console.log("⚠️   No .docx files found in the Word folder.");
    console.log(`    Drop files named AISH_XX_*.docx into:\n    ${WORD_DIR}\n`);
    return;
  }

  console.log(`Found ${files.length} .docx file(s).\n`);

  let updated = 0;
  let skipped = 0;
  let errors = 0;

  for (const filename of files) {
    const key = extractKey(filename);

    if (!key) {
      console.log(
        `  [SKIP] ${filename}  — filename doesn't start with AISH_XX`,
      );
      skipped++;
      continue;
    }

    const section = sectionByKey[key];
    if (!section) {
      console.log(`  [SKIP] ${filename}  — key ${key} not found in manifest`);
      skipped++;
      continue;
    }

    process.stdout.write(
      `  [${section.numberStr}] ${section.title.padEnd(55)} `,
    );

    try {
      const filePath = join(WORD_DIR, filename);

      const result = await mammoth.convertToHtml(
        { path: filePath },
        { styleMap: STYLE_MAP },
      );

      if (result.messages.length) {
        // Print warnings but don't fail
        const warnings = result.messages
          .filter((m) => m.type === "warning")
          .map((m) => m.message);
        if (warnings.length) {
          process.stdout.write(`⚠  (${warnings.length} warning(s)) `);
        }
      }

      const cleanHtml = stripBoilerplate(result.value);

      // Update the section body in-place
      section.body = cleanHtml;

      // Update word count based on HTML text content
      const plainText = cleanHtml.replace(/<[^>]+>/g, " ");
      section.wordCount = plainText.split(/\s+/).filter(Boolean).length;

      console.log(`✓  (${section.wordCount} words)`);
      updated++;
    } catch (err) {
      console.log(`✗  ERROR: ${err.message}`);
      errors++;
    }
  }

  // ── Write updated manifest ─────────────────────────────────────────────────
  if (updated > 0) {
    manifest.document.extractedAt = new Date().toISOString();
    await writeFile(MANIFEST, JSON.stringify(manifest, null, 2), "utf-8");
    console.log(`\n✅  Updated ${updated} section(s) in safety-manual.json`);
  } else {
    console.log(`\n⚠️   No sections updated.`);
  }

  if (skipped) console.log(`   ${skipped} file(s) skipped`);
  if (errors) console.log(`   ${errors} file(s) failed`);
  console.log(
    `\n   Next: npm run docs:generate:sections -- --rev-date "04/07/2026" --rev-number "2"`,
  );
}

main().catch((err) => {
  console.error("\n❌  Fatal error:", err.message);
  process.exit(1);
});
