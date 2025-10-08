#!/bin/bash

# MH Website Phase Consolidation Script
# Automatically organizes and consolidates phase documentation

echo "🗂️  MH Construction Phase Consolidation"
echo "======================================="
echo ""

# Set up directories
cd /workspaces/mh-website

# Create new directory structure
echo "📁 Creating new directory structure..."
mkdir -p docs/project/archive/phases/completed/{phase-1-foundation,phase-2-documentation,phase-3-ux,phase-4-business,phase-6-advanced,phase-7-testing}
mkdir -p docs/project/planning
echo "   ✅ Directory structure created"

# Backup before making changes
echo "💾 Creating backup..."
mkdir -p backups/phase-consolidation-$(date +%Y%m%d_%H%M%S)
cp -r docs/project/PHASE_*.md backups/phase-consolidation-$(date +%Y%m%d_%H%M%S)/ 2>/dev/null || true
echo "   ✅ Backup created"

echo ""
echo "📦 Moving completed phases to archive..."

# Phase 1 - Foundation
echo "   📂 Phase 1 (Foundation)..."
[ -f "docs/project/PHASE_1_FOUNDATION_PERFORMANCE.md" ] && mv docs/project/PHASE_1_FOUNDATION_PERFORMANCE.md docs/project/archive/phases/completed/phase-1-foundation/
[ -f "docs/project/PHASE_1_CLEANUP_SUMMARY.md" ] && mv docs/project/PHASE_1_CLEANUP_SUMMARY.md docs/project/archive/phases/completed/phase-1-foundation/

# Phase 2 - Documentation  
echo "   📂 Phase 2 (Documentation)..."
[ -f "docs/project/PHASE_2_DOCUMENTATION_REORGANIZATION.md" ] && mv docs/project/PHASE_2_DOCUMENTATION_REORGANIZATION.md docs/project/archive/phases/completed/phase-2-documentation/
[ -f "docs/project/PHASE_2_PROGRESS_REPORT.md" ] && mv docs/project/PHASE_2_PROGRESS_REPORT.md docs/project/archive/phases/completed/phase-2-documentation/

# Phase 3 - UX
echo "   📂 Phase 3 (User Experience)..."
[ -f "docs/project/PHASE_3_USER_EXPERIENCE_INTERFACE.md" ] && mv docs/project/PHASE_3_USER_EXPERIENCE_INTERFACE.md docs/project/archive/phases/completed/phase-3-ux/
[ -f "docs/project/PHASE_3_CONSOLIDATION_COMPLETE.md" ] && mv docs/project/PHASE_3_CONSOLIDATION_COMPLETE.md docs/project/archive/phases/completed/phase-3-ux/

# Phase 4 - Business
echo "   📂 Phase 4 (Business Integration)..."
[ -f "docs/project/PHASE_4_3_VETERAN_PRIORITY_SYSTEM.md" ] && mv docs/project/PHASE_4_3_VETERAN_PRIORITY_SYSTEM.md docs/project/archive/phases/completed/phase-4-business/
[ -f "docs/project/PHASE_4B_CONFIG_OVERHAUL_COMPLETE.md" ] && mv docs/project/PHASE_4B_CONFIG_OVERHAUL_COMPLETE.md docs/project/archive/phases/completed/phase-4-business/

# Phase 6 - Advanced Features
echo "   📂 Phase 6 (Advanced Features)..."
[ -f "docs/project/PHASE_6_ADVANCED_FEATURES.md" ] && mv docs/project/PHASE_6_ADVANCED_FEATURES.md docs/project/archive/phases/completed/phase-6-advanced/

# Phase 7 - Testing
echo "   📂 Phase 7 (Testing & Deployment)..."
[ -f "docs/project/PHASE_7_TESTING_DEPLOYMENT_EXCELLENCE.md" ] && mv docs/project/PHASE_7_TESTING_DEPLOYMENT_EXCELLENCE.md docs/project/archive/phases/completed/phase-7-testing/
[ -f "docs/project/PHASE_7_5_PRE_LAUNCH_TESTING.md" ] && mv docs/project/PHASE_7_5_PRE_LAUNCH_TESTING.md docs/project/archive/phases/completed/phase-7-testing/

echo ""
echo "🔮 Moving future phases to planning directory..."
[ -f "docs/project/PHASE_8_SECURITY_COMPLIANCE.md" ] && mv docs/project/PHASE_8_SECURITY_COMPLIANCE.md docs/project/planning/
[ -f "docs/project/PHASE_9_SCALABILITY_INFRASTRUCTURE.md" ] && mv docs/project/PHASE_9_SCALABILITY_INFRASTRUCTURE.md docs/project/planning/
[ -f "docs/project/PHASE_10_INNOVATION_FUTURE.md" ] && mv docs/project/PHASE_10_INNOVATION_FUTURE.md docs/project/planning/

echo ""
echo "🎯 Consolidating optimization phases..."

# Check if optimization files exist and consolidate them
if [ -f "docs/project/PHASE_5_OPTIMIZATION_PLAN.md" ] && [ -f "docs/project/PHASE_5_OPTIMIZATION_ROADMAP.md" ]; then
    echo "   📝 Creating consolidated optimization document..."
    
    # Create consolidated optimization file
    cat > docs/project/PHASE_5_CURRENT_OPTIMIZATION.md << 'EOF'
