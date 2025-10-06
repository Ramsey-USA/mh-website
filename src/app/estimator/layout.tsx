import { Metadata } from 'next'
import { metadata as estimatorMetadata } from './metadata'

export const metadata: Metadata = estimatorMetadata

export default function EstimatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'MH Construction AI Estimator',
            description:
              'AI-powered construction cost estimator with 95% accuracy guarantee',
            url: 'https://mhconstruction.com/estimator',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web Browser',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              description: 'Free AI construction cost estimation',
            },
            provider: {
              '@type': 'LocalBusiness',
              name: 'MH Construction',
              description:
                'Veteran-owned construction company in Pacific Northwest',
              address: {
                '@type': 'PostalAddress',
                addressRegion: 'Washington',
                addressCountry: 'US',
              },
              telephone: '(555) 123-4567',
              url: 'https://mhconstruction.com',
            },
            featureList: [
              'Instant cost estimates',
              '95% accuracy guarantee',
              'Veteran discounts',
              'Pacific Northwest pricing',
              'Material cost breakdown',
              'Timeline estimation',
            ],
          }),
        }}
      />
      {children}
    </>
  )
}
