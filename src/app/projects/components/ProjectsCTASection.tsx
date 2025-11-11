/**
 * Projects CTA Section
 * Call-to-action with contact information
 */

import Link from "next/link";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";

export function ProjectsCTASection() {
  return (
    <section className="bg-gradient-to-r from-brand-primary dark:from-brand-primary-dark to-brand-primary-dark dark:to-brand-primary py-20 lg:py-32 xl:py-40 text-white">
      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <FadeInWhenVisible>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-8 pb-2 font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
              <span className="block mb-4 font-semibold text-white/80 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                Ready to Build
              </span>
              <span className="block text-white font-black drop-shadow-lg">
                Together?
              </span>
            </h2>

            <p className="mb-10 text-white/90 text-lg sm:text-xl md:text-2xl leading-relaxed px-2">
              Let's start our partnership and bring your vision to life with the
              same veteran-owned dedication and quality you see in our portfolio
            </p>

            {/* CTA Buttons */}
            <div className="flex sm:flex-row flex-col justify-center gap-6 mb-10">
              <Link href="/booking">
                <Button
                  variant="primary"
                  size="lg"
                  className="transition-all duration-300 border-2 border-white bg-white text-brand-primary hover:bg-brand-primary hover:text-white hover:border-white min-w-[280px]"
                >
                  <MaterialIcon icon="event" size="lg" className="mr-3" />
                  <span className="font-medium">
                    Schedule Free Consultation
                  </span>
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  variant="outline"
                  size="lg"
                  className="transition-all duration-300 border-2 border-white bg-transparent text-white hover:bg-white hover:text-brand-primary hover:border-white min-w-[280px]"
                >
                  <MaterialIcon icon="build" size="lg" className="mr-3" />
                  <span className="font-medium">Explore Our Solutions</span>
                </Button>
              </Link>
            </div>

            {/* Contact Information */}
            <div className="space-y-2 text-brand-secondary">
              <p className="text-lg md:text-xl">
                <MaterialIcon icon="phone" size="md" className="inline mr-2" />
                (509) 308-6489
              </p>
              <p>
                <MaterialIcon
                  icon="location_on"
                  size="md"
                  className="inline mr-2"
                />
                3111 N. Capital Ave., Pasco, WA 99301
              </p>
              <p>
                <MaterialIcon icon="email" size="md" className="inline mr-2" />
                office@mhc-gc.com
              </p>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
