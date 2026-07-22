#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const {
  collectKnownAppRoutes,
  routePathToRouteKey,
} = require("./check-hero-commercial-guardrails.js");

const ROOT_DIR = path.join(__dirname, "../..");
const DEFAULT_MANIFEST_PATH = path.join(
  ROOT_DIR,
  "config/hero-commercials.json",
);
const REQUIRED_VOICE_TALENT = "Jeremy Thamert";
const PARTNER_MAP = {
  smg: ["Stephens Media Group"],
  tsm: ["Townsquare Media"],
};
const CAMPAIGN_SCOPE_VALUES = new Set(["company", "route"]);

function fail(message) {
  console.error(`Hero manifest entry generator: ${message}`);
  process.exit(1);
}

function sanitizeKebab(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function parseDuration(value) {
  if (value === undefined) {
    return 60;
  }

  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) {
    fail("--durationSec must be a positive number (for example 61.03).");
  }

  return Number(numeric.toFixed(2));
}

function parseRevision(value) {
  const parsed = Number(value ?? 1);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 99) {
    fail("--revision must be an integer between 1 and 99.");
  }
  return String(parsed).padStart(2, "0");
}

function parseQuarter(value) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 4) {
    fail("--quarter must be 1, 2, 3, or 4.");
  }
  return parsed;
}

function parseYear(value) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 2020 || parsed > 2099) {
    fail("--year must be a 4-digit year between 2020 and 2099.");
  }
  return parsed;
}

function parseArgs(argv) {
  const args = {};

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) {
      continue;
    }

    const key = token.slice(2);
    const next = argv[i + 1];

    if (key === "write") {
      args.write = true;
      continue;
    }

    if (!next || next.startsWith("--")) {
      fail(`Missing value for --${key}.`);
    }

    args[key] = next;
    i += 1;
  }

  return args;
}

function parseAppliesToRoutes(value) {
  if (!value) {
    return ["/"];
  }

  return value
    .split(",")
    .map((route) => route.trim())
    .filter(Boolean);
}

function deriveDefaultId(
  campaignScope,
  routePath,
  campaignKey,
  year,
  quarter,
  revisionPadded,
) {
  if (campaignScope === "company") {
    return `mhc-${campaignKey}-${year}q${quarter}-v${revisionPadded}`;
  }

  const routeKey = routePathToRouteKey(routePath);
  return `${routeKey}-${campaignKey}-${year}q${quarter}-v${revisionPadded}`;
}

