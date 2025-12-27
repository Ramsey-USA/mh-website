import { type Metadata } from "next";
import {
  DiagonalStripePattern,
  BrandColorBlobs,
} from "@/components/ui/backgrounds";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import { gridPresets } from "@/lib/styles/layout-variants";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { UnderConstruction } from "@/components/layout/UnderConstruction";
import { StructuredData } from "@/components/seo/seo-meta";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";
import { COMPANY_INFO } from "@/lib/constants/company";

// Feature flag - set to false to show full page content
const SHOW_UNDER_CONSTRUCTION = false;

export const metadata: Metadata = {
  title:
    "Rapid Response → Emergency | 24/7 Emergency Construction Response | MH Construction",
  description: `Rapid Response → Emergency: 24/7 Emergency Construction Response - Mission-Ready Support. Rapid response when your construction mission is critical. Veteran-owned emergency deployment with honest assessment, transparent pricing, proven solutions. Expert consultation, specialized equipment, experienced crews—immediate deployment WA, OR, ID. THE ROI IS THE RELATIONSHIP. Call ${COMPANY_INFO.phone.display}.`,
  keywords: [
    "Rapid Response Emergency 24/7",
    "mission-ready support construction",
    "veteran-owned urgent construction",
    "honest emergency assessment",
    "transparent urgent pricing",
    "dual-label emergency construction",
    "service-earned urgent response",
    "urgent construction support",
    "emergency structural repairs",
    "immediate construction response",
    "construction equipment rental",
    "heavy machinery operators",
    "general contractor support",
    "Pacific Northwest urgent construction",
    "Tri-Cities emergency construction",
    "Richland urgent contractor support",
    "Pasco emergency repairs",
    "Kennewick urgent construction",
    "Benton County emergency construction",
    "Franklin County urgent support",
  ],
  openGraph: {
    title:
      "Rapid Response → Emergency | 24/7 Construction Response - MH Construction",
    description:
      "Mission-Ready Support: 24/7 emergency construction response with veteran-owned deployment. Honest assessment, transparent pricing, proven solutions. Immediate deployment WA, OR, ID.",
    type: "website",
    locale: "en_US",
    url: "https://www.mhc-gc.com/urgent",
    siteName: "MH Construction",
  },
  twitter: {
    card: "summary",
    site: "@mhc_gc",
    creator: "@mhc_gc",
    title: "Rapid Response → Emergency | 24/7 Support - MH Construction",
    description:
      "Mission-Ready: 24/7 emergency construction response. Veteran-owned with service-earned values. Immediate deployment WA, OR, ID. THE ROI IS THE RELATIONSHIP.",
  },
  alternates: {
    canonical: "https://www.mhc-gc.com/urgent",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function UrgentSupportPage() {
  // Show under construction notice while preserving all content below
  if (SHOW_UNDER_CONSTRUCTION) {
    return (
      <UnderConstruction
        pageName="Urgent Support"
        description={`We're updating our emergency response information. For urgent construction needs, please call us immediately at ${COMPANY_INFO.phone.display}.`}
        estimatedCompletion="December 2025"
      />
    );
  }

  // Original page content preserved below - will be shown when flag is set to false
  const equipmentList = [
    {
      icon: "engineering",
      name: "Excavators & Heavy Machinery",
      description:
        "Full-size excavators, loaders, and earth-moving equipment with certified operators",
    },
    {
      icon: "construction",
      name: "Specialized Construction Tools",
      description:
        "Commercial-grade power tools, formwork systems, and specialty equipment",
    },
    {
      icon: "precision_manufacturing",
      name: "Material Handling Equipment",
      description:
        "Forklifts, telehandlers, and lifting equipment for large-scale operations",
    },
    {
      icon: "local_shipping",
      name: "Transport & Logistics",
      description: "Heavy-duty trucks and equipment transport capabilities",
    },
  ];

  const capabilities = [
    {
      icon: "military_tech",
      title: "Expert Structural Consultation",
      description:
        "Immediate professional assessment of critical construction challenges with actionable solutions",
    },
    {
      icon: "foundation",
      title: "Foundation & Structural Repairs",
      description:
        "Fix the SOURCE of problems - damaged foundations, failing structural systems, and load-bearing issues",
    },
    {
      icon: "roofing",
      title: "Roof & Wall System Restoration",
      description:
        "Address structural failures causing leaks, collapses, or safety hazards",
    },
    {
      icon: "diversity_3",
      title: "Experienced Crews Available",
      description:
        "Skilled construction professionals ready for immediate deployment to your project site",
    },
    {
      icon: "bolt",
      title: "Large Equipment & Operators",
      description:
        "Heavy machinery with certified operators available for urgent hire - excavators, loaders, and specialized equipment",
    },
    {
      icon: "diversity_3",
      title: "General Contractor Partnership",
      description:
        "We work WITH you as an Ally, providing the specialized resources you need NOW",
    },
  ];

  const whatWeProvide = [
    "Urgent structural assessments and engineering consultation",
    "Heavy equipment with certified operators for immediate hire",
    "Experienced construction crews for critical projects",
    "Specialized construction equipment and tools",
    "Foundation and structural system repairs",
    "Emergency roof and wall system restoration",
    "Material handling and logistics support",
    "On-site project management and coordination",
  ];

  const whatWeDontDo = [
    "24/7 first responder services",
    "Water extraction or cleanup services",
    "Restoration company services",
    "DIY homeowner projects",
  ];

  // FAQ Data for SEO
  const urgentFAQ = [
    {
      question: "How quickly can you respond to an urgent construction need?",
      answer:
        "We prioritize urgent calls during business hours (Monday-Friday, 7:00 AM - 4:00 PM PST). Our response time for initial consultation is typically within 2-4 hours. Equipment and crew deployment depends on project scope and current availability, but we work to mobilize resources as quickly as possible for critical structural issues.",
    },
    {
      question: "What qualifies as an urgent construction situation?",
      answer:
        "Urgent situations include critical structural failures, foundation issues threatening project timelines, major equipment needs for time-sensitive projects, and situations where General Contractors need immediate expert consultation or specialized resources to keep projects on track. We serve professional contractors, not homeowner DIY projects.",
    },
    {
      question: "Do you provide 24/7 emergency response?",
      answer:
        "No. We are available Monday-Friday, 7:00 AM - 4:00 PM PST. We focus on structural construction challenges for General Contractors, not 24/7 first responder services. For after-hours emergencies, we recommend contacting emergency services or restoration companies.",
    },
    {
      question: "Can you work with our existing General Contractor?",
      answer:
        "Absolutely. We work AS an ally WITH General Contractors, providing specialized equipment with certified operators, experienced crews, and expert consultation. We support your project without competing—think of us as an extension of your team when you need urgent resources or expertise.",
    },
    {
      question: "What areas do you serve for urgent construction support?",
      answer:
        "We provide urgent construction support throughout Washington, Oregon, and Idaho. Our primary service area is the Tri-Cities region (Pasco, Kennewick, Richland), with extended coverage across Eastern Washington. Response times vary based on distance from our Pasco headquarters.",
    },
  ];

  // FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: urgentFAQ.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // Response Timeline Steps
  const responseSteps = [
    {
      step: "1",
      icon: "call",
      title: "Contact Our Team",
      description: `Call ${COMPANY_INFO.phone.display} during business hours. Describe your urgent construction challenge and we'll assess if we can help.`,
      timeframe: "Immediate",
    },
    {
      step: "2",
      icon: "engineering",
      title: "Rapid Assessment",
      description:
        "Our veteran-led team evaluates your situation, determines resource needs, and provides transparent pricing for equipment/crews.",
      timeframe: "2-4 Hours",
    },
    {
      step: "3",
      icon: "schedule",
      title: "Resource Mobilization",
      description:
        "We coordinate equipment, certified operators, and experienced crews based on your project's critical timeline.",
      timeframe: "4-24 Hours",
    },
    {
      step: "4",
      icon: "construction",
      title: "On-Site Deployment",
      description:
        "Our team arrives ready to work, with all necessary equipment and expertise to address your structural challenge at its source.",
      timeframe: "Same/Next Day",
    },
  ];

  // Trust Signals
  const trustSignals = [
    {
      icon: "military_tech",
      title: "Veteran-Owned & Operated",
      description:
        "Service-earned values drive every urgent response—integrity, accountability, mission-first approach.",
    },
    {
      icon: "health_and_safety",
      title: "Award-Winning Safety Record",
      description:
        ".64 EMR (40% better than industry average)—everyone goes home safe, even under pressure.",
    },
    {
      icon: "verified_user",
      title: "Multi-State Licensed",
      description:
        "Fully licensed in Washington, Oregon, and Idaho with proper insurance and certifications.",
    },
    {
      icon: "handshake",
      title: "150+ Years Combined Experience",
      description:
        "Our team brings deep construction expertise to solve complex structural challenges quickly.",
    },
  ];

  return (
    <>
      <StructuredData
        data={generateBreadcrumbSchema(breadcrumbPatterns.urgent)}
      />
      <StructuredData data={faqSchema} />
      {/* Hero Section - Brand Standards */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 h-screen flex items-end justify-end text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-gray-900/80 to-gray-800/30"></div>

        {/* Content - Bottom Right */}
        <div className="relative z-30 mb-32 sm:mb-36 md:mb-40 lg:mb-44 mr-4 sm:mr-6 lg:mr-8 xl:mr-12 ml-auto max-w-2xl pointer-events-none pb-2">
          {/* Mission Icon */}
          <div className="flex justify-end mb-4">
            <div className="relative p-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border-2 border-white/30 shadow-2xl">
              <MaterialIcon
                icon="bolt"
                size="4xl"
                className="text-white drop-shadow-lg"
                ariaLabel="Rapid Response - Emergency support"
              />
            </div>
          </div>
          <h1 className="text-right text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white drop-shadow-2xl leading-relaxed">
            <span className="block text-orange-300 text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-1">
              Rapid Response → Emergency
            </span>
            <span className="block text-brand-secondary">
              PRT: Project Response Team
            </span>
            <span className="block text-orange-300">
              Mission-Critical Rapid Deployment When Minutes Matter
            </span>
            <span className="block text-white/90">
              Building projects for the client,{" "}
              <span className="font-black italic text-bronze-300">NOT</span> the
              dollar
            </span>
          </h1>
        </div>

        {/* Page Navigation */}
        <PageNavigation
          items={navigationConfigs.urgent}
          className="absolute bottom-0 left-0 right-0"
        />
      </section>

      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "PRT - Project Response Team" },
        ]}
      />

      {/* Quick Contact Section */}
      <section
        id="urgent-contact"
        className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
      >
        <DiagonalStripePattern color="#dc2626" />
        <BrandColorBlobs />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInWhenVisible>
            <div className="text-center mb-12">
              {/* Section Header - Military Construction Standard */}
              <div className="mb-12">
                {/* Icon with decorative lines */}
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-orange-500/30 to-orange-600/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-brand-primary p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                      <MaterialIcon
                        icon="bolt"
                        size="2xl"
                        className="text-white drop-shadow-lg"
                        ariaLabel="Emergency contact"
                      />
                    </div>
                  </div>
                  <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                </div>

                {/* Two-line gradient heading */}
                <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                  <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                    Emergency Contact
                  </span>
                  <span className="block bg-gradient-to-r from-orange-600 via-orange-700 to-orange-600 bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    Information
                  </span>
                </h2>

                <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  Available Monday - Friday:{" "}
                  <span className="font-bold text-orange-600 dark:text-orange-400">
                    7:00 AM - 4:00 PM PST
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href={`tel:${COMPANY_INFO.phone.tel}`}
                className="inline-flex items-center gap-3 bg-orange-600 hover:bg-orange-700 px-8 py-4 rounded-xl font-bold text-white transition-all duration-200 hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-orange-600/50 w-full sm:w-auto justify-center"
                aria-label={`Call MH Construction urgently at ${COMPANY_INFO.phone.display}`}
              >
                <MaterialIcon icon="call" size="lg" ariaLabel="Call Now" />
                Call Now: {COMPANY_INFO.phone.display}
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email.main}?subject=Urgent%20Construction%20Support%20Request`}
                className="inline-flex items-center gap-3 bg-gray-800 hover:bg-gray-900 px-8 py-4 rounded-xl font-bold text-white transition-all duration-200 hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-800/50 w-full sm:w-auto justify-center"
                aria-label="Email urgent construction support request"
              >
                <MaterialIcon
                  icon="mark_email_read"
                  size="lg"
                  ariaLabel="Email Support"
                />
                Email Support Request
              </a>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Our Focus Section */}
      <section
        id="urgent-focus"
        className="relative bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
      >
        <DiagonalStripePattern color="#ea580c" />
        <BrandColorBlobs />
        {/* Placeholder for any additional blobs */}
        <div className="absolute top-20 right-[15%] w-96 h-96 bg-gradient-to-br from-orange-500/10 to-transparent dark:from-orange-500/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-20 left-[15%] w-96 h-96 bg-gradient-to-tr from-brand-primary/10 to-transparent dark:from-brand-primary/20 blur-3xl rounded-full"></div>

        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            <div className="text-center mb-12">
              {/* Icon with decorative lines */}
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-orange-500/30 to-orange-600/30 blur-2xl rounded-full"></div>
                  <div className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-brand-primary p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="construction"
                      size="2xl"
                      className="text-white drop-shadow-lg"
                      ariaLabel="Rapid response focus"
                    />
                  </div>
                </div>
                <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              </div>

              {/* Two-line gradient heading */}
              <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  Rapid Response Mission:
                </span>
                <span className="block bg-gradient-to-r from-orange-600 via-orange-700 to-orange-600 bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  We Fix the Source, Not the Symptoms
                </span>
              </h2>

              <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                <span className="font-bold text-orange-600 dark:text-orange-400">
                  Mission-critical rapid deployment when minutes matter.
                </span>{" "}
                When General Contractors face critical structural challenges,
                our Project Response Team provides veteran-led expert
                consultation, specialized equipment with operators, and
                experienced crews to resolve urgent construction issues at their
                source.
              </p>
            </div>

            <div className="bg-orange-50 dark:bg-orange-950/30 border-l-4 border-orange-600 p-6 md:p-8 rounded-r-xl max-w-4xl mx-auto">
              <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <MaterialIcon
                  icon="info"
                  className="text-orange-600"
                  ariaLabel="Professional Contractors Only"
                />
                For Professional Contractors Only
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                This service is designed for General Contractors, commercial
                builders, and construction professionals facing time-sensitive
                structural challenges. We are not a DIY support service or
                homeowner emergency response.
              </p>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* What We Provide - Capabilities */}
      <section
        id="urgent-capabilities"
        className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
      >
        <DiagonalStripePattern color="#dc2626" />
        <BrandColorBlobs />
        {/* Placeholder for any additional blobs */}
        <div className="absolute top-20 right-[15%] w-96 h-96 bg-gradient-to-br from-orange-500/10 to-transparent dark:from-orange-500/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-20 left-[15%] w-96 h-96 bg-gradient-to-tr from-brand-primary/10 to-transparent dark:from-brand-primary/20 blur-3xl rounded-full"></div>

        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            {/* Section Header */}
            <div className="text-center mb-16 sm:mb-20">
              {/* Icon with decorative lines */}
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-orange-500/30 to-orange-600/30 blur-2xl rounded-full"></div>
                  <div className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-brand-primary p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="military_tech"
                      size="2xl"
                      className="text-white drop-shadow-lg"
                      ariaLabel="Our capabilities"
                    />
                  </div>
                </div>
                <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              </div>

              {/* Two-line gradient heading */}
              <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  Our Rapid Response
                </span>
                <span className="block bg-gradient-to-r from-orange-600 via-orange-700 to-orange-600 bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  Capabilities
                </span>
              </h2>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className={gridPresets.cards3("md")}>
            {capabilities.map((item, _index) => (
              <div key={_index} className="group relative flex h-full">
                {/* Animated Border Glow */}
                <div className="absolute -inset-2 bg-gradient-to-br from-orange-500/40 to-orange-600/40 rounded-2xl opacity-20 group-hover:opacity-60 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

                <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105 overflow-hidden flex flex-col w-full">
                  {/* Top Accent Bar */}
                  <div className="h-2 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700"></div>

                  <div className="p-6 flex flex-col flex-1 text-center">
                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                      <div className="relative inline-block">
                        <div className="absolute -inset-3 bg-gradient-to-br from-orange-500/40 to-orange-600/40 opacity-30 blur-lg rounded-xl"></div>
                        <div className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-brand-primary rounded-xl p-3 shadow-xl group-hover:scale-110 transition-all duration-300">
                          <MaterialIcon
                            icon={item.icon}
                            size="xl"
                            className="text-white drop-shadow-lg"
                            ariaLabel={item.title}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="mb-3 font-bold text-gray-900 dark:text-white text-lg">
                      {item.title}
                    </h3>
                    <p className="flex-grow text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </StaggeredFadeIn>
        </div>
      </section>

      {/* Large Equipment Section */}
      <section
        id="urgent-equipment"
        className="relative py-12 sm:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 text-white overflow-hidden"
      >
        {/* Diagonal Stripe Pattern */}
        <div className="absolute inset-0 opacity-[0.05]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                #ea580c 0px,
                #ea580c 2px,
                transparent 2px,
                transparent 60px
              )`,
            }}
          ></div>
        </div>

        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                  <MaterialIcon
                    icon="engineering"
                    size="4xl"
                    className="text-yellow-300"
                    ariaLabel="Heavy equipment"
                  />
                </div>
              </div>
              {/* Section Header - Military Construction Standard */}
              <h2 className="mb-4 font-black text-white text-2xl xs:text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tighter">
                <span className="block mb-2 font-semibold text-gray-200 text-xl xs:text-2xl sm:text-3xl tracking-tight">
                  Heavy Equipment &
                </span>
                <span className="block bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent font-black drop-shadow-sm">
                  Certified Operators
                </span>
              </h2>
              <p className="text-lg text-white/90 max-w-3xl mx-auto">
                Large-scale equipment available for urgent hire with
                experienced, certified operators ready for immediate deployment
                to your project site.
              </p>
            </div>

            <StaggeredFadeIn className={gridPresets.twoColumn("lg")}>
              {equipmentList.map((equipment, _index) => (
                <div key={_index} className="group relative flex h-full">
                  {/* Animated Border Glow */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-yellow-300/40 to-white/40 rounded-2xl opacity-20 group-hover:opacity-60 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

                  <div className="relative bg-white/10 backdrop-blur-sm rounded-xl border-2 border-white/20 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
                    {/* Top Accent Bar */}
                    <div className="h-2 bg-gradient-to-r from-yellow-200 via-white to-yellow-200"></div>

                    <div className="p-6 flex items-start gap-4">
                      <div className="relative flex-shrink-0">
                        <div className="absolute -inset-2 bg-gradient-to-br from-yellow-300/40 to-white/40 opacity-30 blur-lg rounded-full"></div>
                        <div className="relative group-hover:scale-110 transition-all duration-300">
                          <MaterialIcon
                            icon={equipment.icon}
                            size="2xl"
                            className="text-yellow-300 drop-shadow-lg"
                            ariaLabel={equipment.name}
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-xl mb-2">
                          {equipment.name}
                        </h3>
                        <p className="text-white/80">{equipment.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </StaggeredFadeIn>

            <div className="mt-12 text-center">
              <p className="text-lg font-semibold text-yellow-300 mb-4">
                Equipment + Operators = Ready to Work
              </p>
              <p className="text-white/90 max-w-2xl mx-auto">
                All operators are certified, experienced, and ready for
                immediate deployment. We handle the logistics - you get the
                results.
              </p>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* What We Provide / Don't Provide */}
      <section
        id="urgent-scope"
        className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
      >
        <DiagonalStripePattern color="#ea580c" />
        <BrandColorBlobs />
        {/* Placeholder for any additional blobs */}
        <div className="absolute top-20 right-[15%] w-96 h-96 bg-gradient-to-br from-green-500/10 to-transparent dark:from-green-500/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-20 left-[15%] w-96 h-96 bg-gradient-to-tr from-orange-500/10 to-transparent dark:from-orange-500/20 blur-3xl rounded-full"></div>

        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className={gridPresets.twoColumn("lg")}>
            {/* What We Provide */}
            <FadeInWhenVisible>
              <div className="group relative flex h-full">
                {/* Animated Border Glow */}
                <div className="absolute -inset-2 bg-gradient-to-br from-green-500/40 to-green-600/40 rounded-2xl opacity-20 group-hover:opacity-60 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

                <div className="relative bg-green-50 dark:bg-green-950/30 rounded-xl border-2 border-green-200 dark:border-green-800 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
                  {/* Top Accent Bar */}
                  <div className="h-2 bg-gradient-to-r from-green-500 via-green-600 to-green-700"></div>

                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="relative">
                        <div className="absolute -inset-2 bg-gradient-to-br from-green-500/40 to-green-600/40 opacity-30 blur-lg rounded-full"></div>
                        <div className="relative bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-3 shadow-xl">
                          <MaterialIcon
                            icon="check_circle"
                            size="xl"
                            className="text-white drop-shadow-lg"
                            ariaLabel="What we provide"
                          />
                        </div>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                        <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                          What We Provide
                        </span>
                      </h2>
                    </div>
                    <ul className="space-y-3">
                      {whatWeProvide.map((item, _index) => (
                        <li key={_index} className="flex items-start gap-3">
                          <MaterialIcon
                            icon="check"
                            className="text-green-600 dark:text-green-400 flex-shrink-0 mt-1"
                            ariaLabel="Included"
                          />
                          <span className="text-gray-700 dark:text-gray-300">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>

            {/* What We Don't Provide */}
            <FadeInWhenVisible>
              <div className="group relative flex h-full">
                {/* Animated Border Glow */}
                <div className="absolute -inset-2 bg-gradient-to-br from-orange-500/40 to-orange-600/40 rounded-2xl opacity-20 group-hover:opacity-60 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

                <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
                  {/* Top Accent Bar */}
                  <div className="h-2 bg-gradient-to-r from-red-500 via-red-600 to-red-700"></div>

                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="relative">
                        <div className="absolute -inset-2 bg-gradient-to-br from-red-500/40 to-red-600/40 opacity-30 blur-lg rounded-full"></div>
                        <div className="relative bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-3 shadow-xl">
                          <MaterialIcon
                            icon="cancel"
                            size="xl"
                            className="text-white drop-shadow-lg"
                            ariaLabel="What we don't provide"
                          />
                        </div>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                        <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                          What We Don&apos;t Provide
                        </span>
                      </h2>
                    </div>
                    <ul className="space-y-3">
                      {whatWeDontDo.map((item, _index) => (
                        <li key={_index} className="flex items-start gap-3">
                          <MaterialIcon
                            icon="close"
                            className="text-red-600 dark:text-red-400 flex-shrink-0 mt-1"
                            ariaLabel="Not included"
                          />
                          <span className="text-gray-700 dark:text-gray-300">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Response Timeline / How It Works */}
      <section
        id="urgent-timeline"
        className="relative bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
      >
        <DiagonalStripePattern color="#dc2626" />
        <BrandColorBlobs />
        {/* Placeholder for any additional blobs */}
        <div className="absolute top-20 right-[15%] w-96 h-96 bg-gradient-to-br from-orange-500/10 to-transparent dark:from-orange-500/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-20 left-[15%] w-96 h-96 bg-gradient-to-tr from-brand-primary/10 to-transparent dark:from-brand-primary/20 blur-3xl rounded-full"></div>

        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            {/* Section Header */}
            <div className="text-center mb-16 sm:mb-20">
              {/* Icon with decorative lines */}
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-orange-500/30 to-orange-600/30 blur-2xl rounded-full"></div>
                  <div className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-brand-primary p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="schedule"
                      size="2xl"
                      className="text-white drop-shadow-lg"
                      ariaLabel="Response timeline"
                    />
                  </div>
                </div>
                <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              </div>

              {/* Two-line gradient heading */}
              <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  Our Urgent Response
                </span>
                <span className="block bg-gradient-to-r from-orange-600 via-orange-700 to-orange-600 bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  Timeline
                </span>
              </h2>

              <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                From first contact to on-site deployment—here's what to expect
                when you need{" "}
                <span className="font-bold text-orange-600 dark:text-orange-400">
                  mission-critical support
                </span>
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className={gridPresets.compactCards("md")}>
            {responseSteps.map((step, _index) => (
              <div key={_index} className="group relative flex h-full">
                {/* Animated Border Glow */}
                <div className="absolute -inset-2 bg-gradient-to-br from-orange-500/40 to-orange-600/40 rounded-2xl opacity-20 group-hover:opacity-60 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

                <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105 overflow-hidden flex flex-col w-full">
                  {/* Top Accent Bar */}
                  <div className="h-2 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700"></div>

                  <div className="p-6 flex flex-col flex-1 text-center">
                    {/* Step Badge */}
                    <div className="inline-block bg-orange-100 dark:bg-orange-900/30 mb-4 mx-auto px-3 py-1 rounded-full">
                      <span className="font-bold text-orange-600 dark:text-orange-400 text-sm">
                        Step {step.step}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                      <div className="relative inline-block">
                        <div className="absolute -inset-3 bg-gradient-to-br from-orange-500/40 to-orange-600/40 opacity-30 blur-lg rounded-xl"></div>
                        <div className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-brand-primary rounded-xl p-3 shadow-xl group-hover:scale-110 transition-all duration-300">
                          <MaterialIcon
                            icon={step.icon}
                            size="xl"
                            className="text-white drop-shadow-lg"
                            ariaLabel={step.title}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="mb-2 font-bold text-gray-900 dark:text-white text-lg">
                      {step.title}
                    </h3>
                    <p className="flex-grow text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                      {step.description}
                    </p>
                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-xs font-semibold text-orange-600 dark:text-orange-400">
                        ⏱ {step.timeframe}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </StaggeredFadeIn>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="urgent-faq"
        className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
      >
        <DiagonalStripePattern color="#ea580c" />
        <BrandColorBlobs />
        {/* Placeholder for any additional blobs */}
        <div className="absolute top-20 right-[15%] w-96 h-96 bg-gradient-to-br from-orange-500/10 to-transparent dark:from-orange-500/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-20 left-[15%] w-96 h-96 bg-gradient-to-tr from-brand-primary/10 to-transparent dark:from-brand-primary/20 blur-3xl rounded-full"></div>

        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            {/* Section Header */}
            <div className="text-center mb-16 sm:mb-20">
              {/* Icon with decorative lines */}
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-orange-500/30 to-orange-600/30 blur-2xl rounded-full"></div>
                  <div className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-brand-primary p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="help"
                      size="2xl"
                      className="text-white drop-shadow-lg"
                      ariaLabel="Frequently asked questions"
                    />
                  </div>
                </div>
                <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              </div>

              {/* Two-line gradient heading */}
              <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  Common Questions About
                </span>
                <span className="block bg-gradient-to-r from-orange-600 via-orange-700 to-orange-600 bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  Urgent Construction Support
                </span>
              </h2>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="space-y-6 max-w-5xl mx-auto">
            {urgentFAQ.map((faq, _index) => (
              <div key={_index} className="group relative flex">
                {/* Animated Border Glow */}
                <div className="absolute -inset-2 bg-gradient-to-br from-orange-500/40 to-orange-600/40 rounded-2xl opacity-20 group-hover:opacity-60 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

                <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
                  {/* Top Accent Bar */}
                  <div className="h-2 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700"></div>

                  <div className="p-6 md:p-8">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="absolute -inset-2 bg-gradient-to-br from-orange-500/40 to-orange-600/40 opacity-30 blur-lg rounded-full"></div>
                          <div className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-brand-primary rounded-full p-2 shadow-lg">
                            <MaterialIcon
                              icon="question_answer"
                              size="md"
                              className="text-white drop-shadow-lg"
                              ariaLabel="Question"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-3 font-bold text-gray-900 dark:text-white text-lg sm:text-xl">
                          {faq.question}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </StaggeredFadeIn>

          {/* Link to full FAQ */}
          <div className="mt-12 text-center">
            <a
              href="/faq"
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 font-semibold transition-colors"
            >
              View All Frequently Asked Questions
              <MaterialIcon
                icon="arrow_forward"
                size="sm"
                ariaLabel="Go to FAQ page"
              />
            </a>
          </div>
        </div>
      </section>

      {/* Trust Signals & Certifications */}
      <section
        id="urgent-trust"
        className="relative bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
      >
        <DiagonalStripePattern color="#dc2626" />
        <BrandColorBlobs />
        {/* Placeholder for any additional blobs */}
        <div className="absolute top-20 right-[15%] w-96 h-96 bg-gradient-to-br from-brand-primary/10 to-transparent dark:from-brand-primary/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-20 left-[15%] w-96 h-96 bg-gradient-to-tr from-brand-secondary/10 to-transparent dark:from-brand-secondary/20 blur-3xl rounded-full"></div>

        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            {/* Section Header */}
            <div className="text-center mb-16 sm:mb-20">
              {/* Icon with decorative lines */}
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                  <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="verified"
                      size="2xl"
                      className="text-white drop-shadow-lg"
                      ariaLabel="Trust and certifications"
                    />
                  </div>
                </div>
                <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              </div>

              {/* Two-line gradient heading */}
              <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  Why Trust MH Construction
                </span>
                <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  In Critical Situations
                </span>
              </h2>

              <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                When every minute counts, you need a partner with{" "}
                <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                  proven reliability, deep expertise, and unwavering integrity
                </span>
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className={gridPresets.twoColumn("lg")}>
            {trustSignals.map((signal, _index) => (
              <div key={_index} className="group relative flex h-full">
                {/* Animated Border Glow */}
                <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-20 group-hover:opacity-60 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

                <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105 overflow-hidden flex flex-col w-full">
                  {/* Top Accent Bar */}
                  <div className="h-2 bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

                  <div className="p-8 flex items-start gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="absolute -inset-3 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 opacity-30 blur-lg rounded-xl"></div>
                        <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker rounded-xl p-3 shadow-xl group-hover:scale-110 transition-all duration-300">
                          <MaterialIcon
                            icon={signal.icon}
                            size="xl"
                            className="text-white drop-shadow-lg"
                            ariaLabel={signal.title}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="mb-3 font-bold text-gray-900 dark:text-white text-xl">
                        {signal.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {signal.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </StaggeredFadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="urgent-cta"
        className="relative py-12 sm:py-16 lg:py-20 xl:py-24 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-white overflow-hidden"
      >
        {/* Diagonal Stripe Pattern */}
        <div className="absolute inset-0 opacity-[0.05]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                #dc2626 0px,
                #dc2626 2px,
                transparent 2px,
                transparent 60px
              )`,
            }}
          ></div>
        </div>

        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <FadeInWhenVisible>
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                <MaterialIcon
                  icon="support_agent"
                  size="4xl"
                  className="text-yellow-300"
                  ariaLabel="Contact support"
                />
              </div>
            </div>
            {/* Section Header - Military Construction Standard */}
            <h2 className="mb-4 font-black text-white text-2xl xs:text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tighter">
              <span className="block mb-2 font-semibold text-gray-200 text-xl xs:text-2xl sm:text-3xl tracking-tight">
                Ready to Resolve Your
              </span>
              <span className="block bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent font-black drop-shadow-sm">
                Critical Challenge?
              </span>
            </h2>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
              Contact MH Construction today for expert consultation, specialized
              equipment with operators, and experienced crews ready for
              immediate deployment.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href={`tel:${COMPANY_INFO.phone.tel}`}
                className="inline-flex items-center gap-3 bg-white hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-orange-700 transition-all duration-200 hover:scale-105 shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/50"
                aria-label={`Call MH Construction at ${COMPANY_INFO.phone.display}`}
              >
                <MaterialIcon icon="call" size="lg" ariaLabel="Call Now" />
                {COMPANY_INFO.phone.display}
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email.main}?subject=Urgent%20Construction%20Support%20Request`}
                className="inline-flex items-center gap-3 bg-orange-800 hover:bg-orange-900 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-105 shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-900/50"
                aria-label="Email urgent support request"
              >
                <MaterialIcon
                  icon="mark_email_read"
                  size="lg"
                  ariaLabel="Email Us"
                />
                Email Us
              </a>
            </div>

            <div className="mt-8 pt-8 border-t border-white/30">
              <p className="text-white/90 mb-2">
                <strong>Service Area:</strong> Washington, Oregon, and Idaho
              </p>
              <p className="text-white/90">
                <strong>Headquarters:</strong> {COMPANY_INFO.address.full}
              </p>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </>
  );
}
