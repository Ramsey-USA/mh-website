# MH Website Testing Suite

Automated testing scripts for the MH Construction website quality assurance.

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

## Notes

These tests are designed to work in development environments and provide automated
quality assurance for the website's responsive design and security features.
