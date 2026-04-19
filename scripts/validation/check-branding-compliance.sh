#!/bin/bash

# MH Construction Branding Validation Script
# Quick check for branding compliance across all pages

echo "🎨 MH Construction Branding Compliance Check"
echo "============================================"
echo ""

# Check for emojis in source code (critical violation)
echo "🚨 Checking for emojis in source code..."
emoji_count=$(find src/app -name "*.tsx" -exec grep -H "[\u{1F600}-\u{1F64F}]" {} \; 2>/dev/null | wc -l)
if [ $emoji_count -gt 0 ]; then
    echo "❌ Found $emoji_count emoji violations in source code"
    find src/app -name "*.tsx" -exec grep -Hn "[\u{1F600}-\u{1F64F}]" {} \; 2>/dev/null
else
    echo "✅ No emojis found in source code"
fi
echo ""

# Check for Material Icon usage
echo "🔧 Checking Material Icon implementation..."
material_icon_files=$(find src/app -name "*.tsx" -exec grep -l "MaterialIcon" {} \; | wc -l)
total_page_files=$(find src/app -name "page.tsx" | wc -l)
echo "✅ $material_icon_files files use MaterialIcon component"
echo "📄 $total_page_files total page files"
echo ""

# Check for brand color usage
echo "🎨 Checking brand color implementation..."
brand_primary_usage=$(find src/app -name "*.tsx" -exec grep -l "brand-primary\|#386851" {} \; | wc -l)
brand_secondary_usage=$(find src/app -name "*.tsx" -exec grep -l "brand-secondary\|#BD9264" {} \; | wc -l)
echo "✅ $brand_primary_usage files use primary brand color"
echo "✅ $brand_secondary_usage files use secondary brand color"
echo ""

# Check for primary tagline presence
echo "💬 Checking for primary tagline..."
tagline_usage=$(find src/app -name "*.tsx" -exec grep -l "Building projects for the client" {} \; | wc -l)
echo "✓ $tagline_usage files include primary tagline"
echo ""

# Check for partnership messaging
echo "🤝 Checking partnership messaging..."
partnership_usage=$(find src/app -name "*.tsx" -exec grep -l "We Work With You\|partnership" {} \; | wc -l)
echo "✅ $partnership_usage files include partnership messaging"
echo ""

# Check for regional focus
echo "📍 Checking regional focus..."
regional_usage=$(find src/app -name "*.tsx" -exec grep -l "Tri-Cities\|Tri-State\|Pasco\|Richland\|Kennewick\|Washington\|Oregon\|Idaho\|Pacific Northwest" {} \; | wc -l)
echo "✅ $regional_usage files mention service region"
echo ""

# Summary
echo "============================================"
echo "🎯 BRANDING COMPLIANCE SUMMARY"
echo "============================================"

score=100
if [ $emoji_count -gt 0 ]; then
    score=$((score - 30))
    echo "❌ Critical: Emojis found in source code (-30 points)"
fi

if [ $material_icon_files -lt $((total_page_files * 8 / 10)) ]; then
    score=$((score - 10))
    echo "⚠️  Warning: Low Material Icon usage (-10 points)"
fi

if [ $tagline_usage -lt $((total_page_files / 2)) ]; then
    score=$((score - 10))
    echo "⚠️  Warning: Primary tagline missing from many pages (-10 points)"
fi

if [ $partnership_usage -lt $((total_page_files / 2)) ]; then
    score=$((score - 5))
    echo "⚠️  Warning: Partnership messaging could be improved (-5 points)"
fi

if [ $regional_usage -lt $((total_page_files * 3 / 4)) ]; then
    score=$((score - 5))
    echo "⚠️  Warning: Regional focus could be stronger (-5 points)"
fi

echo ""
echo "📊 Overall Compliance Score: $score/100"

if [ $score -ge 95 ]; then
    echo "🌟 Excellent! Ready for production."
elif [ $score -ge 80 ]; then
    echo "✅ Good compliance. Minor improvements needed."
elif [ $score -ge 60 ]; then
    echo "⚠️  Moderate compliance. Address issues before launch."
else
    echo "❌ Poor compliance. Significant work needed."
fi

echo ""
echo "📋 Next Steps:"
echo "1. Address critical violations first (emojis)"
echo "2. Implement missing Material Icons"
echo "3. Add primary taglines to key pages"
echo "4. Enhance partnership messaging"
echo "5. Strengthen regional focus"
echo ""
echo "📖 See BRANDING_IMPLEMENTATION_GUIDE.md for detailed steps"