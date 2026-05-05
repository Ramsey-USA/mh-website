#!/bin/bash

# MH Construction Mobile Responsiveness Check
# Validates mobile-first design patterns and responsive breakpoints

echo "📱 MH Construction Mobile Responsiveness Check"
echo "============================================"
echo ""

# Define directories to scan
SRC_DIR="src/app"
COMPONENTS_DIR="src/components"

# Initialize counters
total_files=0
responsive_patterns=0
mobile_issues=0

echo "🔍 Scanning for mobile responsiveness patterns..."
echo ""

# Check for responsive breakpoint usage
echo "📏 Checking responsive breakpoints..."
responsive_classes=$(find $SRC_DIR -name "*.tsx" -o -name "*.ts" | xargs grep -l "sm:\|md:\|lg:\|xl:\|2xl:" | wc -l)
total_page_files=$(find $SRC_DIR -name "page.tsx" | wc -l)

if [ $responsive_classes -gt 0 ]; then
    echo "✅ $responsive_classes files use Tailwind responsive classes"
else
    echo "❌ No responsive breakpoint classes found"
    ((mobile_issues++))
fi

# Check for mobile-first patterns
echo ""
echo "📱 Checking mobile-first design patterns..."

# Check for proper container usage
containers=$(find $SRC_DIR -name "*.tsx" | xargs grep -l "container\|max-w-" | wc -l)
if [ $containers -gt 0 ]; then
    echo "✅ $containers files use container/max-width patterns"
else
    echo "❌ Limited container usage for mobile layouts"
    ((mobile_issues++))
fi

# Check for grid responsiveness
responsive_grids=$(find $SRC_DIR -name "*.tsx" | xargs grep -l "grid.*md:\|grid.*sm:\|grid.*lg:" | wc -l)
if [ $responsive_grids -gt 0 ]; then
    echo "✅ $responsive_grids files use responsive grid layouts"
else
    echo "⚠️  Limited responsive grid usage"
fi

# Check for flex responsiveness
responsive_flex=$(find $SRC_DIR -name "*.tsx" | xargs grep -l "flex.*md:\|flex.*sm:\|flex.*lg:\|flex-col.*md:\|flex-row.*md:" | wc -l)
if [ $responsive_flex -gt 0 ]; then
    echo "✅ $responsive_flex files use responsive flex layouts"
else
    echo "⚠️  Limited responsive flex usage"
fi

echo ""
echo "🎯 Checking navigation mobile patterns..."

# Check for mobile navigation
mobile_nav=$(find $SRC_DIR $COMPONENTS_DIR -name "*.tsx" | xargs grep -l "md:hidden\|lg:hidden\|mobile.*menu\|hamburger" | wc -l)
if [ $mobile_nav -gt 0 ]; then
    echo "✅ Mobile navigation patterns detected"
else
    echo "❌ Mobile navigation patterns not found"
    ((mobile_issues++))
fi

echo ""
echo "📝 Checking text responsiveness..."

# Check for responsive text sizing
responsive_text=$(find $SRC_DIR -name "*.tsx" | xargs grep -l "text-.*sm:\|text-.*md:\|text-.*lg:" | wc -l)
if [ $responsive_text -gt 0 ]; then
    echo "✅ $responsive_text files use responsive text sizing"
else
    echo "❌ Limited responsive text sizing"
    ((mobile_issues++))
fi

echo ""
echo "🖱️ Checking touch targets and spacing..."

# Check for adequate padding/margin for touch
touch_spacing=$(find $SRC_DIR -name "*.tsx" | xargs grep -l "p-[4-9]\|py-[4-9]\|px-[4-9]\|m-[4-9]" | wc -l)
if [ $touch_spacing -gt 5 ]; then
    echo "✅ Adequate touch target spacing detected"
else
    echo "⚠️  Consider reviewing touch target sizes"
fi

# Check for button sizing
button_sizing=$(find $SRC_DIR $COMPONENTS_DIR -name "*.tsx" | xargs grep -l "min-h-\|h-10\|h-12\|py-2\|py-3" | wc -l)
if [ $button_sizing -gt 0 ]; then
    echo "✅ Button sizing patterns detected"
else
    echo "⚠️  Review button touch targets"
fi

echo ""
echo "🖼️ Checking image responsiveness..."

# Check for responsive images
responsive_images=$(find $SRC_DIR -name "*.tsx" | xargs grep -l "w-full\|max-w-\|aspect-\|object-" | wc -l)
if [ $responsive_images -gt 0 ]; then
    echo "✅ $responsive_images files use responsive image patterns"
else
    echo "⚠️  Consider responsive image implementation"
fi

echo ""
echo "🎨 Checking mobile-specific styling..."

# Check for overflow handling
overflow_handling=$(find $SRC_DIR -name "*.tsx" | xargs grep -l "overflow-\|scrollbar-\|whitespace-" | wc -l)
if [ $overflow_handling -gt 0 ]; then
    echo "✅ Overflow handling patterns detected"
else
    echo "⚠️  Consider overflow handling for mobile"
fi

# Check for z-index and layering
layering=$(find $SRC_DIR -name "*.tsx" | xargs grep -l "z-\|relative\|absolute\|fixed" | wc -l)
if [ $layering -gt 0 ]; then
    echo "✅ Layering patterns for mobile overlays detected"
else
    echo "⚠️  Review layering for mobile interfaces"
fi

echo ""
echo "============================================"
echo "📊 MOBILE RESPONSIVENESS SUMMARY"
echo "============================================"

# Calculate score
total_checks=4
passed_checks=$((4 - mobile_issues))
score=$((passed_checks * 25))

echo ""
echo "📋 Critical Mobile Patterns:"
echo "   📏 Responsive Breakpoints: $([ $responsive_classes -gt 0 ] && echo "✅ PASS" || echo "❌ FAIL")"
echo "   🏗️  Container Layouts: $([ $containers -gt 0 ] && echo "✅ PASS" || echo "❌ FAIL")"
echo "   🧭 Mobile Navigation: $([ $mobile_nav -gt 0 ] && echo "✅ PASS" || echo "❌ FAIL")"
echo "   📝 Responsive Text: $([ $responsive_text -gt 0 ] && echo "✅ PASS" || echo "❌ FAIL")"
echo ""
echo "📊 Mobile Compliance Score: $score/100"

if [ $score -ge 90 ]; then
    echo "🌟 Excellent mobile responsiveness!"
elif [ $score -ge 75 ]; then
    echo "✅ Good mobile responsiveness with minor improvements needed"
elif [ $score -ge 50 ]; then
    echo "⚠️  Fair mobile responsiveness - significant improvements recommended"
else
    echo "❌ Poor mobile responsiveness - major improvements required"
fi

echo ""
echo "📋 Next Steps:"
echo "1. Test on actual mobile devices (iPhone, Android)"
echo "2. Verify touch targets are 44px minimum"
echo "3. Check text readability at mobile sizes"
echo "4. Test navigation and form interactions"
echo "5. Validate performance on mobile networks"
echo ""
echo "📖 See docs/development/MOBILE_OPTIMIZATION_GUIDE.md for detailed steps"