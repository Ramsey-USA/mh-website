import fs from "node:fs";
import path from "node:path";

function collectFiles(root: string, extensions: string[]): string[] {
  const entries = fs.readdirSync(root, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(root, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectFiles(fullPath, extensions));
      continue;
    }
    if (extensions.includes(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

describe("Sitewide breadcrumb placement contract", () => {
  const srcRoot = path.join(process.cwd(), "src");
  const appRoot = path.join(srcRoot, "app");
  const componentRoot = path.join(srcRoot, "components");

  it("keeps fallback breadcrumbs out of hero-bearing page/component sources", () => {
    const candidateFiles = [
      ...collectFiles(appRoot, [".ts", ".tsx"]),
      ...collectFiles(componentRoot, [".ts", ".tsx"]),
    ].filter((filePath) => !filePath.includes("__tests__"));

    const heroBearingFiles = candidateFiles.filter((filePath) => {
      const content = fs.readFileSync(filePath, "utf8");
      return (
        content.includes("hero-section") || content.includes("data-page-hero")
      );
    });

    expect(heroBearingFiles.length).toBeGreaterThan(0);

    const fallbackSourceLeakFiles = heroBearingFiles.filter((filePath) => {
      if (filePath.endsWith("components/layout/AppShell.tsx")) {
        return false;
      }

      const content = fs.readFileSync(filePath, "utf8");
      return (
        content.includes('source="fallback"') ||
        content.includes("source={'fallback'}") ||
        content.includes('source={"fallback"}') ||
        content.includes('data-mh-breadcrumb-source="fallback"')
      );
    });

    expect(fallbackSourceLeakFiles).toEqual([]);
  });

  it("enforces AppShell breadcrumb ordering contract", () => {
    const appShellPath = path.join(srcRoot, "components/layout/AppShell.tsx");
    const appShellSource = fs.readFileSync(appShellPath, "utf8");

    expect(appShellSource.includes("<AppShellBreadcrumbFallback />")).toBe(
      true,
    );
    expect(
      appShellSource.includes(
        "<AppShellBreadcrumbFallback />\n      {showSemiquincentennialBanner ? <SemiquincentennialBanner /> : null}",
      ),
    ).toBe(true);
    expect(
      appShellSource.includes(
        '<main id="main-content" className="grow pt-(--mh-nav-offset,6.5rem)">\n            {children}\n            <SemiquincentennialAfterHeroSlot />',
      ),
    ).toBe(true);
  });

  it("prevents Back-style labels in breadcrumb item definitions", () => {
    const candidateFiles = [
      ...collectFiles(appRoot, [".ts", ".tsx"]),
      ...collectFiles(componentRoot, [".ts", ".tsx"]),
    ].filter((filePath) => !filePath.includes("__tests__"));

    const breadcrumbFiles = candidateFiles.filter((filePath) => {
      const content = fs.readFileSync(filePath, "utf8");
      return (
        content.includes("<Breadcrumb") || content.includes("<Breadcrumbs")
      );
    });

    const backLabelPatterns = [
      /label:\s*["']Back["']/,
      /label:\s*t\(["']common\.back["']\)/,
      /label:\s*commonT\(["']back["']\)/,
    ];

    const filesWithBackLabels = breadcrumbFiles.filter((filePath) => {
      const content = fs.readFileSync(filePath, "utf8");
      return backLabelPatterns.some((pattern) => pattern.test(content));
    });

    expect(filesWithBackLabels).toEqual([]);
  });

  it("prevents ambiguous legacy breadcrumb taxonomy labels", () => {
    const candidateFiles = [
      ...collectFiles(appRoot, [".ts", ".tsx"]),
      ...collectFiles(componentRoot, [".ts", ".tsx"]),
    ].filter((filePath) => !filePath.includes("__tests__"));

    const breadcrumbFiles = candidateFiles.filter((filePath) => {
      const content = fs.readFileSync(filePath, "utf8");
      return (
        content.includes("<Breadcrumb") || content.includes("<Breadcrumbs")
      );
    });

    const legacyTaxonomyPatterns = [
      /label:\s*["']Government Projects["']\s*,\s*href:\s*["']\/public-sector["']/,
      /label:\s*["']Public Sector["']\s*,\s*href:\s*["']\/public-sector["']/,
      /label:\s*["']Public Sector Projects["']/,
      /label:\s*["']Safety Hub["']\s*,\s*href:\s*["']\/safety["']/,
      /label:\s*["']Our Team["']\s*,\s*href:\s*["']\/team["']/,
    ];

    const filesWithLegacyTaxonomy = breadcrumbFiles.filter((filePath) => {
      const content = fs.readFileSync(filePath, "utf8");
      return legacyTaxonomyPatterns.some((pattern) => pattern.test(content));
    });

    expect(filesWithLegacyTaxonomy).toEqual([]);
  });

  it("prevents custom visual class overrides at breadcrumb callsites", () => {
    const candidateFiles = [
      ...collectFiles(appRoot, [".ts", ".tsx"]),
      ...collectFiles(componentRoot, [".ts", ".tsx"]),
    ].filter((filePath) => !filePath.includes("__tests__"));

    const breadcrumbFiles = candidateFiles.filter((filePath) => {
      const content = fs.readFileSync(filePath, "utf8");

      if (
        filePath.endsWith("components/navigation/Breadcrumb.tsx") ||
        filePath.endsWith("components/navigation/Breadcrumbs.tsx")
      ) {
        return false;
      }

      return (
        content.includes("<Breadcrumb") || content.includes("<Breadcrumbs")
      );
    });

    const classNameOverrideFiles = breadcrumbFiles.filter((filePath) => {
      const content = fs.readFileSync(filePath, "utf8");
      return /<Breadcrumbs?\b[^>]*\bclassName\s*=/.test(content);
    });

    expect(classNameOverrideFiles).toEqual([]);
  });
});
