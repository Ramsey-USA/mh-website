"use client";

import Image from "next/image";

// Lazy load heavy components
// PortfolioImage and ProjectGalleryImage lazy imports removed for clean slate migration

// Optimized portfolio card with lazy loading
interface PortfolioCardProps {
  project: {
    title: string;
    description: string;
    category: string;
    location: { city: string; state: string };
    details: { completionDate?: string };
    images: Array<{ url: string }>;
  };
  priority?: boolean;
}

export function OptimizedPortfolioCard({
  project,
  priority = false,
}: PortfolioCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative mb-4 rounded-lg h-64 overflow-hidden">
        <Image
          src={project.images[0]?.url || "/placeholder-construction.jpg"}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="bottom-4 left-4 absolute opacity-0 group-hover:opacity-100 text-white transition-opacity duration-300">
          <span className="bg-brand-primary px-3 py-1 rounded-full font-semibold text-sm">
            {project.category.charAt(0).toUpperCase() +
              project.category.slice(1)}
          </span>
        </div>
      </div>

      <h3 className="mb-2 font-semibold group-hover:text-brand-primary text-xl transition-colors">
        {project.title}
      </h3>
      <p className="text-gray-600 text-sm">
        {project.description.substring(0, 120)}...
      </p>
      <div className="mt-3 font-medium text-brand-primary text-sm">
        {project.location.city}, {project.location.state}
        {project.details.completionDate &&
          ` • ${new Date(project.details.completionDate).getFullYear()}`}
      </div>
    </div>
  );
}

// Optimized gallery for project detail pages
interface OptimizedGalleryProps {
  images: Array<{ url: string; caption?: string }>;
  activeIndex: number;
  onImageClick: (_index: number) => void;
}

export function OptimizedGallery({
  images,
  activeIndex,
  onImageClick,
}: OptimizedGalleryProps) {
  return (
    <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
      {/* Main Image */}
      <div className="relative rounded-lg h-96 lg:h-[500px] overflow-hidden">
        <Image
          src={images[activeIndex]?.url || "/placeholder-construction.jpg"}
          alt={images[activeIndex]?.caption || "Project image"}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnail Grid */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Project Gallery</h3>
        <div className="gap-2 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8">
          {images.map((image, _index) => (
            <div
              key={_index}
              role="button"
              tabIndex={0}
              className={`relative h-16 sm:h-18 md:h-20 rounded cursor-pointer transition-opacity ${
                _index === activeIndex
                  ? "ring-2 ring-primary-500"
                  : "hover:opacity-80"
              }`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onImageClick(_index);
                }
              }}
              onClick={() => onImageClick(_index)}
            >
              <Image
                src={image.url}
                alt={image.caption || `Project image ${_index + 1}`}
                fill
                className="rounded object-cover"
                sizes="80px"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Performance monitoring component
export { WebVitalsReporter } from "./WebVitalsReporter";
