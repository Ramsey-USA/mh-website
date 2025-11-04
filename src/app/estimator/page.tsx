"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
} from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { getAIEstimatorSEO } from "@/lib/seo/page-seo-utils";
// Dynamically import heavy components
const EstimatorForm = dynamic(
  () =>
    import("../../components/estimator").then((mod) => ({
      default: mod.EstimatorForm,
    })),
  {
    loading: () => (
      <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-96 animate-pulse"></div>
    ),
    ssr: false,
  },
);
const SmartRecommendations = dynamic(
  () => import("../../components/recommendations/SmartRecommendations"),
  {
    loading: () => (
      <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 animate-pulse"></div>
    ),
    ssr: false,
  },
);
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
  HoverScale,
} from "@/components/animations/FramerMotionComponents";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { StructuredData } from "@/components/seo/enhanced-seo";

export default function EstimatorPage() {
  // Get SEO data for structured data
  const seoData = getAIEstimatorSEO();
  return (
    <>
      {/* Enhanced AI Estimator Structured Data for SEO */}
      <StructuredData data={seoData.schemas} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-primary via-brand-accent to-gray-900 pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_60%)] opacity-50"></div>
        <div className="top-20 right-20 absolute bg-brand-secondary/20 blur-3xl rounded-full w-64 h-64"></div>
        <div className="bottom-20 left-20 absolute bg-brand-primary/20 blur-3xl rounded-full w-80 h-80"></div>

        {/* Content */}
        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mx-auto max-w-5xl text-center">
            {/* Veteran Badge - Always Visible */}
            <div className="flex justify-center items-center gap-2 mb-4 sm:mb-6">
              <MaterialIcon
                icon="military_tech"
                size="lg"
                className="text-bronze-300"
              />
              <span className="font-semibold text-bronze-300 text-sm sm:text-base tracking-wide uppercase">
                Veteran-Owned Excellence
              </span>
            </div>

            {/* Main Title */}
            <h1
              className="mb-4 sm:mb-6 lg:mb-8 font-black text-white leading-none tracking-tighter"
              style={{ fontSize: "clamp(2rem, 8vw, 6rem)" }}
            >
              <span className="block">AI-Powered Cost</span>
              <span className="block mt-2 sm:mt-3 lg:mt-4 bg-clip-text bg-gradient-to-r from-bronze-300 to-bronze-100 text-transparent">
                Estimator
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="mx-auto mb-3 sm:mb-4 max-w-4xl font-light text-white/90 leading-relaxed tracking-wide px-2"
              style={{ fontSize: "clamp(1rem, 2.5vw, 2rem)" }}
            >
              Instant Preliminary Estimates • 24/7 Available • No Appointment
              Needed
            </p>

            {/* Partnership Tagline - Always Visible */}
            <p
              className="mx-auto mb-6 sm:mb-8 lg:mb-12 max-w-3xl font-bold text-white leading-relaxed"
              style={{ fontSize: "clamp(1.125rem, 3vw, 2.25rem)" }}
            >
              "Building for the Owner,{" "}
              <span
                className="font-black text-bronze-300"
                style={{ fontSize: "clamp(1.25rem, 3.5vw, 2.5rem)" }}
              >
                NOT
              </span>{" "}
              the Dollar"
            </p>

            {/* Description */}
            <FadeInWhenVisible>
              <p
                className="mx-auto mb-8 max-w-4xl font-medium text-white/80 leading-relaxed px-2"
                style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)" }}
              >
                AI-powered technology provides preliminary budget estimates for
                initial planning • For detailed analysis and custom solutions,
                schedule an in-person consultation
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-10 font-medium text-bronze-300 text-sm sm:text-base">
                <div className="flex items-center">
                  <MaterialIcon icon="flash_on" size="md" className="mr-2" />
                  <span>Under 5 Minutes</span>
                </div>
                <div className="flex items-center">
                  <MaterialIcon icon="analytics" size="md" className="mr-2" />
                  <span>Data-Driven</span>
                </div>
                <div className="flex items-center">
                  <MaterialIcon
                    icon="military_tech"
                    size="md"
                    className="mr-2"
                  />
                  <span>10% Veteran Discount</span>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>

        {/* Page-Specific Navigation Bar */}
        <PageNavigation
          items={navigationConfigs.estimator}
          className="absolute bottom-0 left-0 right-0"
        />
      </section>

      {/* Key Differences - AI vs In-Person Consultation */}
      <section className="py-20 lg:py-32 xl:py-40 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInWhenVisible>
            <div className="mb-16 lg:mb-24 text-center">
              <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                  Choose Your
                </span>
                <span className="block text-brand-primary dark:text-brand-primary font-black">
                  Path Forward
                </span>
              </h2>
              <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                Select the approach that best fits your project needs and
                timeline
              </p>
            </div>

            <div className="gap-8 grid md:grid-cols-2">
              {/* AI Estimator Card - LEATHER TAN (Secondary) */}
              <Card className="border-brand-secondary/30 dark:border-brand-secondary/40 hover:border-brand-secondary transition-all duration-300 shadow-xl hover:shadow-2xl">
                <CardHeader className="bg-gradient-to-br from-brand-secondary/10 to-brand-secondary/5 dark:from-brand-secondary/20 dark:to-brand-secondary/10 pb-8">
                  <div className="flex justify-center items-center mb-6">
                    <div className="flex justify-center items-center bg-brand-secondary/10 dark:bg-brand-secondary/20 shadow-lg backdrop-blur-sm w-20 h-20 border border-brand-secondary/30 rounded-full">
                      <MaterialIcon
                        icon="smart_toy"
                        size="lg"
                        className="text-brand-secondary"
                      />
                    </div>
                  </div>
                  <CardTitle className="mb-3 font-black text-3xl text-brand-secondary text-center">
                    AI Estimator
                  </CardTitle>
                  <p className="font-semibold text-brand-secondary/80 text-center text-lg">
                    Preliminary Budget Planning
                  </p>
                </CardHeader>
                <CardContent className="pt-8 pb-6">
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="flash_on"
                        size="sm"
                        className="flex-shrink-0 mr-3 mt-1 text-brand-secondary"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        <strong className="font-bold text-brand-secondary">
                          Instant Results:
                        </strong>{" "}
                        Under 5 minutes, 24/7 availability
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="analytics"
                        size="sm"
                        className="flex-shrink-0 mr-3 mt-1 text-brand-secondary"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        <strong className="font-bold text-brand-secondary">
                          Data-Driven:
                        </strong>{" "}
                        Based on 500+ completed projects
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="article"
                        size="sm"
                        className="flex-shrink-0 mr-3 mt-1 text-brand-secondary"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        <strong className="font-bold text-brand-secondary">
                          Preliminary Estimate:
                        </strong>{" "}
                        Budget range for initial planning
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="devices"
                        size="sm"
                        className="flex-shrink-0 mr-3 mt-1 text-brand-secondary"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        <strong className="font-bold text-brand-secondary">
                          No Appointment:
                        </strong>{" "}
                        Get started immediately online
                      </span>
                    </li>
                  </ul>
                  <div className="border-brand-secondary/20 bg-brand-secondary/5 dark:bg-brand-secondary/10 p-4 border-l-4 rounded">
                    <p className="font-medium text-brand-secondary text-sm">
                      <MaterialIcon
                        icon="lightbulb"
                        size="sm"
                        className="inline mr-2"
                      />
                      Perfect for preliminary budget planning and feasibility
                      assessment
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* In-Person Consultation Card - HUNTER GREEN (Primary) */}
              <Card className="border-brand-primary/30 dark:border-brand-primary/40 hover:border-brand-primary transition-all duration-300 shadow-xl hover:shadow-2xl">
                <CardHeader className="bg-gradient-to-br from-brand-primary/10 to-brand-primary/5 dark:from-brand-primary/20 dark:to-brand-primary/10 pb-8">
                  <div className="flex justify-center items-center mb-6">
                    <div className="flex justify-center items-center bg-brand-primary/10 dark:bg-brand-primary/20 shadow-lg backdrop-blur-sm w-20 h-20 border border-brand-primary/30 rounded-full">
                      <MaterialIcon
                        icon="engineering"
                        size="lg"
                        className="text-brand-primary"
                      />
                    </div>
                  </div>
                  <CardTitle className="mb-3 font-black text-3xl text-brand-primary text-center">
                    Expert Consultation
                  </CardTitle>
                  <p className="font-semibold text-brand-primary/80 text-center text-lg">
                    Detailed Custom Analysis
                  </p>
                </CardHeader>
                <CardContent className="pt-8 pb-6">
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="location_on"
                        size="sm"
                        className="flex-shrink-0 mr-3 mt-1 text-brand-primary"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        <strong className="font-bold text-brand-primary">
                          On-Site Visit:
                        </strong>{" "}
                        Comprehensive property assessment
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="handshake"
                        size="sm"
                        className="flex-shrink-0 mr-3 mt-1 text-brand-primary"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        <strong className="font-bold text-brand-primary">
                          Expert Analysis:
                        </strong>{" "}
                        30+ years of construction experience
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="construction"
                        size="sm"
                        className="flex-shrink-0 mr-3 mt-1 text-brand-primary"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        <strong className="font-bold text-brand-primary">
                          Custom Solutions:
                        </strong>{" "}
                        Tailored to your unique requirements
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="description"
                        size="sm"
                        className="flex-shrink-0 mr-3 mt-1 text-brand-primary"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        <strong className="font-bold text-brand-primary">
                          Detailed Quote:
                        </strong>{" "}
                        Accurate pricing with full scope breakdown
                      </span>
                    </li>
                  </ul>
                  <div className="border-brand-primary/20 bg-brand-primary/5 dark:bg-brand-primary/10 p-4 border-l-4 rounded">
                    <p className="font-medium text-brand-primary text-sm">
                      <MaterialIcon
                        icon="workspace_premium"
                        size="sm"
                        className="inline mr-2"
                      />
                      Essential for complex projects requiring expert custom
                      analysis
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Clear Guidance */}
            <div className="mt-12 text-center">
              <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                <strong className="text-gray-900 dark:text-white">
                  Not sure which to choose?
                </strong>{" "}
                Start with the AI Estimator for preliminary budget planning.
                We'll recommend an expert consultation when your project needs
                detailed analysis.
              </p>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* AI Estimator Benefits */}
      <section className="bg-white py-20 lg:py-32 xl:py-40">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            <div className="mb-16 lg:mb-24 text-center">
              <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                  Why Use Our
                </span>
                <span className="block text-brand-primary dark:text-brand-primary font-black">
                  AI Estimator?
                </span>
              </h2>
              <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                Get preliminary cost estimates instantly, powered by regional
                construction data and AI technology for initial budget planning
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            <HoverScale>
              <Card className="text-center h-full">
                <CardContent className="p-6">
                  <div className="flex justify-center items-center bg-brand-primary/10 mx-auto mb-4 rounded-full w-16 h-16">
                    <MaterialIcon
                      icon="speed"
                      className="w-8 h-8 text-brand-primary"
                    />
                  </div>
                  <h3 className="mb-2 font-semibold text-xl">Lightning Fast</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Complete estimates in under 5 minutes. No waiting, no
                    back-and-forth emails.
                  </p>
                </CardContent>
              </Card>
            </HoverScale>

            <HoverScale>
              <Card className="text-center h-full">
                <CardContent className="p-6">
                  <div className="flex justify-center items-center bg-brand-secondary/10 mx-auto mb-4 rounded-full w-16 h-16">
                    <MaterialIcon
                      icon="analytics"
                      className="w-8 h-8 text-brand-secondary"
                    />
                  </div>
                  <h3 className="mb-2 font-semibold text-xl">
                    Market-Based Calculations
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Trained on regional project data to provide helpful
                    preliminary cost estimates for Pacific Northwest
                    construction.
                  </p>
                </CardContent>
              </Card>
            </HoverScale>

            <HoverScale>
              <Card className="text-center h-full">
                <CardContent className="p-6">
                  <div className="flex justify-center items-center bg-brand-primary/10 mx-auto mb-4 rounded-full w-16 h-16">
                    <MaterialIcon
                      icon="savings"
                      className="w-8 h-8 text-brand-primary"
                    />
                  </div>
                  <h3 className="mb-2 font-semibold text-xl">
                    No Hidden Costs
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Transparent breakdown of materials, labor, permits, and all
                    associated costs.
                  </p>
                </CardContent>
              </Card>
            </HoverScale>
          </StaggeredFadeIn>
        </div>
      </section>

      {/* Main Estimator Form */}
      <section className="bg-gray-50 py-20 lg:py-32 xl:py-40">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            <div className="mb-16 lg:mb-24 text-center">
              <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                  Start Your
                </span>
                <span className="block text-brand-primary dark:text-brand-primary font-black">
                  AI Estimate
                </span>
              </h2>
              <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                Answer a few questions and get your preliminary construction
                estimate for budget planning
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
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 lg:py-32 xl:py-40">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            <SmartRecommendations
              variant="compact"
              maxRecommendations={6}
              showVeteranBenefits={true}
              onRecommendationClick={(recommendation) => {
                // Track recommendation click
                if (typeof window !== "undefined" && window.gtag) {
                  window.gtag("event", "estimator_recommendation_click", {
                    project_type: recommendation.projectType,
                    confidence: recommendation.confidence,
                  });
                }
              }}
              onGetEstimate={(recommendation) => {
                // Scroll back to estimator form and pre-fill
                const estimatorSection =
                  document.querySelector(".estimator-form");
                if (estimatorSection) {
                  estimatorSection.scrollIntoView({ behavior: "smooth" });
                }

                // Track estimate request from recommendation
                if (typeof window !== "undefined" && window.gtag) {
                  window.gtag("event", "recommendation_estimate_request", {
                    project_type: recommendation.projectType,
                    estimated_value: recommendation.estimatedCost.min,
                  });
                }
              }}
              className="bg-white shadow-lg p-8 rounded-xl"
            />
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-white py-20 lg:py-32 xl:py-40 border-t">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            <div className="gap-8 grid md:grid-cols-4 text-center">
              <div>
                <div className="mb-2 font-bold text-brand-primary text-3xl">
                  500+
                </div>
                <p className="text-gray-600">Projects in AI Database</p>
              </div>
              <div>
                <div className="mb-2 font-bold text-brand-primary text-3xl">
                  95%
                </div>
                <p className="text-gray-600">Accuracy Rate</p>
              </div>
              <div>
                <div className="mb-2 font-bold text-brand-primary text-3xl">
                  30+
                </div>
                <p className="text-gray-600">Years Experience</p>
              </div>
              <div>
                <div className="mb-2 font-bold text-brand-primary text-3xl">
                  24/7
                </div>
                <p className="text-gray-600">Always Available</p>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* CTA for Complex Projects */}
      <section className="bg-gradient-to-r from-gray-900 to-brand-primary-dark py-20 lg:py-32 xl:py-40 text-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <FadeInWhenVisible>
            <h2 className="mb-8 pb-2 font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
              <span className="block mb-4 font-semibold text-white/80 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                Need Detailed
              </span>
              <span className="block text-brand-secondary font-black">
                Analysis?
              </span>
            </h2>
            <p className="mx-auto mb-10 max-w-4xl text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed">
              For complex projects, unique sites, or custom architectural
              features, our expert team provides detailed consultations and site
              evaluations.
            </p>
            <div className="flex sm:flex-row flex-col justify-center gap-4">
              <Link href="/booking">
                <Button variant="primary" size="lg">
                  <MaterialIcon icon="event" size="lg" className="mr-3" />
                  Schedule Free Consultation
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="hover:bg-white border-white text-white hover:text-gray-900"
                >
                  <MaterialIcon icon="phone" size="lg" className="mr-3" />
                  Contact Us Directly
                </Button>
              </Link>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </>
  );
}
