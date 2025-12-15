"use client";

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";

/**
 * Homepage Hero Section
 * Full-screen hero with background support for photo/video
 */
export function HeroSection() {
  return (
    <section className="relative h-screen flex items-end justify-end text-white overflow-hidden">
      {/* Background - Ready for photo or video */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900">
        {/* Optional: Add background image or video here */}
        {/* <img src="/path/to/image.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" /> */}
        {/* <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" /> */}

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/60 to-gray-900/80"></div>
      </div>

      {/* Header Text - Bottom Right */}
      <div className="relative z-30 mb-32 sm:mb-36 md:mb-40 lg:mb-44 mr-4 sm:mr-6 lg:mr-8 xl:mr-12 ml-auto max-w-2xl pointer-events-none pb-2">
        {/* Mission Icon */}
        <div className="flex justify-end mb-4">
          <MaterialIcon
            icon="flag"
            size="5xl"
            theme="veteran"
            className="drop-shadow-2xl opacity-90 hover:opacity-100 transition-opacity"
            ariaLabel="Mission-focused construction"
          />
        </div>
        <h1 className="text-right text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white drop-shadow-2xl leading-relaxed">
          <span className="block text-brand-secondary">
            Veteran-Owned Since January 2025
          </span>
          <span className="block text-brand-primary">Proven Craftsmanship</span>
          <span className="block text-white/90">
            Building for the Client,{" "}
            <span className="font-black italic text-bronze-300">NOT</span> the
            Dollar
          </span>
        </h1>
      </div>

      {/* Page-Specific Navigation Bar */}
      <PageNavigation
        items={navigationConfigs.home}
        className="absolute bottom-0 left-0 right-0"
      />
    </section>
  );
}
