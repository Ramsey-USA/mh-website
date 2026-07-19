/**
 * MH Construction - Next.js Configuration
 *
 * Optimized for Next.js 16 with Cloudflare Workers deployment (OpenNext adapter)
 * Production-ready configuration with performance optimizations
 *
 * @see https://nextjs.org/docs/app/api-reference/next-config-js
 * @see docs/project/architecture.md
 * @version 2.2.0
 * @lastUpdated 2026-04-29
 */

// Disable telemetry during CI/production builds
process.env.NEXT_TELEMETRY_DISABLED = "1";

// Required for local development when code reads Cloudflare bindings
// through getCloudflareContext() (KV, D1, R2, etc.).
const { initOpenNextCloudflareForDev } = require("@opennextjs/cloudflare");
initOpenNextCloudflareForDev({ remoteBindings: false }).catch((error) => {
  console.warn(
    "[next.config.js] Cloudflare dev context init failed; continuing without bindings",
    error,
  );
});

// ── Build-time environment guard ──────────────────────────────────────────────
// NEXT_PUBLIC_SITE_URL is baked into the client bundle at build time.
// If missing, canonical URLs, OG tags, and sitemap links will be wrong.
// Note: RESEND_API_KEY and JWT_SECRET are Cloudflare Workers *runtime* secrets
// (injected via dashboard bindings) — they are NOT available during `next build`
// and must NOT be checked here.
if (
  process.env.NODE_ENV === "production" &&
  !process.env.NEXT_PUBLIC_SITE_URL
) {
  // Keep canonical URLs stable in production builds even when env bindings are
  // not present at build time (for example in local CI smoke builds).
  process.env.NEXT_PUBLIC_SITE_URL = "https://www.mhc-gc.com";
}

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const createNextIntlPlugin = require("next-intl/plugin");
const path = require("node:path");
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
const isLowMemoryBuild = process.env.LOW_MEMORY_BUILD === "true";
const enableNextExperiments = process.env.NEXT_ENABLE_EXPERIMENTS === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // === PERFORMANCE OPTIMIZATIONS ===
  compress: true, // Enable gzip compression
  productionBrowserSourceMaps: false, // Disable source maps in production

  // Transpile ESM-only packages so next/jest transforms them in tests
  transpilePackages: ["jose"],

  // Target modern browsers to reduce polyfills
  // Matches browserslist: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

  ...(enableNextExperiments
    ? {
        experimental: {
          // Reduce build worker pressure in constrained containers.
          // Also disable when NEXT_PRIVATE_STANDALONE=true (OpenNext): spawning
          // webpack workers alongside standalone file-tracing exhausts available
          // memory in the devcontainer, causing the build process to be SIGTERM'd.
          webpackBuildWorker:
            !isLowMemoryBuild && process.env.NEXT_PRIVATE_STANDALONE !== "true",
          // CSS optimization - cssChunking defaults to true for better splitting
          // Tree-shake large packages at compile time (experimental in Next.js 16)
          optimizePackageImports: [
            "@radix-ui/react-slot",
            "@radix-ui/react-tabs",
            "@radix-ui/react-progress",
            "recharts",
          ],
        },
      }
    : {}),

  // Exclude build-tool node_modules from the trace step (~20s savings)
  outputFileTracingExcludes: {
    "*": [
      "node_modules/@swc/core-linux-x64-gnu/**/*",
      "node_modules/@swc/core-linux-x64-musl/**/*",
      "node_modules/@esbuild/**/*",
      "node_modules/webpack/**/*",
      "node_modules/typescript/**/*",
      "node_modules/jest-worker/**/*",
      "node_modules/jest-resolve/**/*",
      "node_modules/jest-runtime/**/*",
      "node_modules/eslint/**/*",
      "node_modules/@eslint/**/*",
      "node_modules/eslint-*/**/*",
      "node_modules/tailwindcss/**/*",
      "node_modules/postcss/**/*",
      "node_modules/autoprefixer/**/*",
      "node_modules/@next/bundle-analyzer/**/*",
      "node_modules/husky/**/*",
      "node_modules/@commitlint/**/*",
      // @react-email/render is NOT installed (see peerDependencyRules in
      // package.json). This entry guards against future re-installation so the
      // package + its prettier dependency (~10 MiB) are never traced into the
      // Cloudflare Worker bundle.
      "node_modules/@react-email/**/*",
      "node_modules/prettier/**/*",
      "node_modules/@prettier/**/*",
      "node_modules/markdownlint-cli2/**/*",
      "node_modules/cspell/**/*",
    ],
  },

  // === BUILD CONFIGURATION ===
  compiler: {
    // Preserve console.error in production so runtime errors remain visible
    // in Cloudflare Workers logs. Only strip debug/info/warn logs.
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },

  // Type checking is handled by ci:gate (npm run type-check) — skip during
  // next build to save ~22s. Errors still caught pre-merge.
  typescript: {
    ignoreBuildErrors: true,
  },

  // Build directories
  distDir: ".next",
  cleanDistDir: true,

  // === SECURITY ===
  poweredByHeader: false,

  // Allow Codespaces / devcontainer host preview origins to reach the HMR
  // websocket without being blocked by Next.js cross-origin protection.
  // Production builds ignore this field.
  allowedDevOrigins: ["127.0.0.1", "localhost", "*.app.github.dev"],

  // === WEBPACK CUSTOMIZATION ===
  webpack: (config, { dev, isServer }) => {
    // Exclude backup directories from compilation
    config.module.rules.push({
      test: /\.(ts|tsx|js|jsx)$/,
      exclude: [/node_modules/, /backups/, /\.backup\./, /\.next/],
    });

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

    // Enhanced module resolution
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
      // Shared lib: @/lib/<module> → packages/shared/src/lib/<module>
      ...Object.fromEntries(
        sharedLibs.map((lib) => [`@/lib/${lib}`, path.join(sharedRoot, lib)]),
      ),
      // resend v6 declares @react-email/render as an optional peer dependency.
      // We do NOT install it (it is excluded from package.json `dependencies` and
      // `pnpm.peerDependencyRules.ignoreMissing`) because it transitively depends
      // on `prettier` (~10 MiB), which would balloon the Cloudflare Worker bundle.
      // This alias is a defence-in-depth guard so the Next.js webpack build also
      // treats the import as an empty module if it is somehow resolved.
      "@react-email/render": false,
    };

    // Production optimizations
    if (!dev) {
      // Enable persistent caching for faster rebuilds (all build targets)
      config.cache = {
        type: "filesystem",
        compression: isLowMemoryBuild ? false : "gzip",
      };
    }

    if (!dev && !isServer && !isLowMemoryBuild) {
      // Better code splitting
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            default: false,
            vendors: false,
            // Framework chunk (React, Next.js)
            framework: {
              name: "framework",
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
              priority: 40,
              enforce: true,
            },
            // Recharts chunk (lazy-loaded only when needed)
            recharts: {
              test: /[\\/]node_modules[\\/]recharts[\\/]/,
              name: "recharts",
              priority: 35,
              reuseExistingChunk: true,
            },
            // Lib chunk (large dependencies)
            lib: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                const packageName = module.context?.match(
                  /[/\\]node_modules[/\\](.*?)(?:[/\\]|$)/,
                )?.[1];
                return `npm.${packageName?.replace("@", "") ?? "vendor"}`;
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            // Commons chunk (shared code)
            commons: {
              name: "commons",
              minChunks: 2,
              priority: 20,
            },
          },
          maxInitialRequests: 25,
          minSize: 20000,
        },
        runtimeChunk: {
          name: "runtime",
        },
      };
    }

    return config;
  },

  // === IMAGE OPTIMIZATION ===
  // CF Workers has no `sharp` runtime, so Next.js server-side image resizing
  // and format conversion (AVIF/WebP) cannot run at request time.
  // Images are pre-converted to WebP/WebM by the GitHub Actions optimize workflow
  // (npm run optimize:images). Serve them as-is from the ASSETS binding.
  images: {
    formats: ["image/webp"], // Pre-converted by CI; AVIF excluded (requires sharp)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Allow the quality values used at <Image quality="..." /> call sites.
    // Default is [75]; we use 20 (LQIP/blur), 72 (project cards), and 85
    // (high-fidelity logos).
    qualities: [20, 72, 75, 85],
    minimumCacheTTL: 2592000, // 30 days — safe because Next.js uses content-hash URLs
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: true, // Required for CF Workers — no sharp available at runtime
    remotePatterns: [],
  },

  // === REDIRECTS ===
  async redirects() {
    return [
      {
        source: "/partners",
        destination: "/allies",
        permanent: true, // 301
      },
      {
        source: "/trade-partners",
        destination: "/allies",
        permanent: true, // 301
      },
      {
        source: "/government",
        destination: "/public-sector",
        permanent: true, // 301
      },
      {
        source: "/book",
        destination: "/contact",
        permanent: true, // 301
      },
      {
        source: "/safety/hub",
        destination: "/safety",
        permanent: true, // 301
      },
    ];
  },

  // === HEADERS ===
  async headers() {
    // Long-lived immutable cache headers for build outputs are PRODUCTION ONLY.
    // Applying them in dev breaks Next.js HMR / fast refresh because Turbopack
    // serves chunks from /_next/static with content hashes that the browser
    // would otherwise refuse to refetch. (Next.js logs a warning in dev.)
    const isProd = process.env.NODE_ENV === "production";
    const prodOnly = (entries) => (isProd ? entries : []);

    return [
      // Cache HTML pages at the edge while revalidating frequently.
      // Excludes API routes, static assets, and authenticated surfaces.
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: String.raw`/:path((?!api|admin|dashboard|_next|.*\..*).*)`,
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
      // Cache static assets (production only — dev keeps default no-cache so
      // edited images refresh without a hard reload)
      ...prodOnly([
        {
          source: "/:all*(svg|jpg|jpeg|png|webp|avif|gif)",
          headers: [
            {
              key: "Cache-Control",
              value: "public, max-age=31536000, immutable",
            },
          ],
        },
        // Cache Next.js build chunks (main.js, etc.)
        {
          source: "/:path*.js",
          headers: [
            {
              key: "Cache-Control",
              value:
                "public, max-age=604800, s-maxage=2592000, stale-while-revalidate=86400",
            },
          ],
        },
        // Cache CSS files
        {
          source: "/:path*.css",
          headers: [
            {
              key: "Cache-Control",
              value:
                "public, max-age=604800, s-maxage=2592000, stale-while-revalidate=86400",
            },
          ],
        },
      ]),
      // Service worker must never be cached — browsers check for updates on
      // every navigation. A stale sw.js blocks PWA version updates for users.
      // This rule comes AFTER the broad /:path*.js rule so it takes precedence.
      {
        source: "/sw.js",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Service-Worker-Allowed",
            value: "/",
          },
        ],
      },
      // Cache fonts
      {
        source: "/:path*.(woff|woff2|eot|ttf|otf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

module.exports = withBundleAnalyzer(withNextIntl(nextConfig));
