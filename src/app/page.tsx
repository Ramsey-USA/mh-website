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
import BlogNewsCarousel from '../components/blog/BlogNewsCarousel'
import Head from 'next/head'
import {
  WPZoomBoltIcon as BoltIcon,
  WPZoomCalendarIcon as CalendarIcon,
  WPZoomUserIcon as UserIcon,
  WPZoomShieldIcon as ShieldIcon,
  WPZoomCogIcon as CogIcon,
  WPZoomStarIcon as StarIcon,
  WPZoomHammerIcon as HammerIcon,
  WPZoomCheckIcon as CheckIcon,
  WPZoomToolsIcon as ToolsIcon,
  WPZoomHomeIcon as HomeIcon,
  WPZoomArrowRightIcon as ArrowRightIcon,
} from '../components/icons/WPZoomIcons'
// Import custom MH Construction icons with built-in hover effects
import {
  MHLogoIcon,
  MHHammerIcon,
  MHQualityShieldIcon,
  MHVeteranStarIcon,
  MHCheckIcon,
  MHBuildingIcon,
  MHArrowRightIcon,
} from '../components/icons/MHCustomIcons'
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
        <title>MH Construction - Your Partner in Building Tomorrow</title>
        <meta
          name="description"
          content="MH Construction - working with you to deliver exceptional construction services throughout the Pacific Northwest. Your veteran-owned construction partners since 1995."
        />
        <meta
          name="keywords"
          content="construction partnership, construction collaboration, home builder partner, commercial contractor, Pacific Northwest construction, veteran owned construction"
        />
        <meta
          property="og:title"
          content="MH Construction - Your Partner in Building Tomorrow"
        />
        <meta
          property="og:description"
          content="Veteran-owned construction excellence - Working with you to serve our communities."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://mhconstruction.com" />
      </Head>

      {/* Add structured data for SEO */}
      <StructuredData data={generateOrganizationStructuredData()} />

      {/* Enhanced Hero Section - Video Ready */}
      <section className="relative h-screen overflow-hidden hero-section">
        {/* Video Background Container */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-gray-900/80">
          {/* Future video element will go here */}
          {/* <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline>
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video> */}

          {/* Temporary background for now */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 via-gray-900 to-brand-secondary/20"></div>
        </div>

        {/* Content Overlay */}
        <div className="z-10 relative flex justify-center items-center mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl h-full text-white">
          <FadeInWhenVisible className="w-full text-center">
            {/* Simplified Hero Title */}
            <h1 className="mb-6 font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight">
              <span className="block mb-2 font-semibold text-white/90 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                Your Partner in
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white drop-shadow-lg">
                Building Tomorrow
              </span>
            </h1>

            {/* Simplified Tagline */}
            <p className="mx-auto mb-8 max-w-3xl text-white/90 text-xl sm:text-2xl md:text-3xl leading-relaxed">
              Veteran-owned construction excellence working with you to serve
              our communities.
            </p>

            {/* Simplified CTA */}
            <div className="flex sm:flex-row flex-col justify-center items-center gap-4">
              <Link href="/booking">
                <HoverScale>
                  <Button
                    variant="primary"
                    size="xl"
                    className="bg-white hover:bg-white/90 shadow-2xl border-0 text-brand-primary"
                    onClick={() =>
                      trackEvent('cta_click', {
                        button_name: 'get_started',
                        location: 'hero_section',
                        page: 'homepage',
                      })
                    }
                  >
                    <CalendarIcon
                      size="sm"
                      color="currentColor"
                      className="mr-3"
                    />
                    <span className="font-semibold">Get Started</span>
                  </Button>
                </HoverScale>
              </Link>
              <Link href="/estimator">
                <HoverScale>
                  <Button
                    variant="outline"
                    size="xl"
                    className="hover:bg-white shadow-2xl border-white text-white hover:text-brand-primary"
                    onClick={() =>
                      trackEvent('cta_click', {
                        button_name: 'free_estimate',
                        location: 'hero_section',
                        page: 'homepage',
                      })
                    }
                  >
                    <BoltIcon size="sm" color="currentColor" className="mr-3" />
                    <span className="font-semibold">Free Estimate</span>
                  </Button>
                </HoverScale>
              </Link>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Revolutionary Features Section */}
      <section className="relative bg-gradient-to-b from-gray-50 dark:from-gray-800 to-white dark:to-gray-900 py-12 lg:py-16 features-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(56,104,81,0.05)_0%,transparent_50%)] opacity-60"></div>
        <div className="top-20 right-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-32 h-32"></div>
        <div className="bottom-20 left-20 absolute bg-brand-secondary/5 blur-3xl rounded-full w-40 h-40"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-10 lg:mb-12 text-center">
            <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter">
              <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
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
                <div className="relative w-full h-[520px] group-hover:rotate-y-180 transition-transform duration-700 preserve-3d">
                  {/* Front of Card */}
                  <div className="absolute inset-0 bg-surface dark:bg-surface-dark shadow-lg hover:shadow-brand-primary/10 hover:shadow-xl p-8 border border-border dark:border-border-dark rounded-3xl overflow-hidden transition-all duration-300 backface-hidden">
                    {/* Gradient Background */}
                    <div
                      className={`absolute inset-0 ${feature.bgColor} rounded-3xl`}
                    ></div>

                    <div className="z-10 relative flex flex-col h-full">
                      <div className="flex-grow">
                        {/* Icon Container */}
                        <div
                          className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                        >
                          <feature.icon size="xl" color="white" />
                        </div>

                        <h3 className="mb-4 font-black text-text-primary dark:text-text-primary-dark text-2xl md:text-3xl leading-tight tracking-tight">
                          {feature.title}
                        </h3>

                        <p className="font-light text-text-secondary dark:text-text-secondary-dark text-base md:text-lg leading-relaxed">
                          {feature.description}
                        </p>
                      </div>

                      {/* Pin to bottom */}
                      <div className="mt-auto pt-6 font-semibold text-brand-primary dark:text-brand-primary-light text-xs uppercase tracking-wider">
                        Hover for details
                      </div>
                    </div>
                  </div>

                  {/* Back of Card */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} shadow-xl hover:shadow-2xl transition-shadow duration-300 p-8 rounded-3xl backface-hidden rotate-y-180 overflow-hidden`}
                  >
                    <div className="flex flex-col h-full text-white text-center">
                      <div className="flex flex-col flex-grow">
                        <feature.icon
                          size="md"
                          color="white"
                          className="mx-auto mb-3"
                        />
                        <h3 className="mb-3 font-black text-xl">
                          {feature.title}
                        </h3>
                        <p className="mb-4 font-light text-white/90 text-base leading-snug">
                          {feature.details}
                        </p>
                      </div>

                      <div className="bg-white/20 backdrop-blur-sm mt-auto p-3 border border-white/10 rounded-xl">
                        <div className="mb-2 font-medium text-white/80 text-xs uppercase tracking-wider">
                          Key Features
                        </div>
                        <ul className="space-y-1 text-xs">
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
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-12">
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
                  <cta.icon size="sm" color="currentColor" className="mr-3" />
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
      <section className="relative bg-white dark:bg-gray-900 py-12 lg:py-16 values-section">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,104,81,0.05)_0%,transparent_50%)]"></div>
        <div className="top-40 left-10 absolute bg-brand-secondary/10 blur-2xl rounded-full w-24 h-24"></div>
        <div className="right-10 bottom-20 absolute bg-brand-primary/10 blur-2xl rounded-full w-32 h-32"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-10 lg:mb-12 text-center scroll-reveal">
            <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter">
              <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
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
                            <IconComponent size="2xl" color="white" />
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
                            color="white"
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
      <section className="relative bg-white dark:bg-gray-900 py-12 lg:py-16 showcase-section">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 dark:from-gray-800/50 to-white dark:to-gray-900"></div>
        <div className="top-20 right-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-32 h-32"></div>
        <div className="bottom-20 left-20 absolute bg-brand-secondary/5 blur-3xl rounded-full w-40 h-40"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-16 text-center">
            <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter">
              <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
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
          <FadeInWhenVisible className="gap-6 lg:gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Residential Construction */}
            <div className="group relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl p-8 border border-gray-200 dark:border-gray-700 rounded-3xl hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300"></div>
              <div className="relative">
                <div className="flex justify-center items-center bg-brand-primary/10 mb-6 rounded-2xl w-16 h-16">
                  <HomeIcon size="lg" color="var(--brand-primary)" />
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
                  <ArrowRightIcon size="sm" color="currentColor" />
                </div>
              </div>
            </div>

            {/* Commercial Projects */}
            <div className="group relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl p-8 border border-gray-200 dark:border-gray-700 rounded-3xl hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300"></div>
              <div className="relative">
                <div className="flex justify-center items-center bg-brand-primary/10 mb-6 rounded-2xl w-16 h-16">
                  <HammerIcon size="lg" color="var(--brand-primary)" />
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
                  <ArrowRightIcon size="sm" color="currentColor" />
                </div>
              </div>
            </div>

            {/* Kitchen Renovations */}
            <div className="group relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl p-8 border border-gray-200 dark:border-gray-700 rounded-3xl hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300"></div>
              <div className="relative">
                <div className="flex justify-center items-center bg-brand-primary/10 mb-6 rounded-2xl w-16 h-16">
                  <CogIcon size="lg" color="var(--brand-primary)" />
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
                  <ArrowRightIcon size="sm" color="currentColor" />
                </div>
              </div>
            </div>

            {/* Bathroom Remodeling */}
            <div className="group relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl p-8 border border-gray-200 dark:border-gray-700 rounded-3xl hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300"></div>
              <div className="relative">
                <div className="flex justify-center items-center bg-brand-primary/10 mb-6 rounded-2xl w-16 h-16">
                  <ShieldIcon size="lg" color="var(--brand-primary)" />
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
                  <ArrowRightIcon size="sm" color="currentColor" />
                </div>
              </div>
            </div>

            {/* Roofing Services */}
            <div className="group relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl p-8 border border-gray-200 dark:border-gray-700 rounded-3xl hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300"></div>
              <div className="relative">
                <div className="flex justify-center items-center bg-brand-primary/10 mb-6 rounded-2xl w-16 h-16">
                  <BoltIcon size="lg" color="var(--brand-primary)" />
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
                  <ArrowRightIcon size="sm" color="currentColor" />
                </div>
              </div>
            </div>

            {/* General Contracting */}
            <div className="group relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl p-8 border border-gray-200 dark:border-gray-700 rounded-3xl hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300"></div>
              <div className="relative">
                <div className="flex justify-center items-center bg-brand-primary/10 mb-6 rounded-2xl w-16 h-16">
                  <ToolsIcon size="lg" color="var(--brand-primary)" />
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
                  <ArrowRightIcon size="sm" color="currentColor" />
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Enhanced Client Testimonials */}
      <section className="relative bg-gradient-to-b from-gray-50 dark:from-gray-800 to-white dark:to-gray-900 py-12 lg:py-16 testimonials-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(189,146,100,0.05)_0%,transparent_50%)] opacity-60"></div>
        <div className="top-20 left-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-40 h-40"></div>
        <div className="right-20 bottom-20 absolute bg-brand-secondary/5 blur-3xl rounded-full w-32 h-32"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-16 lg:mb-20 text-center scroll-reveal">
            <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter">
              <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
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

          <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12">
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
                            <StarIcon key={i} size="sm" color="#fbbf24" />
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

      {/* Why Partner With MH Construction Section */}
      <section className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-gray-900 py-16 lg:py-20 xl:py-24 text-white">
        <div className="z-10 relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Section Header */}
          <div className="mb-16 lg:mb-20 text-center scroll-reveal">
            <h2 className="mb-6 font-black text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter">
              <span className="block mb-2 font-semibold text-white/80 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
                The MH Partnership
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-white via-brand-secondary to-white text-transparent">
                Difference
              </span>
            </h2>

            <p className="mx-auto max-w-3xl font-light text-white/90 text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
              Experience the collaborative approach where veteran values,
              community focus, and genuine partnership create extraordinary
              results together.
            </p>

            {/* Core Philosophy Tagline */}
            <div className="mt-8 mb-4">
              <p className="mx-auto max-w-3xl font-bold text-white text-lg sm:text-xl md:text-2xl text-center leading-snug">
                "Building for the Owner,{' '}
                <span className="font-black text-veteran-red text-xl sm:text-2xl md:text-3xl">
                  NOT
                </span>{' '}
                the Dollar"
              </p>
            </div>
          </div>

          {/* Core Partnership Values - 4 Flip Cards with Custom MH Icons */}
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {/* Partnership Approach */}
            <div className="group h-80 perspective-1000">
              <div className="relative h-full group-hover:rotate-y-180 transition-transform duration-700 preserve-3d">
                {/* Front of Card */}
                <div className="absolute inset-0 backface-hidden">
                  <div className="flex flex-col justify-center items-center bg-white/10 backdrop-blur-sm p-6 border border-white/20 rounded-xl h-full text-center">
                    <div className="mb-4">
                      <MHVeteranStarIcon
                        size="xl"
                        hoverEffect="glow"
                        color="#dc2626"
                        className="drop-shadow-lg mx-auto"
                      />
                    </div>
                    <h3 className="font-black text-white text-lg lg:text-xl tracking-tight">
                      We Work With You
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
                      <MHVeteranStarIcon
                        size="lg"
                        hoverEffect="pulse"
                        color="#dc2626"
                        className="mx-auto"
                      />
                    </div>
                    <h3 className="mb-4 font-black text-white text-lg">
                      True Collaboration
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed">
                      More than contractors - we're your construction partners.
                      Your vision combined with our veteran-led expertise
                      creates extraordinary results through genuine
                      collaboration.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Community Focus */}
            <div className="group h-80 perspective-1000">
              <div className="relative h-full group-hover:rotate-y-180 transition-transform duration-700 preserve-3d">
                {/* Front of Card */}
                <div className="absolute inset-0 backface-hidden">
                  <div className="flex flex-col justify-center items-center bg-white/10 backdrop-blur-sm p-6 border border-white/20 rounded-xl h-full text-center">
                    <div className="mb-4">
                      <MHBuildingIcon
                        size="xl"
                        hoverEffect="scale"
                        color="currentColor"
                        className="mx-auto text-brand-secondary hover:rotate-12 hover:scale-110 transition-all duration-300"
                      />
                    </div>
                    <h3 className="font-black text-white text-lg lg:text-xl tracking-tight">
                      Community Centered
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
                      <MHBuildingIcon
                        size="lg"
                        hoverEffect="pulse"
                        color="currentColor"
                        className="mx-auto text-brand-secondary hover:rotate-6 hover:scale-110 transition-all duration-300"
                      />
                    </div>
                    <h3 className="mb-4 font-black text-white text-lg">
                      Pacific Northwest Roots
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed">
                      Every project strengthens our shared community. Local
                      hiring, regional suppliers, and neighborhood focus - your
                      construction partnership contributes to Pacific Northwest
                      prosperity.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Transparent Partnership */}
            <div className="group h-80 perspective-1000">
              <div className="relative h-full group-hover:rotate-y-180 transition-transform duration-700 preserve-3d">
                {/* Front of Card */}
                <div className="absolute inset-0 backface-hidden">
                  <div className="flex flex-col justify-center items-center bg-white/10 backdrop-blur-sm p-6 border border-white/20 rounded-xl h-full text-center">
                    <div className="mb-4">
                      <MHHammerIcon
                        size="xl"
                        hoverEffect="rotate"
                        color="currentColor"
                        className="drop-shadow-lg mx-auto text-brand-secondary"
                      />
                    </div>
                    <h3 className="font-black text-white text-lg lg:text-xl tracking-tight">
                      Honest & Transparent
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
                      <MHHammerIcon
                        size="lg"
                        hoverEffect="pulse"
                        color="currentColor"
                        className="mx-auto text-brand-secondary"
                      />
                    </div>
                    <h3 className="mb-4 font-black text-white text-lg">
                      No Surprises Partnership
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed">
                      Open pricing, honest timelines, and constant
                      communication. Veteran integrity means no hidden costs, no
                      sales pressure - just authentic conversation about your
                      goals and dreams.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lasting Relationships */}
            <div className="group h-80 perspective-1000">
              <div className="relative h-full group-hover:rotate-y-180 transition-transform duration-700 preserve-3d">
                {/* Front of Card */}
                <div className="absolute inset-0 backface-hidden">
                  <div className="flex flex-col justify-center items-center bg-white/10 backdrop-blur-sm p-6 border border-white/20 rounded-xl h-full text-center">
                    <div className="mb-4">
                      <MHQualityShieldIcon
                        size="xl"
                        hoverEffect="glow"
                        color="currentColor"
                        className="drop-shadow-lg mx-auto text-brand-secondary"
                      />
                    </div>
                    <h3 className="font-black text-white text-lg lg:text-xl tracking-tight">
                      Lifelong Partners
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
                      <MHQualityShieldIcon
                        size="lg"
                        hoverEffect="pulse"
                        color="currentColor"
                        className="mx-auto text-brand-secondary"
                      />
                    </div>
                    <h3 className="mb-4 font-black text-white text-lg">
                      Beyond Project Completion
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed">
                      Our partnership doesn't end when construction finishes.
                      Many clients become lifelong friends and community
                      connections. Together, we build relationships that last
                      generations.
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

      {/* Latest Blog & News Section */}
      <section className="relative bg-gradient-to-b from-gray-50 dark:from-gray-800 to-white dark:to-gray-900 py-12 lg:py-16 blog-news-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(56,104,81,0.05)_0%,transparent_50%)] opacity-60"></div>
        <div className="top-20 right-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-32 h-32"></div>
        <div className="bottom-20 left-20 absolute bg-brand-secondary/5 blur-3xl rounded-full w-40 h-40"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-16 text-center">
            <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter">
              <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
                Latest News &
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                Construction Insights
              </span>
            </h2>
            <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
              Stay informed with{' '}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                construction industry insights
              </span>{' '}
              and the latest news from our veteran-owned team in the{' '}
              <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary font-semibold text-transparent">
                Pacific Northwest
              </span>
              .
            </p>
          </FadeInWhenVisible>

          {/* Blog/News Carousel */}
          <FadeInWhenVisible>
            <BlogNewsCarousel />
          </FadeInWhenVisible>

          {/* View All Links */}
          <div className="flex sm:flex-row flex-col justify-center items-center gap-6 mt-12 text-center">
            <Link href="/blog">
              <Button variant="outline" size="lg" className="shadow-lg">
                <span className="mr-2">View All Blog Posts</span>
                <ArrowRightIcon size="sm" color="currentColor" />
              </Button>
            </Link>
            <Link href="/news">
              <Button variant="outline" size="lg" className="shadow-lg">
                <span className="mr-2">View All News</span>
                <ArrowRightIcon size="sm" color="currentColor" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Partnership Call to Action Section */}
      <section className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-secondary py-16 lg:py-24 cta-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <FadeInWhenVisible>
            <h2 className="mb-6 font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
              Ready to Begin Our Partnership?
            </h2>
            <p className="mx-auto mb-12 max-w-4xl font-light text-white/90 text-xl md:text-2xl leading-relaxed">
              Join hundreds of Pacific Northwest neighbors who chose{' '}
              <span className="font-medium text-white">
                collaborative construction partners
              </span>{' '}
              committed to community and excellence.
            </p>

            {/* Partnership CTA Buttons - 4 Button Grid */}
            <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mx-auto mb-6 max-w-6xl">
              <Link href="/booking">
                <button className="group relative bg-white hover:bg-gray-50 shadow-2xl border-2 border-white rounded-full focus:outline-none focus:ring-4 focus:ring-white/50 w-full h-16 font-bold text-brand-primary text-base transition-all duration-200">
                  <div className="flex justify-center items-center">
                    <CalendarIcon
                      size="md"
                      color="currentColor"
                      className="flex-shrink-0 mr-2"
                    />
                    <span className="text-center leading-tight">
                      Consultation
                      <br />
                      Sign Up
                    </span>
                  </div>
                </button>
              </Link>

              <Link href="/estimator">
                <button className="group relative bg-brand-primary hover:bg-brand-primary-dark shadow-2xl border-2 border-white rounded-full focus:outline-none focus:ring-4 focus:ring-white/50 w-full h-16 font-bold text-white text-base transition-all duration-200">
                  <div className="flex justify-center items-center">
                    <BoltIcon
                      size="md"
                      color="currentColor"
                      className="flex-shrink-0 mr-2"
                    />
                    <span className="text-center leading-tight">
                      AI Estimator
                    </span>
                  </div>
                </button>
              </Link>

              <Link href="/portfolio">
                <button className="group relative bg-white hover:bg-gray-50 shadow-2xl border-2 border-white rounded-full focus:outline-none focus:ring-4 focus:ring-white/50 w-full h-16 font-bold text-brand-primary text-base transition-all duration-200">
                  <div className="flex justify-center items-center">
                    <HammerIcon
                      size="md"
                      color="currentColor"
                      className="flex-shrink-0 mr-2"
                    />
                    <span className="text-center leading-tight">
                      3D Explorer
                    </span>
                  </div>
                </button>
              </Link>

              <Link href="/wounded-warrior">
                <button className="group relative bg-brand-primary hover:bg-brand-primary-dark shadow-2xl border-2 border-white rounded-full focus:outline-none focus:ring-4 focus:ring-white/50 w-full h-16 font-bold text-white text-base transition-all duration-200">
                  <div className="flex justify-center items-center">
                    <ShieldIcon
                      size="md"
                      color="currentColor"
                      className="flex-shrink-0 mr-2"
                    />
                    <span className="text-center leading-tight">
                      Wounded
                      <br />
                      Warrior
                    </span>
                  </div>
                </button>
              </Link>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </>
  )
}
