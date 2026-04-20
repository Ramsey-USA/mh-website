#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const { execSync } = require("node:child_process");
const fs = require("node:fs");

const ALLOWED_EXT = /\.(ts|tsx|js|jsx|css|scss|md|mdx|json)$/i;
const EXCEPTIONS_FILE = ".github/branding-exceptions.json";

const BANNED_PHRASES = [
  "ai estimator",
  "automated closer",
  "book instantly now",
  "elite strike force",
  "war room specials",
  "dominate your market",
  "guaranteed instant quote",
  "best in class",
  "unbeatable pricing",
  "cheap contractor",
];

const REQUIRED_PLAIN_LANGUAGE_LABELS = [
  "home",
  "about",
  "services",
  "projects",
  "team",
  "testimonials",
  "careers",
  "contact",
];

const TRUST_CRITICAL_FILES = new Set([
  "src/components/layout/Footer.tsx",
  "src/app/about/page.tsx",
  "src/app/contact/ContactPageClient.tsx",
  "src/app/allies/page.tsx",
  "src/app/public-sector/page.tsx",
  "src/app/veterans/page.tsx",
]);

const PHRASE_MILITARIZED_LABEL_RISK = [
  "battle-tested",
  "tactical domination",
  "combat contractor",
  "warrior pricing",
];

const MARKETING_HEAVY_PATHS = [
  "src/app/about/page.tsx",
  "src/app/services/page.tsx",
  "src/app/projects/page.tsx",
  "src/app/team/page.tsx",
  "src/app/contact/ContactPageClient.tsx",
  "src/app/public-sector/page.tsx",
  "src/app/veterans/page.tsx",
  "src/app/allies/page.tsx",
  "docs/marketing/",
];

const RELATIONSHIP_FIRST_PHRASES = [
  "relationship",
  "consultation",
  "client",
  "communication",
  "honesty",
  "integrity",
];

const POLICY_FILE_PREFIXES = [
  ".github/agents/",
  ".github/hooks/",
  ".github/workflows/",
  ".github/instructions/",
  ".github/PULL_REQUEST_TEMPLATE.md",
  ".github/branding-exceptions.json",
];

function run(cmd) {
  return execSync(cmd, {
    encoding: "utf8",
    stdio: ["pipe", "pipe", "ignore"],
  }).trim();
}

function safeRun(cmd) {
  try {
    return run(cmd);
  } catch {
    return "";
  }
}

function toLines(value) {
  if (!value) {
    return [];
  }
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function getCiChangedFiles() {
  const baseRef = process.env.GITHUB_BASE_REF;
  if (baseRef) {
    safeRun(`git fetch --no-tags --depth=1 origin ${baseRef}`);
    const againstBase = toLines(
      safeRun(`git diff --name-only origin/${baseRef}...HEAD`),
    );
    if (againstBase.length > 0) {
      return againstBase;
    }
  }

  return toLines(safeRun("git diff --name-only HEAD~1...HEAD"));
}

function getLocalChangedFiles() {
  const staged = safeRun("git diff --name-only --cached")
    .split("\n")
    .filter(Boolean);
  const unstaged = safeRun("git diff --name-only").split("\n").filter(Boolean);
  const untracked = safeRun("git ls-files --others --exclude-standard")
    .split("\n")
    .filter(Boolean);
  return [...new Set([...staged, ...unstaged, ...untracked])];
}

function getChangedFiles() {
  const changed =
    process.env.GITHUB_ACTIONS === "true"
      ? getCiChangedFiles()
      : getLocalChangedFiles();
  return [...new Set(changed)].filter((file) => ALLOWED_EXT.test(file));
}

function getCompareRef() {
  if (process.env.GITHUB_ACTIONS === "true" && process.env.GITHUB_BASE_REF) {
    return `origin/${process.env.GITHUB_BASE_REF}`;
  }
  return "HEAD";
}

function readFileFromRef(ref, path) {
  return safeRun(`git show ${ref}:${JSON.stringify(path)}`);
}

function readFileFromFs(path) {
  try {
    return fs.readFileSync(path, "utf8");
  } catch {
    return "";
  }
}

function normalize(value) {
  return value.toLowerCase().replaceAll(/\s+/g, " ");
}

function hasTrustSignals(content) {
  const c = normalize(content);
  return (
    c.includes("accredit") ||
    c.includes("credential") ||
    c.includes("trust") ||
    c.includes("bbb") ||
    c.includes("chamber")
  );
}

function isMarketingHeavyPath(path) {
  return MARKETING_HEAVY_PATHS.some(
    (target) => path === target || path.startsWith(target),
  );
}

function isPolicyFile(path) {
  return POLICY_FILE_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(prefix),
  );
}

