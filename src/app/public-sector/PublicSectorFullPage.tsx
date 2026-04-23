import { PageTrackingClient } from "@/components/analytics";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Button, AlternatingShowcase } from "@/components/ui";
import {
  DiagonalStripePattern,
  BrandColorBlobs,
} from "@/components/ui/backgrounds";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { StaggeredFadeIn } from "@/components/animations/FramerMotionComponents";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { gridPresets } from "@/lib/styles/layout-variants";
import { COMPANY_INFO } from "@/lib/constants/company";
import { StructuredData } from "@/components/seo/SeoMeta";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";

const breadcrumbSchema = generateBreadcrumbSchema(
  breadcrumbPatterns.publicSector,
);

// Lazy load heavy interactive components for better mobile performance
const InteractiveGrantSelector = dynamic(() =>
  import("./InteractiveGrantSelector").then((mod) => ({
    default: mod.InteractiveGrantSelector,
  })),
);
const StrategicCTABanner = dynamic(() =>
  import("@/components/ui/cta").then((mod) => ({
    default: mod.StrategicCTABanner,
  })),
);

const NextStepsSection = dynamic(
  () =>
    import("@/components/shared-sections").then((mod) => ({
      default: mod.NextStepsSection,
    })),
  { ssr: true },
);

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
      "Navigate complex federal regulations with veteran expertise, disciplined planning, and clear documentation",
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
      "Founded 2010, Veteran-Owned Since January 2025 when Army veteran Jeremy Thamert purchased the company, bringing proven federal contracting capabilities and 150+ years combined team experience",
  },
];

