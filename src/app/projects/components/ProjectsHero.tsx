/**
 * Projects Hero Section
 * Hero header for the projects page
 */

import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

export function ProjectsHero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-24 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20 lg:pb-28">
        <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
          {/* Main Title */}
          <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight">
            <span className="block text-brand-secondary font-black drop-shadow-lg">
              Partnership Success Stories
            </span>
          </h1>

          {/* ROI Slogan - Prominent relationship messaging */}
          <p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-bronze-300 leading-snug px-2 font-bold tracking-wide">
            THE ROI IS THE RELATIONSHIP
          </p>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug px-2 font-medium">
            "Building for the Owner, NOT the Dollar"
          </p>

          {/* Description */}
          <p className="max-w-4xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed px-4">
            Building Excellence Together Across the Pacific Northwest - Explore
            our comprehensive portfolio showcasing decades of collaborative
            partnerships throughout the Tri-Cities area.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center pt-4 sm:pt-6">
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
