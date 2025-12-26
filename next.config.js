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

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // === PERFORMANCE OPTIMIZATIONS ===
  compress: true, // Enable gzip compression
  productionBrowserSourceMaps: false, // Disable source maps in production

  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "@radix-ui/react-icons",
      "react-markdown",
      "lucide-react",
      "@radix-ui/react-slot",
      "@radix-ui/react-tabs",
      "@radix-ui/react-progress",
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

  // On-demand entries configuration
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },

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
    };

    return config;
  },

  // === IMAGE OPTIMIZATION ===
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
        destination: "/booking",
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
        source: "/_next/:path*",
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
