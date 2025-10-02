'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../../components/ui'
import { MaterialIcon } from '../../components/icons/MaterialIcon'
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
  HoverScale,
} from '../../components/animations/FramerMotionComponents'

// Contact methods
const contactMethods = [
  {
    icon: 'phone',
    title: 'Phone',
    value: '(509) 308-6489',
    description: 'Mon-Fri: 8:00 AM - 5:00 PM PST',
    link: 'tel:+15093086489',
  },
  {
    icon: 'email',
    title: 'Email',
    value: 'info@mhconstruction.com',
    description: "We'll respond within 24 hours",
    link: 'mailto:info@mhconstruction.com',
  },
  {
    icon: 'location_on',
    title: 'Office',
    value: '3111 N. Capital Ave.',
    description: 'Pasco, WA 99301',
    link: 'https://maps.google.com/?q=3111+N+Capital+Ave+Pasco+WA+99301',
  },
  {
    icon: 'schedule',
    title: 'Business Hours',
    value: 'Monday - Friday',
    description: '8:00 AM - 5:00 PM PST',
    link: null,
  },
]

// Service areas
const serviceAreas = [
  { name: 'Pasco, WA', icon: 'location_city' },
  { name: 'Kennewick, WA', icon: 'location_city' },
  { name: 'Richland, WA', icon: 'location_city' },
  { name: 'Benton County, WA', icon: 'map' },
  { name: 'Franklin County, WA', icon: 'map' },
  { name: 'Washington State', icon: 'public' },
  { name: 'Oregon (Licensed)', icon: 'public' },
  { name: 'Idaho (Licensed)', icon: 'public' },
]

