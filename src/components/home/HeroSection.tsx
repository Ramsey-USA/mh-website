"use client";

import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";

/**
 * Homepage Hero Section
 * Full-screen hero with gradient background (video removed for transparency)
 */
export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Gradient Background (replaces video) */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"></div>
      </div>

      {/* Main Tagline Overlay - Centered */}
      <div className="relative z-30 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pointer-events-none pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-20 sm:pb-24 md:pb-28 lg:pb-32">
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white drop-shadow-2xl leading-tight mb-3 xs:mb-4 sm:mb-6">
          <span className="block text-brand-secondary font-black mb-2 xs:mb-3 sm:mb-4">
            Where Handshakes Still Matter
          </span>
          <span className="block text-white/95 font-bold text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
            Veteran Values,
            <br />
            <span className="text-brand-primary">
              Community-Focused Results
            </span>
          </span>
        </h1>
        <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-medium max-w-4xl mx-auto drop-shadow-lg px-2">
          Military Precision • Your Word Is Your Bond • Serving the Pacific
          Northwest
        </p>
      </div>

      {/* Page-Specific Navigation Bar */}
      <PageNavigation
        items={navigationConfigs.home}
        className="absolute bottom-0 left-0 right-0"
      />
    </section>
  );
}
