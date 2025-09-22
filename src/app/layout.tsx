import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation, Footer } from '../components/layout'
import { AuthProvider } from '../lib/auth/AuthContext'
import { WebVitalsReporter } from '../components/performance/optimized-components'
import { GoogleAnalytics } from '../components/analytics/google-analytics'
import PWAUpdate from '../components/pwa/PWAUpdate'
import PWAInstall from '../components/pwa/PWAInstall'
import PushNotifications from '../components/pwa/PushNotifications'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MH Construction - Building Tomorrow with Today\'s Technology',
  description: 'Veteran-owned construction excellence powered by cutting-edge AI technology. Serving the Pacific Northwest with military precision and construction expertise.',
  keywords: ['construction', 'veteran-owned', 'Pacific Northwest', 'Pasco WA', 'building', 'AI estimator'],
  authors: [{ name: 'MH Construction Team' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'MH Construction',
    startupImage: [
      {
        url: '/icons/icon-512x512.png',
        media: '(device-width: 768px) and (device-height: 1024px)'
      }
    ]
  },
  formatDetection: {
    telephone: false
  },
  icons: {
    icon: [
      { url: '/icons/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-16x16.png', sizes: '16x16', type: 'image/png' }
    ],
    shortcut: [{ url: '/icons/icon-192x192.png' }],
    apple: [
      { url: '/icons/icon-180x180.png', sizes: '180x180', type: 'image/png' }
    ]
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#386851',
  colorScheme: 'light'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WebVitalsReporter />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          {/* PWA Components */}
          <PWAUpdate />
          <PWAInstall />
          <PushNotifications />
        </AuthProvider>
      </body>
    </html>
  )
}