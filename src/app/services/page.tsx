'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const serviceCategories = [
    {
      id: 'residential',
      name: 'Residential',
      icon: '🏠',
      color: 'from-blue-500 to-blue-600',
      description: 'Custom homes, renovations, and additions',
    },
    {
      id: 'commercial',
      name: 'Commercial',
      icon: '🏢',
      color: 'from-green-500 to-green-600',
      description: 'Office buildings, retail spaces, and warehouses',
    },
    {
      id: 'industrial',
      name: 'Industrial',
      icon: '🏭',
      color: 'from-gray-500 to-gray-600',
      description: 'Manufacturing facilities and industrial complexes',
    },
    {
      id: 'specialty',
      name: 'Specialty',
      icon: '⚡',
      color: 'from-yellow-500 to-yellow-600',
      description: 'Veteran housing and accessibility modifications',
    },
  ]

  const services = [
    // Residential Services
    {
      category: 'residential',
      title: 'Custom Home Construction',
      description:
        'Build your dream home from the ground up with military precision and attention to detail.',
      features: [
        'Design consultation',
        'Permits & approvals',
        'Quality materials',
        '1-year warranty',
      ],
      priceRange: '$300,000 - $1,500,000',
      timeline: '6-18 months',
      icon: HammerIcon,
      color: 'from-blue-500 to-blue-600',
    },
    {
      category: 'residential',
      title: 'Home Renovations',
      description:
        'Transform your existing space with expert renovations that add value and comfort.',
      features: [
        'Kitchen remodeling',
        'Bathroom updates',
        'Basement finishing',
        'Room additions',
      ],
      priceRange: '$25,000 - $200,000',
      timeline: '2-8 months',
      icon: ToolsIcon,
      color: 'from-blue-500 to-blue-600',
    },
    {
      category: 'residential',
      title: 'Accessibility Modifications',
      description:
        'Specialized modifications for veterans and seniors to improve home accessibility.',
      features: [
        'Ramp installation',
        'Bathroom safety',
        'Door widening',
        'Grab bar installation',
      ],
      priceRange: '$5,000 - $50,000',
      timeline: '2-6 weeks',
      icon: UserIcon,
      color: 'from-blue-500 to-blue-600',
    },

    // Commercial Services
    {
      category: 'commercial',
      title: 'Office Build-Outs',
      description:
        'Professional office spaces designed for productivity and growth.',
      features: [
        'Space planning',
        'HVAC systems',
        'Electrical upgrades',
        'Modern finishes',
      ],
      priceRange: '$75,000 - $500,000',
      timeline: '3-6 months',
      icon: CogIcon,
      color: 'from-green-500 to-green-600',
    },
    {
      category: 'commercial',
      title: 'Retail Spaces',
      description:
        'Attract customers with professionally designed and built retail environments.',
      features: [
        'Storefront design',
        'Interior layout',
        'Security systems',
        'ADA compliance',
      ],
      priceRange: '$50,000 - $300,000',
      timeline: '2-4 months',
      icon: StarIcon,
      color: 'from-green-500 to-green-600',
    },
    {
      category: 'commercial',
      title: 'Restaurant Construction',
      description:
        'Full-service restaurant construction including kitchen and dining areas.',
      features: [
        'Commercial kitchen',
        'Dining layout',
        'Ventilation systems',
        'Health code compliance',
      ],
      priceRange: '$100,000 - $800,000',
      timeline: '4-8 months',
      icon: BoltIcon,
      color: 'from-green-500 to-green-600',
    },

    // Industrial Services
    {
      category: 'industrial',
      title: 'Warehouse Construction',
      description:
        'Durable warehouse facilities built to withstand heavy industrial use.',
      features: [
        'Steel frame construction',
        'Loading dock design',
        'Security systems',
        'Fire suppression',
      ],
      priceRange: '$200,000 - $2,000,000',
      timeline: '6-12 months',
      icon: HammerIcon,
      color: 'from-gray-500 to-gray-600',
    },
    {
      category: 'industrial',
      title: 'Manufacturing Facilities',
      description:
        'Purpose-built facilities designed for specific manufacturing processes.',
      features: [
        'Process optimization',
        'Heavy-duty electrical',
        'Specialized HVAC',
        'Safety systems',
      ],
      priceRange: '$500,000 - $5,000,000',
      timeline: '8-18 months',
      icon: CogIcon,
      color: 'from-gray-500 to-gray-600',
    },

    // Specialty Services
    {
      category: 'specialty',
      title: 'Veteran Housing Projects',
      description:
        'Specialized housing solutions for veterans, including transitional and permanent housing.',
      features: [
        'VA compliance',
        'Universal design',
        'Energy efficiency',
        'Community spaces',
      ],
      priceRange: '$150,000 - $400,000',
      timeline: '4-12 months',
      icon: ShieldIcon,
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      category: 'specialty',
      title: 'Emergency Repairs',
      description:
        '24/7 emergency construction services for urgent repairs and damage mitigation.',
      features: [
        'Rapid response',
        'Insurance coordination',
        'Temporary stabilization',
        'Full restoration',
      ],
      priceRange: '$1,000 - $100,000',
      timeline: '1 day - 3 months',
      icon: BoltIcon,
      color: 'from-red-500 to-red-600',
    },
  ]

  const processSteps = [
    {
      step: '01',
      title: 'Initial Consultation',
      description:
        'Free consultation to understand your vision, needs, and budget.',
      icon: UserIcon,
    },
    {
      step: '02',
      title: 'Design & Planning',
      description:
        'Detailed planning phase with 3D renderings and comprehensive project timeline.',
      icon: CogIcon,
    },
    {
      step: '03',
      title: 'Permits & Approvals',
      description:
        'We handle all permits, inspections, and regulatory requirements.',
      icon: CheckIcon,
    },
    {
      step: '04',
      title: 'Construction',
      description:
        'Professional construction with regular updates and quality checkpoints.',
      icon: HammerIcon,
    },
    {
      step: '05',
      title: 'Final Inspection',
      description:
        'Thorough quality inspection and walk-through before project completion.',
      icon: StarIcon,
    },
    {
      step: '06',
      title: 'Project Handover',
      description:
        'Complete handover with warranties, documentation, and ongoing support.',
      icon: ShieldIcon,
    },
  ]

  const filteredServices =
    selectedCategory === 'all'
      ? services
      : services.filter(service => service.category === selectedCategory)

  return (
    <>
      {/* SEO Structured Data */}
      <StructuredData data={generateOrganizationStructuredData()} />

      {/* Hero Section */}
      <section className="relative bg-white dark:bg-gray-900 h-screen hero-section">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 dark:from-brand-primary/10 to-transparent"></div>
        <div className="top-20 right-20 absolute bg-brand-secondary/5 blur-3xl rounded-full w-32 h-32"></div>
        <div className="bottom-20 left-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-40 h-40"></div>

        <div className="z-10 relative flex justify-center items-center mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-8 max-w-7xl h-full">
          <FadeInWhenVisible className="w-full text-center">
            {/* Hero Badge */}
            <div className="inline-flex items-center bg-brand-primary/10 dark:bg-brand-primary/20 shadow-lg backdrop-blur-sm mb-8 px-6 py-3 border border-brand-primary/20 dark:border-brand-primary/30 rounded-full">
              <HammerIcon
                size="sm"
                color="currentColor"
                className="text-brand-primary dark:text-brand-primary-light"
              />
              <span className="ml-3 font-bold text-brand-primary dark:text-brand-primary-light text-xs uppercase tracking-wider">
                Construction Services
              </span>
            </div>

            {/* Hero Title */}
            <h1 className="mb-6 pb-2 font-black text-gray-900 dark:text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-relaxed tracking-tighter hero-title">
              <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight">
                Comprehensive Construction
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary drop-shadow-sm font-black text-transparent">
                Services & Solutions
              </span>
            </h1>

            {/* Hero Description */}
            <p className="mx-auto mb-8 max-w-4xl font-light text-gray-600 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide">
              From{' '}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                custom homes to commercial projects
              </span>
              , we deliver exceptional results with{' '}
              <span className="bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-primary font-semibold text-transparent">
                military precision and cutting-edge technology
              </span>
              .
            </p>

            {/* CTA Buttons */}
            <div className="flex sm:flex-row flex-col justify-center items-center gap-8 mb-8">
              <Link href="/estimator">
                <HoverScale>
                  <Button variant="primary" size="xl" className="shadow-xl">
                    <BoltIcon size="sm" color="currentColor" className="mr-3" />
                    <span className="z-10 relative tracking-wide">
                      Get AI Estimate
                    </span>
                  </Button>
                </HoverScale>
              </Link>
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
                'Licensed & Insured',
                'Veteran-Owned Excellence',
                '500+ Projects Completed',
                '±15% Estimate Accuracy',
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

      {/* Service Categories Section */}
      <section className="relative bg-white dark:bg-gray-900 py-20 lg:py-32 xl:py-40 categories-section">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 dark:from-gray-800/30 to-transparent"></div>
        <div className="top-20 right-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-32 h-32"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-24 lg:mb-32 text-center">
            <div className="inline-flex items-center bg-brand-secondary/10 dark:bg-brand-secondary/20 shadow-lg mb-10 px-8 py-4 border border-brand-secondary/20 rounded-full">
              <CogIcon size="md" color="var(--brand-secondary)" />
              <span className="ml-4 font-black text-brand-secondary text-sm uppercase tracking-wider">
                Service Categories
              </span>
            </div>

            <h2 className="mb-10 font-black text-gray-900 dark:text-gray-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
              <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                Full-Spectrum
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-brand-secondary via-brand-primary to-brand-secondary drop-shadow-sm font-black text-transparent">
                Construction Solutions
              </span>
            </h2>
          </FadeInWhenVisible>

          {/* Category Filter Buttons */}
          <FadeInWhenVisible className="flex flex-wrap justify-center gap-4 mb-16">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-brand-primary text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              All Services
            </button>
            {serviceCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-brand-primary text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </FadeInWhenVisible>

          {/* Category Overview Cards */}
          <StaggeredFadeIn className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-20">
            {serviceCategories.map((category, index) => (
              <HoverScale key={index}>
                <Card className="group hover:shadow-2xl border-gray-200/30 hover:border-brand-primary/30 h-full transition-all duration-500">
                  <CardContent className="p-8 text-center">
                    <div className="flex justify-center mb-6">
                      <div
                        className={`p-6 bg-gradient-to-br ${category.color} rounded-2xl shadow-lg transition-transform duration-300 text-4xl`}
                      >
                        {category.icon}
                      </div>
                    </div>
                    <h3 className="mb-4 font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand-primary text-2xl transition-colors">
                      {category.name}
                    </h3>
                    <p className="font-light text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              </HoverScale>
            ))}
          </StaggeredFadeIn>
        </div>
      </section>

      {/* Detailed Services Section */}
      <section className="relative bg-gradient-to-b from-gray-50 dark:from-gray-800 to-white dark:to-gray-900 py-20 lg:py-32 xl:py-40 services-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(56,104,81,0.05)_0%,transparent_50%)] opacity-60"></div>
        <div className="right-20 bottom-20 absolute bg-brand-secondary/5 blur-3xl rounded-full w-40 h-40"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-24 lg:mb-32 text-center">
            <div className="inline-flex items-center bg-brand-primary/10 dark:bg-brand-primary/20 shadow-lg mb-10 px-8 py-4 border border-brand-primary/20 rounded-full">
              <HammerIcon size="md" color="var(--brand-primary)" />
              <span className="ml-4 font-black text-brand-primary text-sm uppercase tracking-wider">
                Service Details
              </span>
            </div>

            <h2 className="mb-10 font-black text-gray-900 dark:text-gray-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
              <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                Professional Services
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary drop-shadow-sm font-black text-transparent">
                With Transparent Pricing
              </span>
            </h2>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-8 grid grid-cols-1 lg:grid-cols-2">
            {filteredServices.map((service, index) => (
              <HoverScale key={index}>
                <Card className="group hover:shadow-2xl border-gray-200/30 hover:border-brand-primary/30 h-full transition-all duration-500">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-4 bg-gradient-to-br ${service.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          <service.icon
                            size="lg"
                            color="white"
                            className="text-white"
                          />
                        </div>
                        <div>
                          <CardTitle className="group-hover:text-brand-primary text-2xl transition-colors">
                            {service.title}
                          </CardTitle>
                          <div className="space-y-1 mt-2">
                            <p className="font-semibold text-brand-primary text-lg">
                              {service.priceRange}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              Timeline: {service.timeline}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                      {service.description}
                    </p>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
                        Key Features:
                      </h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <CheckIcon
                              size="sm"
                              color="currentColor"
                              className="flex-shrink-0 mr-3 text-green-600 dark:text-green-400"
                            />
                            <span className="text-gray-700 dark:text-gray-300">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6 pt-6 border-gray-200 dark:border-gray-700 border-t">
                      <Link href="/estimator">
                        <Button
                          variant="outline"
                          className="group-hover:border-brand-primary w-full group-hover:text-brand-primary transition-colors"
                        >
                          Get Estimate for This Service
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </HoverScale>
            ))}
          </StaggeredFadeIn>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative bg-white dark:bg-gray-900 py-20 lg:py-32 xl:py-40 process-section">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50/50 dark:from-gray-800/30 to-transparent"></div>
        <div className="top-20 left-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-32 h-32"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-24 lg:mb-32 text-center">
            <div className="inline-flex items-center bg-veteran-blue/10 dark:bg-veteran-blue/20 shadow-lg mb-10 px-8 py-4 border border-veteran-blue/20 rounded-full">
              <CogIcon size="md" color="var(--veteran-blue)" />
              <span className="ml-4 font-black text-veteran-blue text-sm uppercase tracking-wider">
                Our Process
              </span>
            </div>

            <h2 className="mb-10 font-black text-gray-900 dark:text-gray-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
              <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                Military Precision
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-veteran-blue via-brand-primary to-veteran-blue drop-shadow-sm font-black text-transparent">
                Project Execution
              </span>
            </h2>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, index) => (
              <HoverScale key={index}>
                <Card className="group hover:shadow-2xl border-gray-200/30 hover:border-veteran-blue/30 h-full transition-all duration-500">
                  <CardContent className="p-8 text-center">
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <div className="flex justify-center items-center bg-gradient-to-br from-veteran-blue to-brand-primary shadow-lg rounded-2xl w-20 h-20 group-hover:scale-110 transition-transform duration-300">
                          <step.icon
                            size="lg"
                            color="white"
                            className="text-white"
                          />
                        </div>
                        <div className="top-0 right-0 absolute flex justify-center items-center bg-white shadow-lg rounded-full w-8 h-8 font-bold text-veteran-blue text-sm -translate-y-2 translate-x-2 transform">
                          {step.step}
                        </div>
                      </div>
                    </div>
                    <h3 className="mb-4 font-bold text-gray-900 dark:text-gray-100 group-hover:text-veteran-blue text-2xl transition-colors">
                      {step.title}
                    </h3>
                    <p className="font-light text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </HoverScale>
            ))}
          </StaggeredFadeIn>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative bg-gradient-to-r from-brand-primary to-brand-secondary py-20 lg:py-32 cta-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="text-center">
            <h2 className="mb-8 font-black text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
              <span className="block mb-4 font-semibold text-gray-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                Ready to Start
              </span>
              <span className="block drop-shadow-lg">Your Next Project?</span>
            </h2>

            <p className="mx-auto mb-12 max-w-4xl font-light text-gray-100 text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide">
              Get started with a free consultation and AI-powered estimate.
              Experience the difference military precision makes.
            </p>

            <div className="flex sm:flex-row flex-col justify-center items-center gap-8">
              <Link href="/estimator">
                <HoverScale>
                  <Button
                    variant="secondary"
                    size="xl"
                    className="bg-white hover:bg-gray-100 shadow-xl text-brand-primary"
                  >
                    <BoltIcon size="sm" color="currentColor" className="mr-3" />
                    <span className="z-10 relative tracking-wide">
                      Get AI Estimate
                    </span>
                  </Button>
                </HoverScale>
              </Link>
              <Link href="/booking">
                <HoverScale>
                  <Button
                    variant="outline"
                    size="xl"
                    className="hover:bg-white/10 shadow-xl border-white text-white"
                  >
                    <UserIcon size="sm" color="currentColor" className="mr-3" />
                    <span className="z-10 relative tracking-wide">
                      Schedule Consultation
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
