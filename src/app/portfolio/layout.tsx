import { generateSEOMetadata } from '@/components/seo/seo-meta'

export const metadata = generateSEOMetadata({
  title: 'Portfolio - Our Construction Projects',
  description: 'Explore MH Construction\'s impressive portfolio of residential, commercial, and industrial projects throughout the Pacific Northwest. See our quality craftsmanship and expertise.',
  keywords: [
    'construction portfolio',
    'completed projects',
    'residential construction examples',
    'commercial construction projects',
    'renovation gallery',
    'construction photos',
    'Seattle construction projects',
    'Portland construction projects',
    'Pacific Northwest construction'
  ]
})

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}