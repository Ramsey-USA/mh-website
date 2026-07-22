#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const ffprobePath = require("ffprobe-static").path;

const PUBLIC_DIR = process.env.HERO_COMMERCIALS_PUBLIC_DIR
  ? path.resolve(process.env.HERO_COMMERCIALS_PUBLIC_DIR)
  : path.join(__dirname, "../../public");
const HERO_DIR = process.env.HERO_COMMERCIALS_DIR
  ? path.resolve(process.env.HERO_COMMERCIALS_DIR)
  : path.join(PUBLIC_DIR, "videos/hero-commercials");
const MANIFEST_PATH = process.env.HERO_COMMERCIALS_MANIFEST_PATH
  ? path.resolve(process.env.HERO_COMMERCIALS_MANIFEST_PATH)
  : path.join(__dirname, "../../config/hero-commercials.json");
const APP_DIR = process.env.HERO_COMMERCIALS_APP_DIR
  ? path.resolve(process.env.HERO_COMMERCIALS_APP_DIR)
  : path.join(__dirname, "../../src/app");

const MAX_HERO_FILE_MB = Number(process.env.HERO_COMMERCIAL_MAX_FILE_MB || 45);
const WARN_LARGE_MB = Number(process.env.HERO_COMMERCIAL_WARN_FILE_MB || 20);
const MAX_HERO_FILE_BYTES = MAX_HERO_FILE_MB * 1024 * 1024;
const WARN_LARGE_BYTES = WARN_LARGE_MB * 1024 * 1024;
const DURATION_TOLERANCE_SEC = 0.75;
const FILE_NAME_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*\.(mp4|webm)$/;
const IGNORE_TEMP_MEDIA = process.env.HERO_COMMERCIAL_IGNORE_TEMP !== "0";
const SEO_TITLE_MIN = 30;
const SEO_TITLE_MAX = 70;
const SEO_DESCRIPTION_MIN = 70;
const SEO_DESCRIPTION_MAX = 170;
const REQUIRED_VOICE_TALENT = "Jeremy Thamert";
const HERO_VERSION_TOKEN_RE = /-v\d{2}$/;
const HERO_YEAR_QUARTER_TOKEN_RE = /-20\d{2}q[1-4]-v\d{2}$/;
const HERO_PARTNER_CODE_RE = /-(smg|tsm)-/;
const COMPANY_HERO_PREFIX = "mhc-hero-";
const APPROVED_RADIO_PARTNERS = new Set([
  "Stephens Media Group",
  "Townsquare Media",
]);

