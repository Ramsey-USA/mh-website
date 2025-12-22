"use client";

import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { gridPresets } from "@/lib/styles/layout-variants";
import { UnderConstruction } from "@/components/layout/UnderConstruction";

// Feature flag - set to false to show full page content
const SHOW_UNDER_CONSTRUCTION = false;

// Quick contact info with proper accessibility
const quickContact = [
  {
    icon: "call",
    label: "Call Us",
    value: "(509) 308-6489",
    link: "tel:+15093086489",
    color: "brand-primary",
    ariaLabel: "Call MH Construction at 509-308-6489",
  },
  {
    icon: "mark_email_read",
    label: "Email Us",
    value: "office@mhc-gc.com",
    link: "mailto:office@mhc-gc.com",
    color: "brand-primary",
    ariaLabel: "Send email to MH Construction",
  },
  {
    icon: "place",
    label: "Visit Us",
    value: "3111 N. Capitol Ave., Pasco, WA 99301",
    link: "https://maps.google.com/?q=3111+N+Capitol+Ave+Pasco+WA+99301",
    color: "brand-primary",
    ariaLabel: "Get directions to MH Construction office in Pasco, WA",
  },
];

// Main CTAs - Strategic navigation with consultation prioritized
const mainCTAs = [
  {
    icon: "map",
    label: "The Battle Plan",
    description: "What we build together",
    link: "/services",
    variant: "primary" as const,
    ariaLabel: "Explore construction services and solutions",
  },
  {
    icon: "emoji_events",
    label: "Victories",
    description: "See completed projects",
    link: "/projects",
    variant: "primary" as const,
    ariaLabel: "View completed projects and partnerships",
  },
  {
    icon: "diversity_3",
    label: "Team Six",
    description: "Your partnership team",
    link: "/team",
    variant: "primary" as const,
    ariaLabel: "Meet the MH Construction partnership team",
  },
  {
    icon: "military_tech",
    label: "Occupation Specialties",
    description: "Career opportunities",
    link: "/careers",
    variant: "secondary" as const,
    ariaLabel: "Explore career opportunities at MH Construction",
  },
];

