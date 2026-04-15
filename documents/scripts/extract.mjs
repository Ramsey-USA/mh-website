#!/usr/bin/env node
/* eslint-disable no-console, prefer-template */
/**
 * documents/scripts/extract.mjs
 *
 * Extracts text from each section PDF in documents/content/MHC_Safety_Program_2026/
 * and writes a structured JSON manifest to documents/content/safety-manual.json.
 *
 * Usage:
 *   npm run docs:extract
 *   node documents/scripts/extract.mjs
 *
 * Output: documents/content/safety-manual.json
 */

import { readFile, writeFile, readdir } from "fs/promises";
import { join, resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { PDFParse } from "pdf-parse";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const INPUT_DIR = join(ROOT, "documents/content/MHC_Safety_Program_2026");
const OUTPUT = join(ROOT, "documents/content/safety-manual.json");

// Human-readable titles derived from filenames (fallback if not parseable from PDF)
const SECTION_TITLE_MAP = {
  AISH_00: "Table of Contents",
  AISH_01: "Injury-Free Workplace Plan",
  AISH_02: "Drug-Free Workplace",
  AISH_03: "Program Policy and Requirements",
  AISH_04: "Safety and Health Orientation",
  AISH_05: "Pre-Job Safety Planning",
  AISH_06: "Emergency Response",
  AISH_07: "Safety Bulletin Boards",
  AISH_08: "Event Reporting of Incidents, Accidents, and Near Misses",
  AISH_09: "Safety and Health Meetings / Inspections",
  AISH_10: "Personal Protective Equipment (PPE)",
  AISH_11: "Fall Protection",
  AISH_12: "Flammable and Combustible Liquids",
  AISH_13: "Fire Prevention",
  AISH_14: "Welding, Cutting, and Heating Operations",
  AISH_15: "Lockout / Tagout (LOTO)",
  AISH_16: "Confined Space Entry",
  AISH_17: "Use and Care of Ladders",
  AISH_18: "Motor Vehicle Safety Program",
  AISH_19: "Equipment Maintenance and Inspection",
  AISH_20: "Aerial Lifts and Elevating Work Platforms",
  AISH_21: "Crane-Suspended Work Platforms",
  AISH_22: "Use and Handling of Scaffolds",
  AISH_23: "Industrial Hygiene Program",
  AISH_24: "Contractor Hazard Communication Program",
  AISH_25: "Heat-Related Illness Prevention",
  AISH_26: "Excavation, Trenching, and Shoring",
  AISH_27: "Construction Equipment Modifications and Fabrications",
  AISH_28: "Housekeeping",
  AISH_29: "Electrical Safety",
  AISH_30: "Signs, Signals, and Barricades",
  AISH_31: "Miscellaneous Construction Requirements",
  AISH_32: "Respiratory Protection",
  AISH_33: "Floor Openings, Open-Sided Surfaces, and Ramps",
  AISH_34: "Compressed Gas / Compressed Air",
  AISH_35: "Rigging",
  AISH_36: "Hand and Portable Power Tools",
  AISH_37: "Concrete and Masonry Construction",
  AISH_38: "Commercial Drivers Drug and Alcohol Program",
  AISH_39: "Subcontractor Management Plan",
  AISH_40: "Waste Management Plan",
  AISH_41: "Short Service Employee Program",
  AISH_42: "Forklift / Truck Safety",
  AISH_43: "Bloodborne Pathogens",
  AISH_44: "Silica Exposure Control",
};

/**
 * Extract the first 3 complete sentences from extracted text as a summary.
 */
function buildSummary(text, maxChars = 380) {
  // Normalise whitespace
  const clean = text.replace(/\s+/g, " ").trim();
  // Find sentence boundaries
  const sentences = clean.match(/[^.!?]*[.!?]+/g) || [];
  let summary = "";
  for (const s of sentences) {
    if ((summary + s).length > maxChars) break;
    summary += s + " ";
  }
  return summary.trim() || clean.slice(0, maxChars) + "…";
}

/**
 * Build a slug from a section title for use in URLs and filenames.
 */
function buildSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function main() {
  console.log("📄 MH Construction — Safety Manual PDF Extractor");
  console.log("================================================");
  console.log(`Input:  ${INPUT_DIR}`);
  console.log(`Output: ${OUTPUT}\n`);

  const files = (await readdir(INPUT_DIR))
    .filter((f) => f.endsWith(".pdf"))
    .sort();

  console.log(`Found ${files.length} PDF files.\n`);

  const sections = [];

  for (const filename of files) {
    const filePath = join(INPUT_DIR, filename);
    const key = filename.slice(0, 7); // e.g. "AISH_00"
    const numberStr = filename.slice(5, 7); // e.g. "00"
    const number = parseInt(numberStr, 10);
    const title =
      SECTION_TITLE_MAP[key] || filename.replace(".pdf", "").replace(/_/g, " ");

    process.stdout.write(`  [${numberStr}] ${title.padEnd(55)} `);

    try {
      const buffer = await readFile(filePath);
      const parser = new PDFParse({ data: buffer });
      const data = await parser.getText();

      const rawText = data.text || "";
      const wordCount = rawText.split(/\s+/).filter(Boolean).length;
      const summary = buildSummary(rawText);
      const slug = buildSlug(title);

      sections.push({
        id: `section-${numberStr}`,
        number: number,
        numberStr: numberStr,
        key: key,
        title: title,
        slug: slug,
        filename: filename,
        pages: data.pages?.length || 1,
        wordCount: wordCount,
        summary: summary,
        // Full extracted text — used by generate.mjs to render section PDFs
        body: rawText,
      });

      console.log(`✓  (${data.pages?.length || 1}p, ${wordCount} words)`);
    } catch (err) {
      console.log(`✗  ERROR: ${err.message}`);
      // Still add a stub so the manifest is complete
      sections.push({
        id: `section-${numberStr}`,
        number: number,
        numberStr: numberStr,
        key: key,
        title: title,
        slug: buildSlug(title),
        filename: filename,
        pages: 0,
        wordCount: 0,
        summary: "Content extraction failed. See source PDF.",
        body: "",
        error: err.message,
      });
    }
  }

  const totalPages = sections.reduce((sum, s) => sum + s.pages, 0);

  const manifest = {
    document: {
      id: "safety-manual",
      title: "Safety Manual",
      subtitle: "Accident Injury Safety Health Program",
      revisionYear: 2026,
      revisionDate: "2026-01-01",
      company: "MH Construction, Inc.",
      address: "3111 N. Capitol Ave., Pasco, WA 99301",
      phone: "(509) 308-6489",
      website: "https://www.mhc-gc.com",
      licenses: {
        WA: "MHCONCI907R7",
        OR: "765043-99",
        ID: "RCE-49250",
      },
      totalSections: sections.length,
      totalPages: totalPages,
      extractedAt: new Date().toISOString(),
    },
    sections,
  };

  await writeFile(OUTPUT, JSON.stringify(manifest, null, 2), "utf-8");

  console.log(`\n✅ Extraction complete.`);
  console.log(`   ${sections.length} sections  |  ${totalPages} total pages`);
  console.log(`   Output → ${OUTPUT}`);
}

main().catch((err) => {
  console.error("\n❌ Fatal error:", err);
  process.exit(1);
});
