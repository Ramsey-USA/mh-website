import { generateSEOMetadata } from '@/components/seo/seo-meta'

export const metadata = generateSEOMetadata({
  title: 'About Us - Veteran-Owned Construction Excellence',
  description:
    "Learn about MH Construction's story, values, and veteran team. Founded in 2018 by Army veteran Michael Harrison, we bring military precision to Pacific Northwest construction projects.",
  keywords: [
    'veteran owned construction',
    'about MH Construction',
    'military construction company',
    'Pacific Northwest construction team',
    'veteran contractor',
    'construction company story',
    'military precision construction',
    'veteran employment',
    'Seattle construction veterans',
    'Portland construction veterans',
  ],
})

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