export default function ContactPageClient() {
  // Show under construction notice while preserving all content below
  if (SHOW_UNDER_CONSTRUCTION) {
    return (
      <UnderConstruction
        pageName="Contact"
        description="We're optimizing our contact page for the best user experience. In the meantime, you can reach us directly using the contact information below."
        estimatedCompletion="December 2025"
      />
    );
  }

  // Original page content preserved below - will be shown when flag is set to false
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
      streetAddress: "3111 N. Capitol Ave.",
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
      opens: "07:00",
      closes: "16:00",
    },
    areaServed: {
      "@type": "State",
      name: "Washington",
    },
    slogan: "Building projects for the client, NOT the dollar",
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
          className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 h-screen flex items-end justify-end text-white overflow-hidden"
          aria-labelledby="hero-heading"
        >
          {/* Background Elements */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"
            aria-hidden="true"
          ></div>

          {/* Content - Bottom Right */}
          <div className="relative z-30 mb-32 sm:mb-36 md:mb-40 lg:mb-44 mr-4 sm:mr-6 lg:mr-8 xl:mr-12 ml-auto max-w-2xl pointer-events-none pb-2">
            <div className="space-y-2 sm:space-y-3 md:space-y-4 text-right">
              {/* Main Title */}
              <h1
                id="hero-heading"
                className="text-right text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white drop-shadow-2xl leading-relaxed"
              >
                <span className="block text-brand-secondary text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-1">
                  Rally Point → Contact
                </span>
                <span className="block text-brand-secondary">
                  Introductions: Where Partnerships Begin
                </span>
                <span className="block text-brand-primary">
                  Let's Talk Face-to-Face, The Old-School Way
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-right text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug font-medium">
                Where Handshakes Still Matter • Traditional Values • Modern
                World
              </p>

              {/* Description */}
              <p className="text-right text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed">
                Real conversations with real people—the way business should be
                done. We believe in personal connection, honest handshakes, and
                keeping our word. Building projects for the client,{" "}
                <span className="font-black italic text-bronze-300">NOT</span>{" "}
                the dollar. That's not just our slogan, it's how we've done
                business since 2010. Call us, stop by, or send a message. Monday
                - Friday: 7:00 AM - 4:00 PM PST
              </p>
            </div>
          </div>

          {/* Page Navigation */}
          <PageNavigation
            items={navigationConfigs.contact}
            className="absolute bottom-0 left-0 right-0"
          />
        </section>

        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Introductions" }]}
        />

        {/* Quick Contact Section */}
        <section
          id="main-content"
          className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
          aria-labelledby="quick-contact-heading"
        >
          {/* Diagonal Stripe Background Pattern - MH Branding Standard */}
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

          {/* Large Brand Color Blobs - MH Branding Standard */}
          <div className="absolute top-20 right-[15%] w-96 h-96 bg-gradient-to-br from-brand-primary/10 to-transparent dark:from-brand-primary/20 blur-3xl rounded-full"></div>
          <div className="absolute bottom-20 left-[15%] w-96 h-96 bg-gradient-to-tr from-brand-secondary/10 to-transparent dark:from-brand-secondary/20 blur-3xl rounded-full"></div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible>
              {/* Section Header - Military Construction Standard */}
              <div className="mb-16 sm:mb-20 text-center">
                {/* Icon with decorative lines */}
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                      <MaterialIcon
                        icon="forum"
                        size="2xl"
                        className="text-white drop-shadow-lg"
                      />
                    </div>
                  </div>
                  <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                </div>

                {/* Two-line gradient heading */}
                <h2
                  id="quick-contact-heading"
                  className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible"
                >
                  <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                    Connect With
                  </span>
                  <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    Your Partnership Team
                  </span>
                </h2>

                {/* Description */}
                <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  Every great partnership begins with an{" "}
                  <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                    honest conversation
                  </span>
                  . Pick up the phone, send an email, or stop by our office in
                  Pasco—we do business the old-fashioned way. Over{" "}
                  <span className="font-bold text-gray-900 dark:text-white">
                    150 years combined experience
                  </span>
                  , and we still believe in looking people in the eye and
                  shaking hands.
                </p>
              </div>

              {/* Contact Cards Grid */}
              <div className="gap-6 lg:gap-8 grid grid-cols-1 md:grid-cols-3 mb-16">
                {quickContact.map((contact, _index) => (
                  <a
                    key={_index}
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

        {/* Two Pathways - Allies vs Clients */}
        <section
          className="relative py-20 lg:py-32 xl:py-40 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden"
          aria-labelledby="partnership-pathways-heading"
        >
          {/* Enhanced Background Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(189,146,100,0.08)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(189,146,100,0.15)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(56,104,81,0.06)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_bottom_right,rgba(56,104,81,0.12)_0%,transparent_50%)]"></div>
          <div className="top-20 left-10 absolute bg-brand-secondary/10 dark:bg-brand-secondary/20 blur-3xl rounded-full w-32 h-32 animate-pulse"></div>
          <div
            className="right-10 bottom-20 absolute bg-brand-primary/10 dark:bg-brand-primary/20 blur-3xl rounded-full w-40 h-40 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="top-1/2 right-1/4 absolute bg-brand-primary/5 dark:bg-brand-primary/10 blur-3xl rounded-full w-24 h-24 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible>
              <div className="mb-16 lg:mb-24 text-center">
                <h2
                  id="partnership-pathways-heading"
                  className="mb-8 pb-2 font-black text-gray-900 dark:text-gray-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter"
                >
                  <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                    Two Pathways to
                  </span>
                  <span className="block text-brand-primary dark:text-brand-primary-light font-black drop-shadow-sm">
                    Partnership Success
                  </span>
                </h2>
                <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-4 break-words">
                  Whether you're a client or an Ally, we have a pathway designed
                  for you
                </p>
              </div>

              {/* Two-Column Grid for Pathways */}
              <div className={gridPresets.twoColumn("xl")}>
                {/* Client Services Pathway */}
                <div className="bg-white dark:bg-gray-900 border-4 border-brand-primary p-8 lg:p-10 rounded-3xl shadow-2xl hover:shadow-brand-primary/20 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-brand-primary/10 dark:bg-brand-primary/20 p-4 rounded-2xl">
                      <MaterialIcon
                        icon="diversity_3"
                        size="3xl"
                        theme="military"
                        ariaLabel="Client Partnership"
                        className="text-brand-primary"
                      />
                    </div>
                    <h3 className="font-black text-gray-900 dark:text-white text-2xl sm:text-3xl md:text-4xl">
                      For Clients
                    </h3>
                  </div>

                  <p className="mb-6 text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                    Ready to begin your construction project? We're here to
                    listen, collaborate, and bring your vision to life through
                    professional construction management.
                  </p>

                  {/* Client Contact Info */}
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 border-l-4 border-brand-primary rounded-xl mb-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <MaterialIcon
                          icon="call"
                          size="lg"
                          theme="military"
                          ariaLabel="Client Services Phone"
                          className="text-brand-primary flex-shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">
                            Client Services
                          </p>
                          <a
                            href="tel:+15093086489"
                            className="text-brand-primary hover:text-brand-secondary text-lg font-bold transition-colors"
                            aria-label="Call Client services at 509-308-6489"
                          >
                            (509) 308-6489
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MaterialIcon
                          icon="mark_email_read"
                          size="lg"
                          theme="military"
                          ariaLabel="Client Services Email"
                          className="text-brand-primary flex-shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">
                            Email
                          </p>
                          <a
                            href="mailto:office@mhc-gc.com?subject=Project%20Inquiry"
                            className="text-brand-primary hover:text-brand-secondary text-lg font-bold transition-colors"
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

                  {/* Client Partner CTAs */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-4">
                      Get Started:
                    </h4>
                    <Link
                      href="/contact"
                      className="flex items-center justify-between bg-brand-primary hover:bg-brand-secondary text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg group"
                    >
                      <div className="flex items-center gap-3">
                        <MaterialIcon
                          icon="call"
                          size="lg"
                          theme="military"
                          ariaLabel="Contact Us"
                        />
                        <span>Contact Us Today</span>
                      </div>
                      <MaterialIcon
                        icon="arrow_forward"
                        size="md"
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                    <Link
                      href="/services"
                      className="flex items-center justify-between bg-white dark:bg-gray-700 border-2 border-brand-primary text-brand-primary dark:text-brand-secondary hover:bg-brand-primary hover:text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg group"
                    >
                      <div className="flex items-center gap-3">
                        <MaterialIcon
                          icon="map"
                          size="lg"
                          theme="military"
                          ariaLabel="Services"
                        />
                        <span>Explore Services</span>
                      </div>
                      <MaterialIcon
                        icon="arrow_forward"
                        size="md"
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </div>
                </div>

                {/* Allies Pathway */}
                <div className="bg-white dark:bg-gray-900 border-4 border-brand-secondary p-8 lg:p-10 rounded-3xl shadow-2xl hover:shadow-brand-secondary/20 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-brand-secondary/10 dark:bg-brand-secondary/20 p-4 rounded-2xl">
                      <MaterialIcon
                        icon="handshake"
                        size="3xl"
                        theme="veteran"
                        ariaLabel="Ally Partnership"
                        className="text-brand-secondary"
                      />
                    </div>
                    <h3 className="font-black text-gray-900 dark:text-white text-2xl sm:text-3xl md:text-4xl">
                      For Allies
                    </h3>
                  </div>

                  <p className="mb-6 text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                    Looking to grow your business with a veteran-owned
                    construction leader? Join our network of quality
                    professionals serving the Pacific Northwest market.
                  </p>

                  {/* Ally Contact Info */}
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 border-l-4 border-brand-secondary rounded-xl mb-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <MaterialIcon
                          icon="call"
                          size="lg"
                          theme="veteran"
                          ariaLabel="Ally Inquiries Phone"
                          className="text-brand-secondary flex-shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">
                            Ally Inquiries
                          </p>
                          <a
                            href="tel:+15093086489"
                            className="text-brand-secondary hover:text-bronze-600 text-lg font-bold transition-colors"
                            aria-label="Call Ally inquiries at 509-308-6489"
                          >
                            (509) 308-6489
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MaterialIcon
                          icon="mark_email_read"
                          size="lg"
                          theme="veteran"
                          ariaLabel="Ally Inquiries Email"
                          className="text-brand-secondary flex-shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">
                            Email
                          </p>
                          <a
                            href="mailto:office@mhc-gc.com?subject=Ally%20Inquiry"
                            className="text-brand-secondary hover:text-bronze-600 text-lg font-bold transition-colors"
                            aria-label="Email office@mhc-gc.com for Ally inquiries"
                          >
                            office@mhc-gc.com
                          </a>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-gray-600 dark:text-gray-400 text-sm italic">
                          For: Vendor applications, Ally relationships, and
                          business opportunities
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Ally CTAs */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-4">
                      Join Our Network:
                    </h4>
                    <Link
                      href="/allies"
                      className="flex items-center justify-between bg-brand-secondary hover:bg-bronze-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg group"
                    >
                      <div className="flex items-center gap-3">
                        <MaterialIcon
                          icon="verified_user"
                          size="lg"
                          theme="veteran"
                          ariaLabel="Approved Vendor"
                        />
                        <span>Apply as Approved Vendor</span>
                      </div>
                      <MaterialIcon
                        icon="arrow_forward"
                        size="md"
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                    <Link
                      href="/allies#benefits"
                      className="flex items-center justify-between bg-white dark:bg-gray-700 border-2 border-brand-secondary text-brand-secondary hover:bg-brand-secondary hover:text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg group"
                    >
                      <div className="flex items-center gap-3">
                        <MaterialIcon
                          icon="handshake"
                          size="lg"
                          theme="veteran"
                          ariaLabel="Ally Benefits"
                        />
                        <span>View Ally Benefits</span>
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
          className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
          aria-labelledby="office-location-heading"
        >
          {/* Diagonal Stripe Background Pattern - MH Branding Standard */}
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

          {/* Large Brand Color Blobs - MH Branding Standard */}
          <div className="absolute top-20 right-[15%] w-96 h-96 bg-gradient-to-br from-brand-primary/10 to-transparent dark:from-brand-primary/20 blur-3xl rounded-full"></div>
          <div className="absolute bottom-20 left-[15%] w-96 h-96 bg-gradient-to-tr from-brand-secondary/10 to-transparent dark:from-brand-secondary/20 blur-3xl rounded-full"></div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible>
              {/* Section Header - Military Construction Standard */}
              <div className="mb-16 sm:mb-20 text-center">
                {/* Icon with decorative lines */}
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                      <MaterialIcon
                        icon="location_on"
                        size="2xl"
                        className="text-white drop-shadow-lg"
                      />
                    </div>
                  </div>
                  <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                </div>

                {/* Two-line gradient heading */}
                <h2
                  id="office-location-heading"
                  className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible"
                >
                  <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                    Visit Our
                  </span>
                  <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    Office Location
                  </span>
                </h2>

                {/* Description */}
                <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  <span itemProp="address">
                    3111 N. Capitol Ave., Pasco, WA 99301
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2732.828269!2d-119.1319!3d46.2589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54983e0a7f5b5555%3A0x1234567890abcdef!2s3111%20N%20Capitol%20Ave%2C%20Pasco%2C%20WA%2099301!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="MH Construction Office Location - 3111 N. Capitol Ave., Pasco, WA 99301"
                  className="absolute inset-0"
                ></iframe>
              </div>

              {/* Map CTA */}
              <div className="text-center">
                <a
                  href="https://maps.google.com/?q=3111+N+Capitol+Ave+Pasco+WA+99301"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get directions to MH Construction office in Pasco, Washington"
                  className="inline-flex items-center gap-3 bg-white dark:bg-gray-800 border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-brand-primary/50"
                >
                  <MaterialIcon
                    icon="explore"
                    size="lg"
                    theme="military"
                    ariaLabel="Get Directions"
                  />
                  Get Directions
                </a>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Strategic CTAs Section */}
        <section
          className="relative bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
          aria-labelledby="partnership-options-heading"
        >
          {/* Diagonal Stripe Background Pattern - MH Branding Standard */}
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

          {/* Large Brand Color Blobs - MH Branding Standard */}
          <div className="absolute top-20 right-[15%] w-96 h-96 bg-gradient-to-br from-brand-secondary/10 to-transparent dark:from-brand-secondary/20 blur-3xl rounded-full"></div>
          <div className="absolute bottom-20 left-[15%] w-96 h-96 bg-gradient-to-tr from-brand-primary/10 to-transparent dark:from-brand-primary/20 blur-3xl rounded-full"></div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible>
              {/* Section Header - Military Construction Standard */}
              <div className="mb-16 sm:mb-20 text-center">
                {/* Icon with decorative lines */}
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/30 to-bronze-700/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                      <MaterialIcon
                        icon="handshake"
                        size="2xl"
                        className="text-white drop-shadow-lg"
                      />
                    </div>
                  </div>
                  <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                </div>

                {/* Two-line gradient heading */}
                <h2
                  id="partnership-options-heading"
                  className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible"
                >
                  <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                    Explore Your
                  </span>
                  <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    Partnership Options
                  </span>
                </h2>

                {/* Description */}
                <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  Discover how we can{" "}
                  <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                    build together
                  </span>
                </p>
              </div>

              {/* CTA Grid - Following MH Standards for 6 cards */}
              <StaggeredFadeIn
                className={gridPresets.cards3("md", "max-w-6xl mx-auto")}
              >
                {mainCTAs.map((cta, _index) => (
                  <Link
                    key={_index}
                    href={cta.link}
                    aria-label={cta.ariaLabel}
                    className="group bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-brand-primary dark:hover:border-brand-primary p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-primary/50 h-full flex flex-col"
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
                    <div className="text-center flex flex-col flex-grow">
                      <h3 className="mb-3 font-bold text-gray-900 dark:text-white text-xl sm:text-2xl min-h-[3.5rem] flex items-center justify-center">
                        {cta.label}
                      </h3>
                      <p className="mb-6 text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed flex-grow">
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

        {/* Service Areas Section */}
        <section
          className="bg-gray-50 dark:bg-gray-800 py-16 sm:py-20"
          aria-labelledby="service-areas-heading"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible>
              <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-6 gap-3">
                  <div className="h-1 w-12 bg-gradient-to-r from-transparent to-brand-primary rounded-full"></div>
                  <MaterialIcon
                    icon="map"
                    size="xl"
                    className="text-brand-primary"
                  />
                  <div className="h-1 w-12 bg-gradient-to-l from-transparent to-brand-primary rounded-full"></div>
                </div>
                <h2
                  id="service-areas-heading"
                  className="font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl mb-4"
                >
                  Areas We Serve
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
                  Providing professional construction services throughout the
                  Pacific Northwest
                </p>
              </div>

              {/* Tri-Cities Primary */}
              <div className="bg-white dark:bg-gray-900 border-2 border-brand-primary p-6 sm:p-8 rounded-2xl shadow-lg mb-6">
                <h3 className="font-bold text-brand-primary text-xl mb-4 flex items-center gap-2">
                  <MaterialIcon icon="place" size="md" />
                  Tri-Cities Area (Primary Service Region)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Link
                    href="/locations/pasco"
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary transition-colors group"
                  >
                    <MaterialIcon
                      icon="arrow_forward"
                      size="sm"
                      className="text-brand-secondary group-hover:translate-x-1 transition-transform"
                    />
                    <span className="font-medium">Pasco, WA</span>
                  </Link>
                  <Link
                    href="/locations/kennewick"
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary transition-colors group"
                  >
                    <MaterialIcon
                      icon="arrow_forward"
                      size="sm"
                      className="text-brand-secondary group-hover:translate-x-1 transition-transform"
                    />
                    <span className="font-medium">Kennewick, WA</span>
                  </Link>
                  <Link
                    href="/locations/richland"
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary transition-colors group"
                  >
                    <MaterialIcon
                      icon="arrow_forward"
                      size="sm"
                      className="text-brand-secondary group-hover:translate-x-1 transition-transform"
                    />
                    <span className="font-medium">Richland, WA</span>
                  </Link>
                </div>
              </div>

              {/* Extended Coverage */}
              <div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 p-6 sm:p-8 rounded-2xl shadow-lg">
                <h3 className="font-bold text-gray-900 dark:text-white text-xl mb-4 flex items-center gap-2">
                  <MaterialIcon icon="travel_explore" size="md" />
                  Extended Service Coverage
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link
                    href="/locations/spokane"
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary transition-colors group"
                  >
                    <MaterialIcon
                      icon="arrow_forward"
                      size="sm"
                      className="text-brand-secondary group-hover:translate-x-1 transition-transform"
                    />
                    <span className="font-medium">Spokane, WA</span>
                  </Link>
                  <Link
                    href="/locations/yakima"
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary transition-colors group"
                  >
                    <MaterialIcon
                      icon="arrow_forward"
                      size="sm"
                      className="text-brand-secondary group-hover:translate-x-1 transition-transform"
                    />
                    <span className="font-medium">Yakima, WA</span>
                  </Link>
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <MaterialIcon
                      icon="check_circle"
                      size="sm"
                      className="text-brand-secondary"
                    />
                    <span>Washington State</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <MaterialIcon
                      icon="check_circle"
                      size="sm"
                      className="text-brand-secondary"
                    />
                    <span>Oregon (Licensed)</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <MaterialIcon
                      icon="check_circle"
                      size="sm"
                      className="text-brand-secondary"
                    />
                    <span>Idaho (Licensed)</span>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Urgent Support Banner - Redirects to Dedicated Page */}
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
                      icon="emergency"
                      size="4xl"
                      ariaLabel="Urgent Construction Support"
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
                  When General Contractors face critical structural challenges,
                  MH Construction provides expert consultation, heavy equipment
                  with certified operators, and experienced crews for immediate
                  deployment.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <Link
                    href="/urgent"
                    className="inline-flex items-center gap-3 bg-white hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-orange-700 transition-all duration-200 hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-white/50"
                  >
                    <MaterialIcon
                      icon="engineering"
                      size="lg"
                      ariaLabel="Urgent Services"
                    />
                    View Urgent Services
                  </Link>
                  <a
                    href="tel:+15093086489"
                    aria-label="Call MH Construction urgently at 509-308-6489"
                    className="inline-flex items-center gap-3 bg-orange-800 hover:bg-orange-900 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-orange-900/50"
                  >
                    <MaterialIcon
                      icon="call"
                      size="lg"
                      ariaLabel="Urgent Call"
                    />
                    Call: (509) 308-6489
                  </a>
                </div>
                <p className="mt-6 text-white/70 text-sm">
                  For General Contractors • Equipment & Operators Available •
                  Monday - Friday: 7:00 AM - 4:00 PM PST
                </p>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>
      </div>
    </>
  );
}
