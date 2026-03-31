"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { AdminSignInModal } from "@/components/ui/modals/AdminSignInModal";
import {
  TrackedPhoneLink,
  TrackedEmailLink,
  TrackedLocationLink,
} from "@/components/analytics/TrackedContactLinks";
import { COMPANY_INFO } from "@/lib/constants/company";
import { trackFormSubmit } from "@/lib/analytics/tracking";

type FooterNavItem = {
  href: string;
  icon: string;
  label: string;
  sub: string;
};

type SocialLinkItem = {
  href: string;
  icon: string;
  ariaLabel: string;
  title: string;
  hoverClassName: string;
  shadowClassName: string;
  iconGlowClassName: string;
};

type LicenseDetail = {
  state: string;
  label: string;
  number: string;
};

const navCol1Links: FooterNavItem[] = [
  { href: "/", icon: "home", label: "Home", sub: "Base HQ" },
  { href: "/contact", icon: "handshake", label: "Contact", sub: "Rally Point" },
  {
    href: "/services",
    icon: "construction",
    label: "Services",
    sub: "Operations",
  },
  {
    href: "/projects",
    icon: "photo_library",
    label: "Projects",
    sub: "Missions",
  },
  {
    href: "/services",
    icon: "fact_check",
    label: "Inspections",
    sub: "Quality Assurance",
  },
  { href: "/faq", icon: "help", label: "Help/FAQ", sub: "Intel Brief" },
  {
    href: "/services",
    icon: "home_repair_service",
    label: "Maintenance",
    sub: "Field Service",
  },
];

const navCol2Links: FooterNavItem[] = [
  { href: "/about", icon: "foundation", label: "About Us", sub: "Our Oath" },
  { href: "/team", icon: "people", label: "Our Team", sub: "Chain of Command" },
  { href: "/allies", icon: "group", label: "Partners", sub: "Allies" },
  {
    href: "/public-sector",
    icon: "account_balance",
    label: "Government",
    sub: "Public Sector",
  },
  {
    href: "/veterans",
    icon: "military_tech",
    label: "Veterans",
    sub: "Service First",
  },
  { href: "/careers", icon: "handshake", label: "Careers", sub: "Enlist" },
  {
    href: "/testimonials",
    icon: "verified",
    label: "Reviews",
    sub: "Commendations",
  },
  {
    href: "/about",
    icon: "verified_user",
    label: "Safety",
    sub: "Force Protection",
  },
];

const linkedCities = [
  { href: "/locations/pasco", name: "Pasco" },
  { href: "/locations/kennewick", name: "Kennewick" },
  { href: "/locations/richland", name: "Richland" },
  { href: "/locations/west-richland", name: "West Richland" },
  { href: "/locations/spokane", name: "Spokane" },
  { href: "/locations/yakima", name: "Yakima" },
  { href: "/locations/walla-walla", name: "Walla Walla" },
  { href: "/locations/hermiston", name: "Hermiston" },
  { href: "/locations/pendleton", name: "Pendleton" },
  { href: "/locations/coeur-d-alene", name: "Coeur d'Alene" },
  { href: "/locations/omak", name: "Omak" },
];

const regionalAreas = [
  "Eastern Washington",
  "Eastern Oregon",
  "Southern Idaho",
];

const areaItemClass =
  "bg-gray-700/50 dark:bg-gray-600/50 hover:bg-brand-primary/20 dark:hover:bg-brand-primary/20 px-3 xs:px-4 py-2 rounded-lg text-gray-300 dark:text-gray-200 text-xs xs:text-sm transition-all duration-300 hover:scale-105 border border-gray-600/50 dark:border-gray-500/50 font-medium";

const socialLinkBaseClass =
  "group flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-gray-600 bg-gradient-to-br from-gray-700 to-gray-800 p-2.5 shadow-md transition-all duration-300 touch-manipulation hover:scale-105 dark:border-gray-500 dark:from-gray-600 dark:to-gray-700";

const primaryActionCardClassName =
  "group flex items-center gap-3 rounded-lg border border-brand-primary/30 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 p-3 transition-all duration-300 hover:scale-105 hover:border-brand-primary hover:from-brand-primary/20 hover:to-brand-secondary/20 touch-manipulation";

