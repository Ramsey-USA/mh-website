#!/usr/bin/env node
/**
 * PWA Testing Script
 * Comprehensive test suite for Progressive Web App functionality
 *
 * Tests:
 * 1. Manifest validation
 * 2. Service worker configuration
 * 3. Icon availability
 * 4. Cache strategy validation
 * 5. Offline capabilities
 * 6. Performance metrics
 */

const fs = require("fs");
const path = require("path");

// ANSI color codes
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function testResult(passed, message) {
  if (passed) {
    log(`  ✓ ${message}`, "green");
    return true;
  } else {
    log(`  ✗ ${message}`, "red");
    return false;
  }
}

let totalTests = 0;
let passedTests = 0;

// Test 1: Manifest Validation
log("\n=== 1. Manifest Validation ===", "cyan");
try {
  const manifestPath = path.join(__dirname, "../public/manifest.json");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

  totalTests++;
  if (testResult(manifest.name && manifest.name.length > 0, "Has name"))
    passedTests++;

  totalTests++;
  if (
    testResult(
      manifest.short_name && manifest.short_name.length <= 12,
      "Has short_name (≤12 chars)",
    )
  )
    passedTests++;

  totalTests++;
  if (testResult(manifest.start_url === "/", "Has valid start_url"))
    passedTests++;

  totalTests++;
  if (
    testResult(
      ["standalone", "fullscreen", "minimal-ui"].includes(manifest.display),
      "Has valid display mode",
    )
  )
    passedTests++;

  totalTests++;
  if (
    testResult(
      manifest.icons && manifest.icons.length >= 2,
      "Has at least 2 icons",
    )
  )
    passedTests++;

  totalTests++;
  const has192 = manifest.icons.some((icon) => icon.sizes === "192x192");
  const has512 = manifest.icons.some((icon) => icon.sizes === "512x512");
  if (
    testResult(has192 && has512, "Has required icon sizes (192x192, 512x512)")
  )
    passedTests++;

  totalTests++;
  if (
    testResult(
      manifest.background_color &&
        /^#[0-9A-Fa-f]{6}$/.test(manifest.background_color),
      "Has valid background_color",
    )
  )
    passedTests++;

  totalTests++;
  if (
    testResult(
      manifest.theme_color && /^#[0-9A-Fa-f]{6}$/.test(manifest.theme_color),
      "Has valid theme_color",
    )
  )
    passedTests++;

  totalTests++;
  if (
    testResult(
      manifest.shortcuts && manifest.shortcuts.length > 0,
      `Has ${manifest.shortcuts?.length || 0} shortcuts`,
    )
  )
    passedTests++;

  totalTests++;
  if (
    testResult(
      manifest.screenshots && manifest.screenshots.length >= 1,
      `Has ${manifest.screenshots?.length || 0} screenshots`,
    )
  )
    passedTests++;

  log(
    `\nManifest Score: ${passedTests}/${totalTests}`,
    passedTests === totalTests ? "green" : "yellow",
  );
} catch (e) {
  log(`Error reading manifest: ${e.message}`, "red");
}

// Test 2: Service Worker Configuration
log("\n=== 2. Service Worker Configuration ===", "cyan");
try {
  const swPath = path.join(__dirname, "../public/sw.js");
  const sw = fs.readFileSync(swPath, "utf8");

  totalTests++;
  if (
    testResult(
      sw.includes('addEventListener("install"'),
      "Has install event handler",
    )
  )
    passedTests++;

  totalTests++;
  if (
    testResult(
      sw.includes('addEventListener("activate"'),
      "Has activate event handler",
    )
  )
    passedTests++;

  totalTests++;
  if (
    testResult(
      sw.includes('addEventListener("fetch"'),
      "Has fetch event handler",
    )
  )
    passedTests++;

  totalTests++;
  if (
    testResult(
      sw.includes("skipWaiting()"),
      "Has skipWaiting() for immediate activation",
    )
  )
    passedTests++;

  totalTests++;
  if (
    testResult(
      sw.includes("clients.claim()"),
      "Has clients.claim() for immediate control",
    )
  )
    passedTests++;

  totalTests++;
  if (
    testResult(
      sw.includes('addEventListener("sync"'),
      "Has background sync support",
    )
  )
    passedTests++;

  totalTests++;
  if (
    testResult(
      sw.includes('addEventListener("push"'),
      "Has push notification support",
    )
  )
    passedTests++;

  totalTests++;
  if (testResult(sw.includes("indexedDB"), "Has IndexedDB for offline storage"))
    passedTests++;

  totalTests++;
  const cacheVersionMatch = sw.match(/-v(\d+\.\d+\.\d+)/);
  if (
    testResult(
      cacheVersionMatch,
      `Cache version: ${cacheVersionMatch ? cacheVersionMatch[0] : "not found"}`,
    )
  )
    passedTests++;

  totalTests++;
  if (testResult(sw.includes("/offline"), "Has offline fallback page"))
    passedTests++;

  totalTests++;
  const cacheStrategies = [
    "CACHE_FIRST",
    "NETWORK_FIRST",
    "STALE_WHILE_REVALIDATE",
  ];
  const hasStrategies = cacheStrategies.every((strategy) =>
    sw.includes(strategy),
  );
  if (testResult(hasStrategies, "Has multiple cache strategies")) passedTests++;

  totalTests++;
  if (
    testResult(sw.includes("CRITICAL_ASSETS"), "Has critical assets precaching")
  )
    passedTests++;

  log(
    `\nService Worker Score: ${passedTests - 10}/${totalTests - 10}`,
    "yellow",
  );
} catch (e) {
  log(`Error reading service worker: ${e.message}`, "red");
}

