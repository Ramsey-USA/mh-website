/**
 * Project Case Study - Coming Soon
 * This page is under development and will showcase real project details
 */

import { PageNavigation } from "@/components/navigation/PageNavigation";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Button } from "@/components/ui";
import Link from "next/link";

export default function ProjectCaseStudyComingSoon() {
  return (
    <>
      <PageNavigation items={navigationConfigs.projects} />

      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: "Case Study" },
        ]}
      />

      <div className="relative bg-gradient-to-b from-white dark:from-gray-900 to-gray-50 dark:to-gray-800 py-20 lg:py-32 min-h-screen flex items-center">
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
          <div className="relative bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-8 sm:p-12 lg:p-20 flex flex-col justify-center items-center">
            <MaterialIcon
              icon="construction"
              size="4xl"
              className="text-brand-primary mb-8"
            />
            <h1 className="mb-6 font-black text-gray-900 dark:text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
              Coming Soon
            </h1>
            <h2 className="mb-8 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl">
              Project Case Studies Under Development
            </h2>
            <p className="max-w-2xl mb-6 font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl leading-relaxed">
              We're committed to showcasing only real, completed projects with
              authentic details and verified results.
            </p>
            <p className="max-w-xl mb-10 font-light text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed">
              Our project portfolio is currently being prepared. Please check
              back soon or contact us directly to learn more about our
              construction partnerships and capabilities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/projects">
                <Button variant="primary" size="lg">
                  <MaterialIcon icon="arrow_back" size="lg" className="mr-2" />
                  Back to Projects
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="secondary" size="lg">
                  <MaterialIcon
                    icon="contact_mail"
                    size="lg"
                    className="mr-2"
                  />
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
