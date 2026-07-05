#!/usr/bin/env node

/**
 * QR Code Generator for MH Construction Website
 *
 * Generates QR codes for all major pages and social media links.
 * Saves images to apps/website/public/images/qr-codes/
 *
 * Usage: node scripts/generate-qr-codes.js
 */

const QRCode = require("qrcode");
const sharp = require("sharp");
const fs = require("node:fs");
const path = require("node:path");

// Base URL for production
const BASE_URL = "https://www.mhc-gc.com";

// Output directory
const OUTPUT_DIR = path.join(__dirname, "../public/images/qr-codes");
const TEAM_DATA_PATHS = [
  path.join(__dirname, "../src/lib/data/team-data.json"),
  path.join(__dirname, "../src/data/team-data.json"),
];
const TEAM_DATA_DIR = path.join(__dirname, "../src/lib/data/team");

// Logo paths
const LOGO_COLOR = path.join(__dirname, "../public/images/logo/mh-logo.png");
const LOGO_BW = path.join(__dirname, "../public/images/logo/mh-logo-black.png");

// Brand colors
const HUNTER_GREEN = "#386851";
const LEATHER_TAN = "#BD9264";
const WHITE = "#FFFFFF";
const BLACK = "#000000";
const ENABLE_COLOR_FINDER_TINT = false;

const SOCIAL_QR_NAMES = new Set([
  "linkedin",
  "facebook",
  "instagram",
  "youtube",
  "twitter",
]);

// QR Code configurations
const QR_OPTIONS_COLOR = {
  errorCorrectionLevel: "H", // High error correction
  type: "png",
  quality: 0.95,
  margin: 2,
  width: 512, // 512x512 pixels
  color: {
    dark: HUNTER_GREEN, // Hunter Green (brand color)
    light: WHITE, // White background
  },
};

const QR_OPTIONS_BW = {
  errorCorrectionLevel: "H", // High error correction
  type: "png",
  quality: 0.95,
  margin: 2,
  width: 512, // 512x512 pixels
  color: {
    dark: BLACK, // Black
    light: WHITE, // White background
  },
};

