// seo-meta is the primary SEO utility file; for any names that exist in both
// files, the seo-meta version is preferred here (it is what most callers use).
export * from "./SeoMeta";

// Enhanced-SEO-only exports (unique, no name conflict with SeoMeta)
export {
  enhancedSEO,
  generateServiceSchema,
  generateIRLConsultationSchema,
  generateFAQSchema,
  generateConstructionFAQSchema,
  generateBreadcrumbSchema,
  generateProjectSchema,
  generateArticleSchema,
  generateLocalBusinessSchema,
  generateEnhancedMetadata,
} from "./EnhancedSEO";
