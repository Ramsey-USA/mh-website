"use client";

import Link from "next/link";
import { COMPANY_INFO } from "@/lib/constants/company";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import { BrandedContentSection } from "@/components/templates";

export function ServicesCTA() {
  return (
    <BrandedContentSection
      id="ready-to-start"
      header={{
        icon: "handshake",
        iconVariant: "primary",
        subtitle: "Ready to Build Trust",
        title: "Through Our Values?",
        description: (
          <>
            Experience{" "}
            <span className="font-bold text-brand-primary dark:text-brand-primary-light">
              Honesty, Integrity, Professionalism, and Thoroughness
            </span>{" "}
            in every construction operation. Let's discuss how our{" "}
            <span className="font-bold text-gray-900 dark:text-white">
              service-earned values
            </span>{" "}
            create lasting partnerships.
          </>
        ),
      }}
      containerClassName="text-center"
    >
      <FadeInWhenVisible>
        <div className="mx-auto max-w-4xl">
          {/* CTA Buttons */}
          <div className="flex sm:flex-row flex-col justify-center gap-6 mb-12">
            <Link href="/contact" className="inline-block">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto min-w-[280px] transition-all duration-300 group"
                aria-label="Start your construction project with MH Construction"
              >
                <MaterialIcon
                  icon="handshake"
                  size="lg"
                  className="mr-3 group-hover:scale-110 transition-transform duration-300"
                  ariaLabel=""
                />
                <span className="font-semibold">Begin Your Mission</span>
              </Button>
            </Link>
            <Link href="/projects" className="inline-block">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto min-w-[280px] transition-all duration-300 group border-2 border-brand-primary dark:border-brand-primary-light"
                aria-label="View our completed projects"
              >
                <MaterialIcon
                  icon="verified"
                  size="lg"
                  className="mr-3 group-hover:scale-110 transition-transform duration-300"
                  ariaLabel=""
                />
                <span className="font-semibold">Trust In Action</span>
              </Button>
            </Link>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 text-center">
            <p className="font-semibold text-gray-700 dark:text-gray-300 text-lg md:text-xl">
              <MaterialIcon
                icon="phone"
                size="md"
                className="inline mr-2 text-brand-primary dark:text-brand-primary-light"
                ariaLabel="Phone"
              />
              <a
                href={`tel:${COMPANY_INFO.phone.tel}`}
                className="hover:text-brand-primary dark:hover:text-brand-primary-light transition-colors"
                aria-label="Call MH Construction at (509) 308-6489"
              >
                (509) 308-6489
              </a>
            </p>
            <p className="font-medium text-gray-600 dark:text-gray-300 text-base md:text-lg">
              <MaterialIcon
                icon="email"
                size="md"
                className="inline mr-2 text-brand-primary dark:text-brand-primary-light"
                ariaLabel="Email"
              />
              <a
                href="mailto:office@mhc-gc.com"
                className="hover:text-brand-primary dark:hover:text-brand-primary-light transition-colors"
                aria-label="Email MH Construction at office@mhc-gc.com"
              >
                office@mhc-gc.com
              </a>
            </p>
            <p className="font-medium text-gray-600 dark:text-gray-300 text-base md:text-lg">
              <MaterialIcon
                icon="location_on"
                size="md"
                className="inline mr-2 text-brand-primary dark:text-brand-primary-light"
                ariaLabel="Location"
              />
              Serving the Tri-Cities & Pacific Northwest
            </p>
          </div>
        </div>
      </FadeInWhenVisible>
    </BrandedContentSection>
  );
}