const secondaryActionCardClassName =
  "group flex items-center gap-3 rounded-lg border border-brand-secondary/40 bg-gradient-to-r from-brand-secondary/15 to-brand-primary/15 p-3 transition-all duration-300 hover:scale-105 hover:border-brand-secondary hover:from-brand-secondary/25 hover:to-brand-primary/25 touch-manipulation";

const footerBadgeBaseClassName =
  "flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-semibold transition-all duration-300 touch-manipulation hover:scale-105";

const socialLinks: SocialLinkItem[] = [
  {
    href: COMPANY_INFO.social.facebook,
    icon: "thumb_up",
    ariaLabel:
      "Follow MH Construction on Facebook for project updates and partnership stories",
    title: "Follow our partnership stories on Facebook",
    hoverClassName:
      "hover:border-[#1877F2] hover:from-[#1877F2] hover:via-[#42A5F5] hover:to-[#1565C0]",
    shadowClassName: "hover:shadow-[#1877F2]/40",
    iconGlowClassName: "group-hover:drop-shadow-[0_0_8px_rgba(24,119,242,0.8)]",
  },
  {
    href: COMPANY_INFO.social.instagram,
    icon: "photo_camera",
    ariaLabel: "View MH Construction project photos and reels on Instagram",
    title: "See partnership projects on Instagram",
    hoverClassName:
      "hover:border-[#E4405F] hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737]",
    shadowClassName: "hover:shadow-[#E4405F]/40",
    iconGlowClassName: "group-hover:drop-shadow-[0_0_8px_rgba(228,64,95,0.8)]",
  },
  {
    href: COMPANY_INFO.social.twitter,
    icon: "alternate_email",
    ariaLabel:
      "Follow MH Construction on X (formerly Twitter) for construction industry updates",
    title: "Follow partnership updates on X (Twitter)",
    hoverClassName:
      "hover:border-[#1D9BF0] hover:from-[#000000] hover:via-[#1D9BF0] hover:to-[#000000]",
    shadowClassName: "hover:shadow-black/40",
    iconGlowClassName: "group-hover:drop-shadow-[0_0_8px_rgba(29,155,240,0.8)]",
  },
  {
    href: COMPANY_INFO.social.youtube,
    icon: "smart_display",
    ariaLabel:
      "Watch MH Construction project videos and success stories on YouTube",
    title: "Watch partnership success stories on YouTube",
    hoverClassName:
      "hover:border-[#FF0000] hover:from-[#FF0000] hover:via-[#FF4444] hover:to-[#CC0000]",
    shadowClassName: "hover:shadow-[#FF0000]/40",
    iconGlowClassName: "group-hover:drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]",
  },
  {
    href: COMPANY_INFO.social.linkedin,
    icon: "business_center",
    ariaLabel:
      "Connect with MH Construction on LinkedIn for professional networking and industry insights",
    title: "Connect with our partnership team on LinkedIn",
    hoverClassName:
      "hover:border-[#0A66C2] hover:from-[#0A66C2] hover:via-[#0E76A8] hover:to-[#004182]",
    shadowClassName: "hover:shadow-[#0A66C2]/40",
    iconGlowClassName: "group-hover:drop-shadow-[0_0_8px_rgba(10,102,194,0.8)]",
  },
];

const licenseDetails: LicenseDetail[] = [
  {
    state: "WA",
    label: "Washington License",
    number: "MHCONCI907R7",
  },
  {
    state: "OR",
    label: "Oregon License",
    number: "765043-99",
  },
  {
    state: "ID",
    label: "Idaho License",
    number: "RCE-49250",
  },
];

function FooterNavLink({
  href,
  icon,
  label,
  sub,
}: {
  href: string;
  icon: string;
  label: string;
  sub: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center space-x-2 text-gray-300 hover:text-brand-primary dark:text-gray-200 text-sm xs:text-base transition-all hover:translate-x-1 duration-300 touch-manipulation"
    >
      <MaterialIcon
        icon={icon}
        size="sm"
        className="text-gray-600 dark:text-gray-300 group-hover:text-brand-primary transition-colors"
      />
      <span className="flex flex-col">
        <span>{label}</span>
        <span className="text-[9px] text-brand-secondary opacity-75">
          {sub}
        </span>
      </span>
      <MaterialIcon
        icon="arrow_forward"
        size="sm"
        className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
      />
    </Link>
  );
}

