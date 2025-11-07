"use client";

import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";

// Quick contact info with proper accessibility
const quickContact = [
  {
    icon: "phone",
    label: "Call Us",
    value: "(509) 308-6489",
    link: "tel:+15093086489",
    color: "brand-primary",
    ariaLabel: "Call MH Construction at 509-308-6489",
  },
  {
    icon: "email",
    label: "Email Us",
    value: "office@mhc-gc.com",
    link: "mailto:office@mhc-gc.com",
    color: "brand-primary",
    ariaLabel: "Send email to MH Construction",
  },
  {
    icon: "location_on",
    label: "Visit Us",
    value: "3111 N. Capital Ave., Pasco, WA 99301",
    link: "https://maps.google.com/?q=3111+N+Capital+Ave+Pasco+WA+99301",
    color: "brand-primary",
    ariaLabel: "Get directions to MH Construction office in Pasco, WA",
  },
];

// Main CTAs - Strategic navigation to important pages/sections
const mainCTAs = [
  {
    icon: "calculate",
    label: "Get AI Estimate",
    description: "Instant project budgeting",
    link: "/estimator",
    variant: "secondary" as const,
    ariaLabel:
      "Navigate to AI estimate calculator for instant project budgeting",
  },
  {
    icon: "calendar_month",
    label: "Book Consultation",
    description: "Expert in-person review",
    link: "/booking",
    variant: "primary" as const,
    ariaLabel: "Book a consultation with MH Construction experts",
  },
  {
    icon: "construction",
    label: "Explore Our Solutions",
    description: "What we build together",
    link: "/services",
    variant: "primary" as const,
    ariaLabel: "Explore construction services and solutions",
  },
  {
    icon: "photo_library",
    label: "View Our Work",
    description: "See our partnerships",
    link: "/projects",
    variant: "primary" as const,
    ariaLabel: "View completed projects and partnerships",
  },
  {
    icon: "work",
    label: "Join Our Team",
    description: "Career opportunities",
    link: "/careers",
    variant: "secondary" as const,
    ariaLabel: "Explore career opportunities at MH Construction",
  },
  {
    icon: "groups",
    label: "Meet the Team",
    description: "Your partnership team",
    link: "/team",
    variant: "primary" as const,
    ariaLabel: "Meet the MH Construction partnership team",
  },
];

