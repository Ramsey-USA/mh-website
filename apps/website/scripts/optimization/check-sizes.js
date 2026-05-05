#!/usr/bin/env node
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const dir = path.join(__dirname, "../../public/images");

async function scan(d) {
  const entries = fs.readdirSync(d, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(d, e.name);
    if (e.isDirectory()) {
      await scan(full);
    } else if (/\.webp$/i.test(e.name)) {
      // Only check WebP files — these are what browsers actually download.
      // Source JPG/PNG originals are kept as archives but not served.
      const rel = full.replace(dir + path.sep, "");
      const m = await sharp(full).metadata();
      const skip = rel.includes("qr-codes") || e.name.startsWith("og-default");
      if (m.width > 1920 && !skip) {
        console.log("OVERSIZED WebP: " + rel + " " + m.width + "x" + m.height);
      }
    }
  }
}

scan(dir)
  .then(() => console.log("Scan complete — no oversized images above."))
  .catch(console.error);
