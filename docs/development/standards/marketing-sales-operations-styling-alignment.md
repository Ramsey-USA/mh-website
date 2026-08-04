# Marketing/Sales to Operations Manual Styling Alignment Analysis

**Category:** Development - Standards  
**Last Updated:** July 30, 2026  
**Status:** Active

## Quick Summary

This document explains the layout and typography differences between marketing/sales guides and the operations manual, and it defines the minimal changes needed to align them.

Use this page when reviewing template structure, manual-family styling, or future documentation design decisions.

## What This Review Covers

- The current template architecture for manual-family outputs
- The main layout and typography differences between handbook-style and operations-style templates
- The smallest practical change set for aligning marketing and sales guides with operations-style structure

## Current Template Architecture

**Brand Congruency:** Styling alignment guidance should preserve MH Construction naming, relationship-first voice, and construction-first page context across sales and marketing guides.

### Template Hierarchy

1. **Safety Manual** → Has dedicated templates: `safety-manual-*.html`
2. **Employee Handbook** → Has dedicated templates: `employee-handbook-*.html`
3. **Operations Manual** → Has dedicated templates: `operations-manual-*.html`
4. **Marketing Strategy Guide** → **Uses employee handbook templates** + text substitution
5. **Sales/Estimating Guide** → **Uses employee handbook templates** + text substitution

### Template Resolution Logic

```javascript
function resolveManualTemplateName(suffix) {
  if (isMarketingStrategyGuide) {
    return `employee-handbook-${suffix}.html`;
  }
  return `${ACTIVE_MANUAL}-${suffix}.html`;
}
```

Marketing and sales guides use `adaptMarketingStrategyGuideTemplate()` for string replacement:

- "Employee Handbook" → "Marketing Strategy Guide" / "Sales/Estimating Guide"
- "Handbook" → "Guide"
- "Chapter" → "Section"
- "chapter" → "section"

**Problem:** This approach only handles text substitution, not layout/typography differences.

---

## Layout & Typography Differences

### 1. Section Template Differences

**File:** `employee-handbook-section.html` vs `operations-manual-section.html`

**Differences (6 lines total):**

| Element           | Employee Handbook                    | Operations Manual                     |
| ----------------- | ------------------------------------ | ------------------------------------- |
| `<title>`         | Employee Handbook {{SECTION_NUMBER}} | Operations Manual {{SECTION_NUMBER}}  |
| Document metadata | Handbook Section {{SECTION_NUMBER}}  | Operations Section {{SECTION_NUMBER}} |
| Program label     | MH Construction Employee Handbook    | MH Construction Operations Manual     |

**Impact:** Text-only differences; layout is identical.

---

### 2. Cover Template Differences

**File:** `employee-handbook-cover.html` vs `operations-manual-cover.html`

**Differences:**

| Element           | Employee Handbook                                                                                                    | Operations Manual                                                                                              |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Program chip      | Employee Handbook                                                                                                    | Operations Manual                                                                                              |
| Title             | Employee<br/>Handbook                                                                                                | Operations<br/>Manual                                                                                          |
| Subtitle          | Workplace Policies, Standards, and Employee Expectations                                                             | Field Execution Standards, Controls, and Delivery Requirements                                                 |
| Summary scope     | Purpose: Company-wide policy guide for conduct, pay practices, benefits, and employment expectations.                | Purpose: Standardized operating system for estimating, project delivery, controls, and closeout execution.     |
| Summary audience  | All employees, supervisors, and people leaders.                                                                      | Estimators, project managers, superintendents, and operations leadership.                                      |
| Summary structure | Table of contents plus 9 chapters, from Introduction & Company Overview through Workplace Respect & Anti-Harassment. | Table of contents plus 14 chapters, covering command doctrine, systems SOPs, KPI cadence, and records control. |
| Summary topics    | Employment basics, compensation, employee benefits, and workplace policy standards.                                  | Procore governance, change controls, HH2/SAGE100 workflows, safety integration, and reporting rhythm.          |
| Summary use       | Primary policy reference for onboarding, supervision, and acknowledgment workflows.                                  | Daily operating reference for preconstruction-to-closeout consistency and accountability.                      |
| QR label          | Scan for latest handbook                                                                                             | Scan for latest operations manual                                                                              |