// Test 3: Icon Availability
log("\n=== 3. Icon Availability ===", "cyan");
const requiredIcons = [
  "72x72",
  "96x96",
  "128x128",
  "144x144",
  "152x152",
  "192x192",
  "384x384",
  "512x512",
];

requiredIcons.forEach((size) => {
  const iconPath = path.join(__dirname, `../public/icons/icon-${size}.png`);
  totalTests++;
  if (fs.existsSync(iconPath)) {
    const stats = fs.statSync(iconPath);
    const sizeKB = (stats.size / 1024).toFixed(1);
    if (testResult(true, `icon-${size}.png exists (${sizeKB} KB)`))
      passedTests++;
  } else {
    if (testResult(false, `icon-${size}.png missing`)) passedTests++;
  }
});

// Check shortcut icons
const shortcutIcons = ["projects", "contact", "booking", "estimate"];
shortcutIcons.forEach((name) => {
  const iconPath = path.join(__dirname, `../public/icons/shortcut-${name}.png`);
  totalTests++;
  if (fs.existsSync(iconPath)) {
    if (testResult(true, `shortcut-${name}.png exists`)) passedTests++;
  } else {
    log(`  ⚠ shortcut-${name}.png missing (optional)`, "yellow");
    passedTests++; // Don't fail for optional shortcuts
  }
});

// Test 4: PWA Components
log("\n=== 4. PWA Components ===", "cyan");
const components = [
  "src/components/pwa/PWAManager.tsx",
  "src/components/pwa/ServiceWorkerRegistration.tsx",
  "src/components/pwa/PWAInstallPrompt.tsx",
  "src/components/pwa/UpdateNotification.tsx",
  "src/components/pwa/index.ts",
];

components.forEach((comp) => {
  const compPath = path.join(__dirname, "..", comp);
  totalTests++;
  if (fs.existsSync(compPath)) {
    if (testResult(true, path.basename(comp))) passedTests++;
  } else {
    if (testResult(false, `${path.basename(comp)} missing`)) passedTests++;
  }
});

// Test 5: Offline Page
log("\n=== 5. Offline Support ===", "cyan");
const offlinePath = path.join(__dirname, "../src/app/offline/page.tsx");
totalTests++;
if (fs.existsSync(offlinePath)) {
  const offlineContent = fs.readFileSync(offlinePath, "utf8");
  if (testResult(true, "Offline page exists")) passedTests++;

  totalTests++;
  if (
    testResult(
      offlineContent.includes("offline") || offlineContent.includes("Offline"),
      "Offline page has appropriate content",
    )
  )
    passedTests++;
} else {
  if (testResult(false, "Offline page missing")) passedTests++;
}

