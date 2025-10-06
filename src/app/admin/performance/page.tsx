/**
 * Performance Monitoring Page
 * Admin page for monitoring and optimizing application performance
 */

'use client'

import React from 'react'
import { PerformanceDashboard } from '@/components/performance/PerformanceDashboard'
import { usePerformanceTiming, useMemoryMonitoring } from '@/lib/performance/hooks'

export default function PerformanceMonitoringPage() {
  const { trackInteraction } = usePerformanceTiming('PerformanceMonitoringPage')
  const memoryInfo = useMemoryMonitoring('PerformanceMonitoringPage', 5000)

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Performance Monitoring</h1>
          <p className="text-muted-foreground text-lg">
            Monitor and optimize your application's performance metrics
          </p>
        </div>
        
        {/* Memory Usage Indicator */}
        {memoryInfo.usedJSHeapSize && (
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Memory Usage</div>
            <div className="text-lg font-semibold">
              {(memoryInfo.usedJSHeapSize / 1024 / 1024).toFixed(1)} MB
            </div>
            <div className="text-xs text-muted-foreground">
              / {memoryInfo.jsHeapSizeLimit ? (memoryInfo.jsHeapSizeLimit / 1024 / 1024).toFixed(0) : '?'} MB
            </div>
          </div>
        )}
      </div>

      <PerformanceDashboard />
    </div>
  )
}