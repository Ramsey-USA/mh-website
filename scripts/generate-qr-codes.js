#!/usr/bin/env node

/**
 * QR Code Generator for MH Construction Website
 *
 * Generates QR codes for all major pages and social media links.
 * Saves images to public/images/qr-codes/
 *
 * Usage: node scripts/generate-qr-codes.js
 */

const QRCode = require("qrcode");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// Base URL for production
const BASE_URL = "https://www.mhc-gc.com";

// Output directory
const OUTPUT_DIR = path.join(__dirname, "../public/images/qr-codes");
const TEAM_DATA_PATH = path.join(__dirname, "../src/lib/data/team-data.json");

// Logo paths
const LOGO_COLOR = path.join(__dirname, "../public/images/logo/mh-logo.png");
const LOGO_BW = path.join(__dirname, "../public/images/logo/mh-logo-black.png");

// Brand colors
const HUNTER_GREEN = "#386851";
const LEATHER_TAN = "#BD9264";
const WHITE = "#FFFFFF";
const BLACK = "#000000";

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
    url: `${BASE_URL}/services`,
    description: "Our Services",
    label: "www.mhc-gc.com/services",
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
    url: `${BASE_URL}/services?ref=traho-rfq`,
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
    url: `${BASE_URL}/resources/safety-manual`,
    description: "Safety Manual",
    label: "www.mhc-gc.com/resources/safety-manual",
  },
  {
    name: "safety-manual-contents",
    url: `${BASE_URL}/resources/safety-manual/contents`,
    description: "Safety Manual — Table of Contents (Public)",
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
    url: `${BASE_URL}/employee-handbook`,
    description: "Employee Handbook",
    label: "www.mhc-gc.com/employee-handbook",
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

  // Team member profiles
  {
    name: "team-jeremy-thamert",
    url: `${BASE_URL}/team#jeremy-thamert`,
    description: "Jeremy Thamert - Owner & President",
    label: "JEREMY THAMERT",
  },
  {
    name: "team-mike-holstein",
    url: `${BASE_URL}/team#mike-holstein`,
    description: "Mike Holstein - Founder",
    label: "MIKE HOLSTEIN",
  },
  {
    name: "team-todd-schoeff",
    url: `${BASE_URL}/team#todd-schoeff`,
    description: "Todd Schoeff - VP of Field Operations",
    label: "TODD SCHOEFF",
  },
  {
    name: "team-brooks-morris",
    url: `${BASE_URL}/team#brooks-morris`,
    description: "Brooks Morris - Safety Director",
    label: "BROOKS MORRIS",
  },
  {
    name: "team-matt-ramsey",
    url: `${BASE_URL}/team#matt-ramsey`,
    description: "Matt Ramsey - Project Manager",
    label: "MATT RAMSEY",
  },
  {
    name: "team-porter-cline",
    url: `${BASE_URL}/team#porter-cline`,
    description: "Porter Cline - Project Manager",
    label: "PORTER CLINE",
  },
  {
    name: "team-derek-parks",
    url: `${BASE_URL}/team#derek-parks`,
    description: "Derek Parks - Chief Estimator",
    label: "DEREK PARKS",
  },
  {
    name: "team-ben-woodall",
    url: `${BASE_URL}/team#ben-woodall`,
    description: "Ben Woodall - Estimator",
    label: "BEN WOODALL",
  },
  {
    name: "team-steve-mcclary",
    url: `${BASE_URL}/team#steve-mcclary`,
    description: "Steve McClary - Senior Superintendent",
    label: "STEVE MCCLARY",
  },
  {
    name: "team-arnold-garcia",
    url: `${BASE_URL}/team#arnold-garcia`,
    description: "Arnold Garcia - Field Superintendent",
    label: "ARNOLD GARCIA",
  },
  {
    name: "team-lisa-kandle",
    url: `${BASE_URL}/team#lisa-kandle`,
    description: "Lisa Kandle - Office Manager",
    label: "LISA KANDLE",
  },
  {
    name: "team-reagan-massey",
    url: `${BASE_URL}/team#reagan-massey`,
    description: "Reagan Massey - Executive Assistant",
    label: "REAGAN MASSEY",
  },
  {
    name: "team-brittney-holstein",
    url: `${BASE_URL}/team#brittney-holstein`,
    description: "Brittney Holstein - Project Coordinator",
    label: "BRITTNEY HOLSTEIN",
  },
  {
    name: "team-jennifer-tene",
    url: `${BASE_URL}/team#jennifer-tene`,
    description: "Jennifer Tene - Payroll & HR Coordinator",
    label: "JENNIFER TENE",
  },

  // Safety Program & Dashboard
  {
    name: "safety-dashboard",
    url: `${BASE_URL}/safety/hub`,
    description: "Safety Hub (Employee Operations)",
    label: "SAFETY HUB",
  },
];

