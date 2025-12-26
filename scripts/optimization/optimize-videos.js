#!/usr/bin/env node

/**
 * Video Optimization Script
 *
 * Automatically optimizes videos for web delivery:
 * - Converts to WebM (VP9) and MP4 (H.264) formats
 * - Generates multiple quality levels (1080p, 720p, 480p)
 * - Creates poster images from first frame
 * - Compresses for optimal web performance
 *
 * Usage:
 *   npm run optimize:videos
 *   npm run optimize:videos -- --ci
 *
 * @version 1.0.0
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Configuration
const VIDEO_DIR = path.join(__dirname, "../../public/videos");
const OUTPUT_DIR = path.join(__dirname, "../../public/videos-optimized");
const SUPPORTED_FORMATS = [".mp4", ".mov", ".avi", ".webm", ".mkv"];

// CI mode flag
const CI_MODE = process.argv.includes("--ci");

// Video quality presets
const QUALITY_PRESETS = {
  "1080p": { width: 1920, bitrate: "5000k", audioBitrate: "192k" },
  "720p": { width: 1280, bitrate: "2500k", audioBitrate: "128k" },
  "480p": { width: 854, bitrate: "1000k", audioBitrate: "96k" },
};

/**
 * Check if FFmpeg is installed
 */
function checkFFmpeg() {
  try {
    execSync("ffmpeg -version", { stdio: "ignore" });
    return true;
  } catch (error) {
    console.error("❌ FFmpeg not found. Please install FFmpeg:");
    console.error("   macOS: brew install ffmpeg");
    console.error("   Ubuntu: sudo apt install ffmpeg");
    console.error("   Windows: Download from https://ffmpeg.org/download.html");
    process.exit(1);
  }
}

/**
 * Get all video files recursively
 */
function getVideoFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
    return fileList;
  }

  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getVideoFiles(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (SUPPORTED_FORMATS.includes(ext)) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

/**
 * Get video metadata using ffprobe
 */
function getVideoMetadata(videoPath) {
  try {
    const output = execSync(
      `ffprobe -v quiet -print_format json -show_format -show_streams "${videoPath}"`,
      { encoding: "utf8" },
    );
    return JSON.parse(output);
  } catch (error) {
    console.error(`Failed to get metadata for ${videoPath}`);
    return null;
  }
}

/**
 * Optimize video to WebM format
 */
function optimizeToWebM(inputPath, outputPath, quality = "720p") {
  const preset = QUALITY_PRESETS[quality];
  const command = `ffmpeg -i "${inputPath}" -c:v libvpx-vp9 -b:v ${preset.bitrate} -vf scale=${preset.width}:-2 -c:a libopus -b:a ${preset.audioBitrate} -y "${outputPath}"`;

  try {
    execSync(command, { stdio: CI_MODE ? "ignore" : "inherit" });
    return true;
  } catch (error) {
    console.error(`Failed to convert to WebM: ${inputPath}`);
    return false;
  }
}

/**
 * Optimize video to MP4 format
 */
function optimizeToMP4(inputPath, outputPath, quality = "720p") {
  const preset = QUALITY_PRESETS[quality];
  const command = `ffmpeg -i "${inputPath}" -c:v libx264 -preset slow -crf 23 -vf scale=${preset.width}:-2 -c:a aac -b:a ${preset.audioBitrate} -movflags +faststart -y "${outputPath}"`;

  try {
    execSync(command, { stdio: CI_MODE ? "ignore" : "inherit" });
    return true;
  } catch (error) {
    console.error(`Failed to convert to MP4: ${inputPath}`);
    return false;
  }
}

/**
 * Generate poster image from video
 */
function generatePoster(inputPath, outputPath) {
  const command = `ffmpeg -i "${inputPath}" -ss 00:00:01 -vframes 1 -vf scale=1280:-2 -q:v 2 -y "${outputPath}"`;

  try {
    execSync(command, { stdio: "ignore" });
    return true;
  } catch (error) {
    console.error(`Failed to generate poster: ${inputPath}`);
    return false;
  }
}

/**
 * Get file size in bytes
 */
function getFileSize(filePath) {
  try {
    return fs.statSync(filePath).size;
  } catch {
    return 0;
  }
}

/**
 * Format bytes to human readable
 */
function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i)) + " " + sizes[i];
}

/**
 * Main optimization function
 */
async function optimizeVideos() {
  console.log("\n=== Video Optimization ===");
  console.log("Converting videos to web-optimized formats...\n");

  // Check for FFmpeg
  checkFFmpeg();

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Get all video files
  const videos = getVideoFiles(VIDEO_DIR);

  if (videos.length === 0) {
    console.log("No videos found to optimize.\n");
    return;
  }

  let successCount = 0;
  let failCount = 0;
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  for (const videoPath of videos) {
    const relativePath = path.relative(VIDEO_DIR, videoPath);
    const parsedPath = path.parse(relativePath);
    const outputBasePath = path.join(
      OUTPUT_DIR,
      parsedPath.dir,
      parsedPath.name,
    );

    // Create output subdirectory
    const outputDir = path.dirname(outputBasePath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log(`Processing: ${relativePath}`);

    // Get video metadata
    const metadata = getVideoMetadata(videoPath);
    if (!metadata) {
      console.log("  ✗ Failed to read video metadata");
      failCount++;
      continue;
    }

    // Determine best quality preset based on video resolution
    const videoStream = metadata.streams.find((s) => s.codec_type === "video");
    const height = videoStream?.height || 720;
    let quality = "720p";
    if (height >= 1080) quality = "1080p";
    else if (height <= 480) quality = "480p";

    const originalSize = getFileSize(videoPath);
    totalOriginalSize += originalSize;

    // Convert to WebM
    const webmPath = `${outputBasePath}.webm`;
    if (optimizeToWebM(videoPath, webmPath, quality)) {
      const webmSize = getFileSize(webmPath);
      totalOptimizedSize += webmSize;
      const savings = originalSize - webmSize;
      const percent = Math.round((savings / originalSize) * 100);
      console.log(`  ✓ WebM: ${formatBytes(webmSize)} (${percent}% saved)`);
    }

    // Convert to MP4
    const mp4Path = `${outputBasePath}.mp4`;
    if (optimizeToMP4(videoPath, mp4Path, quality)) {
      const mp4Size = getFileSize(mp4Path);
      const savings = originalSize - mp4Size;
      const percent = Math.round((savings / originalSize) * 100);
      console.log(`  ✓ MP4: ${formatBytes(mp4Size)} (${percent}% saved)`);
    }

    // Generate poster image
    const posterPath = `${outputBasePath}-poster.jpg`;
    if (generatePoster(videoPath, posterPath)) {
      console.log(`  ✓ Poster image generated`);
    }

    successCount++;
  }

  // Print summary
  console.log("\n=== Optimization Complete ===");
  console.log(`✓ Success: ${successCount}`);
  console.log(`✗ Failed: ${failCount}`);

  if (totalOptimizedSize > 0) {
    const totalSavings = totalOriginalSize - totalOptimizedSize;
    const percent = Math.round((totalSavings / totalOriginalSize) * 100);
    console.log(
      `\n💾 Total Savings: ${formatBytes(totalSavings)} (${percent}%)`,
    );
  }

  console.log(`\nOptimized videos saved to: ${OUTPUT_DIR}/`);
  console.log("Review and replace originals when ready.\n");
}

// Run optimization
optimizeVideos().catch((error) => {
  console.error("Optimization failed:", error);
  process.exit(1);
});
