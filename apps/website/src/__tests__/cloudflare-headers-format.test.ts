import * as fs from "fs";
import * as path from "path";

const ROOT = path.resolve(__dirname, "../..");
const HEADERS_PATH = path.join(ROOT, "public", "_headers");

interface ValidationIssue {
  line: number;
  message: string;
}

function validateHeadersSyntax(source: string): ValidationIssue[] {
  const lines = source.split(/\r?\n/);
  const issues: ValidationIssue[] = [];
  let currentPath: string | null = null;
  let headersForCurrentPath = 0;

  const flushPath = (line: number) => {
    if (currentPath && headersForCurrentPath === 0) {
      issues.push({
        line,
        message: `Path \"${currentPath}\" has no headers declared.`,
      });
    }
  };

  for (let index = 0; index < lines.length; index += 1) {
    const lineNumber = index + 1;
    const rawLine = lines[index] ?? "";
    const trimmed = rawLine.trim();

    if (trimmed === "" || trimmed.startsWith("#")) {
      continue;
    }

    const isIndented = /^\s/.test(rawLine);

    if (!isIndented) {
      flushPath(lineNumber);

      if (!trimmed.startsWith("/")) {
        issues.push({
          line: lineNumber,
          message: "Expected a path starting with '/'.",
        });
        currentPath = null;
        headersForCurrentPath = 0;
        continue;
      }

      currentPath = trimmed;
      headersForCurrentPath = 0;
      continue;
    }

    if (!currentPath) {
      issues.push({
        line: lineNumber,
        message: "Header declared before any path.",
      });
      continue;
    }

    const separatorIndex = trimmed.indexOf(":");
    if (
      separatorIndex <= 0 ||
      separatorIndex === trimmed.length - 1 ||
      !trimmed.slice(0, separatorIndex).trim() ||
      !trimmed.slice(separatorIndex + 1).trim()
    ) {
      issues.push({
        line: lineNumber,
        message: "Expected a colon-separated header pair.",
      });
      continue;
    }

    headersForCurrentPath += 1;
  }

  flushPath(lines.length || 1);
  return issues;
}

describe("Cloudflare _headers format guardrail", () => {
  it("uses valid path + indented header syntax", () => {
    const source = fs.readFileSync(HEADERS_PATH, "utf-8");
    const issues = validateHeadersSyntax(source);

    if (issues.length > 0) {
      const details = issues
        .map((issue) => `Line ${issue.line}: ${issue.message}`)
        .join("\n");
      throw new Error(
        `Invalid Cloudflare _headers configuration in ${HEADERS_PATH}:\n${details}`,
      );
    }

    expect(issues).toEqual([]);
  });
});
