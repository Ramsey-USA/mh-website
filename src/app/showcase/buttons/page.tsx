'use client';

import { Button } from '@/components/ui/Button';
import { SharpDuotoneIcons } from '@/components/icons/SharpDuotoneIcons';

export default function ButtonShowcase() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            MH Construction Button System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Enhanced button components with outer rings, gradient animations, and consistent MH brand styling.
            All variants include accessibility features and professional hover effects.
          </p>
        </div>

        {/* Button Variants Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Primary Variant */}
          <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Primary Variant</h3>
            <p className="text-gray-600 mb-6">
              Hunter Green background with smooth hover effects and professional ring animation.
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
                  <SharpDuotoneIcons.Phone className="w-4 h-4 mr-2" />
                  With Ring & Icon
                </Button>
                <Button variant="primary" size="md" disabled>
                  Disabled State
                </Button>
              </div>
            </div>
          </div>

          {/* Secondary Variant */}
          <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Secondary Variant</h3>
            <p className="text-gray-600 mb-6">
              Leather Tan styling with complementary colors and elegant transitions.
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
                  <SharpDuotoneIcons.Email className="w-4 h-4 mr-2" />
                  With Ring & Icon
                </Button>
                <Button variant="secondary" size="md" disabled>
                  Disabled State
                </Button>
              </div>
            </div>
          </div>

          {/* Outline Variant */}
          <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Outline Variant</h3>
            <p className="text-gray-600 mb-6">
              Clean border design with fill animation on hover and subtle ring effects.
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
                  <SharpDuotoneIcons.Location className="w-4 h-4 mr-2" />
                  With Ring & Icon
                </Button>
                <Button variant="outline" size="md" disabled>
                  Disabled State
                </Button>
              </div>
            </div>
          </div>

          {/* Ghost Variant */}
          <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Ghost Variant</h3>
            <p className="text-gray-600 mb-6">
              Minimal design with background fill on hover and gentle ring animations.
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
                  <SharpDuotoneIcons.Sync className="w-4 h-4 mr-2" />
                  With Ring & Icon
                </Button>
                <Button variant="ghost" size="md" disabled>
                  Disabled State
                </Button>
              </div>
            </div>
          </div>

          {/* Gradient Variant */}
          <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Gradient Variant</h3>
            <p className="text-gray-600 mb-6">
              Eye-catching gradient from Hunter Green to Leather Tan with animated effects.
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
                  <SharpDuotoneIcons.Hammer className="w-4 h-4 mr-2" />
                  With Ring & Icon
                </Button>
                <Button variant="gradient" size="md" disabled>
                  Disabled State
                </Button>
              </div>
            </div>
          </div>

          {/* Destructive Variant */}
          <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Destructive Variant</h3>
            <p className="text-gray-600 mb-6">
              Red styling for critical actions with warning ring effects and clear hover states.
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
                  <SharpDuotoneIcons.Close className="w-4 h-4 mr-2" />
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
        <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-200 mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Interactive Demo</h3>
          <p className="text-gray-600 mb-8">
            Test the button interactions and ring effects. All buttons include focus states for accessibility.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold mb-4">Call-to-Action Buttons</h4>
              <div className="space-y-3">
                <Button variant="gradient" size="lg" withRing className="w-full">
                  <SharpDuotoneIcons.Hammer className="w-5 h-5 mr-2" />
                  Start Your Project
                </Button>
                <Button variant="primary" size="md" withRing className="w-full">
                  <SharpDuotoneIcons.Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
              </div>
            </div>

            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold mb-4">Navigation Actions</h4>
              <div className="space-y-3">
                <Button variant="secondary" size="md" withRing className="w-full">
                  <SharpDuotoneIcons.Menu className="w-4 h-4 mr-2" />
                  View Portfolio
                </Button>
                <Button variant="outline" size="md" withRing className="w-full">
                  <SharpDuotoneIcons.Sync className="w-4 h-4 mr-2" />
                  Get Estimate
                </Button>
              </div>
            </div>

            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold mb-4">Form Actions</h4>
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
        <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Technical Specifications</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Color Palette</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-brand-primary"></div>
                  <span>Hunter Green: #386851</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-brand-secondary"></div>
                  <span>Leather Tan: #BD9264</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-red-600"></div>
                  <span>Destructive: #DC2626</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-gray-600">
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

          <div className="mt-8 p-4 bg-white rounded border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Usage Example</h4>
            <pre className="text-sm bg-gray-100 p-3 rounded overflow-x-auto">
{`<Button variant="gradient" size="lg" withRing>
  <SharpDuotoneIcons.Hammer className="w-5 h-5 mr-2" />
  Start Your Project
</Button>`}
            </pre>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" onClick={() => window.history.back()}>
            <SharpDuotoneIcons.ArrowRight className="w-5 h-5 mr-2" />
            Back to Website
          </Button>
        </div>
      </div>
    </div>
  );
}