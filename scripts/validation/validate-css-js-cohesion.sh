#!/bin/bash

# CSS and JavaScript Cohesion Validation Script
# This script checks that Tailwind, CSS, and JavaScript are working together properly

echo "🔍 Validating CSS and JavaScript Cohesion..."
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to check if a file exists
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1 exists"
        return 0
    else
        echo -e "${RED}✗${NC} $1 missing"
        return 1
    fi
}

# Function to check if a command exists
check_command() {
    if command -v "$1" &> /dev/null; then
        echo -e "${GREEN}✓${NC} $1 is available"
        return 0
    else
        echo -e "${RED}✗${NC} $1 is not available"
        return 1
    fi
}

# Check required files
echo -e "\n${BLUE}Checking Configuration Files:${NC}"
check_file "config/build/tailwind.config.ts"
check_file "config/build/postcss.config.js"
check_file "config/build/next.config.js"
check_file "src/app/globals.css"
check_file "src/styles/variables.css"
check_file "src/styles/vintage-baseball-card.css"

# Check package.json dependencies
echo -e "\n${BLUE}Checking Dependencies:${NC}"
if [ -f "package.json" ]; then
    echo -e "${GREEN}✓${NC} package.json exists"
    
    # Check for key dependencies
    if grep -q '"tailwindcss"' package.json; then
        echo -e "${GREEN}✓${NC} Tailwind CSS dependency found"
    else
        echo -e "${RED}✗${NC} Tailwind CSS dependency missing"
    fi
    
    if grep -q '"autoprefixer"' package.json; then
        echo -e "${GREEN}✓${NC} Autoprefixer dependency found"
    else
        echo -e "${RED}✗${NC} Autoprefixer dependency missing"
    fi
    
    if grep -q '"postcss"' package.json; then
        echo -e "${GREEN}✓${NC} PostCSS dependency found"
    else
        echo -e "${RED}✗${NC} PostCSS dependency missing"
    fi
    
    if grep -q '"tailwind-merge"' package.json; then
        echo -e "${GREEN}✓${NC} Tailwind Merge utility found"
    else
        echo -e "${RED}✗${NC} Tailwind Merge utility missing"
    fi
else
    echo -e "${RED}✗${NC} package.json missing"
fi

# Check symlinks
echo -e "\n${BLUE}Checking Symlinks:${NC}"
if [ -L "tailwind.config.ts" ]; then
    if [ -e "tailwind.config.ts" ]; then
        echo -e "${GREEN}✓${NC} tailwind.config.ts symlink is valid"
    else
        echo -e "${RED}✗${NC} tailwind.config.ts symlink is broken"
    fi
else
    echo -e "${YELLOW}⚠${NC} tailwind.config.ts is not a symlink"
fi

if [ -L "postcss.config.js" ]; then
    if [ -e "postcss.config.js" ]; then
        echo -e "${GREEN}✓${NC} postcss.config.js symlink is valid"
    else
        echo -e "${RED}✗${NC} postcss.config.js symlink is broken"
    fi
else
    echo -e "${YELLOW}⚠${NC} postcss.config.js is not a symlink"
fi

# Check CSS imports
echo -e "\n${BLUE}Checking CSS Imports:${NC}"
if [ -f "src/app/globals.css" ]; then
    if grep -q "@tailwind base" src/app/globals.css; then
        echo -e "${GREEN}✓${NC} Tailwind base layer imported"
    else
        echo -e "${RED}✗${NC} Tailwind base layer missing"
    fi
    
    if grep -q "@tailwind components" src/app/globals.css; then
        echo -e "${GREEN}✓${NC} Tailwind components layer imported"
    else
        echo -e "${RED}✗${NC} Tailwind components layer missing"
    fi
    
    if grep -q "@tailwind utilities" src/app/globals.css; then
        echo -e "${GREEN}✓${NC} Tailwind utilities layer imported"
    else
        echo -e "${RED}✗${NC} Tailwind utilities layer missing"
    fi
    
    if grep -q "variables.css" src/app/globals.css; then
        echo -e "${GREEN}✓${NC} CSS variables imported"
    else
        echo -e "${YELLOW}⚠${NC} CSS variables not imported"
    fi
    
    if grep -q "vintage-baseball-card.css" src/app/globals.css; then
        echo -e "${GREEN}✓${NC} Vintage baseball card styles imported"
    else
        echo -e "${YELLOW}⚠${NC} Vintage baseball card styles not imported"
    fi
