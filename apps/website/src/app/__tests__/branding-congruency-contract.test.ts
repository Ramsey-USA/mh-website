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

describe("Branding congruency contracts", () => {
  const srcRoot = path.join(process.cwd(), "src");
  const scanFiles = collectFiles(srcRoot, [".ts", ".tsx"]).filter(
    (filePath) =>
      !filePath.includes("__tests__") &&
      !filePath.includes("lib/validation") &&
      !filePath.endsWith("/components/ui/GlowEffect.tsx"),
  );

  it("disallows high-intensity hover pulse utility on production components", () => {
    const offenders = scanFiles
      .map((filePath) => {
        const source = fs.readFileSync(filePath, "utf8");
        return source.includes("group-hover:animate-pulse")
          ? path.relative(srcRoot, filePath).replaceAll("\\", "/")
          : null;
      })
      .filter((value): value is string => Boolean(value));

    expect(offenders).toEqual([]);
  });

  it("disallows malformed standalone group- class artifacts", () => {
    const malformedGroupToken = /\bgroup-\s+/;

    const offenders = scanFiles
      .map((filePath) => {
        const source = fs.readFileSync(filePath, "utf8");
        return malformedGroupToken.test(source)
          ? path.relative(srcRoot, filePath).replaceAll("\\", "/")
          : null;
      })
      .filter((value): value is string => Boolean(value));

    expect(offenders).toEqual([]);
  });
});
