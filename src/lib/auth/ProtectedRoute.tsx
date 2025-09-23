// Protected route component for role-based access control
'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, UserRole } from './AuthContext'
import { Card, CardContent, Button } from '../../components/ui'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: UserRole
  fallbackPath?: string
  loadingComponent?: React.ReactNode
  unauthorizedComponent?: React.ReactNode
}

export function ProtectedRoute({
  children,
  requiredRole,
  fallbackPath = '/auth/login',
  loadingComponent,
  unauthorizedComponent,
}: ProtectedRouteProps) {
  const { user, userProfile, loading } = useAuth()
  const router = useRouter()

  // Show loading state
  if (loading) {
    return loadingComponent || <LoadingScreen />
  }

  // Redirect to login if not authenticated
  if (!user) {
    router.push(fallbackPath)
    return <LoadingScreen message="Redirecting to login..." />
  }

  // Check role-based access
  if (requiredRole && userProfile) {
    const roleHierarchy: Record<UserRole, number> = {
      client: 0,
      team_member: 1,
      admin: 2,
    }

    const hasAccess =
      roleHierarchy[userProfile.role] >= roleHierarchy[requiredRole]

    if (!hasAccess) {
      return (
        unauthorizedComponent || (
          <UnauthorizedScreen
            requiredRole={requiredRole}
            userRole={userProfile.role}
          />
        )
      )
    }
  }

  return <>{children}</>
}

// Default loading screen component
function LoadingScreen({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-lg font-tactic-bold text-brand-primary mb-2">
            MH Construction
          </h2>
          <p className="text-text-secondary">{message}</p>
        </CardContent>
      </Card>
    </div>
  )
}

// Default unauthorized screen component
function UnauthorizedScreen({
  requiredRole,
  userRole,
}: {
  requiredRole: UserRole
  userRole: UserRole
}) {
  const router = useRouter()

  const roleNames: Record<UserRole, string> = {
    client: 'Client',
    team_member: 'Team Member',
    admin: 'Administrator',
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-error/10 text-error rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          <h2 className="text-xl font-tactic-bold text-error mb-2">
            Access Denied
          </h2>
          <p className="text-text-secondary mb-4">
            This area requires{' '}
            <span className="font-semibold text-brand-primary">
              {roleNames[requiredRole]}
            </span>{' '}
            access.
            <br />
            Your current role:{' '}
            <span className="font-semibold">{roleNames[userRole]}</span>
          </p>

          <div className="space-y-2">
            <Button
              onClick={() => router.back()}
              variant="secondary"
              className="w-full"
            >
              Go Back
            </Button>
            <Button
              onClick={() => router.push('/')}
              variant="primary"
              className="w-full"
            >
              Return Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Dashboard protection wrapper
export function DashboardProtection({
  children,
}: {
  children: React.ReactNode
}) {
  return <ProtectedRoute requiredRole="team_member">{children}</ProtectedRoute>
}

// Admin protection wrapper
export function AdminProtection({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute requiredRole="admin">{children}</ProtectedRoute>
}
