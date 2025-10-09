"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { ThemeToggle } from "../ui/ThemeToggle";
import { MaterialIcon } from "../icons/MaterialIcon";
import { QuickBookingModal } from "../ui/QuickBookingModal";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isQuickBookingOpen, setIsQuickBookingOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(false);
  };

  if (!mounted) {
    return null; // Prevent hydration issues
  }

  return (
    <>
      {/* Backdrop overlay when menu is open */}
      {isMenuOpen && (
        <div
          className="z-40 fixed inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300 cursor-pointer pointer-events-auto"
          onClick={handleMenuClose}
        />
      )}

      {/* Main Header - Transparent and absolute, does not scroll. Only hamburger menu scrolls. */}
      <header
        className="top-0 right-0 left-0 z-40 absolute bg-transparent transition-all duration-300"
        style={{ background: "transparent", boxShadow: "none" }}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex justify-center items-center py-2 h-20 sm:h-24">
            {/* Logo - Centered on all screens */}
            <div className="flex-shrink-0 py-2 sm:py-3">
              <Link
                href="/"
                className="group relative flex items-center hover:scale-105 transition-all duration-300"
              >
                <Image
                  src="/images/logo/mh-logo.png"
                  alt="MH Construction"
                  width={88}
                  height={88}
                  priority
                  className="z-10 relative drop-shadow-lg w-auto h-[70.4px] sm:h-[88px] filter"
                />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Theme Toggle - Always visible on all screens */}
      <div className="top-4 left-4 z-50 fixed pointer-events-auto">
        <ThemeToggle compact size="sm" />
      </div>

      {/* Floating Hamburger Menu - Always visible on all screens */}
      <div className="top-4 right-4 z-50 fixed pointer-events-auto">
        <button
          onClick={handleMenuToggle}
          className={`relative bg-gradient-to-r from-[#386851] hover:from-[#2d5440] to-[#4a7c59] hover:to-[#3c6448] shadow-lg hover:shadow-xl p-2.5 sm:p-3 rounded-xl focus:outline-none focus:ring-[#386851]/50 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 antialiased transform-gpu transition-all duration-300 pointer-events-auto cursor-pointer ${
            scrolled ? "scale-90" : "scale-100"
          }`}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          type="button"
        >
          <div className="flex flex-col justify-center space-y-1 w-5 sm:w-6 h-5 sm:h-6">
            <span
              className={`w-full h-0.5 bg-white transition-all duration-300 ease-in-out transform origin-center ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
              }`}
            />
            <span
              className={`w-full h-0.5 bg-white transition-all duration-300 ease-in-out transform origin-center ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>

          {/* Ripple effect on hover */}
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 rounded-xl scale-0 group-hover:scale-110 transition-all duration-300" />
        </button>
      </div>

      {/* Enhanced Mobile Menu with Animation */}
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 z-40 overflow-hidden transition-all duration-500 ease-in-out ${
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
          <div className="z-10 relative flex flex-col justify-center px-4 sm:px-6 py-2 sm:py-4 h-full">
            {/* Navigation Links - Adaptive Grid System */}
            <div className="flex flex-1 justify-center items-center">
              <div className="w-full max-w-sm sm:max-w-md">
                {/* Small screens: 3 columns, 4 rows (more compact) */}
                {/* Medium+ screens: 2 columns, 5 rows (current layout) */}
                <div className="gap-1.5 sm:gap-3 grid grid-cols-3 sm:grid-cols-2">
                  {[
                    {
                      href: "/booking",
                      label: "Book Appt.",
                      icon: "event",
                    },
                    {
                      href: "/estimator",
                      label: "AI Estimator",
                      icon: "calculate",
                    },
                    {
                      href: "/",
                      label: "Home",
                      icon: "home",
                    },
                    {
                      href: "/about",
                      label: "About",
                      icon: "info",
                    },
                    {
                      href: "/services",
                      label: "Services",
                      icon: "build",
                    },
                    {
                      href: "/team",
                      label: "Team",
                      icon: "groups",
                    },
                    {
                      href: "/projects",
                      label: "Projects",
                      icon: "photo_library",
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
                  ].map((item, index) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group flex flex-col items-center hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-sm px-1.5 sm:px-4 py-3 sm:py-6 rounded-lg sm:rounded-xl font-medium text-gray-900 hover:text-[#386851] dark:hover:text-[#4a7c59] dark:text-gray-100 text-center transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <MaterialIcon
                        icon={item.icon}
                        size="sm"
                        className="opacity-70 group-hover:opacity-100 mb-1.5 sm:mb-3 dark:group-hover:text-[#4a7c59] group-hover:text-[#386851] transition-all duration-300"
                      />
                      <div className="text-center">
                        <div className="font-medium text-xs sm:text-sm leading-tight">
                          {item.label}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Booking Modal */}
      <QuickBookingModal
        isOpen={isQuickBookingOpen}
        onClose={() => setIsQuickBookingOpen(false)}
      />
    </>
  );
}
