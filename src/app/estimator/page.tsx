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
import { getAutomatedEstimatorSEO } from "@/lib/seo/page-seo-utils";
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
import { UnderConstruction } from "@/components/layout/UnderConstruction";

// Feature flag - set to false to show full page content
const SHOW_UNDER_CONSTRUCTION = true;

import {
  FadeInWhenVisible,
  StaggeredFadeIn,
  HoverScale,
} from "@/components/animations/FramerMotionComponents";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { StructuredData } from "@/components/seo/enhanced-seo";

export default function EstimatorPage() {
  // Show under construction notice while preserving all content below
  if (SHOW_UNDER_CONSTRUCTION) {
    return (
      <UnderConstruction
        pageName="Budget Estimator"
        description="We're calibrating our AI-powered budget estimator to provide the most accurate project cost estimates. Contact us for a detailed quote."
        estimatedCompletion="December 2025"
      />
    );
  }

  // Original page content preserved below - will be shown when flag is set to false
  // Get SEO data for structured data
  const seoData = getAutomatedEstimatorSEO();
  return (
    <>
      {/* Enhanced AI Estimator Structured Data for SEO */}
      <StructuredData data={seoData.schemas} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-20 sm:pb-24 md:pb-28 lg:pb-32">
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            {/* Main Title */}
            <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight">
              <span className="block text-brand-secondary font-black drop-shadow-lg">
                Smart Planning Starts Here
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug px-2">
              AI-Powered Estimation • Human-Centered Partnership • Building for
              the Client,{" "}
              <span className="font-black text-bronze-300">NOT</span> the Dollar
            </p>

            {/* Description */}
            <p className="max-w-4xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed px-4">
              Where data meets decades of experience. Our AI-powered estimator
              combines insights from 500+ completed projects with 150+ years of
              veteran expertise—but it's just the starting point. "Building for
              the Client,{" "}
              <span className="font-black text-bronze-300">NOT</span> the
              Dollar" means technology that enhances, never replaces, the
              personal consultation where handshakes and trust matter most.
              Smart tools for smarter planning, human partnerships for lasting
              success.
            </p>
          </div>
        </div>

        {/* Page-Specific Navigation Bar */}
        <PageNavigation
          items={navigationConfigs.estimator}
          className="absolute bottom-0 left-0 right-0"
        />
      </section>

      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Budget Tool" }]}
      />

      {/* Key Differences - Quick Tool vs Personal Consultation */}
      <section className="py-20 lg:py-32 xl:py-40 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInWhenVisible>
            <div className="mb-16 lg:mb-24 text-center">
              <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                  We Recommend
                </span>
                <span className="block text-brand-primary dark:text-brand-primary font-black">
                  Personal Consultation First
                </span>
              </h2>
              <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-4 break-words">
                Real partnerships start with real conversations. While our quick
                budget tool can help with preliminary planning, accurate
                estimates and genuine partnerships are built face-to-face where
                we shake hands and earn your trust through honest dialogue.
              </p>
            </div>

            <div className="gap-8 grid md:grid-cols-2">
              {/* Personal Consultation Card - HUNTER GREEN (PRIMARY) - RECOMMENDED */}
              <Card className="border-brand-primary/30 dark:border-brand-primary/40 hover:border-brand-primary transition-all duration-300 shadow-xl hover:shadow-2xl relative">
                {/* RECOMMENDED Badge */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-brand-primary text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2">
                    <MaterialIcon icon="star" size="sm" />
                    RECOMMENDED
                  </div>
                </div>
                <CardHeader className="bg-gradient-to-br from-brand-primary/10 to-brand-primary/5 dark:from-brand-primary/20 dark:to-brand-primary/10 pb-8 pt-10">
                  <div className="flex justify-center items-center mb-6">
                    <div className="flex justify-center items-center bg-brand-primary/10 dark:bg-brand-primary/20 shadow-lg backdrop-blur-sm w-20 h-20 border border-brand-primary/30 rounded-full">
                      <MaterialIcon
                        icon="handshake"
                        size="lg"
                        className="text-brand-primary"
                      />
                    </div>
                  </div>
                  <CardTitle className="mb-3 font-black text-3xl text-brand-primary text-center">
                    Personal Consultation
                  </CardTitle>
                  <p className="font-semibold text-brand-primary/80 text-center text-lg">
                    Where Partnerships Begin
                  </p>
                </CardHeader>
                <CardContent className="pt-8 pb-6">
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="person"
                        size="sm"
                        className="flex-shrink-0 mr-3 mt-1 text-brand-primary"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        <strong className="font-bold text-brand-primary">
                          Face-to-Face Trust:
                        </strong>{" "}
                        Meet in person where handshakes still matter
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="visibility"
                        size="sm"
                        className="flex-shrink-0 mr-3 mt-1 text-brand-primary"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        <strong className="font-bold text-brand-primary">
                          Complete Transparency:
                        </strong>{" "}
                        Open-book pricing with no hidden costs
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="engineering"
                        size="sm"
                        className="flex-shrink-0 mr-3 mt-1 text-brand-primary"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        <strong className="font-bold text-brand-primary">
                          Expert Assessment:
                        </strong>{" "}
                        Detailed on-site evaluation by experienced professionals
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="verified"
                        size="sm"
                        className="flex-shrink-0 mr-3 mt-1 text-brand-primary"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        <strong className="font-bold text-brand-primary">
                          Accurate Pricing:
                        </strong>{" "}
                        Customized estimates based on your specific needs
                      </span>
                    </li>
                  </ul>
                  <div className="border-brand-primary/20 bg-brand-primary/5 dark:bg-brand-primary/10 p-4 border-l-4 rounded">
                    <p className="font-medium text-brand-primary text-sm">
                      <MaterialIcon
                        icon="star"
                        size="sm"
                        className="inline mr-2"
                      />
                      This is how we prefer to start every project—building
                      trust through personal connection.
                    </p>
                  </div>
                  <Link href="/booking" className="mt-6 block">
                    <Button
                      size="lg"
                      className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-bold text-lg h-14"
                    >
                      Schedule Free Consultation
                      <MaterialIcon icon="arrow_forward" className="ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Quick Budget Tool Card - LEATHER TAN (Secondary) - Optional Helper */}
              <Card className="border-brand-secondary/30 dark:border-brand-secondary/40 hover:border-brand-secondary transition-all duration-300 shadow-xl hover:shadow-2xl">
                <CardHeader className="bg-gradient-to-br from-brand-secondary/10 to-brand-secondary/5 dark:from-brand-secondary/20 dark:to-brand-secondary/10 pb-8">
                  <div className="flex justify-center items-center mb-6">
                    <div className="flex justify-center items-center bg-brand-secondary/10 dark:bg-brand-secondary/20 shadow-lg backdrop-blur-sm w-20 h-20 border border-brand-secondary/30 rounded-full">
                      <MaterialIcon
                        icon="calculate"
                        size="lg"
                        className="text-brand-secondary"
                      />
                    </div>
                  </div>
                  <CardTitle className="mb-3 font-black text-3xl text-brand-secondary text-center">
                    Quick Budget Tool
                  </CardTitle>
                  <p className="font-semibold text-brand-secondary/80 text-center text-lg">
                    Preliminary Planning Helper
                  </p>
                </CardHeader>
                <CardContent className="pt-8 pb-6">
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="schedule"
                        size="sm"
                        className="flex-shrink-0 mr-3 mt-1 text-brand-secondary"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        <strong className="font-bold text-brand-secondary">
                          Convenient:
                        </strong>{" "}
                        Available 24/7 for preliminary planning
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="insights"
                        size="sm"
                        className="flex-shrink-0 mr-3 mt-1 text-brand-secondary"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        <strong className="font-bold text-brand-secondary">
                          Helpful Guidance:
                        </strong>{" "}
                        Based on 500+ completed projects
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="description"
                        size="sm"
                        className="flex-shrink-0 mr-3 mt-1 text-brand-secondary"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        <strong className="font-bold text-brand-secondary">
                          Budget Range:
                        </strong>{" "}
                        General estimates for initial planning
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="trending_up"
                        size="sm"
                        className="flex-shrink-0 mr-3 mt-1 text-brand-secondary"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        <strong className="font-bold text-brand-secondary">
                          Next Step:
                        </strong>{" "}
                        Prepares you for personal consultation
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
                      Perfect for preliminary budget planning—then schedule your
                      personal consultation for accurate estimates.
                    </p>
                  </div>
                  <div className="mt-6 text-center">
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      Use the tool below, then book your consultation
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
      <section className="bg-white dark:bg-gray-900 py-20 lg:py-32 xl:py-40">
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
                by award-winning safety (.64 EMR) and 150+ years combined team
                experience for accurate initial budget planning
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className={gridPresets.cards3("lg", "mb-12")}>
            <HoverScale>
              <Card className="text-center h-full flex flex-col">
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-center items-center bg-brand-primary/10 mx-auto mb-4 rounded-full w-16 h-16">
                    <MaterialIcon
                      icon="speed"
                      className="w-8 h-8 text-brand-primary"
                    />
                  </div>
                  <h3 className="mb-3 font-semibold text-xl min-h-[2rem]">
                    Lightning Fast
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 flex-grow">
                    Complete estimates in under 5 minutes. No waiting, no
                    back-and-forth emails.
                  </p>
                </CardContent>
              </Card>
            </HoverScale>

            <HoverScale>
              <Card className="text-center h-full flex flex-col">
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-center items-center bg-brand-secondary/10 mx-auto mb-4 rounded-full w-16 h-16">
                    <MaterialIcon
                      icon="analytics"
                      className="w-8 h-8 text-brand-secondary"
                    />
                  </div>
                  <h3 className="mb-3 font-semibold text-xl min-h-[2rem]">
                    Pacific Northwest Market-Based
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 flex-grow">
                    Trained on regional project data from WA, OR, and ID to
                    provide helpful preliminary cost estimates specific to
                    Pacific Northwest construction markets and building
                    requirements.
                  </p>
                </CardContent>
              </Card>
            </HoverScale>

            <HoverScale>
              <Card className="text-center h-full flex flex-col">
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-center items-center bg-brand-primary/10 mx-auto mb-4 rounded-full w-16 h-16">
                    <MaterialIcon
                      icon="savings"
                      className="w-8 h-8 text-brand-primary"
                    />
                  </div>
                  <h3 className="mb-3 font-semibold text-xl min-h-[2rem]">
                    Transparent Open-Book Pricing
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 flex-grow">
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
      <section className="bg-gray-50 dark:bg-gray-800 py-20 lg:py-32 xl:py-40">
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
              or projects requiring award-winning safety management (.64 EMR),
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
