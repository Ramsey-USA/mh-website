/**
 * Construction Expertise Section
 * Shows partnership-focused construction management information
 */

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";

export function ConstructionExpertiseSection() {
  return (
    <section className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-12 sm:py-16 lg:py-24 xl:py-32 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,104,81,0.08)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(56,104,81,0.15)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(189,146,100,0.06)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_bottom_left,rgba(189,146,100,0.12)_0%,transparent_50%)]"></div>

      {/* Animated Blur Orbs */}
      <div className="top-20 left-10 absolute bg-brand-primary/10 dark:bg-brand-primary/20 blur-3xl rounded-full w-32 h-32 animate-pulse"></div>
      <div
        className="right-10 bottom-20 absolute bg-brand-secondary/10 dark:bg-brand-secondary/20 blur-3xl rounded-full w-40 h-40 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="top-1/2 left-1/4 absolute bg-brand-primary/5 dark:bg-brand-primary/10 blur-3xl rounded-full w-24 h-24 animate-pulse"
        style={{ animationDelay: "0.5s" }}
      ></div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionHeader
          icon="handshake"
          iconVariant="secondary"
          subtitle="Partnership-Focused"
          title="Construction Management"
          description="Planning a new commercial building demands intricate details and expert partnership oversight. Work WITH us through comprehensive Partnership-Focused Construction Management services throughout the Tri-Cities (Pasco, WA) area."
        />

        <FadeInWhenVisible>
          <div className="relative">
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 dark:bg-brand-primary/10 rounded-bl-full transform translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-500"></div>

            <div className="relative flex items-start gap-4 mb-12">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <MaterialIcon
                  icon="handshake"
                  size="lg"
                  className="text-brand-primary"
                />
              </div>
              <div className="flex-1">
                <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed text-left">
                  <strong className="text-brand-primary dark:text-brand-primary-light block mb-3 text-xl sm:text-2xl font-black">
                    Our Partnership Priority:
                  </strong>
                  Delivering an exceptional partnership experience from start to
                  finish. Our commitment to thorough communication ensures
                  you're never in the dark about your project's status or
                  details.
                </p>
              </div>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
