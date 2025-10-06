'use client'

import React from 'react'
import Link from 'next/link'
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  PageHero,
} from '../components/ui'
// import { PortfolioImage } from '../components/portfolio/ProjectImage'
import { PortfolioService } from '../lib/services/portfolioService'
import {
  generateSEOMetadata,
  generateOrganizationStructuredData,
  StructuredData,
} from '../components/seo/seo-meta'
import TestimonialsWidget from '../components/testimonials/TestimonialsWidget'
import SmartRecommendations from '../components/recommendations/SmartRecommendations'
// import BlogNewsCarousel from '../components/blog/BlogNewsCarousel'
import Head from 'next/head'
import { MaterialIcon } from '../components/icons/MaterialIcon'
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
          MH Construction - Commercial Construction Management | Tri-Cities WA
        </title>
        <meta
          name="description"
          content="Expert Commercial Construction Management in Pasco, Kennewick, Richland WA. Full CM services for commercial, medical, and industrial projects. Call (509) 308-6489 today."
        />
        <meta
          name="keywords"
          content="commercial construction management, Tri-Cities construction, Pasco construction, Kennewick construction, Richland construction, construction management services, medical facilities construction, industrial construction, tenant improvements"
        />
        <meta
          property="og:title"
          content="MH Construction - Commercial Construction Management | Tri-Cities WA"
        />
        <meta
          property="og:description"
          content="Expert Commercial Construction Management services throughout the Tri-Cities area. Call (509) 308-6489 to begin your commercial project."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://mhconstruction.com" />
      </Head>

      {/* Add structured data for SEO */}
      <StructuredData data={generateOrganizationStructuredData()} />

      <PageHero
        title="Commercial Construction Management Experts"
        subtitle="Full Construction Management services throughout the Tri-Cities"
        description="Serving Pasco, Kennewick, Richland & surrounding areas with expert construction management, cutting-edge technology, and veteran precision."
      />

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
                icon: ({ size }: any) => (
                  <MaterialIcon
                    icon="smart_toy"
                    size={size}
                    className="text-white"
                  />
                ),
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
                icon: ({ size }: any) => (
                  <MaterialIcon
                    icon="event"
                    size={size}
                    className="text-white"
                  />
                ),
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
                icon: ({ size }: any) => (
                  <MaterialIcon
                    icon="visibility"
                    size={size}
                    className="text-white"
                  />
                ),
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
                icon: ({ size }: any) => (
                  <MaterialIcon
                    icon="security"
                    size={size}
                    className="text-white"
                    style={{ color: '#4CAF50' }}
                  />
                ),
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
                        {/* Icon Container - Maximized Space Utilization */}
                        <div
                          className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg p-2`}
                        >
                          <feature.icon size="2xl" primaryColor="white" />
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
                          size="xl"
                          primaryColor="white"
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
                              <MaterialIcon
                                icon="check_circle"
                                size="md"
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
                icon: ({ size }: any) => (
                  <MaterialIcon
                    icon="smart_toy"
                    size={size}
                    className="text-current"
                  />
                ),
              },
              {
                title: 'Book Meeting',
                description: 'Schedule your free consultation',
                href: '/booking',
                variant: 'outline' as const,
                icon: ({ size }: any) => (
                  <MaterialIcon
                    icon="event"
                    size={size}
                    className="text-current"
                  />
                ),
              },
              {
                title: 'View Projects',
                description: 'Explore our 3D gallery',
                href: '/portfolio',
                variant: 'outline' as const,
                icon: ({ size }: any) => (
                  <MaterialIcon
                    icon="visibility"
                    size={size}
                    className="text-current"
                  />
                ),
              },
              {
                title: 'Chat with AI',
                description: 'Get instant support',
                href: '/contact',
                variant: 'outline' as const,
                icon: ({ size }: any) => (
                  <MaterialIcon
                    icon="support_agent"
                    size={size}
                    className="text-current"
                  />
                ),
              },
            ].map((cta, index) => (
              <div key={index} className="text-center">
                <Button
                  variant={cta.variant}
                  size="lg"
                  className="group shadow-lg hover:shadow-xl mb-3 w-full h-12 hover:scale-105 transition-all duration-300 ease-out transform"
                  onClick={() => (window.location.href = cta.href)}
                >
                  <cta.icon
                    size="xl"
                    className="mr-3 group-hover:scale-110 transition-transform duration-300"
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

      {/* Core Values Section */}
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
                Professional Foundation
              </span>
            </h2>
            <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
              Our foundation rests on{' '}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                six core principles
              </span>{' '}
              that guide every project, every decision, and every client
              relationship we build with{' '}
              <span className="bg-clip-text bg-gradient-to-r from-veteran-red to-brand-primary font-semibold text-transparent">
                trust as our ultimate goal
              </span>
              .
            </p>
          </div>

          <div className="gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                value: 'Honesty & Transparency',
                icon: ({ size }: any) => (
                  <MaterialIcon
                    icon="visibility"
                    size={size}
                    className="text-current"
                  />
                ),
                description:
                  'We provide full-disclosure transparency from day one. Our open-dialogue progress meetings include all stakeholders, ensuring every topic is vetted and documented.',
                details:
                  'We believe you, the client, should have the most complete and up-to-date information—good or bad—to make truly educated decisions. We manage the project; you control it.',
                color: 'from-brand-primary to-brand-primary-dark',
                bgColor: 'bg-brand-primary/5',
                stats: 'Open-Book Progress Meetings',
              },
              {
                value: 'Integrity',
                icon: ({ size }: any) => (
                  <MaterialIcon
                    icon="balance"
                    size={size}
                    className="text-current"
                  />
                ),
                description:
                  'Integrity is the unwavering commitment to our word. As a team built on principles of accountability and trust, we view our business conduct as a direct reflection of our personal character.',
                details:
                  'Our conversation, character, and conduct are consistently diligent, ensuring our actions on your project transcend the transactional relationship.',
                color: 'from-veteran-blue to-veteran-blue-light',
                bgColor: 'bg-veteran-blue/5',
                stats: 'Character-Driven Conduct',
              },
              {
                value: 'Precision & Experience',
                icon: ({ size }: any) => (
                  <MaterialIcon
                    icon="precision_manufacturing"
                    size={size}
                    className="text-current"
                  />
                ),
                description:
                  'With over 150 years of combined experience in commercial construction, we offer a project team that has seen and managed virtually every challenge.',
                details:
                  'This collective wisdom is delivered in a neat, engineer-driven project package, providing the reliable foresight necessary to keep your project on track and minimize risk.',
                color: 'from-brand-secondary to-brand-secondary-light',
                bgColor: 'bg-brand-secondary/5',
                stats: '150+ Years Combined Experience',
              },
              {
                value: 'Client-First Ethics',
                icon: ({ size }: any) => (
                  <MaterialIcon
                    icon="favorite"
                    size={size}
                    className="text-current"
                  />
                ),
                description:
                  'Our foundation is built on small-town values: we are a "client" focused company, not just a "project" focused one.',
                details:
                  'This means we are committed to acting solely in your best interest. We operate with discipline—staying organized, concise, and direct—so that your valuable time is respected and your decisions are always well-informed.',
                color: 'from-brand-accent to-brand-accent-dark',
                bgColor: 'bg-brand-accent/5',
                stats: 'Client-Focused Approach',
              },
              {
                value: 'Professionalism & Control',
                icon: ({ size }: any) => (
                  <MaterialIcon
                    icon="engineering"
                    size={size}
                    className="text-current"
                  />
                ),
                description:
                  'Professionalism here is the confident, controlled ability to navigate complex projects.',
                details:
                  'We leverage decades of commercial and logistical experience to course the rough waters of construction through levelheaded management. This creates a coordinated, harmonious workflow that provides unmatched confidence to owners, subcontractors, and project peers.',
                color: 'from-veteran-red to-brand-primary',
                bgColor:
                  'bg-gradient-to-br from-veteran-red/5 to-brand-primary/5',
                stats: 'Harmonious Workflow Management',
              },
              {
                value: 'Trust (The Culmination)',
                icon: ({ size }: any) => (
                  <MaterialIcon
                    icon="verified"
                    size={size}
                    className="text-current"
                  />
                ),
                description:
                  'Earning your trust is not a starting point; it is the culmination of our consistent performance in all other core values.',
                details:
                  'Trust is the measurable result that your project is on track, flowing smoothly, and supported by open, honest communication. We understand that your trust is the foundation upon which MH Construction exists.',
                color: 'from-brand-primary to-brand-secondary',
                bgColor:
                  'bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5',
                stats: 'Foundation of Our Existence',
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
                            className={`w-24 h-24 bg-gradient-to-br ${item.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg p-3`}
                          >
                            <IconComponent size="3xl" primaryColor="white" />
                          </div>{' '}
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
                            size="xl"
                            primaryColor="white"
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
              Discover our comprehensive construction management and commercial
              services throughout the{' '}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                Tri-Cities area
              </span>{' '}
              (Pasco, Kennewick, Richland). Each service represents our
              commitment to{' '}
              <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary font-semibold text-transparent">
                professional excellence
              </span>{' '}
              and client partnership.
            </p>
          </FadeInWhenVisible>

          {/* Service Cards Grid - 6 Cards */}
          <FadeInWhenVisible className="gap-6 lg:gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Construction Management */}
            <div className="group relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl p-8 border border-gray-200 dark:border-gray-700 rounded-3xl hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300"></div>
              <div className="relative flex flex-col h-full">
                <div className="flex justify-center items-center bg-brand-primary/10 mb-6 p-2 rounded-2xl w-16 h-16">
                  <MaterialIcon
                    icon="explore"
                    size="xl"
                    className="text-brand-primary"
                  />
                </div>
                <h3 className="mb-4 font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand-primary text-2xl transition-colors">
                  Construction Management
                </h3>
                <p className="flex-grow mb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                  Full Construction Management (CM) services throughout the
                  Tri-Cities. We minimize "on-the-fly" decisions through
                  meticulous planning.
                </p>
                <div className="flex items-center mt-auto font-semibold text-brand-primary group-hover:text-brand-secondary transition-colors">
                  <span className="mr-2">Call (509) 308-6489</span>
                  <MaterialIcon
                    icon="arrow_forward"
                    size="lg"
                    className="group-hover:scale-110 transition-all group-hover:translate-x-2 duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Master Planning */}
            <div className="group relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl p-8 border border-gray-200 dark:border-gray-700 rounded-3xl hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300"></div>
              <div className="relative flex flex-col h-full">
                <div className="flex justify-center items-center bg-brand-primary/10 mb-6 p-2 rounded-2xl w-16 h-16">
                  <MaterialIcon
                    icon="architecture"
                    size="xl"
                    className="text-brand-primary"
                  />
                </div>
                <h3 className="mb-4 font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand-primary text-2xl transition-colors">
                  Master Planning
                </h3>
                <p className="flex-grow mb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                  Comprehensive Pre-Construction & Master Planning services.
                  Transform your vision into a practical, buildable reality.
                </p>
                <div className="flex items-center mt-auto font-semibold text-brand-primary group-hover:text-brand-secondary transition-colors">
                  <span className="mr-2">Learn More</span>
                  <MaterialIcon
                    icon="arrow_forward"
                    size="lg"
                    className="group-hover:scale-110 transition-all group-hover:translate-x-2 duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Commercial Buildings */}
            <div className="group relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl p-8 border border-gray-200 dark:border-gray-700 rounded-3xl hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300"></div>
              <div className="relative flex flex-col h-full">
                <div className="flex justify-center items-center bg-brand-primary/10 mb-6 p-2 rounded-2xl w-16 h-16">
                  <MaterialIcon
                    icon="build"
                    size="xl"
                    className="text-brand-primary"
                  />
                </div>
                <h3 className="mb-4 font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand-primary text-2xl transition-colors">
                  Commercial Buildings
                </h3>
                <p className="flex-grow mb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                  Complete Commercial Construction Services for offices, retail,
                  and industrial facilities across WA, OR, and ID.
                </p>
                <div className="flex items-center mt-auto font-semibold text-brand-primary group-hover:text-brand-secondary transition-colors">
                  <span className="mr-2">Learn More</span>
                  <MaterialIcon
                    icon="arrow_forward"
                    size="lg"
                    className="group-hover:scale-110 transition-all group-hover:translate-x-2 duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Medical Facilities */}
            <div className="group relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl p-8 border border-gray-200 dark:border-gray-700 rounded-3xl hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300"></div>
              <div className="relative flex flex-col h-full">
                <div className="flex justify-center items-center bg-brand-primary/10 mb-6 p-2 rounded-2xl w-16 h-16">
                  <MaterialIcon
                    icon="straighten"
                    size="xl"
                    className="text-brand-primary"
                  />
                </div>
                <h3 className="mb-4 font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand-primary text-2xl transition-colors">
                  Medical Facilities
                </h3>
                <p className="flex-grow mb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                  Specialized medical facility construction and clinic design.
                  Precision planning for healthcare environments.
                </p>
                <div className="flex items-center mt-auto font-semibold text-brand-primary group-hover:text-brand-secondary transition-colors">
                  <span className="mr-2">Learn More</span>
                  <MaterialIcon
                    icon="arrow_forward"
                    size="lg"
                    className="group-hover:scale-110 transition-all group-hover:translate-x-2 duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Light Industrial */}
            <div className="group relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl p-8 border border-gray-200 dark:border-gray-700 rounded-3xl hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300"></div>
              <div className="relative flex flex-col h-full">
                <div className="flex justify-center items-center bg-brand-primary/10 mb-6 p-2 rounded-2xl w-16 h-16">
                  <MaterialIcon
                    icon="construction"
                    size="xl"
                    className="text-brand-primary"
                  />
                </div>
                <h3 className="mb-4 font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand-primary text-2xl transition-colors">
                  Light Industrial
                </h3>
                <p className="flex-grow mb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                  Safe, durable, and highly functional industrial buildings.
                  Warehouses to processing plants built to your specifications.
                </p>
                <div className="flex items-center mt-auto font-semibold text-brand-primary group-hover:text-brand-secondary transition-colors">
                  <span className="mr-2">Learn More</span>
                  <MaterialIcon
                    icon="arrow_forward"
                    size="lg"
                    className="group-hover:scale-110 transition-all group-hover:translate-x-2 duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Tenant Improvements */}
            <div className="group relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl p-8 border border-gray-200 dark:border-gray-700 rounded-3xl hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300"></div>
              <div className="relative flex flex-col h-full">
                <div className="flex justify-center items-center bg-brand-primary/10 mb-6 p-2 rounded-2xl w-16 h-16">
                  <MaterialIcon
                    icon="gps_fixed"
                    size="xl"
                    className="text-brand-primary"
                  />
                </div>
                <h3 className="mb-4 font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand-primary text-2xl transition-colors">
                  Tenant Improvements
                </h3>
                <p className="flex-grow mb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                  Expert Commercial Tenant Improvement (TI) Services. Transform
                  your commercial space into a functional, beautiful
                  environment.
                </p>
                <div className="flex items-center mt-auto font-semibold text-brand-primary group-hover:text-brand-secondary transition-colors">
                  <span className="mr-2">Learn More</span>
                  <MaterialIcon
                    icon="arrow_forward"
                    size="lg"
                    className="group-hover:scale-110 transition-all group-hover:translate-x-2 duration-300"
                  />
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
                  {/* Quote Icon - Maximized Space */}
                  <div className="top-6 right-6 absolute flex justify-center items-center bg-brand-secondary/10 p-2 rounded-full w-12 h-12 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-full h-full text-brand-secondary"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                    </svg>
                  </div>

                  <div className="flex items-start space-x-4 mb-6">
                    <div className="flex flex-shrink-0 justify-center items-center bg-gradient-to-br from-brand-primary to-brand-secondary shadow-lg p-3 rounded-2xl w-16 h-16 group-hover:scale-110 transition-transform duration-300">
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
                            <MaterialIcon
                              key={i}
                              icon="star"
                              size="lg"
                              className="text-yellow-400"
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
              <Button
                variant="outline"
                size="xl"
                className="group shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-out transform"
              >
                <span className="z-10 relative group-hover:scale-105 transition-transform duration-300">
                  View All Testimonials
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Smart Project Recommendations */}
      <section className="relative bg-white dark:bg-gray-900 py-12 lg:py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-bold text-gray-900 dark:text-white text-3xl">
                🎖️ Popular Project Ideas
              </h2>
              <p className="mx-auto max-w-3xl text-gray-600 dark:text-gray-300 text-xl">
                Discover intelligent project recommendations based on Pacific Northwest trends and veteran preferences
              </p>
            </div>
            
            <SmartRecommendations
              variant="compact"
              maxRecommendations={6}
              showVeteranBenefits={true}
              onRecommendationClick={(recommendation) => {
                // Track recommendation click on homepage
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'homepage_recommendation_click', {
                    project_type: recommendation.projectType,
                    confidence: recommendation.confidence
                  })
                }
              }}
              onGetEstimate={(recommendation) => {
                // Navigate to estimator with pre-filled data
                if (typeof window !== 'undefined') {
                  window.location.href = `/estimator?project=${encodeURIComponent(recommendation.projectType)}&title=${encodeURIComponent(recommendation.title)}`
                }
                
                // Track estimate request from homepage recommendation
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'homepage_recommendation_estimate', {
                    project_type: recommendation.projectType,
                    estimated_value: recommendation.estimatedCost.min
                  })
                }
              }}
              className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg p-8"
            />
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Why Partner With MH Construction Section */}
      <section className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-gray-900 py-12 lg:py-16 text-white">
        <div className="z-10 relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Section Header */}
          <div className="mb-10 lg:mb-12 text-center scroll-reveal">
            <h2 className="mb-4 font-black text-white text-2xl sm:text-3xl md:text-4xl leading-tight tracking-tighter">
              <span className="block mb-2 font-semibold text-white/80 text-lg sm:text-xl md:text-2xl tracking-tight">
                The MH Partnership
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-white via-brand-secondary to-white text-transparent">
                Difference
              </span>
            </h2>

            <p className="mx-auto max-w-2xl font-light text-white/90 text-base md:text-lg leading-relaxed">
              Experience the collaborative approach where veteran values and
              genuine partnership create extraordinary results.
            </p>

            {/* Core Philosophy Tagline */}
            <div className="mt-6 mb-2">
              <p className="mx-auto max-w-2xl font-bold text-white text-base sm:text-lg text-center leading-snug">
                "Building for the Owner,{' '}
                <span className="font-black text-veteran-red text-lg sm:text-xl">
                  NOT
                </span>{' '}
                the Dollar"
              </p>
            </div>
          </div>

          {/* Core Partnership Values - 4 Flip Cards with Sharp Duotone Icons */}
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {/* Partnership Approach - We Work With You */}
            <div className="group h-64 perspective-1000">
              <div className="relative h-full group-hover:rotate-y-180 transition-transform duration-700 preserve-3d">
                {/* Front of Card */}
                <div className="absolute inset-0 backface-hidden">
                  <div className="flex flex-col justify-center items-center bg-white/10 backdrop-blur-sm p-4 border border-white/20 rounded-xl h-full text-center">
                    <div className="mb-3">
                      <MaterialIcon
                        icon="security"
                        size="2xl"
                        className="drop-shadow-lg mx-auto text-white"
                      />
                    </div>
                    <h3 className="font-black text-white text-base lg:text-lg tracking-tight">
                      We Work With You
                    </h3>
                    <p className="mt-1 text-white/70 text-xs">
                      Hover to learn more
                    </p>
                  </div>
                </div>

                {/* Back of Card */}
                <div className="absolute inset-0 rotate-y-180 backface-hidden">
                  <div className="flex flex-col justify-center bg-brand-primary/90 backdrop-blur-sm p-4 border border-white/20 rounded-xl h-full text-center">
                    <div className="mb-3">
                      <MaterialIcon
                        icon="security"
                        size="xl"
                        className="mx-auto text-white"
                      />
                    </div>
                    <h3 className="mb-3 font-black text-white text-base">
                      True Collaboration
                    </h3>
                    <p className="text-white/90 text-xs leading-relaxed">
                      More than contractors - we're your construction partners.
                      Your vision combined with our veteran-led expertise
                      creates extraordinary results.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Community Focus */}
            <div className="group h-64 perspective-1000">
              <div className="relative h-full group-hover:rotate-y-180 transition-transform duration-700 preserve-3d">
                {/* Front of Card */}
                <div className="absolute inset-0 backface-hidden">
                  <div className="flex flex-col justify-center items-center bg-white/10 backdrop-blur-sm p-4 border border-white/20 rounded-xl h-full text-center">
                    <div className="mb-3">
                      <MaterialIcon
                        icon="favorite"
                        size="2xl"
                        className="mx-auto text-brand-secondary"
                      />
                    </div>
                    <h3 className="font-black text-white text-base lg:text-lg tracking-tight">
                      Community Centered
                    </h3>
                    <p className="mt-1 text-white/70 text-xs">
                      Hover to learn more
                    </p>
                  </div>
                </div>

                {/* Back of Card */}
                <div className="absolute inset-0 rotate-y-180 backface-hidden">
                  <div className="flex flex-col justify-center bg-brand-primary/90 backdrop-blur-sm p-4 border border-white/20 rounded-xl h-full text-center">
                    <div className="mb-3">
                      <MaterialIcon
                        icon="favorite"
                        size="xl"
                        className="mx-auto text-brand-secondary"
                      />
                    </div>
                    <h3 className="mb-3 font-black text-white text-base">
                      Pacific Northwest Roots
                    </h3>
                    <p className="text-white/90 text-xs leading-relaxed">
                      Every project strengthens our shared community. Local
                      hiring, regional suppliers, and neighborhood focus.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Transparent Partnership */}
            <div className="group h-64 perspective-1000">
              <div className="relative h-full group-hover:rotate-y-180 transition-transform duration-700 preserve-3d">
                {/* Front of Card */}
                <div className="absolute inset-0 backface-hidden">
                  <div className="flex flex-col justify-center items-center bg-white/10 backdrop-blur-sm p-4 border border-white/20 rounded-xl h-full text-center">
                    <div className="mb-3">
                      <MaterialIcon
                        icon="visibility"
                        size="2xl"
                        className="drop-shadow-lg mx-auto text-brand-secondary"
                      />
                    </div>
                    <h3 className="font-black text-white text-base lg:text-lg tracking-tight">
                      Honest & Transparent
                    </h3>
                    <p className="mt-1 text-white/70 text-xs">
                      Hover to learn more
                    </p>
                  </div>
                </div>

                {/* Back of Card */}
                <div className="absolute inset-0 rotate-y-180 backface-hidden">
                  <div className="flex flex-col justify-center bg-brand-primary/90 backdrop-blur-sm p-4 border border-white/20 rounded-xl h-full text-center">
                    <div className="mb-3">
                      <MaterialIcon
                        icon="visibility"
                        size="xl"
                        className="mx-auto text-brand-secondary"
                      />
                    </div>
                    <h3 className="mb-3 font-black text-white text-base">
                      No Surprises Partnership
                    </h3>
                    <p className="text-white/90 text-xs leading-relaxed">
                      Open pricing, honest timelines, and constant
                      communication. Veteran integrity means no hidden costs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lasting Relationships */}
            <div className="group h-64 perspective-1000">
              <div className="relative h-full group-hover:rotate-y-180 transition-transform duration-700 preserve-3d">
                {/* Front of Card */}
                <div className="absolute inset-0 backface-hidden">
                  <div className="flex flex-col justify-center items-center bg-white/10 backdrop-blur-sm p-4 border border-white/20 rounded-xl h-full text-center">
                    <div className="mb-3">
                      <MaterialIcon
                        icon="handshake"
                        size="2xl"
                        className="drop-shadow-lg mx-auto text-brand-secondary"
                      />
                    </div>
                    <h3 className="font-black text-white text-base lg:text-lg tracking-tight">
                      Lifelong Partners
                    </h3>
                    <p className="mt-1 text-white/70 text-xs">
                      Hover to learn more
                    </p>
                  </div>
                </div>

                {/* Back of Card */}
                <div className="absolute inset-0 rotate-y-180 backface-hidden">
                  <div className="flex flex-col justify-center bg-brand-primary/90 backdrop-blur-sm p-4 border border-white/20 rounded-xl h-full text-center">
                    <div className="mb-3">
                      <MaterialIcon
                        icon="handshake"
                        size="xl"
                        className="mx-auto text-brand-secondary"
                      />
                    </div>
                    <h3 className="mb-3 font-black text-white text-base">
                      Beyond Project Completion
                    </h3>
                    <p className="text-white/90 text-xs leading-relaxed">
                      Our partnership doesn't end when construction finishes.
                      Many clients become lifelong friends and community
                      connections.
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

          {/* Blog/News Carousel removed for clean slate migration */}

          {/* View All Links */}
          <div className="flex sm:flex-row flex-col justify-center items-center gap-6 mt-12 text-center">
            <Link href="/blog">
              <Button
                variant="outline"
                size="lg"
                className="group shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-out transform"
              >
                <span className="mr-2">View All Blog Posts</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="lg"
                  className="transition-transform group-hover:translate-x-1 duration-300"
                />
              </Button>
            </Link>
            <Link href="/news">
              <Button
                variant="outline"
                size="lg"
                className="group shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-out transform"
              >
                <span className="mr-2">View All News</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="lg"
                  className="transition-transform group-hover:translate-x-1 duration-300"
                />
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
              Ready to Start Your Commercial Project?
            </h2>
            <p className="mx-auto mb-12 max-w-4xl font-light text-white/90 text-xl md:text-2xl leading-relaxed">
              Join business owners across the{' '}
              <span className="font-medium text-white">Tri-Cities area</span>{' '}
              who chose expert construction management for their commercial,
              industrial, and medical facility projects.
            </p>

            {/* Commercial CTA Buttons - 4 Button Grid */}
            <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mx-auto mb-6 max-w-6xl">
              <a href="tel:5093086489">
                <button className="group relative bg-white hover:bg-gray-50 shadow-2xl hover:shadow-3xl border-2 border-white rounded-full focus:outline-none focus:ring-4 focus:ring-white/50 w-full h-16 font-bold text-brand-primary text-base hover:scale-105 transition-all duration-300 ease-out transform">
                  <div className="flex justify-center items-center">
                    <MaterialIcon
                      icon="phone"
                      size="lg"
                      className="flex-shrink-0 mr-2 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-center leading-tight">
                      Call Now
                      <br />
                      (509) 308-6489
                    </span>
                  </div>
                </button>
              </a>

              <Link href="/estimator">
                <button className="group relative bg-brand-primary hover:bg-brand-primary-dark shadow-2xl hover:shadow-3xl border-2 border-white rounded-full focus:outline-none focus:ring-4 focus:ring-white/50 w-full h-16 font-bold text-white text-base hover:scale-105 transition-all duration-300 ease-out transform">
                  <div className="flex justify-center items-center">
                    <MaterialIcon
                      icon="smart_toy"
                      size="lg"
                      className="flex-shrink-0 mr-2 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-center leading-tight">
                      Project Estimator
                    </span>
                  </div>
                </button>
              </Link>

              <Link href="/portfolio">
                <button className="group relative bg-white hover:bg-gray-50 shadow-2xl hover:shadow-3xl border-2 border-white rounded-full focus:outline-none focus:ring-4 focus:ring-white/50 w-full h-16 font-bold text-brand-primary text-base hover:scale-105 transition-all duration-300 ease-out transform">
                  <div className="flex justify-center items-center">
                    <MaterialIcon
                      icon="visibility"
                      size="lg"
                      className="flex-shrink-0 mr-2 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-center leading-tight">
                      View Projects
                    </span>
                  </div>
                </button>
              </Link>

              <Link href="/booking">
                <button className="group relative bg-brand-primary hover:bg-brand-primary-dark shadow-2xl hover:shadow-3xl border-2 border-white rounded-full focus:outline-none focus:ring-4 focus:ring-white/50 w-full h-16 font-bold text-white text-base hover:scale-105 transition-all duration-300 ease-out transform">
                  <div className="flex justify-center items-center">
                    <MaterialIcon
                      icon="event"
                      size="lg"
                      className="flex-shrink-0 mr-2 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-center leading-tight">
                      Free
                      <br />
                      Consultation
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
