// Forgot password page for password reset
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../../../lib/auth/AuthContext'
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '../../../components/ui'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const { resetPassword } = useAuth()

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError('Please enter your email address')
      return
    }

    try {
      setError('')
      setMessage('')
      setLoading(true)
      await resetPassword(email)
      setMessage('Check your email for password reset instructions')
    } catch (error: unknown) {
      setError((error as Error).message || 'Failed to send reset email')
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
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <h2 className="text-3xl font-tactic-bold text-brand-primary">
            Reset Password
          </h2>
          <p className="mt-2 text-text-secondary">
            Enter your email to receive reset instructions
          </p>
        </div>

        {/* Reset Form */}
        <Card>
          <CardHeader>
            <CardTitle>Password Reset</CardTitle>
          </CardHeader>
          <CardContent>
            
            {/* Success Message */}
            {message && (
              <div className="mb-4 p-3 bg-success-light border border-success/20 rounded-md">
                <p className="text-sm text-success font-medium">{message}</p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-error-light border border-error/20 rounded-md">
                <p className="text-sm text-error font-medium">{error}</p>
              </div>
            )}

            {/* Email Form */}
            <form onSubmit={handleResetPassword} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
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
                    Sending Reset Email...
                  </>
                ) : (
                  'Send Reset Email'
                )}
              </Button>
            </form>

            {/* Footer Links */}
            <div className="mt-6 text-center text-sm space-y-2">
              <Link 
                href="/auth/login" 
                className="text-brand-primary hover:text-brand-primary-light"
              >
                ← Back to Sign In
              </Link>
              
              <div className="text-text-muted">
                Need help? Contact{' '}
                <a 
                  href="mailto:support@mhconstruction.com" 
                  className="text-brand-primary hover:text-brand-primary-light"
                >
                  support@mhconstruction.com
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="bg-info-light border-info/20">
          <CardContent className="p-4">
            <div className="flex items-start">
              <div className="text-2xl mr-3 flex-shrink-0">💡</div>
              <div>
                <h3 className="font-semibold text-info">Reset Instructions</h3>
                <ul className="text-sm text-text-secondary mt-2 space-y-1">
                  <li>• Check your email for the reset link</li>
                  <li>• Click the link to create a new password</li>
                  <li>• Use a strong password with 8+ characters</li>
                  <li>• Contact support if you don&apos;t receive the email</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}