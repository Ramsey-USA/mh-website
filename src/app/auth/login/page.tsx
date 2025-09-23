// Login page for team members and administrators
'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '../../../lib/auth/AuthContext'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
} from '../../../components/ui'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signIn, signInWithGoogle } = useAuth()
  const router = useRouter()

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    try {
      setError('')
      setLoading(true)
      await signIn(email, password)
      router.push('/dashboard')
    } catch (error: unknown) {
      setError((error as Error).message || 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setError('')
      setLoading(true)
      await signInWithGoogle()
      router.push('/dashboard')
    } catch (error: unknown) {
      setError((error as Error).message || 'Failed to sign in with Google')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-brand-primary rounded-full flex items-center justify-center mb-4">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m11 0v-5a2 2 0 00-2-2H7a2 2 0 00-2 2v5m14 0v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-1a1 1 0 00-1-1H7a1 1 0 00-1 1v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-2m14 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v10.01M12 16h.01"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-tactic-bold text-brand-primary">
            MH Construction
          </h2>
          <p className="mt-2 text-text-secondary">Team Dashboard Access</p>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle>Sign In to Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-error-light border border-error/20 rounded-md">
                <p className="text-sm text-error font-medium">{error}</p>
              </div>
            )}

            {/* Email/Password Form */}
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={loading}
              />

              <Input
                label="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                disabled={loading}
              />

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-surface text-text-muted">
                    Or continue with
                  </span>
                </div>
              </div>
            </div>

            {/* Google Sign In */}
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </Button>

            {/* Footer Links */}
            <div className="mt-6 text-center text-sm space-y-2">
              <Link
                href="/auth/forgot-password"
                className="text-brand-primary hover:text-brand-primary-light"
              >
                Forgot your password?
              </Link>

              <div className="text-text-muted">
                Need access? Contact{' '}
                <a
                  href="mailto:admin@mhconstruction.com"
                  className="text-brand-primary hover:text-brand-primary-light"
                >
                  admin@mhconstruction.com
                </a>
              </div>

              <Link
                href="/"
                className="block text-brand-primary hover:text-brand-primary-light"
              >
                ← Back to Website
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Veteran Notice */}
        <Card className="bg-veteran-blue/5 border-veteran-blue/20">
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="text-2xl mr-3">🇺🇸</div>
              <div>
                <h3 className="font-semibold text-veteran-blue">
                  Veteran-Owned Business
                </h3>
                <p className="text-sm text-text-secondary mt-1">
                  Proudly serving our community with military precision and
                  dedication.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
