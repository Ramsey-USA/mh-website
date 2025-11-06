import Link from "next/link";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <MaterialIcon
            icon="search_off"
            className="text-gray-400 dark:text-gray-500 mx-auto"
            size="4xl"
          />
        </div>

        <h1 className="text-6xl font-black text-brand-primary dark:text-brand-primary-light mb-4">
          404
        </h1>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Sorry, we couldn't find the page you're looking for. It may have been
          moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="primary" size="lg">
              <MaterialIcon icon="home" size="md" className="mr-2" />
              Back to Home
            </Button>
          </Link>

          <Link href="/services">
            <Button variant="outline" size="lg">
              <MaterialIcon icon="build" size="md" className="mr-2" />
              View Services
            </Button>
          </Link>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap gap-2 justify-center text-sm">
            <Link
              href="/about"
              className="text-brand-primary dark:text-brand-primary-light hover:underline"
            >
              About Us
            </Link>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <Link
              href="/projects"
              className="text-brand-primary dark:text-brand-primary-light hover:underline"
            >
              Projects
            </Link>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <Link
              href="/team"
              className="text-brand-primary dark:text-brand-primary-light hover:underline"
            >
              Team
            </Link>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <Link
              href="/contact"
              className="text-brand-primary dark:text-brand-primary-light hover:underline"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
