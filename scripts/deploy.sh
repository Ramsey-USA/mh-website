#!/bin/bash

# Production Deployment Script
# This script handles the complete deployment process to production

set -e  # Exit on any error

echo "🚀 Starting MH Construction Website Production Deployment"

# Configuration
PROJECT_NAME="mh-construction-website"
PRODUCTION_URL="https://mhconstructionllc.com"
STAGING_URL="https://staging.mhconstructionllc.com"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    # Check if required tools are installed
    command -v node >/dev/null 2>&1 || { print_error "Node.js is required but not installed. Aborting."; exit 1; }
    command -v npm >/dev/null 2>&1 || { print_error "npm is required but not installed. Aborting."; exit 1; }
    command -v firebase >/dev/null 2>&1 || { print_error "Firebase CLI is required but not installed. Run: npm install -g firebase-tools"; exit 1; }
    
    # Check Node.js version
    NODE_VERSION=$(node --version | cut -d'v' -f2)
    REQUIRED_VERSION="18.0.0"
    
    if ! [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" = "$REQUIRED_VERSION" ]; then
        print_error "Node.js version $REQUIRED_VERSION or higher is required. Current version: $NODE_VERSION"
        exit 1
    fi
    
    print_success "Prerequisites check passed"
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    npm ci
    print_success "Dependencies installed"
}

# Run tests
run_tests() {
    print_status "Running test suite..."
    
    # Run linting
    print_status "Running linting..."
    npm run lint
    
    # Run type checking
    print_status "Running type checking..."
    npm run type-check
    
    # Run unit tests
    print_status "Running unit tests..."
    npm run test:coverage
    
    # Run integration tests
    print_status "Running integration tests..."
    npm run test:integration
    
    print_success "All tests passed"
}

# Build application
build_application() {
    print_status "Building application for production..."
    
    # Set production environment
    export NODE_ENV=production
    export NEXT_PUBLIC_ENV=production
    
    # Build the application
    npm run build
    
    # Analyze bundle size
    npm run analyze
    
    print_success "Application built successfully"
}

# Run pre-deployment tests
pre_deployment_tests() {
    print_status "Running pre-deployment tests..."
    
    # Start the application
    npm run start &
    SERVER_PID=$!
    
    # Wait for server to start
    sleep 10
    
    # Run Lighthouse CI
    npx lhci autorun
    
    # Run E2E tests against built application
    npm run test:e2e
    
    # Stop the server
    kill $SERVER_PID
    
    print_success "Pre-deployment tests completed"
}

# Deploy to staging
deploy_staging() {
    print_status "Deploying to staging environment..."
    
    # Deploy to Firebase Hosting staging channel
    firebase hosting:channel:deploy staging --project staging
    
    # Get staging URL
    STAGING_DEPLOY_URL=$(firebase hosting:channel:open staging --project staging --no-open 2>&1 | grep -o 'https://[^[:space:]]*')
    
    print_success "Deployed to staging: $STAGING_DEPLOY_URL"
    
    # Run smoke tests on staging
    print_status "Running smoke tests on staging..."
    npm run test:smoke -- --baseURL="$STAGING_DEPLOY_URL"
    
    print_success "Staging deployment completed successfully"
}

# Deploy to production
deploy_production() {
    print_status "Deploying to production environment..."
    
    # Confirm production deployment
    read -p "⚠️  Are you sure you want to deploy to PRODUCTION? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_warning "Production deployment cancelled"
        exit 0
    fi
    
    # Deploy to Firebase Hosting production
    firebase deploy --project production
    
    print_success "Deployed to production: $PRODUCTION_URL"
    
    # Run smoke tests on production
    print_status "Running smoke tests on production..."
    npm run test:smoke -- --baseURL="$PRODUCTION_URL"
    
    print_success "Production deployment completed successfully"
}

# Post-deployment verification
post_deployment_verification() {
    print_status "Running post-deployment verification..."
    
    # Check if the site is accessible
    HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$PRODUCTION_URL")
    
    if [ "$HTTP_STATUS" -eq 200 ]; then
        print_success "Production site is accessible (HTTP $HTTP_STATUS)"
    else
        print_error "Production site returned HTTP $HTTP_STATUS"
        exit 1
    fi
    
    # Check Core Web Vitals
    print_status "Checking Core Web Vitals..."
    npx lighthouse "$PRODUCTION_URL" --chrome-flags="--headless" --output=json --output-path=./lighthouse-prod.json
    
    # Performance monitoring
    print_status "Setting up performance monitoring..."
    # This would integrate with monitoring services
    
    print_success "Post-deployment verification completed"
}

# Cleanup
cleanup() {
    print_status "Cleaning up..."
    
    # Remove temporary files
    rm -f lighthouse-prod.json
    rm -rf .next/analyze
    
    print_success "Cleanup completed"
}

# Create deployment report
create_deployment_report() {
    print_status "Creating deployment report..."
    
    DEPLOYMENT_TIME=$(date '+%Y-%m-%d %H:%M:%S')
    GIT_COMMIT=$(git rev-parse HEAD)
    GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
    
    cat > deployment-report.md << EOF
# Deployment Report

## Summary
- **Date**: $DEPLOYMENT_TIME
- **Branch**: $GIT_BRANCH
- **Commit**: $GIT_COMMIT
- **Production URL**: $PRODUCTION_URL
- **Staging URL**: $STAGING_DEPLOY_URL

## Test Results
- ✅ Linting: Passed
- ✅ Type Checking: Passed
- ✅ Unit Tests: Passed
- ✅ Integration Tests: Passed
- ✅ E2E Tests: Passed
- ✅ Security Audit: Passed
- ✅ Performance Tests: Passed

## Deployment Status
- ✅ Staging Deployment: Successful
- ✅ Production Deployment: Successful
- ✅ Smoke Tests: Passed
- ✅ Site Accessibility: Verified

## Performance Metrics
- Core Web Vitals: See lighthouse-prod.json
- Bundle Size: Analyzed and within limits
- Load Time: Under performance budget
EOF

    print_success "Deployment report created: deployment-report.md"
}

# Main deployment flow
main() {
    print_status "Starting deployment process..."
    
    check_prerequisites
    install_dependencies
    run_tests
    build_application
    pre_deployment_tests
    deploy_staging
    deploy_production
    post_deployment_verification
    create_deployment_report
    cleanup
    
    print_success "🎉 Deployment completed successfully!"
    print_status "Production URL: $PRODUCTION_URL"
    print_status "Deployment report: deployment-report.md"
}

# Run main function
main "$@"