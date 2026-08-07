import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, resolve } from "node:path";

const appRoot = process.cwd();
const repositoryRoot = resolve(appRoot, "../..");
const registerPath = resolve(
  repositoryRoot,
  "docs/branding/governance/mhc-ip-register.json",
);
const quoteLibraryPath = resolve(appRoot, "src/content/jeremy-page-ribbons.md");
const failures = [];

const register = JSON.parse(readFileSync(registerPath, "utf8"));
const entries = new Map(
  (register.entries ?? []).map((entry) => [entry.id, entry]),
);

for (const id of [
  "mhc-primary-slogan",
  "mhc-mish",
  "words-from-the-general",
  "affiliated-platforms",
  "adobe-licensed-creative-assets",
]) {
  const entry = entries.get(id);
  if (!entry) {
    failures.push(`IP register: missing required entry ${id}`);
    continue;
  }

  for (const field of [
    "displayName",
    "assetType",
    "claimedOwner",
    "riskFlag",
    "publicationDecision",
    "nextAction",
  ]) {
    if (!entry[field]) {
      failures.push(`IP register: ${id} is missing ${field}`);
    }
  }
}

if (register.lifecycleStatus !== "Draft") {
  failures.push(
    "IP register: lifecycleStatus must remain Draft until approval",
  );
}

if (register.authority?.chiefEditor !== "Matt Ramsey") {
  failures.push("IP register: Chief Editor must remain Matt Ramsey");
}

if (register.authority?.finalApprover !== "Jeremy Thamert") {
  failures.push("IP register: final approver must remain Jeremy Thamert");
}

const affiliated = entries.get("affiliated-platforms");
if (
  affiliated?.claimedOwner !==
  "Unnamed sister company; ownership is not claimed by MH Construction"
) {
  failures.push("IP register: affiliated platform ownership boundary changed");
}

if (affiliated?.publicationDecision !== "do-not-name-on-public-mhc-routes") {
  failures.push("IP register: affiliated platform public-use boundary changed");
}

const adobeAssets = entries.get("adobe-licensed-creative-assets");
if (
  adobeAssets?.publicationDecision !== "asset-by-asset-license-record-required"
) {
  failures.push("IP register: Adobe asset license-record boundary changed");
}

if (
  !adobeAssets?.fontPolicy?.includes("Do not self-host Adobe web-font files")
) {
  failures.push("IP register: Adobe Fonts self-hosting safeguard changed");
}

if (!Array.isArray(register.licensedAssets)) {
  failures.push("IP register: licensedAssets ledger must be an array");
}

const adobeWebFont = register.licensedAssets?.find(
  (asset) => asset.id === "adobe-fonts-mendl-sans-dusk-web",
);
if (
  adobeWebFont?.projectId !== "xqd0lnq" ||
  adobeWebFont?.stylesheet !== "https://use.typekit.net/xqd0lnq.css" ||
  adobeWebFont?.fontDisplay !== "swap"
) {
  failures.push("IP register: Adobe Mendl web project record is incomplete");
}

const fontConfig = readFileSync(resolve(appRoot, "src/lib/fonts.ts"), "utf8");
for (const contract of [
  'id: "xqd0lnq"',
  'stylesheet: "https://use.typekit.net/xqd0lnq.css"',
  'family: "mendl-sans-dusk"',
  'fontDisplay: "swap"',
]) {
  if (!fontConfig.includes(contract)) {
    failures.push(`Font config: missing Adobe contract ${contract}`);
  }
}

const rootLayout = readFileSync(resolve(appRoot, "src/app/layout.tsx"), "utf8");
if (
  !rootLayout.includes(
    '<link rel="stylesheet" href={ADOBE_FONTS_PROJECT.stylesheet}',
  )
) {
  failures.push("Root layout: Adobe Fonts stylesheet is not integrated");
}

const globalCss = readFileSync(resolve(appRoot, "src/app/globals.css"), "utf8");
if (globalCss.includes("fonnts.com-") || globalCss.includes("@font-face")) {
  failures.push("Global CSS: public self-hosted Mendl source is prohibited");
}

const quoteLibrary = readFileSync(quoteLibraryPath, "utf8");
for (const contract of [
  "Status: Legacy-use freeze; written speaker approval and ownership record pending",
  "Speaker: Jeremy Thamert",
  "Chief Editor and CHENG review: Matt Ramsey",
  "Final approval authority: Jeremy Thamert, Owner and CEO",
  "IP register: words-from-the-general",
  "No new quotation may be added until Jeremy's written approval record is established.",
]) {
  if (!quoteLibrary.includes(contract)) {
    failures.push(`Quote library: missing governance contract ${contract}`);
  }
}

function collectPublicSourceFiles(directory) {
  const files = [];

  for (const name of readdirSync(directory)) {
    const path = join(directory, name);
    const stat = statSync(path);

    if (stat.isDirectory()) {
      if (name === "__tests__") continue;
      files.push(...collectPublicSourceFiles(path));
      continue;
    }

    if ([".ts", ".tsx", ".js", ".jsx", ".md"].includes(extname(name))) {
      files.push(path);
    }
  }

  return files;
}

const publicRoots = [
  resolve(appRoot, "src/app"),
  resolve(appRoot, "src/components"),
  resolve(appRoot, "src/lib/data"),
  resolve(appRoot, "src/lib/seo"),
];

const platformNames = [
  "BidPilot",
  "Build Pilot",
  "Marketing Flight",
  "Field Command Center",
];

for (const file of publicRoots.flatMap(collectPublicSourceFiles)) {
  const source = readFileSync(file, "utf8");
  const relative = file.slice(appRoot.length + 1).replaceAll("\\", "/");

  for (const platform of platformNames) {
    if (source.includes(platform)) {
      failures.push(
        `${relative}: public MHC source names affiliated platform ${platform}`,
      );
    }
  }

  if (/Words Form the General/i.test(source)) {
    failures.push(`${relative}: contains the prohibited Form/From typo`);
  }

  if (
    /(?:Built on Quality, Backed by Trust\.?|MISH|Words? From the General)\s*[®™℠]/i.test(
      source,
    )
  ) {
    failures.push(
      `${relative}: uses an IP symbol before recorded CHENG clearance`,
    );
  }
}

const timeline = readFileSync(
  resolve(appRoot, "src/lib/data/about-timeline.ts"),
  "utf8",
);
for (const contract of [
  'title: "Secure Affiliated Systems"',
  "Platform development is handled outside MH Construction",
]) {
  if (!timeline.includes(contract)) {
    failures.push(`About timeline: missing ownership contract ${contract}`);
  }
}

if (failures.length) {
  console.error("MHC IP governance gate failed:\n" + failures.join("\n"));
  process.exit(1);
}

console.log(
  `MHC IP governance gate passed (${entries.size} register entries, ${platformNames.length} affiliated platform names controlled).`,
);
