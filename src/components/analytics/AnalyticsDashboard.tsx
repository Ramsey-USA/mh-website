/**
 * Analytics Dashboard Components
 * Visual interface for displaying analytics data and insights
 */

'use client'

import React, { useState, useEffect } from 'react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts'
import { MaterialIcon } from '@/components/icons/MaterialIcon'
import {
  analyticsEngine,
  type AnalyticsDashboardData,
  type AnalyticsEvent,
} from '@/lib/analytics/analytics-engine'

// Dashboard Color Palette
const COLORS = {
  primary: '#3B82F6',
  secondary: '#8B5CF6',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#06B6D4',
  neutral: '#6B7280',
}

const CHART_COLORS = [
  '#3B82F6',
  '#8B5CF6',
  '#10B981',
  '#F59E0B',
  '#EF4444',
  '#06B6D4',
]

// Simple UI Components
function Card({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`bg-white rounded-lg border shadow-sm ${className}`}>
      {children}
    </div>
  )
}

function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col space-y-1.5 p-6">{children}</div>
}

function CardTitle({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h3
      className={`text-lg font-semibold leading-none tracking-tight ${className}`}
    >
      {children}
    </h3>
  )
}

function CardDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-muted-foreground text-sm">{children}</p>
}

function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="p-6 pt-0">{children}</div>
}

function Progress({
  value,
  className = '',
}: {
  value: number
  className?: string
}) {
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2.5 ${className}`}>
      <div
        className="bg-blue-600 rounded-full h-2.5 transition-all duration-300"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}

function Badge({
  children,
  variant = 'default',
  className = '',
}: {
  children: React.ReactNode
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  className?: string
}) {
  const variants = {
    default: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    destructive: 'bg-destructive text-destructive-foreground',
    outline: 'text-foreground border border-input',
  }
  return (
    <div
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  )
}

function Button({
  children,
  variant = 'default',
  size = 'default',
  onClick,
  disabled = false,
  className = '',
}: {
  children: React.ReactNode
  variant?: 'default' | 'outline' | 'secondary'
  size?: 'default' | 'sm' | 'lg'
  onClick?: () => void
  disabled?: boolean
  className?: string
}) {
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline:
      'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  }
  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
  }
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

function Tabs({
  value,
  onValueChange,
  children,
  className = '',
}: {
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
  className?: string
}) {
  return <div className={`w-full ${className}`}>{children}</div>
}

function TabsList({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex justify-center items-center bg-muted p-1 rounded-md h-10 text-muted-foreground">
      {children}
    </div>
  )
}

function TabsTrigger({
  value,
  children,
  activeTab,
  onTabChange,
}: {
  value: string
  children: React.ReactNode
  activeTab: string
  onTabChange: (value: string) => void
}) {
  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        activeTab === value ? 'bg-background text-foreground shadow-sm' : ''
      }`}
      onClick={() => onTabChange(value)}
    >
      {children}
    </button>
  )
}

function TabsContent({
  value,
  children,
  activeTab,
  className = '',
}: {
  value: string
  children: React.ReactNode
  activeTab: string
  className?: string
}) {
  if (activeTab !== value) return null
  return (
    <div
      className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
    >
      {children}
    </div>
  )
}

