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

// Federal contracting services
const grantSupportServices = [
  {
    icon: "calculate",
    title: "Mission-Critical Cost Analysis",
    description:
      "Military-grade accuracy in cost estimation ensuring reliable fiscal projections for federal procurement",
    features: [
      "Detailed line-item cost breakdowns per federal standards",
      "Material cost projections with supply chain risk analysis",
      "Labor cost estimates based on prevailing wage requirements",
      "Contingency planning and operational risk assessment",
      "Professional documentation meeting federal acquisition regulations",
    ],
  },
  {
    icon: "architecture",
    title: "Design & Operational Validation",
    description:
      "Comprehensive technical assessment ensuring mission readiness and operational effectiveness",
    features: [
      "Constructability review and tactical analysis",
      "Mission feasibility studies and site security assessments",
      "Realistic operational timeline development",
      "Phase-by-phase execution planning with checkpoints",
      "Critical path analysis and design validation for mission success",
    ],
  },
  {
    icon: "verified",
    title: "Federal Compliance Assurance",
    description:
      "Navigate complex federal regulations with veteran expertise and military precision",
    features: [
      "Federal acquisition regulation (FAR) compliance review",
      "Security clearance coordination and documentation",
      "Building code verification and regulatory compliance",
      "Environmental and operational security compliance",
      "Quality assurance meeting federal standards",
    ],
  },
];

// Federal facility types
const governmentProjects = [
  {
    icon: "school",
    title: "Federal Training Facilities",
    examples: [
      "Military Training Centers",
      "Federal Academies",
      "DOE Training Facilities",
      "Government Libraries",
    ],
  },
  {
    icon: "account_balance",
    title: "Government Operations Centers",
    examples: [
      "Federal Office Buildings",
      "Emergency Operations Centers",
      "Administrative Command Centers",
      "Secure Government Facilities",
    ],
  },
  {
    icon: "church",
    title: "Community Mission Facilities",
    examples: [
      "Military Chapels",
      "Community Centers on Base",
      "Multi-Purpose Facilities",
      "Mission Support Buildings",
    ],
  },
  {
    icon: "groups",
    title: "Public Service Facilities",
    examples: [
      "Veterans Service Centers",
      "Public Health Command",
      "Emergency Response Centers",
      "Mission Support Hubs",
    ],
  },
  {
    icon: "engineering",
    title: "Critical Infrastructure",
    examples: [
      "Utilities Command Centers",
      "Maintenance Operations",
      "Security Support Facilities",
      "Emergency Construction Services",
    ],
  },
  {
    icon: "science",
    title: "DOE & Hanford Operations",
    examples: [
      "Security Support Facilities",
      "Administrative Command Centers",
      "Operational Training Centers",
      "Mission-Critical Safety Systems",
    ],
  },
];

// Federal contracting types
const grantTypes = [
  {
    category: "Federal Contracts",
    icon: "flag",
    programs: [
      "Department of Energy (DOE) Facilities",
      "General Services Administration (GSA) Buildings",
      "Department of Defense (DoD) Infrastructure",
      "FEMA Emergency Response Construction",
      "Veterans Affairs (VA) Facilities",
    ],
  },
  {
    category: "State & Municipal Contracts",
    icon: "location_city",
    programs: [
      "Washington State Government Facilities",
      "Oregon State Infrastructure Projects",
      "Idaho Government Building Contracts",
      "County Administrative Facilities",
      "Municipal Emergency Services Buildings",
    ],
  },
  {
    category: "Mission-Critical Projects",
    icon: "star",
    programs: [
      "Security-Enhanced Facilities",
      "Emergency Operations Centers",
      "Training and Readiness Facilities",
      "Critical Infrastructure Upgrades",
      "Operational Support Buildings",
    ],
  },
];

