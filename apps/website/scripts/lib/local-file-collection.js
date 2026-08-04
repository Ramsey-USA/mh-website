const fs = require("node:fs");
const path = require("node:path");

function findRepoRoot(startDir = process.cwd()) {
  let currentDir = path.resolve(startDir);

  while (true) {
    if (
      fs.existsSync(path.join(currentDir, "pnpm-workspace.yaml")) ||
      fs.existsSync(path.join(currentDir, ".git")) ||
      fs.existsSync(path.join(currentDir, "package.json"))
    ) {
      return currentDir;
    }

    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
      return currentDir;
    }

    currentDir = parentDir;
  }
}

function toPosixPath(filePath) {
  return filePath.split(path.sep).join("/");
}

function escapeForRegExp(value) {
  return value.replace(/[|\\{}()[\]^$+?.]/g, "\\$&");
}

function globToRegExp(pattern) {
  const normalizedPattern = pattern.replace(/\\/g, "/");
  const escaped = normalizedPattern
    .split("**")
    .map((segment) => escapeForRegExp(segment))
    .join(".*");

  const regexPattern = escaped.replace(/\*/g, "[^/]*").replace(/\?/g, "[^/]");

  return new RegExp(`^${regexPattern}$`);
}

function getPatternSearchRoot(baseDir, pattern) {
  const normalizedPattern = pattern.replace(/\\/g, "/");
  const segments = normalizedPattern.split("/");
  const rootSegments = [];

  for (const segment of segments) {
    if (!segment || segment === ".") {
      continue;
    }

    if (segment === "..") {
      rootSegments.pop();
      continue;
    }

    if (/[*?\[\]{}()]/.test(segment)) {
      break;
    }

    rootSegments.push(segment);
  }

  return path.resolve(baseDir, ...rootSegments);
}

function shouldSkipPath(filePath, exclusions = []) {
  const normalizedPath = toPosixPath(filePath);
  return exclusions.some((rule) => {
    if (typeof rule === "function") {
      return rule(normalizedPath);
    }

    if (rule instanceof RegExp) {
      return rule.test(normalizedPath);
    }

    return normalizedPath.includes(rule);
  });
}

function collectFilesByPatterns(baseDir, patterns, exclusions = []) {
  const collected = new Set();
  const resolvedPatterns = Array.isArray(patterns) ? patterns : [patterns];

  for (const pattern of resolvedPatterns) {
    const searchRoot = getPatternSearchRoot(baseDir, pattern);

    if (!fs.existsSync(searchRoot)) {
      continue;
    }

    const matcher = globToRegExp(pattern.replace(/\\/g, "/"));

    function walk(currentDir) {
      const entries = fs.readdirSync(currentDir, { withFileTypes: true });

      for (const entry of entries) {
        const entryPath = path.join(currentDir, entry.name);

        if (entry.isDirectory()) {
          if (!shouldSkipPath(entryPath, exclusions)) {
            walk(entryPath);
          }
          continue;
        }

        if (!entry.isFile()) {
          continue;
        }

        if (shouldSkipPath(entryPath, exclusions)) {
          continue;
        }

        const relativePath = path.relative(searchRoot, entryPath);
        const relativePosix = toPosixPath(relativePath);

        if (matcher.test(relativePosix) || matcher.test(`./${relativePosix}`)) {
          collected.add(path.resolve(entryPath));
        }
      }
    }

    walk(searchRoot);
  }

  return Array.from(collected).sort();
}

module.exports = {
  collectFilesByPatterns,
  findRepoRoot,
  globToRegExp,
  getPatternSearchRoot,
  shouldSkipPath,
};
