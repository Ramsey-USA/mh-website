/**
 * @jest-environment node
 *
 * Consolidated branding guardrails tests.
 *
 * Merges all branding validations into a single, logically-organized test suite:
 * - Slogan coverage and consistency
 * - Visual component guardrails
 * - Public copy phrasing rules
 * - Terminology guardrails
 * - Trust surface contracts
 * - Brand congruency signals
 *
 * This replaces:
 * - branding-congruency-contract.test.ts
 * - visual-congruency-guard.test.ts
 * - public-copy-phrasing-guard.test.ts
 * - Branding portions of pages-smoke.test.tsx
 */

import fs from "node:fs";
import path from "node:path";
import {
  SLOGAN_RULES,
  VISUAL_GUARDRAIL_RULES,
  TERMINOLOGY_GUARDRAIL_RULES,
  DISALLOWED_HYPE_PATTERNS,
  TRUST_SURFACE_CONTRACTS,
} from "@/lib/validation/branding-rules";
import {
  walkFiles,
  walkMultipleRoots,
  charIndexToLineNumber,
  getExcerpt,
  extractCandidateSentences,
  createJestErrorMessage,
  toRelativePath,
  readFileSafe,
  Violation,
} from "@/lib/validation/branding-validator";

const ROOT = process.cwd();
const APP_DIR = path.join(ROOT, "src", "app");
const SRC_DIR = path.join(ROOT, "src");
const REPO_ROOT = path.resolve(ROOT, "..", "..");

// ─────────────────────────────────────────────────────────────────────────────
// Slogan Coverage Tests
// ─────────────────────────────────────────────────────────────────────────────

