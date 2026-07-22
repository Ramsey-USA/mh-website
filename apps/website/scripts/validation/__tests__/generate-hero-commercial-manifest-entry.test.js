/**
 * @jest-environment node
 */

const {
  createHeroCommercialEntry,
} = require("../generate-hero-commercial-manifest-entry.js");

describe("generate hero commercial manifest entry", () => {
  it("generates compliant entry with Jeremy authority fields", () => {
    const entry = createHeroCommercialEntry({
      campaignScope: "route",
      routePath: "/services",
      campaignKey: "commercial-remodel",
      partnerCode: "smg",
      year: "2026",
      quarter: "3",
      revision: "2",
      durationSec: "61.03",
    });

    expect(entry.id).toBe("services-commercial-remodel-2026q3-v02");
    expect(entry.mp4).toBe(
      "videos/hero-commercials/services-hero-commercial-remodel-smg-2026q3-v02.mp4",
    );
    expect(entry.webm).toBe(
      "videos/hero-commercials/services-hero-commercial-remodel-smg-2026q3-v02.webm",
    );
    expect(entry.expectedDurationSec).toBe(61.03);
    expect(entry.audioRequired).toBe(true);
    expect(entry.seo.routePath).toBe("/services");
    expect(entry.seo.voiceoverTalent).toBe("Jeremy Thamert");
    expect(entry.seo.presenterEntityName).toBe("Jeremy Thamert");
    expect(entry.seo.radioPartners).toEqual(["Stephens Media Group"]);
    expect(entry.seo.videoObjectName).toContain("Jeremy Thamert");
  });

  it("maps partner code tsm to Townsquare Media", () => {
    const entry = createHeroCommercialEntry({
      routePath: "/",
      campaignKey: "quality-safety",
      partnerCode: "tsm",
      year: "2026",
      quarter: "4",
      revision: "1",
      durationSec: "59.5",
    });

    expect(entry.seo.radioPartners).toEqual(["Townsquare Media"]);
    expect(entry.campaignScope).toBe("company");
    expect(entry.mp4).toContain("mhc-hero-quality-safety-tsm-2026q4-v01.mp4");
    expect(entry.seo.appliesToRoutes).toEqual(["/"]);
  });

  it("supports company-wide route application mapping", () => {
    const entry = createHeroCommercialEntry({
      campaignScope: "company",
      routePath: "/",
      appliesToRoutes: "/,/services,/about",
      campaignKey: "brand-awareness",
      partnerCode: "smg",
      year: "2026",
      quarter: "4",
      revision: "1",
    });

    expect(entry.seo.appliesToRoutes).toEqual(["/", "/services", "/about"]);
  });
});