export default function ContactPageClient() {
  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: "MH Construction",
    description:
      "Expert concrete, carpentry, and general contracting services in Pasco, WA and the Pacific Northwest",
    url: "https://www.mhc-gc.com",
    telephone: "+1-509-308-6489",
    email: "office@mhc-gc.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "3111 N. Capital Ave.",
      addressLocality: "Pasco",
      addressRegion: "WA",
      postalCode: "99301",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "46.2589",
      longitude: "-119.1297",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
    areaServed: {
      "@type": "State",
      name: "Washington",
    },
    slogan: "Building for the Owner, NOT the Dollar",
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="bg-white dark:bg-gray-900 min-h-screen">
        {/* Skip to main content - Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 bg-brand-primary text-white px-4 py-2 rounded-lg font-semibold"
        >
          Skip to main content
        </a>

        {/* Hero Section */}
        <section
          className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 h-screen flex items-center justify-center text-white overflow-hidden"
          aria-labelledby="hero-heading"
        >
          {/* Background Elements */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"
            aria-hidden="true"
          ></div>

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-24 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20 lg:pb-28">
            <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
              {/* Main Title */}
              <h1
                id="hero-heading"
                className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight"
              >
                <span className="block text-brand-secondary font-black drop-shadow-lg">
                  Let's Build Your Vision Together
                </span>
              </h1>

              {/* Subtitle */}
              <p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug px-2">
                Your Partnership Team is Ready to Connect • Pacific Northwest
              </p>

              {/* Description */}
              <p className="max-w-4xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed px-4">
                "THE ROI IS THE RELATIONSHIP" — Reach out for transparent
                communication and collaborative problem-solving from your
                veteran-owned construction partner. Monday - Friday: 8:00 AM -
                5:00 PM PST
              </p>
            </div>
          </div>

          {/* Page Navigation */}
          <PageNavigation
            items={navigationConfigs.contact}
            className="absolute bottom-0 left-0 right-0"
          />
        </section>

        {/* Quick Contact Section */}
        <section
          id="main-content"
          className="relative py-20 lg:py-32 xl:py-40 bg-white dark:bg-gray-900"
          aria-labelledby="quick-contact-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible>
              <div className="mb-16 lg:mb-24 text-center">
                <h2
                  id="quick-contact-heading"
                  className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter"
                >
                  <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                    Connect With
                  </span>
                  <span className="block text-brand-primary dark:text-brand-primary font-black">
                    Your Partnership Team
                  </span>
                </h2>
                <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                  Multiple ways to start your construction partnership with over
                  150 years combined team experience serving the Pacific
                  Northwest
                </p>
              </div>

              {/* Contact Cards Grid */}
              <div className="gap-6 lg:gap-8 grid grid-cols-1 md:grid-cols-3 mb-16">
                {quickContact.map((contact, index) => (
                  <a
                    key={index}
                    href={contact.link}
                    target={
                      contact.icon === "location_on" ? "_blank" : undefined
                    }
                    rel={
                      contact.icon === "location_on"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    aria-label={contact.ariaLabel}
                    className="group bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-brand-primary dark:hover:border-brand-primary p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-primary/50"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div
                        className="bg-brand-primary/10 dark:bg-brand-primary/20 mb-6 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300"
                        aria-hidden="true"
                      >
                        <MaterialIcon
                          icon={contact.icon}
                          size="3xl"
                          className="text-brand-primary"
                        />
                      </div>
                      <h3 className="mb-3 font-bold text-gray-900 dark:text-white text-xl sm:text-2xl">
                        {contact.label}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                        {contact.value}
                      </p>
                      <div
                        className="flex items-center gap-2 mt-4 text-brand-primary group-hover:gap-3 transition-all duration-300"
                        aria-hidden="true"
                      >
                        <span className="font-medium text-sm">
                          {contact.icon === "phone"
                            ? "Call Now"
                            : contact.icon === "email"
                              ? "Send Email"
                              : "Get Directions"}
                        </span>
                        <MaterialIcon
                          icon="arrow_forward"
                          size="sm"
                          className="group-hover:translate-x-1 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Two Pathways to Partnership - Trade Partners vs Clients */}
        <section
          className="relative py-20 lg:py-32 xl:py-40 bg-gray-50 dark:bg-gray-800"
          aria-labelledby="partnership-pathways-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible>
              <div className="mb-16 lg:mb-24 text-center">
                <h2
                  id="partnership-pathways-heading"
                  className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter"
                >
                  <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                    Two Pathways to
                  </span>
                  <span className="block text-brand-primary dark:text-brand-primary font-black">
                    Partnership Success
                  </span>
                </h2>
                <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                  Whether you're a project owner or a trade professional, we
                  have a pathway designed for you
                </p>
              </div>

              {/* Two-Column Grid for Pathways */}
              <div className="gap-8 lg:gap-12 grid grid-cols-1 lg:grid-cols-2">
                {/* Client Services Pathway */}
                <div className="bg-white dark:bg-gray-900 border-4 border-brand-primary p-8 lg:p-10 rounded-3xl shadow-2xl hover:shadow-brand-primary/20 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-brand-primary/10 dark:bg-brand-primary/20 p-4 rounded-2xl">
                      <MaterialIcon
                        icon="people"
                        size="3xl"
                        className="text-brand-primary"
                      />
                    </div>
                    <h3 className="font-black text-gray-900 dark:text-white text-2xl sm:text-3xl md:text-4xl">
                      For Project Clients
                    </h3>
                  </div>

                  <p className="mb-6 text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                    Ready to begin your construction partnership? We're here to
                    listen, collaborate, and bring your vision to life through
                    professional construction management.
                  </p>

                  {/* Client Contact Info */}
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 border-l-4 border-brand-primary rounded-xl mb-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <MaterialIcon
                          icon="phone"
                          size="lg"
                          className="text-brand-primary flex-shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">
                            Client Services
                          </p>
                          <a
                            href="tel:+15093086489,100"
                            className="text-brand-primary hover:text-brand-accent text-lg font-bold transition-colors"
                            aria-label="Call client services at 509-308-6489 extension 100"
                          >
                            (509) 308-6489 ext. 100
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MaterialIcon
                          icon="email"
                          size="lg"
                          className="text-brand-primary flex-shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">
                            Email
                          </p>
                          <a
                            href="mailto:office@mhc-gc.com?subject=Project%20Inquiry"
                            className="text-brand-primary hover:text-brand-accent text-lg font-bold transition-colors"
                            aria-label="Email office@mhc-gc.com for project inquiries"
                          >
                            office@mhc-gc.com
                          </a>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-gray-600 dark:text-gray-400 text-sm italic">
                          For: Free estimates, consultations, and project
                          discussions
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Client CTAs */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-4">
                      Get Started:
                    </h4>
                    <Link
                      href="/booking"
                      className="flex items-center justify-between bg-brand-primary hover:bg-brand-accent text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg group"
                    >
                      <div className="flex items-center gap-3">
                        <MaterialIcon icon="event" size="lg" />
                        <span>Schedule Free Consultation</span>
                      </div>
                      <MaterialIcon
                        icon="arrow_forward"
                        size="md"
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                    <Link
                      href="/estimator"
                      className="flex items-center justify-between bg-white dark:bg-gray-700 border-2 border-brand-primary text-brand-primary dark:text-brand-secondary hover:bg-brand-primary hover:text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg group"
                    >
                      <div className="flex items-center gap-3">
                        <MaterialIcon icon="calculate" size="lg" />
                        <span>Get Instant AI Estimate</span>
                      </div>
                      <MaterialIcon
                        icon="arrow_forward"
                        size="md"
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </div>
                </div>

                {/* Trade Partners Pathway */}
                <div className="bg-white dark:bg-gray-900 border-4 border-brand-secondary p-8 lg:p-10 rounded-3xl shadow-2xl hover:shadow-brand-secondary/20 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-brand-secondary/10 dark:bg-brand-secondary/20 p-4 rounded-2xl">
                      <MaterialIcon
                        icon="construction"
                        size="3xl"
                        className="text-brand-secondary"
                      />
                    </div>
                    <h3 className="font-black text-gray-900 dark:text-white text-2xl sm:text-3xl md:text-4xl">
                      For Trade Partners
                    </h3>
                  </div>

                  <p className="mb-6 text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                    Looking to grow your business with a veteran-owned
                    construction leader? Join our network of quality
                    professionals serving the Pacific Northwest market.
                  </p>

                  {/* Trade Partner Contact Info */}
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 border-l-4 border-brand-secondary rounded-xl mb-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <MaterialIcon
                          icon="phone"
                          size="lg"
                          className="text-brand-secondary flex-shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">
                            Trade Partner Inquiries
                          </p>
                          <a
                            href="tel:+15093086489,150"
                            className="text-brand-secondary hover:text-brand-accent text-lg font-bold transition-colors"
                            aria-label="Call trade partner inquiries at 509-308-6489 extension 150"
                          >
                            (509) 308-6489 ext. 150
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MaterialIcon
                          icon="email"
                          size="lg"
                          className="text-brand-secondary flex-shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">
                            Email
                          </p>
                          <a
                            href="mailto:office@mhc-gc.com?subject=Trade%20Partnership%20Inquiry"
                            className="text-brand-secondary hover:text-brand-accent text-lg font-bold transition-colors"
                            aria-label="Email office@mhc-gc.com for trade partnership inquiries"
                          >
                            office@mhc-gc.com
                          </a>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-gray-600 dark:text-gray-400 text-sm italic">
                          For: Vendor applications, trade partnerships, and
                          business opportunities
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Trade Partner CTAs */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-4">
                      Join Our Network:
                    </h4>
                    <Link
                      href="/trade-partners"
                      className="flex items-center justify-between bg-brand-secondary hover:bg-bronze-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg group"
                    >
                      <div className="flex items-center gap-3">
                        <MaterialIcon icon="check_circle" size="lg" />
                        <span>Apply as Approved Vendor</span>
                      </div>
                      <MaterialIcon
                        icon="arrow_forward"
                        size="md"
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                    <Link
                      href="/trade-partners#benefits"
                      className="flex items-center justify-between bg-white dark:bg-gray-700 border-2 border-brand-secondary text-brand-secondary hover:bg-brand-secondary hover:text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg group"
                    >
                      <div className="flex items-center gap-3">
                        <MaterialIcon icon="handshake" size="lg" />
                        <span>View Partnership Benefits</span>
                      </div>
                      <MaterialIcon
                        icon="arrow_forward"
                        size="md"
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Interactive Map Section */}
        <section
          className="relative py-20 lg:py-32 xl:py-40 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900"
          aria-labelledby="office-location-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible>
              <div className="mb-16 lg:mb-24 text-center">
                <h2
                  id="office-location-heading"
                  className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter"
                >
                  <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                    Visit Our
                  </span>
                  <span className="block text-brand-primary dark:text-brand-primary font-black">
                    Office Location
                  </span>
                </h2>
                <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                  <span itemProp="address">
                    3111 N. Capital Ave., Pasco, WA 99301
                  </span>
                </p>
                <p className="mt-4 text-gray-500 dark:text-gray-400 text-base sm:text-lg">
                  Serving the Tri-Cities and Pacific Northwest
                </p>
              </div>

              {/* Interactive Map - Google Maps Embed */}
              <div
                className="relative mb-12 rounded-2xl shadow-2xl overflow-hidden border-4 border-brand-primary/20"
                style={{ height: "600px" }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2732.8282!2d-119.1297!3d46.2589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54983e0a7f5b5555%3A0x0!2s3111%20N%20Capital%20Ave%2C%20Pasco%2C%20WA%2099301!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="MH Construction Office Location - 3111 N. Capital Ave., Pasco, WA 99301"
                  className="absolute inset-0"
                ></iframe>
              </div>

              {/* Map CTA */}
              <div className="text-center">
                <a
                  href="https://maps.google.com/?q=3111+N+Capital+Ave+Pasco+WA+99301"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get directions to MH Construction office in Pasco, Washington"
                  className="inline-flex items-center gap-3 bg-white dark:bg-gray-800 border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-brand-primary/50"
                >
                  <MaterialIcon icon="directions" size="lg" />
                  Get Directions
                </a>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Strategic CTAs Section */}
        <section
          className="relative py-20 lg:py-32 xl:py-40 bg-white dark:bg-gray-900"
          aria-labelledby="partnership-options-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible>
              <div className="mb-16 lg:mb-24 text-center">
                <h2
                  id="partnership-options-heading"
                  className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter"
                >
                  <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                    Explore Your
                  </span>
                  <span className="block text-brand-primary dark:text-brand-primary font-black">
                    Partnership Options
                  </span>
                </h2>
                <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                  Discover how we can build together
                </p>
              </div>

              {/* CTA Grid - Following MH Standards for 6 cards */}
              <StaggeredFadeIn className="gap-6 lg:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 max-w-6xl mx-auto">
                {mainCTAs.map((cta, index) => (
                  <Link
                    key={index}
                    href={cta.link}
                    aria-label={cta.ariaLabel}
                    className="group bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-brand-primary dark:hover:border-brand-primary p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-primary/50"
                  >
                    {/* Icon Container */}
                    <div className="flex justify-center mb-6">
                      <div
                        className={`${
                          cta.variant === "primary"
                            ? "bg-brand-primary/10 dark:bg-brand-primary/20"
                            : "bg-brand-secondary/10 dark:bg-brand-secondary/20"
                        } p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300`}
                        aria-hidden="true"
                      >
                        <MaterialIcon
                          icon={cta.icon}
                          size="3xl"
                          className={
                            cta.variant === "primary"
                              ? "text-brand-primary"
                              : "text-brand-secondary"
                          }
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className="mb-3 font-bold text-gray-900 dark:text-white text-xl sm:text-2xl">
                        {cta.label}
                      </h3>
                      <p className="mb-6 text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                        {cta.description}
                      </p>
                      <div
                        className={`flex justify-center items-center gap-2 ${
                          cta.variant === "primary"
                            ? "text-brand-primary"
                            : "text-brand-secondary"
                        } group-hover:gap-3 transition-all duration-300`}
                        aria-hidden="true"
                      >
                        <span className="font-semibold text-sm">
                          Learn More
                        </span>
                        <MaterialIcon
                          icon="arrow_forward"
                          size="sm"
                          className="group-hover:translate-x-1 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </StaggeredFadeIn>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Urgent Support Banner */}
        <section
          id="urgent-support"
          className="bg-gradient-to-r from-orange-600 to-orange-700 dark:from-orange-700 dark:to-orange-800 py-16"
          aria-labelledby="urgent-support-heading"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible>
              <div className="text-center text-white">
                <div className="flex justify-center mb-6">
                  <div
                    className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl"
                    aria-hidden="true"
                  >
                    <MaterialIcon
                      icon="engineering"
                      size="4xl"
                      className="text-yellow-300"
                    />
                  </div>
                </div>
                <h2
                  id="urgent-support-heading"
                  className="mb-4 font-bold text-3xl sm:text-4xl md:text-5xl"
                >
                  Need Urgent Construction Support?
                </h2>
                <p className="mb-8 text-white/90 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
                  When companies face critical structural challenges, MH
                  Construction provides expert consultation, specialized
                  manpower, and equipment to resolve urgent construction issues.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <a
                    href="tel:+15093086489"
                    aria-label="Call MH Construction urgently at 509-308-6489"
                    className="inline-flex items-center gap-3 bg-white hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-orange-700 transition-all duration-200 hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-white/50"
                  >
                    <MaterialIcon icon="phone" size="lg" />
                    Urgent: (509) 308-6489
                  </a>
                  <a
                    href="mailto:office@mhc-gc.com?subject=Urgent%20Construction%20Support"
                    aria-label="Email urgent construction support request to MH Construction"
                    className="inline-flex items-center gap-3 bg-orange-800 hover:bg-orange-900 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-orange-900/50"
                  >
                    <MaterialIcon icon="email" size="lg" />
                    Email Support Request
                  </a>
                </div>
                <p className="mt-6 text-white/70 text-sm">
                  Available Monday - Friday: 8:00 AM - 5:00 PM PST
                </p>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>
      </div>
    </>
  );
}
