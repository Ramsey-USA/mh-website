import ProjectsPageClient from "./ProjectsPageClient";

export const revalidate = 3600;

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
