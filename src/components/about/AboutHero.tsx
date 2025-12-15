"use client";

import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";

export function AboutHero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 h-screen flex items-end justify-end text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"></div>

      {/* Content - Bottom Right */}
      <div className="relative z-30 mb-32 sm:mb-36 md:mb-40 lg:mb-44 mr-4 sm:mr-6 lg:mr-8 xl:mr-12 ml-auto max-w-2xl pointer-events-none pb-2">
        <div className="space-y-2 sm:space-y-3 md:space-y-4 text-right">
          {/* Main Title */}
          <h1 className="text-right text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white drop-shadow-2xl leading-relaxed">
            <span className="block text-brand-secondary">Our Oath</span>
          </h1>

          {/* Heritage Tagline - Group 1 messaging with military-construction terminology */}
          <p className="text-right text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug font-medium">
            Battle-Tested Excellence Through Operational Experience
          </p>

          {/* Heritage & Veteran-Owned Emphasis */}
          <p className="text-right text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-bronze-300 leading-snug font-bold tracking-wide">
            Veteran-Owned · 150+ Years of Combined Mission Excellence
          </p>

          {/* Trust-Heritage Messaging - Group 1 focus with military precision */}
          <p className="text-right text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug font-medium">
            Trust Built Through Service-Earned Values, Proven Through Every
            Mission
          </p>

          {/* Description - Heritage storytelling with veteran ownership and military-construction terminology */}
          <p className="text-right text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed">
            Founded in 2010, veteran-owned since January 2025. "Building
            projects for the client,{" "}
            <span className="font-black italic text-bronze-300">NOT</span> the
            dollar" — Our story is written in the construction missions
            we&apos;ve completed and the partnerships we&apos;ve built. From
            deployment to development, our history of SITREP-level
            communication, transparent mission briefs, and battle-tested
            craftsmanship speaks for itself.
          </p>
        </div>
      </div>

      {/* Page-Specific Navigation Bar */}
      <PageNavigation
        items={navigationConfigs.about}
        className="absolute bottom-0 left-0 right-0"
      />
    </section>
  );
}
