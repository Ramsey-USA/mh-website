/**
 * React Hook for Smart Project Recommendations
 * Phase 6.1: Hook for integrating the Smart Recommendation Engine with React components
 * Phase 6.3: Enhanced with A/B testing support and advanced analytics
 */

import { useState, useEffect, useCallback, useMemo } from 'react'
import SmartRecommendationEngine, {
  ProjectRecommendation,
  UserProfile,
  RecommendationFeedback,
  RecommendationMetrics,
  UserBehavior,
  RecommendationContext,
} from '@/lib/recommendations/SmartRecommendationEngine'
import type {
  UserAssignment,
  VariantConfiguration,
} from '@/lib/recommendations/ABTestingFramework'

interface UseSmartRecommendationsOptions {
  userId?: string
  autoGenerate?: boolean
  maxRecommendations?: number
  enableTracking?: boolean
  enableABTesting?: boolean
  sessionId?: string
}

interface UseSmartRecommendationsReturn {
  recommendations: ProjectRecommendation[]
  isLoading: boolean
  error: string | null
  metrics: RecommendationMetrics | null
  experimentAssignment: UserAssignment | null
  variantConfig: VariantConfiguration | null
  generateRecommendations: (
    userProfile: UserProfile,
    context?: RecommendationContext
  ) => Promise<void>
  recordFeedback: (feedback: RecommendationFeedback) => void
  trackBehavior: (behavior: UserBehavior) => void
  trackExperimentEvent: (eventType: string, metadata?: any) => void
  refreshRecommendations: () => Promise<void>
  clearRecommendations: () => void
  getExperimentResults: (experimentId: string) => any
  getActiveExperiments: () => any[]
  createExperiment: (experiment: any) => any
}

// Singleton instance of the recommendation engine
let recommendationEngine: SmartRecommendationEngine | null = null

const getRecommendationEngine = (): SmartRecommendationEngine => {
  if (!recommendationEngine) {
    recommendationEngine = new SmartRecommendationEngine()
  }
  return recommendationEngine
}

