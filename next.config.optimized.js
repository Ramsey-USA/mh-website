/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    webpackBuildWorker: true,
    optimizeCss: true,
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@radix-ui/react-icons",
      "react-markdown",
      "recharts",
    ],
    // Enable server components optimization
    serverComponentsExternalPackages: ["firebase-admin"],
  },

  poweredByHeader: false,
  compress: true,

  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },

  // Enhanced performance configuration
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  webpack: (config, { dev, isServer }) => {
    // Enhanced filesystem caching
    config.cache = {
      type: "filesystem",
      compression: "gzip",
      maxMemoryGenerations: 1,
      cacheDirectory: ".next/cache",
    };

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
            // Firebase chunk
            firebase: {
              test: /[\\/]node_modules[\\/](firebase|@firebase)[\\/]/,
              name: "firebase",
              chunks: "all",
              priority: 30,
              maxSize: 150000,
            },
            // UI libraries
            ui: {
              test: /[\\/]node_modules[\\/](@radix-ui|framer-motion|lucide-react)[\\/]/,
              name: "ui-libs",
              chunks: "all",
              priority: 25,
            },
            // Charts and visualization
            charts: {
              test: /[\\/]node_modules[\\/](recharts|d3-)[\\/]/,
              name: "charts",
              chunks: "all",
              priority: 20,
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

  output: "standalone",
  distDir: ".next",
  cleanDistDir: true,

  // Enhanced image optimization
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
};

module.exports = nextConfig;
