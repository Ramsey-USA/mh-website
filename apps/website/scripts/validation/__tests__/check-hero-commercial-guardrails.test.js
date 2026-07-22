/**
 * @jest-environment node
 */

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const {
  collectKnownAppRoutes,
  isInactiveHeroCommercialPipeline,
  routePathToRouteKey,
  routeFromPageFile,
  validateHeroFileNameConvention,
  validateSeoMetadata,
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

  it("requires SEO metadata and approved radio partners when the pipeline is active", () => {
    const errors = [];
    const warnings = [];
    const knownAppRoutes = new Set(["/", "/services"]);

    validateSeoMetadata({
      entry: {
        seo: {
          routePath: "/",
          title: "MH Construction Home Hero Commercial with Jeremy Thamert",
          description:
            "Veteran-owned MH Construction delivers reliable project execution across commercial and civil scopes with relationship-first communication and field discipline.",
          videoObjectName:
            "MH Construction Home Hero Commercial - Jeremy Thamert",
          videoObjectDescription:
            "Homepage hero video campaign introducing MH Construction service credibility and market coverage.",
          thumbnailPath: "videos/hero-commercials/poster-home-hero.jpg",
          transcriptOrSummaryUrl: "/about",
          voiceoverTalent: "Jeremy Thamert",
          presenterEntityName: "Jeremy Thamert",
          radioPartners: ["Stephens Media Group"],
        },
      },
      id: "home",
      errors,
      warnings,
      knownAppRoutes,
    });

    expect(errors).toEqual([]);
    expect(warnings).toEqual([]);
  });

  it("fails when SEO metadata is missing required fields", () => {
    const errors = [];
    const warnings = [];
    const knownAppRoutes = new Set(["/", "/services"]);

    validateSeoMetadata({
      entry: {
        seo: {
          routePath: "",
          title: "Too short",
          description: "Too short",
          videoObjectName: "",
          videoObjectDescription: "",
          thumbnailPath: "assets/poster.jpg",
          transcriptOrSummaryUrl: "about",
          voiceoverTalent: "Unknown Voice",
          presenterEntityName: "Unknown Voice",
          radioPartners: ["Unknown Partner"],
        },
      },
      id: "services",
      errors,
      warnings,
      knownAppRoutes,
    });

    expect(errors).toEqual(
      expect.arrayContaining([
        "[services] seo.routePath must start with '/'.",
        "[services] seo.videoObjectName is required for VideoObject schema.",
        "[services] seo.videoObjectDescription is required for VideoObject schema.",
        "[services] seo.thumbnailPath must be a public asset path under images/ or videos/.",
        "[services] seo.transcriptOrSummaryUrl must start with '/' or 'https://'.",
        "[services] seo.voiceoverTalent must be 'Jeremy Thamert' to preserve Jeremy-led voice authority signals.",
        "[services] seo.presenterEntityName must be 'Jeremy Thamert' to keep presenter attribution aligned with MHC SEO.",
        "[services] SEO metadata must include the phrase 'Jeremy Thamert' in at least one of title, description, videoObjectName, or videoObjectDescription.",
      ]),
    );
    expect(
      errors.some((msg) =>
        msg.includes("seo.radioPartners contains unapproved"),
      ),
    ).toBe(true);
    expect(warnings).toEqual(
      expect.arrayContaining([
        "[services] seo.title length should be 30-70 characters for stronger SERP presentation.",
        "[services] seo.description length should be 70-170 characters for stronger SERP presentation.",
      ]),
    );
  });

  it("fails when seo.routePath does not map to a current app route", () => {
    const errors = [];
    const warnings = [];

    validateSeoMetadata({
      entry: {
        seo: {
          routePath: "/does-not-exist",
          title:
            "MH Construction Hero Campaign Route Coverage - Jeremy Thamert",
          description:
            "Campaign metadata validation ensures each hero-video route maps to an existing page and keeps route-level SEO aligned with production content.",
          videoObjectName: "Hero Campaign Validation",
          videoObjectDescription:
            "Video metadata validation sample for route alignment.",
          thumbnailPath: "videos/hero-commercials/poster-sample.jpg",
          transcriptOrSummaryUrl: "/about",
          voiceoverTalent: "Jeremy Thamert",
          presenterEntityName: "Jeremy Thamert",
          radioPartners: ["Stephens Media Group"],
        },
      },
      id: "route-test",
      errors,
      warnings,
      knownAppRoutes: new Set(["/", "/services"]),
    });

    expect(errors).toEqual(
      expect.arrayContaining([
        "[route-test] seo.routePath '/does-not-exist' does not map to a current app route.",
      ]),
    );
    expect(warnings).toEqual([]);
  });

  it("fails when Jeremy voice authority fields are missing", () => {
    const errors = [];
    const warnings = [];

    validateSeoMetadata({
      entry: {
        seo: {
          routePath: "/",
          title: "MH Construction Home Hero Commercial",
          description:
            "Veteran-owned MH Construction campaign metadata without the required presenter attribution fields.",
          videoObjectName: "MH Construction Home Hero Commercial",
          videoObjectDescription:
            "Structured metadata without Jeremy voice authority fields.",
          thumbnailPath: "videos/hero-commercials/poster-sample.jpg",
          transcriptOrSummaryUrl: "/about",
          radioPartners: ["Stephens Media Group"],
        },
      },
      id: "jeremy-required",
      errors,
      warnings,
      knownAppRoutes: new Set(["/", "/services"]),
    });

    expect(errors).toEqual(
      expect.arrayContaining([
        "[jeremy-required] seo.voiceoverTalent is required and must be 'Jeremy Thamert'.",
        "[jeremy-required] seo.presenterEntityName is required and must be 'Jeremy Thamert'.",
        "[jeremy-required] SEO metadata must include the phrase 'Jeremy Thamert' in at least one of title, description, videoObjectName, or videoObjectDescription.",
      ]),
    );
    expect(warnings).toEqual([]);
  });

  it("derives route paths from app page files", () => {
    expect(routeFromPageFile("/tmp/app/page.tsx", "/tmp/app")).toBe("/");
    expect(routeFromPageFile("/tmp/app/services/page.tsx", "/tmp/app")).toBe(
      "/services",
    );
    expect(
      routeFromPageFile("/tmp/app/(marketing)/contact/page.tsx", "/tmp/app"),
    ).toBe("/contact");
  });

  it("collects known routes from a temporary app directory", () => {
    const tempRoot = fs.mkdtempSync(
      path.join(os.tmpdir(), "hero-commercial-routes-"),
    );
    const appDir = path.join(tempRoot, "src", "app");
    fs.mkdirSync(path.join(appDir, "services"), { recursive: true });
    fs.mkdirSync(path.join(appDir, "(marketing)", "contact"), {
      recursive: true,
    });
    fs.writeFileSync(
      path.join(appDir, "page.tsx"),
      "export default function Page(){}\n",
    );
    fs.writeFileSync(
      path.join(appDir, "services", "page.tsx"),
      "export default function Page(){}\n",
    );
    fs.writeFileSync(
      path.join(appDir, "(marketing)", "contact", "page.tsx"),
      "export default function Page(){}\n",
    );

    const routes = collectKnownAppRoutes(appDir);
    expect(routes.has("/")).toBe(true);
    expect(routes.has("/services")).toBe(true);
    expect(routes.has("/contact")).toBe(true);

    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it("derives stable route keys for naming conventions", () => {
    expect(routePathToRouteKey("/")).toBe("home");
    expect(routePathToRouteKey("/services")).toBe("services");
    expect(
      routePathToRouteKey("/public-sector/tri-state-government-construction"),
    ).toBe("public-sector-tri-state-government-construction");
    expect(routePathToRouteKey("/projects/[slug]")).toBe("projects-dyn");
  });

  it("passes canonical hero filename convention", () => {
    const errors = [];
    const warnings = [];

    validateHeroFileNameConvention({
      id: "home",
      routePath: "/",
      mediaPath:
        "videos/hero-commercials/home-hero-construction-standards-smg-2026q3-v01.mp4",
      errors,
      warnings,
    });

    expect(errors).toEqual([]);
    expect(warnings).toEqual([]);
  });

  it("passes company-wide filename convention with mhc prefix", () => {
    const errors = [];
    const warnings = [];

    validateHeroFileNameConvention({
      id: "mhc-company",
      routePath: "/",
      campaignScope: "company",
      mediaPath:
        "videos/hero-commercials/mhc-hero-brand-awareness-smg-2026q3-v01.mp4",
      errors,
      warnings,
    });

    expect(errors).toEqual([]);
    expect(warnings).toEqual([]);
  });

  it("fails when filename convention fields are missing", () => {
    const errors = [];
    const warnings = [];

    validateHeroFileNameConvention({
      id: "home",
      routePath: "/",
      mediaPath: "videos/hero-commercials/home-hero-campaign.mp4",
      errors,
      warnings,
    });

    expect(errors).toEqual(
      expect.arrayContaining([
        "[home] videos/hero-commercials/home-hero-campaign.mp4 must include exactly one partner code segment: '-smg-' or '-tsm-'.",
        "[home] videos/hero-commercials/home-hero-campaign.mp4 must end with version token '-vNN'.",
      ]),
    );
    expect(warnings).toEqual(
      expect.arrayContaining([
        "[home] videos/hero-commercials/home-hero-campaign.mp4 should include campaign period token '-YYYYqN-vNN' for easier quarterly tracking.",
      ]),
    );
  });

  it("fails when filename prefix does not match route ownership", () => {
    const errors = [];
    const warnings = [];

    validateHeroFileNameConvention({
      id: "services",
      routePath: "/services",
      mediaPath:
        "videos/hero-commercials/home-hero-construction-standards-smg-2026q3-v01.webm",
      errors,
      warnings,
    });

    expect(errors).toEqual(
      expect.arrayContaining([
        "[services] videos/hero-commercials/home-hero-construction-standards-smg-2026q3-v01.webm must start with 'services-hero-' to align filename tracking with seo.routePath.",
      ]),
    );
  });

  it("fails company-wide seo validation when appliesToRoutes is missing", () => {
    const errors = [];
    const warnings = [];

    validateSeoMetadata({
      entry: {
        campaignScope: "company",
        seo: {
          routePath: "/",
          title: "MH Construction Company Hero with Jeremy Thamert",
          description:
            "Jeremy Thamert voices this MH Construction company-wide campaign with relationship-first construction leadership and field accountability.",
          videoObjectName:
            "MH Construction Company Hero Commercial - Jeremy Thamert",
          videoObjectDescription:
            "Company-wide hero commercial featuring Jeremy Thamert as voice and presenter for MH Construction campaign messaging.",
          thumbnailPath: "videos/hero-commercials/poster-mhc-company.jpg",
          transcriptOrSummaryUrl: "/",
          voiceoverTalent: "Jeremy Thamert",
          presenterEntityName: "Jeremy Thamert",
          radioPartners: ["Stephens Media Group"],
        },
      },
      id: "mhc-company",
      errors,
      warnings,
      knownAppRoutes: new Set(["/", "/services"]),
    });

    expect(errors).toEqual(
      expect.arrayContaining([
        "[mhc-company] company-wide campaigns must define seo.appliesToRoutes with at least one route.",
      ]),
    );
  });

  it("fails when seo.radioPartners lists both partners", () => {
    const errors = [];
    const warnings = [];

    validateSeoMetadata({
      entry: {
        seo: {
          routePath: "/",
          title: "MH Construction Home Hero Commercial with Jeremy Thamert",
          description:
            "Jeremy Thamert voices this MH Construction company campaign with relationship-first construction leadership and field accountability.",
          videoObjectName:
            "MH Construction Home Hero Commercial - Jeremy Thamert",
          videoObjectDescription:
            "Company hero commercial featuring Jeremy Thamert as voice and presenter.",
          thumbnailPath: "videos/hero-commercials/poster-home-hero.jpg",
          transcriptOrSummaryUrl: "/",
          voiceoverTalent: "Jeremy Thamert",
          presenterEntityName: "Jeremy Thamert",
          radioPartners: ["Stephens Media Group", "Townsquare Media"],
        },
      },
      id: "single-partner-required",
      errors,
      warnings,
      knownAppRoutes: new Set(["/", "/services"]),
    });

    expect(errors).toEqual(
      expect.arrayContaining([
        "[single-partner-required] seo.radioPartners must contain exactly one partner (Stephens Media Group or Townsquare Media).",
      ]),
    );
  });
});
