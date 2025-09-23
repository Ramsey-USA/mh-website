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
import FeaturedProjectsSection from '../components/portfolio/FeaturedProjectsSection'
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
} from '../components/icons/SharpDuotoneIcons'
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
  HoverScale,
} from '../components/animations/FramerMotionComponents'
import DynamicSearch from '../components/features/DynamicSearch'
import InteractiveGallery from '../components/features/InteractiveGallery'
import { useAnalytics } from '../components/analytics/enhanced-analytics'
import { OptimizedImage } from '../components/ui/OptimizedImage'
import {
  useIntersectionObserver,
  useImagePreloader,
} from '../hooks/usePerformanceOptimization'

export default function Home() {
  // Initialize analytics
  const { trackEvent } = useAnalytics()

  // Get featured projects for the homepage
  const featuredProjects = PortfolioService.getFeaturedProjects().slice(0, 3)

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

            <h1 className="mb-6 pb-2 font-black text-gray-900 dark:text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-relaxed tracking-tighter hero-title">
              <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight">
                Building Tomorrow with
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary drop-shadow-sm font-black text-transparent">
                Today's Technology
              </span>
            </h1>

            <p className="mx-auto mb-8 max-w-4xl font-light text-gray-600 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide">
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

            <div className="flex sm:flex-row flex-col justify-center items-center gap-8 mb-8">
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

      {/* Enhanced Company Stats Section */}
      <section className="relative bg-white dark:bg-gray-900 py-20 lg:py-32 stats-section">
        <div className="top-0 right-0 left-0 absolute bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent h-px"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 dark:from-gray-800/30 to-transparent"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-24 lg:mb-32 text-center scroll-reveal">
            <div className="inline-flex items-center bg-brand-primary/10 shadow-lg mb-10 px-8 py-4 border border-brand-primary/20 rounded-full">
              <StarIcon size="md" primaryColor="var(--brand-primary)" />
              <span className="ml-4 font-black text-brand-primary text-sm uppercase tracking-wider letterspacing-widest">
                Proven Excellence
              </span>
            </div>
            <h2 className="mb-10 font-black text-gray-900 dark:text-gray-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
              <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                Excellence in
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                Numbers
              </span>
            </h2>
            <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide">
              Our track record speaks for itself - delivering{' '}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                outstanding results
              </span>{' '}
              with military precision for over{' '}
              <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary font-semibold text-transparent">
                150 combined years
              </span>{' '}
              of experience
            </p>
          </div>

          <div className="gap-8 lg:gap-12 grid grid-cols-2 md:grid-cols-4">
            {[
              {
                number: '150+',
                label: 'Years Combined Experience',
                icon: StarIcon,
                color: 'from-yellow-400 to-yellow-600',
                description: 'Decades of expertise in construction excellence',
              },
              {
                number: '500+',
                label: 'Projects Completed',
                icon: HammerIcon,
                color: 'from-brand-primary to-brand-primary-light',
                description: 'Successful projects across the Pacific Northwest',
              },
              {
                number: '24/7',
                label: 'Emergency Support',
                icon: ShieldIcon,
                color: 'from-red-500 to-red-600',
                description: 'Round-the-clock support when you need it most',
              },
              {
                number: '100%',
                label: 'Veteran Owned',
                icon: CheckIcon,
                color: 'from-blue-500 to-blue-600',
                description: 'Proudly veteran-owned and operated',
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="group text-center scroll-reveal stats-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}
                >
                  <stat.icon
                    size="xl"
                    primaryColor="white"
                    secondaryColor="rgba(255,255,255,0.8)"
                  />
                </div>
                <div className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary mb-4 font-black text-transparent text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter">
                  {stat.number}
                </div>
                <div className="mb-4 font-black text-gray-900 dark:text-gray-100 text-lg md:text-xl lg:text-2xl tracking-tight">
                  {stat.label}
                </div>
                <p className="opacity-0 group-hover:opacity-100 font-light text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed tracking-wide transition-opacity duration-300">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Revolutionary Features Section */}
      <section className="relative bg-gradient-to-b from-gray-50 dark:from-gray-800 to-white dark:to-gray-900 py-20 lg:py-32 xl:py-40 features-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(56,104,81,0.05)_0%,transparent_50%)] opacity-60"></div>
        <div className="top-20 right-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-32 h-32"></div>
        <div className="bottom-20 left-20 absolute bg-brand-secondary/5 blur-3xl rounded-full w-40 h-40"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-24 lg:mb-32 text-center">
            <div className="inline-flex items-center bg-brand-primary/10 dark:bg-brand-primary/20 shadow-lg mb-10 px-8 py-4 border border-brand-primary/20 rounded-full">
              <BoltIcon size="md" primaryColor="var(--brand-primary)" />
              <span className="ml-4 font-black text-brand-primary text-sm uppercase tracking-wider letterspacing-widest">
                Revolutionary Solutions
              </span>
            </div>

            <h2 className="mb-10 font-black text-gray-900 dark:text-gray-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
              <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                The Future of
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                Construction
              </span>
            </h2>
            <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide">
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

          <StaggeredFadeIn className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: BoltIcon,
                title: 'AI Project Estimator',
                description:
                  'Revolutionary AI-powered cost calculator with ±15% precision guarantee for accurate project planning and budgeting.',
                color: 'from-blue-500 to-blue-600',
                delay: '0s',
              },
              {
                icon: CalendarIcon,
                title: 'Smart Scheduling',
                description:
                  'Visual calendar system with real-time availability and instant confirmations for seamless booking experience.',
                color: 'from-green-500 to-green-600',
                delay: '0.1s',
              },
              {
                icon: HammerIcon,
                title: '3D Project Explorer',
                description:
                  'Immersive HD visualization with real-time builder insights to bring your vision to life before construction begins.',
                color: 'from-purple-500 to-purple-600',
                delay: '0.2s',
              },
              {
                icon: UserIcon,
                title: '24/7 AI Assistant',
                description:
                  'Military-grade support with enhanced chatbot providing context-aware veteran assistance and instant responses.',
                color: 'from-orange-500 to-orange-600',
                delay: '0.3s',
              },
            ].map((feature, index) => (
              <HoverScale key={index} className="group feature-card">
                <div className="relative bg-white dark:bg-gray-800 shadow-lg group-hover:shadow-2xl p-8 rounded-3xl h-full transition-all duration-500">
                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}
                  ></div>

                  {/* Icon Container */}
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}
                  >
                    <feature.icon
                      size="xl"
                      primaryColor="white"
                      secondaryColor="rgba(255,255,255,0.8)"
                    />
                  </div>

                  <h3 className="mb-6 font-black text-gray-900 dark:text-gray-100 group-hover:text-brand-primary text-xl md:text-2xl lg:text-3xl leading-tight tracking-tight transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="mb-8 font-light text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed tracking-wide">
                    {feature.description}
                  </p>

                  {/* Hover Arrow */}
                  <div className="right-6 bottom-6 absolute opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 duration-300 transform">
                    <div className="flex justify-center items-center bg-brand-primary shadow-lg rounded-full w-10 h-10">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </HoverScale>
            ))}
          </StaggeredFadeIn>
        </div>
      </section>

      {/* Military Values Section */}
      <section className="relative bg-white dark:bg-gray-900 py-20 lg:py-32 xl:py-40 values-section">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,104,81,0.05)_0%,transparent_50%)]"></div>
        <div className="top-40 left-10 absolute bg-brand-secondary/10 blur-2xl rounded-full w-24 h-24"></div>
        <div className="right-10 bottom-20 absolute bg-brand-primary/10 blur-2xl rounded-full w-32 h-32"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="mb-24 lg:mb-32 text-center scroll-reveal">
            <div className="inline-flex items-center bg-red-50 dark:bg-red-900/20 shadow-lg mb-10 px-8 py-4 border border-red-200/30 rounded-full">
              <ShieldIcon size="md" primaryColor="var(--veteran-red)" />
              <span className="ml-4 font-black text-red-600 dark:text-red-400 text-sm uppercase tracking-wider letterspacing-widest">
                Military Values
              </span>
            </div>

            <h2 className="mb-10 font-black text-gray-900 dark:text-gray-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
              <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                Built on
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                Unwavering Principles
              </span>
            </h2>
            <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide">
              Our foundation rests on{' '}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                military values
              </span>{' '}
              that guide every project, every decision, and every client
              relationship we build with{' '}
              <span className="bg-clip-text bg-gradient-to-r from-red-600 to-brand-primary font-semibold text-transparent">
                honor and dedication
              </span>
              .
            </p>
          </div>

          <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                value: 'Integrity',
                icon: ShieldIcon,
                description:
                  'We conduct business with unwavering honesty and moral principles, ensuring every project reflects our commitment to doing what is right.',
                color: 'from-blue-500 to-blue-600',
              },
              {
                value: 'Excellence',
                icon: StarIcon,
                description:
                  'We pursue perfection in every detail, delivering superior craftsmanship that exceeds expectations and stands the test of time.',
                color: 'from-yellow-400 to-yellow-600',
              },
              {
                value: 'Service',
                icon: ToolsIcon,
                description:
                  'We serve our clients and community with dedication, putting their needs first and treating every project as our mission.',
                color: 'from-green-500 to-green-600',
              },
              {
                value: 'Leadership',
                icon: CheckIcon,
                description:
                  'We lead by example in the construction industry, setting standards for innovation, safety, and professional excellence.',
                color: 'from-purple-500 to-purple-600',
              },
              {
                value: 'Accountability',
                icon: CogIcon,
                description:
                  'We take full responsibility for our work and commitments, ensuring transparency and reliability in every interaction.',
                color: 'from-orange-500 to-orange-600',
              },
              {
                value: 'Teamwork',
                icon: HammerIcon,
                description:
                  'We build success through collaboration, leveraging diverse skills and perspectives to achieve exceptional results together.',
                color: 'from-red-500 to-red-600',
              },
            ].map((item, index) => {
              const IconComponent = item.icon
              return (
                <div
                  key={item.value}
                  className="group scroll-reveal value-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative bg-white dark:bg-gray-800 shadow-lg group-hover:shadow-2xl p-8 rounded-3xl h-full overflow-hidden transition-all group-hover:-translate-y-3 duration-500">
                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    ></div>

                    <div className="z-10 relative text-center">
                      <div
                        className={`w-24 h-24 bg-gradient-to-br ${item.color} rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                      >
                        <IconComponent
                          size="2xl"
                          primaryColor="white"
                          secondaryColor="rgba(255,255,255,0.8)"
                        />
                      </div>

                      <h3 className="mb-6 font-black text-gray-900 dark:text-gray-100 group-hover:text-brand-primary text-2xl md:text-3xl lg:text-4xl leading-tight tracking-tight transition-colors duration-300">
                        {item.value}
                      </h3>

                      <p className="font-light text-gray-600 dark:text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed tracking-wide">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <FeaturedProjectsSection featuredProjects={featuredProjects} />

      {/* Interactive Showcase Section */}
      <section className="relative bg-white dark:bg-gray-900 py-20 lg:py-32 xl:py-40 showcase-section">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 dark:from-gray-800/50 to-white dark:to-gray-900"></div>
        <div className="top-20 right-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-32 h-32"></div>
        <div className="bottom-20 left-20 absolute bg-brand-secondary/5 blur-3xl rounded-full w-40 h-40"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-24 text-center">
            <div className="inline-flex items-center bg-brand-primary/10 shadow-lg mb-10 px-8 py-4 border border-brand-primary/20 rounded-full">
              <BoltIcon size="md" primaryColor="var(--brand-primary)" />
              <span className="ml-4 font-black text-brand-primary text-sm uppercase tracking-wider letterspacing-widest">
                Interactive Experience
              </span>
            </div>
            <h2 className="mb-10 font-black text-gray-900 dark:text-gray-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
              <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                Explore Our
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                Capabilities
              </span>
            </h2>
            <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide">
              Discover our services, browse project galleries, and see what
              makes us{' '}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                different
              </span>{' '}
              from the rest
            </p>
          </FadeInWhenVisible>

          {/* Dynamic Search Component */}
          <FadeInWhenVisible className="mb-16">
            <DynamicSearch
              items={[
                {
                  id: '1',
                  title: 'Residential Construction',
                  description: 'Custom homes built with precision and care',
                  category: 'Services',
                  type: 'service',
                  tags: ['residential', 'custom homes', 'construction'],
                  date: new Date(),
                  image: '/images/placeholder-project.jpg',
                },
                {
                  id: '2',
                  title: 'Commercial Projects',
                  description: 'Large-scale commercial construction solutions',
                  category: 'Services',
                  type: 'service',
                  tags: ['commercial', 'office buildings', 'retail'],
                  date: new Date(),
                  image: '/images/placeholder-project.jpg',
                },
                {
                  id: '3',
                  title: 'Kitchen Renovations',
                  description: 'Transform your kitchen with modern designs',
                  category: 'Renovation',
                  type: 'service',
                  tags: ['kitchen', 'renovation', 'modern'],
                  date: new Date(),
                  image: '/images/placeholder-project.jpg',
                },
                {
                  id: '4',
                  title: 'Bathroom Remodeling',
                  description: 'Luxury bathroom transformations',
                  category: 'Renovation',
                  type: 'service',
                  tags: ['bathroom', 'luxury', 'remodeling'],
                  date: new Date(),
                  image: '/images/placeholder-project.jpg',
                },
              ]}
              categories={['All', 'Services', 'Renovation', 'Projects']}
              placeholder="Search our services and capabilities..."
              className="mx-auto max-w-4xl"
              onItemClick={item => {
                trackEvent('search_result_click', {
                  item_id: item.id,
                  item_title: item.title,
                  item_category: item.category,
                  search_location: 'homepage_showcase',
                })
              }}
            />
          </FadeInWhenVisible>

          {/* Interactive Gallery Showcase */}
          <FadeInWhenVisible>
            <InteractiveGallery
              title="Recent Work Gallery"
              images={[
                {
                  id: '1',
                  src: '/images/projects/project-default.png',
                  alt: 'Modern Kitchen Renovation',
                  title: 'Modern Kitchen Renovation',
                  description:
                    'Complete kitchen transformation with smart appliances',
                  category: 'Kitchen',
                },
                {
                  id: '2',
                  src: '/images/projects/project-default.png',
                  alt: 'Luxury Bathroom',
                  title: 'Luxury Master Bathroom',
                  description: 'Spa-like bathroom with premium finishes',
                  category: 'Bathroom',
                },
                {
                  id: '3',
                  src: '/images/projects/project-default.png',
                  alt: 'Custom Home Build',
                  title: 'Custom Home Construction',
                  description:
                    'From foundation to finish - complete home build',
                  category: 'Residential',
                },
                {
                  id: '4',
                  src: '/images/projects/project-default.png',
                  alt: 'Commercial Office',
                  title: 'Modern Office Space',
                  description: 'Contemporary commercial space design',
                  category: 'Commercial',
                },
              ]}
              showCategories={true}
              showThumbnails={true}
              className="mx-auto max-w-6xl"
            />
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Enhanced Client Testimonials */}
      <section className="relative bg-gradient-to-b from-gray-50 dark:from-gray-800 to-white dark:to-gray-900 py-20 lg:py-32 xl:py-40 testimonials-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(189,146,100,0.05)_0%,transparent_50%)] opacity-60"></div>
        <div className="top-20 left-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-40 h-40"></div>
        <div className="right-20 bottom-20 absolute bg-brand-secondary/5 blur-3xl rounded-full w-32 h-32"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-24 lg:mb-32 text-center scroll-reveal">
            <div className="inline-flex items-center bg-yellow-50 dark:bg-yellow-900/20 shadow-lg mb-10 px-8 py-4 border border-yellow-200/30 rounded-full">
              <StarIcon size="md" primaryColor="var(--brand-secondary)" />
              <span className="ml-4 font-black text-yellow-600 dark:text-yellow-400 text-sm uppercase tracking-wider letterspacing-widest">
                Client Success Stories
              </span>
            </div>

            <h2 className="mb-10 font-black text-gray-900 dark:text-gray-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
              <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                What Our
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                Clients Say
              </span>
            </h2>
            <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide">
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
                <div className="relative bg-white dark:bg-gray-800 shadow-lg group-hover:shadow-2xl p-8 rounded-3xl h-full transition-all group-hover:-translate-y-2 duration-500">
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

      {/* Enhanced CTA Section */}
      <section className="relative py-20 lg:py-32 xl:py-40 cta-section">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-secondary">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,104,81,0.1)_0%,transparent_70%)] opacity-60"></div>
          <div className="absolute inset-0">
            <div className="top-20 left-20 absolute bg-white/20 rounded-full w-3 h-3 animate-pulse"></div>
            <div
              className="top-40 right-32 absolute bg-white/30 rounded-full w-2 h-2 animate-pulse"
              style={{ animationDelay: '1s' }}
            ></div>
            <div
              className="bottom-32 left-1/3 absolute bg-white/25 rounded-full w-2.5 h-2.5 animate-pulse"
              style={{ animationDelay: '2s' }}
            ></div>
            <div
              className="right-20 bottom-20 absolute bg-white/20 rounded-full w-2 h-2 animate-pulse"
              style={{ animationDelay: '0.5s' }}
            ></div>
          </div>
        </div>

        <div className="z-10 relative mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-center">
          <div className="scroll-reveal">
            {/* Badge */}
            <div className="inline-flex items-center bg-white/10 shadow-lg backdrop-blur-sm mb-12 px-8 py-4 border border-white/20 rounded-full">
              <CheckIcon size="md" primaryColor="white" />
              <span className="ml-4 font-black text-white text-base md:text-lg uppercase tracking-wider letterspacing-widest">
                Free Consultation & Estimate
              </span>
            </div>

            <h2 className="mb-12 font-black text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
              <span className="block mb-4 font-semibold text-gray-200 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                Ready to Build Your
              </span>
              <span className="block drop-shadow-lg text-brand-secondary-light">
                Dream Project?
              </span>
            </h2>

            <p className="mx-auto mb-16 max-w-5xl font-light text-gray-100 text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide">
              Get started with a{' '}
              <span className="font-medium text-white">free consultation</span>{' '}
              and AI-powered estimate today. Experience the difference of
              working with{' '}
              <span className="font-semibold text-brand-secondary-light">
                veteran-owned excellence
              </span>{' '}
              and cutting-edge technology.
            </p>

            <div className="flex sm:flex-row flex-col justify-center items-center gap-8 mb-16">
              <Link href="/booking">
                <Button variant="secondary" size="xl" className="shadow-xl">
                  <CalendarIcon
                    size="md"
                    primaryColor="currentColor"
                    className="mr-3"
                  />
                  <span className="z-10 relative tracking-wide">
                    Schedule Consultation
                  </span>
                </Button>
              </Link>
              <Link href="/estimator">
                <Button
                  variant="outline"
                  size="xl"
                  className="bg-transparent hover:bg-white shadow-xl border-white text-white hover:text-brand-primary"
                >
                  <BoltIcon
                    size="md"
                    primaryColor="currentColor"
                    className="mr-3"
                  />
                  <span className="z-10 relative tracking-wide">
                    Get Free Estimate
                  </span>
                </Button>
              </Link>
            </div>

            {/* Enhanced Trust Indicators */}
            <div className="gap-8 grid grid-cols-2 md:grid-cols-4 pt-12 border-white/20 border-t">
              {[
                { icon: CheckIcon, text: 'Free Consultation' },
                { icon: ShieldIcon, text: '24/7 Emergency Support' },
                { icon: StarIcon, text: 'Licensed & Insured' },
                { icon: HammerIcon, text: 'Veteran Owned' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group flex flex-col items-center text-white/90"
                >
                  <div className="flex justify-center items-center bg-white/10 group-hover:bg-white/20 mb-3 rounded-full w-12 h-12 transition-colors duration-300">
                    <item.icon size="md" primaryColor="currentColor" />
                  </div>
                  <span className="font-medium text-sm text-center">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
