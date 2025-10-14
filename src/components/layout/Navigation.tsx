"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "../ui/ThemeToggle";
import { MaterialIcon } from "../icons/MaterialIcon";

/**
 * Global Hamburger Navigation Component
 *
 * Provides the main site navigation through a fixed-position hamburger menu.
 * This component handles page-to-page navigation and should appear on every page.
 *
 * Features:
 * - Fixed position hamburger menu button
 * - Full-screen overlay navigation when opened
 * - Centered logo with brand navigation
 * - Social media integration
 * - Theme toggle integration
 * - Responsive design with mobile-first approach
 * - Smooth animations and transitions
 * - Auto-close on navigation selection
 *
 * Navigation Structure:
 * - Primary pages: Home, About, Services, Projects, Team, Careers, Contact
 * - Special features: AI Estimator, Government Services, Trade Partners
 * - Social links: Facebook, Instagram, LinkedIn, YouTube
 *
 * @component
 * @example
 * ```tsx
 * // Automatically included in layout.tsx - no manual implementation needed
 * import { Navigation } from "@/components/layout";
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <Navigation />
 *         {children}
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 *
 * @see {@link /docs/technical/NAVIGATION_ARCHITECTURE.md} - Complete navigation system documentation
 * @see {@link /docs/technical/NAVIGATION_TECHNICAL_GUIDE.md} - Implementation guide
 */
export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Backdrop overlay when menu is open */}
      {isMenuOpen && (
        <div
          className="z-40 fixed inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300 cursor-pointer"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Main Header - Transparent and absolute positioning */}
      <header className="top-0 left-0 right-0 z-40 absolute bg-transparent">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex justify-center items-center py-2 h-20 sm:h-24">
            {/* Logo - Centered */}
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="flex items-center hover:scale-105 transition-all duration-300"
              >
                <Image
                  src="/images/logo/mh-logo.png"
                  alt="MH Construction"
                  width={88}
                  height={88}
                  priority
                  className="drop-shadow-lg w-auto h-[56px] sm:h-[70px] md:h-[88px]"
                />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Theme Toggle - Fixed left edge */}
      <div className="top-4 left-4 sm:left-6 z-50 fixed">
        <ThemeToggle compact size="sm" />
      </div>

      {/* Hamburger Menu - Fixed right edge */}
      <div className="top-4 right-4 sm:right-6 z-50 fixed">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative bg-gradient-to-r from-brand-primary to-forest-600 hover:from-brand-accent hover:to-forest-700 shadow-lg hover:shadow-xl p-3 rounded-xl transition-all duration-300"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <div className="flex flex-col justify-center space-y-1 w-6 h-6">
            <span
              className={`w-full h-0.5 bg-white transition-all duration-300 transform ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }
              `}
            />
            <span
              className={`w-full h-0.5 bg-white transition-all duration-300 transform ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 z-40 transition-all duration-500 ease-in-out ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="relative bg-gradient-to-br from-white dark:from-gray-900 via-gray-50 dark:via-gray-800 to-white dark:to-gray-900 shadow-inner backdrop-blur-lg border-gray-200 dark:border-gray-700 border-b h-full">
          {/* Logo Background Watermark */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <Image
              src="/images/logo/mh-logo.png"
              alt=""
              fill
              className="opacity-5 dark:opacity-10 grayscale object-contain filter"
            />
          </div>

          {/* Menu Content */}
          <div className="z-10 relative flex flex-col px-4 sm:px-6 py-4 h-full">
            {/* Main Navigation Links */}
            <div className="flex flex-1 justify-center items-center">
              <div className="w-full max-w-sm sm:max-w-md">
                <div className="gap-3 grid grid-cols-2 sm:grid-cols-2">
                  {[
                    { href: "/", label: "Home", icon: "home" },
                    { href: "/about", label: "Our Story", icon: "info" },
                    { href: "/services", label: "Services", icon: "build" },
                    {
                      href: "/projects",
                      label: "Projects",
                      icon: "photo_library",
                    },
                    { href: "/team", label: "Our Team", icon: "people" },
                    { href: "/careers", label: "Careers", icon: "badge" },
                    {
                      href: "/contact",
                      label: "Contact",
                      icon: "contact_phone",
                    },
                    {
                      href: "/estimator",
                      label: "AI Estimator",
                      icon: "calculate",
                    },
                    {
                      href: "/government",
                      label: "Government",
                      icon: "account_balance",
                    },
                    {
                      href: "/trade-partners",
                      label: "Partners",
                      icon: "handshake",
                    },
                  ].map((item, index) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group flex flex-col items-center hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-sm px-4 py-6 rounded-xl font-medium text-gray-900 hover:text-brand-primary dark:hover:text-bronze-400 dark:text-gray-100 text-center transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <MaterialIcon
                        icon={item.icon}
                        size="md"
                        className="opacity-70 group-hover:opacity-100 mb-3 dark:group-hover:text-bronze-400 group-hover:text-brand-primary transition-all duration-300"
                      />
                      <div className="font-medium text-sm leading-tight">
                        {item.label}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="mb-4 text-center">
                <h4 className="font-medium text-gray-700 dark:text-gray-300 text-sm">
                  Follow Our Partnership Journey
                </h4>
              </div>
              <div className="flex justify-center gap-4">
                <a
                  href="https://facebook.com/mhconstruction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex justify-center items-center bg-gray-100 hover:bg-blue-600 dark:bg-gray-700 hover:shadow-lg p-3 rounded-xl hover:scale-105 transition-all duration-300"
                  title="Follow us on Facebook"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MaterialIcon
                    icon="thumb_up"
                    size="md"
                    className="text-gray-600 group-hover:text-white dark:text-gray-400 transition-colors"
                  />
                </a>
                <a
                  href="https://instagram.com/mhconstruction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex justify-center items-center bg-gray-100 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 dark:bg-gray-700 hover:shadow-lg p-3 rounded-xl hover:scale-105 transition-all duration-300"
                  title="See our projects on Instagram"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MaterialIcon
                    icon="photo_camera"
                    size="md"
                    className="text-gray-600 group-hover:text-white dark:text-gray-400 transition-colors"
                  />
                </a>
                <a
                  href="https://linkedin.com/company/mhconstruction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex justify-center items-center bg-gray-100 hover:bg-blue-700 dark:bg-gray-700 hover:shadow-lg p-3 rounded-xl hover:scale-105 transition-all duration-300"
                  title="Connect on LinkedIn"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MaterialIcon
                    icon="work"
                    size="md"
                    className="text-gray-600 group-hover:text-white dark:text-gray-400 transition-colors"
                  />
                </a>
                <a
                  href="https://youtube.com/@mhconstruction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex justify-center items-center bg-gray-100 hover:bg-red-600 dark:bg-gray-700 hover:shadow-lg p-3 rounded-xl hover:scale-105 transition-all duration-300"
                  title="Watch our videos on YouTube"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MaterialIcon
                    icon="play_circle"
                    size="md"
                    className="text-gray-600 group-hover:text-white dark:text-gray-400 transition-colors"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
