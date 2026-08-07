import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const website = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const root = path.resolve(website, "../..");
const pkg = JSON.parse(
  await readFile(path.join(website, "package.json"), "utf8"),
);
const rootPkg = JSON.parse(
  await readFile(path.join(root, "package.json"), "utf8"),
);
const registry = JSON.parse(
  await readFile(
    path.join(website, "src/lib/data/controlled-document-redirects.json"),
    "utf8",
  ),
);
const governanceWorkflow = await readFile(
  path.join(root, ".github/workflows/document-governance-monitor.yml"),
  "utf8",
);
const failures = [];
const requireControl = (ok, message) => {
  if (!ok) failures.push(message);
};
const commands = [
  ...Object.entries(pkg.scripts),
  ...Object.entries(rootPkg.scripts),
];
requireControl(
  !commands.some(
    ([name, command]) =>
      /^docs:(generate|merge|all|release)(:|$)/.test(name) ||
      /documents\/scripts\/(generate|merge)\.mjs/.test(command),
  ),
  "Website PDF generation or full-rebuild command remains exposed.",
);
requireControl(
  !commands.some(([name]) =>
    /^qr:(generate|all|publish|release|bundle)/.test(name),
  ),
  "QR asset generation or publication command remains exposed.",
);
requireControl(
  !commands.some(
    ([name, command]) =>
      /docs:factory:install|docs:publish:approved/.test(name) ||
      /tools\/mh-document-factory/.test(command),
  ),
  "Website command still invokes the private document factory.",
);
requireControl(
  !/check-(?:ecosystem-pdf-pipeline|controlled-pdf-workflow)|build-ecosystem-(?:pdf-manifest|binders)|tools\/mh-document-factory/.test(
    governanceWorkflow,
  ),
  "Document governance workflow still invokes retired website generation or factory tooling.",
);
try {
  await access(path.join(root, ".github/workflows/generate-pdfs.yml"));
  failures.push("Automatic PDF workflow still exists.");
} catch {}
requireControl(
  registry.schemaVersion === 1 && registry.redirects.length > 0,
  "Controlled redirect registry is invalid.",
);
requireControl(
  new Set(registry.redirects.map((entry) => entry.stableId)).size ===
    registry.redirects.length,
  "Stable redirect IDs must be unique.",
);
for (const entry of registry.redirects) {
  requireControl(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.stableId),
    `Invalid stable ID: ${entry.stableId}`,
  );
  requireControl(
    entry.target.startsWith("/docs/") && !entry.target.includes(".."),
    `Unsafe redirect target: ${entry.stableId}`,
  );
}
for (const required of [
  "docs/technical/controlled-document-factory.md",
  "apps/website/src/app/go/docs/[stableId]/route.ts",
  "apps/website/src/lib/data/controlled-document-redirects.json",
]) {
  try {
    await access(path.join(root, required));
  } catch {
    failures.push(`Missing architecture control: ${required}`);
  }
}
for (const governed of [
  ".github/agents/qr-code-officer.agent.md",
  ".github/agents/form-development-officer.agent.md",
  ".github/agents/forms-logistics-officer.agent.md",
  ".github/agents/manual-development-standards-officer.agent.md",
  ".github/agents/safety-pdf-editor.agent.md",
  ".github/instructions/forms-branding-guardrail.instructions.md",
]) {
  const text = await readFile(path.join(root, governed), "utf8");
  requireControl(
    !/qr:(generate|test|check)|docs:generate|documents\/scripts\/generate\.mjs/.test(
      text,
    ),
    `Retired generator instruction remains active: ${governed}`,
  );
}
if (failures.length) {
  console.error("Controlled document architecture gate failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(
  `Controlled document architecture gate passed: ${registry.redirects.length} stable redirects; website generation, full rebuilds, and QR asset publication removed; offline incremental factory enforced.`,
);
