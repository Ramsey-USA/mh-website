/**
 * Analytics System Tests
 * Tests for the advanced analytics dashboard and tracking system
 */

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { analyticsEngine } from '@/lib/analytics/analytics-engine'
import { dataCollector } from '@/lib/analytics/data-collector'
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard'
import AnalyticsProvider, {
  useAnalyticsContext,
} from '@/components/analytics/AnalyticsProvider'

// Mock recharts
jest.mock('recharts', () => ({
  BarChart: ({ children }: any) => (
    <div data-testid="bar-chart">{children}</div>
  ),
  Bar: () => <div data-testid="bar" />,
  LineChart: ({ children }: any) => (
    <div data-testid="line-chart">{children}</div>
  ),
  Line: () => <div data-testid="line" />,
  PieChart: ({ children }: any) => (
    <div data-testid="pie-chart">{children}</div>
  ),
  Pie: () => <div data-testid="pie" />,
  Cell: () => <div data-testid="cell" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  Legend: () => <div data-testid="legend" />,
  ResponsiveContainer: ({ children }: any) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  AreaChart: ({ children }: any) => (
    <div data-testid="area-chart">{children}</div>
  ),
  Area: () => <div data-testid="area" />,
}))

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/test-page',
  useSearchParams: () => new URLSearchParams(''),
}))

describe('Analytics Engine', () => {
  beforeEach(() => {
    // Clear any existing data
    jest.clearAllMocks()
  })

  test('should initialize analytics engine', () => {
    expect(analyticsEngine).toBeDefined()
  })

  test('should track page view events', () => {
    const spy = jest.spyOn(analyticsEngine, 'trackPageView')

    analyticsEngine.trackPageView('/test-page', {
      referrer: 'https://google.com',
      timestamp: new Date().toISOString(),
    })

    expect(spy).toHaveBeenCalledWith(
      '/test-page',
      expect.objectContaining({
        referrer: 'https://google.com',
      })
    )
  })

  test('should track user interactions', () => {
    const spy = jest.spyOn(analyticsEngine, 'trackInteraction')

    analyticsEngine.trackInteraction('estimate-button', 'click', {
      projectType: 'kitchen-remodel',
      estimatedValue: 25000,
    })

    expect(spy).toHaveBeenCalledWith(
      'estimate-button',
      'click',
      expect.objectContaining({
        projectType: 'kitchen-remodel',
        estimatedValue: 25000,
      })
    )
  })

  test('should track conversion events', () => {
    const spy = jest.spyOn(analyticsEngine, 'trackConversion')

    analyticsEngine.trackConversion('estimate_request', 25000, {
      projectType: 'kitchen-remodel',
      leadSource: 'organic',
    })

    expect(spy).toHaveBeenCalledWith(
      'estimate_request',
      25000,
      expect.objectContaining({
        projectType: 'kitchen-remodel',
        leadSource: 'organic',
      })
    )
  })

  test('should track veteran-specific interactions', () => {
    const spy = jest.spyOn(analyticsEngine, 'track')

    analyticsEngine.track('veteran_benefit_view', {
      benefitType: 'va_loan',
      action: 'calculate',
      savings: 5000,
    })

    expect(spy).toHaveBeenCalledWith(
      'veteran_benefit_view',
      expect.objectContaining({
        benefitType: 'va_loan',
        action: 'calculate',
        savings: 5000,
      })
    )
  })

  test('should track estimator usage', () => {
    const spy = jest.spyOn(analyticsEngine, 'track')

    analyticsEngine.track('estimator_usage', {
      projectType: 'bathroom-remodel',
      estimatedValue: 15000,
      completed: true,
    })

    expect(spy).toHaveBeenCalledWith(
      'estimator_usage',
      expect.objectContaining({
        projectType: 'bathroom-remodel',
        estimatedValue: 15000,
        completed: true,
      })
    )
  })

  test('should track recommendation interactions', () => {
    const spy = jest.spyOn(analyticsEngine, 'track')

    analyticsEngine.track('recommendation_click', {
      recommendationId: 'rec_123',
      action: 'click',
    })

    expect(spy).toHaveBeenCalledWith(
      'recommendation_click',
      expect.objectContaining({
        recommendationId: 'rec_123',
        action: 'click',
      })
    )
  })

  test('should generate dashboard data', async () => {
    const dashboardData = await analyticsEngine.getDashboardData()

    expect(dashboardData).toHaveProperty('overview')
    expect(dashboardData).toHaveProperty('userBehavior')
    expect(dashboardData).toHaveProperty('performance')
    expect(dashboardData).toHaveProperty('conversions')
    expect(dashboardData).toHaveProperty('veteranInsights')
    expect(dashboardData).toHaveProperty('realTime')
  })

  test('should export analytics data', () => {
    const jsonData = analyticsEngine.exportData('json')
    const csvData = analyticsEngine.exportData('csv')

    expect(typeof jsonData).toBe('string')
    expect(typeof csvData).toBe('string')

    // JSON should be valid
    expect(() => JSON.parse(jsonData)).not.toThrow()
  })
})

