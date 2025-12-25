"use client";

import Link from "next/link";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";

export function ServicesCTA() {
  return (
    <section
      id="ready-to-start"
      className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
    >
      {/* Diagonal Stripe Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #386851 0px,
              #386851 2px,
              transparent 2px,
              transparent 60px
            )`,
          }}
        ></div>
      </div>

      {/* Large Brand Color Blobs */}
      <div className="absolute top-20 right-[15%] w-96 h-96 bg-gradient-to-br from-brand-primary/10 to-transparent dark:from-brand-primary/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 left-[15%] w-96 h-96 bg-gradient-to-tr from-brand-secondary/10 to-transparent dark:from-brand-secondary/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <FadeInWhenVisible>
          <div className="mx-auto max-w-4xl">
            {/* Section Header - Military Construction Standard */}
            <div className="mb-16 sm:mb-20 text-center">
              {/* Icon with decorative lines */}
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-secondary/30 blur-2xl rounded-full"></div>
                  <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-secondary p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="handshake"
                      size="2xl"
                      className="text-white drop-shadow-lg"
                      ariaLabel="Partnership"
                    />
                  </div>
                </div>
                <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              </div>

              {/* Two-line gradient heading */}
              <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  Ready to Build Trust
                </span>
                <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  Through Our Values?
                </span>
              </h2>

              {/* Description with colored keyword highlighting */}
              <p className="mx-auto max-w-3xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                Experience{" "}
                <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                  Honesty, Integrity, Professionalism, and Thoroughness
                </span>{" "}
                in every construction operation. Let's discuss how our{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  service-earned values
                </span>{" "}
                create lasting partnerships.
              </p>
            </div>

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
                  href="tel:+15093086489"
                  className="hover:text-brand-primary dark:hover:text-brand-primary-light transition-colors"
                  aria-label="Call MH Construction at (509) 308-6489"
                >
                  (509) 308-6489
                </a>
              </p>
              <p className="font-medium text-gray-600 dark:text-gray-400 text-base md:text-lg">
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
              <p className="font-medium text-gray-600 dark:text-gray-400 text-base md:text-lg">
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
      </div>
    </section>
  );
}
