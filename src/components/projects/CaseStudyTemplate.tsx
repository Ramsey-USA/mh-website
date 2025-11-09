/**
 * Case Study Template Component
 * Reusable template for detailed project showcases
 */

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Button, Card } from "@/components/ui";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import { TeamMemberTags } from "@/components/team";
import { BeforeAfterSlider } from "@/components/slider";
import Link from "next/link";
import Image from "next/image";

export interface CaseStudyData {
  id: string;
  title: string;
  subtitle: string;
  client: string;
  location: string;
  completionDate: string;
  projectValue: string;
  duration: string;
  category: string;

  // Hero Image
  heroImage: string;
  heroImageAlt: string;

  // Challenge Section
  challenge: {
    title: string;
    description: string;
    keyPoints: string[];
  };

  // Solution Section
  solution: {
    title: string;
    description: string;
    keyPoints: string[];
    approach: string[];
  };

  // Results Section
  results: {
    title: string;
    description: string;
    metrics: Array<{
      icon: string;
      value: string;
      label: string;
    }>;
    outcomes: string[];
  };

  // Client Quote
  clientQuote: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };

  // Project Specifications
  specifications: Array<{
    label: string;
    value: string;
    icon: string;
  }>;

  // Before/After Photos (optional)
  beforeAfterPhotos?: Array<{
    before: string;
    after: string;
    caption: string;
  }>;

  // Gallery Photos
  galleryPhotos: Array<{
    src: string;
    alt: string;
    caption: string;
  }>;

  // Team Members (optional)
  team?: Array<{
    name: string;
    role: string;
    slug: string;
    avatar?: string;
    department?: string;
  }>;

  // Tags
  tags: string[];
}

interface CaseStudyTemplateProps {
  data: CaseStudyData;
}

