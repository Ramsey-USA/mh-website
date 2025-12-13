"use client";

import Link from "next/link";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";

export function ServicesCTA() {
  return (
    <section className="bg-gradient-to-r from-brand-primary dark:from-brand-primary-dark to-brand-accent dark:to-gray-800 py-20 lg:py-32 text-white">
      <div className="mx-auto px-4 container">
        <FadeInWhenVisible>
          <div className="mx-auto max-w-3xl text-center">
            {/* Section Header - v4.0.2 Clean Standards (NO BADGES) */}
            <h2 className="mb-8 pb-2 font-black text-white text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
              <span className="block mb-4 font-semibold text-white/90 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                Build Trust Through Our
              </span>
              <span className="block text-white font-black drop-shadow-lg">
                Four Core Values?
              </span>
            </h2>

            <p className="mb-10 text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed px-4 break-words">
              Experience professionalism, thoroughness, honesty, integrity,
              reliability, and quality craftsmanship in every project. Let's
              discuss how our values create lasting partnerships.
            </p>

            {/* CTA Buttons - v4.0.2 Brand Standards */}
            <div className="flex sm:flex-row flex-col justify-center gap-6 mb-10">
              <Link href="/contact">
                <Button
                  variant="primary"
                  size="lg"
                  className="transition-all duration-300 border-2 border-white bg-white text-brand-primary hover:bg-brand-primary hover:text-white hover:border-white min-w-[280px]"
                >
                  <MaterialIcon icon="handshake" size="lg" className="mr-3" />
                  <span className="font-medium">Begin Your Project</span>
                </Button>
              </Link>
              <Link href="/projects">
                <Button
                  variant="outline"
                  size="lg"
                  className="transition-all duration-300 border-2 border-white bg-transparent text-white hover:bg-white hover:text-brand-primary hover:border-white min-w-[280px]"
                >
                  <MaterialIcon icon="verified" size="lg" className="mr-3" />
                  <span className="font-medium">Trust In Action</span>
                </Button>
              </Link>
            </div>

            {/* Contact Information */}
            <div className="flex sm:flex-row flex-col justify-center items-center gap-6 text-white/80 text-sm">
              <div className="flex items-center">
                <MaterialIcon icon="phone" size="sm" className="mr-2" />
                <span>(509) 308-6489</span>
              </div>
              <div className="flex items-center">
                <MaterialIcon icon="email" size="sm" className="mr-2" />
                <span>info@mh-construction.com</span>
              </div>
              <div className="flex items-center">
                <MaterialIcon icon="location_on" size="sm" className="mr-2" />
                <span>Serving the Tri-Cities & Beyond</span>
              </div>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
