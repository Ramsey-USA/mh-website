'use client'

import React from 'react'
import performanceMonitoring from '@/lib/performance/monitoring'

/**
 * Example component demonstrating the performance monitoring system
 * This shows how to use Core Web Vitals tracking and performance reporting
 */
export default function PerformanceExample() {
  // Use the performance monitoring hook
  const { metrics, isReady } = performanceMonitoring.usePerformanceMonitoring()

  // Generate performance report from metrics
  const report = isReady
    ? performanceMonitoring.generatePerformanceReport(metrics)
    : null

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg">
      <h2 className="mb-4 font-bold text-2xl">
        Performance Monitoring Example
      </h2>

      {!isReady ? (
        <p className="text-gray-600">Collecting performance metrics...</p>
      ) : (
        <div className="space-y-4">
          {/* Core Web Vitals Display */}
          <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
            <div className="bg-blue-50 p-4 rounded">
              <h3 className="font-semibold text-blue-800">CLS</h3>
              <p className="font-bold text-blue-600 text-2xl">
                {metrics.cls ? metrics.cls.toFixed(3) : 'N/A'}
              </p>
              <p className="text-gray-600 text-sm">Cumulative Layout Shift</p>
            </div>

            <div className="bg-green-50 p-4 rounded">
              <h3 className="font-semibold text-green-800">INP</h3>
              <p className="font-bold text-green-600 text-2xl">
                {metrics.inp ? `${metrics.inp.toFixed(0)}ms` : 'N/A'}
              </p>
              <p className="text-gray-600 text-sm">Interaction to Next Paint</p>
            </div>

            <div className="bg-purple-50 p-4 rounded">
              <h3 className="font-semibold text-purple-800">LCP</h3>
              <p className="font-bold text-purple-600 text-2xl">
                {metrics.lcp ? `${metrics.lcp.toFixed(0)}ms` : 'N/A'}
              </p>
              <p className="text-gray-600 text-sm">Largest Contentful Paint</p>
            </div>
          </div>

          {/* Performance Score */}
          {report && (
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="mb-2 font-semibold">Performance Score</h3>
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`w-4 h-4 rounded-full ${
                    report.status === 'excellent'
                      ? 'bg-green-500'
                      : report.status === 'good'
                      ? 'bg-blue-500'
                      : report.status === 'needs-improvement'
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                ></div>
                <span className="font-medium">{report.score}/100</span>
                <span className="text-gray-600">({report.status})</span>
              </div>

              {report.recommendations.length > 0 && (
                <div>
                  <h4 className="mb-1 font-medium">Recommendations:</h4>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    {report.recommendations
                      .slice(0, 3)
                      .map((rec: string, index: number) => (
                        <li key={index} className="flex items-start gap-1">
                          <span className="mt-0.5 text-blue-500">•</span>
                          {rec}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Formatted Metrics */}
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="mb-2 font-semibold">All Metrics</h3>
            <div className="gap-2 grid grid-cols-2 text-sm">
              {Object.entries(performanceMonitoring.formatMetrics(metrics)).map(
                ([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-600 uppercase">{key}:</span>
                    <span className="font-medium">{value}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
