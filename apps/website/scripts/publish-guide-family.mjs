#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../../..");

export function resolveGuidePublishTarget(input) {
  const value = String(input || "")
    .trim()
    .toLowerCase();

  const aliases = {
    marketing: {
      manual: "marketing-strategy-guide",
      r2Prefix: "docs/marketing",
      label: "Marketing Strategy Guide",
    },
    "marketing-strategy-guide": {
      manual: "marketing-strategy-guide",
      r2Prefix: "docs/marketing",
      label: "Marketing Strategy Guide",
    },
    marketingguide: {
      manual: "marketing-strategy-guide",
      r2Prefix: "docs/marketing",
      label: "Marketing Strategy Guide",
    },
    sales: {
      manual: "sales-estimating-guide",
      r2Prefix: "docs/sales",
      label: "Sales/Estimating Guide",
    },
    "sales-estimating-guide": {
      manual: "sales-estimating-guide",
      r2Prefix: "docs/sales",
      label: "Sales/Estimating Guide",
    },
    salesguide: {
      manual: "sales-estimating-guide",
      r2Prefix: "docs/sales",
      label: "Sales/Estimating Guide",
    },
  };

  const resolved = aliases[value];
  if (!resolved) {
    throw new Error(
      `Unsupported guide target '${input}'. Use marketing or sales (or their full guide slugs).`,
    );
  }

  return resolved;
}

function parseArgs(argv) {
  const args = [...argv];
  let guideInput = null;

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--guide" || arg === "-g") {
      guideInput = args[index + 1] || null;
      index += 1;
      continue;
    }

    if (arg === "--help" || arg === "-h") {
      return { help: true };
    }

    if (!arg.startsWith("-")) {
      guideInput = arg;
    }
  }

  return { guideInput, help: false };
}

function runStep(label, command, args) {
  console.log(`\n▶ ${label}: ${command} ${args.join(" ")}`);
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
    `Usage: node scripts/publish-guide-family.mjs [--guide <guide>]\n\nExamples:\n  node scripts/publish-guide-family.mjs marketing\n  node scripts/publish-guide-family.mjs --guide sales-estimating-guide`,
  );
}

function main() {
  const { guideInput, help } = parseArgs(process.argv.slice(2));
  if (help || !guideInput) {
    printHelp();
    if (!help) process.exit(1);
    return;
  }

  const target = resolveGuidePublishTarget(guideInput);
  console.log(`Publishing ${target.label}...`);

  runStep("Generate", "node", [
    "documents/scripts/generate.mjs",
    "--manual",
    target.manual,
    "--template",
    "all",
  ]);

  runStep("Merge", "node", [
    "documents/scripts/merge.mjs",
    "--manual",
    target.manual,
  ]);

  runStep("Publish", "bash", [
    "apps/website/scripts/r2-publish-guide-family.sh",
    target.manual,
    target.r2Prefix,
  ]);

  runStep("Bundle downloads", "node", [
    "documents/scripts/build-download-bundle.mjs",
  ]);

  console.log(`\n✅ ${target.label} published successfully.`);
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main();
}
