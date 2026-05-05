"use client";

/**
 * Pitch Deck CTA Component
 * Strategic call-to-action to request the company pitch deck via the contact form.
 * Variants: banner, card, inline
 */

import { useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { useAnalytics } from "@/components/analytics/EnhancedAnalytics";

interface PitchDeckCTAProps {
  variant?: "banner" | "card" | "inline";
  className?: string;
}

/** Contact page URL pre-filled with pitch deck request subject */
const PITCH_DECK_HREF = "/contact?subject=pitch-deck";

export function PitchDeckCTA({
  variant = "card",
  className = "",
}: PitchDeckCTAProps) {
  const { trackEvent } = useAnalytics();

  const handleClick = useCallback(() => {
    trackEvent("pitch_deck_click", { variant });
  }, [trackEvent, variant]);

  if (variant === "banner") {
    return (
      <div
        className={`bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary py-4 px-4 sm:px-6 ${className}`}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <MaterialIcon
                icon="picture_as_pdf"
                size="lg"
                className="text-white"
              />
            </div>
            <div className="text-white">
              <p className="font-bold text-lg">Request Our Pitch Deck</p>
              <p className="text-sm text-white/90">
                Complete overview of our capabilities &amp; track record
              </p>
            </div>
          </div>
          <Link href={PITCH_DECK_HREF}>
            <Button
              variant="secondary"
              size="lg"
              onClick={handleClick}
              aria-label="Request MH Construction pitch deck"
            >
              <MaterialIcon icon="request_page" size="md" className="mr-2" />
              Request Deck
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div
        className={`flex items-center gap-4 p-4 bg-brand-primary/10 dark:bg-brand-primary/20 border-2 border-brand-primary/30 rounded-xl ${className}`}
      >
        <div className="flex-shrink-0 bg-gradient-to-br from-brand-primary to-brand-primary-dark p-3 rounded-lg">
          <MaterialIcon
            icon="picture_as_pdf"
            size="lg"
            className="text-white"
          />
        </div>
        <div className="flex-grow">
          <p className="font-bold text-gray-900 dark:text-white text-sm mb-1">
            Want more details?
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-300">
            Our pitch deck covers everything you need to know
          </p>
        </div>
        <Link href={PITCH_DECK_HREF} className="flex-shrink-0">
          <Button
            variant="primary"
            size="sm"
            onClick={handleClick}
            aria-label="Request MH Construction pitch deck"
          >
            <MaterialIcon icon="request_page" size="sm" className="mr-1" />
            Request
          </Button>
        </Link>
      </div>
    );
  }

  // Card variant (default)
  return (
    <div
      className={`group bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-2xl hover:shadow-3xl p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full ${className}`}
    >
      <div className="flex justify-center mb-6">
        <div className="rounded-xl bg-gradient-to-br from-brand-primary to-brand-primary-dark p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
          <MaterialIcon
            icon="picture_as_pdf"
            size="xl"
            className="text-white"
          />
        </div>
      </div>
      <h3 className="mb-4 font-bold text-2xl text-center text-gray-900 dark:text-white leading-tight">
        MH Construction Pitch Deck
      </h3>
      <p className="mb-6 text-center text-gray-600 text-base dark:text-gray-300 leading-relaxed">
        Request our pitch deck to explore our capabilities, values, and 650+
        project track record — we'll send it directly to you.
      </p>
      <ul className="space-y-2 mb-6 text-gray-600 text-sm dark:text-gray-300 flex-grow">
        <li className="flex items-center gap-2">
          <MaterialIcon
            icon="check_circle"
            size="sm"
            className="text-brand-primary flex-shrink-0"
          />
          <span>Complete company overview</span>
        </li>
        <li className="flex items-center gap-2">
          <MaterialIcon
            icon="check_circle"
            size="sm"
            className="text-brand-primary flex-shrink-0"
          />
          <span>Services & capabilities breakdown</span>
        </li>
        <li className="flex items-center gap-2">
          <MaterialIcon
            icon="check_circle"
            size="sm"
            className="text-brand-primary flex-shrink-0"
          />
          <span>Project portfolio highlights</span>
        </li>
      </ul>
      <Link href={PITCH_DECK_HREF} className="block">
        <Button
          variant="primary"
          size="lg"
          className="w-full group/btn"
          onClick={handleClick}
          aria-label="Request MH Construction pitch deck"
        >
          <MaterialIcon
            icon="request_page"
            size="lg"
            className="mr-2 group-hover/btn:scale-110 transition-transform"
          />
          Request Pitch Deck
        </Button>
      </Link>
    </div>
  );
}
