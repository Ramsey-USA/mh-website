/**
 * Date and Time Selection Component
 * Step 1 of the booking process
 */

import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { timeSlots, type CalendarDay } from "./bookingTypes";

interface DateTimeSelectorProps {
  calendarDays: CalendarDay[];
  selectedDate: string;
  selectedTime: string;
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
  onContinue: () => void;
}

export function DateTimeSelector({
  calendarDays,
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
  onContinue,
}: DateTimeSelectorProps) {
  const canContinue = selectedDate && selectedTime;

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="mb-6 pb-2 font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
          <span className="flex items-center text-brand-primary drop-shadow-sm">
            <MaterialIcon
              icon="calendar_month"
              size="lg"
              className="mr-3 text-brand-primary"
            />
            Mission Deployment Schedule
          </span>
        </CardTitle>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          Select operational date and time coordinates for your tactical
          briefing
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
                onClick={() => onDateSelect(day.date)}
                aria-label={`Select ${day.dayName}, ${day.displayDate}`}
                aria-pressed={selectedDate === day.date}
                className={`p-3 border rounded-lg text-center transition-all duration-200 ${
                  selectedDate === day.date
                    ? "bg-brand-primary border-brand-primary text-white"
                    : "hover:bg-brand-primary/10 hover:border-brand-primary border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                }`}
              >
                <div className="font-medium text-xs">{day.dayName}</div>
                <div className="font-bold text-lg">{day.displayDate}</div>
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
            <div className="gap-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => onTimeSelect(time)}
                  aria-label={`Select ${time}`}
                  aria-pressed={selectedTime === time}
                  className={`p-4 border rounded-lg text-center font-semibold transition-all duration-200 ${
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
        {canContinue && (
          <div className="pt-4">
            <Button
              onClick={onContinue}
              variant="primary"
              size="lg"
              className="w-full"
            >
              <MaterialIcon icon="arrow_forward" size="lg" className="mr-3" />
              Continue to Details
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
