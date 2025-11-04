"use client";

import React from "react";
import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";

// Quick contact info
const quickContact = [
  {
    icon: "phone",
    label: "Call Us",
    value: "(509) 308-6489",
    link: "tel:+15093086489",
    color: "brand-primary",
  },
  {
    icon: "email",
    label: "Email Us",
    value: "office@mhc-gc.com",
    link: "mailto:office@mhc-gc.com",
    color: "brand-secondary",
  },
  {
    icon: "location_on",
    label: "Visit Us",
    value: "3111 N. Capital Ave., Pasco, WA 99301",
    link: "https://maps.google.com/?q=3111+N+Capital+Ave+Pasco+WA+99301",
    color: "brand-accent",
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
  },
  {
    icon: "calendar_month",
    label: "Book Consultation",
    description: "Expert in-person review",
    link: "/booking",
    variant: "primary" as const,
  },
  {
    icon: "construction",
    label: "View Services",
    description: "What we build together",
    link: "/services",
    variant: "primary" as const,
  },
  {
    icon: "photo_library",
    label: "Our Projects",
    description: "See our partnerships",
    link: "/projects",
    variant: "primary" as const,
  },
  {
    icon: "work",
    label: "Join Our Team",
    description: "Career opportunities",
    link: "/careers",
    variant: "secondary" as const,
  },
  {
    icon: "groups",
    label: "Meet the Team",
    description: "Your partnership team",
    link: "/team",
    variant: "primary" as const,
  },
];

export default function ContactPage() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Hero Section with Veteran Badge */}
      <section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 py-20 lg:py-32 xl:py-40">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"></div>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* Veteran Badge */}
        <div className="relative z-10 flex justify-center mb-8">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 border border-white/20 rounded-full">
            <MaterialIcon
              icon="military_tech"
              size="lg"
              className="text-brand-secondary"
            />
            <span className="font-semibold text-white text-sm tracking-wide">
              VETERAN-OWNED EXCELLENCE
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mb-6 font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight tracking-tight">
            <span className="block bg-clip-text bg-gradient-to-r from-brand-secondary via-white to-brand-primary text-transparent drop-shadow-lg">
              Let's Connect
            </span>
          </h1>
          <p className="max-w-3xl mx-auto mb-12 text-white/90 text-xl sm:text-2xl md:text-3xl leading-relaxed">
            Your Partnership Team is Ready to Build Together
          </p>

          {/* Quick Contact Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
            {quickContact.map((contact, index) => (
              <a
                key={index}
                href={contact.link}
                target={contact.link.startsWith("http") ? "_blank" : undefined}
                rel={
                  contact.link.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className={`inline-flex items-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg ${
                  contact.color === "brand-primary"
                    ? "bg-gradient-to-r from-brand-primary to-brand-primary-dark hover:from-brand-primary-dark hover:to-brand-primary text-white"
                    : contact.color === "brand-secondary"
                      ? "bg-gradient-to-r from-brand-secondary to-brand-secondary-dark hover:from-brand-secondary-dark hover:to-brand-secondary text-white"
                      : "bg-gradient-to-r from-brand-accent to-brand-accent-dark hover:from-brand-accent-dark hover:to-brand-accent text-white"
                }`}
              >
                <MaterialIcon icon={contact.icon} size="md" />
                <span className="text-sm sm:text-base">{contact.label}</span>
              </a>
            ))}
          </div>

          <p className="text-white/70 text-sm">
            Monday - Friday: 8:00 AM - 5:00 PM PST
          </p>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-20 lg:py-32 xl:py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInWhenVisible>
            <div className="mb-16 lg:mb-24 text-center">
              <h2 className="mb-6 font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent">
                  Visit Our Office
                </span>
              </h2>
              <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl leading-relaxed">
                3111 N. Capital Ave., Pasco, WA 99301
              </p>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Serving the Tri-Cities and Pacific Northwest
              </p>
            </div>

            {/* Interactive Map - Google Maps Embed */}
            <div
              className="relative mb-12 rounded-2xl shadow-2xl overflow-hidden"
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
                title="MH Construction Office Location"
                className="absolute inset-0"
              ></iframe>
            </div>

            {/* Map CTA */}
            <div className="text-center">
              <a
                href="https://maps.google.com/?q=3111+N+Capital+Ave+Pasco+WA+99301"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-brand-primary hover:bg-brand-primary-dark px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-105 shadow-lg"
              >
                <MaterialIcon icon="directions" size="lg" />
                Get Directions
              </a>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Strategic CTAs Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 py-20 lg:py-32 xl:py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInWhenVisible>
            <div className="mb-16 lg:mb-24 text-center">
              <h2 className="mb-6 font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                <span className="text-gray-700 dark:text-gray-300">
                  Explore Our
                </span>{" "}
                <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent">
                  Partnership
                </span>
              </h2>
              <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl leading-relaxed">
                Discover how we can build together
              </p>
            </div>

            {/* CTA Grid */}
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {mainCTAs.map((cta, index) => (
                <Link
                  key={index}
                  href={cta.link}
                  className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 ${
                    cta.variant === "primary"
                      ? "bg-gradient-to-br from-brand-primary to-brand-primary-dark"
                      : "bg-gradient-to-br from-brand-secondary to-brand-secondary-dark"
                  }`}
                >
                  {/* Background Pattern */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  ></div>

                  {/* Content */}
                  <div className="relative z-10 p-8 text-center">
                    <div className="flex justify-center mb-6">
                      <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                        <MaterialIcon
                          icon={cta.icon}
                          size="3xl"
                          className="text-white"
                        />
                      </div>
                    </div>
                    <h3 className="mb-3 font-bold text-white text-2xl">
                      {cta.label}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {cta.description}
                    </p>
                    <div className="flex justify-center items-center gap-2 mt-6 text-white/90 group-hover:gap-4 transition-all duration-300">
                      <span className="font-semibold text-sm">Learn More</span>
                      <MaterialIcon
                        icon="arrow_forward"
                        size="sm"
                        className="group-hover:translate-x-1 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Urgent Support Banner */}
      <section
        id="urgent-support"
        className="bg-gradient-to-r from-orange-600 to-orange-700 dark:from-orange-700 dark:to-orange-800 py-16"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInWhenVisible>
            <div className="text-center text-white">
              <div className="flex justify-center mb-6">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                  <MaterialIcon
                    icon="engineering"
                    size="4xl"
                    className="text-yellow-300"
                  />
                </div>
              </div>
              <h2 className="mb-4 font-bold text-3xl sm:text-4xl md:text-5xl">
                Need Urgent Construction Support?
              </h2>
              <p className="mb-8 text-white/90 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
                When companies face critical structural challenges, MH
                Construction provides expert consultation, specialized manpower,
                and equipment to resolve urgent construction issues.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <a
                  href="tel:+15093086489"
                  className="inline-flex items-center gap-3 bg-white hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-orange-700 transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  <MaterialIcon icon="phone" size="lg" />
                  Urgent: (509) 308-6489
                </a>
                <a
                  href="mailto:office@mhc-gc.com?subject=Urgent%20Construction%20Support"
                  className="inline-flex items-center gap-3 bg-orange-800 hover:bg-orange-900 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-105 shadow-lg"
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
  );
}
