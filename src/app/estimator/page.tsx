'use client'

import React from 'react'
import Link from 'next/link'
import {
  PageHero,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
} from '../../components/ui'
import { EstimatorForm } from '../../components/estimator'
import { MaterialIcon } from '../../components/icons/MaterialIcon'
import SmartRecommendations from '../../components/recommendations/SmartRecommendations'
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
  HoverScale,
} from '../../components/animations/FramerMotionComponents'

// Structured data for SEO
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'MH Construction AI Estimator',
  description:
    'AI-powered construction estimator providing instant, accurate cost estimates with 95% accuracy guarantee for Pacific Northwest construction projects.',
  url: 'https://mhconstruction.com/estimator',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free AI-powered construction estimates',
  },
  provider: {
    '@type': 'Organization',
    name: 'MH Construction',
    url: 'https://mhconstruction.com',
    logo: 'https://mhconstruction.com/images/logo/mh-logo.png',
    sameAs: [
      'https://www.facebook.com/MHConstructionNW',
      'https://www.linkedin.com/company/mh-construction',
    ],
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '150',
  },
  featureList: [
    'Instant cost estimates',
    '95% accuracy guarantee',
    'Veteran discounts',
    'Pacific Northwest pricing',
    'No registration required',
    '24/7 availability',
  ],
}

