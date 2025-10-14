/**
 * A/B Testing Framework for Smart Recommendations
 * Phase 6.3: Experimentation and optimization framework for recommendation engine
 *
 * This framework enables split testing of different recommendation algorithms,
 * UI variants, and personalization strategies to optimize conversion rates.
 */

export interface Experiment {
  id: string
  name: string
  description: string
  status: 'draft' | 'active' | 'paused' | 'completed'
  startDate: Date
  endDate?: Date
  trafficAllocation: number // 0-100 percentage of users to include
  variants: ExperimentVariant[]
  targetMetrics: string[] // e.g., ['click_through_rate', 'conversion_rate', 'user_satisfaction']
  segmentCriteria?: SegmentCriteria
  createdBy: string
}

export interface ExperimentVariant {
  id: string
  name: string
  description: string
  trafficSplit: number // 0-100 percentage within experiment
  configuration: VariantConfiguration
  isControl: boolean
}

export interface VariantConfiguration {
  algorithmType:
    | 'standard'
    | 'ml_enhanced'
    | 'veteran_focused'
    | 'budget_optimized'
  recommendationCount: number
  displayStyle: 'default' | 'compact' | 'detailed' | 'card_layout'
  veteranBenefitsDisplay: 'standard' | 'prominent' | 'minimal' | 'disabled'
  scoringWeights: {
    budgetMatch: number
    behaviorHistory: number
    veteranStatus: number
    projectSimilarity: number
    timelineMatch: number
  }
  uiElements: {
    showConfidenceScore: boolean
    showReasoning: boolean
    showTimeline: boolean
    showVeteranBadge: boolean
    actionButtonStyle: 'primary' | 'secondary' | 'gradient'
  }
}

export interface SegmentCriteria {
  includeVeterans?: boolean
  excludeVeterans?: boolean
  budgetRange?: { min: number; max: number }
  projectTypes?: string[]
  geographic?: string[]
  deviceTypes?: ('desktop' | 'mobile' | 'tablet')[]
  userTypes?: ('new' | 'returning' | 'high_value')[]
}

export interface UserAssignment {
  userId: string
  experimentId: string
  variantId: string
  assignedAt: Date
  sessionId: string
  userAgent?: string
  location?: string
}

export interface ExperimentMetrics {
  experimentId: string
  variantId: string
  totalUsers: number
  totalRecommendations: number
  clickThroughRate: number
  conversionRate: number
  averageRating: number
  revenuePerUser: number
  engagementScore: number
  veteranEngagement?: number
  confidenceInterval: {
    lower: number
    upper: number
    confidence: number // e.g., 95
  }
  statisticalSignificance: boolean
  lastUpdated: Date
}

export interface ExperimentEvent {
  id: string
  experimentId: string
  variantId: string
  userId: string
  eventType:
    | 'view'
    | 'click'
    | 'estimate'
    | 'contact'
    | 'conversion'
    | 'feedback'
  timestamp: Date
  metadata: {
    recommendationId?: string
    projectType?: string
    estimatedValue?: number
    rating?: number
    pageUrl?: string
    userAgent?: string
  }
}

export class ABTestingFramework {
  private experiments: Map<string, Experiment>
  private userAssignments: Map<string, UserAssignment>
  private experimentMetrics: Map<string, ExperimentMetrics[]>
  private experimentEvents: ExperimentEvent[]
  private isEnabled: boolean

  constructor(isEnabled: boolean = true) {
    this.experiments = new Map()
    this.userAssignments = new Map()
    this.experimentMetrics = new Map()
    this.experimentEvents = []
    this.isEnabled = isEnabled
  }

