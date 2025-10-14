/**
 * Enhanced Feedback Collection System
 * Phase 6.3: Advanced feedback collection with A/B testing integration
 *
 * This system provides comprehensive feedback collection for recommendations,
 * integrates with A/B testing framework, and supports multiple feedback types.
 */

'use client'

import React, { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { MaterialIcon } from '../icons/MaterialIcon'
import { Card, CardContent } from '../ui'
import useSmartRecommendations from '../../hooks/useSmartRecommendations'
import type {
  ProjectRecommendation,
  RecommendationFeedback,
} from '../../lib/recommendations/SmartRecommendationEngine'

// Dynamic imports for Framer Motion
const MotionDiv = dynamic(
  () => import('framer-motion').then(mod => mod.motion.div),
  { ssr: false }
)
const AnimatePresence = dynamic(
  () => import('framer-motion').then(mod => mod.AnimatePresence),
  { ssr: false }
)

interface FeedbackCollectionProps {
  recommendation: ProjectRecommendation
  userId: string
  onFeedbackSubmitted?: (feedback: RecommendationFeedback) => void
  variant?: 'compact' | 'detailed' | 'modal'
  showRatingOnly?: boolean
  className?: string
}

interface FeedbackFormData {
  rating: number
  feedback: string
  clicked: boolean
  converted: boolean
  helpful: boolean
  accurate: boolean
  relevant: boolean
}

const FeedbackCollection: React.FC<FeedbackCollectionProps> = ({
  recommendation,
  userId,
  onFeedbackSubmitted,
  variant = 'detailed',
  showRatingOnly = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<FeedbackFormData>({
    rating: 0,
    feedback: '',
    clicked: false,
    converted: false,
    helpful: false,
    accurate: false,
    relevant: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const { recordFeedback, trackExperimentEvent } = useSmartRecommendations({
    userId,
  })

  const handleSubmit = useCallback(
    async (data?: FeedbackFormData) => {
      const feedbackData = data || formData
      if (feedbackData.rating === 0 && !feedbackData.feedback) return

      setIsSubmitting(true)

      try {
        const feedback: RecommendationFeedback = {
          recommendationId: recommendation.id,
          userId,
          rating: feedbackData.rating,
          clicked: feedbackData.clicked,
          converted: feedbackData.converted,
          feedback: feedbackData.feedback || undefined,
          timestamp: new Date(),
        }

        // Record feedback through hook
        recordFeedback(feedback)

        // Track experiment event
        trackExperimentEvent('feedback', {
          recommendationId: recommendation.id,
          rating: feedbackData.rating,
          helpful: feedbackData.helpful,
          accurate: feedbackData.accurate,
          relevant: feedbackData.relevant,
        })

        // Callback for parent component
        onFeedbackSubmitted?.(feedback)

        setHasSubmitted(true)
        setIsOpen(false)

        // Track in analytics
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'recommendation_feedback_submitted', {
            recommendation_id: recommendation.id,
            rating: feedbackData.rating,
            user_id: userId,
            project_type: recommendation.projectType,
          })
        }
      } catch (error) {
        console.error('Error submitting feedback:', error)
      } finally {
        setIsSubmitting(false)
      }
    },
    [
      formData,
      recommendation,
      userId,
      recordFeedback,
      trackExperimentEvent,
      onFeedbackSubmitted,
    ]
  )

  const handleRatingClick = useCallback(
    (rating: number) => {
      const newFormData = { ...formData, rating }
      setFormData(newFormData)

      // For compact variant, auto-submit on rating
      if (variant === 'compact' || showRatingOnly) {
        handleSubmit(newFormData)
      }
    },
    [formData, variant, showRatingOnly, handleSubmit]
  )

  const renderStarRating = () => (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          onClick={() => handleRatingClick(star)}
          className={`text-2xl transition-colors duration-200 ${
            formData.rating >= star
              ? 'text-yellow-400 hover:text-yellow-500'
              : 'text-gray-300 hover:text-yellow-300'
          }`}
          disabled={hasSubmitted}
        >
          <MaterialIcon icon="star" size="lg" />
        </button>
      ))}
    </div>
  )

  const renderQuickFeedback = () => (
    <div className="flex flex-wrap gap-2 mt-3">
      {[
        { key: 'helpful', label: 'Helpful', icon: 'thumb_up' },
        { key: 'accurate', label: 'Accurate', icon: 'verified' },
        { key: 'relevant', label: 'Relevant', icon: 'target' },
      ].map(({ key, label, icon }) => (
        <button
          key={key}
          onClick={() =>
            setFormData(prev => ({
              ...prev,
              [key]: !prev[key as keyof FeedbackFormData],
            }))
          }
          className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
            formData[key as keyof FeedbackFormData]
              ? 'bg-green-100 text-green-800 border-green-200'
              : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-150'
          } border`}
          disabled={hasSubmitted}
        >
          <MaterialIcon icon={icon} size="sm" />
          <span>{label}</span>
        </button>
      ))}
    </div>
  )

  if (hasSubmitted) {
    return (
      <div className={`${className} text-center py-4`}>
        <div className="flex justify-center items-center space-x-2 text-green-600">
          <MaterialIcon icon="check_circle" size="lg" />
          <span className="font-medium">Thank you for your feedback!</span>
        </div>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={`${className} p-3 bg-gray-50 rounded-lg`}>
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-700 text-sm">
            Rate this recommendation:
          </span>
          {renderStarRating()}
        </div>
      </div>
    )
  }

  if (variant === 'modal') {
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 text-sm transition-colors"
        >
          <MaterialIcon icon="feedback" size="sm" />
          <span>Give Feedback</span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
              onClick={() => setIsOpen(false)}
            >
              <MotionDiv
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white mx-4 p-6 rounded-lg w-full max-w-md"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-800 text-lg">
                    Rate This Recommendation
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <MaterialIcon icon="close" size="lg" />
                  </button>
                </div>

                <div className="mb-4">
                  <p className="mb-3 text-gray-600 text-sm">
                    How would you rate "{recommendation.title}"?
                  </p>
                  {renderStarRating()}
                </div>

                {renderQuickFeedback()}

                <div className="mt-4">
                  <label className="block mb-2 font-medium text-gray-700 text-sm">
                    Additional Comments (Optional)
                  </label>
                  <textarea
                    value={formData.feedback}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        feedback: e.target.value,
                      }))
                    }
                    placeholder="Tell us what you think about this recommendation..."
                    className="px-3 py-2 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-brand-primary w-full"
                    rows={3}
                  />
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSubmit()}
                    disabled={isSubmitting || formData.rating === 0}
                    className="flex items-center space-x-2 bg-brand-primary hover:bg-brand-dark disabled:opacity-50 px-6 py-2 rounded-lg text-white transition-colors disabled:cursor-not-allowed"
                  >
                    {isSubmitting && (
                      <MaterialIcon
                        icon="refresh"
                        size="sm"
                        className="animate-spin"
                      />
                    )}
                    <span>
                      {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                    </span>
                  </button>
                </div>
              </MotionDiv>
            </MotionDiv>
          )}
        </AnimatePresence>
      </>
    )
  }

  // Default detailed variant
  return (
    <Card className={`${className} border-gray-200`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h4 className="flex items-center space-x-2 font-medium text-gray-800">
            <MaterialIcon icon="feedback" size="sm" />
            <span>Rate This Recommendation</span>
          </h4>
        </div>

        <div className="space-y-4">
          <div>
            <p className="mb-2 text-gray-600 text-sm">
              How helpful was this recommendation?
            </p>
            {renderStarRating()}
          </div>

          {renderQuickFeedback()}

          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Additional Comments (Optional)
            </label>
            <textarea
              value={formData.feedback}
              onChange={e =>
                setFormData(prev => ({ ...prev, feedback: e.target.value }))
              }
              placeholder="Tell us what you think..."
              className="px-3 py-2 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-brand-primary w-full text-sm"
              rows={2}
            />
          </div>

          <button
            onClick={() => handleSubmit()}
            disabled={isSubmitting || formData.rating === 0}
            className="flex justify-center items-center space-x-2 bg-brand-primary hover:bg-brand-dark disabled:opacity-50 px-4 py-2 rounded-lg w-full text-white transition-colors disabled:cursor-not-allowed"
          >
            {isSubmitting && (
              <MaterialIcon icon="refresh" size="sm" className="animate-spin" />
            )}
            <span>{isSubmitting ? 'Submitting...' : 'Submit Feedback'}</span>
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Hook for enhanced feedback collection
 */
export function useFeedbackCollection(userId?: string) {
  const { recordFeedback, trackExperimentEvent } = useSmartRecommendations({
    userId,
  })
  const [feedbackHistory, setFeedbackHistory] = useState<
    RecommendationFeedback[]
  >([])

  const submitFeedback = useCallback(
    async (
      recommendation: ProjectRecommendation,
      rating: number,
      additionalData?: Partial<FeedbackFormData>
    ) => {
      const feedback: RecommendationFeedback = {
        recommendationId: recommendation.id,
        userId: userId || 'anonymous',
        rating,
        clicked: additionalData?.clicked || false,
        converted: additionalData?.converted || false,
        feedback: additionalData?.feedback,
        timestamp: new Date(),
      }

      recordFeedback(feedback)
      setFeedbackHistory(prev => [...prev, feedback])

      // Track experiment event
      trackExperimentEvent('feedback', {
        recommendationId: recommendation.id,
        rating,
        ...additionalData,
      })

      return feedback
    },
    [userId, recordFeedback, trackExperimentEvent]
  )

  const getFeedbackForRecommendation = useCallback(
    (recommendationId: string) => {
      return feedbackHistory.filter(
        f => f.recommendationId === recommendationId
      )
    },
    [feedbackHistory]
  )

  return {
    submitFeedback,
    getFeedbackForRecommendation,
    feedbackHistory,
  }
}

export default FeedbackCollection
