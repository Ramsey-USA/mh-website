'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, Button, Input } from '../ui'
import { analytics } from '../analytics/google-analytics'

interface LeadCaptureProps {
  source?: string
  className?: string
  title?: string
  subtitle?: string
  compact?: boolean
}

interface QuickLeadData {
  name: string
  email: string
  phone: string
  projectType: string
  location: string
  source: string
}

export const LeadCapture: React.FC<LeadCaptureProps> = ({
  source = 'website',
  className = '',
  title = 'Get Your Free Consultation',
  subtitle = 'Start your construction project with expert guidance',
  compact = false,
}) => {
  const [formData, setFormData] = useState<QuickLeadData>({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    location: '',
    source,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<QuickLeadData>>({})

  const projectTypes = [
    'Custom Home',
    'Home Renovation',
    'Commercial Building',
    'Kitchen Remodel',
    'Bathroom Remodel',
    'Addition/Extension',
    'Emergency Repair',
    'Other',
  ]

  const validateForm = (): boolean => {
    const newErrors: Partial<QuickLeadData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email is required'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }

    if (!formData.projectType) {
      newErrors.projectType = 'Project type is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Track lead capture event
      analytics.event('lead_capture', {
        source: formData.source,
        project_type: formData.projectType,
        location: formData.location || 'not_specified',
      })

      // Simulate API call (replace with actual lead capture API)
      await new Promise(resolve => setTimeout(resolve, 1500))

      console.log('Lead captured:', formData)

      setIsSubmitted(true)

      // Track successful lead submission
      analytics.event('lead_submitted', {
        source: formData.source,
        project_type: formData.projectType,
      })
    } catch (error) {
      console.error('Lead submission error:', error)
      setErrors({ email: 'Submission failed. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof QuickLeadData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  if (isSubmitted) {
    return (
      <Card className={`${className} border-green-200 bg-green-50`}>
        <CardContent className="p-6 text-center">
          <div className="text-green-600 text-4xl mb-3">✅</div>
          <h3 className="text-xl font-semibold text-green-800 mb-2">
            Thank You!
          </h3>
          <p className="text-green-700 mb-4">
            We&apos;ve received your information and will contact you within 24
            hours to schedule your free consultation.
          </p>
          <div className="text-sm text-green-600">
            <p>
              <strong>Next Steps:</strong>
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Our team will review your project requirements</li>
              <li>We&apos;ll call to schedule your consultation</li>
              <li>Free on-site estimate within 48 hours</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader className={compact ? 'pb-4' : ''}>
        <CardTitle className={compact ? 'text-lg' : 'text-xl'}>
          {title}
        </CardTitle>
        {subtitle && <p className="text-gray-600 text-sm">{subtitle}</p>}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            value={formData.name}
            onChange={e => handleInputChange('name', e.target.value)}
            placeholder="Enter your full name"
            error={errors.name}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={e => handleInputChange('email', e.target.value)}
              placeholder="your.email@example.com"
              error={errors.email}
              required
            />

            <Input
              label="Phone"
              type="tel"
              value={formData.phone}
              onChange={e => handleInputChange('phone', e.target.value)}
              placeholder="(509) 555-0123"
              error={errors.phone}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Type *
              </label>
              <select
                value={formData.projectType}
                onChange={e => handleInputChange('projectType', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent ${
                  errors.projectType ? 'border-red-300' : 'border-gray-300'
                }`}
                required
              >
                <option value="">Select project type</option>
                {projectTypes.map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.projectType && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.projectType}
                </p>
              )}
            </div>

            <Input
              label="Project Location"
              value={formData.location}
              onChange={e => handleInputChange('location', e.target.value)}
              placeholder="City, State"
              helperText="Where is your project located?"
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="text-blue-500 text-xl mr-3">🎯</div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-1">
                  What You Get:
                </h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Free consultation and project assessment</li>
                  <li>• Detailed written estimate within 48 hours</li>
                  <li>• Veteran-owned company with 20+ years experience</li>
                  <li>• Licensed, bonded, and fully insured</li>
                </ul>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size={compact ? 'md' : 'lg'}
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              'Get Free Consultation'
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            By submitting this form, you agree to be contacted about your
            construction project. We respect your privacy and will never spam
            you.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}

// Quick Lead Capture for sticky/floating elements
export const QuickLeadCapture: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!isExpanded) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsExpanded(true)}
          variant="primary"
          size="lg"
          className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          💬 Free Consultation
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 max-w-[calc(100vw-3rem)]">
      <LeadCapture
        source="floating_cta"
        title="Quick Consultation Request"
        subtitle="Get your free estimate in 24 hours"
        compact={true}
        className="shadow-2xl"
      />
      <Button
        onClick={() => setIsExpanded(false)}
        variant="secondary"
        size="sm"
        className="absolute -top-2 -right-2 bg-white border-gray-300 hover:border-gray-400 rounded-full w-8 h-8 p-0"
      >
        ×
      </Button>
    </div>
  )
}
