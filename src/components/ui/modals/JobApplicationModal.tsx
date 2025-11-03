"use client";

import React, { useState } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
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

export function JobApplicationModal({
  isOpen,
  onClose,
}: JobApplicationModalProps) {
  const [formData, setFormData] = useState<ApplicationData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    position: "",
    experience: "",
    availability: "",
    coverLetter: "",
    veteranStatus: "",
    referralSource: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const positions = [
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

  const experienceLevels = [
    "0-1 years",
    "2-5 years",
    "6-10 years",
    "11-15 years",
    "16+ years",
  ];

  const availabilityOptions = [
    "Immediately",
    "Within 2 weeks",
    "Within 1 month",
    "Within 3 months",
    "Other",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, resumeFile: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Submit to API endpoint (which will handle Cloudflare storage)
      const applicationData = {
        ...formData,
        resumeFileName: formData.resumeFile?.name || "",
        resumeFileSize: formData.resumeFile?.size || 0,
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

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      setSubmitSuccess(true);
      setTimeout(() => {
        onClose();
        setSubmitSuccess(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          zipCode: "",
          position: "",
          experience: "",
          availability: "",
          coverLetter: "",
          veteranStatus: "",
          referralSource: "",
        });
      }, 2000);
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmitError("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  if (submitSuccess) {
    return (
      <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/70 backdrop-blur-sm p-4">
        <div className="bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-2xl w-full max-w-2xl text-center shadow-2xl border-2 border-brand-primary/30">
          <div className="mb-6 text-brand-primary">
            <MaterialIcon icon="check_circle" size="4xl" />
          </div>
          <h3 className="mb-4 pb-2 font-black text-3xl sm:text-4xl md:text-5xl leading-tight">
            <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent drop-shadow-sm">
              Welcome to Our Team!
            </span>
          </h3>
          <p className="mb-6 text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Thank you for your interest in joining our veteran-owned company.
            We'll review your application and contact you soon to discuss how we
            can work together.
          </p>

          {/* Veteran Badge */}
          <div className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 dark:from-brand-primary/20 dark:to-brand-secondary/20 p-4 rounded-xl border border-brand-primary/30 dark:border-brand-primary/40 inline-block">
            <div className="flex items-center gap-2">
              <MaterialIcon
                icon="military_tech"
                size="md"
                className="text-brand-primary"
              />
              <span className="font-semibold text-brand-primary">
                Veteran-Owned Excellence
              </span>
            </div>
          </div>

          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            Your application has been sent to{" "}
            <a
              href="mailto:office@mhc-gc.com"
              className="font-semibold text-brand-primary hover:text-brand-secondary underline"
            >
              office@mhc-gc.com
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl border-2 border-brand-primary/20">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary p-6 sm:p-8 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/10 via-transparent to-transparent"></div>

          <div className="relative z-10 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg border border-white/20">
                <MaterialIcon icon="work" size="lg" />
              </div>
              <div>
                <h2 className="font-black text-2xl sm:text-3xl md:text-4xl leading-tight">
                  Join Our Team
                </h2>
                <p className="text-white/90 text-sm sm:text-base mt-1">
                  Veteran-Owned Excellence
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-brand-secondary transition-colors hover:bg-white/10 p-2 rounded-lg"
            >
              <MaterialIcon icon="close" size="lg" />
            </button>
          </div>

          {/* Tagline */}
          <div className="relative z-10 mt-4 bg-white/10 backdrop-blur-sm p-3 border border-white/20 rounded-lg inline-block">
            <p className="text-sm sm:text-base font-semibold text-brand-secondary">
              "Building for the Owner, NOT the Dollar"
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="flex items-center mb-4 font-bold text-gray-900 dark:text-white text-xl">
                <MaterialIcon
                  icon="person"
                  size="md"
                  className="mr-3 text-brand-primary"
                />
                Personal Information
              </h3>
              <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                <div>
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200 text-sm">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="bg-white dark:bg-gray-700 px-3 py-2 border border-gray-300 dark:border-gray-600 focus:border-transparent rounded-md focus:outline-none focus:ring-[#386851] focus:ring-2 w-full text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200 text-sm">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="bg-white dark:bg-gray-700 px-3 py-2 border border-gray-300 dark:border-gray-600 focus:border-transparent rounded-md focus:outline-none focus:ring-[#386851] focus:ring-2 w-full text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="flex items-center mb-4 font-bold text-gray-900 dark:text-white text-xl">
                <MaterialIcon
                  icon="email"
                  size="md"
                  className="mr-3 text-brand-primary"
                />
                Contact Information
              </h3>
              <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                <div>
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200 text-sm">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-white dark:bg-gray-700 px-3 py-2 border border-gray-300 dark:border-gray-600 focus:border-transparent rounded-md focus:outline-none focus:ring-[#386851] focus:ring-2 w-full text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200 text-sm">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="bg-white dark:bg-gray-700 px-3 py-2 border border-gray-300 dark:border-gray-600 focus:border-transparent rounded-md focus:outline-none focus:ring-[#386851] focus:ring-2 w-full text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <h3 className="flex items-center mb-4 font-bold text-gray-900 dark:text-white text-xl">
                <MaterialIcon
                  icon="place"
                  size="md"
                  className="mr-3 text-brand-primary"
                />
                Address
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200 text-sm">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="bg-white dark:bg-gray-700 px-3 py-2 border border-gray-300 dark:border-gray-600 focus:border-transparent rounded-md focus:outline-none focus:ring-[#386851] focus:ring-2 w-full text-gray-900 dark:text-white"
                  />
                </div>
                <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
                  <div>
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200 text-sm">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="bg-white dark:bg-gray-700 px-3 py-2 border border-gray-300 dark:border-gray-600 focus:border-transparent rounded-md focus:outline-none focus:ring-[#386851] focus:ring-2 w-full text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200 text-sm">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="bg-white dark:bg-gray-700 px-3 py-2 border border-gray-300 dark:border-gray-600 focus:border-transparent rounded-md focus:outline-none focus:ring-[#386851] focus:ring-2 w-full text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200 text-sm">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="bg-white dark:bg-gray-700 px-3 py-2 border border-gray-300 dark:border-gray-600 focus:border-transparent rounded-md focus:outline-none focus:ring-[#386851] focus:ring-2 w-full text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Position Information */}
            <div>
              <h3 className="flex items-center mb-4 font-bold text-gray-900 dark:text-white text-xl">
                <MaterialIcon
                  icon="work"
                  size="md"
                  className="mr-3 text-brand-primary"
                />
                Position Information
              </h3>
              <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                <div>
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200 text-sm">
                    Position of Interest *
                  </label>
                  <select
                    name="position"
                    required
                    value={formData.position}
                    onChange={handleInputChange}
                    className="bg-white dark:bg-gray-700 px-3 py-2 border border-gray-300 dark:border-gray-600 focus:border-transparent rounded-md focus:outline-none focus:ring-brand-primary focus:ring-2 w-full text-gray-900 dark:text-white"
                  >
                    <option value="">Select a position</option>
                    {positions.map((position) => (
                      <option key={position} value={position}>
                        {position}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200 text-sm">
                    Years of Experience *
                  </label>
                  <select
                    name="experience"
                    required
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="bg-white dark:bg-gray-700 px-3 py-2 border border-gray-300 dark:border-gray-600 focus:border-transparent rounded-md focus:outline-none focus:ring-[#386851] focus:ring-2 w-full text-gray-900 dark:text-white"
                  >
                    <option value="">Select experience level</option>
                    {experienceLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200 text-sm">
                  Availability *
                </label>
                <select
                  name="availability"
                  required
                  value={formData.availability}
                  onChange={handleInputChange}
                  className="bg-white dark:bg-gray-700 px-3 py-2 border border-gray-300 dark:border-gray-600 focus:border-transparent rounded-md focus:outline-none focus:ring-[#386851] focus:ring-2 w-full text-gray-900 dark:text-white"
                >
                  <option value="">Select availability</option>
                  {availabilityOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200 text-sm">
                  Veteran Status
                </label>
                <select
                  name="veteranStatus"
                  value={formData.veteranStatus}
                  onChange={handleInputChange}
                  className="bg-white dark:bg-gray-700 px-3 py-2 border border-gray-300 dark:border-gray-600 focus:border-transparent rounded-md focus:outline-none focus:ring-[#386851] focus:ring-2 w-full text-gray-900 dark:text-white"
                >
                  <option value="">Prefer not to say</option>
                  <option value="veteran">Veteran</option>
                  <option value="active-duty">Active Duty</option>
                  <option value="not-veteran">Not a Veteran</option>
                </select>
              </div>
            </div>

            {/* Cover Letter */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200 text-sm">
                Tell us about yourself and why you'd like to join our team
              </label>
              <textarea
                name="coverLetter"
                rows={5}
                value={formData.coverLetter}
                onChange={handleInputChange}
                className="bg-white dark:bg-gray-700 px-4 py-3 border border-gray-300 dark:border-gray-600 focus:border-transparent rounded-lg focus:outline-none focus:ring-brand-primary focus:ring-2 w-full text-gray-900 dark:text-white"
                placeholder="Share your experience, skills, and career goals. What excites you about joining our veteran-owned company?"
              />
            </div>

            {/* Resume Upload */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200 text-sm">
                Resume (PDF, DOC, or DOCX)
              </label>
              <div className="flex justify-center mt-1 px-6 pt-6 pb-6 border-2 border-gray-300 hover:border-brand-primary dark:border-gray-600 border-dashed rounded-xl transition-all hover:bg-brand-primary/5">
                <div className="space-y-2 text-center">
                  <MaterialIcon
                    icon="upload"
                    size="3xl"
                    className="mx-auto text-brand-primary/60"
                  />
                  <div className="flex text-gray-600 dark:text-gray-300 text-sm">
                    <label className="relative bg-white dark:bg-gray-700 rounded-md font-semibold text-brand-primary hover:text-brand-secondary cursor-pointer transition-colors">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        name="resume"
                        className="sr-only"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
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

            {/* How did you hear about us */}
            <div>
              <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200 text-sm">
                How did you hear about this opportunity?
              </label>
              <input
                type="text"
                name="referralSource"
                value={formData.referralSource}
                onChange={handleInputChange}
                className="bg-white dark:bg-gray-700 px-3 py-2 border border-gray-300 dark:border-gray-600 focus:border-transparent rounded-md focus:outline-none focus:ring-[#386851] focus:ring-2 w-full text-gray-900 dark:text-white"
                placeholder="Job board, referral, website, etc."
              />
            </div>

            {/* Error Message */}
            {submitError && (
              <div className="bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800 rounded-md">
                <p className="text-red-800 dark:text-red-200">{submitError}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-6 border-gray-200 dark:border-gray-600 border-t">
              <div className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 dark:from-brand-primary/20 dark:to-brand-secondary/20 mb-6 p-4 border border-brand-primary/30 dark:border-brand-primary/40 rounded-xl">
                <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
                  <MaterialIcon
                    icon="info"
                    size="sm"
                    className="inline mr-2 text-brand-primary"
                  />
                  Your application will be sent to our HR team at{" "}
                  <a
                    href="mailto:office@mhc-gc.com"
                    className="font-semibold text-brand-primary hover:text-brand-secondary underline"
                  >
                    office@mhc-gc.com
                  </a>
                  . We'll review your submission and contact you within 3-5
                  business days.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 font-semibold transition-all order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-brand-primary to-brand-primary-dark hover:from-brand-secondary hover:to-brand-primary disabled:opacity-50 px-8 py-3 rounded-lg text-white font-bold transition-all duration-200 disabled:cursor-not-allowed shadow-lg hover:shadow-xl order-1 sm:order-2 flex items-center justify-center"
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
                      Submit Application
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