// Federal contracting process
const processSteps = [
  {
    step: 1,
    title: "Mission Assessment",
    description:
      "Review federal requirements, assess operational feasibility, and establish command timeline",
    icon: "chat",
  },
  {
    step: 2,
    title: "Tactical Cost Analysis",
    description:
      "Develop detailed cost projections and prepare comprehensive fiscal documentation",
    icon: "calculate",
  },
  {
    step: 3,
    title: "Technical Validation",
    description:
      "Validate specifications and provide operational constructability analysis",
    icon: "engineering",
  },
  {
    step: 4,
    title: "Compliance Verification",
    description:
      "Ensure all federal regulations and operational requirements are met",
    icon: "fact_check",
  },
  {
    step: 5,
    title: "Mission Execution",
    description:
      "Final documentation review and operational deployment support",
    icon: "send",
  },
];

// Federal contracting capabilities
const hanfordCapabilities = [
  {
    icon: "security",
    title: "Security Operations Coordination",
    description:
      "Clearance protocols and federal security compliance expertise",
  },
  {
    icon: "gavel",
    title: "Federal Acquisition Compliance",
    description:
      "Department of Energy and federal procurement regulation expertise",
  },
  {
    icon: "health_and_safety",
    title: "Operational Safety Protocols",
    description:
      "OSHA compliance and mission-specific safety system implementation",
  },
  {
    icon: "handshake",
    title: "Strategic Partner Network",
    description:
      "Vetted subcontractor relationships for federal project execution",
  },
  {
    icon: "engineering",
    title: "Rapid Response Construction",
    description:
      "Emergency construction capabilities for mission-critical timelines",
  },
  {
    icon: "workspace_premium",
    title: "Quality Assurance Systems",
    description: "Military-grade quality control exceeding federal standards",
  },
];

// Federal contract success factors
const successFactors = [
  {
    icon: "assignment",
    title: "Military-Grade Documentation",
    description:
      "Federal-standard formatting and complete operational specifications",
  },
  {
    icon: "schedule",
    title: "Mission-Critical Timelines",
    description:
      "Operational schedules with tactical contingencies and detailed planning",
  },
  {
    icon: "verified_user",
    title: "Federal Compliance Verification",
    description:
      "All requirements thoroughly addressed with supporting documentation",
  },
  {
    icon: "business_center",
    title: "Qualified Government Contractor",
    description:
      "Veteran leadership with proven federal contracting capabilities",
  },
];

