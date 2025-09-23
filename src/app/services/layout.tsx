import { generateSEOMetadata } from '@/components/seo/seo-meta'

export const metadata = generateSEOMetadata({
  title: 'Construction Services - Residential, Commercial & Industrial',
  description:
    'Comprehensive construction services from MH Construction. Residential homes, commercial build-outs, industrial facilities, and veteran specialty projects. Get your AI-powered estimate today.',
  keywords: [
    'construction services',
    'residential construction',
    'commercial construction',
    'industrial construction',
    'home renovation',
    'custom home builder',
    'office build-out',
    'warehouse construction',
    'veteran construction services',
    'Pacific Northwest contractor',
    'construction estimates',
    'licensed contractor',
  ],
})

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
