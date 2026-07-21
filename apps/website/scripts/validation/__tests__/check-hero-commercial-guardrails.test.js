/**
 * @jest-environment node
 */

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const {
  isInactiveHeroCommercialPipeline,
} = require("../check-hero-commercial-guardrails.js");

describe("Hero commercial guardrails validator", () => {
  it("treats a missing manifest with no hero media as an inactive pipeline", () => {
    expect(
      isInactiveHeroCommercialPipeline({
        manifestExists: false,
        presentMediaCount: 0,
      }),
    ).toBe(true);

    expect(
      isInactiveHeroCommercialPipeline({
        manifestExists: true,
        presentMediaCount: 0,
      }),
    ).toBe(false);

    expect(
      isInactiveHeroCommercialPipeline({
        manifestExists: false,
        presentMediaCount: 1,
      }),
    ).toBe(false);
  });

  it("passes when the pipeline is inactive and no manifest or hero media exist", () => {
    const tempRoot = fs.mkdtempSync(
      path.join(os.tmpdir(), "hero-commercial-guardrails-"),
    );
    const publicDir = path.join(tempRoot, "public");
    const heroDir = path.join(publicDir, "videos", "hero-commercials");
    fs.mkdirSync(heroDir, { recursive: true });

    const scriptPath = path.join(
      process.cwd(),
      "scripts",
      "validation",
      "check-hero-commercial-guardrails.js",
    );

    const result = spawnSync(process.execPath, [scriptPath], {
      cwd: process.cwd(),
      encoding: "utf8",
      env: {
        ...process.env,
        HERO_COMMERCIALS_PUBLIC_DIR: publicDir,
        HERO_COMMERCIALS_DIR: heroDir,
        HERO_COMMERCIALS_MANIFEST_PATH: path.join(
          tempRoot,
          "config",
          "hero-commercials.json",
        ),
      },
    });

    expect(result.status).toBe(0);
    expect(result.stdout).toContain(
      "Hero Commercial Guardrails: PASS (inactive - no registered hero commercial media in repo)",
    );
    expect(result.stderr).toBe("");

    fs.rmSync(tempRoot, { recursive: true, force: true });
  });
});
