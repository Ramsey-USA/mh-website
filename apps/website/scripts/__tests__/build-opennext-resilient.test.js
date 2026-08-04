const path = require("node:path");
const fs = require("node:fs");
const { execFileSync } = require("node:child_process");

describe("build-opennext-resilient wrapper", () => {
  const appRoot = path.resolve(__dirname, "..", "..");
  const wrapperPath = path.join(
    appRoot,
    "scripts",
    "build-opennext-resilient.sh",
  );

  it("uses npx to invoke the OpenNext CLI", () => {
    const script = fs.readFileSync(wrapperPath, "utf8");

    expect(script).toContain("npx opennextjs-cloudflare build");
    expect(script).not.toMatch(/(^|\n)\s*opennextjs-cloudflare build\b/m);
  });

  it("can be executed as a shell script", () => {
    const result = execFileSync("bash", [wrapperPath], {
      cwd: appRoot,
      env: {
        ...process.env,
        OPENNEXT_BUILD_MAX_ATTEMPTS: "1",
        OPENNEXT_BUILD_FORCE_STANDALONE_FALLBACK: "false",
        LOW_MEMORY_BUILD: "false",
        CI: "false",
      },
      stdio: "pipe",
    });

    expect(result.toString()).toContain("[build:opennext]");
  });
});
