#!/bin/bash
TOTAL=$(grep -v "Path" results.csv | wc -l)
YES_COUNT=$(grep ",YES" results.csv | wc -l)
NO_COUNT=$(grep ",NO" results.csv | wc -l)

echo "# Hero Presence Inventory (2026-05-16)" > report.md
echo "" >> report.md
echo "## Detection Method" >> report.md
echo "- **Scope:** \`apps/website/src/app/**/page.tsx\` (excluding \`api\`)" >> report.md
echo "- **Depth:** Local relative imports (\`./\` or \`../\`) checked up to depth 2." >> report.md
echo "- **Markers:** \`hero-section\`, \`<[A-Z][a-zA-Z]*Hero\`, \`PageHero\`" >> report.md
echo "" >> report.md
echo "## Summary" >> report.md
echo "- **Total Routes Scanned:** $TOTAL" >> report.md
echo "- **Hero Present:** $YES_COUNT" >> report.md
echo "- **Hero Missing:** $NO_COUNT" >> report.md
echo "" >> report.md

if [ "$NO_COUNT" -eq 0 ]; then
    echo "### Status: PASS" >> report.md
else
    echo "### Status: FAIL" >> report.md
fi
echo "" >> report.md

echo "## Missing Hero Routes" >> report.md
grep ",NO" results.csv | cut -d',' -f1 | sed 's/^/- /' >> report.md
echo "" >> report.md

echo "## Hero-Present Routes" >> report.md
grep ",YES" results.csv | cut -d',' -f1 | sed 's/^/- /' >> report.md

mv report.md docs/development/standards/hero-presence-inventory-2026-05-16.md

echo "Summary:"
echo "Total: $TOTAL"
echo "Hero Present: $YES_COUNT"
echo "Hero Missing: $NO_COUNT"
echo ""
echo "First 20 Missing Routes:"
grep ",NO" results.csv | cut -d',' -f1 | head -n 20