// Safety Manual Table of Contents — all 50 sections (00–49)
// URL pattern: /resources/safety-manual/section/{slug}
// Folder: safety-sections
const SAFETY_MANUAL_SECTIONS = [
  {
    number: "00",
    slug: "table-of-contents",
    title: "Table of Contents",
  },
  {
    number: "01",
    slug: "injury-free-workplace-plan",
    title: "Injury-Free Workplace Plan",
  },
  {
    number: "02",
    slug: "drug-free-workplace",
    title: "Drug-Free Workplace",
  },
  {
    number: "03",
    slug: "program-policy-and-requirements",
    title: "Program Policy and Requirements",
  },
  {
    number: "04",
    slug: "safety-and-health-orientation",
    title: "Safety and Health Orientation",
  },
  {
    number: "05",
    slug: "pre-job-safety-planning",
    title: "Pre-Job Safety Planning",
  },
  {
    number: "06",
    slug: "emergency-response",
    title: "Emergency Response",
  },
  {
    number: "07",
    slug: "safety-bulletin-boards",
    title: "Safety Bulletin Boards",
  },
  {
    number: "08",
    slug: "event-reporting",
    title: "Event Reporting of Incidents, Accidents & Near Misses",
  },
  {
    number: "09",
    slug: "safety-health-meetings-inspections",
    title: "Safety and Health Meetings / Inspections",
  },
  {
    number: "10",
    slug: "personal-protective-equipment",
    title: "Personal Protective Equipment (PPE)",
  },
  {
    number: "11",
    slug: "fall-protection",
    title: "Fall Protection",
  },
  {
    number: "12",
    slug: "flammable-combustible-liquids",
    title: "Flammable and Combustible Liquids",
  },
  {
    number: "13",
    slug: "fire-prevention",
    title: "Fire Prevention",
  },
  {
    number: "14",
    slug: "welding-cutting-heating",
    title: "Welding, Cutting, and Heating Operations",
  },
  {
    number: "15",
    slug: "lockout-tagout",
    title: "Lockout / Tagout (LOTO)",
  },
  {
    number: "16",
    slug: "confined-space-entry",
    title: "Confined Space Entry",
  },
  {
    number: "17",
    slug: "use-and-care-of-ladders",
    title: "Use and Care of Ladders",
  },
  {
    number: "18",
    slug: "motor-vehicle-safety",
    title: "Motor Vehicle Safety Program",
  },
  {
    number: "19",
    slug: "equipment-maintenance-inspection",
    title: "Equipment Maintenance and Inspection",
  },
  {
    number: "20",
    slug: "aerial-lifts-elevating-work-platforms",
    title: "Aerial Lifts and Elevating Work Platforms",
  },
  {
    number: "21",
    slug: "crane-suspended-work-platforms",
    title: "Crane-Suspended Work Platforms",
  },
  {
    number: "22",
    slug: "scaffolds",
    title: "Use and Handling of Scaffolds",
  },
  {
    number: "23",
    slug: "industrial-hygiene",
    title: "Industrial Hygiene Program",
  },
  {
    number: "24",
    slug: "hazard-communication",
    title: "Contractor Hazard Communication Program",
  },
  {
    number: "25",
    slug: "heat-illness-prevention",
    title: "Heat-Related Illness Prevention",
  },
  {
    number: "26",
    slug: "excavation-trenching-shoring",
    title: "Excavation, Trenching, and Shoring",
  },
  {
    number: "27",
    slug: "equipment-modifications",
    title: "Construction Equipment Modifications and Fabrications",
  },
  {
    number: "28",
    slug: "housekeeping",
    title: "Housekeeping",
  },
  {
    number: "29",
    slug: "electrical-safety",
    title: "Electrical Safety",
  },
  {
    number: "30",
    slug: "signs-signals-barricades",
    title: "Signs, Signals, and Barricades",
  },
  {
    number: "31",
    slug: "miscellaneous-construction",
    title: "Miscellaneous Construction Requirements",
  },
  {
    number: "32",
    slug: "respiratory-protection",
    title: "Respiratory Protection",
  },
  {
    number: "33",
    slug: "floor-openings-open-surfaces",
    title: "Floor Openings, Open-Sided Surfaces, and Ramps",
  },
  {
    number: "34",
    slug: "compressed-gas-air",
    title: "Compressed Gas / Compressed Air",
  },
  {
    number: "35",
    slug: "rigging",
    title: "Rigging",
  },
  {
    number: "36",
    slug: "hand-portable-power-tools",
    title: "Hand and Portable Power Tools",
  },
  {
    number: "37",
    slug: "concrete-masonry",
    title: "Concrete and Masonry Construction",
  },
  {
    number: "38",
    slug: "commercial-drivers-drug-alcohol",
    title: "Commercial Drivers Drug and Alcohol Program",
  },
  {
    number: "39",
    slug: "subcontractor-management",
    title: "Subcontractor Management Plan",
  },
  {
    number: "40",
    slug: "waste-management",
    title: "Waste Management Plan",
  },
  {
    number: "41",
    slug: "short-service-employee",
    title: "Short Service Employee Program",
  },
  {
    number: "42",
    slug: "forklift-truck-safety",
    title: "Forklift / Truck Safety",
  },
  {
    number: "43",
    slug: "bloodborne-pathogens",
    title: "Bloodborne Pathogens",
  },
  {
    number: "44",
    slug: "silica-exposure-control",
    title: "Silica Exposure Control",
  },
  {
    number: "45",
    slug: "distracted-driving-mobile-device",
    title: "Distracted Driving & Mobile Device Policy",
  },
  {
    number: "46",
    slug: "motor-vehicle-records",
    title: "Motor Vehicle Records Program",
  },
  {
    number: "47",
    slug: "insurance-contractual-risk-transfer",
    title: "Insurance Requirements & Contractual Risk Transfer",
  },
  {
    number: "48",
    slug: "incident-investigation-root-cause",
    title: "Incident Investigation & Root Cause Analysis",
  },
  {
    number: "49",
    slug: "return-to-work",
    title: "Return-to-Work Program",
  },
];

