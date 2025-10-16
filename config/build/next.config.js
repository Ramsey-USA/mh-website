/** @type {import('next').NextConfig} */
const nextConfig = {
  // Experimental features
  experimental: {
    // Enable optimized CSS loading
    optimizeCss: true,
    // Enable enhanced CSS support
    esmExternals: true,
  },

  // Server external packages
  serverExternalPackages: ["firebase-admin"],

  // Compiler options
  compiler: {
    // Remove console logs in production
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
    // Enable styled-components support if needed
    styledComponents: false,
  },

  // Performance optimizations
  poweredByHeader: false,
  generateEtags: true,
  compress: true,

  // CSS and styling configuration
  sassOptions: {
    includePaths: ["./src/styles"],
    prependData: `
      @import "./src/styles/variables.scss";
    `,
  },

  // Image optimization
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Security headers optimized for Cloudflare
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=()",
          },
          // Performance headers for CDN optimization
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Vary",
            value: "Accept-Encoding, Accept",
          },
          // Cloudflare cache tags for better cache management
          {
            key: "CF-Cache-Tag",
            value: "html-pages",
          },
          // Security enhancements
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://*.googleapis.com https://*.firebaseio.com wss://*.firebaseio.com; frame-src 'none';",
          },
        ],
      },
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=300, stale-while-revalidate=600, stale-if-error=86400",
          },
          {
            key: "CF-Cache-Tag",
            value: "api-routes",
          },
          {
            key: "Vary",
            value: "Accept-Encoding, Authorization",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "CF-Cache-Tag",
            value: "static-assets",
          },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=3600",
          },
          {
            key: "CF-Cache-Tag",
            value: "images",
          },
          {
            key: "Vary",
            value: "Accept",
          },
        ],
      },
      {
        source: "/manifest.json",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
          {
            key: "Content-Type",
            value: "application/manifest+json",
          },
        ],
      },
      {
        source: "/sw.js",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
          {
            key: "Service-Worker-Allowed",
            value: "/",
          },
        ],
      },
    ];
  },

  // Webpack configuration for enhanced CSS and JS processing
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Exclude Firebase functions from Next.js build
    config.externals = config.externals || [];
    if (isServer) {
      config.externals.push("firebase-functions");
      config.externals.push("firebase-admin");
    }

    // Optimize bundle splitting for CDN caching
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          chunks: "all",
          cacheGroups: {
            ...config.optimization.splitChunks.cacheGroups,
            // Firebase vendor chunk
            firebase: {
              test: /[\\/]node_modules[\\/](firebase|@firebase)[\\/]/,
              name: "firebase",
              priority: 20,
              chunks: "all",
            },
            // React vendor chunk
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: "react",
              priority: 15,
              chunks: "all",
            },
            // Other vendor libraries
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              priority: 10,
              chunks: "all",
            },
            common: {
              name: "common",
              minChunks: 2,
              priority: 5,
              chunks: "all",
              reuseExistingChunk: true,
            },
          },
        },
        // Enable tree shaking
        usedExports: true,
        sideEffects: false,
      };
    }

    // Enable Webpack 5 optimizations
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    return config;
  },

  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Redirects for better UX
  async redirects() {
    return [
      // Add any necessary redirects here
    ];
  },

  // Rewrites for clean URLs
  async rewrites() {
    return [
      // Add any necessary rewrites here
    ];
  },

  // Output configuration for static export and CDN optimization
  output: "standalone",
  distDir: ".next",

  // Enable TypeScript and ESLint checking
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ["src", "pages", "components", "lib", "utils"],
  },

  // Trailing slash configuration
  trailingSlash: false,

  // Asset prefix for CDN (if needed)
  // assetPrefix: process.env.NODE_ENV === 'production' ? 'https://cdn.yourdomain.com' : '',
};

// Bundle analyzer for development
if (process.env.ANALYZE === "true") {
  const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: true,
  });
  module.exports = withBundleAnalyzer(nextConfig);
} else {
  module.exports = nextConfig;
}
