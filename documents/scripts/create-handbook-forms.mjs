#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * create-handbook-forms.mjs
 *
 * Creates DOCX form files for Employee Handbook acknowledgments and agreements.
 * These forms are specific to the handbook (not MISH safety forms) and are
 * referenced in the handbook manifest for printing/embedding.
 *
 * Generated forms:
 *   HANDBOOK-FORM-01: Company Vehicle Policies and Procedures Acknowledgement
 *   HANDBOOK-FORM-02: Employee Handbook Receipt Acknowledgment
 *   HANDBOOK-FORM-03: Employee Safety Policy Acknowledgement Form
 *   HANDBOOK-FORM-04: Temporary Work From Home Application/Agreement
 *   HANDBOOK-FORM-05: Employee Acknowledgment and Agreement of Computer and Electronics Use Policy
 */

import { Document, Packer, Paragraph, TextRun, AlignmentType } from "docx";
import { writeFile, mkdir } from "fs/promises";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const HANDBOOK_FORMS_DIR = join(ROOT, "documents/forms/MHC-HANDBOOK-FORMS");

const createFormParagraph = (text, options = {}) => {
  const {
    bold = false,
    italic = false,
    size = 22,
    align = AlignmentType.LEFT,
    spacing = {},
  } = options;
  return new Paragraph({
    children: [
      new TextRun({
        text,
        bold,
        italic,
        size,
      }),
    ],
    alignment: align,
    spacing,
  });
};

