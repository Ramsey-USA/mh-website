'use client'

import React, { useState } from 'react'
import { BookingCalendar } from './BookingCalendar'
import { ConsultationForm } from './ConsultationForm'

interface TimeSlot {
  id: string
  time: string
  available: boolean
  teamMember?: string
}

export function BookingFlow() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null)
  const [showBookingForm, setShowBookingForm] = useState(false)

  const handleTimeSlotSelected = (date: Date, timeSlot: TimeSlot) => {
    setSelectedDate(date)
    setSelectedTimeSlot(timeSlot)
    setShowBookingForm(true)
  }

  const handleBackToCalendar = () => {
    setShowBookingForm(false)
    setSelectedTimeSlot(null)
  }

  if (showBookingForm && selectedDate && selectedTimeSlot) {
    return (
      <ConsultationForm 
        selectedDate={selectedDate}
        selectedTimeSlot={selectedTimeSlot}
        onBack={handleBackToCalendar}
      />
    )
  }

  return (
    <BookingCalendar onTimeSlotSelected={handleTimeSlotSelected} />
  )
}