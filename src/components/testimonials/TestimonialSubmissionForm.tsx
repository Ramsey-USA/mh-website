'use client'

import { useState } from 'react'
import {
  Star,
  Upload,
  X,
  Check,
  AlertCircle,
  Send,
  Camera,
  FileText,
  MapPin,
  Calendar,
  Users,
} from 'lucide-react'
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Textarea,
} from '../ui'

interface TestimonialFormData {
  clientName: string
  clientEmail: string
  clientPhone: string
  clientLocation: string
  projectTitle: string
  projectType:
    | 'residential'
    | 'commercial'
    | 'renovation'
    | 'emergency'
    | 'other'
  projectValue: string
  completionDate: string
  rating: number
  testimonialText: string
  wouldRecommend: boolean
  allowContact: boolean
  images?: File[]
  projectHighlights: string[]
}

interface TestimonialSubmissionFormProps {
  onSubmit?: (data: TestimonialFormData) => void
  className?: string
}

const projectTypeOptions = [
  { value: 'residential', label: 'Residential Construction', icon: Users },
  { value: 'commercial', label: 'Commercial Building', icon: Users },
  { value: 'renovation', label: 'Renovation/Remodel', icon: Users },
  { value: 'emergency', label: 'Emergency Repair', icon: AlertCircle },
  { value: 'other', label: 'Other', icon: FileText },
]

