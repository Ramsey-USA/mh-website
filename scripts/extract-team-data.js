#!/usr/bin/env node

/**
 * Extract team data from TypeScript to JSON
 * This script converts vintage-team.ts data to team-data.json
 */

const fs = require("fs");
const path = require("path");

// Read the TypeScript file
const tsFilePath = path.join(__dirname, "../src/lib/data/vintage-team.ts");
const jsonFilePath = path.join(__dirname, "../src/lib/data/team-data.json");

const tsContent = fs.readFileSync(tsFilePath, "utf8");

// Extract the array content between the brackets
const startMarker = "export const vintageTeamMembers: VintageTeamMember[] = [";
const endMarker = "\n];";

const startIndex = tsContent.indexOf(startMarker) + startMarker.length;
const endIndex = tsContent.lastIndexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find team data array in file");
  process.exit(1);
}

const arrayContent = tsContent.substring(startIndex, endIndex).trim();

// Parse the TypeScript object notation to JSON
// This is a simple approach - evaluate the JS object literal
try {
  const teamData = eval(`[${arrayContent}]`);

  // Write to JSON file
  fs.writeFileSync(jsonFilePath, JSON.stringify(teamData, null, 2));

  console.log(
    `✅ Successfully extracted ${teamData.length} team members to team-data.json`,
  );
  console.log(`📊 File size: ${fs.statSync(jsonFilePath).size} bytes`);
} catch (error) {
  console.error("Error parsing team data:", error.message);
  process.exit(1);
}
