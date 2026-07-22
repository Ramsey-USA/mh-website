import ProjectsPageClient from "./ProjectsPageClient";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";

export const revalidate = 3600;

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema(breadcrumbPatterns.projects),
          ),
        }}
      />
      <ProjectsPageClient />
    </>
  );
}
