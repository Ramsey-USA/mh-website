/**
 * @jest-environment node
 */

import fs from "node:fs";
import path from "node:path";

type RouteTitleMatch = {
  filePath: string;
  titleValue: string;
};

function walkFiles(dirPath: string, files: string[] = []): string[] {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      walkFiles(fullPath, files);
      continue;
    }

    if (entry.name === "page.tsx" || entry.name === "layout.tsx") {
      files.push(fullPath);
    }
  }

  return files;
}

function findBrandedRouteTitles(appDir: string): RouteTitleMatch[] {
  const routeFiles = walkFiles(appDir);
  const brandedTitlePattern =
    /title\s*:\s*"([^"\n]*\|\s*MH Construction[^"\n]*)"/g;
  const results: RouteTitleMatch[] = [];

  for (const filePath of routeFiles) {
    if (filePath.endsWith(path.join("src", "app", "layout.tsx"))) {
      continue;
    }

    const content = fs.readFileSync(filePath, "utf8");
    const matches = content.matchAll(brandedTitlePattern);

    for (const match of matches) {
      const titleValue = match[1]?.trim();
      if (titleValue) {
        results.push({ filePath, titleValue });
      }
    }
  }

  return results;
}

function findHelperBackedRouteTitles(appDir: string): string[] {
  const routeFiles = walkFiles(appDir);
  const results: string[] = [];

  for (const filePath of routeFiles) {
    if (filePath.endsWith(path.join("src", "app", "layout.tsx"))) {
      continue;
    }

    const content = fs.readFileSync(filePath, "utf8");
    const hasMetadataDeclaration =
      content.includes("export const metadata") ||
      content.includes("export async function generateMetadata");

    if (!hasMetadataDeclaration) {
      continue;
    }

    const hasHelperTitleSignal =
      content.includes("buildDualSeoTitle(") ||
      content.includes("formatDualPageName(") ||
      content.includes("getDualPageNameByKey(");

    if (hasHelperTitleSignal) {
      results.push(filePath);
    }
  }

  return results;
}

describe("SEO title suffix guard", () => {
  it("keeps root title template neutral when routes already include branded titles", () => {
    const appDir = path.join(process.cwd(), "src", "app");
    const rootLayoutPath = path.join(appDir, "layout.tsx");
    const rootLayoutContent = fs.readFileSync(rootLayoutPath, "utf8");

    const templateMatch = rootLayoutContent.match(/template\s*:\s*"([^"]+)"/);
    const rootTemplate = templateMatch?.[1] ?? "";
    const brandedRouteTitles = findBrandedRouteTitles(appDir);
    const helperBackedRouteTitles = findHelperBackedRouteTitles(appDir);

    // Guardrails:
    // 1) Root title template must stay neutral.
    // 2) If someone reintroduces a branded root template, fail with impacted routes.
    expect(rootTemplate).toBe("%s");

    if (
      rootTemplate.includes("MH Construction") &&
      brandedRouteTitles.length > 0
    ) {
      const sample = brandedRouteTitles
        .slice(0, 8)
        .map(
          (entry) =>
            `${path.relative(process.cwd(), entry.filePath)} -> ${entry.titleValue}`,
        )
        .join("\n");

      throw new Error(
        `Potential double brand suffix detected. Root template is \"${rootTemplate}\" while route files already include \"| MH Construction\" titles.\n${sample}`,
      );
    }

    expect(
      brandedRouteTitles.length + helperBackedRouteTitles.length,
    ).toBeGreaterThan(0);
  });
});
