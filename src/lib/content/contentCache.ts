// Edge-compatible content cache for Cloudflare Pages
// Content is embedded at build time or fetched from KV storage

export interface ContentItem {
  content: string;
  title?: string;
  excerpt?: string;
  lastUpdated?: string;
}

// Static content cache - populated at build time
// In production, this could be replaced with Cloudflare KV reads
const contentCache: Record<string, ContentItem> = {
  "core-values": {
    title: "Core Values",
    excerpt: "Our commitment to excellence, integrity, and service",
    content: `# Core Values

## Excellence in Every Project
We maintain the highest standards in all our construction projects.

## Integrity First
Our word is our bond. We operate with complete transparency.

## Veteran Leadership
Bringing military discipline and precision to construction.

## Community Focus
Building not just structures, but lasting relationships in our community.
`,
    lastUpdated: new Date().toISOString(),
  },
  services: {
    title: "Services",
    excerpt: "Comprehensive construction services for all your needs",
    content: `# Our Services

## Residential Construction
- Custom Home Building
- Home Additions
- Kitchen & Bathroom Remodeling
- Renovations & Repairs

## Commercial Construction
- Office Buildings
- Retail Spaces
- Warehouses
- Tenant Improvements

## Government Projects
- Federal Contracts
- State Projects
- Municipal Buildings
- Infrastructure Work

## Specialized Services
- Medical Facilities
- Religious Buildings
- Industrial Construction
- Green Building Solutions
`,
    lastUpdated: new Date().toISOString(),
  },
  team: {
    title: "Our Team",
    excerpt: "Meet the professionals behind MH Construction",
    content: `# Our Team

## Leadership

### Michael Henderson - Founder & CEO
Veteran with 20+ years of construction experience.

### Sarah Chen - Project Manager
Expert in large-scale commercial projects.

## Construction Team
Our skilled craftsmen and project managers bring decades of combined experience.

## Support Staff
Dedicated administrative and support team ensuring project success.
`,
    lastUpdated: new Date().toISOString(),
  },
};

/**
 * Get content by key - Edge Runtime compatible
 */
export async function getContent(key: string): Promise<ContentItem | null> {
  // In production with Cloudflare KV:
  // if (env?.CONTENT_KV) {
  //   const cached = await env.CONTENT_KV.get(key, 'json');
  //   if (cached) return cached;
  // }

  return contentCache[key] || null;
}

/**
 * Get all available content keys
 */
export function getContentKeys(): string[] {
  return Object.keys(contentCache);
}

/**
 * Get multiple content items
 */
export async function getMultipleContent(
  keys: string[]
): Promise<Record<string, ContentItem>> {
  const result: Record<string, ContentItem> = {};

  for (const key of keys) {
    const content = await getContent(key);
    if (content) {
      result[key] = content;
    }
  }

  return result;
}

/**
 * Set content (for build-time population or admin updates)
 * Note: This won't work in edge runtime without KV write access
 */
export function setContent(key: string, content: ContentItem): void {
  contentCache[key] = content;
}
