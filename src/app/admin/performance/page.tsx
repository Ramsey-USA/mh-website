/**
 * Performance Monitoring Page
 * Admin page for monitoring and optimizing application performance
 */

"use client";

import React from "react";
// Temporarily commented out for configuration testing
// import { PerformanceDashboard } from '@/components/performance/PerformanceDashboard'
// import { usePerformanceTiming, useMemoryMonitoring } from '@/lib/performance/hooks'

export default function PerformanceMonitoringPage() {
  // const { trackInteraction } = usePerformanceTiming('PerformanceMonitoringPage')
  // const memoryInfo = useMemoryMonitoring('PerformanceMonitoringPage', 5000)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-3xl">Performance Monitoring</h1>
        <p className="text-muted-foreground">
          Real-time application performance metrics and optimization insights.
        </p>
      </div>

      {/* Temporarily disabled for configuration testing */}
      <div className="p-8 border-2 border-gray-300 border-dashed rounded-lg text-center">
        <p className="text-gray-500">
          Performance Dashboard temporarily disabled during configuration
          updates
        </p>
      </div>

      {/* <PerformanceDashboard /> */}
    </div>
  );
}
