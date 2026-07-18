/**
 * Project Card Component
 * Individual project card display
 */

import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
} from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { getCardClassName } from "@/lib/styles/card-variants";
import type { ProjectPortfolio } from "@/lib/types";
import { trackProjectInterest } from "@/lib/analytics/marketing-tracking";

interface ProjectCardProps {
  project: ProjectPortfolio;
}

export function ProjectCard({ project }: Readonly<ProjectCardProps>) {
  const featuredImage =
    project.images.find((image) => image.isFeatured) ?? project.images[0];
  const hasFeaturedImage = project.images.some((image) => image.isFeatured);

  const handleCardClick = () => {
    trackProjectInterest(project.title, project.category, "click", {
      location: project.location.city,
      featured: project.isFeatured,
    });
  };

  return (
    <Card
      className={getCardClassName("default", "overflow-hidden hover:shadow-xl")}
    >
      {/* Project Image */}
      <div className="relative h-72 overflow-hidden bg-gray-200 dark:bg-gray-700 md:h-80">
        {featuredImage ? (
          <Image
            src={featuredImage.url}
            alt={featuredImage.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            quality={78}
            loading="lazy"
            priority={false}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-brand-primary/20 via-white/20 to-brand-secondary/20 dark:from-brand-primary/30 dark:via-gray-900/20 dark:to-brand-secondary/30">
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/20 bg-white/40 px-5 py-4 text-center backdrop-blur-sm dark:bg-gray-950/30">
              <MaterialIcon
                icon="image"
                size="4xl"
                className="text-brand-secondary"
              />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-700 dark:text-gray-200">
                Project photo coming soon
              </span>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-gray-950/80 via-gray-950/10 to-transparent" />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900 shadow-md backdrop-blur-sm dark:bg-gray-950/85 dark:text-white">
            {project.images.length > 1
              ? `${project.images.length} photos`
              : "1 photo"}
          </span>
          {hasFeaturedImage && (
            <span className="inline-flex items-center rounded-full bg-brand-secondary/90 px-3 py-1 text-xs font-semibold text-white shadow-md backdrop-blur-sm">
              Featured photo
            </span>
          )}
        </div>

        {/* Featured Badge */}
        {project.isFeatured && (
          <div className="top-4 right-4 absolute">
            <span className="inline-flex items-center bg-bronze-700 shadow-lg backdrop-blur-sm px-2 py-1 border-bronze-400 border-l-4 font-semibold text-white text-xs">
              <MaterialIcon icon="star" size="sm" className="mr-1" />
              Featured
            </span>
          </div>
        )}

        {/* Location Badge */}
        <div className="bottom-4 left-4 absolute z-10">
          <span className="inline-flex items-center bg-white/90 dark:bg-gray-800/90 shadow-md backdrop-blur-sm px-2 py-1 border-brand-primary/20 border-l-4 font-semibold text-gray-900 dark:text-white text-xs">
            <MaterialIcon
              icon="location_on"
              size="sm"
              className="mr-1 text-brand-primary"
            />
            {project.location.city}, {project.location.state}
          </span>
        </div>
      </div>

      {/* Project Header */}
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-gray-900 dark:text-white text-xl">
            {project.title}
          </CardTitle>
          <span
            className={`
              inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold
              ${
                project.status === "completed"
                  ? "bg-brand-primary/5 dark:bg-brand-primary-dark/30 text-brand-primary dark:text-brand-primary-light"
                  : "bg-brand-secondary/10 dark:bg-brand-secondary/20 text-brand-secondary dark:text-brand-secondary-light"
              }
            `}
          >
            {project.status === "completed" ? "Completed" : "In Progress"}
          </span>
        </div>
        <p className="font-semibold text-gray-600 dark:text-gray-300 text-sm">
          {project.subcategory}
        </p>
      </CardHeader>

      {/* Project Content */}
      <CardContent>
        <p className="mb-4 text-gray-700 dark:text-gray-300 line-clamp-3">
          {project.description}
        </p>

        {/* Community Impact Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center bg-brand-secondary/10 dark:bg-brand-secondary/20 px-2 py-1 border-brand-secondary border-l-4 font-medium text-brand-secondary-text text-xs">
            <MaterialIcon icon="groups" size="sm" className="mr-1" />
            Community Partnership
          </span>
        </div>

        {/* Project Details */}
        {project.details && (
          <div className="space-y-2 mb-4 text-gray-600 dark:text-gray-300 text-sm">
            {project.details.squareFootage && (
              <div className="flex items-center">
                <MaterialIcon
                  icon="square_foot"
                  size="sm"
                  className="mr-2 text-gray-600"
                />
                <span>
                  {project.details.squareFootage.toLocaleString()} sq ft
                </span>
              </div>
            )}
            {project.details.duration && (
              <div className="flex items-center">
                <MaterialIcon
                  icon="schedule"
                  size="sm"
                  className="mr-2 text-gray-600"
                />
                <span>{project.details.duration}</span>
              </div>
            )}
            {project.details.completionDate && (
              <div className="flex items-center">
                <MaterialIcon
                  icon="event"
                  size="sm"
                  className="mr-2 text-gray-600"
                />
                <span>
                  {project.details.completionDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Project Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 3).map((tag: string) => (
              <span
                key={`${project.id}-${tag}`}
                className="inline-flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md text-gray-700 dark:text-gray-300 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* View Details Button */}
        <Button
          variant="outline"
          size="sm"
          className="w-full group hover:bg-brand-primary hover:text-white hover:border-brand-primary"
          asChild
        >
          <Link
            href={`/projects/${project.seoMetadata.slug}`}
            prefetch={false}
            onClick={handleCardClick}
            aria-label={`View details for ${project.title}`}
          >
            View Partnership Details
            <MaterialIcon
              icon="arrow_forward"
              size="sm"
              className="ml-2 transition-colors"
            />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
