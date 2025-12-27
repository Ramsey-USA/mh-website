"use client";

import Link from "next/link";
import { usePageTracking } from "@/lib/analytics/hooks";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { COMPANY_INFO } from "@/lib/constants/company";
import { StructuredData } from "@/components/seo/seo-meta";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";

// Note: Metadata moved to parent layout due to "use client" directive

export default function AccessibilityPage() {
  // Analytics tracking
  usePageTracking("Accessibility");

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      <StructuredData
        data={generateBreadcrumbSchema(breadcrumbPatterns.accessibility)}
      />
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-12 sm:py-16 lg:py-20">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-brand-primary hover:text-brand-primary-dark transition-colors mb-6"
          >
            <MaterialIcon icon="arrow_back" size="sm" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Accessibility Statement
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Last Updated: December 22, 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Our Commitment
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              MH Construction, Inc. is committed to ensuring digital
              accessibility for people with disabilities. We are continually
              improving the user experience for everyone and applying the
              relevant accessibility standards.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Measures to Support Accessibility
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              MH Construction takes the following measures to ensure
              accessibility of our website:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Include accessibility as part of our mission statement</li>
              <li>Integrate accessibility into our procurement practices</li>
              <li>Provide continual accessibility training for our staff</li>
              <li>Assign clear accessibility goals and responsibilities</li>
              <li>Employ formal accessibility quality assurance methods</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Conformance Status
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The Web Content Accessibility Guidelines (WCAG) defines
              requirements for designers and developers to improve accessibility
              for people with disabilities. It defines three levels of
              conformance: Level A, Level AA, and Level AAA.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Our website strives to be partially conformant with WCAG 2.1 level
              AA. Partially conformant means that some parts of the content do
              not fully conform to the accessibility standard.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Feedback
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We welcome your feedback on the accessibility of our website.
              Please let us know if you encounter accessibility barriers:
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>MH Construction, Inc.</strong>
                <br />
                Phone:{" "}
                <a
                  href={`tel:${COMPANY_INFO.phone.tel}`}
                  className="text-brand-primary hover:underline"
                >
                  (509) 308-6489
                </a>
                <br />
                Email:{" "}
                <a
                  href="mailto:office@mhc-gc.com"
                  className="text-brand-primary hover:underline"
                >
                  office@mhc-gc.com
                </a>
                <br />
                Address: 3111 N. Capitol Ave., Pasco, WA 99301
              </p>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              We try to respond to feedback within 2 business days.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Technical Specifications
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Accessibility of our website relies on the following technologies
              to work with the particular combination of web browser and any
              assistive technologies or plugins installed on your computer:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>HTML</li>
              <li>WAI-ARIA</li>
              <li>CSS</li>
              <li>JavaScript</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              These technologies are relied upon for conformance with the
              accessibility standards used.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Limitations and Alternatives
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Despite our best efforts to ensure accessibility of our website,
              there may be some limitations. Below is a description of known
              limitations, and potential solutions. Please contact us if you
              observe an issue not listed below.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If you need assistance with any content on our website, please
              contact us directly and we will provide the information in an
              alternative format or method that is accessible to you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Assessment Approach
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              MH Construction assessed the accessibility of our website by the
              following approaches:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Self-evaluation</li>
              <li>Automated testing tools</li>
              <li>Manual testing with assistive technologies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Continuous Improvement
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We are committed to continuously improving the accessibility of
              our website. As part of our ongoing efforts, we:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Regularly review and test our website for accessibility</li>
              <li>
                Incorporate accessibility best practices in all new features
              </li>
              <li>Provide training to our development team</li>
              <li>Listen to feedback from our users</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
