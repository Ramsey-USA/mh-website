#!/bin/bash

# Responsive Design Testing Script
# Tests common responsive breakpoints and documents issues

echo "🔍 MH Construction Website - Responsive Design Analysis"
echo "=================================================="
echo ""

# Test different pages at different breakpoints
PAGES=(
  "/"
  "/about"
  "/services"
  "/projects"
  "/team"
  "/contact"
  "/estimator"
  "/government"
  "/trade-partners"
  "/careers"
)

BREAKPOINTS=(
  "320x568"   # iPhone SE (smallest)
  "375x667"   # iPhone 8
  "390x844"   # iPhone 12/13/14
  "768x1024"  # iPad
  "1024x768"  # iPad Landscape
  "1366x768"  # Common laptop
  "1920x1080" # Full HD desktop
)

BASE_URL="http://localhost:3001"

echo "📱 Testing responsive breakpoints:"
echo "- Mobile: 320px, 375px, 390px"
echo "- Tablet: 768px, 1024px"
echo "- Desktop: 1366px, 1920px"
echo ""

echo "📋 Common responsive issues to check for:"
echo "- Horizontal scrolling on mobile"
echo "- Text too small to read"
echo "- Buttons too small to tap (< 44px)"
echo "- Images overflowing containers"
echo "- Navigation breaking at breakpoints"
echo "- Grid layouts not collapsing properly"
echo "- Touch targets overlapping"
echo ""

echo "🌐 Testing pages:"
for page in "${PAGES[@]}"; do
  echo "- ${BASE_URL}${page}"
done

echo ""
echo "⚠️  MANUAL TESTING REQUIRED:"
echo "This script provides the framework for testing."
echo "Use browser DevTools to simulate different screen sizes:"
echo ""
echo "1. Open Chrome DevTools (F12)"
echo "2. Click device toolbar icon (Ctrl+Shift+M)"
echo "3. Test each breakpoint listed above"
echo "4. Check for issues listed above"
echo ""

echo "🔧 Common fixes for responsive issues:"
echo ""
echo "1. Horizontal scrolling:"
echo "   - Add 'overflow-x-hidden' to body/container"
echo "   - Use 'max-w-full' on wide elements"
echo "   - Check for fixed widths that exceed viewport"
echo ""
echo "2. Small touch targets:"
echo "   - Ensure buttons have min-height: 44px (h-11 or larger)"
echo "   - Use adequate padding on clickable elements"
echo "   - Add proper spacing between interactive elements"
echo ""
echo "3. Text readability:"
echo "   - Use responsive text classes: text-base md:text-lg lg:text-xl"
echo "   - Ensure minimum 16px font size on mobile"
echo "   - Check color contrast for accessibility"
echo ""
echo "4. Grid layouts:"
echo "   - Use mobile-first approach: grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
echo "   - Ensure proper gap spacing: gap-4 md:gap-6 lg:gap-8"
echo "   - Test grid collapse behavior"
echo ""
echo "5. Image responsiveness:"
echo "   - Use responsive image classes: w-full h-auto"
echo "   - Set max-width constraints"
echo "   - Use Next.js Image component with proper sizing"
echo ""

echo "✅ Test checklist for each page:"
echo "[ ] No horizontal scrolling at any breakpoint"
echo "[ ] All text is readable (minimum 16px)"
echo "[ ] All buttons are tappable (minimum 44px height)"
echo "[ ] Navigation works on all screen sizes"
echo "[ ] Images don't overflow containers"
echo "[ ] Grid layouts collapse properly"
echo "[ ] Content is accessible on all devices"
echo "[ ] Performance is good on mobile networks"
echo ""

echo "🚀 Ready to start testing!"
echo "Open your browser to http://localhost:3001 and use DevTools to test each breakpoint."