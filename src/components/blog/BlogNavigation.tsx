import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { type BlogPost } from '@/lib/types/blog'

interface BlogNavigationProps {
  previousPost: BlogPost | null
  nextPost: BlogPost | null
}

export function BlogNavigation({
  previousPost,
  nextPost,
}: BlogNavigationProps) {
  if (!previousPost && !nextPost) return null

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Previous Post */}
        <div className="border-b md:border-b-0 md:border-r border-gray-200">
          {previousPost ? (
            <Link
              href={`/blog/${previousPost.slug}`}
              className="block p-6 hover:bg-gray-50 transition-colors group h-full"
            >
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                Previous Article
              </div>
              <div className="flex gap-4">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={previousPost.featuredImage.url}
                    alt={previousPost.featuredImage.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                    {previousPost.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span
                      className="px-2 py-1 rounded-full text-white text-xs"
                      style={{ backgroundColor: previousPost.category.color }}
                    >
                      {previousPost.category.icon} {previousPost.category.name}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <div className="p-6 text-center text-gray-400">
              <ChevronLeft className="h-8 w-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm">No previous article</p>
            </div>
          )}
        </div>

        {/* Next Post */}
        <div>
          {nextPost ? (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="block p-6 hover:bg-gray-50 transition-colors group h-full"
            >
              <div className="flex items-center justify-end text-sm text-gray-500 mb-2">
                Next Article
                <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1 min-w-0 text-right">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                    {nextPost.title}
                  </h3>
                  <div className="flex items-center justify-end gap-2 text-xs text-gray-500">
                    <span
                      className="px-2 py-1 rounded-full text-white text-xs"
                      style={{ backgroundColor: nextPost.category.color }}
                    >
                      {nextPost.category.icon} {nextPost.category.name}
                    </span>
                  </div>
                </div>
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={nextPost.featuredImage.url}
                    alt={nextPost.featuredImage.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </Link>
          ) : (
            <div className="p-6 text-center text-gray-400">
              <ChevronRight className="h-8 w-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm">No next article</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