// Project types
const projectTypes = [
  'Commercial Construction',
  'Residential Construction',
  'Industrial Construction',
  'Tenant Improvements',
  'Medical Facilities',
  'Religious Facilities',
  'Wineries & Vineyards',
  'Renovations',
  'Other',
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    location: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    // In production, this would send to your backend/Firebase
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        location: '',
        message: '',
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    }, 1500)
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#2d5240] via-[#386851] to-[#4a7a63] py-20 text-white">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-4xl text-center">
              <MaterialIcon
                icon="contact_mail"
                size="4xl"
                className="mb-6 text-green-200"
              />
              <h1 className="mb-6 font-bold text-5xl md:text-6xl">
                Contact Us
              </h1>
              <p className="mb-8 text-green-100 text-xl md:text-2xl">
                Let's Discuss Your Construction Project
              </p>
              <p className="text-green-50 text-lg">
                Get in touch with our team today for a free consultation and
                project estimate
              </p>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="bg-white py-16">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-bold text-gray-900 text-4xl">
                Get In Touch
              </h2>
              <p className="text-gray-600 text-xl">
                Multiple ways to reach our team
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggeredFadeIn className="gap-6 grid md:grid-cols-2 lg:grid-cols-4 mx-auto mb-12 max-w-7xl">
            {contactMethods.map((method, index) => (
              <HoverScale key={index}>
                <Card className="hover:shadow-lg h-full transition-shadow">
                  <CardContent className="p-6 text-center">
                    <MaterialIcon
                      icon={method.icon}
                      size="3xl"
                      className="mb-4 text-[#386851]"
                    />
                    <h3 className="mb-2 font-bold text-gray-900 text-lg">
                      {method.title}
                    </h3>
                    {method.link ? (
                      <a
                        href={method.link}
                        target={
                          method.link.startsWith('http') ? '_blank' : undefined
                        }
                        rel={
                          method.link.startsWith('http')
                            ? 'noopener noreferrer'
                            : undefined
                        }
                        className="block mb-1 font-semibold text-[#386851] hover:underline"
                      >
                        {method.value}
                      </a>
                    ) : (
                      <p className="mb-1 font-semibold text-gray-900">
                        {method.value}
                      </p>
                    )}
                    <p className="text-gray-600 text-sm">
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
      <section className="bg-gray-50 py-16">
        <div className="mx-auto px-4 container">
          <div className="mx-auto max-w-7xl">
            <div className="gap-12 grid lg:grid-cols-2">
              {/* Contact Form */}
              <FadeInWhenVisible>
                <Card className="shadow-xl">
                  <CardHeader>
                    <MaterialIcon
                      icon="edit_note"
                      size="2xl"
                      className="mb-3 text-[#386851]"
                    />
                    <CardTitle className="text-3xl">
                      Send Us a Message
                    </CardTitle>
                    <p className="text-gray-600">
                      Fill out the form below and we'll get back to you within
                      24 hours
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block mb-2 font-semibold text-gray-700 text-sm"
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
                          className="px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
                          placeholder="John Doe"
                        />
                      </div>

                      <div className="gap-4 grid md:grid-cols-2">
                        <div>
                          <label
                            htmlFor="email"
                            className="block mb-2 font-semibold text-gray-700 text-sm"
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
                            className="px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
                            placeholder="john@example.com"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="phone"
                            className="block mb-2 font-semibold text-gray-700 text-sm"
                          >
                            Phone
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
                            placeholder="(509) 555-0123"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="projectType"
                          className="block mb-2 font-semibold text-gray-700 text-sm"
                        >
                          Project Type *
                        </label>
                        <select
                          id="projectType"
                          name="projectType"
                          required
                          value={formData.projectType}
                          onChange={handleChange}
                          className="px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
                        >
                          <option value="">Select a project type...</option>
                          {projectTypes.map(type => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="location"
                          className="block mb-2 font-semibold text-gray-700 text-sm"
                        >
                          Project Location
                        </label>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          className="px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
                          placeholder="Pasco, WA"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block mb-2 font-semibold text-gray-700 text-sm"
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
                          className="px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full resize-none"
                          placeholder="Tell us about your project..."
                        />
                      </div>

                      {submitStatus === 'success' && (
                        <div className="flex items-start bg-green-50 p-4 border border-green-200 rounded-lg">
                          <MaterialIcon
                            icon="check_circle"
                            className="mt-0.5 mr-3 text-green-600"
                            size="md"
                          />
                          <div>
                            <p className="font-semibold text-green-800">
                              Message sent successfully!
                            </p>
                            <p className="text-green-700 text-sm">
                              We'll get back to you within 24 hours.
                            </p>
                          </div>
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[#386851] hover:bg-[#2d5240] py-6 w-full text-white text-lg"
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
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <MaterialIcon
                        icon="verified"
                        size="2xl"
                        className="mb-3 text-[#386851]"
                      />
                      <CardTitle className="text-2xl">
                        Why Choose MH Construction?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        <li className="flex items-start">
                          <MaterialIcon
                            icon="check_circle"
                            className="flex-shrink-0 mt-1 mr-3 text-green-500"
                            size="md"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">
                              Veteran-Owned Excellence
                            </p>
                            <p className="text-gray-600 text-sm">
                              Military precision applied to construction
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <MaterialIcon
                            icon="check_circle"
                            className="flex-shrink-0 mt-1 mr-3 text-green-500"
                            size="md"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">
                              150+ Years Experience
                            </p>
                            <p className="text-gray-600 text-sm">
                              Combined team expertise you can trust
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <MaterialIcon
                            icon="check_circle"
                            className="flex-shrink-0 mt-1 mr-3 text-green-500"
                            size="md"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">
                              98% Client Satisfaction
                            </p>
                            <p className="text-gray-600 text-sm">
                              Proven track record of success
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <MaterialIcon
                            icon="check_circle"
                            className="flex-shrink-0 mt-1 mr-3 text-green-500"
                            size="md"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">
                              Licensed & Insured
                            </p>
                            <p className="text-gray-600 text-sm">
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
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <MaterialIcon
                        icon="public"
                        size="2xl"
                        className="mb-3 text-[#386851]"
                      />
                      <CardTitle className="text-2xl">Service Areas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="gap-3 grid grid-cols-2">
                        {serviceAreas.map((area, index) => (
                          <div
                            key={index}
                            className="flex items-center text-gray-700"
                          >
                            <MaterialIcon
                              icon={area.icon}
                              className="mr-2 text-green-500"
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
                  <Card className="bg-gradient-to-r from-orange-50 to-red-50 hover:shadow-lg border-orange-200 transition-shadow">
                    <CardHeader>
                      <MaterialIcon
                        icon="emergency"
                        size="2xl"
                        className="mb-3 text-orange-600"
                      />
                      <CardTitle className="text-gray-900 text-2xl">
                        Emergency Support
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-gray-700">
                        Need urgent assistance with an active project or
                        emergency construction need?
                      </p>
                      <a
                        href="tel:+15093086489"
                        className="inline-flex justify-center items-center bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-lg w-full font-semibold text-white transition-colors"
                      >
                        <MaterialIcon icon="phone" className="mr-2" size="md" />
                        Call (509) 308-6489
                      </a>
                      <p className="mt-3 text-gray-600 text-sm text-center">
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

      {/* Map Section Placeholder */}
      <section className="bg-white py-16">
        <div className="mx-auto px-4 container">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-7xl">
              <div className="mb-8 text-center">
                <MaterialIcon
                  icon="map"
                  size="3xl"
                  className="mb-4 text-[#386851]"
                />
                <h2 className="mb-4 font-bold text-gray-900 text-4xl">
                  Visit Our Office
                </h2>
                <p className="mb-2 text-gray-600 text-xl">
                  3111 N. Capital Ave., Pasco, WA 99301
                </p>
                <p className="text-gray-600">
                  Serving the Tri-Cities and Pacific Northwest
                </p>
              </div>

              {/* Map placeholder - replace with actual map component */}
              <div className="flex justify-center items-center bg-gray-200 rounded-lg h-96">
                <div className="text-center">
                  <MaterialIcon
                    icon="location_on"
                    size="4xl"
                    className="mb-4 text-gray-400"
                  />
                  <p className="text-gray-600 text-lg">
                    Map integration coming soon
                  </p>
                  <a
                    href="https://maps.google.com/?q=3111+N+Capital+Ave+Pasco+WA+99301"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-4 text-[#386851] hover:underline"
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
  )
}