// Define all QR codes to generate
const QR_CODES = [
  // Main pages
  {
    name: "homepage",
    url: BASE_URL,
    description: "MH Construction Homepage",
    label: "www.mhc-gc.com",
  },
  {
    name: "about",
    url: `${BASE_URL}/about`,
    description: "About Us",
    label: "www.mhc-gc.com/about",
  },
  {
    name: "services",
    url: `${BASE_URL}/#services`,
    description: "Our Services",
    label: "www.mhc-gc.com/#services",
  },
  {
    name: "projects",
    url: `${BASE_URL}/projects`,
    description: "Our Projects",
    label: "www.mhc-gc.com/projects",
  },
  {
    name: "team",
    url: `${BASE_URL}/team`,
    description: "Our Team",
    label: "www.mhc-gc.com/team",
  },
  {
    name: "careers",
    url: `${BASE_URL}/careers`,
    description: "Careers",
    label: "www.mhc-gc.com/careers",
  },
  {
    name: "contact",
    url: `${BASE_URL}/contact`,
    description: "Contact Us",
    label: "www.mhc-gc.com/contact",
  },
  {
    name: "traho-overview",
    url: `${BASE_URL}/about?ref=traho-rfq`,
    description: "Traho RFQ - Company Overview",
    label: "TRAHO OVERVIEW",
  },
  {
    name: "traho-projects",
    url: `${BASE_URL}/projects?ref=traho-rfq`,
    description: "Traho RFQ - Project Portfolio",
    label: "TRAHO PROJECTS",
  },
  {
    name: "traho-services",
    url: `${BASE_URL}/?ref=traho-rfq#services`,
    description: "Traho RFQ - Service Lines",
    label: "TRAHO SERVICES",
  },
  {
    name: "traho-safety",
    url: `${BASE_URL}/safety?ref=traho-rfq`,
    description: "Traho RFQ - Safety Program",
    label: "TRAHO SAFETY",
  },
  {
    name: "traho-contact",
    url: `${BASE_URL}/contact?ref=traho-rfq`,
    description: "Traho RFQ - Direct Contact",
    label: "TRAHO CONTACT",
  },
  // Special pages
  {
    name: "allies",
    url: `${BASE_URL}/allies`,
    description: "Allies",
    label: "www.mhc-gc.com/allies",
  },
  {
    name: "veterans",
    url: `${BASE_URL}/veterans`,
    description: "Veteran-Owned Construction",
    label: "www.mhc-gc.com/veterans",
  },
  {
    name: "faq",
    url: `${BASE_URL}/faq`,
    description: "FAQ",
    label: "www.mhc-gc.com/faq",
  },
  {
    name: "testimonials",
    url: `${BASE_URL}/testimonials`,
    description: "Testimonials",
    label: "www.mhc-gc.com/testimonials",
  },
  {
    name: "public-sector",
    url: `${BASE_URL}/public-sector`,
    description: "Public Sector Services",
    label: "www.mhc-gc.com/public-sector",
  },
  {
    name: "resources",
    url: `${BASE_URL}/resources`,
    description: "Resources",
    label: "www.mhc-gc.com/resources",
  },
  {
    name: "safety-manual",
    url: `${BASE_URL}/resources/safety-manual/contents`,
    description: "Safety Manual",
    label: "www.mhc-gc.com/resources/safety-manual/contents",
  },
  {
    name: "accessibility",
    url: `${BASE_URL}/accessibility`,
    description: "Accessibility Statement",
    label: "www.mhc-gc.com/accessibility",
  },
  {
    name: "safety-program",
    url: `${BASE_URL}/safety`,
    description: "Safety Program",
    label: "www.mhc-gc.com/safety",
  },
  {
    name: "safety-incident-report",
    url: `${BASE_URL}/safety/incident-report`,
    description: "Safety Incident Report Form",
    label: "www.mhc-gc.com/safety/incident-report",
  },
  {
    name: "safety-intake",
    url: `${BASE_URL}/safety/intake`,
    description: "Safety Intake Form",
    label: "www.mhc-gc.com/safety/intake",
  },
  {
    name: "hub",
    url: `${BASE_URL}/hub`,
    description: "Employee Hub",
    label: "www.mhc-gc.com/hub",
  },
  {
    name: "employee-handbook",
    url: `${BASE_URL}/docs/employee/employee-handbook-2026.pdf`,
    description: "Employee Handbook",
    label: "www.mhc-gc.com/docs/employee/employee-handbook-2026.pdf",
  },

  // Contact methods
  {
    name: "phone",
    url: "tel:+15093086489",
    description: "Call Us: (509) 308-6489",
    label: "☎ PHONE",
  },
  {
    name: "email",
    url: "mailto:office@mhc-gc.com",
    description: "Email: office@mhc-gc.com",
    label: "✉ EMAIL",
  },

  // Social media (actual links from Footer.tsx)
  {
    name: "linkedin",
    url: "https://www.linkedin.com/company/mh-construction-general-contractor/",
    description: "LinkedIn Profile",
    label: "LINKEDIN",
  },
  {
    name: "facebook",
    url: "https://www.facebook.com/profile.php?id=61575511773974",
    description: "Facebook Page",
    label: "FACEBOOK",
  },
  {
    name: "instagram",
    url: "https://www.instagram.com/mh_construction_inc/reels/",
    description: "Instagram Profile",
    label: "INSTAGRAM",
  },
  {
    name: "youtube",
    url: "https://youtube.com/@mhc-gc?si=RGnloxP4NgV4Dm_j",
    description: "YouTube Channel",
    label: "YOUTUBE",
  },
  {
    name: "twitter",
    url: "https://x.com/mhc_gc",
    description: "X (Twitter) Profile",
    label: "X/TWITTER",
  },

  // Location
  {
    name: "location",
    url: "https://maps.google.com/?q=3111+N.+Capitol+Ave.,+Pasco,+WA+99301",
    description: "Our Location",
    label: "📍 LOCATION",
  },

  // Safety Program & Dashboard
  {
    name: "safety-dashboard",
    url: `${BASE_URL}/safety`,
    description: "Safety Hub (Employee Operations)",
    label: "SAFETY HUB",
  },

  // Events
  {
    name: "cdn-booth-entry",
    url: `${BASE_URL}/cool-desert-nights#booth-entry`,
    description: "Cool Desert Nights 2026 — Booth Entry Wizard",
    label: "CDN 2026 BOOTH ENTRY",
    folder: "events",
  },
];

