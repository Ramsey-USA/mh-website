#!/bin/bash
# Image Optimization Verification Script
# Verifies all optimized images are properly deployed

echo "=== Image Optimization Verification ==="
echo ""

# Check if optimized images exist
echo "📦 Checking Optimized Files:"
MISSING=0

check_file() {
  if [ -f "$1" ]; then
    SIZE=$(du -h "$1" | cut -f1)
    echo "  ✓ $1 ($SIZE)"
  else
    echo "  ✗ $1 (MISSING)"
    MISSING=$((MISSING + 1))
  fi
}

echo ""
echo "Critical Images:"
check_file "public/images/logo/mh-veteran-bg.webp"
check_file "public/images/logo/mh-logo-dark-bg.webp"
check_file "public/images/placeholder.webp"

echo ""
echo "📊 Size Comparison:"
if [ -f "public/images/logo/mh-veteran-bg.png" ] && [ -f "public/images/logo/mh-veteran-bg.webp" ]; then
  PNG_SIZE=$(stat -f%z "public/images/logo/mh-veteran-bg.png" 2>/dev/null || stat -c%s "public/images/logo/mh-veteran-bg.png")
  WEBP_SIZE=$(stat -f%z "public/images/logo/mh-veteran-bg.webp" 2>/dev/null || stat -c%s "public/images/logo/mh-veteran-bg.webp")
  SAVINGS=$((PNG_SIZE - WEBP_SIZE))
  PERCENT=$((SAVINGS * 100 / PNG_SIZE))
  echo "  • mh-veteran-bg: $((PNG_SIZE / 1024))KB → $((WEBP_SIZE / 1024))KB (${PERCENT}% reduction)"
fi

echo ""
echo "🔍 Code Reference Check:"
grep -r "mh-veteran-bg\.webp" src/ > /dev/null && echo "  ✓ Veterans page uses WebP" || echo "  ✗ Veterans page still uses PNG"
grep -r "mh-logo-dark-bg\.webp" src/ > /dev/null && echo "  ✓ Footer uses WebP logo" || echo "  ✗ Footer still uses PNG"
grep -r "placeholder\.webp" src/ > /dev/null && echo "  ✓ Placeholder updated to WebP" || echo "  ✗ Placeholder still uses JPG"

echo ""
if [ $MISSING -eq 0 ]; then
  echo "✅ All optimized images deployed successfully!"
else
  echo "⚠️  $MISSING optimized images missing"
fi

echo ""
echo "🚀 Next Steps:"
echo "  1. Run: npm run build"
echo "  2. Test: npm run lighthouse:guide"
echo "  3. Deploy to production"
echo "  4. Monitor Core Web Vitals"
