"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui";
import { PortfolioService } from "@/lib/services/portfolioService";
import {
  generateSEOMetadata,
  generateOrganizationStructuredData,
  StructuredData,
} from "@/components/seo/seo-meta";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";

// Enhanced SEO for AI-powered veteran-owned construction
import { getHomepageSEO } from "@/lib/seo/page-seo-utils";
// Dynamically import below-the-fold components
const TestimonialsWidget = dynamic(
  () => import("../components/testimonials/TestimonialsWidget"),
  {
    loading: () => (
      <div className="bg-muted rounded-lg h-96 animate-pulse"></div>
    ),
    ssr: false,
  }
);
const SmartRecommendations = dynamic(
  () => import("../components/recommendations/SmartRecommendations"),
  {
    loading: () => (
      <div className="bg-muted rounded-lg h-64 animate-pulse"></div>
    ),
    ssr: false,
  }
);
import Head from "next/head";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
  HoverScale,
} from "@/components/animations/FramerMotionComponents";
import { useAnalytics } from "@/components/analytics/enhanced-analytics";
import { OptimizedImage } from "@/components/ui/media/OptimizedImage";
import {
  useIntersectionObserver,
  useImagePreloader,
} from "@/hooks/usePerformanceOptimization";

export default function Home() {
  // Initialize analytics
  const { trackEvent } = useAnalytics();

  // Get enhanced SEO data for homepage
  const homepageSEO = getHomepageSEO();

  // Preload critical images for better performance
  const criticalImages = [
    "/images/placeholder.jpg",
    "/images/placeholder-project.jpg",
    "/images/projects/project-default.png",
    "/images/logo/mh-logo.png",
  ];

  const preloadedImages = useImagePreloader(criticalImages);

  // Track page view
  React.useEffect(() => {
    trackEvent("page_view", {
      page_name: "homepage",
      page_location: "/",
      content_group1: "marketing",
    });
  }, [trackEvent]);

  // Track scroll depth for engagement analytics
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
          100
      );

      if (scrollPercent >= 25 && !sessionStorage.getItem("scroll_25")) {
        sessionStorage.setItem("scroll_25", "true");
        trackEvent("scroll_depth", { percent: 25, page: "homepage" });
      }
      if (scrollPercent >= 50 && !sessionStorage.getItem("scroll_50")) {
        sessionStorage.setItem("scroll_50", "true");
        trackEvent("scroll_depth", { percent: 50, page: "homepage" });
      }
      if (scrollPercent >= 75 && !sessionStorage.getItem("scroll_75")) {
        sessionStorage.setItem("scroll_75", "true");
        trackEvent("scroll_depth", { percent: 75, page: "homepage" });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [trackEvent]);

  return (
    <>
      {/* Enhanced SEO structured data for AI-powered veteran-owned construction */}
      <StructuredData data={homepageSEO.schemas} />

      <Head>
        <title>
          MH Construction - AI-Powered Veteran-Owned Construction Excellence
        </title>
        <meta
          name="description"
          content="Revolutionary AI construction intelligence with General MH military assistant. Founded 2010, veteran-owned since January 2025 under Army veteran leadership. Serving Pacific Northwest communities with authentic partnerships and cutting-edge technology."
        />
        <meta
          name="keywords"
          content="veteran-owned construction, military precision construction, commercial construction management, Tri-Cities construction, Pasco construction, Kennewick construction, Richland construction, veteran business, AI-powered construction, construction management services"
        />
        <meta
          property="og:title"
          content="MH Construction - Veteran-Led Construction Management | Tri-Cities WA"
        />
        <meta
          property="og:description"
          content="Founded 2010, veteran-owned since January 2025. Commercial Construction Management with military precision and AI technology. Serving the Tri-Cities area. Call (509) 308-6489."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.mhc-gc.com" />
      </Head>

      {/* Add structured data for SEO */}
      <StructuredData data={generateOrganizationStructuredData()} />

      {/* Home Page Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 min-h-[calc(100dvh-60px)] sm:min-h-[calc(100vh-72px)] flex items-center justify-center text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"></div>

        {/* Content - Added top and bottom padding to prevent overlap */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24">
          <div className="space-y-6 sm:space-y-8">
            {/* Main Title - Better mobile scaling */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
              <span className="block bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white text-transparent drop-shadow-lg">
                Your Partnership in Construction Excellence
              </span>
            </h1>

            {/* Subtitle - Better mobile responsiveness */}
            <p className="max-w-3xl mx-auto text-lg xs:text-xl sm:text-2xl md:text-3xl text-white/90 leading-relaxed px-2">
              We Work With You Every Step. Military Precision. Advanced
              Technology.
            </p>

            {/* Description - Improved mobile spacing */}
            <p className="max-w-4xl mx-auto text-base sm:text-lg md:text-xl text-white/80 leading-relaxed px-4">
              Partnering with Tri-Cities communities since 2010 - where veteran
              values meet collaborative construction management for
              extraordinary results.
            </p>

            {/* Call to Action Buttons - Mobile optimized with proper spacing */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-8 sm:mt-12 px-4 pb-4">
              <Button
                size="xl"
                className="bg-brand-secondary hover:bg-brand-secondary/90 text-gray-900 font-bold w-full sm:w-auto min-h-[48px] touch-manipulation"
              >
                <MaterialIcon
                  icon="handshake"
                  className="mr-2 sm:mr-3 w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0"
                />
                <span className="text-sm sm:text-base">Start Your Project</span>
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-gray-900 w-full sm:w-auto min-h-[48px] touch-manipulation"
              >
                <MaterialIcon
                  icon="visibility"
                  className="mr-2 sm:mr-3 w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0"
                />
                <span className="text-sm sm:text-base">View Our Work</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Page-Specific Navigation Bar - Visible on all devices */}
        <PageNavigation
          items={navigationConfigs.home}
          className="absolute bottom-0 left-0 right-0"
        />
      </section>

      {/* Revolutionary Features Section */}
      <section
        id="revolutionary-features"
        className="relative bg-gradient-to-b from-gray-50 dark:from-gray-800 to-white dark:to-gray-900 py-8 sm:py-12 lg:py-16 features-section"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(56,104,81,0.05)_0%,transparent_50%)] opacity-60"></div>
        <div className="top-20 right-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-32 h-32"></div>
        <div className="bottom-20 left-20 absolute bg-brand-secondary/5 blur-3xl rounded-full w-40 h-40"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-8 sm:mb-10 lg:mb-12 text-center">
            <h2 className="mb-4 sm:mb-6 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
              <span className="block mb-2 sm:mb-3 font-semibold text-gray-700 dark:text-gray-300 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                The Future of
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                Construction
              </span>
            </h2>
            <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide px-2">
              Where{" "}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                collaborative partnership meets cutting-edge AI
              </span>
              . Our veteran-led team works with you to combine decades of
              service experience with revolutionary technology to deliver
              construction management that{" "}
              <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary font-semibold text-transparent">
                serves your vision
              </span>
              .
            </p>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-4 sm:gap-6 lg:gap-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: ({ size }: any) => (
                  <MaterialIcon
                    icon="smart_toy"
                    size={size}
                    className="text-white"
                  />
                ),
                title: "AI Project Estimator",
                description:
                  "AI-powered cost estimation system providing preliminary budget planning with regional market intelligence.",
                details:
                  "Our AI analyzes regional project data, material costs, and labor factors to provide helpful preliminary estimates for budget planning.",
                features: [
                  "Regional Market Data",
                  "Real-time Material Pricing",
                  "Labor Cost Analysis",
                  "PDF Export",
                ],
                color: "from-brand-primary to-brand-accent",
                bgColor: "bg-brand-primary/5",
                delay: "0s",
              },
              {
                icon: ({ size }: any) => (
                  <MaterialIcon
                    icon="event"
                    size={size}
                    className="text-white"
                  />
                ),
                title: "Smart Scheduling",
                description:
                  "Visual calendar system with real-time availability and instant confirmations for seamless booking experience.",
                details:
                  "Intelligent scheduling considers team availability, project timelines, and weather patterns to optimize booking efficiency and reduce delays.",
                features: [
                  "Real-time Availability",
                  "Automated Confirmations",
                  "Weather Integration",
                  "Team Optimization",
                ],
                color: "from-brand-secondary to-bronze-700",
                bgColor: "bg-brand-secondary/5",
                delay: "0.1s",
              },
              {
                icon: ({ size }: any) => (
                  <MaterialIcon
                    icon="visibility"
                    size={size}
                    className="text-white"
                  />
                ),
                title: "3D Project Explorer",
                description:
                  "Immersive HD visualization with real-time builder insights to bring your vision to life before construction begins.",
                details:
                  "Walk through your project in photorealistic 3D, make changes in real-time, and see exactly how your finished project will look.",
                features: [
                  "Photorealistic Rendering",
                  "Virtual Walkthrough",
                  "Real-time Changes",
                  "Material Previews",
                ],
                color: "from-brand-accent to-forest-800",
                bgColor: "bg-brand-accent/5",
                delay: "0.2s",
              },
              {
                icon: ({ size }: any) => (
                  <MaterialIcon
                    icon="security"
                    size={size}
                    className="text-brand-primary"
                  />
                ),
                title: "24/7 AI Assistant",
                description:
                  "Military-grade support with enhanced chatbot providing context-aware veteran assistance and instant responses.",
                details:
                  "Our AI assistant understands construction terminology, veteran benefits, and project specifics to provide personalized, accurate assistance.",
                features: [
                  "Veteran-Aware Support",
                  "Construction Expertise",
                  "Instant Responses",
                  "Project Context",
                ],
                color: "from-brand-primary to-brand-secondary",
                bgColor:
                  "bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5",
                delay: "0.3s",
              },
            ].map((feature, index) => {
              const featureIds = [
                "ai-estimator",
                "smart-scheduling",
                "3d-explorer",
                "ai-assistant",
              ];
              return (
                <div
                  key={index}
                  id={`feature-${featureIds[index]}`}
                  className="group perspective-1000 feature-card"
                >
                  <div className="relative w-full h-auto min-h-[280px] sm:min-h-[320px] md:min-h-[360px] lg:min-h-[420px] group-hover:rotate-y-180 transition-transform duration-700 preserve-3d">
                    {/* Front of Card - Mobile optimized */}
                    <div className="absolute inset-0 bg-white dark:bg-gray-800 shadow-lg hover:shadow-brand-primary/10 hover:shadow-xl p-4 sm:p-6 lg:p-8 border border-gray-200 dark:border-gray-700 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 backface-hidden">
                      {/* Gradient Background */}
                      <div
                        className={`absolute inset-0 ${feature.bgColor} rounded-2xl sm:rounded-3xl`}
                      ></div>

                      <div className="z-10 relative flex flex-col h-full">
                        <div className="flex-grow">
                          {/* Icon Container - Mobile responsive */}
                          <div
                            className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${feature.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg p-2`}
                          >
                            <feature.icon size="xl" primaryColor="white" />
                          </div>

                          <h3 className="mb-3 sm:mb-4 font-black text-gray-900 dark:text-gray-100 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-tight tracking-tight">
                            {feature.title}
                          </h3>

                          <p className="font-light text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                            {feature.description}
                          </p>
                        </div>

                        {/* Pin to bottom - Mobile friendly */}
                        <div className="mt-auto pt-4 sm:pt-6 font-semibold text-brand-primary dark:text-bronze-400 text-xs uppercase tracking-wider">
                          <span className="hidden sm:inline">
                            Hover for details
                          </span>
                          <span className="sm:hidden">Tap for details</span>
                        </div>
                      </div>
                    </div>

                    {/* Back of Card - Mobile optimized */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.color} shadow-xl hover:shadow-2xl transition-shadow duration-300 p-3 sm:p-4 md:p-5 lg:p-6 rounded-2xl sm:rounded-3xl backface-hidden rotate-y-180 overflow-hidden`}
                    >
                      <div className="flex flex-col h-full text-white text-center">
                        <div className="flex flex-col flex-grow min-h-0">
                          <feature.icon
                            size="lg"
                            primaryColor="white"
                            className="mx-auto mb-2"
                          />
                          <h3 className="mb-2 font-black text-sm sm:text-base lg:text-lg xl:text-xl">
                            {feature.title}
                          </h3>
                          <p className="mb-3 font-light text-white/90 text-xs sm:text-sm lg:text-base leading-tight overflow-hidden">
                            {feature.details}
                          </p>
                        </div>

                        <div className="bg-white/20 backdrop-blur-sm flex-shrink-0 p-2 sm:p-2.5 border border-white/10 rounded-lg">
                          <div className="mb-1 font-medium text-white/80 text-xs uppercase tracking-wider">
                            Key Features
                          </div>
                          <ul className="space-y-0.5 text-xs">
                            {feature.features.map((feat, idx) => (
                              <li
                                key={idx}
                                className="flex items-start text-left"
                              >
                                <MaterialIcon
                                  icon="check_circle"
                                  size="sm"
                                  className="flex-shrink-0 mt-0.5 mr-1.5 text-white/80"
                                />
                                <span className="font-light leading-tight text-xs break-words">
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
              );
            })}
          </StaggeredFadeIn>

          {/* AI Feature CTAs - Mobile optimized */}
          <div
            id="ai-features-cta"
            className="gap-3 sm:gap-4 lg:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-8 sm:mt-12"
          >
            {[
              {
                title: "Get Instant AI Estimate",
                description: "Try our AI cost calculator",
                href: "/estimator",
                variant: "secondary" as const,
                icon: ({ size }: any) => (
                  <MaterialIcon
                    icon="smart_toy"
                    size={size}
                    className="text-current"
                  />
                ),
              },
              {
                title: "Schedule Free Consultation",
                description: "Book your site visit",
                href: "/booking",
                variant: "primary" as const,
                icon: ({ size }: any) => (
                  <MaterialIcon
                    icon="event"
                    size={size}
                    className="text-current"
                  />
                ),
              },
              {
                title: "View Portfolio",
                description: "Explore our collaborations",
                href: "/services#portfolio",
                variant: "outline" as const,
                icon: ({ size }: any) => (
                  <MaterialIcon
                    icon="visibility"
                    size={size}
                    className="text-current"
                  />
                ),
              },
              {
                title: "Connect with Expert",
                description: "Start our conversation",
                href: "/contact",
                variant: "outline" as const,
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
                  className="group mb-2 sm:mb-3 w-full transition-all duration-300 min-h-[48px] touch-manipulation"
                  onClick={() => (window.location.href = cta.href)}
                >
                  <cta.icon size="lg" className="mr-2 sm:mr-3 flex-shrink-0" />
                  <span className="font-medium text-sm sm:text-base">
                    {cta.title}
                  </span>
                </Button>
                <p className="font-light text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                  {cta.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section
        id="core-values"
        className="relative bg-white dark:bg-gray-900 py-8 sm:py-12 lg:py-16 values-section"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,104,81,0.05)_0%,transparent_50%)]"></div>
        <div className="top-40 left-10 absolute bg-brand-secondary/10 blur-2xl rounded-full w-24 h-24"></div>
        <div className="right-10 bottom-20 absolute bg-brand-primary/10 blur-2xl rounded-full w-32 h-32"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-8 sm:mb-10 lg:mb-12 text-center scroll-reveal">
            <h2 className="mb-4 sm:mb-6 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
              <span className="block mb-2 sm:mb-3 font-semibold text-gray-700 dark:text-gray-300 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                Built on
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                Professional Foundation
              </span>
            </h2>
            <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide px-2">
              Our foundation rests on{" "}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                six core principles
              </span>{" "}
              that guide every partnership, every decision, and every
              collaborative relationship we build with{" "}
              <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary font-semibold text-transparent">
                trust as our ultimate goal
              </span>
              .
            </p>
          </div>

          <div className="gap-4 sm:gap-6 lg:gap-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                value: "Honesty & Transparency",
                icon: ({ size }: any) => (
                  <MaterialIcon
                    icon="visibility"
                    size={size}
                    className="text-current"
                  />
                ),
                description:
                  "We provide full-disclosure transparency from day one. Our open-dialogue progress meetings include all stakeholders, ensuring every topic is vetted and documented.",
                details:
                  "We believe you, the client, should have the most complete and up-to-date information—good or bad—to make truly educated decisions. We manage the project; you control it.",
                color: "from-brand-primary to-brand-accent",
                bgColor: "bg-brand-primary/5",
                stats: "Open-Book Progress Meetings",
              },
              {
                value: "Integrity",
                icon: ({ size }: any) => (
                  <MaterialIcon
                    icon="balance"
                    size={size}
                    className="text-current"
                  />
                ),
                description:
                  "Integrity is the unwavering commitment to our word. As a team built on principles of accountability and trust, we view our business conduct as a direct reflection of our personal character.",
                details:
                  "Our conversation, character, and conduct are consistently diligent, ensuring our actions on your project transcend the transactional relationship.",
                color: "from-forest-600 to-forest-800",
                bgColor: "bg-forest-100 dark:bg-forest-900",
                stats: "Character-Driven Conduct",
              },
              {
                value: "Precision & Experience",
                icon: ({ size }: any) => (
                  <MaterialIcon
                    icon="precision_manufacturing"
                    size={size}
                    className="text-current"
                  />
                ),
                description:
                  "With over 150 years of combined experience in commercial construction, we offer a project team that has seen and managed virtually every challenge.",
                details:
                  "This collective wisdom is delivered in a neat, engineer-driven project package, providing the reliable foresight necessary to keep your project on track and minimize risk.",
                color: "from-brand-secondary to-bronze-700",
                bgColor: "bg-brand-secondary/5",
                stats: "150+ Years Combined Experience",
              },
              {
                value: "Client-First Ethics",
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
                  "This means we are committed to acting solely in your best interest. We operate with discipline—staying organized, concise, and direct—so that your valuable time is respected and your decisions are always well-informed.",
                color: "from-brand-accent to-forest-800",
                bgColor: "bg-brand-accent/5",
                stats: "Client-Focused Approach",
              },
              {
                value: "Professionalism & Control",
                icon: ({ size }: any) => (
                  <MaterialIcon
                    icon="engineering"
                    size={size}
                    className="text-current"
                  />
                ),
                description:
                  "Professionalism here is the confident, controlled ability to navigate complex projects.",
                details:
                  "Decades of experience navigating complex projects with levelheaded management and coordinated workflow.",
                color: "from-bronze-600 to-bronze-800",
                bgColor: "bg-bronze-100 dark:bg-bronze-900",
                stats: "Harmonious Workflow Management",
              },
              {
                value: "Trust (The Culmination)",
                icon: ({ size }: any) => (
                  <MaterialIcon
                    icon="verified"
                    size={size}
                    className="text-current"
                  />
                ),
                description:
                  "Earning your trust is not a starting point; it is the culmination of our consistent performance in all other core values.",
                details:
                  "Trust is the measurable result that your project is on track, flowing smoothly, and supported by open, honest communication. We understand that your trust is the foundation upon which MH Construction exists.",
                color: "from-brand-primary to-brand-secondary",
                bgColor:
                  "bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5",
                stats: "Foundation of Our Existence",
              },
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.value}
                  className="group perspective-1000 scroll-reveal value-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative w-full h-auto min-h-[280px] sm:min-h-[320px] md:min-h-[360px] lg:min-h-[380px] group-hover:rotate-y-180 transition-transform duration-700 preserve-3d">
                    {/* Front of Card - Mobile optimized */}
                    <div className="absolute inset-0 bg-white dark:bg-gray-800 shadow-lg hover:shadow-brand-primary/10 hover:shadow-xl p-4 sm:p-6 lg:p-8 border border-gray-200 dark:border-gray-700 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 backface-hidden">
                      {/* Gradient Overlay */}
                      <div
                        className={`absolute inset-0 ${item.bgColor} rounded-2xl sm:rounded-3xl`}
                      ></div>

                      <div className="z-10 relative flex flex-col justify-between h-full text-center">
                        <div>
                          <div
                            className={`w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br ${item.color} rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg p-3`}
                          >
                            <IconComponent size="2xl" primaryColor="white" />
                          </div>
                          <h3 className="mb-3 sm:mb-4 font-black text-gray-900 dark:text-gray-100 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-tight tracking-tight">
                            {item.value}
                          </h3>
                          <p className="font-light text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-base leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        <div className="mt-4 font-semibold text-brand-primary dark:text-bronze-400 text-xs uppercase tracking-wider">
                          <span className="hidden sm:inline">
                            Hover to learn more
                          </span>
                          <span className="sm:hidden">Tap to learn more</span>
                        </div>
                      </div>
                    </div>

                    {/* Back of Card - Mobile optimized */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-brand-secondary shadow-xl hover:shadow-2xl p-3 sm:p-4 md:p-5 lg:p-6 rounded-2xl sm:rounded-3xl overflow-hidden rotate-y-180 transition-shadow duration-300 backface-hidden">
                      <div className="flex flex-col justify-between h-full text-white text-center">
                        <div className="flex-shrink-0">
                          <IconComponent
                            size="lg"
                            primaryColor="white"
                            className="mx-auto mb-2 sm:mb-3"
                          />
                          <h3 className="mb-2 font-black text-base sm:text-lg lg:text-xl">
                            {item.value} in Action
                          </h3>
                          <p className="mb-3 font-light text-white/90 text-sm sm:text-base leading-snug">
                            {item.details}
                          </p>
                        </div>

                        <div className="flex-shrink-0 bg-white/20 backdrop-blur-sm p-2 sm:p-3 md:p-4 border border-white/10 rounded-xl">
                          <div className="mb-1 sm:mb-2 font-medium text-white/80 text-xs sm:text-sm uppercase tracking-wider">
                            Key Metric
                          </div>
                          <div className="font-bold text-sm sm:text-base lg:text-lg xl:text-xl">
                            {item.stats}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Showcase of Services Section */}
      <section className="relative bg-white dark:bg-gray-900 py-8 sm:py-12 lg:py-16 showcase-section">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 dark:from-gray-800/50 to-white dark:to-gray-900"></div>
        <div className="top-20 right-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-32 h-32"></div>
        <div className="bottom-20 left-20 absolute bg-brand-secondary/5 blur-3xl rounded-full w-40 h-40"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-12 sm:mb-16 text-center">
            <h2 className="mb-4 sm:mb-6 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
              <span className="block mb-2 sm:mb-3 font-semibold text-gray-700 dark:text-gray-300 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                Showcase of
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                Services
              </span>
            </h2>
            <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide px-2">
              Discover our comprehensive construction management and commercial
              services throughout the{" "}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                Tri-Cities area
              </span>{" "}
              (Pasco, Kennewick, Richland). Each service represents our
              commitment to{" "}
              <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary font-semibold text-transparent">
                partnership excellence
              </span>{" "}
              and collaborative success.
            </p>
          </FadeInWhenVisible>

          {/* Service Cards Grid - Mobile optimized for 6 Cards */}
          <FadeInWhenVisible className="gap-4 sm:gap-6 lg:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {/* Construction Management */}
            <div className="group relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl p-4 sm:p-6 lg:p-8 border border-gray-200 dark:border-gray-700 rounded-2xl sm:rounded-3xl hover:scale-105 transition-all duration-300 min-h-[280px] sm:min-h-[320px]">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 group-hover:opacity-100 rounded-2xl sm:rounded-3xl transition-opacity duration-300"></div>
              <div className="relative flex flex-col h-full">
                <div className="flex justify-center items-center bg-brand-primary/10 mb-4 sm:mb-6 p-2 rounded-xl sm:rounded-2xl w-12 h-12 sm:w-16 sm:h-16">
                  <MaterialIcon
                    icon="explore"
                    size="lg"
                    className="text-brand-primary"
                  />
                </div>
                <h3 className="mb-3 sm:mb-4 font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand-primary text-lg sm:text-xl lg:text-2xl transition-colors">
                  Construction Management
                </h3>
                <p className="flex-grow mb-4 sm:mb-6 text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                  Full Construction Management (CM) services throughout the
                  Tri-Cities. We minimize "on-the-fly" decisions through
                  meticulous planning.
                </p>
                <div className="flex items-center mt-auto font-semibold text-brand-primary group-hover:text-brand-secondary text-sm sm:text-base transition-colors">
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
            <div className="group relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl p-4 sm:p-6 lg:p-8 border border-gray-200 dark:border-gray-700 rounded-2xl sm:rounded-3xl hover:scale-105 transition-all duration-300 min-h-[280px] sm:min-h-[320px]">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 group-hover:opacity-100 rounded-2xl sm:rounded-3xl transition-opacity duration-300"></div>
              <div className="relative flex flex-col h-full">
                <div className="flex justify-center items-center bg-brand-primary/10 mb-4 sm:mb-6 p-2 rounded-xl sm:rounded-2xl w-12 h-12 sm:w-16 sm:h-16">
                  <MaterialIcon
                    icon="architecture"
                    size="lg"
                    className="text-brand-primary"
                  />
                </div>
                <h3 className="mb-3 sm:mb-4 font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand-primary text-lg sm:text-xl lg:text-2xl transition-colors">
                  Master Planning
                </h3>
                <p className="flex-grow mb-4 sm:mb-6 text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                  Comprehensive Pre-Construction & Master Planning services.
                  Transform your vision into a practical, buildable reality.
                </p>
                <div className="flex items-center mt-auto font-semibold text-brand-primary group-hover:text-brand-secondary text-sm sm:text-base transition-colors">
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
            <div className="group relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl p-4 sm:p-6 lg:p-8 border border-gray-200 dark:border-gray-700 rounded-2xl sm:rounded-3xl hover:scale-105 transition-all duration-300 min-h-[280px] sm:min-h-[320px]">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 group-hover:opacity-100 rounded-2xl sm:rounded-3xl transition-opacity duration-300"></div>
              <div className="relative flex flex-col h-full">
                <div className="flex justify-center items-center bg-brand-primary/10 mb-4 sm:mb-6 p-2 rounded-xl sm:rounded-2xl w-12 h-12 sm:w-16 sm:h-16">
                  <MaterialIcon
                    icon="build"
                    size="lg"
                    className="text-brand-primary"
                  />
                </div>
                <h3 className="mb-3 sm:mb-4 font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand-primary text-lg sm:text-xl lg:text-2xl transition-colors">
                  Commercial Buildings
                </h3>
                <p className="flex-grow mb-4 sm:mb-6 text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                  Complete Commercial Construction Services for offices, retail,
                  and industrial facilities across WA, OR, and ID.
                </p>
                <div className="flex items-center mt-auto font-semibold text-brand-primary group-hover:text-brand-secondary text-sm sm:text-base transition-colors">
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
            <div className="group relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl p-4 sm:p-6 lg:p-8 border border-gray-200 dark:border-gray-700 rounded-2xl sm:rounded-3xl hover:scale-105 transition-all duration-300 min-h-[280px] sm:min-h-[320px]">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 group-hover:opacity-100 rounded-2xl sm:rounded-3xl transition-opacity duration-300"></div>
              <div className="relative flex flex-col h-full">
                <div className="flex justify-center items-center bg-brand-primary/10 mb-4 sm:mb-6 p-2 rounded-xl sm:rounded-2xl w-12 h-12 sm:w-16 sm:h-16">
                  <MaterialIcon
                    icon="straighten"
                    size="lg"
                    className="text-brand-primary"
                  />
                </div>
                <h3 className="mb-3 sm:mb-4 font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand-primary text-lg sm:text-xl lg:text-2xl transition-colors">
                  Medical Facilities
                </h3>
                <p className="flex-grow mb-4 sm:mb-6 text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                  Specialized medical facility construction and clinic design.
                  Precision planning for healthcare environments.
                </p>
                <div className="flex items-center mt-auto font-semibold text-brand-primary group-hover:text-brand-secondary text-sm sm:text-base transition-colors">
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
            <div className="group relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl p-4 sm:p-6 lg:p-8 border border-gray-200 dark:border-gray-700 rounded-2xl sm:rounded-3xl hover:scale-105 transition-all duration-300 min-h-[280px] sm:min-h-[320px]">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 group-hover:opacity-100 rounded-2xl sm:rounded-3xl transition-opacity duration-300"></div>
              <div className="relative flex flex-col h-full">
                <div className="flex justify-center items-center bg-brand-primary/10 mb-4 sm:mb-6 p-2 rounded-xl sm:rounded-2xl w-12 h-12 sm:w-16 sm:h-16">
                  <MaterialIcon
                    icon="construction"
                    size="lg"
                    className="text-brand-primary"
                  />
                </div>
                <h3 className="mb-3 sm:mb-4 font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand-primary text-lg sm:text-xl lg:text-2xl transition-colors">
                  Light Industrial
                </h3>
                <p className="flex-grow mb-4 sm:mb-6 text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                  Safe, durable, and highly functional industrial buildings.
                  Warehouses to processing plants built to your specifications.
                </p>
                <div className="flex items-center mt-auto font-semibold text-brand-primary group-hover:text-brand-secondary text-sm sm:text-base transition-colors">
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
            <div className="group relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl p-4 sm:p-6 lg:p-8 border border-gray-200 dark:border-gray-700 rounded-2xl sm:rounded-3xl hover:scale-105 transition-all duration-300 min-h-[280px] sm:min-h-[320px]">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 group-hover:opacity-100 rounded-2xl sm:rounded-3xl transition-opacity duration-300"></div>
              <div className="relative flex flex-col h-full">
                <div className="flex justify-center items-center bg-brand-primary/10 mb-4 sm:mb-6 p-2 rounded-xl sm:rounded-2xl w-12 h-12 sm:w-16 sm:h-16">
                  <MaterialIcon
                    icon="gps_fixed"
                    size="lg"
                    className="text-brand-primary"
                  />
                </div>
                <h3 className="mb-3 sm:mb-4 font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand-primary text-lg sm:text-xl lg:text-2xl transition-colors">
                  Tenant Improvements
                </h3>
                <p className="flex-grow mb-4 sm:mb-6 text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                  Expert Commercial Tenant Improvement (TI) Services. Transform
                  your commercial space into a functional, beautiful
                  environment.
                </p>
                <div className="flex items-center mt-auto font-semibold text-brand-primary group-hover:text-brand-secondary text-sm sm:text-base transition-colors">
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
      <section className="relative bg-gradient-to-b from-gray-50 dark:from-gray-800 to-white dark:to-gray-900 py-8 sm:py-12 lg:py-16 testimonials-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(189,146,100,0.05)_0%,transparent_50%)] opacity-60"></div>
        <div className="top-20 left-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-40 h-40"></div>
        <div className="right-20 bottom-20 absolute bg-brand-secondary/5 blur-3xl rounded-full w-32 h-32"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-12 sm:mb-16 lg:mb-20 text-center scroll-reveal">
            <h2 className="mb-4 sm:mb-6 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
              <span className="block mb-2 sm:mb-3 font-semibold text-gray-700 dark:text-gray-300 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                What Our
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                Clients Say
              </span>
            </h2>
            <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide px-2">
              Read testimonials from{" "}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                valued partners
              </span>{" "}
              across the Pacific Northwest who have experienced our{" "}
              <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary font-semibold text-transparent">
                collaborative excellence
              </span>{" "}
              firsthand.
            </p>
          </div>

          <div className="gap-4 sm:gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8 sm:mb-12">
            {[
              {
                name: "Sarah Thompson",
                location: "Spokane, WA",
                project: "Historic Home Renovation",
                rating: 5,
                review:
                  "MH Construction truly worked WITH us, not just for us. Their collaborative approach and attention to detail made our 1920s home renovation extraordinary. The partnership felt genuine, and they finished ahead of schedule!",
                image: "/images/testimonials/sarah-t.jpg",
              },
              {
                name: "Mike Chen",
                location: "Yakima, WA",
                project: "Modern Kitchen Remodel",
                rating: 5,
                review:
                  "The partnership approach made all the difference. They listened to our vision and made it better. Their veteran-owned values and collaborative planning exceeded our expectations in every way.",
                image: "/images/testimonials/mike-c.jpg",
              },
              {
                name: "Jessica Rodriguez",
                location: "Spokane, WA",
                project: "Luxury Bathroom Addition",
                rating: 5,
                review:
                  "As a fellow veteran, I appreciated their 'we work with you' philosophy. The partnership felt authentic - they became our advocates throughout the project. True collaboration that delivered exceptional results.",
                image: "/images/testimonials/jessica-r.jpg",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="group scroll-reveal testimonial-card"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative bg-white dark:bg-gray-800 shadow-lg group-hover:shadow-2xl p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl h-full antialiased transform-gpu transition-all duration-500 min-h-[280px] sm:min-h-[320px]">
                  {/* Quote Icon - Mobile optimized */}
                  <div className="top-4 right-4 sm:top-6 sm:right-6 absolute flex justify-center items-center bg-brand-secondary/10 p-2 rounded-full w-10 h-10 sm:w-12 sm:h-12 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-full h-full text-brand-secondary"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                    </svg>
                  </div>

                  <div className="flex items-start space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                    <div className="flex flex-shrink-0 justify-center items-center bg-gradient-to-br from-brand-primary to-brand-secondary shadow-lg p-2 sm:p-3 rounded-xl sm:rounded-2xl w-12 h-12 sm:w-16 sm:h-16 group-hover:scale-110 transition-transform duration-300">
                      <span className="font-bold text-white text-lg sm:text-2xl">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-1 sm:mb-2 font-black text-gray-900 dark:text-gray-100 text-lg sm:text-xl md:text-2xl tracking-tight">
                        {testimonial.name}
                      </h3>
                      <p className="mb-2 sm:mb-3 font-medium text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base tracking-wide">
                        {testimonial.location} •{" "}
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
                              size="sm"
                              className="text-yellow-400"
                            />
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  <blockquote className="font-light text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl italic leading-relaxed tracking-wide">
                    "{testimonial.review}"
                  </blockquote>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center scroll-reveal">
            <Link href="/testimonials">
              <Button
                variant="secondary"
                size="lg"
                className="group transition-all duration-300 w-full sm:w-auto min-h-[48px] touch-manipulation"
              >
                <MaterialIcon
                  icon="rate_review"
                  size="lg"
                  className="mr-2 sm:mr-3 flex-shrink-0"
                />
                <span className="font-medium text-sm sm:text-base">
                  View All Partnership Stories
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Smart Project Recommendations */}
      <section className="relative bg-white dark:bg-gray-900 py-8 sm:py-12 lg:py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            <div className="mb-8 sm:mb-12 text-center">
              <h2 className="mb-4 sm:mb-6 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
                <span className="block mb-2 sm:mb-3 font-semibold text-gray-700 dark:text-gray-300 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                  Smart Project
                </span>
                <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                  Recommendations
                </span>
              </h2>
              <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide px-2">
                Discover intelligent project recommendations based on{" "}
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  Pacific Northwest trends
                </span>{" "}
                and veteran preferences for{" "}
                <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary font-semibold text-transparent">
                  collaborative success
                </span>
                .
              </p>
            </div>

            <SmartRecommendations
              variant="compact"
              maxRecommendations={6}
              showVeteranBenefits={true}
              onRecommendationClick={(recommendation) => {
                // Track recommendation click on homepage
                if (typeof window !== "undefined" && window.gtag) {
                  window.gtag("event", "homepage_recommendation_click", {
                    project_type: recommendation.projectType,
                    confidence: recommendation.confidence,
                  });
                }
              }}
              onGetEstimate={(recommendation) => {
                // Navigate to estimator with pre-filled data
                if (typeof window !== "undefined") {
                  window.location.href = `/estimator?project=${encodeURIComponent(recommendation.projectType)}&title=${encodeURIComponent(recommendation.title)}`;
                }

                // Track estimate request from homepage recommendation
                if (typeof window !== "undefined" && window.gtag) {
                  window.gtag("event", "homepage_recommendation_estimate", {
                    project_type: recommendation.projectType,
                    estimated_value: recommendation.estimatedCost.min,
                  });
                }
              }}
              className="bg-gradient-to-br from-blue-50 dark:from-gray-800 to-indigo-100 dark:to-gray-700 shadow-lg p-4 sm:p-6 lg:p-8 rounded-xl"
            />
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Why Partner With MH Construction Section */}
      <section className="relative bg-gradient-to-br from-brand-primary via-brand-accent to-gray-900 py-8 sm:py-12 lg:py-16 text-white">
        <div className="z-10 relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Section Header */}
          <div className="mb-8 sm:mb-10 lg:mb-12 text-center scroll-reveal">
            <h2 className="mb-4 sm:mb-6 font-black text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
              <span className="block mb-2 sm:mb-3 font-semibold text-white/80 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                The MH Partnership
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-white via-brand-secondary to-white drop-shadow-sm text-transparent">
                Difference
              </span>
            </h2>

            <p className="mx-auto max-w-5xl font-light text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
              Experience the collaborative approach where veteran values and
              genuine partnership create extraordinary results.
            </p>

            {/* Core Philosophy Tagline */}
            <div className="mt-6 sm:mt-8 mb-3 sm:mb-4">
              <p className="mx-auto max-w-4xl font-bold text-white text-lg sm:text-xl md:text-2xl text-center leading-relaxed tracking-wide px-2">
                "Building for the Owner,{" "}
                <span className="font-black text-bronze-300 text-xl sm:text-2xl md:text-3xl">
                  NOT
                </span>{" "}
                the Dollar"
              </p>
            </div>
          </div>

          {/* Core Partnership Values - Mobile optimized 4 Flip Cards */}
          <div className="gap-3 sm:gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {/* Partnership Approach - We Work With You */}
            <div className="group h-56 sm:h-64 perspective-1000">
              <div className="relative h-full group-hover:rotate-y-180 transition-transform duration-700 preserve-3d">
                {/* Front of Card */}
                <div className="absolute inset-0 backface-hidden">
                  <div className="flex flex-col justify-center items-center bg-white/10 backdrop-blur-sm p-3 sm:p-4 border border-white/20 rounded-lg sm:rounded-xl h-full text-center">
                    <div className="mb-2 sm:mb-3">
                      <MaterialIcon
                        icon="security"
                        size="xl"
                        className="drop-shadow-lg mx-auto text-white"
                      />
                    </div>
                    <h3 className="font-black text-white text-lg sm:text-xl md:text-2xl tracking-tight">
                      We Work With You
                    </h3>
                    <p className="mt-1 text-white/70 text-xs">
                      <span className="hidden sm:inline">
                        Hover to learn more
                      </span>
                      <span className="sm:hidden">Tap to learn more</span>
                    </p>
                  </div>
                </div>

                {/* Back of Card */}
                <div className="absolute inset-0 rotate-y-180 backface-hidden">
                  <div className="flex flex-col justify-center bg-brand-primary/90 backdrop-blur-sm p-3 sm:p-4 border border-white/20 rounded-lg sm:rounded-xl h-full text-center">
                    <div className="mb-2 sm:mb-3">
                      <MaterialIcon
                        icon="security"
                        size="lg"
                        className="mx-auto text-white"
                      />
                    </div>
                    <h3 className="mb-2 sm:mb-3 font-black text-white text-base sm:text-lg md:text-xl">
                      True Collaboration
                    </h3>
                    <p className="text-white/90 text-xs sm:text-sm md:text-base leading-relaxed">
                      More than contractors - we're your construction partners.
                      Your vision combined with our veteran-led expertise
                      creates extraordinary results.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Community Focus */}
            <div className="group h-56 sm:h-64 perspective-1000">
              <div className="relative h-full group-hover:rotate-y-180 transition-transform duration-700 preserve-3d">
                {/* Front of Card */}
                <div className="absolute inset-0 backface-hidden">
                  <div className="flex flex-col justify-center items-center bg-white/10 backdrop-blur-sm p-3 sm:p-4 border border-white/20 rounded-lg sm:rounded-xl h-full text-center">
                    <div className="mb-2 sm:mb-3">
                      <MaterialIcon
                        icon="favorite"
                        size="xl"
                        className="mx-auto text-brand-secondary"
                      />
                    </div>
                    <h3 className="font-black text-white text-lg sm:text-xl md:text-2xl tracking-tight">
                      Community Centered
                    </h3>
                    <p className="mt-1 text-white/70 text-xs">
                      <span className="hidden sm:inline">
                        Hover to learn more
                      </span>
                      <span className="sm:hidden">Tap to learn more</span>
                    </p>
                  </div>
                </div>

                {/* Back of Card */}
                <div className="absolute inset-0 rotate-y-180 backface-hidden">
                  <div className="flex flex-col justify-center bg-brand-primary/90 backdrop-blur-sm p-3 sm:p-4 border border-white/20 rounded-lg sm:rounded-xl h-full text-center">
                    <div className="mb-2 sm:mb-3">
                      <MaterialIcon
                        icon="favorite"
                        size="lg"
                        className="mx-auto text-brand-secondary"
                      />
                    </div>
                    <h3 className="mb-2 sm:mb-3 font-black text-white text-base sm:text-lg md:text-xl">
                      Pacific Northwest Roots
                    </h3>
                    <p className="text-white/90 text-xs sm:text-sm md:text-base leading-relaxed">
                      Every project strengthens our shared community. Local
                      hiring, regional suppliers, and neighborhood focus.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Transparent Partnership */}
            <div className="group h-56 sm:h-64 perspective-1000">
              <div className="relative h-full group-hover:rotate-y-180 transition-transform duration-700 preserve-3d">
                {/* Front of Card */}
                <div className="absolute inset-0 backface-hidden">
                  <div className="flex flex-col justify-center items-center bg-white/10 backdrop-blur-sm p-3 sm:p-4 border border-white/20 rounded-lg sm:rounded-xl h-full text-center">
                    <div className="mb-2 sm:mb-3">
                      <MaterialIcon
                        icon="visibility"
                        size="xl"
                        className="drop-shadow-lg mx-auto text-brand-secondary"
                      />
                    </div>
                    <h3 className="font-black text-white text-lg sm:text-xl md:text-2xl tracking-tight">
                      Honest & Transparent
                    </h3>
                    <p className="mt-1 text-white/70 text-xs">
                      <span className="hidden sm:inline">
                        Hover to learn more
                      </span>
                      <span className="sm:hidden">Tap to learn more</span>
                    </p>
                  </div>
                </div>

                {/* Back of Card */}
                <div className="absolute inset-0 rotate-y-180 backface-hidden">
                  <div className="flex flex-col justify-center bg-brand-primary/90 backdrop-blur-sm p-3 sm:p-4 border border-white/20 rounded-lg sm:rounded-xl h-full text-center">
                    <div className="mb-2 sm:mb-3">
                      <MaterialIcon
                        icon="visibility"
                        size="lg"
                        className="mx-auto text-brand-secondary"
                      />
                    </div>
                    <h3 className="mb-2 sm:mb-3 font-black text-white text-base sm:text-lg md:text-xl">
                      No Surprises Partnership
                    </h3>
                    <p className="text-white/90 text-xs sm:text-sm md:text-base leading-relaxed">
                      Open pricing, honest timelines, and constant
                      communication. Veteran integrity means no hidden costs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lasting Relationships */}
            <div className="group h-56 sm:h-64 perspective-1000">
              <div className="relative h-full group-hover:rotate-y-180 transition-transform duration-700 preserve-3d">
                {/* Front of Card */}
                <div className="absolute inset-0 backface-hidden">
                  <div className="flex flex-col justify-center items-center bg-white/10 backdrop-blur-sm p-3 sm:p-4 border border-white/20 rounded-lg sm:rounded-xl h-full text-center">
                    <div className="mb-2 sm:mb-3">
                      <MaterialIcon
                        icon="handshake"
                        size="xl"
                        className="drop-shadow-lg mx-auto text-brand-secondary"
                      />
                    </div>
                    <h3 className="font-black text-white text-lg sm:text-xl md:text-2xl tracking-tight">
                      Lifelong Partners
                    </h3>
                    <p className="mt-1 text-white/70 text-xs">
                      <span className="hidden sm:inline">
                        Hover to learn more
                      </span>
                      <span className="sm:hidden">Tap to learn more</span>
                    </p>
                  </div>
                </div>

                {/* Back of Card */}
                <div className="absolute inset-0 rotate-y-180 backface-hidden">
                  <div className="flex flex-col justify-center bg-brand-primary/90 backdrop-blur-sm p-3 sm:p-4 border border-white/20 rounded-lg sm:rounded-xl h-full text-center">
                    <div className="mb-2 sm:mb-3">
                      <MaterialIcon
                        icon="handshake"
                        size="lg"
                        className="mx-auto text-brand-secondary"
                      />
                    </div>
                    <h3 className="mb-2 sm:mb-3 font-black text-white text-base sm:text-lg md:text-xl">
                      Beyond Project Completion
                    </h3>
                    <p className="text-white/90 text-xs sm:text-sm md:text-base leading-relaxed">
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
      <section className="relative bg-gradient-to-b from-gray-50 dark:from-gray-800 to-white dark:to-gray-900 py-8 sm:py-12 lg:py-16 blog-news-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(56,104,81,0.05)_0%,transparent_50%)] opacity-60"></div>
        <div className="top-20 right-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-32 h-32"></div>
        <div className="bottom-20 left-20 absolute bg-brand-secondary/5 blur-3xl rounded-full w-40 h-40"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible className="mb-12 sm:mb-16 text-center">
            <h2 className="mb-4 sm:mb-6 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
              <span className="block mb-2 sm:mb-3 font-semibold text-gray-700 dark:text-gray-300 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                Latest News &
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                Construction Insights
              </span>
            </h2>
            <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide px-2">
              Stay informed with{" "}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                construction industry insights
              </span>{" "}
              and the latest news from our veteran-owned team in the{" "}
              <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary font-semibold text-transparent">
                Pacific Northwest
              </span>
              .
            </p>
          </FadeInWhenVisible>

          {/* Blog/News Carousel removed for clean slate migration */}

          {/* View All Links - Redirected to About page sections */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mt-8 sm:mt-12 text-center">
            <Link href="/about#blog">
              <Button
                variant="secondary"
                size="lg"
                className="group transition-all duration-300 w-full sm:w-auto min-h-[48px] touch-manipulation"
              >
                <MaterialIcon
                  icon="article"
                  size="lg"
                  className="mr-2 sm:mr-3 flex-shrink-0"
                />
                <span className="font-medium text-sm sm:text-base">
                  Construction Insights
                </span>
              </Button>
            </Link>
            <Link href="/about#news">
              <Button
                variant="secondary"
                size="lg"
                className="group transition-all duration-300 w-full sm:w-auto min-h-[48px] touch-manipulation"
              >
                <MaterialIcon
                  icon="newspaper"
                  size="lg"
                  className="mr-2 sm:mr-3 flex-shrink-0"
                />
                <span className="font-medium text-sm sm:text-base">
                  Company News
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Partnership Call to Action Section */}
      <section
        id="partnership-cta"
        className="relative bg-gradient-to-br from-brand-primary via-brand-accent to-brand-secondary py-12 sm:py-16 lg:py-24 cta-section"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <FadeInWhenVisible>
            <h2 className="mb-4 sm:mb-6 font-black text-white text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
              Ready to Start Our Partnership?
            </h2>
            <p className="mx-auto mb-8 sm:mb-12 max-w-4xl font-light text-white/90 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed px-2">
              Join business partners across the{" "}
              <span className="font-medium text-white">Tri-Cities area</span>{" "}
              who chose collaborative construction management for their
              commercial, industrial, and medical facility projects.
            </p>

            {/* Commercial CTA Buttons - Mobile optimized 4 Button Grid */}
            <div className="gap-3 sm:gap-4 lg:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mx-auto mb-4 sm:mb-6 max-w-6xl">
              <Link href="/booking">
                <Button
                  variant="primary"
                  size="lg"
                  className="group w-full h-auto min-h-[56px] sm:min-h-[64px] transition-all duration-300 p-3 sm:p-4 touch-manipulation"
                >
                  <div className="flex flex-col justify-center items-center">
                    <MaterialIcon
                      icon="event"
                      size="lg"
                      className="flex-shrink-0 mb-1"
                    />
                    <span className="font-medium text-center text-xs sm:text-sm leading-tight">
                      Schedule Free
                      <br />
                      Consultation
                    </span>
                  </div>
                </Button>
              </Link>

              <Link href="/estimator">
                <Button
                  variant="secondary"
                  size="lg"
                  className="group w-full h-auto min-h-[56px] sm:min-h-[64px] transition-all duration-300 p-3 sm:p-4 touch-manipulation"
                >
                  <div className="flex flex-col justify-center items-center">
                    <MaterialIcon
                      icon="smart_toy"
                      size="lg"
                      className="flex-shrink-0 mb-1"
                    />
                    <span className="font-medium text-center text-xs sm:text-sm leading-tight">
                      Get Instant AI
                      <br />
                      Estimate
                    </span>
                  </div>
                </Button>
              </Link>

              <Link href="/projects">
                <Button
                  variant="secondary"
                  size="xl"
                  className="group w-full h-auto min-h-[64px] sm:min-h-[72px] transition-all duration-300 p-4 sm:p-5 touch-manipulation"
                >
                  <div className="flex flex-col justify-center items-center">
                    <MaterialIcon
                      icon="visibility"
                      size="xl"
                      className="flex-shrink-0 mb-1"
                    />
                    <span className="font-bold text-center text-sm sm:text-base leading-tight">
                      View Projects
                    </span>
                  </div>
                </Button>
              </Link>

              <a href="tel:+15093086489">
                <Button
                  variant="primary"
                  size="lg"
                  className="group w-full h-auto min-h-[56px] sm:min-h-[64px] transition-all duration-300 p-3 sm:p-4 touch-manipulation"
                >
                  <div className="flex flex-col justify-center items-center">
                    <MaterialIcon
                      icon="phone"
                      size="lg"
                      className="flex-shrink-0 mb-1"
                    />
                    <span className="font-medium text-center text-xs sm:text-sm leading-tight">
                      Call Now
                      <br />
                      (509) 308-6489
                    </span>
                  </div>
                </Button>
              </a>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </>
  );
}
