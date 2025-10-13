"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui";
import { MaterialIcon } from "../../components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
  HoverScale,
} from "../../components/animations/DynamicAnimations";
import { PageNavigation } from "../../components/navigation/PageNavigation";
import { navigationConfigs } from "../../components/navigation/navigationConfigs";

// Grant Support Services
const grantSupportServices = [
  {
    icon: "calculate",
    title: "Accurate Cost Estimation",
    description:
      "Professional-grade cost estimates ensuring reliable numbers for your budget pitch",
    features: [
      "Detailed line-item cost breakdowns",
      "Material cost projections with market analysis",
      "Labor cost estimates based on current rates",
      "Contingency planning and risk assessment",
      "Professional documentation meeting grant standards",
    ],
  },
  {
    icon: "architecture",
    title: "Design & Schedule Validation",
    description:
      "Comprehensive documentation on project design, feasibility, and realistic timelines",
    features: [
      "Constructability review and analysis",
      "Feasibility studies and site assessments",
      "Realistic project timeline development",
      "Phase-by-phase scheduling documentation",
      "Critical path analysis and design validation",
    ],
  },
  {
    icon: "verified",
    title: "Compliance Assurance",
    description: "Navigate complex grant specifications with expert guidance",
    features: [
      "Grant specification review and interpretation",
      "Compliance documentation preparation",
      "Building code verification (WA, OR, ID)",
      "Environmental and safety compliance support",
      "Regulatory requirement coordination",
    ],
  },
];

// Government project types
const governmentProjects = [
  {
    icon: "school",
    title: "Educational Facilities",
    examples: [
      "K-12 Schools",
      "Community Colleges",
      "Training Facilities",
      "Libraries",
    ],
  },
  {
    icon: "account_balance",
    title: "Government Buildings",
    examples: [
      "Municipal Offices",
      "Public Safety Facilities",
      "Courthouses",
      "Civic Centers",
    ],
  },
  {
    icon: "church",
    title: "Religious Facilities",
    examples: [
      "Worship Centers",
      "Religious Education",
      "Community Spaces",
      "Renovations",
    ],
  },
  {
    icon: "groups",
    title: "Community Projects",
    examples: [
      "Recreation Centers",
      "Public Health Facilities",
      "Senior Centers",
      "Community Hubs",
    ],
  },
  {
    icon: "engineering",
    title: "Infrastructure",
    examples: [
      "Public Works",
      "Utility Buildings",
      "Maintenance Facilities",
      "Emergency Services",
    ],
  },
  {
    icon: "science",
    title: "DOE & Hanford Support",
    examples: [
      "Support Facilities",
      "Administrative Buildings",
      "Training Centers",
      "Safety Systems",
    ],
  },
];

// Grant types
const grantTypes = [
  {
    category: "Federal Grants",
    icon: "flag",
    programs: [
      "Department of Energy (DOE)",
      "General Services Administration (GSA)",
      "FEMA Emergency Management",
      "Department of Defense (DoD)",
      "Small Business Administration (SBA)",
    ],
  },
  {
    category: "State & Local Grants",
    icon: "location_city",
    programs: [
      "Washington State Programs",
      "Oregon State Funding",
      "Idaho Construction Grants",
      "County and Municipal Grants",
      "Community Development (CDBG)",
    ],
  },
  {
    category: "Specialized Grants",
    icon: "star",
    programs: [
      "Educational Facility Grants",
      "Religious Organization Funding",
      "Non-Profit Construction",
      "Historic Preservation",
      "Environmental & Sustainability",
    ],
  },
];

// Process steps
const processSteps = [
  {
    step: 1,
    title: "Initial Consultation",
    description:
      "Review grant requirements, assess feasibility, and establish documentation timeline",
    icon: "chat",
  },
  {
    step: 2,
    title: "Cost Estimation",
    description:
      "Develop detailed estimates and prepare comprehensive financial documentation",
    icon: "calculate",
  },
  {
    step: 3,
    title: "Technical Support",
    description:
      "Validate design specifications and provide constructability analysis",
    icon: "engineering",
  },
  {
    step: 4,
    title: "Compliance Review",
    description:
      "Ensure all regulatory requirements and grant specifications are met",
    icon: "fact_check",
  },
  {
    step: 5,
    title: "Submission Support",
    description: "Final documentation review and ongoing clarification support",
    icon: "send",
  },
];

