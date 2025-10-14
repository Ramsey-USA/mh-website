'use client'

import React from 'react'
import { useIntersectionObserver } from '../../hooks/usePerformanceOptimization'

// Lazy loading component wrapper
interface LazyWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  threshold?: number
  rootMargin?: string
  className?: string
}

export function LazyWrapper({
  children,
  fallback = <div className="bg-gray-200 rounded h-32 animate-pulse" />,
  threshold = 0.1,
  rootMargin = '50px',
  className = '',
}: LazyWrapperProps) {
  const [ref, isIntersecting] = useIntersectionObserver(
    threshold,
    rootMargin,
    true
  )

  return (
    <div ref={ref as any} className={className}>
      {isIntersecting ? children : fallback}
    </div>
  )
}

// Skeleton loading component
export function SkeletonLoader({
  variant = 'rectangular',
  width = '100%',
  height = '1rem',
  className = '',
}: {
  variant?: 'rectangular' | 'circular' | 'text'
  width?: string | number
  height?: string | number
  className?: string
}) {
  const baseClasses = 'animate-pulse bg-gray-200 dark:bg-gray-700'

  const variantClasses = {
    rectangular: 'rounded',
    circular: 'rounded-full',
    text: 'rounded',
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{ width, height }}
    />
  )
}

// Grid skeleton for cards
export function GridSkeleton({
  count = 6,
  columns = 3,
  className = '',
}: {
  count?: number
  columns?: number
  className?: string
}) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-${Math.min(
        columns,
        3
      )} gap-6 ${className}`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="space-y-4">
          <SkeletonLoader height="12rem" />
          <SkeletonLoader height="1.5rem" width="75%" />
          <SkeletonLoader height="1rem" width="50%" />
        </div>
      ))}
    </div>
  )
}

// Text skeleton with multiple lines
export function TextSkeleton({
  lines = 3,
  className = '',
}: {
  lines?: number
  className?: string
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <SkeletonLoader
          key={index}
          height="1rem"
          width={index === lines - 1 ? '60%' : '100%'}
        />
      ))}
    </div>
  )
}
