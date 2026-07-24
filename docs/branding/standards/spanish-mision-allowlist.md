# Spanish Mision Allowlist

**Category:** Branding - Language Governance
**Last Updated:** July 24, 2026
**Status:** Official Exception Register

## Purpose

Track the limited Spanish-language uses of mision/mision-related phrasing that are intentionally retained as veteran-program context, not as primary construction-service terminology.

This register supports the construction-first SEO and copy standard while preserving approved veteran-identity language.

## Scope

- File scope: messages/es.json
- Audience scope: Public-facing Spanish copy
- Governance rule: Construction terminology leads service/SEO language; mission language is secondary and contextual only.

## Approved Allowlist (Exact Paths)

1. accessibilityPage.sections.measures.items[0]

- Current text: Incluir la accesibilidad como parte de nuestra declaracion de mision
- Reason: Organization-level mission statement for accessibility policy context.

2. veteransPage.support.subtitle

- Current text: Compromiso de Mision
- Reason: Veteran-support program framing, not service-category terminology.

3. veteransPage.partnerships.criteria.nonProfit.description

- Current text includes: mision clara y metricas de impacto documentadas
- Reason: Nonprofit governance criteria language.

4. veteransPage.partnerships.criteria.mission.aria

- Current text: Mision Enfocada en Veteranos - Servicio Primero
- Reason: Accessibility label for veteran-focused criteria card.

5. veteransPage.partnerships.criteria.mission.title

- Current text: Mision Enfocada en Veteranos
- Reason: Veteran-program criteria title.

6. veteransPage.partnerships.criteria.mission.description

- Current text begins: La mision principal debe servir a veteranos...
- Reason: Program definition for veteran-service alignment.

7. veteransPage.partnerships.criteria.mission.stats

- Current text: Enfoque Guiado por Mision
- Reason: KPI label for veteran-program criteria.

8. veteransPage.benefits.items[service-recognition].description

- Current text includes: enfoque en la mision
- Reason: Veteran-values framing in recognition content.

9. home.hero.mission (key)

- Current text value: Built on Quality, Backed by Trust. (Construidos sobre calidad, respaldados por confianza.)
- Reason: Data key naming convention; value is the canonical slogan.

## Non-Allowlisted Rule

Any new Spanish copy using mision/misiones/despliegue in service descriptions, SEO labels, process titles, CTA text, or route metadata is non-compliant unless explicitly approved and added here.

## Change Control

- Reviewer: Branding/SEO owner
- Trigger: Any PR touching messages/es.json or Spanish public copy
- Required check: Confirm new mission-language instances are either removed or added to this allowlist with justification

## Related Standards

- ./seo-terminology-standard.md
- ../strategy/universal-terminology-guide.md
- ../../../.github/instructions/mh-branding-guardrails.instructions.md
