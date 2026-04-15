"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import Link from "next/link";
import Script from "next/script";
import { logger } from "@/lib/utils/logger";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Button } from "@/components/ui/base/button";
import { Input, Textarea } from "@/components/ui/forms/Input";
import { useDialogBehavior } from "@/hooks/useDialogBehavior";
import { trackFormSubmit } from "@/lib/analytics/tracking";

// Turnstile configuration
const TURNSTILE_SITE_KEY = process.env["NEXT_PUBLIC_TURNSTILE_SITE_KEY"] ?? "";

// Minimal Turnstile global type
declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
  }
}

const POSITIONS = [
  "Construction Laborer",
  "Skilled Tradesperson",
  "Equipment Operator",
  "Project Manager",
  "Site Supervisor",
  "Estimator",
  "Administrative Assistant",
  "Safety Coordinator",
  "Other",
];

const EXPERIENCE_LEVELS = [
  "0-1 years",
  "2-5 years",
  "6-10 years",
  "11-15 years",
  "16+ years",
];

const AVAILABILITY_OPTIONS = [
  "Immediately",
  "Within 2 weeks",
  "Within 1 month",
  "Within 3 months",
  "Other",
];

const MAX_RESUME_SIZE_BYTES = 10 * 1024 * 1024;

const SELECT_FIELD_CLASS =
  "w-full min-h-[48px] rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-gray-900 transition-all duration-300 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:ring-offset-2 hover:border-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-brand-secondary dark:focus:ring-brand-secondary/30 dark:hover:border-gray-500 cursor-pointer shadow-sm focus:shadow-md";

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  entryPoint?: string;
}

interface ApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  position: string;
  experience: string;
  availability: string;
  coverLetter: string;
  resumeFile?: File;
  veteranStatus: string;
  referralSource: string;
}

interface ApplicationContext {
  badge: string;
  title: string;
  description: string;
}

function getPrefilledPosition(entryPoint?: string): string {
  if (!entryPoint) return "";

  return POSITIONS.includes(entryPoint) ? entryPoint : "";
}

function createInitialFormData(entryPoint?: string): ApplicationData {
  const normalizedEntryPoint = entryPoint?.toLowerCase() ?? "";

  return {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    position: getPrefilledPosition(entryPoint),
    experience: "",
    availability: "",
    coverLetter: "",
    veteranStatus: normalizedEntryPoint.includes("veteran") ? "veteran" : "",
    referralSource: "",
  };
}

function getApplicationContext(entryPoint?: string): ApplicationContext {
  const normalizedEntryPoint = entryPoint?.toLowerCase() ?? "";

  if (normalizedEntryPoint.includes("veteran")) {
    return {
      badge: "Veteran Application",
      title: "Enlist With Us",
      description:
        "Service recognizes service. Veterans receive priority consideration—your military experience matters here. Share the basics and we will follow up directly.",
    };
  }

  if (normalizedEntryPoint.includes("inquiry")) {
    return {
      badge: "Career Inquiry",
      title: "Start the Conversation",
      description:
        "THE ROI IS THE RELATIONSHIP. Send your name, email, and the role you want to discuss. Build your career with a company that keeps its word.",
    };
  }

  return {
    badge: entryPoint || "Join Our Team",
    title: "Build Your Career With Us",
    description:
      "Join a Veteran-Owned team where your word matters as much as ours. Name, email, and the role you want are enough to begin.",
  };
}

