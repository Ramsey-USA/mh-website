# Sitewide Accessibility Phase

**Status:** Review  
**Date:** August 7, 2026  
**Scope:** Every route rendered through the MH Construction website application shell

## Objective

Provide a consistent keyboard bypass control across the public website and standalone field experience. The control allows keyboard and assistive-technology users to move directly past repeated navigation into the current page content.

## Implemented Controls

- A single, visually concealed “Skip to main content” link is the first interactive control in both application-shell modes.
- The link targets the stable `#main-content` landmark.
- Both standard and standalone main landmarks accept programmatic focus with `tabIndex={-1}`.
- The control becomes visible when focused and uses the approved MH Construction primary and secondary brand colors.
- The shared-shell implementation applies the repair across current and future pages without route-level duplication.

## Acceptance Gates

- AppShell component tests verify the link target and focusable landmark in both modes.
- Type, lint, unit, website-build, dashboard-build, security, dependency, branding, Markdown, bundle, and performance checks must pass before merge.
- Production deployment remains a separate release gate and requires confirmation from the Cloudflare deployment record.

## Control Ownership

The website owns route accessibility and stable public destinations. The private document factory remains the system of record for PDF and QR generation; no generator or QR custody is restored to the public website.