function getFolderForQR(name) {
  if (name.startsWith("team-")) return "team";
  if (SOCIAL_QR_NAMES.has(name)) return "social";
  if (name.startsWith("traho-")) return "rfq";
  if (name.startsWith("safety-section-")) return "safety-sections";
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
  return "core";
}

function loadTeamQRCodes() {
  const fallbackTeamCodes = QR_CODES.filter((qr) =>
    qr.name.startsWith("team-"),
  );

  try {
    const teamDataRaw = fs.readFileSync(TEAM_DATA_PATH, "utf8");
    const teamData = JSON.parse(teamDataRaw);

    return teamData
      .filter((member) => member?.active && member?.slug)
      .map((member) => ({
        name: `team-${member.slug}`,
        url: `${BASE_URL}/team#${member.slug}`,
        description: `${member.name} - ${member.role || "Team Member"}`,
        label: String(member.name || "TEAM MEMBER").toUpperCase(),
        folder: "team",
      }));
  } catch (error) {
    console.warn(
      `⚠ Could not load team data from ${TEAM_DATA_PATH}; using fallback team QR list.`,
    );
    return fallbackTeamCodes.map((qr) => ({ ...qr, folder: "team" }));
  }
}

function buildFinalQRCodeList() {
  // Replace static team entries with live team-data driven entries.
  const withoutStaticTeams = QR_CODES.filter(
    (qr) => !qr.name.startsWith("team-"),
  );

  // Build safety manual section entries from SAFETY_MANUAL_SECTIONS
  const safetySectionCodes = SAFETY_MANUAL_SECTIONS.map((s) => ({
    name: `safety-section-${s.number}`,
    url: `${BASE_URL}/resources/safety-manual/section/${s.slug}`,
    description: `Safety Manual Section ${s.number}: ${s.title}`,
    label: `MISH SECTION ${s.number}`,
    folder: "safety-sections",
  }));

  const merged = [
    ...withoutStaticTeams,
    ...safetySectionCodes,
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
    console.log(`✓ Created directory: ${OUTPUT_DIR}`);
  }
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
    r: parseInt(LEATHER_TAN.slice(1, 3), 16),
    g: parseInt(LEATHER_TAN.slice(3, 5), 16),
    b: parseInt(LEATHER_TAN.slice(5, 7), 16),
  };

  const hunterGreen = {
    r: parseInt(HUNTER_GREEN.slice(1, 3), 16),
    g: parseInt(HUNTER_GREEN.slice(3, 5), 16),
    b: parseInt(HUNTER_GREEN.slice(5, 7), 16),
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
        font-family="Arial, sans-serif"
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
  const shouldColorFinders = variant === "color"; // Only color finders for color variant

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
    const qrImage = await sharp(tempColoredPath);
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

    console.log(
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
    outputDirectory: "public/images/qr-codes",
    folders,
    variants: {
      color: {
        description:
          "Color QR codes with MH brand colors (Hunter Green & Leather Tan)",
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
  console.log(`\n✓ Generated manifest: qr-codes-manifest.json`);

  return manifest;
}

/**
 * Generate usage documentation
 */
function generateUsageDoc(manifest) {
  const successCount = manifest.qrCodes.filter((q) => q.success).length;
  const totalCount = manifest.qrCodes.length;

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
    return `### ${status} ${qr.description}
- **Name:** \`${qr.name}\`
- **File:** \`${qr.relativePath || qr.filename}\`
- **URL:** ${qr.url}
${qr.error ? `- **Error:** ${qr.error}` : ""}
`;
  })
  .join("\n")}

## Usage in React Components

### Import the QRCode component:

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
  console.log(`✓ Generated documentation: README.md`);
}

