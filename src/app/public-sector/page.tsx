import Link from "next/link";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui";
import { DiagonalStripePattern } from "@/components/ui/backgrounds";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { gridPresets } from "@/lib/styles/layout-variants";
import { UnderConstruction } from "@/components/layout/UnderConstruction";
import { COMPANY_INFO } from "@/lib/constants/company";
import { InteractiveGrantSelector } from "./InteractiveGrantSelector";
import { StrategicCTABanner } from "@/components/ui/cta";
import { StructuredData } from "@/components/seo/seo-meta";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";

// Feature flag - set to false to show full page content
const SHOW_UNDER_CONSTRUCTION = true;

// Federal contracting services
const grantSupportServices = [
  {
    icon: "military_tech",
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
    icon: "gps_fixed",
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
    icon: "military_tech",
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
    icon: "diversity_3",
    title: "Community Mission Facilities",
    examples: [
      "Military Chapels",
      "Community Centers on Base",
      "Multi-Purpose Facilities",
      "Mission Support Buildings",
    ],
  },
  {
    icon: "volunteer_activism",
    title: "Public Service Facilities",
    examples: [
      "Veterans Service Centers",
      "Public Health Command",
      "Emergency Response Centers",
      "Mission Support Hubs",
    ],
  },
  {
    icon: "construction",
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
    icon: "campaign",
  },
  {
    step: 2,
    title: "Tactical Cost Analysis",
    description:
      "Develop detailed cost projections and prepare comprehensive fiscal documentation",
    icon: "military_tech",
  },
  {
    step: 3,
    title: "Technical Validation",
    description:
      "Validate specifications and provide operational constructability analysis",
    icon: "gps_fixed",
  },
  {
    step: 4,
    title: "Compliance Verification",
    description:
      "Ensure all federal regulations and operational requirements are met",
    icon: "verified",
  },
  {
    step: 5,
    title: "Mission Execution",
    description:
      "Final documentation review and operational deployment support",
    icon: "rocket_launch",
  },
];

// Federal contracting capabilities
const hanfordCapabilities = [
  {
    icon: "verified_user",
    title: "Security Operations Coordination",
    description:
      "Clearance protocols and federal security compliance expertise",
  },
  {
    icon: "balance",
    title: "Federal Acquisition Compliance",
    description:
      "Department of Energy and federal procurement regulation expertise",
  },
  {
    icon: "health_and_safety",
    title: "Award-Winning Safety Protocols",
    description:
      ".64 EMR award-winning safety record (40% better than industry), OSHA VPP Star designation, and mission-specific safety system implementation",
  },
  {
    icon: "diversity_3",
    title: "Strategic Partner Network",
    description: "Vetted Ally relationships for federal project execution",
  },
  {
    icon: "bolt",
    title: "Rapid Response Construction",
    description:
      "Emergency construction capabilities for mission-critical timelines",
  },
  {
    icon: "workspace_premium",
    title: "Military-Grade Quality Assurance",
    description:
      "Award-winning quality control exceeding federal standards with 150+ years combined team experience",
  },
];

// Federal contract success factors
const successFactors = [
  {
    icon: "description",
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
    icon: "military_tech",
    title: "Veteran-Owned Qualified Contractor",
    description:
      "Veteran-owned since January 2025 under Army veteran leadership with proven federal contracting capabilities and 150+ years combined team experience",
  },
];

