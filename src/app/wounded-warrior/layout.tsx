import type { Metadata } from 'next'
import { generateSEOMetadata } from '../../components/seo/seo-meta'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Wounded Warrior Program | MH Construction',
  description:
    "MH Construction's dedication to supporting wounded veterans with free accessibility modifications, emergency repairs, and priority construction services. Veteran-owned company serving those who served.",
  keywords: [
    'wounded warrior',
    'veteran construction',
    'accessibility modifications',
    'emergency repairs',
    'veteran discounts',
    'military support',
    'handicap accessible',
    'veteran-owned business',
  ],
  ogType: 'website',
})