// Safety Manual sections — loaded from canonical JSON so the QR pipeline,
// the printed PDF pipeline, and the Next.js cluster pages always agree.
const SAFETY_MANUAL_PATHS = [
  path.join(__dirname, "../documents/content/safety-manual.json"),
  path.join(__dirname, "../../../documents/content/safety-manual.json"),
  path.join(__dirname, "../documents/content/safety-manual-public.json"),
  path.join(__dirname, "../../../documents/content/safety-manual-public.json"),
];

const SAFETY_FORMS_MANIFEST_PATHS = [
  path.join(__dirname, "../documents/forms/forms-manifest.json"),
  path.join(__dirname, "../../../documents/forms/forms-manifest.json"),
];

function loadSafetyManualJson() {
  const manifestPath = SAFETY_MANUAL_PATHS.find((candidate) =>
    fs.existsSync(candidate),
  );

  if (!manifestPath) {
    console.warn(
      "⚠ Could not load safety-manual manifest; using fallback section metadata.",
    );
    return { sections: [] };
  }

  return JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
}

const SAFETY_MANUAL_JSON = loadSafetyManualJson();
const SAFETY_MANUAL_SECTIONS = SAFETY_MANUAL_JSON.sections.map((s) => ({
  number: s.numberStr,
  slug: s.slug,
  title: s.title,
  numeric: s.number,
}));

// Cluster groupings — MIRROR of src/lib/data/safety-manual-clusters.ts.
// Keep in sync; verified at runtime against the imported sections list.
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

function clusterHrefForSection(numeric) {
  const cluster = SAFETY_MANUAL_CLUSTERS.find(
    (c) => numeric >= c.min && numeric <= c.max,
  );
  if (!cluster) return null;
  const anchor = String(numeric).padStart(2, "0");
  return `${BASE_URL}/resources/safety-manual/${cluster.slug}#mish-${anchor}`;
}

// Fallback list for safety forms when forms-manifest.json is unavailable.
const FALLBACK_SAFETY_MANUAL_FORMS = [
  { id: "toolbox-talk", title: "Toolbox Talk (Blank)" },
  { id: "jha", title: "JHA - Job Hazard Analysis" },
  { id: "incident-report", title: "Incident / Accident Report" },
  { id: "near-miss-report", title: "Near-Miss Report" },
  { id: "daily-site-inspection", title: "Daily Site Safety Inspection" },
  { id: "orientation-signoff", title: "Safety Orientation Sign-Off" },
  { id: "training-record", title: "Employee Safety Training Record" },
  { id: "pre-task-plan", title: "Pre-Task Safety Plan" },
  { id: "equipment-checklist", title: "Equipment Inspection" },
  { id: "signin-log", title: "Sign-In / Visitor Log" },
  { id: "sub-prequal", title: "Subcontractor Pre-Qual" },
  { id: "osha-300-cover", title: "OSHA 300 Log Cover Sheet" },
  { id: "wa-li-roa-cover", title: "WA L&I ROA Cover Sheet" },
];

function loadSafetyManualForms() {
  const manifestPath = SAFETY_FORMS_MANIFEST_PATHS.find((candidate) =>
    fs.existsSync(candidate),
  );

  if (!manifestPath) {
    console.warn(
      "⚠ Could not load forms manifest; using fallback safety form QR metadata.",
    );
    return FALLBACK_SAFETY_MANUAL_FORMS;
  }

  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
    const forms = Array.isArray(manifest.forms) ? manifest.forms : [];

    const mishForms = forms
      .filter((entry) => {
        const sections = Array.isArray(entry.manualSection)
          ? entry.manualSection
          : [];

        return sections.some((section) => {
          const match = String(section).match(/^MISH\s+(\d{1,2})$/i);
          if (!match) return false;
          const sectionNumber = Number.parseInt(match[1], 10);
          return sectionNumber >= 1 && sectionNumber <= 50;
        });
      })
      .map((entry) => ({
        id: String(entry.slug || "").replace(/^form-/, ""),
        title: String(entry.title || entry.slug || "Safety Form"),
      }))
      .filter((entry) => entry.id.length > 0);

    if (mishForms.length === 0) {
      console.warn(
        "⚠ Forms manifest had no MISH form entries; using fallback safety form QR metadata.",
      );
      return FALLBACK_SAFETY_MANUAL_FORMS;
    }

    return mishForms;
  } catch (error) {
    console.warn(
      `⚠ Could not parse forms manifest at ${manifestPath}; using fallback safety form QR metadata. ${error instanceof Error ? error.message : String(error)}`,
    );
    return FALLBACK_SAFETY_MANUAL_FORMS;
  }
}

