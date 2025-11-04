"use client";

import React from "react";
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
// Enhanced SEO handled in layout.tsx

// Core Services Data
const coreServices = [
  {
    iconName: "engineering",
    title: "Commercial Construction Management",
    subtitle: "Streamline Your Project Success",
    description:
      "Planning a new commercial building demands intricate details and expert oversight. Put your project in the right hands with comprehensive Construction Management services throughout the Tri-Cities area. Our commitment to thorough communication and upfront planning prevents costly on-the-fly decisions later on.",
    features: [
      "Commercial Businesses (Retail, Offices)",
      "Medical Facilities",
      "Industrial Buildings",
      "Churches & Religious Facilities",
      "Wineries & Vineyards",
    ],
    benefits: [
      "Exceptional partnership experience from start to finish",
      "Streamlined process with upfront planning",
      "Expert oversight and intricate detail management",
    ],
    ctaText:
      "Call (509) 308-6489 today to take the first step toward your new building construction.",
  },
  {
    iconName: "architecture",
    title: "Master Planning",
    subtitle: "Pre-Construction Excellence",
    description:
      "We're passionate about transforming your vision into reality through detailed Master Planning. We strategize and coordinate every component of your building construction from concept through the finishing touches. Our team works closely with you to prevent last-minute changes and scope creep in later stages.",
    features: [
      "Building Location and Surrounding Infrastructure",
      "Local and State Building Codes (WA, OR, ID)",
      "Detailed Budget Constraints and Cost Control",
      "Project Timeline and Sequencing",
      "Owner Design Preferences",
    ],
    benefits: [
      "Zero gaps in scope coverage",
      "Comprehensive planning prevents changes",
      "Realistic timelines and expectations",
    ],
  },
  {
    iconName: "inventory",
    title: "Procurement & Vendor Management",
    subtitle: "Reliable Material Sourcing",
    description:
      "Navigating the logistics of construction requires extensive planning and coordination. We specialize in sourcing quality materials tailored to your project goals. Our reliable Master Planning gives vendors the advanced notice necessary to streamline procurement and proactively manage long lead item delays.",
    features: [
      "Material Sourcing and Vetting",
      "Supplier Management and Communication",
      "Budget Negotiation and Pricing",
      "Purchase Orders and Documentation",
      "Contract Management",
      "Coordination of Deliveries",
    ],
    benefits: [
      "Meticulous attention to detail",
      "Timely delivery and installation",
      "Proactive delay management",
    ],
  },
  {
    iconName: "fact_check",
    title: "Constructability & Budget Control",
    subtitle: "Proactive Feasibility Analysis",
    description:
      "Is your project possible? And if so, how can it be cost-effective? We're committed to improving project planning and execution by conducting early-stage analysis of construction feasibility and cost considerations. We offer these critical services to partners throughout Washington, Oregon, and Idaho.",
    features: [
      "Most efficient construction sequence and assembly",
      "Logistics for specialty items (equipment and infrastructure)",
      "Precise parts ordering, timing, and cost control",
    ],
    benefits: [
      "Collaboration with key subcontractors",
      "Eliminates guesswork early",
      "Cost-effective project execution",
    ],
  },
  {
    iconName: "view_module",
    title: "Modularization",
    subtitle: "Advanced Subproject Management",
    description:
      "Project Modularization involves strategically dividing a project into smaller, more manageable subprojects. This process simplifies design, execution, and maintenance. We focus on Subproject Management to help partners complete large, complex projects more efficiently and consistently meet schedules.",
    features: [
      "Streamlined transitions between construction phases",
      "Improved resource allocation and communication efficiency",
      "Leverage expertise specifically at each stage",
    ],
    benefits: [
      "New era of project management",
      "Team of phase specialists vs. single PM",
      "Increased efficiency for complex builds",
    ],
  },
];

