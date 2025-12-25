/**
 * Service Capabilities Section
 * Displays construction service capabilities
 */

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { StaggeredFadeIn } from "@/components/animations/FramerMotionComponents";
import { capabilities } from "./projectsData";

export function CapabilitiesSection() {
  return (
    <section
      id="capabilities"
      className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
    >
      {/* Diagonal Stripe Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #386851 0px,
              #386851 2px,
              transparent 2px,
              transparent 60px
            )`,
          }}
        ></div>
      </div>

      {/* Large Brand Color Blobs */}
      <div className="absolute top-20 right-[15%] w-96 h-96 bg-gradient-to-br from-brand-primary/10 to-transparent dark:from-brand-primary/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 left-[15%] w-96 h-96 bg-gradient-to-tr from-brand-secondary/10 to-transparent dark:from-brand-secondary/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header - Military Construction Standard */}
        <div className="mb-16 sm:mb-20 text-center">
          {/* Icon with decorative lines */}
          <div className="flex items-center justify-center mb-8 gap-4">
            <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 blur-2xl rounded-full"></div>
              <div className="relative bg-gradient-to-br from-brand-primary via-brand-secondary to-bronze-700 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                <MaterialIcon
                  icon="construction"
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
              Construction
            </span>
            <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
              Capabilities
            </span>
          </h2>

          {/* Description with colored keyword highlighting */}
          <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
            Veteran-owned{" "}
            <span className="font-bold text-brand-primary dark:text-brand-primary-light">
              collaborative expertise across multiple construction markets
            </span>
            , working{" "}
            <span className="font-bold text-gray-900 dark:text-white">
              WITH you
            </span>{" "}
            to strengthen Pacific Northwest communities.
          </p>
        </div>

        <StaggeredFadeIn className="gap-6 grid md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl">
          {capabilities.map((capability, _index) => (
            <div key={_index} className="group relative flex h-full">
              {/* Animated Border Glow */}
              <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-secondary/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

              <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-1 overflow-hidden flex flex-col w-full">
                {/* Top Accent Bar */}
                <div className="h-2 bg-gradient-to-r from-brand-primary via-brand-secondary to-bronze-700"></div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="relative inline-block mb-4">
                    <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-secondary/40 opacity-30 blur-lg rounded-xl"></div>
                    <div className="relative rounded-xl bg-gradient-to-br from-brand-primary via-brand-secondary to-bronze-700 p-3 shadow-xl group-hover:scale-110 transition-all duration-300">
                      <MaterialIcon
                        icon={capability.icon}
                        size="2xl"
                        className="text-white drop-shadow-lg"
                        ariaLabel={capability.title}
                      />
                    </div>
                  </div>
                  <h3 className="flex items-center min-h-[3rem] text-gray-900 dark:text-white text-lg font-bold mb-4">
                    {capability.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {capability.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </StaggeredFadeIn>
      </div>
    </section>
  );
}
