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
              Your Vision, Our Precision
            </span>
          </h1>

          {/* Subtitle - Brand Tagline */}
          <p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug px-2 font-medium">
            Shaping the Future of Construction • Building projects for the
            client, <em>NOT</em>
            the dollar
          </p>

          {/* Description */}
          <p className="max-w-4xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed px-4">
            Evolving to serve you better. From traditional craftsmanship to
            AI-powered estimation—we're expanding our capabilities to match your
            vision. Excellence in Every Detail meets innovative solutions. Where
            your tomorrow begins today, and every partnership drives our growth
            forward across the Pacific Northwest.
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
