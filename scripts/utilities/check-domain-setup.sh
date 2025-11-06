#!/bin/bash

# Namecheap Domain Setup Assistant for MH Construction
# This script helps verify domain setup and deployment readiness

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DOMAIN="mhc-gc.com"
WWW_DOMAIN="www.mhc-gc.com"

echo -e "${BLUE}🏗️  MH Construction Domain Setup Assistant${NC}"
echo -e "${BLUE}================================================${NC}"
echo ""

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check DNS resolution
check_dns() {
    local domain=$1
    local record_type=$2
    
    echo -e "${YELLOW}Checking ${record_type} record for ${domain}...${NC}"
    
    if command_exists dig; then
        result=$(dig +short $record_type $domain)
        if [ -n "$result" ]; then
            echo -e "${GREEN}✅ ${record_type} record found: ${result}${NC}"
            return 0
        else
            echo -e "${RED}❌ No ${record_type} record found${NC}"
            return 1
        fi
    elif command_exists nslookup; then
        echo -e "${YELLOW}Using nslookup to check ${domain}...${NC}"
        nslookup $domain
    else
        echo -e "${RED}❌ Neither dig nor nslookup available${NC}"
        return 1
    fi
}

# Function to check website availability
check_website() {
    local url=$1
    
    echo -e "${YELLOW}Checking website availability: ${url}...${NC}"
    
    if command_exists curl; then
        status_code=$(curl -s -o /dev/null -w "%{http_code}" "$url" || echo "000")
        case $status_code in
            200|301|302)
                echo -e "${GREEN}✅ Website is accessible (HTTP $status_code)${NC}"
                return 0
                ;;
            000)
                echo -e "${RED}❌ Website is not accessible (connection failed)${NC}"
                return 1
                ;;
            *)
                echo -e "${YELLOW}⚠️  Website returned HTTP $status_code${NC}"
                return 1
                ;;
        esac
    else
        echo -e "${YELLOW}⚠️  curl not available, skipping HTTP check${NC}"
        return 1
    fi
}

# Function to check SSL certificate
check_ssl() {
    local domain=$1
    
    echo -e "${YELLOW}Checking SSL certificate for ${domain}...${NC}"
    
    if command_exists openssl; then
        ssl_info=$(echo | openssl s_client -servername $domain -connect $domain:443 2>/dev/null | openssl x509 -noout -dates 2>/dev/null || echo "FAILED")
        if [ "$ssl_info" != "FAILED" ]; then
            echo -e "${GREEN}✅ SSL certificate is active${NC}"
            echo "$ssl_info"
            return 0
        else
            echo -e "${RED}❌ SSL certificate not found or invalid${NC}"
            return 1
        fi
    else
        echo -e "${YELLOW}⚠️  openssl not available, skipping SSL check${NC}"
        return 1
    fi
}

# Main execution
echo "🔍 Domain Setup Verification"
echo "=============================="
echo ""

# Check Cloudflare Pages deployment status
echo -e "${YELLOW}Checking Cloudflare Pages deployment...${NC}"
if command_exists wrangler; then
    echo -e "${GREEN}✅ Wrangler CLI is available${NC}"
    echo -e "${YELLOW}Run 'wrangler pages project list' to see deployments${NC}"
else
    echo -e "${YELLOW}⚠️  Wrangler CLI not found. Install with: npm install -g wrangler${NC}"
fi

echo ""
echo "🌐 DNS Resolution Checks"
echo "========================"
echo ""

# Check DNS resolution
dns_success=true
check_dns $DOMAIN "A" || dns_success=false
check_dns $WWW_DOMAIN "CNAME" || dns_success=false

echo ""
echo "🔗 Website Availability Checks"
echo "==============================="
echo ""

# Check website availability
web_success=true
check_website "https://$DOMAIN" || web_success=false
check_website "https://$WWW_DOMAIN" || web_success=false

echo ""
echo "🔐 SSL Certificate Checks"
echo "========================="
echo ""

# Check SSL certificates
ssl_success=true
check_ssl $DOMAIN || ssl_success=false

echo ""
echo "📊 Summary"
echo "=========="
echo ""

if $dns_success && $web_success && $ssl_success; then
    echo -e "${GREEN}🎉 Domain setup appears to be complete and working!${NC}"
    echo ""
    echo -e "${GREEN}✅ DNS resolution: Working${NC}"
    echo -e "${GREEN}✅ Website availability: Working${NC}"
    echo -e "${GREEN}✅ SSL certificates: Active${NC}"
    echo ""
    echo "🚀 Your MH Construction website should be fully accessible at:"
    echo "   • https://$DOMAIN"
    echo "   • https://$WWW_DOMAIN"
else
    echo -e "${YELLOW}⚠️  Domain setup needs attention${NC}"
    echo ""
    
    if ! $dns_success; then
        echo -e "${RED}❌ DNS issues detected${NC}"
        echo "   → Check your Cloudflare DNS settings"
        echo "   → Allow 24-48 hours for DNS propagation"
    fi
    
    if ! $web_success; then
        echo -e "${RED}❌ Website accessibility issues${NC}"
        echo "   → Ensure Cloudflare Pages deployment is successful"
        echo "   → Check Cloudflare Pages configuration"
    fi
    
    if ! $ssl_success; then
        echo -e "${RED}❌ SSL certificate issues${NC}"
        echo "   → SSL certificates can take 2-4 hours after DNS propagation"
        echo "   → Check Cloudflare SSL/TLS settings"
    fi
fi

echo ""
echo "📚 Next Steps"
echo "============="
echo ""
echo "1. 📖 Read the complete setup guide:"
echo "   docs/deployment/cloudflare-pages-setup.md"
echo ""
echo "2. 🛠️  Deploy your website:"
echo "   npm run deploy:production"
echo ""
echo "3. 🔍 Monitor DNS propagation:"
echo "   https://dnschecker.org"
echo ""
echo "4. 📞 Get help if needed:"
echo "   Email: office@mhc-gc.com"
echo "   Phone: (509) 308-6489"
echo ""

exit 0