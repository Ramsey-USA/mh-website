/**
 * @jest-environment node
 */

const path = require("node:path");
const { spawnSync } = require("node:child_process");
const {
  evaluateNonHeroBackgroundContractSources,
} = require("../check-website-congruency.js");

describe("Website congruency validator", () => {
  it("flags non-compliant non-hero background contract inputs", () => {
    const errors = evaluateNonHeroBackgroundContractSources({
      diagonalSource: [
        'backgroundRepeat: "repeat"',
        "repeating-linear-gradient(",
      ].join("\n"),
      blobsSource: "export function BrandColorBlobs() { return <div />; }",
      stripedSource: "export const StripedBackground = () => <div />;",
      brandedSource:
        "export function BrandedContentSection() { return <section />; }",
    });

    expect(errors).toEqual(
      expect.arrayContaining([
        expect.stringContaining("mh-logo-light-bg.webp"),
        expect.stringContaining("mh-logo-dark-bg.webp"),
        expect.stringContaining(
          "Legacy stripe gradient found in DiagonalStripePattern",
        ),
        expect.stringContaining("single logo watermark (no-repeat)"),
        expect.stringContaining("preserve logo aspect ratio"),
        expect.stringContaining("BrandColorBlobs must remain disabled"),
        expect.stringContaining(
          "StripedBackground must compose DiagonalStripePattern",
        ),
        expect.stringContaining(
          "BrandedContentSection must include DiagonalStripePattern",
        ),
      ]),
    );
  });

  it("accepts compliant non-hero background contract inputs", () => {
    const errors = evaluateNonHeroBackgroundContractSources({
      diagonalSource: [
        "/images/logo/mh-logo-light-bg.webp",
        "/images/logo/mh-logo-dark-bg.webp",
        'backgroundRepeat: "no-repeat"',
        "backgroundSize:",
        '"contain"',
      ].join("\n"),
      blobsSource: "export function BrandColorBlobs() { return null; }",
      stripedSource:
        "export const StripedBackground = () => <DiagonalStripePattern />;",
      brandedSource:
        "export function BrandedContentSection() { return <DiagonalStripePattern />; }",
    });

    expect(errors).toEqual([]);
  });

  it("passes for current route, terminology, trust, and visual contracts", () => {
    const appRoot = path.resolve(__dirname, "..", "..", "..");
    const scriptPath = path.join(
      appRoot,
      "scripts",
      "validation",
      "check-website-congruency.js",
    );

    const result = spawnSync(process.execPath, [scriptPath], {
      cwd: appRoot,
      encoding: "utf8",
    });

    expect(result.status).toBe(0);
    expect(result.stdout).toContain("PASS: Website congruency check passed");
    expect(result.stdout).toContain("services-consolidation=ok");
    expect(result.stderr).toBe("");
  });
});