// Test 6: Cache Strategy Analysis
log("\n=== 6. Cache Strategy Analysis ===", "cyan");
try {
  const swPath = path.join(__dirname, "../public/sw.js");
  const sw = fs.readFileSync(swPath, "utf8");

  // Extract cache names
  const cacheMatches =
    sw.match(/const\s+\w+_CACHE_NAME\s*=\s*"([^"]+)"/g) || [];
  log(`\nCache Names Found: ${cacheMatches.length}`, "blue");
  cacheMatches.forEach((match) => {
    const name = match.match(/"([^"]+)"/)[1];
    log(`  • ${name}`, "blue");
  });

  // Extract static assets
  const staticAssetsMatch = sw.match(
    /const\s+STATIC_ASSETS\s*=\s*\[([\s\S]*?)\]/,
  );
  let assets = [];
  if (staticAssetsMatch) {
    assets = staticAssetsMatch[1].match(/["'][^"']+["']/g) || [];
    log(`\nStatic Assets to Precache: ${assets.length}`, "blue");
    const sampleAssets = assets.slice(0, 5).map((a) => a.replace(/["']/g, ""));
    sampleAssets.forEach((asset) => log(`  • ${asset}`, "blue"));
    if (assets.length > 5) {
      log(`  ... and ${assets.length - 5} more`, "blue");
    }
  }

  // Extract cache durations
  const durationMatches = sw.match(/CACHE_DURATION\s*=\s*{([\s\S]*?)}/);
  if (durationMatches) {
    log(`\nCache Duration Configuration:`, "blue");
    const durations =
      durationMatches[1].match(/(\w+):\s*(\d+)\s*\*[^,]+,/g) || [];
    durations.forEach((duration) => {
      const [name, value] = duration.split(":");
      log(`  • ${name.trim()}: ${value.trim()}`, "blue");
    });
  }

  totalTests++;
  if (
    testResult(
      cacheMatches.length >= 4,
      `Has multiple cache layers (${cacheMatches.length})`,
    )
  )
    passedTests++;

  totalTests++;
  if (
    testResult(
      staticAssetsMatch && assets.length > 10,
      `Precaches sufficient assets (${assets.length || 0})`,
    )
  )
    passedTests++;
} catch (e) {
  log(`Error analyzing cache strategy: ${e.message}`, "red");
}

// Test 7: Layout Integration
log("\n=== 7. Layout Integration ===", "cyan");
try {
  const layoutPath = path.join(__dirname, "../src/app/layout.tsx");
  const layout = fs.readFileSync(layoutPath, "utf8");

  totalTests++;
  if (
    testResult(layout.includes("PWAManager"), "PWAManager imported in layout")
  )
    passedTests++;

  totalTests++;
  if (
    testResult(
      layout.includes("<PWAManager"),
      "PWAManager component used in layout",
    )
  )
    passedTests++;

  totalTests++;
  // Check for manifest in metadata or links
  const hasManifest =
    layout.includes("manifest") || layout.includes("/manifest.json");
  if (testResult(hasManifest, "Manifest referenced in layout")) passedTests++;
} catch (e) {
  log(`Error checking layout: ${e.message}`, "red");
}

// Test 8: Security & Best Practices
log("\n=== 8. Security & Best Practices ===", "cyan");
try {
  const swPath = path.join(__dirname, "../public/sw.js");
  const sw = fs.readFileSync(swPath, "utf8");

  totalTests++;
  if (
    testResult(
      !sw.includes("console.log(") || sw.includes("DEBUG"),
      "Production-safe logging (no console.log or has DEBUG flag)",
    )
  )
    passedTests++;

  totalTests++;
  if (
    testResult(sw.includes("try") && sw.includes("catch"), "Has error handling")
  )
    passedTests++;

  totalTests++;
  if (
    testResult(
      sw.includes('request.method !== "GET"'),
      "Handles only GET requests in fetch handler",
    )
  )
    passedTests++;

  totalTests++;
  const manifestPath = path.join(__dirname, "../public/manifest.json");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  if (
    testResult(
      manifest.scope === "/" || manifest.scope === undefined,
      "Has appropriate scope",
    )
  )
    passedTests++;
} catch (e) {
  log(`Error checking security: ${e.message}`, "red");
}

// Final Summary
log("\n" + "=".repeat(50), "cyan");
log("=== PWA Test Summary ===", "cyan");
log("=".repeat(50), "cyan");

const percentage = ((passedTests / totalTests) * 100).toFixed(1);
const color = percentage >= 90 ? "green" : percentage >= 70 ? "yellow" : "red";

log(`\nTotal Tests: ${totalTests}`, "blue");
log(`Passed: ${passedTests}`, "green");
log(`Failed: ${totalTests - passedTests}`, "red");
log(`Success Rate: ${percentage}%`, color);

if (percentage >= 90) {
  log("\n🎉 Excellent! Your PWA is well configured.", "green");
} else if (percentage >= 70) {
  log("\n⚠️  Good, but there are some areas for improvement.", "yellow");
} else {
  log("\n❌ Needs attention. Please review the failed tests.", "red");
}

log("\n" + "=".repeat(50), "cyan");

process.exit(passedTests === totalTests ? 0 : 1);