// Specialty Services & Markets
const specialtyServices = [
  {
    iconName: "business",
    title: "Markets",
    subtitle: "Diverse Business Solutions",
    description:
      "We complete projects for a wide range of businesses throughout the Tri-Cities (Kennewick, Richland, Pasco) and the wider region. With over 150 years of construction experience, trust us to bring your unique vision to life—from specialty religious facilities to complex industrial centers.",
    markets: [
      "Religious Facilities (Churches, Centers)",
      "Commercial Buildings (Retail, Offices)",
      "Government Buildings and Grant Projects",
      "Educational Buildings (Schools, Training Centers)",
      "Medical Centers and Clinics",
      "Wineries and Vineyards",
    ],
  },
  {
    iconName: "store",
    title: "Tenant Improvements",
    subtitle: "Commercial Space Transformation",
    description:
      "If you've recently purchased a commercial building in the Tri-Cities, we can help you transform it. We have decades of experience providing Tenant Improvement (TI) Services and are licensed to complete commercial renovation projects throughout Washington, Oregon, and Idaho.",
    capabilities: [
      "Recent purchase building conversion",
      "Quick and efficient execution",
      "Vision brought to life",
      "Fast turnaround times",
    ],
    ctaText: "Call us right away to schedule tenant improvement services.",
  },
  {
    iconName: "apartment",
    title: "Commercial New Build-Outs",
    subtitle: "Build Your Business Right",
    description:
      "Looking for a committed, quality construction partner? We offer comprehensive Commercial Construction Services to business owners throughout Kennewick, WA and the entire Tri-Cities area. Whether you need a small office or a large dealership, we construct a space where your business can thrive.",
    buildTypes: [
      "Retail Construction",
      "Medical Office Construction",
      "Winery Construction",
      "Car Dealership Construction",
      "Boutique & Specialty Spaces",
    ],
    note: "Using top-grade materials and partnering with the best architects.",
  },
  {
    iconName: "factory",
    title: "Light Industrial",
    subtitle: "Functional & Safe Industrial Facilities",
    description:
      "When choosing a contractor for light industrial facilities, experience is the most important factor. We have been providing Light Industrial Construction Services for over 13 years to business owners in the Tri-Cities and surrounding states. Count on us to create a safe and functional building.",
    features: [
      "Fire Protection Systems",
      "Commercial Doors and Windows",
      "Locker Rooms and Offices",
      "Structural Metal Studs and Sheetrock",
      "Safety Hand Railings",
    ],
    note: "From warehouses to processing plants—all built to your precise specifications.",
  },
  {
    iconName: "church",
    title: "Religious Facilities",
    subtitle: "Specialized Construction for Sacred Spaces",
    description:
      "We provide dedicated commercial construction services for Churches, Community Centers, and Religious Facilities across Washington, Oregon, and Idaho. We understand that these spaces require thoughtful design, careful budgeting, and a deep respect for the community they serve.",
    capabilities: [
      "Thoughtful design",
      "Careful budgeting",
      "Community respect",
      "Renovation or new construction",
    ],
    note: "Trust our experienced team to manage every detail of your project.",
  },
];

// Service Areas
const serviceAreas = [
  {
    iconName: "location_city",
    title: "Tri-Cities Primary",
    areas: [
      "Pasco, WA",
      "Kennewick, WA",
      "Richland, WA",
      "Benton County",
      "Franklin County",
    ],
  },
  {
    iconName: "map",
    title: "Extended Coverage",
    areas: [
      "Washington State",
      "Oregon (Licensed)",
      "Idaho (Licensed)",
      "Pacific Northwest Region",
    ],
  },
];

// Why Choose Us
const whyChooseUs = [
  {
    iconName: "workspace_premium",
    title: "150+ Years Combined Experience",
    description:
      "Deep expertise across all construction disciplines, refined through decades of successful projects.",
  },
  {
    iconName: "military_tech",
    title: "Veteran-Owned Excellence",
    description:
      "Veteran-owned since January 2025 under Army veteran leadership. Military precision and discipline applied to construction, ensuring attention to detail and reliable execution.",
  },
  {
    iconName: "handshake",
    title: "Community Partnership",
    description:
      "We're community partners invested in Pacific Northwest success, not just contractors.",
  },
  {
    iconName: "verified",
    title: "Licensed & Insured",
    description:
      "Fully licensed across WA, OR, and ID with comprehensive insurance coverage for your protection.",
  },
  {
    iconName: "high_quality",
    title: "Quality Assurance",
    description:
      "Meticulous quality control at every project phase, ensuring work meets our high standards.",
  },
  {
    iconName: "engineering",
    title: "Urgent Construction Support",
    description:
      "Expert construction consultation and rapid resource deployment for time-critical project needs.",
  },
];

