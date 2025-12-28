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

  // Target modern browsers to reduce polyfills
  // Matches browserslist: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
  swcMinify: true,

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
    swcPlugins: [],
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

    // Production optimizations
    if (!dev && !isServer) {
      // Enable persistent caching for faster rebuilds
      config.cache = {
        type: "filesystem",
        compression: "gzip",
      };

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
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)(?:[\\/]|$)/,
                )?.[1];
                return `npm.${packageName?.replace("@", "")}`;
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
    minimumCacheTTL: 60,
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
      // Cache Cloudflare static resources with long TTL
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
