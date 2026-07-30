#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../../..");

export function resolveDocumentPublishTarget(input) {
  const value = String(input || "")
    .trim()
    .toLowerCase();

  const aliases = {
    "operations-manual": {
      family: "manual",
      slug: "operations-manual",
      manualArg: "operations-manual",
      r2Prefix: "docs/operations",
      label: "Operations Manual",
      publishScript: "apps/website/scripts/r2-publish-manual-family.sh",
    },
    operations: {
      family: "manual",
      slug: "operations-manual",
      manualArg: "operations-manual",
      r2Prefix: "docs/operations",
      label: "Operations Manual",
      publishScript: "apps/website/scripts/r2-publish-manual-family.sh",
    },
    "employee-handbook": {
      family: "manual",
      slug: "employee-handbook",
      manualArg: "employee-handbook",
      r2Prefix: "docs/employee",
      label: "Employee Handbook",
      publishScript: "apps/website/scripts/r2-publish-employee-handbook.sh",
    },
    handbook: {
      family: "manual",
      slug: "employee-handbook",
      manualArg: "employee-handbook",
      r2Prefix: "docs/employee",
      label: "Employee Handbook",
      publishScript: "apps/website/scripts/r2-publish-employee-handbook.sh",
    },
    "safety-manual": {
      family: "manual",
      slug: "safety-manual",
      manualArg: "safety",
      r2Prefix: "docs/safety",
      label: "MISH",
      publishScript: "apps/website/scripts/r2-publish-safety-pdfs.sh",
    },
    mish: {
      family: "manual",
      slug: "safety-manual",
      manualArg: "safety",
      r2Prefix: "docs/safety",
      label: "MISH",
      publishScript: "apps/website/scripts/r2-publish-safety-pdfs.sh",
    },
    safety: {
      family: "manual",
      slug: "safety-manual",
      manualArg: "safety",
      r2Prefix: "docs/safety",
      label: "MISH",
      publishScript: "apps/website/scripts/r2-publish-safety-pdfs.sh",
    },
  };

  const resolved = aliases[value];
  if (!resolved) {
    throw new Error(
      `Unsupported document target '${input}'. Use operations-manual, employee-handbook, or safety-manual (or their short aliases).`,
    );
  }

  return resolved;
}

export function parseArgs(argv) {
  const args = [...argv];
  let targetInput = null;
  let dryRun = false;
  let help = false;

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--dry-run") {
      dryRun = true;
      continue;
    }

    if (arg === "--help" || arg === "-h") {
      help = true;
      continue;
    }

    if (arg === "--target" || arg === "-t") {
      targetInput = args[index + 1] || null;
      index += 1;
      continue;
    }

    if (!arg.startsWith("-")) {
      targetInput = arg;
    }
  }

  return { targetInput, dryRun, help };
}

function runStep(label, command, args, dryRun) {
  const rendered = `${command} ${args.join(" ")}`;
  if (dryRun) {
    console.log(`▶ ${label} [dry-run]: ${rendered}`);
    return;
  }

  console.log(`\n▶ ${label}: ${rendered}`);
  const result = spawnSync(command, args, {
    cwd: repoRoot,
    stdio: "inherit",
    shell: false,
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function printHelp() {
  console.log(
    `Usage: node scripts/publish-document-family.mjs [--dry-run] [--target <target>]\n\nExamples:\n  node scripts/publish-document-family.mjs operations-manual\n  node scripts/publish-document-family.mjs --target employee-handbook\n  node scripts/publish-document-family.mjs --dry-run mish`,
  );
}

function main() {
  const { targetInput, dryRun, help } = parseArgs(process.argv.slice(2));
  if (help || !targetInput) {
    printHelp();
    if (!help) process.exit(1);
    return;
  }

  const target = resolveDocumentPublishTarget(targetInput);
  console.log(`Publishing ${target.label}...`);

  runStep(
    "Generate",
    "node",
    [
      "documents/scripts/generate.mjs",
      "--manual",
      target.manualArg || target.slug,
      "--template",
      "all",
    ],
    dryRun,
  );

  runStep(
    "Merge",
    "node",
    [
      "documents/scripts/merge.mjs",
      "--manual",
      target.manualArg || target.slug,
    ],
    dryRun,
  );

  runStep(
    "Publish",
    "bash",
    [target.publishScript, target.slug, target.r2Prefix],
    dryRun,
  );

  runStep(
    "Bundle downloads",
    "node",
    ["documents/scripts/build-download-bundle.mjs"],
    dryRun,
  );

  console.log(`\n✅ ${target.label} published successfully.`);
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main();
}
