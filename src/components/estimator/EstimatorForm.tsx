'use client'

import React, { useState } from 'react'
import { Button, Card, CardHeader, CardTitle, CardContent, Input } from '../ui'
import { EstimateResults } from './EstimateResults'

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

export function EstimatorForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [projectData, setProjectData] = useState<ProjectData>({
    projectType: '',
    location: '',
    size: '',
    timeline: '',
    budget: '',
    complexity: '',
    materials: [],
    features: [],
    isVeteran: false,
  })
  const [estimate, setEstimate] = useState<EstimateData | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const projectTypes = [
    'Custom Home',
    'Home Addition',
    'Kitchen Remodel',
    'Bathroom Remodel',
    'Deck/Patio',
    'Commercial Building',
    'Renovation',
    'Other',
  ]

  const locations = [
    'Pasco, WA',
    'Kennewick, WA',
    'Richland, WA',
    'Walla Walla, WA',
    'Yakima, WA',
    'Spokane, WA',
    'Other Washington',
    'Other',
  ]

  const materialOptions = [
    'Premium/Luxury',
    'High-Quality Standard',
    'Standard Grade',
    'Budget-Friendly',
  ]

  const featureOptions = [
    'Smart Home Technology',
    'Energy Efficient Systems',
    'Custom Cabinetry',
    'High-End Appliances',
    'Hardwood Flooring',
    'Stone/Tile Work',
    'Custom Lighting',
    'Landscaping',
    'Pool/Spa',
    'Security System',
  ]

  const handleInputChange = (
    field: keyof ProjectData,
    value: string | string[] | number | boolean
  ) => {
    setProjectData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleArrayToggle = (
    field: 'materials' | 'features',
    value: string
  ) => {
    setProjectData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value],
    }))
  }

  const calculateEstimate = async () => {
    setIsCalculating(true)

    // Simulate AI calculation with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Mock AI estimation logic - in real implementation, this would call your AI service
    const baseRates = {
      'Custom Home': 180,
      'Home Addition': 150,
      'Kitchen Remodel': 200,
      'Bathroom Remodel': 180,
      'Deck/Patio': 80,
      'Commercial Building': 120,
      Renovation: 120,
      Other: 150,
    }

    const baseCostPerSqFt =
      baseRates[projectData.projectType as keyof typeof baseRates] || 150
    const sizeMultiplier = parseInt(projectData.size) || 1000
    const baseCost = baseCostPerSqFt * sizeMultiplier

    // Apply material quality multiplier
    const materialMultiplier =
      {
        'Premium/Luxury': 1.4,
        'High-Quality Standard': 1.2,
        'Standard Grade': 1.0,
        'Budget-Friendly': 0.8,
      }[projectData.materials[0]] || 1.0

    // Apply features cost
    const featureCost = projectData.features.length * 5000

    // Calculate breakdown
    const adjustedBase = baseCost * materialMultiplier + featureCost
    const materials = Math.round(adjustedBase * 0.45)
    const labor = Math.round(adjustedBase * 0.35)
    const permits = Math.round(adjustedBase * 0.05)
    const overhead = Math.round(adjustedBase * 0.1)
    const contingency = Math.round(adjustedBase * 0.05)

    const totalCost = materials + labor + permits + overhead + contingency

    // Veteran discount
    const veteranDiscount = projectData.isVeteran
      ? Math.round(totalCost * 0.1)
      : 0

    const estimateData: EstimateData = {
      totalCost: totalCost - veteranDiscount,
      breakdown: { materials, labor, permits, overhead, contingency },
      timeline: getProjectTimeline(projectData.projectType, sizeMultiplier),
      accuracy: 95,
      veteranDiscount,
    }

    setEstimate(estimateData)
    setIsCalculating(false)
    setCurrentStep(4)
  }

  const getProjectTimeline = (type: string, size: number): string => {
    const timelines = {
      'Custom Home': `${Math.ceil((size / 2000) * 8)}-${Math.ceil((size / 2000) * 12)} months`,
      'Home Addition': `${Math.ceil((size / 1000) * 2)}-${Math.ceil((size / 1000) * 4)} months`,
      'Kitchen Remodel': '4-8 weeks',
      'Bathroom Remodel': '2-4 weeks',
      'Deck/Patio': '1-3 weeks',
      'Commercial Building': `${Math.ceil((size / 5000) * 6)}-${Math.ceil((size / 5000) * 18)} months`,
      Renovation: `${Math.ceil((size / 1500) * 2)}-${Math.ceil((size / 1500) * 6)} months`,
    }
    return timelines[type as keyof typeof timelines] || '2-6 months'
  }

  const resetForm = () => {
    setCurrentStep(1)
    setProjectData({
      projectType: '',
      location: '',
      size: '',
      timeline: '',
      budget: '',
      complexity: '',
      materials: [],
      features: [],
      isVeteran: false,
    })
    setEstimate(null)
  }

  if (estimate) {
    return (
      <EstimateResults
        estimate={estimate}
        projectData={projectData}
        onStartOver={resetForm}
      />
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3].map(step => (
            <div
              key={step}
              className={`flex items-center ${step < 3 ? 'flex-1' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step <= currentStep
                    ? 'bg-brand-primary text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {step}
              </div>
              {step < 3 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    step < currentStep ? 'bg-brand-primary' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="text-center text-sm text-gray-600">
          Step {currentStep} of 3:{' '}
          {currentStep === 1
            ? 'Project Basics'
            : currentStep === 2
              ? 'Details & Features'
              : 'Review & Calculate'}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {currentStep === 1 && 'Tell Us About Your Project'}
            {currentStep === 2 && 'Project Details & Features'}
            {currentStep === 3 && 'Review Your Information'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Step 1: Project Basics */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  What type of project are you planning?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {projectTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => handleInputChange('projectType', type)}
                      className={`p-3 text-sm rounded-lg border-2 transition-colors ${
                        projectData.projectType === type
                          ? 'border-brand-primary bg-brand-primary text-white'
                          : 'border-gray-300 hover:border-brand-primary'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Project Location
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {locations.map(location => (
                    <button
                      key={location}
                      onClick={() => handleInputChange('location', location)}
                      className={`p-3 text-sm rounded-lg border-2 transition-colors ${
                        projectData.location === location
                          ? 'border-brand-primary bg-brand-primary text-white'
                          : 'border-gray-300 hover:border-brand-primary'
                      }`}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>

              <Input
                label="Project Size (square feet)"
                type="number"
                placeholder="e.g., 2000"
                value={projectData.size}
                onChange={e => handleInputChange('size', e.target.value)}
                helperText="Enter the total square footage for your project"
              />

              <Input
                label="Desired Budget Range"
                placeholder="e.g., $50,000 - $100,000"
                value={projectData.budget}
                onChange={e => handleInputChange('budget', e.target.value)}
                helperText="Optional: Help us provide more accurate estimates"
              />

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="veteran"
                  checked={projectData.isVeteran}
                  onChange={e =>
                    handleInputChange('isVeteran', e.target.checked)
                  }
                  className="mr-3"
                />
                <label htmlFor="veteran" className="text-sm text-gray-700">
                  I am a veteran or military family member (10% discount
                  applies)
                </label>
              </div>
            </div>
          )}

          {/* Step 2: Details & Features */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Material Quality Level
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {materialOptions.map(material => (
                    <button
                      key={material}
                      onClick={() => handleInputChange('materials', [material])}
                      className={`p-4 text-left rounded-lg border-2 transition-colors ${
                        projectData.materials.includes(material)
                          ? 'border-brand-primary bg-brand-primary text-white'
                          : 'border-gray-300 hover:border-brand-primary'
                      }`}
                    >
                      <div className="font-semibold">{material}</div>
                      <div className="text-sm opacity-75">
                        {material === 'Premium/Luxury' &&
                          '+40% cost, highest quality'}
                        {material === 'High-Quality Standard' &&
                          '+20% cost, excellent quality'}
                        {material === 'Standard Grade' &&
                          'Base cost, good quality'}
                        {material === 'Budget-Friendly' &&
                          '-20% cost, basic quality'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Special Features (select all that apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {featureOptions.map(feature => (
                    <button
                      key={feature}
                      onClick={() => handleArrayToggle('features', feature)}
                      className={`p-3 text-sm rounded-lg border-2 transition-colors ${
                        projectData.features.includes(feature)
                          ? 'border-brand-primary bg-brand-primary text-white'
                          : 'border-gray-300 hover:border-brand-primary'
                      }`}
                    >
                      {feature}
                    </button>
                  ))}
                </div>
              </div>

              <Input
                label="Desired Timeline"
                placeholder="e.g., Start in 3 months"
                value={projectData.timeline}
                onChange={e => handleInputChange('timeline', e.target.value)}
                helperText="When would you like to start construction?"
              />
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Project Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-600">Project Type:</span>
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
                    <span className="text-gray-600">Material Quality:</span>
                    <span className="ml-2 font-semibold">
                      {projectData.materials[0]}
                    </span>
                  </div>
                  {projectData.features.length > 0 && (
                    <div className="md:col-span-2">
                      <span className="text-gray-600">Special Features:</span>
                      <span className="ml-2 font-semibold">
                        {projectData.features.join(', ')}
                      </span>
                    </div>
                  )}
                  {projectData.isVeteran && (
                    <div className="md:col-span-2">
                      <span className="text-green-600">
                        ✓ Veteran Discount Applied (10%)
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {isCalculating ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
                  <p className="text-lg font-semibold">
                    Analyzing Your Project...
                  </p>
                  <p className="text-gray-600">
                    Our AI is calculating the most accurate estimate possible
                  </p>
                </div>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={calculateEstimate}
                >
                  Calculate My Estimate
                </Button>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep < 3 && (
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="secondary"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              <Button
                variant="primary"
                onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
                disabled={
                  (currentStep === 1 &&
                    (!projectData.projectType ||
                      !projectData.location ||
                      !projectData.size)) ||
                  (currentStep === 2 && projectData.materials.length === 0)
                }
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
