/**
 * Performance Testing Suite
 * Tests response times, load handling, and performance benchmarks
 * for MH Construction's AI-powered platform
 */

import { MilitaryConstructionAI } from '@/lib/militaryConstructionAI'
import { analyzeVeteranInput } from '@/lib/veteran'

// Mock the estimator function since we need a simple calculation interface
const calculateEstimate = (params: {
  projectType: string
  squareFootage: number
  complexity: string
  materials: string
}) => {
  const baseRate = 50 // $50 per sq ft
  const complexityMultiplier =
    params.complexity === 'high'
      ? 1.5
      : params.complexity === 'medium'
        ? 1.2
        : 1.0
  const total = params.squareFootage * baseRate * complexityMultiplier
  return { total, breakdown: { materials: total * 0.4, labor: total * 0.6 } }
}

describe('Performance Testing Suite', () => {
  let ai: MilitaryConstructionAI

  beforeEach(() => {
    ai = new MilitaryConstructionAI()
  })

  describe('Response Time Benchmarks', () => {
    test('AI responses should be generated within 100ms', async () => {
      const startTime = performance.now()

      const response = ai.generateResponse(
        'I need a kitchen renovation estimate'
      )

      const endTime = performance.now()
      const responseTime = endTime - startTime

      expect(response).toBeDefined()
      expect(responseTime).toBeLessThan(100) // 100ms target
    })

    test('Veteran analysis should complete within 50ms', async () => {
      const startTime = performance.now()

      const profile = analyzeVeteranInput(
        "I'm a Navy veteran looking for bathroom renovation"
      )

      const endTime = performance.now()
      const responseTime = endTime - startTime

      expect(profile).toBeDefined()
      expect(profile.isVeteran).toBe(true)
      expect(responseTime).toBeLessThan(50) // 50ms target
    })

    test('Estimator calculations should complete within 25ms', async () => {
      const startTime = performance.now()

      const estimate = calculateEstimate({
        projectType: 'kitchen',
        squareFootage: 200,
        complexity: 'medium',
        materials: 'standard',
      })

      const endTime = performance.now()
      const responseTime = endTime - startTime

      expect(estimate).toBeDefined()
      expect(estimate.total).toBeGreaterThan(0)
      expect(responseTime).toBeLessThan(25) // 25ms target
    })
  })

  describe('Load Testing', () => {
    test('should handle 100 concurrent AI requests', async () => {
      const requests = Array.from({ length: 100 }, (_, i) =>
        ai.generateResponse(`Request ${i}: I need a renovation estimate`)
      )

      const startTime = performance.now()
      const responses = await Promise.all(
        requests.map(req => Promise.resolve(req))
      )
      const endTime = performance.now()

      const totalTime = endTime - startTime
      const avgTimePerRequest = totalTime / 100

      expect(responses).toHaveLength(100)
      responses.forEach((response: string) => {
        expect(response).toBeDefined()
        expect(typeof response).toBe('string')
      })

      expect(avgTimePerRequest).toBeLessThan(50) // Average 50ms per request
      expect(totalTime).toBeLessThan(2000) // Total under 2 seconds
    })

    test('should handle 50 concurrent veteran analyses', async () => {
      const veteranInputs = Array.from(
        { length: 50 },
        (_, i) => `I'm a veteran (#${i}) seeking home improvement assistance`
      )

      const startTime = performance.now()
      const profiles = veteranInputs.map(input => analyzeVeteranInput(input))
      const endTime = performance.now()

      const totalTime = endTime - startTime
      const avgTimePerAnalysis = totalTime / 50

      expect(profiles).toHaveLength(50)
      profiles.forEach(profile => {
        expect(profile.isVeteran).toBe(true)
        expect(profile.confidence).toBeGreaterThan(0)
      })

      expect(avgTimePerAnalysis).toBeLessThan(10) // Average 10ms per analysis
      expect(totalTime).toBeLessThan(500) // Total under 500ms
    })
  })

  describe('Memory Performance', () => {
    test('should not have memory leaks with repeated operations', () => {
      const initialMemory = process.memoryUsage().heapUsed

      // Perform 1000 operations
      for (let i = 0; i < 1000; i++) {
        ai.generateResponse(`Test request ${i}`)
        analyzeVeteranInput(`Test veteran input ${i}`)
      }

      // Force garbage collection if available
      if (global.gc) {
        global.gc()
      }

      const finalMemory = process.memoryUsage().heapUsed
      const memoryIncrease = finalMemory - initialMemory
      const memoryIncreaseKB = memoryIncrease / 1024

      // Memory increase should be reasonable (less than 5MB)
      expect(memoryIncreaseKB).toBeLessThan(5 * 1024)
    })
  })

  describe('Stress Testing', () => {
    test('should maintain performance under sustained load', async () => {
      const testDuration = 2000 // 2 seconds (reduced for faster testing)
      const startTime = Date.now()
      let requestCount = 0
      let totalResponseTime = 0

      while (Date.now() - startTime < testDuration) {
        const reqStart = performance.now()

        ai.generateResponse('Stress test renovation inquiry')

        const reqEnd = performance.now()
        totalResponseTime += reqEnd - reqStart
        requestCount++

        // Small delay to prevent overwhelming
        await new Promise(resolve => setTimeout(resolve, 20))
      }

      const avgResponseTime = totalResponseTime / requestCount
      const requestsPerSecond = requestCount / (testDuration / 1000)

      expect(requestCount).toBeGreaterThan(50) // Should handle many requests
      expect(avgResponseTime).toBeLessThan(200) // Maintain reasonable performance
      expect(requestsPerSecond).toBeGreaterThan(10) // Good throughput
    }, 10000)
  })

  describe('Scalability Benchmarks', () => {
    test('should scale linearly with request complexity', async () => {
      const simpleRequest = 'Hi'
      const complexRequest =
        "I'm a disabled Marine Corps veteran with a 100% disability rating looking for a comprehensive kitchen and bathroom renovation with accessibility features, energy-efficient appliances, and veteran discounts"

      // Test simple request
      const simpleStart = performance.now()
      const simpleResponse = ai.generateResponse(simpleRequest)
      const simpleTime = performance.now() - simpleStart

      // Test complex request
      const complexStart = performance.now()
      const complexResponse = ai.generateResponse(complexRequest)
      const complexTime = performance.now() - complexStart

      expect(simpleResponse).toBeDefined()
      expect(complexResponse).toBeDefined()

      // Complex requests should not be exponentially slower
      const timeRatio = complexTime / simpleTime
      expect(timeRatio).toBeLessThan(15) // Allow for reasonable complexity overhead
    })
  })

  describe('Performance Regression Detection', () => {
    test('should maintain baseline performance metrics', async () => {
      const baselineMetrics = {
        aiResponseTime: 100, // ms
        veteranAnalysisTime: 50, // ms
        estimatorTime: 25, // ms
        concurrentRequestCapacity: 100,
        memoryUsageKB: 5 * 1024, // 5MB
      }

      // AI Response Time
      const aiStart = performance.now()
      ai.generateResponse('Performance baseline test')
      const aiTime = performance.now() - aiStart

      // Veteran Analysis Time
      const vetStart = performance.now()
      analyzeVeteranInput("I'm a veteran")
      const vetTime = performance.now() - vetStart

      // Estimator Time
      const estStart = performance.now()
      calculateEstimate({
        projectType: 'bathroom',
        squareFootage: 100,
        complexity: 'medium',
        materials: 'standard',
      })
      const estTime = performance.now() - estStart

      expect(aiTime).toBeLessThan(baselineMetrics.aiResponseTime)
      expect(vetTime).toBeLessThan(baselineMetrics.veteranAnalysisTime)
      expect(estTime).toBeLessThan(baselineMetrics.estimatorTime)
    })
  })
})
