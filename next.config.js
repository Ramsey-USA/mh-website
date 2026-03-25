/**
 * MH Construction - Next.js Configuration
 *
 * Optimized for Next.js 15 with Cloudflare Pages deployment
 * Production-ready configuration with performance optimizations
 *
 * @see https://nextjs.org/docs/app/api-reference/next-config-js
 * @see docs/technical/configuration-guide.md
 * @version 2.1.0
 * @lastUpdated 2025-12-25
 */

// Disable telemetry during CI/production builds
process.env.NEXT_TELEMETRY_DISABLED = "1";

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
  // Apply the production fallback so the build can proceed; canonical URLs will
  // still be correct since the fallback matches the live domain.
  // To silence this warning, add NEXT_PUBLIC_SITE_URL=https://www.mhc-gc.com
  // in the Cloudflare Pages dashboard (Settings → Environment variables).
  console.warn(
    "[next.config.js] NEXT_PUBLIC_SITE_URL is not set — " +
      "falling back to https://www.mhc-gc.com. " +
      "Add it to the Cloudflare Pages dashboard to suppress this warning.",
  );
  process.env.NEXT_PUBLIC_SITE_URL = "https://www.mhc-gc.com";
}

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // === PERFORMANCE OPTIMIZATIONS ===
  compress: true, // Enable gzip compression
  productionBrowserSourceMaps: false, // Disable source maps in production

  // Target modern browsers to reduce polyfills
  // Matches browserslist: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
  // Note: swcMinify is enabled by default in Next.js 13+

  experimental: {
    optimizePackageImports: [
      "@radix-ui/react-slot",
      "@radix-ui/react-tabs",
      "@radix-ui/react-progress",
    ],
    // CSS optimization - cssChunking defaults to true for better splitting
  },

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
      "node_modules/markdownlint-cli2/**/*",
      "node_modules/cspell/**/*",
    ],
  },

  // === BUILD CONFIGURATION ===
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // ESLint configuration - disable during builds, use npm run lint instead
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Build directories
  distDir: ".next",
  cleanDistDir: true,

  // === SECURITY ===
  poweredByHeader: false,

  // === WEBPACK CUSTOMIZATION ===
  webpack: (config, { dev, isServer }) => {
    // Exclude backup directories from compilation
    config.module.rules.push({
      test: /\.(ts|tsx|js|jsx)$/,
      exclude: [/node_modules/, /backups/, /\.backup\./, /\.next/],
    });

    // Enhanced module resolution
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": require("path").resolve(__dirname, "src"),
      // resend v6 optionally requires @react-email/render which is not installed;
      // stub it out so the edge bundler doesn't emit a module-not-found warning.
      "@react-email/render": false,
    };

    // Production optimizations
    if (!dev) {
      // Enable persistent caching for faster rebuilds (all build targets)
      config.cache = {
        type: "filesystem",
        compression: "gzip",
      };
    }

    if (!dev && !isServer) {
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
            // Separate framer-motion into its own chunk
            motion: {
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              name: "framer-motion",
              priority: 35,
              reuseExistingChunk: true,
            },
            // Lib chunk (large dependencies)
            lib: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                const packageName = module.context?.match(
                  /[\/\\]node_modules[\/\\](.*?)(?:[\/\\]|$)/,
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
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 2592000, // 30 days — safe because Next.js uses content-hash URLs
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Optimize for mobile
    unoptimized: false,
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
    ];
  },

  // === HEADERS ===
  async headers() {
    return [
      // Cache static assets
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|gif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Cache Next.js static files (CSS, JS bundles)
      {
        source: "/_next/static/:path*",
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

module.exports = withBundleAnalyzer(nextConfig);