function globToRegex(glob) {
  const escaped = glob
    .replaceAll(/[.+^${}()|[\]\\]/g, String.raw`\$&`)
    .replaceAll(/\*/g, ".*")
    .replaceAll(/\?/g, ".");
  return new RegExp(`^${escaped}$`, "i");
}

function loadExceptions() {
  try {
    const raw = fs.readFileSync(EXCEPTIONS_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.exceptions)) {
      return [];
    }
    return parsed.exceptions;
  } catch {
    return [];
  }
}

function isExpired(expiresOn) {
  if (!expiresOn) {
    return false;
  }
  const expiry = new Date(expiresOn);
  if (Number.isNaN(expiry.getTime())) {
    return false;
  }
  return expiry.getTime() < Date.now();
}

function isExceptionMatch(exception, violation) {
  if (
    !exception ||
    exception.active === false ||
    isExpired(exception.expiresOn)
  ) {
    return false;
  }

  if (exception.rule && exception.rule !== violation.rule) {
    return false;
  }

  if (exception.filePattern) {
    const matcher = globToRegex(exception.filePattern);
    if (!matcher.test(violation.file)) {
      return false;
    }
  }

  if (exception.detailPattern) {
    const detailNeedle = normalize(exception.detailPattern);
    if (!normalize(violation.detail).includes(detailNeedle)) {
      return false;
    }
  }

  return true;
}

function applyExceptions(violations) {
  const exceptions = loadExceptions();
  if (exceptions.length === 0) {
    return violations;
  }

  return violations.filter(
    (violation) =>
      !exceptions.some((exception) => isExceptionMatch(exception, violation)),
  );
}

function detectViolations(path, before, after) {
  // Do not scan policy/config files for content phrase violations.
  if (isPolicyFile(path)) {
    return [];
  }

  const afterNorm = normalize(after);
  const violations = [];

  violations.push(
    ...BANNED_PHRASES.filter((phrase) => afterNorm.includes(phrase)).map(
      (phrase) => ({
        file: path,
        severity: "high",
        rule: "Off-brand phrase",
        detail: `Banned phrase detected: "${phrase}"`,
      }),
    ),
  );

  violations.push(
    ...PHRASE_MILITARIZED_LABEL_RISK.filter((phrase) =>
      afterNorm.includes(phrase),
    ).map((phrase) => ({
      file: path,
      severity: "high",
      rule: "Militarized label risk",
      detail: `Avoid slogan-heavy militarized label: "${phrase}"`,
    })),
  );

  if (
    path.includes("seo") ||
    path.includes("metadata") ||
    path.includes("sitemap") ||
    path.includes("nav") ||
    path.includes("menu")
  ) {
    const hasAnyCoreLabel = REQUIRED_PLAIN_LANGUAGE_LABELS.some((label) =>
      afterNorm.includes(label),
    );
    if (!hasAnyCoreLabel) {
      violations.push({
        file: path,
        severity: "medium",
        rule: "SEO/plain-language labels",
        detail:
          "No core plain-language labels detected in a metadata/navigation-related file.",
      });
    }
  }

  if (isMarketingHeavyPath(path)) {
    const hasRelationshipSignals = RELATIONSHIP_FIRST_PHRASES.some((phrase) =>
      afterNorm.includes(phrase),
    );
    if (!hasRelationshipSignals) {
      violations.push({
        file: path,
        severity: "medium",
        rule: "Relationship-first messaging",
        detail:
          "No relationship-first language cues detected on a marketing-heavy page.",
      });
    }
  }

  if (TRUST_CRITICAL_FILES.has(path)) {
    const hadTrust = hasTrustSignals(before);
    const hasTrust = hasTrustSignals(after);

    if (hadTrust && !hasTrust) {
      violations.push({
        file: path,
        severity: "high",
        rule: "Trust/accreditation preservation",
        detail:
          "Trust/accreditation signaling appears removed from a trust-critical file.",
      });
    }
  }

  return violations;
}

function reportAndExit(violations) {
  if (violations.length === 0) {
    process.stdout.write(
      JSON.stringify({
        decision: "continue",
        systemMessage: "Master at Arms branding gate passed.",
      }),
    );
    process.exit(0);
  }

  process.stdout.write(
    JSON.stringify({
      decision: "block",
      reason: "Branding gate failed",
      findings: violations,
      systemMessage:
        "Master at Arms blocked this action: branding violations detected. Fix findings or explicitly record an approved exception.",
    }),
  );
  process.exit(2);
}

(function main() {
  const changedFiles = getChangedFiles();
  const compareRef = getCompareRef();

  if (changedFiles.length === 0) {
    reportAndExit([]);
  }

  const violations = [];

  for (const file of changedFiles) {
    const before = readFileFromRef(compareRef, file);
    const after = readFileFromFs(file);

    if (!after) {
      continue;
    }

    violations.push(...detectViolations(file, before, after));
  }

  reportAndExit(applyExceptions(violations));
})();
