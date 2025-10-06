/**
 * Analytics Dashboard Demo Page
 * Example implementation showing the analytics system in action
 */

'use client'

import React from 'react'
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard'
import AnalyticsProvider, {
  useAnalyticsContext,
  useVeteranTracking,
  useConversionTracking,
} from '@/components/analytics/AnalyticsProvider'

// Demo Component to show analytics tracking
function AnalyticsDemo() {
  const analytics = useAnalyticsContext()
  const veteranTracking = useVeteranTracking()
  const conversionTracking = useConversionTracking()

  const simulateUserInteractions = () => {
    // Simulate page view
    analytics.trackPageView('/demo-analytics', {
      source: 'demo',
      timestamp: new Date().toISOString(),
    })

    // Simulate user interaction
    analytics.trackInteraction('demo-button', 'click', {
      feature: 'analytics-demo',
      location: 'header',
    })

    // Simulate form submission
    analytics.trackFormSubmission('demo-contact-form', {
      name: 'John Doe',
      email: 'john@example.com',
      projectType: 'kitchen-remodel',
      estimatedValue: 25000,
    })

    // Simulate estimator usage
    analytics.trackEstimatorUsage('bathroom-remodel', 18000, true)

    // Simulate veteran interaction
    veteranTracking.trackBenefitView('va_loan')
    veteranTracking.trackBenefitCalculation('va_loan', 5000)

    // Simulate conversion
    conversionTracking.trackEstimateRequest(25000, 'kitchen-remodel')
  }

  const simulateVeteranJourney = () => {
    // Veteran user journey simulation
    analytics.trackPageView('/', { isVeteran: true })
    veteranTracking.trackBadgeView('army')
    analytics.trackPageView('/services', { isVeteran: true })
    veteranTracking.trackBenefitView('va_loan')
    analytics.trackPageView('/cost-estimator', { isVeteran: true })
    analytics.trackEstimatorUsage('deck-addition', 22000, true)
    veteranTracking.trackBenefitCalculation('va_loan', 6500)
    conversionTracking.trackEstimateRequest(22000, 'deck-addition')
    veteranTracking.trackSpecialistContact('veteran-specialist')
  }

  const simulateErrorEvent = () => {
    // Simulate an error for testing
    const error = new Error('Demo analytics error')
    analytics.trackError(error, {
      context: 'analytics-demo',
      userAction: 'simulate-error',
      timestamp: new Date().toISOString(),
    })
  }

  return (
    <div className="space-y-6 p-6">
      <div className="bg-white shadow-sm p-6 border rounded-lg">
        <h2 className="mb-4 font-bold text-2xl">Analytics System Demo</h2>
        <p className="mb-6 text-gray-600">
          Use these buttons to simulate user interactions and see them reflected
          in the analytics dashboard below.
        </p>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={simulateUserInteractions}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white transition-colors"
          >
            Simulate General User Journey
          </button>

          <button
            onClick={simulateVeteranJourney}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-white transition-colors"
          >
            Simulate Veteran User Journey
          </button>

          <button
            onClick={simulateErrorEvent}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white transition-colors"
          >
            Simulate Error Event
          </button>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <AnalyticsDashboard />
    </div>
  )
}

// Main Demo Page Component
export default function AnalyticsDemoPage() {
  return (
    <AnalyticsProvider enableAutoTracking={true}>
      <div className="bg-gray-50 min-h-screen">
        <div className="mx-auto py-8 container">
          <div className="mb-8 text-center">
            <h1 className="mb-4 font-bold text-gray-900 text-4xl">
              Advanced Analytics Dashboard
            </h1>
            <p className="mx-auto max-w-3xl text-gray-600 text-xl">
              Real-time insights into user behavior, performance metrics, and
              veteran engagement for MH Construction's digital platform.
            </p>
          </div>

          <AnalyticsDemo />
        </div>
      </div>
    </AnalyticsProvider>
  )
}