export default function PublicSectorPage() {
  // Show under construction notice while preserving all content below
  if (SHOW_UNDER_CONSTRUCTION) {
    return (
      <UnderConstruction
        pageName="Public Sector Contracting"
        description="We're building bonding capacity and establishing partnerships to serve government projects. Currently available for grant application support and subcontracting opportunities."
        estimatedCompletion="Q2 2026"
      />
    );
  }

  // Original page content preserved below - will be shown when flag is set to false
  return (
    <div className="bg-gradient-to-b from-white dark:from-gray-900 to-gray-50 dark:to-gray-800 min-h-screen">
      <StructuredData
        data={generateBreadcrumbSchema(breadcrumbPatterns.publicSector)}
      />
      {/* Enhanced SEO Meta Tags */}
      {/* Hero Section - Group 4: Professional & Patriotic */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 h-screen flex items-end justify-end text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700/30 via-gray-900/80 to-gray-600/20"></div>

        {/* Content - Bottom Right */}
        <div className="relative z-30 mb-32 sm:mb-36 md:mb-40 lg:mb-44 mr-4 sm:mr-6 lg:mr-8 xl:mr-12 ml-auto max-w-2xl pointer-events-none pb-2">
          <h1 className="text-right text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white drop-shadow-2xl leading-relaxed">
            <span className="block text-gray-300 text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-1">
              Public Sector → Government
            </span>
            <span className="block text-gray-300">
              Federal Contracting Excellence
            </span>
            <span className="block text-brand-primary">
              Veteran-Owned Precision for Mission-Critical Government Projects
            </span>
            <span className="block text-white/90">
              Building projects for the client,{" "}
              <span className="font-black italic text-bronze-300">NOT</span> the
              dollar
            </span>
          </h1>
        </div>

        {/* Page-Specific Navigation Bar */}
        <PageNavigation
          items={navigationConfigs.publicSector}
          className="absolute bottom-0 left-0 right-0"
        />
      </section>
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Public Sector Projects" },
        ]}
      />
      {/* Grant Support Services */}
      <section className="bg-white dark:bg-gray-900 py-20">
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            {/* Section Header - Military Construction Standard */}
            <div className="mb-16 sm:mb-20 text-center">
              {/* Icon with decorative lines */}
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                  <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="account_balance"
                      size="2xl"
                      className="text-white drop-shadow-lg"
                    />
                  </div>
                </div>
                <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              </div>

              {/* Two-line gradient heading */}
              <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  Federal Contracting
                </span>
                <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  Support Services
                </span>
              </h2>

              {/* Description with colored keyword highlighting */}
              <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                  Veteran-owned Army veteran leadership
                </span>{" "}
                delivers mission-critical construction services with unwavering
                commitment to federal specifications, operational success,{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  award-winning safety (.64 EMR)
                </span>
                , and transparent open-book partnership throughout the
                application and execution process—Building projects for the
                client,{" "}
                <span className="font-black italic text-bronze-600 dark:text-bronze-400">
                  NOT
                </span>{" "}
                the dollar with 150+ years combined experience.
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn
            className={gridPresets.cards3("lg", "mx-auto max-w-7xl")}
          >
            {grantSupportServices.map((service, _index) => (
              <Card
                key={_index}
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
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-6xl">
              {/* Section Header - Military Construction Standard */}
              <div className="mb-16 sm:mb-20 text-center">
                {/* Icon with decorative lines */}
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-500 rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50">
                      <MaterialIcon
                        icon="science"
                        size="2xl"
                        className="text-white drop-shadow-lg"
                      />
                    </div>
                  </div>
                  <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-500 rounded-full"></div>
                </div>

                {/* Two-line gradient heading */}
                <h2 className="mb-6 sm:mb-8 font-black text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                  <span className="block mb-3 sm:mb-4 font-semibold text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                    Hanford & Department of
                  </span>
                  <span className="block bg-gradient-to-r from-brand-primary-light via-white to-brand-primary-light bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    Energy Expertise
                  </span>
                </h2>

                {/* Description with colored keyword highlighting */}
                <p className="mx-auto max-w-5xl font-light text-gray-200 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  <span className="font-bold text-brand-primary-light">
                    Proven operational excellence
                  </span>{" "}
                  in high-security DOE and Hanford environments with
                  comprehensive understanding of federal compliance
                  requirements,{" "}
                  <span className="font-bold text-white">
                    award-winning safety protocols (.64 EMR—40% better than
                    industry)
                  </span>
                  , mission-critical construction protocols, and veteran-owned
                  reliability since January 2025.
                </p>
              </div>

              <StaggeredFadeIn className={gridPresets.cards3("md", "mb-12")}>
                {hanfordCapabilities.map((capability, _index) => (
                  <Card
                    key={_index}
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
                      theme="military"
                      ariaLabel="Federal Project Capabilities"
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
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            {/* Section Header - Military Construction Standard */}
            <div className="mb-16 sm:mb-20 text-center">
              {/* Icon with decorative lines */}
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/30 to-bronze-600/30 blur-2xl rounded-full"></div>
                  <div className="relative bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="gavel"
                      size="2xl"
                      className="text-white drop-shadow-lg"
                    />
                  </div>
                </div>
                <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              </div>

              {/* Two-line gradient heading */}
              <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  Federal Contract
                </span>
                <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  Categories
                </span>
              </h2>

              {/* Description with colored keyword highlighting */}
              <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                  Proven execution
                </span>{" "}
                across federal, state, and mission-critical construction
                contracts with{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  veteran-owned expertise and award-winning safety record
                </span>
                .
              </p>
            </div>
          </FadeInWhenVisible>

          <InteractiveGrantSelector grantTypes={grantTypes} />
        </div>
      </section>{" "}
      {/* Process Steps */}
      <section className="bg-white dark:bg-gray-900 py-20">
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-5xl">
              {/* Section Header - Military Construction Standard */}
              <div className="mb-16 sm:mb-20 text-center">
                {/* Icon with decorative lines */}
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 blur-2xl rounded-full"></div>
                    <div className="relative bg-gradient-to-br from-brand-primary via-brand-secondary to-bronze-700 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                      <MaterialIcon
                        icon="timeline"
                        size="2xl"
                        className="text-white drop-shadow-lg"
                      />
                    </div>
                  </div>
                  <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                </div>

                {/* Two-line gradient heading */}
                <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                  <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                    Federal Contract
                  </span>
                  <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    Execution Process
                  </span>
                </h2>

                {/* Description with colored keyword highlighting */}
                <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                    Five-phase military approach
                  </span>{" "}
                  to federal contract success backed by{" "}
                  <span className="font-bold text-gray-900 dark:text-white">
                    Army veteran leadership and award-winning execution
                  </span>
                  .
                </p>
              </div>

              <div className="space-y-6">
                {processSteps.map((process, _index) => (
                  <Card
                    key={_index}
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
      <section className="bg-gray-50 dark:bg-gray-800 py-20">
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            {/* Section Header - Military Construction Standard */}
            <div className="mb-16 sm:mb-20 text-center">
              {/* Icon with decorative lines */}
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/30 to-bronze-700/30 blur-2xl rounded-full"></div>
                  <div className="relative bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="domain"
                      size="2xl"
                      className="text-white drop-shadow-lg"
                    />
                  </div>
                </div>
                <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              </div>

              {/* Two-line gradient heading */}
              <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  Federal Facility
                </span>
                <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  Classifications
                </span>
              </h2>

              {/* Description with colored keyword highlighting */}
              <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                  Licensed and mission-ready
                </span>{" "}
                across diverse federal and government facility projects with{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  veteran-owned precision and 150+ years combined team
                  experience
                </span>
                .
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn
            className={gridPresets.cards3("md", "mx-auto max-w-7xl")}
          >
            {governmentProjects.map((project, _index) => (
              <Card
                key={_index}
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
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-6xl">
              {/* Section Header - Military Construction Standard */}
              <div className="mb-16 sm:mb-20 text-center">
                {/* Icon with decorative lines */}
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/30 to-bronze-700/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                      <MaterialIcon
                        icon="emoji_events"
                        size="2xl"
                        className="text-white drop-shadow-lg"
                      />
                    </div>
                  </div>
                  <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                </div>

                {/* Two-line gradient heading */}
                <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                  <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                    Mission Success
                  </span>
                  <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    Factors
                  </span>
                </h2>

                {/* Description with colored keyword highlighting */}
                <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  What ensures{" "}
                  <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                    federal contract success
                  </span>{" "}
                  and how we deliver with{" "}
                  <span className="font-bold text-gray-900 dark:text-white">
                    award-winning safety, veteran-owned leadership, and
                    transparent open-book partnership
                  </span>
                  .
                </p>
              </div>

              <div className="gap-6 grid md:grid-cols-2">
                {successFactors.map((factor, _index) => (
                  <Card
                    key={_index}
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
        <DiagonalStripePattern
          lightOpacity={0.1}
          darkOpacity={0.1}
          color="rgba(255,255,255,0.1)"
        />
        <div className="z-10 relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-4xl text-center">
              {/* Section Header - Military Construction Standard */}
              <div className="mb-16 sm:mb-20 text-center">
                {/* Icon with decorative lines */}
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-500 rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50">
                      <MaterialIcon
                        icon="flag"
                        size="2xl"
                        className="text-white drop-shadow-lg"
                      />
                    </div>
                  </div>
                  <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-500 rounded-full"></div>
                </div>

                {/* Two-line gradient heading */}
                <h2 className="mb-6 sm:mb-8 font-black text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                  <span className="block mb-3 sm:mb-4 font-semibold text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                    Ready to Execute Your
                  </span>
                  <span className="block bg-gradient-to-r from-brand-primary-light via-white to-brand-primary-light bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    Federal Mission?
                  </span>
                </h2>

                {/* Description with colored keyword highlighting */}
                <p className="mx-auto max-w-5xl mb-8 font-light text-gray-200 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  Deploy with{" "}
                  <span className="font-bold text-brand-primary-light">
                    Army veteran leadership
                  </span>{" "}
                  that delivers{" "}
                  <span className="font-bold text-white">
                    mission-critical results
                  </span>
                  . Contact our command center to discuss your federal
                  construction requirements and begin mission planning for
                  successful execution.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm mb-8 p-8 border-2 border-gray-600 rounded-lg">
                <div className="gap-6 grid md:grid-cols-3 text-center">
                  <div>
                    <MaterialIcon
                      icon="call"
                      size="2xl"
                      theme="military"
                      ariaLabel="Call Us"
                      className="mb-3 text-gray-300"
                    />
                    <p className="mb-1 text-gray-400 text-sm">Call Us</p>
                    <a
                      href={`tel:${COMPANY_INFO.phone.tel}`}
                      className="font-bold text-white hover:text-gray-300 text-2xl"
                    >
                      {COMPANY_INFO.phone.display}
                    </a>
                  </div>
                  <div>
                    <MaterialIcon
                      icon="mark_email_read"
                      size="2xl"
                      theme="military"
                      ariaLabel="Email Us"
                      className="mb-3 text-gray-300"
                    />
                    <p className="mb-1 text-gray-400 text-sm">Email Us</p>
                    <a
                      href={`mailto:${COMPANY_INFO.email.main}`}
                      className="font-bold text-white hover:text-gray-300 text-lg"
                    >
                      {COMPANY_INFO.email.main}
                    </a>
                  </div>
                  <div>
                    <MaterialIcon
                      icon="location_on"
                      size="2xl"
                      theme="military"
                      ariaLabel="Visit Us"
                      className="mb-3 text-gray-300"
                    />
                    <p className="mb-1 text-gray-400 text-sm">Visit Us</p>
                    <p className="font-bold text-white text-lg">
                      {COMPANY_INFO.address.street}
                      <br />
                      {COMPANY_INFO.address.city}, {COMPANY_INFO.address.state}{" "}
                      {COMPANY_INFO.address.zip}
                    </p>
                  </div>
                </div>
              </div>

              {/* Strategic CTA Banner - Conversion Optimization */}
              <div className="mb-12">
                <StrategicCTABanner variant="combo" className="my-0" />
              </div>

              <div className="flex sm:flex-row flex-col justify-center gap-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-800 px-10 py-7 text-white text-xl"
                  >
                    <MaterialIcon
                      icon="campaign"
                      className="mr-3"
                      size="lg"
                      theme="military"
                      ariaLabel="Request Mission Brief"
                    />
                    Request Mission Brief
                  </Button>
                </Link>
                <Button
                  size="lg"
                  className="bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 px-10 py-7 text-white dark:text-white text-xl"
                >
                  <MaterialIcon
                    icon="download"
                    className="mr-3"
                    size="lg"
                    theme="military"
                    ariaLabel="Federal Capabilities Brief"
                  />
                  Federal Capabilities Brief
                </Button>
              </div>

              <p className="mt-8 text-gray-400 text-sm">
                <MaterialIcon
                  icon="schedule"
                  className="inline mr-2"
                  size="sm"
                  theme="military"
                  ariaLabel="Business Hours"
                />
                Monday - Friday: 0700 - 1600 PST | Emergency Response Available
                24/7
              </p>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  );
}