/**
 * Main execution
 */
async function main() {
  console.log("🎯 MH Construction QR Code Generator\n");
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Output: ${OUTPUT_DIR}`);
  console.log(`Variants: color, bw\n`);

  // Ensure output directory exists
  ensureOutputDir();

  const qrCodes = buildFinalQRCodeList();

  // Generate all QR codes (2 variants each)
  console.log("Generating QR codes...\n");
  const allTasks = [];

  // Generate two variants for each QR code
  for (const qrCode of qrCodes) {
    allTasks.push(generateQRCode(qrCode, "color"));
    allTasks.push(generateQRCode(qrCode, "bw"));
  }

  const results = await Promise.all(allTasks);

  // Generate manifest and documentation
  const manifest = generateManifest(results);
  generateUsageDoc(manifest);

  // Summary
  const successCount = results.filter((r) => r.success).length;
  const failCount = results.filter((r) => !r.success).length;
  const uniqueQRCount = qrCodes.length;

  console.log("\n" + "=".repeat(50));
  console.log(`✅ Successfully generated: ${successCount} QR code files`);
  console.log(
    `   (${uniqueQRCount} unique QR codes × 2 variants = ${successCount})`,
  );
  if (failCount > 0) {
    console.log(`❌ Failed: ${failCount} QR code files`);
  }
  console.log("=".repeat(50) + "\n");

  console.log("📁 Files created:");
  console.log(`   ${OUTPUT_DIR}/`);
  console.log(`   ├── qr-codes-manifest.json`);
  console.log(`   ├── README.md`);

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
        console.log(`   ├── ${entry.relativePath || entry.filename}`);
      });
    });

  if (Object.keys(groupedResults).length > 5) {
    console.log(
      `   └── ... and ${(Object.keys(groupedResults).length - 5) * 2} more files`,
    );
  }

  console.log("\n✨ Done! QR codes are ready for marketing use.\n");
  console.log("📋 Two variants available for each QR code:");
  console.log("   • Color (with MH branding colors)");
  console.log("   • Black & White (for any background)\n");
}

// Run the script
main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