function SocialLink({
  href,
  icon,
  ariaLabel,
  title,
  hoverClassName,
  shadowClassName,
  iconGlowClassName,
}: SocialLinkItem) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${socialLinkBaseClass} ${hoverClassName} ${shadowClassName}`}
      aria-label={ariaLabel}
      title={title}
      itemProp="sameAs"
    >
      <MaterialIcon
        icon={icon}
        size="md"
        className={`text-gray-600 transition-colors drop-shadow-lg group-hover:text-white dark:text-gray-300 ${iconGlowClassName}`}
      />
    </a>
  );
}

function FooterActionCardContent({
  icon,
  eyebrow,
  body,
  accent = "primary",
}: {
  icon: string;
  eyebrow: string;
  body: ReactNode;
  accent?: "primary" | "secondary";
}) {
  const accentClasses =
    accent === "secondary"
      ? {
          iconWrapper: "bg-brand-secondary text-gray-900 group-hover:scale-110",
          eyebrow: "text-brand-secondary",
          arrow: "text-brand-secondary",
        }
      : {
          iconWrapper: "bg-brand-primary text-white group-hover:scale-110",
          eyebrow: "text-brand-secondary",
          arrow: "text-brand-primary",
        };

  return (
    <>
      <div
        className={`flex flex-shrink-0 items-center justify-center rounded-lg p-2 transition-transform ${accentClasses.iconWrapper}`}
      >
        <MaterialIcon icon={icon} size="md" />
      </div>
      <div className="min-w-0 flex-grow">
        <div
          className={`${accentClasses.eyebrow} mb-0.5 text-xs font-bold uppercase tracking-wide`}
        >
          {eyebrow}
        </div>
        {body}
      </div>
      <MaterialIcon
        icon="arrow_forward"
        size="sm"
        className={`${accentClasses.arrow} flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100`}
      />
    </>
  );
}

function FooterBadge({
  icon,
  label,
  emphasis = false,
}: {
  icon: string;
  label: string;
  emphasis?: boolean;
}) {
  const className = emphasis
    ? "border-brand-primary/40 bg-gradient-to-r from-brand-primary/15 to-brand-secondary/15 text-brand-secondary hover:border-brand-secondary/60 hover:from-brand-primary/25 hover:to-brand-secondary/25 dark:border-brand-primary/50 dark:from-brand-primary/20 dark:to-brand-secondary/20 dark:text-brand-secondary-light dark:hover:border-brand-secondary/70 dark:hover:from-brand-primary/30 dark:hover:to-brand-secondary/30"
    : "border-brand-primary/20 bg-brand-primary/5 text-gray-300 hover:border-brand-primary/40 hover:bg-brand-primary/15 dark:border-brand-primary/30 dark:bg-brand-primary/10 dark:text-gray-200 dark:hover:border-brand-primary/50 dark:hover:bg-brand-primary/20";

  const iconClassName = emphasis
    ? "text-brand-secondary group-hover:scale-110 dark:text-brand-secondary-light"
    : "text-brand-secondary dark:text-brand-secondary-light";

  const textClassName = emphasis
    ? "text-brand-secondary dark:text-brand-secondary-light"
    : "text-gray-300 dark:text-gray-200";

  return (
    <div className={`group ${footerBadgeBaseClassName} ${className}`}>
      <MaterialIcon
        icon={icon}
        size="sm"
        className={`${iconClassName} transition-all duration-300`}
      />
      <span className={`${textClassName} transition-colors duration-300`}>
        {label}
      </span>
    </div>
  );
}

function LicenseBadge() {
  return (
    <div className="rounded-lg border border-brand-primary/20 bg-brand-primary/5 px-3 py-2 text-sm transition-all duration-300 hover:border-brand-primary/40 hover:bg-brand-primary/15 dark:border-brand-primary/30 dark:bg-brand-primary/10 dark:hover:border-brand-primary/50 dark:hover:bg-brand-primary/20">
      <div className="mb-1.5 flex items-center justify-center gap-1.5">
        <MaterialIcon
          icon="verified"
          size="sm"
          className="text-brand-secondary dark:text-brand-secondary-light"
        />
        <span className="font-semibold text-gray-300 dark:text-gray-200">
          Licensed
        </span>
      </div>
      <dl className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm">
        {licenseDetails.map((license) => (
          <div key={license.state} className="flex items-center gap-1">
            <dt className="font-bold text-brand-secondary dark:text-brand-secondary-light">
              {license.state}
            </dt>
            <dd className="text-gray-300 dark:text-gray-200">
              <span className="sr-only">{license.label}: </span>
              {license.number}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function Footer() {
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [newsletterMessage, setNewsletterMessage] = useState("");

  useEffect(() => {
    const handleAdminShortcut = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        event.key.toLowerCase() === "a"
      ) {
        event.preventDefault();
        setShowAdminModal(true);
      }
    };

    window.addEventListener("keydown", handleAdminShortcut);

    return () => {
      window.removeEventListener("keydown", handleAdminShortcut);
    };
  }, []);

  useEffect(() => {
    if (newsletterStatus !== "success" && newsletterStatus !== "error") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setNewsletterStatus("idle");
      setNewsletterMessage("");
    }, 5000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [newsletterStatus]);

  const handleNewsletterSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = newsletterEmail.trim();
    if (!normalizedEmail) {
      return;
    }

    setNewsletterStatus("submitting");
    setNewsletterMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      if (response.ok) {
        setNewsletterEmail("");
        setNewsletterStatus("success");
        setNewsletterMessage("Subscribed!");
        try {
          trackFormSubmit("newsletter");
        } catch {
          /* analytics failure is non-blocking */
        }
        return;
      }

      setNewsletterStatus("error");
      setNewsletterMessage("Try again");
    } catch {
      setNewsletterStatus("error");
      setNewsletterMessage("Error");
    }
  };

  return (
    <>
      <AdminSignInModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
      />
      <footer
        className="bg-gradient-to-br from-gray-800 dark:from-black via-gray-900 dark:via-gray-900 to-black dark:to-black pt-6 xs:pt-8 sm:pt-10 pb-4 border-t border-brand-primary/20 text-gray-300 touch-manipulation"
        itemScope
        itemType="https://schema.org/Organization"
      >
        <div className="mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Main Footer Content */}
          <div className="gap-4 xs:gap-5 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pb-3">
            {/* Column 1: Company Info */}
            <div className="space-y-3 xs:space-y-4 sm:col-span-2 lg:col-span-1">
              <div className="text-center sm:text-left lg:text-left">
                <div className="mb-4">
                  <Link
                    href="/"
                    className="inline-block"
                    aria-label="MH Construction Home"
                  >
                    <Image
                      src="/images/logo/mh-logo-dark-bg.webp"
                      alt="MH Construction Inc - Veteran-Owned General Contractor serving Pacific Northwest"
                      width={264}
                      height={132}
                      loading="lazy"
                      itemProp="logo"
                      className="mx-auto sm:mx-0 lg:mx-0 w-[240px] xs:w-[270px] sm:w-[300px] h-auto drop-shadow-lg hover:drop-shadow-xl transition-all duration-300 cursor-pointer"
                    />
                  </Link>
                </div>

                {/* Social Media Links */}
                <nav
                  aria-label="Social media links"
                  className="flex w-full flex-nowrap items-center justify-center gap-2 overflow-x-auto pb-1 sm:justify-start xs:gap-2.5"
                >
                  {socialLinks.map((link) => (
                    <SocialLink key={link.href} {...link} />
                  ))}
                </nav>

                {/* Google Review Card */}
                <a
                  href="https://g.page/r/CVdv3YZLzJvdEBM/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${primaryActionCardClassName} mt-4`}
                  aria-label="Leave a 5-star Google review for MH Construction"
                  itemProp="review"
                >
                  <FooterActionCardContent
                    icon="rate_review"
                    eyebrow="Rate Us"
                    body={
                      <>
                        <div className="mb-1 text-sm font-bold text-gray-300 transition-colors group-hover:text-brand-primary xs:text-base">
                          Leave a Google Review
                        </div>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <MaterialIcon icon="star" size="sm" />
                          <MaterialIcon icon="star" size="sm" />
                          <MaterialIcon icon="star" size="sm" />
                          <MaterialIcon icon="star" size="sm" />
                          <MaterialIcon icon="star" size="sm" />
                        </div>
                      </>
                    }
                  />
                </a>

                {/* Service Areas */}
                <nav
                  aria-label="Service areas"
                  className="mt-4 rounded-lg border border-brand-primary/20 bg-brand-primary/5 px-3 py-2.5"
                >
                  <div className="mb-2 flex items-center gap-1.5">
                    <MaterialIcon
                      icon="location_on"
                      size="sm"
                      className="text-brand-secondary dark:text-brand-secondary-light"
                    />
                    <span className="text-xs font-bold uppercase tracking-wide text-brand-primary">
                      Service Areas
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {linkedCities.map((city) => (
                      <Link
                        key={city.href}
                        href={city.href}
                        className="rounded-md bg-brand-primary/10 px-2 py-0.5 text-xs text-gray-300 transition-colors hover:bg-brand-primary/25 hover:text-brand-primary dark:bg-brand-primary/15 dark:hover:bg-brand-primary/30"
                      >
                        {city.name}
                      </Link>
                    ))}
                  </div>
                </nav>
              </div>
            </div>

            {/* Column 2: Core Navigation */}
            <nav
              className="space-y-3 xs:space-y-4"
              aria-label="Main navigation"
            >
              <div className="flex items-center space-x-2 pb-2 border-b border-brand-primary/30">
                <MaterialIcon
                  icon="explore"
                  size="sm"
                  className="text-brand-primary"
                />
                <h3 className="font-medium text-brand-primary text-xs uppercase tracking-wide">
                  Mission Execution
                </h3>
              </div>
              <div className="space-y-1.5 xs:space-y-2">
                {navCol1Links.map((link) => (
                  <FooterNavLink key={`${link.href}-${link.label}`} {...link} />
                ))}
              </div>
            </nav>

            {/* Column 3: Company & Partnerships */}
            <nav
              className="space-y-3 xs:space-y-4"
              aria-label="Company information"
            >
              <div className="flex items-center space-x-2 pb-2 border-b border-brand-primary/30">
                <MaterialIcon
                  icon="people"
                  size="sm"
                  className="text-brand-primary"
                />
                <h3 className="font-medium text-brand-primary text-xs uppercase tracking-wide">
                  Our Forces
                </h3>
              </div>
              <div className="space-y-1.5 xs:space-y-2">
                {navCol2Links.map((link) => (
                  <FooterNavLink key={`${link.href}-${link.label}`} {...link} />
                ))}
              </div>
            </nav>

            {/* Column 4: Social Media & Resources */}
            <section
              className="space-y-3 xs:space-y-4"
              aria-labelledby="contact-heading"
            >
              <div className="flex items-center space-x-2 pb-2 border-b border-brand-primary/30">
                <MaterialIcon
                  icon="share"
                  size="sm"
                  className="text-brand-primary"
                />
                <h3
                  id="contact-heading"
                  className="font-medium text-brand-primary text-xs uppercase tracking-wide"
                >
                  Command Center
                </h3>
              </div>

              {/* Contact Info */}
              <div
                className="space-y-2 xs:space-y-3"
                itemProp="contactPoint"
                itemScope
                itemType="https://schema.org/ContactPoint"
              >
                <Link
                  href="/careers?apply=true&entryPoint=Footer%20Application"
                  className={secondaryActionCardClassName}
                  aria-label="Start a job application with MH Construction"
                >
                  <FooterActionCardContent
                    icon="badge"
                    eyebrow="Join the Team"
                    accent="secondary"
                    body={
                      <div className="text-sm font-bold text-gray-300 transition-colors group-hover:text-brand-secondary xs:text-base">
                        Quick Application
                      </div>
                    }
                  />
                </Link>

                <TrackedPhoneLink
                  trackId="footer-phone-cta"
                  trackProperties={{
                    location: "footer-prominent-cta",
                    style: "button",
                  }}
                  className={primaryActionCardClassName}
                  aria-label={`Call MH Construction at ${COMPANY_INFO.phone.display}`}
                >
                  <FooterActionCardContent
                    icon="call"
                    eyebrow="Call Us"
                    body={
                      <div className="text-sm font-bold text-gray-300 transition-colors group-hover:text-brand-primary xs:text-base">
                        {COMPANY_INFO.phone.display}
                      </div>
                    }
                  />
                </TrackedPhoneLink>

                <TrackedEmailLink
                  trackId="footer-email-cta"
                  trackProperties={{
                    location: "footer-prominent-cta",
                    style: "button",
                  }}
                  className={primaryActionCardClassName}
                  aria-label={`Email MH Construction at ${COMPANY_INFO.email.main}`}
                >
                  <FooterActionCardContent
                    icon="mail"
                    eyebrow="Email Us"
                    body={
                      <div className="truncate text-xs font-bold text-gray-300 transition-colors group-hover:text-brand-primary xs:text-sm">
                        {COMPANY_INFO.email.main}
                      </div>
                    }
                  />
                </TrackedEmailLink>

                <TrackedLocationLink
                  trackId="footer-address-cta"
                  trackProperties={{
                    location: "footer-prominent-cta",
                    style: "button",
                  }}
                  className={primaryActionCardClassName}
                >
                  <FooterActionCardContent
                    icon="place"
                    eyebrow="Visit Us"
                    body={
                      <div className="text-xs font-bold text-gray-300 transition-colors group-hover:text-brand-primary xs:text-sm">
                        <span itemProp="streetAddress">
                          {COMPANY_INFO.address.street}
                        </span>
                        <br />
                        <span itemProp="addressLocality">
                          {COMPANY_INFO.address.city}
                        </span>
                        ,{" "}
                        <span itemProp="addressRegion">
                          {COMPANY_INFO.address.state}
                        </span>{" "}
                        <span itemProp="postalCode">
                          {COMPANY_INFO.address.zip}
                        </span>
                      </div>
                    }
                  />
                </TrackedLocationLink>
              </div>

              {/* Newsletter Signup */}
              <div className="group bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 hover:from-brand-primary/20 hover:to-brand-secondary/20 p-3 rounded-lg border border-brand-primary/30 hover:border-brand-primary transition-all duration-300 hover:scale-105 touch-manipulation">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-shrink-0 flex justify-center items-center bg-brand-primary p-2 rounded-lg group-hover:scale-110 transition-transform">
                    <MaterialIcon
                      icon="notifications_active"
                      size="md"
                      className="text-white"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="text-brand-secondary text-xs font-bold uppercase tracking-wide mb-0.5">
                      Stay Updated
                    </div>
                    <div className="text-gray-300 font-bold text-sm xs:text-base group-hover:text-brand-primary transition-colors">
                      Join Our Newsletter
                    </div>
                  </div>
                </div>
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <label htmlFor="footer-newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="footer-newsletter-email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    value={newsletterEmail}
                    onChange={(event) => setNewsletterEmail(event.target.value)}
                    aria-describedby="footer-newsletter-feedback"
                    className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-primary transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={newsletterStatus === "submitting"}
                    className="w-full px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark text-brand-secondary-light hover:text-white text-sm font-bold rounded-lg transition-all duration-300 border-2 border-brand-secondary/50 hover:border-brand-secondary shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    {newsletterStatus === "submitting"
                      ? "Subscribing..."
                      : "Subscribe"}
                    <MaterialIcon icon="arrow_forward" size="sm" />
                  </button>
                  <div
                    id="footer-newsletter-feedback"
                    role={newsletterStatus === "error" ? "alert" : "status"}
                    aria-live="polite"
                    className={`text-xs ${
                      newsletterStatus === "success"
                        ? "text-green-400"
                        : newsletterStatus === "error"
                          ? "text-red-400"
                          : "text-gray-400"
                    }`}
                  >
                    {newsletterMessage}
                  </div>
                </form>
              </div>
            </section>
          </div>

          {/* Service Areas - Full Width Row */}
          <section className="py-3" aria-labelledby="service-areas-heading">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <MaterialIcon
                icon="map"
                size="md"
                className="text-brand-primary"
              />
              <h3
                id="service-areas-heading"
                className="text-brand-primary font-semibold text-sm xs:text-base uppercase tracking-wide"
              >
                Proudly Serving the Pacific Northwest
              </h3>
            </div>
            <div
              className="flex flex-wrap justify-center gap-2 xs:gap-3"
              role="list"
              aria-label="Service area cities"
            >
              {linkedCities.map((city) => (
                <Link
                  key={city.href}
                  href={city.href}
                  className={areaItemClass}
                  role="listitem"
                  itemProp="areaServed"
                  itemScope
                  itemType="https://schema.org/City"
                >
                  <span itemProp="name">{city.name}</span>
                </Link>
              ))}
              {regionalAreas.map((area) => (
                <span
                  key={area}
                  className={`${areaItemClass} cursor-default`}
                  role="listitem"
                  itemProp="areaServed"
                  itemScope
                  itemType="https://schema.org/State"
                >
                  <span itemProp="name">{area}</span>
                </span>
              ))}
            </div>
          </section>

          {/* Clean Bottom Bar - Streamlined Design */}
          <div className="pt-6 pb-6 border-gray-700 dark:border-gray-600 border-t">
            <div className="flex lg:flex-row flex-col justify-between items-center gap-4 lg:gap-6">
              <div className="flex items-center gap-2 rounded-lg border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 dark:border-brand-primary/30 dark:bg-brand-primary/10">
                <MaterialIcon
                  icon="copyright"
                  size="sm"
                  className="text-brand-secondary dark:text-brand-secondary-light"
                />
                <span className="text-sm text-gray-300 dark:text-gray-200 font-semibold">
                  2026 {COMPANY_INFO.name}, Inc.
                </span>
              </div>

              {/* Badges & Credentials */}
              <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2 xs:gap-3">
                <FooterBadge
                  icon="celebration"
                  label={`${new Date().getFullYear() - COMPANY_INFO.details.foundingYear}+ Years`}
                  emphasis
                />
                <LicenseBadge />
                <FooterBadge icon="military_tech" label="Veteran-Owned" />
              </div>

              {/* Back to Top Button */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="group relative flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-brand-secondary-light px-5 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 touch-manipulation border-2 border-brand-secondary hover:border-brand-secondary-light outline outline-2 outline-offset-2 outline-brand-secondary/50 hover:outline-brand-secondary"
                aria-label="Back to top"
              >
                <MaterialIcon
                  icon="arrow_upward"
                  size="md"
                  className="text-brand-secondary group-hover:text-brand-secondary-light group-hover:-translate-y-1 transition-all duration-300"
                />
                <span className="font-bold text-sm text-brand-secondary group-hover:text-brand-secondary-light transition-colors duration-300 hidden sm:inline">
                  Back to Top
                </span>
              </button>
            </div>

            {/* Legal Links Row */}
            <nav
              className="flex flex-wrap justify-center items-center gap-3 mt-6 pt-6 border-t-2 border-brand-primary/20 dark:border-brand-primary/30"
              aria-label="Legal and utility links"
            >
              <Link
                href="/privacy"
                className="text-xs text-gray-300 dark:text-gray-200 hover:text-brand-secondary dark:hover:text-brand-secondary-light transition-colors duration-300 font-semibold hover:underline decoration-brand-secondary dark:decoration-brand-secondary-light"
                aria-label="Privacy Policy"
              >
                Privacy
              </Link>
              <span className="text-brand-primary/40 dark:text-brand-primary/50 text-xs">
                •
              </span>
              <Link
                href="/terms"
                className="text-xs text-gray-300 dark:text-gray-200 hover:text-brand-secondary dark:hover:text-brand-secondary-light transition-colors duration-300 font-semibold hover:underline decoration-brand-secondary dark:decoration-brand-secondary-light"
                aria-label="Terms of Service"
              >
                Terms
              </Link>
              <span
                className="text-brand-primary/40 dark:text-brand-primary/50 text-xs"
                aria-hidden="true"
              >
                •
              </span>
              <Link
                href="/accessibility"
                className="text-xs text-gray-300 dark:text-gray-200 hover:text-brand-secondary dark:hover:text-brand-secondary-light transition-colors duration-300 font-semibold hover:underline decoration-brand-secondary dark:decoration-brand-secondary-light"
                aria-label="Accessibility Statement"
              >
                Accessibility
              </Link>
              <span
                className="text-brand-primary/40 dark:text-brand-primary/50 text-xs"
                aria-hidden="true"
              >
                •
              </span>
              <Link
                href="/sitemap.xml"
                className="text-xs text-gray-300 dark:text-gray-200 hover:text-brand-secondary dark:hover:text-brand-secondary-light transition-colors duration-300 font-semibold hover:underline decoration-brand-secondary dark:decoration-brand-secondary-light"
                aria-label="XML Sitemap for search engines"
              >
                Sitemap
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}
