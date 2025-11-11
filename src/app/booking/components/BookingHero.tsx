/**
 * Booking Page Hero Component
 * Consistent hero section following Pattern B (gradient background)
 * NO veteran badges in hero - follows MH Construction brand standards
 */

import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";

export function BookingHero() {
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
              Schedule Your Free Consultation
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug px-2 font-medium">
            Partnership-Driven Planning • Expert Guidance • Transparent Process
          </p>

          {/* Description */}
          <p className="max-w-4xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed px-4">
            Start Your Project With Confidence. "Building for the Owner, NOT the
            Dollar" — Partner with Eastern Washington's veteran-owned
            construction leader. Schedule a complimentary 60-minute consultation
            to discuss your project vision and discover how we can work WITH you
            to achieve extraordinary results.
          </p>
        </div>
      </div>

      {/* Page-Specific Navigation Bar */}
      <PageNavigation
        items={navigationConfigs.booking}
        className="absolute bottom-0 left-0 right-0"
      />
    </section>
  );
}