// Main Dashboard Component
export function AnalyticsDashboard() {
  const [dashboardData, setDashboardData] =
    useState<AnalyticsDashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [timeRange, setTimeRange] = useState('7d')
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  useEffect(() => {
    loadDashboardData()

    // Auto-refresh every 5 minutes
    const interval = setInterval(loadDashboardData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [timeRange])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const data = await analyticsEngine.getDashboardData()
      setDashboardData(data)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportData = () => {
    const data = analyticsEngine.exportData('csv')
    const blob = new Blob([data], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analytics-${timeRange}-${Date.now()}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (loading && !dashboardData) {
    return <DashboardSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={timeRange}
            onChange={e => setTimeRange(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="1d">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>

          <Button
            variant="outline"
            size="sm"
            onClick={loadDashboardData}
            disabled={loading}
          >
            <MaterialIcon
              icon="refresh"
              className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`}
            />
            Refresh
          </Button>

          <Button variant="outline" size="sm" onClick={exportData}>
            <MaterialIcon icon="download" className="mr-2 w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Dashboard Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList>
          <TabsTrigger
            value="overview"
            activeTab={activeTab}
            onTabChange={setActiveTab}
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="behavior"
            activeTab={activeTab}
            onTabChange={setActiveTab}
          >
            User Behavior
          </TabsTrigger>
          <TabsTrigger
            value="performance"
            activeTab={activeTab}
            onTabChange={setActiveTab}
          >
            Performance
          </TabsTrigger>
          <TabsTrigger
            value="conversions"
            activeTab={activeTab}
            onTabChange={setActiveTab}
          >
            Conversions
          </TabsTrigger>
          <TabsTrigger
            value="veterans"
            activeTab={activeTab}
            onTabChange={setActiveTab}
          >
            Veterans
          </TabsTrigger>
          <TabsTrigger
            value="realtime"
            activeTab={activeTab}
            onTabChange={setActiveTab}
          >
            Real-time
          </TabsTrigger>
        </TabsList>

        {dashboardData && (
          <>
            <TabsContent
              value="overview"
              activeTab={activeTab}
              className="space-y-6"
            >
              <OverviewDashboard data={dashboardData.overview} />
            </TabsContent>

            <TabsContent
              value="behavior"
              activeTab={activeTab}
              className="space-y-6"
            >
              <UserBehaviorDashboard data={dashboardData.userBehavior} />
            </TabsContent>

            <TabsContent
              value="performance"
              activeTab={activeTab}
              className="space-y-6"
            >
              <PerformanceDashboard data={dashboardData.performance} />
            </TabsContent>

            <TabsContent
              value="conversions"
              activeTab={activeTab}
              className="space-y-6"
            >
              <ConversionsDashboard data={dashboardData.conversions} />
            </TabsContent>

            <TabsContent
              value="veterans"
              activeTab={activeTab}
              className="space-y-6"
            >
              <VeteransDashboard data={dashboardData.veteranInsights} />
            </TabsContent>

            <TabsContent
              value="realtime"
              activeTab={activeTab}
              className="space-y-6"
            >
              <RealTimeDashboard data={dashboardData.realTime} />
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  )
}

// Overview Dashboard Tab
function OverviewDashboard({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Users"
          value={data.totalUsers.toLocaleString()}
          change={+12.5}
          icon="group"
          color="primary"
        />
        <MetricCard
          title="Page Views"
          value={data.pageViews.toLocaleString()}
          change={+8.2}
          icon="visibility"
          color="secondary"
        />
        <MetricCard
          title="Avg. Session"
          value={`${Math.round(data.averageSessionDuration / 1000 / 60)}m`}
          change={-2.1}
          icon="schedule"
          color="info"
        />
        <MetricCard
          title="Conversion Rate"
          value={`${data.conversionRate.toFixed(1)}%`}
          change={+5.7}
          icon="track_changes"
          color="success"
        />
      </div>

      {/* Charts Row */}
      <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
        {/* Top Pages Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
            <CardDescription>
              Most visited pages in the selected period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.topPages.slice(0, 5)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="page" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill={COLORS.primary} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>
              Where your visitors are coming from
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.trafficSources}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="sessions"
                  nameKey="source"
                >
                  {data.trafficSources.map((entry: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Bounce Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">
              {data.bounceRate.toFixed(1)}%
            </div>
            <Progress value={data.bounceRate} className="mt-2" />
            <p className="mt-2 text-muted-foreground text-sm">
              {data.bounceRate < 40
                ? 'Excellent'
                : data.bounceRate < 60
                  ? 'Good'
                  : 'Needs Improvement'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Veteran Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">
              {data.veteranUserPercentage.toFixed(1)}%
            </div>
            <Progress value={data.veteranUserPercentage} className="mt-2" />
            <Badge variant="secondary" className="mt-2">
              <MaterialIcon icon="military_tech" className="mr-1 w-3 h-3" />
              Military Focus
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">
              {data.totalSessions.toLocaleString()}
            </div>
            <div className="flex items-center mt-2">
              <MaterialIcon
                icon="trending_up"
                className="mr-1 w-4 h-4 text-green-500"
              />
              <span className="text-green-500 text-sm">
                +15.3% from last period
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// User Behavior Dashboard Tab
function UserBehaviorDashboard({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      {/* Device Breakdown */}
      <div className="gap-6 grid grid-cols-1 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Device Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <MaterialIcon
                    icon="desktop_windows"
                    className="mr-2 w-4 h-4"
                  />
                  <span>Desktop</span>
                </div>
                <span className="font-medium">
                  {data.deviceBreakdown.desktop}%
                </span>
              </div>
              <Progress value={data.deviceBreakdown.desktop} />

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <MaterialIcon icon="smartphone" className="mr-2 w-4 h-4" />
                  <span>Mobile</span>
                </div>
                <span className="font-medium">
                  {data.deviceBreakdown.mobile}%
                </span>
              </div>
              <Progress value={data.deviceBreakdown.mobile} />

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <MaterialIcon icon="tablet" className="mr-2 w-4 h-4" />
                  <span>Tablet</span>
                </div>
                <span className="font-medium">
                  {data.deviceBreakdown.tablet}%
                </span>
              </div>
              <Progress value={data.deviceBreakdown.tablet} />
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Estimator Usage Analytics</CardTitle>
            <CardDescription>
              How users interact with the cost estimator
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="gap-4 grid grid-cols-2">
              <div>
                <div className="font-bold text-2xl">
                  {data.estimatorUsage.totalUsage}
                </div>
                <p className="text-muted-foreground text-sm">Total Uses</p>
              </div>
              <div>
                <div className="font-bold text-2xl">
                  {data.estimatorUsage.completionRate}%
                </div>
                <p className="text-muted-foreground text-sm">Completion Rate</p>
              </div>
              <div>
                <div className="font-bold text-2xl">
                  $
                  {data.estimatorUsage.averageProjectValue?.toLocaleString() ||
                    0}
                </div>
                <p className="text-muted-foreground text-sm">
                  Avg. Project Value
                </p>
              </div>
              <div>
                <div className="font-bold text-2xl">
                  {data.estimatorUsage.popularProjectTypes?.length || 0}
                </div>
                <p className="text-muted-foreground text-sm">Project Types</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Popular Features */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Features</CardTitle>
          <CardDescription>
            Most used features and their success rates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.popularFeatures.map((feature: any, index: number) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 border rounded-lg"
              >
                <div>
                  <h4 className="font-medium">{feature.feature}</h4>
                  <p className="text-muted-foreground text-sm">
                    {feature.uses} uses by {feature.uniqueUsers} unique users
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">
                    {feature.successRate}%
                  </div>
                  <p className="text-muted-foreground text-sm">Success Rate</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendation Engagement */}
      <Card>
        <CardHeader>
          <CardTitle>Smart Recommendations</CardTitle>
          <CardDescription>
            AI recommendation system performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-4">
            <div className="text-center">
              <div className="font-bold text-2xl">
                {data.recommendationEngagement.impressions}
              </div>
              <p className="text-muted-foreground text-sm">Impressions</p>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl">
                {data.recommendationEngagement.clicks}
              </div>
              <p className="text-muted-foreground text-sm">Clicks</p>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl">
                {data.recommendationEngagement.clickThroughRate}%
              </div>
              <p className="text-muted-foreground text-sm">CTR</p>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl">
                {data.recommendationEngagement.conversionRate}%
              </div>
              <p className="text-muted-foreground text-sm">Conversion</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Performance Dashboard Tab
function PerformanceDashboard({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      {/* Core Web Vitals */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
        <WebVitalCard
          title="Largest Contentful Paint"
          value={data.coreWebVitals.lcp.value}
          rating={data.coreWebVitals.lcp.rating}
          unit="ms"
          description="Time to largest content element"
        />
        <WebVitalCard
          title="First Input Delay"
          value={data.coreWebVitals.fid.value}
          rating={data.coreWebVitals.fid.rating}
          unit="ms"
          description="Interactivity responsiveness"
        />
        <WebVitalCard
          title="Cumulative Layout Shift"
          value={data.coreWebVitals.cls.value}
          rating={data.coreWebVitals.cls.rating}
          unit=""
          description="Visual stability score"
        />
      </div>

      {/* Performance Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trend</CardTitle>
          <CardDescription>
            Core Web Vitals trend over time
            <Badge
              variant={
                data.coreWebVitals.trend === 'improving'
                  ? 'default'
                  : 'secondary'
              }
              className="ml-2"
            >
              {data.coreWebVitals.trend === 'improving' ? (
                <MaterialIcon icon="trending_up" className="mr-1 w-3 h-3" />
              ) : (
                <MaterialIcon icon="trending_down" className="mr-1 w-3 h-3" />
              )}
              {data.coreWebVitals.trend}
            </Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.pageLoadTimes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="page" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="averageLoadTime"
                stroke={COLORS.primary}
              />
              <Line
                type="monotone"
                dataKey="p95LoadTime"
                stroke={COLORS.warning}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* System Health */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Error Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Total Errors</span>
                <span className="font-bold">{data.errorRates.totalErrors}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Error Rate</span>
                <span className="font-bold">{data.errorRates.errorRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Critical Errors</span>
                <Badge
                  variant={
                    data.errorRates.criticalErrors > 0
                      ? 'destructive'
                      : 'default'
                  }
                >
                  {data.errorRates.criticalErrors}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Cache Hit Rate</span>
                <span className="font-bold">
                  {data.resourceMetrics.cacheHitRate}%
                </span>
              </div>
              <Progress value={data.resourceMetrics.cacheHitRate} />

              <div className="flex justify-between items-center">
                <span>API Calls</span>
                <span className="font-bold">
                  {data.resourceMetrics.apiCalls}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span>Uptime</span>
                <span className="font-bold">{data.uptimeMetrics.uptime}%</span>
              </div>
              <Progress value={data.uptimeMetrics.uptime} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Conversions Dashboard Tab
function ConversionsDashboard({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      {/* Conversion Metrics */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Conversions"
          value={data.veteranConversions.totalConversions}
          change={+18.2}
          icon="track_changes"
          color="success"
        />
        <MetricCard
          title="Conversion Rate"
          value={`${data.veteranConversions.conversionRate}%`}
          change={+3.1}
          icon="trending_up"
          color="primary"
        />
        <MetricCard
          title="Avg. Project Value"
          value={`$${data.veteranConversions.averageProjectValue?.toLocaleString() || 0}`}
          change={+12.5}
          icon="show_chart"
          color="info"
        />
        <MetricCard
          title="Estimator → Contact"
          value={`${data.estimatorToContact}%`}
          change={+5.8}
          icon="bar_chart"
          color="secondary"
        />
      </div>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Conversion Funnel</CardTitle>
          <CardDescription>Step-by-step conversion analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.funnelAnalysis.map((step: any, index: number) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="flex flex-shrink-0 justify-center items-center bg-primary rounded-full w-8 h-8 font-bold text-white text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{step.step}</h4>
                    <div className="text-right">
                      <div className="font-bold">{step.users} users</div>
                      <div className="text-muted-foreground text-sm">
                        {step.conversionRate}% conversion
                      </div>
                    </div>
                  </div>
                  <Progress value={step.conversionRate} className="mt-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Conversion Sources */}
      <Card>
        <CardHeader>
          <CardTitle>Conversion by Source</CardTitle>
          <CardDescription>Which traffic sources convert best</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.conversionsBySource}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="source" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="conversions" fill={COLORS.primary} />
              <Bar dataKey="value" fill={COLORS.success} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

// Veterans Dashboard Tab
function VeteransDashboard({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      {/* Veteran Metrics */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Veteran Users"
          value={data.veteranUsers}
          change={+8.3}
          icon="military_tech"
          color="primary"
        />
        <MetricCard
          title="Conversion Rate"
          value={`${data.conversionRates.overall}%`}
          change={+12.1}
          icon="track_changes"
          color="success"
        />
        <MetricCard
          title="Specialist Contacts"
          value={data.specialistEngagement.contacts}
          change={+25.7}
          icon="group"
          color="info"
        />
        <MetricCard
          title="Benefits Utilization"
          value={`${data.conversionRates.withBenefits}%`}
          change={+15.2}
          icon="star"
          color="warning"
        />
      </div>

      {/* Branch Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Military Branch Distribution</CardTitle>
          <CardDescription>Veteran users by service branch</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.branchDistribution}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="users"
                nameKey="branch"
              >
                {data.branchDistribution.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Benefits Utilization */}
      <Card>
        <CardHeader>
          <CardTitle>Benefit Programs</CardTitle>
          <CardDescription>Most accessed veteran benefits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.benefitUtilization.map((benefit: any, index: number) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 border rounded-lg"
              >
                <div>
                  <h4 className="font-medium">{benefit.benefit}</h4>
                  <p className="text-muted-foreground text-sm">
                    {benefit.views} views • {benefit.utilization}% utilization
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600 text-lg">
                    ${benefit.savings?.toLocaleString() || 0}
                  </div>
                  <p className="text-muted-foreground text-sm">Avg. Savings</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Specialist Performance */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Specialist Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Total Contacts</span>
                <span className="font-bold">
                  {data.specialistEngagement.contacts}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Response Time</span>
                <span className="font-bold">
                  {data.specialistEngagement.averageResponseTime}h
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Satisfaction</span>
                <div className="flex items-center">
                  <MaterialIcon
                    icon="star"
                    className="mr-1 w-4 h-4 text-yellow-500"
                  />
                  <span className="font-bold">
                    {data.specialistEngagement.satisfaction}/5
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Overall</span>
                <span className="font-bold">
                  {data.conversionRates.overall}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>With Benefits</span>
                <span className="font-bold">
                  {data.conversionRates.withBenefits}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>With Specialist</span>
                <span className="font-bold">
                  {data.conversionRates.withSpecialist}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Real-time Dashboard Tab
function RealTimeDashboard({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      {/* Real-time Metrics */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Active Users"
          value={data.activeUsers}
          icon="group"
          color="success"
          realTime
        />
        <MetricCard
          title="Current Sessions"
          value={data.currentSessions.length}
          icon="show_chart"
          color="primary"
          realTime
        />
        <MetricCard
          title="System Status"
          value={data.systemHealth.status}
          icon={
            data.systemHealth.status === 'healthy' ? 'check_circle' : 'warning'
          }
          color={data.systemHealth.status === 'healthy' ? 'success' : 'warning'}
          realTime
        />
        <MetricCard
          title="Response Time"
          value={`${data.systemHealth.responseTime}ms`}
          icon="schedule"
          color="info"
          realTime
        />
      </div>

      {/* Live Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Live Activity Feed</CardTitle>
          <CardDescription>Real-time user events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {data.recentEvents.map((event: AnalyticsEvent, index: number) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-2 border rounded"
              >
                <div className="bg-green-500 rounded-full w-2 h-2 animate-pulse" />
                <div className="flex-1">
                  <div className="font-medium text-sm">
                    {event.type.replace('_', ' ')}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    {event.metadata.page} •{' '}
                    {event.timestamp.toLocaleTimeString()}
                  </div>
                </div>
                {event.properties.isVeteran && (
                  <Badge variant="secondary">
                    <MaterialIcon
                      icon="military_tech"
                      className="mr-1 w-3 h-3"
                    />
                    Veteran
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>Currently active user sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.currentSessions.map((session: any, index: number) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 border rounded"
              >
                <div>
                  <div className="font-medium">
                    Session {session.sessionId.slice(-8)}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {session.currentPage} • {session.events} events
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {session.isVeteran && (
                    <Badge variant="secondary">
                      <MaterialIcon
                        icon="military_tech"
                        className="mr-1 w-3 h-3"
                      />
                      Veteran
                    </Badge>
                  )}
                  <Badge variant="outline">
                    {Math.round(
                      (Date.now() - new Date(session.startTime).getTime()) /
                        1000 /
                        60
                    )}
                    m
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Utility Components

function MetricCard({
  title,
  value,
  change,
  icon,
  color = 'primary',
  realTime = false,
}: {
  title: string
  value: string | number
  change?: number
  icon: string
  color?: keyof typeof COLORS
  realTime?: boolean
}) {
  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center p-6">
          <div>
            <p className="font-medium text-gray-500 text-sm">{title}</p>
            <div className="flex items-center space-x-2">
              <div className="font-bold text-2xl">{value}</div>
              {realTime && (
                <div className="bg-green-500 rounded-full w-2 h-2 animate-pulse" />
              )}
            </div>
            {change !== undefined && (
              <div
                className={`flex items-center text-sm ${
                  change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {change >= 0 ? (
                  <MaterialIcon icon="trending_up" className="mr-1 w-4 h-4" />
                ) : (
                  <MaterialIcon icon="trending_down" className="mr-1 w-4 h-4" />
                )}
                {Math.abs(change)}% from last period
              </div>
            )}
          </div>
          <MaterialIcon
            icon={icon}
            className="w-8 h-8"
            style={{ color: COLORS[color] }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

function WebVitalCard({
  title,
  value,
  rating,
  unit,
  description,
}: {
  title: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  unit: string
  description: string
}) {
  const ratingColors = {
    good: 'text-green-600',
    'needs-improvement': 'text-yellow-600',
    poor: 'text-red-600',
  }

  const ratingBadges = {
    good: 'default',
    'needs-improvement': 'secondary',
    poor: 'destructive',
  } as const

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="font-bold text-3xl">
            {value.toFixed(rating === 'good' ? 0 : 2)}
            {unit}
          </div>
          <Badge
            variant={ratingBadges[rating]}
            className={ratingColors[rating]}
          >
            {rating.replace('-', ' ')}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="bg-gray-200 rounded w-1/3 h-8" />
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-200 rounded h-32" />
        ))}
      </div>
      <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-gray-200 rounded h-64" />
        ))}
      </div>
    </div>
  )
}

export default AnalyticsDashboard
