/**
 * Example Page with Analytics Tracking
 *
 * This demonstrates how to add comprehensive tracking to any page.
 * Copy these patterns to your own pages!
 */

"use client";

import { useState } from "react";
import {
  usePageTracking,
  useClickTracking,
  useElementTracking,
} from "@/lib/analytics/hooks";
import {
  TrackedButton,
  TrackedLink,
  TrackedCTA,
  TrackedForm,
  TrackedInput,
} from "@/components/analytics/TrackedComponents";
import { trackDownload, trackVideo } from "@/lib/analytics/tracking";

export default function TrackingExamplePage() {
  // ✅ Step 1: Add page tracking - This tracks views, duration, scroll automatically
  usePageTracking("Tracking Example");

  // For manual tracking when needed
  const trackClick = useClickTracking();

  // For tracking element visibility
  const testimonialRef = useElementTracking("testimonial-section-viewed");

  // Form state
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submitted with data: formData
    // Form tracking is automatic with TrackedForm!
  };

  return (
    <div className="container mx-auto p-8 space-y-12">
      <h1 className="text-4xl font-bold mb-4">Analytics Tracking Examples</h1>
      <p className="text-gray-600 mb-8">
        This page demonstrates all tracking capabilities. Open the admin
        dashboard to see the data!
      </p>

      {/* Example 1: Tracked Buttons */}
      <section className="border-2 border-blue-200 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">1. Button Tracking</h2>
        <p className="mb-4 text-gray-600">
          These buttons automatically track clicks with context:
        </p>

        <div className="space-x-4">
          {/* Regular tracked button */}
          <TrackedButton
            trackId="example-button"
            trackProperties={{ category: "demo", variant: "primary" }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Regular Button
          </TrackedButton>

          {/* CTA button (tracks as conversion) */}
          <TrackedCTA
            trackId="example-cta"
            trackProperties={{ section: "demo", intent: "conversion" }}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            CTA Button (Conversion)
          </TrackedCTA>

          {/* Manual tracking for custom logic */}
          <button
            onClick={() => {
              trackClick("custom-action-button", {
                action: "special",
                timestamp: new Date().toISOString(),
              });
              // Custom action tracked!
            }}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Manual Tracking
          </button>
        </div>

        <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
          <strong>Try it:</strong> Click these buttons, then check the admin
          dashboard to see click data!
        </div>
      </section>

      {/* Example 2: Link Tracking */}
      <section className="border-2 border-green-200 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">2. Link Tracking</h2>
        <p className="mb-4 text-gray-600">
          Track navigation to understand user journey:
        </p>

        <div className="space-y-2">
          <div>
            <TrackedLink
              trackId="nav-services"
              trackProperties={{ location: "demo-page" }}
              href="/services"
              className="text-blue-600 hover:underline"
            >
              Internal Link: Services Page
            </TrackedLink>
          </div>

          <div>
            <TrackedLink
              trackId="external-github"
              trackProperties={{ type: "external", category: "social" }}
              href="https://github.com"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              External Link: GitHub
            </TrackedLink>
          </div>
        </div>

        <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
          <strong>Data collected:</strong> Link ID, destination, click time,
          source page
        </div>
      </section>

      {/* Example 3: Form Tracking */}
      <section className="border-2 border-yellow-200 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">3. Form Tracking</h2>
        <p className="mb-4 text-gray-600">
          Track form submissions and field interactions:
        </p>

        <TrackedForm
          trackId="demo-form"
          trackProperties={{ source: "example-page", type: "demo" }}
          onSubmit={handleFormSubmit}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Name:</label>
            <TrackedInput
              trackId="name"
              formId="demo-form"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="border border-gray-300 rounded px-3 py-2 w-full"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email:</label>
            <TrackedInput
              trackId="email"
              formId="demo-form"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="border border-gray-300 rounded px-3 py-2 w-full"
              placeholder="Enter your email"
            />
          </div>

          <TrackedButton
            trackId="demo-form-submit"
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Submit Form
          </TrackedButton>
        </TrackedForm>

        <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
          <strong>Tracks:</strong> Field focus/blur, changes, form submission,
          abandonment
        </div>
      </section>

      {/* Example 4: Media Tracking */}
      <section className="border-2 border-red-200 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">4. Media & Downloads</h2>
        <p className="mb-4 text-gray-600">Track video and file interactions:</p>

        <div className="space-y-4">
          {/* Video tracking example */}
          <div>
            <p className="font-medium mb-2">Video Tracking:</p>
            <div className="bg-gray-800 text-white p-4 rounded">
              <video
                className="w-full max-w-md"
                controls
                onPlay={() => trackVideo("demo-video", "play")}
                onPause={() => trackVideo("demo-video", "pause")}
                onEnded={() => trackVideo("demo-video", "complete")}
              >
                <source src="/videos/demo.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Download tracking */}
          <div>
            <p className="font-medium mb-2">Download Tracking:</p>
            <TrackedButton
              trackId="download-brochure"
              onClick={() => {
                trackDownload("company-brochure.pdf", {
                  category: "marketing",
                  size: "2.5MB",
                });
                // Trigger actual download...
                // Download tracked!
              }}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              📄 Download Brochure
            </TrackedButton>
          </div>
        </div>

        <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
          <strong>Captures:</strong> Play/pause/complete for videos, file name
          and metadata for downloads
        </div>
      </section>

      {/* Example 5: Element Visibility Tracking */}
      <section
        ref={testimonialRef}
        className="border-2 border-purple-200 p-6 rounded-lg"
      >
        <h2 className="text-2xl font-semibold mb-4">5. Visibility Tracking</h2>
        <p className="mb-4 text-gray-600">
          This section tracks when it becomes visible (scroll down to it):
        </p>

        <div className="p-4 bg-purple-50 rounded">
          <p className="text-center font-medium">
            🎯 When this section is 50% visible, it's automatically tracked!
          </p>
        </div>

        <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
          <strong>Use case:</strong> Track engagement with testimonials, product
          features, or key content
        </div>
      </section>

      {/* Automatic Tracking Info */}
      <section className="border-2 border-gray-300 p-6 rounded-lg bg-gray-50">
        <h2 className="text-2xl font-semibold mb-4">
          ✨ Automatic Tracking (Happening Now!)
        </h2>
        <p className="mb-4">
          Because we added{" "}
          <code className="bg-gray-200 px-2 py-1 rounded">
            usePageTracking()
          </code>{" "}
          at the top, this page is automatically tracking:
        </p>

        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>
            <strong>Page Views:</strong> Counted when you loaded this page
          </li>
          <li>
            <strong>Time on Page:</strong> Tracking how long you've been here
          </li>
          <li>
            <strong>Scroll Depth:</strong> Records 25%, 50%, 75%, 100%
            milestones
          </li>
          <li>
            <strong>Exit Tracking:</strong> Records when you navigate away
          </li>
          <li>
            <strong>Session Info:</strong> Manages your session automatically
          </li>
        </ul>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
          <h3 className="font-semibold mb-2">📊 View Your Data:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Triple-click the copyright text in the footer</li>
            <li>Sign in (matt@mhc-gc.com / admin123)</li>
            <li>See all tracked data in the dashboard!</li>
          </ol>
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="border-2 border-green-300 p-6 rounded-lg bg-green-50">
        <h2 className="text-2xl font-semibold mb-4">
          📚 How to Add Tracking to Your Page
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Step 1: Import the hook</h3>
            <pre className="bg-gray-800 text-gray-100 p-3 rounded overflow-x-auto text-sm">
              {`import { usePageTracking } from '@/lib/analytics/hooks';`}
            </pre>
          </div>

          <div>
            <h3 className="font-semibold mb-2">
              Step 2: Add to your component
            </h3>
            <pre className="bg-gray-800 text-gray-100 p-3 rounded overflow-x-auto text-sm">
              {`export default function MyPage() {
  usePageTracking('My Page Name'); // ✅ That's it!
  
  return <div>Your content</div>;
}`}
            </pre>
          </div>

          <div>
            <h3 className="font-semibold mb-2">
              Step 3: Use tracked components
            </h3>
            <pre className="bg-gray-800 text-gray-100 p-3 rounded overflow-x-auto text-sm">
              {`import { TrackedButton } from '@/components/analytics/TrackedComponents';

<TrackedButton trackId="my-button">
  Click Me
</TrackedButton>`}
            </pre>
          </div>
        </div>

        <div className="mt-4 p-3 bg-white rounded border border-green-300">
          <strong>📖 Complete guide:</strong>{" "}
          <code className="text-sm">
            docs/technical/analytics-tracking-guide.md
          </code>
        </div>
      </section>
    </div>
  );
}
