#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();

function readJson(relativePath) {
  const fullPath = path.join(rootDir, relativePath);
  return JSON.parse(fs.readFileSync(fullPath, "utf8"));
}

function extractSemver(value, label) {
  const match = String(value ?? "").match(/\d+\.\d+\.\d+/);
  if (!match) {
    throw new Error(`Unable to parse semantic version for ${label}: ${value}`);
  }
  return match[0];
}

function readText(relativePath) {
  const fullPath = path.join(rootDir, relativePath);
  return fs.readFileSync(fullPath, "utf8");
}

function expectLine(relativePath, expectedLine, failures) {
  const content = readText(relativePath);
  if (!content.includes(expectedLine)) {
    failures.push({ relativePath, expectedLine });
  }
}

const websitePkg = readJson("apps/website/package.json");

const versions = {
  next: extractSemver(websitePkg.dependencies?.next, "apps/website next"),
  react: extractSemver(websitePkg.dependencies?.react, "apps/website react"),
  tailwind: extractSemver(
    websitePkg.devDependencies?.tailwindcss,
    "apps/website tailwindcss",
  ),
  typescript: extractSemver(
    websitePkg.devDependencies?.typescript,
    "apps/website typescript",
  ),
  opennextCloudflare: extractSemver(
    websitePkg.devDependencies?.["@opennextjs/cloudflare"],
    "apps/website @opennextjs/cloudflare",
  ),
  wrangler: extractSemver(
    websitePkg.devDependencies?.wrangler,
    "apps/website wrangler",
  ),
};

const failures = [];

expectLine(
  "README.md",
  `- Frameworks: Next.js ${versions.next}, React ${versions.react}, Tailwind CSS ${versions.tailwind}, TypeScript ${versions.typescript}`,
  failures,
);

expectLine(
  "docs/project/index.md",
  `- Current app stack in repo: Next.js ${versions.next}, React ${versions.react}, Tailwind CSS ${versions.tailwind}, TypeScript ${versions.typescript}.`,
  failures,
);

expectLine(
  "docs/project/architecture.md",
  `- **Framework**: Next.js ${versions.next} (App Router)`,
  failures,
);
expectLine(
  "docs/project/architecture.md",
  `- **Language**: TypeScript ${versions.typescript}`,
  failures,
);
expectLine(
  "docs/project/architecture.md",
  `- **Styling**: Tailwind CSS ${versions.tailwind}`,
  failures,
);

expectLine(
  "docs/technical/homepage.md",
  `  "next": "${versions.next}",`,
  failures,
);
expectLine(
  "docs/technical/homepage.md",
  `  "react": "^${versions.react}",`,
  failures,
);
expectLine(
  "docs/technical/homepage.md",
  `  "typescript": "^${versions.typescript}"`,
  failures,
);

expectLine(
  "docs/deployment/cloudflare-compatibility.md",
  `Current deployed stack: Next.js ${versions.next}, @opennextjs/cloudflare ${versions.opennextCloudflare}, wrangler ${versions.wrangler}.`,
  failures,
);

if (failures.length > 0) {
  console.error("FAIL: Documentation stack/version congruency check failed.");
  for (const failure of failures) {
    console.error(`  File: ${failure.relativePath}`);
    console.error(`  Expected line: ${failure.expectedLine}`);
  }
  process.exit(1);
}

console.log("Documentation stack/version congruency check passed.");