  /**
   * Create a new experiment
   */
  createExperiment(experiment: Omit<Experiment, 'id'>): Experiment {
    const id = `exp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const newExperiment: Experiment = {
      ...experiment,
      id,
    }

    // Validate experiment configuration
    this.validateExperiment(newExperiment)

    this.experiments.set(id, newExperiment)

    // Initialize metrics tracking for each variant
    const variantMetrics = newExperiment.variants.map(variant =>
      this.initializeVariantMetrics(id, variant.id)
    )
    this.experimentMetrics.set(id, variantMetrics)

    return newExperiment
  }

  /**
   * Assign user to experiment variant
   */
  assignUserToExperiment(
    userId: string,
    sessionId: string,
    userProfile?: any
  ): UserAssignment | null {
    if (!this.isEnabled) return null

    // Check if user is already assigned to an active experiment
    const existingAssignment = this.userAssignments.get(userId)
    if (existingAssignment) {
      const experiment = this.experiments.get(existingAssignment.experimentId)
      if (experiment && experiment.status === 'active') {
        return existingAssignment
      }
    }

    // Find active experiments
    const activeExperiments = Array.from(this.experiments.values()).filter(
      exp => exp.status === 'active' && this.isUserEligible(exp, userProfile)
    )

    if (activeExperiments.length === 0) return null

    // Select experiment (for now, just take the first active one)
    const experiment = activeExperiments[0]

    // Check traffic allocation
    if (Math.random() * 100 > experiment.trafficAllocation) {
      return null // User not included in experiment
    }

    // Assign to variant based on traffic split
    const variant = this.selectVariant(experiment.variants)

    const assignment: UserAssignment = {
      userId,
      experimentId: experiment.id,
      variantId: variant.id,
      assignedAt: new Date(),
      sessionId,
    }

    this.userAssignments.set(userId, assignment)
    return assignment
  }

  /**
   * Get variant configuration for user
   */
  getVariantConfiguration(userId: string): VariantConfiguration | null {
    if (!this.isEnabled) return null

    const assignment = this.userAssignments.get(userId)
    if (!assignment) return null

    const experiment = this.experiments.get(assignment.experimentId)
    if (!experiment || experiment.status !== 'active') return null

    const variant = experiment.variants.find(v => v.id === assignment.variantId)
    return variant?.configuration || null
  }

  /**
   * Track experiment event
   */
  trackEvent(event: Omit<ExperimentEvent, 'id'>): void {
    if (!this.isEnabled) return

    const fullEvent: ExperimentEvent = {
      ...event,
      id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    }

    this.experimentEvents.push(fullEvent)

    // Update metrics
    this.updateMetrics(fullEvent)

    // Track in analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ab_test_event', {
        experiment_id: event.experimentId,
        variant_id: event.variantId,
        event_type: event.eventType,
        user_id: event.userId,
      })
    }
  }

  /**
   * Get experiment results and metrics
   */
  getExperimentResults(experimentId: string): ExperimentMetrics[] {
    return this.experimentMetrics.get(experimentId) || []
  }

  /**
   * Calculate statistical significance
   */
  calculateStatisticalSignificance(
    experimentId: string,
    metric: 'click_through_rate' | 'conversion_rate'
  ): any {
    const metrics = this.experimentMetrics.get(experimentId)
    if (!metrics || metrics.length < 2) return null

    const control = metrics.find(m => {
      const experiment = this.experiments.get(experimentId)
      const variant = experiment?.variants.find(v => v.id === m.variantId)
      return variant?.isControl
    })

    if (!control) return null

    const variants = metrics.filter(m => m.variantId !== control.variantId)

    return variants.map(variant => {
      const controlRate =
        metric === 'click_through_rate'
          ? control.clickThroughRate
          : control.conversionRate
      const variantRate =
        metric === 'click_through_rate'
          ? variant.clickThroughRate
          : variant.conversionRate

      // Simplified z-test calculation
      const pooledRate = (controlRate + variantRate) / 2
      const standardError = Math.sqrt(
        pooledRate *
          (1 - pooledRate) *
          (1 / control.totalUsers + 1 / variant.totalUsers)
      )
      const zScore = Math.abs(controlRate - variantRate) / standardError
      const pValue = 2 * (1 - this.normalCDF(Math.abs(zScore)))

      return {
        variantId: variant.variantId,
        controlRate,
        variantRate,
        improvement: ((variantRate - controlRate) / controlRate) * 100,
        zScore,
        pValue,
        isSignificant: pValue < 0.05,
        confidenceLevel: (1 - pValue) * 100,
      }
    })
  }

  /**
   * End experiment and determine winner
   */
  concludeExperiment(experimentId: string, winningVariantId?: string): any {
    const experiment = this.experiments.get(experimentId)
    if (!experiment) return null

    experiment.status = 'completed'
    experiment.endDate = new Date()

    const results = this.getExperimentResults(experimentId)
    const significance = this.calculateStatisticalSignificance(
      experimentId,
      'conversion_rate'
    )

    let winner = winningVariantId
    if (!winner && significance) {
      // Auto-select winner based on highest conversion rate with significance
      const significantVariants = significance.filter(
        (s: any) => s.isSignificant && s.improvement > 0
      )
      if (significantVariants.length > 0) {
        winner = significantVariants.reduce((best: any, current: any) =>
          current.improvement > best.improvement ? current : best
        ).variantId
      }
    }

    return {
      experimentId,
      winner,
      results,
      significance,
      duration: experiment.endDate.getTime() - experiment.startDate.getTime(),
      totalParticipants: Array.from(this.userAssignments.values()).filter(
        a => a.experimentId === experimentId
      ).length,
    }
  }

  /**
   * Get active experiments
   */
  getActiveExperiments(): Experiment[] {
    return Array.from(this.experiments.values()).filter(
      exp => exp.status === 'active'
    )
  }

  /**
   * Private helper methods
   */
  private validateExperiment(experiment: Experiment): void {
    // Validate traffic splits sum to 100%
    const totalSplit = experiment.variants.reduce(
      (sum, v) => sum + v.trafficSplit,
      0
    )
    if (Math.abs(totalSplit - 100) > 0.01) {
      throw new Error('Variant traffic splits must sum to 100%')
    }

    // Validate at least one control variant
    const hasControl = experiment.variants.some(v => v.isControl)
    if (!hasControl) {
      throw new Error('Experiment must have at least one control variant')
    }

    // Validate traffic allocation
    if (
      experiment.trafficAllocation < 0 ||
      experiment.trafficAllocation > 100
    ) {
      throw new Error('Traffic allocation must be between 0 and 100')
    }
  }

  private isUserEligible(experiment: Experiment, userProfile?: any): boolean {
    if (!experiment.segmentCriteria || !userProfile) return true

    const criteria = experiment.segmentCriteria

    // Check veteran status
    if (
      criteria.includeVeterans !== undefined &&
      criteria.includeVeterans !== userProfile.isVeteran
    ) {
      return false
    }
    if (criteria.excludeVeterans && userProfile.isVeteran) {
      return false
    }

    // Check budget range
    if (criteria.budgetRange && userProfile.preferences?.budgetRange) {
      const userBudget = userProfile.preferences.budgetRange
      const avgUserBudget = (userBudget.min + userBudget.max) / 2
      if (
        avgUserBudget < criteria.budgetRange.min ||
        avgUserBudget > criteria.budgetRange.max
      ) {
        return false
      }
    }

    // Check project types
    if (criteria.projectTypes && userProfile.preferences?.projectTypes) {
      const hasMatchingType = criteria.projectTypes.some(type =>
        userProfile.preferences.projectTypes.includes(type)
      )
      if (!hasMatchingType) {
        return false
      }
    }

    return true
  }

  private selectVariant(variants: ExperimentVariant[]): ExperimentVariant {
    const random = Math.random() * 100
    let cumulative = 0

    for (const variant of variants) {
      cumulative += variant.trafficSplit
      if (random <= cumulative) {
        return variant
      }
    }

    // Fallback to first variant
    return variants[0]
  }

  private initializeVariantMetrics(
    experimentId: string,
    variantId: string
  ): ExperimentMetrics {
    return {
      experimentId,
      variantId,
      totalUsers: 0,
      totalRecommendations: 0,
      clickThroughRate: 0,
      conversionRate: 0,
      averageRating: 0,
      revenuePerUser: 0,
      engagementScore: 0,
      confidenceInterval: {
        lower: 0,
        upper: 0,
        confidence: 95,
      },
      statisticalSignificance: false,
      lastUpdated: new Date(),
    }
  }

  private updateMetrics(event: ExperimentEvent): void {
    const metrics = this.experimentMetrics.get(event.experimentId)
    if (!metrics) return

    const variantMetrics = metrics.find(m => m.variantId === event.variantId)
    if (!variantMetrics) return

    // Update based on event type
    switch (event.eventType) {
      case 'view':
        variantMetrics.totalRecommendations++
        break
      case 'click':
        // CTR calculation handled in batch
        break
      case 'conversion':
        // Conversion rate calculation handled in batch
        break
      case 'feedback':
        if (event.metadata.rating) {
          // Update average rating
          const currentTotal =
            variantMetrics.averageRating * variantMetrics.totalUsers
          variantMetrics.averageRating =
            (currentTotal + event.metadata.rating) /
            (variantMetrics.totalUsers + 1)
        }
        break
    }

    // Recalculate rates
    this.recalculateMetrics(variantMetrics, event.experimentId, event.variantId)
    variantMetrics.lastUpdated = new Date()
  }

  private recalculateMetrics(
    metrics: ExperimentMetrics,
    experimentId: string,
    variantId: string
  ): void {
    const variantEvents = this.experimentEvents.filter(
      e => e.experimentId === experimentId && e.variantId === variantId
    )

    const views = variantEvents.filter(e => e.eventType === 'view').length
    const clicks = variantEvents.filter(e => e.eventType === 'click').length
    const conversions = variantEvents.filter(
      e => e.eventType === 'conversion'
    ).length

    metrics.totalRecommendations = views
    metrics.clickThroughRate = views > 0 ? (clicks / views) * 100 : 0
    metrics.conversionRate = views > 0 ? (conversions / views) * 100 : 0

    // Update unique users count
    const uniqueUsers = new Set(variantEvents.map(e => e.userId)).size
    metrics.totalUsers = uniqueUsers
  }

  private normalCDF(x: number): number {
    // Approximation of the normal cumulative distribution function
    const t = 1 / (1 + 0.2316419 * Math.abs(x))
    const d = 0.3989423 * Math.exp((-x * x) / 2)
    const prob =
      d *
      t *
      (0.3193815 +
        t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))))
    return x > 0 ? 1 - prob : prob
  }
}

export default ABTestingFramework
