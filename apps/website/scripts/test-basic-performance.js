#!/usr/bin/env node
/* eslint-disable no-console, @typescript-eslint/no-require-imports, require-await */
/**
 * Basic Performance Check
 * Tests page load time and basic metrics since full Lighthouse doesn't work in containers
 */

const http = require("http");

async function testPageLoad() {
  console.log("\n🔍 Basic Performance Check\n");

  const url = "http://localhost:3000/";
  let totalTime = 0;
  let htmlSize = 0;

  return new Promise((resolve) => {
    const startTime = Date.now();

    const req = http.get(url, (res) => {
      const loadTime = Date.now() - startTime;

      console.log(`✅ Server Response:`);
      console.log(`   Status: ${res.statusCode}`);
      console.log(`   Time: ${loadTime}ms`);

      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        htmlSize = Buffer.byteLength(data, "utf8");
        totalTime = Date.now() - startTime;

        console.log(`\n📊 Page Metrics:`);
        console.log(`   HTML Size: ${(htmlSize / 1024).toFixed(2)} KB`);
        console.log(`   Total Load Time: ${totalTime}ms`);

        // Simple scoring
        console.log(`\n📈 Quick Assessment:`);
        if (loadTime < 200) {
          console.log(`   ⚡ Server Response: Excellent (${loadTime}ms)`);
        } else if (loadTime < 500) {
          console.log(`   ✓ Server Response: Good (${loadTime}ms)`);
        } else {
          console.log(
            `   ⚠ Server Response: Could be improved (${loadTime}ms)`,
          );
        }

        if (htmlSize < 50000) {
          console.log(
            `   ⚡ HTML Size: Excellent (${(htmlSize / 1024).toFixed(2)} KB)`,
          );
        } else if (htmlSize < 100000) {
          console.log(
            `   ✓ HTML Size: Good (${(htmlSize / 1024).toFixed(2)} KB)`,
          );
        } else {
          console.log(
            `   ⚠ HTML Size: Large (${(htmlSize / 1024).toFixed(2)} KB)`,
          );
        }

        console.log(`\n💡 For complete Lighthouse scores:`);
        console.log(`   Run: node lighthouse-guide.js\n`);

        resolve();
      });
    });

    req.on("error", (err) => {
      console.log(`❌ Error: ${err.message}`);
      console.log(`   Make sure the server is running: npm run dev\n`);
      resolve();
    });

    req.setTimeout(10000, () => {
      req.destroy();
      console.log(`❌ Request timed out after 10 seconds\n`);
      resolve();
    });
  });
}

testPageLoad().catch(console.error);
