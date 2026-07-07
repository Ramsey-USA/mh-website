#!/usr/bin/env node

/**
 * Public Email Guardrails Check
 *
 * Enforces two rules:
 * 1. Public-facing website source only exposes office@mhc-gc.com.
 * 2. Shared recipient arrays keep office + Matt as the internal monitoring pair.
 */

const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const APP_ROOT = process.cwd();
const REPO_ROOT = path.resolve(APP_ROOT, "..", "..");
const PUBLIC_EMAIL = "office@mhc-gc.com";

const TARGET_GLOBS = [
  "src/app/**/*.tsx",
  "src/components/**/*.tsx",
  "src/lib/chatbot/**/*.ts",
  "src/lib/data/**/*.ts",
  "src/lib/data/**/*.json",
  "messages/**/*.json",
  "../../messages/**/*.json",
];

const EXCLUDED_PATH_PATTERNS = [
  /__tests__\//,
  /\.test\./,
  /\.spec\./,
  /src\/app\/api\//,
  /node_modules\//,
  /docs\//,
  /scripts\//,
];

function runGitLsFiles(cwd, globs) {
  const result = spawnSync("git", ["ls-files", ...globs], {
    cwd,
    encoding: "utf8",
  });

  if (result.status !== 0) {
    throw new Error(
      (result.stderr || result.stdout || "git ls-files failed").trim(),
    );
  }

  return (result.stdout || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function shouldSkipPath(filePath) {
  return EXCLUDED_PATH_PATTERNS.some((pattern) => pattern.test(filePath));
}

function collectPublicSourceFiles() {
  return runGitLsFiles(APP_ROOT, TARGET_GLOBS)
    .map((relative) => path.resolve(APP_ROOT, relative))
    .filter((absPath) => !shouldSkipPath(absPath));
}

function findNonOfficeEmails(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const matches = raw.match(/[A-Za-z0-9._%+-]+@mhc-gc\.com/g) || [];
  return [...new Set(matches)].filter((email) => email !== PUBLIC_EMAIL);
}

function validateRecipientArrays() {
  const companyConstantsPath = path.resolve(
    REPO_ROOT,
    "packages/shared/src/lib/constants/company.ts",
  );
  const raw = fs.readFileSync(companyConstantsPath, "utf8");
  const blockMatch = raw.match(
    /export const EMAIL_RECIPIENTS:[\s\S]*?=\s*\{([\s\S]*?)\n\};/,
  );

  if (!blockMatch) {
    return [
      "Could not locate EMAIL_RECIPIENTS block in packages/shared/src/lib/constants/company.ts.",
    ];
  }

  const block = blockMatch[1];
  const findings = [];
  const disallowedEntries = [
    "COMPANY_INFO.email.superintendent",
    "COMPANY_INFO.email.hr",
  ];
  const requiredRules = [
    {
      name: "general",
      pattern:
        /general:\s*\[\s*COMPANY_INFO\.email\.main,\s*COMPANY_INFO\.email\.admin\s*\]/,
    },
    {
      name: "contact",
      pattern:
        /contact:\s*\[\s*COMPANY_INFO\.email\.main,\s*COMPANY_INFO\.email\.admin\s*\]/,
    },
    {
      name: "careers",
      pattern:
        /careers:\s*\[\s*COMPANY_INFO\.email\.main,\s*COMPANY_INFO\.email\.admin\s*\]/,
    },
  ];

  for (const disallowedEntry of disallowedEntries) {
    if (block.includes(disallowedEntry)) {
      findings.push(
        `EMAIL_RECIPIENTS must not include ${disallowedEntry} in website routing.`,
      );
    }
  }

  for (const rule of requiredRules) {
    if (!rule.pattern.test(block)) {
      findings.push(
        `EMAIL_RECIPIENTS.${rule.name} must contain exactly COMPANY_INFO.email.main and COMPANY_INFO.email.admin.`,
      );
    }
  }

  return findings;
}

function main() {
  const findings = [];

  for (const filePath of collectPublicSourceFiles()) {
    const emails = findNonOfficeEmails(filePath);
    if (emails.length === 0) continue;

    findings.push({
      file: path.relative(REPO_ROOT, filePath).replace(/\\/g, "/"),
      emails,
    });
  }

  const recipientArrayFindings = validateRecipientArrays();

  if (findings.length > 0 || recipientArrayFindings.length > 0) {
    console.error("FAIL: Public email guardrails violations detected.\n");

    for (const finding of findings) {
      console.error(
        `- ${finding.file}\n  Non-office MH emails found: ${finding.emails.join(", ")}\n  Public-facing website source must expose only ${PUBLIC_EMAIL}.\n`,
      );
    }

    for (const finding of recipientArrayFindings) {
      console.error(`- ${finding}`);
    }

    process.exit(1);
  }

  console.log(
    `PASS: Public email guardrails check (public source exposes only ${PUBLIC_EMAIL}; internal recipient arrays keep office + Matt).`,
  );
}

main();
