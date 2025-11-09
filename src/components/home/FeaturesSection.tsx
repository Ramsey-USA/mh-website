import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";

const features = [
  {
    id: "ai-estimator",
    icon: "smart_toy",
    title: "AI Project Estimator",
    description:
      "AI-powered cost estimation system providing preliminary budget planning with regional market intelligence.",
    details:
      "Our AI analyzes regional project data, material costs, and labor factors to provide helpful preliminary estimates for budget planning.",
    features: [
      "Regional Market Data",
      "Real-time Material Pricing",
      "Labor Cost Analysis",
      "PDF Export",
    ],
    color: "from-brand-primary to-brand-accent",
    bgColor: "bg-brand-primary/5",
  },
  {
    id: "smart-scheduling",
    icon: "event",
    title: "Smart Scheduling",
    description:
      "Visual calendar system with real-time availability and instant confirmations for seamless booking experience.",
    details:
      "Intelligent scheduling considers team availability, project timelines, and weather patterns to optimize booking efficiency and reduce delays.",
    features: [
      "Real-time Availability",
      "Automated Confirmations",
      "Weather Integration",
      "Team Optimization",
    ],
    color: "from-brand-secondary to-bronze-700",
    bgColor: "bg-brand-secondary/5",
  },
  {
    id: "3d-explorer",
    icon: "visibility",
    title: "3D Project Explorer",
    description:
      "Immersive HD visualization with real-time builder insights to bring your vision to life before construction begins.",
    details:
      "Walk through your project in photorealistic 3D, make changes in real-time, and see exactly how your finished project will look.",
    features: [
      "Photorealistic Rendering",
      "Virtual Walkthrough",
      "Real-time Changes",
      "Material Previews",
    ],
    color: "from-brand-accent to-forest-800",
    bgColor: "bg-brand-accent/5",
  },
  {
    id: "ai-assistant",
    icon: "security",
    title: "24/7 AI Assistant",
    description:
      "Military-grade support with enhanced chatbot providing context-aware veteran assistance and instant responses.",
    details:
      "Our AI assistant understands construction terminology, veteran benefits, and project specifics to provide personalized, accurate assistance.",
    features: [
      "Veteran-Aware Support",
      "Construction Expertise",
      "Instant Responses",
      "Project Context",
    ],
    color: "from-brand-primary to-brand-secondary",
    bgColor: "bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5",
  },
];

const ctaButtons = [
  {
    title: "Get Instant AI Estimate",
    description: "Try our AI cost calculator",
    href: "/estimator",
    variant: "secondary" as const,
    icon: "smart_toy",
  },
  {
    title: "Schedule Free Consultation",
    description: "Book your site visit",
    href: "/booking",
    variant: "primary" as const,
    icon: "event",
  },
  {
    title: "View Our Work",
    description: "Explore our collaborations",
    href: "/services#portfolio",
    variant: "outline" as const,
    icon: "visibility",
  },
  {
    title: "Get In Touch",
    description: "Start our conversation",
    href: "/contact",
    variant: "outline" as const,
    icon: "support_agent",
  },
];

/**
 * Revolutionary Features Section
 * Showcases AI-powered features with flip cards and CTAs
 */
