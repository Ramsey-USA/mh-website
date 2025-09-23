import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { DashboardProtection } from '../../lib/auth/ProtectedRoute'

export const metadata: Metadata = {
  title: 'Team Dashboard - MH Construction',
  description:
    'MH Construction team dashboard for managing projects, consultations, and business operations.',
}

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <DashboardProtection>
      <div className="min-h-screen bg-gray-50">{children}</div>
    </DashboardProtection>
  )
}
