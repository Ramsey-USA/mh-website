'use client'

import { useEffect, useState } from 'react'

// Hook for preloading critical resources
export function usePreloadResources() {
  useEffect(() => {
    // Preload critical fonts
    const fontLinks = [
      '/fonts/TacticSans-Bold.woff2',
      '/fonts/TacticSans-Regular.woff2'
    ]
    
    fontLinks.forEach(href => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = href
      link.as = 'font'
      link.type = 'font/woff2'
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
    })

    // Preload critical images
    const criticalImages = [
      '/images/hero-bg.jpg',
      '/images/logo/mh-logo.png'
    ]
    
    criticalImages.forEach(src => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = src
      link.as = 'image'
      document.head.appendChild(link)
    })

    // DNS prefetch for external domains
    const domains = [
      'https://firebasestorage.googleapis.com',
      'https://www.google-analytics.com'
    ]
    
    domains.forEach(domain => {
      const link = document.createElement('link')
      link.rel = 'dns-prefetch'
      link.href = domain
      document.head.appendChild(link)
    })
  }, [])
}

// Hook for lazy loading and intersection observer
export function useIntersectionObserver(threshold = 0.1) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [ref, setRef] = useState<Element | null>(null)

  useEffect(() => {
    if (!ref || isIntersecting) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '50px' }
    )

    observer.observe(ref)
    return () => observer.disconnect()
  }, [ref, threshold, isIntersecting])

  return [setRef, isIntersecting] as const
}

// Hook for performance monitoring
export function usePerformanceMonitoring() {
  useEffect(() => {
    // Monitor page load performance
    if (typeof window !== 'undefined' && 'performance' in window) {
      const measurePageLoad = () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        
        if (navigation) {
          const metrics = {
            'Time to First Byte': navigation.responseStart - navigation.requestStart,
            'DOM Content Loaded': navigation.domContentLoadedEventEnd - navigation.fetchStart,
            'Page Load Complete': navigation.loadEventEnd - navigation.fetchStart
          }
          
          // In production, send to analytics
          if (process.env.NODE_ENV === 'production') {
            console.log('Performance Metrics:', metrics)
            // TODO: Send to analytics service
          }
        }
      }

      if (document.readyState === 'complete') {
        measurePageLoad()
      } else {
        window.addEventListener('load', measurePageLoad)
        return () => window.removeEventListener('load', measurePageLoad)
      }
    }
  }, [])
}

// Hook for optimizing images based on device capabilities
export function useImageOptimization() {
  const [supportsWebP, setSupportsWebP] = useState(false)
  const [supportsAVIF, setSupportsAVIF] = useState(false)
  const [devicePixelRatio, setDevicePixelRatio] = useState(1)

  useEffect(() => {
    // Check WebP support
    const webpCanvas = document.createElement('canvas')
    setSupportsWebP(webpCanvas.toDataURL('image/webp').indexOf('webp') > -1)

    // Check AVIF support
    const avifImage = new Image()
    avifImage.onload = () => setSupportsAVIF(true)
    avifImage.onerror = () => setSupportsAVIF(false)
    avifImage.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAABAA0ABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI='

    // Get device pixel ratio
    setDevicePixelRatio(window.devicePixelRatio || 1)
  }, [])

  const getOptimalImageFormat = (originalSrc: string) => {
    if (supportsAVIF) return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.avif')
    if (supportsWebP) return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp')
    return originalSrc
  }

  const getSizesAttribute = (maxWidth: number) => {
    const sizes = [
      `(max-width: 768px) ${Math.min(maxWidth, 768)}px`,
      `(max-width: 1200px) ${Math.min(maxWidth, 1200)}px`,
      `${maxWidth}px`
    ]
    return sizes.join(', ')
  }

  return {
    supportsWebP,
    supportsAVIF,
    devicePixelRatio,
    getOptimalImageFormat,
    getSizesAttribute
  }
}