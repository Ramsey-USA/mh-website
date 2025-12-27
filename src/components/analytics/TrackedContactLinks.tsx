/**
 * Tracked Contact Links
 *
 * Pre-configured components for tracking phone and email link clicks.
 * Use these instead of raw <a> tags for contact info to ensure analytics.
 */

"use client";

import { useClickTracking } from "@/lib/analytics/hooks";
import { COMPANY_INFO } from "@/lib/constants/company";
import { type ReactNode } from "react";

interface TrackedPhoneLinkProps {
  children: ReactNode;
  className?: string;
  trackId?: string;
  trackProperties?: Record<string, unknown>;
}

/**
 * Phone link with automatic click tracking
 *
 * @example
 * <TrackedPhoneLink trackId="header-phone">
 *   (509) 308-6489
 * </TrackedPhoneLink>
 */
export function TrackedPhoneLink({
  children,
  className,
  trackId = "phone-click",
  trackProperties,
}: TrackedPhoneLinkProps) {
  const trackClick = useClickTracking();

  const handleClick = () => {
    trackClick(trackId, {
      contactType: "phone",
      phoneNumber: COMPANY_INFO.phone.display,
      ...trackProperties,
    });
  };

  return (
    <a
      href={`tel:${COMPANY_INFO.phone.tel}`}
      onClick={handleClick}
      className={className}
      aria-label={`Call us at ${COMPANY_INFO.phone.display}`}
    >
      {children}
    </a>
  );
}

interface TrackedEmailLinkProps {
  children: ReactNode;
  className?: string;
  trackId?: string;
  trackProperties?: Record<string, unknown>;
}

/**
 * Email link with automatic click tracking
 *
 * @example
 * <TrackedEmailLink trackId="footer-email">
 *   office@mhc-gc.com
 * </TrackedEmailLink>
 */
export function TrackedEmailLink({
  children,
  className,
  trackId = "email-click",
  trackProperties,
}: TrackedEmailLinkProps) {
  const trackClick = useClickTracking();

  const handleClick = () => {
    trackClick(trackId, {
      contactType: "email",
      emailAddress: COMPANY_INFO.email,
      ...trackProperties,
    });
  };

  return (
    <a
      href={`mailto:${COMPANY_INFO.email}`}
      onClick={handleClick}
      className={className}
      aria-label={`Email us at ${COMPANY_INFO.email}`}
    >
      {children}
    </a>
  );
}

interface TrackedLocationLinkProps {
  children: ReactNode;
  className?: string;
  trackId?: string;
  trackProperties?: Record<string, unknown>;
}

/**
 * Address link (opens Google Maps) with automatic click tracking
 *
 * @example
 * <TrackedLocationLink trackId="footer-address">
 *   3111 N. Capitol Ave., Pasco, WA
 * </TrackedLocationLink>
 */
export function TrackedLocationLink({
  children,
  className,
  trackId = "address-click",
  trackProperties,
}: TrackedLocationLinkProps) {
  const trackClick = useClickTracking();

  const handleClick = () => {
    trackClick(trackId, {
      contactType: "address",
      action: "maps",
      ...trackProperties,
    });
  };

  // Create Google Maps URL from address
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${COMPANY_INFO.address.street}, ${COMPANY_INFO.address.city}, ${COMPANY_INFO.address.state} ${COMPANY_INFO.address.zip}`,
  )}`;

  return (
    <a
      href={mapsUrl}
      onClick={handleClick}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open address in Google Maps"
    >
      {children}
    </a>
  );
}
