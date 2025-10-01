import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
// @ts-ignore
import './globals.css'
import { Navigation, Footer } from '../components/layout'
import FaviconLinks from '../components/layout/FaviconLinks'
import { AuthProvider } from '../lib/auth/AuthContext'
import { ThemeProvider } from '../contexts/ThemeContext'
import { WebVitalsReporter } from '../components/performance/optimized-components'
import { AnalyticsProvider } from '../components/analytics/enhanced-analytics'
import PWAUpdate from '../components/pwa/PWAUpdate'
import PWAInstall from '../components/pwa/PWAInstall'
import PushNotifications from '../components/pwa/PushNotifications'
import {
  StructuredData,
  generateEnhancedOrganizationSchema,
  generateWebsiteSchema,
} from '../components/seo/enhanced-seo'
import { useCriticalResourcePreloader } from '../hooks/usePerformanceOptimization'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "MH Construction - Building Tomorrow with Today's Technology",
  description:
    'Veteran-owned construction excellence powered by cutting-edge AI technology. Serving the Pacific Northwest with military precision and construction expertise.',
  keywords: [
    'construction',
    'veteran-owned',
    'Pacific Northwest',
    'Pasco WA',
    'building',
    'AI estimator',
  ],
  authors: [{ name: 'MH Construction Team' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'MH Construction',
    startupImage: [
      {
        url: '/icons/icon-512x512.png',
        media: '(device-width: 768px) and (device-height: 1024px)',
      },
    ],
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/icons/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: [{ url: '/favicon.ico' }],
    apple: [
      { url: '/icons/icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#386851',
  colorScheme: 'light dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <FaviconLinks />
        {/* Enhanced Schema Markup */}
        <StructuredData
          data={[generateEnhancedOrganizationSchema(), generateWebsiteSchema()]}
        />
      </head>
      <body className={inter.className}>
        <WebVitalsReporter />
        <AnalyticsProvider
          measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
          enableScrollTracking={true}
          enableTimeTracking={true}
        >
          <ThemeProvider
            defaultTheme="light"
            storageKey="mh-construction-theme"
          >
            <AuthProvider>
              <div className="flex flex-col bg-white dark:bg-gray-900 min-h-screen">
                <Navigation />
                <main className="flex-grow">{children}</main>
                <Footer />
              </div>
              {/* PWA Components */}
              <PWAUpdate />
              <PWAInstall />
              <PushNotifications />
            </AuthProvider>
          </ThemeProvider>
        </AnalyticsProvider>
      </body>
    </html>
  )
}
