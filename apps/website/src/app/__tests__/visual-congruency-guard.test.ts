/**
 * @jest-environment node
 */

import fs from "node:fs";
import path from "node:path";

type GuardrailRule = {
  id: string;
  description: string;
  recommendation: string;
  pattern: RegExp;
};

type Violation = {
  filePath: string;
  line: number;
  ruleId: string;
  description: string;
  recommendation: string;
};

const SOURCE_ROOTS = [
  path.join(process.cwd(), "src", "app"),
  path.join(process.cwd(), "src", "components"),
];

const IGNORED_DIRS = new Set([
  "__tests__",
  "__mocks__",
  "node_modules",
  ".next",
]);

const TARGET_FILE_EXTENSIONS = new Set([".tsx", ".jsx"]);

const GUARDRAIL_RULES: GuardrailRule[] = [
  {
    id: "legacy-neutral-card-shell",
    description:
      "Legacy neutral card shell is being used on a raw layout element instead of the shared Card primitive.",
    recommendation:
      'Use <Card className="..."> for repeated neutral content surfaces.',
    pattern:
      /<(?:div|article|aside|section)\b[^>]*className\s*=\s*(?:"[^"]*rounded-3xl border border-gray-200 bg-white p-6 shadow-sm[^"]*"|\{\s*`[^`]*rounded-3xl border border-gray-200 bg-white p-6 shadow-sm[^`]*`\s*\})/g,
  },
  {
    id: "legacy-brand-callout-shell",
    description:
      "Legacy branded callout shell is being used on a raw layout element instead of the shared Card primitive.",
    recommendation:
      'Use <Card className="..."> for repeated branded callout surfaces.',
    pattern:
      /<(?:div|article|aside|section)\b[^>]*className\s*=\s*(?:"[^"]*rounded-3xl border border-brand-primary\/20 bg-brand-primary\/5 p-6[^"]*"|\{\s*`[^`]*rounded-3xl border border-brand-primary\/20 bg-brand-primary\/5 p-6[^`]*`\s*\})/g,
  },
  {
    id: "legacy-empty-state-shell",
    description:
      "Legacy empty-state shell is being used on a raw div wrapper instead of the shared Card primitive.",
    recommendation:
      "Wrap empty-state surfaces in <Card> and keep the visual classes on Card.",
    pattern:
      /<div\b[^>]*className\s*=\s*(?:"[^"]*relative bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-8 sm:p-12 lg:p-16[^"]*"|\{\s*`[^`]*relative bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-8 sm:p-12 lg:p-16[^`]*`\s*\})/g,
  },
];

function walkSourceFiles(dirPath: string, files: string[] = []): string[] {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    if (IGNORED_DIRS.has(entry.name)) {
      continue;
    }

    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      walkSourceFiles(fullPath, files);
      continue;
    }

    const extension = path.extname(entry.name);
    const isTestFile = /\.(spec|test)\.[jt]sx?$/.test(entry.name);

    if (!TARGET_FILE_EXTENSIONS.has(extension) || isTestFile) {
      continue;
    }

    files.push(fullPath);
  }

  return files;
}

function toLineNumber(content: string, charIndex: number): number {
  return content.slice(0, charIndex).split("\n").length;
}

function collectViolations(): Violation[] {
  const violations: Violation[] = [];

  for (const rootPath of SOURCE_ROOTS) {
    if (!fs.existsSync(rootPath)) {
      continue;
    }

    for (const filePath of walkSourceFiles(rootPath)) {
      const content = fs.readFileSync(filePath, "utf8");

      for (const rule of GUARDRAIL_RULES) {
        const matches = content.matchAll(rule.pattern);

        for (const match of matches) {
          const index = match.index ?? 0;
          violations.push({
            filePath: path.relative(process.cwd(), filePath),
            line: toLineNumber(content, index),
            ruleId: rule.id,
            description: rule.description,
            recommendation: rule.recommendation,
          });
        }
      }
    }
  }

  return violations;
}

describe("Visual congruency guardrails", () => {
  it("prevents reintroduction of legacy raw card shells", () => {
    const violations = collectViolations();

    if (violations.length > 0) {
      const details = violations
        .slice(0, 40)
        .map(
          (violation) =>
            `${violation.filePath}:${violation.line} [${violation.ruleId}] ${violation.description} ${violation.recommendation}`,
        )
        .join("\n");

      throw new Error(
        `Found ${violations.length} visual congruency guardrail violation(s).\n${details}`,
      );
    }

    expect(violations).toHaveLength(0);
  });
});
