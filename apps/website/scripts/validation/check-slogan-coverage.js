#!/usr/bin/env node

/**
 * Slogan Coverage Check
 *
 * Enforces MH branding coverage for page-level hero surfaces.
 * Each listed file must contain:
 * - one primary slogan signal
 * - one supporting slogan signal
 *
 * Usage:
 *   node scripts/validation/check-slogan-coverage.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const HERO_FILES = [
  "src/components/home/HeroSection.tsx",
  "src/components/about/AboutHero.tsx",
  "src/components/services/ServicesHero.tsx",
  "src/components/locations/LocationPageContent.tsx",
  "src/app/projects/components/ProjectsHero.tsx",
  "src/app/team/page.tsx",
  "src/app/contact/ContactPageClient.tsx",
  "src/app/locations/page.tsx",
  "src/app/projects/[slug]/page.tsx",
  "src/app/testimonials/page.tsx",
  "src/app/faq/page.tsx",
  "src/app/faq/[category]/page.tsx",
  "src/app/veterans/page.tsx",
  "src/app/safety/page.tsx",
  "src/app/careers/CareersPageClient.tsx",
  "src/app/resources/page.tsx",
  "src/app/public-sector/PublicSectorFullPage.tsx",
  "src/app/public-sector/veteran-led-compliance/page.tsx",
  "src/app/public-sector/tri-state-government-construction/page.tsx",
  "src/app/allies/page.tsx",
];

const PRIMARY_SIGNAL =
  /Built on Quality, Backed by Trust\.|COMPANY_INFO\.slogan\.primary|hero\.mission/;

const SUPPORTING_SIGNAL =
  /Squared away from start to finish\.|From Handshake to Handoff, we got your 'six\.'|Professional on the line\. Thorough in the details\.|No gaps\. No guesswork\. Just accountable follow-through\.|COMPANY_INFO\.slogan\.(secondary|tertiary|quaternary|quinary)|sectionTagline/;

function readFileSafe(absPath) {
  try {
    return fs.readFileSync(absPath, "utf8");
  } catch {
    return null;
  }
}

function main() {
  const missingFiles = [];
  const gaps = [];

  for (const relPath of HERO_FILES) {
    const absPath = path.resolve(ROOT, relPath);
    const source = readFileSafe(absPath);

    if (source == null) {
      missingFiles.push(relPath);
      continue;
    }

    const hasPrimary = PRIMARY_SIGNAL.test(source);
    const hasSupporting = SUPPORTING_SIGNAL.test(source);

    if (!hasPrimary || !hasSupporting) {
      gaps.push({
        file: relPath,
        hasPrimary,
        hasSupporting,
      });
    }
  }

  if (missingFiles.length > 0) {
    console.error("\nMissing slogan-coverage files:");
    for (const file of missingFiles) {
      console.error(`  - ${file}`);
    }
  }

  if (gaps.length > 0) {
    console.error("\nSlogan coverage gaps detected:");
    for (const gap of gaps) {
      console.error(
        `  - ${gap.file} | primary=${gap.hasPrimary ? "yes" : "no"} supporting=${gap.hasSupporting ? "yes" : "no"}`,
      );
    }
  }

  if (missingFiles.length > 0 || gaps.length > 0) {
    console.error("\nFAIL: Slogan coverage check failed.");
    process.exit(1);
  }

  console.log("PASS: Slogan coverage check passed for all hero surfaces.");
}

main();
