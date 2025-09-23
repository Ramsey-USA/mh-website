'use client'

import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../../components/ui'
import Link from 'next/link'

// This page should not be statically generated since it uses authentication
export const dynamic = 'force-dynamic'

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')
    try {
      await resetPassword(email)
      setMessage('Password reset email sent!')
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Failed to send reset email'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface dark:bg-surface-dark">
      <Card className="w-full max-w-md p-8">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />
            {error && <div className="text-error text-sm">{error}</div>}
            {message && <div className="text-success text-sm">{message}</div>}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Email'}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/login" className="text-brand-primary hover:underline">
              Back to login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
