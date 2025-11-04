"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
  HoverScale,
} from "@/components/animations/FramerMotionComponents";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";

// Trade Partner Categories
const partnerCategories = [
  {
    category: "Electrical Contractors",
    icon: "electrical_services",
    description:
      "Licensed electrical professionals providing safe, code-compliant installations",
    partners: [
      {
        name: "Pacific Northwest Electric",
        specialty: "Commercial & Industrial Electrical",
        yearsWorking: "8+ years",
        location: "Tri-Cities, WA",
        description:
          "Specializing in high-voltage commercial installations and industrial electrical systems.",
      },
      {
        name: "Columbia Basin Electrical",
        specialty: "Residential & Light Commercial",
        yearsWorking: "5+ years",
        location: "Pasco, WA",
        description:
          "Expert residential electrical work and light commercial electrical installations.",
      },
    ],
  },
  {
    category: "Plumbing Contractors",
    icon: "plumbing",
    description:
      "Expert plumbing professionals for all water, sewer, and gas line needs",
    partners: [
      {
        name: "Tri-Cities Plumbing Solutions",
        specialty: "Commercial Plumbing Systems",
        yearsWorking: "6+ years",
        location: "Richland, WA",
        description:
          "Commercial plumbing specialists with expertise in large-scale water and sewer systems.",
      },
      {
        name: "Desert Plumbing & Heating",
        specialty: "HVAC & Plumbing Integration",
        yearsWorking: "4+ years",
        location: "Kennewick, WA",
        description:
          "Combined plumbing and HVAC services for comprehensive building system solutions.",
      },
    ],
  },
  {
    category: "HVAC Specialists",
    icon: "hvac",
    description:
      "Climate control experts ensuring comfortable, efficient building environments",
    partners: [
      {
        name: "Columbia River HVAC",
        specialty: "Commercial Climate Systems",
        yearsWorking: "7+ years",
        location: "Tri-Cities, WA",
        description:
          "Large-scale commercial HVAC installations and energy-efficient climate solutions.",
      },
      {
        name: "Valley Air Systems",
        specialty: "Industrial HVAC Solutions",
        yearsWorking: "5+ years",
        location: "Pasco, WA",
        description:
          "Industrial-grade heating, ventilation, and air conditioning for specialized facilities.",
      },
    ],
  },
  {
    category: "Concrete & Masonry",
    icon: "foundation",
    description:
      "Foundation and structural concrete experts building solid foundations",
    partners: [
      {
        name: "Northwest Concrete Works",
        specialty: "Foundation & Structural Concrete",
        yearsWorking: "10+ years",
        location: "Tri-Cities, WA",
        description:
          "Premier concrete contractors specializing in foundations, slabs, and structural elements.",
      },
      {
        name: "Columbia Masonry",
        specialty: "Decorative & Structural Masonry",
        yearsWorking: "6+ years",
        location: "Richland, WA",
        description:
          "Expert masonry work including brick, block, and stone for both aesthetic and structural applications.",
      },
    ],
  },
  {
    category: "Roofing Specialists",
    icon: "roofing",
    description:
      "Professional roofing contractors protecting every project from the elements",
    partners: [
      {
        name: "Pacific Roofing Solutions",
        specialty: "Commercial & Industrial Roofing",
        yearsWorking: "9+ years",
        location: "Tri-Cities, WA",
        description:
          "Commercial roofing specialists with expertise in flat, metal, and specialty roofing systems.",
      },
      {
        name: "Desert Shield Roofing",
        specialty: "Weather-Resistant Systems",
        yearsWorking: "4+ years",
        location: "Pasco, WA",
        description:
          "Specialized in durable roofing solutions designed for the Pacific Northwest climate.",
      },
    ],
  },
  {
    category: "Material Suppliers",
    icon: "local_shipping",
    description:
      "Reliable suppliers providing quality materials for every construction need",
    partners: [
      {
        name: "Columbia Building Supply",
        specialty: "Lumber & Building Materials",
        yearsWorking: "12+ years",
        location: "Tri-Cities, WA",
        description:
          "Full-service building supply with lumber, hardware, and construction materials.",
      },
      {
        name: "Northwest Steel & Supply",
        specialty: "Structural Steel & Metal",
        yearsWorking: "8+ years",
        location: "Richland, WA",
        description:
          "Industrial steel supplier providing structural steel, metal fabrication, and welding materials.",
      },
    ],
  },
];

