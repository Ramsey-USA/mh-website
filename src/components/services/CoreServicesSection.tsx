/**
 * Core Services Section
 * Displays the main services offered
 */

import { StaggeredFadeIn } from "@/components/animations/FramerMotionComponents";
import { gridPresets } from "@/lib/styles/layout-variants";
import { SectionHeader } from "@/components/ui";
import { ServiceCard } from "./ServiceCard";
import type { CoreService } from "./servicesData";

interface CoreServicesSectionProps {
  services: CoreService[];
}

export function CoreServicesSection({ services }: CoreServicesSectionProps) {
  return (
    <section
      id="core-services"
      className="relative bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 sm:py-16 lg:py-24 xl:py-32 overflow-hidden"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(56,104,81,0.08)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_bottom_left,rgba(56,104,81,0.15)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(189,146,100,0.06)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(189,146,100,0.12)_0%,transparent_50%)]"></div>

      {/* Animated Blur Orbs */}
      <div className="top-20 right-10 absolute bg-brand-primary/10 dark:bg-brand-primary/20 blur-3xl rounded-full w-32 h-32 animate-pulse"></div>
      <div
        className="left-10 bottom-20 absolute bg-brand-secondary/10 dark:bg-brand-secondary/20 blur-3xl rounded-full w-40 h-40 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="top-1/2 right-1/4 absolute bg-brand-primary/5 dark:bg-brand-primary/10 blur-3xl rounded-full w-24 h-24 animate-pulse"
        style={{ animationDelay: "0.5s" }}
      ></div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionHeader
          icon="engineering"
          iconVariant="multi"
          subtitle="Core Partnership"
          title="Services"
          description="Comprehensive partnership-focused management services designed to bring your vision to life through collaboration and military precision"
        />

        <StaggeredFadeIn
          className={gridPresets.cards3("md", "mx-auto max-w-7xl")}
        >
          {services.map((service, _index) => (
            <ServiceCard key={_index} service={service} />
          ))}
        </StaggeredFadeIn>
      </div>
    </section>
  );
}
