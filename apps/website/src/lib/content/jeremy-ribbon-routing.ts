function normalizePath(pathname: string): string {
  const sanitizedPath = pathname.split("?")[0]?.split("#")[0] ?? "/";
  if (sanitizedPath === "/") return "home";
  return sanitizedPath.replace(/^\/+|\/+$/g, "").toLowerCase();
}

function isDynamicSegment(segment: string): boolean {
  return (
    /^\[\[?\.\.\.[^\]]+\]?\]$/.test(segment) || /^\[[^\]]+\]$/.test(segment)
  );
}

function isPatternMatch(pattern: string, pathKey: string): boolean {
  const patternSegments = pattern.split("/").filter(Boolean);
  const pathSegments = pathKey.split("/").filter(Boolean);

  let pathIndex = 0;

  for (let i = 0; i < patternSegments.length; i += 1) {
    const segment = patternSegments[i];
    const isCatchAll = /^\[\[?\.\.\.[^\]]+\]?\]$/.test(segment);
    const isOptionalCatchAll = /^\[\[\.\.\.[^\]]+\]\]$/.test(segment);

    if (isCatchAll) {
      if (isOptionalCatchAll) {
        return true;
      }
      return pathIndex < pathSegments.length;
    }

    if (pathIndex >= pathSegments.length) {
      return false;
    }

    if (!isDynamicSegment(segment) && segment !== pathSegments[pathIndex]) {
      return false;
    }

    pathIndex += 1;
  }

  return pathIndex === pathSegments.length;
}

export function resolveJeremyRibbonKey(
  pathname: string,
  availableKeys: readonly string[],
): string | null {
  const normalizedPath = normalizePath(pathname);

  if (availableKeys.includes(normalizedPath)) {
    return normalizedPath;
  }

  const dynamicCandidates = availableKeys
    .filter((key) => key.includes("["))
    .sort((a, b) => b.length - a.length);

  for (const key of dynamicCandidates) {
    if (isPatternMatch(key, normalizedPath)) {
      return key;
    }
  }

  return null;
}
