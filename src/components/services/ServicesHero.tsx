"use client";

import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";

export function ServicesHero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-20 sm:pb-24 md:pb-28 lg:pb-32">
        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          {/* Main Title */}
          <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight">
            <span className="block text-brand-secondary font-black drop-shadow-lg">
              The Battle Plan
            </span>
          </h1>

          {/* Subtitle - Group 3: Future Vision */}
          <p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug px-2 font-medium">
            Your Vision, Our Precision
          </p>

          {/* Veteran-Owned Emphasis */}
          <p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-bronze-300 leading-snug px-2 font-bold tracking-wide">
            Veteran-Owned Excellence · Comprehensive Solutions
          </p>

          {/* Values-Future Messaging - Group 3 */}
          <p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug px-2 font-medium">
            Building Tomorrow's Success on Today's Values
          </p>

          {/* Description - Future-focused with veteran values and military-construction terminology */}
          <p className="max-w-4xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed px-4">
            "Building projects for the client,{" "}
            <span className="font-black italic text-bronze-300">NOT</span> the
            dollar" — Veteran-owned operational precision meets comprehensive
            service offerings. From SITREP-level communications and transparent
            mission briefs to battle-tested craftsmanship across residential,
            commercial, and government construction operations. Where
            professional excellence today creates trusted mission partnerships
            tomorrow.
          </p>
        </div>
      </div>

      {/* Page-Specific Navigation Bar */}
      <PageNavigation
        items={navigationConfigs.services}
        className="absolute bottom-0 left-0 right-0"
      />
    </section>
  );
}
