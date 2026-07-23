#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { readCsvFileWithHeaders, writeCsvFile } from "./csv-utils.mjs";
import { assertValidCloseout } from "./closeout-validation.mjs";

function getArg(flag, fallback = "") {
  const index = process.argv.indexOf(flag);
  if (index === -1) return fallback;
  return process.argv[index + 1] ?? fallback;
}

function usage() {
  console.log(
    "Usage: node scripts/marketing/generate-review-outreach.mjs --input <closeout.csv> [--output-dir <dir>]",
  );
}

const inputPath = getArg("--input");
const outputDir = getArg("--output-dir", "tmp/review-outreach");

if (!inputPath) {
  usage();
  process.exit(1);
}

if (!fs.existsSync(inputPath)) {
  console.error(`Input file not found: ${inputPath}`);
  process.exit(1);
}

const { headers, rows: closeouts } = readCsvFileWithHeaders(inputPath);
assertValidCloseout(headers, closeouts, inputPath);
if (closeouts.length === 0) {
  console.error("Input CSV has no rows.");
  process.exit(1);
}

fs.mkdirSync(outputDir, { recursive: true });

const emailRows = [];
const smsRows = [];

for (const row of closeouts) {
  const firstName = row["stakeholder_name"] || row["reviewer_name"] || "there";
  const projectName = row["project_name"] || "your project";
  const senderName = row["sender_name"] || "MH Construction Team";
  const email = row["stakeholder_email"] || "";
  const phone = row["stakeholder_phone"] || "";

  const subject = "Thank you for partnering with MH Construction";
  const emailBody = [
    `Hello ${firstName},`,
    "",
    `Thank you for partnering with MH Construction on ${projectName}.`,
    "",
    "If you are open to it, we would value your honest Google review about your project experience. Your feedback helps future project stakeholders make informed partnership decisions.",
    "",
    "Leave a review here:",
    "https://g.page/r/CVdv3YZLzJvdEAE/review",
    "",
    "If a team member made a difference during your project, feel free to mention them by name.",
    "",
    "Thank you again,",
    senderName,
    "MH Construction",
    "(509) 308-6489",
  ].join("\n");

  const smsBody = `Hi ${firstName}, this is ${senderName} from MH Construction. Thank you again for partnering with us on ${projectName}. If you are open to it, we would value your honest Google feedback: https://g.page/r/CVdv3YZLzJvdEAE/review`;

  emailRows.push({
    stakeholder_name: firstName,
    stakeholder_email: email,
    project_name: projectName,
    sender_name: senderName,
    subject,
    body: emailBody,
  });

  smsRows.push({
    stakeholder_name: firstName,
    stakeholder_phone: phone,
    project_name: projectName,
    sender_name: senderName,
    message: smsBody,
  });
}

const emailFile = path.join(outputDir, "review-outreach-email.csv");
const smsFile = path.join(outputDir, "review-outreach-sms.csv");

writeCsvFile(
  emailFile,
  [
    "stakeholder_name",
    "stakeholder_email",
    "project_name",
    "sender_name",
    "subject",
    "body",
  ],
  emailRows,
);

writeCsvFile(
  smsFile,
  [
    "stakeholder_name",
    "stakeholder_phone",
    "project_name",
    "sender_name",
    "message",
  ],
  smsRows,
);

console.log(`Generated ${emailRows.length} outreach rows.`);
console.log(`- Email CSV: ${emailFile}`);
console.log(`- SMS CSV: ${smsFile}`);
