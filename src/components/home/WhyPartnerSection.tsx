"use client";

import { MaterialIcon } from "@/components/icons/MaterialIcon";

const partnershipValues = [
  {
    icon: "emoji_events",
    title: "Award-Winning Safety",
    subtitle: ".6 EMR Excellence",
    description:
      "Multiple AGC-WA Top EMR Awards with .6 EMR—40% better than industry average. 3+ years without time-loss injury and OSHA VPP Star designation demonstrate our unwavering commitment to zero-incident workplace culture.",
    iconColor: "text-brand-secondary",
  },
  {
    icon: "workspace_premium",
    title: "150+ Years Experience",
    subtitle: "Proven Excellence",
    description:
      "Our team brings deep expertise across all construction disciplines—refined through decades of successful projects. We leverage proven methods refined through generations of construction excellence.",
    iconColor: "text-brand-secondary",
  },
  {
    icon: "visibility",
    title: "Owner-Focused Transparency",
    subtitle: "No Surprises Partnership",
    description:
      "Open-book pricing, honest timelines, and constant communication. You control it, we manage it—full visibility into every decision. Veteran integrity means no hidden costs, ever.",
    iconColor: "text-brand-secondary",
  },
  {
    icon: "handshake",
    title: "THE ROI IS THE RELATIONSHIP",
    subtitle: "Beyond Project Completion",
    description:
      "Our partnership doesn't end when construction finishes. 70% of our business comes from referrals and repeat clients—testament to lasting partnerships that become lifelong community connections.",
    iconColor: "text-brand-secondary",
  },
];

export function WhyPartnerSection() {
  return (
    <section className="relative bg-gradient-to-br from-brand-primary via-brand-accent to-gray-900 py-8 sm:py-12 lg:py-16 text-white">
      <div className="z-10 relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10 lg:mb-12 text-center scroll-reveal">
          <h2 className="mb-4 sm:mb-6 font-black text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
            <span className="block mb-2 sm:mb-3 font-semibold text-white/80 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
              The MH Partnership
            </span>
            <span className="block text-white font-black drop-shadow-lg">
              Difference
            </span>
          </h2>

          <p className="mx-auto max-w-5xl font-light text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
            Experience the collaborative approach where veteran values and
            genuine partnership create extraordinary results.
          </p>

          {/* Core Philosophy Tagline */}
          <div className="mt-6 sm:mt-8 mb-3 sm:mb-4">
            <p className="mx-auto max-w-4xl font-bold text-white text-lg sm:text-xl md:text-2xl text-center leading-relaxed tracking-wide px-2">
              "Building for the Owner,{" "}
              <span className="font-black text-bronze-300 text-xl sm:text-2xl md:text-3xl">
                NOT
              </span>{" "}
              the Dollar"
            </p>
          </div>
        </div>

        {/* Core Partnership Values - Mobile optimized 4 Flip Cards */}
        <div className="gap-3 sm:gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {partnershipValues.map((value, _index) => (
            <div key={_index} className="group h-56 sm:h-64 perspective-1000">
              <div className="relative h-full group-hover:rotate-y-180 transition-transform duration-700 preserve-3d">
                {/* Front of Card */}
                <div className="absolute inset-0 backface-hidden">
                  <div className="flex flex-col justify-center items-center bg-white/10 backdrop-blur-sm p-3 sm:p-4 border border-white/20 rounded-lg sm:rounded-xl h-full text-center">
                    <div className="mb-2 sm:mb-3">
                      <MaterialIcon
                        icon={value.icon}
                        size="xl"
                        className={`drop-shadow-lg mx-auto ${value.iconColor || "text-white"}`}
                      />
                    </div>
                    <h3 className="font-black text-white text-lg sm:text-xl md:text-2xl tracking-tight">
                      {value.title}
                    </h3>
                    <p className="mt-1 text-white/70 text-xs">
                      <span className="hidden sm:inline">
                        Hover to learn more
                      </span>
                      <span className="sm:hidden">Tap to learn more</span>
                    </p>
                  </div>
                </div>

                {/* Back of Card */}
                <div className="absolute inset-0 rotate-y-180 backface-hidden">
                  <div className="flex flex-col justify-center bg-brand-primary/90 backdrop-blur-sm p-3 sm:p-4 border border-white/20 rounded-lg sm:rounded-xl h-full text-center">
                    <div className="mb-2 sm:mb-3">
                      <MaterialIcon
                        icon={value.icon}
                        size="lg"
                        className={`mx-auto ${value.iconColor || "text-white"}`}
                      />
                    </div>
                    <h3 className="mb-2 sm:mb-3 font-black text-white text-base sm:text-lg md:text-xl">
                      {value.subtitle}
                    </h3>
                    <p className="text-white/90 text-xs sm:text-sm md:text-base leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-brand-secondary/20 to-transparent"></div>
      </div>
    </section>
  );
}
