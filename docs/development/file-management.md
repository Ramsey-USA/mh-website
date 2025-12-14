# File Management Guide

**Category:** Development - Project Maintenance  
**Last Updated:** December 14, 2025  
**Status:** ✅ Active

## 🧭 Quick Navigation

- [🗂️ Development Index](./development-index.md)
- [📝 Documentation Maintenance Guide](./documentation-maintenance-guide.md)
- [🏠 Master Index](../master-index.md)

---

## 🎯 Overview

This guide provides strategies and tools for managing large files in the MH Construction website project.

## Current File Size Analysis

### Large Directories (by size)

- **`node_modules/`**: ~1.4GB (dependencies - excluded from git)
- **`.next/`**: ~626MB (build cache - excluded from git)
- **`public/`**: ~3.6MB (static assets)
- **`src/`**: ~2.6MB (source code)
- **`docs/`**: ~1.7MB (documentation)

### Large Individual Files

- **`.next/cache/`**: Various webpack bundles (100MB+)
- **`public/images/logo/mh-veteran-bg.png`**: 1.3MB
- **`package-lock.json`**: 716KB

## Maintenance Scripts

### Quick Cleanup

````bash
npm run clean
```text

Removes build artifacts, test reports, and temporary files.

### Image Optimization

```bash
npm run optimize:images
```text

Compresses PNG and JPEG files while maintaining quality.

### Full Maintenance

```bash
npm run maintenance
```text

Runs both cleanup and image optimization.

## Best Practices

### 1. **Regular Maintenance**

- Run `npm run clean` before committing changes
- Clean build cache weekly: `rm -rf .next/cache`
- Optimize images before adding to repository

### 2. **Git Management**

- Never commit `node_modules/` or `.next/`
- Use `.gitignore` to exclude build artifacts
- Consider using Git LFS for large assets

### 3. **Image Assets**

- Compress images before adding to `public/`
- Use WebP format for better compression
- Consider lazy loading for large images
- Keep original files in separate backup directory

### 4. **Build Optimization**

- Use `npm run build:analyze` to analyze bundle sizes
- Review dependencies regularly with `npm audit`
- Use Next.js Image component for automatic optimization

## File Size Limits

### Recommended Limits

- **Images**: < 500KB (use optimization tools)
- **Individual files**: < 1MB
- **Documentation**: < 100KB per file

### When to Use External Storage

Consider external storage for:

- Video files (> 10MB)
- High-resolution images (> 2MB)
- Large datasets
- Backup files

## Tools and Commands

### Size Analysis

```bash
# Check directory sizes
du -sh */ | sort -hr

# Find large files (>1MB)
find . -type f -size +1M -exec ls -lh {} \;

# Check git repository size
git count-objects -vH
```text

### Cleanup Commands

```bash
# Clean Next.js cache
rm -rf .next/cache

# Remove node_modules (will need reinstall)
rm -rf node_modules

# Clean TypeScript build info
rm -f *.tsbuildinfo
```text

### Image Optimization Tools

```bash
# Using pngquant (PNG)
pngquant --quality=80-95 --ext .png --force image.png

# Using jpegoptim (JPEG)
jpegoptim --max=85 --strip-all image.jpg
```text

## Monitoring and Alerts

### Weekly Checks

- Repository size: `du -sh .git`
- Large files: Run size analysis script
- Unused dependencies: `npm audit`

### Size Thresholds

- **Warning**: Repository > 100MB
- **Action Required**: Repository > 500MB
- **Critical**: Individual files > 10MB

## Automated Solutions

### GitHub Actions (Future Enhancement)

Consider implementing automated workflows for:

- Image compression on PR
- Bundle size monitoring
- Repository size alerts
- Automatic cleanup on merge

### Pre-commit Hooks

Set up hooks to:

- Check file sizes before commit
- Run image optimization
- Prevent large file commits

## Recovery Procedures

### If Repository Becomes Too Large

1. Use `git filter-branch` to remove large files from history
2. Use BFG Repo-Cleaner for complex cleanups
3. Consider repository migration if necessary

### Backup Strategy

- Keep original assets in separate backup location
- Use cloud storage for large media files
- Maintain separate documentation repository if needed

## Contact

For questions about file management or if you encounter issues:

- Create an issue in the repository
- Contact the development team
- Review the troubleshooting section below

## Troubleshooting

### Common Issues

- **"Repository too large"**: Run cleanup scripts and check for accidentally committed build files
- **"Slow clone times"**: Large history, consider shallow clones or file cleanup
- **"Out of disk space"**: Clean build caches and temporary files

### Quick Fixes

```bash
# Emergency cleanup
npm run clean
rm -rf node_modules .next

# Reinstall dependencies
npm install

# Rebuild project
npm run build
```text
````
