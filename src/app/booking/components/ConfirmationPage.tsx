/**
 * Booking Confirmation Component
 * Step 3 success page with appointment details
 */

import Link from "next/link";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import type { BookingFormData } from "./bookingTypes";

interface ConfirmationPageProps {
  formData: BookingFormData;
  selectedDate: string;
  selectedTime: string;
}

export function ConfirmationPage({
  formData,
  selectedDate,
  selectedTime,
}: ConfirmationPageProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-8">
      {/* Success Message */}
      <Card className="bg-gradient-to-br from-green-50 dark:from-green-900/20 to-emerald-50 dark:to-emerald-900/20 shadow-xl border-2 border-green-500">
        <CardContent className="pt-8">
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-500 shadow-lg mb-6 p-4 rounded-full">
              <MaterialIcon
                icon="check_circle"
                size="xl"
                className="text-white text-5xl"
              />
            </div>
            <h2 className="mb-4 font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white">
              Mission Briefing Confirmed!
            </h2>
            <p className="mb-6 max-w-2xl text-gray-700 text-lg dark:text-gray-300">
              Thank you for choosing MH Construction. General MH and our
              tactical team are ready to execute your construction mission with
              military precision.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Appointment Details */}
      <Card className="bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <MaterialIcon
              icon="event"
              size="lg"
              className="mr-3 text-brand-primary"
            />
            Mission Coordinates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="gap-4 grid sm:grid-cols-2">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <MaterialIcon
                  icon="calendar_today"
                  size="md"
                  className="mr-2 text-brand-primary"
                />
                <p className="font-semibold text-gray-700 dark:text-gray-300">
                  Date
                </p>
              </div>
              <p className="font-bold text-gray-900 text-lg dark:text-white">
                {formatDate(selectedDate)}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <MaterialIcon
                  icon="schedule"
                  size="md"
                  className="mr-2 text-brand-primary"
                />
                <p className="font-semibold text-gray-700 dark:text-gray-300">
                  Time
                </p>
              </div>
              <p className="font-bold text-gray-900 text-lg dark:text-white">
                {selectedTime}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <MaterialIcon
                icon="construction"
                size="md"
                className="mr-2 text-brand-primary"
              />
              <p className="font-semibold text-gray-700 dark:text-gray-300">
                Project Type
              </p>
            </div>
            <p className="font-bold text-gray-900 text-lg dark:text-white">
              {formData.projectType}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Veteran Discount Notice */}
      <Card className="bg-gradient-to-r from-brand-primary/5 dark:from-brand-primary/10 to-brand-secondary/5 dark:to-brand-secondary/10 border-2 border-brand-primary/30 dark:border-brand-primary/40">
        <CardContent className="py-6">
          <div className="flex items-start gap-4">
            <div className="bg-brand-primary shadow-md p-3 rounded-full">
              <MaterialIcon
                icon="military_tech"
                size="lg"
                className="text-white"
              />
            </div>
            <div className="flex-1">
              <h3 className="mb-2 font-bold text-brand-primary text-xl dark:text-brand-secondary">
                Veteran-Owned Excellence
              </h3>
              <p className="text-gray-800 dark:text-gray-200">
                As a veteran-owned business, we&apos;re proud to offer 12%
                combat veteran discount and priority scheduling. General MH will
                recognize your service branch during your tactical briefing.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <MaterialIcon
              icon="list_alt"
              size="lg"
              className="mr-3 text-brand-primary"
            />
            Mission Operations Protocol
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex items-center justify-center bg-brand-primary shadow-md mt-1 rounded-full w-8 h-8 min-w-[2rem] text-white">
                1
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Intel Package Dispatch
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  You&apos;ll receive a confirmation email at{" "}
                  <span className="font-medium">{formData.email}</span> with
                  calendar coordinates and tactical briefing details.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center justify-center bg-brand-primary shadow-md mt-1 rounded-full w-8 h-8 min-w-[2rem] text-white">
                2
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Strategic Reconnaissance
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Our tactical team will analyze your mission parameters and
                  prepare strategic recommendations.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center justify-center bg-brand-primary shadow-md mt-1 rounded-full w-8 h-8 min-w-[2rem] text-white">
                3
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Tactical Briefing
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  We&apos;ll contact you at{" "}
                  <span className="font-medium">{formData.phone}</span> at your
                  scheduled time for your 60-minute mission briefing.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center justify-center bg-brand-primary shadow-md mt-1 rounded-full w-8 h-8 min-w-[2rem] text-white">
                4
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Mission Plan Delivery
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  After your briefing, we&apos;ll deploy a detailed action plan
                  and operational timeline for your construction mission.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="bg-gradient-to-br from-gray-50 dark:from-gray-800 to-gray-100 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
        <CardContent className="py-6">
          <h3 className="mb-4 font-bold text-center text-gray-900 text-xl dark:text-white">
            Need to Make Changes?
          </h3>
          <p className="mb-6 text-center text-gray-600 dark:text-gray-400">
            If you need to reschedule or have questions, contact us:
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <a
              href="tel:+15092210609"
              className="flex items-center gap-2 text-brand-primary hover:text-brand-secondary transition-colors"
            >
              <MaterialIcon icon="phone" size="md" />
              <span className="font-semibold">(509) 221-0609</span>
            </a>
            <a
              href="mailto:info@mhconstruction.com"
              className="flex items-center gap-2 text-brand-primary hover:text-brand-secondary transition-colors"
            >
              <MaterialIcon icon="email" size="md" />
              <span className="font-semibold">info@mhconstruction.com</span>
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button asChild variant="secondary" size="lg">
          <Link href="/">
            <MaterialIcon icon="home" size="lg" className="mr-3" />
            Return Home
          </Link>
        </Button>
        <Button asChild variant="primary" size="lg">
          <Link href="/projects">
            <MaterialIcon icon="photo_library" size="lg" className="mr-3" />
            View Our Work
          </Link>
        </Button>
      </div>
    </div>
  );
}
