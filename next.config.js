/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    webpackBuildWorker: true,
    optimizeCss: true,
    optimizePackageImports: [
      "framer-motion",
      "@radix-ui/react-icons",
      "react-markdown",
    ],
  },

  // Server external packages (moved from experimental)
  serverExternalPackages: [],

  poweredByHeader: false,
  compress: true,

  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },

  // Enhanced performance configuration
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  webpack: (config, { dev, isServer }) => {
    // Enhanced filesystem caching
    config.cache = {
      type: "filesystem",
      compression: "gzip",
      maxMemoryGenerations: 1,
    };

    // Exclude backup directories from compilation
    config.module.rules.push({
      test: /\.(ts|tsx|js|jsx)$/,
      exclude: [/node_modules/, /backups/, /\.backup\./, /\.next/],
    });

    if (!dev) {
      config.optimization.minimize = true;

      // Improved chunk splitting strategy
      if (!isServer) {
        config.optimization.splitChunks = {
          chunks: "all",
          minSize: 20000,
          maxSize: 244000,
          cacheGroups: {
            // Framework chunk (React/Next.js core)
            framework: {
              test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
              name: "framework",
              chunks: "all",
              priority: 40,
              enforce: true,
            },
            // UI libraries
            ui: {
              test: /[\\/]node_modules[\\/](@radix-ui|framer-motion)[\\/]/,
              name: "ui-libs",
              chunks: "all",
              priority: 25,
            },
            // Common vendor libraries
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              chunks: "all",
              priority: 10,
              minChunks: 2,
            },
          },
        };
      }

      // Enhanced tree shaking
      config.optimization.usedExports = true;
      config.optimization.providedExports = true;
      config.optimization.sideEffects = false;
      config.optimization.innerGraph = true;
    }

    // Optimize bundle analysis performance
    config.stats = {
      chunks: false,
      chunkModules: false,
      modules: false,
      assets: false,
    };

    // Enhanced module resolution
    config.resolve.alias = {
      ...config.resolve.alias,
      // Optimize common imports
      "@": require("path").resolve(__dirname, "src"),
    };

    return config;
  },

  // Removed 'output: "standalone"' for Cloudflare Pages compatibility
  // Cloudflare Pages uses @cloudflare/next-on-pages which generates its own output
  distDir: ".next",
  cleanDistDir: true,

  // Enhanced image optimization
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // URL redirects for short/legacy URLs
  async redirects() {
    return [
      {
        source: "/partners",
        destination: "/trade-partners",
        permanent: true, // 301 redirect
      },
      {
        source: "/urgent",
        destination: "/contact#urgent-support",
        permanent: true, // 301 redirect
      },
      {
        source: "/book",
        destination: "/booking",
        permanent: true, // 301 redirect
      },
    ];
  },

  // Additional performance headers
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|gif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
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

module.exports = nextConfig;
