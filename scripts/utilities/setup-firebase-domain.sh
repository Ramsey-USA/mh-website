#!/bin/bash

# Firebase Domain Configuration Helper
# This script helps configure your custom domain in Firebase hosting

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

DOMAIN="mhc-gc.com"

echo -e "${BLUE}🔥 Firebase Domain Configuration Helper${NC}"
echo -e "${BLUE}=====================================+${NC}"
echo ""

# Check if Firebase CLI is installed and authenticated
if ! command -v firebase &> /dev/null; then
    echo -e "${RED}❌ Firebase CLI not found${NC}"
    echo -e "${YELLOW}Install with: npm install -g firebase-tools${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Firebase CLI found${NC}"

# Check authentication
if ! firebase projects:list &> /dev/null; then
    echo -e "${RED}❌ Not logged into Firebase CLI${NC}"
    echo -e "${YELLOW}Please run: firebase login${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Firebase authentication verified${NC}"

# List current projects
echo ""
echo -e "${YELLOW}📋 Available Firebase projects:${NC}"
firebase projects:list

echo ""
echo -e "${YELLOW}🔧 Adding custom domain to Firebase hosting...${NC}"

# Note: The actual domain addition needs to be done through Firebase CLI or Console
echo -e "${BLUE}To add your custom domain:${NC}"
echo ""
echo "1️⃣  Through Firebase CLI:"
echo "   firebase hosting:sites:create $DOMAIN"
echo "   firebase target:apply hosting production $DOMAIN"
echo ""
echo "2️⃣  Through Firebase Console:"
echo "   → Go to https://console.firebase.google.com"
echo "   → Select your project"
echo "   → Go to Hosting"
echo "   → Click 'Add custom domain'"
echo "   → Enter: $DOMAIN"
echo "   → Follow the DNS configuration steps"
echo ""

# Check current hosting sites
echo -e "${YELLOW}📋 Current hosting sites:${NC}"
firebase hosting:sites:list 2>/dev/null || echo "No hosting sites configured"

echo ""
echo -e "${YELLOW}🚀 To deploy after domain setup:${NC}"
echo "   npm run build"
echo "   npm run firebase:deploy"
echo ""

# Display helpful Firebase commands
echo -e "${BLUE}📚 Helpful Firebase Commands:${NC}"
echo ""
echo "🔍 Check project info:"
echo "   firebase projects:list"
echo "   firebase use --add"
echo ""
echo "🌐 Hosting management:"
echo "   firebase hosting:sites:list"
echo "   firebase hosting:sites:create $DOMAIN"
echo ""
echo "🚀 Deployment:"
echo "   firebase deploy --only hosting"
echo "   firebase deploy --only firestore:rules"
echo ""
echo "🔧 Configuration:"
echo "   firebase target:apply hosting production $DOMAIN"
echo "   firebase serve --only hosting"
echo ""

echo -e "${GREEN}✨ Next steps:${NC}"
echo "1. Add custom domain in Firebase Console"
echo "2. Configure DNS records in Namecheap"
echo "3. Run deployment: npm run firebase:deploy"
echo "4. Verify setup: npm run domain:check"
echo ""