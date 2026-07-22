#!/usr/bin/env node

/**
 * Website Congruency Check
 *
 * Enforces cross-site branding congruency beyond slogan sync by validating:
 * - terminology and anti-hype guardrails on page copy files
 * - metadata coverage on every routed page
 * - trust-surface continuity on required pages
 * - visual exception scoping for WA VOB badge colors
 * - typography contract signals in layout + global CSS
 */

const fs = require("node:fs");
const path = require("node:path");
const {
  DISALLOWED_HYPE_PATTERNS,
  TRUST_SURFACE_CONTRACTS,
} = require("./branding-rules.cjs");

const ROOT = process.cwd();
const REPO_ROOT = path.resolve(ROOT, "..", "..");
const APP_DIR = path.join(ROOT, "src", "app");
const SRC_DIR = path.join(ROOT, "src");
const COMPONENTS_DIR = path.join(SRC_DIR, "components");

const WA_VOB_BADGE_FILE = path.join(
  SRC_DIR,
  "components",
  "ui",
  "WaVobBadge.tsx",
);
const ROOT_LAYOUT_FILE = path.join(APP_DIR, "layout.tsx");
const GLOBALS_CSS_FILE = path.join(APP_DIR, "globals.css");
const SEO_ROUTE_POLICY_FILE = path.join(
  ROOT,
  "config",
  "seo",
  "route-indexing-policy.json",
);
const ROUTE_MANIFEST_FILE = path.join(
  ROOT,
  "src",
  "lib",
  "seo",
  "route-manifest.ts",
);
const COMPANY_CONSTANTS_FILE = path.join(
  REPO_ROOT,
  "packages",
  "shared",
  "src",
  "lib",
  "constants",
  "company.ts",
);
const CAREERS_PRINT_FILE = path.join(
  APP_DIR,
  "careers",
  "print",
  "PrintableApplicationClient.tsx",
);
const DIAGONAL_PATTERN_FILE = path.join(
  SRC_DIR,
  "components",
  "ui",
  "backgrounds",
  "DiagonalStripePattern.tsx",
);
const BRAND_BLOBS_FILE = path.join(
  SRC_DIR,
  "components",
  "ui",
  "backgrounds",
  "BrandColorBlobs.tsx",
);
const STRIPED_BACKGROUND_FILE = path.join(
  SRC_DIR,
  "components",
  "ui",
  "StripedBackground.tsx",
);
const BRANDED_SECTION_FILE = path.join(
  SRC_DIR,
  "components",
  "templates",
  "BrandedContentSection.tsx",
);

const HERO_VISUAL_FILES = [
  "src/components/home/HeroSection.tsx",
  "src/components/about/AboutHero.tsx",
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

const SERVICES_CONSOLIDATION_CONTRACT = {
  pageRoute: {
    relPath: "src/app/services/page.tsx",
    requiredSnippets: [
      "<ServicesHero",
      "<CoreServicesSection",
      "<ServiceAreasSection",
    ],
  },
  forbiddenRoute: "src/app/services/[slug]/page.tsx",
};

function fail(errors) {
  console.error("\nWebsite congruency check failed:\n");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

function walkFiles(dirPath, predicate, result = []) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walkFiles(fullPath, predicate, result);
      continue;
    }

    if (entry.isFile() && predicate(fullPath)) {
      result.push(fullPath);
    }
  }

  return result;
}

function rel(filePath) {
  return path.relative(ROOT, filePath).split(path.sep).join("/");
}

function hasMetadataExport(source) {
  return /export\s+(const\s+metadata|async\s+function\s+generateMetadata|function\s+generateMetadata)/.test(
    source,
  );
}

function listPageFiles() {
  return walkFiles(
    APP_DIR,
    (filePath) => path.basename(filePath) === "page.tsx",
  );
}

function checkMetadataCoverage(errors) {
  const pageFiles = listPageFiles();

  for (const pageFile of pageFiles) {
    const pageSource = fs.readFileSync(pageFile, "utf8");
    if (hasMetadataExport(pageSource)) {
      continue;
    }

    const layoutFile = path.join(path.dirname(pageFile), "layout.tsx");
    if (fs.existsSync(layoutFile)) {
      const layoutSource = fs.readFileSync(layoutFile, "utf8");
      if (hasMetadataExport(layoutSource)) {
        continue;
      }
    }

    errors.push(
      `Missing metadata export for route file ${rel(pageFile)} (no metadata in same-segment layout).`,
    );
  }
}

