#!/bin/bash

# Security Status and Update Script
# This script provides a comprehensive security overview and safe update options

echo "🔐 Security Status and Update Script"
echo "=================================="
echo

# Check current package versions
echo "📦 Current Package Versions:"
echo "Next.js: $(npm list next --depth=0 2>/dev/null | grep next@ || echo 'Not found')"
echo "TypeScript: $(npm list typescript --depth=0 2>/dev/null | grep typescript@ || echo 'Not found')"
echo "React: $(npm list react --depth=0 2>/dev/null | grep react@ || echo 'Not found')"
echo

# Security audit with details
echo "🛡️  Security Audit Results:"
echo "----------------------------"
npm audit --audit-level moderate 2>/dev/null | head -20
echo

# Count vulnerabilities by severity
echo "📊 Vulnerability Summary:"
echo "-------------------------"
TOTAL=$(npm audit --audit-level low --json 2>/dev/null | jq '.metadata.vulnerabilities.total' 2>/dev/null || echo "unknown")
HIGH=$(npm audit --audit-level high --json 2>/dev/null | jq '.metadata.vulnerabilities.high' 2>/dev/null || echo "unknown")
MODERATE=$(npm audit --audit-level moderate --json 2>/dev/null | jq '.metadata.vulnerabilities.moderate' 2>/dev/null || echo "unknown")

echo "Total vulnerabilities: $TOTAL"
echo "High severity: $HIGH"
echo "Moderate severity: $MODERATE"
echo

# Show outdated packages
echo "📅 Outdated Packages (Safe to Update):"
echo "---------------------------------------"
npm outdated 2>/dev/null | head -10
echo

# Recommend next steps
echo "🚀 Recommended Next Steps:"
echo "1. Run 'npm run security:fix' for automatic fixes"
echo "2. Manual review of breaking changes before major updates"
echo "3. Consider updating development dependencies separately"
echo "4. Monitor with Dependabot for ongoing security"
echo

echo "✅ Security check complete!"