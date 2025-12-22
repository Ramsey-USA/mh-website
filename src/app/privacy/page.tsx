import type { Metadata } from "next";
import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { StructuredData } from "@/components/seo/seo-meta";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Privacy Policy | MH Construction, Inc.",
  description:
    "Learn how MH Construction protects your privacy and handles your personal information. Our commitment to data security, transparency, and GDPR compliance.",
  alternates: {
    canonical: "https://www.mhc-gc.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy | MH Construction, Inc.",
    description:
      "Our privacy policy and data protection practices. Learn how we handle your information securely.",
    url: "https://www.mhc-gc.com/privacy",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | MH Construction, Inc.",
    description:
      "Our commitment to data security, transparency, and protecting your privacy.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      <StructuredData
        data={generateBreadcrumbSchema(breadcrumbPatterns.privacy)}
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
            Privacy Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Last Updated: December 22, 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Our Commitment to Privacy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              At MH Construction, Inc., we are committed to protecting your
              privacy and ensuring the security of your personal information.
              This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you visit our website or use our
              services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>
                Name and contact information (email, phone number, address)
              </li>
              <li>Project details and consultation requests</li>
              <li>Resume and employment application information</li>
              <li>Newsletter subscription preferences</li>
              <li>Communications with our team</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Respond to your inquiries and provide customer service</li>
              <li>Process consultation requests and project proposals</li>
              <li>Evaluate employment applications</li>
              <li>
                Send newsletters and marketing communications (with your
                consent)
              </li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Information Sharing and Disclosure
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We do not sell, trade, or rent your personal information to third
              parties. We may share your information only in the following
              circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>With your consent</li>
              <li>
                To comply with legal obligations or respond to lawful requests
              </li>
              <li>To protect our rights, property, or safety</li>
              <li>
                With service providers who assist in our operations (subject to
                confidentiality agreements)
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Data Security
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction. However, no internet
              transmission is completely secure, and we cannot guarantee
              absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Your Rights
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Access and review your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent for data processing</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If you have questions about this Privacy Policy or wish to
              exercise your rights, please contact us:
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>MH Construction, Inc.</strong>
                <br />
                3111 N. Capitol Ave.
                <br />
                Pasco, WA 99301
                <br />
                Phone:{" "}
                <a
                  href="tel:+15093086489"
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
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
