import type { MetadataRoute } from "next";
import {
  buildCanonicalRouteManifest,
  toSitemapEntries,
} from "@/lib/seo/route-manifest";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return toSitemapEntries(buildCanonicalRouteManifest());
}
