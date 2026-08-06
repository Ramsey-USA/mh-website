import { readFileSync } from "node:fs";
import { join } from "node:path";

const workflowPath = join(
  process.cwd(),
  ".github/workflows/generate-pdfs.yml",
);
const workflow = readFileSync(workflowPath, "utf8");
const monitorWorkflow = readFileSync(
  join(process.cwd(), ".github/workflows/document-governance-monitor.yml"),
  "utf8",
);
const errors = [];

const required = [
  ["environment: production-documents", "protected production environment"],
  ["publish-production:", "separate production publication job"],
  ["needs: generate-and-validate", "validated-artifact dependency"],
  ["cancel-in-progress: true", "cost-control concurrency cancellation"],
  ["sha256sum --check", "release checksum verification"],
  ["inputs.release_confirmation == 'PUBLISH APPROVED DOCUMENTS'", "explicit publication confirmation"],
  ["npm run docs:audit:mish-overrun:check", "strict visual run-off gate"],
  ["pnpm ecosystem:pdf-manifest:build", "complete Ecosystem PDF source-manifest build"],
  ["pnpm ecosystem:pdf-pipeline:check", "complete Ecosystem treatment and hash gate"],
  ["pnpm ecosystem:binders:build", "ten package binders and master notebook build"],
  ["pnpm ecosystem:binders:check", "generated binder artifact verification"],
  ["github.ref == 'refs/heads/main'", "main-branch production publication restriction"],
  ["pnpm ecosystem:publication:check", "approved-lifecycle publication gate"],
  ["! -path \"$SRC/controlled-ecosystem/*\"", "internal binder publication exclusion"],
];

for (const [token, control] of required) {
  if (!workflow.includes(token)) errors.push(`Missing ${control}.`);
}

const monitorRequired = [
  ["push:", "governance monitoring on direct pushes"],
  ["branches: [main]", "main-branch governance trigger"],
  ["documents/input/**", "controlled document intake trigger"],
  ["workflow_dispatch:", "manual governance dispatch"],
];

for (const [token, control] of monitorRequired) {
  if (!monitorWorkflow.includes(token)) errors.push(`Missing ${control}.`);
}

const prohibited = [
  [/git log --oneline/, "Git commit count cannot establish document revision"],
  [/git log -1 --format/, "Git commit date cannot establish effective date"],
  [/npm install -g wrangler/, "Global unpinned Wrangler installation is prohibited"],
  [/--no-strict/, "Non-strict visual release audits are prohibited"],
];

for (const [pattern, message] of prohibited) {
  if (pattern.test(workflow)) errors.push(message);
}

if (errors.length) {
  console.error("Controlled PDF workflow gate failed:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  "Controlled PDF workflow gate passed: generation, validation, approval, and publication are separated.",
);
