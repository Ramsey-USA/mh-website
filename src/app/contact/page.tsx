"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  PageHero,
} from "../../components/ui";
import { MaterialIcon } from "../../components/icons/MaterialIcon";
import SmartRecommendations from "../../components/recommendations/SmartRecommendations";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
  HoverScale,
} from "../../components/animations/FramerMotionComponents";
import { useGlobalChatbot } from "../../providers/GlobalChatbotProvider";

// Contact methods
const contactMethods = [
  {
    icon: "phone",
    title: "Phone",
    value: "(509) 308-6489",
    description: "Mon-Fri: 8:00 AM - 5:00 PM PST",
    link: "tel:+15093086489",
  },
  {
    icon: "email",
    title: "Email",
    value: "info@mhconstruction.com",
    description: "We'll respond within 24 hours",
    link: "mailto:info@mhconstruction.com",
  },
  {
    icon: "location_on",
    title: "Office",
    value: "3111 N. Capital Ave.",
    description: "Pasco, WA 99301",
    link: "https://maps.google.com/?q=3111+N+Capital+Ave+Pasco+WA+99301",
  },
  {
    icon: "schedule",
    title: "Business Hours",
    value: "Monday - Friday",
    description: "8:00 AM - 5:00 PM PST",
    link: null,
  },
];

// Service areas
const serviceAreas = [
  { name: "Pasco, WA", icon: "location_city" },
  { name: "Kennewick, WA", icon: "location_city" },
  { name: "Richland, WA", icon: "location_city" },
  { name: "Benton County, WA", icon: "map" },
  { name: "Franklin County, WA", icon: "map" },
  { name: "Washington State", icon: "public" },
  { name: "Oregon (Licensed)", icon: "public" },
  { name: "Idaho (Licensed)", icon: "public" },
];

// Project types
const projectTypes = [
  "Commercial Construction",
  "Residential Construction",
  "Industrial Construction",
  "Tenant Improvements",
  "Medical Facilities",
  "Religious Facilities",
  "Wineries & Vineyards",
  "Renovations",
  "Other",
];

