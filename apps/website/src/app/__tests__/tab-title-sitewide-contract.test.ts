import fs from "node:fs";
import path from "node:path";

type TabTitleContract = {
  file: string;
  requiredSnippets: string[];
};

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

describe("Sitewide tab title metadata contract", () => {
  const srcRoot = path.join(process.cwd(), "src");
  const appRoot = path.join(srcRoot, "app");

  const contracts: TabTitleContract[] = [
    {
      file: "app/events/page.tsx",
      requiredSnippets: ["const eventsSeoTitle", '"events",'],
    },
    {
      file: "app/cool-desert-nights/page.tsx",
      requiredSnippets: [
        "const coolDesertNightsSeoTitle",
        '"coolDesertNights",',
      ],
    },
    {
      file: "app/services/layout.tsx",
      requiredSnippets: ["getServicesSEO()"],
    },
    {
      file: "app/services/[slug]/page.tsx",
      requiredSnippets: [
        'buildDualSeoTitle("services", "Legacy Route Redirect")',
      ],
    },
    {
      file: "app/about/details/page.tsx",
      requiredSnippets: ['buildDualSeoTitle("about", "Detailed Capabilities")'],
    },
    {
      file: "app/safety/hub/layout.tsx",
      requiredSnippets: ['buildDualSeoTitle("safety", "Safety Culture")'],
    },
    {
      file: "app/safety/print/[id]/page.tsx",
      requiredSnippets: [
        'buildDualSeoTitle("safetyForms", "Print Safety Form")',
      ],
    },
    {
      file: "app/careers/print/page.tsx",
      requiredSnippets: [
        'buildDualSeoTitle("careers", "Printable Application")',
      ],
    },
    {
      file: "app/resources/safety-manual/section/[slug]/page.tsx",
      requiredSnippets: [
        'buildDualSeoTitle("safetyManual", "Section Redirect")',
      ],
    },
    {
      file: "app/not-found.tsx",
      requiredSnippets: ['buildDualSeoTitle("home", "404 Page Not Found")'],
    },
  ];

  it("keeps branded dual-title helper usage on route metadata tabs", () => {
    contracts.forEach(({ file, requiredSnippets }) => {
      const filePath = path.join(srcRoot, file);
      const source = fs.readFileSync(filePath, "utf8");

      requiredSnippets.forEach((snippet) => {
        expect(source.includes(snippet)).toBe(true);
      });
    });
  });

  it("enforces helper-backed tab titles in app route metadata", () => {
    const appFiles = collectFiles(appRoot, [".ts", ".tsx"]).filter(
      (filePath) => !filePath.includes("__tests__"),
    );

    const metadataFiles = appFiles.filter((filePath) => {
      const source = fs.readFileSync(filePath, "utf8");
      return (
        source.includes("export const metadata") ||
        source.includes("export async function generateMetadata")
      );
    });

    const offenders = metadataFiles
      .map((filePath) => {
        const source = fs.readFileSync(filePath, "utf8");
        const hasInlineTitleLiteral =
          /title\s*:\s*["'`]/.test(source) && !/title\s*:\s*\{/.test(source);

        if (!hasInlineTitleLiteral) {
          return null;
        }

        const usesTitleHelper =
          source.includes("buildDualSeoTitle(") ||
          source.includes("formatDualPageName(") ||
          source.includes("getDualPageNameByKey(");

        return usesTitleHelper
          ? null
          : path.relative(srcRoot, filePath).replaceAll("\\", "/");
      })
      .filter((value): value is string => Boolean(value));

    expect(offenders).toEqual([]);
  });
});
