/**
 * @jest-environment node
 */

import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(process.cwd(), "..", "..");
const websiteRoot = path.join(repoRoot, "apps", "website");
const ecosystemPath = path.join(
  repoRoot,
  "documents",
  "content",
  "mh-ecosystem",
  "enterprise-platform.json",
);

function read(relativePath: string): string {
  return fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function collectFiles(root: string, fileName: string): string[] {
  const files: string[] = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const fullPath = path.join(root, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectFiles(fullPath, fileName));
    } else if (entry.name === fileName) {
      files.push(fullPath);
    }
  }
  return files;
}

describe("MH Ecosystem sitewide congruency", () => {
  const ecosystem = JSON.parse(fs.readFileSync(ecosystemPath, "utf8"));
  const documentsRegistry = read("apps/website/src/lib/data/documents.ts");
  const docsRoute = read("apps/website/src/app/docs/[...path]/route.ts");
  const resourcesPage = read("apps/website/src/app/resources/page.tsx");
  const handbookPage = read("apps/website/src/app/employee-handbook/page.tsx");
  const mishContentsPage = read(
    "apps/website/src/app/resources/safety-manual/contents/page.tsx",
  );

  it("keeps Draft releases fail closed across registry, UI, and R2 delivery", () => {
    expect(ecosystem.baseline.status).toBe("draft");
    expect(ecosystem.baseline.fieldEffective).toBe(false);
    expect(ecosystem.publicDownloadPolicy.draftDownloadsAllowed).toBe(false);

    expect(documentsRegistry).toContain(
      "export const isEcosystemPublicReleaseEnabled",
    );
    expect(documentsRegistry).toContain(
      'enterprisePlatform.baseline.status === "approved"',
    );
    expect(docsRoute).toContain(
      'enterprisePlatform.baseline.status === "approved"',
    );
    expect(docsRoute).toContain(
      "enterprisePlatform.publicDownloadPolicy.draftDownloadsAllowed === true",
    );
    expect(resourcesPage).toMatch(
      /isEcosystemPublicReleaseEnabled\s*&&\s*safetyManual\?\.contentsPdfPath/,
    );
    expect(handbookPage).toMatch(
      /isEcosystemPublicReleaseEnabled\s*&&\s*manual\?\.pdfPath/,
    );
    expect(mishContentsPage).toMatch(/isEcosystemPublicReleaseEnabled\s*&&/);
  });

  it("keeps internal manuals out of the public-manual route set", () => {
    const publicSetMatch = resourcesPage.match(
      /const publicManualIds = new Set\((\[[\s\S]*?\])\);/,
    );
    expect(publicSetMatch?.[1]).toContain('"safety-manual"');
    expect(publicSetMatch?.[1]).toContain('"employee-handbook"');
    expect(publicSetMatch?.[1]).not.toContain('"operations-manual"');
    expect(publicSetMatch?.[1]).not.toContain('"marketing-strategy-guide"');
    expect(publicSetMatch?.[1]).not.toContain('"sales-estimating-guide"');
  });

  it("uses the controlled Employee Handbook version family", () => {
    const handbook = JSON.parse(
      read("documents/content/employee-handbook.json"),
    );
    expect(handbook.document.revisionVersion).toBe("3.0");
    expect(documentsRegistry).toContain(
      'const EMPLOYEE_HANDBOOK_REVISION_NUMBER = "3.0"',
    );
  });

  it("does not claim that in-development systems are operational", () => {
    const pageFiles = collectFiles(
      path.join(websiteRoot, "src", "app"),
      "page.tsx",
    );
    const forbiddenClaims = [
      /BidPilot\s+(?:is\s+)?(?:live|available now|operational)/i,
      /Marketing Flight\s+(?:is\s+)?(?:live|available now|operational)/i,
      /Field Command Center\s+(?:is\s+)?(?:live|available now|operational)/i,
      /BuildPilot\s+(?:is\s+)?(?:live|available now|operational)/i,
    ];

    const offenders = pageFiles.flatMap((filePath) => {
      const source = fs.readFileSync(filePath, "utf8");
      return forbiddenClaims.some((pattern) => pattern.test(source))
        ? [path.relative(websiteRoot, filePath).replaceAll("\\", "/")]
        : [];
    });

    expect(offenders).toEqual([]);
  });
});