function loadHandbookForms() {
  const manifestPath = SAFETY_FORMS_MANIFEST_PATHS.find((candidate) =>
    fs.existsSync(candidate),
  );

  if (!manifestPath) {
    console.warn(
      "⚠ Could not load forms manifest; skipping handbook form QR metadata.",
    );
    return [];
  }

  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
    const forms = Array.isArray(manifest.forms) ? manifest.forms : [];

    return forms
      .filter((entry) => {
        const sections = Array.isArray(entry.manualSection)
          ? entry.manualSection
          : [];
        return sections.some((section) => /^HANDBOOK\b/i.test(String(section)));
      })
      .map((entry) => ({
        id: String(entry.slug || "").replace(/^form-/, ""),
        slug: String(entry.slug || ""),
        title: String(entry.title || entry.slug || "Handbook Form"),
      }))
      .filter((entry) => entry.id.length > 0 && entry.slug.length > 0);
  } catch (error) {
    console.warn(
      `⚠ Could not parse forms manifest at ${manifestPath}; skipping handbook form QR metadata. ${error instanceof Error ? error.message : String(error)}`,
    );
    return [];
  }
}

const SAFETY_MANUAL_FORMS = loadSafetyManualForms();
const HANDBOOK_FORMS = loadHandbookForms();

function getFolderForQR(name) {
  if (name.startsWith("team-")) return "team";
  if (SOCIAL_QR_NAMES.has(name)) return "social";
  if (name.startsWith("traho-")) return "rfq";
  if (name.startsWith("safety-section-")) return "safety-sections";
  if (name.startsWith("safety-form-")) return "safety-forms";
  if (name.startsWith("handbook-form-")) return "handbook-forms";
  if (
    name.startsWith("safety-") ||
    name === "hub" ||
    name === "employee-handbook"
  ) {
    return "safety";
  }
  if (
    name === "phone" ||
    name === "email" ||
    name === "contact" ||
    name === "location"
  ) {
    return "contact";
  }
  if (name.startsWith("cdn-") || name.startsWith("event-")) return "events";
  return "core";
}

function buildTeamQRCodes(teamData) {
  return teamData
    .filter((member) => member?.active && member?.slug)
    .map((member) => ({
      name: `team-${member.slug}`,
      url:
        member.slug === "jeremy-thamert"
          ? `${BASE_URL}/jeremy-thamert`
          : `${BASE_URL}/team#${member.slug}`,
      description: `${member.name} - ${member.role || "Team Member"}`,
      label: String(member.name || "TEAM MEMBER").toUpperCase(),
      folder: "team",
    }));
}