export default function TestimonialSubmissionForm({
  onSubmit,
  className = '',
}: TestimonialSubmissionFormProps) {
  const [formData, setFormData] = useState<TestimonialFormData>({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientLocation: '',
    projectTitle: '',
    projectType: 'residential',
    projectValue: '',
    completionDate: '',
    rating: 5,
    testimonialText: '',
    wouldRecommend: true,
    allowContact: true,
    images: [],
    projectHighlights: [''],
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [hoveredRating, setHoveredRating] = useState(0)

  const totalSteps = 4

  const updateFormData = (field: keyof TestimonialFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const existingImages = formData.images || []
    const totalImages = existingImages.length + files.length

    if (totalImages > 5) {
      alert('Maximum 5 images allowed')
      return
    }

    updateFormData('images', [...existingImages, ...files])
  }

  const removeImage = (index: number) => {
    const newImages = (formData.images || []).filter((_, i) => i !== index)
    updateFormData('images', newImages)
  }

  const addHighlight = () => {
    if (formData.projectHighlights.length < 5) {
      updateFormData('projectHighlights', [...formData.projectHighlights, ''])
    }
  }

  const removeHighlight = (index: number) => {
    if (formData.projectHighlights.length > 1) {
      updateFormData(
        'projectHighlights',
        formData.projectHighlights.filter((_, i) => i !== index)
      )
    }
  }

  const updateHighlight = (index: number, value: string) => {
    const newHighlights = [...formData.projectHighlights]
    newHighlights[index] = value
    updateFormData('projectHighlights', newHighlights)
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          formData.clientName &&
          formData.clientEmail &&
          formData.clientLocation
        )
      case 2:
        return !!(
          formData.projectTitle &&
          formData.projectType &&
          formData.completionDate
        )
      case 3:
        return formData.rating > 0 && formData.testimonialText.length >= 50
      case 4:
        return true // Optional step
      default:
        return false
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep(3)) {
      alert('Please complete all required fields')
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, this would send to an API
      await new Promise(resolve => setTimeout(resolve, 2000))

      if (onSubmit) {
        onSubmit(formData)
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error('Submission error:', error)
      alert('There was an error submitting your testimonial. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className={`max-w-2xl mx-auto ${className}`}>
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <div className="flex justify-center items-center bg-green-100 mx-auto mb-4 rounded-full w-16 h-16">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="mb-2 font-bold text-gray-900 text-2xl">
              Thank You!
            </h2>
            <p className="text-gray-600">
              Your testimonial has been submitted successfully. We appreciate
              you taking the time to share your experience with MH Construction.
            </p>
          </div>

          <div className="bg-blue-50 mb-6 p-4 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>What happens next?</strong>
              <br />
              Our team will review your testimonial and may contact you for any
              additional information. Once approved, your testimonial will be
              featured on our website to help other potential clients learn
              about our services.
            </p>
          </div>

          <Button onClick={() => window.location.reload()} variant="outline">
            Submit Another Testimonial
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {[1, 2, 3, 4].map(step => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step < currentStep
                    ? 'bg-green-600 text-white'
                    : step === currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step < currentStep ? <Check className="w-4 h-4" /> : step}
              </div>
              {step < 4 && (
                <div
                  className={`h-1 w-full mx-2 ${
                    step < currentStep ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-gray-600 text-xs">
          <span>Contact Info</span>
          <span>Project Details</span>
          <span>Your Review</span>
          <span>Photos & Submit</span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="w-5 h-5" />
            Share Your Experience with MH Construction
          </CardTitle>
          <p className="text-gray-600">
            Help others learn about our construction services by sharing your
            project experience.
          </p>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Contact Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="mb-4 font-semibold text-gray-900 text-lg">
                  Contact Information
                </h3>

                <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700 text-sm">
                      Full Name *
                    </label>
                    <Input
                      value={formData.clientName}
                      onChange={e =>
                        updateFormData('clientName', e.target.value)
                      }
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700 text-sm">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      value={formData.clientEmail}
                      onChange={e =>
                        updateFormData('clientEmail', e.target.value)
                      }
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700 text-sm">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      value={formData.clientPhone}
                      onChange={e =>
                        updateFormData('clientPhone', e.target.value)
                      }
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700 text-sm">
                      <MapPin className="inline mr-1 w-4 h-4" />
                      Project Location *
                    </label>
                    <Input
                      value={formData.clientLocation}
                      onChange={e =>
                        updateFormData('clientLocation', e.target.value)
                      }
                      placeholder="City, State"
                      required
                    />
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="mt-0.5 w-5 h-5 text-blue-600" />
                    <div className="text-blue-800 text-sm">
                      <strong>Privacy Notice:</strong> Your contact information
                      will only be used to verify your testimonial and may be
                      used to contact you about featuring your review. You can
                      opt out of contact permissions in the next steps.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Project Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="mb-4 font-semibold text-gray-900 text-lg">
                  Project Details
                </h3>

                <div>
                  <label className="block mb-2 font-medium text-gray-700 text-sm">
                    Project Title *
                  </label>
                  <Input
                    value={formData.projectTitle}
                    onChange={e =>
                      updateFormData('projectTitle', e.target.value)
                    }
                    placeholder="e.g., Custom Home Build, Kitchen Renovation, etc."
                    required
                  />
                </div>

                <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700 text-sm">
                      Project Type *
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={e =>
                        updateFormData('projectType', e.target.value as any)
                      }
                      className="px-3 py-2 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
                      required
                    >
                      {projectTypeOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700 text-sm">
                      <Calendar className="inline mr-1 w-4 h-4" />
                      Completion Date *
                    </label>
                    <Input
                      type="date"
                      value={formData.completionDate}
                      onChange={e =>
                        updateFormData('completionDate', e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700 text-sm">
                    Project Value (Optional)
                  </label>
                  <select
                    value={formData.projectValue}
                    onChange={e =>
                      updateFormData('projectValue', e.target.value)
                    }
                    className="px-3 py-2 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
                  >
                    <option value="">Prefer not to say</option>
                    <option value="Under $10,000">Under $10,000</option>
                    <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                    <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                    <option value="$50,000 - $100,000">
                      $50,000 - $100,000
                    </option>
                    <option value="$100,000 - $250,000">
                      $100,000 - $250,000
                    </option>
                    <option value="$250,000 - $500,000">
                      $250,000 - $500,000
                    </option>
                    <option value="Over $500,000">Over $500,000</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700 text-sm">
                    Project Highlights
                  </label>
                  <p className="mb-3 text-gray-600 text-sm">
                    What were the key features or achievements of your project?
                  </p>
                  {formData.projectHighlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <Input
                        value={highlight}
                        onChange={e => updateHighlight(index, e.target.value)}
                        placeholder={`Highlight ${index + 1}`}
                      />
                      {formData.projectHighlights.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeHighlight(index)}
                          className="p-1 text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  {formData.projectHighlights.length < 5 && (
                    <button
                      type="button"
                      onClick={addHighlight}
                      className="font-medium text-blue-600 hover:text-blue-700 text-sm"
                    >
                      + Add Another Highlight
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Rating and Review */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="mb-4 font-semibold text-gray-900 text-lg">
                  Your Review
                </h3>

                <div>
                  <label className="block mb-3 font-medium text-gray-700 text-sm">
                    Overall Rating *
                  </label>
                  <div className="flex items-center gap-2 mb-2">
                    {[1, 2, 3, 4, 5].map(rating => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => updateFormData('rating', rating)}
                        onMouseEnter={() => setHoveredRating(rating)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            rating <= (hoveredRating || formData.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-3 text-gray-600 text-sm">
                      {formData.rating} of 5 stars
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs">
                    1 = Poor, 2 = Fair, 3 = Good, 4 = Very Good, 5 = Excellent
                  </p>
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700 text-sm">
                    Your Testimonial *
                  </label>
                  <p className="mb-3 text-gray-600 text-sm">
                    Share your experience working with MH Construction. What
                    made your project special?
                  </p>
                  <Textarea
                    value={formData.testimonialText}
                    onChange={e =>
                      updateFormData('testimonialText', e.target.value)
                    }
                    placeholder="Tell others about your experience with MH Construction. What was the project? How was the quality of work? How was the communication and professionalism? Would you work with them again?"
                    rows={6}
                    className="resize-none"
                    required
                  />
                  <div className="flex justify-between mt-1 text-gray-500 text-xs">
                    <span>{formData.testimonialText.length} characters</span>
                    <span>Minimum 50 characters required</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="recommend"
                      checked={formData.wouldRecommend}
                      onChange={e =>
                        updateFormData('wouldRecommend', e.target.checked)
                      }
                      className="border-gray-300 rounded focus:ring-blue-500 text-blue-600"
                    />
                    <label
                      htmlFor="recommend"
                      className="text-gray-700 text-sm"
                    >
                      I would recommend MH Construction to others
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="allowContact"
                      checked={formData.allowContact}
                      onChange={e =>
                        updateFormData('allowContact', e.target.checked)
                      }
                      className="border-gray-300 rounded focus:ring-blue-500 text-blue-600"
                    />
                    <label
                      htmlFor="allowContact"
                      className="text-gray-700 text-sm"
                    >
                      MH Construction may contact me about featuring this
                      testimonial
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Photos and Submit */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="mb-4 font-semibold text-gray-900 text-lg">
                  Photos & Submit
                </h3>

                <div>
                  <label className="block mb-2 font-medium text-gray-700 text-sm">
                    <Camera className="inline mr-1 w-4 h-4" />
                    Project Photos (Optional)
                  </label>
                  <p className="mb-4 text-gray-600 text-sm">
                    Add up to 5 photos of your completed project. These help
                    showcase our work quality.
                  </p>

                  {(!formData.images || formData.images.length < 5) && (
                    <div className="p-6 border-2 border-gray-300 border-dashed rounded-lg text-center">
                      <Camera className="mx-auto mb-2 w-8 h-8 text-gray-400" />
                      <label className="cursor-pointer">
                        <span className="font-medium text-blue-600 hover:text-blue-700">
                          Click to upload photos
                        </span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                      <p className="mt-1 text-gray-500 text-xs">
                        PNG, JPG, HEIC up to 10MB each
                      </p>
                    </div>
                  )}

                  {formData.images && formData.images.length > 0 && (
                    <div className="gap-4 grid grid-cols-2 md:grid-cols-3 mt-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Project photo ${index + 1}`}
                            className="rounded-lg w-full h-32 object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="-top-2 -right-2 absolute bg-red-600 hover:bg-red-700 p-1 rounded-full text-white"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="mb-2 font-medium text-green-900">
                    Review Summary
                  </h4>
                  <div className="space-y-2 text-green-800 text-sm">
                    <div>
                      <strong>Client:</strong> {formData.clientName}
                    </div>
                    <div>
                      <strong>Project:</strong> {formData.projectTitle}
                    </div>
                    <div>
                      <strong>Rating:</strong> {formData.rating}/5 stars
                    </div>
                    <div>
                      <strong>Photos:</strong> {formData.images?.length || 0}{' '}
                      uploaded
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="mt-0.5 w-5 h-5 text-blue-600" />
                    <div className="text-blue-800 text-sm">
                      <strong>Before you submit:</strong> Please review your
                      testimonial for accuracy. Once submitted, our team will
                      review your testimonial before it appears on our website.
                      This typically takes 1-2 business days.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-gray-200 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>

              <div className="flex gap-2">
                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={!validateStep(currentStep)}
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting || !validateStep(3)}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Testimonial'}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
