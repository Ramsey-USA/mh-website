'use client'

import React from 'react'
import Link from 'next/link'
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../components/ui'
import { PortfolioImage } from '../components/portfolio/ProjectImage'
import { PortfolioService } from '../lib/services/portfolioService'
import {
  generateSEOMetadata,
  generateOrganizationStructuredData,
  StructuredData,
} from '../components/seo/seo-meta'
import TestimonialsWidget from '../components/TestimonialsWidget'
import Head from 'next/head'
import {
  BoltIcon,
  CalendarIcon,
  UserIcon,
  ShieldIcon,
  CogIcon,
  StarIcon,
  HammerIcon,
  CheckIcon,
  ToolsIcon,
  HomeIcon,
  ArrowRightIcon,
} from '../components/icons/SharpDuotoneIcons'
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
  HoverScale,
} from '../components/animations/FramerMotionComponents'
import { useAnalytics } from '../components/analytics/enhanced-analytics'
import { OptimizedImage } from '../components/ui/OptimizedImage'
import {
  useIntersectionObserver,
  useImagePreloader,
} from '../hooks/usePerformanceOptimization'

export default function Home() {
  // Initialize analytics
  const { trackEvent } = useAnalytics()

  // Preload critical images for better performance
  const criticalImages = [
    '/images/placeholder.jpg',
    '/images/placeholder-project.jpg',
    '/images/projects/project-default.png',
    '/images/logo/mh-logo.png',
  ]

  const preloadedImages = useImagePreloader(criticalImages)

  // Track page view
  React.useEffect(() => {
    trackEvent('page_view', {
      page_name: 'homepage',
      page_location: '/',
      content_group1: 'marketing',
    })
  }, [trackEvent])

  // Track scroll depth for engagement analytics
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
          100
      )

      if (scrollPercent >= 25 && !sessionStorage.getItem('scroll_25')) {
        sessionStorage.setItem('scroll_25', 'true')
        trackEvent('scroll_depth', { percent: 25, page: 'homepage' })
      }
      if (scrollPercent >= 50 && !sessionStorage.getItem('scroll_50')) {
        sessionStorage.setItem('scroll_50', 'true')
        trackEvent('scroll_depth', { percent: 50, page: 'homepage' })
      }
      if (scrollPercent >= 75 && !sessionStorage.getItem('scroll_75')) {
        sessionStorage.setItem('scroll_75', 'true')
        trackEvent('scroll_depth', { percent: 75, page: 'homepage' })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [trackEvent])

  return (
    <>
      <Head>
        <title>
          MH Construction - Building Tomorrow with Today's Technology
        </title>
        <meta
          name="description"
          content="MH Construction delivers exceptional residential, commercial, and industrial construction services throughout the Pacific Northwest. Get your free AI-powered estimate today."
        />
        <meta
          name="keywords"
          content="construction services, home builder, commercial contractor, renovation experts, AI construction estimate, Pacific Northwest construction"
        />
        <meta
          property="og:title"
          content="MH Construction - Building Tomorrow with Today's Technology"
        />
        <meta
          property="og:description"
          content="Veteran-owned construction excellence powered by cutting-edge AI technology."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://mhconstruction.com" />
      </Head>

      {/* Add structured data for SEO */}
      <StructuredData data={generateOrganizationStructuredData()} />

      {/* Enhanced Hero Section */}
      <section className="relative bg-white dark:bg-gray-900 h-screen hero-section">
        {/* Simple Background */}
        <div className="absolute inset-0"></div>

        <div className="z-10 relative flex justify-center items-center mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-8 max-w-7xl h-full">
          <FadeInWhenVisible className="w-full text-center">
            {/* Veteran Badge */}
            <div className="inline-flex items-center bg-brand-primary/10 dark:bg-brand-primary/20 shadow-lg backdrop-blur-sm mb-8 px-6 py-3 border border-brand-primary/20 dark:border-brand-primary/30 rounded-full">
              <ShieldIcon
                size="sm"
                primaryColor="currentColor"
                secondaryColor="currentColor"
                className="text-brand-primary dark:text-brand-primary-light"
              />
              <span className="ml-3 font-bold text-brand-primary dark:text-brand-primary-light text-xs uppercase tracking-wider letterspacing-wide">
                Veteran-Owned Excellence
              </span>
            </div>

            <h1 className="mb-4 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter hero-title">
              <span className="block mb-2 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                Building Tomorrow with
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary drop-shadow-sm font-black text-transparent">
                Today's Technology
              </span>
            </h1>

            <p className="mx-auto mb-6 max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl leading-relaxed tracking-wide">
              Veteran-owned construction excellence powered by{' '}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                cutting-edge AI technology
              </span>
              . Serving the Pacific Northwest with{' '}
              <span className="bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-primary font-semibold text-transparent">
                military precision
              </span>
              .
            </p>

            <div className="flex sm:flex-row flex-col justify-center items-center gap-6 mb-6">
              <Link href="/booking">
                <HoverScale>
                  <Button
                    variant="primary"
                    size="xl"
                    className="shadow-xl"
                    onClick={() =>
                      trackEvent('cta_click', {
                        button_name: 'schedule_consultation',
                        location: 'hero_section',
                        page: 'homepage',
                      })
                    }
                  >
                    <CalendarIcon
                      size="sm"
                      primaryColor="currentColor"
                      className="mr-3"
                    />
                    <span className="z-10 relative tracking-wide">
                      Schedule Free Consultation
                    </span>
                  </Button>
                </HoverScale>
              </Link>
              <Link href="/estimator">
                <HoverScale>
                  <Button
                    variant="outline"
                    size="xl"
                    className="shadow-xl"
                    onClick={() =>
                      trackEvent('cta_click', {
                        button_name: 'get_ai_estimate',
                        location: 'hero_section',
                        page: 'homepage',
                      })
                    }
                  >
                    <BoltIcon
                      size="sm"
                      primaryColor="currentColor"
                      className="mr-3"
                    />
                    <span className="z-10 relative tracking-wide">
                      Get AI Estimate
                    </span>
                  </Button>
                </HoverScale>
              </Link>
            </div>

            {/* Trust Indicators */}
            <StaggeredFadeIn className="flex flex-wrap justify-center items-center gap-10 font-medium text-gray-700 dark:text-gray-300 text-base">
              {[
                'Free Consultation',
                '±15% Estimate Accuracy',
                '24/7 Emergency Support',
                'Licensed & Insured',
              ].map((indicator, index) => (
                <div
                  key={index}
                  className="flex items-center bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm px-4 py-2 border border-gray-200/20 dark:border-gray-700/30 rounded-full"
                >
                  <CheckIcon
                    size="sm"
                    primaryColor="currentColor"
                    className="mr-3 text-green-600 dark:text-green-400"
                  />
                  <span className="tracking-wide">{indicator}</span>
                </div>
              ))}
            </StaggeredFadeIn>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Enhanced MH Brand Stats Section */}
      <section className="relative bg-gradient-to-b from-gray-50 dark:from-gray-900 via-white dark:via-gray-800 to-brand-light/20 dark:to-gray-900 py-16 lg:py-20 overflow-hidden stats-section">
        {/* MH Brand Background Elements */}
        <div className="top-0 left-0 absolute w-full h-full">
          <div className="top-20 left-10 absolute bg-brand-primary/5 dark:bg-brand-primary/10 blur-3xl rounded-full w-32 h-32"></div>
          <div className="right-10 bottom-20 absolute bg-brand-secondary/5 dark:bg-brand-secondary/10 blur-3xl rounded-full w-40 h-40"></div>
        </div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Enhanced Header */}
          <div className="mb-16 text-center scroll-reveal">
            <div className="inline-flex items-center bg-brand-primary/10 dark:bg-brand-primary/20 shadow-lg backdrop-blur-sm mb-6 px-6 py-3 border border-brand-primary/30 dark:border-brand-primary/40 rounded-full">
              <StarIcon size="sm" primaryColor="var(--brand-primary)" />
              <span className="ml-3 font-bold text-brand-primary dark:text-brand-primary-light text-xs uppercase tracking-widest">
                Our Numbers
              </span>
            </div>
            <h2 className="mb-6 font-black text-3xl md:text-4xl lg:text-5xl tracking-tight">
              <span className="bg-clip-text bg-gradient-to-r from-brand-primary dark:from-brand-primary-light via-brand-secondary dark:via-brand-secondary-light to-brand-primary dark:to-brand-primary-light text-transparent">
                Excellence in Numbers
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              Military precision meets construction expertise
            </p>
          </div>

          {/* Enhanced MH Brand Stats Grid */}
          <div className="gap-6 grid grid-cols-2 lg:grid-cols-4">
            {[
              {
                number: '150+',
                label: 'Years Experience',
                icon: StarIcon,
                defaultGradient:
                  'from-brand-secondary via-brand-secondary-light to-brand-secondary-dark',
                hoverGradient:
                  'from-brand-secondary-light via-brand-secondary to-brand-secondary-dark',
                bgAccent: 'bg-brand-secondary/5 dark:bg-brand-secondary/10',
                borderAccent:
                  'border-brand-secondary/30 dark:border-brand-secondary-light/40',
              },
              {
                number: '500+',
                label: 'Projects Done',
                icon: HammerIcon,
                defaultGradient:
                  'from-brand-primary via-brand-primary-light to-brand-accent',
                hoverGradient:
                  'from-brand-primary-light via-brand-primary to-brand-accent-dark',
                bgAccent: 'bg-brand-primary/5 dark:bg-brand-primary/10',
                borderAccent:
                  'border-brand-primary/30 dark:border-brand-primary-light/40',
              },
              {
                number: '24/7',
                label: 'Support',
                icon: ShieldIcon,
                defaultGradient: 'from-veteran-red via-red-500 to-red-700',
                hoverGradient: 'from-red-400 via-veteran-red to-red-800',
                bgAccent: 'bg-veteran-red/5 dark:bg-veteran-red/10',
                borderAccent: 'border-veteran-red/30 dark:border-red-400/40',
              },
              {
                number: '100%',
                label: 'Veteran Owned',
                icon: CheckIcon,
                defaultGradient: 'from-veteran-blue via-blue-600 to-blue-800',
                hoverGradient: 'from-blue-500 via-veteran-blue to-blue-900',
                bgAccent: 'bg-veteran-blue/5 dark:bg-veteran-blue/10',
                borderAccent: 'border-veteran-blue/30 dark:border-blue-400/40',
              },
            ].map((stat, index) => (
              <div
                key={index}
                className={`group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-md hover:shadow-xl hover:shadow-brand-primary/20 dark:hover:shadow-brand-primary-light/20 p-6 border border-gray-200 dark:border-gray-700 hover:${stat.borderAccent} rounded-2xl text-center transition-all duration-500 scroll-reveal transform-gpu antialiased`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background Glow on Hover */}
                <div
                  className={`absolute inset-0 ${stat.bgAccent} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>

                <div className="z-10 relative">
                  {/* Icon with MH Brand Colors */}
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${stat.defaultGradient} group-hover:bg-gradient-to-br group-hover:${stat.hoverGradient} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:shadow-lg transition-all duration-500 group-hover:scale-110`}
                  >
                    <stat.icon size="md" primaryColor="white" />
                  </div>

                  {/* Number with Color Change Effect */}
                  <div
                    className={`bg-gradient-to-r ${stat.defaultGradient} group-hover:${stat.hoverGradient} bg-clip-text text-transparent mb-2 font-black text-2xl md:text-3xl lg:text-4xl tracking-tight leading-none transition-all duration-500`}
                  >
                    {stat.number}
                  </div>

                  {/* Label with Enhanced Contrast */}
                  <div className="font-semibold text-gray-700 dark:group-hover:text-gray-200 dark:text-gray-300 group-hover:text-gray-800 text-sm md:text-base leading-tight transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>

                {/* Corner Accent for Polish */}
                <div
                  className={`absolute top-3 right-3 w-2 h-2 ${stat.bgAccent} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Revolutionary Features Section */}
      <section className="relative bg-gradient-to-b from-gray-50 dark:from-gray-800 to-white dark:to-gray-900 py-16 lg:py-24 features-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(56,104,81,0.05)_0%,transparent_50%)] opacity-60"></div>
        <div className="top-20 right-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-32 h-32"></div>
        <div className="bottom-20 left-20 absolute bg-brand-secondary/5 blur-3xl rounded-full w-40 h-40"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-16 lg:mb-20 text-center">
            <div className="inline-flex items-center bg-brand-primary/10 dark:bg-brand-primary/20 shadow-lg mb-8 px-8 py-4 border border-brand-primary/20 rounded-full">
              <BoltIcon size="md" primaryColor="var(--brand-primary)" />
              <span className="ml-4 font-black text-brand-primary text-sm uppercase tracking-wider letterspacing-widest">
                Revolutionary Solutions
              </span>
            </div>

            <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
              <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                The Future of
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                Construction
              </span>
            </h2>
            <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
              Experience{' '}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                cutting-edge technology
              </span>{' '}
              combined with decades of expertise. Our AI-powered tools and
              veteran precision deliver results that{' '}
              <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary font-semibold text-transparent">
                exceed expectations
              </span>
              .
            </p>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: BoltIcon,
                title: 'AI Project Estimator',
                description:
                  'Revolutionary AI-powered cost calculator with ±15% precision guarantee for accurate project planning and budgeting.',
                details:
                  'Our proprietary AI analyzes thousands of projects, material costs, and labor factors to provide industry-leading estimate accuracy. Get instant quotes with confidence.',
                features: [
                  '±15% Accuracy Guarantee',
                  'Real-time Material Pricing',
                  'Labor Cost Analysis',
                  'PDF Export',
                ],
                color: 'from-brand-primary to-brand-primary-dark',
                bgColor: 'bg-brand-primary/5',
                delay: '0s',
              },
              {
                icon: CalendarIcon,
                title: 'Smart Scheduling',
                description:
                  'Visual calendar system with real-time availability and instant confirmations for seamless booking experience.',
                details:
                  'Intelligent scheduling considers team availability, project timelines, and weather patterns to optimize booking efficiency and reduce delays.',
                features: [
                  'Real-time Availability',
                  'Automated Confirmations',
                  'Weather Integration',
                  'Team Optimization',
                ],
                color: 'from-brand-secondary to-brand-secondary-dark',
                bgColor: 'bg-brand-secondary/5',
                delay: '0.1s',
              },
              {
                icon: HammerIcon,
                title: '3D Project Explorer',
                description:
                  'Immersive HD visualization with real-time builder insights to bring your vision to life before construction begins.',
                details:
                  'Walk through your project in photorealistic 3D, make changes in real-time, and see exactly how your finished project will look.',
                features: [
                  'Photorealistic Rendering',
                  'Virtual Walkthrough',
                  'Real-time Changes',
                  'Material Previews',
                ],
                color: 'from-brand-accent to-brand-accent-dark',
                bgColor: 'bg-brand-accent/5',
                delay: '0.2s',
              },
              {
                icon: UserIcon,
                title: '24/7 AI Assistant',
                description:
                  'Military-grade support with enhanced chatbot providing context-aware veteran assistance and instant responses.',
                details:
                  'Our AI assistant understands construction terminology, veteran benefits, and project specifics to provide personalized, accurate assistance.',
                features: [
                  'Veteran-Aware Support',
                  'Construction Expertise',
                  'Instant Responses',
                  'Project Context',
                ],
                color: 'from-brand-primary to-brand-secondary',
                bgColor:
                  'bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5',
                delay: '0.3s',
              },
            ].map((feature, index) => (
              <div key={index} className="group perspective-1000 feature-card">
                <div className="relative w-full h-[480px] group-hover:rotate-y-180 transition-transform duration-700 preserve-3d">
                  {/* Front of Card */}
                  <div className="absolute inset-0 bg-surface dark:bg-surface-dark shadow-lg hover:shadow-brand-primary/10 hover:shadow-xl p-8 border border-border dark:border-border-dark rounded-3xl overflow-hidden transition-all duration-300 backface-hidden">
                    {/* Gradient Background */}
                    <div
                      className={`absolute inset-0 ${feature.bgColor} rounded-3xl`}
                    ></div>

                    <div className="z-10 relative flex flex-col justify-between h-full">
                      <div>
                        {/* Icon Container */}
                        <div
                          className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                        >
                          <feature.icon
                            size="xl"
                            primaryColor="white"
                            secondaryColor="rgba(255,255,255,0.8)"
                          />
                        </div>

                        <h3 className="mb-4 font-black text-text-primary dark:text-text-primary-dark text-xl md:text-2xl leading-tight tracking-tight">
                          {feature.title}
                        </h3>

                        <p className="font-light text-text-secondary dark:text-text-secondary-dark text-sm md:text-base leading-relaxed">
                          {feature.description}
                        </p>
                      </div>

                      <div className="mt-4 font-semibold text-brand-primary dark:text-brand-primary-light text-xs uppercase tracking-wider">
                        Hover for details
                      </div>
                    </div>
                  </div>

                  {/* Back of Card */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 rounded-3xl backface-hidden rotate-y-180 overflow-hidden`}
                  >
                    <div className="flex flex-col justify-between h-full text-white text-center">
                      <div className="flex-shrink-0">
                        <feature.icon
                          size="md"
                          primaryColor="white"
                          secondaryColor="rgba(255,255,255,0.8)"
                          className="mx-auto mb-3"
                        />
                        <h3 className="mb-2 font-black text-xl">
                          {feature.title}
                        </h3>
                        <p className="mb-3 font-light text-white/90 text-base leading-snug">
                          {feature.details}
                        </p>
                      </div>

                      <div className="flex-shrink-0 bg-white/20 backdrop-blur-sm p-3 border border-white/10 rounded-xl">
                        <div className="mb-2 font-medium text-white/80 text-sm uppercase tracking-wider">
                          Key Features
                        </div>
                        <ul className="space-y-1 text-sm">
                          {feature.features.map((feat, idx) => (
                            <li
                              key={idx}
                              className="flex items-start text-left"
                            >
                              <CheckIcon
                                size="sm"
                                className="flex-shrink-0 mt-0.5 mr-2 text-white/80"
                              />
                              <span className="font-light leading-snug">
                                {feat}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </StaggeredFadeIn>

          {/* AI Feature CTAs */}
          <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-16">
            {[
              {
                title: 'Try AI Estimator',
                description: 'Get instant project estimates',
                href: '/estimator',
                variant: 'primary' as const,
                icon: BoltIcon,
              },
              {
                title: 'Book Meeting',
                description: 'Schedule your free consultation',
                href: '/booking',
                variant: 'outline' as const,
                icon: CalendarIcon,
              },
              {
                title: 'View Projects',
                description: 'Explore our 3D gallery',
                href: '/portfolio',
                variant: 'outline' as const,
                icon: HammerIcon,
              },
              {
                title: 'Chat with AI',
                description: 'Get instant support',
                href: '/contact',
                variant: 'outline' as const,
                icon: UserIcon,
              },
            ].map((cta, index) => (
              <div key={index} className="text-center">
                <Button
                  variant={cta.variant}
                  size="lg"
                  className="shadow-lg hover:shadow-xl mb-3 w-full h-12 transition-all duration-300"
                  onClick={() => (window.location.href = cta.href)}
                >
                  <cta.icon
                    size="sm"
                    primaryColor="currentColor"
                    className="mr-3"
                  />
                  <span className="font-semibold">{cta.title}</span>
                </Button>
                <p className="font-light text-text-secondary dark:text-text-secondary-dark text-sm">
                  {cta.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Military Values Section */}
      <section className="relative bg-white dark:bg-gray-900 py-16 lg:py-24 values-section">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,104,81,0.05)_0%,transparent_50%)]"></div>
        <div className="top-40 left-10 absolute bg-brand-secondary/10 blur-2xl rounded-full w-24 h-24"></div>
        <div className="right-10 bottom-20 absolute bg-brand-primary/10 blur-2xl rounded-full w-32 h-32"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-16 lg:mb-20 text-center scroll-reveal">
            <div className="inline-flex items-center bg-veteran-red/10 dark:bg-veteran-red/20 shadow-lg backdrop-blur-sm mb-8 px-8 py-4 border border-veteran-red/20 dark:border-veteran-red/30 rounded-full">
              <ShieldIcon size="md" primaryColor="var(--veteran-red)" />
              <span className="ml-4 font-black text-veteran-red dark:text-red-400 text-sm uppercase tracking-wider letterspacing-widest">
                Military Values
              </span>
            </div>

            <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
              <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                Built on
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                Unwavering Principles
              </span>
            </h2>
            <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
              Our foundation rests on{' '}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                military values
              </span>{' '}
              that guide every project, every decision, and every client
              relationship we build with{' '}
              <span className="bg-clip-text bg-gradient-to-r from-veteran-red to-brand-primary font-semibold text-transparent">
                honor and dedication
              </span>
              .
            </p>
          </div>

          <div className="gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                value: 'Integrity',
                icon: ShieldIcon,
                description:
                  'We conduct business with unwavering honesty and moral principles, ensuring every project reflects our commitment to doing what is right.',
                details:
                  "Our commitment to integrity means transparent pricing, honest timelines, and delivering exactly what we promise. Every decision is made with our clients' best interests at heart.",
                color: 'from-brand-primary to-brand-primary-dark',
                bgColor: 'bg-brand-primary/5',
                stats: '100% Transparent Pricing',
              },
              {
                value: 'Excellence',
                icon: StarIcon,
                description:
                  'We pursue perfection in every detail, delivering superior craftsmanship that exceeds expectations and stands the test of time.',
                details:
                  'Excellence drives our quality control processes, material selection, and attention to detail. We use only premium materials and employ master craftsmen.',
                color: 'from-brand-secondary to-brand-secondary-dark',
                bgColor: 'bg-brand-secondary/5',
                stats: '98% Client Satisfaction',
              },
              {
                value: 'Service',
                icon: ToolsIcon,
                description:
                  'We serve our clients and community with dedication, putting their needs first and treating every project as our mission.',
                details:
                  'Service means being available when you need us, responding quickly to concerns, and going above and beyond to ensure your complete satisfaction.',
                color: 'from-brand-accent to-brand-accent-dark',
                bgColor: 'bg-brand-accent/5',
                stats: '24/7 Emergency Support',
              },
              {
                value: 'Leadership',
                icon: CheckIcon,
                description:
                  'We lead by example in the construction industry, setting standards for innovation, safety, and professional excellence.',
                details:
                  'Leadership means pioneering new construction technologies, maintaining the highest safety standards, and mentoring the next generation of builders.',
                color: 'from-brand-primary to-brand-secondary',
                bgColor:
                  'bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5',
                stats: 'Zero Safety Incidents',
              },
              {
                value: 'Accountability',
                icon: CogIcon,
                description:
                  'We take full responsibility for our work and commitments, ensuring transparency and reliability in every interaction.',
                details:
                  'Accountability means owning our mistakes, learning from them, and always making things right. We stand behind our work with comprehensive warranties.',
                color: 'from-veteran-red to-brand-primary',
                bgColor:
                  'bg-gradient-to-br from-veteran-red/5 to-brand-primary/5',
                stats: '5-Year Warranty',
              },
              {
                value: 'Teamwork',
                icon: HammerIcon,
                description:
                  'We build success through collaboration, leveraging diverse skills and perspectives to achieve exceptional results together.',
                details:
                  'Teamwork brings together veterans, skilled craftsmen, and industry experts. Our collaborative approach ensures every project benefits from collective expertise.',
                color: 'from-brand-secondary to-brand-accent',
                bgColor:
                  'bg-gradient-to-br from-brand-secondary/5 to-brand-accent/5',
                stats: '15+ Team Members',
              },
            ].map((item, index) => {
              const IconComponent = item.icon
              return (
                <div
                  key={item.value}
                  className="group perspective-1000 scroll-reveal value-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative w-full h-[480px] group-hover:rotate-y-180 transition-transform duration-700 preserve-3d">
                    {/* Front of Card */}
                    <div className="absolute inset-0 bg-surface dark:bg-surface-dark shadow-lg hover:shadow-brand-primary/10 hover:shadow-xl p-8 border border-border dark:border-border-dark rounded-3xl overflow-hidden transition-all duration-300 backface-hidden">
                      {/* Gradient Overlay */}
                      <div
                        className={`absolute inset-0 ${item.bgColor} rounded-3xl`}
                      ></div>

                      <div className="z-10 relative flex flex-col justify-between h-full text-center">
                        <div>
                          <div
                            className={`w-24 h-24 bg-gradient-to-br ${item.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                          >
                            <IconComponent
                              size="2xl"
                              primaryColor="white"
                              secondaryColor="rgba(255,255,255,0.8)"
                            />
                          </div>

                          <h3 className="mb-4 font-black text-text-primary dark:text-text-primary-dark text-2xl md:text-3xl leading-tight tracking-tight">
                            {item.value}
                          </h3>

                          <p className="font-light text-text-secondary dark:text-text-secondary-dark text-sm md:text-base leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        <div className="mt-4 font-semibold text-brand-primary dark:text-brand-primary-light text-xs uppercase tracking-wider">
                          Hover to learn more
                        </div>
                      </div>
                    </div>

                    {/* Back of Card */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-brand-secondary shadow-xl hover:shadow-2xl p-6 rounded-3xl overflow-hidden rotate-y-180 transition-shadow duration-300 backface-hidden">
                      <div className="flex flex-col justify-between h-full text-white text-center">
                        <div className="flex-shrink-0">
                          <IconComponent
                            size="md"
                            primaryColor="white"
                            secondaryColor="rgba(255,255,255,0.8)"
                            className="mx-auto mb-3"
                          />
                          <h3 className="mb-2 font-black text-xl">
                            {item.value} in Action
                          </h3>
                          <p className="mb-3 font-light text-white/90 text-base leading-snug">
                            {item.details}
                          </p>
                        </div>

                        <div className="flex-shrink-0 bg-white/20 backdrop-blur-sm p-4 border border-white/10 rounded-xl">
                          <div className="mb-2 font-medium text-white/80 text-sm uppercase tracking-wider">
                            Key Metric
                          </div>
                          <div className="font-bold text-xl">{item.stats}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Showcase of Services Section */}
      <section className="relative bg-white dark:bg-gray-900 py-16 lg:py-24 showcase-section">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 dark:from-gray-800/50 to-white dark:to-gray-900"></div>
        <div className="top-20 right-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-32 h-32"></div>
        <div className="bottom-20 left-20 absolute bg-brand-secondary/5 blur-3xl rounded-full w-40 h-40"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-16 text-center">
            <div className="inline-flex items-center bg-brand-primary/10 shadow-lg mb-8 px-8 py-4 border border-brand-primary/20 rounded-full">
              <HammerIcon size="md" primaryColor="var(--brand-primary)" />
              <span className="ml-4 font-black text-brand-primary text-sm uppercase tracking-wider letterspacing-widest">
                Featured Excellence
              </span>
            </div>
            <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
              <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                Showcase of
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                Services
              </span>
            </h2>
            <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
              Discover our exceptional services and see why clients trust MH
              Construction with their most important projects. Each service
              represents our commitment to{' '}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                military precision
              </span>{' '}
              and{' '}
              <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary font-semibold text-transparent">
                veteran excellence
              </span>
              .
            </p>
          </FadeInWhenVisible>

          {/* Service Cards Grid - 6 Cards */}
          <FadeInWhenVisible className="gap-8 lg:gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Residential Construction */}
            <div className="group relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl p-8 border border-gray-200 dark:border-gray-700 rounded-3xl hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300"></div>
              <div className="relative">
                <div className="flex justify-center items-center bg-brand-primary/10 mb-6 rounded-2xl w-16 h-16">
                  <HomeIcon size="lg" primaryColor="var(--brand-primary)" />
                </div>
                <h3 className="mb-4 font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand-primary text-2xl transition-colors">
                  Residential Construction
                </h3>
                <p className="mb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                  Custom homes built with precision and care. From foundation to
                  finish, we deliver exceptional craftsmanship.
                </p>
                <div className="flex items-center font-semibold text-brand-primary group-hover:text-brand-secondary transition-colors">
                  <span className="mr-2">Learn More</span>
                  <ArrowRightIcon size="sm" primaryColor="currentColor" />
                </div>
              </div>
            </div>

            {/* Commercial Projects */}
            <div className="group relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl p-8 border border-gray-200 dark:border-gray-700 rounded-3xl hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300"></div>
              <div className="relative">
                <div className="flex justify-center items-center bg-brand-primary/10 mb-6 rounded-2xl w-16 h-16">
                  <HammerIcon size="lg" primaryColor="var(--brand-primary)" />
                </div>
                <h3 className="mb-4 font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand-primary text-2xl transition-colors">
                  Commercial Construction
                </h3>
                <p className="mb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                  Large-scale commercial construction solutions. Office
                  buildings, retail spaces, and industrial facilities.
                </p>
                <div className="flex items-center font-semibold text-brand-primary group-hover:text-brand-secondary transition-colors">
                  <span className="mr-2">Learn More</span>
                  <ArrowRightIcon size="sm" primaryColor="currentColor" />
                </div>
              </div>
            </div>

            {/* Kitchen Renovations */}
            <div className="group relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl p-8 border border-gray-200 dark:border-gray-700 rounded-3xl hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300"></div>
              <div className="relative">
                <div className="flex justify-center items-center bg-brand-primary/10 mb-6 rounded-2xl w-16 h-16">
                  <CogIcon size="lg" primaryColor="var(--brand-primary)" />
                </div>
                <h3 className="mb-4 font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand-primary text-2xl transition-colors">
                  Kitchen Renovations
                </h3>
                <p className="mb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                  Transform your kitchen with modern designs and smart
                  appliances. Complete kitchen transformations.
                </p>
                <div className="flex items-center font-semibold text-brand-primary group-hover:text-brand-secondary transition-colors">
                  <span className="mr-2">Learn More</span>
                  <ArrowRightIcon size="sm" primaryColor="currentColor" />
                </div>
              </div>
            </div>

            {/* Bathroom Remodeling */}
            <div className="group relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl p-8 border border-gray-200 dark:border-gray-700 rounded-3xl hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300"></div>
              <div className="relative">
                <div className="flex justify-center items-center bg-brand-primary/10 mb-6 rounded-2xl w-16 h-16">
                  <ShieldIcon size="lg" primaryColor="var(--brand-primary)" />
                </div>
                <h3 className="mb-4 font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand-primary text-2xl transition-colors">
                  Bathroom Remodeling
                </h3>
                <p className="mb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                  Luxury bathroom transformations with premium finishes.
                  Spa-like bathrooms that add value to your home.
                </p>
                <div className="flex items-center font-semibold text-brand-primary group-hover:text-brand-secondary transition-colors">
                  <span className="mr-2">Learn More</span>
                  <ArrowRightIcon size="sm" primaryColor="currentColor" />
                </div>
              </div>
            </div>

            {/* Roofing Services */}
            <div className="group relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl p-8 border border-gray-200 dark:border-gray-700 rounded-3xl hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300"></div>
              <div className="relative">
                <div className="flex justify-center items-center bg-brand-primary/10 mb-6 rounded-2xl w-16 h-16">
                  <BoltIcon size="lg" primaryColor="var(--brand-primary)" />
                </div>
                <h3 className="mb-4 font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand-primary text-2xl transition-colors">
                  Roofing Services
                </h3>
                <p className="mb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                  Professional roofing installation and repair. Protecting your
                  investment with durable, weather-resistant solutions.
                </p>
                <div className="flex items-center font-semibold text-brand-primary group-hover:text-brand-secondary transition-colors">
                  <span className="mr-2">Learn More</span>
                  <ArrowRightIcon size="sm" primaryColor="currentColor" />
                </div>
              </div>
            </div>

            {/* General Contracting */}
            <div className="group relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl p-8 border border-gray-200 dark:border-gray-700 rounded-3xl hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300"></div>
              <div className="relative">
                <div className="flex justify-center items-center bg-brand-primary/10 mb-6 rounded-2xl w-16 h-16">
                  <ToolsIcon size="lg" primaryColor="var(--brand-primary)" />
                </div>
                <h3 className="mb-4 font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand-primary text-2xl transition-colors">
                  General Contracting
                </h3>
                <p className="mb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                  Comprehensive project management and construction services.
                  From planning to completion with veteran precision.
                </p>
                <div className="flex items-center font-semibold text-brand-primary group-hover:text-brand-secondary transition-colors">
                  <span className="mr-2">Learn More</span>
                  <ArrowRightIcon size="sm" primaryColor="currentColor" />
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Enhanced Client Testimonials */}
      <section className="relative bg-gradient-to-b from-gray-50 dark:from-gray-800 to-white dark:to-gray-900 py-16 lg:py-24 testimonials-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(189,146,100,0.05)_0%,transparent_50%)] opacity-60"></div>
        <div className="top-20 left-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-40 h-40"></div>
        <div className="right-20 bottom-20 absolute bg-brand-secondary/5 blur-3xl rounded-full w-32 h-32"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-16 lg:mb-20 text-center scroll-reveal">
            <div className="inline-flex items-center bg-yellow-50 dark:bg-yellow-900/20 shadow-lg mb-8 px-8 py-4 border border-yellow-200/30 rounded-full">
              <StarIcon size="md" primaryColor="var(--brand-secondary)" />
              <span className="ml-4 font-black text-yellow-600 dark:text-yellow-400 text-sm uppercase tracking-wider letterspacing-widest">
                Client Success Stories
              </span>
            </div>

            <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
              <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                What Our
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                Clients Say
              </span>
            </h2>
            <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
              Read testimonials from{' '}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                satisfied customers
              </span>{' '}
              across the Pacific Northwest who have experienced our{' '}
              <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary font-semibold text-transparent">
                veteran excellence
              </span>{' '}
              firsthand.
            </p>
          </div>

          <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-20">
            {[
              {
                name: 'Sarah Thompson',
                location: 'Spokane, WA',
                project: 'Historic Home Renovation',
                rating: 5,
                review:
                  'MH Construction transformed our 1920s home with incredible attention to detail. Their military precision and professionalism made the entire process seamless. The AI estimate was spot-on, and they finished ahead of schedule!',
                image: '/images/testimonials/sarah-t.jpg',
              },
              {
                name: 'Mike Chen',
                location: 'Yakima, WA',
                project: 'Modern Kitchen Remodel',
                rating: 5,
                review:
                  "The AI cost estimator was revolutionary - accurate to the dollar! The quality of work exceeded our expectations. Their veteran-owned approach brings a level of discipline and excellence you won't find elsewhere.",
                image: '/images/testimonials/mike-c.jpg',
              },
              {
                name: 'Jessica Rodriguez',
                location: 'Spokane, WA',
                project: 'Luxury Bathroom Addition',
                rating: 5,
                review:
                  'As a fellow veteran, I appreciated their understanding of our needs. The team went above and beyond to deliver exceptional results. Their 24/7 support gave us peace of mind throughout the entire project.',
                image: '/images/testimonials/jessica-r.jpg',
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="group scroll-reveal testimonial-card"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative bg-white dark:bg-gray-800 shadow-lg group-hover:shadow-2xl p-8 rounded-3xl h-full antialiased transform-gpu transition-all duration-500">
                  {/* Quote Icon */}
                  <div className="top-6 right-6 absolute flex justify-center items-center bg-brand-secondary/10 rounded-full w-12 h-12 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-6 h-6 text-brand-secondary"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                    </svg>
                  </div>

                  <div className="flex items-start space-x-4 mb-6">
                    <div className="flex flex-shrink-0 justify-center items-center bg-gradient-to-br from-brand-primary to-brand-secondary shadow-lg rounded-2xl w-16 h-16 group-hover:scale-110 transition-transform duration-300">
                      <span className="font-bold text-white text-2xl">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 font-black text-gray-900 dark:text-gray-100 text-xl md:text-2xl tracking-tight">
                        {testimonial.name}
                      </h3>
                      <p className="mb-3 font-medium text-gray-600 dark:text-gray-400 text-sm md:text-base tracking-wide">
                        {testimonial.location} •{' '}
                        <span className="font-bold text-brand-primary">
                          {testimonial.project}
                        </span>
                      </p>
                      <div className="flex space-x-1">
                        {Array.from({ length: testimonial.rating }).map(
                          (_, i) => (
                            <StarIcon
                              key={i}
                              size="sm"
                              primaryColor="#fbbf24"
                              secondaryColor="rgba(251, 191, 36, 0.3)"
                            />
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  <blockquote className="font-light text-gray-700 dark:text-gray-300 text-lg md:text-xl italic leading-relaxed tracking-wide">
                    "{testimonial.review}"
                  </blockquote>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center scroll-reveal">
            <Link href="/testimonials">
              <Button variant="outline" size="xl" className="shadow-xl">
                <span className="z-10 relative">View All Testimonials</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose MH Construction Section */}
      <section className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-gray-900 py-16 lg:py-20 xl:py-24 text-white">
        <div className="z-10 relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Section Header */}
          <div className="mb-16 lg:mb-20 text-center scroll-reveal">
            <div className="inline-flex items-center bg-white/10 shadow-lg backdrop-blur-sm mb-6 px-6 py-3 border border-white/20 rounded-full">
              <ShieldIcon
                size="sm"
                primaryColor="currentColor"
                className="text-white"
              />
              <span className="ml-3 font-bold text-white text-xs uppercase tracking-wider">
                Why Choose Us
              </span>
            </div>

            <h2 className="mb-6 font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
              <span className="block mb-2 font-semibold text-white/80 text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                The MH Construction
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-white via-brand-secondary to-white text-transparent">
                Difference
              </span>
            </h2>

            <p className="mx-auto max-w-3xl font-light text-white/90 text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
              Experience the perfect fusion of military precision, cutting-edge
              technology, and unwavering commitment to excellence that sets us
              apart.
            </p>
          </div>

          {/* Core Differentiators - 4 Flip Cards */}
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {/* Veteran-Owned Excellence */}
            <div className="group h-80 perspective-1000">
              <div className="relative h-full group-hover:rotate-y-180 transition-transform duration-700 preserve-3d">
                {/* Front of Card */}
                <div className="absolute inset-0 backface-hidden">
                  <div className="flex flex-col justify-center items-center bg-white/10 backdrop-blur-sm p-6 border border-white/20 rounded-xl h-full text-center">
                    <div className="mb-4">
                      <ShieldIcon
                        size="lg"
                        primaryColor="currentColor"
                        className="mx-auto text-brand-secondary"
                      />
                    </div>
                    <h3 className="font-black text-white text-lg lg:text-xl tracking-tight">
                      Veteran-Owned Excellence
                    </h3>
                    <p className="mt-2 text-white/70 text-sm">
                      Hover to learn more
                    </p>
                  </div>
                </div>

                {/* Back of Card */}
                <div className="absolute inset-0 rotate-y-180 backface-hidden">
                  <div className="flex flex-col justify-center bg-brand-primary/90 backdrop-blur-sm p-6 border border-white/20 rounded-xl h-full text-center">
                    <div className="mb-4">
                      <ShieldIcon
                        size="md"
                        primaryColor="currentColor"
                        className="mx-auto text-brand-secondary"
                      />
                    </div>
                    <h3 className="mb-4 font-black text-white text-lg">
                      Military Precision
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed">
                      Military precision meets construction expertise. Our
                      veteran leadership brings discipline, integrity, and
                      attention to detail to every project with military-grade
                      precision.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI-Powered Technology */}
            <div className="group h-80 perspective-1000">
              <div className="relative h-full group-hover:rotate-y-180 transition-transform duration-700 preserve-3d">
                {/* Front of Card */}
                <div className="absolute inset-0 backface-hidden">
                  <div className="flex flex-col justify-center items-center bg-white/10 backdrop-blur-sm p-6 border border-white/20 rounded-xl h-full text-center">
                    <div className="mb-4">
                      <BoltIcon
                        size="lg"
                        primaryColor="currentColor"
                        className="mx-auto text-brand-secondary"
                      />
                    </div>
                    <h3 className="font-black text-white text-lg lg:text-xl tracking-tight">
                      AI-Powered Innovation
                    </h3>
                    <p className="mt-2 text-white/70 text-sm">
                      Hover to learn more
                    </p>
                  </div>
                </div>

                {/* Back of Card */}
                <div className="absolute inset-0 rotate-y-180 backface-hidden">
                  <div className="flex flex-col justify-center bg-brand-primary/90 backdrop-blur-sm p-6 border border-white/20 rounded-xl h-full text-center">
                    <div className="mb-4">
                      <BoltIcon
                        size="md"
                        primaryColor="currentColor"
                        className="mx-auto text-brand-secondary"
                      />
                    </div>
                    <h3 className="mb-4 font-black text-white text-lg">
                      Technology Advantage
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed">
                      Cutting-edge AI technology provides instant estimates,
                      project optimization, and seamless communication
                      throughout your construction journey with advanced
                      efficiency.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 150+ Years Combined Experience */}
            <div className="group h-80 perspective-1000">
              <div className="relative h-full group-hover:rotate-y-180 transition-transform duration-700 preserve-3d">
                {/* Front of Card */}
                <div className="absolute inset-0 backface-hidden">
                  <div className="flex flex-col justify-center items-center bg-white/10 backdrop-blur-sm p-6 border border-white/20 rounded-xl h-full text-center">
                    <div className="mb-4">
                      <div className="flex justify-center items-center bg-brand-secondary/20 mx-auto rounded-full w-16 h-16">
                        <span className="font-black text-brand-secondary text-xl">
                          150+
                        </span>
                      </div>
                    </div>
                    <h3 className="font-black text-white text-lg lg:text-xl tracking-tight">
                      Proven Expertise
                    </h3>
                    <p className="mt-2 text-white/70 text-sm">
                      Hover to learn more
                    </p>
                  </div>
                </div>

                {/* Back of Card */}
                <div className="absolute inset-0 rotate-y-180 backface-hidden">
                  <div className="flex flex-col justify-center bg-brand-primary/90 backdrop-blur-sm p-6 border border-white/20 rounded-xl h-full text-center">
                    <div className="mb-4">
                      <div className="flex justify-center items-center bg-brand-secondary/30 mx-auto rounded-full w-12 h-12">
                        <span className="font-black text-brand-secondary text-lg">
                          150+
                        </span>
                      </div>
                    </div>
                    <h3 className="mb-4 font-black text-white text-lg">
                      Decades of Excellence
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed">
                      Over 150 years of combined team experience delivering
                      exceptional results across residential, commercial, and
                      specialized construction projects with proven
                      craftsmanship.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Guarantee */}
            <div className="group h-80 perspective-1000">
              <div className="relative h-full group-hover:rotate-y-180 transition-transform duration-700 preserve-3d">
                {/* Front of Card */}
                <div className="absolute inset-0 backface-hidden">
                  <div className="flex flex-col justify-center items-center bg-white/10 backdrop-blur-sm p-6 border border-white/20 rounded-xl h-full text-center">
                    <div className="mb-4">
                      <div className="flex justify-center items-center bg-brand-secondary/20 mx-auto rounded-full w-16 h-16">
                        <svg
                          className="w-8 h-8 text-brand-secondary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                          />
                        </svg>
                      </div>
                    </div>
                    <h3 className="font-black text-white text-lg lg:text-xl tracking-tight">
                      Quality Guarantee
                    </h3>
                    <p className="mt-2 text-white/70 text-sm">
                      Hover to learn more
                    </p>
                  </div>
                </div>

                {/* Back of Card */}
                <div className="absolute inset-0 rotate-y-180 backface-hidden">
                  <div className="flex flex-col justify-center bg-brand-primary/90 backdrop-blur-sm p-6 border border-white/20 rounded-xl h-full text-center">
                    <div className="mb-4">
                      <div className="flex justify-center items-center bg-brand-secondary/30 mx-auto rounded-full w-12 h-12">
                        <svg
                          className="w-6 h-6 text-brand-secondary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                          />
                        </svg>
                      </div>
                    </div>
                    <h3 className="mb-4 font-black text-white text-lg">
                      Complete Satisfaction
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed">
                      We stand behind our work with comprehensive warranties and
                      a commitment to excellence that ensures your complete
                      satisfaction and peace of mind.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-brand-secondary/20 to-transparent"></div>
        </div>
      </section>

      {/* Enhanced Call to Action Section */}
      <section className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-secondary py-20 lg:py-32 cta-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <FadeInWhenVisible>
            <h2 className="mb-6 font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
              Ready to Start Your Project?
            </h2>
            <p className="mx-auto mb-8 max-w-4xl font-light text-white/90 text-xl md:text-2xl leading-relaxed">
              Join hundreds of satisfied clients who trust our{' '}
              <span className="font-medium text-brand-secondary">
                veteran construction team
              </span>{' '}
              with their most important projects.
            </p>

            {/* CTA Buttons */}
            <div className="flex sm:flex-row flex-col justify-center items-center gap-8 mb-12">
              <HoverScale>
                <Button variant="secondary" size="xl" className="shadow-xl">
                  <BoltIcon
                    size="md"
                    primaryColor="currentColor"
                    className="mr-3"
                  />
                  <span className="z-10 relative tracking-wide">
                    Get Free Estimate
                  </span>
                </Button>
              </HoverScale>
              <Link href="/contact">
                <HoverScale>
                  <Button
                    variant="outline"
                    size="xl"
                    className="bg-transparent hover:bg-white shadow-xl border-white text-white hover:text-brand-primary"
                  >
                    <CalendarIcon
                      size="md"
                      primaryColor="currentColor"
                      className="mr-3"
                    />
                    <span className="z-10 relative tracking-wide">
                      Schedule Consultation
                    </span>
                  </Button>
                </HoverScale>
              </Link>
            </div>

            {/* Trust Indicators */}
            <StaggeredFadeIn className="flex flex-wrap justify-center items-center gap-8 font-medium text-white/80 text-base">
              {[
                'Free Consultations',
                '< 2 Hour Response Time',
                'Veteran-Owned & Operated',
                '24/7 Emergency Service',
              ].map((indicator, index) => (
                <div
                  key={index}
                  className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 border border-white/20 rounded-full"
                >
                  <CheckIcon
                    size="sm"
                    primaryColor="currentColor"
                    className="mr-3 text-brand-secondary"
                  />
                  <span className="tracking-wide">{indicator}</span>
                </div>
              ))}
            </StaggeredFadeIn>
          </FadeInWhenVisible>
        </div>
      </section>
    </>
  )
}
