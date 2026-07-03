import type { Metadata } from "next";
import { getProjectsSEO } from "@/lib/seo/page-seo-utils";
import { StructuredData } from "@/components/seo/SeoMeta";
import { SectionShell } from "@/components/layout";
import { projectCaseStudies } from "@/lib/data/project-case-studies";

// Enhanced SEO metadata for Projects page
const seoData = getProjectsSEO();
const { schemas, ...metadataProps } = seoData;
export const metadata: Metadata = metadataProps;

export default function ProjectsLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params?: { slug?: string };
}>) {
  return (
    <>
      {params?.slug ? null : <StructuredData data={schemas} />}
      <SectionShell
        navTitle="Case Studies"
        navLabel="Project case studies"
        navItems={projectCaseStudies.map((project) => ({
          href: `/projects/${project.slug}`,
          label: project.title,
        }))}
        navNote="Move between case studies to compare delivery methods, project types, and field-proven outcomes across the portfolio."
      >
        {children}
      </SectionShell>
    </>
  );
}