export function JobApplicationModal({
  isOpen,
  onClose,
  entryPoint,
}: JobApplicationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const descriptionId = useId();
  const [formData, setFormData] = useState<ApplicationData>(
    createInitialFormData(entryPoint),
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const applicationContext = getApplicationContext(entryPoint);

  // Turnstile state
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReady, setTurnstileReady] = useState(false);

  const mountTurnstile = useCallback(() => {
    if (!turnstileRef.current || !window.turnstile || !TURNSTILE_SITE_KEY) {
      return;
    }
    if (widgetIdRef.current) {
      window.turnstile.remove(widgetIdRef.current);
    }
    widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      theme: "auto",
      callback: (token) => {
        setTurnstileToken(token);
      },
      "expired-callback": () => {
        setTurnstileToken("");
      },
      "error-callback": () => {
        setTurnstileToken("");
      },
    });
    setTurnstileReady(true);
  }, []);

  const resetTurnstile = useCallback(() => {
    setTurnstileToken("");
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, []);

  const handleClose = useCallback(() => {
    setSubmitError("");
    setSubmitSuccess(false);
    setFormData(createInitialFormData(entryPoint));
    resetTurnstile();
    onClose();
  }, [entryPoint, onClose, resetTurnstile]);

  useEffect(() => {
    if (!isOpen) return;

    setSubmitError("");
    setSubmitSuccess(false);
    setFormData(createInitialFormData(entryPoint));
    resetTurnstile();

    // Mount Turnstile when modal opens if script already loaded
    if (window.turnstile && TURNSTILE_SITE_KEY) {
      // Small delay to ensure DOM is ready
      setTimeout(mountTurnstile, 100);
    }
  }, [isOpen, entryPoint, resetTurnstile, mountTurnstile]);

  const successRef = useRef<HTMLDivElement>(null);

  // Form state: active while the form is visible
  useDialogBehavior({
    isOpen: isOpen && !submitSuccess,
    onClose: handleClose,
    dialogRef: modalRef,
  });
  // Success state: active after submission
  useDialogBehavior({
    isOpen: isOpen && submitSuccess,
    onClose: handleClose,
    dialogRef: successRef,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setFormData((prev) => {
        const { resumeFile: _resumeFile, ...rest } = prev;
        return rest;
      });
      return;
    }

    if (file.size > MAX_RESUME_SIZE_BYTES) {
      setSubmitError("Resume must be 10 MB or smaller.");
      return;
    }

    setSubmitError("");
    setFormData((prev) => ({ ...prev, resumeFile: file }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Verify Turnstile token if configured
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setSubmitError(
        "Please complete the security verification before submitting.",
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      let resumeUrl = "";
      let resumeKey = "";

      // Upload resume file first if provided
      if (formData.resumeFile) {
        const uploadFormData = new FormData();
        uploadFormData.append("file", formData.resumeFile);
        uploadFormData.append("email", formData.email);

        const uploadResponse = await fetch("/api/upload/resume", {
          method: "POST",
          body: uploadFormData,
        });

        const uploadResult = await uploadResponse.json().catch(() => null);

        if (!uploadResponse.ok) {
          throw new Error(
            uploadResult?.error ||
              "Resume upload failed. Please try again or submit without a file.",
          );
        }

        resumeUrl = uploadResult.data.url;
        resumeKey = uploadResult.data.key;
      }

      // Submit application with resume URL and Turnstile token
      const applicationData = {
        ...formData,
        turnstileToken,
        resumeFileName: formData.resumeFile?.name || "",
        resumeFileSize: formData.resumeFile?.size || 0,
        resumeUrl: resumeUrl,
        resumeKey: resumeKey,
        submittedAt: new Date().toISOString(),
        status: "new",
      };

      const response = await fetch("/api/job-applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      });

      const responseBody = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          responseBody?.error ||
            "Could not submit your application. Please review the required fields and try again.",
        );
      }

      setSubmitSuccess(true);
      try {
        trackFormSubmit("job-application", { position: formData.position });
      } catch {
        /* analytics failure is non-blocking */
      }
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      logger.error("Error submitting application:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Could not submit your application. Please try again.",
      );
      resetTurnstile();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  if (submitSuccess) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <button
          type="button"
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          onClick={handleClose}
          aria-label="Close application confirmation"
        />
        <div className="flex min-h-full items-center justify-center p-4">
          <div
            ref={successRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="job-application-success-title"
            className="relative bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-2xl w-full max-w-2xl text-center shadow-2xl border-2 border-brand-primary/30"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
              aria-label="Close"
            >
              <MaterialIcon icon="close" size="md" />
            </button>

            <div className="mb-6 text-brand-primary">
              <MaterialIcon icon="check_circle" size="4xl" />
            </div>
            <h3
              id="job-application-success-title"
              className="mb-4 font-black text-3xl sm:text-4xl md:text-5xl leading-tight text-gray-900 dark:text-white"
            >
              Application Received
            </h3>
            <p className="mb-6 text-base sm:text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
              Thank you for reaching out to MH Construction. Our team has your
              information and will review it against current hiring needs and
              upcoming work. We believe{" "}
              <span className="font-semibold text-brand-primary dark:text-brand-secondary">
                THE ROI IS THE RELATIONSHIP
              </span>
              —and that starts here.
            </p>
            <div className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 dark:from-brand-primary/20 dark:to-brand-secondary/20 p-4 rounded-xl border border-brand-primary/30 dark:border-brand-primary/40 inline-block">
              <div className="flex items-center gap-2">
                <MaterialIcon
                  icon="military_tech"
                  size="md"
                  className="text-bronze-300"
                />
                <span className="font-semibold text-bronze-300">
                  Veteran-Owned. Your word matters as much as ours.
                </span>
              </div>
            </div>

            <p className="mt-6 text-sm text-gray-500 dark:text-gray-300">
              If there is a fit, we will contact you directly at{" "}
              <a
                href="mailto:office@mhc-gc.com"
                className="font-semibold text-brand-primary hover:text-brand-secondary underline"
              >
                office@mhc-gc.com
              </a>
            </p>

            <div className="mt-8">
              <Button
                type="button"
                onClick={handleClose}
                variant="primary"
                size="lg"
              >
                <MaterialIcon icon="check" size="md" className="mr-2" />
                Done
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <button
        type="button"
        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        onClick={handleClose}
        aria-label="Close application form"
      />
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="job-modal-title"
          aria-describedby={descriptionId}
          className="relative bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl border-2 border-brand-primary/20"
        >
          <div className="relative bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker p-6 sm:p-8 text-white overflow-hidden">
            <div
              className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"
              aria-hidden="true"
            ></div>
            <div
              className="top-0 right-0 absolute bg-white/5 rounded-full w-32 h-32 -translate-y-16 translate-x-16"
              aria-hidden="true"
            />
            <div
              className="bottom-0 left-0 absolute bg-white/5 rounded-full w-24 h-24 -translate-x-12 translate-y-12"
              aria-hidden="true"
            />

            <div className="relative z-10">
              <div className="flex justify-center items-center gap-2 mb-4">
                <MaterialIcon
                  icon="military_tech"
                  size="md"
                  className="text-bronze-300"
                />
                <span className="font-semibold text-bronze-300 text-sm tracking-wide uppercase">
                  {applicationContext.badge}
                </span>
              </div>

              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2
                    id="job-modal-title"
                    className="mb-2 font-black text-2xl sm:text-3xl md:text-4xl leading-tight"
                  >
                    {applicationContext.title}
                  </h2>
                  <p
                    id={descriptionId}
                    className="text-white/90 text-sm sm:text-base"
                  >
                    {applicationContext.description}
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="hover:bg-white/20 p-2 rounded-lg text-white hover:scale-110 transition-all duration-200"
                  aria-label="Close modal"
                >
                  <MaterialIcon icon="close" size="lg" />
                </button>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3 text-left">
                <div className="rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm">
                  <div className="mb-2 flex items-center gap-2 text-bronze-300">
                    <MaterialIcon icon="badge" size="sm" />
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      Step 1
                    </span>
                  </div>
                  <p className="text-sm text-white">
                    Share your name and best email.
                  </p>
                </div>
                <div className="rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm">
                  <div className="mb-2 flex items-center gap-2 text-bronze-300">
                    <MaterialIcon icon="work" size="sm" />
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      Step 2
                    </span>
                  </div>
                  <p className="text-sm text-white">
                    Tell us the role, trade, or path you want.
                  </p>
                </div>
                <div className="rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm">
                  <div className="mb-2 flex items-center gap-2 text-bronze-300">
                    <MaterialIcon icon="description" size="sm" />
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      Step 3
                    </span>
                  </div>
                  <p className="text-sm text-white">
                    Add a resume or background only if it helps.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="rounded-2xl border-2 border-brand-primary/20 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 p-4 sm:p-5 dark:border-brand-primary/30 dark:from-brand-primary/10 dark:to-brand-secondary/10 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 p-2 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-xl">
                    <MaterialIcon
                      icon="info"
                      size="md"
                      className="text-brand-primary"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                      Direct and simple by design
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
                      We start with the essentials. If we need more detail, we
                      will ask in a direct follow-up conversation.
                    </p>
                    <div className="mt-3 pt-3 border-t border-brand-primary/20">
                      <Link
                        href="/careers/print"
                        className="inline-flex items-center gap-2 text-sm font-medium text-brand-primary hover:text-brand-secondary transition-colors"
                        onClick={handleClose}
                      >
                        <MaterialIcon icon="print" size="sm" />
                        <span>
                          Prefer paper? Print a blank application (English /
                          Spanish)
                        </span>
                        <MaterialIcon icon="arrow_forward" size="sm" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="flex items-center mb-4 font-bold text-gray-900 dark:text-white text-xl">
                  <span className="flex items-center justify-center w-8 h-8 mr-3 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-lg">
                    <MaterialIcon
                      icon="person"
                      size="md"
                      className="text-brand-primary"
                    />
                  </span>
                  Essentials
                  <span className="ml-2 text-xs font-medium text-brand-secondary-text dark:text-brand-secondary bg-brand-secondary/10 px-2 py-0.5 rounded-full">
                    Required
                  </span>
                </h3>
                <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                  <Input
                    type="text"
                    name="firstName"
                    label="First Name *"
                    autoFocus
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  <Input
                    type="text"
                    name="lastName"
                    label="Last Name *"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                  <Input
                    type="email"
                    name="email"
                    label="Email Address *"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    helperText="We use this for direct follow-up from our team."
                  />
                  <Input
                    type="tel"
                    name="phone"
                    label="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    helperText="Optional, but helpful if you prefer a call."
                  />
                </div>
              </div>

              <div>
                <h3 className="flex items-center mb-4 font-bold text-gray-900 dark:text-white text-xl">
                  <span className="flex items-center justify-center w-8 h-8 mr-3 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-lg">
                    <MaterialIcon
                      icon="work"
                      size="md"
                      className="text-brand-primary"
                    />
                  </span>
                  Role and Availability
                </h3>
                <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="job-position"
                      className="block mb-1 font-medium text-gray-700 dark:text-gray-200 text-sm"
                    >
                      Position of Interest *
                    </label>
                    <select
                      id="job-position"
                      name="position"
                      required
                      value={formData.position}
                      onChange={handleInputChange}
                      className={SELECT_FIELD_CLASS}
                    >
                      <option value="">Select a role or trade</option>
                      {POSITIONS.map((position) => (
                        <option key={position} value={position}>
                          {position}
                        </option>
                      ))}
                    </select>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                      If your role is not listed, choose "Other" and explain
                      below.
                    </p>
                  </div>
                  <div>
                    <label
                      htmlFor="job-experience"
                      className="block mb-1 font-medium text-gray-700 dark:text-gray-200 text-sm"
                    >
                      Years of Experience *
                    </label>
                    <select
                      id="job-experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className={SELECT_FIELD_CLASS}
                    >
                      <option value="">Not specified yet</option>
                      {EXPERIENCE_LEVELS.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="job-availability"
                      className="block mb-1 font-medium text-gray-700 dark:text-gray-200 text-sm"
                    >
                      Availability
                    </label>
                    <select
                      id="job-availability"
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      className={SELECT_FIELD_CLASS}
                    >
                      <option value="">Not specified yet</option>
                      {AVAILABILITY_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="job-veteran-status"
                      className="block mb-1 font-medium text-gray-700 dark:text-gray-200 text-sm"
                    >
                      Veteran Status
                    </label>
                    <select
                      id="job-veteran-status"
                      name="veteranStatus"
                      value={formData.veteranStatus}
                      onChange={handleInputChange}
                      className={SELECT_FIELD_CLASS}
                    >
                      <option value="">Prefer not to say</option>
                      <option value="veteran">Veteran</option>
                      <option value="active-duty">Active Duty</option>
                      <option value="not-veteran">Not a Veteran</option>
                    </select>
                  </div>
                  <Input
                    type="text"
                    name="referralSource"
                    label="How did you hear about MH Construction?"
                    value={formData.referralSource}
                    onChange={handleInputChange}
                    placeholder="Referral, website, field contact, job board, etc."
                  />
                </div>
              </div>

              <Textarea
                name="coverLetter"
                label="Background or notes"
                rows={5}
                value={formData.coverLetter}
                onChange={handleInputChange}
                helperText="Optional. Tell us about your background, certifications, crew leadership, or the kind of work you want."
                placeholder="Example: 8 years in commercial concrete, OSHA 30, comfortable leading small crews, interested in superintendent or estimator opportunities."
              />

              <div>
                <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200 text-sm">
                  Resume or work history
                </label>
                <p className="mb-3 text-sm text-gray-500 dark:text-gray-300">
                  Optional. If you do not have a resume ready, send the
                  application anyway.
                </p>
                <div className="flex justify-center mt-1 px-6 pt-8 pb-8 border-2 border-gray-300 hover:border-brand-primary dark:border-gray-600 border-dashed rounded-xl transition-all duration-300 hover:bg-gradient-to-br hover:from-brand-primary/5 hover:to-brand-secondary/5 dark:hover:from-brand-primary/10 dark:hover:to-brand-secondary/10 group cursor-pointer">
                  <div className="space-y-2 text-center">
                    <div className="mx-auto w-16 h-16 flex items-center justify-center bg-brand-primary/10 dark:bg-brand-primary/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <MaterialIcon
                        icon="upload"
                        size="2xl"
                        className="text-brand-primary"
                      />
                    </div>
                    <div className="flex flex-wrap justify-center text-gray-600 dark:text-gray-300 text-sm">
                      <label className="relative bg-white dark:bg-gray-700 rounded-md font-semibold text-brand-primary hover:text-brand-secondary cursor-pointer transition-colors">
                        <span>Choose a file</span>
                        <input
                          type="file"
                          name="resume"
                          className="sr-only"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                    <p className="text-gray-500 dark:text-gray-300 text-xs">
                      PDF, DOC, DOCX up to 10MB
                    </p>
                    {formData.resumeFile && (
                      <div className="mt-3 p-3 bg-brand-primary/10 border border-brand-primary/30 rounded-lg">
                        <p className="text-brand-primary text-sm font-medium flex items-center justify-center">
                          <MaterialIcon
                            icon="check_circle"
                            size="sm"
                            className="mr-2"
                          />
                          Selected: {formData.resumeFile.name}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border-2 border-brand-secondary/25 bg-gradient-to-r from-brand-primary/5 via-transparent to-brand-secondary/10 p-4 sm:p-5 dark:border-brand-secondary/35 dark:from-brand-primary/10 dark:to-brand-secondary/15 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 p-2 bg-brand-secondary/15 dark:bg-brand-secondary/25 rounded-xl">
                    <MaterialIcon
                      icon="handshake"
                      size="md"
                      className="text-brand-secondary-text dark:text-brand-secondary"
                    />
                  </div>
                  <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-100">
                    <span className="font-semibold">
                      The goal is a direct conversation
                    </span>
                    , not a long intake process. Start with what you have. We
                    will handle the rest in follow-up.
                  </p>
                </div>
              </div>

              {/* Security Trust Indicator & Turnstile */}
              <div className="rounded-2xl border-2 border-brand-primary/20 bg-gradient-to-r from-brand-primary/5 to-brand-primary/10 p-4 dark:border-brand-primary/30 dark:from-brand-primary/10 dark:to-brand-primary/15">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 p-2 bg-brand-primary/15 dark:bg-brand-primary/25 rounded-xl">
                      <MaterialIcon
                        icon="verified_user"
                        size="md"
                        className="text-brand-primary"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        Your data is protected
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">
                        SSL encrypted • Rate limited • Bot protected
                      </p>
                    </div>
                  </div>
                  {TURNSTILE_SITE_KEY && (
                    <div
                      ref={turnstileRef}
                      className="cf-turnstile flex-shrink-0"
                      data-sitekey={TURNSTILE_SITE_KEY}
                    />
                  )}
                </div>
                {TURNSTILE_SITE_KEY && !turnstileReady && (
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center sm:text-right">
                    Loading security verification...
                  </p>
                )}
                {TURNSTILE_SITE_KEY && turnstileReady && !turnstileToken && (
                  <p className="mt-2 text-xs text-amber-600 dark:text-amber-400 text-center sm:text-right">
                    Please complete the security check above
                  </p>
                )}
                {turnstileToken && (
                  <p className="mt-2 text-xs text-brand-primary dark:text-brand-secondary text-center sm:text-right flex items-center justify-center sm:justify-end gap-1">
                    <MaterialIcon icon="check_circle" size="sm" />
                    Verified
                  </p>
                )}
              </div>

              {submitError && (
                <div
                  role="alert"
                  className="bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800 rounded-md"
                >
                  <p className="text-red-800 dark:text-red-200">
                    {submitError}
                  </p>
                </div>
              )}

              <div className="pt-6 border-gray-200 dark:border-gray-600 border-t">
                <div className="flex flex-col sm:flex-row justify-end gap-4">
                  <Button
                    type="button"
                    onClick={handleClose}
                    variant="default"
                    size="lg"
                    className="order-2 sm:order-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="primary"
                    size="lg"
                    className="order-1 sm:order-2"
                  >
                    {isSubmitting ? (
                      <>
                        <MaterialIcon
                          icon="hourglass_empty"
                          size="md"
                          className="mr-3 animate-spin"
                        />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <MaterialIcon icon="send" size="md" className="mr-3" />
                        Send Application
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Load Cloudflare Turnstile script */}
      {TURNSTILE_SITE_KEY && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="lazyOnload"
          onLoad={mountTurnstile}
        />
      )}
    </div>
  );
}