function checkDisallowedHypeLanguage(errors) {
  const candidateFiles = walkFiles(
    APP_DIR,
    (filePath) =>
      /\.(ts|tsx|js|jsx)$/.test(filePath) &&
      !filePath.includes("__tests__") &&
      !filePath.includes("/api/"),
  );

  for (const filePath of candidateFiles) {
    const source = fs.readFileSync(filePath, "utf8");
    for (const pattern of DISALLOWED_HYPE_PATTERNS) {
      if (pattern.test(source)) {
        errors.push(
          `Disallowed hype language (${pattern}) found in ${rel(filePath)}.`,
        );
      }
    }
  }
}

function checkTrustSurfaceContracts(errors) {
  for (const contract of TRUST_SURFACE_CONTRACTS) {
    const absPath = path.join(ROOT, contract.relPath);
    if (!fs.existsSync(absPath)) {
      errors.push(`Required trust-surface file missing: ${contract.relPath}`);
      continue;
    }

    const source = fs.readFileSync(absPath, "utf8");
    for (const snippet of contract.requiredSnippets) {
      if (!source.includes(snippet)) {
        errors.push(
          `Trust-surface contract missing in ${contract.relPath}: expected snippet "${snippet}".`,
        );
      }
    }
  }
}

function checkWaVobVisualExceptionScope(errors) {
  const sourceFiles = walkFiles(SRC_DIR, (filePath) =>
    /\.(ts|tsx|js|jsx)$/.test(filePath),
  );

  const exceptionPattern =
    /from-red-600[\s\S]{0,120}to-blue-700|to-blue-700[\s\S]{0,120}from-red-600/g;

  for (const filePath of sourceFiles) {
    const source = fs.readFileSync(filePath, "utf8");
    const hasExceptionGradient = exceptionPattern.test(source);
    if (!hasExceptionGradient) {
      continue;
    }

    if (path.resolve(filePath) !== path.resolve(WA_VOB_BADGE_FILE)) {
      errors.push(
        `WA VOB red→blue gradient exception appears outside WaVobBadge: ${rel(filePath)}.`,
      );
    }
  }
}

function checkTypographyContracts(errors) {
  const layoutSource = fs.readFileSync(ROOT_LAYOUT_FILE, "utf8");
  const globalsSource = fs.readFileSync(GLOBALS_CSS_FILE, "utf8");

  const hasLegacyTypekit = layoutSource.includes(
    "https://use.typekit.net/jqs8bjh.css",
  );
  const hasSelfHostedMendlContract =
    globalsSource.includes("@font-face") &&
    globalsSource.includes("mendl-sans-dusk") &&
    globalsSource.includes("mendl-sans-dusk");

  if (!hasLegacyTypekit && !hasSelfHostedMendlContract) {
    errors.push(
      `Typography contract missing in ${rel(ROOT_LAYOUT_FILE)} / ${rel(GLOBALS_CSS_FILE)}: expected legacy Typekit link or self-hosted Mendl @font-face stack.`,
    );
  }

  if (!globalsSource.includes("--font-heading")) {
    errors.push(`Missing --font-heading token in ${rel(GLOBALS_CSS_FILE)}.`);
  }

  if (!globalsSource.includes("--font-body")) {
    errors.push(`Missing --font-body token in ${rel(GLOBALS_CSS_FILE)}.`);
  }
}

function checkTypographyRoleContracts(errors) {
  const candidateFiles = [
    ...walkFiles(
      APP_DIR,
      (filePath) =>
        /\.tsx$/.test(filePath) &&
        !filePath.includes("__tests__") &&
        !filePath.includes("/api/"),
    ),
    ...walkFiles(
      COMPONENTS_DIR,
      (filePath) => /\.tsx$/.test(filePath) && !filePath.includes("__tests__"),
    ),
  ];

  const classNamePattern =
    /className\s*=\s*(?:"([^"]*)"|'([^']*)'|\{`([^`]*)`\})/g;
  const paragraphPattern =
    /<p\b[^>]*className\s*=\s*(?:"([^"]*)"|'([^']*)'|\{`([^`]*)`\})/g;

  for (const filePath of candidateFiles) {
    const source = fs.readFileSync(filePath, "utf8");

    for (const match of source.matchAll(classNamePattern)) {
      const classValue = match[1] || match[2] || match[3] || "";
      const hasUppercaseTracking =
        /\buppercase\b/.test(classValue) &&
        /\btracking-(?:wide|wider|widest)\b/.test(classValue);

      const hasExplicitUtilityLabelRole =
        /\bfont-heading\b/.test(classValue) ||
        /\bfont-subheading\b/.test(classValue);

      if (hasUppercaseTracking && !hasExplicitUtilityLabelRole) {
        errors.push(
          `Typography role contract: add font-heading or font-subheading to uppercase tracking label in ${rel(filePath)}.`,
        );
        break;
      }
    }

    for (const match of source.matchAll(paragraphPattern)) {
      const classValue = match[1] || match[2] || match[3] || "";
      const hasLeadingRelaxed = /\bleading-relaxed\b/.test(classValue);
      const hasExplicitRole =
        /\bfont-body\b/.test(classValue) || /\bfont-heading\b/.test(classValue);

      if (hasLeadingRelaxed && !hasExplicitRole) {
        errors.push(
          `Typography role contract: add font-body (or explicit role) to leading-relaxed paragraph in ${rel(filePath)}.`,
        );
        break;
      }
    }
  }
}

