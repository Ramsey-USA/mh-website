import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";

/**
 * Homepage Hero Section
 * Full-screen hero with video background
 */
export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/mh_veterans_day_vid.mp4" type="video/mp4" />
        </video>
        {/* Light overlay for subtle darkening if needed */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 via-gray-900/30 to-brand-secondary/20"></div>
      </div>

      {/* Veterans Day Message */}
      <div className="absolute bottom-20 left-0 right-0 z-10 text-center pb-4">
        <p className="text-brand-secondary text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow-lg">
          Happy Veterans Day!
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