export function useSmartRecommendations(
  options: UseSmartRecommendationsOptions = {}
): UseSmartRecommendationsReturn {
  const {
    userId,
    autoGenerate = false,
    maxRecommendations = 6,
    enableTracking = true,
    enableABTesting = true,
    sessionId,
  } = options

  const [recommendations, setRecommendations] = useState<
    ProjectRecommendation[]
  >([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [metrics, setMetrics] = useState<RecommendationMetrics | null>(null)
  const [lastUserProfile, setLastUserProfile] = useState<UserProfile | null>(
    null
  )
  const [experimentAssignment, setExperimentAssignment] =
    useState<UserAssignment | null>(null)
  const [variantConfig, setVariantConfig] =
    useState<VariantConfiguration | null>(null)

  const engine = useMemo(() => getRecommendationEngine(), [])

  /**
   * Generate recommendations for a user profile
   */
  const generateRecommendations = useCallback(
    async (
      userProfile: UserProfile,
      context?: RecommendationContext
    ): Promise<void> => {
      setIsLoading(true)
      setError(null)

      try {
        // Create context with session info
        const enhancedContext: RecommendationContext = {
          sessionId: context?.sessionId || sessionId || `session-${Date.now()}`,
          pageUrl:
            context?.pageUrl ||
            (typeof window !== 'undefined' ? window.location.href : undefined),
          userAgent:
            context?.userAgent ||
            (typeof window !== 'undefined' ? navigator.userAgent : undefined),
          experimentAssignment: context?.experimentAssignment,
          variantConfig: context?.variantConfig,
        }

        const recs = await engine.generateRecommendations(
          userProfile,
          enhancedContext
        )
        const limitedRecs = recs.slice(0, maxRecommendations)

        setRecommendations(limitedRecs)
        setLastUserProfile(userProfile)

        // Get experiment assignment if A/B testing is enabled
        if (enableABTesting && userId) {
          const assignment = engine.getUserExperimentAssignment(userId)
          setExperimentAssignment(assignment)

          if (assignment) {
            const config = engine.getUserExperimentAssignment(userId) // This would normally get variant config
            // For now, set to null - would need to implement getVariantConfiguration in engine
            setVariantConfig(null)
          }
        }

        // Track generation event
        if (enableTracking && typeof window !== 'undefined') {
          window.gtag?.('event', 'recommendations_generated', {
            user_id: userProfile.id,
            recommendations_count: limitedRecs.length,
            is_veteran: userProfile.isVeteran,
            top_project_type: limitedRecs[0]?.projectType,
            experiment_id: experimentAssignment?.experimentId,
            variant_id: experimentAssignment?.variantId,
          })
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Failed to generate recommendations'
        setError(errorMessage)
        console.error('Error generating recommendations:', err)
      } finally {
        setIsLoading(false)
      }
    },
    [
      engine,
      maxRecommendations,
      enableTracking,
      enableABTesting,
      userId,
      sessionId,
      experimentAssignment,
    ]
  )

  /**
   * Record user feedback on a recommendation
   */
  const recordFeedback = useCallback(
    (feedback: RecommendationFeedback): void => {
      try {
        engine.recordFeedback(feedback)

        // Track feedback event
        if (enableTracking && typeof window !== 'undefined') {
          window.gtag?.('event', 'recommendation_feedback', {
            recommendation_id: feedback.recommendationId,
            user_id: feedback.userId,
            rating: feedback.rating,
            clicked: feedback.clicked,
            converted: feedback.converted,
          })
        }

        // Update metrics after feedback
        const newMetrics = engine.getMetrics()
        setMetrics(newMetrics)
      } catch (err) {
        console.error('Error recording feedback:', err)
      }
    },
    [engine, enableTracking]
  )

  /**
   * Track user behavior for learning
   */
  const trackBehavior = useCallback(
    (behavior: UserBehavior): void => {
      if (!userId) return

      try {
        engine.trackUserBehavior(userId, behavior)

        // Track behavior event
        if (enableTracking && typeof window !== 'undefined') {
          window.gtag?.('event', 'user_behavior_tracked', {
            user_id: userId,
            action: behavior.action,
            page: behavior.page,
          })
        }
      } catch (err) {
        console.error('Error tracking behavior:', err)
      }
    },
    [engine, userId, enableTracking]
  )

  /**
   * Refresh recommendations using the last user profile
   */
  const refreshRecommendations = useCallback(async (): Promise<void> => {
    if (!lastUserProfile) {
      setError('No user profile available for refresh')
      return
    }

    await generateRecommendations(lastUserProfile)
  }, [generateRecommendations, lastUserProfile])

  /**
   * Clear current recommendations
   */
  const clearRecommendations = useCallback((): void => {
    setRecommendations([])
    setError(null)
    setLastUserProfile(null)
    setExperimentAssignment(null)
    setVariantConfig(null)
  }, [])

  /**
   * Track experiment event
   */
  const trackExperimentEvent = useCallback(
    (eventType: string, metadata?: any): void => {
      if (!enableABTesting || !userId || !experimentAssignment) return

      try {
        engine.trackExperimentEvent({
          experimentId: experimentAssignment.experimentId,
          variantId: experimentAssignment.variantId,
          userId,
          eventType: eventType as any,
          timestamp: new Date(),
          metadata: metadata || {},
        })
      } catch (err) {
        console.error('Error tracking experiment event:', err)
      }
    },
    [engine, enableABTesting, userId, experimentAssignment]
  )

  /**
   * Get experiment results
   */
  const getExperimentResults = useCallback(
    (experimentId: string): any => {
      return engine.getExperimentResults(experimentId)
    },
    [engine]
  )

  /**
   * Get active experiments
   */
  const getActiveExperiments = useCallback((): any[] => {
    return engine.getActiveExperiments()
  }, [engine])

  /**
   * Create new experiment
   */
  const createExperiment = useCallback(
    (experiment: any): any => {
      return engine.createExperiment(experiment)
    },
    [engine]
  )

  /**
   * Load metrics on mount and when recommendations change
   */
  useEffect(() => {
    try {
      const currentMetrics = engine.getMetrics()
      setMetrics(currentMetrics)
    } catch (err) {
      console.error('Error loading metrics:', err)
    }
  }, [engine, recommendations])

  /**
   * Auto-generate recommendations if enabled and user profile is available
   */
  useEffect(() => {
    if (autoGenerate && userId && !isLoading && recommendations.length === 0) {
      // Create a basic user profile for auto-generation
      const basicProfile: UserProfile = {
        id: userId,
        sessionId: `session-${Date.now()}`,
        isVeteran: false, // Would be detected from actual user data
        preferences: {
          budgetRange: { min: 10000, max: 100000 },
          projectTypes: ['residential', 'renovation'],
          timeframe: 'planned',
          priorities: [],
          communicationStyle: 'casual',
        },
        behaviorHistory: [],
      }

      generateRecommendations(basicProfile)
    }
  }, [
    autoGenerate,
    userId,
    isLoading,
    recommendations.length,
    generateRecommendations,
  ])

  return {
    recommendations,
    isLoading,
    error,
    metrics,
    experimentAssignment,
    variantConfig,
    generateRecommendations,
    recordFeedback,
    trackBehavior,
    trackExperimentEvent,
    refreshRecommendations,
    clearRecommendations,
    getExperimentResults,
    getActiveExperiments,
    createExperiment,
  }
}

/**
 * Hook for tracking recommendation interactions
 */
export function useRecommendationTracking(userId?: string) {
  const { trackBehavior } = useSmartRecommendations({
    userId,
    enableTracking: true,
  })

  const trackView = useCallback(
    (recommendationId: string, projectType: string) => {
      trackBehavior({
        timestamp: new Date(),
        action: 'recommendation_view',
        page: window.location.pathname,
        data: { recommendationId, projectType },
      })
    },
    [trackBehavior]
  )

  const trackClick = useCallback(
    (recommendationId: string, projectType: string) => {
      trackBehavior({
        timestamp: new Date(),
        action: 'recommendation_click',
        page: window.location.pathname,
        data: { recommendationId, projectType },
      })
    },
    [trackBehavior]
  )

  const trackEstimate = useCallback(
    (recommendationId: string, projectType: string, estimatedValue: number) => {
      trackBehavior({
        timestamp: new Date(),
        action: 'recommendation_estimate',
        page: window.location.pathname,
        data: { recommendationId, projectType, estimatedValue },
        conversionEvent: true,
      })
    },
    [trackBehavior]
  )

  const trackContact = useCallback(
    (recommendationId: string, projectType: string) => {
      trackBehavior({
        timestamp: new Date(),
        action: 'recommendation_contact',
        page: window.location.pathname,
        data: { recommendationId, projectType },
        conversionEvent: true,
      })
    },
    [trackBehavior]
  )

  return {
    trackView,
    trackClick,
    trackEstimate,
    trackContact,
  }
}

/**
 * Hook for veteran-specific recommendations
 */
export function useVeteranRecommendations(
  veteranProfile?: any,
  userId?: string
) {
  const baseHook = useSmartRecommendations({ userId })

  const generateVeteranRecommendations = useCallback(
    async (basePreferences: any, context?: any) => {
      if (!veteranProfile) return

      const userProfile: UserProfile = {
        id: userId || `veteran-${Date.now()}`,
        sessionId: `session-${Date.now()}`,
        isVeteran: true,
        veteranDetails: veteranProfile,
        preferences: {
          budgetRange: basePreferences.budgetRange || {
            min: 10000,
            max: 150000,
          },
          projectTypes: basePreferences.projectTypes || [
            'residential',
            'renovation',
          ],
          timeframe: basePreferences.timeframe || 'planned',
          priorities: ['accessibility', 'security', 'energy_efficiency'],
          communicationStyle: 'military',
        },
        behaviorHistory: [],
      }

      await baseHook.generateRecommendations(userProfile, context)
    },
    [veteranProfile, userId, baseHook]
  )

  return {
    ...baseHook,
    generateVeteranRecommendations,
  }
}

export default useSmartRecommendations
