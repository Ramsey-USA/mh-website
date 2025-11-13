#!/usr/bin/env node

/**
 * Add QR Code Paths to Team Data
 *
 * This script automatically adds QR code image paths to each team member
 * in the team-data.json file, linking their digital profiles to business cards.
 *
 * Usage: node scripts/add-team-qr-codes.js
 */

const fs = require("fs");
const path = require("path");

// Path to team data file
const TEAM_DATA_PATH = path.join(__dirname, "../src/lib/data/team-data.json");

// QR code directory path (for reference)
const QR_CODE_DIR = "/images/qr-codes";

/**
 * Generate QR code path for a team member based on their slug
 */
function getQRCodePath(slug) {
  return `${QR_CODE_DIR}/qr-team-${slug}.png`;
}

/**
 * Main function to update team data with QR codes
 */
async function addQRCodesToTeamData() {
  console.log("🎯 Adding QR Code Paths to Team Data...\n");

  // Read team data
  const teamData = JSON.parse(fs.readFileSync(TEAM_DATA_PATH, "utf8"));
  console.log(`✓ Found ${teamData.length} team members\n`);

  let updatedCount = 0;
  let skippedCount = 0;

  // Add QR code path to each team member
  teamData.forEach((member) => {
    if (!member.slug) {
      console.log(`⚠ Skipping ${member.name} - no slug found`);
      skippedCount++;
      return;
    }

    const qrCodePath = getQRCodePath(member.slug);

    if (member.qrCode) {
      console.log(`⏭ ${member.name} - QR code already set: ${member.qrCode}`);
      skippedCount++;
    } else {
      member.qrCode = qrCodePath;
      console.log(`✓ ${member.name} - Added QR code: ${qrCodePath}`);
      updatedCount++;
    }
  });

  // Write updated data back to file
  fs.writeFileSync(TEAM_DATA_PATH, JSON.stringify(teamData, null, 2), "utf8");

  console.log("\n✅ Team data updated successfully!");
  console.log(`   Updated: ${updatedCount} members`);
  console.log(`   Skipped: ${skippedCount} members`);
  console.log(`\n📋 Next steps:`);
  console.log(`   1. Run: node scripts/generate-qr-codes.js`);
  console.log(`   2. QR codes will be generated in public/images/qr-codes/`);
  console.log(`   3. Team profiles will automatically display QR codes`);
}

// Run the script
addQRCodesToTeamData().catch((error) => {
  console.error("❌ Error:", error.message);
  process.exit(1);
});
