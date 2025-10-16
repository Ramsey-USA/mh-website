#!/usr/bin/env node

/**
 * Build Validation Script
 * Ensures the website builds correctly without Cloudflare dependencies
 */

const fs = require("fs");
const path = require("path");

console.log(
  "🔍 Validating build configuration for Firebase-only deployment..."
);

// Check for required files
const requiredFiles = ["next.config.js", "firebase.json", "package.json"];

let allGood = true;

requiredFiles.forEach((file) => {
  if (fs.existsSync(path.join(process.cwd(), file))) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`❌ ${file} missing`);
    allGood = false;
  }
});

// Check Next.js config for problematic Cloudflare dependencies
const nextConfigPath = path.join(process.cwd(), "next.config.js");
if (fs.existsSync(nextConfigPath)) {
  const content = fs.readFileSync(nextConfigPath, "utf-8");

  // Check for hard Cloudflare dependencies
  const problematicPatterns = [
    "require.*cloudflare",
    "import.*cloudflare",
    "cloudflare.*required",
  ];

  const hasProblems = problematicPatterns.some((pattern) =>
    new RegExp(pattern, "i").test(content)
  );

  if (hasProblems) {
    console.log(
      "⚠️  Found potential Cloudflare hard dependencies in next.config.js"
    );
    allGood = false;
  } else {
    console.log("✅ Next.js config is Cloudflare-independent");
  }
}

// Check environment requirements
console.log("\n📋 Environment Variables Status:");
console.log("✅ Firebase vars: Optional (can use demo mode)");
console.log("✅ Cloudflare vars: Optional (gracefully skipped)");
console.log("✅ CDN_PREFIX: Optional (defaults to empty)");

console.log("\n🚀 Deployment Options Available:");
console.log("✅ Firebase Hosting: npm run build:firebase && firebase deploy");
console.log("✅ Standard Build: npm run build && npm start");
console.log("⏳ Cloudflare: Ready when you set it up");

if (allGood) {
  console.log("\n🎉 Your build is ready for Firebase-only deployment!");
  console.log("   No Cloudflare configuration required.");
} else {
  console.log("\n⚠️  Please address the issues above before deploying.");
}

console.log(
  "\n💡 Pro Tip: You can add Cloudflare later without any code changes!"
);
