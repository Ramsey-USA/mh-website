import fs from "node:fs";
import path from "node:path";

describe("about content contract", () => {
  const appRoot = process.cwd();
  const repoRoot = path.resolve(appRoot, "..", "..");

  const aboutPagePath = path.join(appRoot, "src", "app", "about", "page.tsx");
  const aboutHeroPath = path.join(
    appRoot,
    "src",
    "components",
    "about",
    "AboutHero.tsx",
  );
  const enMessagesPath = path.join(repoRoot, "messages", "en.json");

  it("keeps required section flow order for Prompt 3.4", () => {
    const source = fs.readFileSync(aboutPagePath, "utf8");

    const flow = [
      'id="what-mh-does"',
      'id="who-mh-serves"',
      'id="how-mh-works"',
      'id="company-history"',
      'id="leadership-accountability"',
      'id="verified-safety-quality"',
      'id="community-commitment"',
    ];

    let cursor = -1;
    for (const section of flow) {
      const idx = source.indexOf(section);
      expect(idx).toBeGreaterThan(cursor);
      cursor = idx;
    }
  });

  it("keeps one-H1 ownership in AboutHero and not in page sections", () => {
    const pageSource = fs.readFileSync(aboutPagePath, "utf8");
    const heroSource = fs.readFileSync(aboutHeroPath, "utf8");

    expect(pageSource).not.toContain("<h1");
    expect((heroSource.match(/<h1/g) ?? []).length).toBe(1);
  });

  it("withholds unsupported snapshot figures from About page", () => {
    const source = fs.readFileSync(aboutPagePath, "utf8");

    expect(source).not.toContain("150+");
    expect(source).not.toContain("650+");
  });

  it("keeps source-of-truth routing links for history, leadership, and team", () => {
    const source = fs.readFileSync(aboutPagePath, "utf8");

    expect(source).toContain('href="/about/details"');
    expect(source).toContain('href="/jeremy-thamert"');
    expect(source).toContain('href="/team"');
    expect(source).toContain('href="/safety"');
    expect(source).toContain('href="/careers"');
  });

  it("preserves canonical operating values in english messages", () => {
    const en = JSON.parse(fs.readFileSync(enMessagesPath, "utf8")) as {
      common: {
        about: {
          pageContent: {
            valuePills: Record<string, string>;
          };
        };
      };
    };

    expect(en.common.about.pageContent.valuePills["honesty"]).toBe("Honesty");
    expect(en.common.about.pageContent.valuePills["integrity"]).toBe(
      "Integrity",
    );
    expect(en.common.about.pageContent.valuePills["professionalism"]).toBe(
      "Professionalism",
    );
    expect(en.common.about.pageContent.valuePills["thoroughness"]).toBe(
      "Thoroughness",
    );
  });
});