function checkCanonicalTerminologyAnchors(errors) {
  const constantsSource = fs.readFileSync(COMPANY_CONSTANTS_FILE, "utf8");
  const careersPrintSource = fs.readFileSync(CAREERS_PRINT_FILE, "utf8");

  if (
    !constantsSource.includes('primary: "Built on Quality, Backed by Trust."')
  ) {
    errors.push(
      `Primary slogan constant drift detected in ${rel(COMPANY_CONSTANTS_FILE)}.`,
    );
  }

  if (
    !constantsSource.includes('"Founded 2010, Veteran-Owned Since January 2025')
  ) {
    errors.push(
      `Canonical veteran-owned tagline drift detected in ${rel(COMPANY_CONSTANTS_FILE)}.`,
    );
  }

  if (
    !careersPrintSource.includes(
      'tagline: "Founded 2010, Veteran-Owned Since January 2025"',
    )
  ) {
    errors.push(
      `Careers print tagline must use canonical veteran-owned wording in ${rel(CAREERS_PRINT_FILE)}.`,
    );
  }
}

function checkCanonicalDomainUsage(errors) {
  const candidateFiles = walkFiles(
    path.join(ROOT, "src"),
    (filePath) =>
      /\.(ts|tsx|js|jsx)$/.test(filePath) && !filePath.includes("__tests__"),
  );

  for (const filePath of candidateFiles) {
    const source = fs.readFileSync(filePath, "utf8");
    if (source.includes("https://mhc-gc.com")) {
      errors.push(
        `Non-canonical domain (missing www) found in ${rel(filePath)}. Use https://www.mhc-gc.com.`,
      );
    }
  }
}

function checkPrimarySloganIntegrity(errors) {
  const candidateFiles = [
    ...walkFiles(
      APP_DIR,
      (filePath) =>
        /\.(ts|tsx|js|jsx)$/.test(filePath) && !filePath.includes("__tests__"),
    ),
    ...walkFiles(path.join(REPO_ROOT, "messages"), (filePath) =>
      /\.json$/.test(filePath),
    ),
  ];

  const malformedPatterns = [
    /Built on Quality,\s*Backed by Trust(?!\.)/g,
    /built on quality, backed by trust\./g,
  ];

  for (const filePath of candidateFiles) {
    const source = fs.readFileSync(filePath, "utf8");
    for (const pattern of malformedPatterns) {
      if (pattern.test(source)) {
        errors.push(
          `Malformed primary slogan variant found in ${rel(filePath)}. Canonical phrase is \"Built on Quality, Backed by Trust.\"`,
        );
      }
      pattern.lastIndex = 0;
    }
  }
}

