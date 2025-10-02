'use client'

import React, { useState } from 'react'
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Textarea,
} from '../ui'

interface TimeSlot {
  id: string
  time: string
  available: boolean
  teamMember?: string
}

interface ConsultationFormProps {
  selectedDate: Date
  selectedTimeSlot: TimeSlot
  onBack: () => void
}

interface BookingData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string

  // Project Information
  projectType: string
  projectLocation: string
  budget: string
  timeline: string
  description: string

  // Consultation Preferences
  consultationType: string
  meetingType: 'virtual' | 'in-person'
  isVeteran: boolean

  // Special Requests
  specialRequests: string
}

export function ConsultationForm({
  selectedDate,
  selectedTimeSlot,
  onBack,
}: ConsultationFormProps) {
  const [bookingData, setBookingData] = useState<BookingData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    projectType: '',
    projectLocation: '',
    budget: '',
    timeline: '',
    description: '',
    consultationType: 'initial',
    meetingType: 'virtual',
    isVeteran: false,
    specialRequests: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const consultationTypes = [
    {
      id: 'initial',
      label: 'Initial Consultation (60 min) - Free',
      duration: 60,
      price: 0,
    },
    {
      id: 'design',
      label: 'Design Consultation (90 min) - $150',
      duration: 90,
      price: 150,
    },
    {
      id: 'technical',
      label: 'Technical Consultation (45 min) - $75',
      duration: 45,
      price: 75,
    },
    {
      id: 'estimate',
      label: 'Estimate Review (30 min) - Free',
      duration: 30,
      price: 0,
    },
  ]

  const projectTypes = [
    'Custom Home',
    'Home Addition',
    'Kitchen Remodel',
    'Bathroom Remodel',
    'Deck/Patio',
    'Commercial Building',
    'Renovation',
    'Other',
  ]

  const budgetRanges = [
    'Under $25,000',
    '$25,000 - $50,000',
    '$50,000 - $100,000',
    '$100,000 - $250,000',
    '$250,000 - $500,000',
    'Over $500,000',
  ]

  const handleInputChange = (
    field: keyof BookingData,
    value: string | string[] | boolean
  ) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call to book consultation
    await new Promise(resolve => setTimeout(resolve, 2000))

    // In real implementation, this would:
    // 1. Save to Firebase Firestore
    // 2. Send confirmation emails
    // 3. Add to team calendars
    // 4. Process payment if required

    setIsSubmitting(false)
    setShowConfirmation(true)
  }

  const selectedConsultationType = consultationTypes.find(
    type => type.id === bookingData.consultationType
  )

  if (showConfirmation) {
    return (
      <div className="mx-auto max-w-2xl">
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="text-center">
            <div className="flex justify-center items-center bg-green-500 mx-auto mb-4 rounded-full w-16 h-16">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <CardTitle className="text-green-800 text-2xl">
              Consultation Booked Successfully!
            </CardTitle>
            <p className="text-green-700">
              Your consultation has been confirmed. Check your email for
              details.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 bg-white p-6 rounded-lg">
              <h3 className="mb-4 font-tactic-bold text-brand-primary text-lg">
                Booking Summary
              </h3>

              <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                <div>
                  <span className="text-gray-600">Date & Time:</span>
                  <div className="font-semibold">
                    {selectedDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                  <div className="font-semibold">
                    {selectedTimeSlot.time} Pacific Time
                  </div>
                </div>

                <div>
                  <span className="text-gray-600">Consultation Type:</span>
                  <div className="font-semibold">
                    {selectedConsultationType?.label}
                  </div>
                </div>

                <div>
                  <span className="text-gray-600">Team Member:</span>
                  <div className="font-semibold">
                    {selectedTimeSlot.teamMember}
                  </div>
                </div>

                <div>
                  <span className="text-gray-600">Meeting Type:</span>
                  <div className="font-semibold capitalize">
                    {bookingData.meetingType}
                  </div>
                </div>

                <div>
                  <span className="text-gray-600">Project Type:</span>
                  <div className="font-semibold">{bookingData.projectType}</div>
                </div>

                <div>
                  <span className="text-gray-600">Contact:</span>
                  <div className="font-semibold">
                    {bookingData.firstName} {bookingData.lastName}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {bookingData.email}
                  </div>
                </div>
              </div>

              {bookingData.isVeteran && (
                <div className="bg-blue-50 p-4 border border-blue-200 rounded-lg">
                  <div className="flex items-center">
                    <span className="mr-2 text-blue-600">🎖️</span>
                    <span className="font-semibold text-blue-800">
                      Thank you for your service!
                    </span>
                  </div>
                  <p className="mt-1 text-blue-700 text-sm">
                    Military discount applied. Learn more about our Wounded
                    Warrior Initiative during your consultation.
                  </p>
                </div>
              )}

              <div className="mt-6 pt-4 border-t">
                <h4 className="mb-2 font-semibold">What happens next?</h4>
                <ul className="space-y-1 text-gray-600 text-sm">
                  <li>• Confirmation email sent to {bookingData.email}</li>
                  <li>• Calendar invite with meeting details</li>
                  <li>• Pre-consultation questionnaire (if applicable)</li>
                  <li>• 24-hour reminder via email and SMS</li>
                </ul>
              </div>
            </div>

            <div className="flex sm:flex-row flex-col gap-4 mt-6">
              <Button variant="primary" size="lg" className="flex-1">
                Add to Calendar
              </Button>
              <Button variant="outline" size="lg" className="flex-1">
                View in Dashboard
              </Button>
            </div>

            <div className="mt-4 text-center">
              <Button variant="outline" onClick={onBack}>
                Book Another Consultation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">Book Your Consultation</CardTitle>
              <p className="mt-1 text-gray-600">
                {selectedDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}{' '}
                at {selectedTimeSlot.time}
              </p>
            </div>
            <Button variant="outline" onClick={onBack}>
              ← Change Time
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div>
              <h3 className="mb-4 font-tactic-bold text-brand-primary text-lg">
                Personal Information
              </h3>
              <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                <Input
                  label="First Name"
                  placeholder="Enter your first name"
                  value={bookingData.firstName}
                  onChange={e => handleInputChange('firstName', e.target.value)}
                  required
                />
                <Input
                  label="Last Name"
                  placeholder="Enter your last name"
                  value={bookingData.lastName}
                  onChange={e => handleInputChange('lastName', e.target.value)}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="your.email@example.com"
                  value={bookingData.email}
                  onChange={e => handleInputChange('email', e.target.value)}
                  required
                  helperText="Confirmation will be sent to this email"
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="(509) 555-0123"
                  value={bookingData.phone}
                  onChange={e => handleInputChange('phone', e.target.value)}
                  required
                  helperText="For appointment reminders"
                />
              </div>
            </div>

            {/* Consultation Details */}
            <div>
              <h3 className="mb-4 font-tactic-bold text-brand-primary text-lg">
                Consultation Details
              </h3>

              <div className="mb-6">
                <label className="block mb-3 font-medium text-gray-700 text-sm">
                  Consultation Type
                </label>
                <div className="space-y-3">
                  {consultationTypes.map(type => (
                    <label
                      key={type.id}
                      className="flex items-center p-4 border hover:border-brand-primary rounded-lg cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="consultationType"
                        value={type.id}
                        checked={bookingData.consultationType === type.id}
                        onChange={e =>
                          handleInputChange('consultationType', e.target.value)
                        }
                        className="mr-3"
                      />
                      <div>
                        <div className="font-semibold">{type.label}</div>
                        <div className="text-gray-600 text-sm">
                          Duration: {type.duration} minutes •
                          {type.price === 0 ? ' Free' : ` $${type.price}`}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block mb-3 font-medium text-gray-700 text-sm">
                  Meeting Preference
                </label>
                <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                  <label className="flex items-center p-4 border hover:border-brand-primary rounded-lg cursor-pointer">
                    <input
                      type="radio"
                      name="meetingType"
                      value="virtual"
                      checked={bookingData.meetingType === 'virtual'}
                      onChange={e =>
                        handleInputChange('meetingType', e.target.value)
                      }
                      className="mr-3"
                    />
                    <div>
                      <div className="font-semibold">Virtual Meeting</div>
                      <div className="text-gray-600 text-sm">
                        Video call via Zoom or Google Meet
                      </div>
                    </div>
                  </label>
                  <label className="flex items-center p-4 border hover:border-brand-primary rounded-lg cursor-pointer">
                    <input
                      type="radio"
                      name="meetingType"
                      value="in-person"
                      checked={bookingData.meetingType === 'in-person'}
                      onChange={e =>
                        handleInputChange('meetingType', e.target.value)
                      }
                      className="mr-3"
                    />
                    <div>
                      <div className="font-semibold">In-Person Meeting</div>
                      <div className="text-gray-600 text-sm">
                        At our office or project site
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Project Information */}
            <div>
              <h3 className="mb-4 font-tactic-bold text-brand-primary text-lg">
                Project Information
              </h3>
              <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                <div>
                  <label className="block mb-2 font-medium text-gray-700 text-sm">
                    Project Type
                  </label>
                  <select
                    value={bookingData.projectType}
                    onChange={e =>
                      handleInputChange('projectType', e.target.value)
                    }
                    className="px-3 py-2 border border-gray-300 focus:border-brand-primary rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary w-full"
                    required
                  >
                    <option value="">Select project type</option>
                    {projectTypes.map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <Input
                  label="Project Location"
                  placeholder="City, State or Address"
                  value={bookingData.projectLocation}
                  onChange={e =>
                    handleInputChange('projectLocation', e.target.value)
                  }
                  required
                />

                <div>
                  <label className="block mb-2 font-medium text-gray-700 text-sm">
                    Budget Range
                  </label>
                  <select
                    value={bookingData.budget}
                    onChange={e => handleInputChange('budget', e.target.value)}
                    className="px-3 py-2 border border-gray-300 focus:border-brand-primary rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary w-full"
                  >
                    <option value="">Select budget range</option>
                    {budgetRanges.map(range => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>

                <Input
                  label="Desired Timeline"
                  placeholder="e.g., Start in 3 months"
                  value={bookingData.timeline}
                  onChange={e => handleInputChange('timeline', e.target.value)}
                />
              </div>

              <div className="mt-4">
                <Textarea
                  label="Project Description"
                  placeholder="Please describe your project in detail..."
                  rows={4}
                  value={bookingData.description}
                  onChange={e =>
                    handleInputChange('description', e.target.value)
                  }
                  helperText="The more details you provide, the better we can prepare for your consultation"
                />
              </div>
            </div>

            {/* Special Requests & Military */}
            <div>
              <h3 className="mb-4 font-tactic-bold text-brand-primary text-lg">
                Additional Information
              </h3>

              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={bookingData.isVeteran}
                    onChange={e =>
                      handleInputChange('isVeteran', e.target.checked)
                    }
                    className="mr-3"
                  />
                  <span className="text-gray-700 text-sm">
                    I am a veteran or military family member
                    <span className="ml-1 font-semibold text-brand-secondary">
                      (Special discounts apply)
                    </span>
                  </span>
                </label>
              </div>

              <Textarea
                label="Special Requests or Questions"
                placeholder="Any specific topics you'd like to discuss or special accommodations needed..."
                rows={3}
                value={bookingData.specialRequests}
                onChange={e =>
                  handleInputChange('specialRequests', e.target.value)
                }
              />
            </div>

            {/* Summary */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="mb-4 font-tactic-bold text-lg">Booking Summary</h3>
              <div className="gap-4 grid grid-cols-1 md:grid-cols-2 text-sm">
                <div>
                  <span className="text-gray-600">Date & Time:</span>
                  <div className="font-semibold">
                    {selectedDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                    })}{' '}
                    at {selectedTimeSlot.time}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Team Member:</span>
                  <div className="font-semibold">
                    {selectedTimeSlot.teamMember}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Consultation:</span>
                  <div className="font-semibold">
                    {selectedConsultationType?.label}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Meeting Type:</span>
                  <div className="font-semibold capitalize">
                    {bookingData.meetingType}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-between items-center pt-6 border-t">
              <Button variant="outline" onClick={onBack}>
                Back to Calendar
              </Button>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="mr-2 border-white border-b-2 rounded-full w-4 h-4 animate-spin"></div>
                    Booking...
                  </div>
                ) : (
                  `Confirm Booking${
                    selectedConsultationType?.price
                      ? ` - $${selectedConsultationType.price}`
                      : ' - Free'
                  }`
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
