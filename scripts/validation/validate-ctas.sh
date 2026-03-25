#!/bin/bash

# CTA and Link Validation Script for MH Construction Website
# This script validates all Call-to-Action buttons and links for correct connectivity

set -e

echo "🔍 MH Construction - CTA & Link Validation Tool"
echo "================================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Initialize counters
TOTAL_CHECKS=0
PASSED_CHECKS=0
FAILED_CHECKS=0
WARNING_CHECKS=0

# Function to check if a page exists
check_page_exists() {
    local page_path=$1
    local page_name=$2
    
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    
    if [ -f "$page_path" ]; then
        echo -e "${GREEN}✓${NC} Page exists: $page_name"
        PASSED_CHECKS=$((PASSED_CHECKS + 1))
        return 0
    else
        echo -e "${RED}✗${NC} Page missing: $page_name at $page_path"
        FAILED_CHECKS=$((FAILED_CHECKS + 1))
        return 1
    fi
}

# Function to check contact information consistency
check_contact_info() {
    local search_pattern=$1
    local info_type=$2
    local expected_value=$3
    
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    
    echo -e "${BLUE}Checking $info_type consistency...${NC}"
    
    # Search for the pattern in all TSX files
    matches=$(grep -r "$search_pattern" src/ --include="*.tsx" 2>/dev/null | wc -l)
    
    if [ "$matches" -gt 0 ]; then
        # Check if all occurrences match the expected value
        incorrect=$(grep -r "$search_pattern" src/ --include="*.tsx" 2>/dev/null | grep -v "$expected_value" | wc -l)
        
        if [ "$incorrect" -eq 0 ]; then
            echo -e "${GREEN}✓${NC} $info_type is consistent ($matches occurrences)"
            PASSED_CHECKS=$((PASSED_CHECKS + 1))
        else
            echo -e "${YELLOW}⚠${NC} $info_type has inconsistencies ($incorrect incorrect out of $matches)"
            WARNING_CHECKS=$((WARNING_CHECKS + 1))
            grep -rn "$search_pattern" src/ --include="*.tsx" | grep -v "$expected_value" | head -5
        fi
    else
        echo -e "${YELLOW}⚠${NC} $info_type not found in codebase"
        WARNING_CHECKS=$((WARNING_CHECKS + 1))
    fi
}

# Function to check for broken internal links
check_internal_links() {
    echo ""
    echo -e "${BLUE}📋 Checking internal navigation links...${NC}"
    echo ""
    
    # Define all valid routes based on src/app directory structure
    declare -a valid_routes=(
        "/"
        "/about"
        "/services"
        "/projects"
        "/team"
        "/public-sector"
        "/allies"
        "/careers"
        "/contact"
        "/testimonials"
    )
    
    # Check each route has a corresponding page
    for route in "${valid_routes[@]}"; do
        if [ "$route" = "/" ]; then
            check_page_exists "src/app/page.tsx" "Homepage ($route)"
        else
            page_dir="src/app${route}"
            check_page_exists "${page_dir}/page.tsx" "$route"
        fi
    done
}

# Function to find potentially broken links
find_broken_links() {
    echo ""
    echo -e "${BLUE}🔗 Searching for potentially broken internal links...${NC}"
    echo ""
    
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    
    # Search for href patterns that might be broken
    broken_portfolio=$(grep -rn 'href="/portfolio"' src/ --include="*.tsx" 2>/dev/null | wc -l)
    broken_blog=$(grep -rn 'href="/blog"' src/ --include="*.tsx" 2>/dev/null | wc -l)
    broken_news=$(grep -rn 'href="/news"' src/ --include="*.tsx" 2>/dev/null | wc -l)
    
    if [ "$broken_portfolio" -gt 0 ] || [ "$broken_blog" -gt 0 ] || [ "$broken_news" -gt 0 ]; then
        echo -e "${RED}✗${NC} Found links to non-existent pages:"
        [ "$broken_portfolio" -gt 0 ] && echo -e "  ${RED}•${NC} /portfolio: $broken_portfolio occurrences"
        [ "$broken_blog" -gt 0 ] && echo -e "  ${RED}•${NC} /blog: $broken_blog occurrences"
        [ "$broken_news" -gt 0 ] && echo -e "  ${RED}•${NC} /news: $broken_news occurrences"
        FAILED_CHECKS=$((FAILED_CHECKS + 1))
        
        echo ""
        echo -e "${YELLOW}Locations:${NC}"
        [ "$broken_portfolio" -gt 0 ] && grep -rn 'href="/portfolio"' src/ --include="*.tsx" 2>/dev/null | head -3
        [ "$broken_blog" -gt 0 ] && grep -rn 'href="/blog"' src/ --include="*.tsx" 2>/dev/null | head -3
        [ "$broken_news" -gt 0 ] && grep -rn 'href="/news"' src/ --include="*.tsx" 2>/dev/null | head -3
    else
        echo -e "${GREEN}✓${NC} No broken internal links found"
        PASSED_CHECKS=$((PASSED_CHECKS + 1))
    fi
}