// Trade Partnership values - Focused on vendor relationships
const partnershipValues = [
  {
    icon: "handshake",
    title: "Professional Respect",
    description:
      "We treat our trade partners as valued business allies, building relationships on mutual respect, trust, and shared commitment to quality.",
    color: "from-brand-primary to-brand-primary-dark",
  },
  {
    icon: "schedule",
    title: "Reliable Scheduling",
    description:
      "Transparent communication and dependable project timelines help our trade partners plan effectively and manage their resources with confidence.",
    color: "from-brand-secondary to-brand-secondary-dark",
  },
  {
    icon: "payments",
    title: "Fair & Prompt Payment",
    description:
      "Competitive compensation and reliable payment schedules support the financial health and business growth of our trade partners.",
    color: "from-brand-accent to-brand-accent-dark",
  },
  {
    icon: "support",
    title: "Collaborative Excellence",
    description:
      "Working together to solve challenges, share expertise, and deliver exceptional results that benefit all parties and strengthen our network.",
    color: "from-brand-primary-light to-brand-primary",
  },
];

// Trade Partnership benefits - Business growth focused
const partnershipBenefits = [
  {
    icon: "trending_up",
    title: "Consistent Project Pipeline",
    description:
      "Access to a steady flow of quality construction projects throughout the Pacific Northwest, providing reliable business opportunities year-round.",
  },
  {
    icon: "groups",
    title: "Professional Network",
    description:
      "Join a network of trusted trade professionals and industry leaders, opening doors to collaboration and business development opportunities.",
  },
  {
    icon: "verified",
    title: "Clear Quality Standards",
    description:
      "Well-defined quality expectations and project specifications help trade partners deliver their best work with confidence and consistency.",
  },
  {
    icon: "school",
    title: "Industry Collaboration",
    description:
      "Share best practices, innovative solutions, and industry insights in a professional environment that values continuous improvement.",
  },
  {
    icon: "security",
    title: "Insurance & Compliance Support",
    description:
      "Guidance on insurance requirements, safety protocols, and compliance standards to help meet project specifications and industry regulations.",
  },
  {
    icon: "workspace_premium",
    title: "Business Growth Opportunities",
    description:
      "Work on diverse, high-quality projects that enhance capabilities, build reputation, and create opportunities for sustainable business expansion.",
  },
];