const HANDBOOK_FORMS = [
  {
    id: "HANDBOOK-FORM-01",
    title: "Company Vehicle Policies and Procedures Acknowledgement",
    content: [
      createFormParagraph("Company Vehicle Policies and Procedures", {
        bold: true,
        size: 28,
        spacing: { after: 200 },
      }),
      createFormParagraph("Acknowledgement", {
        bold: true,
        size: 28,
        spacing: { after: 400 },
      }),
      createFormParagraph(
        "This is to confirm that I have received the driver requirements policy and the personal use policy of our Company and agree to abide by the rules and regulations set forth. I understand these policies in no way constitute a contract and cannot be construed as such, either in whole or in part.",
        { spacing: { after: 200 } },
      ),
      createFormParagraph(
        "Furthermore, I understand that management reserves the right to change, modify or cancel the contents of these policies in whole or in part at any time.",
        { spacing: { after: 400 } },
      ),
      createFormParagraph(
        "Employee Signature: ________________________________     Date: _____ / _____ / _____",
        { spacing: { after: 200 } },
      ),
      createFormParagraph(
        "Return this form to the office, keep your handbook for future reference.",
        { italic: true, size: 20, spacing: { after: 200 } },
      ),
      createFormParagraph("MH Construction, Inc.", {
        italic: true,
        size: 20,
        spacing: { before: 400 },
      }),
      createFormParagraph("3111 N. Capitol Ave., Pasco, WA 99301", {
        italic: true,
        size: 20,
      }),
    ],
  },
  {
    id: "HANDBOOK-FORM-02",
    title: "Employee Handbook Receipt Acknowledgment",
    content: [
      createFormParagraph("Employee Handbook", {
        bold: true,
        size: 28,
        spacing: { after: 200 },
      }),
      createFormParagraph("Receipt Acknowledgment", {
        bold: true,
        size: 28,
        spacing: { after: 400 },
      }),
      createFormParagraph(
        "I acknowledge that I have received a copy of the Employee Handbook and that I have read and understand the contents of the handbook.",
        { spacing: { after: 400 } },
      ),
      createFormParagraph(
        "Signature: _______________________________________________",
        { spacing: { after: 200 } },
      ),
      createFormParagraph(
        "Printed Name: _______________________________________________",
        { spacing: { after: 200 } },
      ),
      createFormParagraph(
        "Date: _______________________________________________",
        { spacing: { after: 400 } },
      ),
      createFormParagraph(
        "Return this form to the office, keep your handbook for future reference.",
        { italic: true, size: 20, spacing: { after: 200 } },
      ),
      createFormParagraph("MH Construction, Inc.", {
        italic: true,
        size: 20,
        spacing: { before: 400 },
      }),
      createFormParagraph("3111 N. Capitol Ave., Pasco, WA 99301", {
        italic: true,
        size: 20,
      }),
    ],
  },
  {
    id: "HANDBOOK-FORM-03",
    title: "Employee Safety Policy Acknowledgement Form",
    content: [
      createFormParagraph("EMPLOYEE SAFETY POLICY", {
        bold: true,
        size: 28,
        spacing: { after: 200 },
      }),
      createFormParagraph("ACKNOWLEDGEMENT FORM", {
        bold: true,
        size: 28,
        spacing: { after: 400 },
      }),
      createFormParagraph(
        "I, the undersigned, acknowledge that by my first day on site with MH Construction, I will be provided with access to the Safety Plan.",
        { spacing: { after: 400 } },
      ),
      createFormParagraph(
        "I understand and accept the following responsibilities:",
        { bold: true, spacing: { after: 200 } },
      ),
      createFormParagraph(
        "1. Reading and Understanding Safety Procedures: I am responsible for thoroughly reading and understanding the Site-Specific Safety Plan and all related safety policies, rules, regulations, and requirements.",
        { spacing: { after: 200 } },
      ),
      createFormParagraph(
        "2. Adherence to Safety Guidelines: I agree to comply with all safety rules and guidelines outlined in the Safety Plan and any additional safety protocols.",
        { spacing: { after: 200 } },
      ),
      createFormParagraph(
        "3. Accountability: I understand that it is my responsibility to follow all safety procedures while on the job site.",
        { spacing: { after: 200 } },
      ),
      createFormParagraph(
        "4. Consequences for Non-Compliance: I am aware that failure to adhere to safety rules may result in disciplinary action, up to and including termination.",
        { spacing: { after: 200 } },
      ),
      createFormParagraph(
        "5. Commitment to Safety: I recognize the importance of maintaining a safe work environment and agree to participate in safety training and report hazards.",
        { spacing: { after: 400 } },
      ),
      createFormParagraph(
        "Employee Name (Print): _____________________________________",
        { spacing: { after: 200 } },
      ),
      createFormParagraph(
        "Employee Signature: ______________________________________",
        { spacing: { after: 200 } },
      ),
      createFormParagraph("Date: _____________________________________", {
        spacing: { after: 400 },
      }),
      createFormParagraph(
        "Supervisor/Manager Name (Print): ____________________________",
        { spacing: { after: 200 } },
      ),
      createFormParagraph(
        "Supervisor/Manager Signature: _______________________________",
        { spacing: { after: 200 } },
      ),
      createFormParagraph("Date: _____________________________________", {
        spacing: { after: 400 },
      }),
      createFormParagraph(
        "Please return this signed form to management at the end of your first day of employment.",
        { italic: true, size: 20, spacing: { after: 200 } },
      ),
      createFormParagraph("MH Construction, Inc.", {
        italic: true,
        size: 20,
        spacing: { before: 400 },
      }),
      createFormParagraph("3111 N. Capitol Ave., Pasco, WA 99301", {
        italic: true,
        size: 20,
      }),
    ],
  },
  {
    id: "HANDBOOK-FORM-04",
    title: "Temporary Work From Home Application/Agreement",
    content: [
      createFormParagraph("Temporary Work From Home", {
        bold: true,
        size: 28,
        spacing: { after: 200 },
      }),
      createFormParagraph("Application/Agreement", {
        bold: true,
        size: 28,
        spacing: { after: 400 },
      }),
      createFormParagraph("Date: _____________________", {
        spacing: { after: 200 },
      }),
      createFormParagraph("Company Name: __________________________________", {
        spacing: { after: 200 },
      }),
      createFormParagraph("Employee Name: _________________________________", {
        spacing: { after: 200 },
      }),
      createFormParagraph(
        "Employee Title: __________________________________",
        { spacing: { after: 200 } },
      ),
      createFormParagraph(
        "Requested Work Location: _________________________________",
        { spacing: { after: 200 } },
      ),
      createFormParagraph(
        "Requested Office Supplies: ________________________________",
        { spacing: { after: 200 } },
      ),
      createFormParagraph(
        "Phone number while working remote: ___________________________",
        { spacing: { after: 200 } },
      ),
      createFormParagraph(
        "Requested Start Date: ____________________________",
        { spacing: { after: 200 } },
      ),
      createFormParagraph("Requested Work Schedule:", {
        bold: true,
        spacing: { after: 100 },
      }),
      createFormParagraph(
        "_______________________________________________________________________________",
        { spacing: { after: 200 } },
      ),
      createFormParagraph("Reason(s) for Request:", {
        bold: true,
        spacing: { after: 100 },
      }),
      createFormParagraph(
        "_______________________________________________________________________________",
        { spacing: { after: 400 } },
      ),
      createFormParagraph(
        "By signing this application, I affirm my commitment to adhere to all company policies, including those governing electronics use and remote work.",
        { spacing: { after: 400 } },
      ),
      createFormParagraph(
        "Employee Signature: ___________________________________     Date: ____________________",
        { spacing: { after: 400 } },
      ),
      createFormParagraph("☐ APPROVED          ☐ DENIED", {
        spacing: { after: 200 },
      }),
      createFormParagraph(
        "Comments: __________________________________________________________________",
        { spacing: { after: 200 } },
      ),
      createFormParagraph(
        "Supervisor Signature: _________________________________     Date: ____________________",
        { spacing: { after: 400 } },
      ),
      createFormParagraph(
        "Return this form to the office, keep your handbook for future reference.",
        { italic: true, size: 20, spacing: { after: 200 } },
      ),
      createFormParagraph("MH Construction, Inc.", {
        italic: true,
        size: 20,
        spacing: { before: 400 },
      }),
      createFormParagraph("3111 N. Capitol Ave., Pasco, WA 99301", {
        italic: true,
        size: 20,
      }),
    ],
  },
  {
    id: "HANDBOOK-FORM-05",
    title:
      "Employee Acknowledgment and Agreement of Computer and Electronics Use Policy",
    content: [
      createFormParagraph("Employee Acknowledgment and Agreement of", {
        bold: true,
        size: 28,
        spacing: { after: 200 },
      }),
      createFormParagraph("Computer and Electronics Use Policy", {
        bold: true,
        size: 28,
        spacing: { after: 400 },
      }),
      createFormParagraph(
        "I acknowledge that I have received, read, and understand the Computer and Electronics Use Policy of MH Construction Inc. I agree to comply with all guidelines, requirements, and restrictions outlined in the policy.",
        { spacing: { after: 200 } },
      ),
      createFormParagraph(
        "I understand that any violation may result in disciplinary action, up to and including termination of employment, as well as possible legal consequences.",
        { spacing: { after: 200 } },
      ),
      createFormParagraph(
        "I understand that MH Construction Inc. reserves the right to monitor and review all use of company devices, networks, and communication systems as described in the policy.",
        { spacing: { after: 200 } },
      ),
      createFormParagraph(
        "By signing below, I acknowledge my responsibility to uphold this policy and agree to abide by its terms.",
        { spacing: { after: 400 } },
      ),
      createFormParagraph(
        "Employee Name: ______________________________________________",
        { spacing: { after: 200 } },
      ),
      createFormParagraph(
        "Position/Title: ______________________________________________",
        { spacing: { after: 200 } },
      ),
      createFormParagraph(
        "Signature: __________________________________________________",
        { spacing: { after: 200 } },
      ),
      createFormParagraph("Date: _________________________", {
        spacing: { after: 400 },
      }),
      createFormParagraph(
        "Return this form to the office, keep your handbook for future reference.",
        { italic: true, size: 20, spacing: { after: 200 } },
      ),
      createFormParagraph("MH Construction, Inc.", {
        italic: true,
        size: 20,
        spacing: { before: 400 },
      }),
      createFormParagraph("3111 N. Capitol Ave., Pasco, WA 99301", {
        italic: true,
        size: 20,
      }),
    ],
  },
];

async function createFormDocx(form) {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: form.content,
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const fileName = `${form.id}_${form.title.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}.docx`;
  const filePath = join(HANDBOOK_FORMS_DIR, fileName);
  await writeFile(filePath, buffer);
  console.log(`  ✓  ${fileName}`);
  return filePath;
}

async function main() {
  console.log("📋 MH Construction — Employee Handbook Forms Generator");
  console.log("========================================================\n");

  try {
    await mkdir(HANDBOOK_FORMS_DIR, { recursive: true });

    console.log(
      `Creating handbook form DOCX files in:\n  ${HANDBOOK_FORMS_DIR}\n`,
    );

    for (const form of HANDBOOK_FORMS) {
      await createFormDocx(form);
    }

    console.log(
      `\n✅ Success. Created ${HANDBOOK_FORMS.length} handbook form DOCX files.`,
    );
    console.log("   Add these forms to documents/forms/forms-manifest.json");
  } catch (err) {
    console.error("❌ Fatal error:", err.message);
    process.exit(1);
  }
}

main();