function checkHeroVisualContracts(errors) {
  // Standard: PageNavigation belongs in the Page Heading, never inside a hero
  // section. Heroes own visual presentation only; wayfinding lives in the
  // heading area that follows the hero.
  const heroContainerSignal =
    /hero-section|hero-safe-top|hero-safe-bottom|min-h-screen|h-screen|calc\(100vh - var\(--mh-nav-offset|HeroSectionClient|useVideoHero/;

  // Detect PageNavigation placed inside a hero section. A hero section is
  // delimited by the opening hero-section tag and the closing </section> that
  // ends it. We use a simple heuristic: if the source contains both a
  // hero-container signal AND a PageNavigation import/usage, the file violates
  // the standard.
  const pageNavigationUsageRe = /<PageNavigation\b/;

  for (const relPath of HERO_VISUAL_FILES) {
    const absPath = path.join(ROOT, relPath);
    if (!fs.existsSync(absPath)) {
      errors.push(`Missing hero visual file: ${relPath}`);
      continue;
    }

    const source = fs.readFileSync(absPath, "utf8");

    if (!heroContainerSignal.test(source)) {
      errors.push(
        `Hero visual contract missing hero container signal in ${relPath}.`,
      );
    }

    if (pageNavigationUsageRe.test(source)) {
      errors.push(
        `Hero visual contract violation: PageNavigation must not be inside a hero section in ${relPath}. Move it to the Page Heading below the hero.`,
      );
    }
  }
}

function evaluateNonHeroBackgroundContractSources({
  diagonalSource,
  blobsSource,
  stripedSource,
  brandedSource,
}) {
  const contractErrors = [];

  const requiredDiagonalSnippets = [
    "/images/logo/mh-logo-light-bg.webp",
    "/images/logo/mh-logo-dark-bg.webp",
    'backgroundRepeat: "no-repeat"',
    "backgroundSize",
  ];

  for (const snippet of requiredDiagonalSnippets) {
    if (!diagonalSource.includes(snippet)) {
      contractErrors.push(
        `Non-hero background contract missing in DiagonalStripePattern: expected snippet "${snippet}".`,
      );
    }
  }

  if (diagonalSource.includes("repeating-linear-gradient(")) {
    contractErrors.push(
      "Legacy stripe gradient found in DiagonalStripePattern. Use MH logo paraplex tiles instead.",
    );
  }

  if (diagonalSource.includes('backgroundRepeat: "repeat"')) {
    contractErrors.push(
      "DiagonalStripePattern must render a single logo watermark (no-repeat), not repeated tiles.",
    );
  }

  const preservesAspectRatio =
    diagonalSource.includes('"contain"') || diagonalSource.includes("auto");
  if (!preservesAspectRatio) {
    contractErrors.push(
      "DiagonalStripePattern must preserve logo aspect ratio (use contain or auto sizing).",
    );
  }

  if (!blobsSource.includes("return null;")) {
    contractErrors.push(
      "BrandColorBlobs must remain disabled for non-hero logo paraplex compliance.",
    );
  }

  if (!stripedSource.includes("<DiagonalStripePattern")) {
    contractErrors.push(
      "StripedBackground must compose DiagonalStripePattern.",
    );
  }

  if (!brandedSource.includes("<DiagonalStripePattern")) {
    contractErrors.push(
      "BrandedContentSection must include DiagonalStripePattern.",
    );
  }

  if (brandedSource.includes("repeating-linear-gradient(")) {
    contractErrors.push(
      "Legacy stripe gradient found in BrandedContentSection. Use shared logo paraplex background only.",
    );
  }

  return contractErrors;
}

function checkNonHeroBackgroundContracts(errors) {
  const contractFiles = [
    DIAGONAL_PATTERN_FILE,
    BRAND_BLOBS_FILE,
    STRIPED_BACKGROUND_FILE,
    BRANDED_SECTION_FILE,
  ];

  for (const contractFile of contractFiles) {
    if (!fs.existsSync(contractFile)) {
      errors.push(
        `Non-hero background contract file missing: ${rel(contractFile)}.`,
      );
    }
  }

  if (!fs.existsSync(DIAGONAL_PATTERN_FILE)) {
    return;
  }

  const diagonalSource = fs.readFileSync(DIAGONAL_PATTERN_FILE, "utf8");
  const blobsSource = fs.existsSync(BRAND_BLOBS_FILE)
    ? fs.readFileSync(BRAND_BLOBS_FILE, "utf8")
    : "";
  const stripedSource = fs.existsSync(STRIPED_BACKGROUND_FILE)
    ? fs.readFileSync(STRIPED_BACKGROUND_FILE, "utf8")
    : "";
  const brandedSource = fs.existsSync(BRANDED_SECTION_FILE)
    ? fs.readFileSync(BRANDED_SECTION_FILE, "utf8")
    : "";

  const contractErrors = evaluateNonHeroBackgroundContractSources({
    diagonalSource,
    blobsSource,
    stripedSource,
    brandedSource,
  });

  for (const contractError of contractErrors) {
    if (contractError.includes("DiagonalStripePattern")) {
      errors.push(`${contractError} File: ${rel(DIAGONAL_PATTERN_FILE)}.`);
      continue;
    }

    if (contractError.includes("BrandColorBlobs")) {
      errors.push(`${contractError} File: ${rel(BRAND_BLOBS_FILE)}.`);
      continue;
    }

    if (contractError.includes("StripedBackground")) {
      errors.push(`${contractError} File: ${rel(STRIPED_BACKGROUND_FILE)}.`);
      continue;
    }

    if (contractError.includes("BrandedContentSection")) {
      errors.push(`${contractError} File: ${rel(BRANDED_SECTION_FILE)}.`);
    }
  }
}

function checkServicesConsolidationContract(errors) {
  const servicesPageContract = SERVICES_CONSOLIDATION_CONTRACT.pageRoute;
  const servicesPageAbsPath = path.join(ROOT, servicesPageContract.relPath);

  if (!fs.existsSync(servicesPageAbsPath)) {
    errors.push(
      `Missing canonical services page route file: ${servicesPageContract.relPath}.`,
    );
  } else {
    const source = fs.readFileSync(servicesPageAbsPath, "utf8");
    for (const snippet of servicesPageContract.requiredSnippets) {
      if (!source.includes(snippet)) {
        errors.push(
          `Services page contract missing in ${servicesPageContract.relPath}: expected snippet "${snippet}".`,
        );
      }
    }
  }

  const forbiddenRouteAbsPath = path.join(
    ROOT,
    SERVICES_CONSOLIDATION_CONTRACT.forbiddenRoute,
  );
  if (fs.existsSync(forbiddenRouteAbsPath)) {
    errors.push(
      `Services slug route must not exist: ${SERVICES_CONSOLIDATION_CONTRACT.forbiddenRoute}.`,
    );
  }

  if (!fs.existsSync(SEO_ROUTE_POLICY_FILE)) {
    errors.push(
      `SEO route policy file missing for services consolidation contract: ${rel(SEO_ROUTE_POLICY_FILE)}.`,
    );
  } else {
    try {
      const routePolicy = JSON.parse(
        fs.readFileSync(SEO_ROUTE_POLICY_FILE, "utf8"),
      );
      const redirectExact = routePolicy?.classes?.redirect?.exact;
      const indexableExact = routePolicy?.classes?.indexable?.exact;

      if (!Array.isArray(redirectExact)) {
        errors.push(
          `SEO route policy redirect.exact must be an array in ${rel(SEO_ROUTE_POLICY_FILE)}.`,
        );
      } else {
        if (
          redirectExact.includes("/services") ||
          redirectExact.includes("/services/[slug]")
        ) {
          errors.push(
            `SEO route policy redirect class must not include /services or /services/[slug] in ${rel(SEO_ROUTE_POLICY_FILE)}.`,
          );
        }
      }

      if (Array.isArray(indexableExact)) {
        if (!indexableExact.includes("/services")) {
          errors.push(
            `SEO route policy must classify /services as indexable in ${rel(SEO_ROUTE_POLICY_FILE)}.`,
          );
        }

        if (indexableExact.includes("/services/[slug]")) {
          errors.push(
            `SEO route policy must not classify /services/[slug] as indexable in ${rel(SEO_ROUTE_POLICY_FILE)}.`,
          );
        }
      }
    } catch (error) {
      errors.push(
        `Unable to parse SEO route policy JSON in ${rel(SEO_ROUTE_POLICY_FILE)}: ${error.message}`,
      );
    }
  }

  if (!fs.existsSync(ROUTE_MANIFEST_FILE)) {
    errors.push(`Route manifest file missing: ${rel(ROUTE_MANIFEST_FILE)}.`);
  } else {
    const manifestSource = fs.readFileSync(ROUTE_MANIFEST_FILE, "utf8");
    if (!manifestSource.includes('path: "/services"')) {
      errors.push(
        `Canonical services page route must appear in static route manifest entries inside ${rel(ROUTE_MANIFEST_FILE)}.`,
      );
    }

    if (manifestSource.includes('path: "/services/[slug]"')) {
      errors.push(
        `Services slug route must not appear in static route manifest entries inside ${rel(ROUTE_MANIFEST_FILE)}.`,
      );
    }
  }
}

function main() {
  const errors = [];

  checkMetadataCoverage(errors);
  checkDisallowedHypeLanguage(errors);
  checkTrustSurfaceContracts(errors);
  checkWaVobVisualExceptionScope(errors);
  checkTypographyContracts(errors);
  checkTypographyRoleContracts(errors);
  checkCanonicalTerminologyAnchors(errors);
  checkCanonicalDomainUsage(errors);
  checkPrimarySloganIntegrity(errors);
  checkHeroVisualContracts(errors);
  checkNonHeroBackgroundContracts(errors);
  checkServicesConsolidationContract(errors);

  if (errors.length > 0) {
    fail(errors);
  }

  const routeCount = listPageFiles().length;
  const servicesSummary = "services-consolidation=ok";
  console.log(
    `PASS: Website congruency check passed (routes=${routeCount}, contracts=${TRUST_SURFACE_CONTRACTS.length}, ${servicesSummary}).`,
  );
}

if (require.main === module) {
  main();
}

module.exports = {
  evaluateNonHeroBackgroundContractSources,
};
