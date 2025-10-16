#!/usr/bin/env node

/**
 * Post-Optimization Cleanup Script
 * Safely removes redundant code and configurations
 */

const fs = require("fs");
const path = require("path");

console.log("🧹 Post-Optimization Cleanup Script");
console.log("===================================\n");

const BACKUP_DIR = `backups/post-optimization-cleanup-${new Date().toISOString().slice(0, 16).replace(/:/g, "")}`;

function createBackup(filePath, description) {
  if (fs.existsSync(filePath)) {
    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }

    const fileName = path.basename(filePath);
    const backupPath = path.join(BACKUP_DIR, fileName);
    fs.copyFileSync(filePath, backupPath);
    console.log(`📦 Backed up: ${filePath} -> ${backupPath}`);
    return true;
  }
  return false;
}

function removeFile(filePath, description) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`🗑️  Removed: ${filePath} (${description})`);
    return true;
  }
  return false;
}

function removeDirectory(dirPath, description) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
    console.log(`🗑️  Removed directory: ${dirPath} (${description})`);
    return true;
  }
  return false;
}

// Check if running with --execute flag
const execute = process.argv.includes("--execute");

if (!execute) {
  console.log("🔍 DRY RUN MODE - No files will be modified");
  console.log("Add --execute flag to perform actual cleanup\n");
}

console.log("📋 CLEANUP PLAN:\n");

// 1. Handle duplicate configurations
console.log("1️⃣ CONFIGURATION CLEANUP");
console.log("========================");

// Compare and resolve Next.js config duplication
if (
  fs.existsSync("next.config.js") &&
  fs.existsSync("config/build/next.config.js")
) {
  console.log("📄 Next.js Configuration:");

  try {
    const rootConfig = fs.readFileSync("next.config.js", "utf-8");
    const buildConfig = fs.readFileSync("config/build/next.config.js", "utf-8");

    if (rootConfig === buildConfig) {
      console.log("   ✅ Files are identical - safe to remove duplicate");
      if (execute) {
        createBackup("config/build/next.config.js", "duplicate next.config.js");
        removeFile("config/build/next.config.js", "duplicate configuration");
      }
    } else {
      console.log("   ⚠️  Files differ - manual review required");
      console.log("   📝 Action: Keep root next.config.js (tooling standard)");
      if (execute) {
        createBackup("config/build/next.config.js", "old next.config.js");
        removeFile("config/build/next.config.js", "superseded configuration");
      }
    }
  } catch (error) {
    console.log("   ❌ Error comparing Next.js configs:", error.message);
  }
}

// Handle Firebase config duplication
if (
  fs.existsSync("firebase.json") &&
  fs.existsSync("config/deployment/firebase.json")
) {
  console.log("📄 Firebase Configuration:");

  try {
    const rootConfig = fs.readFileSync("firebase.json", "utf-8");
    const deployConfig = fs.readFileSync(
      "config/deployment/firebase.json",
      "utf-8",
    );

    if (rootConfig === deployConfig) {
      console.log("   ✅ Files are identical - safe to remove duplicate");
      if (execute) {
        createBackup(
          "config/deployment/firebase.json",
          "duplicate firebase.json",
        );
        removeFile(
          "config/deployment/firebase.json",
          "duplicate configuration",
        );
      }
    } else {
      console.log(
        "   ⚠️  Files differ - keeping root version (enhanced with optimizations)",
      );
      if (execute) {
        createBackup("config/deployment/firebase.json", "old firebase.json");
        removeFile(
          "config/deployment/firebase.json",
          "superseded configuration",
        );
      }
    }
  } catch (error) {
    console.log("   ❌ Error comparing Firebase configs:", error.message);
  }
}

console.log("");

// 2. Remove test routes from production
console.log("2️⃣ TEST ROUTE CLEANUP");
console.log("=====================");

const testRoutes = [
  "src/app/test",
  "src/app/phase1-test",
  "src/app/phase2-test",
  "src/app/analytics-demo",
];

testRoutes.forEach((route) => {
  if (fs.existsSync(route)) {
    console.log(`📄 Found test route: ${route}`);
    if (execute) {
      // Create backup before removing
      const backupName = route.replace(/\//g, "_");
      const backupPath = path.join(BACKUP_DIR, backupName);
      if (!fs.existsSync(BACKUP_DIR)) {
        fs.mkdirSync(BACKUP_DIR, { recursive: true });
      }
      fs.cpSync(route, backupPath, { recursive: true });
      console.log(`📦 Backed up: ${route} -> ${backupPath}`);

      removeDirectory(route, "test route not needed in production");
    }
  }
});

console.log("");

// 3. Environment file consolidation
console.log("3️⃣ ENVIRONMENT FILE CLEANUP");
console.log("============================");

const envFiles = [
  ".env.local.example",
  ".env.local.firebase-only",
  ".env.example",
];

const existingEnvFiles = envFiles.filter((file) => fs.existsSync(file));

if (existingEnvFiles.length > 1) {
  console.log("📄 Environment template files:");
  existingEnvFiles.forEach((file) => {
    console.log(`   - ${file}`);
  });

  console.log(
    "   💡 Recommendation: Keep .env.local.example as primary template",
  );

  if (execute) {
    // Keep the most comprehensive one (.env.local.example) and remove others
    const toRemove = existingEnvFiles.filter(
      (file) => file !== ".env.local.example",
    );

    toRemove.forEach((file) => {
      createBackup(file, "redundant env template");
      removeFile(file, "redundant environment template");
    });
  }
}

console.log("");

// 4. Old backup cleanup
console.log("4️⃣ OLD BACKUP CLEANUP");
console.log("=====================");

if (fs.existsSync("backups")) {
  const backupEntries = fs.readdirSync("backups");
  const oldBackups = backupEntries.filter((entry) => {
    const fullPath = path.join("backups", entry);
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      const age = Date.now() - stats.mtime.getTime();
      return age > 30 * 24 * 60 * 60 * 1000; // 30 days
    }
    return false;
  });

  if (oldBackups.length > 0) {
    console.log("📄 Old backup directories (>30 days):");
    oldBackups.forEach((backup) => {
      console.log(`   - backups/${backup}`);
      if (execute) {
        removeDirectory(`backups/${backup}`, "old backup directory");
      }
    });
  } else {
    console.log("✅ No old backups found");
  }
}

console.log("");

// 5. Summary
console.log("📊 CLEANUP SUMMARY");
console.log("==================");

if (execute) {
  console.log("✅ Cleanup executed successfully!");
  console.log(`📦 Backups created in: ${BACKUP_DIR}`);
  console.log("");
  console.log("🔄 Next steps:");
  console.log("1. Run npm run build to verify everything works");
  console.log("2. Run npm run lint to check for issues");
  console.log("3. Test Firebase deployment: npm run firebase:deploy");
  console.log("4. If issues occur, restore from backups");
  console.log("");
  console.log("💡 To restore a file:");
  console.log(`   cp ${BACKUP_DIR}/filename original/location/filename`);
} else {
  console.log("🔍 Dry run complete - no files modified");
  console.log("");
  console.log("🚀 To execute cleanup:");
  console.log("   node scripts/cleanup/post-optimization-cleanup.js --execute");
  console.log("");
  console.log("⚠️  Always review the plan above before executing!");
}
