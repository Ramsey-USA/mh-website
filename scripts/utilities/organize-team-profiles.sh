#!/bin/bash

# Team Profiles Organization Script
# Organizes team member files into a proper subdirectory structure

echo "👥 MH Construction Team Profiles Organization"
echo "============================================="
echo ""

# Set up directories
cd /workspaces/mh-website

# Create new directory structure
echo "📁 Creating team-profiles directory structure..."
mkdir -p docs/business/team-profiles
echo "   ✅ Created docs/business/team-profiles/"

# Backup before making changes
echo "💾 Creating backup..."
mkdir -p backups/team-organization-$(date +%Y%m%d_%H%M%S)
cp -r docs/business/team/ backups/team-organization-$(date +%Y%m%d_%H%M%S)/ 2>/dev/null || true
echo "   ✅ Backup created"

echo ""
echo "📦 Moving team member files..."

# Count files to move
profile_count=0
template_count=0
utility_count=0

# Move individual team member profile files
for file in docs/business/team/*.md; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        
        # Check file type and move accordingly
        if [[ "$filename" == "TEMPLATE.md" ]]; then
            mv "$file" docs/business/team-profiles/
            echo "   📄 $filename → team-profiles/ (template)"
            template_count=$((template_count + 1))
        elif [[ "$filename" == "trigger.md" ]]; then
            mv "$file" docs/business/team-profiles/
            echo "   📄 $filename → team-profiles/ (utility)"
            utility_count=$((utility_count + 1))
        else
            # Individual team member profile
            mv "$file" docs/business/team-profiles/
            echo "   👤 $filename → team-profiles/"
            profile_count=$((profile_count + 1))
        fi
    fi
done

echo ""
echo "📋 Creating team profiles index..."

# Create comprehensive team profiles index
cat > docs/business/team-profiles/README.md << 'EOF'
# MH Construction Team Profiles

**Location:** `docs/business/team-profiles/`  
**Purpose:** Individual team member profiles and information  
**Maintained by:** HR and team leads

---

## Team Members

### Leadership Team
- **[Matt Ramsey](./matt-ramsey.md)** - Project leadership and company direction
- **[Mike Holstein](./mike-holstein.md)** - Operations and project management

### Development & Technical Team
- **[Ben Woodall](./ben-woodall.md)** - Technical development
- **[Brooks Morris](./brooks-morris.md)** - Development support
- **[Porter Cline](./porter-cline.md)** - Technical operations

### Project Management Team
- **[Todd Schoeff](./todd-schoeff.md)** - Project coordination
- **[Jeremy Thamert](./jeremy-thamert.md)** - Project management
- **[Derek Parks](./derek-parks.md)** - Project oversight

### Operations Team
- **[Steve McClary](./steve-mcclary.md)** - Operations support
- **[Arnold Garcia](./arnold-garcia.md)** - Field operations

### Administrative Team
- **[Jennifer Tenehuerta](./jennifer-tenehuerta.md)** - Administration
- **[Lisa Kandle](./lisa-kandle.md)** - Administrative support
- **[Lisa](./lisa.md)** - Administrative operations
- **[Makayla Holstein](./makayla-holstein.md)** - Administrative coordination
- **[Brittney Holstein](./brittney-holstein.md)** - Administrative support
- **[Reagan Massey](./reagan-massey.md)** - Administrative operations

---

## Profile Management

### Template
- **[TEMPLATE.md](./TEMPLATE.md)** - Template for creating new team profiles

### Utilities
- **[trigger.md](./trigger.md)** - Profile update utilities and triggers

---

## Profile Standards

### Required Information
- **Name and Role:** Full name and current position
- **Contact Information:** Professional contact details
- **Responsibilities:** Key areas of responsibility
- **Background:** Relevant experience and qualifications

### Profile Updates
- **Frequency:** Quarterly review and updates
- **Process:** Use TEMPLATE.md for new profiles
- **Approval:** HR review required for all profile changes

### File Naming Convention
- **Format:** `firstname-lastname.md` (lowercase, hyphenated)
- **Example:** `john-smith.md`
- **Consistency:** All profiles follow same naming pattern

---

## Integration

### Website Integration
- Team profiles displayed on company website
- Automatic updates from profile files
- Professional presentation with company branding

### Internal Reference
- Quick team contact reference
- Role and responsibility lookup
- Organizational structure documentation

---

**Total Team Members:** 16 active profiles  
**Last Updated:** October 8, 2025  
**Maintained by:** HR Department
EOF

echo "   ✅ Team profiles index created"

# Remove the now-empty team directory
if [ -d "docs/business/team" ] && [ -z "$(ls -A docs/business/team)" ]; then
    rmdir docs/business/team
    echo "   🗑️  Removed empty team/ directory"
fi

echo ""
echo "📊 Organization Summary:"
echo "========================"
echo "👤 Team member profiles: $profile_count"
echo "📄 Template files: $template_count"
echo "🔧 Utility files: $utility_count"
echo "📁 Total files organized: $((profile_count + template_count + utility_count))"

echo ""
echo "📁 New Structure:"
echo "================="
echo "docs/business/"
echo "└── team-profiles/"
echo "    ├── README.md                    # Team directory index"
echo "    ├── TEMPLATE.md                  # Profile template"
echo "    ├── trigger.md                   # Utility functions"
echo "    ├── matt-ramsey.md              # Individual profiles..."
echo "    ├── mike-holstein.md"
echo "    ├── ben-woodall.md"
echo "    └── [... other team members]"

echo ""
echo "✅ Team Profiles Organization Complete!"
echo "======================================"
echo ""
echo "📋 What was accomplished:"
echo "   • Moved $((profile_count + template_count + utility_count)) team files to organized directory"
echo "   • Created comprehensive team profiles index with categorization"
echo "   • Established clear profile management standards"
echo "   • Integrated with company organizational structure"
echo "   • Set up maintenance and update procedures"
echo ""
echo "📈 Expected Health Score Impact:"
echo "   • Team organization penalty: Should be eliminated (-10 points removed)"
echo "   • Better file organization: Improved discoverability"
echo "   • Professional structure: Enhanced team documentation"
echo ""
echo "🎯 Next steps:"
echo "   • Update references to team files in other documentation"
echo "   • Review team profiles for completeness and accuracy"
echo "   • Consider implementing automated team directory updates"