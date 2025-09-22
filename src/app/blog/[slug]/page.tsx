import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, User, Tag, ArrowLeft, Share2, ChevronRight } from 'lucide-react'
import { mockBlogPosts, type BlogPost } from '@/lib/types/blog'
import { BlogContent } from '@/components/blog/BlogContent'
import { RelatedPosts } from '@/components/blog/RelatedPosts'
import { BlogNavigation } from '@/components/blog/BlogNavigation'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  return mockBlogPosts.map((post) => ({
    slug: post.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = mockBlogPosts.find((p) => p.slug === slug)
  
  if (!post) {
    return {
      title: 'Post Not Found | MH Construction Blog',
      description: 'The requested blog post could not be found.'
    }
  }

  const seoTitle = post.seo.metaTitle || `${post.title} | MH Construction Blog`
  const seoDescription = post.seo.metaDescription || post.excerpt
  const ogImage = post.seo.ogImage || post.featuredImage.url

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: post.seo.keywords?.join(', '),
    authors: [{ name: post.author.name }],
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.featuredImage.alt,
        },
      ],
      siteName: 'MH Construction',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [ogImage],
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    other: {
      'article:author': post.author.name,
      'article:published_time': post.publishedAt,
      'article:modified_time': post.updatedAt || post.publishedAt,
      'article:section': post.category.name,
      'article:tag': post.tags.join(','),
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = mockBlogPosts.find((p) => p.slug === slug)
  
  if (!post) {
    notFound()
  }

  const currentIndex = mockBlogPosts.findIndex(p => p.slug === slug)
  const previousPost = currentIndex > 0 ? mockBlogPosts[currentIndex - 1] : null
  const nextPost = currentIndex < mockBlogPosts.length - 1 ? mockBlogPosts[currentIndex + 1] : null

  // Get related posts (same category, excluding current post)
  const relatedPosts = mockBlogPosts
    .filter(p => p.category.id === post.category.id && p.id !== post.id)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            image: {
              '@type': 'ImageObject',
              url: post.featuredImage.url,
              alt: post.featuredImage.alt,
            },
            author: {
              '@type': 'Person',
              name: post.author.name,
              jobTitle: post.author.role,
              description: post.author.bio,
            },
            publisher: {
              '@type': 'Organization',
              name: 'MH Construction',
              logo: {
                '@type': 'ImageObject',
                url: '/images/logo/mh-construction-logo.png',
              },
            },
            datePublished: post.publishedAt,
            dateModified: post.updatedAt || post.publishedAt,
            articleSection: post.category.name,
            keywords: post.tags.join(', '),
            wordCount: post.content.split(' ').length,
            timeRequired: `PT${post.readTime}M`,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://mhconstructionpasco.com/blog/${post.slug}`,
            },
          }),
        }}
      />

      {/* Breadcrumb Navigation */}
      <nav className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/blog" className="hover:text-blue-600 transition-colors">
              Blog
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link 
              href={`/blog?category=${post.category.id}`}
              className="hover:text-blue-600 transition-colors"
            >
              {post.category.name}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium truncate">
              {post.title}
            </span>
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <header className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back to Blog Link */}
            <Link 
              href="/blog"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors mb-8 group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>

            {/* Category Badge */}
            <div className="mb-6">
              <span 
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: post.category.color }}
              >
                <span className="mr-2">{post.category.icon}</span>
                {post.category.name}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span className="font-medium">{post.author.name}</span>
                <span className="text-gray-400">•</span>
                <span className="text-sm">{post.author.role}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{post.readTime} min read</span>
              </div>
            <div className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
              <Share2 className="h-5 w-5" />
              <span className="hidden sm:inline">Share</span>
            </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map(tag => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-800 transition-colors"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="container mx-auto px-4 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alt}
              fill
              className="object-cover"
              priority
            />
          </div>
          {post.featuredImage.caption && (
            <p className="text-sm text-gray-600 mt-2 text-center italic">
              {post.featuredImage.caption}
            </p>
          )}
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-12">
            <BlogContent content={post.content} />
          </div>
        </div>
      </div>

      {/* Author Bio */}
      <div className="container mx-auto px-4 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-start gap-6">
              {post.author.avatar && (
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  About {post.author.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">
                  {post.author.role}
                </p>
                {post.author.bio && (
                  <p className="text-gray-600 leading-relaxed">
                    {post.author.bio}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="container mx-auto px-4 mb-12">
          <div className="max-w-4xl mx-auto">
            <RelatedPosts posts={relatedPosts} currentCategory={post.category} />
          </div>
        </div>
      )}

      {/* Navigation to Previous/Next Posts */}
      <div className="container mx-auto px-4 mb-12">
        <div className="max-w-4xl mx-auto">
          <BlogNavigation previousPost={previousPost} nextPost={nextPost} />
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Construction Project?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get expert advice and a free consultation from our veteran-owned construction team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Get Free Estimate
            </Link>
            <Link
              href="/portfolio"
              className="border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}