**Impact:** Substantive content differences reflecting different manual purposes.

---

### 3. TOC Template Differences (Critical Layout Changes)

**File:** `employee-handbook-toc.html` vs `operations-manual-toc.html`

#### A. TOC Entry Layout Changes

| CSS Property              | Employee Handbook | Operations Manual | Delta                        |
| ------------------------- | ----------------- | ----------------- | ---------------------------- |
| `.mish-entry` padding     | `2.1pt 0`         | `2.7pt 0`         | **+0.6pt** (28% increase)    |
| `.mish-entry` line-height | `1.2`             | `1.28`            | **+0.08** (6.7% increase)    |
| `.mish-code` width        | `0.92in`          | `1.02in`          | **+0.10in** (10.9% increase) |
| `.mish-code` min-width    | `0.92in`          | `1.02in`          | **+0.10in**                  |

**Visual Impact:**

- Wider chapter/section code chips (more breathing room)
- Taller rows (improved scanability)
- Better vertical rhythm for operations audience

#### B. TOC Page 2 Content Differences

**Employee Handbook Page 2 includes:**

```html
<section class="toc-feature-stage">
  <section class="toc-values-card">
    <p class="toc-values-title">Our Core Values</p>
    <div class="toc-values-grid">
      <!-- 4 value pills: Honesty, Integrity, Professionalism, Thoroughness -->
    </div>
  </section>

  <img class="toc-team-photo" src="{{BRAND_TEAM_GROUP_PHOTO}}" />

  <section class="toc-insight">
    <p class="toc-insight-label">Word from the General</p>
    <p class="toc-insight-quote">
      "To every new employee joining MH Construction..."
    </p>
    <p class="toc-insight-attribution">Jeremy Thamert, Owner &amp; President</p>
    <div class="toc-insight-foot">
      Tri-State Service Footprint • Washington • Oregon • Idaho
    </div>
  </section>
</section>
```

**Operations Manual Page 2:**

- **Does NOT include** the `toc-feature-stage` section
- Goes directly to footer after `{{TOC_CLUSTERS_PAGE_2_HTML}}`

**Rationale:** Operations manual is a technical reference; employee handbook is onboarding/culture document.

#### C. CSS Rules Present Only in Employee Handbook

```css
.toc-team-photo {
  display: block;
  width: 100%;
  height: 1.78in;
  object-fit: cover;
  object-position: center 34%;
  border: 0.8pt solid var(--brand-secondary);
  border-radius: 9pt;
  margin-top: 7pt;
  box-shadow: 0 5pt 14pt rgba(18, 35, 27, 0.14);
}
```

**Operations Manual:** This CSS rule is **absent** (line 382-394 deleted).

---

### 4. Spine Template Differences

**File:** `employee-handbook-spine.html` vs `operations-manual-spine.html`

| Element        | Employee Handbook                         | Operations Manual                         |
| -------------- | ----------------------------------------- | ----------------------------------------- |
| `<title>`      | MH Construction Employee Handbook — Spine | MH Construction Operations Manual — Spine |
| `.spine-title` | Employee Handbook                         | Operations Manual                         |

**Impact:** Text-only differences.

---

### 5. Tabs Template Differences

**File:** `employee-handbook-tabs.html` vs `operations-manual-tabs.html`

All occurrences of "Employee Handbook" replaced with "Operations Manual" in:

- Title tags
- Header identity labels
- QR alt text
- Section labels

**Impact:** Text-only differences.

---

## Minimal Changes Needed for Marketing/Sales Alignment

### Recommended Direction

Use a dedicated operations-style template set for marketing and sales guides so the output stays consistent, readable, and aligned with the technical-reference purpose of those documents.

### Practical Next Steps

1. Create dedicated marketing/sales template files for cover, section, TOC, spine, and tabs.
2. Reuse the operations-style layout patterns instead of relying on handbook text substitution alone.
3. Apply branding language and terminology updates in the template content rather than in ad hoc replacements.

## Related Resources

- [Development Standards](./index.md)
- [Page Template Guide](./page-template-guide.md)
- [Documentation Index](../../index.md)

