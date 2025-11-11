/**
 * Booking Page - Main Orchestrator
 * Coordinates consultation booking workflow
 */

"use client";
import { logger } from "@/lib/utils/logger";
import { useState, useEffect } from "react";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { consultationService } from "@/lib/cloudflare/storage";
import { useGlobalChatbot } from "@/providers/GlobalChatbotProvider";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import { ChatbotCTASection } from "@/components/chatbot";
import { FormProgress } from "@/components/forms";
import { BookingHero } from "./components/BookingHero";
import { DateTimeSelector } from "./components/DateTimeSelector";
import { BookingForm } from "./components/BookingForm";
import { ConfirmationPage } from "./components/ConfirmationPage";
import {
  generateCalendarDays,
  convertTo24Hour,
} from "./components/bookingUtils";
import type { BookingFormData } from "./components/bookingTypes";

export default function BookingPage() {
  const { setFormData: setGlobalFormData } = useGlobalChatbot();

  const [step, setStep] = useState(1); // 1: Date/Time, 2: Details, 3: Confirmation
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [_submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const [formData, setFormData] = useState<BookingFormData>({
    clientName: "",
    email: "",
    phone: "",
    projectType: "",
    projectDescription: "",
    location: "",
    budget: "",
    selectedDate: "",
    selectedTime: "",
    additionalNotes: "",
  });

  // Sync local form data with global chatbot context
  useEffect(() => {
    setGlobalFormData(formData);
  }, [formData, setGlobalFormData]);

  // Load saved progress on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("booking_form_data");
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          const savedAt = new Date(parsed.savedAt);
          const hoursSinceSave =
            (Date.now() - savedAt.getTime()) / (1000 * 60 * 60);

          // Only restore if saved within last 24 hours
          if (hoursSinceSave < 24) {
            const shouldRestore =
              typeof window !== "undefined" &&
              // eslint-disable-next-line no-alert -- User confirmation for restoring form data
              window.confirm(
                "Would you like to continue from where you left off?",
              );
            if (shouldRestore) {
              setStep(parsed.step);
              setSelectedDate(parsed.selectedDate || "");
              setSelectedTime(parsed.selectedTime || "");
              setFormData(parsed.formData);
            } else {
              localStorage.removeItem("booking_form_data");
            }
          } else {
            // Clear old saved data
            localStorage.removeItem("booking_form_data");
          }
        } catch (_error) {
          console.error("Error loading saved form data:", _error);
        }
      }
    }
  }, []);

  // Handle URL parameters for pre-filling data from quick booking modal
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const prefilledData: Partial<BookingFormData> = {};

      if (urlParams.get("date")) {
        const date = urlParams.get("date")!;
        setSelectedDate(date);
        prefilledData.selectedDate = date;
      }

      if (urlParams.get("time")) {
        const time = urlParams.get("time")!;
        setSelectedTime(time);
        prefilledData.selectedTime = time;
      }

      if (urlParams.get("name")) {
        prefilledData.clientName = urlParams.get("name")!;
      }

      if (urlParams.get("email")) {
        prefilledData.email = urlParams.get("email")!;
      }

      if (urlParams.get("phone")) {
        prefilledData.phone = urlParams.get("phone")!;
      }

      if (urlParams.get("projectType")) {
        prefilledData.projectType = urlParams.get("projectType")!;
      }

      // If we have date and time, skip to step 2
      if (urlParams.get("date") && urlParams.get("time")) {
        setStep(2);
      }

      // Update form data with prefilled values
      if (Object.keys(prefilledData).length > 0) {
        setFormData((prev) => ({ ...prev, ...prefilledData }));
      }
    }
  }, []);

  const calendarDays = generateCalendarDays();

  const handleDateSelect = (dateStr: string) => {
    setSelectedDate(dateStr);
    setFormData((prev) => ({ ...prev, selectedDate: dateStr }));
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setFormData((prev) => ({ ...prev, selectedTime: time }));
  };

  const handleContinueToDetails = () => {
    if (selectedDate && selectedTime) {
      setStep(2);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Store consultation in database
      const consultationData = {
        clientName: formData.clientName,
        email: formData.email,
        phone: formData.phone,
        projectType: formData.projectType,
        projectDescription: formData.projectDescription,
        location: formData.location,
        budget: formData.budget ? parseInt(formData.budget) : undefined,
        status: "pending" as const,
        scheduledDate: new Date(
          `${formData.selectedDate}T${convertTo24Hour(formData.selectedTime)}`,
        ),
        notes: formData.additionalNotes,
      };

      await consultationService.create(consultationData);

      // Send email notification to office@mhc-gc.com
      try {
        const emailMessage = `
New Partnership Discussion Booking

Client Information:
Name: ${formData.clientName}
Email: ${formData.email}
Phone: ${formData.phone}

Consultation Details:
Date: ${new Date(formData.selectedDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
Time: ${formData.selectedTime}

Project Information:
Type: ${formData.projectType}
Location: ${formData.location}
Budget: ${formData.budget ? `$${parseInt(formData.budget).toLocaleString()}` : "Not specified"}

Project Description:
${formData.projectDescription}

Additional Notes:
${formData.additionalNotes || "None provided"}

---
Please contact the client to confirm this consultation appointment.
        `.trim();

        const emailResponse = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.clientName,
            email: formData.email,
            phone: formData.phone,
            subject: `New Consultation Booking: ${formData.projectType} - ${formData.clientName}`,
            message: emailMessage,
            type: "consultation",
            recipientEmail: "office@mhc-gc.com",
            metadata: {
              projectType: formData.projectType,
              location: formData.location,
              budget: formData.budget,
              scheduledDate: formData.selectedDate,
              scheduledTime: formData.selectedTime,
            },
          }),
        });

        if (!emailResponse.ok) {
          logger.error("Failed to send booking notification email");
        }
      } catch (emailError) {
        logger.error("Error sending booking email:", emailError);
        // Continue even if email fails
      }

      setSubmitStatus("success");
      setStep(3);
    } catch (_error) {
      logger.error("Error booking partnership discussion:", _error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToDateSelection = () => {
    setStep(1);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
      <BookingHero />

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-7xl">
        <FadeInWhenVisible>
          {/* What to Expect Section */}
          <div
            id="what-to-expect"
            className="mx-auto mb-16 max-w-5xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-6">
              <h2 className="flex items-center gap-3 font-bold text-2xl text-white md:text-3xl">
                <span className="material-icons text-4xl">info</span>
                What to Expect During Your Consultation
              </h2>
              <p className="mt-2 text-primary-100">
                We make the process simple and transparent from start to finish
              </p>
            </div>

            <div className="gap-8 grid md:grid-cols-2 p-8">
              {/* Left Column: Before Your Consultation */}
              <div className="space-y-6">
                <div>
                  <h3 className="flex items-center gap-2 mb-4 font-bold text-primary-600 text-xl dark:text-primary-400">
                    <span className="material-icons">checklist</span>
                    Before Your Consultation
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="material-icons mt-1 text-accent-600 dark:text-accent-400">
                        photo_library
                      </span>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                          Gather Project Photos
                        </p>
                        <p className="text-gray-600 text-sm dark:text-gray-400">
                          Take photos of the project area from multiple angles
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="material-icons mt-1 text-accent-600 dark:text-accent-400">
                        architecture
                      </span>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                          Review Any Plans
                        </p>
                        <p className="text-gray-600 text-sm dark:text-gray-400">
                          Have architectural drawings or sketches ready if
                          available
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="material-icons mt-1 text-accent-600 dark:text-accent-400">
                        fact_check
                      </span>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                          Note Property Details
                        </p>
                        <p className="text-gray-600 text-sm dark:text-gray-400">
                          Property age, lot size, access constraints, utilities
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="material-icons mt-1 text-accent-600 dark:text-accent-400">
                        schedule
                      </span>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                          Consider Your Timeline
                        </p>
                        <p className="text-gray-600 text-sm dark:text-gray-400">
                          Ideal start date, project duration, any deadlines
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="material-icons mt-1 text-accent-600 dark:text-accent-400">
                        attach_money
                      </span>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                          Set a Budget Range
                        </p>
                        <p className="text-gray-600 text-sm dark:text-gray-400">
                          Helps us tailor recommendations to your investment
                          level
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="material-icons mt-1 text-accent-600 dark:text-accent-400">
                        lightbulb
                      </span>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                          List Your Priorities
                        </p>
                        <p className="text-gray-600 text-sm dark:text-gray-400">
                          What matters most: speed, quality, budget, safety,
                          etc.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: During & After */}
              <div className="space-y-6">
                <div>
                  <h3 className="flex items-center gap-2 mb-4 font-bold text-primary-600 text-xl dark:text-primary-400">
                    <span className="material-icons">event_available</span>
                    During Your Consultation
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="material-icons mt-1 text-secondary-600 dark:text-secondary-400">
                        handshake
                      </span>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                          45-60 Minute Discussion
                        </p>
                        <p className="text-gray-600 text-sm dark:text-gray-400">
                          Thorough review of your project goals and requirements
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="material-icons mt-1 text-secondary-600 dark:text-secondary-400">
                        engineering
                      </span>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                          Expert Recommendations
                        </p>
                        <p className="text-gray-600 text-sm dark:text-gray-400">
                          Our 20+ years experience guides optimal solutions
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="material-icons mt-1 text-secondary-600 dark:text-secondary-400">
                        quiz
                      </span>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                          Q&A Session
                        </p>
                        <p className="text-gray-600 text-sm dark:text-gray-400">
                          Ask anything about our process, safety, or
                          capabilities
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="material-icons mt-1 text-secondary-600 dark:text-secondary-400">
                        explore
                      </span>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                          Site Visit Planning
                        </p>
                        <p className="text-gray-600 text-sm dark:text-gray-400">
                          Schedule on-site assessment if needed (usually
                          required)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 mb-4 font-bold text-primary-600 text-xl dark:text-primary-400">
                    <span className="material-icons">rocket_launch</span>
                    After Your Consultation
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="material-icons mt-1 text-primary-600 dark:text-primary-400">
                        description
                      </span>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                          Detailed Proposal
                        </p>
                        <p className="text-gray-600 text-sm dark:text-gray-400">
                          Receive comprehensive estimate within 3-5 business
                          days
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="material-icons mt-1 text-primary-600 dark:text-primary-400">
                        support_agent
                      </span>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                          Dedicated Point of Contact
                        </p>
                        <p className="text-gray-600 text-sm dark:text-gray-400">
                          Direct line to project manager for all questions
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="material-icons mt-1 text-primary-600 dark:text-primary-400">
                        event_note
                      </span>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                          Zero Obligation
                        </p>
                        <p className="text-gray-600 text-sm dark:text-gray-400">
                          Take your time to review - no pressure to commit
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <FormProgress
            currentStep={step}
            steps={[
              {
                number: 1,
                label: "Date & Time",
                icon: "event",
                description: "Select your preferred consultation date and time",
              },
              {
                number: 2,
                label: "Project Details",
                icon: "assignment",
                description:
                  "Tell us about your project and contact information",
              },
              {
                number: 3,
                label: "Confirmation",
                icon: "check_circle",
                description: "Review and confirm your consultation booking",
              },
            ]}
            showPercentage={true}
            enableSaveResume={true}
            onSave={() => {
              // Save form data to localStorage
              if (typeof window !== "undefined") {
                localStorage.setItem(
                  "booking_form_data",
                  JSON.stringify({
                    step,
                    selectedDate,
                    selectedTime,
                    formData,
                    savedAt: new Date().toISOString(),
                  }),
                );
              }
            }}
            variant="default"
            showDescriptions={false}
          />

          {/* Step Content */}
          <div className="mx-auto max-w-5xl">
            {step === 1 && (
              <DateTimeSelector
                calendarDays={calendarDays}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onDateSelect={handleDateSelect}
                onTimeSelect={handleTimeSelect}
                onContinue={handleContinueToDetails}
              />
            )}

            {step === 2 && (
              <BookingForm
                formData={formData}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
                onBack={handleBackToDateSelection}
                isSubmitting={isSubmitting}
              />
            )}

            {step === 3 && (
              <ConfirmationPage
                formData={formData}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
              />
            )}
          </div>
        </FadeInWhenVisible>
      </div>

      {/* Chatbot CTA - Consultation Questions */}
      <ChatbotCTASection
        context="booking"
        title="Questions About Consultations?"
        subtitle="Chat with General MH for instant answers about our free consultation process"
        exampleQuestions={[
          "Is the consultation really free?",
          "How long does it take?",
          "Can I do it virtually?",
          "What should I prepare?",
          "What happens after?",
        ]}
      />

      <PageNavigation items={navigationConfigs.booking} />
    </div>
  );
}
