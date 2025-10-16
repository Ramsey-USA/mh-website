"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-800 dark:from-black via-gray-900 dark:via-gray-900 to-black dark:to-black pt-10 pb-4 border-t border-brand-primary/20 text-gray-300">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Main Footer Content */}
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-6">
          {/* Column 1: Company Info */}
          <div className="space-y-4">
            <div className="lg:text-left text-center">
              <Image
                src="/images/logo/mh-logo.png"
                alt="MH Construction Logo"
                width={132}
                height={66}
                className="mx-auto lg:mx-0 mb-4"
              />
              <p className="mb-4 text-gray-400 dark:text-gray-300 text-sm">
                Building for the Owner, NOT the Dollar
              </p>

              {/* Contact Info */}
              <div className="space-y-3 text-gray-300 dark:text-gray-200 text-sm">
                <div className="group hover:bg-gray-800/50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-all duration-300">
                  <div className="flex items-center">
                    <div className="flex justify-center items-center bg-brand-primary/20 mr-3 p-2 rounded-lg">
                      <MaterialIcon
                        icon="call"
                        size="sm"
                        className="text-brand-primary"
                      />
                    </div>
                    <div>
                      <div className="mb-1 text-gray-400 dark:text-gray-300 text-xs">
                        Partnership Phone
                      </div>
                      <a
                        href="tel:+15093086489"
                        className="font-medium hover:text-brand-primary transition-colors"
                      >
                        (509) 308-6489
                      </a>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-gray-800/50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-all duration-300">
                  <div className="flex items-start">
                    <div className="flex justify-center items-center bg-brand-primary/20 mt-0.5 mr-3 p-2 rounded-lg">
                      <MaterialIcon
                        icon="place"
                        size="sm"
                        className="text-brand-primary"
                      />
                    </div>
                    <div>
                      <div className="mb-1 text-gray-400 dark:text-gray-300 text-xs">
                        Partnership Office
                      </div>
                      <span className="text-xs leading-tight">
                        3111 N. Capital Ave.
                        <br />
                        Pasco, WA 99301
                      </span>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-gray-800/50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-all duration-300">
                  <div className="flex items-center">
                    <div className="flex justify-center items-center bg-brand-primary/20 mr-3 p-2 rounded-lg">
                      <MaterialIcon
                        icon="mail"
                        size="sm"
                        className="text-brand-primary"
                      />
                    </div>
                    <div>
                      <div className="mb-1 text-gray-400 dark:text-gray-300 text-xs">
                        Partnership Email
                      </div>
                      <a
                        href="mailto:office@mhc-gc.com"
                        className="font-medium hover:text-brand-primary text-xs transition-colors"
                      >
                        office@mhc-gc.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 pb-2 border-b border-brand-primary/30">
              <MaterialIcon
                icon="link"
                size="sm"
                className="text-brand-primary"
              />
              <h4 className="font-medium text-brand-primary text-xs uppercase tracking-wide">
                Partnership Links
              </h4>
            </div>
            <nav className="space-y-2">
              <Link
                href="/booking"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-sm transition-all hover:translate-x-1 duration-300"
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
                href="/"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-sm transition-all hover:translate-x-1 duration-300"
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
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-sm transition-all hover:translate-x-1 duration-300"
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
                href="/services"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-sm transition-all hover:translate-x-1 duration-300"
              >
                <MaterialIcon
                  icon="build"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>Partnership Approach</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/team"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-sm transition-all hover:translate-x-1 duration-300"
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
                href="/projects"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-sm transition-all hover:translate-x-1 duration-300"
              >
                <MaterialIcon
                  icon="photo_library"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>Success Stories</span>
                <MaterialIcon
                  icon="arrow_forward"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
                />
              </Link>

              <Link
                href="/government"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-sm transition-all hover:translate-x-1 duration-300"
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
                href="/trade-partners"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-sm transition-all hover:translate-x-1 duration-300"
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
                href="/careers"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-sm transition-all hover:translate-x-1 duration-300"
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
                href="/contact"
                className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-sm transition-all hover:translate-x-1 duration-300"
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
            </nav>
          </div>

          {/* Column 3: Social Media & Resources */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 pb-2 border-b border-brand-primary/30">
              <MaterialIcon
                icon="share"
                size="sm"
                className="text-brand-primary"
              />
              <h4 className="font-medium text-brand-primary text-xs uppercase tracking-wide">
                Connect & Partnership Resources
              </h4>
            </div>

            {/* Social Media Links */}
            <div className="space-y-3">
              <div className="mb-2 text-gray-400 dark:text-gray-300 text-xs">
                Follow Our Partnership Journey
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://facebook.com/mhconstruction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex justify-center items-center bg-gray-700 hover:bg-blue-600 dark:bg-gray-600 hover:shadow-lg p-3 border border-gray-600 dark:border-gray-500 hover:border-blue-500 rounded-xl hover:scale-105 transition-all duration-300"
                  title="Follow our partnership stories on Facebook"
                >
                  <MaterialIcon
                    icon="thumb_up"
                    size="md"
                    className="text-gray-400 group-hover:text-white transition-colors"
                  />
                </a>
                <a
                  href="https://instagram.com/mhconstruction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex justify-center items-center bg-gray-700 dark:bg-gray-600 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:shadow-lg p-3 border border-gray-600 hover:border-pink-500 dark:border-gray-500 rounded-xl hover:scale-105 transition-all duration-300"
                  title="See partnership projects on Instagram"
                >
                  <MaterialIcon
                    icon="photo_camera"
                    size="md"
                    className="text-gray-400 group-hover:text-white transition-colors"
                  />
                </a>
                <a
                  href="https://x.com/mhconstruction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex justify-center items-center bg-gray-700 hover:bg-black dark:bg-gray-600 hover:shadow-lg p-3 border border-gray-600 hover:border-gray-400 dark:border-gray-500 rounded-xl hover:scale-105 transition-all duration-300"
                  title="Follow partnership updates on X (Twitter)"
                >
                  <MaterialIcon
                    icon="close"
                    size="md"
                    className="text-gray-400 group-hover:text-white transition-colors"
                  />
                </a>
                <a
                  href="https://youtube.com/@mhconstruction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex justify-center items-center bg-gray-700 hover:bg-red-600 dark:bg-gray-600 hover:shadow-lg p-3 border border-gray-600 dark:border-gray-500 hover:border-red-500 rounded-xl hover:scale-105 transition-all duration-300"
                  title="Watch partnership success stories on YouTube"
                >
                  <MaterialIcon
                    icon="play_circle"
                    size="md"
                    className="text-gray-400 group-hover:text-white transition-colors"
                  />
                </a>
                <a
                  href="https://linkedin.com/company/mhconstruction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex justify-center items-center bg-gray-700 hover:bg-blue-700 dark:bg-gray-600 hover:shadow-lg p-3 border border-gray-600 dark:border-gray-500 hover:border-blue-400 rounded-xl hover:scale-105 transition-all duration-300"
                  title="Connect with our partnership team on LinkedIn"
                >
                  <MaterialIcon
                    icon="work"
                    size="md"
                    className="text-gray-400 group-hover:text-white transition-colors"
                  />
                </a>
              </div>
            </div>

            {/* Search Bar */}
            <div className="space-y-3 pt-2 border-gray-700 dark:border-gray-600 border-t">
              <div className="mb-2 text-gray-400 dark:text-gray-300 text-xs">
                Quick Partnership Search
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search partnership resources..."
                  className="bg-gray-700/50 hover:bg-gray-700 focus:bg-gray-700 dark:bg-gray-600/50 dark:hover:bg-gray-600 dark:focus:bg-gray-600 px-4 py-3 pr-14 border border-gray-600 dark:border-gray-500 focus:border-brand-primary dark:focus:border-brand-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 w-full text-gray-300 dark:text-gray-200 text-sm transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="top-1/2 right-1 absolute bg-brand-primary hover:bg-brand-accent p-1.5 rounded-lg text-white hover:scale-105 transition-all -translate-y-1/2 duration-300 transform"
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
            <div className="space-y-2 pt-4">
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
        <div className="pt-6 border-gray-700 dark:border-gray-600 border-t">
          <div className="flex md:flex-row flex-col justify-between items-center space-y-3 md:space-y-0 text-gray-400 dark:text-gray-300 text-sm">
            <div className="flex items-center space-x-2">
              <MaterialIcon
                icon="copyright"
                size="sm"
                className="text-gray-500 dark:text-gray-400"
              />
              <span>&copy; 2025 MH Construction LLC. All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-2">
              <MaterialIcon
                icon="military_tech"
                size="sm"
                className="text-brand-primary"
              />
              <span className="flex items-center space-x-1">
                <span className="font-medium text-brand-primary">
                  Veteran-owned partnership
                </span>
                <span>excellence serving the Pacific Northwest</span>
              </span>
            </div>
          </div>

          {/* Additional Footer Info */}
          <div className="flex md:flex-row flex-col justify-center items-center md:space-x-6 space-y-2 md:space-y-0 mt-4 pt-3 border-gray-700/50 dark:border-gray-600/50 border-t text-gray-500 dark:text-gray-400 text-xs">
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
            <div className="flex items-center space-x-1">
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
