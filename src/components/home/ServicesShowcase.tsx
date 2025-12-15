import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import { gridPresets } from "@/lib/styles/layout-variants";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  SectionHeader,
} from "@/components/ui";

const services = [
  {
    icon: "engineering",
    title: "Construction Management",
    subtitle: "Complete Project Oversight",
    description:
      "Partnership-focused Construction Management with proven expertise throughout the Tri-Cities. Complete oversight from concept through completion—your project objectives executed with veteran-trained discipline and clear communication.",
    features: [
      "Complete project oversight & coordination",
      "Master Planning & Pre-Construction services",
      "Budget control & cost management (no surprises)",
      "Quality assurance & safety protocols",
    ],
    benefits: [
      "Eliminate costly last-minute decisions",
      "Veteran-led precision & reliability",
      "Complete transparency throughout",
      "150+ years combined field experience",
    ],
    link: "/services",
    cta: "Explore Services",
  },
  {
    icon: "map",
    title: "Master Planning",
    subtitle: "Comprehensive Pre-Construction Services",
    description:
      "Comprehensive Pre-Construction planning and strategic Master Planning—transforming your vision into actionable construction plans. We strategize and coordinate every component from initial assessment through final execution.",
    features: [
      "Detailed project scope & parameters",
      "Budget & timeline forecasting (data-driven)",
      "Constructability analysis & risk assessment",
      "Vendor & material supply chain coordination",
    ],
    benefits: [
      "Prevent last-minute changes & scope creep",
      "Accurate cost projections (no surprises)",
      "Optimized construction timeline",
      "Risk mitigation through thorough planning",
    ],
    link: "/services#master-planning",
    cta: "Learn More",
  },
  {
    icon: "build",
    title: "Commercial Buildings",
    subtitle: "Built for the Client, NOT the Dollar",
    description:
      "Comprehensive Commercial Construction services for offices, retail, industrial, medical facilities, and religious spaces. Licensed and experienced across WA, OR, and ID—quality craftsmanship over profit margins, every single build.",
    features: [
      "Professional offices & retail spaces",
      "Medical facilities & clinics",
      "Religious & community buildings",
      "Auto dealerships & showrooms",
    ],
    benefits: [
      "3-state licensing (WA, OR, ID)",
      "Quality-first project focus",
      "Proven track record since 2010",
      "Comprehensive project management",
    ],
    link: "/services#commercial-construction",
    cta: "View Projects",
  },
  {
    icon: "inventory_2",
    title: "Procurement & Trade Partnerships",
    subtitle: "Supply Chain Management & Trusted Vendors",
    description:
      "Expert Trade Partnership Management and supply chain coordination—sourcing quality materials and coordinating with our network of trusted vendors. No vendor coordination headaches, just reliable execution.",
    features: [
      "Material sourcing & procurement logistics",
      "Vendor coordination & management",
      "Quality control & verification protocols",
      "Cost-effective purchasing strategies",
    ],
    benefits: [
      "Zero vendor coordination headaches",
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
    subtitle: "Durable, High-Performance Infrastructure",
    description:
      "Safe, durable, highly functional industrial construction with 13+ years proven experience. Warehouses to processing plants built to exacting specifications with industry-leading safety standards and uncompromising quality.",
    features: [
      "Warehouse & distribution centers",
      "Manufacturing & processing plants",
      "Cold storage facilities",
      "Industrial parks & complexes",
    ],
    benefits: [
      "Industry-leading safety protocols (.64 EMR)",
      "Durable, long-lasting construction",
      "Expert craftsmanship & materials",
      "Built to precise specifications",
    ],
    link: "/services#industrial",
    cta: "See Capabilities",
  },
  {
    icon: "domain",
    title: "Tenant Improvements",
    subtitle: "Efficient Space Transformations",
    description:
      "Expert Commercial Tenant Improvement (TI) services with decades of experience. Transform your commercial space quickly and efficiently with expert craftsmanship—minimal downtime, maximum results. Fast, focused execution.",
    features: [
      "Office space renovations",
      "Retail store buildouts",
      "Restaurant & hospitality TI",
      "Medical office improvements",
    ],
    benefits: [
      "Fast, efficient project completion",
      "Minimal business disruption",
      "3-state licensing (WA, OR, ID)",
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
    <section
      id="services"
      className="relative bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 sm:py-16 lg:py-24 xl:py-32 showcase-section overflow-hidden"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,104,81,0.08)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(56,104,81,0.15)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(189,146,100,0.06)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_bottom_left,rgba(189,146,100,0.12)_0%,transparent_50%)]"></div>
      <div className="top-20 left-10 absolute bg-brand-secondary/10 dark:bg-brand-secondary/20 blur-3xl rounded-full w-32 h-32 animate-pulse"></div>
      <div
        className="right-10 bottom-20 absolute bg-brand-primary/10 dark:bg-brand-primary/20 blur-3xl rounded-full w-40 h-40 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="top-1/2 right-1/4 absolute bg-brand-primary/5 dark:bg-brand-primary/10 blur-3xl rounded-full w-24 h-24 animate-pulse"
        style={{ animationDelay: "0.5s" }}
      ></div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Enhanced Section Header with Side Accents */}
        <SectionHeader
          icon="explore"
          iconVariant="multi"
          subtitle="Full-Spectrum Construction Operations"
          title="Mission-Ready Services Built on Trust"
          description="From tactical planning (master planning) to final walkthrough and mission completion, every construction operation reflects our service-earned values—honesty, integrity, professionalism, and thoroughness. Deployed throughout the Tri-Cities and Pacific Northwest with military precision."
        />

        {/* Interactive Flip Cards Grid */}
        <div className={gridPresets.cards3("md")}>
          {services.map((service, index) => (
            <div
              key={index}
              className="group perspective-1000 scroll-reveal h-[400px] sm:h-[420px] md:h-[440px] lg:h-[460px] cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
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
                  <Card className="flex flex-col bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl dark:hover:shadow-brand-secondary/20 border border-gray-200 dark:border-gray-700 rounded-3xl h-full transition-all duration-300 p-5 sm:p-6 md:p-7 lg:p-8 overflow-hidden group-hover:scale-[1.02]">
                    {/* Gradient Background Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/5 to-brand-primary/5 dark:from-brand-secondary/10 dark:to-brand-primary/10 opacity-80 dark:opacity-60"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-gray-800/40"></div>

                    <div className="relative z-10 flex flex-col h-full">
                      <CardHeader className="flex-shrink-0 pb-4 px-0">
                        {/* Enhanced Icon Container */}
                        <div className="relative inline-block mb-4 sm:mb-5 flex-shrink-0">
                          <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/30 to-brand-primary/30 blur-xl rounded-3xl"></div>
                          <div className="relative flex justify-center items-center bg-gradient-to-br from-brand-secondary to-brand-secondary-dark rounded-2xl w-16 h-16 sm:w-20 sm:h-20 shadow-xl group-hover:scale-110 transition-transform duration-300">
                            <MaterialIcon
                              icon={service.icon}
                              size="xl"
                              className="text-white"
                            />
                          </div>
                        </div>
                        <CardTitle className="mb-2 sm:mb-3 text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl font-black leading-tight break-words">
                          {service.title}
                        </CardTitle>
                        <p className="font-semibold text-brand-primary dark:text-brand-primary-light text-sm sm:text-base break-words">
                          {service.subtitle}
                        </p>
                      </CardHeader>
                      <CardContent className="flex flex-col flex-grow pt-0 px-0">
                        <p className="mb-4 text-gray-700 dark:text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed break-words">
                          {service.description}
                        </p>
                        <div className="mt-auto pt-3 sm:pt-4 border-t border-gray-300 dark:border-gray-600">
                          <div className="flex items-center justify-center text-brand-primary dark:text-brand-primary-light">
                            <MaterialIcon
                              icon="autorenew"
                              size="md"
                              className="mr-2 animate-spin-slow group-hover:animate-spin"
                            />
                            <span className="font-semibold text-xs sm:text-sm uppercase tracking-wider">
                              <span className="hidden sm:inline">
                                Hover for details
                              </span>
                              <span className="sm:hidden">Tap for details</span>
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </div>
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
                  <Card className="flex flex-col bg-gradient-to-br from-brand-primary to-brand-primary-dark dark:from-brand-primary-dark dark:to-gray-900 border border-brand-primary dark:border-brand-primary/50 rounded-3xl h-full shadow-xl p-5 sm:p-6 md:p-7 lg:p-8 overflow-hidden">
                    {/* Overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/20"></div>

                    <div className="relative flex flex-col h-full">
                      <CardHeader className="flex-shrink-0 pb-3 px-0">
                        <div className="flex items-center mb-2">
                          <div className="inline-block bg-white/20 backdrop-blur-sm p-2 rounded-xl mr-2">
                            <MaterialIcon
                              icon={service.icon}
                              size="md"
                              className="text-white"
                            />
                          </div>
                          <CardTitle className="text-white text-base sm:text-lg md:text-xl font-bold leading-tight break-words">
                            {service.title}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="flex flex-col flex-1 pt-0 px-0 min-h-0">
                        {/* What's Included */}
                        <div className="mb-3">
                          <div className="flex items-center mb-2">
                            <MaterialIcon
                              icon="checklist"
                              className="mr-1.5 text-brand-secondary text-sm flex-shrink-0"
                            />
                            <p className="font-bold text-white text-xs sm:text-sm">
                              What's Included:
                            </p>
                          </div>
                          <ul className="space-y-1">
                            {service.features
                              .slice(0, 3)
                              .map((feature, fIndex) => (
                                <li key={fIndex} className="flex items-start">
                                  <MaterialIcon
                                    icon="check_circle"
                                    className="flex-shrink-0 mt-0.5 mr-1.5 text-brand-secondary text-xs"
                                  />
                                  <span className="text-white text-xs sm:text-sm leading-snug break-words">
                                    {feature}
                                  </span>
                                </li>
                              ))}
                          </ul>
                        </div>

                        {/* Partnership Benefits */}
                        <div>
                          <div className="flex items-center mb-2">
                            <MaterialIcon
                              icon="stars"
                              className="mr-1.5 text-brand-secondary text-sm flex-shrink-0"
                            />
                            <p className="font-bold text-white text-xs sm:text-sm">
                              Key Benefits:
                            </p>
                          </div>
                          <ul className="space-y-1">
                            {service.benefits
                              .slice(0, 3)
                              .map((benefit, bIndex) => (
                                <li key={bIndex} className="flex items-start">
                                  <MaterialIcon
                                    icon="military_tech"
                                    className="flex-shrink-0 mt-0.5 mr-1.5 text-brand-secondary text-xs"
                                  />
                                  <span className="text-white text-xs sm:text-sm leading-snug break-words">
                                    {benefit}
                                  </span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </CardContent>
                    </div>
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
              <Button
                variant="primary"
                className="group/btn min-w-[240px] min-h-[48px] text-base sm:text-lg"
              >
                <MaterialIcon
                  icon="explore"
                  size="lg"
                  className="mr-2 group-hover/btn:scale-110 transition-transform"
                />
                Our Values-Driven Services
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="secondary"
                className="group/btn min-w-[240px] min-h-[48px] text-base sm:text-lg"
              >
                <MaterialIcon
                  icon="handshake"
                  size="lg"
                  className="mr-2 group-hover/btn:scale-110 transition-transform"
                />
                Begin Your Project
              </Button>
            </Link>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
