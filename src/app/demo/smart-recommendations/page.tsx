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
      veteranDetails: isVeteran ? {
        serviceBranch: 'Army',
        serviceEra: 'modern',
        combatVeteran: true,
        disabilityRating: 20,
        specialPrograms: ['va_benefits'],
        preferredSpecialist: undefined
      } : undefined,
      preferences: {
        budgetRange,
        projectTypes,
        timeframe: 'within_6_months',
        priorities: isVeteran ? ['veteran_benefits', 'accessibility', 'security'] : ['quality', 'value'],
        communicationStyle: isVeteran ? 'military' : 'casual'
      },
      behaviorHistory: [
        {
          timestamp: new Date(),
          action: 'view',
          page: '/estimator',
          data: { projectType: 'kitchen' }
        },
        {
          timestamp: new Date(),
          action: 'estimate',
          page: '/estimator',
          data: { projectType: 'kitchen', value: 45000 },
          conversionEvent: true
        }
      ],
      location: 'Pasco, WA'
    }

    setUserProfile(profile)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <MaterialIcon icon="psychology" className="text-brand-primary" size="3xl" />
            <h1 className="text-4xl font-bold text-gray-800">
              🎖️ Smart Recommendations Demo
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Phase 6.1: Advanced AI-powered project recommendations with veteran-focused intelligence
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <MaterialIcon icon="settings" className="mr-2" />
            User Profile Configuration
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Veteran Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget Range
              </label>
              <select
                value={`${budgetRange.min}-${budgetRange.max}`}
                onChange={(e) => {
                  const [min, max] = e.target.value.split('-').map(Number)
                  setBudgetRange({ min, max })
                }}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="10000-35000">$10K - $35K (Budget)</option>
                <option value="25000-75000">$25K - $75K (Moderate)</option>
                <option value="50000-150000">$50K - $150K (Premium)</option>
                <option value="100000-300000">$100K+ (Luxury)</option>
              </select>
            </div>

            {/* Project Types */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Interest
              </label>
              <select
                multiple
                value={projectTypes}
                onChange={(e) => {
                  const values = Array.from(e.target.selectedOptions, option => option.value)
                  setProjectTypes(values)
                }}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                size={3}
              >
                <option value="residential">🏠 Residential</option>
                <option value="kitchen">🍳 Kitchen</option>
                <option value="bathroom">🛁 Bathroom</option>
                <option value="commercial">🏢 Commercial</option>
                <option value="renovation">🔨 Renovation</option>
                <option value="addition">➕ Addition</option>
              </select>
            </div>

            {/* Generate Button */}
            <div className="flex items-end">
              <button
                onClick={generateTestProfile}
                className="w-full bg-brand-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-dark transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <MaterialIcon icon="auto_awesome" size="sm" />
                <span>Generate Recommendations</span>
              </button>
            </div>
          </div>

          {/* Profile Summary */}
          {userProfile && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Generated User Profile</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium">Status:</span> {userProfile.isVeteran ? '🎖️ Veteran' : 'Civilian'}
                  {userProfile.isVeteran && userProfile.veteranDetails && (
                    <div className="ml-4 text-xs text-blue-700">
                      {userProfile.veteranDetails.serviceBranch} • {userProfile.veteranDetails.combatVeteran ? 'Combat Veteran' : 'Non-Combat'}
                    </div>
                  )}
                </div>
                <div>
                  <span className="font-medium">Budget:</span> ${budgetRange.min.toLocaleString()} - ${budgetRange.max.toLocaleString()}
                </div>
                <div>
                  <span className="font-medium">Interests:</span> {projectTypes.join(', ')}
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
            onRecommendationClick={(rec) => {
              console.log('Recommendation clicked:', rec)
              alert(`Clicked: ${rec.title}`)
            }}
            onGetEstimate={(rec) => {
              console.log('Get estimate for:', rec)
              alert(`Getting estimate for: ${rec.title}`)
            }}
            className="bg-white rounded-lg shadow-lg p-6"
          />
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <MaterialIcon icon="lightbulb" className="text-gray-400 mb-4" size="4xl" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">
              Ready to Generate Smart Recommendations
            </h3>
            <p className="text-gray-500 mb-6">
              Configure the user profile above and click "Generate Recommendations" to see the AI-powered suggestion engine in action.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="p-4 bg-blue-50 rounded-lg">
                <MaterialIcon icon="psychology" className="text-blue-600 mb-2" size="lg" />
                <h4 className="font-semibold text-blue-800">AI-Powered Analysis</h4>
                <p className="text-sm text-blue-700">Advanced algorithms analyze user preferences and behavior patterns.</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <MaterialIcon icon="military_tech" className="text-green-600 mb-2" size="lg" />
                <h4 className="font-semibold text-green-800">Veteran Benefits</h4>
                <p className="text-sm text-green-700">Specialized recommendations with military-specific benefits and priority service.</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <MaterialIcon icon="trending_up" className="text-purple-600 mb-2" size="lg" />
                <h4 className="font-semibold text-purple-800">Learning Algorithm</h4>
                <p className="text-sm text-purple-700">Recommendations improve over time based on user feedback and interactions.</p>
              </div>
            </div>
          </div>
        )}

        {/* Features Overview */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            🚀 Phase 6.1 Features Implemented
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <MaterialIcon icon="auto_awesome" className="text-brand-primary mb-3" size="2xl" />
              <h3 className="font-semibold text-gray-800 mb-2">Smart Algorithm Engine</h3>
              <p className="text-sm text-gray-600">Advanced recommendation scoring with confidence levels and reasoning</p>
            </div>
            <div className="text-center">
              <MaterialIcon icon="shield" className="text-green-600 mb-3" size="2xl" />
              <h3 className="font-semibold text-gray-800 mb-2">Veteran Enhancement</h3>
              <p className="text-sm text-gray-600">Service branch detection, combat veteran benefits, and priority processing</p>
            </div>
            <div className="text-center">
              <MaterialIcon icon="analytics" className="text-blue-600 mb-3" size="2xl" />
              <h3 className="font-semibold text-gray-800 mb-2">Behavioral Learning</h3>
              <p className="text-sm text-gray-600">User behavior tracking and machine learning optimization</p>
            </div>
            <div className="text-center">
              <MaterialIcon icon="recommend" className="text-purple-600 mb-3" size="2xl" />
              <h3 className="font-semibold text-gray-800 mb-2">Project Matching</h3>
              <p className="text-sm text-gray-600">Intelligent project similarity matching and budget alignment</p>
            </div>
            <div className="text-center">
              <MaterialIcon icon="track_changes" className="text-orange-600 mb-3" size="2xl" />
              <h3 className="font-semibold text-gray-800 mb-2">Performance Metrics</h3>
              <p className="text-sm text-gray-600">Click-through rates, conversion tracking, and accuracy scoring</p>
            </div>
            <div className="text-center">
              <MaterialIcon icon="integration_instructions" className="text-indigo-600 mb-3" size="2xl" />
              <h3 className="font-semibold text-gray-800 mb-2">AI Integration</h3>
              <p className="text-sm text-gray-600">Seamless integration with existing MilitaryConstructionAI system</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}