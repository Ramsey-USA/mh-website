"use client";

import React, { useState } from "react";
import { MaterialIcon } from "../icons/MaterialIcon";
import { Card, CardContent, CardHeader, CardTitle, Button, Input } from "../ui";
import { analytics } from "../analytics/google-analytics";

interface LeadCaptureProps {
  source?: string;
  className?: string;
  title?: string;
  subtitle?: string;
  compact?: boolean;
}

interface QuickLeadData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  location: string;
  source: string;
}

export const LeadCapture: React.FC<LeadCaptureProps> = ({
  source = "website",
  className = "",
  title = "Begin Our Partnership",
  subtitle = "Start your construction journey with experienced partners",
  compact = false,
}) => {
  const [formData, setFormData] = useState<QuickLeadData>({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    location: "",
    source,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<QuickLeadData>>({});

  const projectTypes = [
    "Custom Home",
    "Home Renovation",
    "Commercial Building",
    "Kitchen Remodel",
    "Bathroom Remodel",
    "Addition/Extension",
    "Emergency Repair",
    "Other",
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<QuickLeadData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.projectType) {
      newErrors.projectType = "Project type is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Track lead capture event
      analytics.event("lead_capture", {
        source: formData.source,
        project_type: formData.projectType,
        location: formData.location || "not_specified",
      });

      // Simulate API call (replace with actual lead capture API)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Lead captured:", formData);

      setIsSubmitted(true);

      // Track successful lead submission
      analytics.event("lead_submitted", {
        source: formData.source,
        project_type: formData.projectType,
      });
    } catch (error) {
      console.error("Lead submission error:", error);
      setErrors({ email: "Submission failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof QuickLeadData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <Card className={`${className} border-green-200 bg-green-50`}>
        <CardContent className="p-6 text-center">
          <div className="flex justify-center mb-3 text-green-600 text-4xl">
            <MaterialIcon icon="check_circle" size="4xl" />
          </div>
          <h3 className="mb-2 font-semibold text-green-800 dark:text-green-100 text-xl">
            Partnership Initiated!
          </h3>
          <p className="mb-4 text-green-700 dark:text-green-200">
            We&apos;ve received your information and will contact you within 24
            hours to begin our partnership discussion.
          </p>
          <div className="text-green-600 dark:text-green-300 text-sm">
            <p>
              <strong>Next Steps:</strong>
            </p>
            <ul className="space-y-1 mt-2 list-disc list-inside">
              <li>Our partnership team will review your vision</li>
              <li>We&apos;ll call to schedule our initial discussion</li>
              <li>Free on-site partnership consultation within 48 hours</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className={compact ? "pb-4" : ""}>
        <CardTitle className={compact ? "text-lg" : "text-xl"}>
          {title}
        </CardTitle>
        {subtitle && (
          <p className="text-gray-600 dark:text-gray-300 text-sm">{subtitle}</p>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Enter your full name"
            error={errors.name}
            required
          />

          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="your.email@example.com"
              error={errors.email}
              required
            />

            <Input
              label="Phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="(509) 555-0123"
              error={errors.phone}
              required
            />
          </div>

          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">
                Project Type *
              </label>
              <select
                value={formData.projectType}
                onChange={(e) =>
                  handleInputChange("projectType", e.target.value)
                }
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent ${
                  errors.projectType ? "border-red-300" : "border-gray-300"
                }`}
                required
              >
                <option value="">Select project type</option>
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.projectType && (
                <p className="mt-1 text-red-600 text-xs">
                  {errors.projectType}
                </p>
              )}
            </div>

            <Input
              label="Project Location"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              placeholder="City, State"
              helperText="Where is your project located?"
            />
          </div>

          <div className="bg-blue-50 p-4 border border-blue-200 rounded-lg">
            <div className="flex items-start">
              <div className="flex items-center mr-3 text-blue-500 text-xl">
                <MaterialIcon icon="target" size="md" />
              </div>
              <div>
                <h4 className="mb-1 font-semibold text-blue-800 dark:text-blue-100">
                  Partnership Benefits:
                </h4>
                <ul className="space-y-1 text-blue-700 dark:text-blue-200 text-sm">
                  <li>• Free partnership consultation and vision assessment</li>
                  <li>• Detailed collaboration plan within 48 hours</li>
                  <li>
                    • Experienced partners with 20+ years building together
                  </li>
                  <li>• Licensed, bonded, and fully insured partnership</li>
                </ul>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size={compact ? "default" : "lg"}
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="mr-2 border-white border-b-2 rounded-full w-4 h-4 animate-spin"></div>
                Submitting...
              </>
            ) : (
              "Begin Our Partnership"
            )}
          </Button>

          <p className="text-gray-500 dark:text-gray-400 text-xs text-center">
            By submitting this form, you're taking the first step toward our
            partnership. We respect your privacy and will never spam you.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

// Quick Lead Capture for sticky/floating elements
export const QuickLeadCapture: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isExpanded) {
    return (
      <div className="right-6 bottom-6 z-50 fixed">
        <Button
          onClick={() => setIsExpanded(true)}
          variant="primary"
          size="lg"
          className="shadow-lg hover:shadow-xl"
        >
          💬 Partnership Discussion
        </Button>
      </div>
    );
  }

  return (
    <div className="right-6 bottom-6 z-50 fixed w-80 max-w-[calc(100vw-3rem)]">
      <LeadCapture
        source="floating_cta"
        title="Quick Consultation Request"
        subtitle="Get your free estimate in 24 hours"
        compact={true}
        className="shadow-2xl"
      />
      <Button
        onClick={() => setIsExpanded(false)}
        variant="outline"
        size="sm"
        className="-top-2 -right-2 absolute bg-white p-0 border-gray-300 hover:border-gray-400 rounded-full w-8 h-8"
      >
        ×
      </Button>
    </div>
  );
};
