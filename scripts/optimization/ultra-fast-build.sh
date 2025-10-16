#!/usr/bin/env bash

# Ultra-Fast Build Script (SAFE)
echo "🚀 Ultra-Fast Build Mode (Safe Optimizations)"
echo "============================================="

# Memory optimization
export NODE_OPTIONS="--max-old-space-size=6144 --max-semi-space-size=256 --max-old-space-size=6144"

# CPU optimization
export UV_THREADPOOL_SIZE=${UV_THREADPOOL_SIZE:-8}

# Timing
start_time=$(date +%s)

# Build with optimizations
echo "Starting ultra-fast build at: $(date)"
npm run build

# Calculate time
end_time=$(date +%s)
build_time=$((end_time - start_time))

echo ""
echo "⚡ Ultra-Fast Build Complete!"
echo "Build time: ${build_time}s"

if [ $build_time -lt 12 ]; then
    echo "🟢 EXCELLENT: Sub-12s build achieved!"
elif [ $build_time -lt 15 ]; then
    echo "🟡 GOOD: Fast build, close to target"
else
    echo "🟠 OK: Still room for improvement"
fi