function loadTeamQRCodes() {
  for (const candidate of TEAM_DATA_PATHS) {
    if (!fs.existsSync(candidate)) continue;

    try {
      const teamDataRaw = fs.readFileSync(candidate, "utf8");
      const teamData = JSON.parse(teamDataRaw);

      if (Array.isArray(teamData)) {
        return buildTeamQRCodes(teamData);
      }
    } catch (error) {
      console.warn(
        `⚠ Could not load team data from ${candidate}. ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  if (fs.existsSync(TEAM_DATA_DIR)) {
    try {
      const teamData = fs
        .readdirSync(TEAM_DATA_DIR)
        .filter((file) => file.endsWith(".json"))
        .map((file) =>
          JSON.parse(fs.readFileSync(path.join(TEAM_DATA_DIR, file), "utf8")),
        );

      return buildTeamQRCodes(teamData);
    } catch (error) {
      console.warn(
        `⚠ Could not load team data from ${TEAM_DATA_DIR}. ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  console.warn("⚠ Could not load active team data; skipping team QR entries.");
  return [];
}

function buildFinalQRCodeList() {
  const baseCodes = QR_CODES;

  // Build safety manual section entries — deep-link to cluster anchor.
  const safetySectionCodes = SAFETY_MANUAL_SECTIONS.map((s) => {
    const href = clusterHrefForSection(s.numeric);
    return {
      name: `safety-section-${s.number}`,
      url: href || `${BASE_URL}/resources/safety-manual/contents`,
      description: `Safety Manual Section ${s.number}: ${s.title}`,
      label: `MISH ${s.number}`,
      folder: "safety-sections",
    };
  });

  // Build safety form entries — deep-link to forms grouped index anchor.
  const safetyFormCodes = SAFETY_MANUAL_FORMS.map((f) => ({
    name: `safety-form-${f.id}`,
    url: `${BASE_URL}/resources/safety-manual/forms#form-${f.id}`,
    description: `Safety Form: ${f.title}`,
    label: `FORM ${f.id.toUpperCase()}`,
    folder: "safety-forms",
  }));

  // Build employee handbook form entries — deep-link to published handbook PDFs.
  const handbookFormCodes = HANDBOOK_FORMS.map((f) => ({
    name: `handbook-form-${f.id}`,
    url: `${BASE_URL}/docs/employee/forms/${f.slug}.pdf`,
    description: `Employee Handbook Form: ${f.title}`,
    label: `HANDBOOK ${f.id.toUpperCase()}`,
    folder: "handbook-forms",
  }));

  const merged = [
    ...baseCodes,
    ...safetySectionCodes,
    ...safetyFormCodes,
    ...handbookFormCodes,
    ...loadTeamQRCodes(),
  ].map((qr) => ({
    ...qr,
    folder: qr.folder || getFolderForQR(qr.name),
  }));

  // De-dupe by name while preserving first occurrence.
  const seen = new Set();
  return merged.filter((qr) => {
    if (seen.has(qr.name)) return false;
    seen.add(qr.name);
    return true;
  });
}

/**
 * Ensure output directory exists
 */
function ensureOutputDir() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.info(`✓ Created directory: ${OUTPUT_DIR}`);
  }
}

function listQrFilesRecursive(dir, baseDir = dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      results.push(...listQrFilesRecursive(fullPath, baseDir));
      continue;
    }

    if (
      entry.isFile() &&
      entry.name.startsWith("qr-") &&
      entry.name.endsWith(".png")
    ) {
      results.push(path.relative(baseDir, fullPath).replace(/\\/g, "/"));
    }
  }

  return results;
}

function pruneStaleQRCodes(results) {
  const expected = new Set(results.map((result) => result.relativePath));
  const existing = listQrFilesRecursive(OUTPUT_DIR);
  const stale = existing.filter((relativePath) => !expected.has(relativePath));

  stale.forEach((relativePath) => {
    fs.unlinkSync(path.join(OUTPUT_DIR, relativePath));
    console.info(`ℹ Removed stale QR file: ${relativePath}`);
  });

  return stale.length;
}

/**
 * Color specific pixels in the QR code (for finder patterns)
 */
async function colorFinderPatterns(qrBuffer, width, height) {
  const image = sharp(qrBuffer);
  const { data, info } = await image
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Parse Leather Tan color
  const leatherTan = {
    r: Number.parseInt(LEATHER_TAN.slice(1, 3), 16),
    g: Number.parseInt(LEATHER_TAN.slice(3, 5), 16),
    b: Number.parseInt(LEATHER_TAN.slice(5, 7), 16),
  };

  const hunterGreen = {
    r: Number.parseInt(HUNTER_GREEN.slice(1, 3), 16),
    g: Number.parseInt(HUNTER_GREEN.slice(3, 5), 16),
    b: Number.parseInt(HUNTER_GREEN.slice(5, 7), 16),
  };

  // QR code finder pattern locations (approximate sizes based on 512px QR code)
  // These are the three corner squares
  const moduleSize = Math.floor(width / 29); // Approximate module size for version 3 QR
  const finderSize = moduleSize * 7; // Finder patterns are 7x7 modules

  // Define the three finder pattern regions (top-left, top-right, bottom-left)
  const finderRegions = [
    { x: 0, y: 0, size: finderSize }, // Top-left
    { x: width - finderSize, y: 0, size: finderSize }, // Top-right
    { x: 0, y: height - finderSize, size: finderSize }, // Bottom-left
  ];

  // Replace Hunter Green with Leather Tan in finder pattern regions
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * info.channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      // Check if pixel is Hunter Green
      const isHunterGreen =
        Math.abs(r - hunterGreen.r) < 10 &&
        Math.abs(g - hunterGreen.g) < 10 &&
        Math.abs(b - hunterGreen.b) < 10;

      if (isHunterGreen) {
        // Check if pixel is in any finder pattern region
        const isInFinder = finderRegions.some(
          (region) =>
            x >= region.x &&
            x < region.x + region.size &&
            y >= region.y &&
            y < region.y + region.size,
        );

        if (isInFinder) {
          // Replace with Leather Tan
          data[idx] = leatherTan.r;
          data[idx + 1] = leatherTan.g;
          data[idx + 2] = leatherTan.b;
        }
      }
    }
  }

  // Return modified image as buffer
  return sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: info.channels,
    },
  })
    .png()
    .toBuffer();
}

