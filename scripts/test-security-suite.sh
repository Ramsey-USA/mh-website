#!/bin/bash

# Security Suite Testing Script
# Tests security features that work without Firebase/Cloudflare connections

set -e

echo "🔒 Security Suite Testing - MH Construction Website"
echo "=================================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test counter
TESTS_PASSED=0
TESTS_FAILED=0
TOTAL_TESTS=0

# Function to print test results
print_test_result() {
    local test_name="$1"
    local result="$2"
    local details="$3"
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    
    if [ "$result" = "PASS" ]; then
        echo -e "${GREEN}✓${NC} $test_name"
        TESTS_PASSED=$((TESTS_PASSED + 1))
    else
        echo -e "${RED}✗${NC} $test_name"
        if [ -n "$details" ]; then
            echo -e "  ${YELLOW}Details:${NC} $details"
        fi
        TESTS_FAILED=$((TESTS_FAILED + 1))
    fi
}

# Function to test TypeScript compilation
test_typescript_compilation() {
    echo -e "${BLUE}Testing TypeScript compilation...${NC}"
    
    if npx tsc --noEmit --project tsconfig.json > /dev/null 2>&1; then
        print_test_result "TypeScript compilation" "PASS"
    else
        print_test_result "TypeScript compilation" "FAIL" "TypeScript errors found"
    fi
}

# Function to test Jest security tests
test_jest_security() {
    echo -e "${BLUE}Running Jest security tests...${NC}"
    
    if npm test -- --testPathPattern=security --silent > /dev/null 2>&1; then
        print_test_result "Jest security tests" "PASS"
    else
        print_test_result "Jest security tests" "FAIL" "Security tests failed"
    fi
}

# Function to test Next.js build
test_nextjs_build() {
    echo -e "${BLUE}Testing Next.js build...${NC}"
    
    if npm run build > /dev/null 2>&1; then
        print_test_result "Next.js build" "PASS"
    else
        print_test_result "Next.js build" "FAIL" "Build failed"
    fi
}

# Function to check security file structure
test_security_file_structure() {
    echo -e "${BLUE}Checking security file structure...${NC}"
    
    local files=(
        "src/middleware/security.ts"
        "src/lib/security/security-manager.ts"
        "src/lib/security/audit-logger.ts"
        "firebase/firestore.rules"
        "middleware.ts"
    )
    
    local missing_files=()
    
    for file in "${files[@]}"; do
        if [ ! -f "$file" ]; then
            missing_files+=("$file")
        fi
    done
    
    if [ ${#missing_files[@]} -eq 0 ]; then
        print_test_result "Security file structure" "PASS"
    else
        print_test_result "Security file structure" "FAIL" "Missing files: ${missing_files[*]}"
    fi
}

# Function to check security configuration
test_security_configuration() {
    echo -e "${BLUE}Checking security configuration...${NC}"
    
    # Check if security manager has proper exports
    if grep -q "export.*securityManager" src/lib/security/security-manager.ts && \
       grep -q "export.*DEFAULT_SECURITY_CONFIG" src/lib/security/security-manager.ts; then
        print_test_result "Security manager configuration" "PASS"
    else
        print_test_result "Security manager configuration" "FAIL" "Missing exports"
    fi
    
    # Check middleware configuration
    if grep -q "export.*middleware" middleware.ts && \
       grep -q "export const config" middleware.ts && \
       grep -q "matcher" middleware.ts; then
        print_test_result "Middleware configuration" "PASS"
    else
        print_test_result "Middleware configuration" "FAIL" "Invalid middleware config"
    fi
}

# Function to test ESLint security rules
test_eslint_security() {
    echo -e "${BLUE}Running ESLint security checks...${NC}"
    
    if npx eslint --quiet src/lib/security/ src/middleware/ > /dev/null 2>&1; then
        print_test_result "ESLint security checks" "PASS"
    else
        print_test_result "ESLint security checks" "FAIL" "ESLint errors in security code"
    fi
}

# Function to check Firestore rules syntax
test_firestore_rules() {
    echo -e "${BLUE}Checking Firestore rules syntax...${NC}"
    
    # Basic syntax check for Firestore rules
    if grep -q "rules_version = '2'" firebase/firestore.rules && \
       grep -q "service cloud.firestore" firebase/firestore.rules; then
        print_test_result "Firestore rules syntax" "PASS"
    else
        print_test_result "Firestore rules syntax" "FAIL" "Invalid Firestore rules"
    fi
}

# Function to check package.json security dependencies
test_security_dependencies() {
    echo -e "${BLUE}Checking security dependencies...${NC}"
    
    local security_deps=("bcryptjs")
    local missing_deps=()
    
    for dep in "${security_deps[@]}"; do
        if ! npm list "$dep" > /dev/null 2>&1; then
            missing_deps+=("$dep")
        fi
    done
    
    if [ ${#missing_deps[@]} -eq 0 ]; then
        print_test_result "Security dependencies" "PASS"
    else
        print_test_result "Security dependencies" "FAIL" "Missing dependencies: ${missing_deps[*]}"
    fi
}

# Function to test environment variables
test_environment_variables() {
    echo -e "${BLUE}Checking environment configuration...${NC}"
    
    if [ -f ".env.local" ] || [ -f ".env" ]; then
        print_test_result "Environment file exists" "PASS"
    else
        print_test_result "Environment file exists" "FAIL" "No .env file found"
    fi
}

# Function to check security API routes
test_security_api_routes() {
    echo -e "${BLUE}Checking security API routes...${NC}"
    
    local api_routes=(
        "src/app/api/security/status/route.ts"
        "src/app/api/security/events/route.ts"
        "src/app/api/security/cloudflare/route.ts"
    )
    
    local missing_routes=()
    
    for route in "${api_routes[@]}"; do
        if [ ! -f "$route" ]; then
            missing_routes+=("$route")
        fi
    done
    
    if [ ${#missing_routes[@]} -eq 0 ]; then
        print_test_result "Security API routes" "PASS"
    else
        print_test_result "Security API routes" "FAIL" "Missing routes: ${missing_routes[*]}"
    fi
}

# Main execution
main() {
    echo "Starting security suite tests..."
    echo ""
    
    # Run all tests
    test_security_file_structure
    test_security_configuration
    test_typescript_compilation
    test_jest_security
    test_eslint_security
    test_firestore_rules
    test_security_dependencies
    test_environment_variables
    test_security_api_routes
    test_nextjs_build
    
    echo ""
    echo "=================================================="
    echo -e "${BLUE}Security Suite Test Results${NC}"
    echo "=================================================="
    echo -e "Total Tests: $TOTAL_TESTS"
    echo -e "${GREEN}Passed: $TESTS_PASSED${NC}"
    echo -e "${RED}Failed: $TESTS_FAILED${NC}"
    echo ""
    
    if [ $TESTS_FAILED -eq 0 ]; then
        echo -e "${GREEN}🎉 All security tests passed!${NC}"
        echo -e "${GREEN}✅ Security suite is operational and ready${NC}"
        echo ""
        echo "Note: Firebase and Cloudflare integrations are not yet connected"
        echo "but all local security components are working correctly."
        exit 0
    else
        echo -e "${RED}❌ Some security tests failed${NC}"
        echo -e "${YELLOW}Please review the failed tests above${NC}"
        exit 1
    fi
}

# Run the main function
main "$@"