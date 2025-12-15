#!/bin/bash
# Systematic page checker for MH Website
# Analyzes each page for optimizations and potential issues

echo "🔍 MH Website - Systematic Page Analysis"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# Function to check a page's bundle info from build output
check_page_bundle() {
    local page=$1
    local build_log="/tmp/mh-build.log"
    
    if [ ! -f "$build_log" ]; then
        echo "Building to get bundle info..."
        npm run build > "$build_log" 2>&1
    fi
    
    grep "$page " "$build_log" | head -1
}

# Function to check for dynamic imports
check_dynamic_imports() {
    local file=$1
    local page_name=$2
    
    if [ -f "$file" ]; then
        if grep -q "dynamic" "$file" && grep -q "import.*from.*next/dynamic" "$file"; then
            echo -e "${GREEN}  ✓${NC} Dynamic imports implemented"
            grep "const.*=.*dynamic" "$file" | sed 's/^/    /'
        else
            echo -e "${YELLOW}  ℹ${NC} No dynamic imports (may not be needed)"
        fi
    fi
}

# Function to check for client components
check_client_usage() {
    local file=$1
    
    if [ -f "$file" ]; then
        if grep -q "\"use client\"" "$file"; then
            echo -e "${YELLOW}  ⚠${NC} Uses client-side rendering"
            # Check if it needs to be client
            if grep -q "useState\|useEffect\|useCallback" "$file"; then
                echo -e "    ${BLUE}→${NC} Has hooks (client needed)"
            else
                echo -e "    ${RED}→${NC} May not need 'use client'"
            fi
        else
            echo -e "${GREEN}  ✓${NC} Server component (optimal)"
        fi
    fi
}

# Function to analyze a page
analyze_page() {
    local page_route=$1
    local page_file=$2
    local page_name=$3
    
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo -e "${BLUE}📄 ${page_name}${NC} (${page_route})"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    # 1. Check if file exists
    if [ ! -f "$page_file" ]; then
        echo -e "${RED}  ✗${NC} File not found: $page_file"
        return
    fi
    echo -e "${GREEN}  ✓${NC} File exists"
    
    # 2. Bundle size
    echo ""
    echo "📦 Bundle Info:"
    check_page_bundle "$page_route"
    
    # 3. Dynamic imports
    echo ""
    echo "⚡ Dynamic Imports:"
    check_dynamic_imports "$page_file" "$page_name"
    
    # 4. Client usage
    echo ""
    echo "🖥️  Rendering:"
    check_client_usage "$page_file"
    
    # 5. Import analysis
    echo ""
    echo "📚 Key Imports:"
    if grep -q "TestimonialGrid\|ChatbotCTASection\|InteractiveTimeline" "$page_file"; then
        echo -e "${BLUE}  →${NC} Heavy components detected:"
        grep "TestimonialGrid\|ChatbotCTASection\|InteractiveTimeline" "$page_file" | head -3 | sed 's/^/    /'
    fi
    
    # 6. Performance considerations
    echo ""
    echo "⚙️  Performance Notes:"
    
    # Check for useEffect
    local effect_count=$(grep -c "useEffect" "$page_file" 2>/dev/null || echo "0")
    if [ "$effect_count" -gt 0 ]; then
        echo -e "${BLUE}  →${NC} $effect_count useEffect hooks (monitor dependencies)"
    fi
    
    # Check for images
    local image_count=$(grep -c "<Image" "$page_file" 2>/dev/null || echo "0")
    if [ "$image_count" -gt 0 ]; then
        echo -e "${BLUE}  →${NC} $image_count Image components"
        if grep -q "priority" "$page_file"; then
            echo -e "    ${GREEN}✓${NC} Has priority images"
        fi
        if grep -q "loading=\"lazy\"" "$page_file"; then
            echo -e "    ${GREEN}✓${NC} Has lazy-loaded images"
        fi
    fi
    
    # Check file size
    local file_size=$(wc -l < "$page_file" 2>/dev/null || echo "0")
    echo -e "${BLUE}  →${NC} File size: $file_size lines"
    if [ "$file_size" -gt 500 ]; then
        echo -e "    ${YELLOW}⚠${NC} Large file - consider splitting"
    fi
}

# Build first
echo "Building project to get accurate bundle info..."
npm run build > /tmp/mh-build.log 2>&1

# Analyze each page
analyze_page "/" "src/app/page.tsx" "Homepage"
analyze_page "/services" "src/app/services/page.tsx" "Services"
analyze_page "/careers" "src/app/careers/page.tsx" "Careers"
analyze_page "/about" "src/app/about/page.tsx" "About"
analyze_page "/contact" "src/app/contact/ContactPageClient.tsx" "Contact"
analyze_page "/team" "src/app/team/page.tsx" "Team"
analyze_page "/projects" "src/app/projects/page.tsx" "Projects"
analyze_page "/faq" "src/app/faq/page.tsx" "FAQ"
analyze_page "/public-sector" "src/app/public-sector/page.tsx" "Public Sector"
analyze_page "/allies" "src/app/allies/page.tsx" "Allies"
analyze_page "/veterans" "src/app/veterans/page.tsx" "Veterans"
analyze_page "/urgent" "src/app/urgent/page.tsx" "Urgent"

# Summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}📊 Analysis Complete${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Full build log saved to: /tmp/mh-build.log"
echo ""
echo "Next steps:"
echo "  1. Run dev server: npm run dev"
echo "  2. Open DevTools Network tab"
echo "  3. Test each page for lazy loading"
echo "  4. Run Lighthouse audits"
echo ""
