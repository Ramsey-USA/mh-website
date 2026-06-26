# MH Website Scripts Organization

**Last Updated:** April 15, 2026  
**Status:** ✅ Active

Selected automation scripts for the MH Construction website development workflow.

Use `package.json` as the canonical source for `pnpm run ...` entry points. This guide focuses on the most useful direct-run scripts and the current folder layout.

## Directory Structure

### 📁 `/analysis/` - Code & Content Analysis

- `analyze-content-quality.sh` - Content quality assessment
- `build-bottleneck-analyzer.sh` - Identify build performance bottlenecks
- `build-performance-analyzer.js` - Detailed build performance analysis
- `large-file-analyzer.sh` - Find large files impacting performance
- `post-optimization-analysis.js` - Post-optimization analysis reporting

### 📁 `/cleanup/` - Codebase Maintenance

- `cleanup.sh` - General codebase cleanup

### 📁 `/markdown/` - Documentation Processing

- `advanced-markdown-formatting.sh` - Advanced markdown formatting
- `comprehensive-markdown-fix.sh` - Comprehensive markdown fixes
- `quick-markdown-fix.sh` - Quick markdown fixes
- `validate-markdown-links.sh` - Validate markdown links

### 📁 `/optimization/` - Code & Asset Optimization

- `build-monitor.js` - Monitor build performance
- `build-performance-optimizer.js` - Optimize build performance
- `optimize-for-cloudflare.js` - Cloudflare-specific optimizations
- `optimize-images.js` - Image conversion and optimization pipeline
- `optimize-images.sh` - Image optimization
- `optimize-videos.js` - Video conversion and optimization pipeline
- `ultra-fast-optimizer.js` - Ultra-fast build optimization

### 📁 `/utilities/` - General Purpose Tools

- `add-cspell-word.sh` - Add words to cspell dictionary
- `check-domain-setup.sh` - Verify domain configuration
- `check-md-consistency.sh` - Check markdown consistency
- `check-pages.sh` - Page analysis utility
- `cleanup-check.sh` - Cleanup verification
- `fix-markdown-code-blocks.sh` - Fix markdown code block issues
- `fix-markdown-lists.sh` - Fix markdown list formatting

### 📁 `/validation/` - Quality Assurance

- `check-branding-compliance.sh` - Brand consistency validation
- `check-env-vars.js` - Environment variable validation
- `check-mobile-responsiveness.sh` - Mobile responsiveness audit helpers
- `health-check-final.sh` - Final health check validation
- `performance-gate.js` - Performance validation gate
- `smoke-safety-system.js` - Safety workflow smoke test
- `validate-css-js-cohesion.sh` - CSS/JavaScript cohesion validation

### 🎯 **Root Level - Core Operations**

- `generate-qr-codes.js` - Generate QR codes (color & B&W variants with labels)
- `add-team-qr-codes.js` - Add QR code references to team data
- `add-team-skills.js` - Add skills to team data
- `analyze-components.js` - Component analysis
- `check-qr-codes.sh` - Verify QR code presence
- `check-translations.js` - Translation consistency check
- `extract-team-data.js` - Extract team member data
- `fix-code-issues.js` - Fix common code issues
- `lighthouse-guide.js` - Lighthouse workflow guide (use PageSpeed/DevTools for authoritative scores)
- `r2-publish-forms.sh` - Publish forms PDFs to Cloudflare R2
- `r2-publish-safety-pdfs.sh` - Publish safety PDFs to Cloudflare R2
- `r2-seed-pdfs.sh` - Seed PDF assets into Cloudflare R2
- `seo-audit.js` - SEO audit tool
- `setup-ffmpeg.sh` - FFmpeg setup for video processing
- `test-basic-performance.js` - Basic performance testing
- `test-database.js` - Database testing utilities
- `test-lighthouse-quick.js` - Quick local Lighthouse checks (fails when audits are invalid)
- `test-lighthouse.js` - Full local Lighthouse checks (fails when audits are invalid)
- `test-pwa.js` - PWA testing
- `test-qr-codes.js` - QR code validation tests
- `update-doc-dates.sh` - Bulk update documentation dates

## Usage Examples

```bash
# run-analysis
bash scripts/analysis/analyze-content-quality.sh

# cleanup-operations
pnpm --filter @mhc/website run clean

# markdown-processing
pnpm --filter @mhc/website run lint:markdown:fix

# image-optimization
pnpm --filter @mhc/website run optimize:images

# domain-setup-check
bash scripts/utilities/check-domain-setup.sh

# validation
bash scripts/validation/health-check-final.sh
```

## Package.json Scripts

Access these scripts via npm:

Access these scripts via pnpm:

- `pnpm --filter @mhc/website run qr:generate` - Generate all QR codes (color & B&W variants)
- `pnpm --filter @mhc/website run qr:test` - Test QR code output
- `pnpm --filter @mhc/website run qr:check` - Verify QR code presence
- `pnpm --filter @mhc/website run clean` - Run cleanup script
- `pnpm --filter @mhc/website run optimize:images` - Optimize images
- `pnpm --filter @mhc/website run optimize:videos` - Optimize videos
- `pnpm --filter @mhc/website run audit:images` - Audit image optimization opportunities
- `pnpm run lint:markdown` - Lint markdown files
- `pnpm --filter @mhc/website run lint:markdown:fix` - Auto-fix markdown issues
- `pnpm --filter @mhc/website run quality:check` - Run full quality scan
- `pnpm --filter @mhc/website run check:translations` - Validate translations
- `pnpm --filter @mhc/website run docs:release` - Generate, merge, and publish document bundles

Scripts without npm aliases (run directly):

- `node scripts/add-team-qr-codes.js` - Add QR code references to team data
- `bash scripts/analysis/analyze-content-quality.sh` - Content quality analysis
- `bash scripts/utilities/check-domain-setup.sh` - Check domain setup
- `bash scripts/markdown/validate-markdown-links.sh` - Validate markdown links

---

**MH Construction** — Founded 2010, Veteran-Owned Since January 2025  
[← Back to README](../README.md)