describe('Data Collector', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should initialize data collector', () => {
    expect(dataCollector).toBeDefined()
  })

  test('should track page views', () => {
    const spy = jest.spyOn(dataCollector, 'trackPageView')

    dataCollector.trackPageView('/analytics-test')

    expect(spy).toHaveBeenCalledWith('/analytics-test')
  })

  test('should track form submissions', () => {
    const spy = jest.spyOn(dataCollector, 'trackFormSubmission')

    dataCollector.trackFormSubmission('contact-form', {
      name: 'John Doe',
      email: 'john@example.com',
      projectType: 'kitchen-remodel',
    })

    expect(spy).toHaveBeenCalledWith(
      'contact-form',
      expect.objectContaining({
        name: 'John Doe',
        email: 'john@example.com',
        projectType: 'kitchen-remodel',
      })
    )
  })

  test('should track estimator usage', () => {
    const spy = jest.spyOn(dataCollector, 'trackEstimatorUsage')

    dataCollector.trackEstimatorUsage('deck-addition', 18000, true)

    expect(spy).toHaveBeenCalledWith('deck-addition', 18000, true)
  })

  test('should track veteran interactions', () => {
    const spy = jest.spyOn(dataCollector, 'trackVeteranInteraction')

    dataCollector.trackVeteranInteraction('va_loan', 'calculate')

    expect(spy).toHaveBeenCalledWith('va_loan', 'calculate')
  })

  test('should get current session', () => {
    const session = dataCollector.getCurrentSession()

    if (session) {
      expect(session).toHaveProperty('sessionId')
      expect(session).toHaveProperty('startTime')
      expect(session).toHaveProperty('pageViews')
      expect(session).toHaveProperty('interactions')
    }
  })

  test('should export session data', () => {
    const sessionData = dataCollector.exportSessionData()

    expect(sessionData).toHaveProperty('session')
    expect(sessionData).toHaveProperty('events')
    expect(sessionData).toHaveProperty('heatmapData')
  })
})

describe('Analytics Provider', () => {
  function TestComponent() {
    const analytics = useAnalyticsContext()

    return (
      <div>
        <button
          data-testid="track-page-view"
          onClick={() => analytics.trackPageView('/test')}
        >
          Track Page View
        </button>
        <button
          data-testid="track-interaction"
          onClick={() => analytics.trackInteraction('test-button', 'click')}
        >
          Track Interaction
        </button>
        <button
          data-testid="track-conversion"
          onClick={() => analytics.trackConversion('test_conversion', 100)}
        >
          Track Conversion
        </button>
        <button
          data-testid="track-veteran"
          onClick={() => analytics.trackVeteranInteraction('va_loan', 'view')}
        >
          Track Veteran
        </button>
      </div>
    )
  }

  function WrappedTestComponent() {
    return (
      <AnalyticsProvider>
        <TestComponent />
      </AnalyticsProvider>
    )
  }

  test('should provide analytics context', () => {
    render(<WrappedTestComponent />)

    expect(screen.getByTestId('track-page-view')).toBeInTheDocument()
    expect(screen.getByTestId('track-interaction')).toBeInTheDocument()
    expect(screen.getByTestId('track-conversion')).toBeInTheDocument()
    expect(screen.getByTestId('track-veteran')).toBeInTheDocument()
  })

  test('should track page view through context', () => {
    const spy = jest.spyOn(analyticsEngine, 'trackPageView')

    render(<WrappedTestComponent />)

    fireEvent.click(screen.getByTestId('track-page-view'))

    expect(spy).toHaveBeenCalled()
  })

  test('should track interactions through context', () => {
    const spy = jest.spyOn(analyticsEngine, 'trackInteraction')

    render(<WrappedTestComponent />)

    fireEvent.click(screen.getByTestId('track-interaction'))

    expect(spy).toHaveBeenCalled()
  })

  test('should track conversions through context', () => {
    const spy = jest.spyOn(analyticsEngine, 'trackConversion')

    render(<WrappedTestComponent />)

    fireEvent.click(screen.getByTestId('track-conversion'))

    expect(spy).toHaveBeenCalled()
  })

  test('should track veteran interactions through context', () => {
    const spy = jest.spyOn(analyticsEngine, 'track')

    render(<WrappedTestComponent />)

    fireEvent.click(screen.getByTestId('track-veteran'))

    expect(spy).toHaveBeenCalled()
  })
})

