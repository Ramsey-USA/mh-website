'use client'

import { Button } from '@/components/ui/Button'
import { WPZoomIcons } from '@/components/icons/WPZoomIcons'

export default function ButtonShowcase() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white py-12 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-bold text-gray-900 text-4xl">
            MH Construction Button System
          </h1>
          <p className="mx-auto max-w-3xl text-gray-600 text-xl">
            Enhanced button components with outer rings, gradient animations,
            and consistent MH brand styling. All variants include accessibility
            features and professional hover effects.
          </p>
        </div>

        {/* Button Variants Grid */}
        <div className="gap-8 grid grid-cols-1 lg:grid-cols-2 mb-12">
          {/* Primary Variant */}
          <div className="bg-white shadow-lg p-8 border border-gray-200 rounded-lg">
            <h3 className="mb-4 font-semibold text-gray-900 text-2xl">
              Primary Variant
            </h3>
            <p className="mb-6 text-gray-600">
              Hunter Green background with smooth hover effects and professional
              ring animation.
            </p>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="sm">
                  Small Primary
                </Button>
                <Button variant="primary" size="md">
                  Medium Primary
                </Button>
                <Button variant="primary" size="lg">
                  Large Primary
                </Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="md" withRing>
                  <WPZoomIcons.Phone className="mr-2 w-4 h-4" />
                  With Ring & Icon
                </Button>
                <Button variant="primary" size="md" disabled>
                  Disabled State
                </Button>
              </div>
            </div>
          </div>

          {/* Secondary Variant */}
          <div className="bg-white shadow-lg p-8 border border-gray-200 rounded-lg">
            <h3 className="mb-4 font-semibold text-gray-900 text-2xl">
              Secondary Variant
            </h3>
            <p className="mb-6 text-gray-600">
              Leather Tan styling with complementary colors and elegant
              transitions.
            </p>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button variant="secondary" size="sm">
                  Small Secondary
                </Button>
                <Button variant="secondary" size="md">
                  Medium Secondary
                </Button>
                <Button variant="secondary" size="lg">
                  Large Secondary
                </Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="secondary" size="md" withRing>
                  <WPZoomIcons.Email className="mr-2 w-4 h-4" />
                  With Ring & Icon
                </Button>
                <Button variant="secondary" size="md" disabled>
                  Disabled State
                </Button>
              </div>
            </div>
          </div>

          {/* Outline Variant */}
          <div className="bg-white shadow-lg p-8 border border-gray-200 rounded-lg">
            <h3 className="mb-4 font-semibold text-gray-900 text-2xl">
              Outline Variant
            </h3>
            <p className="mb-6 text-gray-600">
              Clean border design with fill animation on hover and subtle ring
              effects.
            </p>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" size="sm">
                  Small Outline
                </Button>
                <Button variant="outline" size="md">
                  Medium Outline
                </Button>
                <Button variant="outline" size="lg">
                  Large Outline
                </Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" size="md" withRing>
                  <WPZoomIcons.Location className="mr-2 w-4 h-4" />
                  With Ring & Icon
                </Button>
                <Button variant="outline" size="md" disabled>
                  Disabled State
                </Button>
              </div>
            </div>
          </div>

          {/* Ghost Variant */}
          <div className="bg-white shadow-lg p-8 border border-gray-200 rounded-lg">
            <h3 className="mb-4 font-semibold text-gray-900 text-2xl">
              Ghost Variant
            </h3>
            <p className="mb-6 text-gray-600">
              Minimal design with background fill on hover and gentle ring
              animations.
            </p>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button variant="ghost" size="sm">
                  Small Ghost
                </Button>
                <Button variant="ghost" size="md">
                  Medium Ghost
                </Button>
                <Button variant="ghost" size="lg">
                  Large Ghost
                </Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="ghost" size="md" withRing>
                  <WPZoomIcons.Sync className="mr-2 w-4 h-4" />
                  With Ring & Icon
                </Button>
                <Button variant="ghost" size="md" disabled>
                  Disabled State
                </Button>
              </div>
            </div>
          </div>

          {/* Gradient Variant */}
          <div className="bg-white shadow-lg p-8 border border-gray-200 rounded-lg">
            <h3 className="mb-4 font-semibold text-gray-900 text-2xl">
              Gradient Variant
            </h3>
            <p className="mb-6 text-gray-600">
              Eye-catching gradient from Hunter Green to Leather Tan with
              animated effects.
            </p>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button variant="gradient" size="sm">
                  Small Gradient
                </Button>
                <Button variant="gradient" size="md">
                  Medium Gradient
                </Button>
                <Button variant="gradient" size="lg">
                  Large Gradient
                </Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="gradient" size="md" withRing>
                  <WPZoomIcons.Hammer className="mr-2 w-4 h-4" />
                  With Ring & Icon
                </Button>
                <Button variant="gradient" size="md" disabled>
                  Disabled State
                </Button>
              </div>
            </div>
          </div>

          {/* Destructive Variant */}
          <div className="bg-white shadow-lg p-8 border border-gray-200 rounded-lg">
            <h3 className="mb-4 font-semibold text-gray-900 text-2xl">
              Destructive Variant
            </h3>
            <p className="mb-6 text-gray-600">
              Red styling for critical actions with warning ring effects and
              clear hover states.
            </p>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button variant="destructive" size="sm">
                  Small Destructive
                </Button>
                <Button variant="destructive" size="md">
                  Medium Destructive
                </Button>
                <Button variant="destructive" size="lg">
                  Large Destructive
                </Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="destructive" size="md" withRing>
                  <WPZoomIcons.Close className="mr-2 w-4 h-4" />
                  With Ring & Icon
                </Button>
                <Button variant="destructive" size="md" disabled>
                  Disabled State
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Demo Section */}
        <div className="bg-white shadow-lg mb-12 p-8 border border-gray-200 rounded-lg">
          <h3 className="mb-6 font-semibold text-gray-900 text-2xl">
            Interactive Demo
          </h3>
          <p className="mb-8 text-gray-600">
            Test the button interactions and ring effects. All buttons include
            focus states for accessibility.
          </p>

          <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 border border-gray-200 rounded-lg text-center">
              <h4 className="mb-4 font-semibold">Call-to-Action Buttons</h4>
              <div className="space-y-3">
                <Button
                  variant="gradient"
                  size="lg"
                  withRing
                  className="w-full"
                >
                  <WPZoomIcons.Hammer className="mr-2 w-5 h-5" />
                  Start Your Project
                </Button>
                <Button variant="primary" size="md" withRing className="w-full">
                  <WPZoomIcons.Phone className="mr-2 w-4 h-4" />
                  Call Now
                </Button>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg text-center">
              <h4 className="mb-4 font-semibold">Navigation Actions</h4>
              <div className="space-y-3">
                <Button
                  variant="secondary"
                  size="md"
                  withRing
                  className="w-full"
                >
                  <WPZoomIcons.Menu className="mr-2 w-4 h-4" />
                  View Portfolio
                </Button>
                <Button variant="outline" size="md" withRing className="w-full">
                  <WPZoomIcons.Sync className="mr-2 w-4 h-4" />
                  Get Estimate
                </Button>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg text-center">
              <h4 className="mb-4 font-semibold">Form Actions</h4>
              <div className="space-y-3">
                <Button variant="primary" size="md" className="w-full">
                  Submit Form
                </Button>
                <Button variant="ghost" size="md" className="w-full">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="bg-gray-50 p-8 border border-gray-200 rounded-lg">
          <h3 className="mb-6 font-semibold text-gray-900 text-2xl">
            Technical Specifications
          </h3>

          <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
            <div>
              <h4 className="mb-4 font-semibold text-gray-900 text-lg">
                Color Palette
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-primary rounded w-4 h-4"></div>
                  <span>Hunter Green: #386851</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-brand-secondary rounded w-4 h-4"></div>
                  <span>Leather Tan: #BD9264</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-red-600 rounded w-4 h-4"></div>
                  <span>Destructive: #DC2626</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-gray-900 text-lg">
                Features
              </h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Outer ring animations with focus states</li>
                <li>• Gradient backgrounds with smooth transitions</li>
                <li>• Accessibility-compliant color contrasts</li>
                <li>• Responsive sizing (sm, md, lg)</li>
                <li>• Icon integration support</li>
                <li>• Disabled state handling</li>
                <li>• Consistent MH brand styling</li>
              </ul>
            </div>
          </div>

          <div className="bg-white mt-8 p-4 border border-gray-200 rounded">
            <h4 className="mb-3 font-semibold text-gray-900 text-lg">
              Usage Example
            </h4>
            <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-sm">
              {`<Button variant="gradient" size="lg" withRing>
  <WPZoomIcons.Hammer className="mr-2 w-5 h-5" />
  Start Your Project
</Button>`}
            </pre>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
          >
            <WPZoomIcons.ArrowRight className="mr-2 w-5 h-5" />
            Back to Website
          </Button>
        </div>
      </div>
    </div>
  )
}
