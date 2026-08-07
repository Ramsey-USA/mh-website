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
  "src/app/veterans/page.tsx",
  "src/app/contact/ContactPageClient.tsx",
  "src/app/jeremy-thamert/page.tsx",
];
const controlledBelowFoldSurfaces = [
  "src/app/services/page.tsx",
  "src/app/projects/ProjectsPageClient.tsx",
  "src/app/public-sector/PublicSectorFullPage.tsx",
  "src/app/about/details/page.tsx",
  "src/app/veterans/page.tsx",
  "src/app/contact/ContactPageClient.tsx",
];
const failures = [];

for (const route of routes) {
  const source = readFileSync(resolve(root, route), "utf8");
  if (!source.includes("EnterpriseRouteHero")) {
    failures.push(`${route}: missing EnterpriseRouteHero`);
  }
}

for (const route of controlledBelowFoldSurfaces) {
  const source = readFileSync(resolve(root, route), "utf8");
  if (!source.includes("enterprise-controlled-surface")) {
    failures.push(`${route}: missing enterprise-controlled-surface`);
  }
}

const globalStyles = readFileSync(resolve(root, "src/app/globals.css"), "utf8");
for (const contract of [
  ".enterprise-controlled-surface",
  "border-radius: 0 !important",
  "background-image: none !important",
  "-webkit-text-fill-color: currentColor !important",
]) {
  if (!globalStyles.includes(contract)) {
    failures.push(
      `globals.css: missing controlled surface contract ${contract}`,
    );
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
  console.error(
    "Phase 2 enterprise route gate failed:\n" + failures.join("\n"),
  );
  process.exit(1);
}

console.log(`Phase 2 enterprise route gate passed (${routes.length} routes).`);
