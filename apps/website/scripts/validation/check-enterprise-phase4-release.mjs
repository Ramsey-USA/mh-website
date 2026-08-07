import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const appRoot = process.cwd();
const repositoryRoot = resolve(appRoot, "../..");
const packageJson = JSON.parse(
  readFileSync(resolve(appRoot, "package.json"), "utf8"),
);
const ciWorkflow = readFileSync(
  resolve(repositoryRoot, ".github/workflows/ci-cd.yml"),
  "utf8",
);
const failures = [];

const requiredScripts = [
  "enterprise:phase2:check",
  "ip:governance:check",
  "report:spanish:coverage",
  "congruency:locale:check",
  "verify:route-integrity",
  "seo:routes:sync:check",
  "seo:routes:check",
  "test:ci:fast",
  "check:asset-budgets",
  "check:hero-commercials",
  "terminology:guardrails:check",
  "security:check",
  "build:next",
  "smoke:branding:visual:ci",
  "perf:gate",
  "docs:factory:check",
  "qr:redirects:check",
];

for (const script of requiredScripts) {
  if (!packageJson.scripts?.[script]) {
    failures.push(`package.json: missing required release control ${script}`);
  }
}

const requiredWorkflowCommands = [
  "npm run enterprise:release:check",
  "npm run ip:governance:check",
  "npm run type-check",
  "npm run lint",
  "npm run seo:routes:sync:check",
  "npm run seo:routes:check",
  "npm run verify:route-integrity",
  "npm run format:check",
  "npm run lint:brand",
  "npm run test:ci:fast",
  "npm run check:asset-budgets",
  "npm run terminology:guardrails:check",
  "npm run report:spanish:coverage",
  "npm run security:check",
  "npm run build:next",
];

for (const command of requiredWorkflowCommands) {
  if (!ciWorkflow.includes(command)) {
    failures.push(`ci-cd.yml: missing required release command ${command}`);
  }
}

for (const contract of [
  'SPANISH_COVERAGE_STRICT: "1"',
  "needs: [build-website, security-audit]",
  "github.ref == 'refs/heads/main'",
  "npm run seo:sitemaps:submit",
]) {
  if (!ciWorkflow.includes(contract)) {
    failures.push(
      `ci-cd.yml: missing fail-closed release contract ${contract}`,
    );
  }
}

if (failures.length) {
  console.error(
    "Enterprise Phase 4 release command failed:\\n" + failures.join("\\n"),
  );
  process.exit(1);
}

console.log(
  `Enterprise Phase 4 release command passed (${requiredScripts.length} capability controls, ${requiredWorkflowCommands.length} mandatory CI commands).`,
);
