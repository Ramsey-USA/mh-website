/**
 * Shared branding validation utilities for both Jest tests and CLI scripts.
 *
 * Provides:
 * - Efficient file walking with caching
 * - Violation collection and formatting
 * - Reusable patterns for common checks
 * - Support for both test and CLI reporting
 *
 * @module branding-validator
 */

import fs from "node:fs";
import path from "node:path";

// ─────────────────────────────────────────────────────────────────────────────
// File Walking Utilities
// ─────────────────────────────────────────────────────────────────────────────

export type FileWalkPredicate = (filePath: string) => boolean;

const DEFAULT_IGNORED_DIRS = new Set([
  "node_modules",
  ".next",
  ".open-next",
  ".wrangler",
  "coverage",
  "lighthouse-results",
  "documents",
  "__tests__",
  "__mocks__",
  "api",
]);

export interface FileWalkOptions {
  ignoredDirs?: Set<string>;
  extensions?: Set<string>;
  excludeTestFiles?: boolean;
}

/**
 * Efficiently walk a directory and collect matching files.
 * Respects ignored directories and filters by extension.
 */
export function walkFiles(
  dirPath: string,
  options: FileWalkOptions = {},
  files: string[] = [],
): string[] {
  if (!fs.existsSync(dirPath)) {
    return files;
  }

  const ignoredDirs = options.ignoredDirs ?? DEFAULT_IGNORED_DIRS;
  const extensions =
    options.extensions ?? new Set([".ts", ".tsx", ".js", ".jsx", ".json"]);
  const excludeTestFiles = options.excludeTestFiles ?? false;

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    if (ignoredDirs.has(entry.name)) {
      continue;
    }

    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      walkFiles(fullPath, options, files);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const ext = path.extname(entry.name);
    if (!extensions.has(ext)) {
      continue;
    }

    if (excludeTestFiles && /\.(spec|test)\.[jt]sx?$/.test(entry.name)) {
      continue;
    }

    files.push(fullPath);
  }

  return files;
}

/**
 * Walk multiple directory roots and collect matching files.
 */
export function walkMultipleRoots(
  roots: string[],
  options: FileWalkOptions = {},
): string[] {
  const files: string[] = [];
  for (const root of roots) {
    walkFiles(root, options, files);
  }
  return files;
}

// ─────────────────────────────────────────────────────────────────────────────
// Violation Collection
// ─────────────────────────────────────────────────────────────────────────────

export interface Violation {
  filePath: string;
  line: number;
  ruleId: string;
  description: string;
  recommendation: string;
  excerpt?: string;
}

/**
 * Convert a character index to a line number.
 */
export function charIndexToLineNumber(
  content: string,
  charIndex: number,
): number {
  return content.slice(0, charIndex).split("\n").length;
}

/**
 * Extract a short excerpt from content at a given position.
 */
export function getExcerpt(
  content: string,
  index: number,
  length: number,
): string {
  return content
    .slice(index, index + Math.max(length, 30))
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Normalize sentence for comparison (lowercase, remove quotes, normalize whitespace).
 */
export function normalizeSentence(sentence: string): string {
  return sentence
    .toLowerCase()
    .replace(/["'`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// ─────────────────────────────────────────────────────────────────────────────
// Pattern Matching Utilities
// ─────────────────────────────────────────────────────────────────────────────

export interface PatternCheckResult {
  isViolation: boolean;
  matchCount: number;
  matches: RegExpMatchArray[];
}

/**
 * Check content against a pattern, detecting multiple occurrences.
 * Returns detailed match information for further processing.
 */
export function checkPatternInContent(
  content: string,
  pattern: RegExp,
): PatternCheckResult {
  const matches = [...content.matchAll(pattern)];
  return {
    isViolation: matches.length > 0,
    matchCount: matches.length,
    matches,
  };
}

/**
 * Find all sentences in content that match a length threshold.
 * Useful for detecting sentence-level duplication and boilerplate.
 */
export function extractCandidateSentences(
  content: string,
  minWords = 9,
): Array<{ sentence: string; startIndex: number }> {
  const matches = content.matchAll(/[^.!?\n]{40,}[.!?]/g);
  const occurrences: Array<{ sentence: string; startIndex: number }> = [];

  for (const match of matches) {
    const raw = match[0] ?? "";
    const startIndex = match.index ?? 0;
    const normalized = normalizeSentence(raw);

    const wordCount = normalized.split(" ").filter(Boolean).length;
    const hasCodeLikeTokens = /[{}<>=>]/.test(raw);

    if (wordCount < minWords || hasCodeLikeTokens) {
      continue;
    }

    occurrences.push({
      sentence: normalized,
      startIndex,
    });
  }

  return occurrences;
}

// ─────────────────────────────────────────────────────────────────────────────
// Violation Formatting
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Format violations for display in Jest tests or CLI output.
 */
export function formatViolationsForDisplay(
  violations: Violation[],
  options: { maxItems?: number; includeExcerpt?: boolean } = {},
): string {
  const { maxItems = 40, includeExcerpt = true } = options;
  const display = violations.slice(0, maxItems);

  return display
    .map((v) => {
      const location = `${v.filePath}:${v.line}`;
      const rule = `[${v.ruleId}]`;
      const desc = v.description;
      const rec = `Recommendation: ${v.recommendation}`;
      const excerpt =
        includeExcerpt && v.excerpt ? `Excerpt: "${v.excerpt}"` : "";

      return [location, rule, desc, rec, excerpt].filter(Boolean).join(" ");
    })
    .join("\n");
}

/**
 * Create an error message for Jest assertions.
 */
export function createJestErrorMessage(
  title: string,
  violations: Violation[],
  options?: { maxItems?: number; includeExcerpt?: boolean },
): string {
  const formatted = formatViolationsForDisplay(violations, options);
  return `${title}\n\nFound ${violations.length} violation(s):\n\n${formatted}`;
}

/**
 * Relative path utility (consistent across platforms).
 */
export function toRelativePath(rootDir: string, filePath: string): string {
  return path.relative(rootDir, filePath).split(path.sep).join("/");
}

// ─────────────────────────────────────────────────────────────────────────────
// Safe File Operations
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Safely read a file, returning null on error.
 */
export function readFileSafe(filePath: string): string | null {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
}

/**
 * Check if a file path matches a pattern (for source detection).
 */
export function matchesPattern(
  filePath: string,
  pattern: RegExp | string,
): boolean {
  const regex = typeof pattern === "string" ? new RegExp(pattern) : pattern;
  return regex.test(filePath);
}
