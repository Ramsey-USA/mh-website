#!/usr/bin/env node

/**
 * Build Performance Monitor
 * Tracks and reports build times with detailed analysis
 */

const { performance } = require("perf_hooks");
const fs = require("fs");
const path = require("path");

const startTime = performance.now();
const startDate = new Date();

console.log("🚀 Build Performance Monitor Started");
console.log(`📅 Start time: ${startDate.toLocaleString()}`);
console.log("⏱️  Monitoring build process...\n");

// Create logs directory if it doesn't exist
const logsDir = "logs";
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Monitor process exit
process.on("exit", () => {
  const endTime = performance.now();
  const buildTime = ((endTime - startTime) / 1000).toFixed(2);
  const endDate = new Date();

  console.log(`\n📊 Build Performance Report`);
  console.log(`============================`);
  console.log(`⏱️  Total build time: ${buildTime}s`);
  console.log(`📅 Completed: ${endDate.toLocaleString()}`);

  // Performance classification
  let status = "";
  if (buildTime < 25) {
    status = "🟢 Excellent build performance!";
    console.log(status);
  } else if (buildTime < 35) {
    status = "🟡 Good build performance";
    console.log(status);
  } else if (buildTime < 45) {
    status = "🟠 Build time acceptable but could be improved";
    console.log(status);
  } else {
    status = "🔴 Build time needs optimization";
    console.log(status);
  }

  // Log to file for tracking
  const logEntry = {
    timestamp: startDate.toISOString(),
    buildTime: parseFloat(buildTime),
    status: status,
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
    memoryUsage: process.memoryUsage(),
  };

  // Append to detailed log
  const logPath = path.join(logsDir, "build-performance.log");
  const logLine = `${JSON.stringify(logEntry)}\n`;
  fs.appendFileSync(logPath, logLine);

  // Simple time log for quick reference
  const simpleLogPath = path.join(logsDir, "build-times.log");
  const simpleEntry = `${startDate.toISOString()}: ${buildTime}s\n`;
  fs.appendFileSync(simpleLogPath, simpleEntry);

  console.log(`\n📝 Performance logged to: ${logPath}`);
  console.log(`📋 Quick times logged to: ${simpleLogPath}`);

  // Show improvement suggestions if needed
  if (buildTime > 35) {
    console.log(`\n💡 Optimization Suggestions:`);
    console.log(`   1. Clear Next.js cache: rm -rf .next`);
    console.log(`   2. Clear npm cache: npm cache clean --force`);
    console.log(`   3. Try fast build: npm run build:fast`);
    console.log(`   4. Profile memory: npm run build:profile`);
    console.log(
      `   5. Check for large files: find src -name "*.ts" -o -name "*.tsx" | xargs wc -l | sort -n`
    );
  }
});

// Monitor for SIGINT (Ctrl+C)
process.on("SIGINT", () => {
  console.log("\n⚠️  Build interrupted by user");
  process.exit(1);
});

// Monitor for SIGTERM
process.on("SIGTERM", () => {
  console.log("\n⚠️  Build terminated");
  process.exit(1);
});
