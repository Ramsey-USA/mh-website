import { http, HttpResponse } from 'msw'

export const handlers = [
  // Mock API endpoints for testing
  http.get('/api/recommendations', () => {
    return HttpResponse.json([
      {
        id: 'test-rec-1',
        title: 'Test Recommendation',
        description: 'A test recommendation for unit testing',
        confidence: 85,
        priority: 'medium',
        reasoning: ['Based on user preferences', 'Popular project type'],
        estimatedCost: { min: 12000, max: 18000, average: 15000 },
        timeline: '2-3 weeks',
        category: 'residential-construction',
        projectType: 'Kitchen Remodel',
        tags: ['renovation', 'interior'],
      },
    ])
  }),

  http.post('/api/user-behavior', () => {
    return new HttpResponse(null, { status: 201 })
  }),

  http.get('/api/veteran-benefits', () => {
    return HttpResponse.json([
      {
        type: 'discount',
        value: '10% off materials',
        description: 'Veteran discount on construction materials',
        eligibility: ['all'],
      },
    ])
  }),

  http.get('/api/estimator/calculate', () => {
    return HttpResponse.json({
      estimate: 25000,
      breakdown: {
        materials: 15000,
        labor: 8000,
        permits: 2000,
      },
    })
  }),
]