export default function GovernmentGrantsPage() {
  const [selectedGrantType, setSelectedGrantType] = useState<string | null>(
    null,
  );

  return (
    <div className="bg-gradient-to-b from-white dark:from-gray-900 to-gray-50 dark:to-gray-800 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700/30 via-gray-900/80 to-gray-600/20"></div>
        <div className="top-20 right-20 absolute bg-gray-500/20 blur-3xl rounded-full w-64 h-64"></div>
        <div className="bottom-20 left-20 absolute bg-gray-400/20 blur-3xl rounded-full w-80 h-80"></div>

        {/* Content */}
        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mx-auto max-w-5xl text-center">
            {/* Veteran Badge - Always Visible */}
            <div className="flex justify-center items-center gap-2 mb-4 sm:mb-6">
              <MaterialIcon
                icon="military_tech"
                size="lg"
                className="text-gray-300"
              />
              <span className="font-semibold text-gray-300 text-sm sm:text-base tracking-wide uppercase">
                Army Veteran Owned
              </span>
            </div>

            {/* Main Title */}
            <h1
              className="mb-4 sm:mb-6 lg:mb-8 font-black text-white leading-none tracking-tighter"
              style={{ fontSize: "clamp(2rem, 8vw, 6rem)" }}
            >
              <span className="block">Federal Government</span>
              <span className="block mt-2 sm:mt-3 lg:mt-4 text-gray-300">
                Contracting
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="mx-auto mb-3 sm:mb-4 max-w-4xl font-light text-white/90 leading-relaxed tracking-wide px-2"
              style={{ fontSize: "clamp(1rem, 2.5vw, 2rem)" }}
            >
              Army Veteran Leadership • Federal Compliance • Mission Execution
            </p>

            {/* Description - Always Visible */}
            <p
              className="mx-auto mb-6 sm:mb-8 lg:mb-12 max-w-3xl font-medium text-white/80 leading-relaxed px-2"
              style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)" }}
            >
              Under Army veteran leadership, MH Construction delivers
              mission-critical construction services with unwavering commitment
              to federal compliance, operational security, and successful
              mission completion
            </p>

            {/* Quick Stats - Mobile optimized */}
            <FadeInWhenVisible>
              <div className="gap-3 sm:gap-6 lg:gap-8 grid grid-cols-2 sm:grid-cols-3 mx-auto max-w-4xl">
                <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 lg:p-6 border border-white/20 rounded-lg sm:rounded-xl text-center transition-all duration-300 hover:scale-105">
                  <div className="mb-1 sm:mb-2 font-black text-2xl sm:text-3xl lg:text-4xl text-gray-300">
                    DOE
                  </div>
                  <div className="font-medium text-white/90 text-xs sm:text-sm lg:text-base">
                    Hanford Qualified
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 lg:p-6 border border-white/20 rounded-lg sm:rounded-xl text-center transition-all duration-300 hover:scale-105">
                  <div className="mb-1 sm:mb-2 font-black text-2xl sm:text-3xl lg:text-4xl text-gray-300">
                    24/7
                  </div>
                  <div className="font-medium text-white/90 text-xs sm:text-sm lg:text-base">
                    Emergency Response
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 lg:p-6 border border-white/20 rounded-lg sm:rounded-xl text-center transition-all duration-300 hover:scale-105 col-span-2 sm:col-span-1">
                  <div className="mb-1 sm:mb-2 font-black text-2xl sm:text-3xl lg:text-4xl text-gray-300">
                    3-State
                  </div>
                  <div className="font-medium text-white/90 text-xs sm:text-sm lg:text-base">
                    WA, OR, ID Licensed
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>

        {/* Page-Specific Navigation Bar */}
        <PageNavigation
          items={navigationConfigs.government}
          className="absolute bottom-0 left-0 right-0"
        />
      </section>
      {/* Veteran-Owned Badge Section */}
      <section className="bg-gradient-to-r from-gray-800 to-black py-8 text-white">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="flex flex-wrap justify-center items-center gap-8 text-center">
              <div className="flex items-center">
                <MaterialIcon icon="military_tech" size="lg" className="mr-3" />
                <div className="text-left">
                  <p className="font-bold text-lg">Army Veteran Owned</p>
                  <p className="text-gray-300 text-sm">
                    Veteran-Owned Since January 2025
                  </p>
                </div>
              </div>
              <div className="hidden md:block bg-gray-600 w-px h-12"></div>
              <div className="flex items-center">
                <MaterialIcon icon="verified" size="lg" className="mr-3" />
                <div className="text-left">
                  <p className="font-bold text-lg">Federal Compliance Ready</p>
                  <p className="text-gray-300 text-sm">WA, OR, ID Licensed</p>
                </div>
              </div>
              <div className="hidden md:block bg-gray-600 w-px h-12"></div>
              <div className="flex items-center">
                <MaterialIcon icon="science" size="lg" className="mr-3" />
                <div className="text-left">
                  <p className="font-bold text-lg">DOE & Hanford Qualified</p>
                  <p className="text-gray-300 text-sm">
                    Mission-Critical Experience
                  </p>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
      {/* Grant Support Services */}
      <section className="bg-white dark:bg-gray-900 py-20">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mb-16 lg:mb-24 text-center">
              <MaterialIcon
                icon="support"
                size="4xl"
                className="mb-6 text-gray-700 dark:text-gray-300"
              />
              <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                  Federal Contracting
                </span>
                <span className="block text-gray-900 dark:text-white font-black">
                  Support Services
                </span>
              </h2>
              <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                Army veteran leadership delivers mission-critical construction
                services with unwavering commitment to federal specifications
                and operational success
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl">
            {grantSupportServices.map((service, index) => (
              <Card
                key={index}
                className="dark:bg-gray-800 hover:shadow-2xl dark:hover:shadow-gray-600/50 border-gray-800 dark:border-gray-600 border-t-4 transition-all hover:-translate-y-2"
              >
                <CardHeader>
                  <div className="flex justify-center items-center bg-gray-200 dark:bg-gray-700 mx-auto mb-6 rounded-full w-20 h-20">
                    <MaterialIcon
                      icon={service.icon}
                      size="3xl"
                      className="text-gray-700 dark:text-gray-300"
                    />
                  </div>
                  <CardTitle className="mb-4 dark:text-white text-2xl text-center">
                    {service.title}
                  </CardTitle>
                  <p className="text-gray-600 dark:text-gray-300 text-center">
                    {service.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="pt-6 dark:border-gray-700 border-t">
                    <p className="mb-3 font-semibold text-gray-900 dark:text-white text-sm">
                      What We Provide:
                    </p>
                    <ul className="space-y-3">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start text-sm">
                          <MaterialIcon
                            icon="check_circle"
                            className="flex-shrink-0 mt-0.5 mr-2 text-gray-600 dark:text-gray-400"
                            size="sm"
                          />
                          <span className="text-gray-700 dark:text-gray-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </StaggeredFadeIn>
        </div>
      </section>
      {/* Hanford & DOE Section */}
      <section className="bg-gradient-to-br from-gray-900 to-black py-20 text-white">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-6xl">
              <div className="mb-16 text-center">
                <MaterialIcon
                  icon="science"
                  size="4xl"
                  className="mb-6 text-gray-300"
                />
                <h2 className="mb-8 pb-2 font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                  <span className="block mb-4 font-semibold text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                    Hanford & Department of
                  </span>
                  <span className="block text-white font-black">
                    Energy Expertise
                  </span>
                </h2>
                <p className="mx-auto max-w-4xl font-light text-gray-200 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                  Proven operational excellence in high-security environments
                  with comprehensive understanding of federal compliance
                  requirements and mission-critical construction protocols
                </p>
              </div>

              <StaggeredFadeIn className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-12">
                {hanfordCapabilities.map((capability, index) => (
                  <Card
                    key={index}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border-white/20 transition-all"
                  >
                    <CardContent className="p-6">
                      <MaterialIcon
                        icon={capability.icon}
                        size="2xl"
                        className="mb-4 text-gray-300"
                      />
                      <h3 className="mb-2 font-bold text-white text-lg">
                        {capability.title}
                      </h3>
                      <p className="text-gray-200 text-sm">
                        {capability.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </StaggeredFadeIn>

              <Card className="bg-gray-800 border-gray-600">
                <CardContent className="p-8">
                  <div className="flex items-start">
                    <MaterialIcon
                      icon="construction"
                      size="3xl"
                      className="flex-shrink-0 mr-6 text-gray-300"
                    />
                    <div>
                      <h3 className="mb-4 font-bold text-white text-2xl">
                        Federal Project Capabilities
                      </h3>
                      <div className="gap-4 grid md:grid-cols-2">
                        {[
                          "Mission-critical facility construction",
                          "Administrative facility security upgrades",
                          "Training facility operational development",
                          "Infrastructure tactical improvements",
                          "Safety system mission installations",
                          "Emergency rapid response construction",
                        ].map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center text-gray-200"
                          >
                            <MaterialIcon
                              icon="arrow_right"
                              className="mr-2 text-gray-400"
                              size="sm"
                            />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
      {/* Grant Types Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-20">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mb-16 lg:mb-24 text-center">
              <MaterialIcon
                icon="folder_special"
                size="4xl"
                className="mb-6 text-gray-700 dark:text-gray-300"
              />
              <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                  Federal Contract
                </span>
                <span className="block text-gray-900 dark:text-white font-black">
                  Categories
                </span>
              </h2>
              <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                Proven execution across federal, state, and mission-critical
                construction contracts
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl">
            {grantTypes.map((type, index) => (
              <HoverScale key={index}>
                <div
                  className="h-full cursor-pointer"
                  onClick={() =>
                    setSelectedGrantType(
                      selectedGrantType === type.category
                        ? null
                        : type.category,
                    )
                  }
                >
                  <Card className="dark:bg-gray-700 hover:shadow-xl dark:hover:shadow-gray-600/50 h-full transition-all">
                    <CardHeader>
                      <MaterialIcon
                        icon={type.icon}
                        size="3xl"
                        className="mb-4 text-gray-700 dark:text-gray-300"
                      />
                      <CardTitle className="mb-4 dark:text-white text-2xl">
                        {type.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {type.programs.map((program, pIdx) => (
                          <li key={pIdx} className="flex items-start">
                            <MaterialIcon
                              icon="check_circle"
                              className="flex-shrink-0 mt-0.5 mr-2 text-gray-600 dark:text-gray-400"
                              size="sm"
                            />
                            <span className="text-gray-700 dark:text-gray-300 text-sm">
                              {program}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </HoverScale>
            ))}
          </StaggeredFadeIn>
        </div>
      </section>{" "}
      {/* Process Steps */}
      <section className="bg-white dark:bg-gray-900 py-20">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-5xl">
              <div className="mb-16 text-center">
                <MaterialIcon
                  icon="timeline"
                  size="4xl"
                  className="mb-6 text-gray-700 dark:text-gray-300"
                />
                <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                  <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                    Federal Contract
                  </span>
                  <span className="block text-gray-900 dark:text-white font-black">
                    Execution Process
                  </span>
                </h2>
                <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                  Five-phase military approach to federal contract success
                </p>
              </div>

              <div className="space-y-6">
                {processSteps.map((process, index) => (
                  <Card
                    key={index}
                    className="dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border-gray-800 dark:border-gray-600 border-l-4 transition-shadow"
                  >
                    <CardContent className="p-8">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-6">
                          <div className="flex justify-center items-center bg-gray-800 dark:bg-gray-600 shadow-lg rounded-full w-16 h-16 font-bold text-white text-2xl">
                            {process.step}
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <div className="flex-grow">
                              <h3 className="mb-3 font-bold text-gray-900 dark:text-white text-2xl">
                                {process.title}
                              </h3>
                              <p className="text-gray-700 dark:text-gray-300 text-lg">
                                {process.description}
                              </p>
                            </div>
                            <MaterialIcon
                              icon={process.icon}
                              size="2xl"
                              className="ml-6 text-gray-700 dark:text-gray-300"
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
      {/* Government Project Types */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mb-16 text-center">
              <MaterialIcon
                icon="domain"
                size="4xl"
                className="mb-6 text-gray-700 dark:text-gray-300"
              />
              <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                  Federal Facility
                </span>
                <span className="block text-gray-900 dark:text-white font-black">
                  Classifications
                </span>
              </h2>
              <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                Licensed and mission-ready across diverse federal and government
                facility projects
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl">
            {governmentProjects.map((project, index) => (
              <Card
                key={index}
                className="dark:bg-gray-800 hover:shadow-xl dark:hover:shadow-gray-600/50 transition-all hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="flex justify-center items-center bg-gray-200 dark:bg-gray-700 mb-4 rounded-lg w-16 h-16">
                    <MaterialIcon
                      icon={project.icon}
                      size="2xl"
                      className="text-gray-700 dark:text-gray-300"
                    />
                  </div>
                  <CardTitle className="mb-4 dark:text-white text-xl">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {project.examples.map((example, eIdx) => (
                      <li
                        key={eIdx}
                        className="flex items-center text-gray-700 dark:text-gray-300"
                      >
                        <MaterialIcon
                          icon="arrow_forward"
                          className="mr-2 text-gray-600 dark:text-gray-400"
                          size="sm"
                        />
                        <span className="text-sm">{example}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </StaggeredFadeIn>
        </div>
      </section>
      {/* Success Factors */}
      <section className="bg-white dark:bg-gray-900 py-20">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-6xl">
              <div className="mb-16 text-center">
                <MaterialIcon
                  icon="emoji_events"
                  size="4xl"
                  className="mb-6 text-gray-700 dark:text-gray-300"
                />
                <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                  <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                    Mission Success
                  </span>
                  <span className="block text-gray-900 dark:text-white font-black">
                    Factors
                  </span>
                </h2>
                <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                  What ensures federal contract success and how we deliver
                </p>
              </div>

              <div className="gap-6 grid md:grid-cols-2">
                {successFactors.map((factor, index) => (
                  <Card
                    key={index}
                    className="dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 transition-shadow"
                  >
                    <CardContent className="p-8">
                      <div className="flex items-start">
                        <div className="flex flex-shrink-0 justify-center items-center bg-gray-200 dark:bg-gray-700 mr-6 rounded-full w-14 h-14">
                          <MaterialIcon
                            icon={factor.icon}
                            size="lg"
                            className="text-gray-700 dark:text-gray-300"
                          />
                        </div>
                        <div>
                          <h3 className="mb-2 font-bold text-gray-900 dark:text-white text-xl">
                            {factor.title}
                          </h3>
                          <p className="text-gray-700 dark:text-gray-300">
                            {factor.description}
                          </p>
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
      {/* CTA Section - Strong Government Theme */}
      <section className="relative bg-gradient-to-r from-gray-900 to-black py-20 overflow-hidden text-white">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 36px)",
            }}
          ></div>
        </div>
        <div className="z-10 relative mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-4xl text-center">
              <MaterialIcon
                icon="flag"
                size="4xl"
                className="mb-8 text-gray-300"
              />
              <h2 className="mb-8 pb-2 font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                <span className="block mb-4 font-semibold text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                  Ready to Execute Your
                </span>
                <span className="block text-white font-black">
                  Federal Mission?
                </span>
              </h2>
              <p className="mb-8 text-gray-200 text-xl sm:text-2xl">
                Deploy with Army veteran leadership that delivers
                mission-critical results
              </p>
              <p className="mx-auto mb-12 max-w-3xl text-gray-100 text-lg sm:text-xl">
                Contact our command center to discuss your federal construction
                requirements and begin mission planning for successful execution
              </p>

              <div className="bg-white/10 backdrop-blur-sm mb-8 p-8 border-2 border-gray-600 rounded-lg">
                <div className="gap-6 grid md:grid-cols-3 text-center">
                  <div>
                    <MaterialIcon
                      icon="phone"
                      size="2xl"
                      className="mb-3 text-gray-300"
                    />
                    <p className="mb-1 text-gray-400 text-sm">Call Us</p>
                    <a
                      href="tel:+15093086489"
                      className="font-bold text-white hover:text-gray-300 text-2xl"
                    >
                      (509) 308-6489
                    </a>
                  </div>
                  <div>
                    <MaterialIcon
                      icon="email"
                      size="2xl"
                      className="mb-3 text-gray-300"
                    />
                    <p className="mb-1 text-gray-400 text-sm">Email Us</p>
                    <a
                      href="mailto:office@mhc-gc.com"
                      className="font-bold text-white hover:text-gray-300 text-lg"
                    >
                      office@mhc-gc.com
                    </a>
                  </div>
                  <div>
                    <MaterialIcon
                      icon="location_on"
                      size="2xl"
                      className="mb-3 text-gray-300"
                    />
                    <p className="mb-1 text-gray-400 text-sm">Visit Us</p>
                    <p className="font-bold text-white text-lg">
                      3111 N. Capital Ave.
                      <br />
                      Pasco, WA 99301
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex sm:flex-row flex-col justify-center gap-4">
                <Link href="/booking">
                  <Button
                    size="lg"
                    className="bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-800 px-10 py-7 text-white text-xl"
                  >
                    <MaterialIcon
                      icon="phone_in_talk"
                      className="mr-3"
                      size="lg"
                    />
                    Request Mission Brief
                  </Button>
                </Link>
                <Button
                  size="lg"
                  className="bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 px-10 py-7 text-white dark:text-white text-xl"
                >
                  <MaterialIcon icon="download" className="mr-3" size="lg" />
                  Federal Capabilities Brief
                </Button>
              </div>

              <p className="mt-8 text-gray-400 text-sm">
                <MaterialIcon
                  icon="schedule"
                  className="inline mr-2"
                  size="sm"
                />
                Monday - Friday: 0800 - 1700 PST | Emergency Response Available
                24/7
              </p>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  );
}
