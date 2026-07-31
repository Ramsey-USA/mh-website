# MHC Enterprise Alignment Action Plan

This plan converts the recommendations in [docs/technical/design-system/MHC-Enterprise-Alignment-Report.docx](docs/technical/design-system/MHC-Enterprise-Alignment-Report.docx) into a practical implementation roadmap for the MH Construction documentation set.

## Goal

Bring the handbook, safety manual, operations manual, sales guide, and marketing guide into a single enterprise-aligned operating model with:

- consistent enterprise terminology
- a unified enterprise command structure
- clear separation between Sales and Marketing
- complete command controls and governance appendices
- stronger safety integration with MISH references and KPI alignment

## Recommended Execution Order

### Phase 1 — Terminology and Brand Lock-In

**Objective:** Make the documentation speak the same language before editing structure.

Tasks:

- Apply global terminology updates across the manual suite:
  - replace generic terms with “Client Partners” and “Trade Partners”
  - replace old titles with the enterprise command model: CO, XO, Master Chief, CHENG, CHNAV
- Ensure the core values block appears in the introductory sections of the Operations Manual, Sales Guide, and Marketing Guide.
- Standardize the canonical MH slogan and supporting brand language used in the manuals and guides.
- Keep all public-facing terminology construction-first, with veteran-owned framing used as trust context rather than primary labeling.

Primary files:

- [documents/content/mhc-employee-handbook-2026/sections](documents/content/mhc-employee-handbook-2026/sections)
- [documents/content/mhc-operations-manual-2026/sections](documents/content/mhc-operations-manual-2026/sections)
- [documents/content/mhc-sales-estimating-guide-2026/sections](documents/content/mhc-sales-estimating-guide-2026/sections)
- [documents/content/mhc-marketing-strategy-guide-2026/sections](documents/content/mhc-marketing-strategy-guide-2026/sections)

### Phase 2 — Handbook Updates

**Objective:** Update the employee handbook to reflect the current enterprise tooling and safety language.

Tasks:

- Update Chapter 07 (Technology & Data Use) to explicitly reference the approved tool stack:
  - Procore
  - Sage 100
  - HH2
  - High-Level CRM
- Update Chapter 06 to reference Toolbox Talks and MISH 24/Hazard Communication and SDS access expectations.
- Ensure the handbook language reinforces the enterprise command model and the new terminology standard.

Primary files:

- [documents/content/mhc-employee-handbook-2026/sections/06-health-safety-security.html](documents/content/mhc-employee-handbook-2026/sections/06-health-safety-security.html)
- [documents/content/mhc-employee-handbook-2026/sections/07-technology-data-use.html](documents/content/mhc-employee-handbook-2026/sections/07-technology-data-use.html)

### Phase 3 — Complete the Operations Manual Framework

**Objective:** Turn the operations manual into a working command document with governance artifacts.

Tasks:

- Draft the missing appendices:
  - Appendix A: RACI matrix
  - Appendix B: controls, retention, and continuity baseline
  - Appendix C: weekly operations meeting agenda/minutes template
  - Appendix D: approval authority matrix
  - Appendix E: KPI dictionary
  - Appendix F: retention schedule and disposal log templates
- Add an Admin/HR SOP chapter under XO oversight, with Beth and Kimberly named as operational leads.
- Ensure escalation paths and authority language reflect the enterprise command structure.

Primary files:

- [documents/content/mhc-operations-manual-2026/sections/01-mhc-operations-manual-command-doctrine-and-authority.html](documents/content/mhc-operations-manual-2026/sections/01-mhc-operations-manual-command-doctrine-and-authority.html)
- [documents/content/mhc-operations-manual-2026/sections/14-mhc-operations-manual-organization-and-raci-narrative.html](documents/content/mhc-operations-manual-2026/sections/14-mhc-operations-manual-organization-and-raci-narrative.html)
- [documents/content/mhc-operations-manual-drafts](documents/content/mhc-operations-manual-drafts)

### Phase 4 — Separate Sales from Marketing

**Objective:** Clarify the distinct roles of preconstruction sales and post-project marketing.

Tasks:

- Expand the Sales & Estimating Guide to include:
  - approval authority matrix from the operations manual
  - Trade Partner qualification standards
  - stronger bridge language to contractor prequalification expectations
- Replace the placeholder or duplicate marketing content with a real standalone Marketing Strategy Guide focused on:
  - the 36-month social campaign lifecycle
  - community service and event management guidance
  - visual standards and brand usage
  - safe field content capture aligned to MISH protocols

Primary files:

- [documents/content/mhc-sales-estimating-guide-2026/sections](documents/content/mhc-sales-estimating-guide-2026/sections)
- [documents/content/marketing-strategy-guide.json](documents/content/marketing-strategy-guide.json)
- [documents/content/mhc-marketing-strategy-guide-2026/sections](documents/content/mhc-marketing-strategy-guide-2026/sections)

### Phase 5 — Safety and KPI Integration

**Objective:** Make the safety content operationally useful and tied to the enterprise controls.

Tasks:

- Align Handbook safety language with Toolbox Talks and MISH 24 references.
- Ensure the Operations Manual KPI Dictionary uses the same leading indicators already defined in MISH 51-59, including:
  - near-miss reporting
  - toolbox talk completion
  - corrective action closure
- Add any cross-reference language needed for the SDS binder and chemical inventory access on site.

Primary files:

- [documents/content/mhc-employee-handbook-2026/sections/06-health-safety-security.html](documents/content/mhc-employee-handbook-2026/sections/06-health-safety-security.html)
- [documents/content/mhc-operations-manual-2026/sections/12-mhc-operations-manual-kpi-and-reporting-cadence.html](documents/content/mhc-operations-manual-2026/sections/12-mhc-operations-manual-kpi-and-reporting-cadence.html)
- [documents/safety-manual.json](documents/safety-manual.json)

## Delivery Approach

1. Work in the source content first, not the generated output only.
2. Update the manual JSON/HTML source files that feed the published documentation.
3. Regenerate or republish the affected manual outputs after the source content is updated.
4. Use the checklist from the report as the acceptance test for each phase.

## Acceptance Checklist

- [ ] Global terminology replacement completed across all manuals.
- [ ] Construction-first, enterprise-aligned titles applied consistently.
- [ ] Handbook technology and safety updates completed.
- [ ] Operations Manual appendices A-F drafted.
- [ ] Admin/HR SOP added to the Operations Manual.
- [ ] Sales guide includes approval authority and Trade Partner qualification content.
- [ ] Marketing guide is a distinct manual rather than a sales duplicate.
- [ ] Safety references and KPI language are aligned with MISH standards.

## Suggested Priorities

1. Terminology and title lock-in
2. Handbook safety and technology updates
3. Operations Manual appendices and governance structure
4. Sales/Marketing separation
5. Safety KPI and MISH cross-reference completion
