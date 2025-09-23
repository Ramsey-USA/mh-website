import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock } from 'lucide-react'
import { type BlogPost, type BlogCategory } from '@/lib/types/blog'

interface RelatedPostsProps {
  posts: BlogPost[]
  currentCategory: BlogCategory
}

export function RelatedPosts({ posts, currentCategory }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">{currentCategory.icon}</span>
        <h2 className="text-2xl font-bold text-gray-900">
          More from {currentCategory.name}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map(post => (
          <RelatedPostCard key={post.id} post={post} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href={`/blog?category=${currentCategory.id}`}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          View All {currentCategory.name} Articles
        </Link>
      </div>
    </div>
  )
}

function RelatedPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
          <Image
            src={post.featuredImage.url}
            alt={post.featuredImage.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <Link href={`/blog/${post.slug}`}>
        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
          {post.title}
        </h3>
      </Link>

      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>

      <div className="flex items-center text-xs text-gray-500">
        <div className="flex items-center gap-1 mr-4">
          <Calendar className="h-3 w-3" />
          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{post.readTime} min</span>
        </div>
      </div>
    </article>
  )
}