export default function PublicSectorFullPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <PageTrackingClient pageName="Public Sector" />
      <StructuredData data={breadcrumbSchema} />
      {/* Hero Section - Group 4: Professional & Patriotic */}
      <section className="hero-section relative bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 flex items-end justify-end text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700/30 via-gray-900/80 to-gray-600/20"></div>

        {/* Content - Bottom Right */}
        <div className="relative z-30 mb-32 sm:mb-36 md:mb-40 lg:mb-44 mr-4 sm:mr-6 lg:mr-8 xl:mr-12 ml-auto max-w-2xl pointer-events-none pb-2">
          {/* Mission Icon */}
          <div className="flex justify-end mb-4">
            <div className="relative p-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border-2 border-white/30 shadow-2xl">
              <MaterialIcon
                icon="account_balance"
                size="4xl"
                className="text-white drop-shadow-lg"
                ariaLabel="Federal Contracting Excellence"
              />
            </div>
          </div>
          <h1 className="text-right text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white drop-shadow-2xl leading-tight tracking-tight">
            <span className="block text-brand-secondary text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-1">
              Public Sector → Government
            </span>
            <span className="block text-brand-secondary">
              Mission-Ready, Compliance-Driven
            </span>
            <span className="block text-brand-primary">
              Veteran-Owned Partnership for Government Projects
            </span>
            <span className="block text-white/90">
              Building projects for the Client,{" "}
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
      <section
        id="overview"
        className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
      >
        <DiagonalStripePattern />
        <BrandColorBlobs />
        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Section Header */}
          <div className="mb-16 sm:mb-20 text-center">
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

            <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
              <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                Federal Contracting
              </span>
              <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                Support Services
              </span>
            </h2>

            <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
              <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                Army-veteran-led team
              </span>{" "}
              delivers mission-critical construction services with unwavering
              commitment to federal specifications, operational success,{" "}
              <span className="font-bold text-gray-900 dark:text-white">
                award-winning safety (.64 EMR)
              </span>
              , and transparent open-book partnership throughout the application
              and execution process—Building projects for the client,{" "}
              <span className="font-black italic text-bronze-600 dark:text-bronze-400">
                NOT
              </span>{" "}
              the dollar with 150+ years combined experience.
            </p>
          </div>

          <StaggeredFadeIn
            className={gridPresets.cards3("lg", "mx-auto max-w-7xl")}
          >
            {grantSupportServices.map((service, index) => (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 hover:border-transparent transition-all duration-300 overflow-hidden hover:-translate-y-1"
              >
                {/* Animated border glow */}
                <div
                  className="absolute -inset-2 bg-gradient-to-r from-slate-600/40 to-gray-700/40 blur-xl opacity-20 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                  aria-hidden="true"
                />
                {/* Top accent bar */}
                <div className="h-2 bg-gradient-to-r from-slate-600 via-gray-700 to-slate-600" />
                <div className="relative p-6 sm:p-8 pt-8">
                  {/* Icon with nested blur layers */}
                  <div className="relative inline-block mb-6">
                    <div
                      className="absolute -inset-2 bg-gradient-to-r from-slate-600/40 to-gray-700/40 blur-lg opacity-70"
                      aria-hidden="true"
                    />
                    <div className="relative bg-gradient-to-br from-slate-600 via-gray-700 to-slate-800 p-4 rounded-xl shadow-xl">
                      <MaterialIcon
                        icon={service.icon}
                        size="2xl"
                        className="text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
                    {service.description}
                  </p>
                  <div className="border-t dark:border-gray-700 pt-6">
                    <p className="mb-3 font-semibold text-gray-900 dark:text-white text-sm">
                      What We Provide:
                    </p>
                    <ul className="space-y-3">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start text-sm">
                          <MaterialIcon
                            icon="check_circle"
                            className="flex-shrink-0 mt-0.5 mr-2 text-gray-500 dark:text-gray-400"
                            size="sm"
                          />
                          <span className="text-gray-700 dark:text-gray-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </StaggeredFadeIn>
        </div>
      </section>
      {/* Federal Compliance Features - AlternatingShowcase */}
      <AlternatingShowcase
        items={[
          {
            id: "prevailing-wage",
            title: "Prevailing Wage Compliance",
            icon: "payments",
            tagline: "Federal Wage Standards",
            description:
              "Full compliance with Davis-Bacon and Related Acts (DBRA) prevailing wage requirements for federal construction projects. Certified payroll documentation, wage determination expertise, and meticulous record-keeping ensure all federal labor standards are met with disciplined execution and complete transparency.",
            image: "/images/compliance/prevailing-wage.webp",
            iconBg: "bg-brand-primary",
            stats: "100%",
            statsLabel: "DBRA Compliance Rate",
          },
          {
            id: "bonding-insurance",
            title: "Bonding & Insurance Excellence",
            icon: "verified_user",
            tagline: "Financial Security Assurance",
            description:
              "Comprehensive bonding capacity and insurance coverage meeting all federal requirements. Performance bonds, payment bonds, bid bonds, and professional liability insurance ensure complete financial protection for government projects. Our bonding relationships and insurance portfolio demonstrate financial stability and commitment to federal contracting excellence.",
            image: "/images/compliance/bonding.webp",
            iconBg: "bg-brand-secondary",
            stats: "$5M+",
            statsLabel: "Bonding Capacity",
          },
          {
            id: "safety-certifications",
            title: "Award-Winning Safety Programs",
            icon: "health_and_safety",
            tagline: "OSHA VPP Star Designation",
            description:
              ".64 EMR safety rating—40% better than industry average—with OSHA VPP Star designation and multiple AGC-WA Top EMR Awards. Zero time-loss injuries for 3+ consecutive years. Our military-grade safety protocols, comprehensive training programs, and daily safety briefings exceed all federal safety requirements and ensure mission-critical project execution without compromise.",
            image: "/images/compliance/safety.webp",
            iconBg: "bg-bronze-700",
            stats: ".64",
            statsLabel: "EMR Safety Rating",
          },
          {
            id: "veteran-preference",
            title: "Veteran-Owned & BABAA Commitment",
            icon: "military_tech",
            tagline: "Service-Earned Values",
            description:
              "Veteran-Owned Since January 2025 when Army veteran Jeremy Thamert purchased the company, bringing 15+ years military aviation experience and operational discipline. We are a dedicated supporter of the Build America, Buy America Act (BABAA), a federal domestic-content requirement for certain federally funded infrastructure projects, and we stay current on compliance-forward practices through AGC resources. We also actively recruit veterans, offer veteran hiring initiatives, and maintain veteran preference in employment decisions. Our values translate to disciplined execution, transparent communication, and unwavering commitment to federal project success.",
            image: "/images/compliance/veteran-owned.webp",
            iconBg: "bg-brand-primary",
            stats: "2025",
            statsLabel: "Veteran-Owned Since",
            link: {
              href: "https://www.agc.org/babaa-resource-hub",
              text: "AGC BABAA Resource Hub →",
            },
          },
        ]}
        title="Excellence"
        subtitle="Federal Compliance"
        icon="verified"
        description={
          <>
            Navigate complex federal regulations with{" "}
            <span className="font-bold text-brand-primary dark:text-brand-primary-light">
              Veteran-Owned expertise and disciplined execution
            </span>
            . Our comprehensive compliance programs, award-winning safety
            record, and{" "}
            <span className="font-bold text-gray-900 dark:text-white">
              proven federal contracting capabilities
            </span>{" "}
            ensure every government project meets or exceeds all federal
            requirements with complete transparency and accountability.
          </>
        }
        sectionId="compliance"
        iconVariant="primary"
      />
      {/* Hanford & DOE Section */}
      <section
        id="services"
        className="relative bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden text-white"
      >
        <DiagonalStripePattern
          lightOpacity={0.05}
          darkOpacity={0.08}
          color="rgba(255,255,255,0.1)"
        />
        <BrandColorBlobs />
        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mx-auto max-w-6xl">
            {/* Section Header */}
            <div className="mb-16 sm:mb-20 text-center">
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

              <h2 className="mb-6 sm:mb-8 font-black text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  Hanford & Department of
                </span>
                <span className="block bg-gradient-to-r from-brand-primary-light via-white to-brand-primary-light bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  Energy Expertise
                </span>
              </h2>

              <p className="mx-auto max-w-5xl font-light text-gray-200 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                <span className="font-bold text-brand-primary-light">
                  Proven operational excellence
                </span>{" "}
                in high-security DOE and Hanford environments with comprehensive
                understanding of federal compliance requirements,{" "}
                <span className="font-bold text-white">
                  award-winning safety protocols (.64 EMR—40% better than
                  industry)
                </span>
                , mission-critical construction protocols, and Veteran-Owned
                reliability since January 2025.
              </p>
            </div>

            <StaggeredFadeIn className={gridPresets.cards3("md", "mb-12")}>
              {hanfordCapabilities.map((capability, index) => (
                <div
                  key={index}
                  className="group relative bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-transparent transition-all duration-300 overflow-hidden hover:-translate-y-1"
                >
                  {/* Top accent bar */}
                  <div className="h-2 bg-gradient-to-r from-slate-500 via-gray-400 to-slate-500" />
                  <div className="p-6 pt-6">
                    <div className="relative inline-block mb-4">
                      <div
                        className="absolute -inset-2 bg-gradient-to-r from-slate-500/40 to-gray-400/40 blur-lg opacity-70"
                        aria-hidden="true"
                      />
                      <div className="relative bg-gradient-to-br from-slate-600 via-gray-500 to-slate-700 p-3 rounded-xl shadow-xl">
                        <MaterialIcon
                          icon={capability.icon}
                          size="xl"
                          className="text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </div>
                    <h3 className="mb-2 font-bold text-white text-lg sm:text-xl">
                      {capability.title}
                    </h3>
                    <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                      {capability.description}
                    </p>
                  </div>
                </div>
              ))}
            </StaggeredFadeIn>

            {/* Federal Project Capabilities highlight card */}
            <div className="group relative bg-gray-800 rounded-2xl border border-gray-600 overflow-hidden shadow-xl">
              {/* Top accent bar */}
              <div className="h-2 bg-gradient-to-r from-slate-600 via-gray-700 to-slate-600" />
              <div className="p-8 pt-8">
                <div className="flex items-start">
                  <div className="relative inline-block flex-shrink-0 mr-6">
                    <div
                      className="absolute -inset-2 bg-gradient-to-r from-slate-600/40 to-gray-700/40 blur-lg opacity-70"
                      aria-hidden="true"
                    />
                    <div className="relative bg-gradient-to-br from-slate-600 via-gray-700 to-slate-800 p-4 rounded-xl shadow-xl">
                      <MaterialIcon
                        icon="construction"
                        size="2xl"
                        className="text-white drop-shadow-lg"
                        ariaLabel="Federal Project Capabilities"
                      />
                    </div>
                  </div>
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
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Grant Types Section */}
      <section className="relative bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
        <DiagonalStripePattern />
        <BrandColorBlobs />
        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Section Header */}
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

            <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
              <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                Federal Contract
              </span>
              <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                Categories
              </span>
            </h2>

            <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
              <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                Proven execution
              </span>{" "}
              across federal, state, and mission-critical construction contracts
              with{" "}
              <span className="font-bold text-gray-900 dark:text-white">
                Veteran-Owned expertise and award-winning safety record
              </span>
              .
            </p>
          </div>

          <InteractiveGrantSelector grantTypes={grantTypes} />
        </div>
      </section>
      {/* Process Steps */}
      <section className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
        <DiagonalStripePattern />
        <BrandColorBlobs />
        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mx-auto max-w-5xl">
            {/* Section Header */}
            <div className="mb-16 sm:mb-20 text-center">
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

              <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  Federal Contract
                </span>
                <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  Execution Process
                </span>
              </h2>

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
              {processSteps.map((process, index) => (
                <div
                  key={index}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 hover:border-transparent transition-all duration-300 overflow-hidden"
                >
                  {/* Animated border glow */}
                  <div
                    className="absolute -inset-2 bg-gradient-to-r from-slate-600/40 to-gray-700/40 blur-xl opacity-20 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                    aria-hidden="true"
                  />
                  {/* Top accent bar */}
                  <div className="h-2 bg-gradient-to-r from-slate-600 via-gray-700 to-slate-600" />
                  <div className="relative p-8 pt-8">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-6">
                        <div className="flex justify-center items-center bg-gradient-to-br from-slate-600 to-gray-800 shadow-lg rounded-full w-16 h-16 font-bold text-white text-2xl">
                          {process.step}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div className="flex-grow">
                            <h3 className="mb-3 font-bold text-gray-900 dark:text-white text-xl sm:text-2xl">
                              {process.title}
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg">
                              {process.description}
                            </p>
                          </div>
                          <MaterialIcon
                            icon={process.icon}
                            size="2xl"
                            className="ml-6 text-gray-500 dark:text-gray-400"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Government Project Types */}
      <section className="relative bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
        <DiagonalStripePattern />
        <BrandColorBlobs />
        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Section Header */}
          <div className="mb-16 sm:mb-20 text-center">
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

            <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
              <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                Federal Facility
              </span>
              <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                Classifications
              </span>
            </h2>

            <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
              <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                Licensed and mission-ready
              </span>{" "}
              across diverse federal and government facility projects with{" "}
              <span className="font-bold text-gray-900 dark:text-white">
                Veteran-Owned precision and 150+ years combined team experience
              </span>
              .
            </p>
          </div>

          <StaggeredFadeIn
            className={gridPresets.cards3("md", "mx-auto max-w-7xl")}
          >
            {governmentProjects.map((project, index) => (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 hover:border-transparent transition-all duration-300 overflow-hidden hover:-translate-y-1"
              >
                {/* Animated border glow */}
                <div
                  className="absolute -inset-2 bg-gradient-to-r from-slate-600/40 to-gray-700/40 blur-xl opacity-20 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                  aria-hidden="true"
                />
                {/* Top accent bar */}
                <div className="h-2 bg-gradient-to-r from-slate-600 via-gray-700 to-slate-600" />
                <div className="relative p-6 sm:p-8 pt-8">
                  <div className="relative inline-block mb-4">
                    <div
                      className="absolute -inset-2 bg-gradient-to-r from-slate-600/40 to-gray-700/40 blur-lg opacity-70"
                      aria-hidden="true"
                    />
                    <div className="relative bg-gradient-to-br from-slate-600 via-gray-700 to-slate-800 p-3 rounded-xl shadow-xl">
                      <MaterialIcon
                        icon={project.icon}
                        size="xl"
                        className="text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {project.title}
                  </h3>
                  <ul className="space-y-2">
                    {project.examples.map((example, eIdx) => (
                      <li
                        key={eIdx}
                        className="flex items-center text-gray-700 dark:text-gray-300"
                      >
                        <MaterialIcon
                          icon="arrow_forward"
                          className="mr-2 text-gray-500 dark:text-gray-400"
                          size="sm"
                        />
                        <span className="text-sm">{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </StaggeredFadeIn>
        </div>
      </section>
      {/* Success Factors */}
      <section className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
        <DiagonalStripePattern />
        <BrandColorBlobs />
        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mx-auto max-w-6xl">
            {/* Section Header */}
            <div className="mb-16 sm:mb-20 text-center">
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

              <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  Mission Success
                </span>
                <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  Factors
                </span>
              </h2>

              <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                What ensures{" "}
                <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                  federal contract success
                </span>{" "}
                and how we deliver with{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  award-winning safety, Veteran-Owned leadership, and
                  transparent open-book partnership
                </span>
                .
              </p>
            </div>

            <div className="gap-6 grid md:grid-cols-2">
              {successFactors.map((factor, index) => (
                <div
                  key={index}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 hover:border-transparent transition-all duration-300 overflow-hidden"
                >
                  {/* Animated border glow */}
                  <div
                    className="absolute -inset-2 bg-gradient-to-r from-slate-600/40 to-gray-700/40 blur-xl opacity-20 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                    aria-hidden="true"
                  />
                  {/* Top accent bar */}
                  <div className="h-2 bg-gradient-to-r from-slate-600 via-gray-700 to-slate-600" />
                  <div className="relative p-6 sm:p-8 pt-8">
                    <div className="flex items-start">
                      <div className="relative inline-block flex-shrink-0 mr-6">
                        <div
                          className="absolute -inset-2 bg-gradient-to-r from-slate-600/40 to-gray-700/40 blur-lg opacity-70"
                          aria-hidden="true"
                        />
                        <div className="relative bg-gradient-to-br from-slate-600 via-gray-700 to-slate-800 p-3 rounded-xl shadow-xl">
                          <MaterialIcon
                            icon={factor.icon}
                            size="lg"
                            className="text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="mb-2 font-bold text-gray-900 dark:text-white text-lg sm:text-xl">
                          {factor.title}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                          {factor.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section - Strong Government Theme */}
      <section
        id="contact"
        className="relative bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden text-white"
      >
        <DiagonalStripePattern
          lightOpacity={0.1}
          darkOpacity={0.1}
          color="rgba(255,255,255,0.1)"
        />
        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
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
                  Ready to Plan Your
                </span>
                <span className="block bg-gradient-to-r from-brand-primary-light via-white to-brand-primary-light bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  Government Project?
                </span>
              </h2>

              {/* Description with colored keyword highlighting */}
              <p className="mx-auto max-w-5xl mb-8 font-light text-gray-200 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                Partner with{" "}
                <span className="font-bold text-brand-primary-light">
                  Army veteran leadership
                </span>{" "}
                for{" "}
                <span className="font-bold text-white">
                  clear planning and compliant delivery
                </span>
                . Contact our team to discuss your government construction
                requirements and next steps.
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
                  <p className="mb-1 text-gray-600 dark:text-gray-300 text-sm">
                    Call Us
                  </p>
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
                  <p className="mb-1 text-gray-600 dark:text-gray-300 text-sm">
                    Email Us
                  </p>
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
                  <p className="mb-1 text-gray-600 dark:text-gray-300 text-sm">
                    Visit Us
                  </p>
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
                    ariaLabel="Request Project Consultation"
                  />
                  Request Project Consultation
                </Button>
              </Link>
              <a
                href={`mailto:${COMPANY_INFO.email.main}?subject=Request%20Federal%20Capabilities%20Brief`}
              >
                <Button
                  size="lg"
                  className="bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 px-10 py-7 text-white dark:text-white text-xl"
                >
                  <MaterialIcon
                    icon="download"
                    className="mr-3"
                    size="lg"
                    theme="military"
                    ariaLabel="Request Federal Capabilities Brief"
                  />
                  Request Federal Capabilities Brief
                </Button>
              </a>
            </div>

            <p className="mt-8 text-gray-600 dark:text-gray-300 text-sm">
              <MaterialIcon
                icon="schedule"
                className="inline mr-2"
                size="sm"
                theme="military"
                ariaLabel="Business Hours"
              />
              Monday - Friday: 0700 - 1600 PST
            </p>
          </div>
        </div>
      </section>
      {/* Federal Accreditations & Certifications */}
      <section className="relative py-12 sm:py-16 bg-gray-50 dark:bg-gray-800 overflow-hidden">
        <DiagonalStripePattern />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-brand-primary dark:text-brand-primary-light tracking-widest uppercase mb-4">
            Mission-Ready Credentials
          </p>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Accredited & Certified for Federal Contracts
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {/* BBB Accredited A+ */}
            {}
            <a
              href={COMPANY_INFO.bbb.sealClickUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              title="BBB Accredited Business - A+ Rating"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={COMPANY_INFO.bbb.sealHorizontal}
                alt="BBB Accredited Business A+ Rating"
                className="h-10 sm:h-12 w-auto dark:hidden"
                loading="lazy"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={COMPANY_INFO.bbb.sealHorizontalWhite}
                alt="BBB Accredited Business A+ Rating"
                className="h-10 sm:h-12 w-auto hidden dark:block"
                loading="lazy"
              />
            </a>

            {/* AGC Member */}
            <a
              href="https://www.agcwa.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              title="AGC of Washington Member"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo/agc-member.webp"
                alt="AGC of Washington Member"
                className="h-10 sm:h-12 w-auto"
                loading="lazy"
              />
            </a>

            {/* Travelers Insurance Partner */}
            <a
              href={COMPANY_INFO.travelers.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              title="Travelers Insurance - Auto & Bonding Partner"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={COMPANY_INFO.travelers.logo}
                alt="Travelers Insurance - Auto & Bonding Partner"
                className="h-10 sm:h-12 w-auto dark:hidden"
                loading="lazy"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={COMPANY_INFO.travelers.logoWhite}
                alt="Travelers Insurance - Auto & Bonding Partner"
                className="h-10 sm:h-12 w-auto hidden dark:block"
                loading="lazy"
              />
            </a>

            {/* Pasco Chamber of Commerce */}
            <a
              href={COMPANY_INFO.chambers.pasco.memberDirectoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              title="Pasco Chamber of Commerce Member"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={COMPANY_INFO.chambers.pasco.logo}
                alt="Pasco Chamber of Commerce Member"
                className="h-10 sm:h-12 w-auto dark:hidden"
                loading="lazy"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={COMPANY_INFO.chambers.pasco.logoWhite}
                alt="Pasco Chamber of Commerce Member"
                className="h-10 sm:h-12 w-auto hidden dark:block"
                loading="lazy"
              />
            </a>

            {/* Richland Chamber of Commerce */}
            <a
              href={COMPANY_INFO.chambers.richland.memberDirectoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              title="Richland Chamber of Commerce Member"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={COMPANY_INFO.chambers.richland.logo}
                alt="Richland Chamber of Commerce Member"
                className="h-10 sm:h-12 w-auto"
                loading="lazy"
              />
            </a>

            {/* Tri-City Regional Chamber of Commerce */}
            <a
              href={COMPANY_INFO.chambers.triCityRegional.memberDirectoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              title="Tri-City Regional Chamber of Commerce Member"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={COMPANY_INFO.chambers.triCityRegional.logo}
                alt="Tri-City Regional Chamber of Commerce Member"
                className="h-10 sm:h-12 w-auto"
                loading="lazy"
              />
            </a>

            {/* Veteran-Owned Badge */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-primary/10 dark:bg-brand-primary/20">
              <MaterialIcon
                icon="military_tech"
                size="lg"
                theme="military"
                className="text-brand-primary dark:text-brand-primary-light"
                ariaLabel="Veteran-Owned"
              />
              <span className="font-semibold text-gray-900 dark:text-white text-sm">
                Veteran-Owned
              </span>
            </div>

            {/* SDVOSB Badge */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700">
              <MaterialIcon
                icon="verified"
                size="lg"
                theme="military"
                className="text-brand-primary dark:text-brand-primary-light"
                ariaLabel="Service-Disabled Veteran"
              />
              <span className="font-semibold text-gray-900 dark:text-white text-sm">
                SDVOSB
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* Next Steps Section - Standardized Final CTA */}
      <NextStepsSection />
    </div>
  );
}
