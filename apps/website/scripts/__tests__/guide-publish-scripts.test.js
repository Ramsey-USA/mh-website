const fs = require("node:fs");
const path = require("node:path");

test("guide publish commands bundle generation, merge, and R2 upload in one step", () => {
  const packageJsonPath = path.join(__dirname, "../../package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  const scripts = packageJson.scripts || {};

  const marketingPublish = scripts["docs:publish:marketing"] || "";
  expect(marketingPublish).toMatch(/docs:generate:marketing/);
  expect(marketingPublish).toMatch(/docs:merge:marketing/);
  expect(marketingPublish).toMatch(
    /r2-publish-guide-family\.sh marketing-strategy-guide docs\/marketing/,
  );

  const salesPublish = scripts["docs:publish:sales"] || "";
  expect(salesPublish).toMatch(/docs:generate:sales/);
  expect(salesPublish).toMatch(/docs:merge:sales/);
  expect(salesPublish).toMatch(
    /r2-publish-guide-family\.sh sales-estimating-guide docs\/sales/,
  );

  const guidesPublish = scripts["docs:publish:guides"] || "";
  expect(guidesPublish).toMatch(/docs:publish:marketing/);
  expect(guidesPublish).toMatch(/docs:publish:sales/);
});
