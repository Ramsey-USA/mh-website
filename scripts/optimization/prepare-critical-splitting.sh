#!/bin/bash

# MH Construction - Critical File Splitting Implementation
# Phase 1: Split the largest performance bottlenecks

set -e

echo "🚀 MH Construction - Phase 1 Critical File Splitting"
echo "===================================================="

BACKUP_DIR="backups/critical-splitting-$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo ""
echo "📁 Creating backup directory: $BACKUP_DIR"

# Function to backup a file
backup_file() {
    local file="$1"
    if [ -f "$file" ]; then
        cp "$file" "$BACKUP_DIR/$(basename "$file").backup"
        echo "✅ Backed up: $file"
    fi
}

echo ""
echo "🔄 PHASE 1A: Preparing militaryConstructionAI.ts split"
echo "====================================================="

# Backup the massive AI file
backup_file "src/lib/militaryConstructionAI.ts"

# Create directory structure for split AI files
mkdir -p src/lib/ai/{core,estimator,veteran,types}

echo "📂 Created directory structure:"
echo "   src/lib/ai/core/          - Core AI functionality"
echo "   src/lib/ai/estimator/     - Cost estimation logic" 
echo "   src/lib/ai/veteran/       - Veteran-specific AI"
echo "   src/lib/ai/types/         - Type definitions"

echo ""
echo "🔄 PHASE 1B: Preparing page.tsx split"
echo "====================================="

# Backup the massive home page
backup_file "src/app/page.tsx"

# Create directory structure for home page components
mkdir -p src/components/home/{sections,features}

echo "📂 Created directory structure:"
echo "   src/components/home/sections/  - Main page sections"
echo "   src/components/home/features/  - Feature components"

echo ""
echo "🔄 PHASE 1C: Preparing other large files"
echo "========================================"

# Backup other large files
backup_file "src/lib/veteran/VeteranProfileEngine.ts"
backup_file "src/components/analytics/AnalyticsDashboard.tsx"
backup_file "src/app/about/page.tsx"

# Create structures for these files
mkdir -p src/lib/veteran/{engines,types,utils}
mkdir -p src/components/analytics/{dashboards,charts,metrics}
mkdir -p src/components/about/{sections,features}

echo ""
echo "📋 SPLITTING PLAN CREATED"
echo "========================="
echo ""
echo "🎯 Next Steps (Manual Implementation Required):"
echo ""
echo "1. MILITARYAI SPLIT:"
echo "   • Move AI core logic → src/lib/ai/core/AIEngine.ts"
echo "   • Move cost estimation → src/lib/ai/estimator/CostAnalyzer.ts"
echo "   • Move veteran AI → src/lib/ai/veteran/VeteranAI.ts"
echo "   • Create clean exports → src/lib/ai/index.ts"
echo ""
echo "2. HOME PAGE SPLIT:"
echo "   • Extract hero section → src/components/home/sections/HeroSection.tsx"
echo "   • Extract services → src/components/home/sections/ServicesSection.tsx"
echo "   • Extract AI features → src/components/home/sections/AIFeaturesSection.tsx"
echo "   • Extract testimonials → src/components/home/sections/TestimonialsSection.tsx"
echo ""
echo "3. VETERAN ENGINE SPLIT:"
echo "   • Core engine → src/lib/veteran/engines/ProfileEngine.ts"
echo "   • Benefits logic → src/lib/veteran/engines/BenefitsEngine.ts"
echo "   • Type definitions → src/lib/veteran/types/index.ts"
echo ""
echo "4. ANALYTICS SPLIT:"
echo "   • Main dashboard → src/components/analytics/dashboards/MainDashboard.tsx"
echo "   • User behavior → src/components/analytics/dashboards/UserBehaviorDashboard.tsx"
echo "   • Performance → src/components/analytics/dashboards/PerformanceDashboard.tsx"
echo ""
echo "🔧 TESTING AFTER SPLITS:"
echo "========================"
echo "After each split, run:"
echo "  npm run type-check    # Verify TypeScript"
echo "  npm run lint         # Check code quality"
echo "  npm run build        # Test build process"
echo "  npm run dev          # Test functionality"
echo ""
echo "📊 EXPECTED RESULTS:"
echo "==================="
echo "• militaryConstructionAI.ts: 104KB → ~15-20KB per module"
echo "• page.tsx: 71KB → ~10-15KB per section"
echo "• Build time: 44s → 25-30s (30% improvement)"
echo "• Bundle size: 25% reduction"
echo "• Easier maintenance and debugging"
echo ""
echo "⚠️  IMPORTANT NOTES:"
echo "==================="
echo "• Keep all existing functionality intact"
echo "• Update imports across the codebase after splitting"
echo "• Test thoroughly before committing changes"
echo "• Use @/ imports for all new files"
echo ""
echo "✅ Phase 1 preparation complete!"
echo "   Backups saved to: $BACKUP_DIR"
echo "   Ready for manual file splitting implementation"