export function CaseStudyTemplate({ data }: CaseStudyTemplateProps) {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/textures/construction-pattern.png')] opacity-10"></div>
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            <div className="gap-12 grid grid-cols-1 lg:grid-cols-2 items-center">
              {/* Left: Project Info */}
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-accent-500 px-3 py-1 rounded-full font-semibold text-sm text-white">
                    {data.category}
                  </span>
                  {data.tags.slice(0, 2).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-white/20 px-3 py-1 rounded-full text-sm text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="mb-4 font-black text-4xl text-white sm:text-5xl md:text-6xl leading-tight">
                  {data.title}
                </h1>
                <p className="mb-6 text-primary-100 text-xl sm:text-2xl leading-relaxed">
                  {data.subtitle}
                </p>
                <div className="gap-4 grid grid-cols-2 mb-8">
                  <div>
                    <p className="mb-1 font-semibold text-primary-200 text-sm uppercase tracking-wide">
                      Client
                    </p>
                    <p className="font-medium text-lg text-white">
                      {data.client}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 font-semibold text-primary-200 text-sm uppercase tracking-wide">
                      Location
                    </p>
                    <p className="font-medium text-lg text-white">
                      {data.location}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 font-semibold text-primary-200 text-sm uppercase tracking-wide">
                      Completed
                    </p>
                    <p className="font-medium text-lg text-white">
                      {data.completionDate}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 font-semibold text-primary-200 text-sm uppercase tracking-wide">
                      Duration
                    </p>
                    <p className="font-medium text-lg text-white">
                      {data.duration}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Hero Image */}
              <div className="relative rounded-2xl shadow-2xl overflow-hidden h-96">
                <Image
                  src={data.heroImage}
                  alt={data.heroImageAlt}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Project Specifications */}
      <section className="bg-gray-50 dark:bg-gray-800 py-12">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <StaggeredFadeIn className="gap-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            {data.specifications.map((spec, specIndex) => (
              <div
                key={specIndex}
                className="flex flex-col items-center p-4 text-center"
              >
                <div className="flex justify-center items-center bg-primary-100 dark:bg-primary-900/30 mb-3 rounded-full w-12 h-12">
                  <MaterialIcon
                    icon={spec.icon}
                    size="md"
                    className="text-primary-600 dark:text-primary-400"
                  />
                </div>
                <p className="mb-1 font-bold text-gray-900 text-lg dark:text-white">
                  {spec.value}
                </p>
                <p className="text-gray-600 text-sm dark:text-gray-400">
                  {spec.label}
                </p>
              </div>
            ))}
          </StaggeredFadeIn>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="bg-white dark:bg-gray-900 py-20 lg:py-32">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            <div className="gap-12 grid grid-cols-1 lg:grid-cols-2">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex justify-center items-center bg-red-100 dark:bg-red-900/30 rounded-full w-16 h-16">
                    <MaterialIcon
                      icon="flag"
                      size="lg"
                      className="text-red-600 dark:text-red-400"
                    />
                  </div>
                  <h2 className="font-black text-3xl text-gray-900 sm:text-4xl dark:text-white">
                    {data.challenge.title}
                  </h2>
                </div>
                <p className="mb-6 text-gray-600 text-lg dark:text-gray-300 leading-relaxed">
                  {data.challenge.description}
                </p>
              </div>
              <div>
                <h3 className="mb-4 font-bold text-gray-900 text-xl dark:text-white">
                  Key Challenges:
                </h3>
                <ul className="space-y-3">
                  {data.challenge.keyPoints.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-3">
                      <MaterialIcon
                        icon="arrow_right"
                        size="sm"
                        className="flex-shrink-0 mt-1 text-red-600"
                      />
                      <span className="text-gray-600 dark:text-gray-300">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Solution Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-20 lg:py-32">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex justify-center items-center bg-primary-100 dark:bg-primary-900/30 rounded-full w-16 h-16">
                  <MaterialIcon
                    icon="lightbulb"
                    size="lg"
                    className="text-primary-600 dark:text-primary-400"
                  />
                </div>
                <h2 className="font-black text-3xl text-gray-900 sm:text-4xl dark:text-white">
                  {data.solution.title}
                </h2>
              </div>
              <p className="mb-8 max-w-4xl text-gray-600 text-lg dark:text-gray-300 leading-relaxed">
                {data.solution.description}
              </p>
            </div>

            <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
              {/* Key Solutions */}
              <div>
                <h3 className="mb-4 font-bold text-gray-900 text-xl dark:text-white">
                  Key Solutions:
                </h3>
                <ul className="space-y-3">
                  {data.solution.keyPoints.map((point, solutionIndex) => (
                    <li key={solutionIndex} className="flex items-start gap-3">
                      <MaterialIcon
                        icon="check_circle"
                        size="sm"
                        className="flex-shrink-0 mt-1 text-primary-600"
                      />
                      <span className="text-gray-600 dark:text-gray-300">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Our Approach */}
              <div>
                <h3 className="mb-4 font-bold text-gray-900 text-xl dark:text-white">
                  Our Approach:
                </h3>
                <ul className="space-y-3">
                  {data.solution.approach.map((point, approachIndex) => (
                    <li key={approachIndex} className="flex items-start gap-3">
                      <div className="flex flex-shrink-0 justify-center items-center bg-primary-600 mt-1 rounded-full w-6 h-6">
                        <span className="font-bold text-white text-xs">
                          {approachIndex + 1}
                        </span>
                      </div>
                      <span className="text-gray-600 dark:text-gray-300">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Results Section */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 py-20 lg:py-32">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            <div className="mb-12 text-center">
              <div className="flex justify-center items-center mx-auto mb-6 bg-white/20 rounded-full w-16 h-16">
                <MaterialIcon
                  icon="celebration"
                  size="lg"
                  className="text-white"
                />
              </div>
              <h2 className="mb-4 font-black text-4xl text-white sm:text-5xl">
                {data.results.title}
              </h2>
              <p className="mx-auto max-w-3xl text-primary-100 text-xl leading-relaxed">
                {data.results.description}
              </p>
            </div>

            {/* Metrics */}
            <div className="gap-6 grid grid-cols-2 md:grid-cols-4 mb-12">
              {data.results.metrics.map((metric, metricIndex) => (
                <div
                  key={metricIndex}
                  className="bg-white dark:bg-gray-800 shadow-xl p-6 rounded-2xl text-center"
                >
                  <MaterialIcon
                    icon={metric.icon}
                    size="xl"
                    className="mx-auto mb-3 text-primary-600"
                  />
                  <p className="mb-2 font-black text-3xl text-gray-900 dark:text-white">
                    {metric.value}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Outcomes */}
            <div className="bg-white/10 backdrop-blur-sm shadow-2xl p-8 rounded-2xl">
              <h3 className="mb-6 font-bold text-2xl text-center text-white">
                Project Outcomes:
              </h3>
              <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                {data.results.outcomes.map((outcome, outcomeIndex) => (
                  <div key={outcomeIndex} className="flex items-start gap-3">
                    <MaterialIcon
                      icon="star"
                      size="sm"
                      className="flex-shrink-0 mt-1 text-yellow-400"
                    />
                    <span className="text-white">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Client Quote Section */}
      <section className="bg-white dark:bg-gray-900 py-20 lg:py-32">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <FadeInWhenVisible>
            <Card className="relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-2xl p-12 border-l-8 border-primary-600">
              <div className="top-6 right-6 absolute">
                <MaterialIcon
                  icon="format_quote"
                  size="4xl"
                  className="text-primary-600/20"
                />
              </div>
              <blockquote className="relative mb-6 font-light text-2xl text-gray-900 sm:text-3xl dark:text-white italic leading-relaxed">
                "{data.clientQuote.quote}"
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="flex justify-center items-center bg-primary-600 rounded-full w-16 h-16">
                  <span className="font-bold text-2xl text-white">
                    {data.clientQuote.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg dark:text-white">
                    {data.clientQuote.author}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {data.clientQuote.role}, {data.clientQuote.company}
                  </p>
                </div>
              </div>
            </Card>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Team Section - Who Worked On This Project */}
      {data.team && data.team.length > 0 && (
        <section className="bg-white dark:bg-gray-900 py-20 lg:py-32">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <FadeInWhenVisible>
              <TeamMemberTags
                title="On This Project"
                members={data.team}
                variant="compact"
                showDepartments={true}
                maxVisible={6}
              />
            </FadeInWhenVisible>
          </div>
        </section>
      )}

      {/* Before/After Section */}
      {data.beforeAfterPhotos && data.beforeAfterPhotos.length > 0 && (
        <section className="bg-white dark:bg-gray-900 py-20 lg:py-32">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <FadeInWhenVisible>
              <h2 className="mb-12 font-black text-3xl text-center text-gray-900 sm:text-4xl dark:text-white">
                <span className="block text-2xl sm:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Project
                </span>
                <span className="block text-brand-primary">Transformation</span>
              </h2>
              <div className="space-y-12">
                {data.beforeAfterPhotos.map((photo, photoIndex) => (
                  <BeforeAfterSlider
                    key={photoIndex}
                    beforeImage={photo.before}
                    afterImage={photo.after}
                    caption={photo.caption}
                    beforeLabel="Before"
                    afterLabel="After"
                  />
                ))}
              </div>
            </FadeInWhenVisible>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {data.galleryPhotos && data.galleryPhotos.length > 0 && (
        <section className="bg-gray-50 dark:bg-gray-800 py-20 lg:py-32">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <FadeInWhenVisible>
              <h2 className="mb-12 font-black text-3xl text-center text-gray-900 sm:text-4xl dark:text-white">
                Project Gallery
              </h2>
              <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {data.galleryPhotos.map((photo, galleryIndex) => (
                  <div
                    key={galleryIndex}
                    className="group relative rounded-xl overflow-hidden h-64"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="bottom-0 absolute inset-x-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 p-4 transition-opacity duration-300">
                      <p className="font-medium text-sm text-white">
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeInWhenVisible>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-secondary-600 to-primary-600 py-20 lg:py-32">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
          <FadeInWhenVisible>
            <h2 className="mb-6 font-black text-4xl text-white sm:text-5xl">
              Ready to Start Your Project?
            </h2>
            <p className="mb-8 mx-auto max-w-2xl text-primary-100 text-xl">
              Let's discuss how we can bring your vision to life with the same
              excellence and dedication shown in this project.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/estimator">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-white hover:bg-gray-100 text-primary-600"
                >
                  <MaterialIcon icon="calculate" size="md" className="mr-2" />
                  Get Estimate
                </Button>
              </Link>
              <Link href="/booking">
                <Button variant="secondary" size="lg">
                  <MaterialIcon icon="event" size="md" className="mr-2" />
                  Schedule Consultation
                </Button>
              </Link>
              <Link href="/projects">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-transparent hover:bg-white/10 border-2 border-white text-white"
                >
                  <MaterialIcon icon="arrow_back" size="md" className="mr-2" />
                  View All Projects
                </Button>
              </Link>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  );
}