export default function ServicesPage() {
  // Enhanced SEO handled in layout.tsx

  return (
    <>
      <div className="bg-gradient-to-b from-white dark:from-gray-900 to-gray-50 dark:to-gray-800 min-h-screen">
        {/* Hero Section - v4.0.2 Standards */}
        <section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 h-screen flex items-center justify-center text-white overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"></div>

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-24 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20 lg:pb-28">
            <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
              {/* Main Title */}
              <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight">
                <span className="block text-brand-secondary font-black drop-shadow-lg">
                  Construction Excellence
                </span>
              </h1>

              {/* Subtitle */}
              <p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug px-2">
                "Building for the Owner, NOT the Dollar"
              </p>

              {/* Description */}
              <p className="max-w-4xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed px-4">
                We Work WITH You Every Step. Military Precision. Advanced
                Technology. Serving the Pacific Northwest since 2010.
              </p>
            </div>
          </div>

          {/* Page-Specific Navigation Bar */}
          <PageNavigation
            items={navigationConfigs.services}
            className="absolute bottom-0 left-0 right-0"
          />
        </section>

        {/* Construction Expertise Section */}
        <section className="bg-white dark:bg-gray-900 py-20 lg:py-32 xl:py-40">
          <div className="mx-auto px-4 container">
            <FadeInWhenVisible>
              <div className="mx-auto mb-16 lg:mb-24 max-w-4xl text-center">
                {/* Section Header - v4.0.2 Clean Standards */}
                <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                  <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                    Partnership-Focused
                  </span>
                  <span className="block text-brand-primary dark:text-brand-primary font-black">
                    Construction Management
                  </span>
                </h2>

                <p className="mb-8 font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                  Planning a new commercial building demands intricate details
                  and expert partnership oversight. Work WITH us through
                  comprehensive Partnership-Focused Construction Management
                  services throughout the Tri-Cities (Pasco, WA) area.
                </p>

                <div className="bg-brand-primary/5 dark:bg-gray-800 p-6 sm:p-8 border-brand-primary border-l-4 rounded-xl">
                  <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed text-left">
                    <strong className="text-brand-primary dark:text-brand-primary-light block mb-2">
                      Our Partnership Priority:
                    </strong>
                    Delivering an exceptional partnership experience from start
                    to finish. Our commitment to thorough communication and
                    upfront collaboration is critical to streamlining the
                    process, preventing costly on-the-fly decisions later on.
                  </p>
                </div>

                {/* CTA Buttons - Brand Standards v4.0.2 */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-10">
                  <Link href="/contact">
                    <Button
                      variant="primary"
                      size="lg"
                      className="transition-all duration-300 min-w-[280px]"
                    >
                      <MaterialIcon icon="phone" size="lg" className="mr-3" />
                      <span className="font-medium">Call (509) 308-6489</span>
                    </Button>
                  </Link>
                  <Link href="/booking">
                    <Button
                      variant="outline"
                      size="lg"
                      className="transition-all duration-300 min-w-[280px]"
                    >
                      <MaterialIcon icon="event" size="lg" className="mr-3" />
                      <span className="font-medium">Schedule Consultation</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Core Services Section */}
        <section
          id="core-services"
          className="bg-gray-50 dark:bg-gray-800 py-20 lg:py-32 xl:py-40"
        >
          <div className="mx-auto px-4 container">
            <FadeInWhenVisible>
              <div className="mb-16 lg:mb-24 text-center scroll-reveal">
                {/* Section Header - v4.0.2 Clean Standards (NO BADGES) */}
                <div className="flex justify-center items-center mb-6">
                  <MaterialIcon
                    icon="build"
                    size="xl"
                    className="text-brand-primary dark:text-brand-primary"
                  />
                </div>
                <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                  <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                    Core Partnership
                  </span>
                  <span className="block text-brand-primary dark:text-brand-primary font-black">
                    Services
                  </span>
                </h2>
                <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                  Comprehensive partnership-focused management services designed
                  to bring your vision to life through collaboration and
                  military precision
                </p>
              </div>
            </FadeInWhenVisible>

            <StaggeredFadeIn className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mx-auto max-w-7xl">
              {coreServices.map((service, index) => (
                <div
                  key={index}
                  id={service.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, "")}
                  className="group perspective-1000 cursor-pointer h-full"
                  style={{ perspective: "1000px" }}
                >
                  <div
                    className="relative w-full h-full transition-transform duration-700 preserve-3d group-hover:rotate-y-180"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Front Side - Overview */}
                    <div
                      className="absolute inset-0 w-full h-full backface-hidden"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <Card className="flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 h-full shadow-lg">
                        <CardHeader className="flex-shrink-0">
                          <MaterialIcon
                            icon={service.iconName}
                            size="3xl"
                            className="mb-4 text-brand-primary"
                          />
                          <CardTitle className="flex items-center mb-2 min-h-[3rem] text-gray-900 dark:text-white text-2xl">
                            {service.title}
                          </CardTitle>
                          <p className="font-semibold text-gray-600 dark:text-gray-400 text-sm">
                            {service.subtitle}
                          </p>
                        </CardHeader>
                        <CardContent className="flex flex-col flex-grow">
                          <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                            {service.description}
                          </p>
                          <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-center text-brand-primary dark:text-brand-primary-light">
                              <MaterialIcon
                                icon="touch_app"
                                size="sm"
                                className="mr-2"
                              />
                              <span className="text-sm font-medium">
                                Hover or tap for details
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Back Side - Detailed Information */}
                    <div
                      className="absolute inset-0 w-full h-full backface-hidden rotate-y-180"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <Card className="flex flex-col bg-gradient-to-br from-brand-primary to-brand-secondary border-0 h-full shadow-xl text-white">
                        <CardHeader className="flex-shrink-0">
                          <MaterialIcon
                            icon={service.iconName}
                            size="3xl"
                            className="mb-4 text-white"
                          />
                          <CardTitle className="flex items-center mb-2 min-h-[3rem] text-white text-2xl">
                            {service.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col flex-grow overflow-y-auto">
                          <div className="mb-4">
                            <p className="mb-2 font-bold text-white text-sm">
                              What's Included:
                            </p>
                            <ul className="space-y-2">
                              {service.features.map((feature, fIndex) => (
                                <li
                                  key={fIndex}
                                  className="flex items-start text-sm"
                                >
                                  <MaterialIcon
                                    icon="check_circle"
                                    className="flex-shrink-0 mt-0.5 mr-2 text-white"
                                    size="sm"
                                  />
                                  <span className="text-white/90">
                                    {feature}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mb-4">
                            <p className="mb-2 font-bold text-white text-sm">
                              Partnership Benefits:
                            </p>
                            <ul className="space-y-2">
                              {service.benefits.map((benefit, bIndex) => (
                                <li
                                  key={bIndex}
                                  className="flex items-start text-sm"
                                >
                                  <MaterialIcon
                                    icon="stars"
                                    className="flex-shrink-0 mt-0.5 mr-2 text-white"
                                    size="sm"
                                  />
                                  <span className="text-white/90">
                                    {benefit}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* CTA Text */}
                          {service.ctaText && (
                            <div className="flex-shrink-0 bg-white/20 backdrop-blur-sm mt-auto p-3 border-white/30 border-l-2 rounded">
                              <p className="font-medium text-white text-xs">
                                {service.ctaText}
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              ))}
            </StaggeredFadeIn>
          </div>
        </section>

        {/* Specialty Services Section */}
        <section className="bg-white dark:bg-gray-900 py-20 lg:py-32 xl:py-40">
          <div className="mx-auto px-4 container">
            <FadeInWhenVisible>
              <div className="mb-16 lg:mb-24 text-center scroll-reveal">
                {/* Section Header - v4.0.2 Clean Standards (NO BADGES) */}
                <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                  <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                    Specialized Partnership
                  </span>
                  <span className="block text-brand-primary dark:text-brand-primary font-black">
                    Solutions
                  </span>
                </h2>
                <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                  Diverse collaborative construction expertise across the
                  Tri-Cities and Pacific Northwest region
                </p>
              </div>
            </FadeInWhenVisible>

            <StaggeredFadeIn className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mx-auto max-w-7xl">
              {specialtyServices.map((service, index) => (
                <Card
                  key={index}
                  className="flex flex-col bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 h-full transition-all hover:-translate-y-1"
                >
                  <CardHeader className="flex-shrink-0">
                    <MaterialIcon
                      icon={service.iconName}
                      size="2xl"
                      className="mb-3 text-brand-primary"
                    />
                    <CardTitle className="flex items-center min-h-[2.5rem] text-gray-900 dark:text-white text-xl">
                      {service.title}
                    </CardTitle>
                    <p className="mt-1 font-semibold text-gray-600 dark:text-gray-400 text-sm">
                      {service.subtitle}
                    </p>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-grow">
                    <p className="mb-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                      {service.description}
                    </p>

                    <div className="flex-grow">
                      {/* Markets List */}
                      {service.markets && (
                        <ul className="space-y-2">
                          {service.markets.map((market, mIndex) => (
                            <li
                              key={mIndex}
                              className="flex items-start text-sm"
                            >
                              <MaterialIcon
                                icon="check_circle"
                                className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent"
                                size="sm"
                              />
                              <span className="text-gray-600 dark:text-gray-300">
                                {market}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Build Types List */}
                      {service.buildTypes && (
                        <>
                          <div className="mb-2 font-semibold text-gray-900 dark:text-white text-sm">
                            What We Build:
                          </div>
                          <ul className="space-y-2 mb-3">
                            {service.buildTypes.map((type, tIndex) => (
                              <li
                                key={tIndex}
                                className="flex items-start text-sm"
                              >
                                <MaterialIcon
                                  icon="arrow_right"
                                  className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent"
                                  size="sm"
                                />
                                <span className="text-gray-600 dark:text-gray-300">
                                  {type}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}

                      {/* Features/Capabilities List */}
                      {service.features && (
                        <>
                          <div className="mb-2 font-semibold text-gray-900 dark:text-white text-sm">
                            High-Quality Materials:
                          </div>
                          <ul className="space-y-2 mb-3">
                            {service.features.map((feature, fIndex) => (
                              <li
                                key={fIndex}
                                className="flex items-start text-sm"
                              >
                                <MaterialIcon
                                  icon="verified"
                                  className="flex-shrink-0 mt-0.5 mr-2 text-brand-secondary"
                                  size="sm"
                                />
                                <span className="text-gray-600 dark:text-gray-300">
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}

                      {service.capabilities && !service.markets && (
                        <ul className="space-y-2 mb-3">
                          {service.capabilities.map((cap, cIndex) => (
                            <li
                              key={cIndex}
                              className="flex items-start text-sm"
                            >
                              <MaterialIcon
                                icon="arrow_right"
                                className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent"
                                size="sm"
                              />
                              <span className="text-gray-600 dark:text-gray-300">
                                {cap}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Note */}
                    {service.note && (
                      <p className="flex-shrink-0 mt-3 pt-3 border-gray-200 dark:border-gray-600 border-t text-gray-600 dark:text-gray-400 text-xs italic">
                        {service.note}
                      </p>
                    )}

                    {/* CTA */}
                    {service.ctaText && (
                      <div className="flex-shrink-0 bg-brand-primary/5 dark:bg-gray-700 mt-4 p-3 border-brand-primary border-l-2 rounded">
                        <p className="font-medium text-gray-800 dark:text-gray-200 text-xs">
                          {service.ctaText}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </StaggeredFadeIn>
          </div>
        </section>

        {/* Service Areas Section */}
        <section className="bg-gradient-to-r from-brand-primary dark:from-brand-primary-dark to-brand-accent dark:to-gray-800 py-20 lg:py-32 xl:py-40 text-white">
          <div className="mx-auto px-4 container">
            <FadeInWhenVisible>
              <div className="mb-16 lg:mb-24 text-center scroll-reveal">
                {/* Section Header - v4.0.2 Clean Standards (NO BADGES) */}
                <h2 className="mb-8 pb-2 font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                  <span className="block mb-4 font-semibold text-white/80 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                    Service Coverage
                  </span>
                  <span className="block text-white font-black drop-shadow-lg">
                    Areas
                  </span>
                </h2>

                <p className="font-light text-white/90 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                  Serving the Pacific Northwest with Partnership Excellence
                </p>
              </div>

              <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 mx-auto max-w-4xl">
                {serviceAreas.map((area, index) => (
                  <Card
                    key={index}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border-white/20 transition-all"
                  >
                    <CardHeader>
                      <MaterialIcon
                        icon={area.iconName}
                        size="2xl"
                        className="mb-3 text-brand-secondary"
                      />
                      <CardTitle className="text-white text-2xl">
                        {area.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {area.areas.map((location, lIndex) => (
                          <li
                            key={lIndex}
                            className="flex items-center text-white/90"
                          >
                            <MaterialIcon
                              icon="location_on"
                              className="mr-2 text-brand-secondary"
                              size="sm"
                            />
                            <span>{location}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="bg-gray-50 dark:bg-gray-800 py-20 lg:py-32 xl:py-40">
          <div className="mx-auto px-4 container">
            <FadeInWhenVisible>
              <div className="mb-16 lg:mb-24 text-center scroll-reveal">
                {/* Section Header - v4.0.2 Clean Standards (NO BADGES) */}
                <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                  <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                    Why Partner With
                  </span>
                  <span className="block text-brand-primary dark:text-brand-primary font-black">
                    MH Construction
                  </span>
                </h2>
                <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                  Your trusted partner for commercial construction excellence in
                  the Pacific Northwest
                </p>
              </div>
            </FadeInWhenVisible>

            <StaggeredFadeIn className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto max-w-7xl">
              {whyChooseUs.map((reason, index) => (
                <Card
                  key={index}
                  className="flex flex-col bg-white dark:bg-gray-900 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 h-full transition-all hover:-translate-y-1"
                >
                  <CardHeader className="flex-shrink-0">
                    <MaterialIcon
                      icon={reason.iconName}
                      size="2xl"
                      className="mb-3 text-brand-primary"
                    />
                    <CardTitle className="flex items-center min-h-[3rem] text-gray-900 dark:text-white text-lg">
                      {reason.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-grow items-start">
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                      {reason.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </StaggeredFadeIn>
          </div>
        </section>

        {/* Service Request Process Section */}
        <section className="bg-white dark:bg-gray-900 py-20 lg:py-32 xl:py-40">
          <div className="mx-auto px-4 container">
            <FadeInWhenVisible>
              <div className="mx-auto max-w-4xl">
                <div className="mb-16 lg:mb-24 text-center scroll-reveal">
                  {/* Section Header - v4.0.2 Clean Standards (NO BADGES) */}
                  <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                    <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                      Our Partnership
                    </span>
                    <span className="block text-brand-primary dark:text-brand-primary font-black">
                      Process
                    </span>
                  </h2>

                  <p className="font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                    From initial partnership conversation to project completion,
                    we collaborate WITH you every step of the way
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      step: 1,
                      title: "Partnership Consultation",
                      description:
                        "Understanding your vision through collaborative discussion",
                      icon: "chat",
                    },
                    {
                      step: 2,
                      title: "Site Assessment",
                      description:
                        "Evaluating location and project feasibility together",
                      icon: "explore",
                    },
                    {
                      step: 3,
                      title: "Collaborative Planning",
                      description:
                        "Detailed planning and timeline development with your input",
                      icon: "event",
                    },
                    {
                      step: 4,
                      title: "Partnership Proposal",
                      description:
                        "Comprehensive project proposal with transparent partnership pricing",
                      icon: "description",
                    },
                    {
                      step: 5,
                      title: "Partnership Execution",
                      description:
                        "Collaborative execution with regular communication and updates",
                      icon: "handshake",
                    },
                  ].map((process, index) => (
                    <Card
                      key={index}
                      className="bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 transition-shadow"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start min-h-[5rem]">
                          <div className="flex-shrink-0 mr-4">
                            <div className="flex justify-center items-center bg-brand-primary rounded-full w-12 h-12 font-bold text-white text-xl">
                              {process.step}
                            </div>
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-start">
                              <div className="flex-grow pr-4">
                                <h3 className="mb-2 font-bold text-gray-900 dark:text-white text-xl leading-tight">
                                  {process.title}
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                  {process.description}
                                </p>
                              </div>
                              <MaterialIcon
                                icon={process.icon}
                                size="lg"
                                className="flex-shrink-0 ml-4 text-brand-primary"
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Quality Inspections Section */}
        <section
          id="inspections"
          className="bg-gray-50 dark:bg-gray-800 py-16 lg:py-24"
        >
          <div className="mx-auto px-4 container">
            <FadeInWhenVisible>
              <div className="mx-auto max-w-4xl text-center mb-12 scroll-reveal">
                {/* Section Header - v4.0.2 Clean Standards (NO BADGES) */}
                <div className="flex justify-center items-center mb-6">
                  <MaterialIcon
                    icon="fact_check"
                    size="xl"
                    className="text-brand-primary dark:text-brand-primary"
                  />
                </div>
                <h2 className="mb-6 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight">
                  Quality Inspections
                </h2>

                <p className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed px-2">
                  Ensuring excellence through comprehensive quality assurance
                  and detailed inspections at every phase of your project.
                </p>
              </div>
            </FadeInWhenVisible>

            <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 mb-12">
              <StaggeredFadeIn>
                <Card className="bg-white dark:bg-gray-900 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <MaterialIcon
                        icon="search"
                        size="lg"
                        className="text-brand-primary"
                      />
                      <CardTitle className="text-gray-900 dark:text-white text-xl">
                        Pre-Construction Inspections
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Thorough site evaluations and planning assessments before
                      construction begins.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent"
                        />
                        <span className="text-gray-600 dark:text-gray-300">
                          Site condition assessments
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent"
                        />
                        <span className="text-gray-600 dark:text-gray-300">
                          Permit and code compliance verification
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent"
                        />
                        <span className="text-gray-600 dark:text-gray-300">
                          Material and design specification reviews
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-900 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <MaterialIcon
                        icon="assignment_turned_in"
                        size="lg"
                        className="text-brand-primary"
                      />
                      <CardTitle className="text-gray-900 dark:text-white text-xl">
                        Progress & Final Inspections
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Ongoing quality control and comprehensive final
                      inspections for peace of mind.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent"
                        />
                        <span className="text-gray-600 dark:text-gray-300">
                          Phase-by-phase quality checkpoints
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent"
                        />
                        <span className="text-gray-600 dark:text-gray-300">
                          Final walkthrough and punch list completion
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent"
                        />
                        <span className="text-gray-600 dark:text-gray-300">
                          Documentation and warranty preparation
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </StaggeredFadeIn>
            </div>
          </div>
        </section>

        {/* Maintenance & Repairs Section */}
        <section
          id="maintenance"
          className="bg-white dark:bg-gray-900 py-16 lg:py-24"
        >
          <div className="mx-auto px-4 container">
            <FadeInWhenVisible>
              <div className="mx-auto max-w-4xl text-center mb-12 scroll-reveal">
                {/* Section Header - v4.0.2 Clean Standards (NO BADGES) */}
                <div className="flex justify-center items-center mb-6">
                  <MaterialIcon
                    icon="build_circle"
                    size="xl"
                    className="text-brand-primary dark:text-brand-primary"
                  />
                </div>
                <h2 className="mb-6 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight">
                  Maintenance & Repairs
                </h2>

                <p className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed px-2">
                  Protecting your investment with professional maintenance
                  services and expert repairs when you need them most.
                </p>
              </div>
            </FadeInWhenVisible>

            <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-12">
              <StaggeredFadeIn>
                <Card className="bg-gradient-to-br from-brand-light to-white dark:from-gray-800 dark:to-gray-900 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <MaterialIcon
                        icon="schedule"
                        size="lg"
                        className="text-brand-primary"
                      />
                      <CardTitle className="text-gray-900 dark:text-white text-lg">
                        Preventive Maintenance
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                      Regular maintenance programs to prevent costly repairs and
                      extend building life.
                    </p>
                    <ul className="space-y-1 text-xs">
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent"
                        />
                        <span className="text-gray-600 dark:text-gray-300">
                          HVAC system maintenance
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent"
                        />
                        <span className="text-gray-600 dark:text-gray-300">
                          Roof and exterior inspections
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-brand-light to-white dark:from-gray-800 dark:to-gray-900 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <MaterialIcon
                        icon="build"
                        size="lg"
                        className="text-brand-primary"
                      />
                      <CardTitle className="text-gray-900 dark:text-white text-lg">
                        Urgent Repairs
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                      Fast response times for urgent repairs to minimize
                      downtime and damage.
                    </p>
                    <ul className="space-y-1 text-xs">
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent"
                        />
                        <span className="text-gray-600 dark:text-gray-300">
                          Rapid response protocols
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent"
                        />
                        <span className="text-gray-600 dark:text-gray-300">
                          Water damage mitigation
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-brand-light to-white dark:from-gray-800 dark:to-gray-900 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <MaterialIcon
                        icon="handyman"
                        size="lg"
                        className="text-brand-primary"
                      />
                      <CardTitle className="text-gray-900 dark:text-white text-lg">
                        Facility Upgrades
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                      Strategic improvements and modernization to enhance
                      property value and efficiency.
                    </p>
                    <ul className="space-y-1 text-xs">
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent"
                        />
                        <span className="text-gray-600 dark:text-gray-300">
                          Energy efficiency upgrades
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent"
                        />
                        <span className="text-gray-600 dark:text-gray-300">
                          Accessibility improvements
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </StaggeredFadeIn>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section
          id="portfolio"
          className="relative bg-gray-50 dark:bg-gray-800 py-20 lg:py-32 xl:py-40"
        >
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <FadeInWhenVisible className="mb-16 lg:mb-24 text-center scroll-reveal">
              {/* Section Header - v4.0.2 Clean Standards (NO BADGES) */}
              <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                  Our Construction
                </span>
                <span className="block text-brand-primary dark:text-brand-primary font-black">
                  Portfolio
                </span>
              </h2>
              <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                Explore our completed projects showcasing quality craftsmanship
                across commercial, residential, and government sectors
              </p>
            </FadeInWhenVisible>

            <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12">
              <FadeInWhenVisible>
                <Card className="group hover:shadow-2xl transition-all duration-300 h-full overflow-hidden">
                  <div className="relative bg-gray-200 dark:bg-gray-700 h-64 overflow-hidden">
                    <div className="absolute inset-0 flex justify-center items-center bg-gradient-to-br from-brand-primary/20 to-brand-accent/20">
                      <MaterialIcon
                        icon="business"
                        size="4xl"
                        className="text-brand-primary"
                      />
                    </div>
                    <div className="group-hover:scale-110 absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-transform duration-300"></div>
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <span className="inline-block bg-brand-primary/90 backdrop-blur-sm px-3 py-1 font-medium text-white text-xs">
                        Commercial
                      </span>
                    </div>
                  </div>
                  <CardContent className="pt-6">
                    <h3 className="mb-2 font-bold text-gray-900 dark:text-gray-100 text-xl">
                      Commercial Buildings
                    </h3>
                    <p className="mb-4 text-gray-600 dark:text-gray-300 text-sm">
                      Office complexes, retail spaces, and mixed-use
                      developments built with precision and attention to detail.
                    </p>
                    <Link
                      href="/projects?category=commercial"
                      className="inline-flex items-center text-brand-primary hover:text-brand-accent transition-colors"
                    >
                      <span className="font-medium text-sm">View Projects</span>
                      <MaterialIcon
                        icon="arrow_forward"
                        size="sm"
                        className="ml-1"
                      />
                    </Link>
                  </CardContent>
                </Card>
              </FadeInWhenVisible>

              <FadeInWhenVisible>
                <Card className="group hover:shadow-2xl transition-all duration-300 h-full overflow-hidden">
                  <div className="relative bg-gray-200 dark:bg-gray-700 h-64 overflow-hidden">
                    <div className="absolute inset-0 flex justify-center items-center bg-gradient-to-br from-brand-secondary/20 to-brand-accent/20">
                      <MaterialIcon
                        icon="home"
                        size="4xl"
                        className="text-brand-secondary"
                      />
                    </div>
                    <div className="group-hover:scale-110 absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-transform duration-300"></div>
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <span className="inline-block bg-brand-secondary/90 backdrop-blur-sm px-3 py-1 font-medium text-gray-900 text-xs">
                        Residential
                      </span>
                    </div>
                  </div>
                  <CardContent className="pt-6">
                    <h3 className="mb-2 font-bold text-gray-900 dark:text-gray-100 text-xl">
                      Custom Homes
                    </h3>
                    <p className="mb-4 text-gray-600 dark:text-gray-300 text-sm">
                      Luxury custom homes, renovations, and additions crafted
                      with military precision and care.
                    </p>
                    <Link
                      href="/projects?category=residential"
                      className="inline-flex items-center text-brand-primary hover:text-brand-accent transition-colors"
                    >
                      <span className="font-medium text-sm">View Projects</span>
                      <MaterialIcon
                        icon="arrow_forward"
                        size="sm"
                        className="ml-1"
                      />
                    </Link>
                  </CardContent>
                </Card>
              </FadeInWhenVisible>

              <FadeInWhenVisible>
                <Card className="group hover:shadow-2xl transition-all duration-300 h-full overflow-hidden">
                  <div className="relative bg-gray-200 dark:bg-gray-700 h-64 overflow-hidden">
                    <div className="absolute inset-0 flex justify-center items-center bg-gradient-to-br from-brand-accent/20 to-brand-primary/20">
                      <MaterialIcon
                        icon="account_balance"
                        size="4xl"
                        className="text-brand-accent"
                      />
                    </div>
                    <div className="group-hover:scale-110 absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-transform duration-300"></div>
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <span className="inline-block bg-brand-accent/90 backdrop-blur-sm px-3 py-1 font-medium text-white text-xs">
                        Government
                      </span>
                    </div>
                  </div>
                  <CardContent className="pt-6">
                    <h3 className="mb-2 font-bold text-gray-900 dark:text-gray-100 text-xl">
                      Government Projects
                    </h3>
                    <p className="mb-4 text-gray-600 dark:text-gray-300 text-sm">
                      Municipal facilities, infrastructure, and specialized
                      government contracts completed with security clearance.
                    </p>
                    <Link
                      href="/projects?category=government"
                      className="inline-flex items-center text-brand-primary hover:text-brand-accent transition-colors"
                    >
                      <span className="font-medium text-sm">View Projects</span>
                      <MaterialIcon
                        icon="arrow_forward"
                        size="sm"
                        className="ml-1"
                      />
                    </Link>
                  </CardContent>
                </Card>
              </FadeInWhenVisible>
            </div>

            <FadeInWhenVisible className="text-center">
              <Link href="/projects">
                <Button
                  variant="primary"
                  size="lg"
                  className="shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <MaterialIcon icon="visibility" className="mr-2" size="md" />
                  View Complete Portfolio
                </Button>
              </Link>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                <MaterialIcon icon="info" size="sm" className="inline mr-2" />
                Detailed portfolio with High-Level CRM integration coming soon
              </p>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-brand-primary dark:from-brand-primary-dark to-brand-accent dark:to-gray-800 py-20 lg:py-32 xl:py-40 text-white">
          <div className="mx-auto px-4 container">
            <FadeInWhenVisible>
              <div className="mx-auto max-w-3xl text-center">
                {/* Section Header - v4.0.2 Clean Standards (NO BADGES) */}
                <h2 className="mb-8 pb-2 font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                  <span className="block mb-4 font-semibold text-white/80 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                    Ready to Start Your
                  </span>
                  <span className="block text-white font-black drop-shadow-lg">
                    Partnership?
                  </span>
                </h2>

                <p className="mb-10 text-white/90 text-lg sm:text-xl md:text-2xl leading-relaxed px-2">
                  Contact us today for a free consultation and let's discuss how
                  we can bring your vision to life through partnership and
                  collaboration.
                </p>

                {/* CTA Buttons - v4.0.2 Brand Standards */}
                <div className="flex sm:flex-row flex-col justify-center gap-6 mb-10">
                  <Link href="/contact">
                    <Button
                      variant="primary"
                      size="lg"
                      className="transition-all duration-300 border-2 border-white bg-white text-brand-primary hover:bg-brand-primary hover:text-white hover:border-white min-w-[280px]"
                    >
                      <MaterialIcon
                        icon="handshake"
                        size="lg"
                        className="mr-3"
                      />
                      <span className="font-medium">Start Partnership</span>
                    </Button>
                  </Link>
                  <Link href="/projects">
                    <Button
                      variant="outline"
                      size="lg"
                      className="transition-all duration-300 border-2 border-white bg-transparent text-white hover:bg-white hover:text-brand-primary hover:border-white min-w-[280px]"
                    >
                      <MaterialIcon
                        icon="photo_library"
                        size="lg"
                        className="mr-3"
                      />
                      <span className="font-medium">View Portfolio</span>
                    </Button>
                  </Link>
                </div>
                <div className="space-y-2 text-brand-secondary">
                  <p className="text-xl">
                    <MaterialIcon
                      icon="phone"
                      className="inline mr-2"
                      size="md"
                    />
                    (509) 308-6489
                  </p>
                  <p>
                    <MaterialIcon
                      icon="location_on"
                      className="inline mr-2"
                      size="md"
                    />
                    3111 N. Capital Ave., Pasco, WA 99301
                  </p>
                  <p>
                    <MaterialIcon
                      icon="email"
                      className="inline mr-2"
                      size="md"
                    />
                    office@mhc-gc.com
                  </p>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>
      </div>
    </>
  );
}
