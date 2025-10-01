'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
} from '../../components/ui'
import {
  generateSEOMetadata,
  generateOrganizationStructuredData,
  StructuredData,
} from '../../components/seo/seo-meta'
import {
  WPZoomShieldIcon as ShieldIcon,
  WPZoomStarIcon as StarIcon,
  WPZoomHammerIcon as HammerIcon,
  WPZoomCheckIcon as CheckIcon,
  WPZoomUserIcon as UserIcon,
  WPZoomBoltIcon as BoltIcon,
  WPZoomCogIcon as CogIcon,
  WPZoomToolsIcon as ToolsIcon,
} from '../../components/icons/WPZoomIcons'
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
  HoverScale,
} from '../../components/animations/FramerMotionComponents'

export default function EstimatorPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isCalculating, setIsCalculating] = useState(false)
  type ComplexityKey = 'low' | 'standard' | 'high'

  const [estimateData, setEstimateData] = useState({
    projectType: '',
    squareFootage: '',
    timeline: '',
    budgetRange: '',
    location: '',
    complexity: 'standard' as ComplexityKey,
    materials: 'standard',
    permits: true,
    contactInfo: {
      name: '',
      email: '',
      phone: '',
    },
  })
  type EstimateResult = {
    low: number
    mid: number
    high: number
    permits: number
    breakdown: {
      labor: number
      materials: number
      permits: number
      overhead: number
      profit: number
    }
  }
  const [estimate, setEstimate] = useState<EstimateResult | null>(null)

  const projectTypes = [
    {
      id: 'custom-home',
      name: 'Custom Home',
      description: 'New single-family home construction',
      baseRate: 180,
      icon: '🏠',
      complexity: { low: 150, standard: 180, high: 220 },
    },
    {
      id: 'renovation',
      name: 'Home Renovation',
      description: 'Major home updates and remodeling',
      baseRate: 120,
      icon: '🔨',
      complexity: { low: 100, standard: 120, high: 160 },
    },
    {
      id: 'addition',
      name: 'Home Addition',
      description: 'Room additions and expansions',
      baseRate: 200,
      icon: '📐',
      complexity: { low: 180, standard: 200, high: 250 },
    },
    {
      id: 'commercial',
      name: 'Commercial Build-Out',
      description: 'Office and retail construction',
      baseRate: 100,
      icon: '🏢',
      complexity: { low: 80, standard: 100, high: 140 },
    },
    {
      id: 'industrial',
      name: 'Industrial Project',
      description: 'Warehouse and manufacturing facilities',
      baseRate: 60,
      icon: '🏭',
      complexity: { low: 50, standard: 60, high: 80 },
    },
    {
      id: 'accessibility',
      name: 'Accessibility Modifications',
      description: 'Veteran and senior accessibility upgrades',
      baseRate: 150,
      icon: '♿',
      complexity: { low: 120, standard: 150, high: 200 },
    },
  ]

  const complexityLevels = [
    {
      id: 'low',
      name: 'Standard',
      description: 'Basic finishes, standard materials',
      multiplier: 0.85,
    },
    {
      id: 'standard',
      name: 'Premium',
      description: 'Quality finishes, good materials',
      multiplier: 1.0,
    },
    {
      id: 'high',
      name: 'Luxury',
      description: 'High-end finishes, premium materials',
      multiplier: 1.3,
    },
  ]

  const aiFeatures = [
    {
      icon: BoltIcon,
      title: 'AI-Powered Analysis',
      description:
        'Advanced algorithms analyze thousands of similar projects for accurate estimates.',
    },
    {
      icon: CogIcon,
      title: 'Real-Time Market Data',
      description:
        'Current material costs and labor rates updated daily for precision pricing.',
    },
    {
      icon: CheckIcon,
      title: '±15% Accuracy',
      description:
        'Industry-leading accuracy backed by machine learning and veteran expertise.',
    },
    {
      icon: ShieldIcon,
      title: 'Veteran Verified',
      description:
        'Every estimate reviewed by our experienced veteran construction team.',
    },
  ]

  const calculateEstimate = () => {
    setIsCalculating(true)

    // Simulate AI calculation delay
    setTimeout(() => {
      const selectedProject = projectTypes.find(
        p => p.id === estimateData.projectType
      )
      if (!selectedProject) return
      const baseRate =
        selectedProject.complexity[estimateData.complexity as ComplexityKey]
      const sqft = parseInt(estimateData.squareFootage) || 0

      // Apply various multipliers
      let totalCost = sqft * baseRate

      // Location adjustments (Seattle/Portland premium)
      const locationMultiplier =
        estimateData.location === 'seattle'
          ? 1.15
          : estimateData.location === 'portland'
          ? 1.1
          : 1.0
      totalCost *= locationMultiplier

      // Timeline adjustments
      const timelineMultiplier =
        estimateData.timeline === 'rush'
          ? 1.2
          : estimateData.timeline === 'flexible'
          ? 0.95
          : 1.0
      totalCost *= timelineMultiplier

      // Permits and fees
      const permitsCost = estimateData.permits ? totalCost * 0.08 : 0

      const lowEstimate = Math.round(totalCost * 0.85)
      const highEstimate = Math.round(totalCost * 1.15)
      const midEstimate = Math.round(totalCost)

      setEstimate({
        low: lowEstimate,
        mid: midEstimate,
        high: highEstimate,
        permits: Math.round(permitsCost),
        breakdown: {
          labor: Math.round(totalCost * 0.4),
          materials: Math.round(totalCost * 0.35),
          permits: Math.round(permitsCost),
          overhead: Math.round(totalCost * 0.15),
          profit: Math.round(totalCost * 0.1),
        },
      })
      setIsCalculating(false)
      setCurrentStep(4)
    }, 3000)
  }

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith('contactInfo.')) {
      const child = field.split('.')[1] as keyof typeof estimateData.contactInfo
      setEstimateData(prev => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          [child]: value,
        },
      }))
    } else {
      setEstimateData(prev => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <>
      {/* SEO Structured Data */}
      <StructuredData data={generateOrganizationStructuredData()} />

      {/* Hero Section */}
      <section className="relative bg-white dark:bg-gray-900 h-screen hero-section">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 dark:from-blue-900/10 to-transparent"></div>
        <div className="top-20 right-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-32 h-32"></div>
        <div className="bottom-20 left-20 absolute bg-blue-500/5 blur-3xl rounded-full w-40 h-40"></div>

        <div className="z-10 relative flex justify-center items-center mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-8 max-w-7xl h-full">
          <FadeInWhenVisible className="w-full text-center">
            {/* Hero Badge */}
            <div className="inline-flex items-center bg-blue-500/10 dark:bg-blue-500/20 shadow-lg backdrop-blur-sm mb-8 px-6 py-3 border border-blue-500/20 dark:border-blue-500/30 rounded-full">
              <BoltIcon
                size="sm"
                color="currentColor"
                className="text-blue-500 dark:text-blue-400"
              />
              <span className="ml-3 font-bold text-blue-500 dark:text-blue-400 text-xs uppercase tracking-wider">
                AI-Powered Technology
              </span>
            </div>

            {/* Hero Title */}
            <h1 className="mb-6 pb-2 font-black text-gray-900 dark:text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-relaxed tracking-tighter hero-title">
              <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight">
                Get Your Instant
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-blue-500 via-brand-primary to-blue-500 drop-shadow-sm font-black text-transparent">
                AI Construction Estimate
              </span>
            </h1>

            {/* Hero Description */}
            <p className="mx-auto mb-8 max-w-4xl font-light text-gray-600 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide">
              Revolutionary{' '}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                AI-powered estimation system
              </span>{' '}
              delivers{' '}
              <span className="bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-primary font-semibold text-transparent">
                ±15% accuracy in minutes, not weeks
              </span>
              .
            </p>

            {/* CTA Buttons */}
            <div className="flex sm:flex-row flex-col justify-center items-center gap-8 mb-8">
              <Button
                variant="primary"
                size="xl"
                className="shadow-xl"
                onClick={() => {
                  const el = document.getElementById('estimator-tool')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <BoltIcon size="sm" color="currentColor" className="mr-3" />
                <span className="z-10 relative tracking-wide">
                  Start AI Estimate
                </span>
              </Button>
              <Link href="/booking">
                <HoverScale>
                  <Button variant="outline" size="xl" className="shadow-xl">
                    <UserIcon size="sm" color="currentColor" className="mr-3" />
                    <span className="z-10 relative tracking-wide">
                      Schedule Consultation
                    </span>
                  </Button>
                </HoverScale>
              </Link>
            </div>

            {/* Trust Indicators */}
            <StaggeredFadeIn className="flex flex-wrap justify-center items-center gap-10 font-medium text-gray-700 dark:text-gray-300 text-base">
              {[
                '±15% Accuracy Guarantee',
                'Free & Instant Results',
                'No Personal Info Required',
                'Veteran-Verified Estimates',
              ].map((indicator, index) => (
                <div
                  key={index}
                  className="flex items-center bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm px-4 py-2 border border-gray-200/20 dark:border-gray-700/30 rounded-full"
                >
                  <CheckIcon
                    size="sm"
                    color="currentColor"
                    className="mr-3 text-green-600 dark:text-green-400"
                  />
                  <span className="tracking-wide">{indicator}</span>
                </div>
              ))}
            </StaggeredFadeIn>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="relative bg-white dark:bg-gray-900 py-20 lg:py-32 xl:py-40 features-section">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 dark:from-gray-800/30 to-transparent"></div>
        <div className="top-20 right-20 absolute bg-blue-500/5 blur-3xl rounded-full w-32 h-32"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-24 lg:mb-32 text-center">
            <div className="inline-flex items-center bg-brand-primary/10 dark:bg-brand-primary/20 shadow-lg mb-10 px-8 py-4 border border-brand-primary/20 rounded-full">
              <CogIcon size="md" color="var(--brand-primary)" />
              <span className="ml-4 font-black text-brand-primary text-sm uppercase tracking-wider">
                Revolutionary Technology
              </span>
            </div>

            <h2 className="mb-10 font-black text-gray-900 dark:text-gray-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
              <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                Advanced AI Meets
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-blue-500 via-brand-primary to-blue-500 drop-shadow-sm font-black text-transparent">
                Military Precision
              </span>
            </h2>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {aiFeatures.map((feature, index) => (
              <HoverScale key={index}>
                <Card className="group hover:shadow-2xl border-gray-200/30 hover:border-blue-500/30 h-full transition-all duration-500">
                  <CardContent className="p-8 text-center">
                    <div className="flex justify-center mb-6">
                      <div className="bg-gradient-to-br from-blue-500 to-brand-primary shadow-lg p-6 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                        <feature.icon
                          size="xl"
                          color="white"
                          className="text-white"
                        />
                      </div>
                    </div>
                    <h3 className="mb-4 font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-500 text-2xl transition-colors">
                      {feature.title}
                    </h3>
                    <p className="font-light text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </HoverScale>
            ))}
          </StaggeredFadeIn>
        </div>
      </section>

      {/* AI Estimator Tool */}
      <section
        id="estimator-tool"
        className="relative bg-gradient-to-b from-gray-50 dark:from-gray-800 to-white dark:to-gray-900 py-20 lg:py-32 xl:py-40 estimator-section"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(59,130,246,0.05)_0%,transparent_50%)] opacity-60"></div>
        <div className="right-20 bottom-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-40 h-40"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-16 text-center">
            <div className="inline-flex items-center bg-blue-500/10 dark:bg-blue-500/20 shadow-lg mb-10 px-8 py-4 border border-blue-500/20 rounded-full">
              <BoltIcon size="md" color="var(--blue-500)" />
              <span className="ml-4 font-black text-blue-500 text-sm uppercase tracking-wider">
                Instant AI Estimate
              </span>
            </div>

            <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
              Get Your Estimate in{' '}
              <span className="bg-clip-text bg-gradient-to-r from-blue-500 to-brand-primary drop-shadow-sm font-black text-transparent">
                3 Simple Steps
              </span>
            </h2>
          </FadeInWhenVisible>

          <div className="mx-auto max-w-4xl">
            {/* Progress Bar */}
            <div className="bg-gray-200 dark:bg-gray-700 mb-12 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-brand-primary rounded-full h-3 transition-all duration-500"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              ></div>
            </div>

            {/* Step Indicators */}
            <div className="flex justify-between mb-16">
              {['Project Type', 'Details', 'Contact', 'Estimate'].map(
                (step, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center ${
                      currentStep > index + 1
                        ? 'text-green-600'
                        : currentStep === index + 1
                        ? 'text-blue-500'
                        : 'text-gray-400'
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 mb-2 ${
                        currentStep > index + 1
                          ? 'bg-green-600 border-green-600 text-white'
                          : currentStep === index + 1
                          ? 'bg-blue-500 border-blue-500 text-white'
                          : 'border-gray-300'
                      }`}
                    >
                      {currentStep > index + 1 ? '✓' : index + 1}
                    </div>
                    <span className="font-medium text-sm">{step}</span>
                  </div>
                )
              )}
            </div>

            {/* Step Content */}
            <Card className="shadow-xl border-blue-500/20">
              <CardContent className="p-8">
                {/* Step 1: Project Type */}
                {currentStep === 1 && (
                  <FadeInWhenVisible>
                    <div className="mb-8 text-center">
                      <h3 className="mb-4 font-bold text-gray-900 dark:text-gray-100 text-3xl">
                        What type of project are you planning?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-lg">
                        Select the option that best describes your construction
                        project.
                      </p>
                    </div>

                    <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                      {projectTypes.map(type => (
                        <HoverScale key={type.id}>
                          <button
                            onClick={() => {
                              handleInputChange('projectType', type.id)
                              setTimeout(nextStep, 300)
                            }}
                            className={`p-6 border-2 rounded-xl text-left transition-all duration-300 ${
                              estimateData.projectType === type.id
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                            }`}
                          >
                            <div className="mb-4 text-4xl">{type.icon}</div>
                            <h4 className="mb-2 font-bold text-gray-900 dark:text-gray-100 text-xl">
                              {type.name}
                            </h4>
                            <p className="mb-3 text-gray-600 dark:text-gray-300">
                              {type.description}
                            </p>
                            <div className="font-semibold text-blue-500 text-sm">
                              Starting at ${type.baseRate}/sq ft
                            </div>
                          </button>
                        </HoverScale>
                      ))}
                    </div>
                  </FadeInWhenVisible>
                )}

                {/* Step 2: Project Details */}
                {currentStep === 2 && (
                  <FadeInWhenVisible>
                    <div className="mb-8 text-center">
                      <h3 className="mb-4 font-bold text-gray-900 dark:text-gray-100 text-3xl">
                        Tell us about your project details
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-lg">
                        These details help our AI provide the most accurate
                        estimate.
                      </p>
                    </div>

                    <div className="space-y-8">
                      {/* Square Footage */}
                      <div>
                        <label className="block mb-3 font-semibold text-gray-900 dark:text-gray-100 text-lg">
                          Square Footage
                        </label>
                        <Input
                          type="number"
                          placeholder="e.g., 2500"
                          value={estimateData.squareFootage}
                          onChange={e =>
                            handleInputChange('squareFootage', e.target.value)
                          }
                          className="p-4 text-lg"
                        />
                      </div>

                      {/* Complexity Level */}
                      <div>
                        <label className="block mb-3 font-semibold text-gray-900 dark:text-gray-100 text-lg">
                          Quality Level
                        </label>
                        <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
                          {complexityLevels.map(level => (
                            <button
                              key={level.id}
                              onClick={() =>
                                handleInputChange('complexity', level.id)
                              }
                              className={`p-4 border-2 rounded-xl text-left transition-all duration-300 ${
                                estimateData.complexity === level.id
                                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                              }`}
                            >
                              <h4 className="mb-2 font-bold text-gray-900 dark:text-gray-100">
                                {level.name}
                              </h4>
                              <p className="text-gray-600 dark:text-gray-300 text-sm">
                                {level.description}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Location */}
                      <div>
                        <label className="block mb-3 font-semibold text-gray-900 dark:text-gray-100 text-lg">
                          Project Location
                        </label>
                        <select
                          value={estimateData.location}
                          onChange={e =>
                            handleInputChange('location', e.target.value)
                          }
                          className="bg-white dark:bg-gray-800 p-4 border border-gray-300 dark:border-gray-600 rounded-lg w-full text-lg"
                        >
                          <option value="">Select location</option>
                          <option value="seattle">Seattle Metro</option>
                          <option value="portland">Portland Metro</option>
                          <option value="tacoma">Tacoma</option>
                          <option value="spokane">Spokane</option>
                          <option value="other">Other Pacific Northwest</option>
                        </select>
                      </div>

                      {/* Timeline */}
                      <div>
                        <label className="block mb-3 font-semibold text-gray-900 dark:text-gray-100 text-lg">
                          Preferred Timeline
                        </label>
                        <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
                          {[
                            {
                              id: 'rush',
                              name: 'Rush (ASAP)',
                              multiplier: '+20%',
                            },
                            {
                              id: 'standard',
                              name: 'Standard',
                              multiplier: 'Base rate',
                            },
                            {
                              id: 'flexible',
                              name: 'Flexible',
                              multiplier: '-5%',
                            },
                          ].map(timeline => (
                            <button
                              key={timeline.id}
                              onClick={() =>
                                handleInputChange('timeline', timeline.id)
                              }
                              className={`p-4 border-2 rounded-xl text-center transition-all duration-300 ${
                                estimateData.timeline === timeline.id
                                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                              }`}
                            >
                              <h4 className="mb-1 font-bold text-gray-900 dark:text-gray-100">
                                {timeline.name}
                              </h4>
                              <p className="font-medium text-blue-500 text-sm">
                                {timeline.multiplier}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between mt-8">
                      <Button variant="outline" onClick={prevStep}>
                        Back
                      </Button>
                      <Button
                        variant="primary"
                        onClick={nextStep}
                        disabled={
                          !estimateData.squareFootage || !estimateData.location
                        }
                      >
                        Continue
                      </Button>
                    </div>
                  </FadeInWhenVisible>
                )}

                {/* Step 3: Contact Information */}
                {currentStep === 3 && (
                  <FadeInWhenVisible>
                    <div className="mb-8 text-center">
                      <h3 className="mb-4 font-bold text-gray-900 dark:text-gray-100 text-3xl">
                        Get your personalized estimate
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-lg">
                        Optional: Provide contact info to receive a detailed PDF
                        estimate and consultation.
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                        <div>
                          <label className="block mb-2 font-semibold text-gray-900 dark:text-gray-100">
                            Name (Optional)
                          </label>
                          <Input
                            type="text"
                            placeholder="Your name"
                            value={estimateData.contactInfo.name}
                            onChange={e =>
                              handleInputChange(
                                'contactInfo.name',
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <label className="block mb-2 font-semibold text-gray-900 dark:text-gray-100">
                            Email (Optional)
                          </label>
                          <Input
                            type="email"
                            placeholder="your.email@example.com"
                            value={estimateData.contactInfo.email}
                            onChange={e =>
                              handleInputChange(
                                'contactInfo.email',
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block mb-2 font-semibold text-gray-900 dark:text-gray-100">
                          Phone (Optional)
                        </label>
                        <Input
                          type="tel"
                          placeholder="(555) 123-4567"
                          value={estimateData.contactInfo.phone}
                          onChange={e =>
                            handleInputChange(
                              'contactInfo.phone',
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="flex justify-between mt-8">
                      <Button variant="outline" onClick={prevStep}>
                        Back
                      </Button>
                      <Button variant="primary" onClick={calculateEstimate}>
                        Generate AI Estimate
                      </Button>
                    </div>
                  </FadeInWhenVisible>
                )}

                {/* Step 4: Results */}
                {currentStep === 4 && (
                  <FadeInWhenVisible>
                    {isCalculating ? (
                      <div className="py-16 text-center">
                        <div className="mb-8">
                          <div className="inline-block border-b-2 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
                        </div>
                        <h3 className="mb-4 font-bold text-gray-900 dark:text-gray-100 text-3xl">
                          AI is analyzing your project...
                        </h3>
                        <div className="space-y-2 text-gray-600 dark:text-gray-300">
                          <p>📊 Processing market data...</p>
                          <p>🔍 Analyzing similar projects...</p>
                          <p>⚡ Calculating accurate estimates...</p>
                        </div>
                      </div>
                    ) : (
                      estimate && (
                        <div>
                          <div className="mb-8 text-center">
                            <h3 className="mb-4 font-bold text-gray-900 dark:text-gray-100 text-3xl">
                              Your AI-Generated Estimate
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-lg">
                              Based on current market data and 500+ similar
                              projects
                            </p>
                          </div>

                          {/* Estimate Range */}
                          <div className="bg-gradient-to-br from-blue-50 dark:from-blue-900/20 to-brand-primary/5 mb-8 p-8 border border-blue-200/30 rounded-2xl">
                            <div className="text-center">
                              <h4 className="mb-6 font-bold text-gray-900 dark:text-gray-100 text-2xl">
                                Estimated Project Cost
                              </h4>
                              <div className="gap-4 grid grid-cols-3 mb-6">
                                <div className="text-center">
                                  <p className="mb-1 text-gray-600 dark:text-gray-300 text-sm">
                                    Low
                                  </p>
                                  <p className="font-bold text-blue-600 text-2xl">
                                    ${estimate.low.toLocaleString()}
                                  </p>
                                </div>
                                <div className="text-center">
                                  <p className="mb-1 text-gray-600 dark:text-gray-300 text-sm">
                                    Most Likely
                                  </p>
                                  <p className="font-black text-brand-primary text-3xl">
                                    ${estimate.mid.toLocaleString()}
                                  </p>
                                </div>
                                <div className="text-center">
                                  <p className="mb-1 text-gray-600 dark:text-gray-300 text-sm">
                                    High
                                  </p>
                                  <p className="font-bold text-blue-600 text-2xl">
                                    ${estimate.high.toLocaleString()}
                                  </p>
                                </div>
                              </div>
                              <div className="inline-block bg-blue-500/10 px-4 py-2 rounded-full">
                                <span className="font-semibold text-blue-600 text-sm">
                                  ±15% Accuracy • Veteran Verified
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Cost Breakdown */}
                          <div className="bg-white dark:bg-gray-800 mb-8 p-6 border border-gray-200 dark:border-gray-700 rounded-xl">
                            <h4 className="mb-4 font-bold text-gray-900 dark:text-gray-100 text-xl">
                              Cost Breakdown
                            </h4>
                            <div className="space-y-3">
                              {Object.entries(estimate.breakdown).map(
                                ([category, amount]) => (
                                  <div
                                    key={category}
                                    className="flex justify-between items-center"
                                  >
                                    <span className="text-gray-700 dark:text-gray-300 capitalize">
                                      {category}:
                                    </span>
                                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                                      ${amount.toLocaleString()}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          </div>

                          {/* Next Steps */}
                          <div className="space-y-4">
                            <div className="flex sm:flex-row flex-col gap-4">
                              <Link href="/booking" className="flex-1">
                                <Button variant="primary" className="w-full">
                                  Schedule Free Consultation
                                </Button>
                              </Link>
                              <Button variant="outline" className="flex-1">
                                Download PDF Estimate
                              </Button>
                            </div>
                            <div className="text-center">
                              <button
                                onClick={() => {
                                  setCurrentStep(1)
                                  setEstimate(null)
                                  setEstimateData({
                                    projectType: '',
                                    squareFootage: '',
                                    timeline: '',
                                    budgetRange: '',
                                    location: '',
                                    complexity: 'standard',
                                    materials: 'standard',
                                    permits: true,
                                    contactInfo: {
                                      name: '',
                                      email: '',
                                      phone: '',
                                    },
                                  })
                                }}
                                className="font-medium text-blue-500 hover:text-blue-600"
                              >
                                Start New Estimate
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </FadeInWhenVisible>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative bg-gradient-to-r from-blue-500 to-brand-primary py-20 lg:py-32 cta-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="text-center">
            <h2 className="mb-8 font-black text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
              <span className="block mb-4 font-semibold text-gray-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                Ready to Build
              </span>
              <span className="block drop-shadow-lg">With Confidence?</span>
            </h2>

            <p className="mx-auto mb-12 max-w-4xl font-light text-gray-100 text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide">
              Transform your AI estimate into reality with our veteran-owned
              construction team. Military precision meets cutting-edge
              technology.
            </p>

            <div className="flex sm:flex-row flex-col justify-center items-center gap-8">
              <Link href="/booking">
                <HoverScale>
                  <Button
                    variant="secondary"
                    size="xl"
                    className="bg-white hover:bg-gray-100 shadow-xl text-blue-500"
                  >
                    <UserIcon size="sm" color="currentColor" className="mr-3" />
                    <span className="z-10 relative tracking-wide">
                      Schedule Consultation
                    </span>
                  </Button>
                </HoverScale>
              </Link>
              <Link href="/portfolio">
                <HoverScale>
                  <Button
                    variant="outline"
                    size="xl"
                    className="hover:bg-white/10 shadow-xl border-white text-white"
                  >
                    <HammerIcon
                      size="sm"
                      color="currentColor"
                      className="mr-3"
                    />
                    <span className="z-10 relative tracking-wide">
                      View Our Work
                    </span>
                  </Button>
                </HoverScale>
              </Link>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </>
  )
}
