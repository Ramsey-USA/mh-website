import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import { gridPresets } from "@/lib/styles/layout-variants";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

const services = [
  {
    icon: "explore",
    title: "Construction Management",
    subtitle: "Partnership-Focused Excellence",
    description:
      "Partnership-focused Construction Management (CM) services throughout the Tri-Cities. Our priority is delivering an exceptional partnership experience from concept through completion.",
    features: [
      "Complete project oversight & coordination",
      "Master Planning & Pre-Construction services",
      "Budget control & cost management",
      "Quality assurance & safety protocols",
    ],
    benefits: [
      "Minimize costly on-the-fly decisions",
      "Veteran-led precision & reliability",
      "Transparent communication throughout",
      "150+ years combined team experience",
    ],
    link: "/services",
    cta: "Explore Services",
  },
  {
    icon: "architecture",
    title: "Master Planning",
    subtitle: "Strategic Pre-Construction",
    description:
      "Comprehensive Pre-Construction & Master Planning services transforming your vision into reality. We strategize and coordinate every component from concept through finishing touches.",
    features: [
      "Detailed project scope development",
      "Budget & timeline forecasting",
      "Constructability analysis",
      "Vendor & material coordination",
    ],
    benefits: [
      "Prevent last-minute changes & scope creep",
      "Accurate cost projections upfront",
      "Optimized construction timeline",
      "Reduced project risks",
    ],
    link: "/services#master-planning",
    cta: "Learn More",
  },
  {
    icon: "build",
    title: "Commercial Buildings",
    subtitle: "Built for the Client, NOT the Dollar",
    description:
      "Complete Commercial Construction Services for offices, retail, industrial, medical facilities, and religious spaces across WA, OR, and ID.",
    features: [
      "Professional offices & retail spaces",
      "Medical facilities & clinics",
      "Religious & community buildings",
      "Auto dealerships & showrooms",
    ],
    benefits: [
      "Licensed in WA, OR, and ID",
      "Quality over profit mentality",
      "Proven track record since 2010",
      "Comprehensive project management",
    ],
    link: "/services#commercial-construction",
    cta: "View Projects",
  },
  {
    icon: "straighten",
    title: "Procurement & Trade Partnerships",
    subtitle: "Quality Materials, Trusted Vendors",
    description:
      "Comprehensive Trade Partnership Management specializing in sourcing quality materials and coordinating with our network of approved vendors.",
    features: [
      "Material sourcing & procurement",
      "Vendor coordination & management",
      "Quality control & verification",
      "Cost-effective purchasing strategies",
    ],
    benefits: [
      "No vendor coordination headaches",
      "Vetted, trusted trade partners",
      "Competitive material pricing",
      "On-time delivery assurance",
    ],
    link: "/services#procurement",
    cta: "Learn More",
  },
  {
    icon: "construction",
    title: "Light Industrial",
    subtitle: "Safe, Durable, Functional",
    description:
      "Safe, durable, and highly functional industrial buildings with 13+ years experience. Warehouses to processing plants built to your precise specifications.",
    features: [
      "Warehouse & distribution centers",
      "Manufacturing & processing plants",
      "Cold storage facilities",
      "Industrial parks & complexes",
    ],
    benefits: [
      "Industry-leading safety standards",
      "Durable, long-lasting construction",
      "Expert craftsmanship & materials",
      "Built to precise specifications",
    ],
    link: "/services#industrial",
    cta: "See Capabilities",
  },
  {
    icon: "gps_fixed",
    title: "Tenant Improvements",
    subtitle: "Transform Commercial Spaces",
    description:
      "Expert Commercial Tenant Improvement (TI) Services with decades of experience. Transform your commercial space quickly and efficiently with expert craftsmanship.",
    features: [
      "Office space renovations",
      "Retail store buildouts",
      "Restaurant & hospitality TI",
      "Medical office improvements",
    ],
    benefits: [
      "Fast, efficient completion",
      "Minimal business disruption",
      "Licensed throughout WA, OR, and ID",
      "Quality workmanship guaranteed",
    ],
    link: "/services#tenant-improvements",
    cta: "Get Started",
  },
];

/**
 * Services Showcase Section
 * Interactive flip cards showcasing core construction services
 */
