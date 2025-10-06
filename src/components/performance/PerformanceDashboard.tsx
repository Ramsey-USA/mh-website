/**
 * Performance Dashboard Component
 * Real-time performance monitoring and optimization insights
 */

'use client'

import React, { useState } from 'react'
import { usePerformanceMetrics, useBundleAnalysis } from '@/lib/performance/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { performanceManager } from '@/lib/performance/performance-manager'

interface MetricCardProps {
  title: string
  value: string | number
  description: string
  status: 'good' | 'warning' | 'error'
}

function MetricCard({ title, value, description, status }: MetricCardProps) {
  const statusColors = {
    good: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`h-2 w-2 rounded-full ${statusColors[status]}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

interface PerformanceChartProps {
  metrics: Array<{ name: string; value: number; timestamp: number }>
  title: string
}

function PerformanceChart({ metrics, title }: PerformanceChartProps) {
  const maxValue = Math.max(...metrics.map(m => m.value))
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Performance metrics over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {metrics.slice(-10).map((metric, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-20 text-sm text-muted-foreground">
                {new Date(metric.timestamp).toLocaleTimeString()}
              </div>
              <div className="flex-1 bg-secondary rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(metric.value / maxValue) * 100}%` }}
                />
              </div>
              <div className="w-16 text-sm text-right">
                {metric.value.toFixed(1)}ms
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

interface RecommendationListProps {
  recommendations: string[]
  title: string
}

function RecommendationList({ recommendations, title }: RecommendationListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Optimization suggestions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {recommendations.length > 0 ? (
            recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Badge variant="outline" className="mt-0.5">
                  {index + 1}
                </Badge>
                <p className="text-sm">{recommendation}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No recommendations at this time. Performance looks good!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

interface CacheStatsProps {
  stats: {
    hits: number
    misses: number
    size: number
  }
}

function CacheStats({ stats }: CacheStatsProps) {
  const hitRate = stats.hits + stats.misses > 0 
    ? (stats.hits / (stats.hits + stats.misses) * 100).toFixed(1)
    : '0'

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cache Performance</CardTitle>
        <CardDescription>Caching efficiency metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.hits}</div>
            <div className="text-sm text-muted-foreground">Hits</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{stats.misses}</div>
            <div className="text-sm text-muted-foreground">Misses</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.size}</div>
            <div className="text-sm text-muted-foreground">Cached Items</div>
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold">{hitRate}%</div>
          <div className="text-sm text-muted-foreground">Hit Rate</div>
        </div>
      </CardContent>
    </Card>
  )
}

