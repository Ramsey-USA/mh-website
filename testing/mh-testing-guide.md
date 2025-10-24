# MH Website Testing Suite

Automated testing scripts for the MH Construction website quality assurance.

## Comprehensive Cohesion Testing

- **`test-cohesion-suite.sh`** - Complete website cohesion testing including:
  - File structure and kebab-case compliance
  - Build and compilation integrity
  - Link validation and consistency
  - Content quality assurance
  - Integration testing

## Security Testing

- **`test-security-suite.sh`** - Comprehensive security validation script that tests
  security features without requiring Firebase/Cloudflare connections

## Responsive Design Testing

- **`test-responsive.sh`** - Automated responsive design testing across multiple
  breakpoints and pages
- **`test-responsive-complete.html`** - Interactive HTML interface for manual
  responsive testing

## Usage

Make scripts executable before running:

```bash
chmod +x *.sh
```

Run individual tests:

```bash
# Complete cohesion testing (recommended)
./test-cohesion-suite.sh

# Security tests
./test-security-suite.sh

# Responsive design tests
./test-responsive.sh
```

## Test Coverage

- **Pages Tested**: /, /about, /services, /projects, /team, /contact, /estimator,
  /government, /trade-partners, /careers
- **Breakpoints**: iPhone SE (320x568), iPhone 8 (375x667), iPhone 12/13/14 (390x844),
  iPad (768x1024), iPad Landscape (1024x768), Common laptop (1366x768)
- **Security Features**: Various security validations that work offline
- **File Structure**: Kebab-case compliance, link integrity, build success
- **Code Quality**: TypeScript compilation, ESLint validation, content consistency

## Notes

These tests are designed to work in development environments and provide automated
quality assurance for the website's responsive design, security features, and overall
code cohesion after major refactoring operations like kebab-case conversions.
