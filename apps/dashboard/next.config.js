/**
 * MH Construction Dashboard - Next.js Configuration
 *
 * Standalone dashboard app (Operations Hub + admin pages).
 * Deploys as a separate Cloudflare Worker from the main website.
 *
 * Route ownership (configured in Cloudflare Workers dashboard):
 *   This worker: www.mhc-gc.com/dashboard*, /hub*, and all admin API routes
 *   Website worker: www.mhc-gc.com/* (everything else)
 *
 * @see apps/website/next.config.js for the companion website configuration
 */

process.env.NEXT_TELEMETRY_DISABLED = "1";

if (
  process.env.NODE_ENV === "production" &&
  !process.env.NEXT_PUBLIC_SITE_URL
) {
  console.warn(
    "[dashboard/next.config.js] NEXT_PUBLIC_SITE_URL is not set — " +
      "falling back to https://www.mhc-gc.com.",
  );
  process.env.NEXT_PUBLIC_SITE_URL = "https://www.mhc-gc.com";
}

const path = require("node:path");
const isLowMemoryBuild = process.env.LOW_MEMORY_BUILD === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  productionBrowserSourceMaps: false,

  // Transpile ESM-only packages so next/jest transforms them in tests
  transpilePackages: ["jose"],

  experimental: {
    webpackBuildWorker: !isLowMemoryBuild,
    optimizePackageImports: [
      "@radix-ui/react-slot",
      "@radix-ui/react-tabs",
      "@radix-ui/react-progress",
      "recharts",
    ],
  },

  outputFileTracingExcludes: {
    "*": [
      "node_modules/@swc/core-linux-x64-gnu/**/*",
      "node_modules/@swc/core-linux-x64-musl/**/*",
      "node_modules/@esbuild/**/*",
      "node_modules/webpack/**/*",
      "node_modules/typescript/**/*",
      "node_modules/jest-worker/**/*",
      "node_modules/@react-email/**/*",
      "node_modules/prettier/**/*",
      "node_modules/@prettier/**/*",
    ],
  },

  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  distDir: ".next",
  cleanDistDir: true,
  poweredByHeader: false,

  allowedDevOrigins: ["127.0.0.1", "localhost", "*.app.github.dev"],

  webpack: (config, { dev, isServer }) => {
    // Shared monorepo packages resolve via path alias so that `@/lib/db` etc.
    // automatically points at packages/shared regardless of which app is built.
    const sharedRoot = path.resolve(__dirname, "../../packages/shared/src/lib");
    const sharedLibs = [
      "db",
      "auth",
      "security",
      "utils",
      "constants",
      "types",
      "cloudflare",
      "api",
      "email",
      "notifications",
      "analytics",
      "monitoring",
      "safety",
    ];

    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
      // Shared lib: @/lib/<module> → packages/shared/src/lib/<module>
      ...Object.fromEntries(
        sharedLibs.map((lib) => [`@/lib/${lib}`, path.join(sharedRoot, lib)]),
      ),
      "@react-email/render": false,
    };

    if (!dev) {
      config.cache = {
        type: "filesystem",
        compression: isLowMemoryBuild ? false : "gzip",
      };
    }

    return config;
  },

  images: {
    formats: ["image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 2592000,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: true,
    remotePatterns: [],
  },

  async headers() {
    return [
      {
        source: "/:path((?!_next|.*\\..*).+)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
