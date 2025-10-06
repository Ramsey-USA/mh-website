/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // ESLint re-enabled with improved configuration - now manageable with only 19 warnings
    ignoreDuringBuilds: false,
  },
  experimental: {
    // Enhanced bundle optimization - only include packages that actually exist
    optimizePackageImports: [
      'framer-motion',
      'firebase/firestore',
      'firebase/auth',
      'firebase/storage',
      'lucide-react',
    ],
    // Enable advanced optimizations
    optimizeCss: true,
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
    formats: ['image/webp', 'image/avif'],
    // Enhanced image optimization
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Note: quality, loader, and unoptimized moved to component level
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    // Remove React DevTools in production
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },

  // Webpack optimizations
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Bundle analyzer (run with ANALYZE=true npm run build)
    if (process.env.ANALYZE) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
          reportFilename: isServer
            ? '../analyze/server.html'
            : './analyze/client.html',
        })
      )
    }

    // Optimize chunks
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          default: {
            minChunks: 1,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
            reuseExistingChunk: true,
          },
          // Separate heavy libraries into their own chunks
          framerMotion: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: 'framer-motion',
            priority: 30,
            chunks: 'async',
          },
          firebase: {
            test: /[\\/]node_modules[\\/]firebase[\\/]/,
            name: 'firebase',
            priority: 30,
            chunks: 'async',
          },
          syntaxHighlighter: {
            test: /[\\/]node_modules[\\/]react-syntax-highlighter[\\/]/,
            name: 'syntax-highlighter',
            priority: 30,
            chunks: 'async',
          },
          lucide: {
            test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
            name: 'lucide-react',
            priority: 30,
            chunks: 'async',
          },
        },
      }
    }

    return config
  },

  // Headers for performance and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      // Cache static assets aggressively
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache portfolio images
      {
        source: '/portfolio/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400',
          },
        ],
      },
    ]
  },

  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
}

module.exports = nextConfig
