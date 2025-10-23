#!/bin/bash
# Phase 2 Critical File Splitting - Page Components
# Focuses on breaking down large page files into modular components

echo "🚀 PHASE 2: Page Component Splitting"
echo "======================================"

# Create timestamp for backups
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="backups/phase2-splitting-${TIMESTAMP}"

# Create backup directory
mkdir -p "${BACKUP_DIR}"

echo "📁 Creating backup directory: ${BACKUP_DIR}"

# Phase 2 Target Files Analysis
echo ""
echo "📊 Phase 2 Target Analysis:"
echo "----------------------------"
echo "Primary Targets:"

# Backup and analyze main page
if [ -f "src/app/page.tsx" ]; then
    PAGE_SIZE=$(wc -c < "src/app/page.tsx")
    PAGE_LINES=$(wc -l < "src/app/page.tsx")
    echo "✓ src/app/page.tsx - ${PAGE_SIZE} bytes (${PAGE_LINES} lines)"
    cp "src/app/page.tsx" "${BACKUP_DIR}/page.tsx.backup"
fi

# Backup other large page files
echo ""
echo "Secondary Targets:"
for page in src/app/about/page.tsx src/app/services/page.tsx src/app/contact/page.tsx; do
    if [ -f "$page" ]; then
        SIZE=$(wc -c < "$page")
        LINES=$(wc -l < "$page")
        echo "✓ $page - ${SIZE} bytes (${LINES} lines)"
        cp "$page" "${BACKUP_DIR}/$(basename $(dirname $page))-page.tsx.backup"
    fi
done

# Backup large component files
echo ""
echo "Component Targets:"
for component in src/components/analytics/AnalyticsDashboard.tsx src/components/estimator/EstimatorForm.tsx; do
    if [ -f "$component" ]; then
        SIZE=$(wc -c < "$component")
        LINES=$(wc -l < "$component")
        echo "✓ $component - ${SIZE} bytes (${LINES} lines)"
        cp "$component" "${BACKUP_DIR}/$(basename $component).backup"
    fi
done

# Create directory structure for modular components
echo ""
echo "📁 Creating modular component directories:"
echo "------------------------------------------"

# Page component directories
mkdir -p "src/app/(pages)/home/components"
mkdir -p "src/components/page-sections/hero"
mkdir -p "src/components/page-sections/services"
mkdir -p "src/components/page-sections/features"
mkdir -p "src/components/page-sections/testimonials"
mkdir -p "src/components/page-sections/cta"
mkdir -p "src/components/page-sections/blog"
mkdir -p "src/components/page-sections/values"

echo "✓ Created page section directories"

# Analytics components directory
mkdir -p "src/components/analytics/modules"
mkdir -p "src/components/analytics/charts"
mkdir -p "src/components/analytics/widgets"

echo "✓ Created analytics module directories"

# Estimator components directory  
mkdir -p "src/components/estimator/forms"
mkdir -p "src/components/estimator/steps"
mkdir -p "src/components/estimator/results"

echo "✓ Created estimator module directories"

echo ""
echo "🎯 Phase 2 Preparation Complete!"
echo "================================="
echo "Backup location: ${BACKUP_DIR}"
echo "Directory structure created for modular components"
echo ""
echo "📋 Phase 2 Implementation Plan:"
echo "1. Split page.tsx into section components (~79KB → 5-8 components)"
echo "2. Modularize AnalyticsDashboard.tsx (~42KB → widget components)"
echo "3. Break down EstimatorForm.tsx (~32KB → step components)"
echo "4. Extract shared patterns and optimize imports"
echo ""
echo "Ready to begin Phase 2 implementation!"