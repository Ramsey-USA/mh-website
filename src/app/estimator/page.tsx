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

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MH Construction AI Estimator",
  description:
    "AI-powered construction estimator providing preliminary cost estimates for Pacific Northwest construction project planning.",
  url: "https://mhconstruction.com/estimator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free AI-powered construction estimates",
  },
  provider: {
    "@type": "Organization",
    name: "MH Construction",
    url: "https://mhconstruction.com",
    logo: "https://mhconstruction.com/images/logo/mh-logo.png",
    sameAs: [
      "https://www.facebook.com/MHConstructionNW",
      "https://www.linkedin.com/company/mh-construction",
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "150",
  },
  featureList: [
    "Preliminary cost estimates",
    "Regional pricing data",
    "Veteran discounts",
    "Pacific Northwest focus",
    "No registration required",
    "24/7 availability",
  ],
};

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
      <section className="relative bg-gradient-to-br from-gray-900 via-[#386851] to-gray-900 min-h-screen flex items-center justify-center text-white">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#386851]/30 via-gray-900/80 to-[#BD9264]/20"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
              <span className="block bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white text-transparent drop-shadow-lg">
                Partnership Cost Estimator
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl md:text-3xl text-white/90 leading-relaxed">
              Get preliminary cost estimates through our AI-powered technology
            </p>

            {/* Description */}
            <p className="max-w-4xl mx-auto text-lg md:text-xl text-white/80 leading-relaxed">
              AI-powered cost estimation technology provides preliminary budget
              estimates based on Pacific Northwest construction data.
            </p>
          </div>
        </div>

        {/* Page-Specific Navigation Bar */}
        <PageNavigation
          items={navigationConfigs.estimator}
          className="absolute bottom-0 left-0 right-0"
        />
      </section>

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
                    <CardTitle>Partnership AI Estimates</CardTitle>
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
                        <p className="font-semibold">Data-Driven Estimates</p>
                        <p className="text-gray-600 text-sm">
                          AI-powered calculations using regional market data
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
                        <p className="font-semibold">Partnership Service</p>
                        <p className="text-gray-600 text-sm">
                          Direct access to your project partner
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t">
                    <Link href="/booking">
                      <Button variant="primary" className="w-full">
                        <MaterialIcon icon="event" className="mr-2" />
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
                <span className="text-gray-700 dark:text-gray-300">
                  Why Use Our Partnership
                </span>{" "}
                <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent">
                  AI Estimator?
                </span>
              </h2>
              <p className="mx-auto max-w-3xl text-gray-600 dark:text-gray-300 text-xl">
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
      <section className="bg-gray-50 py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            <div className="mb-8 text-center">
              <h2 className="mb-4 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                <span className="text-gray-700">Start Your</span>{" "}
                <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent">
                  AI Estimate
                </span>
              </h2>
              <p className="text-gray-600 text-lg">
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
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
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
              <span className="text-white/90">Need a More</span>{" "}
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
                <Button variant="primary" size="lg">
                  <MaterialIcon icon="event" className="mr-2 w-5 h-5" />
                  Schedule Free Consultation
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
  );
}