function formatMB(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function fail(errors) {
  console.error("Hero Commercial Guardrails: FAIL");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

function warn(messages) {
  for (const message of messages) {
    console.warn(`WARN: ${message}`);
  }
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function hasRecommendedLength(value, min, max) {
  const len = value.trim().length;
  return len >= min && len <= max;
}

function isValidRoutePath(value) {
  return isNonEmptyString(value) && value.startsWith("/");
}

function listPageFiles(currentDir, result = []) {
  if (!fs.existsSync(currentDir)) {
    return result;
  }

  const entries = fs.readdirSync(currentDir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(currentDir, entry.name);
    if (entry.isDirectory()) {
      listPageFiles(fullPath, result);
      continue;
    }

    if (entry.isFile() && entry.name === "page.tsx") {
      result.push(fullPath);
    }
  }

  return result;
}

function routeFromPageFile(filePath, appDir) {
  const relative = path.relative(appDir, filePath).split(path.sep).join("/");

  if (relative === "page.tsx") {
    return "/";
  }

  const cleaned = relative
    .replace(/\/page\.tsx$/, "")
    .split("/")
    .filter((segment) => {
      if (!segment) {
        return false;
      }

      // Ignore Next.js route groups and parallel-route placeholders.
      if (segment.startsWith("(") && segment.endsWith(")")) {
        return false;
      }

      if (segment.startsWith("@")) {
        return false;
      }

      return true;
    })
    .join("/");

  return cleaned ? `/${cleaned}` : "/";
}

function collectKnownAppRoutes(appDir = APP_DIR) {
  const pageFiles = listPageFiles(appDir);
  const routes = new Set();

  for (const pageFile of pageFiles) {
    routes.add(routeFromPageFile(pageFile, appDir));
  }

  return routes;
}

function isValidThumbnailPath(value) {
  return (
    isNonEmptyString(value) &&
    (value.startsWith("images/") || value.startsWith("videos/"))
  );
}

function isValidInternalOrAbsoluteUrl(value) {
  return (
    isNonEmptyString(value) &&
    (value.startsWith("/") || value.startsWith("https://"))
  );
}

function hasJeremySearchSignal(seo) {
  const fields = [
    seo.title,
    seo.description,
    seo.videoObjectName,
    seo.videoObjectDescription,
  ]
    .filter((value) => typeof value === "string")
    .join(" ")
    .toLowerCase();

  return fields.includes("jeremy thamert");
}

function routePathToRouteKey(routePath) {
  if (!isValidRoutePath(routePath)) {
    return "";
  }

  const trimmed = routePath.replace(/^\/+|\/+$/g, "");
  if (!trimmed) {
    return "home";
  }

  const normalized = trimmed.replace(/\//g, "-").replace(/\[[^\]]+\]/g, "dyn");
  return normalized || "home";
}

function getCampaignScope(entry) {
  if (entry?.campaignScope === "company") {
    return "company";
  }
  return "route";
}

function validateHeroFileNameConvention({
  id,
  routePath,
  campaignScope,
  mediaPath,
  errors,
  warnings,
}) {
  if (!isNonEmptyString(mediaPath)) {
    return;
  }

  const fileName = path.basename(mediaPath);
  const baseName = fileName.replace(/\.(mp4|webm)$/i, "");
  const routeKey = routePathToRouteKey(routePath);

  if (campaignScope === "company") {
    if (!baseName.startsWith(COMPANY_HERO_PREFIX)) {
      errors.push(
        `[${id}] ${mediaPath} must start with '${COMPANY_HERO_PREFIX}' for company-wide hero campaigns.`,
      );
    }
  } else if (routeKey && !baseName.startsWith(`${routeKey}-hero-`)) {
    errors.push(
      `[${id}] ${mediaPath} must start with '${routeKey}-hero-' to align filename tracking with seo.routePath.`,
    );
  }

  if (!HERO_PARTNER_CODE_RE.test(baseName)) {
    errors.push(
      `[${id}] ${mediaPath} must include exactly one partner code segment: '-smg-' or '-tsm-'.`,
    );
  }

  if (!HERO_VERSION_TOKEN_RE.test(baseName)) {
    errors.push(`[${id}] ${mediaPath} must end with version token '-vNN'.`);
  }

  if (!HERO_YEAR_QUARTER_TOKEN_RE.test(baseName)) {
    warnings.push(
      `[${id}] ${mediaPath} should include campaign period token '-YYYYqN-vNN' for easier quarterly tracking.`,
    );
  }
}

function validateSeoMetadata({ entry, id, errors, warnings, knownAppRoutes }) {
  const seo = entry.seo;
  const campaignScope = getCampaignScope(entry);

  if (!seo || typeof seo !== "object") {
    errors.push(
      `[${id}] Missing seo object. Provide seo metadata for route, title, description, schema fields, and radio attribution.`,
    );
    return;
  }

  if (!isValidRoutePath(seo.routePath)) {
    errors.push(`[${id}] seo.routePath must start with '/'.`);
  } else if (campaignScope === "company" && seo.routePath !== "/") {
    errors.push(`[${id}] company-wide campaigns must use seo.routePath '/'.`);
  } else if (
    knownAppRoutes instanceof Set &&
    knownAppRoutes.size > 0 &&
    !knownAppRoutes.has(seo.routePath)
  ) {
    errors.push(
      `[${id}] seo.routePath '${seo.routePath}' does not map to a current app route.`,
    );
  }

  if (!isNonEmptyString(seo.title)) {
    errors.push(`[${id}] seo.title is required.`);
  } else if (!hasRecommendedLength(seo.title, SEO_TITLE_MIN, SEO_TITLE_MAX)) {
    warnings.push(
      `[${id}] seo.title length should be ${SEO_TITLE_MIN}-${SEO_TITLE_MAX} characters for stronger SERP presentation.`,
    );
  }

  if (!isNonEmptyString(seo.description)) {
    errors.push(`[${id}] seo.description is required.`);
  } else if (
    !hasRecommendedLength(
      seo.description,
      SEO_DESCRIPTION_MIN,
      SEO_DESCRIPTION_MAX,
    )
  ) {
    warnings.push(
      `[${id}] seo.description length should be ${SEO_DESCRIPTION_MIN}-${SEO_DESCRIPTION_MAX} characters for stronger SERP presentation.`,
    );
  }

  if (!isNonEmptyString(seo.videoObjectName)) {
    errors.push(
      `[${id}] seo.videoObjectName is required for VideoObject schema.`,
    );
  }

  if (!isNonEmptyString(seo.videoObjectDescription)) {
    errors.push(
      `[${id}] seo.videoObjectDescription is required for VideoObject schema.`,
    );
  }

  if (!isValidThumbnailPath(seo.thumbnailPath)) {
    errors.push(
      `[${id}] seo.thumbnailPath must be a public asset path under images/ or videos/.`,
    );
  }

  if (!isValidInternalOrAbsoluteUrl(seo.transcriptOrSummaryUrl)) {
    errors.push(
      `[${id}] seo.transcriptOrSummaryUrl must start with '/' or 'https://'.`,
    );
  }

  if (!isNonEmptyString(seo.voiceoverTalent)) {
    errors.push(
      `[${id}] seo.voiceoverTalent is required and must be '${REQUIRED_VOICE_TALENT}'.`,
    );
  } else if (seo.voiceoverTalent.trim() !== REQUIRED_VOICE_TALENT) {
    errors.push(
      `[${id}] seo.voiceoverTalent must be '${REQUIRED_VOICE_TALENT}' to preserve Jeremy-led voice authority signals.`,
    );
  }

  if (!isNonEmptyString(seo.presenterEntityName)) {
    errors.push(
      `[${id}] seo.presenterEntityName is required and must be '${REQUIRED_VOICE_TALENT}'.`,
    );
  } else if (seo.presenterEntityName.trim() !== REQUIRED_VOICE_TALENT) {
    errors.push(
      `[${id}] seo.presenterEntityName must be '${REQUIRED_VOICE_TALENT}' to keep presenter attribution aligned with MHC SEO.`,
    );
  }

  if (!hasJeremySearchSignal(seo)) {
    errors.push(
      `[${id}] SEO metadata must include the phrase 'Jeremy Thamert' in at least one of title, description, videoObjectName, or videoObjectDescription.`,
    );
  }

  if (campaignScope === "company") {
    if (
      !Array.isArray(seo.appliesToRoutes) ||
      seo.appliesToRoutes.length === 0
    ) {
      errors.push(
        `[${id}] company-wide campaigns must define seo.appliesToRoutes with at least one route.`,
      );
    } else if (knownAppRoutes instanceof Set && knownAppRoutes.size > 0) {
      for (const appliedRoute of seo.appliesToRoutes) {
        if (
          !isValidRoutePath(appliedRoute) ||
          !knownAppRoutes.has(appliedRoute)
        ) {
          errors.push(
            `[${id}] seo.appliesToRoutes contains unknown route '${appliedRoute}'.`,
          );
        }
      }
    }
  }

  if (!Array.isArray(seo.radioPartners) || seo.radioPartners.length === 0) {
    errors.push(
      `[${id}] seo.radioPartners must list at least one approved radio partner.`,
    );
    return;
  }

  if (seo.radioPartners.length !== 1) {
    errors.push(
      `[${id}] seo.radioPartners must contain exactly one partner (Stephens Media Group or Townsquare Media).`,
    );
  }

  for (const partner of seo.radioPartners) {
    if (!isNonEmptyString(partner)) {
      errors.push(
        `[${id}] seo.radioPartners entries must be non-empty strings.`,
      );
      continue;
    }

    if (!APPROVED_RADIO_PARTNERS.has(partner.trim())) {
      errors.push(
        `[${id}] seo.radioPartners contains unapproved value '${partner}'. Use approved names: Stephens Media Group, Townsquare Media.`,
      );
    }
  }
}

function probeMedia(fullPath) {
  const result = spawnSync(
    ffprobePath,
    [
      "-v",
      "error",
      "-show_streams",
      "-show_format",
      "-print_format",
      "json",
      fullPath,
    ],
    { encoding: "utf8" },
  );

  if (result.status !== 0) {
    return {
      ok: false,
      error: (result.stderr || result.stdout || "ffprobe failed").trim(),
    };
  }

  try {
    const parsed = JSON.parse(result.stdout || "{}");
    return { ok: true, data: parsed };
  } catch (error) {
    return {
      ok: false,
      error: `Unable to parse ffprobe JSON: ${error.message}`,
    };
  }
}

function collectMediaFiles(rootDir) {
  if (!fs.existsSync(rootDir)) {
    return [];
  }

  const entries = fs.readdirSync(rootDir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(rootDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectMediaFiles(fullPath));
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    if (!entry.name.endsWith(".mp4") && !entry.name.endsWith(".webm")) {
      continue;
    }

    if (IGNORE_TEMP_MEDIA && /\.tmp\./.test(entry.name)) {
      continue;
    }

    files.push(fullPath);
  }

  return files;
}

function isInactiveHeroCommercialPipeline({
  manifestExists,
  presentMediaCount,
}) {
  return !manifestExists && presentMediaCount === 0;
}

function run() {
  const errors = [];
  const warnings = [];
  const knownAppRoutes = collectKnownAppRoutes();
  const manifestExists = fs.existsSync(MANIFEST_PATH);
  const presentMedia = collectMediaFiles(HERO_DIR).map((filePath) =>
    path.normalize(filePath),
  );

  if (knownAppRoutes.size === 0) {
    warnings.push(
      `No page.tsx routes discovered under ${APP_DIR}. Route ownership checks for seo.routePath are skipped.`,
    );
  }

  if (
    isInactiveHeroCommercialPipeline({
      manifestExists,
      presentMediaCount: presentMedia.length,
    })
  ) {
    console.log(
      "Hero Commercial Guardrails: PASS (inactive - no registered hero commercial media in repo)",
    );
    return 0;
  }

  if (!manifestExists) {
    errors.push(`Missing manifest: ${MANIFEST_PATH}`);
    fail(errors);
  }

  if (!fs.existsSync(HERO_DIR)) {
    errors.push(`Missing hero video directory: ${HERO_DIR}`);
    fail(errors);
  }

  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
  } catch (error) {
    errors.push(`Invalid JSON in ${MANIFEST_PATH}: ${error.message}`);
    fail(errors);
  }

  if (!Array.isArray(manifest) || manifest.length === 0) {
    errors.push("Hero commercial manifest must contain at least one entry.");
    fail(errors);
  }

  const registered = new Set();

  for (const entry of manifest) {
    const id = entry.id || "(missing-id)";
    const campaignScope = getCampaignScope(entry);

    if (typeof entry.id !== "string" || !entry.id.trim()) {
      errors.push("Manifest entry is missing a non-empty id.");
    }

    if (
      entry.campaignScope !== undefined &&
      entry.campaignScope !== "company" &&
      entry.campaignScope !== "route"
    ) {
      errors.push(
        `[${id}] campaignScope must be 'company' or 'route' when provided.`,
      );
    }

    validateSeoMetadata({
      entry,
      id,
      errors,
      warnings,
      knownAppRoutes,
    });

    if (typeof entry.mp4 !== "string" || !entry.mp4.endsWith(".mp4")) {
      errors.push(`[${id}] mp4 must be a .mp4 path.`);
      continue;
    }

    const mp4Path = path.join(PUBLIC_DIR, entry.mp4);
    registered.add(path.normalize(mp4Path));

    if (!fs.existsSync(mp4Path)) {
      errors.push(`[${id}] Missing mp4 file: ${entry.mp4}`);
      continue;
    }

    const mp4Name = path.basename(mp4Path);
    if (!FILE_NAME_RE.test(mp4Name)) {
      errors.push(
        `[${id}] MP4 filename must be lowercase kebab-case: ${mp4Name}`,
      );
    }
    validateHeroFileNameConvention({
      id,
      routePath: entry.seo?.routePath,
      campaignScope,
      mediaPath: entry.mp4,
      errors,
      warnings,
    });

    const mp4Size = fs.statSync(mp4Path).size;
    if (mp4Size > MAX_HERO_FILE_BYTES) {
      errors.push(
        `[${id}] MP4 exceeds hero media limit ${formatMB(MAX_HERO_FILE_BYTES)} (${formatMB(mp4Size)}): ${entry.mp4}`,
      );
    } else if (mp4Size > WARN_LARGE_BYTES) {
      warnings.push(
        `[${id}] MP4 is large (${formatMB(mp4Size)}). Keep hero media under ${formatMB(
          WARN_LARGE_BYTES,
        )} when practical.`,
      );
    }

    const probe = probeMedia(mp4Path);
    if (!probe.ok) {
      errors.push(`[${id}] ffprobe failed for ${entry.mp4}: ${probe.error}`);
      continue;
    }

    const streams = probe.data.streams || [];
    const hasVideo = streams.some((stream) => stream.codec_type === "video");
    const hasAudio = streams.some((stream) => stream.codec_type === "audio");

    if (!hasVideo) {
      errors.push(`[${id}] MP4 has no video stream: ${entry.mp4}`);
    }

    if (entry.audioRequired !== false && !hasAudio) {
      errors.push(`[${id}] MP4 has no audio stream: ${entry.mp4}`);
    }

    if (typeof entry.expectedDurationSec === "number") {
      const actual = Number(probe.data.format?.duration || 0);
      if (!Number.isFinite(actual) || actual <= 0) {
        errors.push(`[${id}] Unable to determine MP4 duration: ${entry.mp4}`);
      } else if (
        Math.abs(actual - entry.expectedDurationSec) > DURATION_TOLERANCE_SEC
      ) {
        errors.push(
          `[${id}] Duration mismatch for ${entry.mp4}. Expected ${entry.expectedDurationSec.toFixed(
            2,
          )}s, got ${actual.toFixed(2)}s.`,
        );
      }
    } else {
      errors.push(`[${id}] expectedDurationSec must be a number.`);
    }

    if (typeof entry.webm === "string" && entry.webm.endsWith(".webm")) {
      const webmPath = path.join(PUBLIC_DIR, entry.webm);
      registered.add(path.normalize(webmPath));

      if (!fs.existsSync(webmPath)) {
        errors.push(`[${id}] Missing webm file: ${entry.webm}`);
      } else {
        const webmName = path.basename(webmPath);
        if (!FILE_NAME_RE.test(webmName)) {
          errors.push(
            `[${id}] WebM filename must be lowercase kebab-case: ${webmName}`,
          );
        }
        validateHeroFileNameConvention({
          id,
          routePath: entry.seo?.routePath,
          campaignScope,
          mediaPath: entry.webm,
          errors,
          warnings,
        });

        const webmSize = fs.statSync(webmPath).size;
        if (webmSize > MAX_HERO_FILE_BYTES) {
          errors.push(
            `[${id}] WebM exceeds hero media limit ${formatMB(MAX_HERO_FILE_BYTES)} (${formatMB(webmSize)}): ${entry.webm}`,
          );
        }
      }
    }
  }

  for (const fullPath of presentMedia) {
    if (!registered.has(fullPath)) {
      const relative = path.relative(PUBLIC_DIR, fullPath).replace(/\\/g, "/");
      errors.push(
        `Unregistered hero media file: ${relative}. Add it to config/hero-commercials.json.`,
      );
    }
  }

  if (warnings.length > 0) {
    warn(warnings);
  }

  if (errors.length > 0) {
    fail(errors);
  }

  console.log(
    `Hero Commercial Guardrails: PASS (${manifest.length} manifest entr${
      manifest.length === 1 ? "y" : "ies"
    }, ${presentMedia.length} media files)`,
  );

  return 0;
}

if (require.main === module) {
  run();
}

module.exports = {
  collectKnownAppRoutes,
  collectMediaFiles,
  isInactiveHeroCommercialPipeline,
  listPageFiles,
  routePathToRouteKey,
  routeFromPageFile,
  getCampaignScope,
  validateHeroFileNameConvention,
  validateSeoMetadata,
  run,
};
