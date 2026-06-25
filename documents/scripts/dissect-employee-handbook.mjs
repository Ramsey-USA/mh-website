#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * dissect-employee-handbook.mjs
 *
 * Creates minimal section DOCX files from the Employee Handbook PDF.
 * This allows the handbook to go through the same generation pipeline as MISH
 * for cover/spine/tabs/merge consistency.
 *
 * Usage:
 *   npm run docs:dissect:handbook
 *   node documents/scripts/dissect-employee-handbook.mjs
 *
 * Output:
 *   documents/content/MHC-Employee-Handbook-Sections/
 *     HANDBOOK-01_introduction.docx
 *     HANDBOOK-02_company-policies.docx
 *     HANDBOOK-03_employment-basics.docx
 *     HANDBOOK-04_compensation.docx
 *     HANDBOOK-05_employee-benefits.docx
 *     HANDBOOK-06_miscellaneous.docx
 */

import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { writeFile, mkdir } from "fs/promises";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const OUTPUT_DIR = join(ROOT, "documents/content/MHC-Employee-Handbook-Sections");

// Handbook sections based on TOC structure
const HANDBOOK_SECTIONS = [
  {
    number: 1,
    title: "Introduction",
    subtitle: "Welcome, Company Culture, Disclaimer",
    content:
      "This section introduces the Employee Handbook and establishes foundational company culture and expectations.",
  },
  {
    number: 2,
    title: "Company Policies",
    subtitle:
      "Employment Opportunity, Conduct, Leave, Property, Confidentiality",
    content:
      "Company-wide policies covering equal employment opportunity, anti-harassment, non-violence, drug and alcohol policy, dress code, conduct, leave policies, property expectations, confidentiality, vehicle policies, and work-from-home guidelines.",
  },
  {
    number: 3,
    title: "Employment Basics",
    subtitle: "Hiring, Schedules, Attendance, Holidays",
    content:
      "Fundamental employment information including personal information management, employment categories, probationary periods, work schedules, attendance requirements, holidays, paid time off, and travel policies.",
  },
  {
    number: 4,
    title: "Compensation",
    subtitle: "Pay, Overtime, Bonuses, Garnishment",
    content:
      "Compensation policies covering timekeeping, regular pay, overtime, bonuses and incentives, and wage garnishment procedures.",
  },
  {
    number: 5,
    title: "Employee Benefits",
    subtitle: "Insurance, Retirement, Social Security",
    content:
      "Employee benefit programs including medical insurance, Family and Medical Leave Act (FMLA), workers compensation, Social Security and Medicare, unemployment insurance, and 401(k) retirement plans.",
  },
  {
    number: 6,
    title: "Miscellaneous",
    subtitle: "Gifts, Weather, Safety, Agreements",
    content:
      "Additional policies and acknowledgement agreements including gifts and tips, information posting, outside employment, inclement weather procedures, safety expectations, tools and equipment, and required employee acknowledgement pages.",
  },
];

async function createSectionDocx(section) {
  const nn = String(section.number).padStart(2, "0");
  const fileName = `HANDBOOK-${nn}_${section.title.toLowerCase().replaceAll(/\s+/g, "-")}.docx`;

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: `HANDBOOK ${nn}`,
                bold: true,
                size: 28,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: section.title,
                bold: true,
                size: 32,
              }),
            ],
            spacing: { after: 400 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: section.subtitle,
                italic: true,
                size: 24,
              }),
            ],
            spacing: { after: 400 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: section.content,
                size: 22,
              }),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "MH Construction, Inc.",
                size: 20,
                italics: true,
              }),
            ],
            spacing: { before: 400, after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "3111 N. Capitol Ave., Pasco, WA 99301",
                size: 20,
                italics: true,
              }),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const filePath = join(OUTPUT_DIR, fileName);
  await writeFile(filePath, buffer);
  console.log(`  ✓  ${fileName}`);
  return filePath;
}

async function main() {
  console.log("📖 MH Construction — Employee Handbook Section Dissector");
  console.log(
    "============================================================\n"
  );

  try {
    await mkdir(OUTPUT_DIR, { recursive: true });

    console.log(
      `Creating section DOCX files in:\n  ${OUTPUT_DIR}\n`
    );

    for (const section of HANDBOOK_SECTIONS) {
      await createSectionDocx(section);
    }

    console.log(
      `\n✅ Success. Created ${HANDBOOK_SECTIONS.length} section DOCX files.`
    );
    console.log(
      "   These can now be used with the standard generation pipeline."
    );
  } catch (err) {
    console.error("❌ Fatal error:", err.message);
    process.exit(1);
  }
}

main();