export default function ContactPage() {
  const { setFormData: setGlobalFormData } = useGlobalChatbot();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    location: "",
    message: "",
  });

  // Sync local form data with global chatbot context
  useEffect(() => {
    setGlobalFormData(formData);
  }, [formData, setGlobalFormData]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    // In production, this would send to your backend/Firebase
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        location: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-gradient-to-b from-white dark:from-gray-900 to-gray-50 dark:to-gray-800 min-h-screen">
      <PageHero
        title="Ready to Deploy Your Project?"
        subtitle="Connect with Our Veteran-Led Team"
        description="Experience the difference military precision makes. Get in touch with our veteran-led team for a strategic consultation, detailed mission-ready estimate, and construction solutions that honor your vision throughout the Tri-Cities area."
      />

      {/* Contact Methods */}
      <section className="bg-white dark:bg-gray-900 py-16 lg:py-24">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mb-16 text-center">
              <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter">
                <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
                  Get In
                </span>
                <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                  Touch
                </span>
              </h2>
              <p className="font-light text-gray-600 dark:text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
                Multiple ways to reach our experienced construction team
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-6 grid md:grid-cols-2 lg:grid-cols-4 mx-auto mb-12 max-w-7xl">
            {contactMethods.map((method, index) => (
              <HoverScale key={index}>
                <Card className="bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 h-full transition-shadow">
                  <CardContent className="p-6 text-center">
                    <MaterialIcon
                      icon={method.icon}
                      size="3xl"
                      className="mb-4 text-brand-primary"
                    />
                    <h3 className="mb-2 font-bold text-gray-900 dark:text-white text-lg">
                      {method.title}
                    </h3>
                    {method.link ? (
                      <a
                        href={method.link}
                        target={
                          method.link.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          method.link.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="block mb-1 font-semibold text-brand-primary hover:text-brand-primary-dark hover:underline transition-colors"
                      >
                        {method.value}
                      </a>
                    ) : (
                      <p className="mb-1 font-semibold text-gray-900 dark:text-white">
                        {method.value}
                      </p>
                    )}
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {method.description}
                    </p>
                  </CardContent>
                </Card>
              </HoverScale>
            ))}
          </StaggeredFadeIn>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section
        id="contact-form"
        className="bg-gray-50 dark:bg-gray-800 py-16 lg:py-24"
      >
        <div className="mx-auto px-4 container">
          <div className="mx-auto max-w-7xl">
            <div className="gap-12 grid lg:grid-cols-2">
              {/* Contact Form */}
              <FadeInWhenVisible>
                <Card className="bg-white dark:bg-gray-900 shadow-xl dark:shadow-gray-600/50 border border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <MaterialIcon
                      icon="edit_note"
                      size="2xl"
                      className="mb-3 text-brand-primary"
                    />
                    <CardTitle className="text-gray-900 dark:text-white text-3xl">
                      Send Us a Message
                    </CardTitle>
                    <p className="text-gray-600 dark:text-gray-300">
                      Fill out the form below and we'll get back to you within
                      24 hours
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block mb-2 font-semibold text-gray-700 dark:text-gray-300 text-sm"
                        >
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="bg-white dark:bg-gray-800 px-4 py-3 border border-gray-300 dark:border-gray-600 focus:border-transparent rounded-lg focus:ring-2 focus:ring-brand-primary w-full text-gray-900 dark:text-white"
                          placeholder="John Doe"
                        />
                      </div>

                      <div className="gap-4 grid md:grid-cols-2">
                        <div>
                          <label
                            htmlFor="email"
                            className="block mb-2 font-semibold text-gray-700 dark:text-gray-300 text-sm"
                          >
                            Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="bg-white dark:bg-gray-800 px-4 py-3 border border-gray-300 dark:border-gray-600 focus:border-transparent rounded-lg focus:ring-2 focus:ring-brand-primary w-full text-gray-900 dark:text-white"
                            placeholder="john@example.com"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="phone"
                            className="block mb-2 font-semibold text-gray-700 dark:text-gray-300 text-sm"
                          >
                            Phone
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="bg-white dark:bg-gray-800 px-4 py-3 border border-gray-300 dark:border-gray-600 focus:border-transparent rounded-lg focus:ring-2 focus:ring-brand-primary w-full text-gray-900 dark:text-white"
                            placeholder="(509) 555-0123"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="projectType"
                          className="block mb-2 font-semibold text-gray-700 dark:text-gray-300 text-sm"
                        >
                          Project Type *
                        </label>
                        <select
                          id="projectType"
                          name="projectType"
                          required
                          value={formData.projectType}
                          onChange={handleChange}
                          className="bg-white dark:bg-gray-800 px-4 py-3 border border-gray-300 dark:border-gray-600 focus:border-transparent rounded-lg focus:ring-2 focus:ring-brand-primary w-full text-gray-900 dark:text-white"
                        >
                          <option value="">Select a project type...</option>
                          {projectTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="location"
                          className="block mb-2 font-semibold text-gray-700 dark:text-gray-300 text-sm"
                        >
                          Project Location
                        </label>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          className="bg-white dark:bg-gray-800 px-4 py-3 border border-gray-300 dark:border-gray-600 focus:border-transparent rounded-lg focus:ring-2 focus:ring-brand-primary w-full text-gray-900 dark:text-white"
                          placeholder="Pasco, WA"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block mb-2 font-semibold text-gray-700 dark:text-gray-300 text-sm"
                        >
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={6}
                          value={formData.message}
                          onChange={handleChange}
                          className="bg-white dark:bg-gray-800 px-4 py-3 border border-gray-300 dark:border-gray-600 focus:border-transparent rounded-lg focus:ring-2 focus:ring-brand-primary w-full text-gray-900 dark:text-white resize-none"
                          placeholder="Tell us about your project..."
                        />
                      </div>

                      {submitStatus === "success" && (
                        <div className="flex items-start bg-brand-accent/10 dark:bg-brand-accent/20 p-4 border border-brand-accent/30 dark:border-brand-accent/40 rounded-lg">
                          <MaterialIcon
                            icon="check_circle"
                            className="mt-0.5 mr-3 text-brand-accent"
                            size="md"
                          />
                          <div>
                            <p className="font-semibold text-brand-primary dark:text-brand-accent">
                              Message sent successfully!
                            </p>
                            <p className="text-brand-primary/80 dark:text-brand-accent/80 text-sm">
                              We'll get back to you within 24 hours.
                            </p>
                          </div>
                        </div>
                      )}

                      {submitStatus === "error" && (
                        <div className="flex items-start bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-700 rounded-lg">
                          <MaterialIcon
                            icon="error"
                            className="mt-0.5 mr-3 text-red-600 dark:text-red-400"
                            size="md"
                          />
                          <div>
                            <p className="font-semibold text-red-800 dark:text-red-300">
                              Failed to send message
                            </p>
                            <p className="text-red-700 dark:text-red-400 text-sm">
                              Please try again or call us directly.
                            </p>
                          </div>
                        </div>
                      )}

                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={isSubmitting}
                        className="py-6 w-full text-lg"
                      >
                        {isSubmitting ? (
                          <>
                            <MaterialIcon
                              icon="hourglass_empty"
                              className="mr-2 animate-spin"
                              size="md"
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            <MaterialIcon
                              icon="send"
                              className="mr-2"
                              size="md"
                            />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </FadeInWhenVisible>

              {/* Additional Info */}
              <div className="space-y-8">
                {/* Why Choose Us */}
                <FadeInWhenVisible>
                  <Card className="bg-white dark:bg-gray-900 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 transition-shadow">
                    <CardHeader>
                      <MaterialIcon
                        icon="verified"
                        size="2xl"
                        className="mb-3 text-brand-primary"
                      />
                      <CardTitle className="text-gray-900 dark:text-white text-2xl">
                        Why Choose MH Construction?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        <li className="flex items-start">
                          <MaterialIcon
                            icon="check_circle"
                            className="flex-shrink-0 mt-1 mr-3 text-brand-accent"
                            size="md"
                          />
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              Veteran-Owned Excellence
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              Military precision applied to construction
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <MaterialIcon
                            icon="check_circle"
                            className="flex-shrink-0 mt-1 mr-3 text-brand-accent"
                            size="md"
                          />
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              30+ Years Experience
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              Combined team expertise you can trust
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <MaterialIcon
                            icon="check_circle"
                            className="flex-shrink-0 mt-1 mr-3 text-brand-accent"
                            size="md"
                          />
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              98% Client Satisfaction
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              Proven track record of success
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <MaterialIcon
                            icon="check_circle"
                            className="flex-shrink-0 mt-1 mr-3 text-brand-accent"
                            size="md"
                          />
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              Licensed & Insured
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              Across WA, OR, and ID
                            </p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </FadeInWhenVisible>

                {/* Service Areas */}
                <FadeInWhenVisible>
                  <Card className="bg-white dark:bg-gray-900 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 transition-shadow">
                    <CardHeader>
                      <MaterialIcon
                        icon="public"
                        size="2xl"
                        className="mb-3 text-brand-primary"
                      />
                      <CardTitle className="text-gray-900 dark:text-white text-2xl">
                        Service Areas
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="gap-3 grid grid-cols-2">
                        {serviceAreas.map((area, index) => (
                          <div
                            key={index}
                            className="flex items-center text-gray-700 dark:text-gray-300"
                          >
                            <MaterialIcon
                              icon={area.icon}
                              className="mr-2 text-brand-accent"
                              size="sm"
                            />
                            <span className="text-sm">{area.name}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </FadeInWhenVisible>

                {/* Emergency Contact */}
                <FadeInWhenVisible>
                  <Card className="bg-gradient-to-r from-amber-50 dark:from-amber-900/20 to-orange-50 dark:to-orange-900/20 hover:shadow-lg dark:hover:shadow-gray-600/50 border-amber-200 dark:border-amber-700 transition-shadow">
                    <CardHeader>
                      <MaterialIcon
                        icon="emergency"
                        size="2xl"
                        className="mb-3 text-amber-600 dark:text-amber-400"
                      />
                      <CardTitle className="text-gray-900 dark:text-white text-2xl">
                        Emergency Support
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-gray-700 dark:text-gray-300">
                        Need urgent assistance with an active project or
                        emergency construction need?
                      </p>
                      <a
                        href="tel:+15093086489"
                        className="inline-flex justify-center items-center bg-amber-600 hover:bg-amber-700 px-6 py-3 rounded-lg w-full font-semibold text-white transition-colors"
                      >
                        <MaterialIcon icon="phone" className="mr-2" size="md" />
                        Call (509) 308-6489
                      </a>
                      <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm text-center">
                        24/7 Emergency Support Available
                      </p>
                    </CardContent>
                  </Card>
                </FadeInWhenVisible>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Team CTA Section */}
      <section className="bg-gradient-to-br from-brand-primary/5 dark:from-brand-primary/10 to-brand-secondary/5 dark:to-brand-secondary/10 py-16 lg:py-24">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-8">
                <MaterialIcon
                  icon="group_add"
                  size="4xl"
                  className="mb-6 text-brand-primary"
                />
                <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter">
                  <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
                    Ready to Join Our
                  </span>
                  <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                    Team?
                  </span>
                </h2>
                <p className="mb-8 text-gray-700 dark:text-gray-300 text-xl leading-relaxed">
                  We're always looking for skilled professionals who share our
                  commitment to excellence. From seasoned construction veterans
                  to emerging talent, we believe in growing together and
                  building something extraordinary.
                </p>
              </div>

              <div className="gap-8 grid grid-cols-1 md:grid-cols-3 mb-12">
                <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl dark:hover:shadow-gray-700/50 p-6 rounded-xl transition-shadow duration-300">
                  <MaterialIcon
                    icon="construction"
                    size="2xl"
                    className="mb-4 text-brand-primary"
                  />
                  <h3 className="mb-3 font-semibold text-gray-900 dark:text-white text-lg">
                    Construction Professionals
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Skilled tradespeople, equipment operators, and field
                    supervisors
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl dark:hover:shadow-gray-700/50 p-6 rounded-xl transition-shadow duration-300">
                  <MaterialIcon
                    icon="engineering"
                    size="2xl"
                    className="mb-4 text-brand-secondary"
                  />
                  <h3 className="mb-3 font-semibold text-gray-900 dark:text-white text-lg">
                    Project Management
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Project managers, estimators, and planning coordinators
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl dark:hover:shadow-gray-700/50 p-6 rounded-xl transition-shadow duration-300">
                  <MaterialIcon
                    icon="business"
                    size="2xl"
                    className="mb-4 text-brand-accent"
                  />
                  <h3 className="mb-3 font-semibold text-gray-900 dark:text-white text-lg">
                    Support & Admin
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Administrative assistants, safety coordinators, and office
                    support
                  </p>
                </div>
              </div>

              <div className="flex sm:flex-row flex-col justify-center items-center gap-6">
                <Link
                  href="/team"
                  className="inline-flex items-center bg-gradient-to-r from-brand-primary hover:from-brand-primary-dark to-brand-primary-dark hover:to-brand-primary shadow-lg px-8 py-4 rounded-lg font-semibold text-white hover:scale-105 transition-all duration-200 transform"
                >
                  <MaterialIcon icon="groups" className="mr-2" size="md" />
                  Apply to Join Our Team
                </Link>

                <Link
                  href="/team"
                  className="inline-flex items-center hover:bg-brand-primary px-8 py-4 border-2 border-brand-primary rounded-lg font-semibold text-brand-primary hover:text-white transition-all duration-200"
                >
                  <MaterialIcon icon="visibility" className="mr-2" size="md" />
                  Meet Our Team
                </Link>
              </div>

              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm mt-12 p-6 rounded-xl">
                <div className="flex justify-center items-start space-x-4">
                  <MaterialIcon
                    icon="info"
                    size="lg"
                    className="flex-shrink-0 mt-1 text-brand-primary"
                  />
                  <div className="text-left">
                    <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                      Why Join MH Construction?
                    </h4>
                    <ul className="space-y-1 text-gray-600 dark:text-gray-300 text-sm">
                      <li>• Competitive compensation and benefits package</li>
                      <li>
                        • Professional development and training opportunities
                      </li>
                      <li>
                        • Veteran-friendly workplace with military precision
                        values
                      </li>
                      <li>
                        • Family-oriented culture that supports work-life
                        balance
                      </li>
                      <li>
                        • Opportunity to work on meaningful community projects
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Project Inspiration & Recommendations */}
      <section className="bg-gradient-to-br from-blue-50 dark:from-gray-800 to-indigo-100 dark:to-gray-700 py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            <div className="mb-12 text-center">
              <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter">
                <span className="flex justify-center items-center gap-3 mb-3 font-semibold text-gray-700 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
                  <MaterialIcon
                    icon="workspace_premium"
                    size="xl"
                    className="text-brand-primary"
                  />
                  Popular Project
                </span>
                <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                  Ideas
                </span>
              </h2>
              <p className="mx-auto max-w-3xl font-light text-gray-600 dark:text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
                Not sure what project to discuss? Explore these popular
                construction projects from our Pacific Northwest clients
              </p>
            </div>

            <SmartRecommendations
              variant="compact"
              maxRecommendations={6}
              showVeteranBenefits={true}
              onRecommendationClick={(recommendation) => {
                // Pre-fill contact form with project details
                const projectField = document.querySelector(
                  'textarea[name="message"]'
                ) as HTMLTextAreaElement;
                if (projectField) {
                  const currentValue = projectField.value;
                  const projectInfo = `I'm interested in: ${recommendation.title}\n\nEstimated Budget: ${Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(recommendation.estimatedCost.min)} - ${Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(recommendation.estimatedCost.max)}\n\n${currentValue}`;
                  projectField.value = projectInfo;
                  projectField.focus();

                  // Scroll to form
                  document
                    .getElementById("contact-form")
                    ?.scrollIntoView({ behavior: "smooth" });
                }

                // Track contact form pre-fill
                if (typeof window !== "undefined" && window.gtag) {
                  window.gtag("event", "contact_recommendation_prefill", {
                    project_type: recommendation.projectType,
                    confidence: recommendation.confidence,
                  });
                }
              }}
              onGetEstimate={(recommendation) => {
                // Navigate to estimator
                if (typeof window !== "undefined") {
                  window.location.href = `/estimator?project=${encodeURIComponent(recommendation.projectType)}&title=${encodeURIComponent(recommendation.title)}`;
                }

                // Track estimate request from contact page
                if (typeof window !== "undefined" && window.gtag) {
                  window.gtag("event", "contact_recommendation_estimate", {
                    project_type: recommendation.projectType,
                    estimated_value: recommendation.estimatedCost.min,
                  });
                }
              }}
              className="bg-white dark:bg-gray-800 shadow-lg p-8 rounded-xl"
            />
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="bg-white dark:bg-gray-900 py-16 lg:py-24">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-7xl">
              <div className="mb-8 text-center">
                <MaterialIcon
                  icon="map"
                  size="3xl"
                  className="mb-4 text-brand-primary"
                />
                <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter">
                  <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
                    Visit Our
                  </span>
                  <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
                    Office
                  </span>
                </h2>
                <p className="mb-2 font-light text-gray-600 dark:text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
                  3111 N. Capital Ave., Pasco, WA 99301
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Serving the Tri-Cities and Pacific Northwest
                </p>
              </div>

              {/* Map placeholder - replace with actual map component */}
              <div className="flex justify-center items-center bg-gray-200 dark:bg-gray-700 rounded-lg h-96">
                <div className="text-center">
                  <MaterialIcon
                    icon="location_on"
                    size="4xl"
                    className="mb-4 text-gray-400 dark:text-gray-500"
                  />
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    Map integration coming soon
                  </p>
                  <a
                    href="https://maps.google.com/?q=3111+N+Capital+Ave+Pasco+WA+99301"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-4 text-brand-primary hover:text-brand-primary-dark hover:underline transition-colors"
                  >
                    <MaterialIcon
                      icon="open_in_new"
                      className="mr-2"
                      size="md"
                    />
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  );
}
