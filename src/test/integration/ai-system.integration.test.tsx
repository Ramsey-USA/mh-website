/**
 * Integration Tests for AI System
 * Tests the integration between chatbot, estimator, and veteran systems
 */

import { MilitaryConstructionAI } from '@/lib/militaryConstructionAI'
import { analyzeVeteranInput, getVeteranExperience } from '@/lib/veteran'

// Create real instances for integration testing
describe('AI System Integration Tests', () => {
  let ai: MilitaryConstructionAI

  beforeEach(() => {
    ai = new MilitaryConstructionAI()
  })

  describe('Basic AI Functionality', () => {
    test('should generate responses for construction inquiries', () => {
      const response = ai.generateResponse('I need help with a kitchen remodel')

      expect(response).toBeDefined()
      expect(typeof response).toBe('string')
      expect(response.length).toBeGreaterThan(0)
    })

    test('should handle estimator-related requests', () => {
      const response = ai.generateResponse(
        'What would a bathroom renovation cost?',
        {
          projectType: 'bathroom-renovation',
        }
      )

      expect(response).toBeDefined()
      expect(
        response.includes('bathroom') ||
          response.includes('renovation') ||
          response.includes('cost') ||
          response.includes('estimate')
      ).toBe(true)
    })
  })

  describe('Veteran System Integration', () => {
    test('should detect veteran status from input', () => {
      const veteranInput = "I'm a Marine veteran looking for construction help"
      const profile = analyzeVeteranInput(veteranInput)

      expect(profile).toBeDefined()
      expect(profile.isVeteran).toBe(true)
      expect(profile.serviceBranch).toBe('Marines')
    })

    test('should generate enhanced veteran responses', async () => {
      const veteranInput =
        "I'm a disabled Army veteran needing accessibility upgrades"

      const result = await ai.generateEnhancedVeteranResponse(veteranInput)

      expect(result).toBeDefined()
      expect(result.standardResponse).toBeDefined()
      expect(result.enhancedResponse).toBeDefined()
      expect(typeof result.standardResponse).toBe('string')
      expect(typeof result.enhancedResponse).toBe('string')
    })

    test('should calculate veteran discounts correctly', () => {
      const mockProfile = analyzeVeteranInput(
        "I'm a combat veteran from Afghanistan"
      )
      const estimate = ai.calculateVeteranDiscountEstimate(30000, mockProfile)

      expect(estimate).toBeDefined()
      expect(estimate.originalAmount).toBe(30000)
      expect(estimate.discountedAmount).toBeLessThan(30000)
      expect(estimate.totalSavings).toBeGreaterThan(0)
      expect(estimate.discountBreakdown).toBeInstanceOf(Array)
    })
  })

  describe('Error Handling', () => {
    test('should handle invalid input gracefully', () => {
      const response = ai.generateResponse('')

      expect(response).toBeDefined()
      expect(typeof response).toBe('string')
    })

    test('should handle null context gracefully', () => {
      const response = ai.generateResponse('Help me', null)

      expect(response).toBeDefined()
      expect(typeof response).toBe('string')
    })
  })

  describe('Performance', () => {
    test('should generate responses quickly', () => {
      const startTime = performance.now()
      const response = ai.generateResponse('Quick test')
      const endTime = performance.now()

      expect(response).toBeDefined()
      expect(endTime - startTime).toBeLessThan(100) // Should be under 100ms
    })

    test('should handle multiple concurrent requests', () => {
      const inputs = [
        'Kitchen remodel cost',
        'Bathroom renovation',
        'Deck construction',
      ]

      const startTime = performance.now()
      const responses = inputs.map(input => ai.generateResponse(input))
      const endTime = performance.now()

      expect(responses).toHaveLength(3)
      responses.forEach(response => {
        expect(response).toBeDefined()
        expect(typeof response).toBe('string')
      })

      expect(endTime - startTime).toBeLessThan(200) // All should complete quickly
    })
  })

  describe('Data Consistency', () => {
    test('should maintain consistent veteran detection', () => {
      const inputs = [
        "I'm a veteran",
        'I served in the Army',
        "I'm a Marine Corps veteran",
      ]

      inputs.forEach(input => {
        const profile = analyzeVeteranInput(input)
        expect(profile.isVeteran).toBe(true)
        expect(profile.confidence).toBeGreaterThan(30)
      })
    })

    test('should provide consistent responses for similar inputs', () => {
      const input1 = ai.generateResponse('I need a kitchen estimate')
      const input2 = ai.generateResponse('Can you estimate kitchen costs?')

      // Both should be construction-related responses
      expect(input1).toBeDefined()
      expect(input2).toBeDefined()
      expect(typeof input1).toBe('string')
      expect(typeof input2).toBe('string')
    })
  })

  describe('Feature Integration', () => {
    test('should integrate estimator with AI responses', () => {
      const context = {
        projectType: 'deck-construction',
        budget: '15000-25000',
        location: 'Seattle',
      }

      const response = ai.generateResponse('I need a deck estimate', context)

      expect(response).toBeDefined()
      // Should include either construction/building terms or estimate/cost terms
      const hasConstructionTerms =
        response.includes('deck') || response.includes('build')
      const hasEstimateTerms =
        response.includes('estimate') ||
        response.includes('cost') ||
        response.includes('price')

      expect(hasConstructionTerms || hasEstimateTerms).toBe(true)
    })

    test('should handle form data integration', () => {
      const formData = {
        name: 'John Doe',
        email: 'john@example.com',
        projectType: 'addition',
        budget: '50000',
      }

      const response = ai.generateResponse('Help me with my project', formData)

      expect(response).toBeDefined()
      expect(typeof response).toBe('string')
    })
  })
})
