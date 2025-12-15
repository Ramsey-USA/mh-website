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
const BASE_URL = "https://mhc-gc.com";

// Output directory
const OUTPUT_DIR = path.join(__dirname, "../public/images/qr-codes");

// Logo paths
const LOGO_COLOR = path.join(__dirname, "../public/images/logo/mh-logo.png");
const LOGO_BW = path.join(__dirname, "../public/images/logo/mh-logo-black.png");

// Brand colors
const HUNTER_GREEN = "#386851";
const LEATHER_TAN = "#BD9264";
const WHITE = "#FFFFFF";
const BLACK = "#000000";

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
    label: "mhc-gc.com",
  },
  {
    name: "about",
    url: `${BASE_URL}/about`,
    description: "About Us",
    label: "mhc-gc.com/about",
  },
  {
    name: "services",
    url: `${BASE_URL}/services`,
    description: "Our Services",
    label: "mhc-gc.com/services",
  },
  {
    name: "projects",
    url: `${BASE_URL}/projects`,
    description: "Our Projects",
    label: "mhc-gc.com/projects",
  },
  {
    name: "team",
    url: `${BASE_URL}/team`,
    description: "Our Team",
    label: "mhc-gc.com/team",
  },
  {
    name: "careers",
    url: `${BASE_URL}/careers`,
    description: "Careers",
    label: "mhc-gc.com/careers",
  },
  {
    name: "contact",
    url: `${BASE_URL}/contact`,
    description: "Contact Us",
    label: "mhc-gc.com/contact",
  },
  {
    name: "booking",
    url: `${BASE_URL}/booking`,
    description: "Schedule Consultation",
    label: "mhc-gc.com/booking",
  },

  // Special pages
  {
    name: "estimator",
    url: `${BASE_URL}/estimator`,
    description: "AI Project Estimator",
    label: "mhc-gc.com/estimator",
  },
  {
    name: "case-studies",
    url: `${BASE_URL}/case-studies`,
    description: "Case Studies",
    label: "mhc-gc.com/case-studies",
  },
  {
    name: "allies",
    url: `${BASE_URL}/allies`,
    description: "Allies",
    label: "mhc-gc.com/allies",
  },
  {
    name: "trade-partners",
    url: `${BASE_URL}/allies`,
    description: "Trade Partners",
    label: "mhc-gc.com/allies",
  },
  {
    name: "veteran-benefits",
    url: `${BASE_URL}/veteran-benefits`,
    description: "Veteran Benefits",
    label: "mhc-gc.com/veteran-benefits",
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
    url: "https://www.linkedin.com/company/mh-construction-general-contractor/posts/?feedView=all",
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
    name: "team-trigger",
    url: `${BASE_URL}/team#trigger`,
    description: "Trigger - Chief Morale Officer",
    label: "TRIGGER 🐕",
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
];

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
  const filename = `qr-${qrData.name}${suffix}.png`;
  const filepath = path.join(OUTPUT_DIR, filename);
  const tempFilepath = path.join(OUTPUT_DIR, `temp-${filename}`);
  const tempColoredPath = path.join(OUTPUT_DIR, `temp-colored-${filename}`);

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
      `✓ Generated: ${filename} → ${qrData.description} (${variant})`,
    );
    return { success: true, filename, variant, ...qrData };
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
  const manifest = {
    generatedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    outputDirectory: "public/images/qr-codes",
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

## Available QR Codes

${manifest.qrCodes
  .map((qr) => {
    const status = qr.success ? "✅" : "❌";
    return `### ${status} ${qr.description}
- **Name:** \`${qr.name}\`
- **File:** \`${qr.filename}\`
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
<img src="/images/qr-codes/qr-homepage.png" alt="QR Code for Homepage" />
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

  // Generate all QR codes (2 variants each)
  console.log("Generating QR codes...\n");
  const allTasks = [];

  // Generate two variants for each QR code
  for (const qrCode of QR_CODES) {
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
  const uniqueQRCount = QR_CODES.length;

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

  Object.keys(groupedResults)
    .slice(0, 5)
    .forEach((name) => {
      console.log(`   ├── qr-${name}-color.png`);
      console.log(`   ├── qr-${name}-bw.png`);
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