describe('Analytics Dashboard', () => {
  // Mock dashboard data
  const mockDashboardData = {
    overview: {
      totalUsers: 1250,
      totalSessions: 2100,
      pageViews: 8500,
      averageSessionDuration: 180000,
      bounceRate: 35.2,
      conversionRate: 4.8,
      veteranUserPercentage: 23.5,
      topPages: [
        {
          page: '/',
          views: 2500,
          uniqueViews: 2000,
          averageTime: 120000,
          bounceRate: 30,
        },
        {
          page: '/services',
          views: 1800,
          uniqueViews: 1500,
          averageTime: 150000,
          bounceRate: 25,
        },
        {
          page: '/cost-estimator',
          views: 1200,
          uniqueViews: 1000,
          averageTime: 300000,
          bounceRate: 15,
        },
      ],
      trafficSources: [
        { source: 'Direct', sessions: 800, users: 600, conversionRate: 6.2 },
        { source: 'Google', sessions: 900, users: 700, conversionRate: 4.1 },
        { source: 'Social', sessions: 400, users: 300, conversionRate: 3.8 },
      ],
    },
    userBehavior: {
      userFlows: [],
      popularFeatures: [],
      estimatorUsage: {
        totalUsage: 450,
        completionRate: 78,
        averageProjectValue: 25000,
        popularProjectTypes: [],
        dropOffPoints: [],
      },
      recommendationEngagement: {
        impressions: 2800,
        clicks: 340,
        clickThroughRate: 12.1,
        conversionRate: 8.5,
        topRecommendations: [],
      },
      deviceBreakdown: {
        desktop: 65,
        mobile: 28,
        tablet: 7,
        performanceByDevice: [],
      },
      geographicDistribution: [],
    },
    performance: {
      coreWebVitals: {
        lcp: { value: 1200, rating: 'good' as const },
        fid: { value: 80, rating: 'good' as const },
        cls: { value: 0.08, rating: 'good' as const },
        trend: 'improving' as const,
      },
      pageLoadTimes: [],
      errorRates: {
        totalErrors: 12,
        errorRate: 0.14,
        topErrors: [],
        criticalErrors: 0,
      },
      uptimeMetrics: {
        uptime: 99.95,
        downtime: 0.05,
        incidents: [],
      },
      resourceMetrics: {
        bandwidthUsage: 0,
        apiCalls: 0,
        databaseQueries: 0,
        cacheHitRate: 94.2,
      },
    },
    conversions: {
      funnelAnalysis: [],
      conversionsBySource: [],
      veteranConversions: {
        totalConversions: 85,
        conversionRate: 6.8,
        averageProjectValue: 28000,
        benefitUtilization: 0,
      },
      estimatorToContact: 24.5,
      recommendationToInquiry: 8.2,
    },
    veteranInsights: {
      veteranUsers: 295,
      branchDistribution: [],
      benefitUtilization: [],
      specialistEngagement: {
        contacts: 42,
        conversionRate: 0,
        averageResponseTime: 0,
        satisfaction: 0,
      },
      conversionRates: {
        overall: 6.8,
        byBranch: {},
        withBenefits: 9.2,
        withSpecialist: 12.5,
      },
    },
    realTime: {
      activeUsers: 23,
      currentSessions: [],
      recentEvents: [],
      liveConversions: [],
      systemHealth: {
        status: 'healthy' as const,
        responseTime: 145,
        errorRate: 0.02,
        activeConnections: 18,
      },
    },
  }

  beforeEach(() => {
    // Mock the analytics engine getDashboardData method
    jest
      .spyOn(analyticsEngine, 'getDashboardData')
      .mockResolvedValue(mockDashboardData)
  })

  test('should render analytics dashboard', async () => {
    render(<AnalyticsDashboard />)

    // Wait for dashboard to load
    await waitFor(() => {
      expect(screen.getByText('Analytics Dashboard')).toBeInTheDocument()
    })
  })

  test('should display overview metrics', async () => {
    render(<AnalyticsDashboard />)

    await waitFor(() => {
      expect(screen.getByText('Total Users')).toBeInTheDocument()
      expect(screen.getByText('1,250')).toBeInTheDocument()
      expect(screen.getByText('Page Views')).toBeInTheDocument()
      expect(screen.getByText('8,500')).toBeInTheDocument()
    })
  })

  test('should switch between dashboard tabs', async () => {
    render(<AnalyticsDashboard />)

    await waitFor(() => {
      expect(screen.getByText('Overview')).toBeInTheDocument()
    })

    // Click on Performance tab
    fireEvent.click(screen.getByText('Performance'))

    await waitFor(() => {
      expect(screen.getByText('Largest Contentful Paint')).toBeInTheDocument()
    })
  })

  test('should display veteran analytics', async () => {
    render(<AnalyticsDashboard />)

    await waitFor(() => {
      expect(screen.getByText('Analytics Dashboard')).toBeInTheDocument()
    })

    // Click on Veterans tab
    fireEvent.click(screen.getByText('Veterans'))

    await waitFor(() => {
      expect(screen.getByText('Veteran Users')).toBeInTheDocument()
      expect(screen.getByText('295')).toBeInTheDocument()
    })
  })

  test('should export analytics data', async () => {
    const spy = jest
      .spyOn(analyticsEngine, 'exportData')
      .mockReturnValue('mock,csv,data')

    render(<AnalyticsDashboard />)

    await waitFor(() => {
      expect(screen.getByText('Export')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('Export'))

    expect(spy).toHaveBeenCalledWith('csv')
  })

  test('should refresh dashboard data', async () => {
    const spy = jest.spyOn(analyticsEngine, 'getDashboardData')

    render(<AnalyticsDashboard />)

    await waitFor(() => {
      expect(screen.getByText('Refresh')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('Refresh'))

    // Should call getDashboardData again
    await waitFor(() => {
      expect(spy).toHaveBeenCalledTimes(2)
    })
  })
})

describe('Analytics Integration', () => {
  test('should track user journey end-to-end', async () => {
    const pageViewSpy = jest.spyOn(analyticsEngine, 'trackPageView')
    const interactionSpy = jest.spyOn(analyticsEngine, 'trackInteraction')
    const conversionSpy = jest.spyOn(analyticsEngine, 'trackConversion')

    // Simulate user journey
    analyticsEngine.trackPageView('/')
    analyticsEngine.trackInteraction('nav-services', 'click')
    analyticsEngine.trackPageView('/services')
    analyticsEngine.trackInteraction('cost-estimator-button', 'click')
    analyticsEngine.trackPageView('/cost-estimator')
    analyticsEngine.trackConversion('estimate_request', 25000)

    expect(pageViewSpy).toHaveBeenCalledWith('/')
    expect(pageViewSpy).toHaveBeenCalledWith('/services')
    expect(pageViewSpy).toHaveBeenCalledWith('/cost-estimator')
    expect(interactionSpy).toHaveBeenCalledWith('nav-services', 'click')
    expect(interactionSpy).toHaveBeenCalledWith(
      'cost-estimator-button',
      'click'
    )
    expect(conversionSpy).toHaveBeenCalledWith('estimate_request', 25000)
  })

  test('should track veteran user experience', () => {
    const veteranSpy = jest.spyOn(analyticsEngine, 'track')

    // Simulate veteran user interactions
    analyticsEngine.track('veteran_benefit_view', {
      benefitType: 'va_loan',
      action: 'view',
    })
    analyticsEngine.track('veteran_benefit_view', {
      benefitType: 'va_loan',
      action: 'calculate',
      savings: 5000,
    })
    analyticsEngine.track('veteran_benefit_view', {
      benefitType: 'specialist_contact',
      action: 'contact_specialist',
    })

    expect(veteranSpy).toHaveBeenCalledWith(
      'veteran_benefit_view',
      expect.objectContaining({ benefitType: 'va_loan', action: 'view' })
    )
    expect(veteranSpy).toHaveBeenCalledWith(
      'veteran_benefit_view',
      expect.objectContaining({
        benefitType: 'va_loan',
        action: 'calculate',
        savings: 5000,
      })
    )
    expect(veteranSpy).toHaveBeenCalledWith(
      'veteran_benefit_view',
      expect.objectContaining({
        benefitType: 'specialist_contact',
        action: 'contact_specialist',
      })
    )
  })

  test('should integrate with performance monitoring', () => {
    const performanceSpy = jest.spyOn(analyticsEngine, 'trackPerformance')

    analyticsEngine.trackPerformance({
      loadTime: 1200,
      firstContentfulPaint: 800,
      largestContentfulPaint: 1500,
    })

    expect(performanceSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        loadTime: 1200,
        firstContentfulPaint: 800,
        largestContentfulPaint: 1500,
      })
    )
  })
})
