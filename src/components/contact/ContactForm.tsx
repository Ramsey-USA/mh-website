"use client";

import React, { useState } from "react";
import { logger } from "@/lib/utils/logger";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Textarea,
} from "../ui";
import { analytics } from "../analytics/google-analytics";
import { isValidEmail, isValidPhone } from "@/lib/utils/validation";
import { useFormTracking } from "@/lib/analytics/hooks";
import { trackFormSubmit } from "@/lib/analytics/tracking";
import { trackJourneyMilestone } from "@/lib/analytics/marketing-tracking";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  projectCategory: "commercial" | "industrial" | "residential" | "";
  projectType: string;
  projectLocation: string;
  budget: string;
  timeline: string;
  message: string;
  urgency: "low" | "medium" | "high";
  preferredContact: "email" | "phone" | "either";
  isVeteran: boolean;
  organizationType?: string;
  companyName?: string;
}

interface ContactFormProps {
  formType: "general" | "project" | "urgent";
  title: string;
  description?: string;
}

export function ContactForm({
  formType,
  title,
  description,
}: ContactFormProps) {
  // Form tracking hook (field tracking can be added to inputs as needed)
  useFormTracking(`contact-form-${formType}`);

  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    projectCategory: "",
    projectType: "",
    projectLocation: "",
    budget: "",
    timeline: "",
    message: "",
    urgency: "medium",
    preferredContact: "either",
    isVeteran: false,
    organizationType: "",
    companyName: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const commercialProjectTypes = [
    "Office Building",
    "Retail Space",
    "Restaurant/Hospitality",
    "Multi-Family Housing (Apartments)",
    "Warehouse/Distribution Center",
    "Medical Facility",
    "Educational Facility",
    "Mixed-Use Development",
    "Tenant Improvement",
    "Commercial Renovation",
    "Other Commercial",
  ];

  const industrialProjectTypes = [
    "Manufacturing Facility",
    "Warehouse/Storage",
    "Distribution Center",
    "Processing Plant",
    "Industrial Renovation",
    "Equipment Installation",
    "Other Industrial",
  ];

  const residentialProjectTypes = [
    "Custom Home (Veteran)",
    "Home Addition/Extension (Veteran)",
    "Accessibility Modifications (Veteran)",
    "Adaptive Housing (Veteran)",
    "Multi-Generational Home (Veteran)",
    "Other Residential (Veteran)",
  ];

  const getProjectTypes = () => {
    if (formData.projectCategory === "commercial") {
      return commercialProjectTypes;
    }
    if (formData.projectCategory === "industrial") {
      return industrialProjectTypes;
    }
    if (formData.projectCategory === "residential") {
      return residentialProjectTypes;
    }
    return [];
  };

  const budgetRanges = [
    "Under $100,000",
    "$100,000 - $250,000",
    "$250,000 - $500,000",
    "$500,000 - $1,000,000",
    "$1,000,000 - $2,500,000",
    "$2,500,000 - $5,000,000",
    "Over $5,000,000",
    "Not Sure Yet",
  ];

  const timelineOptions = [
    "ASAP",
    "Within 1 month",
    "1-3 months",
    "3-6 months",
    "6-12 months",
    "Over 1 year",
    "Just Planning",
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    // Required fields
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    // Email validation
    if (formData.email && !isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation (if provided)
    if (formData.phone && !isValidPhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Project-specific validation
    if (formType === "project") {
      if (!formData.projectCategory) {
        newErrors.projectCategory = "Please select a project category";
      }
      if (!formData.projectType) {
        newErrors.projectType = "Please select a project type";
      }
      if (!formData.projectLocation.trim()) {
        newErrors.projectLocation = "Project location is required";
      }
      // Validate residential requires veteran status
      if (formData.projectCategory === "residential" && !formData.isVeteran) {
        newErrors.message =
          "Residential projects are only available for Veterans and their families. Please check the Veteran status box or select a Commercial/Industrial project.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Track form submission with analytics
      analytics.contactForm(formType, formData.projectType);

      // Track with our comprehensive analytics system
      trackFormSubmit(`contact-form-${formType}`, {
        projectType: formData.projectType,
        projectCategory: formData.projectCategory,
        urgency: formData.urgency,
        isVeteran: formData.isVeteran,
        budget: formData.budget,
        timeline: formData.timeline,
      });

      // Prepare email content with all form data
      const emailMessage = `
Contact Form Submission - ${formType.toUpperCase()}

Name: ${formData.firstName} ${formData.lastName}
${formData.companyName ? `Company: ${formData.companyName}` : ""}
${formData.organizationType ? `Organization Type: ${formData.organizationType}` : ""}
Email: ${formData.email}
Phone: ${formData.phone || "Not provided"}

${
  formType === "project"
    ? `
Project Category: ${formData.projectCategory.toUpperCase()}
Project Type: ${formData.projectType}
Project Location: ${formData.projectLocation}
Budget Range: ${formData.budget || "Not specified"}
Timeline: ${formData.timeline || "Not specified"}
${formData.projectCategory === "residential" ? `Veteran Status: ${formData.isVeteran ? "✓ Confirmed Veteran" : "Not Veteran"}` : ""}
`
    : ""
}

Urgency Level: ${formData.urgency}
Preferred Contact Method: ${formData.preferredContact}

Message:
${formData.message}
      `.trim();

      // Submit to API endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          subject: `${formType.charAt(0).toUpperCase() + formType.slice(1)} Contact Form - ${formData.projectType || "General Inquiry"}`,
          message: emailMessage,
          type: formType,
          recipientEmail: "office@mhc-gc.com",
          metadata: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            projectType: formData.projectType,
            projectLocation: formData.projectLocation,
            budget: formData.budget,
            timeline: formData.timeline,
            urgency: formData.urgency,
            preferredContact: formData.preferredContact,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      // Track successful conversion
      trackJourneyMilestone("completed_form", {
        formType,
        projectType: formData.projectType,
        isVeteran: formData.isVeteran,
      });

      setIsSubmitted(true);

      // Reset form after successful submission
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          projectCategory: "",
          projectType: "",
          projectLocation: "",
          budget: "",
          timeline: "",
          message: "",
          urgency: "medium",
          preferredContact: "either",
          isVeteran: false,
          organizationType: "",
          companyName: "",
        });
      }, 3000);
    } catch (_error) {
      logger.error("Form submission _error:", _error);
      // Show user-facing error message
      setFormData({
        ...formData,
        message:
          "There was an error submitting your form. Please try again or call us at (509) 308-6489.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <Card className="p-8 text-center">
        <div className="mb-4 text-green-600 text-6xl">✓</div>
        <h3 className="mb-2 font-semibold text-gray-900 dark:text-white text-2xl">
          Partnership Initiated!
        </h3>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          Your partnership request has been received. We&apos;ll reach out
          within 24 hours to begin our collaboration.
        </p>
        <div className="text-gray-500 dark:text-gray-400 text-sm">
          For urgent matters, please call us directly at{" "}
          <strong>(509) 308-6489</strong>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white text-xl">
          {title}
        </CardTitle>
        {description && (
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Fields */}
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                First Name *
              </label>
              <Input
                value={formData.firstName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("firstName", e.target.value)
                }
                className={errors.firstName ? "border-red-500" : ""}
                placeholder="John"
              />
              {errors.firstName && (
                <p className="mt-1 text-red-500 text-sm">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                Last Name *
              </label>
              <Input
                value={formData.lastName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("lastName", e.target.value)
                }
                className={errors.lastName ? "border-red-500" : ""}
                placeholder="Smith"
              />
              {errors.lastName && (
                <p className="mt-1 text-red-500 text-sm">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Company/Organization Information */}
          {formType === "project" && (
            <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
              <div>
                <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                  Company/Organization Name
                </label>
                <Input
                  value={formData.companyName || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("companyName", e.target.value)
                  }
                  placeholder="ABC Corporation"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                  Organization Type
                </label>
                <select
                  value={formData.organizationType || ""}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleInputChange("organizationType", e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="">Select type</option>
                  <option value="corporation">Corporation</option>
                  <option value="llc">LLC</option>
                  <option value="partnership">Partnership</option>
                  <option value="nonprofit">Non-Profit</option>
                  <option value="government">Government/Municipality</option>
                  <option value="individual">Individual/Sole Proprietor</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                Email Address *
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("email", e.target.value)
                }
                className={errors.email ? "border-red-500" : ""}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700 text-sm">
                Phone Number
              </label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("phone", e.target.value)
                }
                className={errors.phone ? "border-red-500" : ""}
                placeholder="(509) 555-0123"
              />
              {errors.phone && (
                <p className="mt-1 text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Project-specific fields */}
          {formType === "project" && (
            <>
              {/* Project Category Selection */}
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <label className="block mb-3 font-semibold text-gray-900 dark:text-white text-base">
                  Project Category *
                </label>
                <div className="gap-3 grid grid-cols-1 md:grid-cols-3">
                  {[
                    {
                      value: "commercial",
                      label: "Commercial",
                      icon: "🏢",
                      desc: "Offices, retail, hospitality",
                    },
                    {
                      value: "industrial",
                      label: "Industrial",
                      icon: "🏭",
                      desc: "Manufacturing, warehouses",
                    },
                    {
                      value: "residential",
                      label: "Residential",
                      icon: "🏠",
                      desc: "Veterans & families only",
                    },
                  ].map((category) => (
                    <button
                      key={category.value}
                      type="button"
                      onClick={() => {
                        handleInputChange("projectCategory", category.value);
                        handleInputChange("projectType", ""); // Reset project type when category changes
                      }}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        formData.projectCategory === category.value
                          ? "border-brand-primary bg-brand-primary/10 dark:bg-brand-primary/20"
                          : "border-gray-300 dark:border-gray-600 hover:border-brand-primary/50"
                      }`}
                    >
                      <div className="text-2xl mb-1">{category.icon}</div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {category.label}
                      </div>
                      <div className="text-gray-600 dark:text-gray-300 text-xs mt-1">
                        {category.desc}
                      </div>
                    </button>
                  ))}
                </div>
                {errors.projectCategory && (
                  <p className="mt-2 text-red-500 text-sm">
                    {errors.projectCategory}
                  </p>
                )}
              </div>

              {/* Veteran Status (shown only for residential) */}
              {formData.projectCategory === "residential" && (
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 rounded-lg">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="veteran-status"
                      checked={formData.isVeteran}
                      onChange={(e) =>
                        handleInputChange("isVeteran", String(e.target.checked))
                      }
                      className="mt-1 w-5 h-5"
                    />
                    <div className="flex-1">
                      <label
                        htmlFor="veteran-status"
                        className="block font-semibold text-gray-900 dark:text-white cursor-pointer"
                      >
                        ✓ I am a U.S. Military Veteran or immediate family
                        member
                      </label>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                        MH Construction proudly serves Veterans. Residential
                        projects are exclusively available to Veterans and their
                        families as part of our commitment to those who served.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                <div>
                  <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                    Project Type *
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handleInputChange("projectType", e.target.value)
                    }
                    disabled={!formData.projectCategory}
                    className={`w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                      errors.projectType ? "border-red-500" : ""
                    } ${!formData.projectCategory ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <option value="">
                      {formData.projectCategory
                        ? "Select project type"
                        : "Select category first"}
                    </option>
                    {getProjectTypes().map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.projectType && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.projectType}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 font-medium text-gray-700 text-sm">
                    Project Location *
                  </label>
                  <Input
                    value={formData.projectLocation}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange("projectLocation", e.target.value)
                    }
                    className={errors.projectLocation ? "border-red-500" : ""}
                    placeholder="Pasco, WA"
                  />
                  {errors.projectLocation && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.projectLocation}
                    </p>
                  )}
                </div>
              </div>

              <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                <div>
                  <label className="block mb-2 font-medium text-gray-700 text-sm">
                    Budget Range
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handleInputChange("budget", e.target.value)
                    }
                    className="px-3 py-2 border border-gray-300 rounded-md w-full"
                  >
                    <option value="">Select budget range</option>
                    {budgetRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-2 font-medium text-gray-700 text-sm">
                    Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handleInputChange("timeline", e.target.value)
                    }
                    className="px-3 py-2 border border-gray-300 rounded-md w-full"
                  >
                    <option value="">Select timeline</option>
                    {timelineOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}

          {/* Urgency and Contact Preference */}
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <div>
              <label className="block mb-2 font-medium text-gray-700 text-sm">
                Urgency Level
              </label>
              <div className="flex gap-2">
                {[
                  {
                    value: "low",
                    label: "Low",
                    color: "bg-green-100 text-green-800",
                  },
                  {
                    value: "medium",
                    label: "Medium",
                    color: "bg-yellow-100 text-yellow-800",
                  },
                  {
                    value: "high",
                    label: "High",
                    color: "bg-red-100 text-red-800",
                  },
                ].map((urgency) => (
                  <button
                    key={urgency.value}
                    type="button"
                    onClick={() =>
                      handleInputChange(
                        "urgency",
                        urgency.value as "low" | "medium" | "high",
                      )
                    }
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      formData.urgency === urgency.value
                        ? urgency.color
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {urgency.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700 text-sm">
                Preferred Contact Method
              </label>
              <div className="flex gap-2">
                {[
                  { value: "email", label: "Email" },
                  { value: "phone", label: "Phone" },
                  { value: "either", label: "Either" },
                ].map((method) => (
                  <button
                    key={method.value}
                    type="button"
                    onClick={() =>
                      handleInputChange(
                        "preferredContact",
                        method.value as "email" | "phone" | "either",
                      )
                    }
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      formData.preferredContact === method.value
                        ? "bg-primary-100 text-primary-800"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {method.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
              {formType === "project"
                ? formData.projectCategory === "residential"
                  ? "Tell Us About Your Project *"
                  : "Project Scope & Requirements *"
                : "Share Your Vision *"}
            </label>
            <Textarea
              value={formData.message}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleInputChange("message", e.target.value)
              }
              className={errors.message ? "border-red-500" : ""}
              rows={5}
              placeholder={
                formType === "project"
                  ? formData.projectCategory === "commercial"
                    ? "Describe your commercial project: square footage, number of stories, special requirements, expected completion timeline, and any specific goals..."
                    : formData.projectCategory === "industrial"
                      ? "Describe your industrial project: facility type, size, specialized equipment needs, compliance requirements, and operational timeline..."
                      : formData.projectCategory === "residential"
                        ? "Tell us about your home project: what you're looking to build or modify, accessibility needs, timeline, and how we can honor your service..."
                        : "Tell us about your vision and how we can work together to bring it to life..."
                  : "Tell us about your vision and how we can work together to bring it to life..."
              }
            />
            {errors.message && (
              <p className="mt-1 text-red-500 text-sm">{errors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
            size="lg"
          >
            {isSubmitting ? "Connecting..." : "Begin Our Partnership"}
          </Button>

          <div className="text-center space-y-2">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              By submitting this form, you're taking the first step in our
              partnership journey. We look forward to working together with you!
            </p>
            {formType === "project" && (
              <p className="text-xs text-gray-400 dark:text-gray-500">
                {formData.projectCategory === "residential"
                  ? "🎖️ Proudly serving those who served. Residential projects exclusively for Veterans."
                  : "🏢 Specializing in commercial and industrial construction excellence."}
              </p>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