export function FeaturesSection() {
  return (
    <section
      id="revolutionary-features"
      className="relative bg-gradient-to-b from-gray-50 dark:from-gray-800 to-white dark:to-gray-900 py-8 sm:py-12 lg:py-16 features-section"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(56,104,81,0.05)_0%,transparent_50%)] opacity-60"></div>
      <div className="top-20 right-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-32 h-32"></div>
      <div className="bottom-20 left-20 absolute bg-brand-secondary/5 blur-3xl rounded-full w-40 h-40"></div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <FadeInWhenVisible className="mb-8 sm:mb-10 lg:mb-12 text-center">
          <h2 className="mb-4 sm:mb-6 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
            <span className="block mb-2 sm:mb-3 font-semibold text-gray-700 dark:text-gray-300 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
              The Future of
            </span>
            <span className="block text-brand-primary dark:text-brand-primary font-black">
              Construction
            </span>
          </h2>
          <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide px-2">
            Where{" "}
            <span className="font-medium text-gray-800 dark:text-gray-200">
              collaborative partnership meets cutting-edge AI
            </span>
            . Our veteran-led team works with you to combine decades of service
            experience with revolutionary technology to deliver construction
            management that{" "}
            <span className="text-brand-primary font-semibold">
              serves your vision
            </span>
            .
          </p>
        </FadeInWhenVisible>

        {/* Feature Cards */}
        <StaggeredFadeIn className="gap-4 sm:gap-6 lg:gap-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.id}
              id={`feature-${feature.id}`}
              className="group perspective-1000 feature-card"
            >
              <div className="relative w-full h-auto min-h-[280px] sm:min-h-[320px] md:min-h-[360px] lg:min-h-[420px] group-hover:rotate-y-180 transition-transform duration-700 preserve-3d">
                {/* Front of Card */}
                <div className="absolute inset-0 bg-white dark:bg-gray-800 shadow-lg hover:shadow-brand-primary/10 hover:shadow-xl p-4 sm:p-6 lg:p-8 border border-gray-200 dark:border-gray-700 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 backface-hidden">
                  <div
                    className={`absolute inset-0 ${feature.bgColor} rounded-2xl sm:rounded-3xl`}
                  ></div>

                  <div className="z-10 relative flex flex-col h-full">
                    <div className="flex-grow">
                      <div
                        className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${feature.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg p-2`}
                      >
                        <MaterialIcon
                          icon={feature.icon}
                          size="xl"
                          className="text-white"
                        />
                      </div>

                      <h3 className="mb-3 sm:mb-4 font-black text-gray-900 dark:text-gray-100 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-tight tracking-tight">
                        {feature.title}
                      </h3>

                      <p className="font-light text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    <div className="mt-auto pt-4 sm:pt-6 font-semibold text-brand-primary dark:text-bronze-400 text-xs uppercase tracking-wider">
                      <span className="hidden sm:inline">
                        Hover for details
                      </span>
                      <span className="sm:hidden">Tap for details</span>
                    </div>
                  </div>
                </div>

                {/* Back of Card */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} shadow-xl hover:shadow-2xl transition-shadow duration-300 p-3 sm:p-4 md:p-5 lg:p-6 rounded-2xl sm:rounded-3xl backface-hidden rotate-y-180 overflow-hidden`}
                >
                  <div className="flex flex-col h-full text-white text-center">
                    <div className="flex flex-col flex-grow min-h-0">
                      <MaterialIcon
                        icon={feature.icon}
                        size="lg"
                        className="mx-auto mb-2 text-white"
                      />
                      <h3 className="mb-2 font-black text-sm sm:text-base lg:text-lg xl:text-xl">
                        {feature.title}
                      </h3>
                      <p className="mb-3 font-light text-white/90 text-xs sm:text-sm lg:text-base leading-tight overflow-hidden">
                        {feature.details}
                      </p>
                    </div>

                    <div className="bg-white/20 backdrop-blur-sm flex-shrink-0 p-2 sm:p-2.5 border border-white/10 rounded-lg">
                      <div className="mb-1 font-medium text-white/80 text-xs uppercase tracking-wider">
                        Key Features
                      </div>
                      <ul className="space-y-0.5 text-xs">
                        {feature.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start text-left">
                            <MaterialIcon
                              icon="check_circle"
                              size="sm"
                              className="flex-shrink-0 mt-0.5 mr-1.5 text-white/80"
                            />
                            <span className="font-light leading-tight text-xs break-words">
                              {feat}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </StaggeredFadeIn>

        {/* CTA Buttons */}
        <div
          id="ai-features-cta"
          className="gap-3 sm:gap-4 lg:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-8 sm:mt-12"
        >
          {ctaButtons.map((cta, _index) => (
            <div key={_index} className="text-center">
              <Button
                variant={cta.variant}
                size="lg"
                className="group mb-2 sm:mb-3 w-full transition-all duration-300 min-h-[48px] touch-manipulation"
                onClick={() => (window.location.href = cta.href)}
              >
                <MaterialIcon
                  icon={cta.icon}
                  size="lg"
                  className="mr-2 sm:mr-3 flex-shrink-0 text-current"
                />
                <span className="font-medium text-sm sm:text-base">
                  {cta.title}
                </span>
              </Button>
              <p className="font-light text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                {cta.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
