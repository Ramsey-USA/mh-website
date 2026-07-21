"use client";

import Image from "next/image";
import Link from "next/link";
import { Button, Card, CardContent } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

interface ErrorFallbackCardProps {
  reset: () => void;
  heading: string;
  message: string;
  tryAgainLabel: string;
  homeLabel: string;
  contactLabel: string;
  contactHref?: string;
  alert?: boolean;
}

export function ErrorFallbackCard({
  reset,
  heading,
  message,
  tryAgainLabel,
  homeLabel,
  contactLabel,
  contactHref = "/contact",
  alert = true,
}: ErrorFallbackCardProps) {
  return (
    <main
      className="flex min-h-screen items-center justify-center bg-linear-to-b from-white via-gray-50 to-white p-4 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
      aria-labelledby="status-page-heading"
    >
      <Card
        variant="default"
        className="w-full max-w-xl border-brand-primary/25 text-center"
      >
        <CardContent className="space-y-6 p-8 sm:p-10">
          <div className="mb-6 flex justify-center">
            <Image
              src="/images/logo/mh-logo-light-bg.webp"
              alt="MH Construction"
              width={180}
              height={103}
              priority
              className="dark:hidden"
            />
            <Image
              src="/images/logo/mh-logo-dark-bg.webp"
              alt="MH Construction"
              width={180}
              height={103}
              priority
              className="hidden dark:block"
            />
          </div>

          <section
            {...(alert
              ? {
                  role: "alert",
                  "aria-live": "assertive" as const,
                }
              : {})}
          >
            <h1
              id="status-page-heading"
              className="font-heading mb-3 text-2xl font-bold text-gray-900 dark:text-white"
            >
              {heading}
            </h1>

            <p className="font-body text-gray-700 dark:text-gray-200">
              {message}
            </p>
          </section>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button onClick={reset} variant="primary" size="lg">
              <MaterialIcon icon="refresh" size="md" className="mr-2" />
              {tryAgainLabel}
            </Button>

            <Button variant="outline" size="lg" asChild>
              <Link href="/">
                <MaterialIcon icon="home" size="md" className="mr-2" />
                {homeLabel}
              </Link>
            </Button>
          </div>

          <div className="border-t border-gray-200 pt-5 dark:border-gray-700">
            <Button variant="text" size="md" asChild>
              <Link href={contactHref}>
                <MaterialIcon icon="mail" size="sm" className="mr-1" />
                {contactLabel}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
