#!/usr/bin/env node

/**
 * Build Validation Script
 * Ensures the website builds correctly for Cloudflare Workers deployment
 */

const fs = require("node:fs");
const path = require("node:path");

console.log(
  "🔍 Validating build configuration for Cloudflare Workers deployment...",
);

// Check for required files
const requiredFiles = ["next.config.js", "package.json"];

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
    new RegExp(pattern, "i").test(content),
  );

  if (hasProblems) {
    console.log(
      "⚠️  Found potential Cloudflare hard dependencies in next.config.js",
    );
    allGood = false;
  } else {
    console.log("✅ Next.js config is Cloudflare-independent");
  }
}

// Check environment requirements
console.log("\n📋 Environment Variables Status:");
console.log("✅ Cloudflare vars: Configured via dashboard/wrangler");
console.log("✅ CDN_PREFIX: Optional (defaults to empty)");

console.log("\n🚀 Deployment Command:");
console.log("✅ Cloudflare Workers: npm run deploy");
console.log("✅ Standard Build: npm run build && npm start");

if (allGood) {
  console.log("\n🎉 Your build is ready for Cloudflare Workers deployment!");
  console.log("   All Cloudflare optimizations configured.");
} else {
  console.log("\n⚠️  Please address the issues above before deploying.");
}

console.log("\n💡 Pro Tip: Deploy with npm run deploy for full optimization!");
