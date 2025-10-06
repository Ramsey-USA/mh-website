import { test, expect } from '@playwright/test'

test.describe('Performance Tests @performance', () => {
  test('homepage loads within performance budget', async ({ page }) => {
    // Start measuring performance
    const startTime = Date.now()

    await page.goto('/', { waitUntil: 'networkidle' })

    const loadTime = Date.now() - startTime

    // Page should load within 3 seconds
    expect(loadTime).toBeLessThan(3000)

    // Check Largest Contentful Paint
    const lcp = await page.evaluate(() => {
      return new Promise(resolve => {
        new PerformanceObserver(list => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          resolve(lastEntry.startTime)
        }).observe({ entryTypes: ['largest-contentful-paint'] })

        // Fallback timeout
        setTimeout(() => resolve(0), 5000)
      })
    })

    // LCP should be under 2.5 seconds (Good threshold)
    expect(lcp).toBeLessThan(2500)
  })

  test('estimator form responds quickly to user input', async ({ page }) => {
    await page.goto('/estimator')

    const startTime = Date.now()

    // Fill out form fields and measure response times
    await page.getByLabel(/project type/i).selectOption('Kitchen Remodel')

    const selectionTime = Date.now() - startTime

    // Form interactions should respond within 100ms
    expect(selectionTime).toBeLessThan(100)

    // Test input responsiveness
    const inputStartTime = Date.now()
    await page.getByLabel(/square footage/i).fill('150')
    const inputTime = Date.now() - inputStartTime

    expect(inputTime).toBeLessThan(50)
  })

  test('images are optimized and load efficiently', async ({ page }) => {
    await page.goto('/')

    // Get all images and check their loading
    const images = page.getByRole('img')
    const imageCount = await images.count()

    const imageLoadTimes = []

    for (let i = 0; i < Math.min(imageCount, 5); i++) {
      // Test first 5 images
      const image = images.nth(i)
      const src = await image.getAttribute('src')

      if (src) {
        const startTime = Date.now()

        // Wait for image to load
        await image.waitFor({ state: 'visible' })

        const loadTime = Date.now() - startTime
        imageLoadTimes.push(loadTime)

        // Each image should load within 2 seconds
        expect(loadTime).toBeLessThan(2000)
      }
    }

    // Average image load time should be reasonable
    if (imageLoadTimes.length > 0) {
      const averageLoadTime =
        imageLoadTimes.reduce((a, b) => a + b, 0) / imageLoadTimes.length
      expect(averageLoadTime).toBeLessThan(1000)
    }
  })

  test('page navigation is fast', async ({ page }) => {
    await page.goto('/')

    const navigationPaths = [
      '/services',
      '/projects',
      '/estimator',
      '/contact',
      '/team',
    ]

    for (const path of navigationPaths) {
      const startTime = Date.now()

      await page.goto(path, { waitUntil: 'networkidle' })

      const navigationTime = Date.now() - startTime

      // Navigation should complete within 2 seconds
      expect(navigationTime).toBeLessThan(2000)
    }
  })

  test('bundle size is within limits', async ({ page }) => {
    // Navigate to page and analyze network requests
    const responses: any[] = []

    page.on('response', response => {
      responses.push({
        url: response.url(),
        size: response.headers()['content-length'],
        type: response.headers()['content-type'],
      })
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Analyze JavaScript bundle sizes
    const jsResponses = responses.filter(
      r => r.type?.includes('javascript') || r.url.endsWith('.js')
    )

    const totalJSSize = jsResponses.reduce((total, response) => {
      const size = parseInt(response.size || '0', 10)
      return total + size
    }, 0)

    // Total JS bundle should be under 500KB
    expect(totalJSSize).toBeLessThan(500 * 1024)

    // Analyze CSS bundle sizes
    const cssResponses = responses.filter(
      r => r.type?.includes('css') || r.url.endsWith('.css')
    )

    const totalCSSSize = cssResponses.reduce((total, response) => {
      const size = parseInt(response.size || '0', 10)
      return total + size
    }, 0)

    // Total CSS bundle should be under 100KB
    expect(totalCSSSize).toBeLessThan(100 * 1024)
  })

  test('core web vitals meet good thresholds', async ({ page }) => {
    await page.goto('/')

    // Measure Core Web Vitals
    const webVitals = (await page.evaluate(() => {
      return new Promise(resolve => {
        const vitals: { [key: string]: number } = {}

        // Cumulative Layout Shift
        new PerformanceObserver(list => {
          let cls = 0
          for (const entry of list.getEntries() as any[]) {
            if (!entry.hadRecentInput) {
              cls += entry.value
            }
          }
          vitals.cls = cls
        }).observe({ entryTypes: ['layout-shift'] })

        // First Input Delay
        new PerformanceObserver(list => {
          const entries = list.getEntries() as any[]
          vitals.fid = entries[0]?.processingStart - entries[0]?.startTime
        }).observe({ entryTypes: ['first-input'] })

        // Largest Contentful Paint
        new PerformanceObserver(list => {
          const entries = list.getEntries()
          vitals.lcp = entries[entries.length - 1].startTime
        }).observe({ entryTypes: ['largest-contentful-paint'] })

        // Resolve after a timeout to collect metrics
        setTimeout(() => resolve(vitals), 3000)
      })
    })) as { [key: string]: number }

    // Check Core Web Vitals thresholds
    if (webVitals.lcp) {
      expect(webVitals.lcp).toBeLessThan(2500) // Good LCP threshold
    }

    if (webVitals.fid) {
      expect(webVitals.fid).toBeLessThan(100) // Good FID threshold
    }

    if (webVitals.cls !== undefined) {
      expect(webVitals.cls).toBeLessThan(0.1) // Good CLS threshold
    }
  })

  test('mobile performance is acceptable', async ({ page }) => {
    // Simulate mobile device
    await page.setViewportSize({ width: 375, height: 667 })

    // Simulate slower network
    const client = await page.context().newCDPSession(page)
    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      downloadThroughput: (1.6 * 1024 * 1024) / 8, // 1.6 Mbps
      uploadThroughput: (750 * 1024) / 8, // 750 Kbps
      latency: 150, // 150ms latency
    })

    const startTime = Date.now()

    await page.goto('/', { waitUntil: 'networkidle' })

    const loadTime = Date.now() - startTime

    // Mobile load time should be under 5 seconds on slow 3G
    expect(loadTime).toBeLessThan(5000)
  })

  test('memory usage is reasonable', async ({ page }) => {
    await page.goto('/')

    // Navigate through several pages to test for memory leaks
    const pages = ['/', '/services', '/projects', '/estimator', '/contact']

    for (const path of pages) {
      await page.goto(path)
      await page.waitForLoadState('networkidle')

      // Get memory usage
      const memoryUsage = await page.evaluate(() => {
        return (performance as any).memory
          ? {
              usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
              totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
              jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit,
            }
          : null
      })

      if (memoryUsage) {
        // Memory usage should not exceed 50MB
        expect(memoryUsage.usedJSHeapSize).toBeLessThan(50 * 1024 * 1024)
      }
    }
  })
})
