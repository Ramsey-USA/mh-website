import type { Metadata } from "next";
import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import StructuredData from "@/components/seo/StructuredData";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Terms of Service | MH Construction, Inc.",
  description:
    "Read our terms of service and understand the legal agreement between you and MH Construction, Inc. User rights, responsibilities, and legal compliance.",
  alternates: {
    canonical: "https://www.mhc-gc.com/terms",
  },
  openGraph: {
    title: "Terms of Service | MH Construction, Inc.",
    description:
      "Our terms of service and legal agreements. Understand your rights and responsibilities when using our website.",
    url: "https://www.mhc-gc.com/terms",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service | MH Construction, Inc.",
    description:
      "Our terms of service and legal agreements. User rights and responsibilities.",
  },
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      <StructuredData
        data={generateBreadcrumbSchema(breadcrumbPatterns.terms)}
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
            Terms of Service
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Last Updated: December 22, 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Agreement to Terms
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              By accessing or using the MH Construction, Inc. website and
              services, you agree to be bound by these Terms of Service and all
              applicable laws and regulations. If you do not agree with any of
              these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Use License
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Permission is granted to temporarily access the materials on MH
              Construction's website for personal, non-commercial transitory
              viewing only. This is the grant of a license, not a transfer of
              title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Modify or copy the materials</li>
              <li>
                Use the materials for any commercial purpose or public display
              </li>
              <li>
                Attempt to decompile or reverse engineer any software on the
                site
              </li>
              <li>
                Remove any copyright or proprietary notations from the materials
              </li>
              <li>
                Transfer the materials to another person or mirror the materials
                on any other server
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Services and Project Agreements
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              All construction and consulting services provided by MH
              Construction, Inc. are subject to separate written agreements.
              These Terms of Service govern your use of our website but do not
              constitute a contract for construction services.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Project estimates and consultations provided through this website
              are preliminary and non-binding until formalized in a written
              contract signed by both parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Disclaimer
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The materials on MH Construction's website are provided on an 'as
              is' basis. MH Construction makes no warranties, expressed or
              implied, and hereby disclaims and negates all other warranties
              including, without limitation, implied warranties or conditions of
              merchantability, fitness for a particular purpose, or
              non-infringement of intellectual property or other violation of
              rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Limitations
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              In no event shall MH Construction, Inc. or its suppliers be liable
              for any damages (including, without limitation, damages for loss
              of data or profit, or due to business interruption) arising out of
              the use or inability to use the materials on our website, even if
              we or our authorized representative has been notified orally or in
              writing of the possibility of such damage.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Accuracy of Materials
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The materials appearing on MH Construction's website could include
              technical, typographical, or photographic errors. We do not
              warrant that any of the materials on our website are accurate,
              complete, or current. We may make changes to the materials
              contained on our website at any time without notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Links
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              MH Construction has not reviewed all of the sites linked to our
              website and is not responsible for the contents of any such linked
              site. The inclusion of any link does not imply endorsement by MH
              Construction. Use of any linked website is at the user's own risk.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Modifications
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              MH Construction may revise these Terms of Service at any time
              without notice. By using this website you are agreeing to be bound
              by the then current version of these Terms of Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Governing Law
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              These terms and conditions are governed by and construed in
              accordance with the laws of the State of Washington, and you
              irrevocably submit to the exclusive jurisdiction of the courts in
              that State or location.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Contact Information
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If you have questions about these Terms of Service, please contact
              us:
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
