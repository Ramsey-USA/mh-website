/**
 * Performance Optimization Usage Examples
 * Demonstrates how to use the performance optimization library
 */

'use client'

import React from 'react'
import {
  initializePerformance,
  performanceFetch,
  withPerformanceTracking,
  usePerformanceTiming,
  useMemoryMonitoring,
  OptimizedImage,
  createDynamicImport,
  PerformanceDashboard,
  performanceManager,
  cleanupPerformance
} from './index'

// Example 1: Initialize performance monitoring in your app
export function initializeAppPerformance() {
  initializePerformance()
  
  // Optional: Add custom performance tracking
  if (typeof window !== 'undefined') {
    // Track route changes
    window.addEventListener('popstate', () => {
      performanceManager.recordMetric({
        type: 'interaction',
        name: 'route_change',
        value: 1,
        timestamp: Date.now(),
        metadata: { url: window.location.href }
      })
    })
    
    // Clean up on page unload
    window.addEventListener('beforeunload', cleanupPerformance)
  }
}

// Example 2: Component with performance tracking
const ExampleComponent = ({ title, data }: { title: string; data: any[] }) => {
  const { trackInteraction } = usePerformanceTiming('ExampleComponent')
  const memoryInfo = useMemoryMonitoring('ExampleComponent')
  
  const handleButtonClick = () => {
    trackInteraction('button_click')
    // Your click handler logic
  }
  
  return (
    <div>
      <h2>{title}</h2>
      <button onClick={handleButtonClick}>
        Click me
      </button>
      <div>Items: {data.length}</div>
      {memoryInfo.usedJSHeapSize && (
        <div className="text-xs text-gray-500">
          Memory: {(memoryInfo.usedJSHeapSize / 1024 / 1024).toFixed(1)} MB
        </div>
      )}
    </div>
  )
}

// Example 3: Wrap component with performance tracking
export const TrackedExampleComponent = withPerformanceTracking(
  ExampleComponent,
  'ExampleComponent'
)

// Example 4: Optimized data fetching
export async function fetchUserData(userId: string) {
  try {
    const userData = await performanceFetch(`/api/users/${userId}`, {
      cacheTTL: 5 * 60 * 1000, // 5 minutes
      cacheKey: `user_${userId}`
    })
    
    return userData
  } catch (error) {
    console.error('Failed to fetch user data:', error)
    throw error
  }
}

// Example 5: Simple lazy component placeholder
const LazyHeavyComponent = () => (
  <div className="p-4 border rounded">
    <h3>Heavy Component Placeholder</h3>
    <p>This would be a dynamically imported component</p>
  </div>
)

// Example 6: Page component with performance monitoring
export function OptimizedPage() {
  const [users, setUsers] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)
  
  React.useEffect(() => {
    // Track page load
    const startTime = performance.now()
    
    Promise.all([
      fetchUserData('1'),
      fetchUserData('2'),
      fetchUserData('3')
    ]).then((userData) => {
      setUsers(userData)
      setLoading(false)
      
      // Record page load time
      performanceManager.recordMetric({
        type: 'timing',
        name: 'page_load_complete',
        value: performance.now() - startTime,
        timestamp: Date.now(),
        metadata: { page: 'OptimizedPage', userCount: userData.length }
      })
    })
  }, [])
  
  if (loading) {
    return <div>Loading...</div>
  }
  
  return (
    <div className="space-y-8">
      <h1>Optimized Page</h1>
      
      {/* Optimized images */}
      <div className="grid grid-cols-3 gap-4">
        {users.map((user: any) => (
          <div key={user.id}>
            <OptimizedImage
              src={user.avatar}
              alt={`${user.name} avatar`}
              width={100}
              height={100}
              className="rounded-full"
            />
            <p>{user.name}</p>
          </div>
        ))}
      </div>
      
      {/* Performance tracked component */}
      <TrackedExampleComponent 
        title="User List" 
        data={users} 
      />
      
      {/* Lazy loaded component */}
      <React.Suspense fallback={<div>Loading...</div>}>
        <LazyHeavyComponent />
      </React.Suspense>
      
      {/* Performance dashboard (admin only) */}
      {process.env.NODE_ENV === 'development' && (
        <PerformanceDashboard />
      )}
    </div>
  )
}

// Example 7: Performance monitoring hook
export function usePagePerformance(pageName: string) {
  const [metrics, setMetrics] = React.useState<any[]>([])
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      const pageMetrics = performanceManager.getMetrics('timing', 10)
        .filter(metric => metric.metadata?.page === pageName)
      setMetrics(pageMetrics)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [pageName])
  
  return {
    metrics,
    averageLoadTime: metrics.length > 0 
      ? metrics.reduce((sum, m) => sum + m.value, 0) / metrics.length 
      : 0
  }
}

// Example 8: Error boundary with performance tracking
export class PerformanceErrorBoundary extends React.Component<
  { children: React.ReactNode; componentName: string },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true }
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Track the error
    performanceManager.recordMetric({
      type: 'interaction',
      name: 'component_error',
      value: 1,
      timestamp: Date.now(),
      metadata: {
        component: this.props.componentName,
        error: error.message,
        stack: error.stack,
        errorInfo: errorInfo.componentStack
      }
    })
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 border border-red-200 rounded">
          <h2>Something went wrong in {this.props.componentName}</h2>
          <p>Please refresh the page or try again later.</p>
        </div>
      )
    }
    
    return this.props.children
  }
}

// Example 9: Performance configuration
export const performanceOptions = {
  // Initialize on app start
  init: initializeAppPerformance,
  
  // Fetch with caching
  fetch: performanceFetch,
  
  // Component tracking
  trackComponent: withPerformanceTracking,
  
  // Get performance report
  getReport: () => performanceManager.getPerformanceReport(),
  
  // Clear cache when needed
  clearCache: () => {
    if (typeof window !== 'undefined') {
      localStorage.clear()
      sessionStorage.clear()
    }
  }
}

const PerformanceExamples = {
  OptimizedPage,
  TrackedExampleComponent,
  PerformanceErrorBoundary,
  performanceOptions,
  usePagePerformance
}

export default PerformanceExamples