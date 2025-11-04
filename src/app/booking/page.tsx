"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
  HoverScale,
} from "@/components/animations/FramerMotionComponents";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { consultationService } from "@/lib/cloudflare/storage";
import { useGlobalChatbot } from "@/providers/GlobalChatbotProvider";
// Enhanced SEO handled in layout.tsx

// Available time slots
const timeSlots = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

// Project types
const projectTypes = [
  "Custom Home",
  "Home Addition",
  "Kitchen Remodel",
  "Bathroom Remodel",
  "Commercial Building",
  "Tenant Improvement",
  "Industrial Facility",
  "Religious Facility",
  "Medical Facility",
  "Government Project",
  "Other",
];

interface BookingFormData {
  clientName: string;
  email: string;
  phone: string;
  projectType: string;
  projectDescription: string;
  location: string;
  budget: string;
  selectedDate: string;
  selectedTime: string;
  additionalNotes: string;
}

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
  React.useEffect(() => {
    setGlobalFormData(formData);
  }, [formData, setGlobalFormData]);

  // Handle URL parameters for pre-filling data from quick booking modal
  React.useEffect(() => {
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

  // Generate next 30 days for calendar
  const generateCalendarDays = () => {
    const days = [];
    const today = new Date();

    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Skip weekends for business consultations
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        days.push({
          date: date.toISOString().split("T")[0],
          displayDate: date.getDate(),
          dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
          fullDate: date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          }),
        });
      }
    }
    return days;
  };

  const calendarDays = generateCalendarDays();

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setFormData((prev) => ({ ...prev, selectedDate: date }));
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setFormData((prev) => ({ ...prev, selectedTime: time }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create consultation record
      const consultationData = {
        clientName: formData.clientName,
        email: formData.email,
        phone: formData.phone,
        projectType: formData.projectType as any,
        projectDescription: formData.projectDescription,
        location: formData.location,
        budget: formData.budget ? parseInt(formData.budget) : undefined,
        status: "pending" as const,
        scheduledDate: new Date(
          `${formData.selectedDate}T${convertTo24Hour(formData.selectedTime)}`
        ),
        notes: formData.additionalNotes,
      };

      await consultationService.create(consultationData);
      setSubmitStatus("success");
      setStep(3);
    } catch (error) {
      console.error("Error booking partnership discussion:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const convertTo24Hour = (time12h: string) => {
    const [time, modifier] = time12h.split(" ");
    const [hoursStr, minutes] = time.split(":");
    let hours = hoursStr;
    if (hours === "12") {
      hours = "00";
    }
    if (modifier === "PM") {
      hours = (parseInt(hours, 10) + 12).toString();
    }
    return `${hours}:${minutes || "00"}:00`;
  };

  if (submitStatus === "success") {
    return (
      <div className="bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 min-h-screen flex items-center justify-center">
        <div className="mx-auto px-4 py-20 max-w-5xl">
          <FadeInWhenVisible>
            <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-2xl border-2 border-brand-primary/30 dark:border-brand-primary/40">
              <CardContent className="p-8 sm:p-12 text-center">
                <div className="flex justify-center mb-8 text-brand-primary dark:text-brand-primary">
                  <MaterialIcon icon="check_circle" size="4xl" />
                </div>

                <h1 className="mb-8 pb-2 font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
                  <span className="block text-gray-900 dark:text-white drop-shadow-sm">
                    Consultation Confirmed!
                  </span>
                </h1>

                <div className="space-y-6 mb-10 text-gray-700 dark:text-gray-300">
                  <p className="text-xl sm:text-2xl font-semibold">
                    Thank you,{" "}
                    <span className="text-brand-primary">
                      {formData.clientName}
                    </span>
                    !
                  </p>
                  <p className="text-lg sm:text-xl">
                    Your expert consultation is scheduled:
                  </p>
                  <div className="bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 dark:from-brand-primary/20 dark:to-brand-secondary/20 mx-auto p-6 border-2 border-brand-primary/30 dark:border-brand-primary/40 rounded-xl max-w-md shadow-lg">
                    <p className="flex items-center justify-center gap-3 font-bold text-brand-primary dark:text-brand-primary-light text-xl mb-3">
                      <MaterialIcon icon="event" size="md" />
                      {new Date(formData.selectedDate).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </p>
                    <p className="flex items-center justify-center gap-3 font-bold text-brand-primary dark:text-brand-primary-light text-xl">
                      <MaterialIcon icon="schedule" size="md" />
                      {formData.selectedTime}
                    </p>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl mb-10 text-left max-w-3xl mx-auto border border-gray-200 dark:border-gray-600">
                  <h3 className="mb-6 pb-2 font-black text-2xl sm:text-3xl md:text-4xl text-center text-brand-primary">
                    What Happens Next
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <MaterialIcon
                        icon="email"
                        size="md"
                        className="text-brand-primary flex-shrink-0 mt-1"
                      />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          Confirmation Email
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          You'll receive a detailed confirmation with all
                          consultation details
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <MaterialIcon
                        icon="phone"
                        size="md"
                        className="text-brand-primary flex-shrink-0 mt-1"
                      />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          Pre-Consultation Call
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          Our team will call 24 hours before to confirm and
                          answer any questions
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <MaterialIcon
                        icon="engineering"
                        size="md"
                        className="text-brand-primary flex-shrink-0 mt-1"
                      />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          Expert Team Preparation
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          We'll review your project details and prepare tailored
                          recommendations
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <MaterialIcon
                        icon="location_on"
                        size="md"
                        className="text-brand-primary flex-shrink-0 mt-1"
                      />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          Free On-Site Visit
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          Comprehensive property assessment with detailed
                          estimate provided
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Veteran Discount Notice */}
                <div className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 dark:from-brand-primary/20 dark:to-brand-secondary/20 p-6 rounded-xl mb-10 border border-brand-primary/30 dark:border-brand-primary/40 max-w-3xl mx-auto">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <MaterialIcon
                      icon="military_tech"
                      size="lg"
                      className="text-brand-primary"
                    />
                    <h3 className="font-bold text-brand-primary text-xl">
                      Veteran-Owned Excellence
                    </h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Active military and veterans automatically receive{" "}
                    <strong>10% discount</strong> on all services. Thank you for
                    your service!
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex sm:flex-row flex-col justify-center gap-4 mb-8">
                  <Link href="/">
                    <Button variant="primary" size="lg">
                      <MaterialIcon icon="home" size="lg" className="mr-3" />
                      Return Home
                    </Button>
                  </Link>
                  <Link href="/services">
                    <Button variant="secondary" size="lg">
                      <MaterialIcon icon="build" size="lg" className="mr-3" />
                      Explore Services
                    </Button>
                  </Link>
                </div>

                {/* Contact Info */}
                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 border border-gray-200 dark:border-gray-600 rounded-xl max-w-2xl mx-auto">
                  <p className="mb-3 font-semibold text-gray-900 dark:text-white text-lg">
                    Need to Reschedule?
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Contact us anytime:{" "}
                    <a
                      href="tel:+15093086489"
                      className="font-semibold text-brand-primary hover:text-brand-secondary underline"
                    >
                      (509) 308-6489
                    </a>{" "}
                    or{" "}
                    <a
                      href="mailto:office@mhc-gc.com"
                      className="font-semibold text-brand-primary hover:text-brand-secondary underline"
                    >
                      office@mhc-gc.com
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </FadeInWhenVisible>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-br from-white dark:from-gray-900 via-gray-50 dark:via-gray-900 to-gray-100 dark:to-gray-800 min-h-screen">
        {/* Header */}
        <section
          id="consultation"
          className="bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 min-h-screen flex items-center justify-center text-white"
        >
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 sm:py-0">
            <FadeInWhenVisible className="space-y-6 sm:space-y-8">
              {/* Veteran-Owned Badge */}
              <div className="inline-flex items-center bg-brand-primary/10 dark:bg-brand-primary/20 shadow-lg backdrop-blur-sm mb-4 px-6 py-3 border border-brand-primary/20 dark:border-brand-primary/30 rounded-full">
                <MaterialIcon
                  icon="military_tech"
                  size="sm"
                  className="text-brand-primary"
                />
                <span className="ml-3 font-bold text-brand-primary text-xs uppercase tracking-wider">
                  Veteran-Owned Excellence
                </span>
              </div>

              {/* Primary Tagline - MH Branding Standard */}
              <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 border border-white/20 rounded-xl inline-block">
                <p className="text-base sm:text-lg md:text-xl font-semibold text-brand-secondary tracking-wide">
                  "Building for the Owner, NOT the Dollar"
                </p>
              </div>

              {/* Main Title with Proper Gradient - MH Typography Standards */}
              <h1 className="mb-6 pb-2 font-black text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-relaxed tracking-tighter">
                <span className="block mb-3 font-semibold text-white/80 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight">
                  Schedule Your
                </span>
                <span className="block bg-clip-text bg-gradient-to-r from-brand-secondary via-white to-brand-secondary drop-shadow-lg text-transparent">
                  Expert Consultation
                </span>
              </h1>

              {/* Description */}
              <p className="max-w-4xl mx-auto font-light text-white/90 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide">
                Work WITH Our Team • On-Site Assessment • Custom Solutions
              </p>

              {/* Subtitle */}
              <p className="max-w-4xl mx-auto text-base sm:text-lg md:text-xl text-white/80 leading-relaxed">
                Free consultation with 30+ years of construction expertise. We
                partner with you to bring your vision to life.
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 font-medium text-brand-secondary text-sm sm:text-base">
                <div className="flex items-center">
                  <MaterialIcon icon="handshake" size="sm" className="mr-2" />
                  <span>Partnership Approach</span>
                </div>
                <div className="flex items-center">
                  <MaterialIcon icon="location_on" size="sm" className="mr-2" />
                  <span>Free On-Site Visit</span>
                </div>
                <div className="flex items-center">
                  <MaterialIcon icon="engineering" size="sm" className="mr-2" />
                  <span>Expert Analysis</span>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Page Navigation */}
        <PageNavigation
          items={navigationConfigs.booking}
          className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t-4 border-brand-primary"
        />

        {/* Progress Indicator */}
        <div className="bg-white dark:bg-gray-800 shadow-sm py-4">
          <div className="mx-auto px-4 max-w-4xl">
            <div className="flex justify-center items-center space-x-8">
              <div
                className={`flex items-center ${
                  step >= 1
                    ? "text-brand-primary dark:text-brand-primary"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              >
                <div
                  className={`flex justify-center items-center mr-2 rounded-full w-8 h-8 text-sm font-bold ${
                    step >= 1
                      ? "bg-brand-primary text-white"
                      : "bg-gray-200 dark:bg-gray-600 dark:text-gray-400"
                  }`}
                >
                  1
                </div>
                <span className="font-medium text-sm">Date & Time</span>
              </div>
              <div
                className={`w-16 h-0.5 ${
                  step >= 2
                    ? "bg-brand-primary"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
              <div
                className={`flex items-center ${
                  step >= 2
                    ? "text-brand-primary dark:text-brand-primary"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              >
                <div
                  className={`flex justify-center items-center mr-2 rounded-full w-8 h-8 text-sm font-bold ${
                    step >= 2
                      ? "bg-brand-primary text-white"
                      : "bg-gray-200 dark:bg-gray-600 dark:text-gray-400"
                  }`}
                >
                  2
                </div>
                <span className="font-medium text-sm">Your Details</span>
              </div>
              <div
                className={`w-16 h-0.5 ${
                  step >= 3
                    ? "bg-brand-primary"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
              <div
                className={`flex items-center ${
                  step >= 3
                    ? "text-brand-primary dark:text-brand-primary"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              >
                <div
                  className={`flex justify-center items-center mr-2 rounded-full w-8 h-8 text-sm font-bold ${
                    step >= 3
                      ? "bg-brand-primary text-white"
                      : "bg-gray-200 dark:bg-gray-600 dark:text-gray-400"
                  }`}
                >
                  3
                </div>
                <span className="font-medium text-sm">Confirmation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto px-4 py-12 max-w-4xl">
          <StaggeredFadeIn>
            {step === 1 && (
              <Card className="bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="mb-6 pb-2 font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
                    <span className="flex items-center text-brand-primary drop-shadow-sm">
                      <MaterialIcon
                        icon="calendar_month"
                        size="lg"
                        className="mr-3 text-brand-primary"
                      />
                      Select Date & Time
                    </span>
                  </CardTitle>
                  <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                    Choose your preferred date and time for the consultation
                  </p>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Calendar */}
                  <div>
                    <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-lg">
                      Available Dates
                    </h3>
                    <div className="gap-3 grid grid-cols-4 md:grid-cols-7">
                      {calendarDays.map((day) => (
                        <button
                          key={day.date}
                          onClick={() => handleDateSelect(day.date)}
                          className={`p-3 border rounded-lg text-center transition-all duration-200 ${
                            selectedDate === day.date
                              ? "bg-brand-primary border-brand-primary text-white"
                              : "hover:bg-brand-primary/10 hover:border-brand-primary border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          }`}
                        >
                          <div className="font-medium text-xs">
                            {day.dayName}
                          </div>
                          <div className="font-bold text-lg">
                            {day.displayDate}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Slots */}
                  {selectedDate && (
                    <div>
                      <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-lg">
                        Available Times
                      </h3>
                      <div className="gap-3 grid grid-cols-2 md:grid-cols-4">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => handleTimeSelect(time)}
                            className={`p-3 border rounded-lg text-center transition-all duration-200 ${
                              selectedTime === time
                                ? "bg-brand-primary border-brand-primary text-white"
                                : "hover:bg-brand-primary/10 hover:border-brand-primary border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Continue Button */}
                  {selectedDate && selectedTime && (
                    <div className="pt-6 border-gray-200 dark:border-gray-600 border-t">
                      <div className="bg-brand-primary/10 dark:bg-brand-primary/20 mb-4 p-4 border border-brand-primary/20 dark:border-brand-primary/30 rounded-lg">
                        <p className="font-semibold text-brand-primary dark:text-brand-primary">
                          Selected:{" "}
                          {
                            calendarDays.find((d) => d.date === selectedDate)
                              ?.fullDate
                          }{" "}
                          at {selectedTime}
                        </p>
                      </div>
                      <Button
                        onClick={() => setStep(2)}
                        variant="primary"
                        size="lg"
                        className="w-full"
                      >
                        <MaterialIcon
                          icon="arrow_forward"
                          size="lg"
                          className="mr-3"
                        />
                        Continue to Details
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card
                id="project-types"
                className="bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700"
              >
                <CardHeader>
                  <CardTitle className="mb-6 pb-2 font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
                    <span className="flex items-center text-brand-primary drop-shadow-sm">
                      <MaterialIcon
                        icon="handshake"
                        size="lg"
                        className="mr-3 text-brand-primary"
                      />
                      Partnership Information
                    </span>
                  </CardTitle>
                  <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                    Share your vision so we can partner together to bring it to
                    life
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="gap-4 grid md:grid-cols-2">
                      <div>
                        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="clientName"
                          value={formData.clientName}
                          onChange={handleInputChange}
                          required
                          className="bg-white dark:bg-gray-700 px-4 py-3 border border-gray-300 dark:border-gray-600 focus:border-brand-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary w-full text-gray-900 dark:text-white"
                          placeholder="John Smith"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="bg-white dark:bg-gray-700 px-4 py-3 border border-gray-300 dark:border-gray-600 focus:border-brand-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary w-full text-gray-900 dark:text-white"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="gap-4 grid md:grid-cols-2">
                      <div>
                        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="bg-white dark:bg-gray-700 px-4 py-3 border border-gray-300 dark:border-gray-600 focus:border-brand-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary w-full text-gray-900 dark:text-white"
                          placeholder="(509) 555-0123"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                          Project Type *
                        </label>
                        <select
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleInputChange}
                          required
                          className="bg-white dark:bg-gray-700 px-4 py-3 border border-gray-300 dark:border-gray-600 focus:border-brand-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary w-full text-gray-900 dark:text-white"
                        >
                          <option value="">Select project type</option>
                          {projectTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="gap-4 grid md:grid-cols-2">
                      <div>
                        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                          Project Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="bg-white dark:bg-gray-700 px-4 py-3 border border-gray-300 dark:border-gray-600 focus:border-brand-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary w-full text-gray-900 dark:text-white"
                          placeholder="Pasco, WA"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                          Estimated Budget
                        </label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="bg-white dark:bg-gray-700 px-4 py-3 border border-gray-300 dark:border-gray-600 focus:border-brand-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary w-full text-gray-900 dark:text-white"
                        >
                          <option value="">Select budget range</option>
                          <option value="50000">Under $50,000</option>
                          <option value="100000">$50,000 - $100,000</option>
                          <option value="250000">$100,000 - $250,000</option>
                          <option value="500000">$250,000 - $500,000</option>
                          <option value="1000000">$500,000 - $1,000,000</option>
                          <option value="1000001">Over $1,000,000</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                        Your Partnership Vision *
                      </label>
                      <textarea
                        name="projectDescription"
                        value={formData.projectDescription}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="bg-white dark:bg-gray-700 px-4 py-3 border border-gray-300 dark:border-gray-600 focus:border-brand-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary w-full text-gray-900 dark:text-white"
                        placeholder="Share your vision and goals - we'll work together to bring them to life..."
                      />
                    </div>

                    <div>
                      <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
                        Partnership Notes
                      </label>
                      <textarea
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleInputChange}
                        rows={3}
                        className="bg-white dark:bg-gray-700 px-4 py-3 border border-gray-300 dark:border-gray-600 focus:border-brand-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary w-full text-gray-900 dark:text-white"
                        placeholder="Anything else you'd like to share about our upcoming partnership..."
                      />
                    </div>

                    {/* Summary */}
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                        Partnership Discussion Summary:
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        <span className="flex items-center gap-2 mb-1">
                          <MaterialIcon icon="event" size="sm" />
                          {
                            calendarDays.find((d) => d.date === selectedDate)
                              ?.fullDate
                          }
                        </span>
                        <span className="flex items-center gap-2 mb-1">
                          <MaterialIcon icon="schedule" size="sm" />
                          {selectedTime}
                        </span>
                        <span className="flex items-center gap-2">
                          <MaterialIcon icon="place" size="sm" />
                          Free on-site consultation
                        </span>
                        <br />
                        <span className="flex items-center gap-1">
                          <MaterialIcon icon="schedule" size="sm" />
                          Approximately 60 minutes
                        </span>
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={() => setStep(1)}
                        className="flex-1 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                      >
                        <MaterialIcon
                          icon="arrow_back"
                          size="lg"
                          className="mr-3"
                        />
                        Back to Date & Time
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={isSubmitting}
                        className="flex-1"
                      >
                        {isSubmitting ? (
                          <MaterialIcon
                            icon="hourglass_empty"
                            size="lg"
                            className="mr-3 animate-spin"
                          />
                        ) : (
                          <MaterialIcon
                            icon="check"
                            size="lg"
                            className="mr-3"
                          />
                        )}
                        {isSubmitting
                          ? "Scheduling..."
                          : "Confirm Partnership Discussion"}
                      </Button>
                    </div>

                    {submitStatus === "error" && (
                      <div className="bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800 rounded-lg">
                        <p className="text-red-700 dark:text-red-300">
                          There was an error scheduling your consultation.
                          Please try again or call us at (509) 308-6489.
                        </p>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            )}
          </StaggeredFadeIn>
        </div>
      </div>
    </>
  );
}
