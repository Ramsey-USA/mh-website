#!/bin/bash

# Script to standardize all imports to use @/ absolute paths
# Part of Consistency Master Plan - Phase 2

set -e

echo "🔄 Starting import standardization..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Backup directory
BACKUP_DIR="/workspaces/mh-website/backups/import-standardization-$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo "📦 Creating backup at: $BACKUP_DIR"

# Count total files to process
TOTAL_FILES=$(find /workspaces/mh-website/src -type f \( -name "*.tsx" -o -name "*.ts" \) | wc -l)
echo "📊 Found $TOTAL_FILES TypeScript files to process"
echo ""

# Counter for modified files
MODIFIED_COUNT=0

# Process each TypeScript file
find /workspaces/mh-website/src -type f \( -name "*.tsx" -o -name "*.ts" \) | while read -r file; do
    # Skip if file doesn't exist (shouldn't happen but safety first)
    [ ! -f "$file" ] && continue
    
    # Create backup
    cp "$file" "$BACKUP_DIR/$(basename "$file").backup"
    
    # Track if file was modified
    ORIGINAL=$(cat "$file")
    
    # Replace relative imports with absolute @/ imports
    # Pattern 1: ../../../components/ -> @/components/
    sed -i 's|from ["\x27]\.\./\.\./\.\./components/|from "@/components/|g' "$file"
    
    # Pattern 2: ../../components/ -> @/components/
    sed -i 's|from ["\x27]\.\./\.\./components/|from "@/components/|g' "$file"
    
    # Pattern 3: ../components/ -> @/components/
    sed -i 's|from ["\x27]\.\./components/|from "@/components/|g' "$file"
    
    # Pattern 4: ./components/ -> @/components/ (rare but possible)
    sed -i 's|from ["\x27]\./components/|from "@/components/|g' "$file"
    
    # Same for hooks
    sed -i 's|from ["\x27]\.\./\.\./\.\./hooks/|from "@/hooks/|g' "$file"
    sed -i 's|from ["\x27]\.\./\.\./hooks/|from "@/hooks/|g' "$file"
    sed -i 's|from ["\x27]\.\./hooks/|from "@/hooks/|g' "$file"
    sed -i 's|from ["\x27]\./hooks/|from "@/hooks/|g' "$file"
    
    # Same for lib
    sed -i 's|from ["\x27]\.\./\.\./\.\./lib/|from "@/lib/|g' "$file"
    sed -i 's|from ["\x27]\.\./\.\./lib/|from "@/lib/|g' "$file"
    sed -i 's|from ["\x27]\.\./lib/|from "@/lib/|g' "$file"
    sed -i 's|from ["\x27]\./lib/|from "@/lib/|g' "$file"
    
    # Same for types
    sed -i 's|from ["\x27]\.\./\.\./\.\./types/|from "@/types/|g' "$file"
    sed -i 's|from ["\x27]\.\./\.\./types/|from "@/types/|g' "$file"
    sed -i 's|from ["\x27]\.\./types/|from "@/types/|g' "$file"
    sed -i 's|from ["\x27]\./types/|from "@/types/|g' "$file"
    
    # Same for contexts
    sed -i 's|from ["\x27]\.\./\.\./\.\./contexts/|from "@/contexts/|g' "$file"
    sed -i 's|from ["\x27]\.\./\.\./contexts/|from "@/contexts/|g' "$file"
    sed -i 's|from ["\x27]\.\./contexts/|from "@/contexts/|g' "$file"
    sed -i 's|from ["\x27]\./contexts/|from "@/contexts/|g' "$file"
    
    # Same for middleware
    sed -i 's|from ["\x27]\.\./\.\./\.\./middleware/|from "@/middleware/|g' "$file"
    sed -i 's|from ["\x27]\.\./\.\./middleware/|from "@/middleware/|g' "$file"
    sed -i 's|from ["\x27]\.\./middleware/|from "@/middleware/|g' "$file"
    sed -i 's|from ["\x27]\./middleware/|from "@/middleware/|g' "$file"
    
    # Same for app directory (less common but possible)
    sed -i 's|from ["\x27]\.\./\.\./\.\./app/|from "@/app/|g' "$file"
    sed -i 's|from ["\x27]\.\./\.\./app/|from "@/app/|g' "$file"
    sed -i 's|from ["\x27]\.\./app/|from "@/app/|g' "$file"
    
    MODIFIED=$(cat "$file")
    
    if [ "$ORIGINAL" != "$MODIFIED" ]; then
        echo "✅ Modified: $file"
        MODIFIED_COUNT=$((MODIFIED_COUNT + 1))
    fi
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ Import standardization complete!"
echo "📝 Modified files: $MODIFIED_COUNT"
echo "💾 Backup location: $BACKUP_DIR"
echo ""
echo "Next steps:"
echo "1. Run: npm run lint"
echo "2. Run: npm run type-check"
echo "3. Test the application"
echo "4. If successful, commit changes"
echo "5. If issues occur, restore from backup"
