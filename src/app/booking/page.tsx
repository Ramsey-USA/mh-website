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
import { BookingHero } from "./components/BookingHero";
import { ProgressIndicator } from "./components/ProgressIndicator";
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
  const [submitStatus, setSubmitStatus] = useState<
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
    } catch (error) {
      logger.error("Error booking partnership discussion:", error);
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

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16 container">
        <FadeInWhenVisible>
          {/* Progress Indicator */}
          <ProgressIndicator currentStep={step} />

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

      <PageNavigation items={navigationConfigs.booking} />
    </div>
  );
}