function toTitleCase(value) {
  return String(value || "")
    .split(/\s+/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

function buildFileStem({
  campaignScope,
  routePath,
  campaignKey,
  partnerCode,
  year,
  quarter,
  revisionPadded,
}) {
  if (campaignScope === "company") {
    return `mhc-hero-${campaignKey}-${partnerCode}-${year}q${quarter}-v${revisionPadded}`;
  }

  const routeKey = routePathToRouteKey(routePath);
  return `${routeKey}-hero-${campaignKey}-${partnerCode}-${year}q${quarter}-v${revisionPadded}`;
}

function createHeroCommercialEntry(options) {
  const campaignScope = sanitizeKebab(options.campaignScope || "company");
  let routePath = options.routePath;
  const campaignKey = sanitizeKebab(options.campaignKey);
  const partnerCode = sanitizeKebab(options.partnerCode);

  if (!CAMPAIGN_SCOPE_VALUES.has(campaignScope)) {
    fail("--campaignScope must be one of: company, route.");
  }

  if (campaignScope === "company" && !routePath) {
    routePath = "/";
  }

  if (campaignScope === "company" && routePath !== "/") {
    fail("--routePath must be '/' when --campaignScope is company.");
  }

  if (!routePath || !routePath.startsWith("/")) {
    fail("--routePath is required and must start with '/'.");
  }

  const knownRoutes = collectKnownAppRoutes(path.join(ROOT_DIR, "src/app"));
  if (knownRoutes.size > 0 && !knownRoutes.has(routePath)) {
    fail(`routePath '${routePath}' does not map to an existing app route.`);
  }

  const appliesToRoutes =
    campaignScope === "company"
      ? parseAppliesToRoutes(options.appliesToRoutes)
      : [];
  for (const appliedRoute of appliesToRoutes) {
    if (!appliedRoute.startsWith("/")) {
      fail("--appliesToRoutes must contain paths that start with '/'.");
    }

    if (knownRoutes.size > 0 && !knownRoutes.has(appliedRoute)) {
      fail(
        `appliesToRoutes route '${appliedRoute}' does not map to an existing app route.`,
      );
    }
  }

  if (!campaignKey) {
    fail("--campaignKey is required and must contain letters or numbers.");
  }

  if (!Object.prototype.hasOwnProperty.call(PARTNER_MAP, partnerCode)) {
    fail("--partnerCode must be one of: smg, tsm.");
  }

  const year = parseYear(options.year);
  const quarter = parseQuarter(options.quarter);
  const revisionPadded = parseRevision(options.revision);
  const expectedDurationSec = parseDuration(options.durationSec);

  const fileStem = buildFileStem({
    campaignScope,
    routePath,
    campaignKey,
    partnerCode,
    year,
    quarter,
    revisionPadded,
  });

  const id =
    sanitizeKebab(options.id) ||
    deriveDefaultId(
      campaignScope,
      routePath,
      campaignKey,
      year,
      quarter,
      revisionPadded,
    );

  const routeKey = routePathToRouteKey(routePath);
  const routeLabel =
    campaignScope === "company"
      ? "Company"
      : routeKey === "home"
        ? "Home"
        : toTitleCase(routeKey.replace(/-/g, " "));

  return {
    campaignScope,
    id,
    mp4: `videos/hero-commercials/${fileStem}.mp4`,
    webm: `videos/hero-commercials/${fileStem}.webm`,
    expectedDurationSec,
    audioRequired: true,
    seo: {
      routePath,
      title: `MH Construction ${routeLabel} Hero with Jeremy Thamert`,
      description: `Jeremy Thamert voices this MH Construction ${routeLabel} hero campaign with relationship-first construction leadership and field accountability.`,
      videoObjectName: `MH Construction ${routeLabel} Hero Commercial - Jeremy Thamert`,
      videoObjectDescription: `Hero commercial for ${routePath} featuring Jeremy Thamert as voice and presenter for MH Construction campaign messaging.`,
      thumbnailPath: `videos/hero-commercials/poster-${fileStem}.jpg`,
      transcriptOrSummaryUrl: routePath,
      voiceoverTalent: REQUIRED_VOICE_TALENT,
      presenterEntityName: REQUIRED_VOICE_TALENT,
      ...(campaignScope === "company" ? { appliesToRoutes } : {}),
      radioPartners: PARTNER_MAP[partnerCode],
    },
  };
}

function readManifestOrEmpty(manifestPath) {
  if (!fs.existsSync(manifestPath)) {
    return [];
  }

  const parsed = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  if (!Array.isArray(parsed)) {
    fail("Existing manifest must be a JSON array.");
  }
  return parsed;
}

function writeManifestEntry({ manifestPath, entry }) {
  const manifest = readManifestOrEmpty(manifestPath);

  const duplicateId = manifest.some((item) => item?.id === entry.id);
  if (duplicateId) {
    fail(
      `Manifest already contains id '${entry.id}'. Use --id or --revision to create a new entry.`,
    );
  }

  const duplicateMp4 = manifest.some((item) => item?.mp4 === entry.mp4);
  if (duplicateMp4) {
    fail(
      `Manifest already contains mp4 path '${entry.mp4}'. Increment --revision.`,
    );
  }

  manifest.push(entry);
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  fs.writeFileSync(
    manifestPath,
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8",
  );
}

function printUsage() {
  console.log(
    `\nUsage:\n  node scripts/validation/generate-hero-commercial-manifest-entry.js \\\n    --campaignScope company|route \\\n    --routePath / \\\n    --appliesToRoutes /,/services,/about \\\n    --campaignKey commercial-remodel \\\n    --partnerCode smg|tsm \\\n    --year 2026 \\\n    --quarter 3 \\\n    [--revision 1] \\\n    [--durationSec 61.03] \\\n    [--id custom-id] \\\n    [--write]\n\nBy default the command prints the generated JSON entry.\nUse --write to append the entry to config/hero-commercials.json.\n`,
  );
}

function run(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);

  if (args.help || args.h) {
    printUsage();
    return 0;
  }

  const required = ["campaignKey", "partnerCode", "year", "quarter"];
  for (const name of required) {
    if (!args[name]) {
      fail(`Missing required argument --${name}. Use --help for usage.`);
    }
  }

  const entry = createHeroCommercialEntry(args);
  const manifestPath = args.manifestPath
    ? path.resolve(args.manifestPath)
    : DEFAULT_MANIFEST_PATH;

  if (args.write) {
    writeManifestEntry({ manifestPath, entry });
    console.log(`Hero manifest entry appended to ${manifestPath}`);
  }

  console.log(JSON.stringify(entry, null, 2));
  return 0;
}

if (require.main === module) {
  run();
}

module.exports = {
  createHeroCommercialEntry,
  parseArgs,
  routePathToRouteKey,
  run,
};
