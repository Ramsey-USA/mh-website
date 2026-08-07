const fs = require("node:fs");
const path = require("node:path");

test("website delegates controlled guide production to the private document factory", () => {
  const packageJsonPath = path.join(__dirname, "../../package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  const scripts = packageJson.scripts || {};
  const exposedCommands = Object.entries(scripts).filter(
    ([name, command]) =>
      /^docs:(generate|merge|publish)(:|$)/.test(name) ||
      /r2-publish-guide-family/.test(command),
  );

  expect(exposedCommands).toEqual([]);

  const factoryArchitecturePath = path.resolve(
    __dirname,
    "../../../../docs/technical/controlled-document-factory.md",
  );
  const factoryArchitecture = fs.readFileSync(factoryArchitecturePath, "utf8");

  expect(factoryArchitecture).toContain("Ramsey-USA/mh-document-factory");
  expect(factoryArchitecture).toContain("R2");
});
