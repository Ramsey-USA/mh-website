// Image optimization utility for MH Construction website
// This script helps optimize images for better performance

import { promises as fs } from 'fs'
import path from 'path'

interface ImageOptimizationReport {
  totalImages: number
  optimizedImages: number
  errors: string[]
  recommendations: string[]
}

/**
 * Scan images in public/images directory and provide optimization recommendations
 */
export async function generateImageOptimizationReport(): Promise<ImageOptimizationReport> {
  const report: ImageOptimizationReport = {
    totalImages: 0,
    optimizedImages: 0,
    errors: [],
    recommendations: [],
  }

  const imagesDir = path.join(process.cwd(), 'public', 'images')

  try {
    // Check if images directory exists
    await fs.access(imagesDir)

    // Recursively scan for images
    const imageFiles = await scanImagesRecursively(imagesDir)
    report.totalImages = imageFiles.length

    for (const imagePath of imageFiles) {
      const relativePath = path.relative(imagesDir, imagePath)
      const stats = await fs.stat(imagePath)
      const sizeInMB = stats.size / (1024 * 1024)

      // Check file size (recommend optimization if > 500KB)
      if (sizeInMB > 0.5) {
        report.recommendations.push(
          `Large file detected: ${relativePath} (${sizeInMB.toFixed(
            2
          )}MB) - Consider compressing`
        )
      }

      // Check file format
      const ext = path.extname(imagePath).toLowerCase()
      if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
        report.recommendations.push(
          `Consider WebP format for: ${relativePath} - Modern browsers support WebP for better compression`
        )
      }

      // Count as optimized if it meets basic criteria
      if (sizeInMB <= 0.5 && (ext === '.webp' || ext === '.avif')) {
        report.optimizedImages++
      }
    }

    // General recommendations
    report.recommendations.push(
      'Use Next.js Image component instead of <img> tags for automatic optimization',
      'Consider implementing responsive images with different sizes for different viewports',
      'Use priority prop for above-the-fold images (like logos)',
      'Implement lazy loading for below-the-fold images'
    )
  } catch (error) {
    report.errors.push(`Error scanning images directory: ${error}`)
  }

  return report
}

/**
 * Recursively scan directory for image files
 */
async function scanImagesRecursively(dir: string): Promise<string[]> {
  const imageExtensions = [
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.webp',
    '.avif',
    '.svg',
  ]
  const imageFiles: string[] = []

  const items = await fs.readdir(dir, { withFileTypes: true })

  for (const item of items) {
    const fullPath = path.join(dir, item.name)

    if (item.isDirectory()) {
      // Recursively scan subdirectories
      const subImages = await scanImagesRecursively(fullPath)
      imageFiles.push(...subImages)
    } else if (item.isFile()) {
      const ext = path.extname(item.name).toLowerCase()
      if (imageExtensions.includes(ext)) {
        imageFiles.push(fullPath)
      }
    }
  }

  return imageFiles
}

/**
 * Image optimization best practices and recommendations
 */
export const IMAGE_OPTIMIZATION_GUIDE = {
  formats: {
    webp: 'Modern format with excellent compression, supported by 95%+ browsers',
    avif: 'Next-gen format with superior compression, growing browser support',
    jpeg: 'Good for photos with many colors, use quality 75-85',
    png: 'Good for images with transparency or few colors',
  },
  sizingGuidelines: {
    hero: 'Hero images: max 2000px width, quality 85',
    thumbnail: 'Thumbnails: 400px width, quality 80',
    logo: 'Logos: SVG preferred, or PNG with transparency',
    background: 'Background images: optimize for largest viewport, use WebP',
  },
  nextjsIntegration: {
    responsive: 'Use sizes prop to match CSS breakpoints',
    priority: 'Add priority prop to above-the-fold images',
    placeholder: 'Use blur placeholder for better UX',
    quality: 'Default quality 75 is good for most cases',
  },
}

const imageOptimizationUtils = {
  generateImageOptimizationReport,
  IMAGE_OPTIMIZATION_GUIDE,
}

export default imageOptimizationUtils
