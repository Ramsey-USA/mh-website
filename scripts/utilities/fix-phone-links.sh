#!/bin/bash

# Fix phone number links that are being treated as file links
echo "📞 Fixing telephone links..."

files_with_phone=(
    "/workspaces/mh-website/README.md"
    "/workspaces/mh-website/docs/project/cta-branding-update-completion-report.md"
    "/workspaces/mh-website/docs/project/cta-quick-reference.md"
    "/workspaces/mh-website/docs/partnerships/partnerships-index.md"
    "/workspaces/mh-website/docs/partnerships/vendor-trade/trade-partnership-guide.md"
    "/workspaces/mh-website/docs/business/branding/brand-overview.md"
    "/workspaces/mh-website/docs/business/branding/branding-index.md"
    "/workspaces/mh-website/docs/business/team-roster.md"
    "/workspaces/mh-website/docs/business/core-values.md"
    "/workspaces/mh-website/docs/business/business-index.md"
    "/workspaces/mh-website/docs/business/government-grant-projects.md"
    "/workspaces/mh-website/docs/business/services.md"
    "/workspaces/mh-website/CONTRIBUTING.md"
)

for file in "${files_with_phone[@]}"; do
    if [ -f "$file" ]; then
        echo "📝 Fixing phone links in: $(basename "$file")"
        
        # Fix markdown syntax for phone links
        sed -i 's/\[tel:+15093086489\]/[(509) 308-6489]/g' "$file"
        sed -i 's/\[tel:+15093086489,100\]/[(509) 308-6489 ext. 100]/g' "$file"
        sed -i 's/\[tel:+15093086489,150\]/[(509) 308-6489 ext. 150]/g' "$file"
        
        echo "  ✅ Fixed phone links in $(basename "$file")"
    fi
done

echo "📞 Phone link fixes complete!"