### Strategy: Create Dedicated Operations-Style Templates for Marketing/Sales

**Rationale:**

- Current text-substitution approach cannot handle layout differences
- Operations manual layout is optimized for technical/reference usage
- Marketing and sales guides are technical reference documents (like operations), not culture documents (like handbook)

### Proposed Changes

#### Option A: Create Separate Template Files (Recommended)

**New files to create:**

1. `documents/manuals/marketing-strategy-guide-toc.html`
   - Copy from `operations-manual-toc.html`
   - Apply marketing terminology
   - Keep operations layout: wider chips, taller rows, no "Our Core Values" section

2. `documents/manuals/marketing-strategy-guide-cover.html`
   - Copy from `operations-manual-cover.html`
   - Customize summary card for marketing content

3. `documents/manuals/marketing-strategy-guide-section.html`
   - Copy from `operations-manual-section.html`
   - Apply marketing terminology

4. `documents/manuals/marketing-strategy-guide-spine.html`
   - Copy from `operations-manual-spine.html`
   - Apply marketing terminology

5. `documents/manuals/marketing-strategy-guide-tabs.html`
   - Copy from `operations-manual-tabs.html`
   - Apply marketing terminology

**Generate.mjs changes:**

```javascript
function resolveManualTemplateName(suffix) {
  // Remove special case - let each manual use its own templates
  return `${ACTIVE_MANUAL}-${suffix}.html`;
}
```

Remove or conditionally skip `adaptMarketingStrategyGuideTemplate()` calls.

**Pros:**

- Clean separation of concerns
- Easier to maintain and customize per manual type
- Follows established pattern (safety, handbook, operations each have their own)
- Future-proof for marketing/sales-specific customizations

**Cons:**

- 5 new files to create
- ~150 lines total duplication across templates

---

#### Option B: Enhanced Adaptation Function (Alternative)

Keep using employee handbook templates, but enhance `adaptMarketingStrategyGuideTemplate()` to:

1. Remove the `toc-feature-stage` section (regex replace)
2. Update CSS inline for TOC entries:
   - `.mish-entry { padding: 2.7pt 0; line-height: 1.28; }`
   - `.mish-code { width: 1.02in; min-width: 1.02in; }`
3. Delete `.toc-team-photo` CSS rule

**Implementation:**

```javascript
function adaptMarketingStrategyGuideTemplate(html) {
  const guideLabel = isSalesEstimatingGuide
    ? "Sales/Estimating Guide"
    : "Marketing Strategy Guide";
  // ... existing code ...

  let result = html.replaceAll("Employee Handbook", guideLabel);
  // ... existing replacements ...

  // Remove "Our Core Values" section from TOC templates
  if (html.includes("toc-feature-stage")) {
    result = result.replace(
      /<section class="toc-feature-stage"[^>]*>[\s\S]*?<\/section>\s*/,
      "",
    );
  }

  // Update TOC entry layout to match operations
  if (html.includes("mish-entry")) {
    result = result
      .replace(/padding: 2\.1pt 0;/, "padding: 2.7pt 0;")
      .replace(/line-height: 1\.2;/, "line-height: 1.28;")
      .replace(/width: 0\.92in;/g, "width: 1.02in;")
      .replace(/min-width: 0\.92in;/g, "min-width: 1.02in;");
  }

  // Remove team photo CSS rule
  if (html.includes("toc-team-photo")) {
    result = result.replace(/\.toc-team-photo\s*\{[\s\S]*?\}\s*/, "");
  }

  return result;
}
```

**Pros:**

- No new files
- All changes in one function
- Preserves existing architecture

**Cons:**

- Fragile regex patterns
- Harder to maintain and debug
- Mixes content and layout concerns
- Difficult to customize further

---

## Recommendation

### Option A: Create Dedicated Templates

### Rationale

1. **MDS Compliance:** Follows established pattern where each manual family has its own template set
2. **Maintainability:** Clear separation between handbook (culture/onboarding) and operations/marketing/sales (technical reference)
3. **Typography Parity:** Marketing and sales guides are technical references like operations, not culture documents like handbook
4. **Future-Proof:** Enables marketing/sales-specific customizations without affecting handbook
5. **Reduced Complexity:** Eliminates fragile regex patterns in adaptation function

