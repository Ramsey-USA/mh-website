#!/usr/bin/env node

/**
 * Post-Optimization Cleanup Analysis
 * Identifies redundant code and configurations after Firebase/Cloudflare optimizations
 */

const fs = require("fs");
const path = require("path");

console.log(
  "🔍 Analyzing codebase for redundant code after optimizations...\n"
);

const issues = [];
const recommendations = [];

// Check for duplicate Next.js configurations
function checkNextConfigDuplicates() {
  const configs = ["next.config.js", "config/build/next.config.js"];

  const existingConfigs = configs.filter((config) =>
    fs.existsSync(path.join(process.cwd(), config))
  );

  if (existingConfigs.length > 1) {
    issues.push({
      type: "DUPLICATE_CONFIG",
      severity: "HIGH",
      files: existingConfigs,
      description: "Multiple Next.js configurations detected",
    });
  }
}

// Check for duplicate Firebase configurations
function checkFirebaseConfigDuplicates() {
  const configs = ["firebase.json", "config/deployment/firebase.json"];

  const existingConfigs = configs.filter((config) =>
    fs.existsSync(path.join(process.cwd(), config))
  );

  if (existingConfigs.length > 1) {
    // Check if they're identical
    try {
      const content1 = fs.readFileSync(existingConfigs[0], "utf-8");
      const content2 = fs.readFileSync(existingConfigs[1], "utf-8");

      if (content1 === content2) {
        issues.push({
          type: "IDENTICAL_DUPLICATE",
          severity: "MEDIUM",
          files: existingConfigs,
          description:
            "Identical Firebase configurations - safe to remove duplicate",
        });
      } else {
        issues.push({
          type: "CONFLICTING_DUPLICATE",
          severity: "HIGH",
          files: existingConfigs,
          description:
            "Different Firebase configurations - requires manual review",
        });
      }
    } catch (error) {
      issues.push({
        type: "READ_ERROR",
        severity: "MEDIUM",
        files: existingConfigs,
        description: "Could not compare Firebase configurations",
      });
    }
  }
}

// Check for optimization script redundancy
function checkOptimizationScripts() {
  const optimizationDir = "scripts/optimization";

  if (fs.existsSync(optimizationDir)) {
    const scripts = fs.readdirSync(optimizationDir);

    // Check for old optimization scripts that might be redundant
    const redundantScripts = scripts.filter(
      (script) =>
        script.includes("old") ||
        script.includes("backup") ||
        script.includes("temp")
    );

    if (redundantScripts.length > 0) {
      issues.push({
        type: "REDUNDANT_SCRIPTS",
        severity: "LOW",
        files: redundantScripts.map((s) => `scripts/optimization/${s}`),
        description: "Old optimization scripts can be removed",
      });
    }
  }
}

// Check for unused environment templates
function checkEnvironmentFiles() {
  const envFiles = [
    ".env.local.example",
    ".env.local.firebase-only",
    ".env.example",
  ];

  const existingEnvFiles = envFiles.filter((file) =>
    fs.existsSync(path.join(process.cwd(), file))
  );

  if (existingEnvFiles.length > 2) {
    recommendations.push({
      type: "ENV_CONSOLIDATION",
      description: "Consider consolidating environment template files",
      files: existingEnvFiles,
      suggestion: "Keep .env.local.example as primary template",
    });
  }
}

// Check for backup files from optimization process
function checkBackupFiles() {
  const backupPatterns = [
    "**/*.backup",
    "**/*.backup.*",
    "**/backup-*",
    "backups/import-standardization-*",
    "backups/cleanup-*",
  ];

  // Look for old backup directories
  const backupsDir = "backups";
  if (fs.existsSync(backupsDir)) {
    const entries = fs.readdirSync(backupsDir);
    const oldBackups = entries.filter((entry) => {
      const fullPath = path.join(backupsDir, entry);
      const stats = fs.statSync(fullPath);
      if (stats.isDirectory()) {
        // Check if backup is older than 30 days
        const age = Date.now() - stats.mtime.getTime();
        return age > 30 * 24 * 60 * 60 * 1000; // 30 days
      }
      return false;
    });

    if (oldBackups.length > 0) {
      recommendations.push({
        type: "OLD_BACKUPS",
        description: "Old backup directories can be archived or removed",
        files: oldBackups.map((b) => `backups/${b}`),
        suggestion: "Archive backups older than 30 days",
      });
    }
  }
}

// Check for test files in production paths
function checkTestFiles() {
  const testPatterns = [
    "src/app/test",
    "src/app/phase*-test",
    "src/app/analytics-demo",
  ];

  testPatterns.forEach((pattern) => {
    if (fs.existsSync(pattern)) {
      issues.push({
        type: "TEST_IN_PRODUCTION",
        severity: "MEDIUM",
        files: [pattern],
        description: "Test routes should not be in production build",
      });
    }
  });
}

// Check for unused dependencies in optimization scripts
function checkUnusedDependencies() {
  const packageJsonPath = "package.json";

  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

    // Check for optimization-specific dependencies that might not be needed
    const optimizationDeps = [
      "@next/bundle-analyzer",
      "webpack-bundle-analyzer",
    ];

    const unusedDeps = optimizationDeps.filter(
      (dep) =>
        packageJson.dependencies?.[dep] || packageJson.devDependencies?.[dep]
    );

    if (unusedDeps.length > 0) {
      recommendations.push({
        type: "OPTIONAL_DEPENDENCIES",
        description: "Optional optimization dependencies",
        files: unusedDeps,
        suggestion: "These can be removed if not actively used for analysis",
      });
    }
  }
}

// Run all checks
checkNextConfigDuplicates();
checkFirebaseConfigDuplicates();
checkOptimizationScripts();
checkEnvironmentFiles();
checkBackupFiles();
checkTestFiles();
checkUnusedDependencies();

// Generate report
console.log("📋 CLEANUP ANALYSIS RESULTS");
console.log("===========================\n");

if (issues.length === 0) {
  console.log("✅ No critical redundancy issues found!\n");
} else {
  console.log("🚨 ISSUES REQUIRING ATTENTION:\n");

  issues.forEach((issue, index) => {
    const severity =
      issue.severity === "HIGH"
        ? "🔴"
        : issue.severity === "MEDIUM"
          ? "🟡"
          : "🟢";

    console.log(`${severity} ${index + 1}. ${issue.description}`);
    console.log(`   Type: ${issue.type}`);
    console.log(`   Files: ${issue.files.join(", ")}`);
    console.log("");
  });
}

if (recommendations.length > 0) {
  console.log("💡 OPTIMIZATION RECOMMENDATIONS:\n");

  recommendations.forEach((rec, index) => {
    console.log(`${index + 1}. ${rec.description}`);
    if (rec.files) {
      console.log(`   Files: ${rec.files.join(", ")}`);
    }
    if (rec.suggestion) {
      console.log(`   Suggestion: ${rec.suggestion}`);
    }
    console.log("");
  });
}

// Generate cleanup script if issues found
if (issues.length > 0 || recommendations.length > 0) {
  console.log("🛠️  AUTOMATED CLEANUP AVAILABLE");
  console.log("===============================\n");
  console.log(
    "Run: node scripts/cleanup/post-optimization-cleanup.js --execute"
  );
  console.log(
    "This will create a detailed cleanup script for safe execution.\n"
  );
}

console.log("✅ Analysis complete!");
