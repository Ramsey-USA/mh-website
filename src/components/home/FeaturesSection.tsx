"use client";

import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { StaggeredFadeIn } from "@/components/animations/FramerMotionComponents";
import { useChatbot } from "@/contexts/ChatbotContext";

const features = [
  {
    id: "ai-estimator",
    icon: "smart_toy",
    title: "Quick Budget Planner",
    description:
      "Helpful planning tool providing preliminary budget estimates with regional market intelligence to prepare for your consultation.",
    details:
      "Our planning tool analyzes regional project data, material costs, and labor factors to help you prepare for your in-person consultation with accurate budget expectations.",
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
    title: "24/7 Support Assistant",
    description:
      "Helpful support tool with enhanced chatbot providing context-aware veteran assistance and instant responses.",
    details:
      "Our support assistant understands construction terminology, veteran benefits, and project specifics to provide personalized assistance while you prepare for your personal consultation.",
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
    title: "Quick Budget Planner",
    description: "Helpful tool to prepare for meeting",
    href: "/estimator",
    variant: "primary" as const,
    icon: "smart_toy",
  },
  {
    title: "Begin Your Project",
    description: "Start with a personal conversation",
    href: "/booking",
    variant: "secondary" as const,
    icon: "handshake",
  },
  {
    title: "Trust In Action",
    description: "See our values at work",
    href: "/projects",
    variant: "outline" as const,
    icon: "verified",
  },
  {
    title: "24/7 Support Assistant",
    description: "Get instant help anytime",
    href: "#",
    variant: "outline" as const,
    icon: "support_agent",
    isChatbot: true,
  },
];

/**
 * Modern Tools & Features Section
 * Showcases helpful planning tools with flip cards and CTAs
 */
export function FeaturesSection() {
  const { toggleChatbot } = useChatbot();

  return (
    <section
      id="helpful-features"
      className="relative bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 sm:py-16 lg:py-24 xl:py-32 features-section overflow-hidden"
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
        className="top-1/2 right-1/4 absolute bg-brand-accent/5 dark:bg-brand-accent/10 blur-3xl rounded-full w-24 h-24 animate-pulse"
        style={{ animationDelay: "0.5s" }}
      ></div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 lg:mb-20 text-center scroll-reveal">
          <div className="flex justify-center items-center mb-6 sm:mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-accent/20 dark:bg-brand-accent/30 blur-xl rounded-full"></div>
              <div className="relative bg-gradient-to-br from-brand-accent to-bronze-700 p-4 rounded-2xl shadow-lg">
                <MaterialIcon
                  icon="engineering"
                  size="2xl"
                  className="text-white"
                />
              </div>
            </div>
          </div>
          <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
            <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
              Core Values Meet
            </span>
            <span className="block text-brand-primary dark:text-brand-primary-light font-black drop-shadow-sm">
              Modern Tools
            </span>
          </h2>
          <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-4 break-words">
            Technology serves relationships, never replaces them. Our{" "}
            <span className="font-semibold text-brand-primary dark:text-brand-primary-light">
              honest, thorough, and professional
            </span>{" "}
            planning tools help prepare for the personal consultations where{" "}
            <span className="font-medium text-gray-800 dark:text-gray-200">
              trust is built and partnerships begin
            </span>
            . Transparent communication with integrity, guided by four core
            values.
          </p>
        </div>

        {/* Feature Cards */}
        <StaggeredFadeIn className="gap-4 sm:gap-6 lg:gap-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.id}
              id={`feature-${feature.id}`}
              className="group perspective-1000 feature-card h-[400px] sm:h-[420px] md:h-[440px] lg:h-[460px]"
            >
              <div className="relative w-full h-full group-hover:rotate-y-180 transition-transform duration-700 preserve-3d">
                {/* Front of Card */}
                <div className="absolute inset-0 bg-white dark:bg-gray-800 shadow-2xl hover:shadow-brand-primary/10 p-4 sm:p-6 lg:p-8 border border-gray-200 dark:border-gray-700 rounded-3xl overflow-hidden transition-all duration-300 backface-hidden hover:scale-105">
                  <div
                    className={`absolute inset-0 ${feature.bgColor} rounded-3xl`}
                  ></div>

                  <div className="z-10 relative flex flex-col h-full">
                    <div className="flex-grow">
                      <div
                        className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-3 sm:mb-4 lg:mb-6 shadow-lg p-2 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <MaterialIcon
                          icon={feature.icon}
                          size="xl"
                          className="text-white"
                        />
                      </div>

                      <h3 className="mb-2 sm:mb-3 lg:mb-4 font-black text-gray-900 dark:text-gray-100 text-base sm:text-lg lg:text-xl xl:text-2xl leading-tight tracking-tight break-words">
                        {feature.title}
                      </h3>

                      <p className="font-light text-gray-600 dark:text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed break-words">
                        {feature.description}
                      </p>
                    </div>

                    <div className="mt-auto pt-3 sm:pt-4 lg:pt-6 flex items-center justify-center text-brand-primary dark:text-brand-primary-light">
                      <MaterialIcon
                        icon="autorenew"
                        size="md"
                        className="mr-2 animate-spin-slow group-hover:animate-spin"
                      />
                      <span className="font-semibold text-xs uppercase tracking-wider">
                        <span className="hidden sm:inline">
                          Hover for details
                        </span>
                        <span className="sm:hidden">Tap for details</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Back of Card */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} shadow-2xl transition-shadow duration-300 p-4 sm:p-5 lg:p-6 rounded-3xl backface-hidden rotate-y-180 overflow-hidden`}
                >
                  <div className="flex flex-col h-full text-white text-center">
                    <div className="flex-shrink-0 mb-2 sm:mb-3">
                      <MaterialIcon
                        icon={feature.icon}
                        size="lg"
                        className="mx-auto text-white"
                      />
                      <h3 className="mt-2 mb-1.5 sm:mb-2 font-bold text-sm sm:text-base lg:text-lg leading-tight break-words">
                        {feature.title}
                      </h3>
                    </div>

                    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent px-1">
                      <p className="font-light text-white/90 text-xs sm:text-sm leading-snug mb-3 break-words">
                        {feature.details}
                      </p>
                    </div>

                    <div className="bg-white/20 backdrop-blur-sm flex-shrink-0 mt-auto p-2.5 sm:p-3 border border-white/10 rounded-lg">
                      <div className="mb-1.5 sm:mb-2 font-medium text-white/90 text-xs uppercase tracking-wider">
                        Key Features
                      </div>
                      <ul className="space-y-1 sm:space-y-1.5 text-xs">
                        {feature.features.map((feat, idx) => (
                          <li key={idx} className="flex items-center text-left">
                            <MaterialIcon
                              icon="check_circle"
                              size="sm"
                              className="flex-shrink-0 mr-1.5 sm:mr-2 text-white/90"
                            />
                            <span className="font-light leading-snug text-xs break-words">
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
                className="group/btn mb-2 sm:mb-3 w-full transition-all duration-300 min-h-[48px] touch-manipulation"
                onClick={() => {
                  if (cta.isChatbot) {
                    toggleChatbot();
                  } else {
                    window.location.href = cta.href;
                  }
                }}
              >
                <MaterialIcon
                  icon={cta.icon}
                  size="lg"
                  className="mr-2 sm:mr-3 flex-shrink-0 group-hover/btn:scale-110 transition-transform"
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