export default function EstimatorPage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Hero Section */}
      <PageHero
        title="AI Construction Estimator"
        subtitle="Get instant, accurate cost estimates powered by artificial intelligence"
        description="Revolutionary AI technology delivers precise construction estimates in minutes, not days. Backed by 30+ years of Pacific Northwest construction experience."
      />

      {/* Key Differences Banner */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            <div className="gap-8 grid md:grid-cols-2">
              {/* AI Estimator (Current Page) */}
              <Card className="bg-white shadow-lg border-2 border-blue-500">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center">
                  <div className="flex justify-center items-center mb-2">
                    <MaterialIcon
                      icon="auto_awesome"
                      className="mr-2 w-6 h-6"
                    />
                    <CardTitle>AI-Powered Estimates</CardTitle>
                  </div>
                  <p className="text-blue-100">You're here now!</p>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MaterialIcon
                        icon="flash_on"
                        className="mt-1 w-5 h-5 text-brand-primary"
                      />
                      <div>
                        <p className="font-semibold">Instant Results</p>
                        <p className="text-gray-600 text-sm">
                          Get estimates in under 5 minutes
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MaterialIcon
                        icon="precision_manufacturing"
                        className="mt-1 w-5 h-5 text-brand-primary"
                      />
                      <div>
                        <p className="font-semibold">95% Accuracy</p>
                        <p className="text-gray-600 text-sm">
                          AI-powered calculations based on real project data
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MaterialIcon
                        icon="smartphone"
                        className="mt-1 w-5 h-5 text-brand-primary"
                      />
                      <div>
                        <p className="font-semibold">24/7 Available</p>
                        <p className="text-gray-600 text-sm">
                          No appointment needed
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MaterialIcon
                        icon="military_tech"
                        className="mt-1 w-5 h-5 text-brand-primary"
                      />
                      <div>
                        <p className="font-semibold">Veteran Discounts</p>
                        <p className="text-gray-600 text-sm">
                          Automatic 10% military discount applied
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Human Consultation */}
              <Card className="bg-white shadow-md hover:shadow-lg border border-gray-200 transition-shadow">
                <CardHeader className="bg-gradient-to-r from-brand-accent text-white text-center to-brand-accent-dark">
                  <div className="flex justify-center items-center mb-2">
                    <MaterialIcon icon="people" className="mr-2 w-6 h-6" />
                    <CardTitle>Human Consultation</CardTitle>
                  </div>
                  <p className="text-brand-accent-light">
                    For complex projects
                  </p>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MaterialIcon
                        icon="schedule"
                        className="mt-1 w-5 h-5 text-brand-accent"
                      />
                      <div>
                        <p className="font-semibold">Detailed Site Visit</p>
                        <p className="text-gray-600 text-sm">
                          Free on-site evaluation and measurements
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MaterialIcon
                        icon="engineering"
                        className="mt-1 w-5 h-5 text-brand-accent"
                      />
                      <div>
                        <p className="font-semibold">Expert Analysis</p>
                        <p className="text-gray-600 text-sm">
                          30+ years of construction experience
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MaterialIcon
                        icon="architecture"
                        className="mt-1 w-5 h-5 text-brand-accent"
                      />
                      <div>
                        <p className="font-semibold">Custom Solutions</p>
                        <p className="text-gray-600 text-sm">
                          Tailored recommendations for unique challenges
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MaterialIcon
                        icon="handshake"
                        className="mt-1 w-5 h-5 text-brand-accent"
                      />
                      <div>
                        <p className="font-semibold">Personal Service</p>
                        <p className="text-gray-600 text-sm">
                          Direct access to project manager
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t">
                    <Link href="/booking">
                      <Button className="bg-brand-accent w-full hover:bg-brand-accent-dark">
                        Schedule Free Consultation
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* AI Estimator Benefits */}
      <section className="bg-white py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                <span className="text-gray-700">Why Use Our</span>{' '}
                <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent">
                  AI Estimator?
                </span>
              </h2>
              <p className="mx-auto max-w-3xl text-gray-600 text-xl">
                Get reliable construction estimates instantly, backed by decades
                of project data and machine learning algorithms
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="gap-8 grid md:grid-cols-3 mb-12">
            <StaggeredFadeIn>
              <HoverScale>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="flex justify-center items-center bg-blue-100 mx-auto mb-4 rounded-full w-16 h-16">
                      <MaterialIcon
                        icon="speed"
                        className="w-8 h-8 text-blue-600"
                      />
                    </div>
                    <h3 className="mb-2 font-semibold text-xl">
                      Lightning Fast
                    </h3>
                    <p className="text-gray-600">
                      Complete estimates in under 5 minutes. No waiting, no
                      back-and-forth emails.
                    </p>
                  </CardContent>
                </Card>
              </HoverScale>

              <HoverScale>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="flex justify-center items-center bg-brand-secondary/10 mx-auto mb-4 rounded-full w-16 h-16">
                      <MaterialIcon
                        icon="analytics"
                        className="w-8 h-8 text-brand-secondary"
                      />
                    </div>
                    <h3 className="mb-2 font-semibold text-xl">
                      Data-Driven Accuracy
                    </h3>
                    <p className="text-gray-600">
                      Trained on 500+ completed projects with 95% accuracy rate
                      for Pacific Northwest pricing.
                    </p>
                  </CardContent>
                </Card>
              </HoverScale>

              <HoverScale>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="flex justify-center items-center bg-brand-accent/10 mx-auto mb-4 rounded-full w-16 h-16">
                      <MaterialIcon
                        icon="savings"
                        className="w-8 h-8 text-brand-accent"
                      />
                    </div>
                    <h3 className="mb-2 font-semibold text-xl">
                      No Hidden Costs
                    </h3>
                    <p className="text-gray-600">
                      Transparent breakdown of materials, labor, permits, and
                      all associated costs.
                    </p>
                  </CardContent>
                </Card>
              </HoverScale>
            </StaggeredFadeIn>
          </div>
        </div>
      </section>

      {/* Main Estimator Form */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            <div className="mb-8 text-center">
              <h2 className="mb-4 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                <span className="text-gray-700">Start Your</span>{' '}
                <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent">
                  AI Estimate
                </span>
              </h2>
              <p className="text-gray-600 text-lg">
                Answer a few questions and get your detailed construction
                estimate instantly
              </p>
            </div>
          </FadeInWhenVisible>

          {/* Estimator Form Component */}
          <div className="mx-auto max-w-4xl">
            <EstimatorForm />
          </div>
        </div>
      </section>

      {/* Smart Project Recommendations */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            <SmartRecommendations
              variant="compact"
              maxRecommendations={6}
              showVeteranBenefits={true}
              onRecommendationClick={recommendation => {
                // Track recommendation click
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'estimator_recommendation_click', {
                    project_type: recommendation.projectType,
                    confidence: recommendation.confidence,
                  })
                }
              }}
              onGetEstimate={recommendation => {
                // Scroll back to estimator form and pre-fill
                const estimatorSection =
                  document.querySelector('.estimator-form')
                if (estimatorSection) {
                  estimatorSection.scrollIntoView({ behavior: 'smooth' })
                }

                // Track estimate request from recommendation
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'recommendation_estimate_request', {
                    project_type: recommendation.projectType,
                    estimated_value: recommendation.estimatedCost.min,
                  })
                }
              }}
              className="bg-white shadow-lg p-8 rounded-xl"
            />
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-white py-12 border-t">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            <div className="gap-8 grid md:grid-cols-4 text-center">
              <div>
                <div className="mb-2 font-bold text-blue-600 text-3xl">
                  500+
                </div>
                <p className="text-gray-600">Projects in AI Database</p>
              </div>
              <div>
                <div className="mb-2 font-bold text-blue-600 text-3xl">95%</div>
                <p className="text-gray-600">Accuracy Rate</p>
              </div>
              <div>
                <div className="mb-2 font-bold text-blue-600 text-3xl">30+</div>
                <p className="text-gray-600">Years Experience</p>
              </div>
              <div>
                <div className="mb-2 font-bold text-blue-600 text-3xl">
                  24/7
                </div>
                <p className="text-gray-600">Always Available</p>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* CTA for Complex Projects */}
      <section className="bg-gradient-to-r from-gray-900 to-blue-900 py-16 text-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <FadeInWhenVisible>
            <h2 className="mb-4 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
              <span className="text-white/90">Need a More</span>{' '}
              <span className="bg-clip-text bg-gradient-to-r from-white to-brand-accent text-transparent">
                Detailed Analysis?
              </span>
            </h2>
            <p className="mx-auto mb-8 max-w-3xl text-blue-100 text-xl">
              For complex projects, unique sites, or custom architectural
              features, our expert team provides detailed consultations and site
              evaluations.
            </p>
            <div className="flex sm:flex-row flex-col justify-center gap-4">
              <Link href="/booking">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  <MaterialIcon
                    icon="calendar_today"
                    className="mr-2 w-5 h-5"
                  />
                  Schedule Human Consultation
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="hover:bg-white border-white text-white hover:text-gray-900"
                >
                  <MaterialIcon icon="phone" className="mr-2 w-5 h-5" />
                  Contact Us Directly
                </Button>
              </Link>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </>
  )
}