export function PerformanceDashboard() {
  const { metrics, report, clearMetrics } = usePerformanceMetrics(2000)
  const { analysis, loading: bundleLoading, reanalyze } = useBundleAnalysis()
  const [selectedTab, setSelectedTab] = useState<'overview' | 'metrics' | 'bundle' | 'cache'>('overview')

  // Calculate key performance indicators
  const webVitals = {
    fcp: metrics.filter(m => m.name === 'first_contentful_paint').slice(-1)[0]?.value || 0,
    lcp: metrics.filter(m => m.name === 'largest_contentful_paint').slice(-1)[0]?.value || 0,
    cls: metrics.filter(m => m.name === 'cumulative_layout_shift').slice(-1)[0]?.value || 0,
    fid: metrics.filter(m => m.name === 'first_input_delay').slice(-1)[0]?.value || 0,
  }

  const getVitalStatus = (name: keyof typeof webVitals) => {
    const value = webVitals[name]
    const thresholds = performanceManager['config'].thresholds
    
    switch (name) {
      case 'fcp':
        return value <= thresholds.firstContentfulPaint ? 'good' : value <= thresholds.firstContentfulPaint * 1.5 ? 'warning' : 'error'
      case 'lcp':
        return value <= thresholds.largestContentfulPaint ? 'good' : value <= thresholds.largestContentfulPaint * 1.5 ? 'warning' : 'error'
      case 'cls':
        return value <= thresholds.cumulativeLayoutShift ? 'good' : value <= thresholds.cumulativeLayoutShift * 2 ? 'warning' : 'error'
      case 'fid':
        return value <= thresholds.firstInputDelay ? 'good' : value <= thresholds.firstInputDelay * 2 ? 'warning' : 'error'
      default:
        return 'good'
    }
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'metrics', label: 'Metrics' },
    { id: 'bundle', label: 'Bundle Analysis' },
    { id: 'cache', label: 'Cache Stats' },
  ] as const

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Performance Dashboard</h2>
          <p className="text-muted-foreground">
            Monitor and optimize your application performance
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={reanalyze} variant="outline" disabled={bundleLoading}>
            {bundleLoading ? 'Analyzing...' : 'Reanalyze Bundle'}
          </Button>
          <Button onClick={clearMetrics} variant="outline">
            Clear Metrics
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {selectedTab === 'overview' && (
        <div className="space-y-6">
          {/* Web Vitals */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="First Contentful Paint"
              value={`${webVitals.fcp.toFixed(0)}ms`}
              description="Time to first content render"
              status={getVitalStatus('fcp')}
            />
            <MetricCard
              title="Largest Contentful Paint"
              value={`${webVitals.lcp.toFixed(0)}ms`}
              description="Time to main content render"
              status={getVitalStatus('lcp')}
            />
            <MetricCard
              title="Cumulative Layout Shift"
              value={webVitals.cls.toFixed(3)}
              description="Visual stability score"
              status={getVitalStatus('cls')}
            />
            <MetricCard
              title="First Input Delay"
              value={`${webVitals.fid.toFixed(0)}ms`}
              description="Time to interactive"
              status={getVitalStatus('fid')}
            />
          </div>

          {/* Recommendations */}
          <div className="grid gap-6 md:grid-cols-2">
            <RecommendationList
              title="Performance Recommendations"
              recommendations={report?.recommendations || []}
            />
            <RecommendationList
              title="Bundle Recommendations"
              recommendations={analysis?.recommendations || []}
            />
          </div>
        </div>
      )}

      {selectedTab === 'metrics' && (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <PerformanceChart
              title="Render Times"
              metrics={metrics.filter(m => m.type === 'rendering')}
            />
            <PerformanceChart
              title="Network Times"
              metrics={metrics.filter(m => m.type === 'network')}
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Metrics</CardTitle>
              <CardDescription>Latest performance measurements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {metrics.slice(-20).reverse().map((metric, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{metric.type}</Badge>
                      <span className="font-medium">{metric.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        {new Date(metric.timestamp).toLocaleTimeString()}
                      </span>
                      <span className="font-mono">
                        {metric.value.toFixed(2)}
                        {metric.type === 'memory' ? ' bytes' : 'ms'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedTab === 'bundle' && (
        <div className="space-y-6">
          {analysis && (
            <>
              <div className="grid gap-4 md:grid-cols-3">
                <MetricCard
                  title="Total Bundle Size"
                  value={formatBytes(analysis.totalSize)}
                  description="Total size of all chunks"
                  status={analysis.totalSize > 1024 * 1024 ? 'warning' : 'good'}
                />
                <MetricCard
                  title="Number of Chunks"
                  value={analysis.chunks.length}
                  description="Total JavaScript chunks"
                  status="good"
                />
                <MetricCard
                  title="Largest Chunk"
                  value={formatBytes(Math.max(...analysis.chunks.map(c => c.size)))}
                  description="Size of largest chunk"
                  status={Math.max(...analysis.chunks.map(c => c.size)) > 500 * 1024 ? 'warning' : 'good'}
                />
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Bundle Breakdown</CardTitle>
                  <CardDescription>Individual chunk sizes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {analysis.chunks
                      .sort((a, b) => b.size - a.size)
                      .map((chunk, index) => (
                        <div key={index} className="flex items-center justify-between py-2">
                          <span className="font-medium">{chunk.name}</span>
                          <span className="text-sm">{formatBytes(chunk.size)}</span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      )}

      {selectedTab === 'cache' && report && (
        <div className="space-y-6">
          <CacheStats stats={report.cacheStats} />
          
          <Card>
            <CardHeader>
              <CardTitle>Cache Performance Summary</CardTitle>
              <CardDescription>Overall caching statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(report.summary).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between py-2 border-b">
                    <span className="font-medium">{key.replace(/_/g, ' ').toUpperCase()}</span>
                    <span className="font-mono">
                      {typeof value === 'number' ? value.toFixed(2) : value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}