/**
 * Create a text label overlay for QR code identification
 * @param {string} text - The text to display
 * @param {number} width - Width of the QR code
 * @param {string} variant - 'color' or 'bw'
 */
async function createTextLabel(text, width, variant) {
  const labelHeight = Math.floor(width * 0.12); // 12% of QR code height
  const fontSize = Math.floor(labelHeight * 0.45); // 45% of label height
  const bgColor = variant === "color" ? HUNTER_GREEN : BLACK;
  const textColor = WHITE;

  // Create SVG with text
  const svgLabel = `
    <svg width="${width}" height="${labelHeight}">
      <rect width="${width}" height="${labelHeight}" fill="${bgColor}"/>
      <text
        x="50%"
        y="50%"
        font-family="Inter, Roboto, sans-serif"
        font-size="${fontSize}"
        font-weight="bold"
        fill="${textColor}"
        text-anchor="middle"
        dominant-baseline="middle"
        letter-spacing="1"
      >${text}</text>
    </svg>
  `;

  return sharp(Buffer.from(svgLabel)).png().toBuffer();
}

/**
 * Generate a single QR code with logo overlay and colored finder patterns
 * @param {object} qrData - QR code data (name, url, description, label)
 * @param {string} variant - 'color' or 'bw'
 */
async function generateQRCode(qrData, variant = "color") {
  const suffix = variant === "color" ? "-color" : "-bw";
  const folder = qrData.folder || "core";
  const filename = `qr-${qrData.name}${suffix}.png`;
  const relativePath = path.posix.join(folder, filename);
  const targetDir = path.join(OUTPUT_DIR, folder);
  const filepath = path.join(targetDir, filename);
  const tempFilepath = path.join(targetDir, `temp-${filename}`);
  const tempColoredPath = path.join(targetDir, `temp-colored-${filename}`);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Select appropriate logo and QR options based on variant
  const logoPath = variant === "color" ? LOGO_COLOR : LOGO_BW;
  const qrOptions = variant === "color" ? QR_OPTIONS_COLOR : QR_OPTIONS_BW;
  const shouldColorFinders = variant === "color" && ENABLE_COLOR_FINDER_TINT;

  try {
    // Step 1: Generate base QR code to temporary file
    await QRCode.toFile(tempFilepath, qrData.url, qrOptions);

    // Step 2: Color the finder patterns (corner squares) with Leather Tan (only for color variant)
    const qrBuffer = fs.readFileSync(tempFilepath);
    const qrMetadata = await sharp(qrBuffer).metadata();
    let processedQRBuffer;

    if (shouldColorFinders) {
      processedQRBuffer = await colorFinderPatterns(
        qrBuffer,
        qrMetadata.width,
        qrMetadata.height,
      );
    } else {
      processedQRBuffer = qrBuffer;
    }

    // Save processed QR code
    await sharp(processedQRBuffer).toFile(tempColoredPath);

    // Step 3: Add logo overlay using sharp
    const qrImage = sharp(tempColoredPath);
    const metadata = await qrImage.metadata();

    // Logo should be about 20% of QR code size (with error correction H, up to 30% can be covered)
    const logoSize = Math.floor(metadata.width * 0.2);

    // Prepare logo with white background for better visibility
    const logo = await sharp(logoPath)
      .resize(logoSize, logoSize, {
        fit: "contain",
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      })
      .toBuffer();

    // Create white rounded square background for logo
    const squareSize = Math.floor(logoSize * 1.2);
    const cornerRadius = Math.floor(squareSize * 0.15); // 15% corner radius
    const roundedSquareSvg = `
      <svg width="${squareSize}" height="${squareSize}">
        <rect x="0" y="0" width="${squareSize}" height="${squareSize}" 
              rx="${cornerRadius}" ry="${cornerRadius}" fill="white"/>
      </svg>
    `;

    const squareBackground = await sharp(Buffer.from(roundedSquareSvg))
      .png()
      .toBuffer();

    // Calculate center position
    const centerX = Math.floor((metadata.width - squareSize) / 2);
    const centerY = Math.floor((metadata.height - squareSize) / 2);

    const logoOffsetX = Math.floor((squareSize - logoSize) / 2);
    const logoOffsetY = Math.floor((squareSize - logoSize) / 2);

    // First, composite logo onto QR code
    const qrWithLogo = await sharp(tempColoredPath)
      .composite([
        {
          input: squareBackground,
          top: centerY,
          left: centerX,
        },
        {
          input: logo,
          top: centerY + logoOffsetY,
          left: centerX + logoOffsetX,
        },
      ])
      .toBuffer();

    // If label is provided, extend canvas and add label at bottom
    if (qrData.label) {
      const labelBuffer = await createTextLabel(
        qrData.label,
        metadata.width,
        variant,
      );
      const labelMetadata = await sharp(labelBuffer).metadata();
      const totalHeight = metadata.height + labelMetadata.height;

      // Create extended canvas with QR code and label
      await sharp({
        create: {
          width: metadata.width,
          height: totalHeight,
          channels: 4,
          background: { r: 255, g: 255, b: 255, alpha: 255 },
        },
      })
        .composite([
          {
            input: qrWithLogo,
            top: 0,
            left: 0,
          },
          {
            input: labelBuffer,
            top: metadata.height,
            left: 0,
          },
        ])
        .toFile(filepath);
    } else {
      // No label, just save the QR code with logo
      await sharp(qrWithLogo).toFile(filepath);
    }

    // Clean up temporary files
    fs.unlinkSync(tempFilepath);
    fs.unlinkSync(tempColoredPath);

    console.info(
      `✓ Generated: ${relativePath} → ${qrData.description} (${variant})`,
    );
    return {
      success: true,
      filename,
      relativePath,
      folder,
      variant,
      ...qrData,
    };
  } catch (error) {
    console.error(`✗ Failed: ${filename} - ${error.message}`);
    // Clean up temp files if they exist
    if (fs.existsSync(tempFilepath)) {
      fs.unlinkSync(tempFilepath);
    }
    if (fs.existsSync(tempColoredPath)) {
      fs.unlinkSync(tempColoredPath);
    }
    return {
      success: false,
      filename,
      relativePath,
      folder,
      variant,
      error: error.message,
      ...qrData,
    };
  }
}

