"use client";

import React, { useState } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { getFirebaseDb } from "@/lib/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

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
    >
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
      // Submit to Firebase
      const applicationData = {
        ...formData,
        resumeFileName: formData.resumeFile?.name || "",
        resumeFileSize: formData.resumeFile?.size || 0,
        submittedAt: serverTimestamp(),
        status: "new",
      };

      await addDoc(
        collection(getFirebaseDb(), "jobApplications"),
        applicationData
      );

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
      <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 p-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg w-full max-w-md text-center">
          <div className="mb-4 text-[#386851]">
            <svg
              className="mx-auto w-16 h-16"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h3 className="mb-2 font-bold text-gray-900 dark:text-white text-xl">
            Welcome to Our Partnership Team!
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Thank you for your interest in joining our partnership team. We'll
            review your application and contact you soon to discuss how we can
            work together.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#386851] to-[#2D5443] p-6 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <MaterialIcon icon="work" className="w-6 h-6" />
              <h2 className="font-bold text-2xl">Join Our Partnership Team</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <MaterialIcon icon="close" className="w-6 h-6" />
            </button>
          </div>
          <p className="mt-2 text-white/90">
            We're excited to learn more about you and how you can contribute as
            a partner in MH Construction's mission to build excellence together.
          </p>
        </div>

        {/* Form */}
        <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="flex items-center mb-4 font-semibold text-gray-900 dark:text-white text-lg">
                <MaterialIcon
                  icon="person"
                  className="mr-2 w-5 h-5 text-[#386851]"
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
              <h3 className="flex items-center mb-4 font-semibold text-gray-900 dark:text-white text-lg">
                <MaterialIcon
                  icon="email"
                  className="mr-2 w-5 h-5 text-[#386851]"
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
              <h3 className="flex items-center mb-4 font-semibold text-gray-900 dark:text-white text-lg">
                <MaterialIcon
                  icon="place"
                  className="mr-2 w-5 h-5 text-[#386851]"
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
              <h3 className="flex items-center mb-4 font-semibold text-gray-900 dark:text-white text-lg">
                <MaterialIcon
                  icon="work"
                  className="mr-2 w-5 h-5 text-[#386851]"
                />
                Partnership Role Information
              </h3>
              <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                <div>
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200 text-sm">
                    Partnership Role of Interest *
                  </label>
                  <select
                    name="position"
                    required
                    value={formData.position}
                    onChange={handleInputChange}
                    className="bg-white dark:bg-gray-700 px-3 py-2 border border-gray-300 dark:border-gray-600 focus:border-transparent rounded-md focus:outline-none focus:ring-[#386851] focus:ring-2 w-full text-gray-900 dark:text-white"
                  >
                    <option value="">Select a partnership role</option>
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
              <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200 text-sm">
                Tell us about yourself and why you'd like to join our
                partnership at MH Construction
              </label>
              <textarea
                name="coverLetter"
                rows={4}
                value={formData.coverLetter}
                onChange={handleInputChange}
                className="bg-white dark:bg-gray-700 px-3 py-2 border border-gray-300 dark:border-gray-600 focus:border-transparent rounded-md focus:outline-none focus:ring-[#386851] focus:ring-2 w-full text-gray-900 dark:text-white"
                placeholder="Share your experience, goals, and what interests you about partnering with our team to build excellence together..."
              />
            </div>

            {/* Resume Upload */}
            <div>
              <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200 text-sm">
                Resume (PDF, DOC, or DOCX)
              </label>
              <div className="flex justify-center mt-1 px-6 pt-5 pb-6 border-2 border-gray-300 hover:border-[#386851] dark:border-gray-600 border-dashed rounded-md transition-colors">
                <div className="space-y-1 text-center">
                  <MaterialIcon
                    icon="upload"
                    className="mx-auto w-12 h-12 text-gray-400 dark:text-gray-500"
                  />
                  <div className="flex text-gray-600 dark:text-gray-300 text-sm">
                    <label className="relative bg-white dark:bg-gray-700 rounded-md font-medium text-[#386851] hover:text-[#BD9264] cursor-pointer">
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
                    <p className="mt-2 text-[#386851] text-sm">
                      Selected: {formData.resumeFile.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* How did you hear about us */}
            <div>
              <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200 text-sm">
                How did you hear about this partnership opportunity?
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
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-[#386851] hover:from-[#BD9264] to-[#2D5443] hover:to-[#386851] disabled:opacity-50 px-6 py-3 rounded-md text-white transition-all duration-200 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Join Our Partnership Team"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
