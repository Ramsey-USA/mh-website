"use client";

import { useRef, useState, type FormEvent } from "react";
import dynamic from "next/dynamic";
import { PageTrackingClient } from "@/components/analytics";
import Link from "next/link";
import { Card } from "@/components/ui";
import {
  FormInput,
  FormSelect,
  FormTextarea,
  FormWrapper,
} from "@/components/forms/FormWrapper";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  DiagonalStripePattern,
  BrandColorBlobs,
} from "@/components/ui/backgrounds";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { gridPresets } from "@/lib/styles/layout-variants";
import { COMPANY_INFO } from "@/lib/constants/company";
import { saveOfflineSubmission } from "@/lib/pwa/offline-queue";
import { PWAOnly } from "@/components/pwa";
import { useTranslations } from "next-intl";

const DeferredMapFacade = dynamic(
  () => import("./MapFacade").then((mod) => ({ default: mod.MapFacade })),
  {
    ssr: false,
    loading: () => (
      <div className="h-105 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 animate-pulse" />
    ),
  },
);

// Quick contact info - defined inside component for locale support
const buildQuickContact = (t: ReturnType<typeof useTranslations>) => [
  {
    icon: "call",
    label: t("contact.quickContact.cards.call.label"),
    value: COMPANY_INFO.phone.display,
    link: `tel:${COMPANY_INFO.phone.tel}`,
    color: "brand-primary",
    actionLabel: t("contact.quickContact.cards.call.actionLabel"),
    ariaLabel: `${t("contact.quickContact.cards.call.ariaPrefix")} ${COMPANY_INFO.phone.display}`,
  },
  {
    icon: "mark_email_read",
    label: t("contact.quickContact.cards.email.label"),
    value: COMPANY_INFO.email.main,
    link: `mailto:${COMPANY_INFO.email.main}`,
    color: "brand-primary",
    actionLabel: t("contact.quickContact.cards.email.actionLabel"),
    ariaLabel: t("contact.quickContact.cards.email.ariaLabel"),
  },
  {
    icon: "place",
    label: t("contact.quickContact.cards.visit.label"),
    value: COMPANY_INFO.address.full,
    link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY_INFO.address.full)}`,
    color: "brand-primary",
    actionLabel: t("contact.quickContact.cards.visit.actionLabel"),
    ariaLabel: t("contact.quickContact.cards.visit.ariaLabel"),
  },
];

const buildMainCTAs = (t: ReturnType<typeof useTranslations>) => [
  {
    icon: "map",
    label: t("contact.options.cards.services.label"),
    description: t("contact.options.cards.services.description"),
    link: "/services",
    variant: "primary" as const,
    ariaLabel: t("contact.options.cards.services.ariaLabel"),
  },
  {
    icon: "emoji_events",
    label: t("contact.options.cards.projects.label"),
    description: t("contact.options.cards.projects.description"),
    link: "/projects",
    variant: "primary" as const,
    ariaLabel: t("contact.options.cards.projects.ariaLabel"),
  },
  {
    icon: "account_balance",
    label: t("contact.options.cards.publicSector.label"),
    description: t("contact.options.cards.publicSector.description"),
    link: "/public-sector",
    variant: "secondary" as const,
    ariaLabel: t("contact.options.cards.publicSector.ariaLabel"),
  },
  {
    icon: "diversity_3",
    label: t("contact.options.cards.team.label"),
    description: t("contact.options.cards.team.description"),
    link: "/team",
    variant: "primary" as const,
    ariaLabel: t("contact.options.cards.team.ariaLabel"),
  },
  {
    icon: "military_tech",
    label: t("contact.options.cards.careers.label"),
    description: t("contact.options.cards.careers.description"),
    link: "/careers",
    variant: "secondary" as const,
    ariaLabel: t("contact.options.cards.careers.ariaLabel"),
  },
  {
    icon: "health_and_safety",
    label: t("contact.options.cards.safety.label"),
    description: t("contact.options.cards.safety.description"),
    link: "/safety",
    variant: "secondary" as const,
    ariaLabel: t("contact.options.cards.safety.ariaLabel"),
  },
];

type InquiryFormData = {
  contactName: string;
  organization: string;
  email: string;
  phone: string;
  projectType: string;
  projectLocation: string;
  timingRange: string;
  budgetRange: string;
  preferredResponse: string;
  scopeSummary: string;
};

export default function ContactPageClient({
  enableTelemetry = true,
  heroSlogan = COMPANY_INFO.slogan.tertiary,
}: Readonly<{ enableTelemetry?: boolean; heroSlogan?: string }>) {
  const t = useTranslations();
  const officeEmail = COMPANY_INFO.email.main;
  const quickContact = buildQuickContact(t);
  const mainCTAs = buildMainCTAs(t);
  const [formData, setFormData] = useState<InquiryFormData>({
    contactName: "",
    organization: "",
    email: "",
    phone: "",
    projectType: "",
    projectLocation: "",
    timingRange: "",
    budgetRange: "",
    preferredResponse: "",
    scopeSummary: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Partial<InquiryFormData>>({});
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const errorSummaryRef = useRef<HTMLDivElement | null>(null);
  const submitLockRef = useRef(false);

  const projectTypeOptions = [
    {
      value: "commercial-construction",
      label: t("contact.form.projectTypes.commercial"),
    },
    {
      value: "tenant-improvements",
      label: t("contact.form.projectTypes.tenantImprovements"),
    },
    {
      value: "light-industrial",
      label: t("contact.form.projectTypes.lightIndustrial"),
    },
    { value: "ag-winery", label: t("contact.form.projectTypes.agWinery") },
    {
      value: "public-sector",
      label: t("contact.form.projectTypes.publicSector"),
    },
  ];

  const timingOptions = [
    { value: "0-30-days", label: t("contact.form.timingRanges.zeroToThirty") },
    { value: "1-3-months", label: t("contact.form.timingRanges.oneToThree") },
    { value: "3-6-months", label: t("contact.form.timingRanges.threeToSix") },
    { value: "6-plus-months", label: t("contact.form.timingRanges.sixPlus") },
  ];

  const budgetOptions = [
    { value: "", label: t("contact.form.budgetRanges.notProvided") },
    { value: "under-250k", label: t("contact.form.budgetRanges.under250") },
    { value: "250k-1m", label: t("contact.form.budgetRanges.twoFiftyToOne") },
    { value: "1m-5m", label: t("contact.form.budgetRanges.oneToFive") },
    { value: "5m-plus", label: t("contact.form.budgetRanges.fivePlus") },
  ];

  const responseOptions = [
    { value: "email", label: t("contact.form.responseMethods.email") },
    { value: "phone", label: t("contact.form.responseMethods.phone") },
    { value: "either", label: t("contact.form.responseMethods.either") },
  ];

  function validate(values: InquiryFormData): Partial<InquiryFormData> {
    const errors: Partial<InquiryFormData> = {};
    if (!values.contactName.trim()) {
      errors.contactName = t("contact.form.errors.contactName");
    }
    if (!values.email.trim()) {
      errors.email = t("contact.form.errors.emailRequired");
    }
    if (
      values.email.trim() &&
      !/^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(values.email)
    ) {
      errors.email = t("contact.form.errors.emailInvalid");
    }
    if (!values.projectType) {
      errors.projectType = t("contact.form.errors.projectType");
    }
    if (!values.projectLocation.trim()) {
      errors.projectLocation = t("contact.form.errors.projectLocation");
    }
    if (!values.timingRange) {
      errors.timingRange = t("contact.form.errors.timingRange");
    }
    if (!values.preferredResponse) {
      errors.preferredResponse = t("contact.form.errors.preferredResponse");
    }
    if (!values.scopeSummary.trim()) {
      errors.scopeSummary = t("contact.form.errors.scopeSummary");
    }
    return errors;
  }

  function handleChange<K extends keyof InquiryFormData>(
    key: K,
    value: InquiryFormData[K],
  ) {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (fieldErrors[key]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
    if (submitError) setSubmitError("");
  }

  async function handleInquirySubmit(event: FormEvent) {
    event.preventDefault();
    if (isSubmitting || submitLockRef.current) return;

    setSubmitError("");
    setSubmitSuccess("");
    const errors = validate(formData);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setSubmitError(t("contact.form.errors.summary"));
      queueMicrotask(() => {
        errorSummaryRef.current?.focus();
      });
      return;
    }

    submitLockRef.current = true;
    setIsSubmitting(true);

    const payload = {
      name: formData.contactName,
      email: formData.email,
      phone: formData.phone || undefined,
      subject: t("contact.form.subjectLine"),
      message: formData.scopeSummary,
      type: "contact",
      metadata: {
        organization: formData.organization || undefined,
        projectType: formData.projectType,
        location: formData.projectLocation,
        timeline: formData.timingRange,
        budget: formData.budgetRange || undefined,
        preferredResponse: formData.preferredResponse,
        formType: "project-inquiry",
      },
    };

    try {
      if (!navigator.onLine) {
        await saveOfflineSubmission(
          "/api/contact",
          payload as Record<string, unknown>,
        );
        setSubmitSuccess(t("contact.form.successOffline"));
        setFormData({
          contactName: "",
          organization: "",
          email: "",
          phone: "",
          projectType: "",
          projectLocation: "",
          timingRange: "",
          budgetRange: "",
          preferredResponse: "",
          scopeSummary: "",
        });
        return;
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setSubmitError(t("contact.form.errors.submitFailed"));
        return;
      }

      setSubmitSuccess(t("contact.form.success"));
      setFormData({
        contactName: "",
        organization: "",
        email: "",
        phone: "",
        projectType: "",
        projectLocation: "",
        timingRange: "",
        budgetRange: "",
        preferredResponse: "",
        scopeSummary: "",
      });
      setFieldErrors({});
    } catch {
      setSubmitError(t("contact.form.errors.submitFailed"));
    } finally {
      setIsSubmitting(false);
      submitLockRef.current = false;
    }
  }

  return (
    <>
      {enableTelemetry ? <PageTrackingClient pageName="Contact" /> : null}
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        {/* Hero Section */}
        <section
          className="hero-section relative flex items-end justify-end text-white overflow-hidden"
          aria-labelledby="hero-heading"
          style={{ height: "calc(100vh - var(--mh-nav-offset, 6.5rem))" }}
        >
          {/* Background - Ready for photo or video */}
          <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-brand-primary to-gray-900">
            {/* Overlay for text readability */}
            <div
              className="absolute inset-0 bg-linear-to-br from-brand-primary/30 via-gray-900/60 to-gray-900/80"
              aria-hidden="true"
            ></div>
          </div>

          {/* Header Text - Bottom Right */}
          <div className="hero-safe-top hero-safe-bottom relative z-30 mx-3 sm:ml-auto sm:mr-5 lg:mr-7 xl:mr-10 mb-4 pointer-events-none transition-opacity duration-300 sm:w-[min(88vw,44rem)] sm:max-w-176">
            <div className="rounded-2xl border border-white/15 bg-gray-900/60 px-4 py-3 shadow-2xl backdrop-blur-md sm:px-6 sm:py-4 lg:px-8 lg:py-5">
              <h1
                id="hero-heading"
                className="text-right text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight"
              >
                <span className="block text-brand-secondary text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-1">
                  {t("contact.hero.kicker")} -&gt; Contact
                </span>
                <span className="block text-brand-secondary">
                  {t("contact.hero.titleLine1")}
                </span>
                <span className="block text-brand-primary">
                  {t("contact.hero.titleLine2")}
                </span>
                <span className="block text-white/90">
                  {COMPANY_INFO.slogan.primary}
                </span>
                <span className="block text-brand-secondary/90 text-sm xs:text-base sm:text-lg md:text-xl mt-2">
                  {heroSlogan}
                </span>
              </h1>
            </div>
          </div>
        </section>

        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: t("contact.hero.breadcrumb") },
          ]}
        />

        {/* Quick Contact Section */}
        <section
          id="quick-contact"
          className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
          aria-labelledby="quick-contact-heading"
        >
          <DiagonalStripePattern />
          <BrandColorBlobs />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header - Contact Overview */}
            <div className="mb-16 sm:mb-20 text-center">
              {/* Icon with decorative lines */}
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-linear-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-linear-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                  <div className="relative bg-linear-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="forum"
                      size="2xl"
                      className="text-white drop-shadow-lg"
                    />
                  </div>
                </div>
                <div className="h-1 w-16 bg-linear-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              </div>

              {/* Two-line gradient heading */}
              <h2
                id="quick-contact-heading"
                className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible"
              >
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  {t("contact.quickContact.subtitle")}
                </span>
                <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  {t("contact.quickContact.title")}
                </span>
              </h2>

              {/* Description */}
              <p className="font-body mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                {t("contact.quickContact.description")}
              </p>
            </div>

            {/* Contact Cards Grid */}
            <div className="gap-6 lg:gap-8 grid grid-cols-1 md:grid-cols-3 mb-16">
              {quickContact.map((contact) => (
                <a
                  key={contact.link}
                  href={contact.link}
                  target={contact.icon === "place" ? "_blank" : undefined}
                  rel={
                    contact.icon === "place" ? "noopener noreferrer" : undefined
                  }
                  aria-label={contact.ariaLabel}
                  className="group relative flex h-full"
                >
                  {/* Animated Border Glow */}
                  <div className="absolute -inset-2 bg-linear-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500"></div>

                  <Card className="relative flex w-full flex-col overflow-hidden border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 group-hover:border-transparent group-hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-brand-primary/50">
                    {/* Top Accent Bar */}
                    <div className="h-2 bg-linear-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

                    <div className="p-8 flex flex-col flex-1 items-center text-center">
                      <div className="relative inline-block mb-6">
                        <div className="absolute -inset-3 bg-linear-to-br from-brand-primary/40 to-brand-primary-dark/40 opacity-30 blur-lg rounded-xl"></div>
                        <div className="relative rounded-xl bg-linear-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-4 shadow-xl transition-all duration-300">
                          <MaterialIcon
                            icon={contact.icon}
                            size="3xl"
                            className="text-white drop-shadow-lg"
                          />
                        </div>
                      </div>
                      <h3 className="mb-3 font-bold text-gray-900 dark:text-white text-xl sm:text-2xl">
                        {contact.label}
                      </h3>
                      <p className="font-body text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                        {contact.value}
                      </p>
                      <div
                        className="flex items-center gap-2 mt-4 text-brand-primary group-hover:gap-3 transition-all duration-300"
                        aria-hidden="true"
                      >
                        <span className="font-medium text-sm">
                          {contact.actionLabel}
                        </span>
                        <MaterialIcon icon="arrow_forward" size="sm" />
                      </div>
                    </div>
                  </Card>
                </a>
              ))}
            </div>

            {/* Trust Credentials */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-8 border-t border-gray-200 dark:border-gray-700">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 font-heading uppercase tracking-wider">
                {t("contact.quickContact.accreditations")}
              </span>
              <a
                href={COMPANY_INFO.bbb.sealClickUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="BBB Accredited Business - A+ Rating"
                className="transition-colors"
              >
                {}
                <img
                  src={COMPANY_INFO.bbb.sealHorizontal}
                  alt="BBB Accredited A+ Rating"
                  width={200}
                  height={42}
                  className="h-10 w-auto dark:hidden"
                  loading="lazy"
                  decoding="async"
                />
                {}
                <img
                  src={COMPANY_INFO.bbb.sealHorizontalWhite}
                  alt="BBB Accredited A+ Rating"
                  width={200}
                  height={42}
                  className="h-10 w-auto hidden dark:block"
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <a
                href="https://www.agcwa.com/"
                target="_blank"
                rel="noopener noreferrer"
                title="AGC of Washington Member"
                className="transition-colors"
              >
                {}
                <img
                  src="/images/logo/agc-member.webp"
                  alt="AGC of Washington Member"
                  width={405}
                  height={427}
                  className="h-10 w-auto"
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <a
                href={COMPANY_INFO.travelers.website}
                target="_blank"
                rel="noopener noreferrer"
                title="Travelers Insurance - Auto & Bonding Partner"
                className="transition-colors"
              >
                {}
                <img
                  src={COMPANY_INFO.travelers.logo}
                  alt="Travelers Insurance - Auto & Bonding Partner"
                  width={600}
                  height={122}
                  className="h-8 w-auto dark:hidden"
                  loading="lazy"
                  decoding="async"
                />
                {}
                <img
                  src={COMPANY_INFO.travelers.logoWhite}
                  alt="Travelers Insurance - Auto & Bonding Partner"
                  width={600}
                  height={122}
                  className="h-8 w-auto hidden dark:block"
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <a
                href={COMPANY_INFO.chambers.pasco.memberDirectoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Pasco Chamber of Commerce Member"
                className="transition-colors"
              >
                {}
                <img
                  src={COMPANY_INFO.chambers.pasco.logo}
                  alt="Pasco Chamber of Commerce Member"
                  width={510}
                  height={231}
                  className="h-10 w-auto dark:hidden"
                  loading="lazy"
                  decoding="async"
                />
                {}
                <img
                  src={COMPANY_INFO.chambers.pasco.logoWhite}
                  alt="Pasco Chamber of Commerce Member"
                  width={748}
                  height={256}
                  className="h-10 w-auto hidden dark:block"
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <a
                href={COMPANY_INFO.chambers.richland.memberDirectoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Richland Chamber of Commerce Member"
                className="transition-colors"
              >
                {}
                <img
                  src={COMPANY_INFO.chambers.richland.logo}
                  alt="Richland Chamber of Commerce Member"
                  width={816}
                  height={874}
                  className="h-10 w-auto"
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <a
                href={COMPANY_INFO.chambers.triCityRegional.memberDirectoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Tri-City Regional Chamber of Commerce Member"
                className="transition-colors"
              >
                {}
                <img
                  src={COMPANY_INFO.chambers.triCityRegional.logo}
                  alt="Tri-City Regional Chamber of Commerce Member"
                  width={372}
                  height={100}
                  className="h-10 w-auto"
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-full">
                <MaterialIcon
                  icon="military_tech"
                  size="sm"
                  className="text-brand-primary"
                />
                <span className="text-sm font-semibold text-brand-primary dark:text-brand-primary-light">
                  {t("contact.quickContact.veteranOwnedBadge")}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* PWA-only: one-tap contact strip (only shown in installed app) */}
        <PWAOnly>
          <div className="bg-brand-primary dark:bg-brand-primary-dark px-4 py-3 flex flex-wrap items-center justify-center gap-3">
            <span className="text-white font-bold text-sm tracking-wide mr-2">
              {t("contact.pwa.quickContact")}
            </span>
            <a
              href={`tel:${COMPANY_INFO.phone.tel}`}
              className="flex items-center gap-1.5 rounded-lg bg-white/20 hover:bg-white/30 active:bg-white/40 text-white font-bold text-sm px-4 py-2 transition-colors"
              aria-label={`${t("contact.pwa.callAriaPrefix")} ${COMPANY_INFO.phone.display}`}
            >
              <MaterialIcon
                icon="call"
                size="sm"
                style={{ fontSize: "16px" }}
              />
              {COMPANY_INFO.phone.display}
            </a>
            <a
              href={`mailto:${COMPANY_INFO.email.main}`}
              className="flex items-center gap-1.5 rounded-lg bg-white/20 hover:bg-white/30 active:bg-white/40 text-white font-bold text-sm px-4 py-2 transition-colors"
              aria-label={`${t("contact.pwa.emailAriaPrefix")} ${COMPANY_INFO.email.main}`}
            >
              <MaterialIcon
                icon="mail"
                size="sm"
                style={{ fontSize: "16px" }}
              />
              {t("contact.pwa.sendEmail")}
            </a>
          </div>
        </PWAOnly>

        {/* Two Pathways - Allies vs Mission Partners */}
        <section
          className="relative py-12 sm:py-16 lg:py-20 xl:py-24 bg-linear-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden"
          aria-labelledby="partnership-pathways-heading"
        >
          {/* Enhanced Background Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(189,146,100,0.08)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(189,146,100,0.15)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(56,104,81,0.06)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_bottom_right,rgba(56,104,81,0.12)_0%,transparent_50%)]"></div>
          <div className="top-20 left-10 absolute bg-brand-secondary/10 dark:bg-brand-secondary/20 blur-3xl rounded-full w-32 h-32 animate-pulse"></div>
          <div
            className="right-10 bottom-20 absolute bg-brand-primary/10 dark:bg-brand-primary/20 blur-3xl rounded-full w-40 h-40 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="top-1/2 right-1/4 absolute bg-brand-primary/5 dark:bg-brand-primary/10 blur-3xl rounded-full w-24 h-24 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 lg:mb-24 text-center">
              <h2
                id="partnership-pathways-heading"
                className="mb-8 pb-2 font-black text-gray-900 dark:text-gray-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter"
              >
                <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                  {t("contact.pathways.subtitle")}
                </span>
                <span className="block text-brand-primary dark:text-brand-primary-light font-black drop-shadow-sm">
                  {t("contact.pathways.title")}
                </span>
              </h2>
              <p className="font-body mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-4 wrap-break-word">
                {t("contact.pathways.description")}
              </p>
            </div>

            {/* Two-Column Grid for Pathways */}
            <div className={gridPresets.twoColumn("xl")}>
              {/* Mission-Partner Services Pathway */}
              <div className="bg-white dark:bg-gray-900 border-4 border-brand-primary p-8 lg:p-10 rounded-3xl shadow-2xl hover:shadow-brand-primary/20 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-brand-primary/10 dark:bg-brand-primary/20 p-4 rounded-2xl">
                    <MaterialIcon
                      icon="diversity_3"
                      size="3xl"
                      theme="military"
                      ariaLabel="Mission-partner partnership"
                      className="text-brand-primary"
                    />
                  </div>
                  <h3 className="font-black text-gray-900 dark:text-white text-2xl sm:text-3xl md:text-4xl">
                    {t("contact.pathways.client.title")}
                  </h3>
                </div>

                <p className="font-body mb-6 text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                  {t("contact.pathways.client.description")}
                </p>

                {/* Mission-Partner Contact Info */}
                <div className="bg-gray-50 dark:bg-gray-800 p-6 border-l-4 border-brand-primary rounded-xl mb-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MaterialIcon
                        icon="call"
                        size="lg"
                        theme="military"
                        ariaLabel={t("contact.pathways.client.callIconAria")}
                        className="text-brand-primary shrink-0"
                      />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">
                          {t("contact.pathways.client.contactServiceLabel")}
                        </p>
                        <a
                          href={`tel:${COMPANY_INFO.phone.tel}`}
                          className="text-brand-primary hover:text-brand-secondary-text text-lg font-bold transition-colors"
                          aria-label={`${t("contact.pathways.client.callAriaPrefix")} ${COMPANY_INFO.phone.display}`}
                        >
                          {COMPANY_INFO.phone.display}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MaterialIcon
                        icon="mark_email_read"
                        size="lg"
                        theme="military"
                        ariaLabel={t("contact.pathways.client.emailIconAria")}
                        className="text-brand-primary shrink-0"
                      />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">
                          {t("contact.pathways.shared.emailLabel")}
                        </p>
                        <a
                          href={`mailto:${officeEmail}?subject=Project%20Inquiry`}
                          className="text-brand-primary hover:text-brand-secondary-text text-lg font-bold transition-colors"
                          aria-label={t(
                            "contact.pathways.client.emailAriaLabel",
                          )}
                        >
                          {officeEmail}
                        </a>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-gray-600 dark:text-gray-300 text-sm italic">
                        {t("contact.pathways.client.note")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mission-Partner CTAs */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-4">
                    {t("contact.pathways.client.ctaHeading")}
                  </h4>
                  <Link
                    href={`tel:${COMPANY_INFO.phone.tel}`}
                    className="flex items-center justify-between bg-brand-primary hover:bg-brand-secondary text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg group"
                  >
                    <div className="flex items-center gap-3">
                      <MaterialIcon
                        icon="call"
                        size="lg"
                        theme="military"
                        ariaLabel="Contact Us"
                      />
                      <span>{COMPANY_INFO.phone.display}</span>
                    </div>
                    <MaterialIcon icon="arrow_forward" size="md" />
                  </Link>
                  <Link
                    href="/services"
                    className="flex items-center justify-between bg-white dark:bg-gray-700 border-2 border-brand-primary text-brand-primary dark:text-brand-secondary hover:bg-brand-primary hover:text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg group"
                  >
                    <div className="flex items-center gap-3">
                      <MaterialIcon
                        icon="map"
                        size="lg"
                        theme="military"
                        ariaLabel="Services"
                      />
                      <span>{t("contact.pathways.client.ctaServices")}</span>
                    </div>
                    <MaterialIcon icon="arrow_forward" size="md" />
                  </Link>
                </div>
              </div>

              {/* Allies Pathway */}
              <div className="bg-white dark:bg-gray-900 border-4 border-brand-secondary p-8 lg:p-10 rounded-3xl shadow-2xl hover:shadow-brand-secondary/20 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-brand-secondary/10 dark:bg-brand-secondary/20 p-4 rounded-2xl">
                    <MaterialIcon
                      icon="handshake"
                      size="3xl"
                      theme="veteran"
                      ariaLabel="Ally Partnership"
                      className="text-brand-secondary"
                    />
                  </div>
                  <h3 className="font-black text-gray-900 dark:text-white text-2xl sm:text-3xl md:text-4xl">
                    {t("contact.pathways.allies.title")}
                  </h3>
                </div>

                <p className="font-body mb-6 text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                  {t("contact.pathways.allies.description")}
                </p>

                {/* Ally Contact Info */}
                <div className="bg-gray-50 dark:bg-gray-800 p-6 border-l-4 border-brand-secondary rounded-xl mb-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MaterialIcon
                        icon="call"
                        size="lg"
                        theme="veteran"
                        ariaLabel={t("contact.pathways.allies.callIconAria")}
                        className="text-brand-secondary shrink-0"
                      />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">
                          {t("contact.pathways.allies.contactServiceLabel")}
                        </p>
                        <a
                          href={`tel:${COMPANY_INFO.phone.tel}`}
                          className="text-brand-secondary-text hover:text-bronze-600 text-lg font-bold transition-colors dark:text-brand-secondary-light"
                          aria-label={`${t("contact.pathways.allies.callAriaPrefix")} ${COMPANY_INFO.phone.display}`}
                        >
                          {COMPANY_INFO.phone.display}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MaterialIcon
                        icon="mark_email_read"
                        size="lg"
                        theme="veteran"
                        ariaLabel={t("contact.pathways.allies.emailIconAria")}
                        className="text-brand-secondary shrink-0"
                      />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">
                          {t("contact.pathways.shared.emailLabel")}
                        </p>
                        <a
                          href={`mailto:${officeEmail}?subject=Ally%20Inquiry`}
                          className="text-brand-secondary-text hover:text-bronze-600 text-lg font-bold transition-colors dark:text-brand-secondary-light"
                          aria-label={t(
                            "contact.pathways.allies.emailAriaLabel",
                          )}
                        >
                          {officeEmail}
                        </a>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-gray-600 dark:text-gray-300 text-sm italic">
                        {t("contact.pathways.allies.note")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Ally CTAs */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-4">
                    {t("contact.pathways.allies.ctaHeading")}
                  </h4>
                  <Link
                    href="/allies"
                    className="flex items-center justify-between bg-secondary-700 hover:bg-bronze-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg group"
                  >
                    <div className="flex items-center gap-3">
                      <MaterialIcon
                        icon="verified_user"
                        size="lg"
                        theme="veteran"
                        ariaLabel="Approved Trade Partner"
                      />
                      <span>{t("contact.pathways.allies.ctaApply")}</span>
                    </div>
                    <MaterialIcon icon="arrow_forward" size="md" />
                  </Link>
                  <Link
                    href="/allies#benefits"
                    className="flex items-center justify-between bg-white dark:bg-gray-700 border-2 border-brand-secondary text-brand-secondary hover:bg-brand-secondary hover:text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg group"
                  >
                    <div className="flex items-center gap-3">
                      <MaterialIcon
                        icon="handshake"
                        size="lg"
                        theme="veteran"
                        ariaLabel="Ally Benefits"
                      />
                      <span>{t("contact.pathways.allies.ctaBenefits")}</span>
                    </div>
                    <MaterialIcon icon="arrow_forward" size="md" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="inquiry-routing"
          className="relative bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
          aria-labelledby="inquiry-routing-heading"
        >
          <DiagonalStripePattern />
          <BrandColorBlobs />
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              id="inquiry-routing-heading"
              className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white text-center"
            >
              {t("contact.routing.title")}
            </h2>
            <p className="mt-4 text-center text-base sm:text-lg text-gray-700 dark:text-gray-300">
              {t("contact.routing.description")}
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <a
                href="#project-inquiry-form"
                className="rounded-xl border border-brand-primary/40 bg-white dark:bg-gray-900 p-4 text-sm font-semibold text-brand-primary hover:underline"
              >
                {t("contact.routing.projectRoute")}
              </a>
              <Link
                href="/public-sector"
                className="rounded-xl border border-brand-primary/40 bg-white dark:bg-gray-900 p-4 text-sm font-semibold text-brand-primary hover:underline"
              >
                {t("contact.routing.publicSectorRoute")}
              </Link>
              <Link
                href="/allies"
                className="rounded-xl border border-brand-primary/40 bg-white dark:bg-gray-900 p-4 text-sm font-semibold text-brand-primary hover:underline"
              >
                {t("contact.routing.alliesRoute")}
              </Link>
              <Link
                href="/careers"
                className="rounded-xl border border-brand-primary/40 bg-white dark:bg-gray-900 p-4 text-sm font-semibold text-brand-primary hover:underline"
              >
                {t("contact.routing.careersRoute")}
              </Link>
            </div>

            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
              <Link
                href="/safety"
                className="font-semibold text-brand-primary hover:underline"
              >
                {t("contact.routing.safetyRoute")}
              </Link>
            </p>
          </div>
        </section>

        <section
          id="project-inquiry-form"
          className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
          aria-labelledby="project-inquiry-heading"
        >
          <DiagonalStripePattern />
          <BrandColorBlobs />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              id="project-inquiry-heading"
              className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white"
            >
              {t("contact.form.title")}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-gray-700 dark:text-gray-300">
              {t("contact.form.description")}
            </p>

            <div className="mt-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {t("contact.form.dataNotice")}
              </p>
            </div>

            <div
              ref={errorSummaryRef}
              tabIndex={-1}
              aria-live="assertive"
              className="focus:outline-none"
            >
              {submitError ? (
                <div className="mt-4 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300">
                  {submitError}
                </div>
              ) : null}
            </div>

            <div className="mt-6">
              <FormWrapper
                onSubmit={handleInquirySubmit}
                submitButtonLabel={t("contact.form.submit")}
                isSubmitting={isSubmitting}
                submitError={submitError}
                submitSuccess={submitSuccess}
                disableSubmit={isSubmitting}
                className="gap-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormInput
                    name="contactName"
                    label={t("contact.form.fields.contactName")}
                    required
                    value={formData.contactName}
                    onChange={(e) =>
                      handleChange("contactName", e.target.value)
                    }
                    error={fieldErrors.contactName}
                    autoComplete="name"
                  />
                  <FormInput
                    name="organization"
                    label={t("contact.form.fields.organization")}
                    value={formData.organization}
                    onChange={(e) =>
                      handleChange("organization", e.target.value)
                    }
                    error={fieldErrors.organization}
                    autoComplete="organization"
                  />
                  <FormInput
                    name="email"
                    type="email"
                    label={t("contact.form.fields.email")}
                    required
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    error={fieldErrors.email}
                    autoComplete="email"
                  />
                  <FormInput
                    name="phone"
                    type="tel"
                    label={t("contact.form.fields.phone")}
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    error={fieldErrors.phone}
                    autoComplete="tel"
                  />
                  <FormSelect
                    name="projectType"
                    label={t("contact.form.fields.projectType")}
                    required
                    value={formData.projectType}
                    onChange={(e) =>
                      handleChange("projectType", e.target.value)
                    }
                    error={fieldErrors.projectType}
                    options={projectTypeOptions}
                  />
                  <FormInput
                    name="projectLocation"
                    label={t("contact.form.fields.projectLocation")}
                    required
                    value={formData.projectLocation}
                    onChange={(e) =>
                      handleChange("projectLocation", e.target.value)
                    }
                    error={fieldErrors.projectLocation}
                    autoComplete="address-level2"
                  />
                  <FormSelect
                    name="timingRange"
                    label={t("contact.form.fields.timingRange")}
                    required
                    value={formData.timingRange}
                    onChange={(e) =>
                      handleChange("timingRange", e.target.value)
                    }
                    error={fieldErrors.timingRange}
                    options={timingOptions}
                  />
                  <FormSelect
                    name="budgetRange"
                    label={t("contact.form.fields.budgetRange")}
                    value={formData.budgetRange}
                    onChange={(e) =>
                      handleChange("budgetRange", e.target.value)
                    }
                    error={fieldErrors.budgetRange}
                    helperText={t("contact.form.fields.budgetHelper")}
                    options={budgetOptions}
                  />
                  <FormSelect
                    name="preferredResponse"
                    label={t("contact.form.fields.preferredResponse")}
                    required
                    value={formData.preferredResponse}
                    onChange={(e) =>
                      handleChange("preferredResponse", e.target.value)
                    }
                    error={fieldErrors.preferredResponse}
                    options={responseOptions}
                  />
                </div>

                <FormTextarea
                  name="scopeSummary"
                  label={t("contact.form.fields.scopeSummary")}
                  required
                  value={formData.scopeSummary}
                  onChange={(e) => handleChange("scopeSummary", e.target.value)}
                  error={fieldErrors.scopeSummary}
                  rows={6}
                />
              </FormWrapper>
            </div>
          </div>
        </section>

        {/* Interactive Map Section */}
        <section
          className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
          aria-labelledby="office-location-heading"
        >
          <DiagonalStripePattern />
          <BrandColorBlobs />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header - Military Construction Standard */}
            <div className="mb-16 sm:mb-20 text-center">
              {/* Icon with decorative lines */}
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-linear-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-linear-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                  <div className="relative bg-linear-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="location_on"
                      size="2xl"
                      className="text-white drop-shadow-lg"
                    />
                  </div>
                </div>
                <div className="h-1 w-16 bg-linear-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              </div>

              {/* Two-line gradient heading */}
              <h2
                id="office-location-heading"
                className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible"
              >
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  {t("contact.office.subtitle")}
                </span>
                <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  {t("contact.office.title")}
                </span>
              </h2>

              {/* Description */}
              <p className="font-body mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                <span itemProp="address">
                  3111 N Capitol Ave, Pasco, WA 99301
                </span>
              </p>
              <p className="mt-4 text-gray-500 dark:text-gray-300 text-base sm:text-lg">
                {t("contact.office.description")}
              </p>
            </div>

            {/* Interactive Map - loads on click (facade pattern) */}
            <div
              className="relative mb-12 rounded-2xl shadow-2xl overflow-hidden border-4 border-brand-primary/20"
              style={{ height: "600px" }}
            >
              <DeferredMapFacade />
            </div>

            {/* Map CTA */}
            <div className="text-center">
              <a
                href="https://maps.google.com/?q=3111+N+Capitol+Ave+Pasco+WA+99301"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("contact.office.getDirectionsAria")}
                className="inline-flex items-center gap-3 bg-white dark:bg-gray-800 border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-brand-primary/50"
              >
                <MaterialIcon
                  icon="explore"
                  size="lg"
                  theme="military"
                  ariaLabel={t("contact.office.getDirectionsAria")}
                />
                {t("contact.office.getDirections")}
              </a>
            </div>
          </div>
        </section>

        {/* Strategic CTAs Section */}
        <section
          className="relative bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
          aria-labelledby="partnership-options-heading"
        >
          <DiagonalStripePattern />
          <BrandColorBlobs />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header - Military Construction Standard */}
            <div className="mb-16 sm:mb-20 text-center">
              {/* Icon with decorative lines */}
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-linear-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-linear-to-br from-brand-secondary/30 to-bronze-700/30 blur-2xl rounded-full"></div>
                  <div className="relative bg-linear-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="handshake"
                      size="2xl"
                      className="text-white drop-shadow-lg"
                    />
                  </div>
                </div>
                <div className="h-1 w-16 bg-linear-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              </div>

              {/* Two-line gradient heading */}
              <h2
                id="partnership-options-heading"
                className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible"
              >
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  {t("contact.options.subtitle")}
                </span>
                <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  {t("contact.options.title")}
                </span>
              </h2>

              {/* Description */}
              <p className="font-body mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                {t("contact.options.description")}
              </p>
            </div>

            {/* CTA Grid - Following MH Standards for 6 cards */}
            <div className={gridPresets.cards3("md", "max-w-6xl mx-auto")}>
              {mainCTAs.map((cta) => (
                <Link
                  key={cta.link}
                  href={cta.link}
                  aria-label={cta.ariaLabel}
                  className="group relative flex h-full"
                >
                  {/* Animated Border Glow */}
                  <div
                    className={`absolute -inset-2 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 ${
                      cta.variant === "primary"
                        ? "bg-linear-to-br from-brand-primary/40 to-brand-primary-dark/40"
                        : "bg-linear-to-br from-brand-secondary/40 to-bronze-600/40"
                    }`}
                  ></div>

                  <Card className="relative flex w-full flex-col overflow-hidden border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 group-hover:border-transparent group-hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-brand-primary/50">
                    {/* Top Accent Bar */}
                    <div
                      className={`h-2 ${
                        cta.variant === "primary"
                          ? "bg-linear-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"
                          : "bg-linear-to-r from-brand-secondary via-bronze-700 to-bronze-800"
                      }`}
                    ></div>

                    <div className="p-8 flex flex-col flex-1">
                      {/* Icon Container */}
                      <div className="flex justify-center mb-6">
                        <div className="relative inline-block">
                          <div
                            className={`absolute -inset-3 opacity-30 blur-lg rounded-xl ${
                              cta.variant === "primary"
                                ? "bg-linear-to-br from-brand-primary/40 to-brand-primary-dark/40"
                                : "bg-linear-to-br from-brand-secondary/40 to-bronze-600/40"
                            }`}
                          ></div>
                          <div
                            className={`relative rounded-xl p-4 shadow-xl transition-all duration-300 ${
                              cta.variant === "primary"
                                ? "bg-linear-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker"
                                : "bg-linear-to-br from-brand-secondary via-bronze-700 to-bronze-800"
                            }`}
                          >
                            <MaterialIcon
                              icon={cta.icon}
                              size="3xl"
                              className="text-white drop-shadow-lg"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="text-center flex flex-col grow">
                        <h3 className="mb-3 font-bold text-gray-900 dark:text-white text-xl sm:text-2xl min-h-14 flex items-center justify-center">
                          {cta.label}
                        </h3>
                        <p className="font-body mb-6 text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed grow">
                          {cta.description}
                        </p>
                        <div
                          className={`flex justify-center items-center gap-2 ${
                            cta.variant === "primary"
                              ? "text-brand-primary"
                              : "text-brand-secondary"
                          } group-hover:gap-3 transition-all duration-300`}
                          aria-hidden="true"
                        >
                          <span className="font-semibold text-sm">
                            {t("contact.options.learnMore")}
                          </span>
                          <MaterialIcon icon="arrow_forward" size="sm" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Service Areas Section */}
        <section
          className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
          id="service-areas"
          aria-labelledby="service-areas-heading"
        >
          <DiagonalStripePattern />
          <BrandColorBlobs />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header - Military Construction Standard */}
            <div className="mb-16 sm:mb-20 text-center">
              {/* Icon with decorative lines */}
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-linear-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-linear-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                  <div className="relative bg-linear-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="map"
                      size="2xl"
                      className="text-white drop-shadow-lg"
                      ariaLabel={t("contact.serviceAreas.iconAria")}
                    />
                  </div>
                </div>
                <div className="h-1 w-16 bg-linear-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              </div>

              {/* Two-line gradient heading */}
              <h2
                id="service-areas-heading"
                className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible"
              >
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  {t("contact.serviceAreas.subtitle")}
                </span>
                <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  {t("contact.serviceAreas.title")}
                </span>
              </h2>

              {/* Description */}
              <p className="font-body mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                {t("contact.serviceAreas.description")}
              </p>
            </div>

            {/* Service Area Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Tri-Cities Headquarters Card */}
              <div className="group relative flex h-full">
                {/* Animated Border Glow */}
                <div className="absolute -inset-2 rounded-2xl bg-linear-to-br from-brand-primary/40 to-brand-primary-dark/40 opacity-20 group-hover:opacity-60 blur-xl transition-all duration-500"></div>

                <Card className="relative flex w-full flex-col overflow-hidden border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 group-hover:border-transparent group-hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                  {/* Top Accent Bar */}
                  <div className="h-2 bg-linear-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

                  <div className="p-8 flex flex-col flex-1">
                    {/* Icon */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="relative inline-block">
                        <div className="absolute -inset-3 bg-linear-to-br from-brand-primary/40 to-brand-primary-dark/40 opacity-30 blur-lg rounded-xl"></div>
                        <div className="relative bg-linear-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker rounded-xl p-3 shadow-xl">
                          <MaterialIcon
                            icon="place"
                            size="xl"
                            className="text-white drop-shadow-lg"
                            ariaLabel={t(
                              "contact.serviceAreas.triCities.iconAria",
                            )}
                          />
                        </div>
                      </div>
                      <h3 className="font-bold text-brand-primary text-xl sm:text-2xl">
                        {t("contact.serviceAreas.triCities.title")}
                      </h3>
                    </div>

                    <p className="mb-6 text-gray-600 dark:text-gray-300 text-sm">
                      {t("contact.serviceAreas.triCities.description")}
                    </p>

                    {/* Location Links */}
                    <div className="grid grid-cols-1 gap-3">
                      <Link
                        href="/locations/pasco"
                        className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary transition-colors p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 group/link"
                      >
                        <MaterialIcon
                          icon="arrow_forward"
                          size="sm"
                          className="text-brand-secondary transition-colors"
                          ariaLabel={t(
                            "contact.serviceAreas.triCities.pascoAria",
                          )}
                        />
                        <span className="font-medium">Pasco, WA</span>
                        <span className="ml-auto text-xs text-gray-500">
                          {t("contact.serviceAreas.triCities.headquartersTag")}
                        </span>
                      </Link>
                      <Link
                        href="/locations/kennewick"
                        className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary transition-colors p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 group/link"
                      >
                        <MaterialIcon
                          icon="arrow_forward"
                          size="sm"
                          className="text-brand-secondary transition-colors"
                          ariaLabel={t(
                            "contact.serviceAreas.triCities.kennewickAria",
                          )}
                        />
                        <span className="font-medium">Kennewick, WA</span>
                      </Link>
                      <Link
                        href="/locations/richland"
                        className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary transition-colors p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 group/link"
                      >
                        <MaterialIcon
                          icon="arrow_forward"
                          size="sm"
                          className="text-brand-secondary transition-colors"
                          ariaLabel={t(
                            "contact.serviceAreas.triCities.richlandAria",
                          )}
                        />
                        <span className="font-medium">Richland, WA</span>
                      </Link>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Extended Coverage Card */}
              <div className="group relative flex h-full">
                {/* Animated Border Glow */}
                <div className="absolute -inset-2 rounded-2xl bg-linear-to-br from-brand-secondary/40 to-bronze-600/40 opacity-20 group-hover:opacity-60 blur-xl transition-all duration-500"></div>

                <Card className="relative flex w-full flex-col overflow-hidden border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 group-hover:border-transparent group-hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                  {/* Top Accent Bar */}
                  <div className="h-2 bg-linear-to-r from-brand-secondary via-bronze-700 to-bronze-800"></div>

                  <div className="p-8 flex flex-col flex-1">
                    {/* Icon */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="relative inline-block">
                        <div className="absolute -inset-3 bg-linear-to-br from-brand-secondary/40 to-bronze-600/40 opacity-30 blur-lg rounded-xl"></div>
                        <div className="relative bg-linear-to-br from-brand-secondary via-bronze-700 to-bronze-800 rounded-xl p-3 shadow-xl">
                          <MaterialIcon
                            icon="travel_explore"
                            size="xl"
                            className="text-white drop-shadow-lg"
                            ariaLabel={t(
                              "contact.serviceAreas.extended.iconAria",
                            )}
                          />
                        </div>
                      </div>
                      <h3 className="font-bold text-brand-secondary text-xl sm:text-2xl">
                        {t("contact.serviceAreas.extended.title")}
                      </h3>
                    </div>

                    <p className="mb-6 text-gray-600 dark:text-gray-300 text-sm">
                      {t("contact.serviceAreas.extended.description")}
                    </p>

                    {/* Location Links and Coverage */}
                    <div className="grid grid-cols-1 gap-3">
                      <Link
                        href="/locations/spokane"
                        className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-brand-secondary dark:hover:text-brand-secondary transition-colors p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 group/link"
                      >
                        <MaterialIcon
                          icon="arrow_forward"
                          size="sm"
                          className="text-brand-primary transition-colors"
                          ariaLabel={t(
                            "contact.serviceAreas.extended.spokaneAria",
                          )}
                        />
                        <span className="font-medium">Spokane, WA</span>
                      </Link>
                      <Link
                        href="/locations/yakima"
                        className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-brand-secondary dark:hover:text-brand-secondary transition-colors p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 group/link"
                      >
                        <MaterialIcon
                          icon="arrow_forward"
                          size="sm"
                          className="text-brand-primary transition-colors"
                          ariaLabel={t(
                            "contact.serviceAreas.extended.yakimaAria",
                          )}
                        />
                        <span className="font-medium">Yakima, WA</span>
                      </Link>
                      <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 p-3">
                        <MaterialIcon
                          icon="check_circle"
                          size="sm"
                          className="text-brand-primary"
                          ariaLabel={t(
                            "contact.serviceAreas.extended.licensedWashingtonAria",
                          )}
                        />
                        <span className="font-medium">
                          {t("contact.serviceAreas.extended.washingtonLabel")}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 p-3">
                        <MaterialIcon
                          icon="check_circle"
                          size="sm"
                          className="text-brand-primary"
                          ariaLabel={t(
                            "contact.serviceAreas.extended.licensedOregonAria",
                          )}
                        />
                        <span className="font-medium">
                          {t("contact.serviceAreas.extended.oregonLabel")}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 p-3">
                        <MaterialIcon
                          icon="check_circle"
                          size="sm"
                          className="text-brand-primary"
                          ariaLabel={t(
                            "contact.serviceAreas.extended.licensedIdahoAria",
                          )}
                        />
                        <span className="font-medium">
                          {t("contact.serviceAreas.extended.idahoLabel")}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
