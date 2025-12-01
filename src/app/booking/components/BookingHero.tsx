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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-32 sm:pt-36 md:pt-40 lg:pt-44 pb-12 sm:pb-16 md:pb-20 lg:pb-28">
        <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
          {/* Main Title */}
          <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight">
            <span className="block text-brand-secondary font-black drop-shadow-lg">
              Where Great Partnerships Begin
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug px-2 font-medium">
            Where Handshakes Still Matter • Building for the Client,{" "}
            <span className="font-black text-bronze-300">NOT</span> the Dollar
          </p>

          {/* Description */}
          <p className="max-w-4xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed px-4">
            Face-to-face consultation where trust begins. In a modern world, we
            believe in traditional business values—real handshakes, honest
            conversations, and keeping your word. Schedule your free
            consultation with our veteran-owned team where we listen to your
            vision, answer every question, and build relationships that last
            beyond the construction. The way business should be done.
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
