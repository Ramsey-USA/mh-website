/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import { projectCaseStudies } from "@/lib/data/project-case-studies";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

jest.mock("next-intl/server", () => ({
  getTranslations: async () => ({
    raw: () => [],
  }),
}));

jest.mock("@/lib/i18n/locale.server", () => ({
  getServerLocale: async () => "en",
}));

jest.mock("@/lib/content/universal-ctas", () => ({
  getUniversalCtaSet: () => ({
    services: { label: "Explore Services" },
    portfolio: { label: "View Projects" },
    primary: { label: "Start a project conversation" },
  }),
}));

jest.mock("@/lib/content/hero-page-slogans", () => ({
  getHeroPageSlogan: () => ({ slogan: "Mission-ready delivery" }),
}));

jest.mock("@/components/services", () => ({
  ServicesHero: () => <section id="hero" />,
  ConstructionExpertiseSection: () => <section id="expertise" />,
  CoreServicesSection: () => <section id="core-services" />,
  SpecialtyServicesSection: () => <section id="specialty" />,
  ConstructionProcessSection: () => <section id="process" />,
  WhyChooseUs: () => <section id="trust-in-action" />,
  GovernmentProjectsSection: () => <section id="government" />,
  ServiceAreasSection: () => <section id="service-areas" />,
}));

jest.mock("@/components/shared-sections/JeremyAuthorityLinksStrip", () => ({
  JeremyAuthorityLinksStrip: () => <section id="jeremy-strip" />,
}));

jest.mock("@/components/shared-sections", () => ({
  NextStepsSection: () => (
    <section id="next-steps">
      <a href="/contact">Contact</a>
      <a href="/projects">Projects</a>
      <a href="/public-sector">Public Sector</a>
    </section>
  ),
}));

jest.mock("@/components/templates", () => ({
  BrandedContentSection: ({
    children,
    id,
  }: {
    children: React.ReactNode;
    id?: string;
  }) => <section id={id}>{children}</section>,
}));

describe("ServicesPage", () => {
  it("renders the hub sections in buyer-question order and ends with the canonical next action", async () => {
    const { default: ServicesPage } = await import("../page");
    const ui = await ServicesPage();
    render(ui);

    const sectionIds = [
      "hero",
      "jeremy-strip",
      "expertise",
      "core-services",
      "specialty",
      "process",
      "trust-in-action",
      "government",
      "service-proof",
      "service-areas",
      "next-steps",
    ];

    sectionIds.forEach((id) => {
      expect(document.getElementById(id)).not.toBeNull();
    });

    for (let index = 1; index < sectionIds.length; index += 1) {
      const previous = document.getElementById(sectionIds[index - 1]!)!;
      const current = document.getElementById(sectionIds[index]!)!;
      expect(
        previous.compareDocumentPosition(current) &
          Node.DOCUMENT_POSITION_FOLLOWING,
      ).not.toBe(0);
    }

    const proofProjects = projectCaseStudies
      .filter((project) => project.isPublished !== false)
      .slice(0, 3);

    const proofLinks = screen.getAllByRole("link", {
      name: /View case study|Ver estudio de caso/i,
    });
    expect(proofLinks).toHaveLength(proofProjects.length);
    proofProjects.forEach((project) => {
      expect(
        proofLinks.some(
          (link) => link.getAttribute("href") === `/projects/${project.slug}`,
        ),
      ).toBe(true);
    });

    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "/contact",
    );
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute(
      "href",
      "/projects",
    );
    expect(screen.getByRole("link", { name: "Public Sector" })).toHaveAttribute(
      "href",
      "/public-sector",
    );
  });
});
