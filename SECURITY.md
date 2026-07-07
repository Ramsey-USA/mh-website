# Security Policy

## Supported Versions

This repository actively supports the following branches:

| Branch         | Status        |
| -------------- | ------------- |
| `main`         | Supported     |
| `develop`      | Best effort   |
| Other branches | Not supported |

Security fixes are shipped to `main` first, then backported when appropriate.

## Reporting a Vulnerability

Please do not open public issues for suspected security vulnerabilities.

Use GitHub private vulnerability reporting for this repository:

- Security tab -> Report a vulnerability
- Or the repository's private reporting link in Security Advisories

If private reporting is unavailable, contact maintainers through official MH Construction channels and include "Security" in the subject line.

## What to Include

Please include the following details so we can triage quickly:

- Affected endpoint, route, package, or file path
- Steps to reproduce
- Proof of concept and impact
- Suggested remediation (if available)

## Response Expectations

- Initial triage response target: within 3 business days
- Status update cadence: at least every 7 business days while triaging
- Remediation timeline: based on severity, exploitability, and operational risk

## Disclosure Process

We follow coordinated disclosure:

- We confirm and classify severity
- We prepare and test a fix
- We release remediation and publish advisory details when safe

Please avoid public disclosure until remediation is available or coordinated with maintainers.

## Security Tooling in This Repository

- Dependabot alerts and security updates
- Dependency Review on pull requests
- CodeQL code scanning
- CI dependency audit gates (`security:check`, `security:check:strict`)
