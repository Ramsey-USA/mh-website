"use client";

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
import { gridPresets } from "@/lib/styles/layout-variants";
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
      <section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-24 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20 lg:pb-28">
          <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
            {/* Main Title */}
            <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight">
              <span className="block text-brand-secondary font-black drop-shadow-lg">
                AI-Powered Cost Estimator
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug px-2">
              Instant Preliminary Estimates • 24/7 Available • No Appointment
              Needed
            </p>

            {/* Description */}
            <p className="max-w-4xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed px-4">
              Smart Planning Starts Here. AI-powered technology from our
              veteran-owned team (January 2025) provides preliminary budget
              estimates for initial planning across the Pacific Northwest.
              Backed by award-winning safety (.6 EMR) and 150+ years combined
              team experience. For detailed analysis, custom solutions,
              transparent open-book pricing, and partnership-driven
              collaboration, schedule an in-person consultation where you
              control it, we manage it.
            </p>
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
              <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-4 break-words">
                Select the approach that best fits your project needs and
                timeline—from instant AI estimates for quick budget planning to
                comprehensive expert consultations for complex projects
                requiring detailed analysis
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
                          Data-Driven Intelligence:
                        </strong>{" "}
                        Based on 500+ completed projects and 150+ years combined
                        team experience
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
                          Expert Partnership Analysis:
                        </strong>{" "}
                        150+ years combined experience, veteran-owned leadership
                        with military precision
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
                          Transparent Detailed Quote:
                        </strong>{" "}
                        Accurate open-book pricing with full scope breakdown—no
                        hidden costs
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
              <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-4 break-words">
                Get preliminary cost estimates instantly, powered by regional
                Pacific Northwest construction data, AI technology, and backed
                by award-winning safety (.6 EMR) and 150+ years combined team
                experience for accurate initial budget planning
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className={gridPresets.cards3("lg", "mb-12")}>
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
                    Pacific Northwest Market-Based
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Trained on regional project data from WA, OR, and ID to
                    provide helpful preliminary cost estimates specific to
                    Pacific Northwest construction markets and building
                    requirements.
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
                    Transparent Open-Book Pricing
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Transparent breakdown of materials, labor, permits, and all
                    associated costs. No hidden surprises—honest assessments you
                    can trust for budget planning.
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
                estimate for budget planning—backed by veteran-owned expertise
                and award-winning quality standards
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
              For complex projects, unique sites, custom architectural features,
              or projects requiring award-winning safety management (.6 EMR),
              our veteran-owned expert team provides detailed consultations,
              site evaluations, and transparent open-book pricing with 150+
              years combined experience.
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
