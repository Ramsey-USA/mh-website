import { ClientDashboard } from '../../../components/dashboard/ClientDashboard'
import { generateSEOMetadata } from '../../../components/seo/seo-meta'

export const metadata = generateSEOMetadata({
  title: 'Client Dashboard - Track Your Construction Project | MH Construction',
  description:
    'Access your personal client dashboard to track construction project progress, communicate with our team, and manage important documents.',
  keywords: [
    'client dashboard',
    'project tracking',
    'construction progress',
    'MH Construction',
  ],
  ogImage: '/images/dashboard-preview.jpg',
})

export default function ClientDashboardPage() {
  return (
    <>
      <ClientDashboard />
    </>
  )
}
