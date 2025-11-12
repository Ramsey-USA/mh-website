/**
 * Smart Project Recommendations Component
 * Phase 6.1: UI component for displaying intelligent project recommendations
 */

"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { MaterialIcon } from "../icons/MaterialIcon";
import { Card, CardContent } from "../ui";
import useSmartRecommendations, {
  useRecommendationTracking,
} from "@/hooks/useSmartRecommendations";
import FeedbackCollection from "./FeedbackCollection";
import type {
  ProjectRecommendation,
  UserProfile,
  VeteranBenefit,
} from "@/lib/recommendations/SmartRecommendationEngine";

// Dynamic imports for Framer Motion
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false },
);
const AnimatePresence = dynamic(
  () => import("framer-motion").then((mod) => mod.AnimatePresence),
  { ssr: false },
);

interface SmartRecommendationsProps {
  userProfile?: UserProfile;
  showVeteranBenefits?: boolean;
  showFeedback?: boolean;
  maxRecommendations?: number;
  variant?: "default" | "compact" | "detailed";
  onRecommendationClick?: (recommendation: ProjectRecommendation) => void;
  onGetEstimate?: (recommendation: ProjectRecommendation) => void;
  className?: string;
}

interface RecommendationCardProps {
  recommendation: ProjectRecommendation;
  showVeteranBenefits: boolean;
  showFeedback: boolean;
  variant: "default" | "compact" | "detailed";
  onRecommendationClick: (recommendation: ProjectRecommendation) => void;
  onGetEstimate: (recommendation: ProjectRecommendation) => void;
  onTrackView: (id: string, type: string) => void;
  onTrackClick: (id: string, type: string) => void;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  showVeteranBenefits,
  showFeedback,
  variant,
  onRecommendationClick,
  onGetEstimate,
  onTrackView,
  onTrackClick,
}) => {
  useEffect(() => {
    // Track view when card is rendered
    onTrackView(recommendation.id, recommendation.projectType);
  }, [recommendation.id, recommendation.projectType, onTrackView]);

  const handleCardClick = () => {
    onTrackClick(recommendation.id, recommendation.projectType);
    onRecommendationClick(recommendation);
  };

  const handleEstimateClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onTrackClick(recommendation.id, recommendation.projectType);
    onGetEstimate(recommendation);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getProjectIcon = (projectType: string) => {
    const iconMap: Record<string, string> = {
      kitchen: "kitchen",
      bathroom: "bathtub",
      residential: "home",
      commercial: "business",
      renovation: "construction",
      addition: "extension",
      deck: "deck",
    };
    return iconMap[projectType] || "construction";
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-orange-600 bg-orange-50";
      case "low":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  if (variant === "compact") {
    return (
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2, scale: 1.02 }}
        className="cursor-pointer"
        onClick={handleCardClick}
      >
        <Card className="hover:shadow-2xl h-full transition-all duration-300 rounded-2xl border-2 hover:border-brand-primary/20">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 bg-brand-primary/10 p-2 rounded-xl">
                <MaterialIcon
                  icon={getProjectIcon(recommendation.projectType)}
                  className="text-brand-primary"
                  size="lg"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 truncate">
                  {recommendation.title}
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                  {recommendation.description}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-medium text-brand-primary text-sm">
                    {formatCurrency(recommendation.estimatedCost.min)} -{" "}
                    {formatCurrency(recommendation.estimatedCost.max)}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(recommendation.priority)}`}
                  >
                    {recommendation.confidence}% match
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </MotionDiv>
    );
  }

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="cursor-pointer"
      onClick={handleCardClick}
    >
      <Card className="hover:shadow-2xl h-full overflow-hidden transition-all duration-300 rounded-3xl border-2 hover:border-brand-primary/20">
        {recommendation.images && recommendation.images[0] && (
          <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 h-48">
            <div className="absolute inset-0 flex justify-center items-center">
              <MaterialIcon
                icon={getProjectIcon(recommendation.projectType)}
                className="opacity-20 text-brand-primary"
                size="4xl"
              />
            </div>
            <div className="top-3 right-3 absolute">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold shadow-md ${getPriorityColor(recommendation.priority)}`}
              >
                {recommendation.confidence}% Match
              </span>
            </div>
          </div>
        )}

        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center space-x-2">
              <MaterialIcon
                icon={getProjectIcon(recommendation.projectType)}
                className="text-brand-primary"
                size="lg"
              />
              <span className="font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                {recommendation.projectType}
              </span>
            </div>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(recommendation.priority)}`}
            >
              {recommendation.priority} priority
            </span>
          </div>

          <h3 className="mb-2 font-bold text-gray-800 dark:text-gray-100 text-xl">
            {recommendation.title}
          </h3>

          <p className="mb-4 text-gray-600 dark:text-gray-300 line-clamp-3">
            {recommendation.description}
          </p>

          {/* Cost and Timeline */}
          <div className="gap-4 grid grid-cols-2 mb-4">
            <div>
              <div className="flex items-center space-x-1 mb-1">
                <MaterialIcon
                  icon="attach_money"
                  size="sm"
                  className="text-green-600"
                />
                <span className="font-medium text-gray-700 text-sm">
                  Estimated Cost
                </span>
              </div>
              <p className="font-bold text-green-600 text-lg">
                {formatCurrency(recommendation.estimatedCost.min)} -{" "}
                {formatCurrency(recommendation.estimatedCost.max)}
              </p>
            </div>
            <div>
              <div className="flex items-center space-x-1 mb-1">
                <MaterialIcon
                  icon="schedule"
                  size="sm"
                  className="text-blue-600"
                />
                <span className="font-medium text-gray-700 text-sm">
                  Timeline
                </span>
              </div>
              <p className="font-bold text-blue-600 text-lg">
                {recommendation.timeline}
              </p>
            </div>
          </div>

          {/* Reasoning */}
          {variant === "detailed" && recommendation.reasoning.length > 0 && (
            <div className="mb-4">
              <h4 className="flex items-center mb-2 font-semibold text-gray-700 text-sm">
                <MaterialIcon icon="psychology" size="sm" className="mr-1" />
                Why this recommendation?
              </h4>
              <ul className="space-y-1">
                {recommendation.reasoning.slice(0, 3).map((reason, _index) => (
                  <li
                    key={_index}
                    className="flex items-start text-gray-600 text-sm"
                  >
                    <MaterialIcon
                      icon="check_circle"
                      size="sm"
                      className="flex-shrink-0 mt-0.5 mr-2 text-green-500"
                    />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Veteran Benefits */}
          {showVeteranBenefits &&
            recommendation.veteranBenefits &&
            recommendation.veteranBenefits.length > 0 && (
              <div className="bg-green-50 mb-4 p-3 border border-green-200 rounded-lg">
                <h4 className="flex items-center mb-2 font-semibold text-green-800 text-sm">
                  <MaterialIcon
                    icon="military_tech"
                    size="sm"
                    className="mr-1"
                  />
                  [MILITARY_TECH] Veteran Benefits
                </h4>
                <div className="space-y-2">
                  {recommendation.veteranBenefits.map((benefit, _index) => (
                    <VeteranBenefitDisplay key={_index} benefit={benefit} />
                  ))}
                </div>
              </div>
            )}

          {/* Tags */}
          {recommendation.tags.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {recommendation.tags.slice(0, 4).map((tag, _index) => (
                  <span
                    key={_index}
                    className="bg-gray-100 px-2 py-1 rounded-full text-gray-700 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 mb-4">
            <button
              onClick={handleEstimateClick}
              className="flex flex-1 justify-center items-center space-x-2 bg-[#BD9264] hover:bg-[#A67B4F] px-4 py-2 rounded-lg font-semibold text-white transition-colors duration-200"
            >
              <MaterialIcon icon="smart_toy" size="sm" />
              <span>Get AI Estimate</span>
            </button>
            <button
              onClick={handleCardClick}
              className="flex justify-center items-center hover:bg-gray-50 px-4 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 transition-colors duration-200"
            >
              <MaterialIcon icon="info" size="sm" />
            </button>
          </div>

          {/* Feedback Collection */}
          {showFeedback && (
            <FeedbackCollection
              recommendation={recommendation}
              userId={recommendation.id} // Would use actual user ID in production
              variant="compact"
              showRatingOnly={true}
            />
          )}
        </CardContent>
      </Card>
    </MotionDiv>
  );
};

const VeteranBenefitDisplay: React.FC<{ benefit: VeteranBenefit }> = ({
  benefit,
}) => {
  const getBenefitColor = (type: string) => {
    switch (type) {
      case "discount":
        return "text-green-700";
      case "priority":
        return "text-blue-700";
      case "financing":
        return "text-purple-700";
      case "specialist":
        return "text-orange-700";
      default:
        return "text-gray-700";
    }
  };

  return (
    <div className="flex items-start space-x-2">
      <MaterialIcon
        icon={benefit.icon}
        size="sm"
        className={getBenefitColor(benefit.type)}
      />
      <div className="flex-1">
        <p className="font-medium text-gray-800 text-sm">{benefit.title}</p>
        <p className="text-gray-600 text-xs">{benefit.value}</p>
      </div>
    </div>
  );
};

const SmartRecommendations: React.FC<SmartRecommendationsProps> = ({
  userProfile,
  showVeteranBenefits = true,
  showFeedback = true,
  maxRecommendations = 6,
  variant = "default",
  onRecommendationClick = () => {
    // Default empty handler - override with prop
  },
  onGetEstimate = () => {
    // Default empty handler - override with prop
  },
  className = "",
}) => {
  const [showAll, setShowAll] = useState(false);
  const {
    recommendations,
    isLoading,
    error: recommendationsError,
    generateRecommendations,
  } = useSmartRecommendations({ maxRecommendations });

  const { trackView, trackClick } = useRecommendationTracking(userProfile?.id);

  // Generate recommendations when user profile is provided
  useEffect(() => {
    if (userProfile) {
      generateRecommendations(userProfile);
    }
  }, [userProfile, generateRecommendations]);

  const displayRecommendations = showAll
    ? recommendations
    : recommendations.slice(0, 3);

  if (isLoading) {
    return (
      <div className={`${className}`}>
        <div className="py-8 text-center">
          <MaterialIcon
            icon="psychology"
            className="mb-4 text-[#386851] animate-pulse"
            size="3xl"
          />
          <p className="text-gray-600">
            Generating intelligent recommendations...
          </p>
        </div>
      </div>
    );
  }

  if (recommendationsError) {
    return (
      <div className={`${className}`}>
        <div className="py-8 text-center">
          <MaterialIcon icon="error" className="mb-4 text-red-500" size="2xl" />
          <p className="mb-2 text-red-600">Failed to load recommendations</p>
          <p className="text-gray-500 text-sm">{recommendationsError}</p>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className={`${className}`}>
        <div className="py-8 text-center">
          <MaterialIcon
            icon="lightbulb"
            className="mb-4 text-gray-400"
            size="2xl"
          />
          <p className="text-gray-600">No recommendations available</p>
          <p className="text-gray-500 text-sm">
            Complete your profile to get personalized suggestions
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <MaterialIcon
            icon="psychology"
            className="text-[#386851]"
            size="lg"
          />
          <div>
            <h2 className="font-bold text-gray-800 text-2xl">
              [MILITARY_TECH] Smart Project Recommendations
            </h2>
            <p className="text-gray-600">
              Helpful project suggestions based on Pacific Northwest trends
              {userProfile?.isVeteran && " and veteran benefits"}
            </p>
          </div>
        </div>
        {recommendations.length > 3 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center space-x-1 font-semibold text-[#386851] hover:text-[#2D5443] text-sm"
          >
            <span>
              {showAll ? "Show Less" : `Show All (${recommendations.length})`}
            </span>
            <MaterialIcon
              icon={showAll ? "expand_less" : "expand_more"}
              size="sm"
            />
          </button>
        )}
      </div>

      {/* Recommendations Grid */}
      <div
        className={`grid gap-6 ${
          variant === "compact"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
        }`}
      >
        <AnimatePresence>
          {displayRecommendations.map((recommendation, _index) => (
            <MotionDiv
              key={recommendation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: _index * 0.1 }}
            >
              <RecommendationCard
                recommendation={recommendation}
                showVeteranBenefits={
                  showVeteranBenefits && Boolean(userProfile?.isVeteran)
                }
                showFeedback={showFeedback}
                variant={variant}
                onRecommendationClick={onRecommendationClick}
                onGetEstimate={onGetEstimate}
                onTrackView={trackView}
                onTrackClick={trackClick}
              />
            </MotionDiv>
          ))}
        </AnimatePresence>
      </div>

      {/* Call to Action */}
      {recommendations.length > 0 && (
        <div className="mt-8 text-center">
          <p className="mb-4 text-gray-600">
            Ready to start your next project?
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() =>
                recommendations[0] && onGetEstimate(recommendations[0])
              }
              className="flex items-center space-x-2 bg-[#BD9264] hover:bg-[#A67B4F] px-6 py-3 rounded-lg font-semibold text-white transition-colors duration-200"
            >
              <MaterialIcon icon="smart_toy" size="sm" />
              <span>Get Instant AI Estimate</span>
            </button>
            <button
              onClick={() => (window.location.href = "/booking")}
              className="flex items-center space-x-2 bg-[#386851] hover:bg-[#2D5443] px-6 py-3 rounded-lg font-semibold text-white transition-colors duration-200"
            >
              <MaterialIcon icon="event" size="sm" />
              <span>Schedule Free Consultation</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartRecommendations;
