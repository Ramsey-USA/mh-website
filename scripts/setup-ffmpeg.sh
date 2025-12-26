#!/bin/bash
# Quick setup script for FFmpeg in dev container

echo "🎬 Installing FFmpeg for video optimization..."

# Check if running as root
if [ "$EUID" -eq 0 ]; then
  apt update && apt install -y ffmpeg
else
  sudo apt update && sudo apt install -y ffmpeg
fi

# Verify installation
if command -v ffmpeg &> /dev/null; then
  echo "✅ FFmpeg installed successfully!"
  ffmpeg -version | head -1
else
  echo "❌ FFmpeg installation failed"
  exit 1
fi

echo ""
echo "You can now run: npm run optimize:videos"