# Phase 5: Current Optimization Plan

**Status:** Active  
**Priority:** High  
**Consolidated:** October 8, 2025

This document consolidates the optimization plan and roadmap for Phase 5.

---

## Optimization Plan

EOF
    
    # Append content from optimization plan (skip header)
    echo "### From PHASE_5_OPTIMIZATION_PLAN.md" >> docs/project/PHASE_5_CURRENT_OPTIMIZATION.md
    tail -n +3 docs/project/PHASE_5_OPTIMIZATION_PLAN.md >> docs/project/PHASE_5_CURRENT_OPTIMIZATION.md
    
    echo "" >> docs/project/PHASE_5_CURRENT_OPTIMIZATION.md
    echo "---" >> docs/project/PHASE_5_CURRENT_OPTIMIZATION.md
    echo "" >> docs/project/PHASE_5_CURRENT_OPTIMIZATION.md
    echo "## Optimization Roadmap" >> docs/project/PHASE_5_CURRENT_OPTIMIZATION.md
    echo "" >> docs/project/PHASE_5_CURRENT_OPTIMIZATION.md
    
    # Append content from optimization roadmap (skip header)
    echo "### From PHASE_5_OPTIMIZATION_ROADMAP.md" >> docs/project/PHASE_5_CURRENT_OPTIMIZATION.md
    tail -n +3 docs/project/PHASE_5_OPTIMIZATION_ROADMAP.md >> docs/project/PHASE_5_CURRENT_OPTIMIZATION.md
    
    # Move original files to archive
    mkdir -p docs/project/archive/phases/consolidated
    mv docs/project/PHASE_5_OPTIMIZATION_PLAN.md docs/project/archive/phases/consolidated/
    mv docs/project/PHASE_5_OPTIMIZATION_ROADMAP.md docs/project/archive/phases/consolidated/
    
    echo "   ✅ Optimization phases consolidated into PHASE_5_CURRENT_OPTIMIZATION.md"
else
    echo "   ⚠️  Optimization files not found or already moved"
fi

# Create archive index
echo ""
echo "📋 Creating archive index..."
cat > docs/project/archive/phases/README.md << 'EOF'
# Completed Phases Archive

This directory contains all completed project phases, organized by topic for easy reference.

## Directory Structure

```
completed/
├── phase-1-foundation/     # Foundation and performance work
├── phase-2-documentation/  # Documentation reorganization  
├── phase-3-ux/            # User experience and interface
├── phase-4-business/      # Business integration features
├── phase-6-advanced/      # Advanced platform features
└── phase-7-testing/       # Testing and deployment work
```

## Consolidated Files

```
consolidated/              # Original files that were merged
└── optimization/         # Phase 5 optimization files (pre-consolidation)
```

---

**Note:** These phases are complete and archived for reference. Active work should reference current phase documents in the main project directory.
EOF

echo "   ✅ Archive index created"

# Create planning index
echo ""
echo "📋 Creating planning index..."
cat > docs/project/planning/README.md << 'EOF'
# Future Phases Planning

This directory contains planning documents for future development phases.

## Planned Phases

- **Phase 8:** Security & Compliance (Q1 2026)
- **Phase 9:** Scalability & Infrastructure (Q2 2026)  
- **Phase 10:** Innovation & Future Features (Q3 2026+)

## Status

All phases in this directory are in **planning status** and not yet active.

---

**Note:** These are planning documents. When phases become active, move them to the main project directory.
EOF

echo "   ✅ Planning index created"

echo ""
echo "📊 Consolidation Summary:"
echo "========================"

# Count files in each area
archived_count=$(find docs/project/archive/phases/completed -name "*.md" | wc -l)
planning_count=$(find docs/project/planning -name "*.md" -not -name "README.md" | wc -l)
active_count=$(find docs/project -maxdepth 1 -name "PHASE_*.md" | wc -l)

echo "📁 Archived phases: $archived_count files"
echo "🔮 Planning phases: $planning_count files"  
echo "🎯 Active phases: $active_count files"

echo ""
echo "📂 Remaining active phase files:"
find docs/project -maxdepth 1 -name "PHASE_*.md" | while read file; do
    echo "   📄 $(basename "$file")"
done

echo ""
echo "✅ Phase Consolidation Complete!"
echo "================================"
echo ""
echo "📋 What was accomplished:"
echo "   • Moved completed phases to organized archive"
echo "   • Consolidated duplicate optimization files"
echo "   • Organized future phases in planning directory"
echo "   • Created index files for navigation"
echo "   • Reduced main directory clutter significantly"
echo ""
echo "📁 New structure:"
echo "   • docs/project/archive/phases/completed/ - All completed work"
echo "   • docs/project/planning/ - Future planning documents"
echo "   • docs/project/ - Only active current work"
echo ""
echo "🎯 Next steps:"
echo "   • Review remaining active phases for current relevance"
echo "   • Update references in navigation files"
echo "   • Consider if any remaining phases should also be archived"