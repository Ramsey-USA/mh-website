"use client";

import { useState } from "react";
import Image from "next/image";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  VendorPlatformLink,
  type VendorPlatform,
} from "@/components/allies/VendorPlatformLink";
import { cn } from "@/lib/utils";

// ── Types ────────────────────────────────────────────────────────────────────

type VendorLink = { label: string; href: string; platform: VendorPlatform };
type VendorBrandColors = { primary: string; secondary?: string };

export interface CarouselVendor {
  name: string;
  role: string;
  icon: string;
  accentColor: string;
  description: string;
  highlights: string[];
  portfolio: string[];
  logo: string;
  brandColors: VendorBrandColors | null;
  address: string;
  phone?: string;
  email?: string;
  links: VendorLink[];
}

interface TradeGroupCarouselProps {
  vendors: CarouselVendor[];
  /** Whether the logo panel appears on the left (even-indexed groups) or right (odd-indexed groups). */
  logoSide: "left" | "right";
}

// ── Component ────────────────────────────────────────────────────────────────

export function TradeGroupCarousel({
  vendors,
  logoSide,
}: TradeGroupCarouselProps) {
  const [current, setCurrent] = useState(0);

  const vendor = vendors[current];
  if (!vendor) return null;

  const total = vendors.length;
  const prev = () => setCurrent((c: number) => (c === 0 ? total - 1 : c - 1));
  const next = () => setCurrent((c: number) => (c + 1) % total);

  // ── Logo / identity panel ────────────────────────────────────────────────
  const logoPanel = (
    <div
      className="flex flex-col items-center justify-center gap-4 p-6 sm:p-8 md:w-2/5 flex-shrink-0"
      style={
        vendor.brandColors
          ? {
              background: `linear-gradient(160deg, ${vendor.brandColors.primary}14, transparent 75%)`,
            }
          : undefined
      }
    >
      {/* Logo or icon fallback */}
      <div
        className="relative flex items-center justify-center rounded-2xl w-44 h-44 border-4 bg-white shadow-xl overflow-hidden"
        style={
          vendor.brandColors
            ? { borderColor: `${vendor.brandColors.primary}60` }
            : { borderColor: "#e5e7eb" }
        }
      >
        {vendor.logo ? (
          <Image
            src={vendor.logo}
            alt={`${vendor.name} logo`}
            fill
            sizes="176px"
            className="object-contain p-4"
          />
        ) : (
          <div
            className={cn(
              "w-full h-full flex items-center justify-center",
              !vendor.brandColors && `bg-gradient-to-br ${vendor.accentColor}`,
            )}
            style={
              vendor.brandColors
                ? {
                    backgroundImage: `linear-gradient(135deg, ${vendor.brandColors.primary}, ${vendor.brandColors.secondary ?? vendor.brandColors.primary})`,
                  }
                : undefined
            }
          >
            <MaterialIcon
              icon={vendor.icon}
              size="4xl"
              className="text-white drop-shadow-lg"
              ariaLabel={vendor.name}
            />
          </div>
        )}
      </div>

      {/* Role badge */}
      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs font-bold uppercase tracking-wider bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary dark:text-brand-primary-light border-brand-primary/30">
        <MaterialIcon
          icon="verified"
          size="sm"
          ariaLabel="Active partner"
          className="text-current"
        />
        {vendor.role}
      </div>

      {/* Company name */}
      <h3 className="font-black text-gray-900 dark:text-white text-xl text-center leading-tight">
        {vendor.name}
      </h3>

      {/* Phone */}
      {vendor.phone && (
        <a
          href={`tel:${vendor.phone.replaceAll(/[^0-9+]/g, "")}`}
          className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300 font-medium hover:text-brand-primary dark:hover:text-brand-primary-light transition-colors"
        >
          <MaterialIcon
            icon="call"
            size="sm"
            ariaLabel="Phone"
            className="text-gray-400"
          />
          {vendor.phone}
        </a>
      )}
    </div>
  );

  // ── Info / services panel ────────────────────────────────────────────────
  const infoPanel = (
    <div className="flex flex-col gap-4 p-6 sm:p-8 flex-1 min-w-0 border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-700">
      {/* Description */}
      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
        {vendor.description}
      </p>

      {/* Top highlights — up to 6 items in a 2-col grid */}
      {vendor.highlights.length > 0 && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-4">
          {vendor.highlights.slice(0, 6).map((h) => (
            <li
              key={h}
              className="flex items-start gap-1.5 text-sm text-gray-700 dark:text-gray-300"
            >
              <MaterialIcon
                icon="check_circle"
                size="sm"
                ariaLabel=""
                className="text-brand-primary dark:text-brand-primary-light flex-shrink-0 mt-0.5"
              />
              {h}
            </li>
          ))}
        </ul>
      )}

      {/* Address + email */}
      <div className="flex flex-col gap-1.5 text-xs text-gray-600 dark:text-gray-400">
        {vendor.address && (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(vendor.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-brand-primary transition-colors"
          >
            <MaterialIcon
              icon="location_on"
              size="sm"
              ariaLabel="Address"
              className="text-gray-400 flex-shrink-0"
            />
            {vendor.address}
          </a>
        )}
        {vendor.email && (
          <a
            href={`mailto:${vendor.email}`}
            className="flex items-center gap-1.5 hover:text-brand-primary transition-colors"
          >
            <MaterialIcon
              icon="mail"
              size="sm"
              ariaLabel="Email"
              className="text-gray-400 flex-shrink-0"
            />
            {vendor.email}
          </a>
        )}
      </div>

      {/* Platform links */}
      {vendor.links.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
            Connect:
          </span>
          {vendor.links.map((link) => (
            <VendorPlatformLink
              key={link.href}
              href={link.href}
              label={link.label}
              platform={link.platform}
            />
          ))}
        </div>
      )}

      {/* Our Work Together (portfolio) */}
      {vendor.portfolio.length > 0 && (
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
            Our Work Together
          </h4>
          <ul className="flex flex-wrap gap-1.5">
            {vendor.portfolio.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-xs text-gray-700 dark:text-gray-300"
              >
                <MaterialIcon
                  icon="arrow_right"
                  size="sm"
                  ariaLabel=""
                  className="text-brand-primary flex-shrink-0"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <div>
      {/* ── Slide ─────────────────────────────────────────────────────── */}
      <div
        className="relative rounded-2xl border-2 overflow-hidden bg-white dark:bg-gray-800 shadow-lg"
        style={
          vendor.brandColors
            ? { borderColor: `${vendor.brandColors.primary}40` }
            : { borderColor: "#e5e7eb" }
        }
      >
        {/* Brand accent bar */}
        <div
          className={cn(
            "h-1.5 w-full flex-shrink-0",
            !vendor.brandColors && `bg-gradient-to-r ${vendor.accentColor}`,
          )}
          style={
            vendor.brandColors
              ? {
                  backgroundImage: `linear-gradient(to right, ${vendor.brandColors.primary}, ${vendor.brandColors.secondary ?? vendor.brandColors.primary})`,
                }
              : undefined
          }
        />

        {/* Two-panel layout: order depends on logoSide */}
        <div className="flex flex-col md:flex-row">
          {logoSide === "left" ? (
            <>
              {logoPanel}
              {infoPanel}
            </>
          ) : (
            <>
              {infoPanel}
              {logoPanel}
            </>
          )}
        </div>
      </div>

      {/* ── Navigation (only shown when >1 vendor in trade) ───────────── */}
      {total > 1 && (
        <>
          <div
            className="flex items-center justify-center gap-3 mt-5"
            role="group"
            aria-label={`${vendor.name} group navigation`}
          >
            <button
              onClick={prev}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow hover:bg-gray-50 dark:hover:bg-gray-600 transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary"
              aria-label="Previous partner"
            >
              <MaterialIcon
                icon="chevron_left"
                size="sm"
                ariaLabel=""
                className="text-gray-700 dark:text-white"
              />
            </button>

            {/* Dot indicators */}
            {vendors.map((v, i) => (
              <button
                key={v.name}
                onClick={() => setCurrent(i)}
                className={cn(
                  "rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-primary",
                  i === current
                    ? "w-8 h-2.5 bg-brand-primary"
                    : "w-2.5 h-2.5 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500",
                )}
                aria-label={`View ${v.name}`}
                aria-current={i === current ? "true" : undefined}
              />
            ))}

            <button
              onClick={next}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow hover:bg-gray-50 dark:hover:bg-gray-600 transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary"
              aria-label="Next partner"
            >
              <MaterialIcon
                icon="chevron_right"
                size="sm"
                ariaLabel=""
                className="text-gray-700 dark:text-white"
              />
            </button>
          </div>

          <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-2 font-medium">
            {current + 1} / {total}
          </p>
        </>
      )}
    </div>
  );
}
