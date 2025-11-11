"use client";

import Link from "next/link";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

export function BlogNewsSection() {
  return (
    <section className="relative bg-gradient-to-b from-gray-50 dark:from-gray-800 to-white dark:to-gray-900 py-8 sm:py-12 lg:py-16 blog-news-section">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(56,104,81,0.05)_0%,transparent_50%)] opacity-60"></div>
      <div className="top-20 right-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-32 h-32"></div>
      <div className="bottom-20 left-20 absolute bg-brand-secondary/5 blur-3xl rounded-full w-40 h-40"></div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <FadeInWhenVisible className="mb-12 sm:mb-16 text-center">
          <h2 className="mb-4 sm:mb-6 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
            <span className="block mb-2 sm:mb-3 font-semibold text-gray-700 dark:text-gray-300 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Latest News &
            </span>
            <span className="block text-brand-primary dark:text-brand-primary font-black">
              Construction Insights
            </span>
          </h2>
          <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-4 break-words">
            Stay informed with{" "}
            <span className="font-medium text-gray-800 dark:text-gray-200">
              construction industry insights
            </span>{" "}
            and the latest news from our veteran-owned team in the{" "}
            <span className="text-brand-primary font-semibold">
              Pacific Northwest
            </span>
            .
          </p>
        </FadeInWhenVisible>

        {/* Blog/News Carousel removed for clean slate migration */}

        {/* View All Links - Redirected to About page sections */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mt-8 sm:mt-12 text-center">
          <Link href="/about#blog">
            <Button
              variant="secondary"
              size="lg"
              className="group transition-all duration-300 w-full sm:w-auto min-h-[48px] touch-manipulation"
            >
              <MaterialIcon
                icon="article"
                size="lg"
                className="mr-2 sm:mr-3 flex-shrink-0"
              />
              <span className="font-medium text-sm sm:text-base">
                Construction Insights
              </span>
            </Button>
          </Link>
          <Link href="/about#news">
            <Button
              variant="secondary"
              size="lg"
              className="group transition-all duration-300 w-full sm:w-auto min-h-[48px] touch-manipulation"
            >
              <MaterialIcon
                icon="newspaper"
                size="lg"
                className="mr-2 sm:mr-3 flex-shrink-0"
              />
              <span className="font-medium text-sm sm:text-base">
                Company News
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