/**
 * Generate manifest file with all QR code information
 */
function generateManifest(results) {
  const folders = [...new Set(results.map((r) => r.folder).filter(Boolean))];

  const manifest = {
    generatedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    outputDirectory: "apps/website/public/images/qr-codes",
    folders,
    variants: {
      color: {
        description: "Color QR codes with MH brand green and centered logo",
        qrOptions: QR_OPTIONS_COLOR,
        logo: "mh-logo.png",
      },
      bw: {
        description: "Black & white QR codes for any background",
        qrOptions: QR_OPTIONS_BW,
        logo: "mh-logo-black.png",
      },
    },
    qrCodes: results.map((r) => ({
      name: r.name,
      filename: r.filename,
      relativePath: r.relativePath || r.filename,
      folder: r.folder || null,
      variant: r.variant,
      url: r.url,
      description: r.description,
      success: r.success,
      error: r.error || null,
    })),
  };

  const manifestPath = path.join(OUTPUT_DIR, "qr-codes-manifest.json");
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.info(`\n✓ Generated manifest: qr-codes-manifest.json`);

  return manifest;
}

/**
 * Generate usage documentation
 */
function generateUsageDoc(manifest) {
  const successCount = manifest.qrCodes.filter((q) => q.success).length;
  const totalCount = manifest.qrCodes.length;
  const formatMarkdownText = (value) =>
    value.replaceAll(/([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi, "<$1>");

  const doc = `# QR Codes for MH Construction

Generated: ${new Date(manifest.generatedAt).toLocaleString()}

## Summary

- **Total QR Codes:** ${totalCount}
- **Successfully Generated:** ${successCount}
- **Location:** \`${manifest.outputDirectory}\`
- **Folders:** ${manifest.folders.map((f) => `\`${f}\``).join(", ")}

## Available QR Codes

${manifest.qrCodes
  .map((qr) => {
    const status = qr.success ? "✅" : "❌";
    return [
      `### ${status} ${formatMarkdownText(qr.description)}`,
      "",
      `- **Name:** \`${qr.name}\``,
      `- **File:** \`${qr.relativePath || qr.filename}\``,
      `- **URL:** <${qr.url}>`,
      ...(qr.error ? [`- **Error:** ${formatMarkdownText(qr.error)}`] : []),
    ].join("\n");
  })
  .join("\n\n")}

## Usage in React Components

### Import the QRCode component

\`\`\`tsx
import { QRCode } from '@/components/ui/QRCode';

// Use with a URL
<QRCode url="https://mhc-gc.com" size={200} />

// Use pre-generated image
<img src="/images/qr-codes/core/qr-homepage-color.png" alt="QR Code for Homepage" />
\`\`\`

### Using in Marketing Materials

All QR codes are optimized for print and digital use:

- **Size:** 512x512 pixels
- **Format:** PNG with transparency support
- **Color:** Hunter Green (#386851) on white background
- **Error Correction:** High (30% damage tolerance)

### Recommended Sizes

- **Business Cards:** 0.5" - 0.75" (minimum)
- **Flyers/Posters:** 1" - 2"
- **Banners:** 2" - 4"
- **Digital Displays:** Use original 512px size

## Regenerating QR Codes

To regenerate all QR codes:

\`\`\`bash
node scripts/generate-qr-codes.js
\`\`\`

To update URLs or add new QR codes, edit \`scripts/generate-qr-codes.js\`.
`;

  const docPath = path.join(OUTPUT_DIR, "README.md");
  fs.writeFileSync(docPath, doc);
  console.info(`✓ Generated documentation: README.md`);
}