export default function TradePartnersPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
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
                Trade Partnership Network
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug px-2">
              Grow Your Business with Veteran-Owned Excellence
            </p>

            {/* Description */}
            <p className="max-w-4xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed px-4">
              "Building for the Owner, NOT the Dollar" — Partner with MH
              Construction to access reliable project opportunities,
              professional collaboration, and fair business practices. We
              believe in building lasting relationships with quality trade
              professionals who share our commitment to excellence.
            </p>
          </div>
        </div>

        {/* Page-Specific Navigation Bar */}
        <PageNavigation
          items={navigationConfigs.tradePartners}
          className="absolute bottom-0 left-0 right-0"
        />
      </section>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 xl:py-40 max-w-7xl">
        {/* Important Distinction Notice */}
        <section className="mb-20 lg:mb-32">
          <FadeInWhenVisible>
            <div className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 dark:from-brand-primary/20 dark:to-brand-secondary/20 border-l-4 border-brand-primary p-6 md:p-8 rounded-r-xl">
              <div className="flex items-start gap-4">
                <MaterialIcon
                  icon="info"
                  size="xl"
                  className="text-brand-primary flex-shrink-0 mt-1"
                />
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-xl mb-3">
                    Trade Partners vs. Client Partnerships
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                    <strong>
                      This page is for subcontractors, suppliers, and vendors
                    </strong>{" "}
                    interested in joining our trade partnership network to work
                    on MH Construction projects.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    If you're a{" "}
                    <strong>
                      property owner or business seeking construction services
                    </strong>
                    , please visit our{" "}
                    <Link
                      href="/contact"
                      className="text-brand-primary hover:text-brand-primary-dark font-semibold underline"
                    >
                      Contact Page
                    </Link>{" "}
                    to schedule a free consultation or explore our{" "}
                    <Link
                      href="/services"
                      className="text-brand-primary hover:text-brand-primary-dark font-semibold underline"
                    >
                      Services
                    </Link>{" "}
                    to learn about client partnerships.
                  </p>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </section>

        {/* Trade Partnership Philosophy */}
        <section className="mb-20 lg:mb-32">
          <FadeInWhenVisible>
            <div className="mb-12 lg:mb-16 text-center">
              <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                  Trade Partnership
                </span>
                <span className="block text-brand-primary dark:text-brand-primary font-black">
                  Philosophy
                </span>
              </h2>
              <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                "Quality construction is built through strong trade
                partnerships. Our success depends on skilled subcontractors and
                reliable vendors who bring expertise, professionalism, and
                shared commitment to every project."
              </p>
              <cite className="block mt-4 font-semibold text-brand-secondary text-lg">
                — MH Construction Leadership Team
              </cite>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {partnershipValues.map((value, index) => (
              <Card
                key={index}
                className="flex flex-col bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 h-full transition-all hover:-translate-y-1"
              >
                <CardContent className="flex flex-col p-6 h-full text-center">
                  <div
                    className={`flex justify-center items-center bg-gradient-to-r ${value.color} mx-auto mb-4 rounded-full w-16 h-16`}
                  >
                    <MaterialIcon
                      icon={value.icon}
                      size="lg"
                      className="text-white"
                    />
                  </div>
                  <h3 className="mb-3 font-bold text-gray-900 dark:text-white text-lg">
                    {value.title}
                  </h3>
                  <p className="flex-grow text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </StaggeredFadeIn>
        </section>

        {/* Trade Partner Categories */}
        <section className="mb-20 lg:mb-32">
          <FadeInWhenVisible>
            <div className="mb-12 lg:mb-16 text-center">
              <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                  Our Approved Trade
                </span>
                <span className="block text-brand-primary dark:text-brand-primary font-black">
                  Partners
                </span>
              </h2>
              <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                Meet the skilled professionals in our trade partnership network
                who bring expertise, reliability, and quality workmanship to
                every MH Construction project.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="space-y-8">
            {partnerCategories.map((category, categoryIndex) => (
              <FadeInWhenVisible key={categoryIndex}>
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <CardHeader className="pb-4">
                    <div className="flex items-center">
                      <div className="flex justify-center items-center bg-brand-primary mr-4 rounded-full w-12 h-12">
                        <MaterialIcon
                          icon={category.icon}
                          size="lg"
                          className="text-white"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-gray-900 dark:text-white text-2xl">
                          {category.category}
                        </CardTitle>
                        <p className="text-gray-600 dark:text-gray-300">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
                      {category.partners.map((partner, partnerIndex) => (
                        <div
                          key={partnerIndex}
                          className="bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 p-6 rounded-lg transition-colors"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                              {partner.name}
                            </h4>
                            <span className="bg-brand-secondary/20 dark:bg-brand-secondary/30 px-2 py-1 rounded font-medium text-brand-secondary dark:text-brand-secondary-light text-xs">
                              {partner.yearsWorking}
                            </span>
                          </div>
                          <div className="space-y-2 mb-3">
                            <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                              <MaterialIcon
                                icon="business"
                                className="mr-2"
                                size="sm"
                              />
                              {partner.specialty}
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                              <MaterialIcon
                                icon="location_on"
                                className="mr-2"
                                size="sm"
                              />
                              {partner.location}
                            </div>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                            {partner.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeInWhenVisible>
            ))}
          </div>
        </section>

        {/* Partnership Benefits */}
        <section className="mb-20 lg:mb-32">
          <FadeInWhenVisible>
            <div className="mb-12 lg:mb-16 text-center">
              <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                  Trade Partnership
                </span>
                <span className="block text-brand-primary dark:text-brand-primary font-black">
                  Benefits
                </span>
              </h2>
              <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                We're committed to creating mutually beneficial business
                relationships that support the growth and success of our
                approved vendors and trade professionals.
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mb-12">
            {partnershipBenefits.map((benefit, index) => (
              <Card
                key={index}
                className="flex flex-col bg-white dark:bg-gray-900 hover:shadow-lg dark:hover:shadow-gray-600/50 transition-all hover:-translate-y-1 h-full"
              >
                <CardContent className="flex flex-col p-6 h-full">
                  <div className="flex items-center mb-4">
                    <div className="flex justify-center items-center bg-brand-primary mr-4 rounded-full w-12 h-12">
                      <MaterialIcon
                        icon={benefit.icon}
                        size="lg"
                        className="text-white"
                      />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                      {benefit.title}
                    </h3>
                  </div>
                  <p className="flex-grow text-gray-600 dark:text-gray-300 leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </StaggeredFadeIn>
        </section>

        {/* Vendor Requirements & Application Process */}
        <section className="mb-20 lg:mb-32">
          <FadeInWhenVisible>
            <div className="mb-12 lg:mb-16 text-center">
              <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                  Approved Vendor
                </span>
                <span className="block text-brand-primary dark:text-brand-primary font-black">
                  Requirements
                </span>
              </h2>
              <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                We seek qualified trade professionals who share our commitment
                to quality, safety, and professional excellence. Here's what we
                look for in approved vendors.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeInWhenVisible>
              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-full">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="flex justify-center items-center bg-brand-primary mr-4 rounded-full w-12 h-12">
                      <MaterialIcon
                        icon="verified"
                        size="lg"
                        className="text-white"
                      />
                    </div>
                    <CardTitle className="text-gray-900 dark:text-white text-2xl">
                      Essential Qualifications
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "Valid trade licensing for Washington, Oregon, and/or Idaho",
                      "Current liability and worker's compensation insurance",
                      "Proven track record of quality workmanship",
                      "Professional references from recent projects",
                      "Commitment to safety standards and protocols",
                      "Alignment with MH Construction values and standards",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          size="sm"
                          className="text-brand-primary mr-3 flex-shrink-0 mt-1"
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </FadeInWhenVisible>

            <FadeInWhenVisible>
              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-full">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="flex justify-center items-center bg-brand-secondary mr-4 rounded-full w-12 h-12">
                      <MaterialIcon
                        icon="workspace_premium"
                        size="lg"
                        className="text-white"
                      />
                    </div>
                    <CardTitle className="text-gray-900 dark:text-white text-2xl">
                      Preferred Qualifications
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "Veteran-owned or veteran-employed businesses (priority)",
                      "Local Pacific Northwest presence and familiarity",
                      "Experience with diverse project types and scales",
                      "Strong safety record and industry certifications",
                      "Technology-capable for project communication",
                      "Sustainable and community-minded business practices",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <MaterialIcon
                          icon="star"
                          size="sm"
                          className="text-brand-secondary mr-3 flex-shrink-0 mt-1"
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </FadeInWhenVisible>
          </div>

          {/* Application Process */}
          <div className="mt-12">
            <FadeInWhenVisible>
              <div className="mb-8 text-center">
                <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-xl md:text-2xl">
                  Trade Partnership Application Process
                </h3>
                <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300">
                  Our straightforward application process ensures we build
                  strong, qualified partnerships with the right trade
                  professionals.
                </p>
              </div>
            </FadeInWhenVisible>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: "1",
                  icon: "assignment",
                  title: "Submit Application",
                  description:
                    "Complete our vendor application with company information, specializations, and licensing details.",
                },
                {
                  step: "2",
                  icon: "description",
                  title: "Documentation Review",
                  description:
                    "Provide required documents including licenses, insurance certificates, and safety certifications.",
                },
                {
                  step: "3",
                  icon: "photo_library",
                  title: "Portfolio & References",
                  description:
                    "Share recent project examples, quality samples, and professional references for verification.",
                },
                {
                  step: "4",
                  icon: "how_to_reg",
                  title: "Approval & Onboarding",
                  description:
                    "Upon approval, receive vendor credentials and access to our trade partnership portal.",
                },
              ].map((step, index) => (
                <FadeInWhenVisible key={index}>
                  <Card className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-600 h-full text-center transition-all hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex justify-center items-center bg-brand-primary mb-4 mx-auto rounded-full w-16 h-16">
                        <MaterialIcon
                          icon={step.icon}
                          size="xl"
                          className="text-white"
                        />
                      </div>
                      <div className="inline-block bg-brand-secondary/20 dark:bg-brand-secondary/30 mb-3 px-3 py-1 rounded-full">
                        <span className="font-bold text-brand-secondary dark:text-brand-secondary-light text-sm">
                          Step {step.step}
                        </span>
                      </div>
                      <h4 className="mb-3 font-bold text-gray-900 dark:text-white text-lg">
                        {step.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </FadeInWhenVisible>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action - Join Our Trade Network */}
        <section className="bg-gradient-to-br from-brand-primary/5 dark:from-brand-primary/10 via-brand-primary/10 dark:via-brand-primary/20 to-brand-secondary/5 dark:to-brand-secondary/10 p-12 lg:p-16 xl:p-20 rounded-2xl">
          <FadeInWhenVisible>
            <div className="text-center">
              <MaterialIcon
                icon="diversity_3"
                size="4xl"
                className="mb-6 text-brand-primary"
              />
              <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                  Join Our Trade
                </span>
                <span className="block text-brand-primary dark:text-brand-primary font-black">
                  Partnership Network
                </span>
              </h2>
              <p className="mx-auto mb-8 max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                Ready to grow your business with a veteran-owned construction
                leader? We're actively seeking reliable, skilled trade partners
                who value quality workmanship, professional collaboration, and
                sustainable business relationships. Apply to become an approved
                vendor and access consistent project opportunities.
              </p>
              <div className="flex sm:flex-row flex-col justify-center gap-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-brand-primary hover:bg-brand-primary-dark dark:bg-brand-primary dark:hover:bg-brand-primary-dark shadow-xl text-white"
                  >
                    <MaterialIcon icon="work" className="mr-2" />
                    Apply to be an Approved Vendor
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button
                    size="lg"
                    className="bg-brand-secondary hover:bg-brand-secondary-dark dark:bg-brand-secondary dark:hover:bg-brand-secondary-dark shadow-xl text-black dark:text-black"
                  >
                    <MaterialIcon icon="photo_library" className="mr-2" />
                    View Our Portfolio
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-gray-500 dark:text-gray-400">
                <MaterialIcon icon="phone" className="inline mr-2" size="sm" />
                Trade Partnership Inquiries: (509) 308-6489 | office@mhc-gc.com
              </p>
            </div>
          </FadeInWhenVisible>
        </section>
      </div>
    </div>
  );
}
