/** @type {import('next').NextConfig} */
const nextConfig = {
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

  // Server external packages (moved from experimental)
  serverExternalPackages: [],

  poweredByHeader: false,

  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },

  // Enhanced performance configuration
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  webpack: (config, { dev, isServer }) => {
    // Exclude backup directories from compilation
    config.module.rules.push({
      test: /\.(ts|tsx|js|jsx)$/,
      exclude: [/node_modules/, /backups/, /\.backup\./, /\.next/],
    });

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
