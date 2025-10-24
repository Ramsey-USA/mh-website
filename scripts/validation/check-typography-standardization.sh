#!/bin/bash

# MH Construction Typography & Layout Standardization Check
# Validates typography hierarchy, responsive scaling, and brand gradient patterns

echo "🔤 MH Construction Typography & Layout Standardization Check"
echo "==========================================================="
echo ""

# Define directories to scan
SRC_DIR="src/app"

# Initialize counters
typography_issues=0
layout_issues=0
gradient_issues=0

echo "🔍 Scanning for typography consistency..."
echo ""

# Check for consistent heading hierarchy
echo "📏 Checking heading hierarchy patterns..."

# H1 patterns (hero titles)
h1_patterns=$(find $SRC_DIR -name "*.tsx" | xargs grep -l "text-.*xl.*font-black\|text-.*xl.*font-bold" | wc -l)
inconsistent_h1=$(find $SRC_DIR -name "*.tsx" | xargs grep -c "h1.*text-[^3-7]xl" | grep -v ":0" | wc -l)

if [ $h1_patterns -gt 8 ]; then
    echo "✅ H1 typography patterns detected across $h1_patterns files"
else
    echo "⚠️  Limited H1 typography consistency"
    ((typography_issues++))
fi

if [ $inconsistent_h1 -gt 0 ]; then
    echo "⚠️  $inconsistent_h1 files have inconsistent H1 sizing"
    ((typography_issues++))
fi

# H2 patterns (section titles)
h2_patterns=$(find $SRC_DIR -name "*.tsx" | xargs grep -l "h2.*text-.*xl.*font-" | wc -l)
echo "$([ $h2_patterns -gt 8 ] && echo "✅" || echo "⚠️ ") H2 patterns found in $h2_patterns files"

# Check for responsive typography scaling
echo ""
echo "📱 Checking responsive typography scaling..."

responsive_h1=$(find $SRC_DIR -name "*.tsx" | xargs grep -l "text-3xl.*sm:text-4xl.*md:text-5xl" | wc -l)
responsive_h2=$(find $SRC_DIR -name "*.tsx" | xargs grep -l "text-2xl.*sm:text-3xl.*md:text-4xl" | wc -l)
responsive_body=$(find $SRC_DIR -name "*.tsx" | xargs grep -l "text-base.*sm:text-lg.*md:text-xl" | wc -l)

if [ $responsive_h1 -gt 5 ]; then
    echo "✅ Responsive H1 scaling implemented across $responsive_h1 files"
else
    echo "❌ Limited responsive H1 scaling ($responsive_h1 files)"
    ((typography_issues++))
fi

if [ $responsive_h2 -gt 5 ]; then
    echo "✅ Responsive H2 scaling implemented across $responsive_h2 files"
else
    echo "⚠️  Limited responsive H2 scaling ($responsive_h2 files)"
fi

if [ $responsive_body -gt 5 ]; then
    echo "✅ Responsive body text scaling implemented across $responsive_body files"
else
    echo "⚠️  Limited responsive body text scaling ($responsive_body files)"
fi

echo ""
echo "🎨 Checking brand gradient consistency..."

# Check for brand gradient patterns
brand_gradients=$(find $SRC_DIR -name "*.tsx" | xargs grep -l "bg-gradient-to-r.*from-.*brand" | wc -l)
inconsistent_gradients=$(find $SRC_DIR -name "*.tsx" | xargs grep -c "bg-gradient-to-r.*from-gray.*to-gray" | grep -v ":0" | wc -l)

if [ $brand_gradients -gt 8 ]; then
    echo "✅ Brand gradients implemented across $brand_gradients files"
else
    echo "❌ Limited brand gradient usage ($brand_gradients files)"
    ((gradient_issues++))
fi

if [ $inconsistent_gradients -gt 2 ]; then
    echo "⚠️  $inconsistent_gradients files use non-brand gradients"
    ((gradient_issues++))
fi

# Check for proper text-transparent usage with gradients
gradient_text=$(find $SRC_DIR -name "*.tsx" | xargs grep -l "bg-clip-text.*bg-gradient.*text-transparent" | wc -l)
if [ $gradient_text -gt 6 ]; then
    echo "✅ Gradient text effects properly implemented across $gradient_text files"
else
    echo "⚠️  Limited gradient text implementation ($gradient_text files)"
fi

echo ""
echo "📐 Checking layout consistency..."

# Check for consistent spacing patterns
spacing_patterns=$(find $SRC_DIR -name "*.tsx" | xargs grep -l "space-y-6.*sm:space-y-8\|py-20.*sm:py-0" | wc -l)
if [ $spacing_patterns -gt 5 ]; then
    echo "✅ Consistent spacing patterns across $spacing_patterns files"
else
    echo "⚠️  Limited consistent spacing patterns ($spacing_patterns files)"
    ((layout_issues++))
fi

# Check for consistent container usage
container_patterns=$(find $SRC_DIR -name "*.tsx" | xargs grep -l "max-w-7xl.*mx-auto.*px-4.*sm:px-6.*lg:px-8" | wc -l)
if [ $container_patterns -gt 8 ]; then
    echo "✅ Consistent container patterns across $container_patterns files"
else
    echo "⚠️  Inconsistent container patterns ($container_patterns files)"
    ((layout_issues++))
fi

# Check for consistent card layouts
card_patterns=$(find $SRC_DIR -name "*.tsx" | xargs grep -l "grid.*md:grid-cols.*lg:grid-cols" | wc -l)
if [ $card_patterns -gt 6 ]; then
    echo "✅ Consistent grid layouts across $card_patterns files"
else
    echo "⚠️  Limited consistent grid layouts ($card_patterns files)"
fi

echo ""
echo "🎯 Checking section header consistency..."

# Check for consistent section headers
section_headers=$(find $SRC_DIR -name "*.tsx" | xargs grep -l "mb-.*text-center.*h2.*font-" | wc -l)
if [ $section_headers -gt 6 ]; then
    echo "✅ Consistent section headers across $section_headers files"
else
    echo "❌ Inconsistent section headers ($section_headers files)"
    ((typography_issues++))
fi

echo ""
echo "==========================================================="
echo "📊 TYPOGRAPHY & LAYOUT STANDARDIZATION SUMMARY"
echo "==========================================================="

# Calculate score
total_issues=$((typography_issues + layout_issues + gradient_issues))
max_issues=8
score=$(((max_issues - total_issues) * 100 / max_issues))

echo ""
echo "📋 Issue Summary:"
echo "   🔤 Typography Issues: $typography_issues"
echo "   📐 Layout Issues: $layout_issues"
echo "   🎨 Gradient Issues: $gradient_issues"
echo ""
echo "📊 Typography Standardization Score: $score/100"

if [ $score -ge 90 ]; then
    echo "🌟 Excellent typography standardization!"
elif [ $score -ge 75 ]; then
    echo "✅ Good typography consistency with minor improvements needed"
elif [ $score -ge 50 ]; then
    echo "⚠️  Fair typography consistency - improvements recommended"
else
    echo "❌ Poor typography consistency - standardization required"
fi

echo ""
echo "📋 Next Steps:"
echo "1. Standardize H1/H2 typography hierarchy"
echo "2. Implement consistent responsive scaling"
echo "3. Unify brand gradient patterns"
echo "4. Standardize spacing and layout patterns"
echo "5. Create typography component library"
echo ""
echo "📖 See docs/development/TYPOGRAPHY_STANDARDIZATION_GUIDE.md for detailed steps"