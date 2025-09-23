'use client'

import React from 'react'
import { Button, Card, CardHeader, CardTitle, CardContent } from '../ui'

interface EstimateData {
  totalCost: number
  breakdown: {
    materials: number
    labor: number
    permits: number
    overhead: number
    contingency: number
  }
  timeline: string
  accuracy: number
  veteranDiscount?: number
}

interface ProjectData {
  projectType: string
  location: string
  size: string
  timeline: string
  budget: string
  complexity: string
  materials: string[]
  features: string[]
  isVeteran: boolean
}

interface EstimateResultsProps {
  estimate: EstimateData
  projectData: ProjectData
  onStartOver: () => void
}

export function EstimateResults({
  estimate,
  projectData,
  onStartOver,
}: EstimateResultsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const breakdownItems = [
    {
      label: 'Materials',
      amount: estimate.breakdown.materials,
      color: 'bg-blue-500',
    },
    { label: 'Labor', amount: estimate.breakdown.labor, color: 'bg-green-500' },
    {
      label: 'Permits & Fees',
      amount: estimate.breakdown.permits,
      color: 'bg-yellow-500',
    },
    {
      label: 'Overhead',
      amount: estimate.breakdown.overhead,
      color: 'bg-purple-500',
    },
    {
      label: 'Contingency',
      amount: estimate.breakdown.contingency,
      color: 'bg-red-500',
    },
  ]

  const totalBeforeDiscount = Object.values(estimate.breakdown).reduce(
    (sum, amount) => sum + amount,
    0
  )

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Success Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-tactic-bold text-brand-primary mb-2">
          Your Estimate is Ready!
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Based on current market conditions and our database of 10,000+
          completed projects, here&apos;s your detailed construction estimate
          with {estimate.accuracy}% accuracy.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Estimate Card */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white">
            <CardHeader>
              <CardTitle className="text-white text-2xl">
                Project Estimate
              </CardTitle>
              <div className="text-gray-200">
                {projectData.projectType} • {projectData.size} sq ft
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {estimate.veteranDiscount && (
                  <div className="bg-white/10 p-4 rounded-lg">
                    <div className="flex justify-between items-center text-lg">
                      <span>Subtotal:</span>
                      <span>{formatCurrency(totalBeforeDiscount)}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg text-yellow-300">
                      <span>Veteran Discount (10%):</span>
                      <span>-{formatCurrency(estimate.veteranDiscount)}</span>
                    </div>
                    <hr className="border-white/30 my-2" />
                  </div>
                )}

                <div className="flex justify-between items-center text-4xl font-tactic-bold">
                  <span>Total Cost:</span>
                  <span>{formatCurrency(estimate.totalCost)}</span>
                </div>

                <div className="text-gray-200">
                  <div className="flex justify-between">
                    <span>Cost per sq ft:</span>
                    <span>
                      {formatCurrency(
                        Math.round(
                          estimate.totalCost / parseInt(projectData.size)
                        )
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Timeline:</span>
                    <span>{estimate.timeline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Accuracy Rating:</span>
                    <span>{estimate.accuracy}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cost Breakdown */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Detailed Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {breakdownItems.map((item, index) => {
                  const percentage = Math.round(
                    (item.amount / totalBeforeDiscount) * 100
                  )
                  return (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{item.label}</span>
                        <span className="font-semibold">
                          {formatCurrency(item.amount)} ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${item.color}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Project Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Project Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-600">Type:</span>
                  <span className="ml-2 font-semibold">
                    {projectData.projectType}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Location:</span>
                  <span className="ml-2 font-semibold">
                    {projectData.location}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Size:</span>
                  <span className="ml-2 font-semibold">
                    {projectData.size} sq ft
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Materials:</span>
                  <span className="ml-2 font-semibold">
                    {projectData.materials[0]}
                  </span>
                </div>
                {projectData.features.length > 0 && (
                  <div>
                    <span className="text-gray-600">Features:</span>
                    <div className="ml-2 mt-1">
                      {projectData.features.map((feature, index) => (
                        <div
                          key={index}
                          className="text-xs bg-gray-100 inline-block px-2 py-1 rounded mr-1 mb-1"
                        >
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="primary" className="w-full">
                  Schedule Free Consultation
                </Button>
                <Button variant="secondary" className="w-full">
                  Download PDF Report
                </Button>
                <Button variant="secondary" className="w-full">
                  Share Estimate
                </Button>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={onStartOver}
                >
                  Start New Estimate
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Accuracy Info */}
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">
                95% Accuracy Guarantee
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-green-700">
                This estimate is backed by our 95% accuracy guarantee. If your
                final project cost varies by more than 10%, we&apos;ll provide a
                credit toward your next project.
              </p>
            </CardContent>
          </Card>

          {/* Military Support */}
          {projectData.isVeteran && (
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">
                  🎖️ Thank You for Your Service
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-700 mb-3">
                  As a veteran-owned company, we&apos;re honored to serve those
                  who served. Your 10% discount has been applied.
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Learn About Our Wounded Warrior Initiative
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Timeline Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Project Timeline Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                phase: 'Planning & Permits',
                duration: '2-4 weeks',
                description: 'Design finalization, permit acquisition',
              },
              {
                phase: 'Site Preparation',
                duration: '1-2 weeks',
                description: 'Excavation, utilities, foundation',
              },
              {
                phase: 'Construction',
                duration: '80% of timeline',
                description: 'Main construction work',
              },
              {
                phase: 'Finishing & Inspection',
                duration: '2-3 weeks',
                description: 'Final details, inspections, walkthrough',
              },
            ].map((phase, index) => (
              <div
                key={index}
                className="text-center p-4 bg-gray-50 rounded-lg"
              >
                <div className="w-8 h-8 bg-brand-primary text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">
                  {index + 1}
                </div>
                <h4 className="font-semibold text-brand-primary mb-1">
                  {phase.phase}
                </h4>
                <div className="text-sm text-gray-600 mb-2">
                  {phase.duration}
                </div>
                <div className="text-xs text-gray-500">{phase.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <div className="text-center text-xs text-gray-500 max-w-4xl mx-auto">
        <p>
          * This estimate is based on current market conditions, material costs,
          and regional labor rates. Final pricing may vary based on specific
          site conditions, material selections, and permit requirements. This
          estimate is valid for 30 days. Contact us for a detailed quote and
          site evaluation.
        </p>
      </div>
    </div>
  )
}
