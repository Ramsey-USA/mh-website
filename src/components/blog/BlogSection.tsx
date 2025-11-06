/**
 * Blog Section Component
 * A reusable section that displays blog posts and construction insights
 * Can be embedded on multiple pages (Homepage, About, Services, etc.)
 */

import Image from "next/image";
import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { mockBlogPosts, type BlogPost } from "@/lib/types/blog";

interface BlogSectionProps {
  title?: string;
  subtitle?: string;
  maxPosts?: number;
  showCategories?: boolean;
  showCTA?: boolean;
  featured?: boolean;
  category?: string;
  id?: string;
  className?: string;
}

export default function BlogSection({
  title = "Construction Insights & Industry News",
  subtitle = "Expert advice, project updates, and construction tips from our team of professionals",
  maxPosts = 6,
  showCategories = true,
  showCTA = true,
  featured = false,
  category,
  id = "blog",
  className = "",
}: BlogSectionProps) {
  // Filter and sort blog posts
  let displayPosts = mockBlogPosts.filter(
    (post) => post.status === "published",
  );

  // Filter by featured if requested
  if (featured) {
    displayPosts = displayPosts.filter((post) => post.featured);
  }

  // Filter by category if specified
  if (category) {
    displayPosts = displayPosts.filter(
      (post) => post.category.slug === category,
    );
  }

  // Sort by date (newest first)
  displayPosts = displayPosts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  // Limit number of posts
  const postsToShow = displayPosts.slice(0, maxPosts);

  // Get unique categories from displayed posts
  const categories = showCategories
    ? Array.from(new Set(postsToShow.map((post) => post.category))).sort(
        (a, b) => a.name.localeCompare(b.name),
      )
    : [];

  return (
    <section
      id={id}
      className={`relative bg-gray-50 dark:bg-gray-900 py-20 lg:py-32 xl:py-40 ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-24 lg:mb-32">
          <h2 className="mb-6 font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter">
            <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent drop-shadow-sm">
              {title}
            </span>
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl font-light text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          {/* Categories Filter */}
          {showCategories && categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mt-10">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: `${cat.color}20`,
                    color: cat.color,
                  }}
                >
                  <MaterialIcon icon={cat.icon} size="sm" />
                  <span>{cat.name}</span>
                  <span className="bg-white dark:bg-gray-800 px-2 py-0.5 rounded-full text-xs font-bold">
                    {cat.postCount}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {postsToShow.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Empty State */}
        {postsToShow.length === 0 && (
          <div className="text-center py-16">
            <MaterialIcon
              icon="article"
              size="4xl"
              className="text-gray-300 dark:text-gray-600 mb-4 mx-auto"
            />
            <p className="text-xl text-gray-500 dark:text-gray-400">
              No blog posts available at this time.
            </p>
          </div>
        )}

        {/* Call to Action */}
        {showCTA && postsToShow.length > 0 && (
          <div className="text-center mt-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
              Stay Updated on Construction Insights
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 font-light leading-relaxed">
              Get expert tips, project updates, and industry news delivered to
              your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <MaterialIcon icon="mail" className="w-5 h-5" />
                Subscribe to Updates
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-brand-primary dark:text-brand-secondary border-2 border-brand-primary dark:border-brand-secondary font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <MaterialIcon icon="construction" className="w-5 h-5" />
                Explore Our Services
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      {/* Featured Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={post.featuredImage.url}
          alt={post.featuredImage.alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Category Badge */}
        <div
          className="absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5"
          style={{
            backgroundColor: post.category.color,
            color: "white",
          }}
        >
          <MaterialIcon icon={post.category.icon} size="sm" />
          <span>{post.category.name}</span>
        </div>
        {/* Featured Badge */}
        {post.featured && (
          <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <MaterialIcon icon="star" size="sm" />
            <span>Featured</span>
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Meta Information */}
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center gap-1">
            <MaterialIcon icon="calendar_today" size="sm" />
            <time dateTime={post.publishedAt}>{formattedDate}</time>
          </div>
          <div className="flex items-center gap-1">
            <MaterialIcon icon="schedule" size="sm" />
            <span>{post.readTime} min read</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-brand-primary dark:group-hover:text-brand-secondary transition-colors tracking-tight">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 font-light leading-relaxed">
          {post.excerpt}
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
          {post.author.avatar && (
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <div className="font-semibold text-gray-900 dark:text-white text-sm">
              {post.author.name}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {post.author.role}
            </div>
          </div>
          <MaterialIcon
            icon="arrow_forward"
            size="sm"
            className="text-brand-primary dark:text-brand-secondary group-hover:translate-x-1 transition-transform duration-200"
          />
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
