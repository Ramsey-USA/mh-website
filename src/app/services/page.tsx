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
      "Exceptional client experience from start to finish",
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
      "Is your project possible? And if so, how can it be cost-effective? We're committed to improving project planning and execution by conducting early-stage analysis of construction feasibility and cost considerations. We offer these critical services to clients throughout Washington, Oregon, and Idaho.",
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
      "Project Modularization involves strategically dividing a project into smaller, more manageable subprojects. This process simplifies design, execution, and maintenance. We focus on Subproject Management to help clients complete large, complex projects more efficiently and consistently meet schedules.",
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
      "Military precision and discipline applied to construction, ensuring attention to detail and reliable execution.",
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
    iconName: "support_agent",
    title: "24/7 Emergency Support",
    description:
      "Round-the-clock emergency support for urgent construction needs and project issues.",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-gradient-to-b from-white dark:from-gray-900 to-gray-50 dark:to-gray-800 min-h-screen">
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
                Our Partnership Approach
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-3xl mx-auto text-xl sm:text-2xl md:text-3xl text-white/90 leading-relaxed">
              Collaborative Construction Management in the Pacific Northwest
            </p>

            {/* Description */}
            <p className="max-w-4xl mx-auto text-lg md:text-xl text-white/80 leading-relaxed">
              Tri-Cities Headquarters: Pasco, WA | Partnership Area: Washington,
              Oregon, Idaho
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
      <section className="bg-white dark:bg-gray-900 py-16">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto mb-12 max-w-4xl text-center">
              <MaterialIcon
                icon="engineering"
                size="3xl"
                className="mb-4 text-brand-primary"
              />
              <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter">
                <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
                  Partnership-Focused Construction
                </span>
                <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                  Management
                </span>
              </h2>
              <p className="mb-4 font-light text-gray-700 dark:text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
                Planning a new commercial building demands intricate details and
                expert partnership oversight. Work with us through comprehensive
                Partnership-Focused Construction Management services throughout
                the Tri-Cities (Pasco, WA) area.
              </p>
              <div className="bg-brand-primary/5 dark:bg-gray-800 p-6 border-brand-primary border-l-4 rounded-lg">
                <p className="text-gray-800 dark:text-gray-200 text-lg">
                  <strong>Our Partnership Priority:</strong> Delivering an
                  exceptional partnership experience from start to finish. Our
                  commitment to thorough communication and upfront collaboration
                  is critical to streamlining the process, preventing costly
                  on-the-fly decisions later on.
                </p>
              </div>

              {/* CTA Button */}
              <div className="mt-8">
                <Link href="/contact">
                  <Button size="lg" className="gap-2">
                    <MaterialIcon icon="phone" size="sm" />
                    Call (509) 308-6489 Today
                  </Button>
                </Link>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Core Services Section */}
      <section id="core-services" className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mb-12 text-center">
              <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter">
                <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
                  Partnership
                </span>
                <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                  Services
                </span>
              </h2>
              <p className="mx-auto max-w-3xl font-light text-gray-600 dark:text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
                Comprehensive partnership-focused management services designed
                to bring your vision to life through collaboration
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-8 grid md:grid-cols-2 mx-auto max-w-7xl">
            {coreServices.map((service, index) => (
              <Card
                key={index}
                id={service.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/(^-|-$)/g, "")}
                className="flex flex-col bg-white dark:bg-gray-900 hover:shadow-xl dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 h-full transition-all hover:-translate-y-1"
              >
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

                  <div className="flex-grow mb-4">
                    <p className="mb-2 font-semibold text-gray-900 dark:text-white text-sm">
                      What's Included:
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start text-sm">
                          <MaterialIcon
                            icon="check_circle"
                            className="flex-shrink-0 mt-0.5 mr-2 text-brand-accent"
                            size="sm"
                          />
                          <span className="text-gray-600 dark:text-gray-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex-shrink-0 pt-4 border-gray-200 dark:border-gray-600 border-t">
                    <p className="mb-2 font-semibold text-gray-900 dark:text-white text-sm">
                      Benefits:
                    </p>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit, bIndex) => (
                        <li key={bIndex} className="flex items-start text-sm">
                          <MaterialIcon
                            icon="stars"
                            className="flex-shrink-0 mt-0.5 mr-2 text-brand-secondary"
                            size="sm"
                          />
                          <span className="text-gray-600 dark:text-gray-300">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Text */}
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

      {/* Specialty Services Section */}
      <section className="bg-white dark:bg-gray-900 py-16">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mb-12 text-center">
              <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter">
                <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
                  Partnership
                </span>
                <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                  Specialties
                </span>
              </h2>
              <p className="mx-auto max-w-3xl font-light text-gray-600 dark:text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
                Diverse collaborative construction expertise across the
                Tri-Cities and Pacific Northwest
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-6 grid md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl">
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
                          <li key={mIndex} className="flex items-start text-sm">
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
                          <li key={cIndex} className="flex items-start text-sm">
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
      <section className="bg-gradient-to-r from-brand-primary dark:from-forest-700 to-brand-accent dark:to-forest-800 py-16 text-white">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mb-12 text-center">
              <MaterialIcon
                icon="public"
                size="3xl"
                className="mb-4 text-brand-secondary"
              />
              <h2 className="mb-6 font-black text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter">
                <span className="block mb-3 font-semibold text-white/80 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
                  Partnership
                </span>
                <span className="block bg-clip-text bg-gradient-to-r from-white to-brand-secondary drop-shadow-sm text-transparent">
                  Areas
                </span>
              </h2>
              <p className="font-light text-forest-100 text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
                Serving the Pacific Northwest with Excellence
              </p>
            </div>

            <div className="gap-8 grid md:grid-cols-2 mx-auto max-w-4xl">
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
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mb-12 text-center">
              <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter">
                <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
                  Why Partner With
                </span>
                <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                  MH Construction
                </span>
              </h2>
              <p className="mx-auto max-w-3xl font-light text-gray-600 dark:text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
                Your trusted partner for commercial construction in the Pacific
                Northwest
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-6 grid md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl">
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
      <section className="bg-white dark:bg-gray-900 py-16">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-4xl">
              <div className="mb-12 text-center">
                <MaterialIcon
                  icon="trending_up"
                  size="3xl"
                  className="mb-4 text-brand-primary"
                />
                <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter">
                  <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
                    Our Partnership
                  </span>
                  <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                    Process
                  </span>
                </h2>
                <p className="font-light text-gray-600 dark:text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
                  From initial partnership conversation to project completion,
                  we collaborate with you every step of the way
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

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-brand-primary dark:from-forest-700 to-brand-accent dark:to-forest-800 py-16 text-white">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-3xl text-center">
              <MaterialIcon
                icon="phone_in_talk"
                size="4xl"
                className="mb-6 text-brand-secondary"
              />
              <h2 className="mb-6 font-black text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter">
                <span className="block mb-3 font-semibold text-white/80 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
                  Ready to Start Our
                </span>
                <span className="block bg-clip-text bg-gradient-to-r from-white to-brand-secondary drop-shadow-sm text-transparent">
                  Partnership?
                </span>
              </h2>
              <p className="mb-8 text-forest-100 text-xl">
                Call us today for a free consultation and let's discuss how we
                can bring your vision to life through partnership.
              </p>
              <div className="flex sm:flex-row flex-col justify-center gap-4 mb-8">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-white hover:bg-brand-light dark:bg-gray-800 dark:hover:bg-gray-700 text-brand-accent dark:text-white"
                  >
                    <MaterialIcon icon="handshake" className="mr-2" size="md" />
                    Start Our Partnership
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button
                    size="lg"
                    className="bg-brand-secondary hover:bg-bronze-600 dark:bg-brand-secondary dark:hover:bg-bronze-600 text-black dark:text-black"
                  >
                    <MaterialIcon
                      icon="photo_library"
                      className="mr-2"
                      size="md"
                    />
                    Partnership Success Stories
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
                  info@mhconstruction.com
                </p>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  );
}