export function ServicesShowcase() {
  return (
    <section className="relative bg-white dark:bg-gray-900 py-8 sm:py-12 lg:py-16 showcase-section">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 dark:from-gray-800/50 to-white dark:to-gray-900"></div>
      <div className="top-20 right-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-32 h-32"></div>
      <div className="bottom-20 left-20 absolute bg-brand-secondary/5 blur-3xl rounded-full w-40 h-40"></div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <FadeInWhenVisible className="mb-8 sm:mb-12 lg:mb-16 text-center">
          <h2 className="mb-4 sm:mb-6 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
            <span className="block mb-2 sm:mb-3 font-semibold text-gray-700 dark:text-gray-300 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Comprehensive
            </span>
            <span className="block text-brand-primary dark:text-brand-primary font-black">
              Construction Services
            </span>
          </h2>
          <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-4 break-words">
            From{" "}
            <span className="font-medium text-gray-800 dark:text-gray-200">
              master planning to final walkthrough
            </span>
            , we deliver partnership-focused construction management throughout
            the Tri-Cities area. Each service reflects our commitment to{" "}
            <span className="text-brand-primary font-semibold">
              building trust, not just structures
            </span>
            .
          </p>
        </FadeInWhenVisible>

        {/* Interactive Flip Cards Grid */}
        <div className={gridPresets.cards3("md")}>
          {services.map((service, index) => (
            <div
              key={index}
              className="group perspective h-[420px] sm:h-[460px] cursor-pointer"
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
                  <Card className="flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl h-full shadow-lg hover:shadow-2xl transition-all duration-300 p-4 sm:p-6 lg:p-8 overflow-hidden">
                    <CardHeader className="flex-shrink-0 pb-4 px-0">
                      <div className="flex justify-center items-center bg-brand-primary/10 mb-3 sm:mb-4 rounded-2xl w-14 h-14 sm:w-16 sm:h-16 p-2">
                        <MaterialIcon
                          icon={service.icon}
                          size="xl"
                          className="text-brand-primary"
                        />
                      </div>
                      <CardTitle className="mb-2 text-gray-900 dark:text-white text-base sm:text-lg md:text-xl lg:text-2xl font-black leading-tight break-words">
                        {service.title}
                      </CardTitle>
                      <p className="font-semibold text-brand-primary dark:text-brand-primary-light text-xs sm:text-sm break-words">
                        {service.subtitle}
                      </p>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-grow pt-0 px-0">
                      <p className="mb-4 text-gray-700 dark:text-gray-300 text-xs sm:text-sm leading-relaxed break-words">
                        {service.description}
                      </p>
                      <div className="mt-auto pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-center text-brand-secondary dark:text-brand-secondary-light">
                          <MaterialIcon
                            icon="autorenew"
                            size="sm"
                            className="mr-2 animate-pulse"
                          />
                          <span className="text-xs font-medium">
                            <span className="hidden sm:inline">
                              Hover for details
                            </span>
                            <span className="sm:hidden">Tap for details</span>
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Back Side - Detailed Information */}
                <div
                  className="absolute inset-0 w-full h-full backface-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <Card className="flex flex-col bg-gradient-to-br from-brand-primary to-brand-primary-dark dark:from-brand-primary-dark dark:to-gray-900 border border-brand-primary dark:border-brand-primary/50 rounded-3xl h-full shadow-xl p-4 sm:p-5 lg:p-6 overflow-hidden">
                    <CardHeader className="flex-shrink-0 pb-2 sm:pb-3 px-0">
                      <div className="flex items-center mb-2">
                        <MaterialIcon
                          icon={service.icon}
                          className="mr-2 text-brand-secondary text-lg sm:text-xl flex-shrink-0"
                        />
                        <CardTitle className="text-white text-sm sm:text-base md:text-lg font-bold leading-tight break-words">
                          {service.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-grow pt-0 px-0 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                      {/* What's Included */}
                      <div className="mb-3 sm:mb-4">
                        <div className="flex items-center mb-1.5 sm:mb-2">
                          <MaterialIcon
                            icon="checklist"
                            className="mr-1.5 text-brand-secondary text-sm sm:text-base flex-shrink-0"
                          />
                          <p className="font-bold text-white text-xs sm:text-sm">
                            What's Included:
                          </p>
                        </div>
                        <ul className="space-y-1 sm:space-y-1.5">
                          {service.features.map((feature, fIndex) => (
                            <li
                              key={fIndex}
                              className="flex items-start text-xs"
                            >
                              <MaterialIcon
                                icon="check_circle"
                                className="flex-shrink-0 mt-0.5 mr-1.5 text-brand-secondary text-sm"
                              />
                              <span className="text-white leading-tight break-words">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Partnership Benefits */}
                      <div className="mb-3 sm:mb-4">
                        <div className="flex items-center mb-1.5 sm:mb-2">
                          <MaterialIcon
                            icon="stars"
                            className="mr-1.5 text-brand-secondary text-sm sm:text-base flex-shrink-0"
                          />
                          <p className="font-bold text-white text-xs sm:text-sm">
                            Partnership Benefits:
                          </p>
                        </div>
                        <ul className="space-y-1 sm:space-y-1.5">
                          {service.benefits.map((benefit, bIndex) => (
                            <li
                              key={bIndex}
                              className="flex items-start text-xs"
                            >
                              <MaterialIcon
                                icon="military_tech"
                                className="flex-shrink-0 mt-0.5 mr-1.5 text-brand-secondary text-sm"
                              />
                              <span className="text-white leading-tight break-words">
                                {benefit}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA Button */}
                      <Link
                        href={service.link}
                        className="flex-shrink-0 bg-brand-secondary hover:bg-brand-secondary-dark mt-auto p-2.5 sm:p-3 rounded-lg transition-all duration-300 hover:scale-105"
                      >
                        <div className="flex items-center justify-center text-white">
                          <MaterialIcon
                            icon="arrow_forward"
                            size="sm"
                            className="mr-1.5 sm:mr-2"
                          />
                          <span className="font-bold text-xs sm:text-sm">
                            {service.cta}
                          </span>
                        </div>
                      </Link>

                      <div className="flex items-center justify-center mt-2 sm:mt-3 text-brand-secondary flex-shrink-0">
                        <MaterialIcon
                          icon="autorenew"
                          className="mr-1.5 text-sm"
                        />
                        <span className="font-medium text-xs">
                          <span className="hidden sm:inline">
                            Hover to return
                          </span>
                          <span className="sm:hidden">Tap to return</span>
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <FadeInWhenVisible className="mt-12 sm:mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Link href="/services">
              <button className="group bg-brand-primary hover:bg-brand-primary-dark text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg min-w-[240px]">
                <MaterialIcon
                  icon="explore"
                  size="lg"
                  className="inline mr-2 group-hover:rotate-12 transition-transform"
                />
                View All Services
              </button>
            </Link>
            <Link href="/contact">
              <button className="group bg-brand-secondary hover:bg-brand-secondary-dark text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg min-w-[240px]">
                <MaterialIcon
                  icon="phone"
                  size="lg"
                  className="inline mr-2 group-hover:rotate-12 transition-transform"
                />
                Call (509) 308-6489
              </button>
            </Link>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
