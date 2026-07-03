/**
 * @jest-environment node
 */

import fs from "node:fs";
import path from "node:path";

type PhraseGuardRule = {
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
  excerpt: string;
};

type SentenceOccurrence = {
  sentence: string;
  startIndex: number;
};

const SOURCE_ROOTS = [
  path.join(process.cwd(), "src", "app"),
  path.join(process.cwd(), "src", "components"),
  path.join(process.cwd(), "src", "lib", "data"),
  path.join(process.cwd(), "messages"),
  path.join(process.cwd(), "..", "..", "messages"),
];

const IGNORED_DIRS = new Set([
  "__tests__",
  "__mocks__",
  "node_modules",
  ".next",
  "api",
]);

const TARGET_EXTENSIONS = new Set([".ts", ".tsx", ".json"]);

const PHRASE_GUARD_RULES: PhraseGuardRule[] = [
  {
    id: "repetitive-precon-through-closeout",
    description:
      "Repetitive preconstruction-through-closeout phrase detected in public copy.",
    recommendation:
      "Use more specific wording for stage intent (for example: front-end scope definition, constructability mapping, turnover controls).",
    pattern: /from\s+preconstruction\s+through\s+closeout/gi,
  },
  {
    id: "repetitive-transparent-preconstruction",
    description:
      "Generic 'transparent preconstruction' phrase detected in public copy.",
    recommendation:
      "Describe the concrete planning mechanism (scope architecture, cost intelligence, procurement sequencing, or risk modeling).",
    pattern: /transparent\s+preconstruction/gi,
  },
  {
    id: "repetitive-clear-preconstruction-controls",
    description:
      "Generic 'clear preconstruction controls' phrase detected in public copy.",
    recommendation:
      "Replace with a unique phrase tied to the audience and stage outcome.",
    pattern: /clear\s+preconstruction\s+controls/gi,
  },
  {
    id: "repetitive-precon-through-turnover",
    description:
      "Repetitive preconstruction-through-turnover phrase detected in public copy.",
    recommendation:
      "Use differentiated wording that names the distinct operating stages being described.",
    pattern: /preconstruction\s+planning\s+through\s+turnover\s+execution/gi,
  },
  {
    id: "repetitive-precon-doc-procurement",
    description: "Repeated compliance phrase detected in public copy.",
    recommendation:
      "Use unique compliance wording such as front-end scope controls, documentation readiness, and procurement readiness.",
    pattern:
      /preconstruction,\s+documentation,\s+and\s+procurement\s+readiness/gi,
  },
  {
    id: "repetitive-precon-methods-boilerplate",
    description: "Repeated preconstruction boilerplate sentence detected.",
    recommendation:
      "Replace with a unique explanation of how planning decisions prevent downstream risk.",
    pattern:
      /preconstruction\s+methods\s+and\s+reduces\s+scope\s+drift,\s+change\s+pressure,\s+and\s+avoidable\s+delays/gi,
  },
];

function walkFiles(dirPath: string, files: string[] = []): string[] {
  if (!fs.existsSync(dirPath)) {
    return files;
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    if (IGNORED_DIRS.has(entry.name)) {
      continue;
    }

    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      walkFiles(fullPath, files);
      continue;
    }

    const ext = path.extname(entry.name);
    if (!TARGET_EXTENSIONS.has(ext)) {
      continue;
    }

    files.push(fullPath);
  }

  return files;
}

function toLineNumber(content: string, charIndex: number): number {
  return content.slice(0, charIndex).split("\n").length;
}

function getExcerpt(content: string, index: number, length: number): string {
  return content
    .slice(index, index + Math.max(length, 30))
    .replace(/\s+/g, " ");
}

function normalizeSentence(sentence: string): string {
  return sentence
    .toLowerCase()
    .replace(/["'`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractCandidateSentences(content: string): SentenceOccurrence[] {
  const matches = content.matchAll(/[^.!?\n]{40,}[.!?]/g);
  const occurrences: SentenceOccurrence[] = [];

  for (const match of matches) {
    const raw = match[0] ?? "";
    const startIndex = match.index ?? 0;
    const normalized = normalizeSentence(raw);

    const wordCount = normalized.split(" ").filter(Boolean).length;
    const hasCodeLikeTokens = /[{}<>=>]/.test(raw);

    if (wordCount < 9 || hasCodeLikeTokens) {
      continue;
    }

    occurrences.push({
      sentence: normalized,
      startIndex,
    });
  }

  return occurrences;
}

function collectSentenceDuplicationViolations(
  content: string,
  filePath: string,
): Violation[] {
  const violations: Violation[] = [];
  const occurrencesBySentence = new Map<string, SentenceOccurrence[]>();

  for (const occurrence of extractCandidateSentences(content)) {
    const list = occurrencesBySentence.get(occurrence.sentence) ?? [];
    list.push(occurrence);
    occurrencesBySentence.set(occurrence.sentence, list);
  }

  for (const [sentence, occurrences] of occurrencesBySentence.entries()) {
    if (occurrences.length <= 1) {
      continue;
    }

    for (const occurrence of occurrences.slice(1)) {
      violations.push({
        filePath,
        line: toLineNumber(content, occurrence.startIndex),
        ruleId: "duplicate-sentence-in-page",
        description: `Repeated sentence detected in same page file. Occurrences: ${occurrences.length}.`,
        recommendation:
          "Keep sentence-level phrasing unique within each page. Reframe repeated lines with section-specific wording.",
        excerpt: sentence.slice(0, 220),
      });
    }
  }

  return violations;
}

function shouldCheckSentenceDuplication(filePath: string): boolean {
  return /^src\/app\/(?:.*\/)?page\.tsx?$/.test(filePath);
}

function collectViolations(): Violation[] {
  const violations: Violation[] = [];

  for (const rootPath of SOURCE_ROOTS) {
    for (const filePath of walkFiles(rootPath)) {
      const content = fs.readFileSync(filePath, "utf8");
      const relativeFilePath = path.relative(process.cwd(), filePath);

      if (shouldCheckSentenceDuplication(relativeFilePath)) {
        violations.push(
          ...collectSentenceDuplicationViolations(content, relativeFilePath),
        );
      }

      for (const rule of PHRASE_GUARD_RULES) {
        const matches = [...content.matchAll(rule.pattern)];

        // Page-level policy: repeated phrasing is allowed across pages,
        // but the same phrase should not appear multiple times in one page file.
        if (matches.length <= 1) {
          continue;
        }

        for (const match of matches) {
          const index = match.index ?? 0;
          const matchedText = match[0] ?? "";

          violations.push({
            filePath: relativeFilePath,
            line: toLineNumber(content, index),
            ruleId: rule.id,
            description: `${rule.description} Duplicate occurrences in same page: ${matches.length}.`,
            recommendation: `${rule.recommendation} Keep one instance per page and vary any additional section wording.`,
            excerpt: getExcerpt(content, index, matchedText.length),
          });
        }
      }
    }
  }

  return violations;
}

describe("Public copy phrasing guardrails", () => {
  it("prevents reintroduction of repetitive preconstruction boilerplate in public-facing content", () => {
    const violations = collectViolations();

    if (violations.length > 0) {
      const details = violations
        .slice(0, 60)
        .map(
          (violation) =>
            `${violation.filePath}:${violation.line} [${violation.ruleId}] ${violation.description} Excerpt: "${violation.excerpt}" Recommendation: ${violation.recommendation}`,
        )
        .join("\n");

      throw new Error(
        `Found ${violations.length} public copy phrasing guardrail violation(s).\n${details}`,
      );
    }

    expect(violations).toHaveLength(0);
  });
});
