/**
 * Construction Expertise Section
 * Shows partnership-focused construction management information
 */

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import { BrandedContentSection } from "@/components/templates";

export function ConstructionExpertiseSection() {
  return (
    <BrandedContentSection
      id="expertise"
      header={{
        icon: "handshake",
        iconVariant: "secondary",
        subtitle: "Partnership-Focused",
        title: "Construction Management",
        description: (
          <>
            Planning a new commercial building demands intricate details and{" "}
            <span className="font-bold text-brand-secondary dark:text-brand-secondary-light">
              expert partnership oversight
            </span>
            {". "}Work WITH us through comprehensive Partnership-Focused
            Construction Management services across our Tri-State licensed
            footprint from our Tri-Cities headquarters (Pasco, Richland,
            Kennewick).
          </>
        ),
      }}
    >
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
                </strong>{" "}
                Delivering an exceptional partnership experience from start to
                finish. Our commitment to thorough communication ensures you're
                never in the dark about your project's status or details.
              </p>
            </div>
          </div>
        </div>
      </FadeInWhenVisible>
    </BrandedContentSection>
  );
}
