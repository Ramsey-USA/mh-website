"use client";

import Link from "next/link";
import { Button, Card, CardContent } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import {
  ServicesHero,
  ServiceCard,
  SpecialtyServiceCard,
  WhyChooseUs,
  ServicesCTA,
  coreServices,
  specialtyServices,
  serviceAreas,
} from "@/components/services";

export default function ServicesPage() {
  return (
    <>
      <div className="bg-gradient-to-b from-white dark:from-gray-900 to-gray-50 dark:to-gray-800 min-h-screen">
        {/* Hero Section */}
        <ServicesHero />

        {/* Construction Expertise Section */}
        <section className="bg-white dark:bg-gray-900 py-20 lg:py-32 xl:py-40">
          <div className="mx-auto px-4 container">
            <FadeInWhenVisible>
              <div className="mx-auto mb-16 lg:mb-24 max-w-4xl text-center">
                <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                  <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                    Partnership-Focused
                  </span>
                  <span className="block text-brand-primary dark:text-brand-primary font-black">
                    Construction Management
                  </span>
                </h2>

                <p className="mb-8 font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                  Planning a new commercial building demands intricate details
                  and expert partnership oversight. Work WITH us through
                  comprehensive Partnership-Focused Construction Management
                  services throughout the Tri-Cities (Pasco, WA) area.
                </p>

                <div className="bg-brand-primary/5 dark:bg-gray-800 p-6 sm:p-8 border-brand-primary border-l-4 rounded-xl">
                  <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed text-left">
                    <strong className="text-brand-primary dark:text-brand-primary-light block mb-2">
                      Our Partnership Priority:
                    </strong>
                    Delivering an exceptional partnership experience from start
                    to finish. Our commitment to thorough communication and
                    upfront collaboration is critical to streamlining the
                    process, preventing costly on-the-fly decisions later on.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-10">
                  <Link href="/contact">
                    <Button
                      variant="primary"
                      size="lg"
                      className="transition-all duration-300 min-w-[280px]"
                    >
                      <MaterialIcon icon="phone" size="lg" className="mr-3" />
                      <span className="font-medium">Call (509) 308-6489</span>
                    </Button>
                  </Link>
                  <Link href="/booking">
                    <Button
                      variant="outline"
                      size="lg"
                      className="transition-all duration-300 min-w-[280px]"
                    >
                      <MaterialIcon icon="event" size="lg" className="mr-3" />
                      <span className="font-medium">Schedule Consultation</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Core Services Section */}
        <section
          id="core-services"
          className="bg-gray-50 dark:bg-gray-800 py-20 lg:py-32 xl:py-40"
        >
          <div className="mx-auto px-4 container">
            <FadeInWhenVisible>
              <div className="mb-16 lg:mb-24 text-center scroll-reveal">
                <div className="flex justify-center items-center mb-6">
                  <MaterialIcon
                    icon="build"
                    size="xl"
                    className="text-brand-primary dark:text-brand-primary"
                  />
                </div>
                <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                  <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                    Core Partnership
                  </span>
                  <span className="block text-brand-primary dark:text-brand-primary font-black">
                    Services
                  </span>
                </h2>
                <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                  Comprehensive partnership-focused management services designed
                  to bring your vision to life through collaboration and
                  military precision
                </p>
              </div>
            </FadeInWhenVisible>

            <StaggeredFadeIn className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mx-auto max-w-7xl">
              {coreServices.map((service, index) => (
                <ServiceCard key={index} service={service} index={index} />
              ))}
            </StaggeredFadeIn>
          </div>
        </section>

        {/* Specialty Services Section */}
        <section className="bg-white dark:bg-gray-900 py-20 lg:py-32 xl:py-40">
          <div className="mx-auto px-4 container">
            <FadeInWhenVisible>
              <div className="mb-16 lg:mb-24 text-center scroll-reveal">
                <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                  <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                    Specialized Partnership
                  </span>
                  <span className="block text-brand-primary dark:text-brand-primary font-black">
                    Solutions
                  </span>
                </h2>
                <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                  Diverse collaborative construction expertise across the
                  Tri-Cities and Pacific Northwest region
                </p>
              </div>
            </FadeInWhenVisible>

            <StaggeredFadeIn className="gap-6 lg:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl">
              {specialtyServices.map((service, index) => (
                <SpecialtyServiceCard
                  key={index}
                  service={service}
                  index={index}
                />
              ))}
            </StaggeredFadeIn>
          </div>
        </section>

        {/* Service Areas Section */}
        <section className="bg-gradient-to-r from-brand-primary dark:from-brand-primary-dark to-brand-accent dark:to-gray-800 py-20 lg:py-32 xl:py-40 text-white">
          <div className="mx-auto px-4 container">
            <FadeInWhenVisible>
              <div className="mb-16 lg:mb-24 text-center">
                <h2 className="mb-8 pb-2 font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                  <span className="block mb-4 font-semibold text-white/80 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                    Areas We
                  </span>
                  <span className="block text-white font-black">Serve</span>
                </h2>
              </div>
            </FadeInWhenVisible>

            <StaggeredFadeIn className="gap-8 grid grid-cols-1 md:grid-cols-2 mx-auto max-w-4xl">
              {serviceAreas.map((area, index) => (
                <Card
                  key={index}
                  className="bg-white/10 dark:bg-gray-900/30 backdrop-blur-sm border-white/30 p-8"
                >
                  <div className="flex items-center mb-6">
                    <MaterialIcon
                      icon={area.iconName}
                      size="2xl"
                      className="text-white mr-4"
                    />
                    <h3 className="text-white text-2xl font-bold">
                      {area.title}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {area.areas.map((location, lIndex) => (
                      <li key={lIndex} className="flex items-center">
                        <MaterialIcon
                          icon="check_circle"
                          size="md"
                          className="text-brand-secondary mr-3"
                        />
                        <span className="text-white/90 text-lg">
                          {location}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </StaggeredFadeIn>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        {/* Portfolio Section - Simplified */}
        <section className="bg-white dark:bg-gray-900 py-20 lg:py-32 xl:py-40">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <FadeInWhenVisible className="mb-16 lg:mb-24 text-center scroll-reveal">
              <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                  Our Construction
                </span>
                <span className="block text-brand-primary dark:text-brand-primary font-black">
                  Portfolio
                </span>
              </h2>
              <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                Explore our completed projects showcasing quality craftsmanship
                across commercial, residential, and government sectors
              </p>
            </FadeInWhenVisible>

            <FadeInWhenVisible className="text-center">
              <Link href="/projects">
                <Button
                  variant="primary"
                  size="lg"
                  className="shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <MaterialIcon icon="visibility" className="mr-2" size="md" />
                  View Complete Portfolio
                </Button>
              </Link>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                <MaterialIcon icon="info" size="sm" className="inline mr-2" />
                Detailed portfolio with High-Level CRM integration coming soon
              </p>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* CTA Section */}
        <ServicesCTA />
      </div>
    </>
  );
}