// Hanford capabilities
const hanfordCapabilities = [
  {
    icon: "security",
    title: "Security Coordination",
    description:
      "Clearance coordination and DOE security protocol understanding",
  },
  {
    icon: "gavel",
    title: "DOE Compliance",
    description: "Department of Energy documentation and compliance expertise",
  },
  {
    icon: "health_and_safety",
    title: "Safety Protocols",
    description:
      "Radiation safety and Hanford-specific safety system knowledge",
  },
  {
    icon: "handshake",
    title: "Contractor Network",
    description: "Established relationships with Hanford-area subcontractors",
  },
  {
    icon: "emergency",
    title: "Emergency Response",
    description: "24/7 emergency response capabilities for critical projects",
  },
  {
    icon: "workspace_premium",
    title: "Quality Systems",
    description: "Comprehensive quality control meeting federal standards",
  },
];

// Success factors
const successFactors = [
  {
    icon: "assignment",
    title: "Professional Documentation",
    description:
      "Industry-standard formatting and complete technical specifications",
  },
  {
    icon: "schedule",
    title: "Realistic Timelines",
    description:
      "Achievable schedules with contingencies and detailed planning",
  },
  {
    icon: "verified_user",
    title: "Compliance Verification",
    description:
      "All requirements clearly addressed with supporting documentation",
  },
  {
    icon: "business_center",
    title: "Qualified Contractor",
    description: "Experienced team with proven capabilities and licensing",
  },
];

