#!/usr/bin/env node
/* eslint-disable no-console, @typescript-eslint/no-require-imports */
/**
 * Lighthouse Testing Guide
 * Since headless Chrome doesn't work well in dev containers,
 * here's how to get your Lighthouse scores:
 */

const chalk = require("chalk");
const http = require("http");

console.log(`\n${chalk.bold.blue("🚀 Lighthouse Testing Guide")}\n`);
console.log(
  `${chalk.yellow("Note:")} Headless Chrome crashes in dev containers due to resource limitations.\n`,
);
console.log(chalk.bold("✅ WORKING SOLUTIONS:\n"));

console.log(
  chalk.bold.green("1. Use PageSpeed Insights (Recommended for Production):"),
);
console.log(`   • Visit: ${chalk.cyan("https://pagespeed.web.dev/")}`);
console.log("   • Enter your deployed URL");
console.log(
  "   • Get instant scores for Performance, Accessibility, Best Practices, and SEO\n",
);

console.log(
  chalk.bold.green("2. Use Chrome DevTools (Best for Local Development):"),
);
console.log("   • Open your site in Chrome or Edge");
console.log(`   • Press ${chalk.cyan("F12")} to open DevTools`);
console.log(`   • Click the ${chalk.cyan("Lighthouse")} tab`);
console.log(
  `   • Select categories and click ${chalk.cyan('"Analyze page load"')}`,
);
console.log("   • Review your scores and recommendations\n");

console.log(chalk.bold.green("3. Use Lighthouse CLI (On your Local Machine):"));
console.log("   If you have the project running locally (not in a container):");
console.log(`   ${chalk.cyan("npm install -g @lhci/cli lighthouse")}`);
console.log(`   ${chalk.cyan("lhci collect --url=http://localhost:3000/")}`);
console.log("   Or:");
console.log(`   ${chalk.cyan("lighthouse http://localhost:3000/ --view\n")}`);

console.log(chalk.bold.green("4. Use VS Code Extension:"));
console.log(
  `   Install: ${chalk.cyan("Kanmi Levers Guard - SEO & Performance Linter")}`,
);
console.log("   • Provides real-time performance diagnostics");
console.log("   • Catches SEO & performance issues while coding\n");

console.log(chalk.bold.green("5. Online Tools (For Deployed Sites):"));
console.log(`   • GTmetrix: ${chalk.cyan("https://gtmetrix.com/")}`);
console.log(`   • WebPageTest: ${chalk.cyan("https://webpagetest.org/")}`);
console.log("   • Google Search Console: Core Web Vitals report\n");

// Check if local server is running
console.log(chalk.bold("📋 Checking local server status...\n"));

const req = http.get("http://localhost:3000/", (res) => {
  console.log(chalk.green("✅ Next.js dev server is running!"));
  console.log(chalk.gray(`   Status: ${res.statusCode}`));
  console.log(chalk.gray("   URL: http://localhost:3000/\n"));
  console.log(chalk.bold.cyan("🎯 Quick Action:"));
  console.log(`   1. Open ${chalk.cyan("http://localhost:3000/")} in Chrome`);
  console.log("   2. Press F12 → Lighthouse tab");
  console.log('   3. Click "Analyze page load"\n');
});

req.on("error", () => {
  console.log(chalk.red("❌ Next.js dev server is NOT running"));
  console.log(chalk.yellow("   Start it with: ") + chalk.cyan("npm run dev\n"));
});

req.setTimeout(5000, () => {
  req.destroy();
  console.log(chalk.yellow("⏱️  Server is slow to respond\n"));
});

console.log(chalk.bold.gray("💡 Why Container Issues Occur:"));
console.log(chalk.gray("   • Headless Chrome requires significant RAM"));
console.log(
  chalk.gray("   • Containers have limited shared memory (/dev/shm)"),
);
console.log(chalk.gray("   • GPU acceleration is disabled in containers"));
console.log(
  chalk.gray("   • This is a known limitation, not a bug in your code\n"),
);
