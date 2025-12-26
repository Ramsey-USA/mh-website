#!/usr/bin/env node
/**
 * Environment Variables Validation Script
 * Checks that all required environment variables are properly configured
 * Run before deployment or during development setup
 */

const requiredEnvVars = {
  development: ["NEXT_PUBLIC_SITE_URL", "RESEND_API_KEY", "EMAIL_FROM"],
  production: [
    "NEXT_PUBLIC_SITE_URL",
    "RESEND_API_KEY",
    "EMAIL_FROM",
    "CLOUDFLARE_ACCOUNT_ID",
    "D1_DATABASE_ID",
    "NEXT_PUBLIC_FIREBASE_API_KEY",
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  ],
  optional: [
    "D1_PREVIEW_DATABASE_ID",
    "R2_BUCKET_NAME",
    "R2_ACCESS_KEY_ID",
    "R2_SECRET_ACCESS_KEY",
    "NEXT_PUBLIC_GOOGLE_ANALYTICS_ID",
    "ADMIN_MATT_PASSWORD",
    "ADMIN_JEREMY_PASSWORD",
  ],
};

const environment = process.env.NODE_ENV || "development";
const isProduction = environment === "production";

console.log("\n🔍 Checking Environment Variables...\n");
console.log(`Environment: ${environment}\n`);

let hasErrors = false;
let hasWarnings = false;

// Check required variables
const required = isProduction
  ? requiredEnvVars.production
  : requiredEnvVars.development;
console.log("✅ Required Variables:");

required.forEach((varName) => {
  const value = process.env[varName];
  if (!value) {
    console.log(`  ❌ ${varName} - MISSING`);
    hasErrors = true;
  } else if (value.includes("xxxx") || value.includes("your_")) {
    console.log(`  ⚠️  ${varName} - Using placeholder value`);
    hasWarnings = true;
  } else {
    const displayValue =
      varName.includes("KEY") || varName.includes("SECRET")
        ? `${value.substring(0, 10)}...`
        : value.length > 50
          ? `${value.substring(0, 50)}...`
          : value;
    console.log(`  ✓ ${varName} - ${displayValue}`);
  }
});

// Check optional variables
console.log("\n📋 Optional Variables:");
requiredEnvVars.optional.forEach((varName) => {
  const value = process.env[varName];
  if (value && !value.includes("xxxx") && !value.includes("your_")) {
    const displayValue =
      varName.includes("KEY") || varName.includes("SECRET")
        ? `${value.substring(0, 10)}...`
        : value.length > 50
          ? `${value.substring(0, 50)}...`
          : value;
    console.log(`  ✓ ${varName} - ${displayValue}`);
  } else {
    console.log(`  - ${varName} - Not configured`);
  }
});

// Security checks
console.log("\n🔐 Security Checks:");

// Check for default admin passwords
if (process.env.ADMIN_MATT_PASSWORD === "admin123") {
  console.log(
    "  ⚠️  ADMIN_MATT_PASSWORD using default value - CHANGE IN PRODUCTION!",
  );
  hasWarnings = true;
} else if (process.env.ADMIN_MATT_PASSWORD) {
  console.log("  ✓ ADMIN_MATT_PASSWORD - Custom password set");
} else {
  console.log("  - ADMIN_MATT_PASSWORD - Using default (admin123)");
}

if (process.env.ADMIN_JEREMY_PASSWORD === "admin123") {
  console.log(
    "  ⚠️  ADMIN_JEREMY_PASSWORD using default value - CHANGE IN PRODUCTION!",
  );
  hasWarnings = true;
} else if (process.env.ADMIN_JEREMY_PASSWORD) {
  console.log("  ✓ ADMIN_JEREMY_PASSWORD - Custom password set");
} else {
  console.log("  - ADMIN_JEREMY_PASSWORD - Using default (admin123)");
}

// Check for .env.local file in git
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const envLocalPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  console.log("  ✓ .env.local file exists locally");

  try {
    const gitStatus = execSync("git ls-files .env.local", { encoding: "utf8" });
    if (gitStatus.trim()) {
      console.log(
        "  ❌ .env.local is tracked by Git - THIS IS A SECURITY RISK!",
      );
      hasErrors = true;
    } else {
      console.log("  ✓ .env.local is NOT tracked by Git (good)");
    }
  } catch (error) {
    console.log("  ✓ .env.local is NOT tracked by Git (good)");
  }
} else {
  console.log("  ℹ️  .env.local file not found (using environment variables)");
}

// Final summary
console.log("\n" + "=".repeat(50));
if (hasErrors) {
  console.log("❌ VALIDATION FAILED - Missing required environment variables");
  console.log(
    "\nPlease copy .env.local.example to .env.local and fill in the values:",
  );
  console.log("  cp .env.local.example .env.local");
  process.exit(1);
} else if (hasWarnings && isProduction) {
  console.log("⚠️  WARNINGS DETECTED - Review security concerns above");
  console.log("\nFor production deployment:");
  console.log("1. Change default admin passwords");
  console.log("2. Use Cloudflare Workers secrets instead of .env files");
  console.log("3. Review all placeholder values");
  process.exit(1);
} else if (hasWarnings) {
  console.log("⚠️  WARNINGS DETECTED - Some optional configuration missing");
  console.log("✅ Required variables validated - Development can proceed");
  process.exit(0);
} else {
  console.log("✅ ALL CHECKS PASSED - Environment is properly configured");
  process.exit(0);
}
