import React from "react";
import { Button } from "@/components/ui/base/button";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

/**
 * MH Construction Button System Test Component
 *
 * This component demonstrates and tests all button variants, sizes, and
 * icon combinations to ensure consistent implementation across the site.
 */
export function ButtonSystemTest() {
  return (
    <div className="space-y-12 bg-white dark:bg-gray-900 p-8">
      <div className="text-center">
        <h1 className="mb-4 font-bold text-gray-900 dark:text-white text-3xl">
          MH Construction Button System
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Testing all variants, sizes, and icon combinations
        </p>
      </div>

      {/* Primary Variants */}
      <section>
        <h2 className="mb-6 font-semibold text-gray-900 dark:text-white text-2xl">
          Primary Buttons (Hunter Green)
        </h2>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <Button variant="primary" size="sm">
            <MaterialIcon icon="build" className="mr-2 w-4 h-4" />
            Small
          </Button>
          <Button variant="primary" size="default">
            <MaterialIcon icon="build" className="mr-2 w-5 h-5" />
            Default
          </Button>
          <Button variant="primary" size="lg">
            <MaterialIcon icon="build" className="mr-3 w-6 h-6" />
            Large
          </Button>
          <Button variant="primary" size="xl">
            <MaterialIcon icon="build" className="mr-3 w-7 h-7" />
            Extra Large
          </Button>
        </div>
      </section>

      {/* Secondary Variants */}
      <section>
        <h2 className="mb-6 font-semibold text-gray-900 dark:text-white text-2xl">
          Secondary Buttons (Leather Tan)
        </h2>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <Button variant="secondary" size="sm">
            <MaterialIcon icon="info" className="mr-2 w-4 h-4" />
            Small
          </Button>
          <Button variant="secondary" size="default">
            <MaterialIcon icon="info" className="mr-2 w-5 h-5" />
            Default
          </Button>
          <Button variant="secondary" size="lg">
            <MaterialIcon icon="info" className="mr-3 w-6 h-6" />
            Large
          </Button>
          <Button variant="secondary" size="xl">
            <MaterialIcon icon="info" className="mr-3 w-7 h-7" />
            Extra Large
          </Button>
        </div>
      </section>

      {/* Outline Variants */}
      <section>
        <h2 className="mb-6 font-semibold text-gray-900 dark:text-white text-2xl">
          Outline Buttons
        </h2>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <Button variant="outline" size="sm">
            <MaterialIcon icon="visibility" className="mr-2 w-4 h-4" />
            Small
          </Button>
          <Button variant="outline" size="default">
            <MaterialIcon icon="visibility" className="mr-2 w-5 h-5" />
            Default
          </Button>
          <Button variant="outline" size="lg">
            <MaterialIcon icon="visibility" className="mr-3 w-6 h-6" />
            Large
          </Button>
          <Button variant="outline" size="xl">
            <MaterialIcon icon="visibility" className="mr-3 w-7 h-7" />
            Extra Large
          </Button>
        </div>
      </section>

      {/* Icon-Only Buttons */}
      <section>
        <h2 className="mb-6 font-semibold text-gray-900 dark:text-white text-2xl">
          Icon-Only Buttons
        </h2>
        <div className="flex flex-wrap gap-4">
          <Button
            variant="primary"
            size="icon-sm"
            aria-label="Small icon button"
          >
            <MaterialIcon icon="phone" className="w-4 h-4" />
          </Button>
          <Button
            variant="primary"
            size="icon"
            aria-label="Default icon button"
          >
            <MaterialIcon icon="phone" className="w-5 h-5" />
          </Button>
          <Button
            variant="primary"
            size="icon-lg"
            aria-label="Large icon button"
          >
            <MaterialIcon icon="phone" className="w-6 h-6" />
          </Button>

          <Button
            variant="secondary"
            size="icon-sm"
            aria-label="Small icon button"
          >
            <MaterialIcon icon="email" className="w-4 h-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            aria-label="Default icon button"
          >
            <MaterialIcon icon="email" className="w-5 h-5" />
          </Button>
          <Button
            variant="secondary"
            size="icon-lg"
            aria-label="Large icon button"
          >
            <MaterialIcon icon="email" className="w-6 h-6" />
          </Button>
        </div>
      </section>

      {/* Common Use Cases */}
      <section>
        <h2 className="mb-6 font-semibold text-gray-900 dark:text-white text-2xl">
          Common Use Cases
        </h2>

        {/* Contact Buttons */}
        <div className="mb-8">
          <h3 className="mb-4 font-medium text-gray-800 dark:text-gray-200 text-lg">
            Contact Actions
          </h3>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <Button variant="primary" size="lg" className="w-full">
              <MaterialIcon icon="phone" className="mr-3 w-6 h-6" />
              <span className="text-center">
                Call Now
                <br />
                <span className="opacity-90 text-sm">(509) 308-6489</span>
              </span>
            </Button>
            <Button variant="secondary" size="lg" className="w-full">
              <MaterialIcon icon="email" className="mr-3 w-6 h-6" />
              Send Email
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="mb-8">
          <h3 className="mb-4 font-medium text-gray-800 dark:text-gray-200 text-lg">
            Navigation
          </h3>
          <div className="flex gap-4">
            <Button variant="outline" size="default">
              <MaterialIcon icon="arrow_back" className="mr-2 w-5 h-5" />
              Go Back
            </Button>
            <Button variant="primary" size="default">
              Continue
              <MaterialIcon icon="arrow_forward" className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Form Actions */}
        <div className="mb-8">
          <h3 className="mb-4 font-medium text-gray-800 dark:text-gray-200 text-lg">
            Form Actions
          </h3>
          <div className="flex justify-end gap-3">
            <Button variant="outline" size="default">
              Cancel
            </Button>
            <Button variant="neutral" size="default">
              <MaterialIcon icon="save" className="mr-2 w-5 h-5" />
              Save Draft
            </Button>
            <Button variant="primary" size="default">
              <MaterialIcon icon="send" className="mr-2 w-5 h-5" />
              Submit
            </Button>
          </div>
        </div>

        {/* Service Cards */}
        <div className="mb-8">
          <h3 className="mb-4 font-medium text-gray-800 dark:text-gray-200 text-lg">
            Service Card Actions
          </h3>
          <div className="mx-auto p-6 border border-gray-200 dark:border-gray-700 rounded-xl max-w-sm">
            <h4 className="mb-2 font-semibold text-gray-900 dark:text-white text-lg">
              Residential Construction
            </h4>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Custom homes and renovations
            </p>
            <div className="flex gap-3">
              <Button variant="primary" size="default" className="flex-1">
                <MaterialIcon icon="info" className="mr-2 w-5 h-5" />
                Learn More
              </Button>
              <Button
                variant="outline"
                size="icon"
                aria-label="Save to favorites"
              >
                <MaterialIcon icon="favorite_border" className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" aria-label="Share service">
                <MaterialIcon icon="share" className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility Tests */}
      <section>
        <h2 className="mb-6 font-semibold text-gray-900 dark:text-white text-2xl">
          Accessibility Features
        </h2>
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-gray-600 dark:text-gray-400">
              Tab through buttons to test focus states:
            </p>
            <div className="flex gap-3">
              <Button variant="primary" size="default">
                First Button
              </Button>
              <Button variant="secondary" size="default">
                Second Button
              </Button>
              <Button variant="outline" size="default">
                Third Button
              </Button>
            </div>
          </div>

          <div>
            <p className="mb-2 text-gray-600 dark:text-gray-400">
              Icon-only buttons with proper ARIA labels:
            </p>
            <div className="flex gap-3">
              <Button variant="primary" size="icon" aria-label="Call us">
                <MaterialIcon icon="phone" className="w-5 h-5" />
              </Button>
              <Button variant="secondary" size="icon" aria-label="Send email">
                <MaterialIcon icon="email" className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" aria-label="Get directions">
                <MaterialIcon icon="directions" className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive Demo */}
      <section>
        <h2 className="mb-6 font-semibold text-gray-900 dark:text-white text-2xl">
          Responsive Behavior
        </h2>
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Resize the window to see responsive button behavior:
          </p>
          <div className="flex sm:flex-row flex-col gap-3">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              <MaterialIcon
                icon="build"
                className="mr-2 sm:mr-3 w-5 sm:w-6 h-5 sm:h-6"
              />
              <span className="hidden sm:inline">Schedule Consultation</span>
              <span className="sm:hidden">Schedule</span>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <MaterialIcon
                icon="visibility"
                className="mr-2 sm:mr-3 w-5 sm:w-6 h-5 sm:h-6"
              />
              <span className="hidden sm:inline">View Portfolio</span>
              <span className="sm:hidden">Portfolio</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ButtonSystemTest;
