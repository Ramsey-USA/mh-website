# MH Website Scripts Organization

Organized automation scripts for the MH Construction website development workflow.

## Directory Structure

### 📁 `/analysis/` - Code & Content Analysis

- `analyze-content-quality.sh` - Content quality assessment
- `build-bottleneck-analyzer.sh` - Identify build performance bottlenecks
- `build-performance-analyzer.js` - Detailed build performance analysis
- `large-file-analyzer.sh` - Find large files impacting performance
- `post-optimization-analysis.js` - Post-optimization analysis reporting

### 📁 `/cleanup/` - Codebase Maintenance

- `cleanup.sh` - General codebase cleanup
- `post-optimization-cleanup.js` - Post-optimization cleanup tasks
- `review-backups.sh` - Backup file review and cleanup

### 📁 `/markdown/` - Documentation Processing

- `advanced-markdown-formatting.sh` - Advanced markdown formatting
- `comprehensive-markdown-fix.sh` - Comprehensive markdown fixes
- `quick-markdown-fix.sh` - Quick markdown fixes
- `validate-markdown-links.sh` - Validate markdown links

### 📁 `/optimization/` - Code & Asset Optimization

- `build-monitor.js` - Monitor build performance
- `build-performance-optimizer.js` - Optimize build performance
- `optimize-for-cloudflare.js` - Cloudflare-specific optimizations
- `optimize-images.sh` - Image optimization
- `ultra-fast-optimizer.js` - Ultra-fast build optimization

### 📁 `/utilities/` - General Purpose Tools

- `add-cspell-word.sh` - Add words to cspell dictionary
- `check-domain-setup.sh` - Verify domain configuration
- `fix-markdown-code-blocks.sh` - Fix markdown code block issues
- `fix-markdown-lists.sh` - Fix markdown list formatting

### 📁 `/validation/` - Quality Assurance

- `health-check-final.sh` - Final health check validation
- `validate-css-js-cohesion.sh` - CSS/JavaScript cohesion validation

### �� **Root Level - Core Operations**

- `extract-team-data.js` - Extract team member data
- `test-api-endpoints.sh` - Test API endpoint functionality
- `test-d1-integration.sh` - Test Cloudflare D1 database integration
- `test-database.js` - Database testing utilities

## Usage Examples

```bash
# Run analysis
npm run analyze:content

# Cleanup operations
npm run clean

# Markdown processing
npm run lint:markdown:fix

# Image optimization
npm run optimize:images

# Domain setup check
npm run domain:check

# Validation
./scripts/validation/health-check-final.sh
```

## Package.json Scripts

Access these scripts via npm:

- `npm run clean` - Run cleanup script
- `npm run optimize:images` - Optimize images
- `npm run lint:markdown` - Lint markdown files
- `npm run lint:markdown:fix` - Auto-fix markdown issues
- `npm run lint:devdocs` - Lint only development docs (`docs/development/**/*.md`)
- `npm run validate:links` - Validate markdown links
- `npm run analyze:content` - Run content quality analysis
- `npm run review:backups` - Review backup files
- `npm run domain:check` - Check domain setup

---

**Last Updated:** November 7, 2025
**Maintainer:** MH Construction Development Team
