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
import { consultationService } from "@/lib/utils/firebase";
import { useGlobalChatbot } from "../../providers/GlobalChatbotProvider";

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
      <div className="bg-gradient-to-br from-white dark:from-gray-900 via-gray-50 dark:via-gray-900 to-gray-100 dark:to-gray-800 min-h-screen">
        <div className="mx-auto px-4 py-20 max-w-4xl">
          <FadeInWhenVisible>
            <Card className="bg-green-50 dark:bg-green-900/20 shadow-xl border-green-200 dark:border-green-800">
              <CardContent className="p-12 text-center">
                <div className="flex justify-center mb-6 text-green-600 dark:text-green-400">
                  <MaterialIcon icon="check_circle" size="4xl" />
                </div>
                <h1 className="mb-4 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                  <span className="text-gray-300">Partnership Discussion</span>{" "}
                  <span className="bg-clip-text bg-gradient-to-r from-white to-brand-accent text-transparent">
                    Scheduled!
                  </span>
                </h1>
                <div className="space-y-4 mb-8 text-green-700 dark:text-green-300">
                  <p className="text-xl">
                    Thank you, <strong>{formData.clientName}</strong>!
                  </p>
                  <p className="text-lg">
                    Your partnership discussion is scheduled for:
                  </p>
                  <div className="bg-green-100 dark:bg-green-800/30 mx-auto p-4 border border-green-300 dark:border-green-700 rounded-lg max-w-md">
                    <p className="flex items-center gap-2 font-semibold text-green-800 dark:text-green-200">
                      <MaterialIcon icon="event" size="sm" />
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
                    <p className="flex items-center gap-2 font-semibold text-green-800 dark:text-green-200">
                      <MaterialIcon icon="schedule" size="sm" />
                      {formData.selectedTime}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-8 text-green-600 dark:text-green-400 text-sm">
                  <p>
                    <strong>Next Steps:</strong>
                  </p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>
                      You'll receive a partnership confirmation email shortly
                    </li>
                    <li>
                      Your partnership team will call you 24 hours before our
                      discussion
                    </li>
                    <li>
                      We'll come prepared with project insights and
                      collaborative recommendations
                    </li>
                    <li>
                      Free on-site partnership estimate will be provided during
                      our discussion
                    </li>
                  </ul>
                </div>

                <div className="flex sm:flex-row flex-col justify-center gap-4">
                  <Link href="/">
                    <Button variant="primary" size="lg">
                      <MaterialIcon icon="home" className="mr-2" />
                      Return Home
                    </Button>
                  </Link>
                  <Link href="/services">
                    <Button variant="primary" size="lg">
                      <MaterialIcon icon="build" className="mr-2" />
                      View Our Partnership Approach
                    </Button>
                  </Link>
                </div>

                <div className="bg-green-100 dark:bg-green-800/30 mt-8 p-4 border border-green-300 dark:border-green-700 rounded-lg">
                  <p className="mb-2 font-semibold text-green-800 dark:text-green-200">
                    Need to reschedule?
                  </p>
                  <p className="text-green-700 dark:text-green-300 text-sm">
                    Call us at{" "}
                    <a
                      href="tel:+15093086489"
                      className="font-semibold underline"
                    >
                      (509) 308-6489
                    </a>{" "}
                    or email{" "}
                    <a
                      href="mailto:office@mhc-gc.com"
                      className="font-semibold underline"
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
    <div className="bg-gradient-to-br from-white dark:from-gray-900 via-gray-50 dark:via-gray-900 to-gray-100 dark:to-gray-800 min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-800 dark:from-black via-gray-900 dark:via-gray-900 to-black dark:to-black pt-24 pb-16 text-white">
        <div className="mx-auto px-4 max-w-4xl text-center">
          <FadeInWhenVisible>
            <h1 className="mb-4 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              <span className="text-white/90">Schedule Our</span>{" "}
              <span className="bg-clip-text bg-gradient-to-r from-white to-brand-accent text-transparent">
                Partnership Discussion
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-white/90 text-xl">
              Connect with your partnership-focused team for a collaborative
              consultation on your construction vision
            </p>
          </FadeInWhenVisible>
        </div>
      </section>

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
                step >= 2 ? "bg-brand-primary" : "bg-gray-300 dark:bg-gray-600"
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
                step >= 3 ? "bg-brand-primary" : "bg-gray-300 dark:bg-gray-600"
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
                <CardTitle className="flex items-center text-gray-900 dark:text-white text-2xl">
                  <MaterialIcon icon="calendar_month" className="mr-3" />
                  Select Date & Time
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-300">
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
                        <div className="font-medium text-xs">{day.dayName}</div>
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
                      <MaterialIcon icon="arrow_forward" className="mr-2" />
                      Continue to Details
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card className="bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-white text-2xl">
                  <MaterialIcon icon="person" className="mr-3" />
                  Partnership Information
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-300">
                  Share your details so we can begin our collaboration
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
                      onClick={() => setStep(1)}
                      className="flex-1 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                    >
                      <MaterialIcon icon="arrow_back" className="mr-2" />
                      Back to Date & Time
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isSubmitting}
                      className="flex-1"
                    >
                      {isSubmitting ? (
                        <MaterialIcon
                          icon="hourglass_empty"
                          className="mr-2 animate-spin"
                        />
                      ) : (
                        <MaterialIcon icon="check" className="mr-2" />
                      )}
                      {isSubmitting
                        ? "Scheduling..."
                        : "Schedule Partnership Discussion"}
                    </Button>
                  </div>

                  {submitStatus === "error" && (
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800 rounded-lg">
                      <p className="text-red-700 dark:text-red-300">
                        There was an error scheduling your partnership
                        discussion. Please try again or call us at (509)
                        308-6489.
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
  );
}
