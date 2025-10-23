"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button, Card, CardHeader, CardTitle, CardContent } from "../";
import { MaterialIcon } from "../../icons/MaterialIcon";

interface QuickBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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

export function QuickBookingModal({ isOpen, onClose }: QuickBookingModalProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [step, setStep] = useState(1); // 1: Date/Time, 2: Contact Info

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
  });

  // Generate next 10 business days for quick selection
  const generateQuickDays = () => {
    const days = [];
    const today = new Date();

    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        days.push({
          date: date.toISOString().split("T")[0],
          displayDate: date.getDate(),
          dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
          fullDate: date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          }),
        });

        if (days.length >= 8) break; // Show only 8 days for quick selection
      }
    }
    return days;
  };

  const quickDays = generateQuickDays();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuickSubmit = () => {
    // Redirect to full booking page with pre-filled data
    const params = new URLSearchParams({
      date: selectedDate,
      time: selectedTime,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      projectType: formData.projectType,
    });

    window.location.href = `/booking?${params.toString()}`;
  };

  const resetModal = () => {
    setStep(1);
    setSelectedDate("");
    setSelectedTime("");
    setFormData({ name: "", email: "", phone: "", projectType: "" });
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="z-[60] fixed inset-0 flex justify-center items-center animate-modal-backdrop">
      {/* Enhanced Backdrop with stronger blur */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Enhanced Modal with better shadow and animation */}
      <div className="z-10 relative mx-4 w-full max-w-3xl max-h-[95vh] overflow-y-auto animate-modal-slide">
        <Card className="bg-white dark:bg-gray-900 shadow-2xl border-0 ring-1 ring-black/10 dark:ring-white/10 animate-pulse-glow">
          <CardHeader className="relative bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary p-8 overflow-hidden text-white">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10" />
            <div className="top-0 right-0 absolute bg-white/5 rounded-full w-32 h-32 -translate-y-16 translate-x-16" />
            <div className="bottom-0 left-0 absolute bg-white/5 rounded-full w-24 h-24 -translate-x-12 translate-y-12" />

            <div className="z-10 relative flex justify-between items-start">
              <div className="flex-1">
                <CardTitle className="flex items-center mb-3 font-bold text-3xl">
                  <Image
                    src="/images/logo/mh-logo.png"
                    alt="MH Construction"
                    width={128}
                    height={128}
                    className="mr-4 w-32 h-32 object-contain"
                  />
                  <div>
                    <div>Schedule Free Consultation</div>
                    <div className="mt-1 font-normal text-white/90 text-lg">
                      Book your site visit in under 2 minutes
                    </div>
                  </div>
                </CardTitle>
                <div className="flex items-center space-x-6 mt-4 text-white/80 text-sm">
                  <div className="flex items-center space-x-2">
                    <MaterialIcon icon="schedule" size="sm" />
                    <span>60-minute site visit</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MaterialIcon icon="location_on" size="sm" />
                    <span>On-site consultation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MaterialIcon icon="payments" size="sm" />
                    <span>100% Free</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="group hover:bg-white/20 p-3 rounded-xl hover:scale-110 transition-all duration-200"
                aria-label="Close modal"
              >
                <MaterialIcon
                  icon="close"
                  size="lg"
                  className="text-white group-hover:rotate-90 transition-transform duration-200"
                />
              </button>
            </div>
          </CardHeader>

          <CardContent className="bg-white dark:bg-gray-900 p-8 text-gray-900 dark:text-white">
            {step === 1 && (
              <div className="space-y-8">
                {/* Step indicator */}
                <div className="flex justify-center items-center space-x-4 mb-6">
                  <div className="flex items-center">
                    <div className="flex justify-center items-center bg-brand-primary rounded-full w-8 h-8 font-bold text-white text-sm">
                      1
                    </div>
                    <span className="ml-2 font-medium text-gray-200">
                      Select Date & Time
                    </span>
                  </div>
                  <div className="bg-gray-600 dark:bg-gray-400 w-12 h-0.5" />
                  <div className="flex items-center">
                    <div className="flex justify-center items-center bg-gray-600 dark:bg-gray-500 rounded-full w-8 h-8 font-bold text-gray-400 dark:text-gray-300 text-sm">
                      2
                    </div>
                    <span className="ml-2 text-gray-400 dark:text-gray-500 text-sm">
                      Contact Information
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-gray-900 dark:text-white text-xl">
                      Choose Your Consultation Date
                    </h3>
                    <div className="flex items-center space-x-2 bg-amber-900/50 px-3 py-1 border border-amber-700 rounded-full text-amber-300 text-sm">
                      <MaterialIcon icon="check_circle" size="sm" />
                      <span>Next 8 business days</span>
                    </div>
                  </div>
                  <div className="gap-3 grid grid-cols-4 stagger-animation">
                    {quickDays.map((day, index) => (
                      <button
                        key={day.date}
                        onClick={() => setSelectedDate(day.date)}
                        className={`group relative p-4 border-2 rounded-xl text-center transition-all duration-300 hover:scale-105 animate-in slide-in-from-bottom ${
                          selectedDate === day.date
                            ? "bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/25 scale-105"
                            : "hover:bg-brand-primary/20 hover:border-brand-primary/50 border-gray-300 dark:border-gray-600 hover:shadow-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        }`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {selectedDate === day.date && (
                          <div className="-top-1 -right-1 absolute flex justify-center items-center bg-white shadow-md rounded-full w-6 h-6">
                            <MaterialIcon
                              icon="check"
                              size="sm"
                              className="text-brand-primary"
                            />
                          </div>
                        )}
                        <div className="opacity-75 mb-1 font-semibold text-xs">
                          {day.dayName}
                        </div>
                        <div className="font-bold text-lg">
                          {day.displayDate}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedDate && (
                  <div className="slide-in-from-bottom animate-in duration-300">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-gray-900 dark:text-white text-xl">
                        Select Your Consultation Time
                      </h3>
                      <div className="flex items-center space-x-2 bg-blue-900/50 px-3 py-1 border border-blue-700 rounded-full text-blue-300 text-sm">
                        <MaterialIcon icon="access_time" size="sm" />
                        <span>Business hours only</span>
                      </div>
                    </div>
                    <div className="gap-3 grid grid-cols-4 stagger-animation">
                      {timeSlots.map((time, index) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`group relative p-4 border-2 rounded-xl text-center transition-all duration-300 hover:scale-105 animate-in slide-in-from-bottom ${
                            selectedTime === time
                              ? "bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/25 scale-105"
                              : "hover:bg-brand-primary/20 hover:border-brand-primary/50 border-gray-300 dark:border-gray-600 hover:shadow-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                          }`}
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          {selectedTime === time && (
                            <div className="-top-1 -right-1 absolute flex justify-center items-center bg-white shadow-md rounded-full w-6 h-6">
                              <MaterialIcon
                                icon="check"
                                size="sm"
                                className="text-brand-primary"
                              />
                            </div>
                          )}
                          <div className="font-semibold">{time}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedDate && selectedTime && (
                  <div className="slide-in-from-bottom pt-6 border-gray-600 border-t animate-in duration-500">
                    <div className="bg-gradient-to-r from-brand-primary/20 via-brand-primary/10 to-brand-primary/20 mb-6 p-6 border border-brand-primary/30 rounded-2xl">
                      <div className="flex items-center mb-3">
                        <MaterialIcon
                          icon="event"
                          className="mr-2 text-brand-primary"
                        />
                        <span className="font-bold text-brand-primary text-lg">
                          Consultation Scheduled
                        </span>
                      </div>
                      <p className="font-semibold text-gray-900 dark:text-white text-lg">
                        {
                          quickDays.find((d) => d.date === selectedDate)
                            ?.fullDate
                        }{" "}
                        at {selectedTime}
                      </p>
                      <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                        Our expert team will visit your location for a
                        comprehensive site consultation to discuss your vision
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <Button
                        onClick={() => setStep(2)}
                        size="lg"
                        variant="primary"
                        className="flex-1 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                      >
                        <MaterialIcon icon="arrow_forward" className="mr-2" />
                        Continue to Details
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => (window.location.href = "/booking")}
                        className="hover:bg-brand-primary border-2 border-brand-primary text-brand-primary hover:text-white transition-all duration-300"
                      >
                        <MaterialIcon icon="event" className="mr-2" />
                        Full Booking Form
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                {/* Step indicator */}
                <div className="flex justify-center items-center space-x-4 mb-6">
                  <div className="flex items-center">
                    <div className="flex justify-center items-center bg-amber-500 rounded-full w-8 h-8 text-white text-sm">
                      <MaterialIcon icon="check" size="sm" />
                    </div>
                    <span className="ml-2 font-medium text-amber-400 text-sm">
                      Date & Time
                    </span>
                  </div>
                  <div className="bg-brand-primary w-12 h-0.5" />
                  <div className="flex items-center">
                    <div className="flex justify-center items-center bg-brand-primary rounded-full w-8 h-8 font-bold text-white text-sm">
                      2
                    </div>
                    <span className="ml-2 font-medium text-gray-200">
                      Contact Details
                    </span>
                  </div>
                </div>

                {/* Selected time confirmation */}
                <div className="bg-gradient-to-r from-amber-900/30 via-yellow-900/30 to-amber-900/30 p-6 border border-amber-700/50 rounded-2xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center mb-2">
                        <MaterialIcon
                          icon="check_circle"
                          className="mr-2 text-amber-400"
                        />
                        <span className="font-bold text-amber-300">
                          Consultation Time Selected
                        </span>
                      </div>
                      <p className="font-semibold text-gray-900 dark:text-white text-lg">
                        {
                          quickDays.find((d) => d.date === selectedDate)
                            ?.fullDate
                        }{" "}
                        at {selectedTime}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setStep(1)}
                      className="hover:bg-amber-900/50 border-amber-500 text-amber-300"
                    >
                      <MaterialIcon icon="edit" size="sm" className="mr-1" />
                      Change
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="mb-6 font-bold text-gray-900 dark:text-white text-xl">
                    Tell Us About Your Project
                  </h3>

                  <div className="space-y-6">
                    <div className="gap-4 grid md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="flex items-center font-semibold text-gray-700 dark:text-gray-200 text-sm">
                          <MaterialIcon
                            icon="person"
                            size="sm"
                            className="mr-2 text-brand-primary"
                          />
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border border-gray-300 dark:border-gray-600 focus:border-brand-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary w-full text-gray-900 dark:text-white transition-all duration-200"
                          placeholder="John Smith"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center font-semibold text-gray-700 dark:text-gray-200 text-sm">
                          <MaterialIcon
                            icon="email"
                            size="sm"
                            className="mr-2 text-brand-primary"
                          />
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border border-gray-300 dark:border-gray-600 focus:border-brand-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary w-full text-gray-900 dark:text-white transition-all duration-200"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="gap-4 grid md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="flex items-center font-semibold text-gray-700 dark:text-gray-200 text-sm">
                          <MaterialIcon
                            icon="phone"
                            size="sm"
                            className="mr-2 text-brand-primary"
                          />
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border border-gray-300 dark:border-gray-600 focus:border-brand-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary w-full text-gray-900 dark:text-white transition-all duration-200"
                          placeholder="(509) 555-0123"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center font-semibold text-gray-700 dark:text-gray-200 text-sm">
                          <MaterialIcon
                            icon="build"
                            size="sm"
                            className="mr-2 text-brand-primary"
                          />
                          Project Type
                        </label>
                        <select
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleInputChange}
                          className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border border-gray-300 dark:border-gray-600 focus:border-brand-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary w-full text-gray-900 dark:text-white transition-all duration-200"
                        >
                          <option value="">Select project type</option>
                          <option value="Custom Home">
                            [HOME] Custom Home
                          </option>
                          <option value="Home Addition">
                            🏡 Home Addition
                          </option>
                          <option value="Kitchen Remodel">
                            🍳 Kitchen Remodel
                          </option>
                          <option value="Bathroom Remodel">
                            🛁 Bathroom Remodel
                          </option>
                          <option value="Commercial Building">
                            [APARTMENT] Commercial Building
                          </option>
                          <option value="Other">[BUILD] Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Value proposition */}
                    <div className="gap-4 grid grid-cols-1 md:grid-cols-3 mt-8">
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 border border-gray-200 dark:border-gray-600 rounded-xl text-center">
                        <MaterialIcon
                          icon="schedule"
                          size="lg"
                          className="mb-2 text-brand-primary"
                        />
                        <div className="font-semibold text-gray-900 dark:text-white text-sm">
                          60-Minute
                        </div>
                        <div className="text-gray-600 dark:text-gray-300 text-xs">
                          Site Visit
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 border border-gray-200 dark:border-gray-600 rounded-xl text-center">
                        <MaterialIcon
                          icon="payments"
                          size="lg"
                          className="mb-2 text-bronze-500"
                        />
                        <div className="font-semibold text-gray-900 dark:text-white text-sm">
                          100% Free
                        </div>
                        <div className="text-gray-600 dark:text-gray-300 text-xs">
                          No Obligation
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 border border-gray-200 dark:border-gray-600 rounded-xl text-center">
                        <MaterialIcon
                          icon="verified_user"
                          size="lg"
                          className="mb-2 text-brand-accent"
                        />
                        <div className="font-semibold text-gray-900 dark:text-white text-sm">
                          Expert Partners
                        </div>
                        <div className="text-gray-600 dark:text-gray-300 text-xs">
                          30+ Years
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-6 border-gray-300 dark:border-gray-600 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 border-2 border-gray-400 dark:border-gray-500 text-gray-600 hover:text-gray-800 dark:hover:text-white dark:text-gray-300 transition-all duration-300"
                  >
                    <MaterialIcon icon="arrow_back" className="mr-2" />
                    Back
                  </Button>
                  <Button
                    onClick={handleQuickSubmit}
                    disabled={
                      !formData.name || !formData.email || !formData.phone
                    }
                    variant="primary"
                    className="flex-1 disabled:opacity-50 shadow-lg hover:shadow-xl hover:scale-105 disabled:hover:scale-100 transition-all duration-300 disabled:cursor-not-allowed"
                  >
                    <MaterialIcon icon="event" className="mr-2" />
                    Schedule Free Consultation
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
