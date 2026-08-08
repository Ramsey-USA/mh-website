# Ecosystem Sitewide Congruency Phase

**Status:** Review  
**Date:** August 7, 2026  
**Authority:** MH Ecosystem Draft 1.0/3.0 controlled baseline

## Objective

Align every website route with the current MH Ecosystem lifecycle, terminology, authority model, and document-factory boundary.

## Implemented Controls

- Public document delivery fails closed while the Ecosystem remains Draft and field-ineffective.
- The R2 document proxy applies the same lifecycle decision as the website document registry.
- Resources, Employee Handbook, MISH contents, and safety-form routes now present controlled indexes without exposing draft downloads.
- Operations, Sales and Estimating, and other internal manuals are removed from the public-manual route set.
- Employee Handbook version fallback is restored to the controlled 3.0 family.
- PDF and QR generation custody remains with `Ramsey-USA/mh-document-factory`; the website retains stable public destinations and approved summaries.
- A sitewide regression contract prevents release-state drift and false operational claims for in-development systems.

## Release Gates

The phase may merge only after type, lint, tests, website build, dashboard build, security, dependency, branding, Markdown, bundle, and performance checks pass.

## Publication Rule

A future approved release may enable eligible downloads only by updating controlled Ecosystem metadata through governance. Page-level exceptions are prohibited.
