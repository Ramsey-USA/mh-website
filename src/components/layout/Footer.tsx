"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-800 dark:from-black via-gray-900 dark:via-gray-900 to-black dark:to-black pt-6 xs:pt-8 sm:pt-10 pb-4 border-t border-brand-primary/20 text-gray-300 touch-manipulation">
      <div className="mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Main Footer Content */}
        <div className="gap-4 xs:gap-5 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pb-4 xs:pb-5 sm:pb-6">
          {/* Column 1: Company Info */}
          <div className="space-y-3 xs:space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="text-center sm:text-left lg:text-left">
              <div className="mb-4">
                <Image
                  src="/images/logo/mh-logo.png"
                  alt="MH Construction Logo"
                  width={264}
                  height={132}
                  className="mx-auto sm:mx-0 lg:mx-0 w-[240px] xs:w-[270px] sm:w-[300px] h-auto drop-shadow-lg"
                />
              </div>

              {/* Contact Info */}
              <div className="space-y-2 xs:space-y-3 text-gray-300 dark:text-gray-200 text-xs xs:text-sm">
                <div className="group hover:bg-gray-800/50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-all duration-300 touch-manipulation">
                  <div className="flex items-center">
                    <div className="flex justify-center items-center bg-brand-primary/20 mr-3 p-1.5 xs:p-2 rounded-lg">
                      <MaterialIcon
                        icon="call"
                        size="sm"
                        className="text-brand-primary"
                      />
                    </div>
                    <div>
                      <div className="mb-1 text-gray-400 dark:text-gray-300 text-xs">
                        MHC Phone
                      </div>
                      <a
                        href="tel:+15093086489"
                        className="font-medium hover:text-brand-primary transition-colors text-xs xs:text-sm"
                      >
                        (509) 308-6489
                      </a>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-gray-800/50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-all duration-300 touch-manipulation">
                  <div className="flex items-start">
                    <div className="flex justify-center items-center bg-brand-primary/20 mt-0.5 mr-3 p-1.5 xs:p-2 rounded-lg">
                      <MaterialIcon
                        icon="place"
                        size="sm"
                        className="text-brand-primary"
                      />
                    </div>
                    <div>
                      <div className="mb-1 text-gray-400 dark:text-gray-300 text-xs">
                        MHC Office
                      </div>
                      <span className="text-xs leading-tight">
                        3111 N. Capital Ave.
                        <br />
                        Pasco, WA 99301
                      </span>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-gray-800/50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-all duration-300 touch-manipulation">
                  <div className="flex items-center">
                    <div className="flex justify-center items-center bg-brand-primary/20 mr-3 p-1.5 xs:p-2 rounded-lg">
                      <MaterialIcon
                        icon="mail"
                        size="sm"
                        className="text-brand-primary"
                      />
                    </div>
                    <div>
                      <div className="mb-1 text-gray-400 dark:text-gray-300 text-xs">
                        MHC Email
                      </div>
                      <a
                        href="mailto:office@mhc-gc.com"
                        className="font-medium hover:text-brand-primary text-xs transition-colors break-all"
                      >
                        office@mhc-gc.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Core Navigation */}
          <div className="space-y-3 xs:space-y-4">
            <div className="flex items-center space-x-2 pb-2 border-b border-brand-primary/30">
              <MaterialIcon
                icon="explore"
                size="sm"
                className="text-brand-primary"
              />
              <h4 className="font-medium text-brand-primary text-xs uppercase tracking-wide">
                Core Services
              </h4>
            </div>
            <nav className="space-y-1.5 xs:space-y-2">
              <Link
                href="/booking"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-xs xs:text-sm transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="handshake"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>Start Partnership</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/services"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-xs xs:text-sm transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="build"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>Construction Management</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/projects"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-xs xs:text-sm transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="photo_library"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>Portfolio & Projects</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/estimator"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-xs xs:text-sm transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="smart_toy"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>AI Cost Estimator</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/contact"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-xs xs:text-sm transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="contact_phone"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>Connect With Us</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/services#inspections"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-xs xs:text-sm transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="fact_check"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>Quality Inspections</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/contact#urgent-support"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-xs xs:text-sm transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="engineering"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>Urgent Construction Support</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/services#maintenance"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-xs xs:text-sm transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="home_repair_service"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>Maintenance & Repairs</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>
            </nav>
          </div>

          {/* Column 3: Company & Partnerships */}
          <div className="space-y-3 xs:space-y-4">
            <div className="flex items-center space-x-2 pb-2 border-b border-brand-primary/30">
              <MaterialIcon
                icon="people"
                size="sm"
                className="text-brand-primary"
              />
              <h4 className="font-medium text-brand-primary text-xs uppercase tracking-wide">
                Company & Partners
              </h4>
            </div>
            <nav className="space-y-1.5 xs:space-y-2">
              <Link
                href="/"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-xs xs:text-sm transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="home"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>Home</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/about"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-xs xs:text-sm transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="info"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>Our Story</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/team"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-xs xs:text-sm transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="people"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>Our Team</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/trade-partners"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-xs xs:text-sm transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="business"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>Trade Partners</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/government"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-xs xs:text-sm transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="account_balance"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>Government & Grants</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/careers"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-xs xs:text-sm transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="badge"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>Join Our Team</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/about#testimonials"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-xs xs:text-sm transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="star"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>Client Reviews</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/about#safety"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-xs xs:text-sm transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="verified_user"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>Safety & Compliance</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/about#awards"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-xs xs:text-sm transition-all hover:translate-x-1 duration-300 touch-manipulation"
              >
                <MaterialIcon
                  icon="emoji_events"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>Awards & Recognition</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>
            </nav>
          </div>

          {/* Column 3: Social Media & Resources */}
          <div className="space-y-3 xs:space-y-4">
            <div className="flex items-center space-x-2 pb-2 border-b border-brand-primary/30">
              <MaterialIcon
                icon="share"
                size="sm"
                className="text-brand-primary"
              />
              <h4 className="font-medium text-brand-primary text-xs uppercase tracking-wide">
                Connect & Resources
              </h4>
            </div>

            {/* Social Media Links */}
            <div className="space-y-2 xs:space-y-3">
              <div className="mb-2 text-gray-400 dark:text-gray-300 text-xs">
                Follow Our Partnership Journey
              </div>
              <div className="flex flex-wrap gap-2 xs:gap-3">
                <a
                  href="https://facebook.com/mhconstruction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex justify-center items-center bg-gray-700 hover:bg-blue-600 dark:bg-gray-600 hover:shadow-lg hover:shadow-brand-primary/30 dark:hover:shadow-brand-secondary/30 p-2 xs:p-2.5 sm:p-3 border border-gray-600 dark:border-gray-500 hover:border-blue-500 rounded-lg xs:rounded-xl hover:scale-105 transition-all duration-300 touch-manipulation"
                  title="Follow our partnership stories on Facebook"
                >
                  <MaterialIcon
                    icon="thumb_up"
                    size="sm"
                    className="text-gray-400 group-hover:text-white transition-colors drop-shadow-lg group-hover:drop-shadow-[0_0_8px_rgba(56,104,81,0.6)] dark:group-hover:drop-shadow-[0_0_8px_rgba(189,146,100,0.6)]"
                  />
                </a>
                <a
                  href="https://instagram.com/mhconstruction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex justify-center items-center bg-gray-700 dark:bg-gray-600 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:shadow-lg hover:shadow-brand-primary/30 dark:hover:shadow-brand-secondary/30 p-2 xs:p-2.5 sm:p-3 border border-gray-600 hover:border-pink-500 dark:border-gray-500 rounded-lg xs:rounded-xl hover:scale-105 transition-all duration-300 touch-manipulation"
                  title="See partnership projects on Instagram"
                >
                  <MaterialIcon
                    icon="photo_camera"
                    size="sm"
                    className="text-gray-400 group-hover:text-white transition-colors drop-shadow-lg group-hover:drop-shadow-[0_0_8px_rgba(56,104,81,0.6)] dark:group-hover:drop-shadow-[0_0_8px_rgba(189,146,100,0.6)]"
                  />
                </a>
                <a
                  href="https://x.com/mhconstruction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex justify-center items-center bg-gray-700 hover:bg-black dark:bg-gray-600 hover:shadow-lg hover:shadow-brand-primary/30 dark:hover:shadow-brand-secondary/30 p-2 xs:p-2.5 sm:p-3 border border-gray-600 hover:border-gray-400 dark:border-gray-500 rounded-lg xs:rounded-xl hover:scale-105 transition-all duration-300 touch-manipulation"
                  title="Follow partnership updates on X (Twitter)"
                >
                  <MaterialIcon
                    icon="close"
                    size="sm"
                    className="text-gray-400 group-hover:text-white transition-colors drop-shadow-lg group-hover:drop-shadow-[0_0_8px_rgba(56,104,81,0.6)] dark:group-hover:drop-shadow-[0_0_8px_rgba(189,146,100,0.6)]"
                  />
                </a>
                <a
                  href="https://youtube.com/@mhconstruction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex justify-center items-center bg-gray-700 hover:bg-red-600 dark:bg-gray-600 hover:shadow-lg hover:shadow-brand-primary/30 dark:hover:shadow-brand-secondary/30 p-2 xs:p-2.5 sm:p-3 border border-gray-600 dark:border-gray-500 hover:border-red-500 rounded-lg xs:rounded-xl hover:scale-105 transition-all duration-300 touch-manipulation"
                  title="Watch partnership success stories on YouTube"
                >
                  <MaterialIcon
                    icon="play_circle"
                    size="sm"
                    className="text-gray-400 group-hover:text-white transition-colors drop-shadow-lg group-hover:drop-shadow-[0_0_8px_rgba(56,104,81,0.6)] dark:group-hover:drop-shadow-[0_0_8px_rgba(189,146,100,0.6)]"
                  />
                </a>
                <a
                  href="https://linkedin.com/company/mhconstruction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex justify-center items-center bg-gray-700 hover:bg-blue-700 dark:bg-gray-600 hover:shadow-lg hover:shadow-brand-primary/30 dark:hover:shadow-brand-secondary/30 p-2 xs:p-2.5 sm:p-3 border border-gray-600 dark:border-gray-500 hover:border-blue-400 rounded-lg xs:rounded-xl hover:scale-105 transition-all duration-300 touch-manipulation"
                  title="Connect with our partnership team on LinkedIn"
                >
                  <MaterialIcon
                    icon="work"
                    size="sm"
                    className="text-gray-400 group-hover:text-white transition-colors drop-shadow-lg group-hover:drop-shadow-[0_0_8px_rgba(56,104,81,0.6)] dark:group-hover:drop-shadow-[0_0_8px_rgba(189,146,100,0.6)]"
                  />
                </a>
              </div>
            </div>

            {/* Search Bar */}
            <div className="space-y-2 xs:space-y-3 pt-2 border-gray-700 dark:border-gray-600 border-t">
              <div className="mb-2 text-gray-400 dark:text-gray-300 text-xs">
                Quick Partnership Search
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search partnership resources..."
                  className="bg-gray-700/50 hover:bg-gray-700 focus:bg-gray-700 dark:bg-gray-600/50 dark:hover:bg-gray-600 dark:focus:bg-gray-600 px-3 xs:px-4 py-2.5 xs:py-3 pr-12 xs:pr-14 border border-gray-600 dark:border-gray-500 focus:border-brand-primary dark:focus:border-brand-primary rounded-lg xs:rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 w-full text-gray-300 dark:text-gray-200 text-xs xs:text-sm transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400 touch-manipulation"
                />
                <button
                  type="submit"
                  className="top-1/2 right-1 absolute bg-brand-primary hover:bg-brand-accent p-1.5 rounded-lg text-white hover:scale-105 transition-all -translate-y-1/2 duration-300 transform touch-manipulation"
                  aria-label="Search"
                >
                  <MaterialIcon
                    icon="search"
                    size="sm"
                    className="text-white"
                  />
                </button>
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-xs">
                Search partnership services, team members, success stories, and
                more
              </div>
            </div>

            {/* Additional Resources */}
            <div className="space-y-1.5 xs:space-y-2 pt-3 xs:pt-4">
              <div className="mb-2 text-gray-400 dark:text-gray-300 text-xs">
                Partnership Resources
              </div>
              <div className="flex items-center space-x-2 opacity-60 text-gray-500 dark:text-gray-400 text-xs cursor-not-allowed">
                <MaterialIcon
                  icon="description"
                  size="sm"
                  className="text-gray-600 dark:text-gray-500"
                />
                <span>Partnership Brochures (Coming Soon)</span>
              </div>
              <div className="flex items-center space-x-2 opacity-60 text-gray-500 dark:text-gray-400 text-xs cursor-not-allowed">
                <MaterialIcon
                  icon="military_tech"
                  size="sm"
                  className="text-gray-600 dark:text-gray-500"
                />
                <span>Veteran Partnership Programs (Coming Soon)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 xs:pt-5 sm:pt-6 border-gray-700 dark:border-gray-600 border-t">
          <div className="flex md:flex-row flex-col justify-between items-center space-y-2 xs:space-y-3 md:space-y-0 text-gray-400 dark:text-gray-300 text-xs xs:text-sm">
            <div className="flex items-center space-x-2">
              <MaterialIcon
                icon="copyright"
                size="sm"
                className="text-gray-500 dark:text-gray-400"
              />
              <span>&copy; 2025 MH Construction LLC. All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-2 text-center md:text-left">
              <MaterialIcon
                icon="military_tech"
                size="sm"
                className="text-brand-primary"
              />
              <span className="flex flex-col xs:flex-row xs:items-center xs:space-x-1">
                <span className="font-medium text-brand-primary">
                  Veteran-owned partnership
                </span>
                <span>excellence serving the Pacific Northwest</span>
              </span>
            </div>
          </div>

          {/* Additional Footer Info */}
          <div className="flex lg:flex-row flex-col justify-center items-center lg:space-x-4 xl:space-x-6 space-y-1.5 xs:space-y-2 lg:space-y-0 mt-3 xs:mt-4 pt-3 border-gray-700/50 dark:border-gray-600/50 border-t text-gray-500 dark:text-gray-400 text-xs">
            <div className="flex items-center space-x-1">
              <MaterialIcon
                icon="verified"
                size="sm"
                className="text-brand-primary"
              />
              <span>Licensed & Insured Partnership</span>
            </div>
            <div className="flex items-center space-x-1">
              <MaterialIcon
                icon="location_on"
                size="sm"
                className="text-brand-primary"
              />
              <span>Serving WA, OR, & ID</span>
            </div>
            <div className="flex items-center space-x-1 text-center">
              <MaterialIcon
                icon="build"
                size="sm"
                className="text-brand-primary"
              />
              <span>Building for the Owner, NOT the Dollar</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
