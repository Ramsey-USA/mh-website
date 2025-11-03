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
  }
);
const SmartRecommendations = dynamic(
  () => import("../../components/recommendations/SmartRecommendations"),
  {
    loading: () => (
      <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 animate-pulse"></div>
    ),
    ssr: false,
  }
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
      <section className="relative bg-gradient-to-br from-gray-900 via-brand-secondary to-gray-900 min-h-screen flex items-center justify-center text-white">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/30 via-gray-900/80 to-brand-primary/20"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 sm:py-0">
          <FadeInWhenVisible className="space-y-6 sm:space-y-8">
            {/* AI Technology Badge */}
            <div className="inline-flex items-center bg-brand-secondary/10 dark:bg-brand-secondary/20 shadow-lg backdrop-blur-sm mb-4 px-6 py-3 border border-brand-secondary/20 dark:border-brand-secondary/30 rounded-full">
              <MaterialIcon
                icon="smart_toy"
                size="sm"
                className="text-brand-secondary"
              />
              <span className="ml-3 font-bold text-brand-secondary text-xs uppercase tracking-wider">
                AI-Powered Technology
              </span>
            </div>

            {/* Primary Tagline - MH Branding Standard */}
            <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 border border-white/20 rounded-xl inline-block">
              <p className="text-base sm:text-lg md:text-xl font-semibold text-brand-secondary tracking-wide">
                "Building for the Owner, NOT the Dollar"
              </p>
            </div>

            {/* Main Title with Proper Gradient - MH Typography Standards */}
            <h1 className="mb-6 pb-2 font-black text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-relaxed tracking-tighter">
              <span className="block mb-3 font-semibold text-white/80 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight">
                AI Cost Estimator
              </span>
              <span className="block bg-clip-text bg-gradient-to-r from-brand-secondary via-white to-brand-secondary drop-shadow-lg text-transparent">
                Budget Planning Tool
              </span>
            </h1>

            {/* Description - Clear AI Positioning */}
            <p className="max-w-4xl mx-auto font-light text-white/90 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide">
              Instant Preliminary Estimates • 24/7 Available • No Appointment
              Needed
            </p>

            {/* Subtitle */}
            <p className="max-w-4xl mx-auto text-base sm:text-lg md:text-xl text-white/80 leading-relaxed">
              AI-powered technology provides preliminary budget estimates for
              initial planning. For detailed analysis and custom solutions,
              schedule an in-person consultation.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 font-medium text-brand-secondary text-sm sm:text-base">
              <div className="flex items-center">
                <MaterialIcon icon="flash_on" size="sm" className="mr-2" />
                <span>Under 5 Minutes</span>
              </div>
              <div className="flex items-center">
                <MaterialIcon icon="analytics" size="sm" className="mr-2" />
                <span>Data-Driven</span>
              </div>
              <div className="flex items-center">
                <MaterialIcon icon="military_tech" size="sm" className="mr-2" />
                <span>10% Veteran Discount</span>
              </div>
            </div>
          </FadeInWhenVisible>
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
              <h2 className="mb-6 pb-2 font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
                <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent drop-shadow-sm">
                  Choose Your Path Forward
                </span>
              </h2>
              <p className="max-w-4xl mx-auto text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
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
              <h2 className="mb-6 pb-2 font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
                <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent drop-shadow-sm">
                  Why Use Our AI Estimator?
                </span>
              </h2>
              <p className="mx-auto max-w-4xl text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Get preliminary cost estimates instantly, powered by regional
                construction data and AI technology for initial budget planning
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="gap-8 grid md:grid-cols-3 mb-12">
            <StaggeredFadeIn>
              <HoverScale>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="flex justify-center items-center bg-brand-primary/10 mx-auto mb-4 rounded-full w-16 h-16">
                      <MaterialIcon
                        icon="speed"
                        className="w-8 h-8 text-brand-primary"
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
                      Market-Based Calculations
                    </h3>
                    <p className="text-gray-600">
                      Trained on regional project data to provide helpful
                      preliminary cost estimates for Pacific Northwest
                      construction.
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
      <section className="bg-gray-50 py-20 lg:py-32 xl:py-40">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            <div className="mb-16 lg:mb-24 text-center">
              <h2 className="mb-6 pb-2 font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
                <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent drop-shadow-sm">
                  Start Your AI Estimate
                </span>
              </h2>
              <p className="max-w-4xl mx-auto text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed">
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
            <h2 className="mb-6 pb-2 font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
              <span className="block bg-clip-text bg-gradient-to-r from-white to-brand-secondary text-transparent drop-shadow-sm">
                Need Detailed Analysis?
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
