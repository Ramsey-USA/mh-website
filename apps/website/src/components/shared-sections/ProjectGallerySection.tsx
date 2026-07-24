import { BrandedContentSection } from "@/components/templates/BrandedContentSection";
import { ProjectGalleryCarousel } from "@/components/projects/ProjectGalleryCarousel";
import type { ProjectGallerySlide } from "@/lib/services/portfolio-service";
import type { SupportedLocale } from "@/lib/i18n/locale";

interface ProjectGallerySectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
  locale?: SupportedLocale;
  slides: ProjectGallerySlide[];
}

export function ProjectGallerySection({
  id = "project-gallery",
  title = "Project Photography Gallery",
  subtitle = "Public Project",
  description = "Browse public project photos from MH Construction case records. The gallery rotates automatically and can be controlled manually.",
  className = "",
  locale = "en",
  slides,
}: ProjectGallerySectionProps) {
  return (
    <BrandedContentSection
      id={id}
      variant="white"
      className={className}
      showBackgroundPattern={false}
      headerSize="section"
      header={{
        icon: "photo_library",
        iconVariant: "secondary",
        subtitle,
        title,
        description,
      }}
      animated={false}
    >
      <ProjectGalleryCarousel slides={slides} locale={locale} />
    </BrandedContentSection>
  );
}