export default function GovernmentGrantsPage() {
  const [selectedGrantType, setSelectedGrantType] = useState<string | null>(
    null
  );

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
                Government & Grant Projects
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-3xl mx-auto text-xl sm:text-2xl md:text-3xl text-white/90 leading-relaxed">
              Expert Construction Support for Federal, State, and Local Grant
              Applications
            </p>

            {/* Description */}
            <p className="max-w-4xl mx-auto text-lg md:text-xl text-white/80 leading-relaxed">
              MH Construction provides the detailed, verified construction
              documentation you need to maximize your grant application success.
              From DOE projects to community facilities, we deliver
              military-grade precision for government work.
            </p>
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
                  <p className="font-bold text-lg">Veteran-Owned</p>
                  <p className="text-gray-300 text-sm">
                    Military Precision Applied
                  </p>
                </div>
              </div>
              <div className="hidden md:block bg-gray-600 w-px h-12"></div>
              <div className="flex items-center">
                <MaterialIcon icon="verified" size="lg" className="mr-3" />
                <div className="text-left">
                  <p className="font-bold text-lg">Licensed in WA, OR, ID</p>
                  <p className="text-gray-300 text-sm">Tri-State Coverage</p>
                </div>
              </div>
              <div className="hidden md:block bg-gray-600 w-px h-12"></div>
              <div className="flex items-center">
                <MaterialIcon icon="science" size="lg" className="mr-3" />
                <div className="text-left">
                  <p className="font-bold text-lg">DOE & Hanford Experience</p>
                  <p className="text-gray-300 text-sm">
                    Federal Compliance Ready
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
            <div className="mb-16 text-center">
              <MaterialIcon
                icon="support"
                size="3xl"
                className="mb-4 text-gray-700 dark:text-gray-300"
              />
              <h2 className="mb-6 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                <span className="text-gray-700 dark:text-gray-300">
                  How We Support Your
                </span>{" "}
                <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent">
                  Grant Application
                </span>
              </h2>
              <p className="mx-auto max-w-4xl text-gray-600 dark:text-gray-300 text-xl">
                Our experienced Tri-Cities team provides essential technical
                support to meet grant construction specifications and maximize
                approval success
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-8 grid md:grid-cols-3 mx-auto max-w-7xl">
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
                <h2 className="mb-6 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                  <span className="text-gray-300">Hanford & Department of</span>{" "}
                  <span className="bg-clip-text bg-gradient-to-r from-white to-brand-accent text-transparent">
                    Energy Expertise
                  </span>
                </h2>
                <p className="mx-auto max-w-3xl text-gray-200 text-xl">
                  Extensive experience working in the Hanford area with deep
                  understanding of DOE project requirements and federal
                  compliance standards
                </p>
              </div>

              <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-3 mb-12">
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
              </div>

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
                        Hanford Project Capabilities
                      </h3>
                      <div className="gap-4 grid md:grid-cols-2">
                        {[
                          "Support facility construction",
                          "Administrative building renovations",
                          "Training facility development",
                          "Infrastructure improvements",
                          "Safety system installations",
                          "Emergency response projects",
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
            <div className="mb-16 text-center">
              <MaterialIcon
                icon="folder_special"
                size="3xl"
                className="mb-4 text-gray-700 dark:text-gray-300"
              />
              <h2 className="mb-6 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                <span className="text-gray-700 dark:text-gray-300">
                  Grant Programs
                </span>{" "}
                <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent">
                  We Support
                </span>
              </h2>
              <p className="mx-auto max-w-3xl text-gray-600 dark:text-gray-300 text-xl">
                Experience with federal, state, local, and specialized grant
                programs
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="gap-8 grid md:grid-cols-3 mx-auto max-w-7xl">
            {grantTypes.map((type, index) => (
              <HoverScale key={index}>
                <div
                  className="h-full cursor-pointer"
                  onClick={() =>
                    setSelectedGrantType(
                      selectedGrantType === type.category ? null : type.category
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
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="bg-white dark:bg-gray-900 py-20">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-5xl">
              <div className="mb-16 text-center">
                <MaterialIcon
                  icon="timeline"
                  size="3xl"
                  className="mb-4 text-gray-700 dark:text-gray-300"
                />
                <h2 className="mb-6 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                  <span className="text-gray-700 dark:text-gray-300">
                    Our Grant Application
                  </span>{" "}
                  <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent">
                    Support Process
                  </span>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-xl">
                  Five-phase approach to maximize your grant success
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
                size="3xl"
                className="mb-4 text-gray-700 dark:text-gray-300"
              />
              <h2 className="mb-6 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                <span className="text-gray-700 dark:text-gray-300">
                  Government
                </span>{" "}
                <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent">
                  Project Types
                </span>
              </h2>
              <p className="mx-auto max-w-3xl text-gray-600 dark:text-gray-300 text-xl">
                Licensed and experienced across diverse government and community
                facility projects
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-6 grid md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl">
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
                  size="3xl"
                  className="mb-4 text-gray-700 dark:text-gray-300"
                />
                <h2 className="mb-6 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                  <span className="text-gray-700 dark:text-gray-300">
                    Maximizing Your
                  </span>{" "}
                  <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent">
                    Grant Success
                  </span>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-xl">
                  What makes a strong grant application and how we deliver
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
              <h2 className="mb-6 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                <span className="text-gray-300">Ready to Start Your</span>{" "}
                <span className="bg-clip-text bg-gradient-to-r from-white to-brand-accent text-transparent">
                  Grant Application?
                </span>
              </h2>
              <p className="mb-8 text-gray-200 text-2xl">
                Partner with a veteran-owned construction team that understands
                government requirements
              </p>
              <p className="mx-auto mb-12 max-w-3xl text-gray-100 text-xl">
                Call now to discuss your grant-based construction project with
                an expert and take the first step toward a successful build
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
                      href="mailto:info@mhconstruction.com"
                      className="font-bold text-white hover:text-gray-300 text-lg"
                    >
                      info@mhconstruction.com
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
                    className="bg-brand-primary hover:bg-brand-primary-dark dark:bg-brand-primary dark:hover:bg-brand-primary-dark px-10 py-7 text-white text-xl"
                  >
                    <MaterialIcon
                      icon="phone_in_talk"
                      className="mr-3"
                      size="lg"
                    />
                    Schedule Consultation
                  </Button>
                </Link>
                <Button
                  size="lg"
                  className="bg-brand-secondary hover:bg-brand-secondary-dark dark:bg-brand-secondary dark:hover:bg-brand-secondary-dark px-10 py-7 text-black dark:text-black text-xl"
                >
                  <MaterialIcon icon="download" className="mr-3" size="lg" />
                  Download Capabilities
                </Button>
              </div>

              <p className="mt-8 text-gray-400 text-sm">
                <MaterialIcon
                  icon="schedule"
                  className="inline mr-2"
                  size="sm"
                />
                Monday - Friday: 8:00 AM - 5:00 PM PST | 24/7 Emergency Support
              </p>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  );
}