/**
 * Main execution
 */
async function main() {
  console.info("🎯 MH Construction QR Code Generator\n");
  console.info(`Base URL: ${BASE_URL}`);
  console.info(`Output: ${OUTPUT_DIR}`);
  console.info(`Variants: color, bw\n`);

  // Ensure output directory exists
  ensureOutputDir();

  const qrCodes = buildFinalQRCodeList();

  // Generate all QR codes (2 variants each)
  console.info("Generating QR codes...\n");
  const allTasks = [];

  // Generate two variants for each QR code
  for (const qrCode of qrCodes) {
    allTasks.push(
      generateQRCode(qrCode, "color"),
      generateQRCode(qrCode, "bw"),
    );
  }

  const results = await Promise.all(allTasks);

  const removedStaleCount = pruneStaleQRCodes(results);
  if (removedStaleCount > 0) {
    console.info(`ℹ Removed ${removedStaleCount} stale QR file(s).`);
  }

  // Generate manifest and documentation
  const manifest = generateManifest(results);
  generateUsageDoc(manifest);

  // Summary
  const successCount = results.filter((r) => r.success).length;
  const failCount = results.filter((r) => !r.success).length;
  const uniqueQRCount = qrCodes.length;

  console.info("\n" + "=".repeat(50));
  console.info(`✅ Successfully generated: ${successCount} QR code files`);
  console.info(
    `   (${uniqueQRCount} unique QR codes × 2 variants = ${successCount})`,
  );
  if (failCount > 0) {
    console.info(`❌ Failed: ${failCount} QR code files`);
  }
  console.info("=".repeat(50) + "\n");

  console.info("📁 Files created:");
  console.info(`   ${OUTPUT_DIR}/`);
  console.info(`   ├── qr-codes-manifest.json`);
  console.info(`   ├── README.md`);

  // Group results by name for display
  const groupedResults = {};
  results.forEach((r) => {
    if (!groupedResults[r.name]) {
      groupedResults[r.name] = [];
    }
    groupedResults[r.name].push(r);
  });

  Object.values(groupedResults)
    .slice(0, 5)
    .forEach((entries) => {
      entries.forEach((entry) => {
        console.info(`   ├── ${entry.relativePath || entry.filename}`);
      });
    });

  if (Object.keys(groupedResults).length > 5) {
    console.info(
      `   └── ... and ${(Object.keys(groupedResults).length - 5) * 2} more files`,
    );
  }

  console.info("\n✨ Done! QR codes are ready for marketing use.\n");
  console.info("📋 Two variants available for each QR code:");
  console.info("   • Color (with MH branding colors)");
  console.info("   • Black & White (for any background)\n");
}

// Run the script
main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
