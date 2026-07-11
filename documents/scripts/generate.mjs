#!/usr/bin/env node
/* eslint-disable no-console, prefer-template */
/**
 * documents/scripts/generate.mjs
 *
 * Renders branded print-ready PDFs from HTML templates using Puppeteer.
 *
          manualSignOnly: true,
 * Usage:
 *   npm run docs:generate                          # generate all safety manual PDFs
 *   npm run docs:generate -- --template cover      # cover only
 *   npm run docs:generate -- --template spine      # spine only
 *   npm run docs:generate -- --template letterhead # official letterhead
 *   npm run docs:generate -- --template tabs       # all tab dividers
 *   npm run docs:generate -- --template spine-guardrails # spine guardrails only
 *   npm run docs:generate -- --template sections   # all 44 section PDFs
 *   npm run docs:generate -- --template section --section 11  # single section
 *   npm run docs:generate -- --template website-pages # website banner/section inventory
 *   npm run docs:generate -- --template website-image-needs # website image needs inventory
 *   npm run docs:generate -- --template toolbox-talk          # standalone form
 *   npm run docs:generate -- --template form-covers           # all 47 form cover sheets
 *   node documents/scripts/generate.mjs --template cover
 *
 * Output directory: documents/generated-pdfs/
 *   safety-manual-cover.pdf
          manualSignOnly: true,
 *   safety-manual-spine.pdf
 *   safety-manual-tabs.pdf
 *   safety-manual-toc.pdf
 *   sections/
 *     01-injury-free-workplace-plan.pdf
 *     …
 *   forms/
 *     toolbox-talk.pdf
 */

import puppeteer from "puppeteer";
import QRCode from "qrcode";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import {
  readFile,
  writeFile,
  mkdir,
  readdir,
  copyFile,
} from "node:fs/promises";
import {
  readFileSync,
  existsSync,
  unlinkSync,
  readdirSync,
  statSync,
} from "node:fs";
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import { join, resolve, dirname, extname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createCanvas } from "@napi-rs/canvas";

const SITE_URL = "https://www.mhc-gc.com";
const PDF_METADATA_AUTHOR = "Matt Ramsey, Safety Officer";
const PDF_METADATA_CREATOR = "MH Construction Document Pipeline";
const PDF_METADATA_SUBJECT = "Accident · Injury · Safety · Health Program";
const PDF_FONT_STACK_BODY =
  '"mendl-sans-dusk", "Mendl Sans Dusk", Roboto, sans-serif';
const PDF_FONT_STACK_HEADING =
  '"mendl-sans-dusk", "Mendl Sans Dusk", Roboto, sans-serif';
const MATERIAL_ICONS_FONT_FILE = "MaterialIcons-Regular.woff2";
const MENDL_DUSK_FONT_FILES = Object.freeze({
  regular: [
    "MendlSansDusk-Regular.woff2",
    "mendl-sans-dusk-regular.woff2",
    "mendl-sans-dusk.woff2",
    "Mendl Fonts/fonnts.com-Mendl_Sans_Dusk_Regular.otf",
  ],
  semibold: [
    "MendlSansDusk-SemiBold.woff2",
    "mendl-sans-dusk-semibold.woff2",
    "Mendl Fonts/fonnts.com-Mendl_Sans_Dusk_SemiBold.otf",
  ],
  bold: [
    "MendlSansDusk-Bold.woff2",
    "mendl-sans-dusk-bold.woff2",
    "Mendl Fonts/fonnts.com-Mendl_Sans_Dusk_Bold.otf",
  ],
});
const MENDL_BODY_FONT_FILES = Object.freeze({
  regular: [
    "mendl-sans-dusk-regular.woff2",
    "Mendl Fonts/fonnts.com-Mendl_Sans_Dusk_Regular.otf",
  ],
  semibold: [
    "mendl-sans-dusk-semibold.woff2",
    "Mendl Fonts/fonnts.com-Mendl_Sans_Dusk_SemiBold.otf",
  ],
  bold: [
    "mendl-sans-dusk-bold.woff2",
    "Mendl Fonts/fonnts.com-Mendl_Sans_Dusk_Bold.otf",
  ],
});
const MATERIAL_ICON_LIGATURES = Object.freeze({
  info: "info",
  dangerOutline: "error_outline",
  warning: "warning",
  caution: "gpp_maybe",
  checkboxEmpty: "check_box_outline_blank",
  checklist: "fact_check",
  formField: "edit_note",
  narrative: "description",
  table: "table_chart",
  signature: "draw",
  route: "route",
  access: "verified_user",
  source: "menu_book",
  localDev: "dns",
});
const MATERIAL_ICON_LIGATURE_SET = new Set(
  Object.values(MATERIAL_ICON_LIGATURES),
);
let PDF_MATERIAL_ICONS_STYLE_TAG;
let PDF_MENDL_STYLE_TAG;

function resolvePdfFontPath(fileName) {
  const candidates = [
    resolve(DOCS_DIR, `../../public/fonts/${fileName}`),
    resolve(DOCS_DIR, `../../apps/website/public/fonts/${fileName}`),
    resolve(ROOT, `public/fonts/${fileName}`),
    resolve(ROOT, `apps/website/public/fonts/${fileName}`),
  ];
  return candidates.find((candidate) => existsSync(candidate)) || null;
}

function resolveMaterialIconsFontPath() {
  return resolvePdfFontPath(MATERIAL_ICONS_FONT_FILE);
}

function resolveFirstPdfFontPath(fileNames) {
  for (const fileName of fileNames) {
    const path = resolvePdfFontPath(fileName);
    if (path) {
      return path;
    }
  }
  return null;
}

function cssFontFormatForFilePath(fontPath) {
  const extension = extname(fontPath).toLowerCase();
  if (extension === ".woff2") return "woff2";
  if (extension === ".woff") return "woff";
  if (extension === ".otf") return "opentype";
  if (extension === ".ttf") return "truetype";
  return "woff2";
}

function buildPdfMendlStyleTag() {
  const duskRegularPath = resolveFirstPdfFontPath(
    MENDL_DUSK_FONT_FILES.regular,
  );
  const duskSemiboldPath = resolveFirstPdfFontPath(
    MENDL_DUSK_FONT_FILES.semibold,
  );
  const duskBoldPath = resolveFirstPdfFontPath(MENDL_DUSK_FONT_FILES.bold);
  const bodyRegularPath = resolveFirstPdfFontPath(
    MENDL_BODY_FONT_FILES.regular,
  );
  const bodySemiboldPath = resolveFirstPdfFontPath(
    MENDL_BODY_FONT_FILES.semibold,
  );
  const bodyBoldPath = resolveFirstPdfFontPath(MENDL_BODY_FONT_FILES.bold);

  if (
    !duskRegularPath &&
    !duskSemiboldPath &&
    !duskBoldPath &&
    !bodyRegularPath &&
    !bodySemiboldPath &&
    !bodyBoldPath
  ) {
    return "";
  }

  const declarations = [];
  const pushFaceDeclarations = (fontPath, weight, familyNames) => {
    if (!fontPath) return;
    const fontUrl = pathToFileURL(fontPath).toString();
    const fontFormat = cssFontFormatForFilePath(fontPath);
    for (const familyName of familyNames) {
      declarations.push(
        `@font-face {\n  font-family: "${familyName}";\n  font-style: normal;\n  font-weight: ${weight};\n  font-display: swap;\n  src: url("${fontUrl}") format("${fontFormat}");\n}`,
      );
    }
  };

  const mendlDuskFamilies = ["mendl-sans-dusk", "Mendl Sans Dusk"];
  const mendlBodyFamilies = ["mendl-sans-dusk", "Mendl Sans Dusk"];

  pushFaceDeclarations(duskRegularPath, 400, mendlDuskFamilies);
  pushFaceDeclarations(duskSemiboldPath, 600, mendlDuskFamilies);
  pushFaceDeclarations(duskBoldPath, 700, mendlDuskFamilies);
  pushFaceDeclarations(bodyRegularPath, 400, mendlBodyFamilies);
  pushFaceDeclarations(bodySemiboldPath, 600, mendlBodyFamilies);
  pushFaceDeclarations(bodyBoldPath, 700, mendlBodyFamilies);

  return `<style data-pdf-mendl-fonts="true">\n${declarations.join("\n\n")}\n</style>`;
}

function getPdfMendlStyleTag() {
  if (PDF_MENDL_STYLE_TAG === undefined) {
    PDF_MENDL_STYLE_TAG = buildPdfMendlStyleTag();
  }
  return PDF_MENDL_STYLE_TAG;
}

function buildPdfMaterialIconsStyleTag() {
  const materialIconsFontPath = resolveMaterialIconsFontPath();
  if (!materialIconsFontPath) {
    return "";
  }
  const fontUrl = pathToFileURL(materialIconsFontPath).toString();
  return `<style data-pdf-material-icons="true">\n@font-face {\n  font-family: "Material Icons";\n  font-style: normal;\n  font-weight: 400;\n  font-display: swap;\n  src: url("${fontUrl}") format("woff2");\n}\n.material-icons,\n.mi {\n  font-family: "Material Icons", sans-serif;\n  font-weight: 400;\n  font-style: normal;\n  font-size: 1em;\n  display: inline-block;\n  line-height: 1;\n  text-transform: none;\n  letter-spacing: normal;\n  word-wrap: normal;\n  white-space: nowrap;\n  direction: ltr;\n  vertical-align: -0.125em;\n  -webkit-font-smoothing: antialiased;\n  text-rendering: optimizeLegibility;\n  -moz-osx-font-smoothing: grayscale;\n  font-feature-settings: "liga";\n}\n.mi-inline {\n  font-size: 1em;\n  vertical-align: -0.125em;\n}\n</style>`;
}

function getPdfMaterialIconsStyleTag() {
  if (PDF_MATERIAL_ICONS_STYLE_TAG === undefined) {
    PDF_MATERIAL_ICONS_STYLE_TAG = buildPdfMaterialIconsStyleTag();
  }
  return PDF_MATERIAL_ICONS_STYLE_TAG;
}

async function embedPdfMendlBodyFont(pdfDoc) {
  const bodyPath =
    resolveFirstPdfFontPath(MENDL_BODY_FONT_FILES.regular) ||
    resolveFirstPdfFontPath(MENDL_DUSK_FONT_FILES.regular);

  if (!bodyPath) {
    throw new Error(
      "Unable to locate a Mendl body font for PDF field embedding.",
    );
  }

  pdfDoc.registerFontkit(fontkit);
  const fontBytes = await readFile(bodyPath);
  return pdfDoc.embedFont(fontBytes, { subset: true });
}

function getMaterialIconLigature(name) {
  const ligature = MATERIAL_ICON_LIGATURES[name];
  if (!ligature) {
    throw new Error(`Unknown material icon ligature key: ${name}`);
  }
  return ligature;
}

// ── Cluster mapping — MIRROR of src/lib/data/safety-manual-clusters.ts ──────
// Used to deep-link section/tab QRs to /resources/safety-manual/{cluster}#mish-NN
const SAFETY_MANUAL_CLUSTERS = [
  { slug: "program-foundation", min: 1, max: 3 },
  { slug: "field-onboarding-and-communication", min: 4, max: 9 },
  { slug: "safety-oversight-and-industrial-hygiene", min: 10, max: 19 },
  { slug: "fall-and-access-safety", min: 20, max: 24 },
  {
    slug: "excavation-confined-spaces-and-energy-control",
    min: 25,
    max: 27,
  },
  { slug: "energy-and-fire-hazards", min: 28, max: 32 },
  { slug: "motor-vehicles-and-heavy-equipment", min: 33, max: 41 },
  { slug: "tools-and-materials", min: 42, max: 45 },
  { slug: "program-compliance-and-continuity", min: 46, max: 50 },
];

function clusterUrlForSection(numeric) {
  const cluster = SAFETY_MANUAL_CLUSTERS.find(
    (c) => numeric >= c.min && numeric <= c.max,
  );
  if (!cluster) return null;
  const anchor = String(numeric).padStart(2, "0");
  return `${SITE_URL}/resources/safety-manual/${cluster.slug}#mish-${anchor}`;
}

/**
 * Resolve a manifest `manualSection` value to the canonical MISH section
 * reference target(s). Accepts:
 *   • null / "" / "—"           → []
 *   • "MISH 15" / "15" / "MISH-15" → [{numeric:15, label:"MISH 15", url}]
 *   • ["MISH 15", "MISH 16"]    → multiple targets, in declared order
 * Invalid / out-of-range entries are silently dropped. Duplicates are deduped
 * by section number while preserving first-seen order.
 */
function resolveMishSectionTargets(manualSection) {
  if (manualSection == null) return [];
  const raw = Array.isArray(manualSection) ? manualSection : [manualSection];
  const seen = new Set();
  const out = [];
  for (const entry of raw) {
    if (entry == null) continue;
    const text = String(entry).trim();
    if (!text || text === "—") continue;
    const mishMatch = /^mish\s*-?\s*(\d{1,2})$/i.exec(text);
    const numericOnlyMatch = /^(\d{1,2})$/.exec(text);
    const match = mishMatch || numericOnlyMatch;
    if (!match) continue;
    const numeric = Number(match[1]);
    if (!Number.isFinite(numeric) || numeric < 1 || numeric > 50) continue;
    if (seen.has(numeric)) continue;
    const url = clusterUrlForSection(numeric);
    if (!url) continue;
    seen.add(numeric);
    const nn = String(numeric).padStart(2, "0");
    out.push({ numeric, label: `MISH ${nn}`, url });
  }
  return out;
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const DOCS_DIR = join(ROOT, "documents");
const OUTPUT_DIR = join(DOCS_DIR, "generated-pdfs");
let MANIFEST = join(DOCS_DIR, "content/safety-manual.json");
const FORMS_DIR = join(DOCS_DIR, "forms");
const CANONICAL_DOCS_DIR = DOCS_DIR;
const CANONICAL_OUTPUT_DIR = join(CANONICAL_DOCS_DIR, "output");
const CANONICAL_TOC_TEMPLATE_PATH = join(
  CANONICAL_DOCS_DIR,
  "manuals/safety-manual-toc.html",
);
const SAFETY_LETTERHEAD_TEMPLATE_PATH = join(
  DOCS_DIR,
  "manuals/safety-manual-letterhead.html",
);
const HANDBOOK_LETTERHEAD_TEMPLATE_PATH = join(
  DOCS_DIR,
  "manuals/employee-handbook-letterhead.html",
);
const CONSOLIDATED_LETTERHEAD_FILE_NAME = "MHC-company-letterhead.pdf";
const HANDBOOK_LETTERHEAD_PACKAGE_FILE_NAME =
  "form-handbook-company-letterhead.pdf";
const LEGACY_LETTERHEAD_FILE_NAMES = [
  "employee-handbook-letterhead.pdf",
  "safety-manual-letterhead.pdf",
];
const require = createRequire(import.meta.url);
const PDFJS_STANDARD_FONT_DATA_URL = pathToFileURL(
  resolve(
    dirname(require.resolve("pdfjs-dist/package.json")),
    "standard_fonts",
  ),
).href.replace(/([^/])$/, "$1/");

// ── Argument parsing ──────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const getArg = (flag) => {
  const i = args.indexOf(flag);
  if (i === -1) return null;
  return args[i + 1];
};
const template = getArg("--template") || "all";
const sectionNo = getArg("--section");
const formArg = getArg("--form"); // e.g. "form-02-c" or "FORM 02-C"
const revDateArg = getArg("--rev-date"); // e.g. "04/07/2026"
const revNumArg = getArg("--rev-number"); // e.g. "2"
const manualArg = (getArg("--manual") || "safety").trim().toLowerCase();
const isEmployeeHandbook =
  manualArg === "employee" ||
  manualArg === "employee-handbook" ||
  manualArg === "handbook";

if (!isEmployeeHandbook && manualArg !== "safety") {
  console.error(
    `❌  Unsupported manual '${manualArg}'. Use --manual safety or --manual employee-handbook`,
  );
  process.exit(1);
}

const ACTIVE_MANUAL = isEmployeeHandbook
  ? "employee-handbook"
  : "safety-manual";
const ACTIVE_MANUAL_LABEL = isEmployeeHandbook
  ? "Employee Handbook"
  : "Safety Manual (MISH)";

MANIFEST = join(DOCS_DIR, `content/${ACTIVE_MANUAL}.json`);

// ── Brand loader ──────────────────────────────────────────────────────────────
const brandId = getArg("--brand") || "mhc";
const BRAND_DIR = join(DOCS_DIR, "brands");

let BRAND;
try {
  BRAND = JSON.parse(
    await readFile(join(BRAND_DIR, `${brandId}.json`), "utf-8"),
  );
} catch {
  console.error(`❌  Brand config not found: documents/brands/${brandId}.json`);
  process.exit(1);
}

// ── Runtime revision enforcement (master-operator consistency requirement) ───
const ENFORCED_REVISION_DATE = "04/07/2026";
const ENFORCED_REVISION_NUMBER = "3";
BRAND.revisionDate = ENFORCED_REVISION_DATE;
BRAND.revisionNumber = ENFORCED_REVISION_NUMBER;

const ACTIVE_MANUAL_DIGITAL_URL = isEmployeeHandbook
  ? `${SITE_URL}/docs/employee/employee-handbook-2026.pdf`
  : BRAND?.qrCodes?.digitalManual ||
    `${SITE_URL}/docs/safety/safety-manual-complete.pdf`;

const WEBSITE_PAGE_INVENTORY = [
  {
    route: "/",
    source: "apps/website/src/app/page.tsx",
    banner: "HeroSection",
    bannerNote:
      "Homepage hero with branded value proposition and global site positioning.",
    sections: [
      "Specialties",
      "Market selector",
      "ServicesShowcaseDeferred",
      "WhyPartnerSection",
      "Proof by Market",
      "TestimonialsSectionDeferred",
      "TimelineDeferred",
      "Ownership Controls",
      "NextStepsSection",
    ],
    namedBanners: ["NextStepsSection"],
  },
  {
    route: "/about",
    source: "apps/website/src/app/about/page.tsx",
    banner: "AboutHero",
    bannerNote: "Keyword-led about hero introducing company positioning.",
    sections: [
      "Breadcrumb",
      "PartnershipPhilosophy",
      "LeadershipTeam",
      "CompanyStats",
      "AwardsSection",
      "Accreditations logo row",
      "SafetySection",
      "About details link block",
      "NextStepsSection",
    ],
    namedBanners: ["NextStepsSection"],
  },
  {
    route: "/services",
    source: "apps/website/src/app/services/page.tsx",
    banner: "ServicesHero",
    bannerNote: "Primary services hero with route-specific intro copy.",
    sections: [
      "Breadcrumb",
      "Market router + ownership summary",
      "CoreServicesSection",
      "SpecialtyServicesSection",
      "GovernmentProjectsSection",
      "ConstructionProcessSection",
      "ServiceAreasSection",
      "TestimonialsSection",
      "Portfolio redirect block",
      "Final services CTA block",
    ],
    namedBanners: [],
  },
  {
    route: "/projects",
    source: "apps/website/src/app/projects/ProjectsPageClient.tsx",
    banner: "ProjectsHero",
    bannerNote: "Projects landing hero preceding search and filter controls.",
    sections: [
      "Breadcrumb",
      "ProjectsFilterSection",
      "ProjectsGridSection",
      "CapabilitiesSection",
      "VeteranBenefitsBanner",
      "ProjectsStatsSection",
      "TestimonialsSection",
      "NextStepsSection",
    ],
    namedBanners: ["VeteranBenefitsBanner", "NextStepsSection"],
  },
  {
    route: "/team",
    source: "apps/website/src/app/team/page.tsx",
    banner: "Custom Team Hero",
    bannerNote:
      "Full-height team hero with photo background and PageNavigation.",
    sections: [
      "Breadcrumb",
      "Team overview",
      "First two department groups",
      "Employee testimonials",
      "Remaining department groups",
      "Company culture",
      "Career growth",
      "Careers CTA",
      "Founder tribute",
      "NextStepsSection",
    ],
    namedBanners: ["NextStepsSection"],
  },
  {
    route: "/testimonials",
    source: "apps/website/src/app/testimonials/page.tsx",
    banner: "Custom Testimonials Hero",
    bannerNote: "Review-focused hero with page stats and review CTA.",
    sections: [
      "PageNavigation",
      "Breadcrumb",
      "Client testimonials section",
      "Why Choose MH section",
      "Trust signals and certifications",
      "Leave review CTA section",
    ],
    namedBanners: ["Leave review CTA"],
  },
  {
    route: "/contact",
    source: "apps/website/src/app/contact/ContactPageClient.tsx",
    banner: "Custom Contact Hero",
    bannerNote:
      "Full-height contact hero with PageNavigation anchored at the base.",
    sections: [
      "Breadcrumb",
      "Quick Contact",
      "PWA one-tap contact strip",
      "Two Pathways",
      "Interactive Map Section",
      "Strategic CTAs Section",
      "Service Areas Section",
    ],
    namedBanners: ["Strategic CTAs Section"],
  },
  {
    route: "/careers",
    source: "apps/website/src/app/careers/CareersPageClient.tsx",
    banner: "Custom Careers Hero",
    bannerNote: "Full-height careers hero with role-focused messaging.",
    sections: [
      "Breadcrumb",
      "Why Work With Us",
      "Benefits and Perks",
      "Employee Testimonials",
      "Veteran Benefits",
      "Open Positions",
      "Application Process",
      "General Application",
      "Career Questions CTA",
      "Accreditations section",
    ],
    namedBanners: [],
  },
  {
    route: "/faq",
    source: "apps/website/src/app/faq/page.tsx",
    banner: "Custom FAQ Hero",
    bannerNote: "FAQ hero with PageNavigation and trust stats.",
    sections: [
      "Breadcrumb",
      "Introduction and trust stats",
      "Category-based FAQ sections",
    ],
    namedBanners: [],
  },
  {
    route: "/resources",
    source: "apps/website/src/app/resources/page.tsx",
    banner: "Inline Resources Hero",
    bannerNote: "Compact in-content hero block above resource cards.",
    sections: [
      "Breadcrumb",
      "Bonding & insurance CTA",
      "QR Code Library CTA",
      "Manuals section",
      "Field forms section",
      "NextStepsSection",
    ],
    namedBanners: ["NextStepsSection"],
  },
  {
    route: "/safety",
    source: "apps/website/src/app/safety/page.tsx",
    banner: "Custom Safety Program Hero",
    bannerNote: "Full-height safety hero focused on EMR and program proof.",
    sections: [
      "Breadcrumb",
      "Credentials",
      "Credential badges",
      "Written safety program",
      "Safety record",
      "Active use evidence",
      "Compliance",
      "Snapshots",
      "Contact CTA",
    ],
    namedBanners: ["PWAInstallCTA button within Snapshots"],
  },
  {
    route: "/public-sector",
    source: "apps/website/src/app/public-sector/PublicSectorFullPage.tsx",
    banner: "Custom Public-Sector Hero",
    bannerNote: "Government-focused hero with veteran-owned positioning.",
    sections: [
      "Breadcrumb",
      "Grant support services",
      "Compliance AlternatingShowcase",
      "Hanford & DOE services",
      "Grant types",
      "InteractiveGrantSelector",
      "Process steps",
      "Government project types",
      "Success factors",
      "Government-project CTA section",
      "Accreditations logo row",
    ],
    namedBanners: [
      "InteractiveGrantSelector",
      "Government-project CTA section",
    ],
  },
  {
    route: "/veterans",
    source: "apps/website/src/app/veterans/page.tsx",
    banner: "Custom Veterans Hero",
    bannerNote:
      "Full-height veterans hero with veteran-owned program messaging.",
    sections: [
      "Breadcrumb",
      "Veteran foundation",
      "Combat veteran discount and screening timeline",
      "Year-round veteran support",
      "Strategic veteran partnerships",
      "Accreditations and certifications",
      "Pathway CTA cards",
    ],
    namedBanners: [],
  },
  {
    route: "/locations",
    source: "apps/website/src/app/locations/page.tsx",
    banner: "Compact Locations Hero",
    bannerNote: "Gradient hero with inline breadcrumbs and market intro copy.",
    sections: ["Locations card grid"],
    namedBanners: [],
  },
  {
    route: "/events",
    source: "apps/website/src/app/events/EventsLandingPageClient.tsx",
    banner: "Events Landing Hero",
    bannerNote: "Sponsored and hosted events hero with three CTA anchors.",
    sections: [
      "Breadcrumb",
      "Smoke n Shine placements",
      "Event photo carousel",
      "Future event pipeline",
    ],
    namedBanners: [],
  },
  {
    route: "/allies",
    source: "apps/website/src/app/allies/page.tsx",
    banner: "Custom Allies Hero",
    bannerNote:
      "Trade partner hero with PageNavigation and relationship-first copy.",
    sections: [
      "Breadcrumb",
      "Why partner with MHC",
      "Trade partner showcase",
      "Vendor application CTA",
      "Accreditations and certifications",
    ],
    namedBanners: ["TradeGroupCarousel"],
  },
];

// ── Logo base64 (used in Puppeteer header templates which need data URLs) ──────
const _logoPath = join(DOCS_DIR, BRAND.logo.color.replace(/^\.\.\//, ""));
let LOGO_COLOR_DATA_URL = "";
try {
  const _logoBuf = await readFile(_logoPath);
  const _logoExt = extname(_logoPath).slice(1).toLowerCase();
  const _logoImageExt = _logoExt === "jpg" ? "jpeg" : _logoExt;
  const _logoMime =
    _logoExt === "svg" ? "image/svg+xml" : `image/${_logoImageExt}`;
  LOGO_COLOR_DATA_URL = `data:${_logoMime};base64,${_logoBuf.toString("base64")}`;
} catch {
  /* logo file not found — header will render without image */
}

// ── BBB Accredited Business seal data URL (SVG preferred, PNG fallback) ───────
const _bbbSvgPath = join(DOCS_DIR, "assets/bbb/bbb-accredited-seal.svg");
const _bbbPngPath = join(DOCS_DIR, "assets/bbb/bbb-accredited-seal.png");
let BBB_LOGO_DATA_URL = "";
try {
  const _bbbSvgBuf = await readFile(_bbbSvgPath);
  BBB_LOGO_DATA_URL = `data:image/svg+xml;base64,${_bbbSvgBuf.toString("base64")}`;
} catch {
  try {
    const _bbbPngBuf = await readFile(_bbbPngPath);
    BBB_LOGO_DATA_URL = `data:image/png;base64,${_bbbPngBuf.toString("base64")}`;
  } catch {
    /* BBB logo not found — footer/template tokens will use brand-config fallback */
  }
}

// ── WA Veteran Owned Business logo data URL (used in footer templates) ───────
const _waVobPath = join(
  ROOT,
  "apps/website/public/images/logo/veteran-owned-business.jpg",
);
let WA_VOB_LOGO_DATA_URL = "";
try {
  const _waVobBuf = readFileSync(_waVobPath);
  WA_VOB_LOGO_DATA_URL = `data:image/jpeg;base64,${_waVobBuf.toString("base64")}`;
} catch {
  /* WA VOB logo not found — footer/template tokens will use brand-config fallback */
}

// ── Travelers Insurance logo base64 (used in Puppeteer footer template) ────
const _travelersPath = join(
  DOCS_DIR,
  "assets/Travelers-logo-2color-Small-600px.png",
);
let TRAVELERS_LOGO_B64 = "";
try {
  const _travelersBuf = await readFile(_travelersPath);
  TRAVELERS_LOGO_B64 = `data:image/png;base64,${_travelersBuf.toString("base64")}`;
} catch {
  /* Travelers logo not found — footer will render without it */
}

const CANONICAL_OWNERSHIP_TAGLINE =
  "Founded 2010, Veteran-Owned Since January 2025";

/**
 * Build a flat token map from the brand config.
 * Every key becomes {{BRAND_KEY}} in templates.
 * Image paths are converted to absolute file:// URLs for Puppeteer.
 */
function buildBrandTokens(brand) {
  const licStr = Object.entries(brand.licenses || {})
    .filter(([, v]) => v)
    .map(([state, num]) => `${state} Lic: ${num}`)
    .join("  ·  ");

  // Helper: convert relative doc paths to base64 data URIs for self-contained HTML.
  // Brand JSON paths are relative to the brands/ directory.
  const resolvePath = (relPath) => {
    if (!relPath) return "";
    const absPath = resolve(BRAND_DIR, relPath);
    try {
      const buf = readFileSync(absPath);
      const ext = extname(absPath).slice(1).toLowerCase();
      const imageExt = ext === "jpg" ? "jpeg" : ext;
      const mime = ext === "svg" ? "image/svg+xml" : `image/${imageExt}`;
      return `data:${mime};base64,${buf.toString("base64")}`;
    } catch {
      // Fallback to file:// URL if file cannot be read
      return pathToFileURL(absPath).href;
    }
  };

  return {
    "{{BRAND_ID}}": brand.id,
    "{{BRAND_COMPANY_NAME}}": brand.companyName,
    "{{BRAND_COMPANY_SHORT}}": brand.companyShort,
    "{{BRAND_TAGLINE}}": brand.tagline,
    "{{BRAND_VETERAN}}": brand.veteranOwned ? CANONICAL_OWNERSHIP_TAGLINE : "",
    "{{BRAND_ADDRESS}}": brand.address,
    "{{BRAND_ADDRESS_STREET}}": brand.addressStreet,
    "{{BRAND_ADDRESS_CITYSTATEZIP}}": brand.addressCityStateZip,
    "{{BRAND_PHONE}}": brand.phone,
    "{{BRAND_WEBSITE}}": brand.website,
    "{{BRAND_EMAIL}}": brand.email,
    "{{BRAND_REVISION_YEAR}}": brand.revisionYear,
    "{{BRAND_REVISION_DATE}}": brand.revisionDate || "",
    "{{BRAND_REVISION_NUMBER}}": brand.revisionNumber || "1",
    "{{BRAND_LICENSE_WA}}": brand.licenses?.WA || "",
    "{{BRAND_LICENSE_OR}}": brand.licenses?.OR || "",
    "{{BRAND_LICENSE_ID}}": brand.licenses?.ID || "",
    "{{BRAND_LICENSES_INLINE}}": licStr,
    "{{BRAND_COLOR_PRIMARY}}": brand.colors.primary,
    "{{BRAND_COLOR_PRIMARY_DARK}}": brand.colors.primaryDark,
    "{{BRAND_COLOR_PRIMARY_DARKER}}": brand.colors.primaryDarker,
    "{{BRAND_COLOR_PRIMARY_LIGHT}}": brand.colors.primaryLight,
    "{{BRAND_COLOR_SECONDARY}}": brand.colors.secondary,
    "{{BRAND_COLOR_SECONDARY_LIGHT}}": brand.colors.secondaryLight,
    "{{BRAND_COLOR_SECONDARY_TEXT}}": brand.colors.secondaryText,
    "{{BRAND_COLOR_BRONZE}}": brand.colors.bronze,
    "{{BRAND_COLOR_BRONZE_LIGHT}}": brand.colors.bronzeLight,
    "{{BRAND_COLOR_BRONZE_DARK}}": brand.colors.bronzeDark,
    "{{BRAND_LOGO_WHITE}}": resolvePath(brand.logo.white),
    "{{BRAND_LOGO_COLOR}}":
      LOGO_COLOR_DATA_URL || resolvePath(brand.logo.color),
    "{{BRAND_LOGO_DARKBG}}": resolvePath(brand.logo.darkBg),
    "{{BRAND_AGC_HORIZONTAL}}": resolvePath(
      brand.partnerLogos?.agcHorizontal || "",
    ),
    "{{BRAND_AGC_STACKED}}": resolvePath(brand.partnerLogos?.agcStacked || ""),
    "{{BRAND_BBB_HORIZONTAL}}":
      BBB_LOGO_DATA_URL || resolvePath(brand.partnerLogos?.bbbHorizontal || ""),
    "{{BRAND_BBB_VERTICAL}}": resolvePath(
      brand.partnerLogos?.bbbVertical || "",
    ),
    "{{BRAND_BBB_SEAL}}":
      BBB_LOGO_DATA_URL || resolvePath(brand.partnerLogos?.bbbSeal || ""),
    "{{BRAND_WA_VOB_LOGO}}":
      WA_VOB_LOGO_DATA_URL ||
      resolvePath(brand.certificationLogos?.waVob || ""),
    "{{BRAND_CHAMBER_PASCO}}": resolvePath(brand.chamberLogos?.pasco || ""),
    "{{BRAND_CHAMBER_RICHLAND}}": resolvePath(
      brand.chamberLogos?.richland || "",
    ),
    "{{BRAND_CHAMBER_KENNEWICK}}": resolvePath(
      brand.chamberLogos?.kennewick || "",
    ),
    "{{BRAND_QR_DASHBOARD}}": resolvePath(brand.qrCodes?.dashboard || ""),
  };
}

const BRAND_TOKENS = buildBrandTokens(BRAND);
const BRAND_LICENSES_INLINE = BRAND_TOKENS["{{BRAND_LICENSES_INLINE}}"];
const BRAND_COLORS = {
  primary: BRAND.colors.primary,
  primaryDark: BRAND.colors.primaryDark,
  secondary: BRAND.colors.secondary,
  secondaryDark: BRAND.colors.secondaryDark,
  secondaryText: BRAND.colors.secondaryText,
};

/** Apply all brand tokens to an HTML string. */
function applyBrandTokens(html) {
  let out = html;
  for (const [token, value] of Object.entries(BRAND_TOKENS)) {
    out = out.replaceAll(token, value);
  }
  return out;
}

function normalizePdfTypography(html) {
  const normalized = String(html)
    .replaceAll(
      '"mendl-sans-dusk", "Mendl Sans Dusk", "Abolition", "Segoe UI", Arial, sans-serif',
      PDF_FONT_STACK_HEADING,
    )
    .replaceAll(
      '"DIN 2014", "Segoe UI", Arial, sans-serif',
      PDF_FONT_STACK_BODY,
    );

  const mendlStyleTag = getPdfMendlStyleTag();
  const materialIconsStyleTag = getPdfMaterialIconsStyleTag();
  const needsMendlStyle =
    !!mendlStyleTag && !normalized.includes('data-pdf-mendl-fonts="true"');
  const needsMaterialStyle =
    !!materialIconsStyleTag &&
    !normalized.includes('data-pdf-material-icons="true"');

  if (!needsMendlStyle && !needsMaterialStyle) {
    return normalized;
  }

  const styleInjection = [
    needsMendlStyle ? mendlStyleTag : "",
    needsMaterialStyle ? materialIconsStyleTag : "",
  ]
    .filter(Boolean)
    .join("\n");

  if (/<\/head>/i.test(normalized)) {
    return normalized.replace(/<\/head>/i, `${styleInjection}\n</head>`);
  }
  return `${styleInjection}\n${normalized}`;
}

function extractPdfTextByPageRange(pdfPath, pageRangeText) {
  if (!pdfPath || !existsSync(pdfPath)) return "";

  const raw = String(pageRangeText || "").trim();
  const match = /^(\d+)(?:\s*-\s*(\d+))?$/.exec(raw);
  if (!match) return "";

  const start = Number(match[1]);
  const end = Number(match[2] || match[1]);
  if (
    !Number.isFinite(start) ||
    !Number.isFinite(end) ||
    start < 1 ||
    end < 1
  ) {
    return "";
  }

  try {
    return execFileSync(
      "pdftotext",
      [
        "-layout",
        "-f",
        String(Math.min(start, end)),
        "-l",
        String(Math.max(start, end)),
        pdfPath,
        "-",
      ],
      { encoding: "utf8" },
    );
  } catch {
    return "";
  }
}

// ── Physical Tab + Tier mapping ────────────────────────────────────────────
/**
 * Map a MISH section number to a physical binder tab reference.
 * MISH 01–33 → numeric tabs "1"–"33"
 * MISH 34–44 → alpha tabs "A"–"K"
 * Section 00 (TOC) returns "TOC".
 */
function sectionToTab(sectionNumber) {
  const n = Number(sectionNumber);
  if (n === 0) return "TOC";
  if (n >= 1 && n <= 33) return String(n);
  // 34→A, 35→B, … 44→K
  return String.fromCodePoint(65 + (n - 34));
}

/**
 * Map a MISH section number to its structural MISH reference code.
 * MISH 0.0         — Table of Contents
 * MISH 1.1–1.3     — Tier 1: Admin Anchor        (MISH 01–03)
 * MISH 2.1–2.6     — Tier 2: Field Cadence       (MISH 04–09)
 * MISH 3.1–3.28    — Tier 3: Engineering         (MISH 10–37)
 * MISH 4.1–4.7     — Tier 4: Specialized Risk    (MISH 38–44)
 * MISH 5.1–5.6     — Tier 5: Program Compliance  (MISH 45–50)
 */
function sectionToMishRef(sectionNumber) {
  const n = Number(sectionNumber);
  if (n === 0) return "0.0";
  if (n <= 3) return `1.${n}`;
  if (n <= 9) return `2.${n - 3}`;
  if (n <= 37) return `3.${n - 9}`;
  if (n <= 44) return `4.${n - 37}`;
  return `5.${n - 44}`;
}

/**
 * Four-tier structural classification.
 * Tier 1 (Admin Anchor):      MISH 01–03  — Senior Management Ownership
 * Tier 2 (Field Cadence):     MISH 04–09  — Planning & Orientation
 * Tier 3 (Engineering):       MISH 10–37  — OSHA 1926/WAC 296-155 Technical Standards
 * Tier 4 (Specialized Risk):  MISH 38–44  — Subcontractors, CDL & Specific Exposures
 */
function sectionToTier(sectionNumber) {
  const n = Number(sectionNumber);
  if (n === 0) return null; // TOC has no tier
  if (n <= 3) {
    return {
      num: 1,
      label: "Admin Anchor",
      desc: "Senior Management Ownership",
    };
  }
  if (n <= 9) {
    return { num: 2, label: "Field Cadence", desc: "Planning & Orientation" };
  }
  if (n <= 37) {
    return { num: 3, label: "Engineering", desc: "OSHA 1926/WAC 296-155" };
  }
  return {
    num: 4,
    label: "Specialized Risk",
    desc: "Subcontractors, CDL & Exposures",
  };
}

// ── TOC Cluster & Callout Configuration ──────────────────────────────────────
/**
 * Operational cluster groupings for the MISH Program Table of Contents.
 * Each entry maps a display name to an inclusive MISH number range [min, max].
 *
 * When safety-manual.json is updated (sections added or removed), generateToc()
 * automatically reflects the changes: sections within a range appear only if
 * they exist in the manifest; sections outside all defined ranges are collected
 * into a catch-all "Additional Programs" cluster appended at the end.
 *
 * To reorganise clusters or rename a heading, update this array and re-run:
 *   npm run docs:generate -- --template toc
 */
const TOC_CLUSTERS = [
  { name: "Program Foundation", min: 1, max: 3 },
  { name: "Field Onboarding & Communication", min: 4, max: 9 },
  { name: "Safety Oversight & Industrial Hygiene", min: 10, max: 19 },
  { name: "Fall & Access Safety", min: 20, max: 24 },
  { name: "Excavation, Confined Spaces & Energy Control", min: 25, max: 27 },
  { name: "Energy & Fire Hazards", min: 28, max: 32 },
  { name: "Motor Vehicles & Heavy Equipment", min: 33, max: 41 },
  { name: "Tools & Materials", min: 42, max: 45 },
  { name: "Program Compliance & Continuity", min: 46, max: 50 },
];

/**
 * MISH item numbers that receive a Tan Leather callout highlight (#BD9264).
 * MISH 21 (Fall Protection) and MISH 48 (Emergency Response Plan) are
 * designated critical safety protocols because fall hazards are the leading
 * cause of construction fatalities (OSHA 1926.502) and emergency response
 * readiness is a mandatory program element for all job sites.
 * Add or remove numbers here to change which entries are highlighted.
 */
const TOC_CALLOUT_ITEMS = new Set([21, 48]);
const TOC_PAGE_1_MAX = 9;
const TOC_PAGE_2_MAX = 23;
const TOC_CONT_PAGE_UNIT_BUDGET = 30;

/**
 * Fallback MISH title map.
 * Used only when safety-manual.json has not yet been generated (i.e., the
 * user has not run `npm run docs:extract`). Keys are section numbers (integer),
 * values are plain-text display titles.
 *
 * Keep this list in sync with the Word source documents so that a standalone
 * `--template toc` run still produces accurate output before extraction.
 */
const FALLBACK_MISH_TITLES = new Map([
  [1, "Safety & Health Program Overview"],
  [2, "Injury-Free Workplace Commitment"],
  [3, "Safety Roles & Responsibilities"],
  [4, "Safety & Health Orientation"],
  [5, "Safety Bulletin Boards & Communication"],
  [6, "Drug & Alcohol Policy & Testing"],
  [7, "Drug & Alcohol Field Operations"],
  [8, "Short-Service Employee Program"],
  [9, "Pre-Job Safety Plan"],
  [10, "Safety & Health Meetings & Inspections"],
  [11, "Accident Reporting & Investigation"],
  [12, "Personal Protective Equipment"],
  [13, "HAZCOM Program"],
  [14, "Industrial Hygiene Program"],
  [15, "Heat Stress"],
  [16, "Respiratory Protection"],
  [17, "Silica Safety Program"],
  [18, "Bloodborne Pathogens"],
  [19, "Housekeeping"],
  [20, "Signs, Signals & Barricades"],
  [21, "Fall Protection"],
  [22, "Scaffolding Use & Handling"],
  [23, "Ladder Use & Care"],
  [24, "Open Floors & Holes"],
  [25, "Excavation, Trenching & Shoring"],
  [26, "Confined Space Entry"],
  [27, "Lockout & Tagout"],
  [28, "Electrical Safety"],
  [29, "Welding, Cutting & Heating"],
  [30, "Flammable & Combustible Liquids"],
  [31, "Fire Prevention"],
  [32, "Compressed Gas & Air"],
  [33, "Motor Vehicle Safety Program"],
  [34, "Distracted Driving & Mobile Device Policy"],
  [35, "Motor Vehicle Records Program"],
  [36, "Equipment Maintenance & Inspection"],
  [37, "Aerial Lifts & Elevated Work Platforms"],
  [38, "Crane & Suspended Work Platforms"],
  [39, "Rigging Procedures"],
  [40, "Forklift & Power Industrial Truck Safety"],
  [41, "Construction Equipment Modification & Fabrication"],
  [42, "Hand & Power Tools"],
  [43, "General Waste Management"],
  [44, "Concrete & Masonry"],
  [45, "Miscellaneous Safety Requirements"],
  [46, "Subcontractor Management Plan"],
  [47, "Insurance Requirements & Contractual Risk Transfer"],
  [48, "Emergency Response Plan"],
  [49, "Incident Investigation & Root-Cause Analysis"],
  [50, "Return-to-Work Program"],
]);

/**
 * Render one <li> entry for a single MISH section.
 * Applies the .callout modifier for items in TOC_CALLOUT_ITEMS.
 * Includes MISH structural reference for binder navigation.
 */
function buildTocEntryHtml(num, title) {
  const code = `MISH ${String(num).padStart(2, "0")}`;
  const mishRef = sectionToMishRef(num);
  const displayTitle = normalizeTocTitle(title);
  const isCallout = TOC_CALLOUT_ITEMS.has(num);
  const cls = isCallout ? "mish-entry callout" : "mish-entry";
  return (
    `<li class="${cls}">` +
    `<span class="mish-code">${escapeHtml(code)}</span>` +
    `<span class="mish-wbs">MISH ${escapeHtml(mishRef)}</span>` +
    `<span class="mish-title">${escapeHtml(displayTitle)}</span>` +
    `</li>`
  );
}

/**
 * Build a TOC entry for a form. Forms are listed by ID and title.
 * Forms are typically in the appendix rather than the main section numbering.
 */
function buildTocFormEntryHtml(formId, formTitle) {
  const displayTitle = normalizeTocTitle(formTitle);
  // Convert form ID to FORM XX numbering (e.g., MISH 01 -> FORM 01)
  const formNum = String(formId || "").match(/\d+/)?.[0] || "";
  const formCode = formNum
    ? `FORM ${String(formNum).padStart(2, "0")}`
    : formId;
  return (
    `<li class="mish-entry mish-form">` +
    `<span class="mish-code">${escapeHtml(formCode)}</span>` +
    `<span class="mish-wbs"></span>` +
    `<span class="mish-title">${escapeHtml(displayTitle)}</span>` +
    `</li>`
  );
}

function buildTocFormCode(form) {
  const rawId = String(form?.id || "").trim();
  if (!rawId) return "FORM";

  const mishMatch = /^MISH\s*-?\s*(\d{1,2})$/i.exec(rawId);
  if (mishMatch) {
    return `FORM ${String(Number(mishMatch[1])).padStart(2, "0")}`;
  }

  const explicitFormMatch = /^FORM\s+(.+)$/i.exec(rawId);
  if (explicitFormMatch) {
    return `FORM ${explicitFormMatch[1].trim().toUpperCase()}`;
  }

  return rawId.toUpperCase();
}

function compareFormsForToc(a, b) {
  const rank = (form) => {
    const id = String(form?.id || "").trim();
    const mishMatch = /^MISH\s*-?\s*(\d{1,2})$/i.exec(id);
    if (mishMatch)
      return { bucket: 0, numeric: Number(mishMatch[1]), text: id };

    const formMatch = /^FORM\s+(.+)$/i.exec(id);
    if (formMatch) {
      const numeric = Number(String(formMatch[1]).match(/\d+/)?.[0] || NaN);
      return {
        bucket: 1,
        numeric: Number.isFinite(numeric) ? numeric : Number.POSITIVE_INFINITY,
        text: id,
      };
    }

    return { bucket: 2, numeric: Number.POSITIVE_INFINITY, text: id };
  };

  const left = rank(a);
  const right = rank(b);
  if (left.bucket !== right.bucket) return left.bucket - right.bucket;
  if (left.numeric !== right.numeric) return left.numeric - right.numeric;
  return left.text.localeCompare(right.text, undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

function buildTocSectionFormsMap(forms) {
  const map = new Map();
  for (const form of forms) {
    const targets = resolveMishSectionTargets(form?.manualSection);
    for (const target of targets) {
      if (!map.has(target.numeric)) {
        map.set(target.numeric, []);
      }
      map.get(target.numeric).push(form);
    }
  }

  for (const [sectionNum, sectionForms] of map.entries()) {
    const deduped = [];
    const seenIds = new Set();
    for (const form of sectionForms) {
      const key = String(form?.id || form?.slug || "")
        .trim()
        .toLowerCase();
      if (!key || seenIds.has(key)) continue;
      seenIds.add(key);
      deduped.push(form);
    }
    deduped.sort(compareFormsForToc);
    map.set(sectionNum, deduped);
  }

  return map;
}

function normalizeTocTitle(value) {
  const text = String(value || "").trim();
  if (!text) return text;

  const acronyms = new Set([
    "app",
    "bbb",
    "cfr",
    "coi",
    "ems",
    "epa",
    "jha",
    "jsa",
    "mish",
    "mvr",
    "osha",
    "ppe",
    "sds",
    "wac",
  ]);

  const lowerWords = new Set([
    "a",
    "an",
    "and",
    "as",
    "at",
    "by",
    "for",
    "from",
    "in",
    "of",
    "on",
    "or",
    "the",
    "to",
    "via",
    "with",
  ]);

  const words = text.toLowerCase().split(/\s+/);
  return words
    .map((word, index) => {
      if (acronyms.has(word)) return word.toUpperCase();
      if (index > 0 && lowerWords.has(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

/**
 * Render one <div class="cluster"> block.
 * Empty clusters (no live sections) are omitted.
 */
function buildClusterHtml(clusterName, nums, titleMap, formsMap = null) {
  if (nums.length === 0) return "";
  const rows = [];

  for (const n of nums) {
    const title = titleMap.get(n) || `Section ${n}`;
    rows.push(buildTocEntryHtml(n, title));

    // Add any forms corresponding to this section
    if (formsMap && formsMap.has(n)) {
      const sectionForms = formsMap.get(n);
      for (const form of sectionForms) {
        rows.push(buildTocFormEntryHtml(buildTocFormCode(form), form.title));
      }
    }
  }

  return (
    `<div class="cluster">` +
    `<h2 class="cluster-head">${escapeHtml(clusterName)}</h2>` +
    `<ul class="mish-list">${rows.join("")}</ul>` +
    `</div>`
  );
}

/**
 * Build the full {{TOC_CLUSTERS_HTML}} block from live section data.
 *
 * Algorithm:
 *  1. Walk TOC_CLUSTERS in order; collect section numbers in each range that
 *     are present in presentNums and render a cluster div.
 *  2. Any section numbers not covered by any defined cluster range are
 *     collected into a trailing "Additional Programs" cluster so that newly
 *     added MISH items are never silently dropped from the TOC.
 *
 * @param {Map<number, string>} titleMap   MISH number → display title
 * @param {Set<number>}  presentNums       Section numbers present in manifest
 * @returns {string} HTML injected into {{TOC_CLUSTERS_HTML}}
 */
function buildTocClustersHtml(titleMap, presentNums, formsMap = null) {
  const parts = [];
  const assignedNums = new Set();

  for (const cluster of TOC_CLUSTERS) {
    const nums = [];
    for (let n = cluster.min; n <= cluster.max; n++) {
      if (presentNums.has(n)) {
        nums.push(n);
        assignedNums.add(n);
      }
    }
    const html = buildClusterHtml(cluster.name, nums, titleMap, formsMap);
    if (html) parts.push(html);
  }

  // Catch-all: sections outside every defined range (future additions)
  const overflow = [...presentNums]
    .filter((n) => !assignedNums.has(n))
    .sort((a, b) => a - b);
  const overflowHtml = buildClusterHtml(
    "Additional Programs",
    overflow,
    titleMap,
    formsMap,
  );
  if (overflowHtml) parts.push(overflowHtml);

  return parts.join("\n");
}

function findTocClusterNameForSection(sectionNum) {
  const cluster = TOC_CLUSTERS.find(
    (entry) => sectionNum >= entry.min && sectionNum <= entry.max,
  );
  return cluster?.name || "Additional Programs";
}

function splitTocNumsByFlow(presentNums, formsMap = null) {
  const page1 = new Set();
  const page2 = new Set();
  const continuationPages = [new Set()];

  let currentPageIndex = 0;
  let currentPageUnits = 0;
  let currentCluster = "";

  const remainingNums = [...presentNums]
    .filter((n) => n > TOC_PAGE_2_MAX)
    .sort((a, b) => a - b);

  for (const n of presentNums) {
    if (n <= TOC_PAGE_1_MAX) {
      page1.add(n);
      continue;
    }
    if (n <= TOC_PAGE_2_MAX) {
      page2.add(n);
    }
  }

  for (const n of remainingNums) {
    const clusterName = findTocClusterNameForSection(n);
    const headingUnits = clusterName === currentCluster ? 0 : 1;
    const formCount = formsMap?.get(n)?.length || 0;
    const entryUnits = 1 + formCount;
    const neededUnits = headingUnits + entryUnits;

    if (
      currentPageUnits > 0 &&
      currentPageUnits + neededUnits > TOC_CONT_PAGE_UNIT_BUDGET
    ) {
      currentPageIndex += 1;
      continuationPages[currentPageIndex] = new Set();
      currentPageUnits = 0;
      currentCluster = "";
    }

    continuationPages[currentPageIndex].add(n);
    currentPageUnits += neededUnits;
    currentCluster = clusterName;
  }

  const page3 = continuationPages[0] || new Set();
  const extraPages = continuationPages.slice(1).filter((page) => page.size > 0);

  return { page1, page2, page3, extraPages };
}

function buildTocContinuationPageHtml(pageNumber, clustersHtml) {
  return [
    `<div class="toc-page toc-page--cont">`,
    `  <div class="toc-ribbon" aria-hidden="true"></div>`,
    `  <div class="toc-content">`,
    `    <header class="toc-header toc-header--cont">`,
    `      <p class="toc-cont-mark">{{BRAND_COMPANY_SHORT}}<span class="dot">&#8226;</span>MISH Program Table of Contents (continued)</p>`,
    `      <p class="toc-cont-page">Page ${pageNumber}</p>`,
    `    </header>`,
    `    <main class="toc-body">${clustersHtml}</main>`,
    `    <footer class="footer">`,
    `      <div class="contact">`,
    `        <div class="label">Company Contact</div>`,
    `        <div class="name">{{BRAND_COMPANY_NAME}}</div>`,
    `        {{BRAND_ADDRESS_STREET}}<br />`,
    `        {{BRAND_ADDRESS_CITYSTATEZIP}}<br />`,
    `        {{BRAND_PHONE}} &middot; {{BRAND_WEBSITE}}`,
    `        <div class="licenses">{{BRAND_LICENSES_INLINE}}</div>`,
    `      </div>`,
    `      <div class="trust">`,
    `        <div class="label">Accreditation and Trust</div>`,
    `        <div class="logos">`,
    `          <img class="logo-agc" src="{{BRAND_AGC_HORIZONTAL}}" alt="AGC membership" />`,
    `          <img class="logo-bbb" src="{{BRAND_BBB_SEAL}}" alt="BBB accredited business" />`,
    `          <img class="logo-vob" src="{{BRAND_WA_VOB_LOGO}}" alt="Washington certified veteran owned business" />`,
    `        </div>`,
    `        <div class="chambers" aria-label="Chamber of Commerce memberships">`,
    `          <img src="{{BRAND_CHAMBER_PASCO}}" alt="Pasco Chamber of Commerce member" />`,
    `          <img src="{{BRAND_CHAMBER_KENNEWICK}}" alt="Tri-City Regional Chamber of Commerce member" />`,
    `          <img src="{{BRAND_CHAMBER_RICHLAND}}" alt="Richland Chamber of Commerce member" />`,
    `        </div>`,
    `      </div>`,
    `    </footer>`,
    `    <div class="veteran-strip" aria-label="Veteran owned business statement">`,
    `      Veteran-Owned <span class="sep">&#9733;</span> Safety-Driven <span class="sep">&#9733;</span> Built on Quality, Backed by Trust`,
    `    </div>`,
    `  </div>`,
    `</div>`,
  ].join("\n");
}

// ── Puppeteer header / footer templates ────────────────────────────────────
/**
 * Build the per-section running header HTML.
 * Puppeteer injects this into the physical top margin of EVERY printed page.
 * Logo must be a data URL since the header renders in an isolated context.
 *
 * Layout (4 zones, left → right):
 *   ZONE 1  LEFT   — MISH number + MISH reference + title
 *   ZONE 2  CENTER — MHC logo
 *   ZONE 3  RIGHT  — Page bubble (Pg X / Y) + binder tab reference + revision
 *   ZONE 4  FAR R  — Section QR code (thumb-accessible scan target)
 */
function buildSectionHeaderHtml(
  sectionNum,
  sectionTitle,
  qrDataUrl,
  options = {},
) {
  const manualKind = options.manualKind === "handbook" ? "handbook" : "safety";
  const isHandbookHeader = manualKind === "handbook";
  const titleShort =
    sectionTitle.length > 38 ? sectionTitle.slice(0, 35) + "…" : sectionTitle;
  const mishRef = sectionToMishRef(sectionNum);
  const structureLabel = isHandbookHeader
    ? `HANDBOOK SECTION\u00a0${sectionNum}`
    : `MISH\u00a0${sectionNum}\u00a0\u2014\u00a0MISH\u00a0${mishRef}`;
  const qrLabel = isHandbookHeader
    ? `HB\u00a0${sectionNum}`
    : `MISH\u00a0${sectionNum}`;
  const font = PDF_FONT_STACK_BODY;
  const pad = "padding:0 0.55in 0 1.25in";

  const qrMark = qrDataUrl
    ? [
        `<div style="display:flex;flex-direction:column;align-items:center;gap:2pt;`,
        `flex:0 0 auto;padding-right:8pt;align-self:stretch;justify-content:flex-end;">`,
        `<img src="${qrDataUrl}" alt="Scan section ${sectionNum}"`,
        ` style="width:40pt;height:40pt;border-radius:2pt;`,
        `border:0.5pt solid ${BRAND_COLORS.secondary};display:block;" />`,
        `<span style="font-size:5pt;font-weight:700;color:${BRAND_COLORS.secondaryText};`,
        `text-transform:uppercase;letter-spacing:0.06em;">${qrLabel}</span>`,
        `</div>`,
      ].join("")
    : "";

  const rightLogoMark = LOGO_COLOR_DATA_URL
    ? [
        `<div style="display:flex;flex-direction:column;align-items:center;gap:2pt;`,
        `flex:0 0 auto;padding-left:6pt;justify-content:center;">`,
        `<img src="${LOGO_COLOR_DATA_URL}" alt="MH Construction"`,
        ` style="height:40pt;max-width:114pt;width:auto;object-fit:contain;display:block;image-rendering:-webkit-optimize-contrast;" />`,
        `</div>`,
      ].join("")
    : [
        `<div style="display:flex;align-items:center;justify-content:center;`,
        `flex:0 0 auto;padding-left:6pt;">`,
        `<span style="font-size:10pt;font-weight:900;color:${BRAND_COLORS.primary};letter-spacing:0.04em;">MHC</span>`,
        `</div>`,
      ].join("");

  return [
    `<div style="width:100%;background:linear-gradient(180deg,#ffffff 0%,#f7f8f7 100%);border-bottom:1.5pt solid ${BRAND_COLORS.secondary};`,
    `${pad};height:0.75in;display:flex;align-items:flex-start;position:relative;`,
    `justify-content:space-between;font-family:${font};padding-top:6pt;`,
    `-webkit-print-color-adjust:exact;print-color-adjust:exact;box-sizing:border-box;gap:8pt;overflow:hidden;">`,

    // ZONE 1 — section QR code at far-left edge
    qrMark,

    // ZONE 2 — MISH structural reference + title
    `<div style="flex:1;min-width:0;display:flex;flex-direction:column;justify-content:flex-start;overflow:hidden;gap:2pt;">`,
    `<span style="display:block;align-self:flex-start;color:${BRAND_COLORS.secondaryText};`,
    `font-size:7.2pt;font-weight:700;letter-spacing:0.11em;text-transform:uppercase;`,
    `line-height:1.1;white-space:nowrap;">`,
    structureLabel,
    `</span>`,
    `<span style="font-size:11pt;font-weight:900;line-height:1.12;letter-spacing:-0.01em;`,
    `color:${BRAND_COLORS.primaryDark};text-shadow:0 0 0.01pt rgba(18,35,27,0.2);`,
    `white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${titleShort}</span>`,
    `</div>`,

    // ZONE 3 — MH logo at far right for additional header breathing room
    rightLogoMark,

    `</div>`,
  ].join("");
}

/**
 * Build the per-section footer HTML rendered by Puppeteer on EVERY printed page.
 *
 * UX REFRESH 2026 — clean, cover-aligned footer hierarchy:
 *   Tier 1: Page chip · trademark line · revision
 *   Section QR remains in the header only.
 *
 * Styles are inlined because Puppeteer's footer template runs in an isolated
 * document context with no access to components.css.
 */
function buildSectionFooterHtml(sectionNum, revNum, revDate, options = {}) {
  const manualKind = options.manualKind === "handbook" ? "handbook" : "safety";
  const isHandbookFooter = manualKind === "handbook";
  const font = PDF_FONT_STACK_BODY;
  const tabRef = sectionToTab(sectionNum);
  const centerMeta = isHandbookFooter
    ? `SECTION\u00a0${sectionNum}\u00a0\u00b7\u00a0REV\u00a0${revNum}\u00a0\u00b7\u00a0${revDate}`
    : `TAB\u00a0${tabRef}\u00a0\u00b7\u00a0REV\u00a0${revNum}\u00a0\u00b7\u00a0${revDate}`;
  const compactContact = `${BRAND.companyName} \u00b7 ${BRAND.phone} \u00b7 ${BRAND.website}`;
  return [
    `<div style="width:100%;height:100%;font-family:${font};`,
    `box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact;`,
    `display:flex;flex-direction:column;justify-content:flex-end;">`,
    `<div style="width:100%;box-sizing:border-box;border-top:1.5pt solid ${BRAND_COLORS.primary};padding-top:4pt;">`,
    `<div style="width:100%;padding:0 0.75in 0 1.25in;box-sizing:border-box;display:grid;grid-template-columns:minmax(0,1fr) auto auto;align-items:baseline;gap:6pt;line-height:1.1;">`,
    `<span style="font-size:6.2pt;color:${BRAND_COLORS.secondaryText};white-space:nowrap;letter-spacing:0.01em;">`,
    `<span style="font-weight:800;color:${BRAND_COLORS.primaryDark};letter-spacing:0.04em;">MH CONSTRUCTION, INC.</span>`,
    `\u00a0\u00b7\u00a0${compactContact.replace("MH Construction, Inc. \u00b7 ", "")}`,
    `</span>`,
    `<span style="font-size:5.9pt;font-weight:700;color:${BRAND_COLORS.secondaryText};white-space:nowrap;letter-spacing:0.01em;">`,
    centerMeta,
    `</span>`,
    `<span style="font-size:7pt;font-weight:800;color:${BRAND_COLORS.primaryDark};white-space:nowrap;">`,
    `Page\u00a0<span class="pageNumber"></span>\u00a0of\u00a0<span class="totalPages"></span>`,
    `</span>`,
    `</div>`,
    `</div>`,
    `</div>`,
  ].join("");
}

function buildQrDataUrl(url) {
  return QRCode.toDataURL(url, {
    type: "image/png",
    width: 300,
    margin: 1,
    color: {
      dark: BRAND.colors.primary,
      light: "#ffffff",
    },
    errorCorrectionLevel: "M",
  });
}

// ── Helpers ───────────────────────────────────────────────────────────────────
async function ensureDir(dir) {
  await mkdir(dir, { recursive: true });
}

/**
 * Render an HTML string to a PDF using Puppeteer (via temp file).
 * @param {string} html      — HTML string (already token-substituted)
 * @param {string} pdfPath   — absolute path for the output PDF
 * @param {object} pageOpts  — Puppeteer PDF options override
 * @param {string} [tmpName] — optional explicit temp file name
 */
async function renderHtmlToPdf(
  html,
  pdfPath,
  pageOpts = {},
  tmpName = "_tmp_render.html",
) {
  const tmpHtml = join(DOCS_DIR, tmpName);
  const normalizedHtml = normalizePdfTypography(html);
  await writeFile(tmpHtml, normalizedHtml, "utf-8");
  await renderPdf(tmpHtml, pdfPath, pageOpts);
  if (!process.env.DEBUG_KEEP_HTML) unlinkSync(tmpHtml);
}

/**
 * Measure fillable-field rectangles directly from the HTML template so
 * AcroForm widget placement is pixel-accurate without manual tuning.
 *
 * Markers in HTML:
 *   - `<elem data-field="name" data-field-type="text|multiline">`
 *       Element's bounding rect becomes the widget rect. For
 *       single-line fields inside `.field-cell`, the convention is
 *       to mark the inner `.field-line-stub` (which already sits
 *       above the underline). For multi-line, mark the textarea
 *       container (e.g. `.narrative-cell`).
 *   - `<elem data-check="name">`
 *       Element's bounding rect becomes the checkbox rect — typical
 *       on the visible `.check-box` square.
 *   - `<td data-cell="name">`
 *       Table cell becomes a single-line text widget.
 *
 * The DOM is walked, every `.sheet` element is treated as one PDF
 * page (in DOM order), and each field's rect is reported in inches
 * relative to that sheet's top-left corner.
 *
 * Returns: { fields: [{ name, type, page, x, y, w, h }, ...] }
 *   - page: 0-based PDF page index
 *   - x, y, w, h: inches (y measured from top of page)
 */
async function extractFieldRectsFromHtml(html, tmpName = "_tmp_measure.html") {
  const tmpHtml = join(DOCS_DIR, tmpName);
  const normalizedHtml = normalizePdfTypography(html);
  await writeFile(tmpHtml, normalizedHtml, "utf-8");
  const browser = await getBrowser();
  const page = await browser.newPage();
  // Match Puppeteer Letter PDF default: 8.5×11in @ 96dpi = 816×1056 CSS px.
  await page.setViewport({ width: 816, height: 1056, deviceScaleFactor: 1 });
  try {
    await page.goto(pathToFileURL(tmpHtml).toString(), {
      waitUntil: "load",
      timeout: 60000,
    });
    const fields = await page.evaluate(() => {
      const PX_PER_IN = 96;
      const sheets = Array.from(document.querySelectorAll(".sheet"));
      const sheetRects = sheets.map((s) => s.getBoundingClientRect());
      const out = [];

      const sheetIndexFor = (el) => {
        for (let i = 0; i < sheets.length; i++) {
          if (sheets[i].contains(el)) return i;
        }
        return -1;
      };

      const pushRect = (el, name, type) => {
        const idx = sheetIndexFor(el);
        if (idx === -1) return;
        const er = el.getBoundingClientRect();
        const sr = sheetRects[idx];
        out.push({
          name,
          type,
          page: idx,
          x: (er.left - sr.left) / PX_PER_IN,
          y: (er.top - sr.top) / PX_PER_IN,
          w: er.width / PX_PER_IN,
          h: er.height / PX_PER_IN,
        });
      };

      document.querySelectorAll("[data-field]").forEach((el) => {
        const t = el.getAttribute("data-field-type") || "text";
        pushRect(el, el.getAttribute("data-field"), t);
      });
      document.querySelectorAll("[data-check]").forEach((el) => {
        pushRect(el, el.getAttribute("data-check"), "check");
      });
      document.querySelectorAll("[data-cell]").forEach((el) => {
        pushRect(el, el.getAttribute("data-cell"), "cell");
      });
      return out;
    });
    return fields;
  } finally {
    await page.close().catch(() => {});
    if (!process.env.DEBUG_KEEP_HTML) unlinkSync(tmpHtml);
  }
}

/**
 * Overlay AcroForm fields onto a rendered PDF using rectangles
 * measured from the source HTML by `extractFieldRectsFromHtml`.
 * Widgets are transparent (border 0, white border color) so the
 * visible chrome (underlines, table borders, check squares) comes
 * from the template — not from the PDF annotation layer.
 */
async function applyMeasuredFieldsToPdf(pdfPath, fields) {
  const pdfBytes = await readFile(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();
  const pages = pdfDoc.getPages();
  const font = await embedPdfMendlBodyFont(pdfDoc);
  const inch = (n) => n * 72;
  const widgetInsets = {
    text: { left: 0.015, right: 0.015, top: 0.01, bottom: 0.055 },
    cell: { left: 0.01, right: 0.01, top: 0.015, bottom: 0.015 },
    multiline: { left: 0.02, right: 0.02, top: 0.02, bottom: 0.02 },
  };
  const transparent = {
    borderColor: rgb(1, 1, 1),
    borderWidth: 0,
  };
  const textStyle = { ...transparent, textColor: rgb(0.07, 0.14, 0.11), font };

  for (const f of fields) {
    const page = pages[f.page];
    if (!page) continue;
    const ph = page.getHeight();
    const x = inch(f.x);
    const y = ph - inch(f.y) - inch(f.h);
    const w = inch(f.w);
    const h = inch(f.h);
    if (f.type === "check") {
      const cb = form.createCheckBox(f.name);
      // Checkboxes render their own visible border so they appear
      // consistently across PDF viewers without relying on the
      // underlying HTML border (which may be obscured by the widget
      // background fill in some renderers).
      cb.addToPage(page, {
        x,
        y,
        width: w,
        height: h,
        borderColor: rgb(0.07, 0.14, 0.11),
        borderWidth: 0.7,
      });
    } else {
      const tf = form.createTextField(f.name);
      if (f.type === "multiline") tf.enableMultiline();
      const inset = widgetInsets[f.type] || widgetInsets.text;
      const widgetX = x + inch(inset.left);
      const widgetW = Math.max(8, w - inch(inset.left + inset.right));
      const widgetTop = f.y + inset.top;
      const widgetH = Math.max(
        f.type === "multiline" ? 18 : 8.64,
        h - inch(inset.top + inset.bottom),
      );
      tf.addToPage(page, {
        ...textStyle,
        x: widgetX,
        y: ph - inch(widgetTop) - widgetH,
        width: widgetW,
        height: widgetH,
      });
      tf.setFontSize(f.type === "multiline" ? 10 : 9);
    }
  }

  form.updateFieldAppearances(font);
  await writeFile(pdfPath, await pdfDoc.save());
}

/**
 * Overlay AcroForm fields on the generated letterhead PDF so it is truly
 * fillable in standard PDF viewers (Acrobat, Preview, browser PDF viewers).
 */
async function addFillableFieldsToLetterhead(pdfPath) {
  const pdfBytes = await readFile(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();
  const pages = pdfDoc.getPages();
  const page = pages[0];
  const page2 = pages[1]; // continuation page
  const font = await embedPdfMendlBodyFont(pdfDoc);

  const pageHeight = page.getHeight();
  const inch = (n) => n * 72;
  const yFromTop = (topIn, heightIn) =>
    pageHeight - inch(topIn) - inch(heightIn);

  // Single-line fields: transparent overlay
  const lineStyle = {
    borderColor: rgb(1, 1, 1),
    borderWidth: 0,
    textColor: rgb(0.07, 0.14, 0.11),
    font,
  };
  // Body textarea: fully transparent overlay too
  const bodyStyle = {
    borderColor: rgb(1, 1, 1),
    borderWidth: 0,
    textColor: rgb(0.07, 0.14, 0.11),
    font,
  };

  // Keep single-line widgets slightly above the HTML bottom border so
  // the visual underline comes from the template, not PDF annotations.
  const singleLineInsetBottom = 0.055; // inches

  const addField = (name, xIn, topIn, wIn, hIn, opts = {}) => {
    const targetPage = opts.page || page;
    const field = form.createTextField(name);
    if (opts.multiline) field.enableMultiline();
    const widgetH = opts.multiline
      ? hIn
      : Math.max(0.12, hIn - singleLineInsetBottom);
    field.addToPage(targetPage, {
      ...(opts.multiline ? bodyStyle : lineStyle),
      x: inch(xIn),
      y: yFromTop(topIn, widgetH),
      width: inch(wIn),
      height: inch(widgetH),
    });
    // Lock font size so fields don't auto-scale to fit the box (which
    // otherwise renders body text huge until the field is filled).
    // Must run AFTER addToPage so the /DA entry exists.
    field.setFontSize(opts.fontSize ?? (opts.multiline ? 11 : 10));
    return field;
  };

  // Table geometry — derived directly from HTML table layout:
  //   body-area top: 2.55in from page top
  //   left margin:   1.15in from page left
  //   6 columns × 1.05in = 6.30in wide, zero cell padding
  //   Row heights: date/to/addr/from/subject = 0.42in, body = 4.35in
  //   Label height offset (6.6pt + 2pt margin ≈ 0.16in)

  const bTop = 2.55; // body-area top (in)
  const rH = 0.42; // standard row height
  const bH = 4.35; // body row height (fills page down to footer)
  const fH = 0.24; // single-line field height
  const lOff = 0.16; // label offset (label margin-top 4pt + label height ~8pt)

  const rowDate = bTop;
  const rowTo = bTop + rH;
  const rowAddr = bTop + rH * 2;
  const rowFrom = bTop + rH * 3;
  const rowSubject = bTop + rH * 4;
  const rowBody = bTop + rH * 5;

  // x positions: cols 1-3 = left half, cols 4-6 = right half, cols 5-6 = date
  const colL = 1.15; // left half
  const colR = 1.15 + 3 * 1.05; // right half  = 4.30
  const colW2 = 3 * 1.05; // half width  = 3.15
  const dateX = 1.15 + 4 * 1.05; // date x      = 5.35

  addField("lh.date", dateX, rowDate + lOff, 2.1, fH);
  addField("lh.toName", colL, rowTo + lOff, colW2, fH);
  addField("lh.toOrg", colR, rowTo + lOff, colW2, fH);
  addField("lh.toAddress", colL, rowAddr + lOff, colW2, fH);
  addField("lh.toCityStateZip", colR, rowAddr + lOff, colW2, fH);
  addField("lh.from", colL, rowFrom + lOff, 6.3, fH);
  addField("lh.subject", colL, rowSubject + lOff, colW2, fH);
  addField("lh.jobBid", colR, rowSubject + lOff, colW2, fH);
  addField("lh.body", colL, rowBody + 0.04, 6.3, bH - 0.08, {
    multiline: true,
  });

  // Continuation page body field — sized to the .cont-body region in
  // safety-manual-letterhead.html (top: 1.10in, left: 1.15in,
  // right: 1.05in (→ width 6.30in), bottom: 2.10in → height 7.80in).
  if (page2) {
    addField("lh.body2", 1.15, 1.1, 6.3, 7.8, {
      multiline: true,
      page: page2,
    });
  }

  form.updateFieldAppearances(font);
  const outBytes = await pdfDoc.save();
  await writeFile(pdfPath, outBytes);
}

// ── Schema-driven fillable form renderer ─────────────────────────────────────
/**
 * Schema spec for `forms.fillable` in `documents/forms/forms-manifest.json`:
 *
 *   "fillable": {
 *     "namespace": "form02c",          // optional; default = lowercased,
 *                                       // alphanumeric form id
 *     "pages": [
 *       {
 *         "kind": "first",              // "first" (identity+header chrome)
 *                                       // or "cont" (continuation header)
 *         "title": "Incident / Accident Report (continued)",  // cont only
 *         "pageLabel": "Page 2",        // cont only
 *         "sections": [ … section objects … ]
 *       },
 *       …
 *     ]
 *   }
 *
 * Section types (all optional unless noted):
 *
 *   { type: "refNote", html: "…inline html allowed…" }
 *
 *   { type: "checkGrid", title, subtitle?, columns: 2|3|4|6,
 *     items: [ { name, label }, … ] }
 *
 *   { type: "fieldGrid", title?, columns: 1|2|3|4|6,
 *     items: [ { name, label, multiline?: bool }, … ] }
 *
 *   { type: "narrative", title?, subtitle?, name, height?: "1.55in" }
 *
 *   { type: "dataTable", title, name,                 // table cells = text
 *     columns: [ { header, width? }, … ],             // header rendered
 *     rows: number }                                  // empty fillable rows
 *
 *   { type: "regTable", title, name,                  // mixed prefill+check
 *     columns: [ { header, width? }, … ],             // last col = check
 *     rows: [ { cells: [str,str,…], check: "rN" } ] }
 *
 *   { type: "signatures", title?, refNote?,
 *     blocks: [ { role, name, wide?: bool }, … ] }
 *
 * Field names emitted in HTML are `${namespace}.${name}` (or the literal
 * `name` if it already contains a dot). The existing
 * `extractFieldRectsFromHtml` + `applyMeasuredFieldsToPdf` pipeline picks
 * them up unchanged.
 */

function deriveFormNamespace(formEntry) {
  if (formEntry?.fillable?.namespace) return formEntry.fillable.namespace;
  const id = String(formEntry?.id || "form").toLowerCase();
  return id.replaceAll(/[^a-z0-9]/g, "");
}

function formIdEquals(formEntry, value) {
  return String(formEntry?.id || "").toUpperCase() === value;
}

function isHandbookForm01(formEntry) {
  return formIdEquals(formEntry, "HANDBOOK-FORM-01");
}

function isHandbookForm02(formEntry) {
  return formIdEquals(formEntry, "HANDBOOK-FORM-02");
}

function isHandbookForm03(formEntry) {
  return formIdEquals(formEntry, "HANDBOOK-FORM-03");
}

function isHandbookForm04(formEntry) {
  return formIdEquals(formEntry, "HANDBOOK-FORM-04");
}

function isHandbookForm05(formEntry) {
  return formIdEquals(formEntry, "HANDBOOK-FORM-05");
}

function isHandbookForm06(formEntry) {
  return formIdEquals(formEntry, "HANDBOOK-FORM-06");
}

function isHandbookForm07(formEntry) {
  return formIdEquals(formEntry, "HANDBOOK-FORM-07");
}

function isHandbookForm08(formEntry) {
  return formIdEquals(formEntry, "HANDBOOK-FORM-08");
}

function isHandbookFormEntry(formEntry) {
  const id = String(formEntry?.id || "").toUpperCase();
  return id.startsWith("HANDBOOK-FORM-");
}

function isMishFormEntry(formEntry) {
  const id = String(formEntry?.id || "").toUpperCase();
  return /^MISH\s+\d{1,2}$/.test(id);
}

function buildHandbookForm04Pages(formEntry) {
  const formTitle =
    formEntry?.title || "Temporary Work From Home Application/Agreement";
  return [
    {
      kind: "first",
      sections: [
        {
          type: "fieldGrid",
          title: formTitle,
          columns: 4,
          items: [
            { name: "application.date", label: "Date" },
            { name: "application.companyName", label: "Company Name" },
            { name: "application.employeeName", label: "Employee Name" },
            { name: "application.employeeTitle", label: "Employee Title" },
            {
              name: "application.workLocation",
              label: "Requested Work Location",
            },
            {
              name: "application.officeSupplies",
              label: "Requested Office Supplies",
            },
            {
              name: "application.remotePhone",
              label: "Phone Number While Working Remote",
            },
            { name: "application.startDate", label: "Requested Start Date" },
          ],
        },
        {
          type: "narrative",
          title: "Requested Work Schedule and Reason(s) for Request",
          name: "application.scheduleAndReasons",
          height: "0.9in",
        },
        {
          type: "htmlBlock",
          title: "Work From Home Commitment",
          html: "<p>By signing this application, I affirm my commitment to adhere to all company policies, including those governing electronics use and remote work.</p>",
        },
        {
          type: "signatures",
          title: "Temporary Work From Home Approval Sign-Off",
          manualSignOnly: true,
          layout: "two-up",
          blocks: [
            {
              role: "Employee",
              name: "sign.employee",
              signatureLabel: "Acknowledgement Signature",
            },
            {
              role: "Supervisor / Manager",
              name: "sign.supervisor",
              signatureLabel: "Approval Signature",
            },
          ],
        },
        {
          type: "checkGrid",
          title: "Decision",
          columns: 2,
          items: [
            { name: "decision.approved", label: "Approved" },
            { name: "decision.denied", label: "Denied" },
          ],
        },
        {
          type: "narrative",
          title: "Comments",
          name: "decision.comments",
          height: "0.55in",
        },
      ],
    },
  ];
}

function normalizeHandbookForm05Html(html) {
  return String(html || "")
    .replaceAll(
      /<p[^>]*>\s*Employee\s+Acknowledgment\s+and\s+Agreement\s+of\s*<\/p>/gi,
      "",
    )
    .replaceAll(
      /<p[^>]*>\s*Computer\s+and\s+Electronics\s+Use\s+Policy\s*<\/p>/gi,
      "",
    )
    .replaceAll(/<p[^>]*>\s*Employee\s+Name\s*:[\s\S]*?<\/p>/gi, "")
    .replaceAll(/<p[^>]*>\s*Position\s*\/\s*Title\s*:[\s\S]*?<\/p>/gi, "")
    .replaceAll(/<p[^>]*>\s*Signature\s*:[\s\S]*?<\/p>/gi, "")
    .replaceAll(/<p[^>]*>\s*Date\s*:[\s\S]*?<\/p>/gi, "")
    .replaceAll(
      /<p[^>]*>\s*Return\s+this\s+form\s+to\s+the\s+office[\s\S]*?<\/p>/gi,
      "",
    )
    .replaceAll(/<p[^>]*>\s*MH\s+Construction,?\s+Inc\.?\s*<\/p>/gi, "")
    .replaceAll(/<p[^>]*>\s*3111\s+N\.\s*Capitol\s+Ave\.[\s\S]*?<\/p>/gi, "")
    .replaceAll(/Employee\s+Name\s*:[\s_\.]+/gi, "")
    .replaceAll(/Position\s*\/\s*Title\s*:[\s_\.]+/gi, "")
    .replaceAll(/Signature\s*:[\s_\.]+/gi, "")
    .replaceAll(/Date\s*:[\s_\.]+/gi, "")
    .trim();
}

async function buildHandbookForm05Pages(formEntry) {
  const formTitle =
    formEntry?.title ||
    "Employee Acknowledgment and Agreement of Computer and Electronics Use Policy";
  const rawHtml = await loadDocxDerivedFormHtml(formEntry);
  const normalizedHtml = normalizeHandbookForm05Html(rawHtml);
  return [
    {
      kind: "first",
      sections: [
        {
          type: "htmlBlock",
          title: formTitle,
          html: normalizedHtml,
        },
        {
          type: "signatures",
          title: "Computer and Electronics Use Policy Sign-Off",
          manualSignOnly: true,
          blocks: [
            {
              role: "Employee",
              name: "sign.employee",
              signatureLabel: "Acknowledgement Signature",
            },
            {
              role: "Supervisor / Manager",
              name: "sign.supervisor",
              signatureLabel: "Approval Signature",
            },
          ],
        },
      ],
    },
  ];
}

function buildHandbookForm06Pages(formEntry) {
  const formTitle = formEntry?.title || "Employee Photo Release Form";
  return [
    {
      kind: "first",
      sections: [
        {
          type: "fieldGrid",
          title: formTitle,
          subtitle: "Employee information and release selection",
          columns: 4,
          items: [
            { name: "release.employeeName", label: "Employee Name" },
            {
              name: "release.employeeId",
              label: "Employee ID",
            },
            { name: "release.departmentCrew", label: "Department / Crew" },
            { name: "release.supervisor", label: "Supervisor" },
          ],
        },
        {
          type: "refNote",
          html: "<p>This form authorizes MH Construction to capture and use employee photos, video, and related media for company business purposes. I authorize MH Construction to photograph and/or record me while performing work activities and to use this media for company communications, proposals, project documentation, recruiting, training, and digital/print marketing materials.</p>",
        },
        {
          type: "checkGrid",
          title: "Release Selection",
          columns: 3,
          items: [
            { name: "release.fullGranted", label: "Full Release Granted" },
            {
              name: "release.limitedInternal",
              label: "Limited Internal Use Only",
            },
            { name: "release.decline", label: "Decline Release" },
          ],
        },
        {
          type: "refNote",
          html: "<p>Revocation requests must be submitted in writing to HR. Existing published materials prior to revocation may remain in archived records.</p>",
        },
        {
          type: "signatures",
          title: "Employee Photo Release Sign-Off",
          manualSignOnly: true,
          layout: "two-up",
          blocks: [
            {
              role: "Employee",
              name: "sign.employee",
              signatureLabel: "Acknowledgement Signature",
            },
            {
              role: "Witness / HR Representative",
              name: "sign.supervisor",
              signatureLabel: "Approval Signature",
            },
          ],
        },
      ],
    },
  ];
}

function buildHandbookForm07Pages(formEntry) {
  const formTitle = formEntry?.title || "Client Photo Release Form";
  return [
    {
      kind: "first",
      sections: [
        {
          type: "fieldGrid",
          title: formTitle,
          subtitle: "Client and project information with release selection",
          columns: 4,
          items: [
            {
              name: "release.clientOrganizationName",
              label: "Client / Organization",
            },
            { name: "release.projectName", label: "Project Name" },
            { name: "release.projectAddress", label: "Project Address" },
            {
              name: "release.clientRepresentative",
              label: "Client Rep.",
            },
          ],
        },
        {
          type: "refNote",
          html: "<p>This form authorizes MH Construction to capture and use project-related photos and video at client locations for agreed business and communication purposes. Client authorizes MH Construction to photograph and/or record project areas, installed work, and progress, subject to this agreement. Authorized use may include project documentation, proposals, qualifications packages, website and social proof, and related business communications.</p>",
        },
        {
          type: "checkGrid",
          title: "Release Selection",
          columns: 3,
          items: [
            { name: "release.fullGranted", label: "Full Release Granted" },
            {
              name: "release.internalProposalOnly",
              label: "Internal + Proposal Use Only",
            },
            {
              name: "release.limitedRestricted",
              label: "Limited / Restricted Use",
            },
          ],
        },
        {
          type: "narrative",
          title: "Restrictions or Notes",
          name: "release.restrictionsOrNotes",
          height: "0.8in",
        },
        {
          type: "refNote",
          html: "<p>For restricted sites, attach the project-specific media protocol and any owner approvals required for external publication.</p>",
        },
        {
          type: "signatures",
          title: "Client Photo Release Sign-Off",
          manualSignOnly: true,
          blocks: [
            {
              role: "Client Representative",
              name: "sign.employee",
              signatureLabel: "Acknowledgement Signature",
            },
            {
              role: "MH Construction Representative",
              name: "sign.supervisor",
              signatureLabel: "Approval Signature",
            },
          ],
        },
      ],
    },
  ];
}

function buildHandbookForm08Pages(formEntry) {
  const formTitle = formEntry?.title || "Purchase Approval General Expense";
  return [
    {
      kind: "first",
      sections: [
        {
          type: "fieldGrid",
          title: formTitle,
          subtitle: "Requestor and purchase information",
          columns: 4,
          items: [
            { name: "request.dateSubmitted", label: "Date Submitted" },
            { name: "request.dateNeededBy", label: "Date Needed By" },
            { name: "request.requestorName", label: "Requestor Name" },
            { name: "request.phoneEmail", label: "Phone / Email" },
            { name: "request.expenseCategory", label: "Expense Category" },
            { name: "request.accountGlCode", label: "Account / GL Code" },
            { name: "request.vendorSupplier", label: "Vendor / Supplier" },
            {
              name: "request.vendorContactQuote",
              label: "Vendor Contact / Quote No.",
            },
          ],
        },
        {
          type: "checkGrid",
          title: "Payment Type",
          columns: 3,
          items: [
            { name: "payment.checking", label: "Checking" },
            { name: "payment.chase", label: "Chase" },
            { name: "payment.cabelas", label: "Cabela's" },
            { name: "payment.lowes", label: "Lowe's" },
            { name: "payment.homeDepot", label: "Home Depot" },
          ],
        },
        {
          type: "dataTable",
          title: "Itemized Purchase Detail",
          name: "request.items",
          columns: [
            { header: "Description", width: "38%" },
            { header: "Qty", width: "10%" },
            { header: "Unit Price", width: "16%" },
            { header: "Line Total", width: "16%" },
            { header: "Notes", width: "20%" },
          ],
          rows: 4,
          rowHeight: "0.34in",
        },
        {
          type: "fieldGrid",
          title: "Summary Totals",
          columns: 3,
          items: [
            { name: "request.subtotal", label: "Subtotal" },
            { name: "request.taxFreight", label: "Tax / Freight" },
            { name: "request.totalEstimate", label: "Total Estimate" },
          ],
        },
        {
          type: "narrative",
          title: "Justification / Notes",
          name: "request.justificationNotes",
          height: "1.15in",
        },
      ],
    },
    {
      kind: "cont",
      title: `${formTitle} Approval Review`,
      bodyPaddingTop: "0.14in",
      sections: [
        {
          type: "checkGrid",
          title: "Approval Decision",
          columns: 3,
          items: [
            { name: "approval.approved", label: "Approved" },
            { name: "approval.denied", label: "Denied" },
            { name: "approval.moreInfo", label: "More Info Needed" },
          ],
        },
        {
          type: "fieldGrid",
          title: "Approval Summary",
          columns: 3,
          items: [
            { name: "approval.approvedAmount", label: "Approved Amount" },
            { name: "approval.approvalDate", label: "Approval Date" },
            { name: "approval.reference", label: "Reference / Notes" },
          ],
        },
        {
          type: "signatures",
          title: "Purchase Approval Sign-Off",
          manualSignOnly: true,
          blocks: [
            {
              role: "Requestor",
              name: "sign.employee",
              signatureLabel: "Acknowledgement Signature",
            },
            {
              role: "Approver",
              name: "sign.supervisor",
              signatureLabel: "Approval Signature",
            },
          ],
        },
        {
          type: "narrative",
          title: "Approver Comments",
          name: "approval.comments",
          height: "1.1in",
        },
      ],
    },
  ];
}

function isLegacySignatureBlockText(text) {
  const hasSignatureCue =
    /\bsign(?:ed|ature|atures|\s*off)\b/i.test(text) ||
    /\bprint\s*name\b/i.test(text) ||
    /\bname\s*\/\s*signature\b/i.test(text);
  if (!hasSignatureCue) return false;
  const detailCount = [
    /\bdate\b/i,
    /\bemployee\b/i,
    /\bsupervisor\b/i,
    /\bforeman\b/i,
    /\bwitness\b/i,
    /\bhr\b/i,
  ].filter((rx) => rx.test(text)).length;
  return detailCount >= 1;
}

function filterDocxBlocksForForm(formEntry, blocks) {
  if (!Array.isArray(blocks) || blocks.length === 0) return [];

  const strictSignatureFiltering =
    isHandbookForm01(formEntry) || isHandbookForm02(formEntry);
  if (!strictSignatureFiltering) {
    return blocks;
  }

  return blocks.filter((blockHtml) => {
    const text = String(blockHtml || "")
      .replaceAll(/<[^>]+>/g, " ")
      .replaceAll(/&nbsp;/gi, " ")
      .replaceAll(/\s+/g, " ")
      .trim();
    return !isLegacySignatureBlockText(text);
  });
}

async function loadDocxDerivedFormHtml(formEntry) {
  if (!formEntry?.docxPath) return "";

  const sourcePath = join(DOCS_DIR, "forms", formEntry.docxPath);
  if (!existsSync(sourcePath)) {
    console.warn(
      `⚠️  DOCX source not found for ${formEntry.id}: ${formEntry.docxPath}`,
    );
    return "";
  }

  try {
    const mammothMod = await import("mammoth");
    const convertToHtml =
      mammothMod?.convertToHtml || mammothMod?.default?.convertToHtml;
    if (typeof convertToHtml !== "function") {
      throw new Error("mammoth.convertToHtml is unavailable");
    }

    const result = await convertToHtml({ path: sourcePath });
    const cleaned = cleanWordHtml(result?.value || "");
    if (!cleaned) return "";

    const sanitized = sanitizeDocxFormSnippet(cleaned);
    if (!sanitized) return "";

    // Keep fallback bodies concise so chrome and fillable fields remain visible.
    const blockMatches =
      sanitized.match(/<(h4|p|ul|ol|table)[\s\S]*?<\/\1>/gi) || [];
    const filteredBlocks = filterDocxBlocksForForm(formEntry, blockMatches);
    const snippetBlocks = filteredBlocks.slice(0, 24);
    return snippetBlocks.join("\n").trim();
  } catch (error) {
    console.warn(
      `⚠️  Failed to derive DOCX content for ${formEntry.id}: ${error?.message || error}`,
    );
    return "";
  }
}

function splitDocxSnippetIntoChunks(html, maxBlocksPerChunk = 5) {
  if (!html || typeof html !== "string") return [];
  const blocks = html.match(/<(h4|p|ul|ol|table)[\s\S]*?<\/\1>/gi) || [];
  if (blocks.length === 0) return [];

  const chunks = [];
  for (let index = 0; index < blocks.length; index += maxBlocksPerChunk) {
    const chunk = blocks
      .slice(index, index + maxBlocksPerChunk)
      .join("\n")
      .trim();
    if (chunk) chunks.push(chunk);
  }
  return chunks;
}

function sanitizeDocxFormSnippet(html) {
  if (!html) return "";
  const STRIP_PARAGRAPH_PATTERNS = [
    /^MH\s+CONSTRUCTION\s*,?\s*INC\.?\s*$/i,
    /^Industrial\s+Safety\s+(?:&|&amp;|and)\s*Health\s+Program\s*\(MISH\)\s*$/i,
    /^FORM\s*-?\s*MISH\s*-?\s*\d+/i,
    /^Rev\.?\s*\d+\s*\|\s*Effective\s*:/i,
    /^Prepared\s+by\s*:/i,
    /^Reviewed\s+by\s*:/i,
    /^Sign(?:ed|ature|atures|\s*off)\b/i,
    /^Print\s+Name\b/i,
    /^Name\s*\/\s*Signature\b/i,
    /^Date\s*$/i,
    /^Project\s+Information\s*:?\s*$/i,
  ];

  let out = html;

  out = out.replaceAll(/<p>([\s\S]*?)<\/p>/gi, (match, inner) => {
    const text = inner
      .replaceAll(/<[^>]+>/g, " ")
      .replaceAll(/\s+/g, " ")
      .trim();
    if (!text) return "";
    if (/^[\-—―_\s]{10,}$/.test(text)) return "";
    if (STRIP_PARAGRAPH_PATTERNS.some((pattern) => pattern.test(text))) {
      return "";
    }
    return match;
  });

  // Drop generic project-information heading blocks that are repeated across
  // most forms and make fallback bodies look identical at a glance.
  out = out.replaceAll(
    /<h4 class="sec-subhead">([\s\S]*?)<\/h4>/gi,
    (match, inner) => {
      const text = inner
        .replaceAll(/<[^>]+>/g, " ")
        .replaceAll(/\s+/g, " ")
        .trim();
      if (/^sign(?:ed|ature|atures|\s*off)?$/i.test(text)) return "";
      if (/^sign(?:ature|off)\s+log$/i.test(text)) return "";
      if (/^project\s+information$/i.test(text)) return "";
      return match;
    },
  );

  // Drop empty list bullets emitted by Word export placeholders.
  out = out.replaceAll(/<li class="sec-bullet">\s*(?:&nbsp;|\s)*<\/li>/gi, "");
  out = out.replaceAll(/<(ul|ol)([^>]*)>\s*<\/\1>/gi, "");

  // Remove compliance boilerplate table(s) that repeat in every form.
  out = out.replaceAll(/<table[\s\S]*?<\/table>/gi, (tableHtml) =>
    isGenericDocxTable(tableHtml) || isSignatureDocxTable(tableHtml)
      ? ""
      : tableHtml,
  );

  return out.trim();
}

function isSignatureDocxTable(tableHtml) {
  const text = tableHtml
    .replaceAll(/<[^>]+>/g, " ")
    .replaceAll(/&nbsp;/gi, " ")
    .replaceAll(/\s+/g, " ")
    .trim();

  if (!text) return false;

  const hasSignatureCue = /\bsign(?:ed|ature|atures|\s*off)\b/i.test(text);
  if (!hasSignatureCue) return false;

  const cueCount = [
    /\bprint\s*name\b/i,
    /\bdate\b/i,
    /\bemployee\b/i,
    /\bsupervisor\b/i,
    /\bforeman\b/i,
    /\bprepared\s*by\b/i,
    /\breviewed\s*by\b/i,
    /\bcompetent\s*person\b/i,
  ].filter((rx) => rx.test(text)).length;

  return cueCount >= 2;
}

function isGenericDocxTable(tableHtml) {
  const text = tableHtml
    .replaceAll(/<[^>]+>/g, " ")
    .replaceAll(/&nbsp;/gi, " ")
    .replaceAll(/\s+/g, " ")
    .trim();

  if (!text) return true;
  if (/Regulatory\s+Authority/i.test(text)) return true;

  // Common preamble rows used by many forms that should not dominate the
  // fallback body preview.
  const projectInfoHits = [
    /Project\s+Name\s*\/?\s*Number/i,
    /Job\s+Site\s+Address/i,
    /Supervisor\s*\/?\s*Foreman/i,
    /Employee\s+Name\(s\)/i,
    /Subcontractor/i,
  ].filter((rx) => rx.test(text)).length;
  if (projectInfoHits >= 3) return true;

  return false;
}

function parseMishSectionNumber(formEntry) {
  const id = String(formEntry?.id || "");
  const match = id.match(/^MISH\s+(\d{1,2})$/i);
  if (!match) return null;
  const value = Number(match[1]);
  return Number.isFinite(value) ? value : null;
}

function getFormLayoutProfile(formEntry) {
  const base = {
    firstPageBudget: 165,
    continuationPageBudget: 198,
    docxChunkSize: 5,
  };

  if (isHandbookForm03(formEntry)) {
    return {
      ...base,
      firstPageBudget: 1200,
      continuationPageBudget: 1200,
      docxChunkSize: 24,
    };
  }

  if (isHandbookForm04(formEntry)) {
    return {
      ...base,
      firstPageBudget: 1200,
      continuationPageBudget: 1200,
      docxChunkSize: 24,
    };
  }

  if (isHandbookForm06(formEntry)) {
    return {
      ...base,
      firstPageBudget: 1200,
      continuationPageBudget: 1200,
      docxChunkSize: 24,
    };
  }

  const id = String(formEntry?.id || "").toUpperCase();
  if (id.startsWith("HANDBOOK-FORM-")) {
    return {
      ...base,
      firstPageBudget: 158,
      continuationPageBudget: 188,
      docxChunkSize: 4,
    };
  }

  const mish = parseMishSectionNumber(formEntry);
  if (!Number.isFinite(mish)) {
    return base;
  }

  if (mish >= 1 && mish <= 10) {
    return {
      ...base,
      firstPageBudget: 170,
      continuationPageBudget: 204,
      docxChunkSize: 6,
    };
  }
  if (mish >= 11 && mish <= 24) {
    return {
      ...base,
      firstPageBudget: 160,
      continuationPageBudget: 192,
      docxChunkSize: 5,
    };
  }
  if (mish >= 25 && mish <= 37) {
    return {
      ...base,
      firstPageBudget: 156,
      continuationPageBudget: 186,
      docxChunkSize: 4,
    };
  }
  return {
    ...base,
    firstPageBudget: 152,
    continuationPageBudget: 182,
    docxChunkSize: 4,
  };
}

function isToolboxTalkForm(formEntry) {
  const id = String(formEntry?.id || "").toUpperCase();
  const slug = String(formEntry?.slug || "").toLowerCase();
  const title = String(formEntry?.title || "").toLowerCase();
  return (
    id === "MISH 09" ||
    slug.includes("toolbox-talk") ||
    title.includes("toolbox talk")
  );
}

function buildDefaultSignatureSection(formEntry) {
  const titleByForm = new Map([
    ["HANDBOOK-FORM-01", "Company Vehicle Policy Acknowledgement Sign-Off"],
    ["HANDBOOK-FORM-02", "Employee Handbook Receipt Sign-Off"],
    [
      "HANDBOOK-FORM-03",
      "MISH (Accident Prevention Program) Acknowledgement Sign-Off",
    ],
  ]);
  const id = String(formEntry?.id || "").toUpperCase();
  const fallbackTitle = `${String(formEntry?.title || "Form").trim()} Sign-Off`;
  return {
    type: "signatures",
    title: titleByForm.get(id) || fallbackTitle,
    manualSignOnly:
      isHandbookFormEntry(formEntry) || isMishFormEntry(formEntry),
    blocks: [
      {
        role: "Employee",
        name: "sign.employee",
        signatureLabel: "Acknowledgement Signature",
      },
      {
        role: "Supervisor",
        name: "sign.supervisor",
        signatureLabel: "Approval Signature",
      },
    ],
  };
}

function buildToolboxTalkSignatureSections(formEntry) {
  const formTitle = formEntry?.title || "Safety Meeting Toolbox Talk Log";
  return [
    {
      type: "dataTable",
      title: "Toolbox Talk Attendee Signatures",
      name: "attendeeSignatures",
      columns: [
        { header: "Attendee Name", width: "30%" },
        { header: "Employer / Trade", width: "26%" },
        { header: "Signature", width: "28%" },
        { header: "Date", width: "16%" },
      ],
      rows: 14,
      rowHeight: "0.32in",
    },
    {
      type: "signatures",
      title: `${formTitle} Facilitator Verification`,
      manualSignOnly: true,
      blocks: [
        {
          role: "Facilitator / Competent Person",
          name: "sign.facilitator",
          signatureLabel: "Acknowledgement Signature",
        },
        {
          role: "Supervisor Approval",
          name: "sign.supervisor",
          signatureLabel: "Approval Signature",
        },
      ],
    },
  ];
}

async function buildDefaultFillablePages(formEntry) {
  if (isHandbookForm04(formEntry)) {
    return buildHandbookForm04Pages(formEntry);
  }

  if (isHandbookForm05(formEntry)) {
    return buildHandbookForm05Pages(formEntry);
  }

  if (isHandbookForm06(formEntry)) {
    return buildHandbookForm06Pages(formEntry);
  }

  if (isHandbookForm08(formEntry)) {
    return buildHandbookForm08Pages(formEntry);
  }

  if (isHandbookForm07(formEntry)) {
    return buildHandbookForm07Pages(formEntry);
  }

  const layoutProfile = getFormLayoutProfile(formEntry);
  const formDisplayTitle = formEntry?.title || "Form Specific Content";
  const docxSnippet = await loadDocxDerivedFormHtml(formEntry);
  const docxChunks = splitDocxSnippetIntoChunks(
    docxSnippet,
    layoutProfile.docxChunkSize,
  );
  let docxSections = docxChunks.map((chunk, chunkIndex) => ({
    type: "htmlBlock",
    title:
      chunkIndex === 0
        ? formDisplayTitle
        : `${formDisplayTitle} (continued ${chunkIndex + 1})`,
    html: chunk,
  }));

  if (isHandbookForm02(formEntry)) {
    docxSections = docxSections.slice(0, 1).map((section) => ({
      ...section,
      html: String(section.html || "")
        .replaceAll(/<p[^>]*>\s*Printed\s*Name\s*:[\s_\.]*<\/p>/gi, "")
        .replaceAll(/Printed\s*Name\s*:[\s_\.]+/gi, "")
        .concat(
          "\n<p>Return this form to the office, keep your handbook for future reference.</p>",
        )
        .trim(),
    }));
  }

  if (isHandbookForm01(formEntry)) {
    docxSections = docxSections.slice(0, 1);
  }

  if (isHandbookForm03(formEntry)) {
    const combinedHtml = docxSections
      .slice(0, 2)
      .map((section) => String(section.html || "").trim())
      .filter(Boolean)
      .join("\n");
    const normalizedHtml = combinedHtml
      .replaceAll(
        /Site-Specific\s+Safety\s+Plan/gi,
        "MISH (Accident Prevention Program)",
      )
      .replaceAll(
        /(?<!MISH\s)\bSafety\s+Plan\b(?!\s*\(APP\))/gi,
        "MISH (Accident Prevention Program)",
      )
      .replaceAll(
        /\bMISH\s+MISH\s+\(Accident\s+Prevention\s+Program\)\b/gi,
        "MISH (Accident Prevention Program)",
      )
      .replaceAll(
        /\bMISH\s+\(Accident\s+Prevention\s+Program\)\s*\(Accident\s+Prevention\s+Program\)\b/gi,
        "MISH (Accident Prevention Program)",
      )
      .replaceAll(
        /<p[^>]*>\s*(Employee\s+Name\s*\(Print\)|Employee\s+Signature|Supervisor\s*\/?\s*Manager\s+Name\s*\(Print\)|Supervisor\s*\/?\s*Manager\s+Signature|Date)\s*:[\s\S]*?<\/p>/gi,
        "",
      )
      .replaceAll(
        /(Employee\s+Name\s*\(Print\)|Employee\s+Signature|Supervisor\s*\/?\s*Manager\s+Name\s*\(Print\)|Supervisor\s*\/?\s*Manager\s+Signature|Date)\s*:[\s_\.]+/gi,
        "",
      )
      .trim();
    docxSections = combinedHtml
      ? [
          {
            type: "htmlBlock",
            title: formDisplayTitle,
            html: normalizedHtml,
          },
        ]
      : [];
  }

  const hasDocxSpecificContent = docxSections.length > 0;
  const signatureSection = buildDefaultSignatureSection(formEntry);
  const postContentSignatureSections = isToolboxTalkForm(formEntry)
    ? buildToolboxTalkSignatureSections(formEntry)
    : [signatureSection];

  const defaultEntrySections = hasDocxSpecificContent
    ? [
        ...(isHandbookForm01(formEntry)
          ? [
              docxSections[0],
              ...postContentSignatureSections,
              ...docxSections.slice(1),
            ]
          : docxSections),
        ...(isHandbookForm01(formEntry) ? [] : postContentSignatureSections),
      ].filter(Boolean)
    : [
        {
          type: "fieldGrid",
          title: "Form Details",
          columns: 2,
          items: [
            { name: "meta.project", label: "Project / Job" },
            { name: "meta.location", label: "Site Location" },
            { name: "meta.supervisor", label: "Supervisor" },
            { name: "meta.preparedBy", label: "Prepared By" },
            { name: "meta.date", label: "Date" },
            { name: "meta.shift", label: "Shift / Time" },
          ],
        },
        {
          type: "narrative",
          title: "Field Entry",
          subtitle: "Record all required details clearly and completely.",
          name: "details",
          height: "2.6in",
        },
        {
          type: "signatures",
          title: "Sign-Off",
          blocks: signatureSection.blocks,
        },
      ];

  const fallbackIntroSection = {
    type: "refNote",
    html: `<p><strong>${escapeHtml(formEntry?.title || "Form")}</strong> — Complete in the field and route according to project records control.</p>`,
  };

  const firstPageSections = hasDocxSpecificContent
    ? defaultEntrySections
    : [fallbackIntroSection, ...defaultEntrySections];

  return [
    {
      kind: "first",
      sections: firstPageSections,
    },
  ];
}

function getFillablePages(formEntry) {
  if (formEntry?.fillable?.pages?.length) return formEntry.fillable.pages;
  return buildDefaultFillablePages(formEntry);
}

function parseInches(value, fallback = 1.55) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "string") return fallback;
  const match = value.trim().match(/^([0-9]+(?:\.[0-9]+)?)in$/i);
  if (!match) return fallback;
  const n = Number(match[1]);
  return Number.isFinite(n) ? n : fallback;
}

function estimateSectionUnits(section) {
  switch (section?.type) {
    case "refNote":
      return 14;
    case "checkGrid": {
      const cols = Math.max(1, Number(section.columns) || 4);
      const rows = Math.ceil((section.items?.length || 0) / cols);
      return 12 + rows * 8;
    }
    case "fieldGrid": {
      const cols = Math.max(1, Number(section.columns) || 2);
      const rows = Math.ceil((section.items?.length || 0) / cols);
      return (section.title ? 10 : 2) + rows * 9;
    }
    case "narrative": {
      const inches = parseInches(section.height, 1.55);
      return (section.title ? 10 : 0) + Math.ceil(inches * 20);
    }
    case "dataTable":
      return 12 + (section.rows || 1) * 8;
    case "regTable":
      return 12 + (section.rows?.length || 1) * 8;
    case "signatures":
      return 18 + Math.ceil((section.blocks?.length || 1) * 9);
    case "htmlBlock": {
      const html = String(section?.html || "");
      const text = html
        .replaceAll(/<[^>]+>/g, " ")
        .replaceAll(/&nbsp;/gi, " ")
        .replaceAll(/\s+/g, " ")
        .trim();
      const density = Math.max(0, Math.ceil(text.length / 190));
      return (section.title ? 28 : 20) + density * 11;
    }
    default:
      return 12;
  }
}

function splitPageSectionsByBudget(page, budget) {
  const sourceSections = Array.isArray(page?.sections) ? page.sections : [];
  if (sourceSections.length === 0) return [page];

  const chunks = [];
  let current = [];
  let currentUnits = 0;

  for (const section of sourceSections) {
    const units = estimateSectionUnits(section);
    if (current.length > 0 && currentUnits + units > budget) {
      chunks.push(current);
      current = [];
      currentUnits = 0;
    }
    current.push(section);
    currentUnits += units;
  }

  if (current.length > 0) {
    chunks.push(current);
  }

  return chunks.map((sections, chunkIndex) => ({
    ...page,
    kind: chunkIndex === 0 ? page.kind : "cont",
    sections,
  }));
}

function optimizeFillablePageLayout(pages, formEntry, layoutProfile) {
  const out = [];
  const profile = layoutProfile || getFormLayoutProfile(formEntry);
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i] || {};
    const isFirstVisualPage = out.length === 0;
    const budget = isFirstVisualPage
      ? profile.firstPageBudget
      : profile.continuationPageBudget;
    const splitPages = splitPageSectionsByBudget(page, budget);
    out.push(...splitPages);
  }

  if (out.length > pages.length) {
    console.log(
      `  ℹ  Layout optimization: expanded ${formEntry.id} from ${pages.length} to ${out.length} page(s) for spacing legibility.`,
    );
  }

  const total = out.length;
  return out.map((page, index) => {
    if (index === 0 || page.kind === "first") {
      return page;
    }
    return {
      ...page,
      pageLabel: page.pageLabel || `Page ${index + 1} of ${total}`,
    };
  });
}

function fqName(ns, name) {
  if (!name) return "";
  return name.includes(".") ? name : `${ns}.${name}`;
}

function renderMaterialIcon(ligature, extraClasses = "") {
  const className = ["mi", "mi-inline", extraClasses].filter(Boolean).join(" ");
  return `<span class="${className}" aria-hidden="true">${escapeHtml(ligature)}</span>`;
}

function resolveSectionBandIconLigature(section, sectionType) {
  const explicitIcon = String(section?.icon || "").trim();
  if (explicitIcon) {
    if (Object.hasOwn(MATERIAL_ICON_LIGATURES, explicitIcon)) {
      return getMaterialIconLigature(explicitIcon);
    }
    if (MATERIAL_ICON_LIGATURE_SET.has(explicitIcon)) {
      return explicitIcon;
    }
    throw new Error(
      `Unknown fillable section icon "${explicitIcon}" for section type "${sectionType}". Use canonical icon keys from MATERIAL_ICON_LIGATURES.`,
    );
  }

  const defaultsByType = {
    checkGrid: getMaterialIconLigature("checklist"),
    fieldGrid: getMaterialIconLigature("formField"),
    narrative: getMaterialIconLigature("narrative"),
    dataTable: getMaterialIconLigature("table"),
    regTable: getMaterialIconLigature("table"),
    signatures: getMaterialIconLigature("signature"),
  };
  return defaultsByType[sectionType] || null;
}

function renderSection(section, ns) {
  switch (section.type) {
    case "refNote":
      return `<div class="ref-note"><span class="ref-note-icon">${renderMaterialIcon(getMaterialIconLigature("info"))}</span><div class="ref-note-content">${section.html || ""}</div></div>`;

    case "checkGrid": {
      const cols = section.columns || 4;
      const band = renderBand(section, "checkGrid");
      const cells = (section.items || [])
        .map(
          (it) =>
            `<div class="check-cell"><span class="check-box" data-check="${escapeAttr(fqName(ns, it.name))}"></span>${escapeHtml(it.label || "")}</div>`,
        )
        .join("");
      return `${band}<div class="check-grid cols-${cols}">${cells}</div>`;
    }

    case "fieldGrid": {
      const cols = section.columns || 2;
      const band = section.title ? renderBand(section, "fieldGrid") : "";
      const cells = (section.items || [])
        .map((it) => {
          const ftype = it.multiline ? ' data-field-type="multiline"' : "";
          return `<div class="field-cell"><label class="field-label">${escapeHtml(it.label || "")}</label><div class="field-line-stub" data-field="${escapeAttr(fqName(ns, it.name))}"${ftype}></div></div>`;
        })
        .join("");
      return `${band}<div class="field-grid cols-${cols}">${cells}</div>`;
    }

    case "narrative": {
      const band = section.title ? renderBand(section, "narrative") : "";
      const height = section.height || "1.55in";
      return `${band}<div class="narrative-cell" style="height:${height}" data-field="${escapeAttr(fqName(ns, section.name))}" data-field-type="multiline"></div>`;
    }

    case "htmlBlock": {
      const band = section.title ? renderBand(section, "narrative") : "";
      return `${band}<div class="docx-block">${section.html || ""}</div>`;
    }

    case "dataTable": {
      const band = renderBand(section, "dataTable");
      const head =
        `<thead><tr>` +
        section.columns
          .map(
            (c) =>
              `<th${c.width ? ` style="width:${c.width}"` : ""}>${escapeHtml(c.header || "")}</th>`,
          )
          .join("") +
        `</tr></thead>`;
      const rows = [];
      const tableNs = fqName(ns, section.name);
      const rowHeightStyle = section.rowHeight
        ? ` style="height:${escapeAttr(section.rowHeight)}"`
        : "";
      for (let r = 1; r <= (section.rows || 1); r++) {
        const tds = section.columns
          .map(
            (_c, ci) =>
              `<td${rowHeightStyle} data-cell="${escapeAttr(`${tableNs}.r${r}.c${ci + 1}`)}"></td>`,
          )
          .join("");
        rows.push(`<tr>${tds}</tr>`);
      }
      return `${band}<table class="data-table">${head}<tbody>${rows.join("")}</tbody></table>`;
    }

    case "regTable": {
      const band = renderBand(section, "regTable");
      const head =
        `<thead><tr>` +
        section.columns
          .map(
            (c) =>
              `<th${c.width ? ` style="width:${c.width}"` : ""}>${escapeHtml(c.header || "")}</th>`,
          )
          .join("") +
        `</tr></thead>`;
      const tableNs = fqName(ns, section.name);
      const rows = (section.rows || [])
        .map((row) => {
          const prefill = (row.cells || [])
            .map((v) => `<td class="tcell">${escapeHtml(v)}</td>`)
            .join("");
          const check = `<td class="tcheck" data-check="${escapeAttr(`${tableNs}.${row.check}`)}"></td>`;
          return `<tr>${prefill}${check}</tr>`;
        })
        .join("");
      return `${band}<table class="data-table">${head}<tbody>${rows}</tbody></table>`;
    }

    case "signatures": {
      const band = section.title ? renderBand(section, "signatures") : "";
      const note = section.refNote
        ? `<div class="ref-note"><span class="ref-note-icon">${renderMaterialIcon(getMaterialIconLigature("info"))}</span><div class="ref-note-content">${section.refNote}</div></div>`
        : "";
      const manualSignOnly = section.manualSignOnly === true;
      const cells = (section.blocks || [])
        .map((b) => {
          const printName = fqName(ns, `${b.name}.print`);
          const dateName = fqName(ns, `${b.name}.date`);
          const roleText = String(b.role || "");
          const resolvedSignatureLabel =
            b.signatureLabel ||
            (/supervisor|approval/i.test(roleText)
              ? "Approval Signature"
              : "Acknowledgement Signature");
          const wide = b.wide ? " sig-wide" : "";
          const signatureFieldHtml = manualSignOnly
            ? `<div class="field-line-stub"></div>`
            : `<div class="field-line-stub" data-field="${escapeAttr(printName)}"></div>`;
          const dateFieldHtml = manualSignOnly
            ? `<div class="field-line-stub"></div>`
            : `<div class="field-line-stub" data-field="${escapeAttr(dateName)}"></div>`;
          return `<div class="sig-cell${wide}">
              <div class="sig-label">${escapeHtml(resolvedSignatureLabel)}</div>
              <div class="sig-role">${escapeHtml(b.role || "")}</div>
              <div class="sig-lines">
                <div class="sig-line-pair">
                  ${signatureFieldHtml}
                  <div class="sig-field-label">Signature</div>
                </div>
                <div class="sig-line-pair">
                  ${dateFieldHtml}
                  <div class="sig-field-label">Date</div>
                </div>
              </div>
            </div>`;
        })
        .join("");
      const sigGridClass =
        section.layout === "two-up" ? "sig-grid sig-grid--two-up" : "sig-grid";
      return `${note}${band}<div class="${sigGridClass}">${cells}</div>`;
    }

    default:
      console.warn(`⚠️  Unknown section type: ${section.type}`);
      return "";
  }
}

function renderBand(section, sectionType = "") {
  if (!section.title) return "";
  const ligature = resolveSectionBandIconLigature(section, sectionType);
  const icon = ligature
    ? `<span class="sec-band-icon">${renderMaterialIcon(ligature)}</span>`
    : "";
  const sub = section.subtitle
    ? ` <span class="sec-sub">${escapeHtml(section.subtitle)}</span>`
    : "";
  return `<div class="sec-band">${icon}${escapeHtml(section.title)}${sub}</div>`;
}

function escapeAttr(s) {
  return String(s).replaceAll('"', "&quot;");
}

function renderSheet(page, idx, ns, formEntry) {
  const sections = Array.isArray(page.sections) ? page.sections : [];
  const bottomSectionsCount = Math.max(
    0,
    Number(page.bottomSectionsCount) || 0,
  );
  const splitIndex =
    bottomSectionsCount > 0 && bottomSectionsCount < sections.length
      ? sections.length - bottomSectionsCount
      : sections.length;
  const mainSections = sections.slice(0, splitIndex);
  const bottomSections = sections.slice(splitIndex);
  const sectionsHtml = sections
    .map((s) => renderSection(s, ns))
    .join("\n        ");
  const mainSectionsHtml = mainSections
    .map((s) => renderSection(s, ns))
    .join("\n          ");
  const bottomSectionsHtml = bottomSections
    .map((s) => renderSection(s, ns))
    .join("\n          ");
  const bodyStyle = page.bodyPaddingTop
    ? ` style="padding-top:${escapeAttr(page.bodyPaddingTop)};"`
    : "";
  const bodyContentHtml =
    bottomSections.length > 0
      ? `<div class="body-main">\n          ${mainSectionsHtml}\n        </div>\n        <div class="body-bottom">\n          ${bottomSectionsHtml}\n        </div>`
      : sectionsHtml;
  const bodyClass =
    bottomSections.length > 0 ? "body-area body-area--split" : "body-area";

  const footerHtml = `<footer class="footer">
        <div class="contact">
          <div class="label">Company Contact</div>
          <div class="name">{{BRAND_COMPANY_NAME}}</div>
          {{BRAND_ADDRESS_STREET}}<br />
          {{BRAND_ADDRESS_CITYSTATEZIP}}<br />
          {{BRAND_PHONE}} &middot; {{BRAND_WEBSITE}}
          <div class="licenses">{{BRAND_LICENSES_INLINE}}</div>
        </div>
        <div class="trust">
          <div class="label">Accreditation &amp; Trust</div>
          <div class="logos">
            <img class="logo-agc" src="{{BRAND_AGC_HORIZONTAL}}" alt="AGC membership" />
            <img class="logo-bbb" src="{{BRAND_BBB_SEAL}}" alt="BBB accredited business" />
            <img class="logo-vob" src="{{BRAND_WA_VOB_LOGO}}" alt="Washington certified veteran-owned business" />
          </div>
          <div class="chambers" aria-label="Chamber of Commerce memberships">
            <img src="{{BRAND_CHAMBER_PASCO}}" alt="Pasco Chamber of Commerce member" />
            <img src="{{BRAND_CHAMBER_KENNEWICK}}" alt="Tri-City Regional Chamber of Commerce member" />
            <img src="{{BRAND_CHAMBER_RICHLAND}}" alt="Richland Chamber of Commerce member" />
          </div>
        </div>
      </footer>
      <div class="veteran-strip">
        Veteran-Owned <span class="sep">&#9733;</span> Safety-Driven
        <span class="sep">&#9733;</span> Built on Quality, Backed by Trust
      </div>`;

  if (idx === 0 || page.kind === "first") {
    return `<div class="sheet">
      <div class="left-ribbon"></div>
      <div class="identity">
        <div>{{BRAND_COMPANY_SHORT}}<span class="dot">&#8226;</span>{{BRAND_ADDRESS_CITYSTATEZIP}}</div>
        <div>{{BRAND_VETERAN}}</div>
      </div>
      <header class="header">
        <img class="logo" src="{{BRAND_LOGO_COLOR}}" alt="MH Construction logo" />
        <div class="qr-card">
          <a href="{{FORM_QR_LINK_URL}}" target="_blank" rel="noopener noreferrer" aria-label="Open digital package for ${escapeHtml(formEntry.id || "form")}">
            <img src="{{FORM_QR_DATA_URL}}" alt="Scan to open digital package for ${escapeHtml(formEntry.id || "form")}" />
          </a>
          <div class="qr-text">
            <p class="qr-label">Digital Access</p>
            <div class="qr-headline">${escapeHtml(formEntry.id || "")}</div>
            <p class="qr-meta">${escapeHtml(formEntry.title || "")}</p>
            <p class="qr-meta">Rev ${escapeHtml(formEntry.revision || "—")} &middot; ${escapeHtml(formEntry.effectiveDate || "—")}</p>
          </div>
        </div>
      </header>
      <main class="${bodyClass}"${bodyStyle}>
        ${bodyContentHtml}
      </main>
      ${footerHtml}
    </div>`;
  }

  // Continuation page
  const contTitle = page.title || `${formEntry.title || "Form"} (continued)`;
  const pageLabel = page.pageLabel || `Page ${idx + 1}`;
  return `<div class="sheet sheet--cont">
      <div class="left-ribbon"></div>
      <header class="cont-header">
        <div class="cont-mark">${escapeHtml(formEntry.id || "")}<span class="dot">&#8226;</span>${escapeHtml(contTitle)}</div>
        <div class="cont-page">${escapeHtml(pageLabel)}</div>
      </header>
      <main class="${bodyClass}"${bodyStyle}>
        ${bodyContentHtml}
      </main>
      ${footerHtml}
    </div>`;
}

function validateSignatureSectionTitleGuardrails(formEntry, pages) {
  const enforce = isHandbookFormEntry(formEntry) || isMishFormEntry(formEntry);
  if (!enforce) return;

  const signatureTitles = (pages || []).flatMap((page) =>
    (page?.sections || [])
      .filter((section) => section?.type === "signatures")
      .map((section) => String(section?.title || "").trim()),
  );

  const genericTitles = new Set(["Sign-Off", "Facilitator Verification"]);
  const genericViolations = signatureTitles.filter((title) =>
    genericTitles.has(title),
  );
  if (genericViolations.length > 0) {
    throw new Error(
      `Guardrail validation failed: signature section titles must be unique to the current page. Generic titles found: ${genericViolations.join(", ")}`,
    );
  }

  const duplicates = signatureTitles.filter(
    (title, index) => title && signatureTitles.indexOf(title) !== index,
  );
  if (duplicates.length > 0) {
    throw new Error(
      `Guardrail validation failed: duplicate signature section titles found in one form: ${[...new Set(duplicates)].join(", ")}`,
    );
  }
}

function validateHandbookSignatureGuardrails(
  formEntry,
  pages,
  html,
  fields = [],
) {
  const isManualSignatureForm =
    isHandbookFormEntry(formEntry) || isMishFormEntry(formEntry);
  if (!isManualSignatureForm) return;

  const signatureSections = (pages || []).flatMap((page) =>
    (page?.sections || []).filter((section) => section?.type === "signatures"),
  );
  const missingManualOnly = signatureSections.filter(
    (section) => section?.manualSignOnly !== true,
  );
  if (missingManualOnly.length > 0) {
    const labels = missingManualOnly
      .map((section) => section?.title || "Untitled signature section")
      .join(", ");
    throw new Error(
      `Guardrail validation failed: handbook and MISH signature sections must set manualSignOnly=true. Offending sections: ${labels}`,
    );
  }

  if (/data-field="[^"]*sign\.[^"]*\.(?:print|date)"/i.test(html || "")) {
    throw new Error(
      "Guardrail validation failed: handbook and MISH forms must not render fillable signature/date fields in signature blocks.",
    );
  }

  const offendingFields = (fields || []).filter((field) =>
    /(^|\b)sign\.[^.]+\.(print|date)$/i.test(String(field?.name || "")),
  );
  if (offendingFields.length > 0) {
    throw new Error(
      `Guardrail validation failed: handbook and MISH forms emitted fillable signature/date widgets: ${offendingFields
        .map((field) => field.name)
        .join(", ")}`,
    );
  }
}

/**
 * Generate a fillable form PDF from a manifest entry whose `fillable`
 * block defines the schema. Uses the shared chrome template
 * `documents/manuals/form-fillable.html` and the canonical
 * measurement-driven AcroForm overlay pipeline.
 */
async function generateFillableForm(formEntry) {
  const slug = (formEntry.slug || formEntry.id || "form")
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-+|-+$/g, "");
  console.log(`\n🚧 Generating fillable form: ${formEntry.id} → ${slug}.pdf`);

  const templatePath = join(DOCS_DIR, "manuals/form-fillable.html");
  const rawTemplate = await readFile(templatePath, "utf-8");

  const ns = deriveFormNamespace(formEntry);
  const layoutProfile = getFormLayoutProfile(formEntry);
  const basePages = await getFillablePages(formEntry);
  const pages = optimizeFillablePageLayout(basePages, formEntry, layoutProfile);
  validateSignatureSectionTitleGuardrails(formEntry, pages);
  const formPublicRelativePath = resolveFormPublicRelativePath(formEntry, slug);
  const formPublicUrl = `${SITE_URL}/${formPublicRelativePath}`;
  const formQrDataUrl = await buildQrDataUrl(formPublicUrl);

  const body = pages
    .map((p, i) => renderSheet(p, i, ns, formEntry))
    .join("\n    ");

  let html = rawTemplate
    .replaceAll("{{FORM_ID}}", escapeHtml(formEntry.id || ""))
    .replaceAll("{{FORM_TITLE}}", escapeHtml(formEntry.title || ""))
    .replace("{{FORM_BODY}}", body);
  html = applyBrandTokens(html)
    .replaceAll("{{FORM_QR_DATA_URL}}", formQrDataUrl)
    .replaceAll("{{FORM_QR_LINK_URL}}", escapeHtml(formPublicUrl));

  validateHandbookSignatureGuardrails(formEntry, pages, html);

  const fillableDir = join(OUTPUT_DIR, "form-fillables");
  await ensureDir(fillableDir);
  const pdfPath = join(fillableDir, `${slug}.pdf`);
  const tmpHtml = `manuals/_tmp_fillable_${slug}.html`;

  await renderHtmlToPdf(
    html,
    pdfPath,
    { margin: { top: 0, right: 0, bottom: 0, left: 0 } },
    tmpHtml,
  );

  const fields = await extractFieldRectsFromHtml(
    html,
    `manuals/_tmp_fillable_${slug}_measure.html`,
  );
  validateHandbookSignatureGuardrails(formEntry, pages, html, fields);
  await applyMeasuredFieldsToPdf(pdfPath, fields);
  console.log(
    `  ✓  ${pdfPath.replace(ROOT + "/", "")}  (${fields.length} fields)`,
  );
}

async function loadFormsManifest() {
  const manifestPath = join(DOCS_DIR, "forms/forms-manifest.json");
  if (!existsSync(manifestPath)) {
    throw new Error(`forms-manifest.json not found at ${manifestPath}`);
  }
  const manifest = JSON.parse(await readFile(manifestPath, "utf-8"));
  return Array.isArray(manifest.forms) ? manifest.forms : [];
}

function findFormEntry(forms, key) {
  if (!key) return null;
  const norm = String(key).toLowerCase().trim();
  return (
    forms.find((f) => String(f.id || "").toLowerCase() === norm) ||
    forms.find((f) => String(f.slug || "").toLowerCase() === norm) ||
    forms.find((f) =>
      String(f.slug || "")
        .toLowerCase()
        .startsWith(norm + "_"),
    ) ||
    forms.find(
      (f) =>
        String(f.id || "")
          .toLowerCase()
          .replaceAll(/[^a-z0-9]/g, "") === norm.replaceAll(/[^a-z0-9]/g, ""),
    ) ||
    null
  );
}

async function generateFillableFormById(key) {
  const forms = await loadFormsManifest();
  const entry = findFormEntry(forms, key);
  if (!entry) {
    console.error(`❌  No form found in manifest for: ${key}`);
    process.exit(1);
  }
  if (!entry.fillable?.pages?.length) {
    console.error(
      `❌  ${entry.id} has no \`fillable.pages\` schema in the manifest.`,
    );
    process.exit(1);
  }
  await generateFillableForm(entry);
}

async function generateAllFillableForms() {
  const forms = await loadFormsManifest();
  const fillable = forms.filter((f) => f.fillable?.pages?.length);
  if (fillable.length === 0) {
    console.log("ℹ️  No forms with `fillable` schema in the manifest.");
    return;
  }
  console.log(`\n📝  Generating ${fillable.length} fillable form(s)…`);
  for (const f of fillable) {
    await generateFillableForm(f);
  }
}

function slugForFormPackage(formEntry) {
  return (formEntry.slug || formEntry.id || "form")
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-+|-+$/g, "");
}

function resolveFormPublicRelativePath(formEntry, slug) {
  const basePath = isHandbookFormEntry(formEntry)
    ? "docs/employee/forms"
    : "docs/safety/forms";
  return `${basePath}/${slug}.pdf`;
}

// ── Cover + Fillable bundle ──────────────────────────────────────────────────
/**
 * Build the deliverable form package (cover sheet + fillable body) for a
 * single manifest entry. Regenerates the cover and the fillable PDF first
 * so the package always reflects the current manifest, then merges them
 * with pdf-lib (preserving AcroForm widgets via copyPages) into
 * `documents/generated-pdfs/form-packages/{slug}.pdf`.
 */
async function generateFormPackage(formEntry) {
  const slug = slugForFormPackage(formEntry);

  console.log(`\n📦 Building form package: ${formEntry.id} → ${slug}.pdf`);

  // 1. Ensure the cover exists (regenerate just this one for freshness).
  await generateFormCoverFor(formEntry);

  // 2. Always generate a fillable package body with canonical form chrome.
  await generateFillableForm(formEntry);
  const bodyPath = join(OUTPUT_DIR, "form-fillables", `${slug}.pdf`);

  const coverPath = join(OUTPUT_DIR, "form-covers", `${slug}_cover.pdf`);
  if (!existsSync(coverPath)) {
    console.error(`❌  Cover PDF missing: ${coverPath}`);
    return;
  }
  if (!existsSync(bodyPath)) {
    console.error(`❌  Package body PDF missing: ${bodyPath}`);
    return;
  }

  // 3. Merge: start from the body PDF, then insert cover pages at the front.
  const merged = await PDFDocument.load(await readFile(bodyPath));
  const coverDoc = await PDFDocument.load(await readFile(coverPath));

  const coverPages = await merged.copyPages(
    coverDoc,
    coverDoc.getPageIndices(),
  );
  // Insert in order at the front so the cover precedes the body.
  coverPages.forEach((p, i) => merged.insertPage(i, p));

  merged.setTitle(`${formEntry.id} — ${formEntry.title || ""}`.trim());
  merged.setSubject(formEntry.categoryLabel || formEntry.category || "");
  merged.setAuthor("MH Construction");
  merged.setProducer("MH Construction Document Generator");

  const packagesDir = join(OUTPUT_DIR, "form-packages");
  await ensureDir(packagesDir);
  const outPath = join(packagesDir, `${slug}.pdf`);
  await writeFile(outPath, await merged.save());

  const totalPages = merged.getPageCount();
  console.log(`  ✓  ${outPath.replace(ROOT + "/", "")}  (${totalPages} pages)`);
}

async function generateFormPackageById(key) {
  const forms = await loadFormsManifest();
  const entry = findFormEntry(forms, key);
  if (!entry) {
    console.error(`❌  No form found in manifest for: ${key}`);
    process.exit(1);
  }
  await generateFormPackage(entry);
}

async function generateAllFormPackages() {
  const forms = await loadFormsManifest();
  const eligible = forms;
  if (eligible.length === 0) {
    console.log("ℹ️  No forms were found in forms-manifest.json.");
    return;
  }
  const packagesDir = join(OUTPUT_DIR, "form-packages");
  await ensureDir(packagesDir);
  const validPackageNames = new Set(
    eligible.map((formEntry) => `${slugForFormPackage(formEntry)}.pdf`),
  );
  validPackageNames.add(HANDBOOK_LETTERHEAD_PACKAGE_FILE_NAME);
  for (const existingFile of await readdir(packagesDir)) {
    if (!existingFile.endsWith(".pdf")) continue;
    if (validPackageNames.has(existingFile)) continue;
    unlinkSync(join(packagesDir, existingFile));
    console.log(
      `  ✓  Removed stale form package: documents/generated-pdfs/form-packages/${existingFile}`,
    );
  }
  console.log(`\n📦  Building ${eligible.length} form package(s)…`);
  for (const f of eligible) {
    await generateFormPackage(f);
  }
  await syncConsolidatedLetterheadIntoHandbookForms(packagesDir);
}

// ── Publish form packages to public/ ─────────────────────────────────────────
/**
 * Copy generated `documents/generated-pdfs/form-packages/{slug}.pdf` files into
 * `public/docs/safety/forms/` (MISH forms) and `public/docs/employee/forms/`
 * (handbook forms) so the Next.js site can serve them at the canonical URLs.
 * Run after `form-packages` (or
 * implicitly via `form-publish`).
 */
async function publishFormPackages() {
  const packagesDir = join(OUTPUT_DIR, "form-packages");
  if (!existsSync(packagesDir)) {
    console.error(
      `❌  No packages found at ${packagesDir}. Run --template form-packages first.`,
    );
    process.exit(1);
  }
  const safetyPublicDir = join(ROOT, "public/docs/safety/forms");
  const handbookPublicDir = join(ROOT, "public/docs/employee/forms");
  await ensureDir(safetyPublicDir);
  await ensureDir(handbookPublicDir);

  const { readdir, copyFile } = await import("node:fs/promises");
  const files = (await readdir(packagesDir)).filter((f) => f.endsWith(".pdf"));
  if (files.length === 0) {
    console.log("ℹ️  No package PDFs to publish.");
    return;
  }
  console.log(`\n🚚  Publishing ${files.length} form package(s) to public/…`);
  for (const f of files) {
    const src = join(packagesDir, f);
    const targetDir = f.startsWith("form-handbook-")
      ? handbookPublicDir
      : safetyPublicDir;
    const dst = join(targetDir, f);
    await copyFile(src, dst);
    console.log(`  ✓  ${dst.replace(ROOT + "/", "")}`);
  }
}

// ── Template: FORM 02-C Incident / Accident Report ───────────────────────────
/**
 * Generate the fillable FORM 02-C Incident / Accident Report PDF.
 * Follows the canonical fillable-form pattern documented in
 * `.github/agents/form-development-officer.agent.md`:
 *   Now a thin alias around the schema-driven renderer. The bespoke
 *   form-02-c-incident-report.html template has been retired in favor
 *   of the manifest schema (forms-manifest.json → fillable.pages) and
 *   the shared form-fillable.html chrome template. Kept for any
 *   external callers / docs that still reference the symbol.
 */
async function generateForm02C() {
  await generateFillableFormById("FORM 02-C");
}

let _browser;
async function getBrowser() {
  if (!_browser) {
    _browser = await puppeteer.launch({
      headless: true,
      timeout: 120000,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  }
  return _browser;
}

/**
 * Render an HTML file to a PDF using Puppeteer.
 * @param {string} htmlPath  — absolute path to the HTML template
 * @param {string} pdfPath   — absolute path for the output PDF
 * @param {object} pageOpts  — Puppeteer PDF options override
 */
async function renderPdf(htmlPath, pdfPath, pageOpts = {}) {
  const defaultOpts = {
    format: "Letter",
    printBackground: true,
    preferCSSPageSize: false,
    margin: {
      top: "0.75in",
      right: "0.75in",
      bottom: "0.75in",
      left: "1.25in",
    },
  };

  let lastErr;
  for (let attempt = 0; attempt < 2; attempt++) {
    const browser = await getBrowser();
    const page = await browser.newPage();
    try {
      // Load the HTML file via file:// protocol so relative CSS paths resolve
      await page.goto(pathToFileURL(htmlPath).toString(), {
        waitUntil: "load",
        timeout: 60000,
      });

      await page.pdf({ path: pdfPath, ...defaultOpts, ...pageOpts });
      lastErr = undefined;
      break;
    } catch (err) {
      lastErr = err;
      const isRetryable =
        attempt === 0 &&
        err instanceof Error &&
        (err.message.includes("Page.printToPDF") ||
          err.message.includes("Printing failed"));

      if (!isRetryable) {
        throw err;
      }

      if (_browser) {
        await _browser.close().catch(() => {});
        _browser = undefined;
      }
    } finally {
      await page.close().catch(() => {});
    }
  }

  if (lastErr) {
    throw lastErr;
  }

  // Normalize metadata so standalone PDFs match merged manual metadata fields.
  const pdfBytes = await readFile(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  pdfDoc.setAuthor(PDF_METADATA_AUTHOR);
  pdfDoc.setCreator(PDF_METADATA_CREATOR);
  pdfDoc.setSubject(PDF_METADATA_SUBJECT);
  const outBytes = await pdfDoc.save();
  await writeFile(pdfPath, outBytes);

  const rel = pdfPath.replace(ROOT + "/", "");
  console.log(`  ✓  ${rel}`);
}

// ── Template: Cover ───────────────────────────────────────────────────────────
async function generateCover() {
  console.log(`\n📄 Generating ${ACTIVE_MANUAL_LABEL} cover…`);
  await ensureDir(OUTPUT_DIR);
  await validateManualCoverCohesionGuardrails();
  const templateName = isEmployeeHandbook
    ? "employee-handbook-cover.html"
    : "safety-manual-cover.html";
  const raw = await readFile(
    join(DOCS_DIR, `manuals/${templateName}`),
    "utf-8",
  );
  const qrDataUrl = await buildQrDataUrl(ACTIVE_MANUAL_DIGITAL_URL);
  const html = applyBrandTokens(raw).replace(
    "{{QR_DIGITAL_MANUAL}}",
    qrDataUrl,
  );
  const coverFileName = isEmployeeHandbook
    ? "employee-handbook-cover.pdf"
    : "safety-manual-cover.pdf";
  const pdfPath = join(OUTPUT_DIR, coverFileName);
  await renderHtmlToPdf(
    html,
    pdfPath,
    { margin: { top: 0, right: 0, bottom: 0, left: 0 } },
    "manuals/_tmp_cover.html",
  );
}

// ── Template: Letterhead ─────────────────────────────────────────────────────
/**
 * Generate the official MH Construction letterhead PDF.
 * Mirrors the cover’s frame/ribbon/footer chrome so printed correspondence
 * lives inside the same brand system as the safety manual.
 */
async function renderSafetyLetterheadPdf(pdfPath) {
  await ensureDir(OUTPUT_DIR);
  await validateHandbookLetterheadFooterParity();
  const raw = await readFile(SAFETY_LETTERHEAD_TEMPLATE_PATH, "utf-8");
  const websiteUrl = BRAND.website?.startsWith("http")
    ? BRAND.website
    : `https://${BRAND.website}`;
  const qrWebsite = await buildQrDataUrl(websiteUrl);
  const html = applyBrandTokens(raw).replace("{{QR_WEBSITE}}", qrWebsite);
  // Page-1 chrome is absolutely positioned to the full Letter sheet, so
  // PDF margins must be 0; CSS owns all spacing. If the body overflows,
  // it paginates onto plain follow-on pages with the signature pushed
  // to whatever page it lands on.
  await renderHtmlToPdf(
    html,
    pdfPath,
    { margin: { top: 0, right: 0, bottom: 0, left: 0 } },
    "manuals/_tmp_letterhead.html",
  );
  await addFillableFieldsToLetterhead(pdfPath);
  return pdfPath;
}

function chunkItems(items, chunkSize) {
  const chunks = [];
  for (let index = 0; index < items.length; index += chunkSize) {
    chunks.push(items.slice(index, index + chunkSize));
  }
  return chunks;
}

function buildWebsiteInventoryPagesHtml(entries, reportDate) {
  const chunks = chunkItems(entries, 4);
  return chunks
    .map((pageEntries, pageIndex) => {
      const rowsHtml = pageEntries
        .map((entry) => {
          const sectionsHtml = entry.sections.length
            ? `<ol class="section-list">${entry.sections
                .map((section) => `<li>${escapeHtml(section)}</li>`)
                .join("")}</ol>`
            : '<span class="empty">No sections listed.</span>';
          const bannersHtml = entry.namedBanners.length
            ? `<ul class="tag-list">${entry.namedBanners
                .map((banner) => `<li>${escapeHtml(banner)}</li>`)
                .join("")}</ul>`
            : '<span class="empty">None named separately.</span>';

          return `
            <tr>
              <td class="route-cell">
                <p class="route">${escapeHtml(entry.route)}</p>
                <p class="route-source">${escapeHtml(entry.source)}</p>
              </td>
              <td class="banner-cell">
                <p class="banner">${escapeHtml(entry.banner)}</p>
                <p class="banner-note">${escapeHtml(entry.bannerNote)}</p>
              </td>
              <td class="sections-cell">${sectionsHtml}</td>
              <td class="cta-cell">${bannersHtml}</td>
            </tr>`;
        })
        .join("");

      return `
        <section class="inventory-page">
          <div class="left-ribbon"></div>
          <div class="identity">
            <span>{{BRAND_COMPANY_NAME}}</span>
            <span><span class="dot">•</span> Website Page Inventory <span class="dot">•</span> Page ${pageIndex + 1} of ${chunks.length}</span>
          </div>
          <div class="header">
            <div class="title-block">
              <div class="logo-wrap">
                <img class="logo" src="{{BRAND_LOGO_COLOR}}" alt="MH Construction logo" />
              </div>
              <div class="title-copy">
                <div class="program-chip">Main Public Routes</div>
                <h1 class="page-title">Current Banner + Section Inventory</h1>
                <p class="page-subtitle">Main website routes currently rendered in apps/website • Generated ${escapeHtml(reportDate)}</p>
              </div>
            </div>
            <div class="summary-card">
              <p class="summary-label">Scope</p>
              <p class="summary-text">This sheet inventories the current top-level public pages, their hero or banner treatment, ordered section structure, and any named CTA or banner components currently rendered.</p>
            </div>
          </div>
          <div class="content">
            <div class="table-shell">
              <table>
                <thead>
                  <tr>
                    <th class="route-cell">Route</th>
                    <th class="banner-cell">Banner / Hero</th>
                    <th class="sections-cell">Ordered Sections</th>
                    <th class="cta-cell">Named Banners / CTAs</th>
                  </tr>
                </thead>
                <tbody>${rowsHtml}</tbody>
              </table>
            </div>
          </div>
          <div class="footer">
            <div>
              <p class="footer-label">Company Contact</p>
              <p class="footer-name">{{BRAND_COMPANY_NAME}}</p>
              <p class="footer-meta">{{BRAND_ADDRESS_STREET}} · {{BRAND_ADDRESS_CITYSTATEZIP}}</p>
              <p class="footer-meta">{{BRAND_PHONE}} · {{BRAND_WEBSITE}} · {{BRAND_LICENSES_INLINE}}</p>
            </div>
            <div class="trust-wrap">
              <p class="footer-label">Accreditation And Trust</p>
              <div class="trust-logos">
                <img class="agc" src="{{BRAND_AGC_HORIZONTAL}}" alt="AGC membership" />
                <img class="bbb" src="{{BRAND_BBB_SEAL}}" alt="BBB accredited business" />
                <img class="vob" src="{{BRAND_WA_VOB_LOGO}}" alt="Veteran owned business" />
              </div>
            </div>
          </div>
        </section>`;
    })
    .join("");
}

async function generateWebsitePagesInventory() {
  console.log("\n🗂  Generating website page inventory sheet…");
  await ensureDir(OUTPUT_DIR);
  const templatePath = join(DOCS_DIR, "manuals/website-page-inventory.html");
  const raw = await readFile(templatePath, "utf-8");
  const reportDate = new Date().toISOString().slice(0, 10);
  const html = applyBrandTokens(
    raw
      .replace("{{REPORT_DATE}}", reportDate)
      .replace(
        "{{INVENTORY_PAGES_HTML}}",
        buildWebsiteInventoryPagesHtml(WEBSITE_PAGE_INVENTORY, reportDate),
      ),
  );
  const pdfPath = join(OUTPUT_DIR, "website-page-inventory.pdf");
  await renderHtmlToPdf(
    html,
    pdfPath,
    { margin: { top: 0, right: 0, bottom: 0, left: 0 }, landscape: true },
    "manuals/_tmp_website_page_inventory.html",
  );
}

const WEBSITE_IMAGE_NEEDS = [
  {
    area: "Brand identity",
    needs:
      "Primary logo variants, alternate marks, and trust badges used across headers, footers, and print-ready assets.",
    sources:
      "public/images/logo/ · public/images/credentials/ · public/images/compliance/",
  },
  {
    area: "Open Graph and share cards",
    needs:
      "Custom preview art for the homepage, services, projects, safety, team, careers, contact, resources, and handbook pages.",
    sources: "public/images/og/",
  },
  {
    area: "Homepage and hero visuals",
    needs:
      "The main homepage hero image plus any high-impact banner art used on landing pages and campaign pages.",
    sources:
      "public/images/home-hero-poster.jpg · public/images/projects/ · public/images/events/ · public/images/news/",
  },
  {
    area: "Team photography",
    needs:
      "Individual portraits, alternate crops, and the team group photo for profile sections and leadership pages.",
    sources: "public/images/team/",
  },
  {
    area: "Safety visuals",
    needs:
      "Safety culture, quality control, EMR/awards, compliance, and supporting snapshots for safety-focused pages.",
    sources: "public/images/safety/",
  },
  {
    area: "Social media graphics",
    needs:
      "Announcement art, reusable post templates, and testimonial graphics for social promotion and branded updates.",
    sources: "public/images/social/",
  },
  {
    area: "QR code assets",
    needs:
      "QR source images plus the download-friendly mirror used for print collateral and document handouts.",
    sources: "public/images/qr-codes/ · public/images/qr-downloads/",
  },
  {
    area: "Background and utility art",
    needs:
      "Patterns, textures, placeholders, and supporting graphics used to fill gaps without breaking layout consistency.",
    sources:
      "public/images/patterns/ · public/images/textures/ · public/images/placeholder*.webp",
  },
  {
    area: "Geographic and vendor visuals",
    needs:
      "State, vendor, culture, and testimonial imagery that supports region pages, partner references, and credibility sections.",
    sources:
      "public/images/states/ · public/images/vendors/ · public/images/culture/ · public/images/testimonials/",
  },
];

function escapeHtmlForImageAudit(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function parseImageNeedSources(sourceString) {
  return sourceString
    .split("·")
    .map((segment) => segment.trim())
    .filter(Boolean);
}
const IMAGE_ASSET_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".svg",
  ".gif",
  ".avif",
]);

function isImageAssetFileName(fileName) {
  return IMAGE_ASSET_EXTENSIONS.has(extname(fileName).toLowerCase());
}

function collectImageNames(dirPath, maxItems = 5) {
  const collected = [];

  function walk(currentPath, prefix = "") {
    if (collected.length >= maxItems) return;
    const entries = readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      if (collected.length >= maxItems) break;
      if (entry.name.startsWith(".")) continue;

      const fullPath = join(currentPath, entry.name);
      const relName = prefix ? `${prefix}/${entry.name}` : entry.name;

      if (entry.isDirectory()) {
        walk(fullPath, relName);
        continue;
      }

      if (entry.isFile() && isImageAssetFileName(entry.name)) {
        collected.push(relName);
      }
    }
  }

  walk(dirPath);
  return collected;
}

function countImageAssets(dirPath) {
  let total = 0;

  function walk(currentPath) {
    const entries = readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.name.startsWith(".")) continue;
      const fullPath = join(currentPath, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }

      if (entry.isFile() && isImageAssetFileName(entry.name)) {
        total += 1;
      }
    }
  }

  walk(dirPath);
  return total;
}

function isDirectoryPathSpec(spec) {
  return spec.endsWith("/");
}

function wildcardRegexFromSpec(spec) {
  const escaped = spec
    .replace(/[.+^${}()|[\]\\]/g, "\\$&")
    .replaceAll("*", ".*");
  return new RegExp(`^${escaped}$`, "i");
}

function evaluateSourceSpec(spec) {
  const relativeSpec = spec.replace(/^\/+/, "");
  const absoluteSpec = join(ROOT, "apps/website", relativeSpec);

  // Wildcard patterns are evaluated against files in their parent directory.
  if (relativeSpec.includes("*")) {
    const lastSlashIndex = absoluteSpec.lastIndexOf("/");
    const parentDir =
      lastSlashIndex === -1
        ? dirname(absoluteSpec)
        : absoluteSpec.slice(0, lastSlashIndex);
    const pattern =
      lastSlashIndex === -1
        ? absoluteSpec
        : absoluteSpec.slice(lastSlashIndex + 1);
    const matcher = wildcardRegexFromSpec(pattern);

    if (!existsSync(parentDir) || !statSync(parentDir).isDirectory()) {
      return { spec, ok: false, kind: "wildcard", matches: 0, sampleNames: [] };
    }

    const matches = readdirSync(parentDir)
      .filter((name) => matcher.test(name) && isImageAssetFileName(name))
      .sort((left, right) =>
        left.localeCompare(right, undefined, { numeric: true }),
      );

    return {
      spec,
      ok: matches.length > 0,
      kind: "wildcard",
      matches: matches.length,
      sampleNames: matches.slice(0, 5),
    };
  }

  if (!existsSync(absoluteSpec)) {
    return {
      spec,
      ok: false,
      kind: isDirectoryPathSpec(relativeSpec) ? "directory" : "file",
      matches: 0,
      sampleNames: [],
    };
  }

  const stats = statSync(absoluteSpec);
  if (stats.isDirectory()) {
    const fileCount = countImageAssets(absoluteSpec);
    return {
      spec,
      ok: fileCount > 0,
      kind: "directory",
      matches: fileCount,
      sampleNames: collectImageNames(absoluteSpec, 5),
    };
  }

  const fileName = relativeSpec.split("/").pop() || relativeSpec;
  return { spec, ok: true, kind: "file", matches: 1, sampleNames: [fileName] };
}

function buildWebsiteImageNeedsAudit(rows) {
  return rows.map((row) => {
    const checks = parseImageNeedSources(row.sources).map(evaluateSourceSpec);
    const okCount = checks.filter((check) => check.ok).length;
    const totalCount = checks.length;

    return {
      ...row,
      checks,
      okCount,
      totalCount,
      statusLabel:
        okCount === totalCount
          ? "Complete"
          : okCount === 0
            ? "Missing"
            : "Partial",
    };
  });
}

function buildWebsiteImageNeedsRowsHtml(auditRows) {
  return auditRows
    .map((row) => {
      const checksHtml = row.checks
        .map((check) => {
          const badgeLabel = check.ok ? "OK" : "Missing";
          const badgeClass = check.ok ? "ok" : "missing";
          const detail =
            check.kind === "directory"
              ? `${check.matches} item${check.matches === 1 ? "" : "s"}`
              : check.kind === "wildcard"
                ? `${check.matches} match${check.matches === 1 ? "" : "es"}`
                : check.ok
                  ? "file present"
                  : "file missing";

          const sampleNamesText = check.sampleNames.length
            ? `Names: ${check.sampleNames.join(", ")}${
                check.matches > check.sampleNames.length
                  ? ` (+${check.matches - check.sampleNames.length} more)`
                  : ""
              }`
            : "Names: none found";

          return `<div class="source-row"><span class="badge ${badgeClass}">${badgeLabel}</span><span class="source-path">${escapeHtmlForImageAudit(check.spec)}</span><span class="source-detail">${detail}</span><span class="source-names">${escapeHtmlForImageAudit(sampleNamesText)}</span></div>`;
        })
        .join("");

      return `
        <tr>
          <td class="area">${escapeHtmlForImageAudit(row.area)}<div class="row-status">${row.okCount}/${row.totalCount} sources · ${row.statusLabel}</div></td>
          <td class="needs">${escapeHtmlForImageAudit(row.needs)}</td>
          <td class="sources">${checksHtml}</td>
        </tr>`;
    })
    .join("");
}

function buildWebsiteImageNeedsPagesHtml(
  auditRows,
  reportDate,
  coverageText,
  logoSrc,
) {
  const chunks = chunkItems(auditRows, 2);

  return chunks
    .map((pageRows, pageIndex) => {
      const pageNumber = pageIndex + 1;
      const totalPages = chunks.length;

      return `
        <section class="page">
          <div class="ribbon"></div>
          <div class="content">
            <header class="header">
              <div class="logo-wrap">
                <img class="logo" src="${escapeHtmlForImageAudit(logoSrc)}" alt="MH Construction logo" />
              </div>
              <div class="header-copy">
                <p class="eyebrow">{{BRAND_COMPANY_NAME}} · Image Tracking</p>
                <h1 class="title">Website Image Needs Audit</h1>
                <p class="subtitle">Missing-file audit for the image families the website relies on most. Long source paths are wrapped to avoid text bleed in print.</p>
              </div>
            </header>

            <div class="meta-row">
              <div class="meta-card">
                <p class="meta-label">Report Date</p>
                <p class="meta-value">${reportDate}</p>
              </div>
              <div class="meta-card">
                <p class="meta-label">Download Location</p>
                <p class="meta-value">documents/downloads/shared/website-image-needs.pdf</p>
              </div>
              <div class="meta-card">
                <p class="meta-label">Coverage</p>
                <p class="meta-value">${coverageText}</p>
              </div>
            </div>

            <div class="table-shell">
              <table>
                <thead>
                  <tr>
                    <th>Area</th>
                    <th>What The Website Needs</th>
                    <th>Source Coverage Audit</th>
                  </tr>
                </thead>
                <tbody>
                  ${buildWebsiteImageNeedsRowsHtml(pageRows)}
                </tbody>
              </table>
            </div>
          </div>

          <footer class="footer">
            <p class="footer-note">Missing source paths are marked with a red Missing badge. Keep core image families complete before adding one-off assets.</p>
            <p class="footer-page">Page ${pageNumber} of ${totalPages}</p>
          </footer>
        </section>`;
    })
    .join("");
}

async function generateWebsiteImageNeeds() {
  console.log("\n🖼️  Generating website image needs sheet…");
  await ensureDir(OUTPUT_DIR);
  const reportDate = new Date().toISOString().slice(0, 10);
  const auditRows = buildWebsiteImageNeedsAudit(WEBSITE_IMAGE_NEEDS);
  const totalChecks = auditRows.reduce((sum, row) => sum + row.totalCount, 0);
  const passedChecks = auditRows.reduce((sum, row) => sum + row.okCount, 0);
  const coveragePercent =
    totalChecks === 0 ? 0 : Math.round((passedChecks / totalChecks) * 100);
  const coverageText = `${passedChecks}/${totalChecks} sources present (${coveragePercent}%)`;
  const headerLogoSrc =
    LOGO_COLOR_DATA_URL || BRAND_TOKENS["{{BRAND_LOGO_COLOR}}"] || "";

  const html = applyBrandTokens(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MH Construction Website Image Needs</title>
        <style>
          :root {
            --brand-primary: {{BRAND_COLOR_PRIMARY}};
            --brand-primary-dark: {{BRAND_COLOR_PRIMARY_DARK}};
            --brand-primary-darker: {{BRAND_COLOR_PRIMARY_DARKER}};
            --brand-secondary: {{BRAND_COLOR_SECONDARY}};
            --brand-secondary-light: {{BRAND_COLOR_SECONDARY_LIGHT}};
            --ink: #102119;
            --paper: #ffffff;
            --muted: #f5f8f6;
            --grid: #d8e1dc;
            --font-heading: "mendl-sans-dusk", "Mendl Sans Dusk", sans-serif;
            --font-body: "mendl-sans-dusk", "Mendl Sans Dusk", sans-serif;
          }

          *,
          *::before,
          *::after {
            box-sizing: border-box;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          @page {
            size: letter landscape;
            margin: 0;
          }

          html,
          body {
            margin: 0;
            padding: 0;
            width: 11in;
            background: var(--paper);
            color: var(--ink);
            font-family: var(--font-body);
          }

          .page {
            position: relative;
            width: 11in;
            min-height: 8.5in;
            background: var(--paper);
            overflow: hidden;
          }

          .page + .page {
            page-break-before: always;
            break-before: page;
          }

          .page::before {
            content: "";
            position: absolute;
            inset: 0.22in;
            border: 1.2pt solid var(--brand-primary);
            pointer-events: none;
          }

          .page::after {
            content: "";
            position: absolute;
            inset: 0.34in;
            border: 0.6pt solid var(--brand-secondary);
            pointer-events: none;
          }

          .ribbon {
            position: absolute;
            top: 0.44in;
            left: 0.44in;
            bottom: 0.44in;
            width: 0.28in;
            background: linear-gradient(180deg, var(--brand-primary) 0%, var(--brand-secondary) 100%);
          }

          .content {
            position: relative;
            z-index: 1;
            padding: 0.54in 0.92in 1.18in 0.94in;
          }

          .header {
            display: grid;
            grid-template-columns: 1.72in minmax(0, 1fr);
            gap: 12pt;
            align-items: start;
          }

          .logo-wrap {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 1.62in;
            min-height: 0.98in;
            padding: 8pt;
            border: 0.9pt solid var(--brand-secondary);
            border-radius: 6pt;
            background: var(--muted);
          }

          .logo {
            width: 100%;
            max-width: 1.42in;
            height: auto;
            display: block;
            object-fit: contain;
          }

          .header-copy {
            min-width: 0;
          }

          .eyebrow {
            margin: 0 0 8pt 0;
            color: var(--brand-secondary);
            font-family: var(--font-heading);
            font-size: 7pt;
            font-weight: 900;
            letter-spacing: 0.16em;
            text-transform: uppercase;
          }

          .title {
            margin: 0;
            max-width: 6.7in;
            color: var(--brand-primary);
            font-family: var(--font-heading);
            font-size: 20pt;
            font-weight: 900;
            line-height: 0.96;
            letter-spacing: 0.01em;
            text-transform: uppercase;
          }

          .subtitle {
            margin: 9pt 0 0;
            max-width: 6.6in;
            color: var(--brand-primary-darker);
            font-size: 9pt;
            line-height: 1.42;
          }

          .meta-row {
            display: flex;
            justify-content: space-between;
            gap: 16pt;
            align-items: flex-start;
            margin-top: 16pt;
            margin-bottom: 14pt;
            padding: 10pt 12pt;
            border: 0.9pt solid var(--brand-secondary);
            border-radius: 8pt;
            background: linear-gradient(180deg, #ffffff 0%, var(--muted) 100%);
          }

          .meta-card {
            flex: 1;
          }

          .meta-label {
            margin: 0 0 4pt;
            color: var(--brand-secondary);
            font-size: 6.8pt;
            font-weight: 800;
            letter-spacing: 0.14em;
            text-transform: uppercase;
          }

          .meta-value {
            margin: 0;
            color: var(--brand-primary-darker);
            font-size: 8.2pt;
            line-height: 1.35;
            overflow-wrap: anywhere;
            word-break: break-word;
            white-space: normal;
          }

          .table-shell {
            border: 1pt solid var(--brand-primary);
            border-radius: 8pt;
            overflow: hidden;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
          }

          thead th {
            padding: 8pt 10pt;
            background: linear-gradient(90deg, var(--brand-primary) 0%, var(--brand-primary-dark) 100%);
            color: #fff;
            font-size: 6.7pt;
            font-weight: 800;
            letter-spacing: 0.13em;
            text-transform: uppercase;
            text-align: left;
            vertical-align: bottom;
          }

          tbody td {
            padding: 8pt 10pt;
            border-top: 0.6pt solid var(--grid);
            vertical-align: top;
            font-size: 8pt;
            line-height: 1.3;
            overflow-wrap: anywhere;
            word-break: break-word;
            white-space: normal;
          }

          tbody tr:nth-child(even) td {
            background: #fafcfb;
          }

          tr {
            page-break-inside: avoid;
            break-inside: avoid;
          }

          .area {
            width: 1.7in;
            font-weight: 800;
            color: var(--brand-primary-darker);
          }

          .needs {
            width: 3.75in;
          }

          .sources {
            width: 2.95in;
            color: var(--brand-primary-dark);
            font-size: 7.7pt;
          }

          .source-row {
            display: block;
            margin-bottom: 4pt;
            break-inside: avoid;
            overflow-wrap: anywhere;
            word-break: break-word;
          }

          .source-row:last-child {
            margin-bottom: 0;
          }

          .badge {
            display: inline-block;
            min-width: 38pt;
            margin-right: 5pt;
            padding: 1pt 5pt;
            border-radius: 10pt;
            font-size: 6.4pt;
            font-weight: 800;
            letter-spacing: 0.07em;
            text-transform: uppercase;
            text-align: center;
            vertical-align: top;
          }

          .badge.ok {
            background: #e5f3ec;
            color: #1e5e43;
            border: 0.5pt solid #2f7a58;
          }

          .badge.missing {
            background: #fff0eb;
            color: #8a2f1d;
            border: 0.5pt solid #b84e37;
          }

          .source-path {
            font-weight: 700;
          }

          .source-detail {
            margin-left: 44pt;
            display: block;
            font-size: 7pt;
            color: var(--brand-primary-darker);
          }

          .source-names {
            margin-left: 44pt;
            display: block;
            margin-top: 2pt;
            font-size: 6.7pt;
            line-height: 1.3;
            color: var(--brand-primary-dark);
            overflow-wrap: anywhere;
            word-break: break-word;
            white-space: normal;
          }

          .row-status {
            margin-top: 4pt;
            font-size: 6.8pt;
            font-weight: 800;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: var(--brand-secondary);
          }

          .footer {
            position: absolute;
            left: 0.94in;
            right: 0.92in;
            bottom: 0.46in;
            display: flex;
            justify-content: space-between;
            gap: 16pt;
            align-items: center;
            border-top: 1pt solid var(--brand-secondary);
            padding-top: 8pt;
          }

          .footer-note {
            margin: 0;
            color: var(--brand-primary-darker);
            font-size: 7.4pt;
            line-height: 1.35;
            overflow-wrap: anywhere;
            word-break: break-word;
            white-space: normal;
          }

          .footer-page {
            margin: 0;
            flex: 0 0 auto;
            color: var(--brand-primary);
            font-size: 7pt;
            font-weight: 800;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            white-space: nowrap;
          }
        </style>
      </head>
      <body>
        ${buildWebsiteImageNeedsPagesHtml(auditRows, reportDate, coverageText, headerLogoSrc)}
      </body>
    </html>
  `);
  const pdfPath = join(OUTPUT_DIR, "website-image-needs.pdf");
  await renderHtmlToPdf(
    html,
    pdfPath,
    { margin: { top: 0, right: 0, bottom: 0, left: 0 }, landscape: true },
    "manuals/_tmp_website_image_needs.html",
  );
}

async function generateLetterhead() {
  console.log("\n✉️  Generating consolidated company letterhead…");
  const pdfPath = join(OUTPUT_DIR, CONSOLIDATED_LETTERHEAD_FILE_NAME);
  await renderSafetyLetterheadPdf(pdfPath);
  for (const legacyFileName of LEGACY_LETTERHEAD_FILE_NAMES) {
    const legacyPath = join(OUTPUT_DIR, legacyFileName);
    if (existsSync(legacyPath)) unlinkSync(legacyPath);
  }
  return pdfPath;
}

async function syncConsolidatedLetterheadIntoHandbookForms(packagesDir) {
  const letterheadPath = await generateLetterhead();
  const packagePath = join(packagesDir, HANDBOOK_LETTERHEAD_PACKAGE_FILE_NAME);
  await copyFile(letterheadPath, packagePath);
  console.log(
    `  ✓  ${packagePath.replace(ROOT + "/", "")}  (consolidated letterhead)`,
  );
}

// ── Template: Spine ───────────────────────────────────────────────────────────
async function generateSpine() {
  console.log(`\n📐 Generating ${ACTIVE_MANUAL_LABEL} spine…`);
  await ensureDir(OUTPUT_DIR);
  await validateSpineTemplateGuardrails();
  const templateName = isEmployeeHandbook
    ? "employee-handbook-spine.html"
    : "safety-manual-spine.html";
  const raw = await readFile(
    join(DOCS_DIR, `manuals/${templateName}`),
    "utf-8",
  );
  const html = applyBrandTokens(raw);
  const spineFileName = isEmployeeHandbook
    ? "employee-handbook-spine.pdf"
    : "safety-manual-spine.pdf";
  const pdfPath = join(OUTPUT_DIR, spineFileName);
  await renderHtmlToPdf(
    html,
    pdfPath,
    { margin: { top: 0, right: 0, bottom: 0, left: 0 } },
    "manuals/_tmp_spine.html",
  );
}

// ── Template: MISH Table of Contents ─────────────────────────────────────────
/**
 * Generate the high-fidelity MISH Program Table of Contents PDF.
 *
 * Section titles and the set of present MISH numbers are read from
 * safety-manual.json (the manifest produced by `npm run docs:extract`).
 * If the manifest is absent or unreadable the function falls back to
 * FALLBACK_MISH_TITLES so a standalone `--template toc` run still works
 * before extraction has been performed.
 *
 * Cluster groupings are defined in TOC_CLUSTERS (in generate.mjs).
 * Sections added to or removed from the manifest are automatically reflected
 * the next time this function runs — no manual edits to the template needed.
 *
 * Output: documents/generated-pdfs/safety-manual-toc.pdf
 */
async function generateToc() {
  if (isEmployeeHandbook) {
    console.log(
      "\n📋 Skipping Table of Contents (handbook uses simple section listing)",
    );
    return;
  }

  console.log("\n📋 Generating MISH Table of Contents…");
  await ensureDir(OUTPUT_DIR);
  await ensureDir(CANONICAL_OUTPUT_DIR);

  // ── 1. Resolve section titles ───────────────────────────────────────────
  let titleMap = new Map(FALLBACK_MISH_TITLES);
  let presentNums = new Set(FALLBACK_MISH_TITLES.keys());

  if (existsSync(MANIFEST)) {
    try {
      const { sections } = JSON.parse(await readFile(MANIFEST, "utf-8"));
      // Rebuild from manifest — skip Section 00 (legacy TOC section)
      const liveMap = new Map();
      const liveNums = new Set();
      for (const s of sections) {
        const n = Number(s.number);
        if (n > 0) {
          liveMap.set(n, s.title || `Section ${n}`);
          liveNums.add(n);
        }
      }
      if (liveNums.size > 0) {
        titleMap = liveMap;
        presentNums = liveNums;
        console.log(`  ℹ  Using manifest: ${liveNums.size} section(s) found`);
      }
    } catch {
      console.warn(
        "  ⚠  safety-manual.json unreadable — using fallback titles",
      );
    }
  } else {
    console.log("  ℹ  safety-manual.json not found — using fallback titles");
  }

  // ── 2. Build cluster HTML and inject into template ──────────────────────
  // Load forms and build formsMap keyed by section number using each form's
  // manualSection linkage so associated forms always render under the
  // corresponding MISH section in print order.
  let formsMap = new Map();
  try {
    const forms = await loadFormsManifest();
    const sectionLinkedForms = forms.filter(
      (f) => resolveMishSectionTargets(f.manualSection).length > 0,
    );
    formsMap = buildTocSectionFormsMap(sectionLinkedForms);

    console.log(
      `  ℹ  Added ${sectionLinkedForms.length} associated form(s) across ${formsMap.size} MISH section(s)`,
    );
  } catch (err) {
    console.warn(`  ⚠  Could not load forms manifest: ${err.message}`);
  }

  const { page1, page2, page3, extraPages } = splitTocNumsByFlow(
    presentNums,
    formsMap,
  );

  const tocPage1Html = buildTocClustersHtml(titleMap, page1, formsMap);
  const tocPage2Html = buildTocClustersHtml(titleMap, page2, formsMap);
  const tocPage3Html = buildTocClustersHtml(titleMap, page3, formsMap);
  const hasPage3 = page3.size > 0;
  const tocExtraPagesHtml = extraPages
    .map((pageNums, index) =>
      buildTocContinuationPageHtml(
        4 + index,
        buildTocClustersHtml(titleMap, pageNums, formsMap),
      ),
    )
    .join("\n");

  const raw = await readFile(CANONICAL_TOC_TEMPLATE_PATH, "utf-8");
  // Use replaceAll with function form: the template has the placeholder in both
  // the developer comment and the <main> body — .replace() would only hit the
  // comment. Function form also prevents $ in the replacement being interpreted
  // as a special pattern (e.g. $& would re-insert the match).
  let html = applyBrandTokens(raw)
    .replaceAll("{{TOC_CLUSTERS_PAGE_1_HTML}}", () => tocPage1Html)
    .replaceAll("{{TOC_CLUSTERS_PAGE_2_HTML}}", () => tocPage2Html)
    .replaceAll("{{TOC_CLUSTERS_PAGE_3_HTML}}", () => {
      if (process.env.DEBUG_TOC) {
        console.log(
          `  📋 Injecting page 3 HTML, length: ${tocPage3Html.length}`,
        );
      }
      return tocPage3Html;
    })
    .replaceAll("{{TOC_PAGE_3_NUMBER}}", () => "3")
    .replaceAll("{{TOC_EXTRA_PAGES_HTML}}", () => tocExtraPagesHtml);

  // Dynamic continuation pages inject BRAND tokens, so run a final brand pass.
  html = applyBrandTokens(html);

  const unresolvedTocTokens = html.match(/\{\{TOC_[A-Z0-9_]+\}\}/g) || [];
  if (unresolvedTocTokens.length > 0) {
    throw new Error(
      `Unresolved TOC template token(s): ${[...new Set(unresolvedTocTokens)].join(", ")}`,
    );
  }

  const unresolvedBrandTokens = html.match(/\{\{BRAND_[A-Z0-9_]+\}\}/g) || [];
  if (unresolvedBrandTokens.length > 0) {
    throw new Error(
      `Unresolved brand token(s): ${[...new Set(unresolvedBrandTokens)].join(", ")}`,
    );
  }

  if (process.env.DEBUG_TOC) {
    const page3HtmlCount = (html.match(/mish-entry/g) || []).length;
    console.log(`  📋 Total mish-entry elements in HTML: ${page3HtmlCount}`);
    const page3Exists = html.includes('id="toc-page-3"');
    console.log(`  📋 Page 3 div exists: ${page3Exists}`);
    const page3ClusterExists = html.includes(
      '<div class="cluster">' +
        '<h2 class="cluster-head">MISH Forms Appendix</h2>',
    );
    console.log(`  📋 Page 3 cluster exists: ${page3ClusterExists}`);
  }

  // Conditionally show/hide page 3 based on whether a third section slice exists
  if (hasPage3) {
    const before = html;
    html = html.replace(
      /id="toc-page-3"\s+style="display:\s*none;?"/,
      'id="toc-page-3"',
    );
    if (before !== html) {
      console.log(`  ✓  Page 3 made visible`);
    } else {
      console.warn(
        `  ⚠  Failed to make page 3 visible (replacement string not found)`,
      );
    }
  }

  // Debug: write intermediate HTML to check forms are present
  if (process.env.DEBUG_TOC) {
    const debugPath = join(CANONICAL_OUTPUT_DIR, "_toc_debug.html");
    await writeFile(debugPath, html, "utf-8");
    console.log(`  📝 Debug HTML written to: ${debugPath}`);
  }

  // ── 3. Render to PDF ────────────────────────────────────────────────────
  const pdfPath = join(CANONICAL_OUTPUT_DIR, "safety-manual-toc.pdf");

  // Additional debug: verify page 3 is visible in HTML before rendering
  if (html.includes('id="toc-page-3"')) {
    const page3Match = html.match(/id="toc-page-3"[^>]*/);
    if (page3Match) {
      console.log(`  📋 Page 3 tag: ${page3Match[0]}`);
    } else {
      console.log(`  ⚠  Page 3 id found but no tag match`);
    }
  } else {
    console.log(`  ⚠  Page 3 id NOT found in HTML`);
  }

  await renderHtmlToPdf(
    html,
    pdfPath,
    {
      displayHeaderFooter: false,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    },
    "manuals/_tmp_toc.html",
  );
  const appPdfPath = join(OUTPUT_DIR, "safety-manual-toc.pdf");
  if (appPdfPath !== pdfPath) {
    await copyFile(pdfPath, appPdfPath);
  }
  return pdfPath;
}

function assertGuardrailRegex(issues, source, regex, message) {
  if (!regex.test(source)) {
    issues.push(message);
  }
}

function validateTemplateGuardrails(templateLabel, source, checks) {
  const issues = [];
  for (const check of checks) {
    assertGuardrailRegex(issues, source, check.regex, check.message);
  }
  if (issues.length === 0) return;
  const details = issues.map((issue) => `  - ${issue}`).join("\n");
  throw new Error(
    `Guardrail validation failed for ${templateLabel}:\n${details}`,
  );
}

function validateFormFillableTemplateGuardrails(templateHtml, templatePath) {
  validateTemplateGuardrails(
    `form-fillable template (${templatePath})`,
    templateHtml,
    [
      {
        regex:
          /\.sheet::before[\s\S]*?top:\s*0\.22in[\s\S]*?left:\s*0\.22in[\s\S]*?right:\s*0\.22in/i,
        message:
          "Missing canonical outer frame metrics (top/left/right 0.22in)",
      },
      {
        regex:
          /\.sheet::after[\s\S]*?top:\s*0\.33in[\s\S]*?left:\s*0\.33in[\s\S]*?right:\s*0\.33in/i,
        message:
          "Missing canonical inner frame metrics (top/left/right 0.33in)",
      },
      {
        regex:
          /\.left-ribbon[\s\S]*?top:\s*0\.45in[\s\S]*?left:\s*0\.45in[\s\S]*?width:\s*0\.28in/i,
        message:
          "Missing canonical ribbon metrics (top/left 0.45in, width 0.28in)",
      },
      {
        regex:
          /\.footer[\s\S]*?bottom:\s*0\.62in[\s\S]*?grid-template-columns:\s*1\.45fr\s+1fr/i,
        message:
          "Missing canonical footer metrics (bottom 0.62in, grid 1.45fr 1fr)",
      },
    ],
  );
}

function validateTocTemplateGuardrails(templateHtml, templatePath) {
  validateTemplateGuardrails(`TOC template (${templatePath})`, templateHtml, [
    {
      regex:
        /\.toc-page::before[\s\S]*?(?:inset:\s*0\.22in|top:\s*0\.22in[\s\S]*?left:\s*0\.22in[\s\S]*?right:\s*0\.22in[\s\S]*?height:\s*10\.56in)/i,
      message: "Missing canonical TOC outer frame inset (0.22in)",
    },
    {
      regex:
        /\.toc-page::after[\s\S]*?(?:inset:\s*0\.33in|top:\s*0\.33in[\s\S]*?left:\s*0\.33in[\s\S]*?right:\s*0\.33in[\s\S]*?height:\s*10\.34in)/i,
      message: "Missing canonical TOC inner frame inset (0.33in)",
    },
    {
      regex:
        /\.toc-ribbon[\s\S]*?top:\s*0\.45in[\s\S]*?left:\s*0\.45in[\s\S]*?height:\s*10\.10in[\s\S]*?width:\s*0\.28in/i,
      message:
        "Missing canonical TOC ribbon metrics (top/left 0.45in, width 0.28in)",
    },
    {
      regex:
        /(?:\.footer|\.bottom|\.toc-footer-row)[\s\S]*?bottom:\s*0\.62in[\s\S]*?grid-template-columns:\s*1\.45fr\s+1fr/i,
      message:
        "Missing canonical TOC footer metrics (bottom 0.62in, grid 1.45fr 1fr)",
    },
  ]);
}

function normalizeParityBlock(source) {
  return source.replace(/\r\n/g, "\n").replace(/\s+/g, " ").trim();
}

function extractLetterheadFooterCssBlock(source, templatePath) {
  const match = source.match(
    /\/\*\s*── Footer \(page-1 absolute\)[\s\S]*?\.veteran-strip \.sep \{[\s\S]*?\}/,
  );
  if (!match) {
    throw new Error(
      `Guardrail validation failed: could not locate footer CSS block in ${templatePath}`,
    );
  }
  return match[0];
}

function extractFirstLetterheadFooterMarkup(source, templatePath) {
  const match = source.match(/<footer class="footer">[\s\S]*?<\/footer>/);
  if (!match) {
    throw new Error(
      `Guardrail validation failed: could not locate footer markup block in ${templatePath}`,
    );
  }
  return match[0];
}

async function validateHandbookLetterheadFooterParity() {
  if (!existsSync(SAFETY_LETTERHEAD_TEMPLATE_PATH)) {
    throw new Error(
      `Letterhead template not found: ${SAFETY_LETTERHEAD_TEMPLATE_PATH}`,
    );
  }
  if (!existsSync(HANDBOOK_LETTERHEAD_TEMPLATE_PATH)) {
    throw new Error(
      `Letterhead template not found: ${HANDBOOK_LETTERHEAD_TEMPLATE_PATH}`,
    );
  }

  const [safetyHtml, handbookHtml] = await Promise.all([
    readFile(SAFETY_LETTERHEAD_TEMPLATE_PATH, "utf-8"),
    readFile(HANDBOOK_LETTERHEAD_TEMPLATE_PATH, "utf-8"),
  ]);

  const safetyCss = normalizeParityBlock(
    extractLetterheadFooterCssBlock(
      safetyHtml,
      SAFETY_LETTERHEAD_TEMPLATE_PATH,
    ),
  );
  const handbookCss = normalizeParityBlock(
    extractLetterheadFooterCssBlock(
      handbookHtml,
      HANDBOOK_LETTERHEAD_TEMPLATE_PATH,
    ),
  );

  if (safetyCss !== handbookCss) {
    throw new Error(
      "Guardrail validation failed: employee-handbook-letterhead footer CSS must match safety-manual-letterhead footer CSS exactly.",
    );
  }

  const safetyFooter = normalizeParityBlock(
    extractFirstLetterheadFooterMarkup(
      safetyHtml,
      SAFETY_LETTERHEAD_TEMPLATE_PATH,
    ),
  );
  const handbookFooter = normalizeParityBlock(
    extractFirstLetterheadFooterMarkup(
      handbookHtml,
      HANDBOOK_LETTERHEAD_TEMPLATE_PATH,
    ),
  );

  if (safetyFooter !== handbookFooter) {
    throw new Error(
      "Guardrail validation failed: employee-handbook-letterhead footer markup must match safety-manual-letterhead footer markup exactly.",
    );
  }
}

async function validateCanonicalFooterClassUsage() {
  const manualsDir = join(DOCS_DIR, "manuals");
  const entries = await readdir(manualsDir, { withFileTypes: true });
  const htmlFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
    .map((entry) => join(manualsDir, entry.name));

  const violations = [];
  for (const templatePath of htmlFiles) {
    const html = await readFile(templatePath, "utf-8");
    if (/class="(?:bottom|policy-footer|tab-footer)"/i.test(html)) {
      violations.push(
        `${templatePath}: found legacy footer class in markup (bottom/policy-footer/tab-footer)`,
      );
    }
    if (/\.(?:bottom|policy-footer|tab-footer)\b[\s\S]*?\{/i.test(html)) {
      violations.push(
        `${templatePath}: found legacy footer selector in CSS (.bottom/.policy-footer/.tab-footer)`,
      );
    }
  }

  if (violations.length > 0) {
    throw new Error(
      `Guardrail validation failed: only canonical footer classes are allowed in manuals templates.\n  - ${violations.join("\n  - ")}`,
    );
  }
}

async function collectHtmlTemplateFiles(dirPath) {
  if (!existsSync(dirPath)) return [];

  const out = [];
  const entries = await readdir(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await collectHtmlTemplateFiles(fullPath)));
      continue;
    }
    if (
      entry.isFile() &&
      entry.name.endsWith(".html") &&
      !entry.name.startsWith("_tmp_")
    ) {
      out.push(fullPath);
    }
  }
  return out;
}

async function validateManualTemplateTypographyGuardrails() {
  const manualsDir = join(DOCS_DIR, "manuals");
  const formsDir = join(DOCS_DIR, "forms");
  const htmlFiles = [
    ...(await collectHtmlTemplateFiles(manualsDir)),
    ...(await collectHtmlTemplateFiles(formsDir)),
  ];

  const violations = [];
  for (const templatePath of htmlFiles) {
    const html = await readFile(templatePath, "utf-8");
    const isCoverTemplate = /(?:^|\/)\w[\w-]*-cover\.html$/i.test(templatePath);

    if (
      /\bDIN\s*2014\b/i.test(html) ||
      /\bAbolition\b/i.test(html) ||
      /"mendl-sans-dusk"\s*,\s*"Mendl Sans Dusk"\s*,\s*"Abolition"/i.test(
        html,
      ) ||
      /"DIN 2014"\s*,\s*"Helvetica Neue"\s*,\s*Arial\s*,\s*"Liberation Sans"/i.test(
        html,
      )
    ) {
      violations.push(
        `${templatePath}: contains legacy font token(s) (deprecated DIN 2014, Abolition, and/or legacy DIN body sequence)`,
      );
    }

    const headingDecl = html.match(/--font-heading\s*:\s*([^;]+);/i)?.[1] || "";
    const bodyDecl = html.match(/--font-body\s*:\s*([^;]+);/i)?.[1] || "";

    if (!headingDecl) {
      violations.push(`${templatePath}: missing --font-heading declaration`);
    } else {
      const headingRequired = [
        "mendl-sans-dusk",
        "Mendl Sans Dusk",
        "mendl-sans-dusk",
        "Mendl Sans Dusk",
        "Roboto",
      ];
      const missing = headingRequired.filter(
        (token) => !headingDecl.includes(token),
      );
      if (missing.length > 0) {
        violations.push(
          `${templatePath}: --font-heading missing required token(s): ${missing.join(", ")}`,
        );
      }
    }

    if (!bodyDecl) {
      violations.push(`${templatePath}: missing --font-body declaration`);
    } else {
      const bodyRequired = [
        "mendl-sans-dusk",
        "Mendl Sans Dusk",
        "mendl-sans-dusk",
        "Mendl Sans Dusk",
        "Roboto",
      ];
      const missing = bodyRequired.filter((token) => !bodyDecl.includes(token));
      if (missing.length > 0) {
        violations.push(
          `${templatePath}: --font-body missing required token(s): ${missing.join(", ")}`,
        );
      }
    }

    if (
      !isCoverTemplate &&
      !/font-family\s*:\s*var\(--font-heading\)/i.test(html)
    ) {
      violations.push(
        `${templatePath}: missing font-family usage for --font-heading`,
      );
    }

    if (!/font-family\s*:\s*var\(--font-body\)/i.test(html)) {
      violations.push(
        `${templatePath}: missing font-family usage for --font-body`,
      );
    }
  }

  if (violations.length > 0) {
    throw new Error(
      `Guardrail validation failed: manual/form template typography drift detected.\n  - ${violations.join("\n  - ")}`,
    );
  }
}

async function validateManualTemplateMaterialIconGuardrails() {
  const requiredIconVars = {
    "--icon-material-info": MATERIAL_ICON_LIGATURES.info,
    "--icon-material-danger-outline": MATERIAL_ICON_LIGATURES.dangerOutline,
    "--icon-material-warning": MATERIAL_ICON_LIGATURES.warning,
    "--icon-material-caution": MATERIAL_ICON_LIGATURES.caution,
    "--icon-material-checkbox-empty": MATERIAL_ICON_LIGATURES.checkboxEmpty,
    "--icon-material-checklist": MATERIAL_ICON_LIGATURES.checklist,
    "--icon-material-form-field": MATERIAL_ICON_LIGATURES.formField,
    "--icon-material-narrative": MATERIAL_ICON_LIGATURES.narrative,
    "--icon-material-table": MATERIAL_ICON_LIGATURES.table,
    "--icon-material-signature": MATERIAL_ICON_LIGATURES.signature,
    "--icon-material-route": MATERIAL_ICON_LIGATURES.route,
    "--icon-material-access": MATERIAL_ICON_LIGATURES.access,
    "--icon-material-source": MATERIAL_ICON_LIGATURES.source,
    "--icon-material-local-dev": MATERIAL_ICON_LIGATURES.localDev,
  };
  const manualsDir = join(DOCS_DIR, "manuals");
  const formsDir = join(DOCS_DIR, "forms");
  const manualEntries = existsSync(manualsDir)
    ? await readdir(manualsDir, { withFileTypes: true })
    : [];
  const formEntries = existsSync(formsDir)
    ? await readdir(formsDir, { withFileTypes: true })
    : [];
  const iconTokenFiles = [
    join(DOCS_DIR, "styles/components.css"),
    ...manualEntries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
      .map((entry) => join(manualsDir, entry.name)),
    ...formEntries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
      .map((entry) => join(formsDir, entry.name)),
  ];

  const printBasePath = join(DOCS_DIR, "styles/print-base.css");
  if (!existsSync(printBasePath)) {
    throw new Error(`Template not found: ${printBasePath}`);
  }
  const printBaseCss = await readFile(printBasePath, "utf-8");

  const violations = [];
  for (const [varName, ligature] of Object.entries(requiredIconVars)) {
    const expected = `${varName}: "${ligature}";`;
    if (!printBaseCss.includes(expected)) {
      violations.push(
        `${printBasePath}: missing canonical icon variable ${expected}`,
      );
    }
  }

  for (const filePath of iconTokenFiles) {
    if (!existsSync(filePath)) {
      violations.push(`${filePath}: required icon token file is missing`);
      continue;
    }
    const source = await readFile(filePath, "utf-8");

    const cssTokenMatches = source.matchAll(/content:\s*"([a-z0-9_]+)"\s*;/gi);
    for (const match of cssTokenMatches) {
      const token = String(match[1] || "").trim();
      if (!token) continue;
      if (!MATERIAL_ICON_LIGATURE_SET.has(token)) {
        violations.push(
          `${filePath}: non-canonical Material Icon ligature token "${token}" found in CSS content`,
        );
      }
    }

    const inlineIconMatches = source.matchAll(
      /<span[^>]*class="[^"]*(?:\bmi\b|\bmaterial-icons\b)[^"]*"[^>]*>([^<]+)<\/span>/gi,
    );
    for (const match of inlineIconMatches) {
      const token = String(match[1] || "").trim();
      if (!token) continue;
      if (!MATERIAL_ICON_LIGATURE_SET.has(token)) {
        violations.push(
          `${filePath}: non-canonical Material Icon ligature token "${token}" found in inline icon markup`,
        );
      }
    }
  }

  if (violations.length > 0) {
    throw new Error(
      `Guardrail validation failed: material icon ligature map drift detected.\n  - ${violations.join("\n  - ")}`,
    );
  }
}

async function validateHandbookCoverTabsFooterGuardrails() {
  await validateCanonicalFooterClassUsage();

  const handbookCoverPath = join(
    DOCS_DIR,
    "manuals/employee-handbook-cover.html",
  );
  const handbookTabsPath = join(
    DOCS_DIR,
    "manuals/employee-handbook-tabs.html",
  );

  if (!existsSync(handbookCoverPath)) {
    throw new Error(`Template not found: ${handbookCoverPath}`);
  }
  if (!existsSync(handbookTabsPath)) {
    throw new Error(`Template not found: ${handbookTabsPath}`);
  }

  const [coverHtml, tabsHtml] = await Promise.all([
    readFile(handbookCoverPath, "utf-8"),
    readFile(handbookTabsPath, "utf-8"),
  ]);

  validateTemplateGuardrails(
    `handbook cover footer (${handbookCoverPath})`,
    coverHtml,
    [
      {
        regex: /class="chambers"[\s\S]*?\{\{BRAND_CHAMBER_PASCO\}\}/i,
        message: "Cover footer must include Pasco chamber logo",
      },
      {
        regex: /\{\{BRAND_CHAMBER_KENNEWICK\}\}/i,
        message: "Cover footer must include Kennewick chamber logo",
      },
      {
        regex: /\{\{BRAND_CHAMBER_RICHLAND\}\}/i,
        message: "Cover footer must include Richland chamber logo",
      },
      {
        regex: /class="veteran-strip"/i,
        message: "Cover footer must include veteran strip",
      },
      {
        regex:
          /\.footer[\s\S]*?border-top:\s*1\.2pt\s+solid\s+var\(--brand-primary\)[\s\S]*?grid-template-columns:\s*1\.45fr\s+1fr/i,
        message:
          "Cover footer must use canonical letterhead geometry and top border",
      },
    ],
  );

  validateTemplateGuardrails(
    `handbook tabs footer (${handbookTabsPath})`,
    tabsHtml,
    [
      {
        regex:
          /\.tab-page::before[\s\S]*?inset:\s*0\.22in[\s\S]*?border:\s*1\.2pt\s+solid\s+var\(--brand-primary\)/i,
        message:
          "Tabs page must keep canonical outer frame (inset 0.22in, 1.2pt primary border)",
      },
      {
        regex:
          /\.tab-page::after[\s\S]*?inset:\s*0\.33in[\s\S]*?border:\s*0\.6pt\s+solid\s+var\(--brand-secondary\)/i,
        message:
          "Tabs page must keep canonical inner frame (inset 0.33in, 0.6pt secondary border)",
      },
      {
        regex:
          /\.tab-ribbon[\s\S]*?top:\s*0\.45in[\s\S]*?bottom:\s*0\.45in[\s\S]*?left:\s*0\.45in[\s\S]*?width:\s*0\.28in/i,
        message:
          "Tabs page must keep canonical ribbon metrics (top/bottom 0.45in, left 0.45in, width 0.28in)",
      },
      {
        regex:
          /\.tab-hero[\s\S]*?padding:\s*0\.22in\s+0\.42in\s+2\.15in\s+0\.42in/i,
        message:
          "Tabs hero must reserve canonical bottom clearance so footer and veteran strip remain visible",
      },
      {
        regex:
          /\.footer[\s\S]*?border-top:\s*1\.2pt\s+solid\s+var\(--brand-primary\)[\s\S]*?grid-template-columns:\s*1\.45fr\s+1fr/i,
        message:
          "Tabs footer must use canonical letterhead geometry and top border",
      },
      {
        regex:
          /\.footer[\s\S]*?position:\s*absolute[\s\S]*?left:\s*0\.92in[\s\S]*?right:\s*0\.9in[\s\S]*?bottom:\s*0\.62in/i,
        message:
          "Tabs footer must stay inset from the ribbon (absolute at left 0.92in, right 0.9in, bottom 0.62in)",
      },
      {
        regex: /class="chambers"[\s\S]*?\{\{BRAND_CHAMBER_PASCO\}\}/i,
        message: "Tabs footer must include Pasco chamber logo row",
      },
      {
        regex: /\{\{BRAND_CHAMBER_KENNEWICK\}\}/i,
        message: "Tabs footer must include Kennewick chamber logo",
      },
      {
        regex: /\{\{BRAND_CHAMBER_RICHLAND\}\}/i,
        message: "Tabs footer must include Richland chamber logo",
      },
      {
        regex: /class="veteran-strip"/i,
        message: "Tabs pages must include veteran strip markup",
      },
      {
        regex:
          /\.veteran-strip[\s\S]*?position:\s*absolute[\s\S]*?left:\s*0\.92in[\s\S]*?right:\s*0\.9in[\s\S]*?bottom:\s*0\.42in/i,
        message:
          "Tabs veteran strip must use canonical placement (left 0.92in, right 0.9in, bottom 0.42in)",
      },
      {
        regex:
          /Introduction[\s\S]*?Company Policies[\s\S]*?Employment Basics[\s\S]*?Compensation[\s\S]*?Employee Benefits[\s\S]*?Miscellaneous/i,
        message:
          "Employee handbook tabs must include handbook chapter titles (Introduction through Miscellaneous)",
      },
      {
        regex:
          /\.tab-section-title[\s\S]*?margin-bottom:\s*0\.16in[\s\S]*?width:\s*100%/i,
        message:
          "Tabs title block must reserve canonical spacing (margin-bottom 0.16in, width 100%)",
      },
      {
        regex:
          /\.tab-signature[\s\S]*?align-self:\s*stretch[\s\S]*?margin-left:\s*0\.5in[\s\S]*?margin-right:\s*0\.5in/i,
        message:
          "Tabs signature block must use canonical full-lane inset alignment",
      },
      {
        regex:
          /\.tab-sig-lines[\s\S]*?grid-template-columns:\s*1\.5fr\s+0\.85fr/i,
        message:
          "Tabs signature lines must preserve standard ratio (long signature, shorter date)",
      },
      {
        regex: /aria-label="Approval signature verification"/i,
        message: "Tabs signature block must use canonical approval aria-label",
      },
      {
        regex: /<div class="tab-sig-name">Jeremy Thamert<\/div>/i,
        message: "Tabs signature block must include Jeremy Thamert",
      },
      {
        regex: /<div class="tab-sig-role">President\s*&amp;\s*Owner<\/div>/i,
        message:
          "Tabs signature block must include the President & Owner signer role",
      },
    ],
  );

  const safetyCarryover =
    /\bMISH\b|Injury-Free Workplace Plan|Drug-Free Workplace|Program Policy and Requirements|Safety and Health Meetings\s*\/\s*Inspections/i;
  if (safetyCarryover.test(tabsHtml)) {
    throw new Error(
      "Guardrail validation failed: employee-handbook tabs contain safety-manual section language. Tabs must remain employee-handbook chapters only.",
    );
  }

  if (/src="data:image\/png;base64,/i.test(tabsHtml)) {
    throw new Error(
      "Guardrail validation failed: handbook tabs template contains inline base64 QR image. Remove inline QR assets from the canonical footer.",
    );
  }

  if (
    /<div class="tab-section-title">(?:(?!<\/div>).)*<div\s+class="tab-signature"/is.test(
      tabsHtml,
    )
  ) {
    throw new Error(
      "Guardrail validation failed: handbook tab signature block must be a sibling placed below .tab-section-title, not nested inside it.",
    );
  }

  if (
    /Matt Ramsey|QC Verification|Quality control signature verification|tab-sig-date-row|tab-sig-date-label|tab-sig-header/i.test(
      tabsHtml,
    )
  ) {
    throw new Error(
      "Guardrail validation failed: handbook tabs contain legacy signature/QC patterns. Use the standardized single-signer approval block.",
    );
  }
}

async function validateManualCoverCohesionGuardrails() {
  await validateCanonicalFooterClassUsage();

  const safetyCoverPath = join(DOCS_DIR, "manuals/safety-manual-cover.html");
  const handbookCoverPath = join(
    DOCS_DIR,
    "manuals/employee-handbook-cover.html",
  );

  if (!existsSync(safetyCoverPath)) {
    throw new Error(`Template not found: ${safetyCoverPath}`);
  }
  if (!existsSync(handbookCoverPath)) {
    throw new Error(`Template not found: ${handbookCoverPath}`);
  }

  const [safetyCoverHtml, handbookCoverHtml] = await Promise.all([
    readFile(safetyCoverPath, "utf-8"),
    readFile(handbookCoverPath, "utf-8"),
  ]);

  const sharedCoverChecks = [
    {
      regex:
        /\.cover::before[\s\S]*?inset:\s*0\.22in[\s\S]*?border:\s*1\.2pt\s+solid\s+var\(--brand-primary\)/i,
      message:
        "Cover must keep canonical outer frame (inset 0.22in, 1.2pt primary border)",
    },
    {
      regex:
        /\.cover::after[\s\S]*?inset:\s*0\.33in[\s\S]*?border:\s*0\.6pt\s+solid\s+var\(--brand-secondary\)/i,
      message:
        "Cover must keep canonical inner frame (inset 0.33in, 0.6pt secondary border)",
    },
    {
      regex:
        /\.left-ribbon[\s\S]*?top:\s*0\.45in[\s\S]*?bottom:\s*0\.45in[\s\S]*?left:\s*0\.45in[\s\S]*?width:\s*0\.28in/i,
      message:
        "Cover must keep canonical ribbon metrics (top/bottom 0.45in, left 0.45in, width 0.28in)",
    },
    {
      regex:
        /\.footer[\s\S]*?position:\s*absolute[\s\S]*?left:\s*0\.92in[\s\S]*?right:\s*0\.9in[\s\S]*?bottom:\s*0\.62in/i,
      message:
        "Cover footer must use canonical inset placement (left 0.92in, right 0.9in, bottom 0.62in)",
    },
    {
      regex: /class="summary-card"/i,
      message: "Cover must include a summary card block",
    },
    {
      regex: /class="qr-card"/i,
      message: "Cover must include a QR card block",
    },
    {
      regex: /class="veteran-strip"/i,
      message: "Cover must include veteran strip markup",
    },
    {
      regex:
        /\{\{BRAND_REVISION_DATE\}\}[\s\S]*?\{\{BRAND_REVISION_NUMBER\}\}/i,
      message: "Cover must display revision date and revision number tokens",
    },
  ];

  validateTemplateGuardrails(
    `safety cover cohesion (${safetyCoverPath})`,
    safetyCoverHtml,
    [
      ...sharedCoverChecks,
      {
        regex: /<div class="program-chip">MISH Safety Manual<\/div>/i,
        message: "Safety cover must use the MISH Safety Manual chip label",
      },
      {
        regex: /<h1 class="title">Safety<br\s*\/?>Manual<\/h1>/i,
        message: "Safety cover must use the Safety Manual title",
      },
      {
        regex: /Accident Prevention Program for Field Operations/i,
        message: "Safety cover must retain safety-specific subtitle",
      },
      {
        regex: /Program Snapshot/i,
        message: "Safety cover must use Program Snapshot summary heading",
      },
      {
        regex: /Safety Manual Online/i,
        message: "Safety cover QR heading must be Safety Manual Online",
      },
      {
        regex: /Scan for current MISH edition/i,
        message: "Safety cover QR label must reference current MISH edition",
      },
    ],
  );

  validateTemplateGuardrails(
    `handbook cover cohesion (${handbookCoverPath})`,
    handbookCoverHtml,
    [
      ...sharedCoverChecks,
      {
        regex: /<div class="program-chip">Employee Handbook<\/div>/i,
        message: "Handbook cover must use Employee Handbook chip label",
      },
      {
        regex: /<h1 class="title">Employee<br\s*\/?>Handbook<\/h1>/i,
        message: "Handbook cover must use the Employee Handbook title",
      },
      {
        regex: /Workplace Policies, Standards, and Employee Expectations/i,
        message: "Handbook cover must retain handbook-specific subtitle",
      },
      {
        regex: /Handbook Snapshot/i,
        message: "Handbook cover must use Handbook Snapshot summary heading",
      },
      {
        regex: /Handbook Online/i,
        message: "Handbook cover QR heading must be Handbook Online",
      },
      {
        regex: /Scan for latest handbook/i,
        message: "Handbook cover QR label must reference latest handbook",
      },
    ],
  );

  if (/Employee Handbook/i.test(safetyCoverHtml)) {
    throw new Error(
      "Guardrail validation failed: safety cover contains employee handbook language.",
    );
  }

  if (
    /MISH Safety Manual|Scan for current MISH edition/i.test(handbookCoverHtml)
  ) {
    throw new Error(
      "Guardrail validation failed: handbook cover contains safety-manual language.",
    );
  }
}

async function validateSafetyTabsVisualStandardGuardrails() {
  const safetyTabsPath = join(DOCS_DIR, "manuals/safety-manual-tabs.html");
  if (!existsSync(safetyTabsPath)) {
    throw new Error(`Template not found: ${safetyTabsPath}`);
  }

  const tabsHtml = await readFile(safetyTabsPath, "utf-8");
  validateTemplateGuardrails(
    `safety tabs standard (${safetyTabsPath})`,
    tabsHtml,
    [
      {
        regex:
          /\.tab-page::before[\s\S]*?inset:\s*0\.22in[\s\S]*?border:\s*1\.2pt\s+solid\s+var\(--brand-primary\)/i,
        message:
          "Safety tabs must keep canonical outer frame (inset 0.22in, 1.2pt primary border)",
      },
      {
        regex:
          /\.tab-page::after[\s\S]*?inset:\s*0\.33in[\s\S]*?border:\s*0\.6pt\s+solid\s+var\(--brand-secondary\)/i,
        message:
          "Safety tabs must keep canonical inner frame (inset 0.33in, 0.6pt secondary border)",
      },
      {
        regex:
          /\.tab-ribbon[\s\S]*?top:\s*0\.45in[\s\S]*?bottom:\s*0\.45in[\s\S]*?left:\s*0\.45in[\s\S]*?width:\s*0\.28in/i,
        message:
          "Safety tabs must keep canonical ribbon metrics (top/bottom 0.45in, left 0.45in, width 0.28in)",
      },
      {
        regex:
          /\.tab-hero[\s\S]*?padding:\s*0\.22in\s+0\.42in\s+2\.15in\s+0\.42in/i,
        message:
          "Safety tabs hero must reserve canonical bottom clearance so footer and veteran strip remain visible",
      },
      {
        regex:
          /\.footer[\s\S]*?position:\s*absolute[\s\S]*?left:\s*0\.92in[\s\S]*?right:\s*0\.9in[\s\S]*?bottom:\s*0\.62in/i,
        message:
          "Safety tabs footer must stay inset from ribbon (absolute at left 0.92in, right 0.9in, bottom 0.62in)",
      },
      {
        regex:
          /\.veteran-strip[\s\S]*?position:\s*absolute[\s\S]*?left:\s*0\.92in[\s\S]*?right:\s*0\.9in[\s\S]*?bottom:\s*0\.42in/i,
        message:
          "Safety tabs veteran strip must use canonical placement (left 0.92in, right 0.9in, bottom 0.42in)",
      },
      {
        regex:
          /\.tab-section-title[\s\S]*?margin-bottom:\s*0\.16in[\s\S]*?width:\s*100%/i,
        message:
          "Safety tabs title block must reserve canonical spacing (margin-bottom 0.16in, width 100%)",
      },
      {
        regex:
          /\.tab-signature[\s\S]*?align-self:\s*stretch[\s\S]*?margin-left:\s*0\.5in[\s\S]*?margin-right:\s*0\.5in/i,
        message:
          "Safety tabs signature block must use canonical full-lane inset alignment",
      },
      {
        regex:
          /\.tab-sig-lines[\s\S]*?grid-template-columns:\s*1\.5fr\s+0\.85fr/i,
        message:
          "Safety tabs signature lines must preserve standard ratio (long signature, shorter date)",
      },
      {
        regex: /aria-label="Approval signature verification"/i,
        message:
          "Safety tabs signature block must use canonical approval aria-label",
      },
      {
        regex: /<div class="tab-sig-name">Jeremy Thamert<\/div>/i,
        message: "Safety tabs signature block must include Jeremy Thamert",
      },
      {
        regex: /<div class="tab-sig-role">President\s*&amp;\s*Owner<\/div>/i,
        message:
          "Safety tabs signature block must include the President & Owner signer role",
      },
      {
        regex: /\bMISH\b/i,
        message: "Safety tabs must preserve MISH labeling",
      },
    ],
  );

  if (
    /<div class="tab-section-title">(?:(?!<\/div>).)*<div\s+class="tab-signature"/is.test(
      tabsHtml,
    )
  ) {
    throw new Error(
      "Guardrail validation failed: safety tab signature block must be a sibling placed below .tab-section-title, not nested inside it.",
    );
  }

  if (
    /Matt Ramsey|QC Verification|Quality control signature verification|tab-sig-date-row|tab-sig-date-label|tab-sig-header/i.test(
      tabsHtml,
    )
  ) {
    throw new Error(
      "Guardrail validation failed: safety tabs contain legacy signature/QC patterns. Use the standardized single-signer approval block.",
    );
  }
}

async function validateSpineTemplateGuardrails() {
  const safetySpinePath = join(DOCS_DIR, "manuals/safety-manual-spine.html");
  const handbookSpinePath = join(
    DOCS_DIR,
    "manuals/employee-handbook-spine.html",
  );

  if (!existsSync(safetySpinePath)) {
    throw new Error(`Template not found: ${safetySpinePath}`);
  }
  if (!existsSync(handbookSpinePath)) {
    throw new Error(`Template not found: ${handbookSpinePath}`);
  }

  const [safetySpineHtml, handbookSpineHtml] = await Promise.all([
    readFile(safetySpinePath, "utf-8"),
    readFile(handbookSpinePath, "utf-8"),
  ]);

  const sharedSpineChecks = [
    {
      regex: /@page\s*\{[\s\S]*?size:\s*letter\s+portrait[\s\S]*?margin:\s*0/i,
      message:
        "Spine must keep canonical page setup (letter portrait, zero margin)",
    },
    {
      regex:
        /html,\s*body\s*\{[\s\S]*?width:\s*8\.5in[\s\S]*?height:\s*11in[\s\S]*?overflow:\s*hidden[\s\S]*?font-size:\s*0[\s\S]*?line-height:\s*0/i,
      message:
        "Spine must keep one-page root clamp (8.5in x 11in, overflow hidden, zero root text metrics)",
    },
    {
      regex:
        /\.page\s*\{[\s\S]*?page-break-after:\s*avoid[\s\S]*?break-after:\s*avoid/i,
      message:
        "Spine must enforce no trailing page break (page-break-after/break-after set to avoid)",
    },
    {
      regex: /\.spine-logo-wrap\s*\{[\s\S]*?gap:\s*0\.1in/i,
      message:
        "Spine logo block must keep expanded logo-to-year spacing (gap 0.1in)",
    },
    {
      regex: /\.spine-year\s*\{[\s\S]*?\}[\s\S]*?\.spine-revision\s*\{/i,
      message:
        "Spine must include both year and revision style blocks in the logo stack",
    },
    {
      regex:
        /<div class="spine-logo-wrap">[\s\S]*?<span class="spine-year">\{\{BRAND_REVISION_YEAR\}\}<\/span>[\s\S]*?<span class="spine-revision">Revision 3\.0<\/span>/i,
      message:
        "Spine logo stack must show revision year followed by Revision 3.0",
    },
    {
      regex:
        /\{\{BRAND_AGC_STACKED\}\}[\s\S]*?\{\{BRAND_BBB_SEAL\}\}[\s\S]*?\{\{BRAND_WA_VOB_LOGO\}\}/i,
      message: "Spine must include AGC, BBB, and Veteran Owned badge tokens",
    },
  ];

  validateTemplateGuardrails(
    `safety spine standard (${safetySpinePath})`,
    safetySpineHtml,
    [
      ...sharedSpineChecks,
      {
        regex: /<span class="spine-title">MISH Safety Manual<\/span>/i,
        message: "Safety spine title must be MISH Safety Manual",
      },
    ],
  );

  validateTemplateGuardrails(
    `employee-handbook spine standard (${handbookSpinePath})`,
    handbookSpineHtml,
    [
      ...sharedSpineChecks,
      {
        regex: /<span class="spine-title">Employee Handbook<\/span>/i,
        message: "Employee handbook spine title must be Employee Handbook",
      },
    ],
  );

  if (/Employee Handbook/i.test(safetySpineHtml)) {
    throw new Error(
      "Guardrail validation failed: safety spine contains employee handbook title language.",
    );
  }

  if (/MISH Safety Manual/i.test(handbookSpineHtml)) {
    throw new Error(
      "Guardrail validation failed: employee handbook spine contains safety manual title language.",
    );
  }
}

async function runSpineGuardrailsCheck() {
  console.log("\n🛡️  Running spine guardrails check…");
  await validateSpineTemplateGuardrails();
  console.log("  ✓  Spine layout and labeling guardrails verified");
}

async function runTypographyGuardrailsCheck() {
  console.log("\n🛡️  Running typography guardrails check…");
  await validateManualTemplateTypographyGuardrails();
  console.log("  ✓  Manual/form template typography guardrails verified");
  await validateManualTemplateMaterialIconGuardrails();
  console.log("  ✓  Material icon map guardrails verified");
}

async function runGuardrailsCheck() {
  console.log("\n🛡️  Running document guardrails check…");
  const formTemplatePath = join(DOCS_DIR, "manuals/form-fillable.html");
  if (!existsSync(formTemplatePath)) {
    throw new Error(`Form template not found: ${formTemplatePath}`);
  }
  const formTemplate = await readFile(formTemplatePath, "utf-8");
  validateFormFillableTemplateGuardrails(formTemplate, formTemplatePath);
  console.log("  ✓  Form template guardrails verified");

  if (!existsSync(CANONICAL_TOC_TEMPLATE_PATH)) {
    throw new Error(`TOC template not found: ${CANONICAL_TOC_TEMPLATE_PATH}`);
  }
  const tocTemplate = await readFile(CANONICAL_TOC_TEMPLATE_PATH, "utf-8");
  validateTocTemplateGuardrails(tocTemplate, CANONICAL_TOC_TEMPLATE_PATH);
  console.log("  ✓  TOC template guardrails verified");

  await validateHandbookLetterheadFooterParity();
  console.log("  ✓  Handbook letterhead footer parity verified");

  await validateCanonicalFooterClassUsage();
  console.log("  ✓  Canonical footer class usage verified");

  await validateManualTemplateTypographyGuardrails();
  console.log("  ✓  Manual/form template typography guardrails verified");

  await validateManualTemplateMaterialIconGuardrails();
  console.log("  ✓  Material icon map guardrails verified");

  await validateManualCoverCohesionGuardrails();
  console.log("  ✓  Cover cohesion guardrails verified");

  await validateHandbookCoverTabsFooterGuardrails();
  console.log("  ✓  Handbook cover/tabs footer guardrails verified");

  await validateSafetyTabsVisualStandardGuardrails();
  console.log("  ✓  Safety tabs visual standard guardrails verified");

  await validateSpineTemplateGuardrails();
  console.log("  ✓  Spine layout and labeling guardrails verified");

  const parityLetterheadPath = join(
    OUTPUT_DIR,
    "_guardrail-safety-letterhead.pdf",
  );
  await renderSafetyLetterheadPdf(parityLetterheadPath);
  await generateToc();
  try {
    await validateRenderedPdfParity(
      parityLetterheadPath,
      join(OUTPUT_DIR, "safety-manual-toc.pdf"),
    );
  } finally {
    if (existsSync(parityLetterheadPath)) unlinkSync(parityLetterheadPath);
  }
  console.log("  ✓  TOC/letterhead rendered parity verified");
}

function pixelsForInches(inches, scale) {
  return Math.max(1, Math.round(inches * 72 * scale));
}

async function renderPdfPage(pdfPath, pageNumber = 1, scale = 2) {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const data = new Uint8Array(await readFile(pdfPath));
  const document = await pdfjs.getDocument({
    data,
    useWorkerFetch: false,
    isEvalSupported: false,
    disableFontFace: false,
    standardFontDataUrl: PDFJS_STANDARD_FONT_DATA_URL,
  }).promise;
  const page = await document.getPage(pageNumber);
  const viewport = page.getViewport({ scale });
  const canvas = createCanvas(
    Math.ceil(viewport.width),
    Math.ceil(viewport.height),
  );
  const context = canvas.getContext("2d");
  await page.render({ canvasContext: context, viewport }).promise;
  return { canvas, viewport };
}

function compareImageBands(label, leftPixels, rightPixels) {
  if (leftPixels.length !== rightPixels.length) {
    throw new Error(
      `${label} parity failed: image buffer sizes differ (${leftPixels.length} vs ${rightPixels.length})`,
    );
  }
  for (let index = 0; index < leftPixels.length; index++) {
    if (leftPixels[index] !== rightPixels[index]) {
      throw new Error(
        `${label} parity failed: pixel mismatch at byte offset ${index}`,
      );
    }
  }
}

async function validateRenderedPdfParity(letterheadPdfPath, tocPdfPath) {
  const scale = 2;
  const letterhead = await renderPdfPage(letterheadPdfPath, 1, scale);
  const toc = await renderPdfPage(tocPdfPath, 1, scale);
  const { canvas: letterheadCanvas } = letterhead;
  const { canvas: tocCanvas } = toc;

  if (
    letterheadCanvas.width !== tocCanvas.width ||
    letterheadCanvas.height !== tocCanvas.height
  ) {
    throw new Error(
      `Rendered parity failed: page sizes differ (${letterheadCanvas.width}x${letterheadCanvas.height} vs ${tocCanvas.width}x${tocCanvas.height})`,
    );
  }

  const regions = [
    {
      label: "top outer border",
      x: 0,
      y: pixelsForInches(0.18, scale),
      w: letterheadCanvas.width,
      h: pixelsForInches(0.08, scale),
    },
    {
      label: "top inner border",
      x: 0,
      y: pixelsForInches(0.29, scale),
      w: letterheadCanvas.width,
      h: pixelsForInches(0.08, scale),
    },
    {
      label: "left border",
      x: pixelsForInches(0.18, scale),
      y: 0,
      w: pixelsForInches(0.08, scale),
      h: letterheadCanvas.height,
    },
    {
      label: "right border",
      x: letterheadCanvas.width - pixelsForInches(0.26, scale),
      y: 0,
      w: pixelsForInches(0.08, scale),
      h: letterheadCanvas.height,
    },
    {
      label: "ribbon strip",
      x: pixelsForInches(0.42, scale),
      y: 0,
      w: pixelsForInches(0.38, scale),
      h: letterheadCanvas.height,
    },
    {
      label: "footer top rule",
      x: 0,
      y: letterheadCanvas.height - pixelsForInches(0.82, scale),
      w: letterheadCanvas.width,
      h: pixelsForInches(0.12, scale),
    },
  ];

  const letterheadContext = letterheadCanvas.getContext("2d");
  const tocContext = tocCanvas.getContext("2d");
  for (const region of regions) {
    const letterheadPixels = letterheadContext.getImageData(
      region.x,
      region.y,
      region.w,
      region.h,
    ).data;
    const tocPixels = tocContext.getImageData(
      region.x,
      region.y,
      region.w,
      region.h,
    ).data;
    compareImageBands(region.label, letterheadPixels, tocPixels);
  }
}

// ── Template: Tab Dividers ────────────────────────────────────────────────────
/**
 * Generate tab divider PDFs with per-section QR codes.
 *
 * Each tab page in safety-manual-tabs.html contains a {{QR_TAB_NN}} token
 * (where NN is the zero-padded section number 00–44). This function generates
 * a section-specific QR code for each token and injects it before rendering.
 *
 * Tab 00 QR → public MISH Table of Contents URL
 * Tab 01–44 QR → individual section page URL
 */
async function generateTabs() {
  console.log(`\n🗂  Generating ${ACTIVE_MANUAL_LABEL} tab dividers…`);
  await ensureDir(OUTPUT_DIR);
  if (isEmployeeHandbook) {
    await validateHandbookCoverTabsFooterGuardrails();
  } else {
    await validateSafetyTabsVisualStandardGuardrails();
  }
  const templateName = isEmployeeHandbook
    ? "employee-handbook-tabs.html"
    : "safety-manual-tabs.html";
  let html = await readFile(join(DOCS_DIR, `manuals/${templateName}`), "utf-8");

  // Keep tab headers aligned with canonical manifest section titles.
  if (!isEmployeeHandbook && existsSync(MANIFEST)) {
    try {
      const { sections = [] } = JSON.parse(await readFile(MANIFEST, "utf-8"));
      const titleMap = new Map(
        sections
          .map((section) => [
            Number(section.number),
            String(section.title || "").trim(),
          ])
          .filter(
            ([number, title]) =>
              Number.isFinite(number) && number > 0 && title.length > 0,
          ),
      );

      for (let n = 1; n <= 44; n++) {
        const canonicalTitle = titleMap.get(n);
        if (!canonicalTitle) continue;
        const nn = String(n).padStart(2, "0");
        const sectionBlockPattern = new RegExp(
          `(<!--\\s*Section\\s*${nn}\\s*-->[\\s\\S]*?<div class="tab-section-title">)([\\s\\S]*?)(</div>)`,
          "i",
        );
        html = html.replace(
          sectionBlockPattern,
          `$1${escapeHtml(canonicalTitle)}$3`,
        );
      }
    } catch (err) {
      console.warn(
        `  ⚠  Could not synchronize safety tab section titles from manifest: ${err.message}`,
      );
    }
  }

  // ── Replace dashboard QR placeholder in footer (shared across all tabs) ──
  const dashboardQrDataUrl = await buildQrDataUrl(BRAND.qrCodes.dashboard);
  html = html.replaceAll("{{BRAND_QR_DASHBOARD}}", dashboardQrDataUrl);

  // ── Generate and inject per-tab section QR codes ─────────────────────────
  // For MISH: Tabs 00–44 map to public section URLs; tab 00 = TOC landing page.
  // For Employee Handbook: handbook currently publishes as a single PDF, so all
  // tab QR codes route to the canonical public handbook document.
  for (let n = 0; n <= 44; n++) {
    const nn = String(n).padStart(2, "0");
    const token = `{{QR_TAB_${nn}}}`;
    if (!html.includes(token)) continue;

    let sectionUrl;
    if (isEmployeeHandbook) {
      sectionUrl = ACTIVE_MANUAL_DIGITAL_URL;
    } else {
      // Tab 00 → standalone Table of Contents page.
      // Tabs 01–44 → cluster page anchored to that section's MISH id.
      sectionUrl =
        n === 0
          ? `${SITE_URL}/resources/safety-manual/contents`
          : clusterUrlForSection(n) ||
            `${SITE_URL}/resources/safety-manual/contents`;
    }

    const qrDataUrl = await buildQrDataUrl(sectionUrl);
    html = html.replaceAll(token, qrDataUrl);
  }

  // ── Apply remaining brand tokens ─────────────────────────────────────────
  html = applyBrandTokens(html);

  const tabsFileName = isEmployeeHandbook
    ? "employee-handbook-tabs.pdf"
    : "safety-manual-tabs.pdf";
  const pdfPath = join(OUTPUT_DIR, tabsFileName);
  await renderHtmlToPdf(
    html,
    pdfPath,
    { margin: { top: 0, right: 0, bottom: 0, left: 0 } },
    "_tmp_tabs.html",
  );
}

function buildContentsPdfHtml(sections) {
  const generatedOn = new Date().toLocaleDateString("en-US");
  const rows = sections
    .map((section) => {
      const number = String(section.numberStr || section.number).padStart(
        2,
        "0",
      );
      return (
        `<tr>` +
        `<td class="num">MISH ${number}</td>` +
        `<td class="title">${escapeHtml(section.title || "")}</td>` +
        `</tr>`
      );
    })
    .join("\n");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Safety Manual Table of Contents</title>
    <style>
      @page { size: Letter; margin: 0.75in 0.75in 0.75in 1.0in; }
      body {
        font-family: ${PDF_FONT_STACK_BODY};
        color: #1f2937;
        font-size: 11pt;
        line-height: 1.35;
      }
      .header {
        margin-bottom: 0.3in;
        padding-bottom: 0.12in;
        border-bottom: 2px solid {{BRAND_COLOR_PRIMARY}};
      }
      .brand {
        font-size: 10pt;
        color: #4b5563;
        margin-bottom: 0.06in;
      }
      h1 {
        font-family: ${PDF_FONT_STACK_HEADING};
        font-size: 20pt;
        margin: 0;
        color: {{BRAND_COLOR_PRIMARY}};
      }
      .meta {
        margin-top: 0.08in;
        font-size: 9pt;
        color: #6b7280;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      tbody td {
        border-bottom: 1px solid #e5e7eb;
        padding: 0.08in 0.03in;
        vertical-align: top;
      }
      .num {
        width: 1.15in;
        font-weight: 700;
        color: #111827;
        white-space: nowrap;
      }
      .title {
        color: #1f2937;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <div class="brand">{{BRAND_COMPANY_NAME}}</div>
      <h1>Safety Manual Table of Contents</h1>
      <div class="meta">Generated ${generatedOn} • Revision {{BRAND_REVISION_NUMBER}} ({{BRAND_REVISION_DATE}})</div>
                <img class="logo" src="{{BRAND_LOGO_COLOR}}" alt="MH Construction logo" />
    </div>

    <table aria-label="Safety manual section index">
      <tbody>
        ${rows}
      </tbody>
    </table>
  </body>
</html>`;
}

function buildReferencePdfHtml(sections) {
  const generatedOn = new Date().toLocaleDateString("en-US");
  const rows = sections
    .map((section) => {
      const number = String(section.numberStr || section.number).padStart(
        2,
        "0",
      );
      const category = section.category || "General";
      const oshaRef = section.oshaRef || "-";
      const pages = section.pages ? String(section.pages) : "-";

      return (
        `<tr>` +
        `<td class="num">${escapeHtml(number)}</td>` +
        `<td class="title">${escapeHtml(section.title || "")}</td>` +
        `<td class="cat">${escapeHtml(category)}</td>` +
        `<td class="ref">${escapeHtml(oshaRef)}</td>` +
        `<td class="pages">${escapeHtml(pages)}</td>` +
        `</tr>`
      );
    })
    .join("\n");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Safety Manual Reference Guide</title>
    <style>
      @page { size: Letter; margin: 0.42in 0.5in 0.42in 0.5in; }
      :root {
        --brand-primary: {{BRAND_COLOR_PRIMARY}};
        --brand-secondary: {{BRAND_COLOR_SECONDARY}};
        --paper: #ffffff;
        --muted: #f6f8f7;
      }
      body {
        font-family: ${PDF_FONT_STACK_BODY};
        color: #1f2937;
        font-size: 9.5pt;
        line-height: 1.3;
        margin: 0;
        padding: 0;
        background: var(--paper);
      }
      .reference-page {
        position: relative;
        min-height: 10.16in;
        padding: 0.45in 0.48in 0.18in 0.88in;
        background: var(--paper);
        overflow: hidden;
      }
      .reference-page::before {
        content: "";
        position: absolute;
        inset: 0.22in;
        border: 1.2pt solid var(--brand-primary);
        pointer-events: none;
      }
      .reference-page::after {
        content: "";
        position: absolute;
        inset: 0.33in;
        border: 0.6pt solid var(--brand-secondary);
        pointer-events: none;
      }
      .reference-ribbon {
        position: absolute;
        top: 0.45in;
        bottom: 0.45in;
        left: 0.45in;
        width: 0.28in;
        background: linear-gradient(
          180deg,
          var(--brand-primary) 0%,
          var(--brand-primary) 70%,
          var(--brand-secondary) 100%
        );
      }
      .header {
        position: relative;
        z-index: 1;
        margin-bottom: 0.14in;
        padding: 0 0 0.12in;
        border-bottom: 1.2pt solid var(--brand-primary);
        text-align: center;
      }
      .brand {
        font-size: 9pt;
        color: #4b5563;
        margin-bottom: 0.04in;
        letter-spacing: 0.1em;
        text-transform: uppercase;
      }
      h1 {
        font-family: ${PDF_FONT_STACK_HEADING};
        font-size: 17pt;
        margin: 0;
        color: {{BRAND_COLOR_PRIMARY}};
        text-transform: uppercase;
      }
      .meta {
        margin-top: 0.06in;
        font-size: 8pt;
        color: #6b7280;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .program-chip {
        width: fit-content;
        margin: 0 auto 0.05in;
        background: var(--brand-primary);
        border: 0.8pt solid var(--brand-secondary);
        color: #ffffff;
        text-transform: uppercase;
        letter-spacing: 0.18em;
        font-family: ${PDF_FONT_STACK_BODY};
        font-size: 6.5pt;
        font-weight: 800;
        padding: 2pt 10pt;
        border-radius: 1.5pt;
        box-shadow: inset 0 -1pt 0 var(--brand-secondary);
      }
      table {
        position: relative;
        z-index: 1;
        width: 100%;
        border-collapse: collapse;
        background: #ffffff;
        border: 0.75pt solid var(--brand-secondary);
      }
      thead th {
        text-align: left;
        font-size: 8pt;
        letter-spacing: 0.08em;
        color: #ffffff;
        background: var(--brand-primary);
        border-bottom: 0.75pt solid var(--brand-secondary);
        padding: 0.08in 0.05in;
      }
      tbody td {
        border-bottom: 1px solid #e5e7eb;
        padding: 0.07in 0.05in;
        vertical-align: top;
      }
      .num {
        width: 0.55in;
        font-weight: 700;
        color: #111827;
        white-space: nowrap;
      }
      .title {
        width: 3.35in;
        color: #111827;
      }
      .cat {
        width: 1.35in;
        color: #1f2937;
      }
      .ref {
        width: 1.1in;
        color: #374151;
      }
      .pages {
        width: 0.55in;
        text-align: right;
        color: #374151;
      }
    </style>
  </head>
  <body>
    <div class="reference-page">
      <div class="reference-ribbon" aria-hidden="true"></div>
      <div class="header">
        <div class="brand">{{BRAND_COMPANY_NAME}}</div>
        <div class="program-chip">MISH Program Reference</div>
        <h1>Safety Manual Reference Guide</h1>
        <div class="meta">Generated ${generatedOn} • Revision {{BRAND_REVISION_NUMBER}} ({{BRAND_REVISION_DATE}})</div>
      </div>

      <table aria-label="Safety manual reference index">
        <thead>
          <tr>
            <th>MISH</th>
            <th>Section Title</th>
            <th>Category</th>
            <th>OSHA Ref</th>
            <th>Pages</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  </body>
</html>`;
}

// ── Template: Section PDFs ────────────────────────────────────────────────────
async function generateSections(filter = null) {
  if (!existsSync(MANIFEST)) {
    const manifestName = isEmployeeHandbook
      ? "employee-handbook.json"
      : "safety-manual.json";
    console.error(`\n❌  ${manifestName} not found.`);
    if (!isEmployeeHandbook) {
      console.error("  Run `npm run docs:extract` first.");
    }
    process.exit(1);
  }

  const manifestData = JSON.parse(await readFile(MANIFEST, "utf-8"));
  const { sections } = manifestData;
  const handbookSourceFile = isEmployeeHandbook
    ? String(manifestData?.document?.sourceFile || "").trim()
    : "";
  const handbookSourcePdfPath = handbookSourceFile
    ? handbookSourceFile.startsWith("documents/")
      ? join(ROOT, handbookSourceFile)
      : join(DOCS_DIR, handbookSourceFile)
    : "";
  const sectionsDir = join(OUTPUT_DIR, "sections");
  await ensureDir(sectionsDir);

  // Optional: render only a single section
  const rawTargets =
    filter === null
      ? sections
      : sections.filter((s) => String(s.number) === String(filter));
  const targets = rawTargets.map((section) => {
    const numeric = Number(section.number ?? section.numberStr);
    const numberStr =
      section.numberStr ||
      String(Number.isFinite(numeric) ? numeric : 0).padStart(2, "0");
    return {
      ...section,
      number: Number.isFinite(numeric) ? numeric : section.number,
      numberStr,
      slug:
        section.slug ||
        String(section.title || `section-${numberStr}`)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
    };
  });

  console.log(`\n📑 Generating ${targets.length} section PDF(s)…`);

  const templateName = isEmployeeHandbook
    ? "employee-handbook-section.html"
    : "safety-manual-section.html";
  const templateHtml = await readFile(
    join(DOCS_DIR, `manuals/${templateName}`),
    "utf-8",
  );

  for (const section of targets) {
    // Generate branded QR code pointing to the section's cluster anchor card
    // so the printed PDF matches the website's deep-link layout.
    const sectionUrl = isEmployeeHandbook
      ? `${ACTIVE_MANUAL_DIGITAL_URL}#section-${section.numberStr}`
      : clusterUrlForSection(Number(section.number)) ||
        `${SITE_URL}/resources/safety-manual/contents`;
    const qrDataUrl = await buildQrDataUrl(sectionUrl);

    let sectionSource =
      typeof section.body === "string" ? section.body.trim() : "";
    if (
      !sectionSource &&
      isEmployeeHandbook &&
      Number(section.number) > 1 &&
      section.pages
    ) {
      sectionSource = extractPdfTextByPageRange(
        handbookSourcePdfPath,
        String(section.pages),
      ).trim();
    }
    if (!sectionSource && isEmployeeHandbook && section.docxPath) {
      const docxPathText = String(section.docxPath).trim();
      const sectionDocxPath = docxPathText.startsWith("documents/")
        ? join(ROOT, docxPathText)
        : join(DOCS_DIR, docxPathText);
      if (existsSync(sectionDocxPath)) {
        const mammothMod = await import("mammoth");
        const convertToHtml =
          mammothMod?.convertToHtml || mammothMod?.default?.convertToHtml;
        if (typeof convertToHtml === "function") {
          const docxResult = await convertToHtml({ path: sectionDocxPath });
          sectionSource = cleanWordHtml(docxResult?.value || "").trim();
        }
      } else {
        console.warn(
          `⚠️  Handbook section DOCX source not found: ${section.docxPath}`,
        );
      }
    }
    if (!sectionSource && section.subtitle) {
      sectionSource = `<p>${escapeHtml(section.subtitle)}</p>`;
    }
    if (!sectionSource) {
      sectionSource = "<p><em>No content provided.</em></p>";
    }

    let sectionBody;
    if (section.number === 0) {
      sectionBody = textToTocHtml(sectionSource);
    } else if (sectionSource.trimStart().startsWith("<")) {
      sectionBody = cleanWordHtml(sectionSource);
    } else {
      sectionBody = textToHtml(sectionSource);
    }

    if (isEmployeeHandbook) {
      sectionBody = applyHandbookBrandTerminology(
        sectionBody,
        Number(section.number),
      );
    }

    // Inject section data + brand tokens; run section-specific post-processing
    let html = applyBrandTokens(
      templateHtml
        .replaceAll("{{SECTION_NUMBER}}", section.numberStr)
        .replaceAll("{{SECTION_MISH_REF}}", sectionToMishRef(section.number))
        .replaceAll("{{SECTION_TITLE}}", escapeHtml(section.title))
        .replaceAll("{{SECTION_BODY}}", sectionBody)
        .replaceAll("{{REVISION_YEAR}}", BRAND.revisionYear || "2026")
        .replaceAll("{{TOTAL_SECTIONS}}", String(sections.length))
        .replaceAll("{{QR_CODE_DATA_URL}}", qrDataUrl)
        .replaceAll("{{SECTION_URL}}", escapeHtml(sectionUrl)),
    );

    // Post-process: 3-Hour Rule callout, Addendum A table, form page breaks
    if (!isEmployeeHandbook) {
      html = postProcessSectionHtml(html, section.number);
    }

    // Build per-section Puppeteer native header and footer
    const headerHtml = buildSectionHeaderHtml(
      section.numberStr,
      section.title,
      qrDataUrl,
      { manualKind: isEmployeeHandbook ? "handbook" : "safety" },
    );

    // UX REFRESH 2026 — three-tier footer + thumb-zone QR FAB on every page
    const footerHtml = buildSectionFooterHtml(
      section.numberStr,
      BRAND.revisionNumber,
      BRAND.revisionDate,
      { manualKind: isEmployeeHandbook ? "handbook" : "safety" },
    );

    const pdfName = `${section.numberStr}-${section.slug}.pdf`;
    const pdfPath = join(sectionsDir, pdfName);
    await renderHtmlToPdf(
      html,
      pdfPath,
      {
        displayHeaderFooter: true,
        headerTemplate: headerHtml,
        footerTemplate: footerHtml,
        margin: {
          top: "1.25in", // accommodates enlarged header logo + 0.35in gap
          right: "0.75in",
          bottom: "0.4in", // compact footer + maximum usable body space
          left: "1.25in",
        },
      },
      `manuals/_tmp_section_${section.numberStr}.html`,
    );
  }

  if (filter === null) {
    // Generate the TOC from the static template (MISH only)
    if (!isEmployeeHandbook) {
      await generateToc();

      const referenceTarget = join(OUTPUT_DIR, "safety-manual-reference.pdf");
      const referenceHtml = applyBrandTokens(buildReferencePdfHtml(sections));
      await renderHtmlToPdf(
        referenceHtml,
        referenceTarget,
        {},
        "manuals/_tmp_safety_manual_reference.html",
      );
    }
  }
}

// ── Template: Standalone Forms ────────────────────────────────────────────────
async function generateForm(name) {
  const formsDir = join(OUTPUT_DIR, "forms");
  await ensureDir(formsDir);

  const htmlPath = join(DOCS_DIR, `forms/${name}.html`);
  if (!existsSync(htmlPath)) {
    console.error(`\n❌  Form template not found: forms/${name}.html`);
    process.exit(1);
  }

  console.log(`\n📋 Generating form: ${name}…`);
  const raw = await readFile(htmlPath, "utf-8");
  const html = applyBrandTokens(raw);
  const pdfPath = join(formsDir, `${name}.pdf`);
  await renderHtmlToPdf(html, pdfPath, {}, `forms/_tmp_${name}.html`);
}

async function listStandaloneFormTemplates() {
  try {
    const entries = await readdir(FORMS_DIR, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
      .map((entry) => entry.name.replace(/\.html$/, ""))
      .sort((a, b) => a.localeCompare(b));
  } catch (error) {
    if (error && typeof error === "object" && "code" in error) {
      if (error.code === "ENOENT") {
        return [];
      }
    }
    throw error;
  }
}

async function generateForms() {
  const formNames = await listStandaloneFormTemplates();

  if (formNames.length === 0) {
    console.log("ℹ️  No standalone form templates found in documents/forms/.");
    return;
  }

  for (const formName of formNames) {
    await generateForm(formName);
  }
}

// ── Template: Form Cover Sheets ───────────────────────────────────────────────
/**
 * Render one branded cover sheet PDF per form listed in
 * `documents/forms/forms-manifest.json`. Cover sheets live in
 * `documents/generated-pdfs/form-covers/` and carry the same chrome as
 * `safety-manual-cover.html` (frame, ribbon, identity bar, accreditation
 * footer, ★ VETERAN OWNED ★ tagline) plus a section-header-style
 * Form-Identification-and-Control card. Source `.docx` files in
 * `documents/forms/MHC-MISH-47-Forms/` are the canonical editable source
 * Word and are bound behind their cover at print/collation time.
 *
 * Tokens consumed by `documents/manuals/form-cover.html`:
 *   {{FORM_ID}}              e.g. "FORM 02-J"
 *   {{FORM_TITLE}}           e.g. "Pre-Task Safety Plan"
 *   {{FORM_CATEGORY_LABEL}}  e.g. "Safety & Incident"
 *   {{FORM_REVISION}}        e.g. "2026-01"
 *   {{FORM_EFFECTIVE_DATE}}  e.g. "April 2026"
 *   {{FORM_MANUAL_SECTION}}  e.g. "MISH 09" or "—"
 *   {{FORM_OWNER}}           e.g. "Safety Officer (Matt Ramsey)"
 */
async function generateFormCovers() {
  const forms = await loadFormsManifest().catch(() => []);
  if (forms.length === 0) {
    console.log("ℹ️  No forms in manifest; skipping cover sheets.");
    return;
  }

  const templatePath = join(DOCS_DIR, "manuals/form-cover.html");
  if (!existsSync(templatePath)) {
    console.error(`\n❌  Form cover template not found: ${templatePath}`);
    process.exit(1);
  }

  const coversDir = join(OUTPUT_DIR, "form-covers");
  await ensureDir(coversDir);
  const tmpDir = join(DOCS_DIR, "manuals/_tmp_form_covers");
  await ensureDir(tmpDir);

  const rawTemplate = await readFile(templatePath, "utf-8");
  const brandedTemplate = applyBrandTokens(rawTemplate);

  console.log(`\n🪪  Generating ${forms.length} form cover sheet(s)…`);

  for (const form of forms) {
    await renderFormCover(form, brandedTemplate, coversDir);
  }
}

/**
 * Render a single form cover PDF. Extracted so that
 * `generateFormPackage()` can refresh just one cover without rebuilding
 * all 47.
 */
async function renderFormCover(form, brandedTemplate, coversDir) {
  // A form may be referenced by one OR MORE MISH sections. The cover prints
  // one QR card per applicable section so a field user can scan straight
  // into the policy that requires this form. When no sections are declared
  // we render a single fallback QR pointing at the safety-manual TOC.
  const mishTargets = resolveMishSectionTargets(form.manualSection);

  const safeSlug = (form.slug || form.id || "form")
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-+|-+$/g, "");

  const qrCards = [];
  if (mishTargets.length === 0) {
    const tocUrl = `${SITE_URL}/resources/safety-manual/contents`;
    qrCards.push({
      meta: "Reference",
      label: "Manual TOC",
      dataUrl: await buildQrDataUrl(tocUrl),
      url: tocUrl,
    });
  } else {
    const dataUrls = await Promise.all(
      mishTargets.map((t) => buildQrDataUrl(t.url)),
    );
    mishTargets.forEach((t, i) => {
      qrCards.push({
        meta: "Reference",
        label: t.label,
        dataUrl: dataUrls[i],
        url: t.url,
      });
    });
  }

  // Wrap into 2 columns once we have more than 4 cards so the strip stays
  // inside the field-use panel and never crowds the bottom accreditation row.
  const stripClass =
    qrCards.length > 4 ? "qr-strip qr-strip--wrap" : "qr-strip";
  const qrStripHtml = [
    `<div class="${stripClass}" aria-label="reference QR codes">`,
    ...qrCards.map(
      (c) =>
        `  <div class="qr-card">` +
        `<div class="qr-meta">${escapeHtml(c.meta)}</div>` +
        `<a class="qr-link" href="${escapeAttr(c.url)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${escapeHtml(c.label)} reference">` +
        `<img class="qr-img" src="${c.dataUrl}" alt="QR code linking to ${escapeHtml(c.label)}" />` +
        `</a>` +
        `<p class="qr-target">${escapeHtml(c.label)}</p>` +
        `</div>`,
    ),
    `</div>`,
  ].join("\n");

  const sectionLabels =
    mishTargets.length > 0
      ? mishTargets.map((t) => t.label).join(" · ")
      : form.manualSection || "—";

  const ownerLabel =
    form.category === "mhc-cat6-project-admin"
      ? "Owner (Jeremy Thamert)"
      : form.owner || "Safety Officer (Matt Ramsey)";

  const retentionLabel =
    form.category === "mhc-cat6-project-admin"
      ? "Forward original to Project Engineer; retain a controlled copy in the project office file."
      : form.retention ||
        "Retain completed form per project and company records policy.";

  const sectionLabel =
    mishTargets.length > 1 ? "Manual References" : "Manual Reference";
  const briefingHead = "Field Briefing";
  const briefingAriaLabel = `Field briefing for ${form.id || "form"}`;
  const briefingAuthority =
    mishTargets.length > 0
      ? `Required by ${sectionLabels}.`
      : "Required by applicable project safety procedures and site directives.";
  const briefingUse =
    form.use ||
    "Complete clearly in the field before work starts and route to the responsible supervisor.";
  const briefingRevision = `Rev ${form.revision || "—"} • Effective ${form.effectiveDate || "—"}`;

  const tokens = {
    "{{FORM_ID}}": escapeHtml(form.id || "FORM"),
    "{{FORM_TITLE}}": escapeHtml(form.title || "Untitled Form"),
    "{{FORM_SUBTITLE}}": escapeHtml(
      form.subtitle ||
        "Controlled document for field execution and records continuity.",
    ),
    "{{FORM_CONTEXT_LEAD}}": escapeHtml(
      form.contextLead ||
        "Use this form to document work planning, execution checks, and closeout accountability.",
    ),
    "{{FORM_CATEGORY_LABEL}}": escapeHtml(
      form.categoryLabel || form.category || "—",
    ),
    "{{FORM_REVISION}}": escapeHtml(form.revision || "—"),
    "{{FORM_EFFECTIVE_DATE}}": escapeHtml(form.effectiveDate || "—"),
    "{{FORM_MANUAL_SECTION}}": escapeHtml(sectionLabels),
    "{{FORM_SECTION_LABEL}}": escapeHtml(sectionLabel),
    "{{FORM_OWNER}}": escapeHtml(ownerLabel),
    "{{FORM_BRIEFING_HEAD}}": escapeHtml(briefingHead),
    "{{FORM_BRIEFING_ARIA_LABEL}}": escapeHtml(briefingAriaLabel),
    "{{FORM_BRIEFING_AUTHORITY}}": escapeHtml(briefingAuthority),
    "{{FORM_BRIEFING_USE}}": escapeHtml(briefingUse),
    "{{FORM_BRIEFING_RETENTION}}": escapeHtml(retentionLabel),
    "{{FORM_BRIEFING_REVISION}}": escapeHtml(briefingRevision),
    "{{FORM_RETENTION}}": escapeHtml(retentionLabel),
    "{{QR_STRIP_HTML}}": qrStripHtml,
  };
  let html = brandedTemplate;
  for (const [token, value] of Object.entries(tokens)) {
    html = html.replaceAll(token, value);
  }

  const unresolvedFormTokens = Array.from(
    new Set(html.match(/\{\{FORM_[A-Z0-9_]+\}\}/g) || []),
  );
  if (unresolvedFormTokens.length > 0) {
    throw new Error(
      `Form cover token replacement failed for ${form.id || form.slug || "unknown form"}: unresolved token(s) ${unresolvedFormTokens.join(", ")}`,
    );
  }

  const pdfPath = join(coversDir, `${safeSlug}_cover.pdf`);
  const tmpHtml = `manuals/_tmp_form_covers/${safeSlug}.html`;
  await renderHtmlToPdf(
    html,
    pdfPath,
    { margin: { top: 0, right: 0, bottom: 0, left: 0 } },
    tmpHtml,
  );
  return pdfPath;
}

/**
 * Convenience wrapper used by the package builder: renders one cover
 * PDF for the given manifest entry, loading the template lazily.
 */
async function generateFormCoverFor(formEntry) {
  const templatePath = join(DOCS_DIR, "manuals/form-cover.html");
  if (!existsSync(templatePath)) {
    throw new Error(`Form cover template not found: ${templatePath}`);
  }
  const coversDir = join(OUTPUT_DIR, "form-covers");
  await ensureDir(coversDir);
  await ensureDir(join(DOCS_DIR, "manuals/_tmp_form_covers"));
  const rawTemplate = await readFile(templatePath, "utf-8");
  const brandedTemplate = applyBrandTokens(rawTemplate);
  return renderFormCover(formEntry, brandedTemplate, coversDir);
}

// ── Utilities ─────────────────────────────────────────────────────────────────
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/**
 * Convert the raw Table of Contents text (section 00) into structured HTML.
 *
 * The source PDF body contains artifact header lines followed by a
 * "TABLE OF CONTENTS" heading and then rows like:
 *   MISH 01 Injury Free Workplace Plan 2 04/07/2026
 *
 * This function:
 *  - Skips all artifact/preamble lines before the TABLE OF CONTENTS heading
 *  - Converts each "MISH ## Title..." line to a .toc-entry row
 *  - Strips the column-header row ("NUMBER TITLE REV EFF. DATE")
 *  - Strips per-page artifact banners (company header repeated on each page)
 */
const TOC_ARTIFACT_PATTERNS = [
  /^--\s*\d+\s*of\s*\d+\s*--$/,
  /^MH CONSTRUCTION\s*$/i,
  /^Industrial Safety and Health Program\s*$/i,
  /^MISH\s+TOC\s*$/i,
  /^Veteran Owned\s*$/i,
  /^MH Construction,?\s*Inc\.?\s*\|/i,
  /^Aligned with AGC/i,
  /^NUMBER\s+TITLE\s+REV/i,
];

function isAllCapsSubhead(line) {
  return (
    line.length < 90 &&
    line === line.toUpperCase() &&
    /[A-Z]{2}/.test(line) &&
    !/^\d/.test(line)
  );
}

function parseTocEntry(line) {
  const tocMatch = /^MISH\s+(\d+)\s+(.+)$/.exec(line);
  if (!tocMatch) return null;

  const numInt = Number(tocMatch[1]);
  const num = tocMatch[1].padStart(2, "0");
  const title = tocMatch[2]
    .replace(/\s+\d+\s+\d{2}\/\d{2}\/\d{4}\s*$/, "")
    .trim();

  return {
    num,
    numInt,
    title,
    tabRef: sectionToTab(numInt),
    tier: sectionToTier(numInt),
  };
}

function renderTocTierHeading(tier) {
  return (
    `<div class="toc-tier-heading">` +
    `<span class="toc-tier-label">TIER ${tier.num}</span>` +
    `<span class="toc-tier-desc">${tier.label} — ${tier.desc}</span>` +
    `</div>`
  );
}

function renderTocEntry(entry) {
  return (
    `<div class="toc-entry">` +
    `<span class="toc-tab">TAB ${entry.tabRef}</span>` +
    `<span class="toc-number">MISH\u00a0${entry.num}</span>` +
    `<span class="toc-title">${escapeHtml(entry.title)}</span>` +
    `<span class="toc-dots"></span>` +
    `</div>`
  );
}

function processTocLine(line, state) {
  if (!line) return;

  if (/^TABLE\s+OF\s+CONTENTS\s*$/i.test(line)) {
    state.inToc = true;
    state.parts.push(`<h4 class="sec-subhead">TABLE OF CONTENTS</h4>`);
    return;
  }

  if (!state.inToc) return;
  if (TOC_ARTIFACT_PATTERNS.some((p) => p.test(line))) return;

  const entry = parseTocEntry(line);
  if (entry) {
    if (entry.tier && state.lastTier !== entry.tier.num) {
      state.parts.push(renderTocTierHeading(entry.tier));
      state.lastTier = entry.tier.num;
    }
    state.parts.push(renderTocEntry(entry));
    return;
  }

  if (isAllCapsSubhead(line)) {
    state.parts.push(`<h4 class="sec-subhead">${escapeHtml(line)}</h4>`);
  }
}

function textToTocHtml(text) {
  if (!text) return "";

  const state = { inToc: false, lastTier: null, parts: [] };
  for (const raw of text.split("\n")) {
    processTocLine(raw.trim(), state);
  }

  return state.parts.join("\n");
}

/**
 * Clean HTML produced by mammoth (Word .docx extraction) for use in section bodies.
 * - Remaps h1/h2/h3 → <h4 class="sec-subhead"> to match the section heading style
 * - Adds class="sec-list" to <ul> and <ol>
 * - Adds class="sec-bullet" to <li>
 * - Strips inline style="" attributes left by mammoth
 * - Strips boilerplate <p> blocks (MH header lines, page number artifacts)
 * @param {string} html  Raw HTML from mammoth.convertToHtml()
 * @returns {string} Clean HTML ready for {{SECTION_BODY}}
 */
function cleanWordHtml(html) {
  if (!html) return "<p><em>No content provided.</em></p>";

  const STRIP = [
    /^MH CONSTRUCTION\s*$/i,
    /^Industrial Safety and Health Program\s*$/i,
    /^MISH\s+\d+\s*$/i,
    /^Veteran Owned\s*$/i,
    /^MH Construction,?\s*Inc\.?\s*\|/i,
    /^Aligned with AGC CSEA/i,
    /^Core Values:/i,
    /^"Building projects/i,
    /^--\s*\d+\s*of\s*\d+\s*--$/,
    /^AGC CSEA Alignment\s*$/,
    /^OSHA Core Element\s*$/,
    /^Senior Management Ownership and Participation\s*$/i,
    /^Management Leadership\s*$/i,
    /^Worker Engagement.*Participation\s*$/i,
    /^Hazard Prevention and Control\s*$/i,
    /^Document:\s*MISH/i,
    /^Section Summary\s*$/i,
    /^AGC Safety Standards Compliant\s*$/i,
    /^Page\s+\d+\s*\|\s*AGC/i,
    /^Aligned with AGC CSEA Best Practices/i,
    /^\d{3,4}\s+N\.\s+Capitol/i,
    /^\(509\)\s*308/i,
    /^office@mhc-gc\.com/i,
    /^www\.mhc-gc\.com/i,
  ];

  let out = html;

  // Normalize known legacy numbering references to the current program range.
  out = out.replaceAll(/\bMISH\s*1-42\b/gi, "MISH 1-50");

  // Remove legacy internal revision year labels from old approval rows.
  out = out.replaceAll(/\bRevision\s*(?:2024|2025)\b/gi, "");

  // Drop any leading approval/program metadata block before the first
  // canonical section heading. Prefer 1.x, then fall back to any dotted heading.
  out = out.replace(/^[\s\S]*?(?=<\w+[^>]*>\s*1\.[\d.]+\s+[A-Z])/i, "");
  out = out.replace(/^[\s\S]*?(?=<\w+[^>]*>\s*\d+\.[\d.]+\b)/i, "");

  // Some Word extractions place legacy approval metadata and the first
  // canonical heading in the same paragraph. Keep only content from 1.x onward.
  out = out.replaceAll(
    /<p>[\s\S]*?\b(1\.\d+(?:\.\d+)*\s+[A-Z][\s\S]*?)<\/p>/gi,
    (_match, keep) => `<p>${keep}</p>`,
  );

  // Remove legacy approval/signature cluster fragments that can remain inline
  // in migrated sections (old "Revision 1 / Approved By / Effective Date").
  out = out.replaceAll(
    /Representative\s+Jeremy\s+Thamert[\s\S]*?Effective\s*Date\s*\d{1,2}\/\d{1,2}\/\d{4}/gi,
    "",
  );
  out = out.replaceAll(
    /Jeremy\s+Thamert[\s\S]*?Number\s+Mish\s+\d+[\s\S]*?Effective\s*Date\s*\d{1,2}\/\d{1,2}\/\d{4}/gi,
    "",
  );

  // Strip inline style attributes
  out = out.replaceAll(/\s+style="[^"]*"/gi, "");

  // Strip colour/font spans that add no semantic value
  out = out.replaceAll(/<span[^>]*>([^<]*)<\/span>/gi, "$1");

  // Remove empty / whitespace-only paragraphs
  out = out.replaceAll(/<p>(\s|&nbsp;)*<\/p>/gi, "");

  // Remove boilerplate <p> blocks
  out = out.replaceAll(/<p>([\s\S]*?)<\/p>/gi, (match, inner) => {
    const text = inner.replaceAll(/<[^>]+>/g, "").trim();
    if (!text) return "";
    if (STRIP.some((p) => p.test(text))) return "";
    return match;
  });

  // Remap heading levels to sec-subhead style
  out = out.replaceAll(
    /<h[123](\s[^>]*)?>([\s\S]*?)<\/h[123]>/gi,
    (_, attrs, content) => `<h4 class="sec-subhead">${content}</h4>`,
  );

  // Add sec-list class to lists
  out = out.replaceAll(/<(ul|ol)(\s[^>]*)?>/gi, '<$1 class="sec-list">');

  // Add sec-bullet class to list items
  out = out.replaceAll(/<li(\s[^>]*)?>/gi, '<li class="sec-bullet">');

  // Tag native Word tables so the .sec-data-table CSS picks them up. Skip
  // tables that already carry a known branded class so we don't double-style
  // signature-table, threshold-table, revision-info-table, ptp-*, etc.
  const BRANDED_TABLE_CLASSES = [
    "signature-table",
    "threshold-table",
    "revision-info-table",
    "sig-container-table",
    "data-container-table",
    "ptp-meta-table",
    "ptp-hazards-table",
    "ptp-injured-table",
    "orientation-record-table",
    "sec-data-table",
  ];
  out = out.replaceAll(/<table(\s[^>]*)?>/gi, (match, attrs = "") => {
    const cls = /class="([^"]*)"/i.exec(attrs || "")?.[1] || "";
    if (BRANDED_TABLE_CLASSES.some((b) => cls.split(/\s+/).includes(b))) {
      return match;
    }
    // Mark first-row-header so the first row gets the green band when there
    // is no explicit <thead>.
    const newCls = cls
      ? `${cls} sec-data-table first-row-header`
      : "sec-data-table first-row-header";
    const cleaned = (attrs || "").replace(/\s*class="[^"]*"/i, "");
    return `<table${cleaned} class="${newCls}">`;
  });

  // Strip <colgroup>/<col> Word adds — they fight table-layout: fixed.
  out = out.replaceAll(/<colgroup[\s\S]*?<\/colgroup>/gi, "");
  out = out.replaceAll(/<col\s[^>]*\/?>/gi, "");

  return out.trim();
}

/**
 * Apply conservative MH terminology normalization to handbook HTML while
 * preserving comprehensive source policy content.
 */
function applyHandbookBrandTerminology(html, sectionNumber) {
  let out = String(html || "");

  const replacements = [
    [/\bMH Construction\s+Inc\.?\b/g, "MH Construction, Inc."],
    [/\bclients\b/g, "Client Partners"],
    [/\bclient\b/g, "Client Partner"],
    [/\bsubcontractors\b/g, "Trade Partners"],
    [/\bsubcontractor\b/g, "Trade Partner"],
    [/\bwork\s*from\s*home\b/gi, "remote-work"],
  ];

  for (const [pattern, replacement] of replacements) {
    out = out.replaceAll(pattern, replacement);
  }

  out = out.replaceAll(/MH Construction,\s*Inc\.\.+/g, "MH Construction, Inc.");
  out = out.replaceAll(/\bInc\.\.+/g, "Inc.");

  if (
    Number(sectionNumber) === 1 &&
    !/Built on Quality, Backed by Trust\./i.test(out)
  ) {
    out = out.replace(
      /<\/p>/i,
      `</p><p><strong>Built on Quality, Backed by Trust.</strong></p>`,
    );
  }

  return out;
}

/**
 * Classify a single trimmed line of section text and render it as HTML.
 * Returns the rendered HTML string for structural lines (dotted section
 * numbers, numbered list items, bullets, all-caps sub-headings), or `null`
 * if the line should be treated as paragraph prose by the caller.
 */
function renderTextLine(line) {
  // Dotted section number: "2.3", "2.3.1", "2.3.1.1" — flush-left heading
  const numMatch = /^(\d+\.\d+(?:\.\d+)*)\s+(.+)$/.exec(line);
  if (numMatch) {
    return (
      `<div class="sec-num-row">` +
      `<span class="sec-num">${escapeHtml(numMatch[1])}</span>` +
      `<span class="sec-num-text">${escapeHtml(numMatch[2].trim())}</span>` +
      `</div>`
    );
  }

  // Plain numbered list item: "1. Item text…" or "10. Item text…"
  const numListMatch = /^(\d{1,2})\.\s+(.+)$/.exec(line);
  if (numListMatch) {
    return (
      `<div class="sec-num-row">` +
      `<span class="sec-num">${escapeHtml(numListMatch[1])}.</span>` +
      `<span class="sec-num-text">${escapeHtml(numListMatch[2].trim())}</span>` +
      `</div>`
    );
  }

  // Bullet point (• character)
  if (line.startsWith("\u2022")) {
    return `<li class="sec-bullet">${escapeHtml(line.slice(1).trim())}</li>`;
  }

  // All-caps short line → sub-heading (skip bare numbers and strip lines)
  if (
    line.length < 90 &&
    line === line.toUpperCase() &&
    /[A-Z]{2}/.test(line) &&
    !/^\d/.test(line)
  ) {
    return `<h4 class="sec-subhead">${escapeHtml(line)}</h4>`;
  }

  return null;
}

/**
 * Convert plain text extracted from PDF into structured HTML.
 * - Filters PDF-header artifact lines (page marks, repeated MISH headers, etc.)
 * - Renders dotted section numbers (2.3, 2.3.1) as flush-left headings
 * - Renders bullet points as list items
 * - All-caps short lines become sub-headings
 * @param {string} text
 * @returns {string} HTML
 */
function textToHtml(text) {
  if (!text) return "<p><em>No content extracted. See source PDF.</em></p>";

  // Normalize known legacy numbering references to the current program range.
  text = text.replaceAll(/\bMISH\s*1-42\b/gi, "MISH 1-50");

  // Remove legacy internal revision year labels from old approval rows.
  text = text.replaceAll(/\bRevision\s*(?:2024|2025)\b/gi, "");

  // Strip everything from the start of the body up to the first canonical
  // section heading. Prefer "1.x ..." to avoid retaining legacy approval rows
  // that often include "3.0 April 2026 ..." before the true body.
  const firstSectionIdx = text.search(/\b1\.\d+(?:\.\d+)*\s+[A-Z]/);
  if (firstSectionIdx > 0) {
    text = text.slice(firstSectionIdx);
  } else {
    const bodyTrimRx =
      /(?=\b(?:PURPOSE|GENERAL|SCOPE|MISSION|PLAN\s+ELEMENTS)\b)/;
    const trimIdx = text.search(bodyTrimRx);
    if (trimIdx > 0) text = text.slice(trimIdx);
  }

  // Source-PDF artifacts that should be stripped from every section body
  const STRIP = [
    /^MH CONSTRUCTION\s*$/i,
    /^Industrial Safety and Health Program\s*$/i,
    /^MISH\s+\d+\s*$/i,
    /^Veteran Owned\s*$/i,
    /^MH Construction,?\s*Inc\.?\s*\|/i,
    /^Aligned with AGC CSEA/i,
    /^Core Values:/i,
    /^"Building projects/i,
    /^--\s*\d+\s*of\s*\d+\s*--$/,
    /^AGC CSEA Alignment\s*$/,
    /^OSHA Core Element\s*$/,
    /^Senior Management Ownership and Participation\s*$/i,
    /^Management Leadership\s*$/i,
    /^Worker Engagement.*Participation\s*$/i,
    /^Hazard Prevention and Control\s*$/i,
    /^Document:\s*MISH/i,
    /^Section Summary\s*$/i,
    /^AGC Safety Standards Compliant\s*$/i,
    // Approval block fragments (names, roles, metadata)
    /^Jeremy Thamert\s*$/i,
    /^Matt Ramsey\s*$/i,
    /^President\s*(?:&|and)\s*Owner\s*$/i,
    /^President.*Safety Officer\s*$/i,
    /^AGC Representative\s*(?:&|and)\s*Safety Officer\s*$/i,
    /^Travelers Risk Control Consultant\s*$/i,
    /^AGC Representative\s*$/i,
    /^Signature\s*\/\s*Date\s*$/i,
    /^Name\s+Date\s*$/i,
    /^Effective\s*Date\s*$/i,
    /^Approved\s*By\s*$/i,
    /^Page\s+\d+\s+of\s+\d+\s*$/i,
    /^Mh Construction Industrial Safety And Health Program/i,
    /^Number\s+Mish\s+/i,
    /^Revision\s+\d+\s*$/i,
  ];

  // Source-PDF signature blocks: extract long inline phrases that represent
  // form sign-off rows and replace them with sentinel tokens. Tokens are
  // post-rendered into branded .sig-container blocks below.
  const SIG_BLOCK_PATTERNS = [
    {
      token: "@@SIG_ORIENTATION@@",
      regex:
        /Orientation Checklist Sign[-\s]?Off Sheet\s+NAME\s+Signature\s+DATE\s+Company\s+S\s*#\s*Last\s*4/gi,
    },
    {
      token: "@@SIG_APPLICANT@@",
      regex:
        /Applicant Name\s*\(please print\)[\s\S]{0,80}?Today['\u2019]?s Date\s+Employer\s+Mh\s+Construction/gi,
    },
    {
      token: "@@SIG_NAMESIGDATE@@",
      // Standalone "Name Signature Date" sign-off line at end of a consent
      // paragraph (drug & alcohol acknowledgements). May be preceded by a
      // long underscore form-blank line, end of sentence, or line break.
      // Lookbehind preserves the boundary character so prose isn't truncated.
      regex: /(?<=[.\n_])[ \t_]*Name\s+Signature\s+Date(?=\s|$)/g,
    },
  ];
  for (const { token, regex } of SIG_BLOCK_PATTERNS) {
    text = text.replace(regex, `\n\n${token}\n\n`);
  }

  // Some extracted section bodies arrive as one long line. Reconstruct
  // logical line breaks for WBS numbering and common bullet glyphs.
  const normalized = text
    // Strip lines that consist entirely of underscores (form blank-fill rows from source PDFs)
    // Must run before the per-char underscore strip so the whole line disappears cleanly.
    .replaceAll(/^[ \t]*_{5,}[ \t]*$/gm, "")
    // Strip any remaining inline underscore runs (e.g. "Name: ________")
    .replaceAll(/_{5,}/g, "")
    // Bullet glyphs → newline + standard bullet
    .replaceAll(/\s+([\u2022\u25AA\u25CF\u25E6\uF0B7])\s*/g, "\n\u2022 ")
    // WBS dotted numbers: "1.0 HEADING", "2.1.3 Sub-item"
    .replaceAll(/\s(?=\d+\.\d+(?:\.\d+)*\s+[A-Z(])/g, "\n")
    // Plain numbered list items: "1. Item" or "10. Item"
    .replaceAll(/\s(?=\d{1,2}\.\s+[A-Z(])/g, "\n")
    // ALL-CAPS section headings followed by a period: "GENERAL. " "MISSION. "
    .replaceAll(/\s(?=[A-Z]{2}[A-Z\s]*\.\s+[A-Z(])/g, "\n")
    // Split Training & Reference Resources section into individual lines
    .replaceAll(/\s+(?=Training\s*&\s*Reference\s*Resources)/gi, "\n")
    .replaceAll(
      /\s+(?=Travelers\s+(?:Risk\s+Control|Training\s+Library):)/gi,
      "\n",
    )
    .replaceAll(/\s+(?=OSHA\s+Reference:)/gi, "\n")
    .replaceAll(/\s+(?=AGC\s+Safety\s+Resources:)/gi, "\n")
    .replaceAll(/\s+(?=WISHA\s*\/)/gi, "\n")
    .replaceAll(/\s+(?=NOTE:\s+WISHA)/gi, "\n")
    // Signature/header table artifacts on same line as content — strip them
    .replaceAll(/\s*_{3,}\s*\/\s*Date\s*/g, "");

  const lines = normalized.split("\n");
  const parts = [];
  let para = [];

  const flush = () => {
    if (!para.length) return;
    parts.push(`<p>${para.join(" ")}</p>`);
    para = [];
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flush();
      continue;
    }
    if (STRIP.some((p) => p.test(line))) continue;

    const rendered = renderTextLine(line);
    if (rendered !== null) {
      flush();
      parts.push(rendered);
      continue;
    }

    para.push(escapeHtml(line));
  }
  flush();

  // Wrap orphaned <li> elements in <ul>
  let html = parts.join("\n");
  html = html.replaceAll(
    /(<li[\s\S]*?<\/li>\n?)+/g,
    (m) => `<ul class="sec-list">${m}</ul>`,
  );

  // Replace signature sentinel tokens with branded sig-container blocks.
  // The token may have been wrapped as <p> or as <h4 class="sec-subhead"> by
  // renderTextLine() (since it's all-caps), so accept either wrapper.
  const sigTokenRx = (token) =>
    new RegExp(`<(?:p|h4[^>]*)>${token}</(?:p|h4)>`, "g");
  html = html.replace(
    sigTokenRx("@@SIG_ORIENTATION@@"),
    buildSigContainer({
      title: "Orientation Checklist — Sign-Off Sheet",
      icon: "✍",
      columns: ["Name", "Signature", "Date", "Company", "SS# (Last 4)"],
      rows: 6,
    }),
  );
  html = html.replace(
    sigTokenRx("@@SIG_APPLICANT@@"),
    buildSigContainer({
      title: "Applicant Consent — Drug & Alcohol Testing",
      icon: "✍",
      columns: [
        "Applicant Name (Print)",
        "Applicant Signature",
        "Witness Signature",
        "SS#",
        "Date",
      ],
      rows: 3,
      footer: "Employer: MH Construction, Inc.",
    }),
  );
  html = html.replace(
    sigTokenRx("@@SIG_NAMESIGDATE@@"),
    buildSigContainer({
      title: "Acknowledgement — Sign & Date",
      icon: "✍",
      columns: ["Name", "Signature", "Date"],
      rows: 3,
    }),
  );
  return html;
}

/**
 * Build a branded signature container (matches binder-tab visual treatment).
 * Renders a primary-green header bar with white text + a blank entry table.
 */
function buildSigContainer({ title, icon, columns, rows = 4, footer }) {
  const head = columns
    .map((c) => `<th scope="col">${escapeHtml(c)}</th>`)
    .join("");
  const blankRow = `<tr>${columns.map(() => "<td>&nbsp;</td>").join("")}</tr>`;
  const body = new Array(rows).fill(blankRow).join("");
  const footHtml = footer
    ? `<div class="sig-container-footer">${escapeHtml(footer)}</div>`
    : "";
  return [
    `<div class="sig-container">`,
    `<div class="sig-container-header">`,
    `<span class="sig-container-icon" aria-hidden="true">${icon}</span>`,
    `<span>${escapeHtml(title)}</span>`,
    `</div>`,
    `<table class="sig-container-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`,
    footHtml,
    `</div>`,
  ].join("");
}

/**
 * Build a branded reference-data container (matches binder-tab visual style).
 * Same green gradient header as .sig-container, but populated with reference
 * data rows. Use for OSHA threshold tables, fall-protection trigger heights,
 * heat-stress index, electrical approach boundaries, etc.
 *
 * @param {object} cfg
 * @param {string}   cfg.title
 * @param {string}   cfg.icon
 * @param {string[]} cfg.columns
 * @param {Array<Array<string>>} cfg.data   — array of row arrays
 * @param {string=}  cfg.footer             — optional footnote (italic)
 */
function buildDataContainer({ title, icon, columns, data, footer }) {
  const head = columns
    .map((c) => `<th scope="col">${escapeHtml(c)}</th>`)
    .join("");
  const body = data
    .map((row) => {
      const cells = row.map((cell) => `<td>${cell}</td>`).join("");
      return `<tr>${cells}</tr>`;
    })
    .join("");
  const footHtml = footer
    ? `<div class="data-container-footer">${footer}</div>`
    : "";
  return [
    `<div class="data-container">`,
    `<div class="data-container-header">`,
    `<span class="data-container-icon" aria-hidden="true">${icon}</span>`,
    `<span>${escapeHtml(title)}</span>`,
    `</div>`,
    `<table class="data-container-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`,
    footHtml,
    `</div>`,
  ].join("");
}

// ── Canonical reference data tables (anchored per-section) ───────────────────

const REF_FALL_TRIGGER_HEIGHTS = buildDataContainer({
  title: "Fall-Protection Trigger Heights — Quick Reference",
  icon: "▲",
  columns: ["Activity / Surface", "Trigger Height", "Standard"],
  data: [
    ["General Construction", "6 ft (1.8 m)", "29 CFR 1926.501"],
    ["Steel Erection", "15 ft (4.6 m)", "29 CFR 1926.760"],
    ["Scaffolding", "10 ft (3.0 m)", "29 CFR 1926.451"],
    ["Subpart M Example Case", "6 ft (1.8 m)", "29 CFR 1926.501(b)(13)"],
    ["Stairways &amp; Ladders", "4 ft (1.2 m)", "29 CFR 1926.1052"],
    ["Excavation Edge", "6 ft (1.8 m)", "29 CFR 1926.501(b)(7)"],
    ["Hoist Areas", "Any height with opening", "29 CFR 1926.501(b)(3)"],
  ],
  footer:
    "Always provide fall protection at the lower of the listed trigger or the level required by job-specific JHA.",
});

const REF_CONFINED_SPACE_ATMOSPHERE = buildDataContainer({
  title: "Permit-Required Confined Space — Atmospheric Action Levels",
  icon: "⚠",
  columns: ["Hazard", "Acceptable Range", "Action Level"],
  data: [
    ["Oxygen (O₂)", "19.5% – 23.5%", "STOP &amp; ventilate / re-test"],
    ["Lower Explosive Limit", "&lt; 10% LEL", "Evacuate; correct source"],
    ["Carbon Monoxide (CO)", "&lt; 25 ppm", "Evacuate; ventilate"],
    [
      "Hydrogen Sulfide (H₂S)",
      "&lt; 10 ppm (TWA)",
      "Evacuate; SCBA required &gt; 10 ppm",
    ],
    [
      "Other toxic / IDLH",
      "&lt; PEL per SDS",
      "Use respiratory PPE per SDS &amp; JHA",
    ],
  ],
  footer:
    "Calibrated 4-gas meter required prior to entry and continuously while occupied. Test bottom, middle, and top of space.",
});

const REF_HEAT_INDEX_TIERS = buildDataContainer({
  title: "Heat-Index Action Tiers — On-Site Response",
  icon: "☀",
  columns: ["Heat Index", "Risk Tier", "Required Controls"],
  data: [
    [
      "&lt; 91°F",
      "Caution",
      "Standard hydration; encourage water breaks every 60 min",
    ],
    [
      "91 – 103°F",
      "Extreme Caution",
      "Hourly water breaks; shaded rest areas; buddy-check protocol",
    ],
    [
      "103 – 115°F",
      "Danger",
      "Mandatory 15-min rest each hour in shade; supervisor monitoring; modified work pace",
    ],
    [
      "&gt; 115°F",
      "Extreme Danger",
      "Stop non-essential work; re-schedule; emergency-response plan active",
    ],
  ],
  footer:
    "Heat Index = combined air temperature + relative humidity. Use NWS chart or InspectionApp; account for direct sun and PPE adjustments.",
});

const REF_ELECTRICAL_APPROACH = buildDataContainer({
  title: "Electrical Approach Boundaries — Qualified vs. Unqualified",
  icon: "⚡",
  columns: [
    "Voltage Range (Phase-to-Phase)",
    "Limited Approach",
    "Restricted Approach",
  ],
  data: [
    ["50 V – 750 V", "3 ft 6 in", "1 ft 0 in"],
    ["751 V – 15 kV", "5 ft 0 in", "2 ft 2 in"],
    ["15.1 kV – 36 kV", "6 ft 0 in", "2 ft 7 in"],
    ["36.1 kV – 46 kV", "8 ft 0 in", "2 ft 9 in"],
    ["46.1 kV – 72.5 kV", "8 ft 0 in", "3 ft 3 in"],
  ],
  footer:
    "Distances per NFPA 70E. Unqualified personnel must remain outside the Limited Approach boundary unless escorted by a qualified person.",
});

const REF_NOISE_EXPOSURE = buildDataContainer({
  title: "Occupational Noise Exposure — Permissible Limits",
  icon: "♪",
  columns: ["Sound Level (dBA, slow)", "Max Daily Duration", "Required Action"],
  data: [
    ["80 dBA", "Unlimited", "Hearing-conservation awareness"],
    [
      "85 dBA",
      "8 hours (Action Level)",
      "Enroll in HCP; offer hearing protection &amp; annual audiogram",
    ],
    ["90 dBA", "8 hours (PEL)", "Hearing protection mandatory"],
    [
      "95 dBA",
      "4 hours",
      "Hearing protection mandatory; engineering controls evaluated",
    ],
    ["100 dBA", "2 hours", "Double hearing protection considered"],
    ["105 dBA", "1 hour", "Double protection required"],
    ["115 dBA", "15 minutes", "Maximum exposure ceiling"],
  ],
  footer:
    "Per OSHA 29 CFR 1910.95 and WAC 296-817. Noise exposure averaged over an 8-hour TWA. Impact/impulse noise must not exceed 140 dB peak SPL.",
});

const REF_RESPIRATOR_APF = buildDataContainer({
  title: "Assigned Protection Factors (APF) — Respirator Selection",
  icon: "◉",
  columns: ["Respirator Type", "APF", "Typical Use"],
  data: [
    [
      "Filtering Facepiece / Half-Mask (Air-Purifying)",
      "10",
      "Nuisance dust, low-level particulate",
    ],
    [
      "Full Facepiece (Air-Purifying)",
      "50",
      "Higher particulate / vapor concentrations",
    ],
    [
      "Powered Air-Purifying Respirator (PAPR), Loose-Fitting Hood",
      "25",
      "Comfort use, general dust",
    ],
    [
      "PAPR, Tight-Fitting Full Facepiece",
      "1,000",
      "High particulate, lead, silica abatement",
    ],
    [
      "Supplied-Air Respirator, Demand Mode (Half-Mask)",
      "10",
      "Limited continuous-flow use",
    ],
    [
      "Supplied-Air Respirator, Pressure-Demand (Full Facepiece)",
      "1,000",
      "Welding fume, abrasive blasting",
    ],
    [
      "Self-Contained Breathing Apparatus (SCBA), Pressure-Demand",
      "10,000",
      "IDLH atmospheres, confined-space rescue",
    ],
  ],
  footer:
    "Per OSHA 29 CFR 1910.134(d)(3)(i)(A), Table 1. Maximum Use Concentration (MUC) = APF × PEL. Fit-testing required for all tight-fitting respirators.",
});

const REF_LADDER_DUTY_RATINGS = buildDataContainer({
  title: "Ladder Duty Ratings — ANSI A14 / OSHA Selection",
  icon: "‖",
  columns: ["Class", "Duty Rating", "Capacity (lbs)", "Typical Use"],
  data: [
    [
      "Type IAA",
      "Special Duty",
      "375",
      "Heavy industrial, rugged construction",
    ],
    [
      "Type IA",
      "Extra Heavy Duty",
      "300",
      "Industrial, professional construction",
    ],
    ["Type I", "Heavy Duty", "250", "General industrial &amp; trade work"],
    ["Type II", "Medium Duty", "225", "Light commercial, painting"],
    [
      "Type III",
      "Light Duty",
      "200",
      "Household — NOT permitted on MH job-sites",
    ],
  ],
  footer:
    "Per ANSI A14.1/A14.2/A14.5. MH Construction job-sites require Type IA or better. Capacity includes worker, clothing, tools, and materials carried.",
});

const REF_FLAMMABLE_CLASSIFICATION = buildDataContainer({
  title: "Flammable & Combustible Liquid Classification",
  icon: "◆",
  columns: ["Class", "Flash Point", "Boiling Point", "Examples"],
  data: [
    ["IA", "&lt; 73°F", "&lt; 100°F", "Diethyl ether, pentane"],
    ["IB", "&lt; 73°F", "≥ 100°F", "Gasoline, acetone, toluene"],
    ["IC", "73°F – &lt; 100°F", "—", "Mineral spirits, xylene"],
    ["II", "100°F – &lt; 140°F", "—", "Diesel fuel, kerosene"],
    ["IIIA", "140°F – &lt; 200°F", "—", "Heating oil, paint thinners"],
    ["IIIB", "≥ 200°F", "—", "Lubricating oils, motor oil"],
  ],
  footer:
    "Per NFPA 30 / OSHA 29 CFR 1910.106. Class I = Flammable; Class II/III = Combustible. Storage quantities and container types governed by class.",
});

const REF_AERIAL_LIFT_CLEARANCE = buildDataContainer({
  title: "Minimum Clearance From Energized Power Lines — Aerial Work",
  icon: "⚠",
  columns: [
    "Voltage Range (Phase-to-Phase)",
    "Min. Clearance (Operating)",
    "Min. Clearance (Transit)",
  ],
  data: [
    ["0 – 50 kV", "10 ft", "4 ft"],
    ["50 – 200 kV", "15 ft", "10 ft"],
    ["200 – 350 kV", "20 ft", "15 ft"],
    ["350 – 500 kV", "25 ft", "20 ft"],
    ["500 – 750 kV", "35 ft", "25 ft"],
    ["750 – 1000 kV", "45 ft", "35 ft"],
  ],
  footer:
    "Per OSHA 29 CFR 1910.333(c)(3) Table S-5 and 1926.1408. If voltage is unknown, assume the highest possible class. Spotter required for all lifts within twice the listed clearance.",
});

const REF_SAFETY_SIGN_COLORS = buildDataContainer({
  title: "Safety Sign & Tag Colors — ANSI Z535 / OSHA",
  icon: "▣",
  columns: ["Color", "Signal Word", "Use / Hazard Level"],
  data: [
    [
      "Red",
      "DANGER",
      "Imminent hazard — will result in death or serious injury",
    ],
    [
      "Orange",
      "WARNING",
      "Hazardous situation — could result in death or serious injury",
    ],
    [
      "Yellow",
      "CAUTION",
      "Hazardous situation — could result in minor or moderate injury",
    ],
    [
      "Green",
      "SAFETY / FIRST AID",
      "Safety equipment, emergency egress, first-aid station",
    ],
    [
      "Blue",
      "NOTICE",
      "Information not directly hazard-related (policy, instruction)",
    ],
    [
      "Fluorescent Orange / Red",
      "BIOHAZARD",
      "Biological hazard, contaminated PPE/waste",
    ],
  ],
  footer:
    "Per ANSI Z535.1 / Z535.2 and OSHA 29 CFR 1910.145. Letter height for Exit signs ≥ 6 in., principal stroke ≥ ¾ in.",
});

const REF_SCAFFOLD_DUTY_CLASSES = buildDataContainer({
  title: "Scaffold Load-Duty Classifications",
  icon: "▦",
  columns: ["Duty Class", "Intended Load (per sq. ft.)", "Typical Use"],
  data: [
    [
      "Light Duty",
      "25 lbs / sq. ft.",
      "Workers + light hand tools (painting, inspection)",
    ],
    [
      "Medium Duty",
      "50 lbs / sq. ft.",
      "Workers + materials (plastering, masonry)",
    ],
    [
      "Heavy Duty",
      "75 lbs / sq. ft.",
      "Workers + heavy materials (stone setting, brick)",
    ],
    [
      "Special Duty",
      "&gt; 75 lbs / sq. ft.",
      "Engineered design required; PE-stamped drawings",
    ],
  ],
  footer:
    "Per OSHA 29 CFR 1926.451(a). Scaffolds and components shall support their own weight + 4× the maximum intended load without failure. Working planks must be scaffold-grade lumber.",
});

const REF_WELDING_FILTER_SHADES = buildDataContainer({
  title: "Welding & Cutting — Minimum Filter Lens Shade",
  icon: "◑",
  columns: ["Operation", "Electrode / Plate Size", "Min. Shade Number"],
  data: [
    ["Shielded Metal Arc (SMAW)", "Up to 5/32 in. electrode", "10"],
    ["Shielded Metal Arc (SMAW)", "5/32 – 1/4 in. electrode", "12"],
    ["Gas Metal Arc / Flux-Cored (GMAW/FCAW)", "Up to 1/4 in.", "11"],
    ["Gas Tungsten Arc (GTAW / TIG)", "Light-current work", "10"],
    ["Carbon Arc Cutting / Air Arc", "Heavy", "14"],
    ["Plasma Arc Cutting", "Light (≤ 300 A)", "9"],
    ["Oxy-Fuel Cutting", "Light (plate &lt; 1 in.)", "3 – 4"],
    ["Oxy-Fuel Cutting", "Heavy (plate &gt; 6 in.)", "5 – 6"],
    ["Torch Brazing / Soldering", "—", "3 – 4"],
  ],
  footer:
    "Per OSHA 29 CFR 1910.252(b)(2)(ii) Table Q-2 and ANSI Z49.1. Use next-darker shade if vision strain occurs. Auto-darkening lenses must meet ANSI Z87.1+.",
});

const REF_FIRE_EXTINGUISHER_CLASSES = buildDataContainer({
  title: "Portable Fire Extinguisher Classes",
  icon: "▲",
  columns: ["Class", "Fuel Type", "Recommended Agent"],
  data: [
    [
      "A",
      "Ordinary combustibles — wood, paper, cloth, trash",
      "Water, foam, dry chemical (ABC)",
    ],
    [
      "B",
      "Flammable liquids &amp; gases — gasoline, oil, propane",
      "Foam, CO₂, dry chemical (BC or ABC)",
    ],
    [
      "C",
      "Energized electrical equipment",
      "CO₂, dry chemical (BC or ABC) — non-conductive",
    ],
    [
      "D",
      "Combustible metals — magnesium, sodium, titanium",
      "Specialty dry powder (Class D only)",
    ],
    [
      "K",
      "Cooking media — animal/vegetable oils &amp; fats",
      "Wet chemical (potassium acetate)",
    ],
  ],
  footer:
    "Per NFPA 10 and OSHA 29 CFR 1910.157. Job-site extinguishers must be inspected monthly and serviced annually. MH standard: minimum 2A:10B:C rating per 3,000 sq. ft. of work area.",
});

const REF_DOT_DRUG_TEST_TYPES = buildDataContainer({
  title: "DOT/FMCSA Controlled-Substance Test Categories — Commercial Drivers",
  icon: "◉",
  columns: ["Test Type", "When Required", "Driver Action Window"],
  data: [
    [
      "Pre-Employment",
      "Before performing any safety-sensitive function",
      "Negative result on file before first dispatch",
    ],
    [
      "Random",
      "Unannounced, computer-selected throughout the year",
      "Report to collection site immediately upon notice",
    ],
    [
      "Post-Accident",
      "Following any DOT-recordable accident",
      "Alcohol within 8 hours; drugs within 32 hours",
    ],
    [
      "Reasonable Suspicion",
      "Trained supervisor observes signs of impairment",
      "Test conducted as soon as possible after observation",
    ],
    [
      "Return-to-Duty",
      "After any policy violation, before resuming driving",
      "Negative test required after SAP evaluation",
    ],
    [
      "Follow-Up",
      "Per Substance Abuse Professional (SAP) plan",
      "Minimum 6 unannounced tests in first 12 months",
    ],
  ],
  footer:
    "Per 49 CFR Part 382 (FMCSA) and 49 CFR Part 40 (DOT). Refusal to test or failure to comply within the specified window is treated as a positive result.",
});

const REF_GHS_PICTOGRAMS = buildDataContainer({
  title: "GHS Hazard Pictograms — SDS & Container Labels",
  icon: "◆",
  columns: ["Pictogram (Name)", "Hazard Class", "Examples"],
  data: [
    [
      "Health Hazard",
      "Carcinogen, mutagen, reproductive toxin, respiratory sensitizer",
      "Crystalline silica, asbestos, formaldehyde",
    ],
    [
      "Flame",
      "Flammable, self-reactive, pyrophoric, self-heating",
      "Gasoline, acetone, propane",
    ],
    [
      "Exclamation Mark",
      "Irritant (skin/eye), narcotic effect, respiratory tract irritant",
      "Cleaning agents, paints, ammonia",
    ],
    [
      "Gas Cylinder",
      "Gases under pressure (compressed, liquefied, dissolved)",
      "Oxygen, acetylene, nitrogen, propane cylinders",
    ],
    [
      "Corrosion",
      "Skin corrosion / burns, eye damage, corrosive to metals",
      "Sulfuric acid, sodium hydroxide, muriatic acid",
    ],
    [
      "Exploding Bomb",
      "Explosives, self-reactives, organic peroxides",
      "Blasting agents, ammonium nitrate",
    ],
    [
      "Flame Over Circle",
      "Oxidizers (solid, liquid, gas)",
      "Hydrogen peroxide, nitric acid, oxygen",
    ],
    [
      "Skull &amp; Crossbones",
      "Acute toxicity (severe) — fatal or toxic",
      "Hydrogen sulfide, methanol, lead compounds",
    ],
    [
      "Environment (non-mandatory)",
      "Aquatic toxicity",
      "Pesticides, solvents, heavy metals",
    ],
  ],
  footer:
    "Per OSHA 29 CFR 1910.1200 (HCS 2012) aligned with UN GHS Rev. 7. All hazardous chemical containers must display the appropriate pictogram(s), signal word, and hazard statements.",
});

const REF_OSHA_SOIL_CLASSIFICATION = buildDataContainer({
  title: "OSHA Soil Classification — Sloping & Benching Requirements",
  icon: "▲",
  columns: ["Soil Type", "Description", "Max Allowable Slope (H : V)"],
  data: [
    [
      "Stable Rock",
      "Natural solid mineral matter; remains intact while exposed",
      "90° (vertical)",
    ],
    [
      "Type A",
      "Cohesive soils — clay, silty clay, sandy clay, hardpan (≥ 1.5 tsf)",
      "0.75 : 1 (53° from horizontal)",
    ],
    [
      "Type B",
      "Cohesive (0.5 – 1.5 tsf), granular cohesionless, previously disturbed soils",
      "1 : 1 (45° from horizontal)",
    ],
    [
      "Type C",
      "Granular soils (gravel, sand, loamy sand), submerged soil, soil with seeping water",
      "1.5 : 1 (34° from horizontal)",
    ],
    [
      "Layered (C-over-A/B)",
      "Type C overlying stable soil",
      "1.5 : 1 (use Type C for entire excavation)",
    ],
  ],
  footer:
    "Per OSHA 29 CFR 1926, Subpart P, Appendix B. Excavations ≥ 5 ft deep require a protective system unless made entirely in stable rock. Competent Person must classify soil daily.",
});

const REF_HAZARDOUS_ENERGY_TYPES = buildDataContainer({
  title: "Hazardous Energy Sources — Lockout/Tagout Isolation",
  icon: "⚡",
  columns: ["Energy Type", "Examples", "Isolation / Verification"],
  data: [
    [
      "Electrical",
      "Live circuits, capacitors, batteries, control panels",
      "Open disconnect; lock device; verify zero voltage with calibrated meter",
    ],
    [
      "Mechanical",
      "Rotating shafts, flywheels, conveyor drives, springs",
      "Block / pin moving parts; release stored spring energy",
    ],
    [
      "Hydraulic",
      "Pressurized fluid lines, accumulators, presses",
      "Bleed lines to atmosphere; lock isolation valves; verify 0 psi",
    ],
    [
      "Pneumatic",
      "Compressed air systems, pneumatic tools, accumulators",
      "Close supply valve; bleed downstream; lock valve",
    ],
    [
      "Chemical",
      "Process lines, reactor vessels, piping with hazardous contents",
      "Double block-and-bleed; line break permits; flush &amp; purge",
    ],
    [
      "Thermal",
      "Steam lines, hot surfaces, cryogenic systems",
      "Allow cool-down or warm-up; verify safe touch temperature",
    ],
    [
      "Gravitational",
      "Suspended loads, raised platforms, elevators",
      "Lower load; install mechanical blocks or cribbing",
    ],
  ],
  footer:
    "Per OSHA 29 CFR 1910.147 and 1926.417. ALL energy sources must be identified, isolated, locked, and verified BEFORE work begins. Each authorized worker applies their own lock.",
});

const REF_INCIDENT_RESPONSE_TIMELINE = buildDataContainer({
  title: "Incident Response & Investigation Timeline",
  icon: "◷",
  columns: ["Phase", "Time Window", "Required Actions"],
  data: [
    [
      "Immediate Response",
      "0 – 4 hours",
      "Secure scene; first aid / 911; notify Safety Officer &amp; PM; preserve evidence; D&amp;A test if required",
    ],
    [
      "Initial Investigation",
      "Within 24 hours",
      "Photograph scene; interview witnesses separately; collect physical evidence; review training/inspection records",
    ],
    [
      "Root-Cause Analysis",
      "Within 72 hours",
      "5-Why method to system / program level; complete MHC Incident Investigation Report (Form 49-A)",
    ],
    [
      "Corrective Actions",
      "Within 7 days",
      "Assign owner &amp; deadline for each root cause; verify completion before close-out",
    ],
    [
      "Lessons Learned",
      "Next safety meeting",
      "Communicate findings &amp; corrective actions to all affected crews; update JHA / training as needed",
    ],
  ],
  footer:
    "Per MISH 49 and OSHA 29 CFR 1926.20. Investigation is non-punitive — focus is on system failures, not blame. All incidents, near-misses, and property damage events require investigation.",
});

// ── Section-specific post-processing ─────────────────────────────────────────

/**
 * Inject a 3-Hour Rule callout box.  Applied to MISH 01, MISH 02, and MISH 38.
 *
 * MISH 02 — anchors after the paragraph that explicitly mentions "3 hours to
 *            provide a sample / collection".
 * MISH 01 — that detail lives in MISH 02; anchor after the Drug Free Workplace
 *            paragraph that references "post accident/incident … testing" to
 *            plant a forward-reference callout.
 * MISH 38 — Commercial Drivers Drug and Alcohol Program; anchor after the
 *            random testing paragraph to enforce the 3-hour compliance window
 *            for DOT-regulated commercial driver testing.
 *
 * @param {string} html         — section body HTML
 * @param {number} sectionNumber — 2 (Injury-Free), 6 (D&A Policy), or 7 (CDL D&A)
 */
function injectThreeHourCallout(html, sectionNumber) {
  // ── Generic callout used for MISH 01, MISH 38 (and as MISH 02 last-resort fallback) ──
  const callout = [
    `<div class="three-hour-rule-box no-break">`,
    `<div class="thr-header"><span class="thr-icon">&#9888;</span>&nbsp;3-HOUR RULE &#x2014; TIME-CRITICAL FIELD ACTION</div>`,
    `<div class="thr-body">`,
    `<p class="thr-warning">FAILURE TO COMPLY WITHIN THE 3-HOUR WINDOW = DEEMED POSITIVE</p>`,
    `<p class="thr-detail">Upon notification, the employee must report to the designated collection facility `,
    `within 3 hours. Failure to appear, refusal, or no-show at the collection site constitutes an `,
    `automatic positive result and is subject to full disciplinary action per Section 2.6.</p>`,
    `</div></div>`,
  ].join("");

  if (sectionNumber === 6) {
    // PRECISION OVERRIDE 2 — Visual Field Triggers (Drug & Alcohol Policy)
    // Legacy Word body for the drug-program section may contain raw <table>
    // wrappers around each 3-HOUR RULE notice.  Replace both tables with
    // proper .three-hour-rule-box callout divs.
    let replaced = false;

    html = html.replaceAll(
      /<table><tr><td>(?:<p><strong>3-HOUR RULE[^<]*<\/strong><\/p>[\s\S]*?)<\/td><\/tr><\/table>/gi,
      (match) => {
        replaced = true;
        const isSupervisor = /SUPERVISOR ENFORCEMENT REMINDER/i.test(match);

        if (isSupervisor) {
          return [
            `<div class="three-hour-rule-box no-break">`,
            `<div class="thr-header"><span class="thr-icon">&#9888;</span>&nbsp;3-HOUR RULE &#x2014; SUPERVISOR ENFORCEMENT REMINDER</div>`,
            `<div class="thr-body">`,
            `<p class="thr-detail">Testing <strong>MUST</strong> be completed within 3 HOURS of employee notification.</p>`,
            `<p class="thr-warning">IF TESTING IS NOT COMPLETE WITHIN THE 3-HOUR WINDOW = DEEMED POSITIVE</p>`,
            `<p class="thr-detail">Supervisors: Document the exact notification time. Escort the employee to the collection facility. Do not allow the window to expire.</p>`,
            `</div></div>`,
          ].join("");
        } else {
          return [
            `<div class="three-hour-rule-box no-break">`,
            `<div class="thr-header"><span class="thr-icon">&#9888;</span>&nbsp;3-HOUR RULE &#x2014; TIME-CRITICAL FIELD ACTION</div>`,
            `<div class="thr-body">`,
            `<p class="thr-detail">Upon notification, the employee has exactly <strong>3 HOURS</strong> to report to the designated testing facility and provide a sample.</p>`,
            `<p class="thr-warning">FAILURE TO COMPLY WITHIN THE 3-HOUR WINDOW = DEEMED POSITIVE</p>`,
            `<p class="thr-detail">Failure to appear at the testing location within 3 hours shall be treated as a positive test result &mdash; subject to immediate disciplinary action (&sect;2.6).</p>`,
            `</div></div>`,
          ].join("");
        }
      },
    );

    // If table-based replacement succeeded, skip paragraph-based injection
    if (replaced) return html;

    // Fallback: inject after the 3-hours/sample paragraph if table was not found
    const result = html.replace(
      /(<p>[^<]*3[\s-]*hours?[^<]*(sample|provide|collection)[^<]*<\/p>)/i,
      `$1${callout}`,
    );
    if (result !== html) return result;
  }

  if (sectionNumber === 7) {
    // MISH 07 — Drug & Alcohol Field Operations (Commercial Drivers)
    // Anchor after the random testing paragraph or any testing-related paragraph
    let result = html.replace(
      /(<p>[^<]*random[^<]*test[^<]*<\/p>)/i,
      `$1${callout}`,
    );
    if (result !== html) return result;

    // Fallback: anchor after post-accident testing paragraph
    result = html.replace(
      /(<p>[^<]*post.accident[^<]*test[^<]*<\/p>)/i,
      `$1${callout}`,
    );
    if (result !== html) return result;

    // Last-resort: insert before the first sec-subhead
    return html.replace(/(<h4 class="sec-subhead">)/, `${callout}$1`);
  }

  // MISH 02 (Injury-Free) final fallback: anchor after the Drug Free Workplace paragraph
  const result = html.replace(
    /(<p>[^<]*Drug Free Workplace[^<]*testing[^<]*<\/p>)/i,
    `$1${callout}`,
  );
  // Last-resort: append before the first sec-subhead (section is short — better than nothing)
  if (result === html) {
    return html.replace(/(<h4 class="sec-subhead">)/, `${callout}$1`);
  }
  return result;
}

/**
 * Inject the hardcoded Addendum A substance threshold cutoff table for MISH 02.
 * The table data is per DOT 49 CFR Part 40 / SAMHSA HHS Mandatory Guidelines.
 */
function injectAddendumATable(html) {
  const table = [
    `<div class="addendum-section page-break-before">`,
    `<h4 class="sec-subhead">ADDENDUM &#x201C;A&#x201D; &#x2014; SUBSTANCE THRESHOLD CUTOFF LEVELS</h4>`,
    `<p class="addendum-note">Per U.S. Department of Transportation (DOT) 49 CFR Part 40 and SAMHSA/HHS `,
    `Mandatory Guidelines for Federal Workplace Drug Testing Programs.</p>`,
    `<table class="threshold-table">`,
    `<thead><tr>`,
    `<th>Substance / Drug Class</th>`,
    `<th>Initial Screen Cutoff (EMIT)</th>`,
    `<th>Confirmation Cutoff (GC/MS)</th>`,
    `<th>Disciplinary Action</th>`,
    `</tr></thead><tbody>`,
    `<tr><td>Marijuana Metabolites (THC-COOH)</td><td>50 ng/mL</td><td>15 ng/mL</td><td>Per §2.6</td></tr>`,
    `<tr><td>Cocaine Metabolites (Benzoylecgonine)</td><td>150 ng/mL</td><td>100 ng/mL</td><td>Per §2.6</td></tr>`,
    `<tr><td>Opioids &#x2014; Codeine / Morphine</td><td>2,000 ng/mL</td><td>2,000 ng/mL</td><td>Per §2.6</td></tr>`,
    `<tr><td>Opioids &#x2014; Oxycodone / Oxymorphone</td><td>100 ng/mL</td><td>100 ng/mL</td><td>Per §2.6</td></tr>`,
    `<tr><td>Opioids &#x2014; Hydrocodone / Hydromorphone</td><td>300 ng/mL</td><td>100 ng/mL</td><td>Per §2.6</td></tr>`,
    `<tr class="alert-row"><td><strong>6-Acetylmorphine (Heroin marker)</strong></td>`,
    `<td class="alert-cell"><strong>10 ng/mL</strong></td>`,
    `<td class="alert-cell"><strong>10 ng/mL</strong></td>`,
    `<td class="alert-cell"><strong>Immediate Termination</strong></td></tr>`,
    `<tr><td>Phencyclidine (PCP)</td><td>25 ng/mL</td><td>25 ng/mL</td><td>Per §2.6</td></tr>`,
    `<tr><td>Amphetamines / Methamphetamine</td><td>500 ng/mL</td><td>250 ng/mL</td><td>Per §2.6</td></tr>`,
    `<tr><td>MDMA / MDA (Ecstasy)</td><td>500 ng/mL</td><td>250 ng/mL</td><td>Per §2.6</td></tr>`,
    `<tr class="alert-row"><td><strong>Alcohol (BAC)</strong></td>`,
    `<td class="alert-cell"><strong>0.02%</strong> (send home)</td>`,
    `<td class="alert-cell"><strong>0.04%</strong> (suspension)</td>`,
    `<td>§2.4.4: 1st infraction home; 2nd suspension</td></tr>`,
    `</tbody></table>`,
    `<p class="addendum-note"><strong>Note:</strong> All positive initial screens above listed cutoffs are `,
    `confirmed by GC/MS analysis. A confirmed positive triggers disciplinary action per Section 2.6. `,
    `Zero tolerance applies to 6-AM (heroin metabolite).</p>`,
    `</div>`,
  ].join("");

  // Insert before the ADDENDUM B heading if present; else append
  if (/ADDENDUM[^<]{0,10}B/i.test(html)) {
    return html.replace(
      /(<h4[^>]*>[^<]*ADDENDUM[^<]*B[^<]*<\/h4>)/i,
      `${table}$1`,
    );
  }
  return html + table;
}

/**
 * Inject page-break + form header badges for FORM 02-A (Applicant Consent)
 * and FORM 02-B (Return-to-Work) within the section 02 body HTML.
 *
 * PRECISION OVERRIDE 3 — Form & Signature Isolation: forces each form to
 * start on a new page and replaces the plain paragraph title with a styled
 * dark-green badge header.
 *
 * The Word-extracted body uses <p><strong>FORM 02-X — …</strong></p> for
 * form titles (not <h4> elements), so regexes target that pattern.
 */
function injectFormPageBreaks(html) {
  const makeHeader = (formId, formName) =>
    [
      `<div class="page-break-before"></div>`,
      `<div class="form-standalone-header">`,
      `<span class="form-badge">FORM ${formId}</span>`,
      `<span class="form-badge-title">${formName}</span>`,
      `</div>`,
    ].join("");

  // FORM 02-A — replace the <p><strong>FORM 02-A…</strong></p> paragraph
  html = html.replace(
    /<p><strong>FORM\s+02-A[^<]*<\/strong><\/p>/i,
    makeHeader("02-A", "Applicant Consent to Drug &amp; Alcohol Testing"),
  );

  // FORM 02-B — replace the <p><strong>FORM 02-B…</strong></p> paragraph
  html = html.replace(
    /<p><strong>FORM\s+02-B[^<]*<\/strong><\/p>/i,
    makeHeader("02-B", "Return-to-Work Agreement"),
  );

  return html;
}

/**
 * Replace long underscore sequences with styled non-breaking signature lines.
 */
function injectSignatureLines(html) {
  return html.replaceAll(/_{8,}/g, '<span class="sig-line-underline"></span>');
}

/**
 * Section-specific reference corrections to enforce current 1-50 WBS mapping.
 */
function applySectionReferenceFixes(html, sectionNumber) {
  let out = html;

  if (sectionNumber === 4) {
    out = out
      .replaceAll(/Attachment\s+MISH\s*4-A/gi, "Attachment MISH 04-A")
      .replaceAll(/FORM\s+4-A/gi, "FORM 04-A");
  }

  if (sectionNumber === 9) {
    out = out.replaceAll(
      /Fall\s+Protection([^<]{0,120}?)MISH\s*11/gi,
      "Fall Protection$1MISH 21",
    );
    out = out.replaceAll(
      /MISH\s*11\s*\(\s*Fall\s*Protection\s*\)/gi,
      "MISH 21 (Fall Protection)",
    );
  }

  if (sectionNumber === 10) {
    out = out
      .replaceAll(/\bMISH\s*9-A\b/gi, "MISH 10-A")
      .replaceAll(/\bMISH\s*9-B\b/gi, "MISH 10-B")
      .replaceAll(/\b9-A\b/g, "10-A")
      .replaceAll(/\b9-B\b/g, "10-B");
  }

  return out;
}

/**
 * PRECISION OVERRIDE 3 — Signature Table Isolation (MISH 02)
 *
 * The Word-extracted body has four separate single-row <table> elements for
 * each signature field in FORM 02-A and FORM 02-B.  Consolidate each group
 * of four into a single bordered .signature-table so:
 *  - All fields are perfectly column-aligned
 *  - The block cannot break across pages (break-inside: avoid)
 *  - Labels use the MHC green-tint background; fill cells stay white
 */
function injectSignatureTables(html) {
  // ── FORM 02-A ─────────────────────────────────────────────────────────────
  const form02aBlock = [
    `<table><tr><td><p><strong>Applicant Name (Print):</strong></p></td><td></td></tr></table>`,
    `<table><tr><td><p><strong>Applicant Signature:</strong></p></td><td></td></tr></table>`,
    `<table><tr><td><p><strong>Witness Signature:</strong></p></td><td></td>`,
    `<td><p><strong>Today's Date:</strong></p></td><td></td></tr></table>`,
    `<table><tr><td><p><strong>Applicant SSN (Last 4):</strong></p></td><td></td>`,
    `<td><p><strong>Employer:</strong></p></td><td></td></tr></table>`,
  ].join("");

  const form02aTable = [
    `<table class="signature-table no-break">`,
    `<tr><td class="sig-label">Applicant Name (Print):</td><td class="sig-fill"></td></tr>`,
    `<tr><td class="sig-label">Applicant Signature:</td><td class="sig-fill"></td></tr>`,
    `<tr>`,
    `<td class="sig-label">Witness Signature:</td><td class="sig-fill"></td>`,
    `<td class="sig-label">Today&#8217;s Date:</td><td class="sig-fill sig-narrow"></td>`,
    `</tr>`,
    `<tr>`,
    `<td class="sig-label">Applicant SSN (Last 4):</td><td class="sig-fill"></td>`,
    `<td class="sig-label">Employer:</td><td class="sig-fill"></td>`,
    `</tr>`,
    `</table>`,
  ].join("");

  html = html.replace(form02aBlock, form02aTable);

  // ── FORM 02-B ─────────────────────────────────────────────────────────────
  const form02bBlock = [
    `<table><tr><td><p><strong>Employee Name (Print):</strong></p></td><td></td></tr></table>`,
    `<table><tr><td><p><strong>Employee Signature:</strong></p></td><td></td></tr></table>`,
    `<table><tr><td><p><strong>Supervisor Signature:</strong></p></td><td></td>`,
    `<td><p><strong>Today's Date:</strong></p></td><td></td></tr></table>`,
    `<table><tr><td><p><strong>Witness Signature:</strong></p></td><td></td>`,
    `<td><p><strong>HR Representative:</strong></p></td><td></td></tr></table>`,
  ].join("");

  const form02bTable = [
    `<table class="signature-table no-break">`,
    `<tr><td class="sig-label">Employee Name (Print):</td><td class="sig-fill"></td></tr>`,
    `<tr><td class="sig-label">Employee Signature:</td><td class="sig-fill"></td></tr>`,
    `<tr>`,
    `<td class="sig-label">Supervisor Signature:</td><td class="sig-fill"></td>`,
    `<td class="sig-label">Today&#8217;s Date:</td><td class="sig-fill sig-narrow"></td>`,
    `</tr>`,
    `<tr>`,
    `<td class="sig-label">Witness Signature:</td><td class="sig-fill"></td>`,
    `<td class="sig-label">HR Representative:</td><td class="sig-fill"></td>`,
    `</tr>`,
    `</table>`,
  ].join("");

  return html.replace(form02bBlock, form02bTable);
}

// ─────────────────────────────────────────────────────────────────────────────
// MISH 03 ── Zero-Tolerance Violations Box
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Wrap the Master Safety Rules bullet list in a 1.5pt bordered zero-tolerance
 * box.  Signals to bonding agencies (Travelers, etc.) that MHC has explicit,
 * documented zero-tolerance policy for variable human systems.
 *
 * Anchor: the paragraph ending "… may result in immediate dismissal."
 * The <ul class="sec-list"> that follows that paragraph is wrapped.
 */
function injectZeroToleranceBox(html) {
  // Matches: dismissal paragraph + the immediately following sec-list
  return html.replace(
    /(<p>[^<]*(?:immediate dismissal|result in dismissal)[^<]*<\/p>\n?)(<ul class="sec-list">[\s\S]*?<\/ul>)/i,
    (_, introPara, list) => {
      const boxHtml = [
        `<div class="zero-tolerance-box">`,
        `<div class="zero-tolerance-header">`,
        `<span class="zero-tolerance-icon">&#9888;</span>`,
        `&nbsp;MASTER SAFETY RULES &#x2014; ZERO TOLERANCE VIOLATIONS`,
        `</div>`,
        `<p class="zero-tolerance-intro">`,
        `The following violations are subject to immediate dismissal. `,
        `This list is not all-inclusive. MHC reserves the right to terminate at will `,
        `based on the severity of the hazard created by the behavior.`,
        `</p>`,
        list,
        `</div>`,
      ].join("");
      return introPara + boxHtml;
    },
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MISH 04 ── Orientation Form 04-A Sign-Off Sheet
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Replace the raw "ORIENTATION CHECKLIST SIGN-OFF SHEET" section with a
 * clean, bordered multi-row sign-off table on its own page break.
 *
 * The source PDF has: NAME / SIGNATURE / DATE / COMPANY / SS # LAST 4
 * as separate lines after the heading.  We replace all of them with a
 * structured 12-row table providing space for 12 employee sign-offs per day.
 */
function injectOrientationForm(html) {
  // Build the 12-row sign-in table
  const rows = Array.from(
    { length: 12 },
    () => `
    <tr>
      <td class="cell-value" style="width:25%">&nbsp;</td>
      <td class="cell-value" style="width:30%">&nbsp;</td>
      <td class="cell-value" style="width:15%">&nbsp;</td>
      <td class="cell-value" style="width:20%">&nbsp;</td>
      <td class="cell-value" style="width:10%">&nbsp;</td>
    </tr>
  `,
  ).join("");

  const form = [
    `<div class="page-break-before"></div>`,
    `<div class="form-standalone-header">`,
    `<span class="form-badge">FORM 04-A</span>`,
    `<span class="form-badge-title">Safety Orientation Record</span>`,
    `</div>`,
    `<p class="form04a-header">FORM 04-A: SAFETY ORIENTATION RECORD</p>`,
    `<p style="font-size:8.5pt;margin:0 0 8pt;margin-left:0;color:#555;">`,
    `Complete one row per employee before they begin work activities. `,
    `This form satisfies the documentation requirement of MISH 04 § 2.2.2.`,
    `</p>`,
    `<table class="orientation-record-table">`,
    `<thead><tr>`,
    `<th style="width:25%">Employee Name (Print)</th>`,
    `<th style="width:30%">Signature</th>`,
    `<th style="width:15%">Date</th>`,
    `<th style="width:20%">Company</th>`,
    `<th style="width:10%">SSN Last 4</th>`,
    `</tr></thead>`,
    `<tbody>`,
    rows,
    `</tbody>`,
    `</table>`,
  ].join("");

  // Replace from the heading to end of section-body but STOP at the qr-footer div
  // so that the QR footer block and closing </body></html> are preserved.
  const replaced = html.replace(
    /(<h4[^>]*>[^<]*ORIENTATION CHECKLIST SIGN.OFF SHEET[^<]*<\/h4>)[\s\S]*?(?=<div class="qr-footer"|<\/body>)/i,
    form,
  );
  // Fallback: the heading might be a paragraph
  if (replaced === html) {
    return html.replace(
      /(<p>[^<]*ORIENTATION CHECKLIST SIGN.OFF SHEET[^<]*<\/p>)[\s\S]*?(?=<div class="qr-footer"|<\/body>)/i,
      form,
    );
  }
  return replaced;
}

// ─────────────────────────────────────────────────────────────────────────────
// MISH 05 ── Pre-Task Plan Form (bordered grid + injured checkboxes)
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Replace the raw "MH CONSTRUCTION PRE-TASK PLAN" form block with a clean,
 * bordered HTML grid.  Key improvements:
 *   - Metadata fields (Date, Supervisor, Location, Scope) in a 2-column grid
 *   - Hazard checklist with proper checkbox columns
 *   - 24-row sign-in table with "Were you injured yesterday? ☐ Yes  ☐ No"
 *     in a dedicated right column so the Safety Coordinator can scan in 2 sec
 */
function injectPtpForm(html) {
  const HAZARDS = [
    "Falls over 6 ft (OR) / 10 ft (WA)",
    "Excavations / Trenching",
    "Confined Space Entry",
    "Hoisting and Rigging",
    "Welding / Cutting",
    "Hazardous Material (SDS Available)",
    "Ladders",
    "Electrical Hazard",
    "Heat / Cold Stress",
    "Other (describe below)",
  ];

  const hazardRows = HAZARDS.map(
    (h) =>
      `<tr>` +
      `<td class="ptp-cb">&#9744;</td>` +
      `<td>${escapeHtml(h)}</td>` +
      `<td style="width:55%"></td>` +
      `</tr>`,
  ).join("");

  // 24 employee rows; two columns per rendered row (12 rows × 2 cols = 24 slots)
  const injuredRows = Array.from(
    { length: 12 },
    () =>
      `<tr>` +
      `<td style="width:30%">&nbsp;</td>` +
      `<td class="ptp-yn">&#9744;&nbsp;Yes &nbsp; &#9744;&nbsp;No</td>` +
      `<td style="width:30%">&nbsp;</td>` +
      `<td class="ptp-yn">&#9744;&nbsp;Yes &nbsp; &#9744;&nbsp;No</td>` +
      `</tr>`,
  ).join("");

  const ptpHtml = [
    `<div class="page-break-before"></div>`,
    `<div class="form-standalone-header">`,
    `<span class="form-badge">FORM 05-B</span>`,
    `<span class="form-badge-title">Pre-Task Plan (PTP)</span>`,
    `</div>`,
    `<div class="ptp-form">`,
    `<div class="ptp-form-header">MH CONSTRUCTION &#x2014; PRE-TASK PLAN (PTP)</div>`,

    // Metadata row
    `<table class="ptp-meta-table">`,
    `<tr>`,
    `<td class="ptp-label">Date</td><td class="ptp-value"></td>`,
    `<td class="ptp-label">Supervisor</td><td class="ptp-value"></td>`,
    `</tr>`,
    `<tr>`,
    `<td class="ptp-label">Location</td><td class="ptp-value"></td>`,
    `<td class="ptp-label">Project No.</td><td class="ptp-value"></td>`,
    `</tr>`,
    `<tr>`,
    `<td class="ptp-label">Scope of Work</td>`,
    `<td class="ptp-value" colspan="3" style="height:36pt;vertical-align:top;padding-top:4pt;"></td>`,
    `</tr>`,
    `</table>`,

    // Hazards section
    `<div class="ptp-section-label">Hazard Identification &#x2014; Check all that apply and describe controls</div>`,
    `<table class="ptp-hazards-table">`,
    `<thead><tr>`,
    `<th style="width:28pt">&#10003;</th>`,
    `<th style="width:35%">Hazard Type</th>`,
    `<th>Controls / Corrective Measures</th>`,
    `</tr></thead>`,
    `<tbody>${hazardRows}</tbody>`,
    `</table>`,

    // PPE row
    `<div class="ptp-section-label">Minimum PPE Required</div>`,
    `<table class="ptp-meta-table">`,
    `<tr>`,
    [
      "Hard Hat",
      "Safety Glasses",
      "Fall Harness + Lanyard",
      "Face Shield",
      "Hi-Vis Vest",
      "Hearing Protection",
      "Other",
    ]
      .map(
        (p) =>
          `<td style="text-align:center;padding:4pt 6pt;border:0.75pt solid #aaa;">&#9744; ${escapeHtml(p)}</td>`,
      )
      .join(""),
    `</tr>`,
    `</table>`,

    // Employee sign-in + injured
    `<div class="ptp-section-label">Employee Sign-In &mdash; Were You Injured Yesterday?</div>`,
    `<table class="ptp-injured-table">`,
    `<thead><tr>`,
    `<th style="width:30%">Employee Name (Print / Sign)</th>`,
    `<th style="width:60pt;text-align:center;">Injured Yesterday?</th>`,
    `<th style="width:30%">Employee Name (Print / Sign)</th>`,
    `<th style="width:60pt;text-align:center;">Injured Yesterday?</th>`,
    `</tr></thead>`,
    `<tbody>${injuredRows}</tbody>`,
    `</table>`,

    `</div>`, // .ptp-form
  ].join("");

  // Anchor: the ALL-CAPS heading "MH CONSTRUCTION PRE-TASK PLAN" becomes a sec-subhead
  // Stop before the qr-footer div to preserve closing structure.
  const replaced = html.replace(
    /(<h4[^>]*>[^<]*MH CONSTRUCTION PRE.TASK PLAN[^<]*<\/h4>)[\s\S]*?(?=<div class="qr-footer"|<\/body>)/i,
    ptpHtml,
  );
  if (replaced !== html) return replaced;

  // Fallback: look for it as a paragraph
  return html.replace(
    /(<p>[^<]*MH CONSTRUCTION PRE.TASK PLAN[^<]*<\/p>)[\s\S]*?(?=<div class="qr-footer"|<\/body>)/i,
    ptpHtml,
  );
}

/**
 * Strip the boilerplate metadata block that leaks into every section body
 * from the master DOCX header table:
 *   • Orphan revision-table fragment ("<p>3.0</p></td><td>April 2026…</table>")
 *   • Inherited signature/approval table (President / Safety Officer / …)
 *   • Flattened "Title / Number / Mish NN / Revision / Approved By / Name Date /
 *     Effective Date / Page / 1 of N" stack
 * The section-header-card on page 1 already shows this metadata, so the leaked
 * copy is pure noise that visually breaks the first page of many sections.
 *
 * SAFETY: anchored on the unique leak signature `<p>3.0</p></td>` (orphan
 * revision-table cell that ALWAYS precedes the leak). If the signature is not
 * present, the regex no-ops — guaranteeing real body content is never stripped
 * even if a future section legitimately contains a `<p>1 of N</p>` paragraph.
 */
function stripLeakedMetadata(html) {
  return html.replace(/<p>\d+\.\d+<\/p><\/td>[\s\S]*?<p>1 of \d+<\/p>/, "");
}

/**
 * Tag numbered paragraphs and sec-num-rows with depth-based classes so the
 * print stylesheet can render `X.0` as a coloured section banner and indent
 * each deeper level (`X.Y`, `X.Y.Z`, `X.Y.Z.W`) by an additional 0.5" lane.
 *
 * Classes added:
 *   sec-h sec-h-0  →  top-level header (e.g. 1.0 PURPOSE)
 *   sec-h sec-h-1  →  first sub (e.g. 5.1)
 *   sec-h sec-h-2  →  second sub (e.g. 5.1.1)
 *   sec-h sec-h-3  →  third sub  (e.g. 5.3.1.1)
 */
function tagNumberedParagraphs(html) {
  const levelFor = (num) => {
    const segs = num.split(".");
    if (segs.length === 2 && segs[1] === "0") return 0;
    return Math.min(segs.length - 1, 3);
  };

  // Form 1 — Word-HTML <p><strong>N[.N...] </strong>...
  html = html.replaceAll(
    /<p>(\s*<strong>\s*(\d+(?:\.\d+)+)\s*<\/strong>)/g,
    (_m, inner, num) => `<p class="sec-h sec-h-${levelFor(num)}">${inner}`,
  );

  // Form 2 — text-rendered <div class="sec-num-row"><span class="sec-num">N[.N...]</span>
  html = html.replaceAll(
    /<div class="sec-num-row"><span class="sec-num">(\d+(?:\.\d+)+)<\/span>/g,
    (_m, num) =>
      `<div class="sec-num-row sec-h sec-h-${levelFor(num)}"><span class="sec-num">${num}</span>`,
  );

  // Form 3 — promoted subhead <h4 class="sec-subhead">N.N TITLE</h4>
  // Convert level-0 (X.0) headings to a banner <p>; deeper levels get tagged
  // in place so they pick up indent rules without losing their h4 semantics.
  html = html.replaceAll(
    /<h4 class="sec-subhead">\s*(\d+(?:\.\d+)+)([\s\u00a0]+[^<]*)<\/h4>/g,
    (_m, num, rest) => {
      const lvl = levelFor(num);
      const cleaned = rest.replace(/^[\s\u00a0]+/, " ");
      if (lvl === 0) {
        return `<p class="sec-h sec-h-0"><strong>${num} </strong>${cleaned.trimStart()}</p>`;
      }
      return `<h4 class="sec-subhead sec-h sec-h-${lvl}"><strong>${num}</strong>${cleaned}</h4>`;
    },
  );

  return html;
}

/**
 * Apply all section-specific post-processing rules based on section number.
 */
function postProcessSectionHtml(html, sectionNumber) {
  html = stripLeakedMetadata(html);
  html = applySectionReferenceFixes(html, sectionNumber);
  // 3-Hour Rule callouts — drug & alcohol testing window:
  //   • MISH 02 (Injury-Free Workplace) — forward reference
  //   • MISH 06 (Drug & Alcohol Policy & Testing) — primary anchor
  //   • MISH 07 (Drug & Alcohol Field Operations / CDL) — DOT enforcement
  if (sectionNumber === 2 || sectionNumber === 6 || sectionNumber === 7) {
    html = injectThreeHourCallout(html, sectionNumber);
  }
  // Drug-program tables/forms now live in MISH 06 (was MISH 02 in legacy v2).
  if (sectionNumber === 6) {
    html = injectAddendumATable(html);
    html = injectFormPageBreaks(html);
    html = injectSignatureTables(html); // consolidate individual sig tables → unified bordered table
    html = injectSignatureLines(html);
  }
  if (sectionNumber === 3) {
    html = injectZeroToleranceBox(html);
  }
  if (sectionNumber === 4) {
    html = injectOrientationForm(html);
    html = injectSignatureLines(html);
  }
  // Pre-Task Plan now lives in MISH 09 (Pre-Job Safety Plan); was MISH 05.
  if (sectionNumber === 9) {
    html = injectPtpForm(html);
    html = injectSignatureLines(html);
  }
  if (
    sectionNumber === 11 ||
    sectionNumber === 13 ||
    sectionNumber === 17 ||
    sectionNumber === 21
  ) {
    html = injectSignatureLines(html);
  }
  // Canonical reference data tables — anchored after 1.0 PURPOSE row so the
  // quick-reference card is visible in the first body screenful of the section.
  if (sectionNumber === 7) {
    html = injectAfterPurpose(html, REF_DOT_DRUG_TEST_TYPES);
  }
  if (sectionNumber === 12) {
    html = injectAfterPurpose(html, REF_NOISE_EXPOSURE);
  }
  if (sectionNumber === 13) {
    html = injectAfterPurpose(html, REF_GHS_PICTOGRAMS);
  }
  if (sectionNumber === 15) {
    html = injectAfterPurpose(html, REF_HEAT_INDEX_TIERS);
  }
  if (sectionNumber === 16) {
    html = injectAfterPurpose(html, REF_RESPIRATOR_APF);
  }
  if (sectionNumber === 20) {
    html = injectAfterPurpose(html, REF_SAFETY_SIGN_COLORS);
  }
  if (sectionNumber === 21) {
    html = injectAfterPurpose(html, REF_FALL_TRIGGER_HEIGHTS);
  }
  if (sectionNumber === 22) {
    html = injectAfterPurpose(html, REF_SCAFFOLD_DUTY_CLASSES);
  }
  if (sectionNumber === 23) {
    html = injectAfterPurpose(html, REF_LADDER_DUTY_RATINGS);
  }
  if (sectionNumber === 25) {
    html = injectAfterPurpose(html, REF_OSHA_SOIL_CLASSIFICATION);
  }
  if (sectionNumber === 26) {
    html = injectAfterPurpose(html, REF_CONFINED_SPACE_ATMOSPHERE);
  }
  if (sectionNumber === 27) {
    html = injectAfterPurpose(html, REF_HAZARDOUS_ENERGY_TYPES);
  }
  if (sectionNumber === 28) {
    html = injectAfterPurpose(html, REF_ELECTRICAL_APPROACH);
  }
  if (sectionNumber === 29) {
    html = injectAfterPurpose(html, REF_WELDING_FILTER_SHADES);
  }
  if (sectionNumber === 30) {
    html = injectAfterPurpose(html, REF_FLAMMABLE_CLASSIFICATION);
  }
  if (sectionNumber === 31) {
    html = injectAfterPurpose(html, REF_FIRE_EXTINGUISHER_CLASSES);
  }
  if (sectionNumber === 37) {
    html = injectAfterPurpose(html, REF_AERIAL_LIFT_CLEARANCE);
  }
  if (sectionNumber === 49) {
    html = injectAfterPurpose(html, REF_INCIDENT_RESPONSE_TIMELINE);
  }
  // Tag numbered paragraphs LAST so injection regexes (which match plain
  // <p><strong>1.0…</strong>…</p>) still find their anchors first.
  html = tagNumberedParagraphs(html);
  return html;
}

/**
 * Insert a block of HTML immediately after the rendered "1.0 PURPOSE" row.
 * Supports both renderings:
 *   • Text-extracted bodies → <div class="sec-num-row"><span class="sec-num">1.0</span>…</div>
 *   • Word HTML bodies      → <p><strong>1.0 </strong>PURPOSE</p>… (with following content)
 * Falls back to no-op if no anchor is found.
 */
function injectAfterPurpose(html, blockHtml) {
  // Form 1 — text-rendered sec-num-row
  const purposeRowRx =
    /(<div class="sec-num-row"><span class="sec-num">1\.0<\/span>[\s\S]*?<\/div>)/;
  const m1 = purposeRowRx.exec(html);
  if (m1) return html.replace(purposeRowRx, `${m1[1]}\n${blockHtml}`);

  // Form 2 — Word HTML <p>...1.0...PURPOSE...</p>
  const purposePRx =
    /(<p>(?:<strong>)?\s*1\.0[\s\S]{0,40}?PURPOSE[\s\S]{0,200}?<\/p>)/i;
  const m2 = purposePRx.exec(html);
  if (m2) return html.replace(purposePRx, `${m2[1]}\n${blockHtml}`);

  // Form 3 — last-resort: insert before the first sec-subhead
  const subheadRx = /(<h4 class="sec-subhead">)/;
  if (subheadRx.test(html)) return html.replace(subheadRx, `${blockHtml}$1`);

  return html;
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log("🏗  MH Construction — Document Generator");
  console.log("==========================================");

  try {
    switch (template) {
      case "all":
        await generateCover();
        await generateSpine();
        await generateLetterhead();
        await generateTabs();
        await generateToc();
        await generateSections();
        await generateFormCovers();
        break;
      case "cover":
        await generateCover();
        break;
      case "spine":
        await generateSpine();
        break;
      case "letterhead":
        await generateLetterhead();
        break;
      case "form-02-c":
      case "form02c":
        await generateFillableFormById("FORM 02-C");
        break;
      case "form-fillable": {
        if (!formArg) {
          console.error(
            "❌  --form <id|slug> required when --template form-fillable",
          );
          process.exit(1);
        }
        await generateFillableFormById(formArg);
        break;
      }
      case "form-fillables":
        await generateAllFillableForms();
        break;
      case "form-package": {
        if (!formArg) {
          console.error(
            "❌  --form <id|slug> required when --template form-package",
          );
          process.exit(1);
        }
        await generateFormPackageById(formArg);
        break;
      }
      case "form-packages":
        await generateAllFormPackages();
        break;
      case "form-publish":
        await generateAllFormPackages();
        await publishFormPackages();
        break;
      case "tabs":
        await generateTabs();
        break;
      case "toc":
        await generateToc();
        break;
      case "website-pages":
      case "website-page-inventory":
        await generateWebsitePagesInventory();
        break;
      case "website-image-needs":
        await generateWebsiteImageNeeds();
        break;
      case "guardrails-check":
        await runGuardrailsCheck();
        break;
      case "guardrails-typography-check":
        await runTypographyGuardrailsCheck();
        break;
      case "spine-guardrails":
        await runSpineGuardrailsCheck();
        break;
      case "sections":
        await generateSections();
        break;
      case "forms":
        await generateForms();
        break;
      case "form-covers":
        await generateFormCovers();
        break;
      case "section":
        if (!sectionNo) {
          console.error(
            "❌  --section <number> required when --template section",
          );
          process.exit(1);
        }
        await generateSections(sectionNo);
        break;
      default:
        // Treat as a standalone form name (e.g. toolbox-talk)
        await generateForm(template);
        break;
    }

    console.log(`\n✅  Done. PDFs written to: documents/generated-pdfs/`);
  } finally {
    if (_browser) await _browser.close();
  }
}

try {
  await main();
} catch (err) {
  console.error("\n❌ Fatal error:", err);
  if (_browser) _browser.close();
  process.exit(1);
}
