#!/bin/bash

# MH Construction - Systematic Link Fix Script
# Fixes common broken link patterns after reorganization

echo "🔧 MH Construction - Systematic Link Fix"
echo "======================================"

# Function to update links in a file
fix_links_in_file() {
    local file="$1"
    
    if [ ! -f "$file" ]; then
        echo "⚠️  File not found: $file"
        return 1
    fi
    
    echo "📝 Fixing links in: $(basename "$file")"
    
    # Fix common UPPER_CASE to kebab-case patterns in links
    sed -i 's|SERVICES\.md|services.md|g' "$file"
    sed -i 's|CORE_VALUES\.md|core-values.md|g' "$file"
    sed -i 's|TEAM_ROSTER\.md|team-roster.md|g' "$file"
    sed -i 's|GOVERNMENT_GRANT_PROJECTS\.md|government-grant-projects.md|g' "$file"
    sed -i 's|MH_BRANDING\.md|mh-branding.md|g' "$file"
    sed -i 's|COMPANY_PROFILE\.md|company-profile.md|g' "$file"
    sed -i 's|DEVELOPMENT_HISTORY\.md|development-history.md|g' "$file"
    sed -i 's|FIREBASE_SETUP\.md|firebase-setup.md|g' "$file"
    sed -i 's|VSCODE_EXTENSIONS_GUIDE\.md|vscode-extensions-guide.md|g' "$file"
    sed -i 's|TERMINOLOGY_GUIDE\.md|terminology-guide.md|g' "$file"
    sed -i 's|DEVELOPMENT_STANDARDS\.md|development-standards.md|g' "$file"
    sed -i 's|AI_DEVELOPMENT_GUIDELINES\.md|ai-development-guidelines.md|g' "$file"
    sed -i 's|ICON_USAGE_REFERENCE\.md|icon-usage-reference.md|g' "$file"
    sed -i 's|FILE_MANAGEMENT\.md|file-management.md|g' "$file"
    sed -i 's|TEAM_CARD_HOVER_FIX\.md|team-card-hover-fix.md|g' "$file"
    sed -i 's|BASEBALL_CARD_CLEANUP\.md|baseball-card-cleanup.md|g' "$file"
    
    # Fix technical files
    sed -i 's|FEATURES\.md|features.md|g' "$file"
    sed -i 's|PAGE_LAYOUT_STANDARDS\.md|page-layout-standards.md|g' "$file"
    sed -i 's|PAGE_LAYOUT_QUICK_START\.md|page-layout-quick-start.md|g' "$file"
    sed -i 's|ICON_SYSTEM_QUICK_REFERENCE\.md|icon-system-quick-reference.md|g' "$file"
    sed -i 's|ICON-SYSTEM-QUICK-REFERENCE\.md|icon-system-quick-reference.md|g' "$file"
    sed -i 's|ICON_HOVER_EFFECTS_GUIDE\.md|icon-hover-effects-guide.md|g' "$file"
    sed -i 's|CSS_JS_COHESION\.md|css-js-cohesion.md|g' "$file"
    sed -i 's|NAVIGATION_ARCHITECTURE\.md|navigation-architecture.md|g' "$file"
    sed -i 's|NAVIGATION_TECHNICAL_GUIDE\.md|navigation-technical-guide.md|g' "$file"
    sed -i 's|NAVIGATION_AUDIT_REPORT\.md|navigation-audit-report.md|g' "$file"
    sed -i 's|TROUBLESHOOTING_BUILD_ERRORS\.md|troubleshooting-build-errors.md|g' "$file"
    
    # Fix branding files
    sed -i 's|BRANDING_INDEX\.md|branding-index.md|g' "$file"
    sed -i 's|BRAND_OVERVIEW\.md|brand-overview.md|g' "$file"
    sed -i 's|COLOR_SYSTEM\.md|color-system.md|g' "$file"
    sed -i 's|TYPOGRAPHY\.md|typography.md|g' "$file"
    sed -i 's|ICON_POLICY\.md|icon-policy.md|g' "$file"
    sed -i 's|MESSAGING\.md|messaging.md|g' "$file"
    sed -i 's|IMPLEMENTATION_GUIDE\.md|implementation-guide.md|g' "$file"
    
    # Fix project files
    sed -i 's|CLEANUP_QUICK_GUIDE\.md|cleanup-quick-guide.md|g' "$file"
    sed -i 's|CODEBASE_AUDIT_REPORT\.md|codebase-audit-report.md|g' "$file"
    sed -i 's|COMPLETE_IMPLEMENTATION_GUIDE\.md|complete-implementation-guide.md|g' "$file"
    sed -i 's|CONSISTENCY_MASTER_PLAN\.md|consistency-master-plan.md|g' "$file"
    sed -i 's|CTA_QUICK_REFERENCE\.md|cta-quick-reference.md|g' "$file"
    sed -i 's|SERVICE_CARDS_VISUAL_GUIDE\.md|service-cards-visual-guide.md|g' "$file"
    sed -i 's|UNNECESSARY_FILES_ANALYSIS\.md|unnecessary-files-analysis.md|g' "$file"
    
    # Fix reference files  
    sed -i 's|DEVELOPER_CHECKLIST\.md|developer-checklist.md|g' "$file"
    sed -i 's|ICON_SIZE_TROUBLESHOOTING\.md|icon-size-troubleshooting.md|g' "$file"
    sed -i 's|REFERENCE_INDEX\.md|reference-index.md|g' "$file"
    sed -i 's|DEVELOPMENT_GUIDELINES\.md|development-guidelines.md|g' "$file"
    
    # Remove telephone links that are being treated as file links
    sed -i 's|\[tel:+15093086489\](tel:+15093086489)|[(509) 308-6489](tel:+15093086489)|g' "$file"
    sed -i 's|\[tel:+15093086489,100\](tel:+15093086489,100)|[(509) 308-6489 ext. 100](tel:+15093086489,100)|g' "$file"
    sed -i 's|\[tel:+15093086489,150\](tel:+15093086489,150)|[(509) 308-6489 ext. 150](tel:+15093086489,150)|g' "$file"
    
    # Fix broken archive references
    sed -i 's|PHASE_CONSOLIDATION_PLAN\.md|../archive/completed-phases/PHASE_CONSOLIDATION_PLAN.md|g' "$file"
    sed -i 's|IMPLEMENTATION_SUMMARY\.md|../archive/redundant-reports/IMPLEMENTATION_SUMMARY.md|g' "$file"
    sed -i 's|CTA_BRANDING_UPDATE_PHASES\.md|../archive/redundant-reports/CTA_BRANDING_UPDATE_PHASES.md|g' "$file"
    sed -i 's|CTA_REVIEW_SUMMARY\.md|../archive/redundant-reports/CTA_REVIEW_SUMMARY.md|g' "$file"
    
    echo "  ✅ Updated links in $(basename "$file")"
}

# Counter for files processed
files_processed=0

echo ""
echo "🔍 Processing all markdown files..."

# Find and fix all markdown files (excluding archives since they're historical)
while IFS= read -r -d '' file; do
    fix_links_in_file "$file"
    ((files_processed++))
done < <(find /workspaces/mh-website -name "*.md" -not -path "*/archive/*" -not -path "*/backups/*" -not -path "*/.git/*" -not -path "*/node_modules/*" -print0)

echo ""
echo "🎉 Link fixing complete!"
echo "📊 Files processed: $files_processed"
echo ""
echo "🔍 Next: Run link validation again to check results"