describe("Branding Guardrails › Slogan Coverage", () => {
  describe("Primary and supporting slogan consistency", () => {
    it("keeps canonical primary slogan with supporting slogan in shared constants", () => {
      const companyConstantsPath = path.join(
        REPO_ROOT,
        "packages",
        "shared",
        "src",
        "lib",
        "constants",
        "company.ts",
      );
      const source = fs.readFileSync(companyConstantsPath, "utf8");
      expect(source).toContain(`primary: "${SLOGAN_RULES.primary}"`);
      expect(source).toContain(
        'supporting: "Clear facts. No spin. No surprises."',
      );
    });

    it("enforces supporting slogans in files that contain primary slogan", () => {
      const scanDirs = [
        path.join(SRC_DIR, "src"),
        path.join(REPO_ROOT, "messages"),
      ];
      const files = walkMultipleRoots(scanDirs, {
        ignoredDirs: new Set([
          "node_modules",
          ".next",
          ".wrangler",
          "coverage",
          "documents",
        ]),
      });

      const violations: string[] = [];

      for (const filePath of files) {
        const source = fs.readFileSync(filePath, "utf8");
        if (!SLOGAN_RULES.primaryRegex.test(source)) {
          continue;
        }

        if (!SLOGAN_RULES.supportingRegex.test(source)) {
          violations.push(toRelativePath(ROOT, filePath));
        }
      }

      if (violations.length > 0) {
        throw new Error(
          `Primary slogan found without supporting slogan in:\n${violations.map((f) => `  - ${f}`).join("\n")}`,
        );
      }
      expect(violations).toEqual([]);
    });

    it("covers all hero pages with primary and supporting slogans", () => {
      const gaps: Array<{
        file: string;
        hasPrimary: boolean;
        hasSupporting: boolean;
      }> = [];

      for (const relPath of SLOGAN_RULES.heroFiles) {
        const absPath = path.resolve(ROOT, relPath);
        const source = readFileSafe(absPath);

        if (!source) {
          continue; // File may not exist in all configs
        }

        const hasPrimary =
          /Built on Quality, Backed by Trust\.|COMPANY_INFO\.slogan\.primary|hero\.mission/.test(
            source,
          );
        const hasSupporting =
          /Squared away from start to finish\.|From Handshake to Handoff, we got your 'six\.'|Professional on the line\. Thorough in the details\.|No gaps\. No guesswork\. Just accountable follow-through\.|Clear facts\. No spin\. No surprises\.|COMPANY_INFO\.slogan\.(secondary|tertiary|quaternary|quinary)|sectionTagline/.test(
            source,
          );

        if (!hasPrimary || !hasSupporting) {
          gaps.push({
            file: relPath,
            hasPrimary,
            hasSupporting,
          });
        }
      }

      if (gaps.length > 0) {
        throw new Error(
          `Slogan coverage gaps:\n${gaps.map((g) => `  - ${g.file} | primary=${g.hasPrimary} supporting=${g.hasSupporting}`).join("\n")}`,
        );
      }
      expect(gaps).toEqual([]);
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Visual Congruency Tests
// ─────────────────────────────────────────────────────────────────────────────

describe("Branding Guardrails › Visual Congruency", () => {
  it("prevents reintroduction of legacy raw card shells and brand callout patterns", () => {
    const srcRoot = SRC_DIR;
    const scanFiles = walkFiles(srcRoot, {
      extensions: new Set([".tsx", ".jsx"]),
      excludeTestFiles: true,
    }).filter((filePath) => !filePath.includes("GlowEffect.tsx"));

    const violations: Violation[] = [];

    for (const filePath of scanFiles) {
      const source = fs.readFileSync(filePath, "utf8");

      for (const rule of VISUAL_GUARDRAIL_RULES) {
        const matches = source.matchAll(rule.pattern);

        for (const match of matches) {
          const index = match.index ?? 0;
          violations.push({
            filePath: toRelativePath(ROOT, filePath),
            line: charIndexToLineNumber(source, index),
            ruleId: rule.id,
            description: rule.description,
            recommendation: rule.recommendation,
            excerpt: getExcerpt(source, index, match[0].length),
          });
        }
      }
    }

    if (violations.length > 0) {
      throw new Error(
        createJestErrorMessage(
          "Found visual congruency guardrail violations:",
          violations,
          { maxItems: 20 },
        ),
      );
    }
    expect(violations).toEqual([]);
  });

  it("prevents high-intensity hover pulse and malformed group tokens on production components", () => {
    const srcRoot = SRC_DIR;
    const scanFiles = walkFiles(srcRoot, {
      extensions: new Set([".tsx", ".jsx"]),
      excludeTestFiles: true,
    });

    const offenders: string[] = [];

    for (const filePath of scanFiles) {
      const source = fs.readFileSync(filePath, "utf8");

      // Check for group-hover:animate-pulse
      if (source.includes("group-hover:animate-pulse")) {
        offenders.push(
          `${toRelativePath(ROOT, filePath)} [group-hover:animate-pulse]`,
        );
        continue;
      }

      // Check for malformed group- tokens
      if (/\bgroup-\s+/.test(source)) {
        offenders.push(
          `${toRelativePath(ROOT, filePath)} [malformed group- token]`,
        );
      }
    }

    if (offenders.length > 0) {
      throw new Error(
        `Found branding congruency violations:\n${offenders.map((o) => `  - ${o}`).join("\n")}`,
      );
    }
    expect(offenders).toEqual([]);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Public Copy Phrasing Tests
// ─────────────────────────────────────────────────────────────────────────────

describe("Branding Guardrails › Public Copy Phrasing", () => {
  it("prevents reintroduction of repetitive preconstruction boilerplate", () => {
    const scanRoots = [
      path.join(SRC_DIR, "src", "app"),
      path.join(SRC_DIR, "src", "components"),
      path.join(SRC_DIR, "src", "lib", "data"),
      path.join(SRC_DIR, "messages"),
      path.join(REPO_ROOT, "messages"),
    ];

    const violations: Violation[] = [];

    for (const rootPath of scanRoots) {
      if (!fs.existsSync(rootPath)) {
        continue;
      }

      const files = walkFiles(rootPath, {
        extensions: new Set([".ts", ".tsx", ".json"]),
      });

      for (const filePath of files) {
        const content = fs.readFileSync(filePath, "utf8");
        const relativeFilePath = toRelativePath(ROOT, filePath);

        for (const rule of TERMINOLOGY_GUARDRAIL_RULES) {
          const matches = [...content.matchAll(rule.pattern)];

          // Per-page policy: repeated phrase in same file is a violation
          if (matches.length <= 1) {
            continue;
          }

          for (const match of matches) {
            const index = match.index ?? 0;
            violations.push({
              filePath: relativeFilePath,
              line: charIndexToLineNumber(content, index),
              ruleId: rule.id,
              description: `${rule.description} (${matches.length} occurrences in same file)`,
              recommendation: `${rule.recommendation} Keep one instance per file.`,
              excerpt: getExcerpt(content, index, match[0].length),
            });
          }
        }
      }
    }

    if (violations.length > 0) {
      throw new Error(
        createJestErrorMessage(
          "Found public copy phrasing guardrail violations:",
          violations,
          { maxItems: 40 },
        ),
      );
    }
    expect(violations).toEqual([]);
  });

  it("detects repetitive sentences within individual page files", () => {
    const pageFiles = walkFiles(APP_DIR, {
      extensions: new Set([".tsx"]),
    }).filter((f) => path.basename(f) === "page.tsx");

    const violations: Violation[] = [];

    for (const pageFile of pageFiles) {
      const content = fs.readFileSync(pageFile, "utf8");
      const relativeFilePath = toRelativePath(ROOT, pageFile);

      const sentences = extractCandidateSentences(content);
      const occurrencesByNormalized = new Map<
        string,
        Array<{ sentence: string; startIndex: number }>
      >();

      for (const occurrence of sentences) {
        const key = occurrence.sentence;
        const list = occurrencesByNormalized.get(key) ?? [];
        list.push(occurrence);
        occurrencesByNormalized.set(key, list);
      }

      for (const [
        normalized,
        occurrences,
      ] of occurrencesByNormalized.entries()) {
        if (occurrences.length <= 1) {
          continue;
        }

        // Report duplicates after the first occurrence
        for (const occurrence of occurrences.slice(1)) {
          violations.push({
            filePath: relativeFilePath,
            line: charIndexToLineNumber(content, occurrence.startIndex),
            ruleId: "duplicate-sentence-in-page",
            description: `Repeated sentence in same page (${occurrences.length} total occurrences)`,
            recommendation:
              "Reframe repeated lines with section-specific wording.",
            excerpt: normalized.slice(0, 120),
          });
        }
      }
    }

    if (violations.length > 0) {
      throw new Error(
        createJestErrorMessage(
          "Found repeated sentences within individual pages:",
          violations,
          { maxItems: 30 },
        ),
      );
    }
    expect(violations).toEqual([]);
  });

  it("prevents hype language in public-facing content", () => {
    const scanRoots = [
      path.join(SRC_DIR, "src", "app"),
      path.join(SRC_DIR, "src", "components"),
    ];

    const violations: Violation[] = [];

    for (const rootPath of scanRoots) {
      const files = walkFiles(rootPath, {
        extensions: new Set([".tsx"]),
        excludeTestFiles: true,
      });

      for (const filePath of files) {
        const source = fs.readFileSync(filePath, "utf8");
        const relativeFilePath = toRelativePath(ROOT, filePath);

        for (const pattern of DISALLOWED_HYPE_PATTERNS) {
          const matches = source.matchAll(pattern);

          for (const match of matches) {
            const index = match.index ?? 0;
            violations.push({
              filePath: relativeFilePath,
              line: charIndexToLineNumber(source, index),
              ruleId: "hype-language",
              description: `Disallowed hype language detected: "${match[0]}"`,
              recommendation:
                "Use relationship-first, concrete language instead of marketing hype.",
              excerpt: getExcerpt(source, index, match[0].length),
            });
          }
        }
      }
    }

    if (violations.length > 0) {
      throw new Error(
        createJestErrorMessage(
          "Found hype language in public content:",
          violations,
          { maxItems: 30 },
        ),
      );
    }
    expect(violations).toEqual([]);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Trust Surface and SEO Contract Tests
// ─────────────────────────────────────────────────────────────────────────────

describe("Branding Guardrails › Trust Surfaces & SEO Contracts", () => {
  it("maintains trust surface contracts across required pages", () => {
    const violations: string[] = [];

    for (const contract of TRUST_SURFACE_CONTRACTS) {
      const absPath = path.resolve(ROOT, contract.relPath);
      const source = readFileSafe(absPath);

      if (!source) {
        continue;
      }

      for (const snippet of contract.requiredSnippets) {
        if (!source.includes(snippet)) {
          violations.push(`${contract.relPath} missing: "${snippet}"`);
        }
      }
    }

    if (violations.length > 0) {
      throw new Error(
        `Trust surface violations:\n${violations.map((v) => `  - ${v}`).join("\n")}`,
      );
    }
    expect(violations).toEqual([]);
  });

  it("keeps services flow on homepage and routed to /services", () => {
    const homePagePath = path.join(APP_DIR, "page.tsx");
    const homeSource = fs.readFileSync(homePagePath, "utf8");

    expect(homeSource).toContain("Home Page Hero Section");
    expect(homeSource).toContain("Company Overview");
    expect(homeSource).toContain("utm_campaign=home-splash");
  });

  it("keeps services overview indexable without legacy detail slug routes", () => {
    const servicesSeoUtilsPath = path.join(
      SRC_DIR,
      "lib",
      "seo",
      "page-seo-utils.ts",
    );
    const servicesSeoSource = fs.readFileSync(servicesSeoUtilsPath, "utf8");
    const serviceSlugPagePath = path.join(
      APP_DIR,
      "services",
      "[slug]",
      "page.tsx",
    );

    expect(servicesSeoSource).toContain(
      "const servicesUrl = `${enhancedSEO.siteUrl}/services`;",
    );
    expect(fs.existsSync(serviceSlugPagePath)).toBe(false);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Metadata Coverage Test
// ─────────────────────────────────────────────────────────────────────────────

describe("Branding Guardrails › Metadata Coverage", () => {
  it("ensures all routed pages have metadata exports or inherit from layout", () => {
    const pageFiles = walkFiles(APP_DIR, {
      extensions: new Set([".tsx"]),
    }).filter((f) => path.basename(f) === "page.tsx");

    const violations: string[] = [];

    for (const pageFile of pageFiles) {
      const pageSource = fs.readFileSync(pageFile, "utf8");
      const hasMetadata =
        /export\s+(const\s+metadata|async\s+function\s+generateMetadata|function\s+generateMetadata)/.test(
          pageSource,
        );

      if (hasMetadata) {
        continue;
      }

      const layoutFile = path.join(path.dirname(pageFile), "layout.tsx");
      if (fs.existsSync(layoutFile)) {
        const layoutSource = fs.readFileSync(layoutFile, "utf8");
        if (
          /export\s+(const\s+metadata|async\s+function\s+generateMetadata|function\s+generateMetadata)/.test(
            layoutSource,
          )
        ) {
          continue;
        }
      }

      violations.push(toRelativePath(ROOT, pageFile));
    }

    if (violations.length > 0) {
      throw new Error(
        `Missing metadata exports:\n${violations.map((v) => `  - ${v}`).join("\n")}`,
      );
    }
    expect(violations).toEqual([]);
  });
});
