import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation, Footer } from '../components/layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MH Construction - Building Tomorrow with Today\'s Technology',
  description: 'Veteran-owned construction excellence powered by cutting-edge AI technology. Serving the Pacific Northwest with military precision and construction expertise.',
  keywords: ['construction', 'veteran-owned', 'Pacific Northwest', 'Pasco WA', 'building', 'AI estimator'],
  authors: [{ name: 'MH Construction Team' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}