fi

# Check if utilities are being used properly
echo -e "\n${BLUE}Checking Utility Integration:${NC}"
if [ -f "src/lib/utils.ts" ]; then
    if grep -q "tailwind-merge" src/lib/utils.ts; then
        echo -e "${GREEN}✓${NC} Tailwind merge utility configured"
    else
        echo -e "${RED}✗${NC} Tailwind merge utility not configured"
    fi
    
    if grep -q "brandClasses" src/lib/utils.ts; then
        echo -e "${GREEN}✓${NC} Brand classes utility available"
    else
        echo -e "${YELLOW}⚠${NC} Brand classes utility not found"
    fi
fi

# Check build commands
echo -e "\n${BLUE}Checking Build Configuration:${NC}"
if [ -f "package.json" ]; then
    if grep -q '"build".*"next build"' package.json; then
        echo -e "${GREEN}✓${NC} Next.js build command configured"
    else
        echo -e "${RED}✗${NC} Next.js build command missing"
    fi
    
    if grep -q '"dev".*"next dev"' package.json; then
        echo -e "${GREEN}✓${NC} Next.js dev command configured"
    else
        echo -e "${RED}✗${NC} Next.js dev command missing"
    fi
fi

# Test CSS class conflicts (basic check)
echo -e "\n${BLUE}Checking for Potential CSS Conflicts:${NC}"
if [ -f "src/app/globals.css" ]; then
    # Check for duplicate @layer declarations
    layer_count=$(grep -c "@layer" src/app/globals.css)
    if [ "$layer_count" -gt 3 ]; then
        echo -e "${YELLOW}⚠${NC} Multiple @layer declarations found ($layer_count) - check for duplicates"
    else
        echo -e "${GREEN}✓${NC} @layer declarations look good"
    fi
    
    # Check for !important usage (should be minimal)
    important_count=$(grep -c "!important" src/app/globals.css)
    if [ "$important_count" -gt 5 ]; then
        echo -e "${YELLOW}⚠${NC} High usage of !important ($important_count instances) - consider refactoring"
    else
        echo -e "${GREEN}✓${NC} !important usage is reasonable"
    fi
fi

# Performance checks
echo -e "\n${BLUE}Performance Optimization Checks:${NC}"
if [ -f "src/app/globals.css" ]; then
    if grep -q "will-change" src/app/globals.css; then
        echo -e "${GREEN}✓${NC} Performance optimizations (will-change) found"
    else
        echo -e "${YELLOW}⚠${NC} No performance optimizations found"
    fi
    
    if grep -q "contain:" src/app/globals.css; then
        echo -e "${GREEN}✓${NC} CSS containment optimizations found"
    else
        echo -e "${YELLOW}⚠${NC} No CSS containment optimizations found"
    fi
    
    if grep -q "transform.*translateZ" src/app/globals.css; then
        echo -e "${GREEN}✓${NC} GPU acceleration optimizations found"
    else
        echo -e "${YELLOW}⚠${NC} No GPU acceleration optimizations found"
    fi
fi

# Summary
echo -e "\n${BLUE}Validation Summary:${NC}"
echo "=============================================="

# Run a quick syntax check if Node.js is available
if command -v node &> /dev/null; then
    echo -e "${GREEN}✓${NC} Node.js is available for runtime validation"
    
    # Check if we can parse the Tailwind config
    if [ -f "config/build/tailwind.config.ts" ]; then
        echo -e "${BLUE}Attempting to validate Tailwind configuration...${NC}"
        # This would require TypeScript compilation, so we'll skip for now
        echo -e "${YELLOW}⚠${NC} TypeScript validation skipped (requires compilation)"
    fi
else
    echo -e "${YELLOW}⚠${NC} Node.js not available for runtime validation"
fi

echo -e "\n${GREEN}✓${NC} CSS and JavaScript cohesion validation complete!"
echo -e "\n${YELLOW}Note:${NC} For complete validation, run the development server and check browser console for any CSS/JS errors."
echo -e "Command: ${BLUE}npm run dev${NC}"

# Optional: Check if development server can start (without actually starting it)
echo -e "\n${BLUE}Development Server Check:${NC}"
if [ -f "package.json" ] && command -v npm &> /dev/null; then
    echo -e "${GREEN}✓${NC} Ready to start development server with 'npm run dev'"
else
    echo -e "${RED}✗${NC} Cannot start development server - check Node.js and npm installation"
fi