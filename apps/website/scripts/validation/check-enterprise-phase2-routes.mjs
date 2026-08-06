import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const routes = [
  "src/components/services/ServicesHero.tsx",
  "src/app/projects/components/ProjectsHero.tsx",
  "src/app/public-sector/PublicSectorFullPage.tsx",
  "src/app/projects/[slug]/page.tsx",
  "src/components/about/AboutHero.tsx",
  "src/app/about/details/page.tsx",
];
const failures = [];

for (const route of routes) {
  const source = readFileSync(resolve(root, route), "utf8");
  if (!source.includes("EnterpriseRouteHero")) {
    failures.push(`${route}: missing EnterpriseRouteHero`);
  }
}

const primitive = readFileSync(
  resolve(root, "src/components/enterprise/EnterpriseRouteHero.tsx"),
  "utf8",
);
for (const contract of [
  "enterprise-route-hero",
  "enterprise-proof-bar",
  "enterprise-button",
  'aria-labelledby="route-heading"',
]) {
  if (!primitive.includes(contract)) {
    failures.push(`EnterpriseRouteHero: missing contract ${contract}`);
  }
}

if (failures.length) {
  console.error("Phase 2 enterprise route gate failed:\n" + failures.join("\n"));
  process.exit(1);
}

console.log(`Phase 2 enterprise route gate passed (${routes.length} routes).`);
