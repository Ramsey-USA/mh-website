/**
 * Veteran Benefits Banner
 * Highlights veteran-owned credentials and certifications
 */

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";

export function VeteranBenefitsBanner() {
  return (
    <section
      id="veteran-owned"
      className="bg-gradient-to-r from-brand-primary/10 dark:from-brand-primary/20 to-brand-primary/5 dark:to-brand-primary/10 py-12"
    >
      <div className="mx-auto px-4 container">
        <FadeInWhenVisible>
          <div className="flex md:flex-row flex-col justify-center items-center gap-8 mx-auto max-w-4xl">
            <div className="flex items-center">
              <MaterialIcon
                icon="military_tech"
                size="3xl"
                className="mr-4 text-brand-primary"
              />
              <div>
                <h3 className="mb-2 font-bold text-gray-900 dark:text-white text-xl">
                  Veteran-Owned Excellence
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Veteran-owned since January 2025 with military precision
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <MaterialIcon
                icon="verified"
                size="3xl"
                className="mr-4 text-brand-secondary"
              />
              <div>
                <h3 className="mb-2 font-bold text-gray-900 dark:text-white text-xl">
                  Certified & Trusted
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Licensed, bonded, and committed to quality
                </p>
              </div>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
