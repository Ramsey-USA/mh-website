#!/bin/bash

# MH Website Documentation Optimization Script
# Phase 1: Immediate Fixes

echo "🚀 Starting MH Website Documentation Optimization..."
echo "Phase 1: Immediate Fixes"
echo "================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# 1. Rename /docs/README.md to /docs/NAVIGATION.md
echo "📝 Step 1: Renaming docs/README.md to docs/NAVIGATION.md..."
if [ -f "docs/README.md" ]; then
    mv docs/README.md docs/NAVIGATION.md
    echo "   ✅ Renamed docs/README.md → docs/NAVIGATION.md"
else
    echo "   ⚠️  docs/README.md not found"
fi

# 2. Remove redundant DOCUMENTATION_INDEX.md
echo "📝 Step 2: Removing redundant DOCUMENTATION_INDEX.md..."
if [ -f "docs/DOCUMENTATION_INDEX.md" ]; then
    rm docs/DOCUMENTATION_INDEX.md
    echo "   ✅ Removed docs/DOCUMENTATION_INDEX.md"
else
    echo "   ⚠️  docs/DOCUMENTATION_INDEX.md not found"
fi

# 3. Update references in common files
echo "📝 Step 3: Updating file references..."

# Find and update references to the old README.md
echo "   🔍 Searching for references to docs/README.md..."
grep -r "docs/README.md" docs/ --include="*.md" | head -5 | while read -r line; do
    echo "   📍 Found: $line"
done

# Find and update references to DOCUMENTATION_INDEX.md
echo "   🔍 Searching for references to DOCUMENTATION_INDEX.md..."
grep -r "DOCUMENTATION_INDEX.md" docs/ --include="*.md" | head -5 | while read -r line; do
    echo "   📍 Found: $line"
done

# 4. Create a backup of the current structure
echo "📝 Step 4: Creating backup of current documentation structure..."
mkdir -p backups
find docs/ -name "*.md" > backups/documentation_files_$(date +%Y%m%d_%H%M%S).txt
echo "   ✅ Backup created in backups/ directory"

# 5. Generate initial documentation manifest
echo "📝 Step 5: Generating initial documentation manifest..."
cat > docs/MANIFEST.md << 'EOF'
# MH Construction Documentation Manifest

**Generated:** $(date)  
**Total Files:** $(find docs/ -name "*.md" | wc -l)  
**Status:** Phase 1 Optimization Complete

---

## File Categories

### Business Documentation
```
$(find docs/business/ -name "*.md" 2>/dev/null | wc -l) files
```

### Development Documentation  
```
$(find docs/development/ -name "*.md" 2>/dev/null | wc -l) files
```

### Project Documentation
```
$(find docs/project/ -name "*.md" 2>/dev/null | wc -l) files
```

### Technical Documentation
```
$(find docs/technical/ -name "*.md" 2>/dev/null | wc -l) files
```

### Standards Documentation
```
$(find docs/standards/ -name "*.md" 2>/dev/null | wc -l) files
```

### Reference Documentation
```
$(find docs/reference/ -name "*.md" 2>/dev/null | wc -l) files
```

---

## Navigation Structure

- **Main Navigation**: [NAVIGATION.md](./NAVIGATION.md)
- **Templates**: [templates/](./templates/)
- **Archive**: [project/archive/](./project/archive/)

---

## Maintenance Notes

- **Last Updated**: $(date)
- **Optimization Phase**: 1 of 4 Complete
- **Next Phase**: Organization & Restructuring
EOF

# Evaluate the manifest template
eval "echo \"$(cat docs/MANIFEST.md)\"" > docs/MANIFEST.md.tmp
mv docs/MANIFEST.md.tmp docs/MANIFEST.md

echo "   ✅ Initial manifest created: docs/MANIFEST.md"

echo ""
echo "✅ Phase 1 Optimization Complete!"
echo "================================"
echo ""
echo "📊 Summary:"
echo "   • Renamed documentation index for clarity"
echo "   • Removed redundant documentation files"
echo "   • Created documentation manifest"
echo "   • Generated backup of current structure"
echo ""
echo "📋 Next Steps:"
echo "   • Run Phase 2: Organization & Restructuring"
echo "   • Review and update file references manually"
echo "   • Consider implementing automated tracking"
echo ""
echo "📁 Files Created/Modified:"
echo "   • docs/NAVIGATION.md (renamed from docs/README.md)"
echo "   • docs/MANIFEST.md (new documentation manifest)"
echo "   • backups/documentation_files_*.txt (structure backup)"
echo ""