### Implementation Priority

1. **Phase 1:** Create marketing/sales TOC template (highest visual impact)
   - Copy `operations-manual-toc.html` → `marketing-strategy-guide-toc.html`
   - Apply terminology substitutions
   - Update `resolveManualTemplateName()` and generator logic

2. **Phase 2:** Create remaining templates (cover, section, spine, tabs)
   - Copy from operations templates
   - Apply terminology substitutions
   - Remove or simplify `adaptMarketingStrategyGuideTemplate()`

3. **Phase 3:** Regenerate and validate
   - Rebuild marketing/sales PDFs
   - Visual verification (especially TOC entry spacing/width)
   - Handoff to `manual-structure-officer` for final audit

---

## Layout Specification Summary

### Operations-Style TOC Entries (Target for Marketing/Sales)

```css
.mish-entry {
  padding: 2.7pt 0; /* NOT 2.1pt */
  line-height: 1.28; /* NOT 1.2 */
}

.mish-code {
  width: 1.02in; /* NOT 0.92in */
  min-width: 1.02in; /* NOT 0.92in */
}
```

### Page 2 Content Policy

- **Handbook:** Include `toc-feature-stage` with core values, team photo, owner quote
- **Operations/Marketing/Sales:** **Exclude** `toc-feature-stage`; show only TOC clusters and footer

---

## Files Requiring Changes (Option A)

### New Files to Create

1. `/workspaces/mh-website/documents/manuals/marketing-strategy-guide-toc.html`
2. `/workspaces/mh-website/documents/manuals/marketing-strategy-guide-cover.html`
3. `/workspaces/mh-website/documents/manuals/marketing-strategy-guide-section.html`
4. `/workspaces/mh-website/documents/manuals/marketing-strategy-guide-spine.html`
5. `/workspaces/mh-website/documents/manuals/marketing-strategy-guide-tabs.html`

### Files to Modify

1. `/workspaces/mh-website/documents/scripts/generate.mjs`
   - Update `resolveManualTemplateName()` to remove special case
   - Simplify or remove `adaptMarketingStrategyGuideTemplate()` (now only needed for in-place token substitution if any)
   - Update template resolution logic

---

## MDS Compliance Notes

### Clauses Affected

- **§7:** Header logo & brand chrome — no changes, preserved in all templates
- **§8:** Brand tokens — no changes, all templates use token system
- **§14:** Standardized pillbox corner radius — `1.5pt` already present in operations TOC, will carry over
- **§10:** Hierarchical section numbering — inherited from operations template

### Guardrails

- ✅ All new templates will use brand CSS variables (no hard-coded colors)
- ✅ Footer accreditation logos remain mandatory across all templates
- ✅ Military-themed framing preserved in all operations-style manuals
- ✅ Page margins remain consistent with MDS §5 (operations template values)

---

## Testing Checklist

After implementation:

- [ ] Regenerate marketing guide TOC: `node documents/scripts/generate.mjs --manual marketing --template toc`
- [ ] Regenerate sales guide TOC: `node documents/scripts/generate.mjs --manual sales --template toc`
- [ ] Visual verification: confirm wider chips (1.02in) and taller rows (2.7pt padding)
- [ ] Confirm "Our Core Values" section is absent
- [ ] PNG preview rendering for manual review
- [ ] Full rebuild: sections, cover, spine, tabs
- [ ] MD5 comparison to confirm changes took effect
- [ ] Handoff to `manual-structure-officer` for typography audit

---

## Conclusion

**Minimal changes required:**

1. Create 5 new template files by copying operations templates
2. Apply terminology substitutions (marketing/sales vs operations)
3. Update `resolveManualTemplateName()` to remove special case
4. Regenerate marketing/sales PDFs

**Typography alignment achieved:**

- ✅ TOC entries match operations layout (wider chips, taller rows)
- ✅ No culture/onboarding content in technical reference documents
- ✅ Consistent reference-document styling across operations, marketing, and sales

**MDS compliance maintained:**

- All brand tokens, chrome, and footer standards preserved
- Follows established template-per-manual-family pattern
- Enables future customization without cross-contamination
