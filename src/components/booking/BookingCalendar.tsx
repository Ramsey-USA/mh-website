'use client'

import React, { useState, useEffect } from 'react'
import { Button, Card, CardHeader, CardTitle, CardContent } from '../ui'

interface TimeSlot {
  id: string
  time: string
  available: boolean
  teamMember?: string
}

interface CalendarDay {
  date: Date
  dayNumber: number
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  isAvailable: boolean
  timeSlots: TimeSlot[]
}

interface BookingCalendarProps {
  onTimeSlotSelected?: (date: Date, timeSlot: TimeSlot) => void
}

export function BookingCalendar({
  onTimeSlotSelected,
}: BookingCalendarProps = {}) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null
  )
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([])

  // Business hours: Monday-Friday 8:00 AM - 3:00 PM (Pacific Time)
  const businessHours = {
    start: 8, // 8:00 AM
    end: 15, // 3:00 PM
    days: [1, 2, 3, 4, 5], // Monday-Friday
  }

  const generateTimeSlots = (date: Date): TimeSlot[] => {
    const slots: TimeSlot[] = []
    const dayOfWeek = date.getDay()

    // Only generate slots for business days
    if (!businessHours.days.includes(dayOfWeek)) {
      return slots
    }

    // Generate hourly slots during business hours
    for (let hour = businessHours.start; hour < businessHours.end; hour++) {
      const timeString = formatTime(hour)
      const isAvailable = isSlotAvailable(date, hour)

      slots.push({
        id: `${date.toISOString().split('T')[0]}-${hour}`,
        time: timeString,
        available: isAvailable,
        teamMember: getAvailableTeamMember(date, hour),
      })
    }

    return slots
  }

  const formatTime = (hour: number): string => {
    if (hour === 12) return '12:00 PM'
    if (hour > 12) return `${hour - 12}:00 PM`
    return `${hour}:00 AM`
  }

  const isSlotAvailable = (date: Date, hour: number): boolean => {
    const now = new Date()
    const slotDateTime = new Date(date)
    slotDateTime.setHours(hour, 0, 0, 0)

    // Don't allow booking in the past
    if (slotDateTime <= now) return false

    // Require at least 24 hours advance notice
    const twentyFourHoursFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000)
    if (slotDateTime < twentyFourHoursFromNow) return false

    // Mock some unavailable slots (in real app, this would check Firebase)
    const unavailableSlots = [
      // Mock existing bookings
      { date: '2025-09-23', hour: 9 },
      { date: '2025-09-23', hour: 14 },
      { date: '2025-09-24', hour: 10 },
    ]

    const dateString = date.toISOString().split('T')[0]
    return !unavailableSlots.some(
      slot => slot.date === dateString && slot.hour === hour
    )
  }

  const getAvailableTeamMember = (date: Date, hour: number): string => {
    // Mock team member availability logic
    const dayOfWeek = date.getDay()

    if (dayOfWeek >= 2 && dayOfWeek <= 4 && hour >= 9 && hour <= 16) {
      return 'Sarah Harris' // Design Director available Tue-Thu 9-4
    } else if (hour >= 7 && hour <= 17) {
      return 'Jim Rodriguez' // Project Manager available Mon-Fri 7-5
    } else {
      return 'Mark Harris' // Founder available Mon-Fri 8-3
    }
  }

  const generateCalendarDays = (date: Date): CalendarDay[] => {
    const year = date.getFullYear()
    const month = date.getMonth()

    // Get first day of the month and last day
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    // Get the first Sunday of the calendar view
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days: CalendarDay[] = []
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Generate 42 days (6 weeks)
    for (let i = 0; i < 42; i++) {
      const currentDay = new Date(startDate)
      currentDay.setDate(startDate.getDate() + i)

      const isCurrentMonth = currentDay.getMonth() === month
      const isToday = currentDay.getTime() === today.getTime()
      const isSelected =
        selectedDate && currentDay.getTime() === selectedDate.getTime()
      const isAvailable = isCurrentMonth && currentDay >= today

      days.push({
        date: new Date(currentDay),
        dayNumber: currentDay.getDate(),
        isCurrentMonth,
        isToday,
        isSelected: Boolean(isSelected),
        isAvailable,
        timeSlots: isAvailable ? generateTimeSlots(currentDay) : [],
      })
    }

    return days
  }

  useEffect(() => {
    setCalendarDays(generateCalendarDays(currentDate))
  }, [currentDate, selectedDate])

  const handleDateSelect = (day: CalendarDay) => {
    if (!day.isAvailable) return
    setSelectedDate(day.date)
    setSelectedTimeSlot(null)
  }

  const handleTimeSlotSelect = (timeSlot: TimeSlot) => {
    if (!timeSlot.available || !selectedDate) return
    if (onTimeSlotSelected) {
      onTimeSlotSelected(selectedDate, timeSlot)
    } else {
      setSelectedTimeSlot(timeSlot)
    }
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1))
    setCurrentDate(newDate)
    setSelectedDate(null)
    setSelectedTimeSlot(null)
  }

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="mx-auto max-w-6xl">
      <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl">
                  {monthNames[currentDate.getMonth()]}{' '}
                  {currentDate.getFullYear()}
                </CardTitle>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateMonth('prev')}
                  >
                    ←
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateMonth('next')}
                  >
                    →
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Day Headers */}
              <div className="gap-1 grid grid-cols-7 mb-2">
                {dayNames.map(day => (
                  <div
                    key={day}
                    className="p-2 font-semibold text-gray-600 text-sm text-center"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="gap-1 grid grid-cols-7">
                {calendarDays.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => handleDateSelect(day)}
                    disabled={!day.isAvailable}
                    className={`
                      p-2 h-12 text-sm rounded-lg transition-colors relative
                      ${day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                      ${
                        day.isToday ? 'bg-blue-100 text-blue-800 font-bold' : ''
                      }
                      ${day.isSelected ? 'bg-brand-primary text-white' : ''}
                      ${
                        day.isAvailable && !day.isSelected
                          ? 'hover:bg-gray-100'
                          : ''
                      }
                      ${
                        !day.isAvailable
                          ? 'cursor-not-allowed opacity-50'
                          : 'cursor-pointer'
                      }
                    `}
                  >
                    {day.dayNumber}
                    {day.timeSlots.some(slot => slot.available) &&
                      day.isAvailable && (
                        <div className="bottom-1 left-1/2 absolute bg-green-500 rounded-full w-1 h-1 -translate-x-1/2 transform"></div>
                      )}
                  </button>
                ))}
              </div>

              <div className="mt-4 text-gray-500 text-xs text-center">
                Business Hours: Monday-Friday, 8:00 AM - 3:00 PM Pacific Time
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Time Slots */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedDate
                  ? `Available Times - ${selectedDate.toLocaleDateString(
                      'en-US',
                      {
                        weekday: 'long',
                        month: 'short',
                        day: 'numeric',
                      }
                    )}`
                  : 'Select a Date'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDate ? (
                <div className="space-y-2">
                  {selectedDate.getDay() === 0 ||
                  selectedDate.getDay() === 6 ? (
                    <div className="py-8 text-gray-500 text-center">
                      <div className="mb-2 text-4xl">📅</div>
                      <p>We&apos;re closed on weekends</p>
                      <p className="text-sm">Please select a weekday</p>
                    </div>
                  ) : (
                    <>
                      {generateTimeSlots(selectedDate).map(timeSlot => (
                        <button
                          key={timeSlot.id}
                          onClick={() => handleTimeSlotSelect(timeSlot)}
                          disabled={!timeSlot.available}
                          className={`
                            w-full p-3 text-left rounded-lg border transition-colors
                            ${
                              timeSlot.available
                                ? 'border-gray-200 hover:border-brand-primary hover:bg-brand-primary hover:text-white'
                                : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                            }
                          `}
                        >
                          <div className="font-semibold">{timeSlot.time}</div>
                          {timeSlot.available && timeSlot.teamMember && (
                            <div className="opacity-75 text-xs">
                              with {timeSlot.teamMember}
                            </div>
                          )}
                          {!timeSlot.available && (
                            <div className="text-xs">Unavailable</div>
                          )}
                        </button>
                      ))}
                      {generateTimeSlots(selectedDate).every(
                        slot => !slot.available
                      ) && (
                        <div className="py-8 text-gray-500 text-center">
                          <div className="mb-2 text-4xl">😔</div>
                          <p>No available times</p>
                          <p className="text-sm">Please try another date</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <div className="py-8 text-gray-500 text-center">
                  <div className="mb-2 text-4xl">📅</div>
                  <p>Select a date to view</p>
                  <p>available time slots</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Info */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Booking Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>24-hour advance booking required</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Instant confirmation via email</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Free cancellation up to 4 hours</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Virtual or in-person options</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
