'use client'

import React, { useState } from 'react'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Textarea,
} from '../ui'
import { analytics } from '../analytics/google-analytics'

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  projectType: string
  projectLocation: string
  budget: string
  timeline: string
  message: string
  urgency: 'low' | 'medium' | 'high'
  preferredContact: 'email' | 'phone' | 'either'
}

interface ContactFormProps {
  formType: 'general' | 'project' | 'emergency'
  title: string
  description?: string
}

export function ContactForm({
  formType,
  title,
  description,
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    projectType: '',
    projectLocation: '',
    budget: '',
    timeline: '',
    message: '',
    urgency: 'medium',
    preferredContact: 'either',
  })

  const [errors, setErrors] = useState<Partial<ContactFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const projectTypes = [
    'Custom Home Construction',
    'Home Addition/Extension',
    'Kitchen Remodeling',
    'Bathroom Remodeling',
    'Commercial Construction',
    'Industrial Project',
    'Renovation/Restoration',
    'Emergency Repair',
    'Other',
  ]

  const budgetRanges = [
    'Under $25,000',
    '$25,000 - $50,000',
    '$50,000 - $100,000',
    '$100,000 - $250,000',
    '$250,000 - $500,000',
    '$500,000 - $1,000,000',
    'Over $1,000,000',
    'Not Sure Yet',
  ]

  const timelineOptions = [
    'ASAP',
    'Within 1 month',
    '1-3 months',
    '3-6 months',
    '6-12 months',
    'Over 1 year',
    'Just Planning',
  ]

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {}

    // Required fields
    if (!formData.firstName.trim())
      newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Phone validation (if provided)
    if (formData.phone) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
      if (!phoneRegex.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
        newErrors.phone = 'Please enter a valid phone number'
      }
    }

    // Project-specific validation
    if (formType === 'project') {
      if (!formData.projectType)
        newErrors.projectType = 'Please select a project type'
      if (!formData.projectLocation.trim())
        newErrors.projectLocation = 'Project location is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Track form submission
      analytics.contactForm(formType, formData.projectType)

      // Here you would typically send to your backend API
      // For now, we'll simulate the submission
      await new Promise(resolve => setTimeout(resolve, 2000))

      console.log('Form submitted:', formData)

      setIsSubmitted(true)

      // Reset form after successful submission
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          projectType: '',
          projectLocation: '',
          budget: '',
          timeline: '',
          message: '',
          urgency: 'medium',
          preferredContact: 'either',
        })
      }, 3000)
    } catch (error) {
      console.error('Form submission error:', error)
      // Handle error (show error message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  if (isSubmitted) {
    return (
      <Card className="p-8 text-center">
        <div className="text-green-600 text-6xl mb-4">✓</div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          Thank You!
        </h3>
        <p className="text-gray-600 mb-4">
          Your message has been sent successfully. We&apos;ll get back to you
          within 24 hours.
        </p>
        <div className="text-sm text-gray-500">
          For urgent matters, please call us directly at{' '}
          <strong>(509) 308-6489</strong>
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-gray-900">{title}</CardTitle>
        {description && <p className="text-gray-600">{description}</p>}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name *
              </label>
              <Input
                value={formData.firstName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange('firstName', e.target.value)
                }
                className={errors.firstName ? 'border-red-500' : ''}
                placeholder="John"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name *
              </label>
              <Input
                value={formData.lastName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange('lastName', e.target.value)
                }
                className={errors.lastName ? 'border-red-500' : ''}
                placeholder="Smith"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange('email', e.target.value)
                }
                className={errors.email ? 'border-red-500' : ''}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange('phone', e.target.value)
                }
                className={errors.phone ? 'border-red-500' : ''}
                placeholder="(509) 555-0123"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Project-specific fields */}
          {formType === 'project' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Type *
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handleInputChange('projectType', e.target.value)
                    }
                    className={`w-full border border-gray-300 rounded-md px-3 py-2 ${
                      errors.projectType ? 'border-red-500' : ''
                    }`}
                  >
                    <option value="">Select project type</option>
                    {projectTypes.map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.projectType && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.projectType}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Location *
                  </label>
                  <Input
                    value={formData.projectLocation}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange('projectLocation', e.target.value)
                    }
                    className={errors.projectLocation ? 'border-red-500' : ''}
                    placeholder="Seattle, WA"
                  />
                  {errors.projectLocation && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.projectLocation}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Range
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handleInputChange('budget', e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="">Select budget range</option>
                    {budgetRanges.map(range => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handleInputChange('timeline', e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="">Select timeline</option>
                    {timelineOptions.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}

          {/* Urgency and Contact Preference */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Urgency Level
              </label>
              <div className="flex gap-2">
                {[
                  {
                    value: 'low',
                    label: 'Low',
                    color: 'bg-green-100 text-green-800',
                  },
                  {
                    value: 'medium',
                    label: 'Medium',
                    color: 'bg-yellow-100 text-yellow-800',
                  },
                  {
                    value: 'high',
                    label: 'High',
                    color: 'bg-red-100 text-red-800',
                  },
                ].map(urgency => (
                  <button
                    key={urgency.value}
                    type="button"
                    onClick={() =>
                      handleInputChange(
                        'urgency',
                        urgency.value as 'low' | 'medium' | 'high'
                      )
                    }
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      formData.urgency === urgency.value
                        ? urgency.color
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {urgency.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Contact Method
              </label>
              <div className="flex gap-2">
                {[
                  { value: 'email', label: 'Email' },
                  { value: 'phone', label: 'Phone' },
                  { value: 'either', label: 'Either' },
                ].map(method => (
                  <button
                    key={method.value}
                    type="button"
                    onClick={() =>
                      handleInputChange(
                        'preferredContact',
                        method.value as 'email' | 'phone' | 'either'
                      )
                    }
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      formData.preferredContact === method.value
                        ? 'bg-primary-100 text-primary-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {method.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message *
            </label>
            <Textarea
              value={formData.message}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleInputChange('message', e.target.value)
              }
              className={errors.message ? 'border-red-500' : ''}
              rows={4}
              placeholder="Please describe your project or inquiry in detail..."
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
            size="lg"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>

          <p className="text-sm text-gray-500 text-center">
            By submitting this form, you agree to be contacted by MH
            Construction regarding your inquiry.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
