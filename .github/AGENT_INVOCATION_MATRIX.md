# Agent Invocation Matrix

Last Updated: May 10, 2026
Status: Canonical

This document is the canonical invocation policy for Copilot agents in this repository.
Use it to decide which agent to run, when specialist handoffs are required, and which gates must pass before merge.

## Global Policy Layers

1. Branding guardrails are always active via `.github/instructions/mh-branding-guardrails.instructions.md`.
2. Branding gate runs on tool usage via `.github/hooks/branding-policy.json`.
3. PR compliance requirements are enforced in `.github/PULL_REQUEST_TEMPLATE.md`.
4. PR agent compliance reminder is enforced via `.github/workflows/pr-agent-compliance-reminder.yml`.

## Invocation Flags

1. All agents in `.github/agents/` are user-invocable.
2. Model invocation is disabled for most agents (`disable-model-invocation: true`).
3. Current exceptions with model invocation enabled:
   - `manual-development-standards-officer`
   - `safety-pdf-editor`

## Umbrella Routing Policy

Primary entrypoint: `master-at-arms`

Use `master-at-arms` as the default umbrella command surface for:

- UI, copy, metadata, labels, schema, and page structure changes
- Mixed-scope PRs touching multiple policy domains
- Any change where specialist choice is unclear

`master-at-arms` should delegate to specialists according to the matrix below.

## Specialist Invocation Matrix

| Change Area                                   | Primary Agent                                    | Required Specialist Handoffs                                                                                                                                               |
| --------------------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Copy, headings, CTA tone                      | `brand-comms-captain`                            | `website-terminology-command` when labels span multiple surfaces                                                                                                           |
| Trust, accreditations, confidence signals     | `trust-sentinel`                                 | `license-compliance-officer` if WA/OR/ID license data is touched; `design-quartermaster` when trust-row layout/emphasis changes                                            |
| License values and verification links         | `license-compliance-officer`                     | `trust-sentinel` for placement/visibility checks                                                                                                                           |
| Metadata, nav labels, schema naming           | `seo-signal-officer`                             | `website-terminology-command` for full-surface normalization                                                                                                               |
| Accessibility semantics/focus/contrast        | `accessibility-watch-officer`                    | `design-quartermaster` when component patterns are changed                                                                                                                 |
| Safety and hub route behavior                 | `safety-hub-liaison`                             | `dashboard-congruency-officer` for website/dashboard parity impacts                                                                                                        |
| Dashboard/hub parity and optimization hygiene | `dashboard-congruency-officer`                   | `accessibility-watch-officer`, `website-terminology-command`, `trust-sentinel` as needed; include shared icon/map parity checks when website trust/map visuals are changed |
| Analytics event/label continuity              | `telemetry-recon-officer`                        | `dashboard-congruency-officer` when dashboard cards/labels change                                                                                                          |
| Performance regressions and budget risk       | `performance-budget-officer`                     | `dashboard-congruency-officer` for dashboard render/computation hotspots                                                                                                   |
| UI patterns and design-system fidelity        | `design-quartermaster`                           | `accessibility-watch-officer` for interaction/access checks                                                                                                                |
| Forms/manual PDFs and generation              | `forms-logistics-officer` or `safety-pdf-editor` | `manual-development-standards-officer`, `manual-structure-officer`                                                                                                         |
| Pre-merge final go/no-go                      | `release-command`                                | Domain specialists as required by changed files                                                                                                                            |

## Required Pre-Merge Invocation Sequence

For PRs touching UI, copy, metadata, or dashboard/hub behavior:

1. Run `master-at-arms` or direct specialist(s) based on scope.
2. Run required specialist handoffs from the matrix.
3. Run `release-command` for final readiness PASS/FAIL.

Additional requirement for dashboard/hub PRs:

1. `dashboard-congruency-officer` is mandatory before `release-command`.

## Completion and Reporting Policy

1. Every invoked agent must return its defined PASS/FAIL output contract.
2. Do not mark work complete if any required agent returns FAIL.
3. If an exception is used, record it in `.github/branding-exceptions.json` with owner, ticket, and expiry.

## Mapping to PR Template

When opening a PR, ensure the following are explicitly documented:

1. Which agents were invoked.
2. Which required handoffs were completed.
3. Final `release-command` result.
4. Keep checklist items for required handoffs and release result checked.

The PR workflow `.github/workflows/pr-agent-compliance-reminder.yml` fails non-draft PRs when these required compliance fields are missing or placeholder values.
