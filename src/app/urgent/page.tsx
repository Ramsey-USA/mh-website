import { type Metadata } from "next";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import { gridPresets } from "@/lib/styles/layout-variants";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";

export const metadata: Metadata = {
  title:
    "Urgent Construction Support | MH Construction - Emergency Structural Services for General Contractors",
  description:
    "Professional urgent construction support for General Contractors facing critical structural challenges. Expert consultation, specialized equipment, heavy machinery operators, and experienced crews available for immediate deployment. We fix the source - foundations, structural systems, roofing failures.",
  keywords: [
    "urgent construction support",
    "emergency structural repairs",
    "construction equipment rental",
    "heavy machinery operators",
    "general contractor support",
    "structural assessment",
    "foundation repair urgent",
    "commercial construction emergency",
    "construction crew hiring",
    "Pacific Northwest urgent construction",
  ],
  openGraph: {
    title:
      "Urgent Construction Support for General Contractors | MH Construction",
    description:
      "Expert consultation, specialized equipment, and experienced crews for critical structural challenges. Available for immediate deployment in WA, OR, and ID.",
    type: "website",
    locale: "en_US",
  },
};

/**
 * Urgent Construction Support Page
 * Professional support for General Contractors facing critical construction challenges
 */
export default function UrgentSupportPage() {
  const equipmentList = [
    {
      icon: "precision_manufacturing",
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
      icon: "forklift",
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
      icon: "engineering",
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
      icon: "groups",
      title: "Experienced Crews Available",
      description:
        "Skilled construction professionals ready for immediate deployment to your project site",
    },
    {
      icon: "build_circle",
      title: "Large Equipment & Operators",
      description:
        "Heavy machinery with certified operators available for urgent hire - excavators, loaders, and specialized equipment",
    },
    {
      icon: "handshake",
      title: "General Contractor Partnership",
      description:
        "We work WITH you as a subcontractor partner, providing the specialized resources you need NOW",
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

  return (
    <>
      {/* Hero Section - Brand Standards */}
      <section className="relative bg-gradient-to-br from-gray-900 via-orange-700 to-red-800 h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/30 via-gray-900/80 to-red-700/20"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-24 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20 lg:pb-28">
          <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
            {/* Main Title */}
            <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight">
              <span className="block text-brand-secondary font-black drop-shadow-lg">
                When Time Is Critical, We Respond
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug px-2 font-medium">
              THE ROI IS THE RELATIONSHIP • Rapid Response Partnership
            </p>

            {/* Description */}
            <p className="max-w-4xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed px-4">
              Professional support for General Contractors facing critical
              challenges. "Building for the Client, NOT the Dollar" means being
              there when you need us most. Expert consultation, heavy equipment
              with certified operators, and experienced crews ready for
              immediate deployment. We fix the source—foundations, structural
              systems, and roofing failures. Your urgent need is our immediate
              priority.
            </p>
          </div>
        </div>

        {/* Page Navigation */}
        <PageNavigation
          items={navigationConfigs.urgent}
          className="absolute bottom-0 left-0 right-0"
        />
      </section>

      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Urgent Support" }]}
      />

      {/* Quick Contact Section */}
      <section className="py-12 bg-orange-50 dark:bg-orange-950/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInWhenVisible>
            <div className="text-center mb-8">
              <MaterialIcon
                icon="report"
                size="3xl"
                className="text-orange-600 dark:text-orange-400 mx-auto mb-4"
              />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Emergency Contact Information
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Available Monday - Friday: 7:00 AM - 4:00 PM PST
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href="tel:+15093086489"
                className="inline-flex items-center gap-3 bg-orange-600 hover:bg-orange-700 px-8 py-4 rounded-xl font-bold text-white transition-all duration-200 hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-orange-600/50 w-full sm:w-auto justify-center"
                aria-label="Call MH Construction urgently at 509-308-6489"
              >
                <MaterialIcon icon="phone" size="lg" />
                Call Now: (509) 308-6489
              </a>
              <a
                href="mailto:office@mhc-gc.com?subject=Urgent%20Construction%20Support%20Request"
                className="inline-flex items-center gap-3 bg-gray-800 hover:bg-gray-900 px-8 py-4 rounded-xl font-bold text-white transition-all duration-200 hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-800/50 w-full sm:w-auto justify-center"
                aria-label="Email urgent construction support request"
              >
                <MaterialIcon icon="email" size="lg" />
                Email Support Request
              </a>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Our Focus Section */}
      <section className="py-16 bg-background">
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <FadeInWhenVisible>
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <div className="bg-orange-100 dark:bg-orange-900/30 p-4 rounded-2xl">
                  <MaterialIcon
                    icon="construction"
                    size="3xl"
                    className="text-orange-600 dark:text-orange-400"
                  />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                We Fix the Source, Not the Symptoms
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                When General Contractors face critical structural challenges, MH
                Construction provides expert consultation, specialized equipment
                with operators, and experienced crews to resolve urgent
                construction issues at their source.
              </p>
            </div>

            <div className="bg-orange-50 dark:bg-orange-950/30 border-l-4 border-orange-600 p-6 rounded-r-lg">
              <p className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                <MaterialIcon icon="info" className="text-orange-600" />
                For Professional Contractors Only
              </p>
              <p className="text-muted-foreground">
                This service is designed for General Contractors, commercial
                builders, and construction professionals facing time-sensitive
                structural challenges. We are not a DIY support service or
                homeowner emergency response.
              </p>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* What We Provide */}
      <section className="py-16 bg-muted/30">
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <FadeInWhenVisible>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground">
              Our Capabilities
            </h2>
          </FadeInWhenVisible>

          <StaggeredFadeIn>
            {capabilities.map((item, _index) => (
              <div
                key={_index}
                className="bg-background p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-border mb-8"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg flex-shrink-0">
                    <MaterialIcon
                      icon={item.icon}
                      size="xl"
                      className="text-orange-600 dark:text-orange-400"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2 text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </StaggeredFadeIn>
        </div>
      </section>

      {/* Large Equipment Section */}
      <section className="py-16 bg-gradient-to-br from-brand-primary to-brand-accent text-white">
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <FadeInWhenVisible>
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                  <MaterialIcon
                    icon="precision_manufacturing"
                    size="4xl"
                    className="text-yellow-300"
                  />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Heavy Equipment & Certified Operators
              </h2>
              <p className="text-lg text-white/90 max-w-3xl mx-auto">
                Large-scale equipment available for urgent hire with
                experienced, certified operators ready for immediate deployment
                to your project site.
              </p>
            </div>

            <StaggeredFadeIn>
              {equipmentList.map((equipment, _index) => (
                <div
                  key={_index}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-colors mb-6"
                >
                  <div className="flex items-start gap-4">
                    <MaterialIcon
                      icon={equipment.icon}
                      size="2xl"
                      className="text-yellow-300 flex-shrink-0"
                    />
                    <div>
                      <h3 className="font-bold text-xl mb-2">
                        {equipment.name}
                      </h3>
                      <p className="text-white/80">{equipment.description}</p>
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
      <section className="py-16 bg-background">
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className={gridPresets.twoColumn("lg")}>
            {/* What We Provide */}
            <FadeInWhenVisible>
              <div className="bg-green-50 dark:bg-green-950/30 p-8 rounded-xl border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-3 mb-6">
                  <MaterialIcon
                    icon="check_circle"
                    size="2xl"
                    className="text-green-600 dark:text-green-400"
                  />
                  <h2 className="text-2xl font-bold text-foreground">
                    What We Provide
                  </h2>
                </div>
                <ul className="space-y-3">
                  {whatWeProvide.map((item, _index) => (
                    <li key={_index} className="flex items-start gap-3">
                      <MaterialIcon
                        icon="check"
                        className="text-green-600 dark:text-green-400 flex-shrink-0 mt-1"
                      />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInWhenVisible>

            {/* What We Don't Provide */}
            <FadeInWhenVisible>
              <div className="bg-red-50 dark:bg-red-950/30 p-8 rounded-xl border border-red-200 dark:border-red-800">
                <div className="flex items-center gap-3 mb-6">
                  <MaterialIcon
                    icon="cancel"
                    size="2xl"
                    className="text-red-600 dark:text-red-400"
                  />
                  <h2 className="text-2xl font-bold text-foreground">
                    What We Don&apos;t Provide
                  </h2>
                </div>
                <ul className="space-y-3">
                  {whatWeDontDo.map((item, _index) => (
                    <li key={_index} className="flex items-start gap-3">
                      <MaterialIcon
                        icon="close"
                        className="text-red-600 dark:text-red-400 flex-shrink-0 mt-1"
                      />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-700 text-white">
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <FadeInWhenVisible>
            <MaterialIcon
              icon="support_agent"
              size="4xl"
              className="mx-auto mb-6 text-yellow-300"
            />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Resolve Your Critical Challenge?
            </h2>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
              Contact MH Construction today for expert consultation, specialized
              equipment with operators, and experienced crews ready for
              immediate deployment.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href="tel:+15093086489"
                className="inline-flex items-center gap-3 bg-white hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-orange-700 transition-all duration-200 hover:scale-105 shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/50"
              >
                <MaterialIcon icon="phone" size="lg" />
                (509) 308-6489
              </a>
              <a
                href="mailto:office@mhc-gc.com?subject=Urgent%20Construction%20Support%20Request"
                className="inline-flex items-center gap-3 bg-orange-800 hover:bg-orange-900 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-105 shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-900/50"
              >
                <MaterialIcon icon="email" size="lg" />
                Email Us
              </a>
            </div>

            <div className="mt-8 pt-8 border-t border-white/30">
              <p className="text-white/90 mb-2">
                <strong>Service Area:</strong> Washington, Oregon, and Idaho
              </p>
              <p className="text-white/90">
                <strong>Headquarters:</strong> 3111 N. Capital Ave., Pasco, WA
                99301
              </p>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </>
  );
}
