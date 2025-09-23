// Placeholder image configuration to prevent build errors
export const placeholderImages = {
  blog: {
    'winter-construction-prep.jpg': '/images/placeholder-blog.jpg',
    'veteran-owned-advantages.jpg': '/images/placeholder-blog.jpg',
    'kitchen-trends-2024.jpg': '/images/placeholder-blog.jpg',
  },
  news: {
    'veteran-hiring.jpg': '/images/placeholder-news.jpg',
    'winter-safety.jpg': '/images/placeholder-news.jpg',
    'green-certification.jpg': '/images/placeholder-news.jpg',
    'habitat-partnership.jpg': '/images/placeholder-news.jpg',
    'team-expansion.jpg': '/images/placeholder-news.jpg',
    'safety-award.jpg': '/images/placeholder-news.jpg',
  },
  projects: {
    'pasco-home-before-1.jpg': '/images/placeholder-project.jpg',
    'pasco-home-during-1.jpg': '/images/placeholder-project.jpg',
    'pasco-home-during-2.jpg': '/images/placeholder-project.jpg',
    'pasco-home-after-1.jpg': '/images/placeholder-project.jpg',
    'pasco-home-after-2.jpg': '/images/placeholder-project.jpg',
    'pasco-home-after-3.jpg': '/images/placeholder-project.jpg',
    'pasco-home-featured.jpg': '/images/placeholder-project.jpg',
    'office-before-1.jpg': '/images/placeholder-project.jpg',
    'office-before-2.jpg': '/images/placeholder-project.jpg',
    'office-during-1.jpg': '/images/placeholder-project.jpg',
    'office-after-1.jpg': '/images/placeholder-project.jpg',
    'office-after-2.jpg': '/images/placeholder-project.jpg',
    'office-featured.jpg': '/images/placeholder-project.jpg',
    'remodel-before-1.jpg': '/images/placeholder-project.jpg',
    'remodel-before-2.jpg': '/images/placeholder-project.jpg',
    'remodel-during-1.jpg': '/images/placeholder-project.jpg',
    'remodel-after-1.jpg': '/images/placeholder-project.jpg',
    'remodel-after-2.jpg': '/images/placeholder-project.jpg',
    'remodel-after-3.jpg': '/images/placeholder-project.jpg',
    'remodel-featured.jpg': '/images/placeholder-project.jpg',
  },
  team: {
    'mark-harris.jpg': '/images/placeholder-team.jpg',
    'sarah-harris.jpg': '/images/placeholder-team.jpg',
    'jim-rodriguez.jpg': '/images/placeholder-team.jpg',
  },
}

// Helper function to get placeholder image
export function getPlaceholderImage(
  category: keyof typeof placeholderImages,
  filename: string
): string {
  const categoryImages = placeholderImages[category] as Record<string, string>
  return categoryImages[filename] || '/images/placeholder.jpg'
}
