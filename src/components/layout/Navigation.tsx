"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "../ui/layout/ThemeToggle";
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
          className="z-[60] fixed inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300 cursor-pointer"
          onClick={() => setIsMenuOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setIsMenuOpen(false)}
          role="button"
          tabIndex={0}
          aria-label="Close menu"
        />
      )}

      {/* Main Header - Transparent and absolute positioning */}
      <header className="top-0 left-0 right-0 z-[65] absolute bg-transparent pointer-events-none">
        <div className="mx-auto px-2 xs:px-3 sm:px-4 lg:px-6 max-w-7xl">
          <div className="flex justify-center items-center py-2 xs:py-3 sm:py-4 md:py-5 h-auto relative">
            {/* Left spacer for symmetry */}
            <div className="absolute left-0 w-[44px] xs:w-[48px] sm:w-[56px] flex-shrink-0"></div>

            {/* Logo - Centered with mobile optimization */}
            <div className="flex-shrink-0 pointer-events-auto">
              <Link
                href="/"
                className="flex items-center hover:scale-105 transition-all duration-300 bg-gradient-to-r from-brand-primary/80 via-brand-primary/60 to-transparent px-3 xs:px-4 py-2 rounded-lg backdrop-blur-sm"
              >
                <Image
                  src="/images/logo/mh-logo.png"
                  alt="MH Construction"
                  width={141}
                  height={141}
                  priority
                  className="drop-shadow-lg w-auto h-[70px] xs:h-[77px] sm:h-[90px] md:h-[112px] lg:h-[141px]"
                />
              </Link>
            </div>

            {/* Right spacer for symmetry */}
            <div className="absolute right-0 w-[44px] xs:w-[48px] sm:w-[56px] flex-shrink-0"></div>
          </div>
        </div>
      </header>

      {/* Theme Toggle - Fixed left edge */}
      <div className="top-2 xs:top-3 sm:top-4 left-2 xs:left-3 sm:left-4 lg:left-6 z-[70] fixed flex items-center pointer-events-auto">
        <div className="relative bg-brand-primary hover:bg-brand-primary-dark shadow-lg hover:shadow-xl p-2 xs:p-2.5 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 touch-manipulation border-2 border-brand-secondary hover:border-brand-secondary-light outline outline-2 outline-offset-2 outline-brand-secondary/50 hover:outline-brand-secondary min-w-[40px] min-h-[40px] xs:min-w-[44px] xs:min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] flex items-center justify-center">
          <ThemeToggle compact size="sm" />
        </div>
      </div>

      {/* Hamburger Menu - Fixed right edge */}
      <div className="top-2 xs:top-3 sm:top-4 right-2 xs:right-3 sm:right-4 lg:right-6 z-[70] fixed flex items-center pointer-events-auto">
        {/* Hamburger Menu */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative bg-brand-primary hover:bg-brand-primary-dark shadow-lg hover:shadow-xl p-2 xs:p-2.5 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 touch-manipulation border-2 border-brand-secondary hover:border-brand-secondary-light outline outline-2 outline-offset-2 outline-brand-secondary/50 hover:outline-brand-secondary min-w-[40px] min-h-[40px] xs:min-w-[44px] xs:min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] flex items-center justify-center"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <div className="flex flex-col justify-center space-y-0.5 xs:space-y-1 w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6">
            <span
              className={`w-full h-0.5 bg-brand-secondary transition-all duration-300 transform ${
                isMenuOpen
                  ? "rotate-45 translate-y-[0.4rem] xs:translate-y-2"
                  : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-brand-secondary transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }
              `}
            />
            <span
              className={`w-full h-0.5 bg-brand-secondary transition-all duration-300 transform ${
                isMenuOpen
                  ? "-rotate-45 -translate-y-[0.4rem] xs:-translate-y-2"
                  : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 z-[65] transition-all duration-500 ease-in-out ${
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

          {/* Menu Content - No scroll, fits viewport */}
          <div className="z-10 relative flex flex-col justify-between px-3 sm:px-4 py-3 sm:py-4 h-full overflow-hidden">
            {/* Main Navigation Links - Compact grid */}
            <div className="flex-1 flex items-center justify-center min-h-0">
              <div className="w-full max-w-xs">
                <div className="gap-1.5 sm:gap-2 grid grid-cols-2">
                  {[
                    { href: "/", label: "Home", icon: "home" },
                    {
                      href: "/about",
                      label: "Our Oath",
                      icon: "military_tech",
                    },
                    { href: "/services", label: "Services", icon: "build" },
                    {
                      href: "/projects",
                      label: "Projects",
                      icon: "photo_library",
                    },
                    { href: "/team", label: "Team Six", icon: "groups" },
                    {
                      href: "/careers",
                      label: "Careers",
                      icon: "work",
                    },
                    {
                      href: "/contact",
                      label: "Contact",
                      icon: "contact_phone",
                    },
                    {
                      href: "/public-sector",
                      label: "Public Sector",
                      icon: "account_balance",
                    },
                    {
                      href: "/allies",
                      label: "Allies",
                      icon: "handshake",
                    },
                    {
                      href: "/veterans",
                      label: "Veterans",
                      icon: "workspace_premium",
                    },
                    {
                      href: "/urgent",
                      label: "Emergency",
                      icon: "engineering",
                    },
                    {
                      href: "/faq",
                      label: "FAQ",
                      icon: "help",
                    },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group flex flex-col items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 px-1.5 sm:px-2 py-2 sm:py-2.5 rounded-lg font-medium text-gray-900 hover:text-brand-primary dark:hover:text-bronze-400 dark:text-gray-100 text-center transition-all duration-300 touch-manipulation min-h-[56px] sm:min-h-[60px]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 mb-1">
                        <MaterialIcon
                          icon={item.icon}
                          size="sm"
                          className="opacity-70 group-hover:opacity-100 dark:group-hover:text-bronze-400 group-hover:text-brand-primary transition-all duration-300"
                          style={{ fontSize: "20px" }}
                        />
                      </div>
                      <span className="font-medium text-[10px] sm:text-[11px] leading-tight">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Social Media Links - Compact footer */}
            <div className="flex-shrink-0 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="mb-2 sm:mb-3 text-center">
                <h4 className="font-bold text-brand-secondary text-xs sm:text-sm uppercase tracking-wide">
                  Connect With Us
                </h4>
              </div>
              <div className="flex justify-center gap-2 sm:gap-2.5">
                <a
                  href="https://www.facebook.com/profile.php?id=61575511773974"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex justify-center items-center bg-gradient-to-br from-gray-700 to-gray-800 hover:from-[#1877F2] hover:via-[#42A5F5] hover:to-[#1565C0] p-2 sm:p-2.5 border-2 border-gray-600 hover:border-[#1877F2] rounded-lg hover:scale-110 transition-all duration-300 touch-manipulation shadow-md hover:shadow-[#1877F2]/40"
                  aria-label="Facebook"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MaterialIcon
                    icon="thumb_up"
                    size="md"
                    className="text-gray-400 group-hover:text-white transition-colors drop-shadow-lg group-hover:drop-shadow-[0_0_8px_rgba(24,119,242,0.8)]"
                  />
                </a>
                <a
                  href="https://www.instagram.com/mh_construction_inc/reels/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex justify-center items-center bg-gradient-to-br from-gray-700 to-gray-800 hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] p-2 sm:p-2.5 border-2 border-gray-600 hover:border-[#E4405F] rounded-lg hover:scale-110 transition-all duration-300 touch-manipulation shadow-md hover:shadow-[#E4405F]/40"
                  aria-label="Instagram"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MaterialIcon
                    icon="photo_camera"
                    size="md"
                    className="text-gray-400 group-hover:text-white transition-colors drop-shadow-lg group-hover:drop-shadow-[0_0_8px_rgba(228,64,95,0.8)]"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/company/mh-construction-general-contractor/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex justify-center items-center bg-gradient-to-br from-gray-700 to-gray-800 hover:from-[#0A66C2] hover:via-[#0E76A8] hover:to-[#004182] p-2 sm:p-2.5 border-2 border-gray-600 hover:border-[#0A66C2] rounded-lg hover:scale-110 transition-all duration-300 touch-manipulation shadow-md hover:shadow-[#0A66C2]/40"
                  aria-label="LinkedIn"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MaterialIcon
                    icon="work"
                    size="md"
                    className="text-gray-400 group-hover:text-white transition-colors drop-shadow-lg group-hover:drop-shadow-[0_0_8px_rgba(10,102,194,0.8)]"
                  />
                </a>
                <a
                  href="https://x.com/mhc_gc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex justify-center items-center bg-gradient-to-br from-gray-700 to-gray-800 hover:from-[#000000] hover:via-[#1D9BF0] hover:to-[#000000] p-2 sm:p-2.5 border-2 border-gray-600 hover:border-[#1D9BF0] rounded-lg hover:scale-110 transition-all duration-300 touch-manipulation shadow-md hover:shadow-black/40"
                  aria-label="X (Twitter)"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MaterialIcon
                    icon="close"
                    size="md"
                    className="text-gray-400 group-hover:text-white transition-colors drop-shadow-lg group-hover:drop-shadow-[0_0_8px_rgba(29,155,240,0.8)]"
                  />
                </a>
                <a
                  href="https://youtube.com/@mhc-gc?si=RGnloxP4NgV4Dm_j"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex justify-center items-center bg-gradient-to-br from-gray-700 to-gray-800 hover:from-[#FF0000] hover:via-[#FF4444] hover:to-[#CC0000] p-2 sm:p-2.5 border-2 border-gray-600 hover:border-[#FF0000] rounded-lg hover:scale-110 transition-all duration-300 touch-manipulation shadow-md hover:shadow-[#FF0000]/40"
                  aria-label="YouTube"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MaterialIcon
                    icon="play_circle"
                    size="md"
                    className="text-gray-400 group-hover:text-white transition-colors drop-shadow-lg group-hover:drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]"
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
