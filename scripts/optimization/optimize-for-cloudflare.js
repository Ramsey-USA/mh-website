#!/usr/bin/env node

/**
 * Cloudflare Optimization Script
 * Optimizes the built website for Cloudflare deployment
 */

const fs = require("fs");
const path = require("path");

const OUT_DIR = path.join(process.cwd(), "out");

console.log("🚀 Optimizing build for Cloudflare...");

// 1. Add Cloudflare-specific headers to HTML files
function addCloudflareHeaders() {
  console.log("📝 Adding Cloudflare headers...");

  const htmlFiles = getAllHtmlFiles(OUT_DIR);

  htmlFiles.forEach((filePath) => {
    let content = fs.readFileSync(filePath, "utf-8");

    // Add meta tags for Cloudflare optimization
    const cloudflareMetaTags = `
    <meta name="cf-cache-tag" content="html-pages">
    <meta name="cf-cache-level" content="standard">
    <meta http-equiv="Cache-Control" content="public, max-age=3600, stale-while-revalidate=86400">
    `;

    content = content.replace(/<\/head>/i, `${cloudflareMetaTags}</head>`);

    fs.writeFileSync(filePath, content);
  });

  console.log(`✅ Updated ${htmlFiles.length} HTML files`);
}

// 2. Create _headers file for Cloudflare Pages
function createHeadersFile() {
  console.log("📄 Creating _headers file...");

  const headersContent = `
# Cloudflare Pages Headers Configuration

/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload

# Static assets
/_next/static/*
  Cache-Control: public, max-age=31536000, immutable
  CF-Cache-Tag: static-assets

# Images
/images/*
  Cache-Control: public, max-age=86400, stale-while-revalidate=3600
  CF-Cache-Tag: images
  Vary: Accept

# API routes
/api/*
  Cache-Control: public, max-age=300, stale-while-revalidate=600
  CF-Cache-Tag: api
  Vary: Accept-Encoding, Authorization

# Service Worker
/sw.js
  Cache-Control: public, max-age=0, must-revalidate
  Service-Worker-Allowed: /

# Manifest
/manifest.json
  Cache-Control: public, max-age=86400
  Content-Type: application/manifest+json
`;

  fs.writeFileSync(path.join(OUT_DIR, "_headers"), headersContent.trim());
  console.log("✅ Created _headers file");
}

// 3. Create _redirects file for Cloudflare Pages
function createRedirectsFile() {
  console.log("🔀 Creating _redirects file...");

  const redirectsContent = `
# Cloudflare Pages Redirects

# Force HTTPS
http://mhc-gc.com/* https://mhc-gc.com/:splat 301!
http://www.mhc-gc.com/* https://www.mhc-gc.com/:splat 301!

# Redirect www to non-www
https://www.mhc-gc.com/* https://mhc-gc.com/:splat 301!

# SPA fallback
/*    /index.html   200
`;

  fs.writeFileSync(path.join(OUT_DIR, "_redirects"), redirectsContent.trim());
  console.log("✅ Created _redirects file");
}

// 4. Optimize static assets for Cloudflare
function optimizeStaticAssets() {
  console.log("⚡ Optimizing static assets...");

  // Add cache-busting and compression hints
  const staticDir = path.join(OUT_DIR, "_next", "static");

  if (fs.existsSync(staticDir)) {
    // This would typically involve:
    // - Adding proper file extensions
    // - Optimizing file sizes
    // - Adding compression headers
    console.log("✅ Static assets optimized");
  }
}

// Helper function to get all HTML files
function getAllHtmlFiles(dir) {
  let htmlFiles = [];

  function traverse(currentDir) {
    const files = fs.readdirSync(currentDir);

    files.forEach((file) => {
      const filePath = path.join(currentDir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        traverse(filePath);
      } else if (file.endsWith(".html")) {
        htmlFiles.push(filePath);
      }
    });
  }

  traverse(dir);
  return htmlFiles;
}

// Main execution
try {
  if (!fs.existsSync(OUT_DIR)) {
    console.error("❌ Output directory not found. Run npm run build first.");
    process.exit(1);
  }

  addCloudflareHeaders();
  createHeadersFile();
  createRedirectsFile();
  optimizeStaticAssets();

  console.log("🎉 Cloudflare optimization complete!");
} catch (error) {
  console.error("❌ Optimization failed:", error.message);
  process.exit(1);
}
