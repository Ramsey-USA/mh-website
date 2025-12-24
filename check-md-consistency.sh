#!/bin/bash
# Script to check markdown files for inconsistencies with home page standards

echo "🔍 Checking Markdown File Consistency..."
echo "========================================"
echo ""

# Find all markdown files except node_modules
files=$(find . -name "*.md" -type f ! -path "*/node_modules/*" ! -path "*/.git/*" ! -path "*/coverage/*")

# Track issues
issues_found=0

echo "📋 Checking for inconsistencies..."
echo ""

# Check 1: Files missing proper frontmatter/metadata
echo "1️⃣ Checking for missing metadata..."
for file in $files; do
    # Skip README.md and other root files
    if [[ "$file" == "./README.md" ]] || [[ "$file" == "./OPTIMIZATION"* ]] || [[ "$file" == "./PAGE-ANALYSIS"* ]] || [[ "$file" == "./SEO-"* ]] || [[ "$file" == "./TESTING-GUIDE.md" ]]; then
        continue
    fi
    
    # Check if file starts with # heading
    first_line=$(head -1 "$file")
    if [[ ! "$first_line" =~ ^#\  ]]; then
        echo "   ⚠️  $file - Missing H1 heading"
        ((issues_found++))
    fi
    
    # Check for metadata (Last Updated, Status, Category, etc.)
    if ! grep -q "Last Updated:" "$file" && ! grep -q "Date:" "$file" && ! grep -q "**Last Updated" "$file" && ! grep -q "**Date:" "$file"; then
        # Only report if file is in docs/ directory
        if [[ "$file" == ./docs/* ]]; then
            echo "   ⚠️  $file - Missing Last Updated metadata"
            ((issues_found++))
        fi
    fi
done

echo ""
echo "2️⃣ Checking for inconsistent heading styles..."
for file in $files; do
    # Check for multiple H1 headings
    h1_count=$(grep -c "^# " "$file" 2>/dev/null || echo "0")
    if [ "$h1_count" -gt 1 ]; then
        echo "   ⚠️  $file - Multiple H1 headings ($h1_count found)"
        ((issues_found++))
    fi
done

echo ""
echo "3️⃣ Checking for code blocks without language..."
for file in $files; do
    # Look for code blocks without language specification
    if grep -q '^```$' "$file" 2>/dev/null; then
        echo "   ⚠️  $file - Code blocks missing language specification"
        ((issues_found++))
    fi
done

echo ""
echo "4️⃣ Checking for inconsistent status indicators..."
for file in $files; do
    if [[ "$file" == ./docs/* ]]; then
        # Check if file has inconsistent status format
        if grep -q "Status:" "$file" 2>/dev/null; then
            # Check if status uses emojis consistently
            if grep "Status:" "$file" | grep -v "✅\|🔄\|🗄️\|⚠️\|🚧" > /dev/null 2>&1; then
                echo "   ⚠️  $file - Status missing standard emoji"
                ((issues_found++))
            fi
        fi
    fi
done

echo ""
echo "5️⃣ Checking for inconsistent Quick Navigation sections..."
for file in $files; do
    if [[ "$file" == ./docs/* ]]; then
        # Check if file has Quick Navigation without emoji
        if grep -q "## Quick Navigation" "$file" 2>/dev/null && ! grep -q "## 🧭 Quick Navigation" "$file" 2>/dev/null; then
            echo "   ⚠️  $file - Quick Navigation missing 🧭 emoji"
            ((issues_found++))
        fi
    fi
done

echo ""
echo "6️⃣ Checking for inconsistent separators..."
for file in $files; do
    # Check for inconsistent use of --- separators
    separator_count=$(grep -c "^---$" "$file" 2>/dev/null || echo "0")
    if [ "$separator_count" -gt 0 ]; then
        # Verify separators have blank lines around them
        if grep -B1 -A1 "^---$" "$file" | grep -v "^---$" | grep -v "^$" > /dev/null 2>&1; then
            echo "   ⚠️  $file - Separators (---) missing blank lines"
            ((issues_found++))
        fi
    fi
done

echo ""
echo "========================================"
echo "📊 Summary: $issues_found potential issues found"
echo ""

if [ $issues_found -eq 0 ]; then
    echo "✅ All markdown files appear consistent!"
else
    echo "⚠️  Review the issues above to improve consistency"
fi
