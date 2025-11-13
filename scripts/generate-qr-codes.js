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

// Logo path
const LOGO_PATH = path.join(__dirname, "../public/images/logo/mh-logo.png");

// Brand colors
const HUNTER_GREEN = "#386851";
const LEATHER_TAN = "#BD9264";
const WHITE = "#FFFFFF";

// QR Code configuration
const QR_OPTIONS = {
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

// Define all QR codes to generate
const QR_CODES = [
  // Main pages
  { name: "homepage", url: BASE_URL, description: "MH Construction Homepage" },
  { name: "about", url: `${BASE_URL}/about`, description: "About Us" },
  {
    name: "services",
    url: `${BASE_URL}/services`,
    description: "Our Services",
  },
  {
    name: "projects",
    url: `${BASE_URL}/projects`,
    description: "Our Projects",
  },
  { name: "team", url: `${BASE_URL}/team`, description: "Our Team" },
  { name: "careers", url: `${BASE_URL}/careers`, description: "Careers" },
  { name: "contact", url: `${BASE_URL}/contact`, description: "Contact Us" },
  {
    name: "booking",
    url: `${BASE_URL}/booking`,
    description: "Schedule Consultation",
  },

  // Special pages
  {
    name: "estimator",
    url: `${BASE_URL}/estimator`,
    description: "AI Project Estimator",
  },
  {
    name: "case-studies",
    url: `${BASE_URL}/case-studies`,
    description: "Case Studies",
  },
  {
    name: "trade-partners",
    url: `${BASE_URL}/trade-partners`,
    description: "Trade Partners",
  },
  {
    name: "veteran-benefits",
    url: `${BASE_URL}/veteran-benefits`,
    description: "Veteran Benefits",
  },

  // Contact methods
  {
    name: "phone",
    url: "tel:+15093086489",
    description: "Call Us: (509) 308-6489",
  },
  {
    name: "email",
    url: "mailto:office@mhc-gc.com",
    description: "Email: office@mhc-gc.com",
  },

  // Social media (actual links from Footer.tsx)
  {
    name: "linkedin",
    url: "https://linkedin.com/company/mhconstruction",
    description: "LinkedIn Profile",
  },
  {
    name: "facebook",
    url: "https://www.facebook.com/profile.php?id=61575511773974",
    description: "Facebook Page",
  },
  {
    name: "instagram",
    url: "https://www.instagram.com/mh_construction_inc/reels/",
    description: "Instagram Profile",
  },
  {
    name: "youtube",
    url: "https://youtube.com/@mhconstruction",
    description: "YouTube Channel",
  },
  {
    name: "twitter",
    url: "https://x.com/mhc_gc",
    description: "X (Twitter) Profile",
  },

  // Location
  {
    name: "location",
    url: "https://maps.google.com/?q=3111+N.+Capital+Ave.,+Pasco,+WA+99301",
    description: "Our Location",
  },

  // Team member profiles
  {
    name: "team-jeremy-thamert",
    url: `${BASE_URL}/team#jeremy-thamert`,
    description: "Jeremy Thamert - Owner & President",
  },
  {
    name: "team-mike-holstein",
    url: `${BASE_URL}/team#mike-holstein`,
    description: "Mike Holstein - Founder",
  },
  {
    name: "team-todd-schoeff",
    url: `${BASE_URL}/team#todd-schoeff`,
    description: "Todd Schoeff - VP of Field Operations",
  },
  {
    name: "team-brooks-morris",
    url: `${BASE_URL}/team#brooks-morris`,
    description: "Brooks Morris - Safety Director",
  },
  {
    name: "team-matt-ramsey",
    url: `${BASE_URL}/team#matt-ramsey`,
    description: "Matt Ramsey - Project Manager",
  },
  {
    name: "team-porter-cline",
    url: `${BASE_URL}/team#porter-cline`,
    description: "Porter Cline - Project Manager",
  },
  {
    name: "team-derek-parks",
    url: `${BASE_URL}/team#derek-parks`,
    description: "Derek Parks - Chief Estimator",
  },
  {
    name: "team-ben-woodall",
    url: `${BASE_URL}/team#ben-woodall`,
    description: "Ben Woodall - Estimator",
  },
  {
    name: "team-steve-mcclary",
    url: `${BASE_URL}/team#steve-mcclary`,
    description: "Steve McClary - Senior Superintendent",
  },
  {
    name: "team-arnold-garcia",
    url: `${BASE_URL}/team#arnold-garcia`,
    description: "Arnold Garcia - Field Superintendent",
  },
  {
    name: "team-trigger",
    url: `${BASE_URL}/team#trigger`,
    description: "Trigger - Chief Morale Officer",
  },
  {
    name: "team-lisa-kandle",
    url: `${BASE_URL}/team#lisa-kandle`,
    description: "Lisa Kandle - Office Manager",
  },
  {
    name: "team-reagan-massey",
    url: `${BASE_URL}/team#reagan-massey`,
    description: "Reagan Massey - Executive Assistant",
  },
  {
    name: "team-brittney-holstein",
    url: `${BASE_URL}/team#brittney-holstein`,
    description: "Brittney Holstein - Project Coordinator",
  },
  {
    name: "team-makayla-holstein",
    url: `${BASE_URL}/team#makayla-holstein`,
    description: "Makayla Holstein - Accounting Specialist",
  },
  {
    name: "team-jennifer-tenehuerta",
    url: `${BASE_URL}/team#jennifer-tenehuerta`,
    description: "Jennifer Tenehuerta - Payroll & HR Coordinator",
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
 * Generate a single QR code with logo overlay and colored finder patterns
 */
async function generateQRCode(qrData) {
  const filename = `qr-${qrData.name}.png`;
  const filepath = path.join(OUTPUT_DIR, filename);
  const tempFilepath = path.join(OUTPUT_DIR, `temp-${filename}`);
  const tempColoredPath = path.join(OUTPUT_DIR, `temp-colored-${filename}`);

  try {
    // Step 1: Generate base QR code to temporary file
    await QRCode.toFile(tempFilepath, qrData.url, QR_OPTIONS);

    // Step 2: Color the finder patterns (corner squares) with Leather Tan
    const qrBuffer = fs.readFileSync(tempFilepath);
    const qrMetadata = await sharp(qrBuffer).metadata();
    const coloredQRBuffer = await colorFinderPatterns(
      qrBuffer,
      qrMetadata.width,
      qrMetadata.height,
    );

    // Save colored QR code
    await sharp(coloredQRBuffer).toFile(tempColoredPath);

    // Step 3: Add logo overlay using sharp
    const qrImage = await sharp(tempColoredPath);
    const metadata = await qrImage.metadata();

    // Logo should be about 20% of QR code size (with error correction H, up to 30% can be covered)
    const logoSize = Math.floor(metadata.width * 0.2);

    // Prepare logo with white background circle for better visibility
    const logo = await sharp(LOGO_PATH)
      .resize(logoSize, logoSize, {
        fit: "contain",
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      })
      .toBuffer();

    // Create white circle background for logo
    const circleSize = Math.floor(logoSize * 1.2);
    const circleSvg = `
      <svg width="${circleSize}" height="${circleSize}">
        <circle cx="${circleSize / 2}" cy="${circleSize / 2}" r="${circleSize / 2}" fill="white"/>
      </svg>
    `;

    const circleBackground = await sharp(Buffer.from(circleSvg))
      .png()
      .toBuffer();

    // Calculate center position
    const centerX = Math.floor((metadata.width - circleSize) / 2);
    const centerY = Math.floor((metadata.height - circleSize) / 2);

    const logoOffsetX = Math.floor((circleSize - logoSize) / 2);
    const logoOffsetY = Math.floor((circleSize - logoSize) / 2);

    // Composite: QR code + white circle + logo
    await sharp(tempColoredPath)
      .composite([
        {
          input: circleBackground,
          top: centerY,
          left: centerX,
        },
        {
          input: logo,
          top: centerY + logoOffsetY,
          left: centerX + logoOffsetX,
        },
      ])
      .toFile(filepath);

    // Clean up temporary files
    fs.unlinkSync(tempFilepath);
    fs.unlinkSync(tempColoredPath);

    console.log(`✓ Generated: ${filename} → ${qrData.description}`);
    return { success: true, filename, ...qrData };
  } catch (error) {
    console.error(`✗ Failed: ${filename} - ${error.message}`);
    // Clean up temp files if they exist
    if (fs.existsSync(tempFilepath)) {
      fs.unlinkSync(tempFilepath);
    }
    if (fs.existsSync(tempColoredPath)) {
      fs.unlinkSync(tempColoredPath);
    }
    return { success: false, filename, error: error.message, ...qrData };
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
    qrCodeOptions: QR_OPTIONS,
    qrCodes: results.map((r) => ({
      name: r.name,
      filename: r.filename,
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
  console.log(`Output: ${OUTPUT_DIR}\n`);

  // Ensure output directory exists
  ensureOutputDir();

  // Generate all QR codes
  console.log("Generating QR codes...\n");
  const results = await Promise.all(QR_CODES.map(generateQRCode));

  // Generate manifest and documentation
  const manifest = generateManifest(results);
  generateUsageDoc(manifest);

  // Summary
  const successCount = results.filter((r) => r.success).length;
  const failCount = results.filter((r) => !r.success).length;

  console.log("\n" + "=".repeat(50));
  console.log(`✅ Successfully generated: ${successCount} QR codes`);
  if (failCount > 0) {
    console.log(`❌ Failed: ${failCount} QR codes`);
  }
  console.log("=".repeat(50) + "\n");

  console.log("📁 Files created:");
  console.log(`   ${OUTPUT_DIR}/`);
  console.log(`   ├── qr-codes-manifest.json`);
  console.log(`   ├── README.md`);
  results.forEach((r) => {
    if (r.success) {
      console.log(`   ├── ${r.filename}`);
    }
  });

  console.log("\n✨ Done! QR codes are ready to use.\n");
}

// Run the script
main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
