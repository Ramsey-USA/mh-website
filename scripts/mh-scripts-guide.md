# MH Website Scripts Organization

Organized automation scripts for the MH Construction website development workflow.

## Directory Structure

### 📁 `/analysis/` - Code & Content Analysis

- `analyze-content-quality.sh` - Content quality assessment
- `analyze-docs-focused.sh` - Documentation-focused analysis
- `analyze-docs-updated.sh` - Updated documentation analysis
- `analyze-docs.sh` - General documentation analysis
- `analyze-naming-patterns.sh` - Naming convention analysis
- `analyze-phases.sh` - Project phase analysis

### 📁 `/cleanup/` - Codebase Maintenance

- `cleanup.sh` - General codebase cleanup
- `cleanup-phase1.sh` - Phase 1 safe cleanup operations
- `cleanup-phase2.sh` - Phase 2 cleanup operations
- `cleanup-phase3.sh` - Phase 3 cleanup operations
- `cleanup-redundant-files.sh` - Remove redundant files
- `consolidate-phases.sh` - Consolidate cleanup phases
- `review-backups.sh` - Backup file review and cleanup

### 📁 `/markdown/` - Documentation Processing

- `add-toc-to-markdown.sh` - Add table of contents to markdown files
- `advanced-markdown-formatting.sh` - Advanced markdown formatting
- `comprehensive-markdown-fix.sh` - Comprehensive markdown fixes
- `fix-markdown-lint-comprehensive.sh` - Fix markdown linting issues
- `fix-navigation-docs.sh` - Fix navigation documentation
- `lint-markdown.sh` - Markdown linting
- `quick-markdown-fix.sh` - Quick markdown fixes
- `validate-markdown-links.sh` - Validate markdown links

### 📁 `/optimization/` - Code & Asset Optimization

- `execute-naming-standardization.sh` - Execute naming standardization
- `optimize-docs-phase1.sh` - Documentation optimization phase 1
- `optimize-images.sh` - Image optimization
- `standardize-imports.py` - Python import standardization
- `standardize-imports.sh` - Shell import standardization
- `standardize-naming-fixed.sh` - Fixed naming standardization

### 📁 `/utilities/` - General Purpose Tools

- `add-cspell-word.sh` - Add words to cspell dictionary
- `add-cspell-words-to-db.js` - Batch add cspell words (Node.js)
- `organize-team-profiles.sh` - Organize team profile files
- `preview-naming-changes.sh` - Preview naming changes before applying

### 📁 `/validation/` - Quality Assurance

- `health-check-final.sh` - Final health check validation
- `validate-css-js-cohesion.sh` - CSS/JavaScript cohesion validation

### 🚀 **Root Level - Core Operations**

- `deploy.sh` - Production deployment script

## Usage Examples

````bash
# Run analysis
./analysis/analyze-content-quality.sh

# Cleanup operations
./cleanup/cleanup-phase1.sh

# Markdown processing
./markdown/lint-markdown.sh

# Optimization
./optimization/optimize-images.sh

# Utilities
./utilities/add-cspell-word.sh "newword"

# Validation
./validation/health-check-final.sh

# Deployment
./deploy.sh
```text

## Script Permissions

All shell scripts should be executable:

```bash
find scripts/ -name "*.sh" -exec chmod +x {} \;
```text

## Development Workflow

1. **Analysis** - Understand current state
2. **Cleanup** - Remove redundant/outdated files
3. **Optimization** - Improve code and assets
4. **Validation** - Verify quality and functionality
5. **Documentation** - Process markdown files
6. **Deployment** - Deploy to production

This organization reduces clutter while maintaining clear separation of concerns and easy script discovery.
````
