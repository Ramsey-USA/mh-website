/**
 * Booking Details Form Component
 * Step 2 of the booking process
 */

import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { projectTypes, type BookingFormData } from "./bookingTypes";

interface BookingFormProps {
  formData: BookingFormData;
  onInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export function BookingForm({
  formData,
  onInputChange,
  onSubmit,
  onBack,
  isSubmitting,
}: BookingFormProps) {
  return (
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
          Share your vision so we can partner together to bring it to life
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
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
                onChange={onInputChange}
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
                onChange={onInputChange}
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
                onChange={onInputChange}
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
                onChange={onInputChange}
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
                onChange={onInputChange}
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
                onChange={onInputChange}
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
              onChange={onInputChange}
              required
              rows={5}
              className="bg-white dark:bg-gray-700 px-4 py-3 border border-gray-300 dark:border-gray-600 focus:border-brand-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary w-full text-gray-900 dark:text-white resize-none"
              placeholder="Tell us about your project goals, timeline, and any specific requirements..."
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
              Additional Notes
            </label>
            <textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={onInputChange}
              rows={3}
              className="bg-white dark:bg-gray-700 px-4 py-3 border border-gray-300 dark:border-gray-600 focus:border-brand-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary w-full text-gray-900 dark:text-white resize-none"
              placeholder="Any special considerations or questions..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              type="button"
              onClick={onBack}
              variant="secondary"
              size="lg"
              className="sm:flex-1"
            >
              <MaterialIcon icon="arrow_back" size="lg" className="mr-3" />
              Back
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className="sm:flex-1"
            >
              {isSubmitting ? (
                <>
                  <MaterialIcon
                    icon="hourglass_empty"
                    size="lg"
                    className="mr-3 animate-spin"
                  />
                  Scheduling...
                </>
              ) : (
                <>
                  <MaterialIcon
                    icon="check_circle"
                    size="lg"
                    className="mr-3"
                  />
                  Confirm Booking
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
