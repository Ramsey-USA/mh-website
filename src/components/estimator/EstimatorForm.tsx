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

  // Enhanced AI features - Real-time pricing system
  const enhancedFeatures = {
    // Enhanced material database with descriptions and multipliers
    materialDatabase: {
      'Premium/Luxury': {
        multiplier: 1.4,
        description: 'High-end finishes, custom materials, luxury fixtures',
        examples: 'Hardwood, natural stone, custom cabinetry',
      },
      'High-Quality Standard': {
        multiplier: 1.2,
        description: 'Quality materials, good finishes, standard upgrades',
        examples: 'Engineered wood, quality tile, standard appliances',
      },
      'Standard Grade': {
        multiplier: 1.0,
        description: 'Standard construction materials, basic finishes',
        examples: 'Vinyl, standard tile, basic fixtures',
      },
      'Budget-Friendly': {
        multiplier: 0.8,
        description: 'Cost-effective options, basic materials',
        examples: 'Laminate, basic tile, economy fixtures',
      },
    },

    // Location-based cost adjustments (Pacific Northwest specific)
    locationMultipliers: {
      'Pasco, WA': 1.0,
      'Kennewick, WA': 1.05,
      'Richland, WA': 1.08,
      'Walla Walla, WA': 1.03,
      'Yakima, WA': 1.02,
      'Spokane, WA': 1.15,
      'Other Washington': 1.1,
      Other: 1.2,
    },

    // Seasonal cost factors
    seasonalFactors: {
      winter: 1.1, // Higher costs in winter (Dec-Feb)
      spring: 1.0, // Standard rates (Mar-May)
      summer: 0.95, // Slightly lower in peak season (Jun-Aug)
      fall: 1.0, // Standard rates (Sep-Nov)
    },

    // Project complexity adjustments
    complexityMultipliers: {
      Simple: 0.9,
      Standard: 1.0,
      Complex: 1.3,
      'Very Complex': 1.6,
    },
  }

  // Get current season for pricing
  const getCurrentSeason = () => {
    const month = new Date().getMonth()
    if (month >= 11 || month <= 1) return 'winter'
    if (month >= 2 && month <= 4) return 'spring'
    if (month >= 5 && month <= 7) return 'summer'
    return 'fall'
  }

  // Enhanced form validation with helpful messages
  const getValidationStatus = () => {
    const issues = []

    if (currentStep >= 1) {
      if (!projectData.projectType) issues.push('Please select a project type')
      if (!projectData.location) issues.push('Please select your location')
      if (!projectData.size) issues.push('Please enter the project size')
      else if (parseInt(projectData.size) < 100)
        issues.push('Project size seems too small (minimum 100 sq ft)')
      else if (parseInt(projectData.size) > 50000)
        issues.push('Project size seems too large (maximum 50,000 sq ft)')
    }

    if (currentStep >= 2) {
      if (projectData.materials.length === 0)
        issues.push('Please select a material quality level')
      if (!projectData.complexity)
        issues.push('Please indicate project complexity')
    }

    return {
      isValid: issues.length === 0,
      issues,
      canProceed:
        currentStep === 1
          ? projectData.projectType &&
            projectData.location &&
            projectData.size &&
            parseInt(projectData.size) >= 100
          : currentStep === 2
          ? projectData.materials.length > 0
          : true,
    }
  }

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
    await new Promise(resolve => setTimeout(resolve, 2500))

    // Enhanced AI estimation logic with real-time pricing
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
    let baseCost = baseCostPerSqFt * sizeMultiplier

    // Apply enhanced material quality multiplier with descriptions
    const materialData =
      enhancedFeatures.materialDatabase[
        projectData
          .materials[0] as keyof typeof enhancedFeatures.materialDatabase
      ]
    const materialMultiplier = materialData?.multiplier || 1.0

    // Apply location-based cost adjustments
    const locationMultiplier =
      enhancedFeatures.locationMultipliers[
        projectData.location as keyof typeof enhancedFeatures.locationMultipliers
      ] || 1.0

    // Apply seasonal pricing factors
    const currentSeason = getCurrentSeason()
    const seasonalMultiplier =
      enhancedFeatures.seasonalFactors[
        currentSeason as keyof typeof enhancedFeatures.seasonalFactors
      ]

    // Apply complexity adjustments
    const complexityMultiplier =
      enhancedFeatures.complexityMultipliers[
        projectData.complexity as keyof typeof enhancedFeatures.complexityMultipliers
      ] || 1.0

    // Enhanced feature cost calculation
    const featureCosts = {
      'Smart Home Technology': 8000,
      'Energy Efficient Systems': 12000,
      'Custom Cabinetry': 15000,
      'High-End Appliances': 10000,
      'Hardwood Flooring': 8000,
      'Stone/Tile Work': 6000,
      'Custom Lighting': 4000,
      Landscaping: 5000,
      'Pool/Spa': 25000,
      'Security System': 3000,
    }

    const totalFeatureCost = projectData.features.reduce((total, feature) => {
      return (
        total + (featureCosts[feature as keyof typeof featureCosts] || 2000)
      )
    }, 0)

    // Apply all multipliers for comprehensive AI pricing
    baseCost =
      baseCost *
      materialMultiplier *
      locationMultiplier *
      seasonalMultiplier *
      complexityMultiplier

    // Calculate enhanced breakdown with AI adjustments
    const adjustedBase = baseCost + totalFeatureCost
    const materials = Math.round(adjustedBase * 0.45)
    const labor = Math.round(adjustedBase * 0.35)
    const permits = Math.round(adjustedBase * 0.05)
    const overhead = Math.round(adjustedBase * 0.1)
    const contingency = Math.round(adjustedBase * 0.05)

    const totalCost = materials + labor + permits + overhead + contingency

    // Enhanced veteran discount calculation
    const veteranDiscount = projectData.isVeteran
      ? Math.round(totalCost * 0.12) // Increased to 12% for veterans
      : 0

    // AI accuracy calculation based on data completeness
    const dataCompleteness =
      [
        projectData.projectType,
        projectData.location,
        projectData.size,
        projectData.complexity,
        projectData.materials[0],
      ].filter(Boolean).length / 5

    const accuracy = Math.round(85 + dataCompleteness * 10) // 85-95% based on data quality

    const estimateData: EstimateData = {
      totalCost: totalCost - veteranDiscount,
      breakdown: { materials, labor, permits, overhead, contingency },
      timeline: getProjectTimeline(projectData.projectType, sizeMultiplier),
      accuracy,
      veteranDiscount,
    }

    setEstimate(estimateData)
    setIsCalculating(false)
    setCurrentStep(4)
  }

  const getProjectTimeline = (type: string, size: number): string => {
    const timelines = {
      'Custom Home': `${Math.ceil((size / 2000) * 8)}-${Math.ceil(
        (size / 2000) * 12
      )} months`,
      'Home Addition': `${Math.ceil((size / 1000) * 2)}-${Math.ceil(
        (size / 1000) * 4
      )} months`,
      'Kitchen Remodel': '4-8 weeks',
      'Bathroom Remodel': '2-4 weeks',
      'Deck/Patio': '1-3 weeks',
      'Commercial Building': `${Math.ceil((size / 5000) * 6)}-${Math.ceil(
        (size / 5000) * 18
      )} months`,
      Renovation: `${Math.ceil((size / 1500) * 2)}-${Math.ceil(
        (size / 1500) * 6
      )} months`,
    }
    return timelines[type as keyof typeof timelines] || '2-6 months'
  }

  // Real-time pricing preview function
  const getQuickEstimate = () => {
    if (!projectData.projectType || !projectData.size) return null

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
    const size = parseInt(projectData.size) || 0
    let baseCost = baseCostPerSqFt * size

    // Apply available multipliers
    if (projectData.materials[0]) {
      const materialData =
        enhancedFeatures.materialDatabase[
          projectData
            .materials[0] as keyof typeof enhancedFeatures.materialDatabase
        ]
      baseCost *= materialData?.multiplier || 1.0
    }

    if (projectData.location) {
      const locationMultiplier =
        enhancedFeatures.locationMultipliers[
          projectData.location as keyof typeof enhancedFeatures.locationMultipliers
        ] || 1.0
      baseCost *= locationMultiplier
    }

    // Add basic feature costs
    baseCost += projectData.features.length * 5000

    // Veteran discount
    const veteranDiscount = projectData.isVeteran ? baseCost * 0.12 : 0

    return {
      estimate: Math.round(baseCost - veteranDiscount),
      hasVeteranDiscount: projectData.isVeteran,
      discountAmount: Math.round(veteranDiscount),
    }
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
    <div className="mx-auto max-w-4xl">
      {/* Enhanced Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          {[
            {
              step: 1,
              title: 'Project Basics',
              description: 'Type, location & size',
            },
            {
              step: 2,
              title: 'Details & Features',
              description: 'Materials & special features',
            },
            {
              step: 3,
              title: 'Review & Calculate',
              description: 'Final review & AI estimation',
            },
          ].map(({ step, title, description }, index) => (
            <div
              key={step}
              className={`flex flex-col items-center ${
                step < 3 ? 'flex-1' : ''
              } relative`}
            >
              {/* Step Circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  step <= currentStep
                    ? 'bg-brand-primary text-white shadow-lg scale-110'
                    : step === currentStep + 1
                    ? 'bg-blue-100 text-brand-primary border-2 border-brand-primary'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step < currentStep ? '✓' : step}
              </div>

              {/* Step Info */}
              <div className="mt-2 max-w-24 text-center">
                <div
                  className={`text-xs font-semibold ${
                    step <= currentStep ? 'text-brand-primary' : 'text-gray-500'
                  }`}
                >
                  {title}
                </div>
                <div
                  className={`text-xs mt-1 ${
                    step <= currentStep ? 'text-gray-600' : 'text-gray-400'
                  }`}
                >
                  {description}
                </div>
              </div>

              {/* Progress Line */}
              {step < 3 && (
                <div className="top-5 left-12 -z-10 absolute w-full h-0.5">
                  <div
                    className={`h-full transition-all duration-500 ${
                      step < currentStep ? 'bg-brand-primary' : 'bg-gray-300'
                    }`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Overall Progress Bar */}
        <div className="bg-gray-200 rounded-full w-full h-2">
          <div
            className="bg-gradient-to-r from-brand-primary to-blue-500 rounded-full h-2 transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>

        <div className="mt-3 text-gray-600 text-sm text-center">
          Step {currentStep} of 3 • {Math.round((currentStep / 3) * 100)}%
          Complete
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
                <label className="block mb-3 font-medium text-gray-700 text-sm">
                  What type of project are you planning?
                </label>
                <div className="gap-3 grid grid-cols-2 md:grid-cols-4">
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
                <label className="block mb-3 font-medium text-gray-700 text-sm">
                  Project Location
                </label>
                <div className="gap-3 grid grid-cols-2 md:grid-cols-3">
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

              <div>
                <label className="block mb-2 font-medium text-gray-700 text-sm">
                  Project Size (square feet) *
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    min="100"
                    max="50000"
                    placeholder="e.g., 2000"
                    value={projectData.size}
                    onChange={e => handleInputChange('size', e.target.value)}
                    className={`${
                      projectData.size &&
                      (parseInt(projectData.size) < 100 ||
                        parseInt(projectData.size) > 50000)
                        ? 'border-red-300 focus:border-red-500'
                        : ''
                    }`}
                  />
                  {projectData.size && parseInt(projectData.size) > 0 && (
                    <div className="top-1/2 right-3 absolute text-gray-500 text-sm -translate-y-1/2">
                      {parseInt(projectData.size).toLocaleString()} sq ft
                    </div>
                  )}
                </div>
                <div className="mt-1 text-gray-600 text-xs">
                  Typical ranges: Custom homes (2,000-5,000 sq ft) • Additions
                  (200-1,000 sq ft) • Remodels (100-500 sq ft)
                </div>
                {projectData.size && parseInt(projectData.size) < 100 && (
                  <div className="mt-1 text-red-600 text-xs">
                    ⚠️ Minimum project size is 100 sq ft
                  </div>
                )}
                {projectData.size && parseInt(projectData.size) > 50000 && (
                  <div className="mt-1 text-red-600 text-xs">
                    ⚠️ For projects over 50,000 sq ft, please contact us
                    directly
                  </div>
                )}
              </div>

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
                <label htmlFor="veteran" className="text-gray-700 text-sm">
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
                <label className="block mb-3 font-medium text-gray-700 text-sm">
                  Material Quality Level
                </label>
                <div className="gap-3 grid grid-cols-1 md:grid-cols-2">
                  {materialOptions.map(material => {
                    const materialInfo =
                      enhancedFeatures.materialDatabase[
                        material as keyof typeof enhancedFeatures.materialDatabase
                      ]
                    const isSelected = projectData.materials.includes(material)
                    return (
                      <button
                        key={material}
                        onClick={() =>
                          handleInputChange('materials', [material])
                        }
                        className={`p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                          isSelected
                            ? 'border-brand-primary bg-brand-primary text-white shadow-lg'
                            : 'border-gray-300 hover:border-brand-primary hover:shadow-md'
                        }`}
                      >
                        <div className="flex justify-between items-center font-semibold">
                          {material}
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              isSelected
                                ? 'bg-white/20'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {materialInfo?.multiplier === 1.4 && '+40%'}
                            {materialInfo?.multiplier === 1.2 && '+20%'}
                            {materialInfo?.multiplier === 1.0 && 'Base'}
                            {materialInfo?.multiplier === 0.8 && '-20%'}
                          </span>
                        </div>
                        <div
                          className={`text-sm mt-1 ${
                            isSelected ? 'opacity-90' : 'opacity-75'
                          }`}
                        >
                          {materialInfo?.description}
                        </div>
                        <div
                          className={`text-xs mt-2 ${
                            isSelected ? 'opacity-80' : 'opacity-60'
                          }`}
                        >
                          Examples: {materialInfo?.examples}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="block mb-3 font-medium text-gray-700 text-sm">
                  Special Features (select all that apply)
                </label>
                <div className="gap-3 grid grid-cols-2 md:grid-cols-3">
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
                <h3 className="mb-4 font-semibold text-lg">Project Summary</h3>
                <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
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
                <div className="py-8 text-center">
                  <div className="mx-auto mb-4 border-b-2 border-brand-primary rounded-full w-12 h-12 animate-spin"></div>
                  <p className="font-semibold text-lg">
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

          {/* Real-time Pricing Preview */}
          {currentStep < 3 &&
            (() => {
              const quickEstimate = getQuickEstimate()
              return quickEstimate ? (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 mt-6 p-4 border border-blue-200 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="mb-1 font-semibold text-gray-700 text-sm">
                        📊 Real-time Estimate Preview
                      </h4>
                      <p className="text-gray-600 text-xs">
                        Based on current selections • Final estimate will be
                        more detailed
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-indigo-600 text-2xl">
                        ${quickEstimate.estimate.toLocaleString()}
                      </div>
                      {quickEstimate.hasVeteranDiscount && (
                        <div className="text-green-600 text-xs">
                          Veteran discount: -$
                          {quickEstimate.discountAmount.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                  {currentStep === 1 && (
                    <div className="mt-2 text-blue-600 text-xs">
                      💡 Add materials and features in the next step for more
                      accuracy
                    </div>
                  )}
                  {currentStep === 2 && (
                    <div className="mt-2 text-blue-600 text-xs">
                      ✨ Estimate will be refined with seasonal and complexity
                      factors
                    </div>
                  )}
                </div>
              ) : null
            })()}

          {/* Enhanced Navigation Buttons */}
          {currentStep < 3 &&
            (() => {
              const validation = getValidationStatus()
              return (
                <div className="mt-8 pt-6 border-t">
                  {/* Validation Issues Display */}
                  {!validation.isValid && validation.issues.length > 0 && (
                    <div className="bg-yellow-50 mb-4 p-3 border border-yellow-200 rounded-lg">
                      <div className="flex items-start">
                        <div className="mr-2 text-yellow-600">⚠️</div>
                        <div>
                          <div className="mb-1 font-medium text-yellow-800 text-sm">
                            Please complete the following:
                          </div>
                          <ul className="space-y-1 text-yellow-700 text-sm">
                            {validation.issues.map((issue, index) => (
                              <li key={index} className="flex items-start">
                                <span className="mr-1">•</span>
                                {issue}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() =>
                        setCurrentStep(Math.max(1, currentStep - 1))
                      }
                      disabled={currentStep === 1}
                      className="flex items-center"
                    >
                      ← Previous
                    </Button>

                    <div className="flex items-center">
                      {!validation.canProceed && (
                        <div className="mr-3 text-gray-500 text-sm">
                          Complete required fields to continue
                        </div>
                      )}
                      <Button
                        variant="primary"
                        onClick={() =>
                          setCurrentStep(Math.min(3, currentStep + 1))
                        }
                        disabled={!validation.canProceed}
                        className={`flex items-center ${
                          validation.canProceed
                            ? 'bg-brand-primary hover:bg-brand-primary/90'
                            : 'opacity-50 cursor-not-allowed'
                        }`}
                      >
                        {currentStep === 2 ? 'Review & Calculate' : 'Next'} →
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })()}
        </CardContent>
      </Card>
    </div>
  )
}
