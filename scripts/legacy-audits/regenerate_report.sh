#!/bin/bash
REPORT_FILE="docs/development/standards/hero-presence-inventory-2026-05-16.md"
mkdir -p "$(dirname "$REPORT_FILE")"
echo "Scanning routes..."
RESULTS_FILE="temp_results.csv"
echo "Path,Hero" > "$RESULTS_FILE"

# Find all page.tsx files in apps/website/src/app excluding api
find apps/website/src/app -name "page.tsx" | grep -v "/api/" | sort | while read -r page_path; do
    route_dir=$(dirname "$page_path")

    # Define markers
    # 1) 'hero-section'
    # 2) <[A-Z][A-Za-z0-9]*Hero[A-Za-z0-9]*
    # 3) 'PageHero'
    # 4) 'HeroSection'
    
    HERO_FOUND="NO"
    if find "$route_dir" -maxdepth 1 \( -name "*.ts" -o -name "*.tsx" \) -exec grep -lE "hero-section|HeroSection|PageHero|<[A-Z][A-Za-z0-9]*Hero[A-Za-z0-9]*" {} + | grep -q .; then
        HERO_FOUND="YES"
    fi

    echo "$page_path,$HERO_FOUND" >> "$RESULTS_FILE"
done

# Write the report
{
    echo "# Hero Presence Inventory (2026-05-16)"
    echo ""
    echo "Generated on: $(date)"
    echo ""
    echo "## Summary"
    
    TOTAL=$(tail -n +2 "$RESULTS_FILE" | wc -l)
    PRESENT=$(grep ",YES$" "$RESULTS_FILE" | wc -l)
    MISSING=$(grep ",NO$" "$RESULTS_FILE" | wc -l)
    
    echo "- Total Routes: $TOTAL"
    echo "- Hero Present: $PRESENT"
    echo "- Hero Missing: $MISSING"
    echo ""
    
    # Check specifically for the root page
    ROOT_PAGE="apps/website/src/app/page.tsx"
    if grep -q "^$ROOT_PAGE," "$RESULTS_FILE"; then
        ROOT_STATUS=$(grep "^$ROOT_PAGE," "$RESULTS_FILE" | cut -d',' -f2)
        echo "Root Page ($ROOT_PAGE) Hero Status: $ROOT_STATUS"
    else
        echo "Root Page ($ROOT_PAGE) NOT FOUND in scan."
    fi
    echo ""

    echo "## Detailed Inventory"
    echo ""
    echo "| Path | Hero Present |"
    echo "| :--- | :--- |"
    tail -n +2 "$RESULTS_FILE" | sort | while read -r line; do
        PATH_VAL=$(echo "$line" | cut -d',' -f1)
        HERO_VAL=$(echo "$line" | cut -d',' -f2)
        echo "| $PATH_VAL | $HERO_VAL |"
    done
} > "$REPORT_FILE"

rm "$RESULTS_FILE"
echo "Report generated at $REPORT_FILE"
