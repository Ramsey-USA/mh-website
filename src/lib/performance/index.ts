/**
 * Performance Optimization Library
 * Comprehensive performance monitoring, caching, and optimization utilities
 */

// Core performance management
export { performanceManager, queryOptimizer } from './performance-manager'
export { cacheManager, apiCache, dbCache } from './caching'

// Performance hooks for React components
export {
  usePerformanceTiming,
  useMemoryMonitoring,
  useOptimizedQuery,
  useLazyImage,
  usePerformanceMetrics,
  useDynamicImport,
  useBundleAnalysis
} from './hooks'

// Optimized components
export { PerformanceDashboard } from '../../components/performance/PerformanceDashboard'
export { OptimizedImage } from '../../components/performance/OptimizedImage'

// Code splitting utilities
export {
  createDynamicImport,
  createRouteComponent,
  createFeatureComponent,
  BundleSplittingAnalyzer,
  bundleAnalyzer,
  preloadRoute,
  preloadOnHover
} from './code-splitting'

// App-wide performance utilities
export {
  performanceConfig,
  initializePerformance,
  performanceFetch,
  withPerformanceTracking,
  preloadCriticalResources,
  cleanupPerformance
} from './app-performance'

// Types
export type {
  PerformanceMetric,
  CacheEntry
} from './performance-manager'

export type {
  CacheConfig
} from './caching'

/**
 * Quick start guide for performance optimization:
 * 
 * 1. Initialize performance monitoring:
 *    ```ts
 *    import { initializePerformance } from '@/lib/performance'
 *    initializePerformance()
 *    ```
 * 
 * 2. Use performance hooks in components:
 *    ```tsx
 *    import { usePerformanceTiming } from '@/lib/performance'
 *    const { trackInteraction } = usePerformanceTiming('ComponentName')
 *    ```
 * 
 * 3. Optimize images:
 *    ```tsx
 *    import { OptimizedImage } from '@/lib/performance'
 *    <OptimizedImage src="/image.jpg" alt="Description" />
 *    ```
 * 
 * 4. Use optimized fetch:
 *    ```ts
 *    import { performanceFetch } from '@/lib/performance'
 *    const data = await performanceFetch('/api/data')
 *    ```
 * 
 * 5. Lazy load components:
 *    ```tsx
 *    import { createDynamicImport } from '@/lib/performance'
 *    const LazyComponent = createDynamicImport(() => import('./Component'))
 *    ```
 * 
 * 6. Monitor performance:
 *    ```tsx
 *    import { PerformanceDashboard } from '@/lib/performance'
 *    <PerformanceDashboard />
 *    ```
 */