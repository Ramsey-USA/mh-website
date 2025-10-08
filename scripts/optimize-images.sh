#!/bin/bash

# Image Optimization Script
# This script optimizes images in the public directory

set -e

echo "🖼️  Starting image optimization..."

# Check if optimization tools are available
if ! command -v pngquant &> /dev/null; then
    echo "📦 Installing pngquant..."
    sudo apt-get update && sudo apt-get install -y pngquant
fi

if ! command -v jpegoptim &> /dev/null; then
    echo "📦 Installing jpegoptim..."
    sudo apt-get install -y jpegoptim
fi

# Create backup directory
BACKUP_DIR="./backups/images-$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo "💾 Creating backups in $BACKUP_DIR..."

# Find and optimize PNG files
find ./public -name "*.png" -type f | while read -r file; do
    # Create backup
    cp "$file" "$BACKUP_DIR/$(basename "$file")"
    
    # Get original size
    original_size=$(du -h "$file" | cut -f1)
    
    echo "🔄 Optimizing PNG: $file (original: $original_size)"
    
    # Optimize PNG with pngquant
    pngquant --quality=80-95 --ext .png --force "$file"
    
    # Get new size
    new_size=$(du -h "$file" | cut -f1)
    echo "✅ Optimized: $file (new: $new_size)"
done

# Find and optimize JPEG files
find ./public -name "*.jpg" -o -name "*.jpeg" -type f | while read -r file; do
    # Create backup
    cp "$file" "$BACKUP_DIR/$(basename "$file")"
    
    # Get original size
    original_size=$(du -h "$file" | cut -f1)
    
    echo "🔄 Optimizing JPEG: $file (original: $original_size)"
    
    # Optimize JPEG with jpegoptim
    jpegoptim --max=85 --strip-all "$file"
    
    # Get new size
    new_size=$(du -h "$file" | cut -f1)
    echo "✅ Optimized: $file (new: $new_size)"
done

echo "🎉 Image optimization complete!"
echo "📁 Backups saved in: $BACKUP_DIR"