# Function to validate external links format
validate_external_links() {
    echo ""
    echo -e "${BLUE}🌐 Validating external links and contact information...${NC}"
    echo ""
    
    # Check phone number format
    check_contact_info "tel:\+1" "Phone number" "+15093086489"
    
    # Check email format
    check_contact_info "mailto:" "Email address" "office@mhc-gc.com"
    
    # Check address format
    check_contact_info "3111" "Physical address" "3111 N. Capitol Ave"
}

# Function to check Button component usage
check_button_usage() {
    echo ""
    echo -e "${BLUE}🔘 Checking Button component usage patterns...${NC}"
    echo ""
    
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    
    # Check for buttons with onClick and window.location.href (potential anti-pattern)
    onclick_href=$(grep -rn 'onClick.*window\.location\.href' src/ --include="*.tsx" 2>/dev/null | wc -l)
    
    if [ "$onclick_href" -gt 0 ]; then
        echo -e "${YELLOW}⚠${NC} Found $onclick_href Button(s) using onClick with window.location.href"
        echo -e "  Consider using Next.js Link component for better performance"
        WARNING_CHECKS=$((WARNING_CHECKS + 1))
        grep -rn 'onClick.*window\.location\.href' src/ --include="*.tsx" 2>/dev/null | head -3
    else
        echo -e "${GREEN}✓${NC} All buttons use proper navigation patterns"
        PASSED_CHECKS=$((PASSED_CHECKS + 1))
    fi
}

# Function to check CTA consistency across pages
check_cta_consistency() {
    echo ""
    echo -e "${BLUE}🎯 Checking CTA consistency across pages...${NC}"
    echo ""
    
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    
    # Check for common CTA patterns
    contact_ctas=$(grep -rn 'href="/contact"' src/app --include="*.tsx" 2>/dev/null | wc -l)
    booking_ctas=$(grep -rn 'href="/booking"' src/app --include="*.tsx" 2>/dev/null | wc -l)
    estimator_ctas=$(grep -rn 'href="/estimator"' src/app --include="*.tsx" 2>/dev/null | wc -l)
    
    echo -e "${GREEN}✓${NC} CTA distribution:"
    echo "  • Contact CTAs: $contact_ctas"
    if [ "$booking_ctas" -gt 0 ]; then
        echo -e "  ${RED}•${NC} Booking CTAs: $booking_ctas (REMOVED route — should be 0)"
    fi
    if [ "$estimator_ctas" -gt 0 ]; then
        echo -e "  ${RED}•${NC} Estimator CTAs: $estimator_ctas (REMOVED route — should be 0)"
    fi
    PASSED_CHECKS=$((PASSED_CHECKS + 1))
}

# Function to validate social media links
validate_social_links() {
    echo ""
    echo -e "${BLUE}📱 Validating social media links...${NC}"
    echo ""
    
    declare -a social_platforms=(
        "facebook.com/mhconstruction"
        "instagram.com/mhconstruction"
        "x.com/mhc_gc"
        "youtube.com/@mhc-gc?si=RGnloxP4NgV4Dm_j"
        "linkedin.com/company/mh-construction-general-contractor/posts"
    )
    
    for platform in "${social_platforms[@]}"; do
        TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
        
        found=$(grep -r "$platform" src/ --include="*.tsx" 2>/dev/null | wc -l)
        
        if [ "$found" -gt 0 ]; then
            echo -e "${GREEN}✓${NC} $platform: $found occurrences"
            PASSED_CHECKS=$((PASSED_CHECKS + 1))
        else
            echo -e "${YELLOW}⚠${NC} $platform: not found"
            WARNING_CHECKS=$((WARNING_CHECKS + 1))
        fi
    done
}

# Main execution
echo "Starting validation checks..."
echo ""

# Run all validation checks
check_internal_links
find_broken_links
validate_external_links
check_button_usage
check_cta_consistency
validate_social_links

# Summary
echo ""
echo "================================================"
echo -e "${BLUE}📊 Validation Summary${NC}"
echo "================================================"
echo "Total checks: $TOTAL_CHECKS"
echo -e "${GREEN}Passed: $PASSED_CHECKS${NC}"
echo -e "${YELLOW}Warnings: $WARNING_CHECKS${NC}"
echo -e "${RED}Failed: $FAILED_CHECKS${NC}"
echo ""

if [ "$FAILED_CHECKS" -eq 0 ]; then
    if [ "$WARNING_CHECKS" -eq 0 ]; then
        echo -e "${GREEN}✓ All CTA and link validations passed!${NC}"
        exit 0
    else
        echo -e "${YELLOW}⚠ Validation passed with warnings${NC}"
        exit 0
    fi
else
    echo -e "${RED}✗ Validation failed - please address the errors above${NC}"
    exit 1
fi
