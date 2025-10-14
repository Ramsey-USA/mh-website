/**
 * Next.js Performance Optimizations
 * App-wide performance configuration and optimization utilities
 */

import React from 'react'
import { performanceManager } from './performance-manager'
import { cacheManager, apiCache } from './caching'

/**
 * Performance configuration for the application
 */
export const performanceConfig = {
  // Cache TTL values (in milliseconds)
  cache: {
    default: 5 * 60 * 1000, // 5 minutes
    static: 60 * 60 * 1000, // 1 hour
    dynamic: 1 * 60 * 1000, // 1 minute
    api: 2 * 60 * 1000, // 2 minutes
  },
  
  // Performance thresholds
  thresholds: {
    fcp: 1800, // First Contentful Paint
    lcp: 2500, // Largest Contentful Paint
    fid: 100,  // First Input Delay
    cls: 0.1,  // Cumulative Layout Shift
    ttfb: 600, // Time to First Byte
  },
  
  // Image optimization settings
  images: {
    lazyLoading: true,
    placeholder: 'blur' as const,
    quality: 85,
    formats: ['webp', 'avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}

/**
 * Initialize performance monitoring on app start
 */
export function initializePerformance() {
  if (typeof window !== 'undefined') {
    // Record page load performance
    window.addEventListener('load', () => {
      performanceManager.recordMetric({
        type: 'timing',
        name: 'page_load',
        value: performance.now(),
        timestamp: Date.now(),
        metadata: { url: window.location.href }
      })
    })
    
    // Monitor unhandled errors
    window.addEventListener('error', (event) => {
      performanceManager.recordMetric({
        type: 'interaction',
        name: 'error_count',
        value: 1,
        timestamp: Date.now(),
        metadata: {
          message: event.message,
          filename: event.filename,
          line: event.lineno,
        }
      })
    })
    
    // Monitor unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      performanceManager.recordMetric({
        type: 'interaction',
        name: 'promise_rejection_count',
        value: 1,
        timestamp: Date.now(),
        metadata: {
          reason: String(event.reason),
        }
      })
    })
    
    console.log('Performance monitoring initialized')
  }
}

/**
 * Performance-optimized fetch wrapper
 */
export async function performanceFetch(
  url: string,
  options: RequestInit & { 
    cache?: boolean
    cacheKey?: string
    cacheTTL?: number
  } = {}
) {
  const startTime = performance.now()
  const { cache = true, cacheKey, cacheTTL, ...fetchOptions } = options
  
  try {
    // Use API cache if enabled
    if (cache && typeof window !== 'undefined') {
      const data = await apiCache.cachedFetch(url, {
        ...fetchOptions,
        cacheConfig: {
          ttl: cacheTTL || performanceConfig.cache.api,
          version: '1.0'
        }
      })
      
      performanceManager.recordMetric({
        type: 'network',
        name: 'cache_hit',
        value: 1,
        timestamp: Date.now(),
        metadata: { url }
      })
      
      return data
    }
    
    // Make the request without cache
    const response = await fetch(url, fetchOptions)
    const data = await response.json()
    
    // Record performance metrics
    const duration = performance.now() - startTime
    performanceManager.recordMetric({
      type: 'timing',
      name: 'api_request_duration',
      value: duration,
      timestamp: Date.now(),
      metadata: { url }
    })
    
    if (!response.ok) {
      performanceManager.recordMetric({
        type: 'network',
        name: 'api_error_count',
        value: 1,
        timestamp: Date.now(),
        metadata: { 
          url, 
          status: response.status 
        }
      })
    }
    
    return data
  } catch (error) {
    const duration = performance.now() - startTime
    performanceManager.recordMetric({
      type: 'timing',
      name: 'api_request_duration',
      value: duration,
      timestamp: Date.now(),
      metadata: { url, error: true }
    })
    
    performanceManager.recordMetric({
      type: 'network',
      name: 'api_error_count',
      value: 1,
      timestamp: Date.now(),
      metadata: { 
        url, 
        error: error instanceof Error ? error.message : String(error)
      }
    })
    throw error
  }
}

/**
 * Performance-optimized component wrapper
 */
export function withPerformanceTracking<P extends Record<string, any>>(
  Component: React.ComponentType<P>,
  componentName: string
) {
  const WrappedComponent = React.forwardRef<any, P>((props, ref) => {
    const renderStart = React.useRef<number>(0)
    
    // Track render start
    renderStart.current = performance.now()
    
    // Track render completion
    React.useLayoutEffect(() => {
      if (renderStart.current) {
        const renderTime = performance.now() - renderStart.current
        performanceManager.recordMetric({
          type: 'timing',
          name: 'component_render_time',
          value: renderTime,
          timestamp: Date.now(),
          metadata: {
            component: componentName
          }
        })
      }
    })
    
    // Use a typed approach for props spreading
    const componentProps = { ...props } as P
    if (ref) {
      (componentProps as any).ref = ref
    }
    
    return React.createElement(Component, componentProps)
  })
  
  WrappedComponent.displayName = `withPerformanceTracking(${componentName})`
  return WrappedComponent
}

/**
 * Preload critical resources
 */
export function preloadCriticalResources() {
  if (typeof window !== 'undefined') {
    // Preload critical fonts
    const fontUrls = [
      '/fonts/inter-var.woff2',
      '/fonts/inter-bold.woff2',
    ]
    
    fontUrls.forEach(url => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'font'
      link.type = 'font/woff2'
      link.crossOrigin = 'anonymous'
      link.href = url
      document.head.appendChild(link)
    })
    
    // Preload critical images
    const criticalImages = [
      '/images/logo/mh-logo.png',
      '/images/hero-background.jpg',
    ]
    
    criticalImages.forEach(url => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = url
      document.head.appendChild(link)
    })
  }
}

/**
 * Cleanup performance monitoring on app unmount
 */
export function cleanupPerformance() {
  if (typeof window !== 'undefined') {
    performanceManager.destroy()
    console.log('Performance monitoring cleaned up')
  }
}