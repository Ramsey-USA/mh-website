/**
 * Projects Hero Section
 * Hero header for the projects page
 */

import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

export function ProjectsHero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 h-screen flex items-end justify-end text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"></div>

      {/* Content - Bottom Right */}
      <div className="relative z-30 mb-32 sm:mb-36 md:mb-40 lg:mb-44 mr-4 sm:mr-6 lg:mr-8 xl:mr-12 ml-auto max-w-2xl pointer-events-none pb-2">
        <div className="space-y-2 sm:space-y-3 md:space-y-4 text-right">
          {/* Victories Trophy Icon */}
          <div className="flex justify-end mb-4">
            <MaterialIcon
              icon="emoji_events"
              size="5xl"
              theme="veteran"
              className="drop-shadow-2xl opacity-90 hover:opacity-100 transition-opacity"
              ariaLabel="Victories - Completed projects"
            />
          </div>
          {/* Main Title */}
          <h1 className="text-right text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white drop-shadow-2xl leading-relaxed">
            <span className="block text-brand-secondary">Victories</span>
          </h1>

          {/* Heritage Tagline - Group 2 messaging with military-construction terminology */}
          <p className="text-right text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug font-medium">
            Battle-Tested Results, Mission Partnerships
          </p>

          {/* Veteran-Owned Emphasis */}
          <p className="text-right text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-bronze-300 leading-snug font-bold tracking-wide">
            Trust Built Through Service-Earned Values, Proven Through
            Construction Missions
          </p>

          {/* Group 2: Heritage Focus */}
          <p className="text-right text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug font-medium">
            Operational Excellence Through Experience Since 2010
          </p>

          {/* Description - Heritage storytelling with veteran values and military-construction terminology */}
          <p className="text-right text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed">
            "Building projects for the client,{" "}
            <span className="font-black italic text-bronze-300">NOT</span> the
            dollar" — Veteran-owned since 2025, our mission history of
            SITREP-level communications, transparent mission briefs, and
            battle-tested craftsmanship speaks for itself. Every completed
            construction operation demonstrates our commitment to operational
            excellence. From humble beginnings to regional leadership—our track
            record proves what service-earned values-driven construction
            delivers.
          </p>

          {/* CTA Button */}
          <div className="flex justify-end pt-4 sm:pt-6">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                document
                  .getElementById("projects-showcase")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group"
            >
              Explore Our Work
              <MaterialIcon
                icon="arrow_downward"
                size="sm"
                className="ml-2 group-hover:translate-y-1 transition-transform"
              />
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="bottom-8 left-1/2 absolute flex flex-col items-center -translate-x-1/2 transform animate-bounce">
        <MaterialIcon icon="expand_more" size="2xl" className="text-white/60" />
      </div>
    </section>
  );
}
