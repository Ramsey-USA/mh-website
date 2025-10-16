/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    webpackBuildWorker: true,
    optimizeCss: true,
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  poweredByHeader: false,
  compress: true,

  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },

  webpack: (config, { dev, isServer }) => {
    // Enable filesystem caching for faster rebuilds
    config.cache = {
      type: "filesystem",
      compression: "gzip",
      maxMemoryGenerations: 1,
    };

    // Optimize for faster builds
    if (!dev) {
      config.optimization.minimize = true;

      // Better chunk splitting for caching
      if (!isServer) {
        config.optimization.splitChunks = {
          chunks: "all",
          minSize: 20000,
          maxSize: 244000,
          cacheGroups: {
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: "react",
              chunks: "all",
              priority: 20,
            },
            firebase: {
              test: /[\\/]node_modules[\\/](firebase|@firebase)[\\/]/,
              name: "firebase",
              chunks: "all",
              priority: 15,
              minSize: 0,
              maxSize: 150000, // Split Firebase into smaller chunks
            },
            firebaseAuth: {
              test: /[\\/]node_modules[\\/]firebase[\\/]auth[\\/]/,
              name: "firebase-auth",
              chunks: "all",
              priority: 16,
            },
            firebaseFirestore: {
              test: /[\\/]node_modules[\\/]firebase[\\/]firestore[\\/]/,
              name: "firebase-firestore",
              chunks: "all",
              priority: 16,
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              chunks: "all",
              priority: 10,
            },
          },
        };
      }

      // Tree shaking optimizations
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
    }

    // Reduce bundle analysis overhead
    config.stats = {
      chunks: false,
      chunkModules: false,
      modules: false,
    };

    return config;
  },

  output: "standalone",
  distDir: ".next",
  cleanDistDir: true,
};

module.exports = nextConfig;
