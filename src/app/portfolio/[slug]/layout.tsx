import { notFound } from 'next/navigation'
import { PortfolioService } from '@/lib/services/portfolioService'
import { generateSEOMetadata, generateProjectStructuredData, generateBreadcrumbStructuredData, StructuredData } from '@/components/seo/seo-meta'

interface Props {
  params: Promise<{
    slug: string
  }>
}

// Generate metadata for individual project pages
export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const project = PortfolioService.getProjectBySlug(slug)
  
  if (!project) {
    return generateSEOMetadata({
      title: 'Project Not Found',
      noIndex: true
    })
  }

  return generateSEOMetadata({
    title: project.title,
    description: project.description,
    keywords: [...project.tags, project.category, 'construction project'],
    ogImage: project.images[0]?.url
  })
}

// Generate static params for all projects (for static generation)
export async function generateStaticParams() {
  const projects = PortfolioService.getAllProjects()
  
  return projects.map((project) => ({
    slug: project.seoMetadata.slug,
  }))
}

export default function ProjectLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}) {
  return (
    <>
      {children}
    </>
  )
}