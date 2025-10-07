/**
 * Smart Recommendations Demo Page
 * Phase 6.1: Test page for the Smart Project Recommendations Engine
 */

'use client'

import React, { useState } from 'react'
import { MaterialIcon } from '../../../components/icons/MaterialIcon'
import SmartRecommendations from '../../../components/recommendations/SmartRecommendations'
import type { UserProfile } from '../../../lib/recommendations/SmartRecommendationEngine'

export default function SmartRecommendationsDemo() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isVeteran, setIsVeteran] = useState(false)
  const [budgetRange, setBudgetRange] = useState({ min: 25000, max: 75000 })
  const [projectTypes, setProjectTypes] = useState<string[]>(['residential'])

  const generateTestProfile = () => {
    const profile: UserProfile = {
      id: `demo-user-${Date.now()}`,
      sessionId: `demo-session-${Date.now()}`,
      isVeteran,
      veteranDetails: isVeteran
        ? {
            serviceBranch: 'Army',
            serviceEra: 'modern',
            combatVeteran: true,
            disabilityRating: 20,
            specialPrograms: ['va_benefits'],
            preferredSpecialist: undefined,
          }
        : undefined,
      preferences: {
        budgetRange,
        projectTypes,
        timeframe: 'within_6_months',
        priorities: isVeteran
          ? ['veteran_benefits', 'accessibility', 'security']
          : ['quality', 'value'],
        communicationStyle: isVeteran ? 'military' : 'casual',
      },
      behaviorHistory: [
        {
          timestamp: new Date(),
          action: 'view',
          page: '/estimator',
          data: { projectType: 'kitchen' },
        },
        {
          timestamp: new Date(),
          action: 'estimate',
          page: '/estimator',
          data: { projectType: 'kitchen', value: 45000 },
          conversionEvent: true,
        },
      ],
      location: 'Pasco, WA',
    }

    setUserProfile(profile)
  }

  return (
    <div className="bg-gray-50 py-8 min-h-screen">
      <div className="mx-auto px-4 max-w-7xl container">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex justify-center items-center space-x-3 mb-4">
            <MaterialIcon
              icon="psychology"
              className="text-brand-primary"
              size="3xl"
            />
            <h1 className="font-bold text-gray-800 text-4xl">
              🎖️ Smart Recommendations Demo
            </h1>
          </div>
          <p className="mx-auto max-w-2xl text-gray-600 text-lg">
            Phase 6.1: Advanced AI-powered project recommendations with
            veteran-focused intelligence
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white shadow-lg mb-8 p-6 rounded-lg">
          <h2 className="flex items-center mb-4 font-semibold text-gray-800 text-2xl">
            <MaterialIcon icon="settings" className="mr-2" />
            User Profile Configuration
          </h2>

          <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {/* Veteran Status */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 text-sm">
                Veteran Status
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={!isVeteran}
                    onChange={() => setIsVeteran(false)}
                    className="mr-2"
                  />
                  Civilian
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={isVeteran}
                    onChange={() => setIsVeteran(true)}
                    className="mr-2"
                  />
                  🎖️ Veteran
                </label>
              </div>
            </div>

            {/* Budget Range */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 text-sm">
                Budget Range
              </label>
              <select
                value={`${budgetRange.min}-${budgetRange.max}`}
                onChange={e => {
                  const [min, max] = e.target.value.split('-').map(Number)
                  setBudgetRange({ min, max })
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg w-full"
              >
                <option value="10000-35000">$10K - $35K (Budget)</option>
                <option value="25000-75000">$25K - $75K (Moderate)</option>
                <option value="50000-150000">$50K - $150K (Premium)</option>
                <option value="100000-300000">$100K+ (Luxury)</option>
              </select>
            </div>

            {/* Project Types */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 text-sm">
                Project Interest
              </label>
              <select
                multiple
                value={projectTypes}
                onChange={e => {
                  const values = Array.from(
                    e.target.selectedOptions,
                    option => option.value
                  )
                  setProjectTypes(values)
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg w-full"
                size={3}
              >
                <option value="residential">Residential</option>
                <option value="kitchen">Kitchen</option>
                <option value="bathroom">Bathroom</option>
                <option value="commercial">Commercial</option>
                <option value="renovation">Renovation</option>
                <option value="addition">Addition</option>
              </select>
            </div>

            {/* Generate Button */}
            <div className="flex items-end">
              <button
                onClick={generateTestProfile}
                className="flex justify-center items-center space-x-2 bg-brand-primary hover:bg-brand-dark px-6 py-3 rounded-lg w-full font-semibold text-white transition-colors duration-200"
              >
                <MaterialIcon icon="auto_awesome" size="sm" />
                <span>Generate Recommendations</span>
              </button>
            </div>
          </div>

          {/* Profile Summary */}
          {userProfile && (
            <div className="bg-blue-50 mt-6 p-4 border border-blue-200 rounded-lg">
              <h3 className="mb-2 font-semibold text-blue-800">
                Generated User Profile
              </h3>
              <div className="gap-4 grid grid-cols-1 md:grid-cols-3 text-sm">
                <div>
                  <span className="font-medium">Status:</span>{' '}
                  {userProfile.isVeteran ? '🎖️ Veteran' : 'Civilian'}
                  {userProfile.isVeteran && userProfile.veteranDetails && (
                    <div className="ml-4 text-blue-700 text-xs">
                      {userProfile.veteranDetails.serviceBranch} •{' '}
                      {userProfile.veteranDetails.combatVeteran
                        ? 'Combat Veteran'
                        : 'Non-Combat'}
                    </div>
                  )}
                </div>
                <div>
                  <span className="font-medium">Budget:</span> $
                  {budgetRange.min.toLocaleString()} - $
                  {budgetRange.max.toLocaleString()}
                </div>
                <div>
                  <span className="font-medium">Interests:</span>{' '}
                  {projectTypes.join(', ')}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Recommendations Display */}
        {userProfile ? (
          <SmartRecommendations
            userProfile={userProfile}
            showVeteranBenefits={true}
            variant="detailed"
            maxRecommendations={6}
            onRecommendationClick={rec => {
              console.log('Recommendation clicked:', rec)
              alert(`Clicked: ${rec.title}`)
            }}
            onGetEstimate={rec => {
              console.log('Get estimate for:', rec)
              alert(`Getting estimate for: ${rec.title}`)
            }}
            className="bg-white shadow-lg p-6 rounded-lg"
          />
        ) : (
          <div className="bg-white shadow-lg p-12 rounded-lg text-center">
            <MaterialIcon
              icon="lightbulb"
              className="mb-4 text-gray-400"
              size="4xl"
            />
            <h3 className="mb-2 font-semibold text-gray-600 text-2xl">
              Ready to Generate Smart Recommendations
            </h3>
            <p className="mb-6 text-gray-500">
              Configure the user profile above and click "Generate
              Recommendations" to see the AI-powered suggestion engine in
              action.
            </p>
            <div className="gap-6 grid grid-cols-1 md:grid-cols-3 text-left">
              <div className="bg-blue-50 p-4 rounded-lg">
                <MaterialIcon
                  icon="psychology"
                  className="mb-2 text-blue-600"
                  size="lg"
                />
                <h4 className="font-semibold text-blue-800">
                  AI-Powered Analysis
                </h4>
                <p className="text-blue-700 text-sm">
                  Advanced algorithms analyze user preferences and behavior
                  patterns.
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <MaterialIcon
                  icon="military_tech"
                  className="mb-2 text-green-600"
                  size="lg"
                />
                <h4 className="font-semibold text-green-800">
                  Veteran Benefits
                </h4>
                <p className="text-green-700 text-sm">
                  Specialized recommendations with military-specific benefits
                  and priority service.
                </p>
              </div>
              <div className="bg-brand-secondary/10 p-4 rounded-lg">
                <MaterialIcon
                  icon="trending_up"
                  className="mb-2 text-brand-secondary"
                  size="lg"
                />
                <h4 className="font-semibold text-brand-secondary-dark">
                  Learning Algorithm
                </h4>
                <p className="text-brand-secondary text-sm">
                  Recommendations improve over time based on user feedback and
                  interactions.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Features Overview */}
        <div className="bg-white shadow-lg mt-8 p-6 rounded-lg">
          <h2 className="mb-6 font-semibold text-gray-800 text-2xl text-center">
            🚀 Phase 6.1 Features Implemented
          </h2>
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <MaterialIcon
                icon="auto_awesome"
                className="mb-3 text-brand-primary"
                size="2xl"
              />
              <h3 className="mb-2 font-semibold text-gray-800">
                Smart Algorithm Engine
              </h3>
              <p className="text-gray-600 text-sm">
                Advanced recommendation scoring with confidence levels and
                reasoning
              </p>
            </div>
            <div className="text-center">
              <MaterialIcon
                icon="shield"
                className="mb-3 text-green-600"
                size="2xl"
              />
              <h3 className="mb-2 font-semibold text-gray-800">
                Veteran Enhancement
              </h3>
              <p className="text-gray-600 text-sm">
                Service branch detection, combat veteran benefits, and priority
                processing
              </p>
            </div>
            <div className="text-center">
              <MaterialIcon
                icon="analytics"
                className="mb-3 text-brand-primary"
                size="2xl"
              />
              <h3 className="mb-2 font-semibold text-gray-800">
                Behavioral Learning
              </h3>
              <p className="text-gray-600 text-sm">
                User behavior tracking and machine learning optimization
              </p>
            </div>
            <div className="text-center">
              <MaterialIcon
                icon="recommend"
                className="mb-3 text-brand-secondary"
                size="2xl"
              />
              <h3 className="mb-2 font-semibold text-gray-800">
                Project Matching
              </h3>
              <p className="text-gray-600 text-sm">
                Intelligent project similarity matching and budget alignment
              </p>
            </div>
            <div className="text-center">
              <MaterialIcon
                icon="track_changes"
                className="mb-3 text-brand-accent"
                size="2xl"
              />
              <h3 className="mb-2 font-semibold text-gray-800">
                Performance Metrics
              </h3>
              <p className="text-gray-600 text-sm">
                Click-through rates, conversion tracking, and accuracy scoring
              </p>
            </div>
            <div className="text-center">
              <MaterialIcon
                icon="integration_instructions"
                className="mb-3 text-brand-primary"
                size="2xl"
              />
              <h3 className="mb-2 font-semibold text-gray-800">
                AI Integration
              </h3>
              <p className="text-gray-600 text-sm">
                Seamless integration with existing MilitaryConstructionAI system
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
