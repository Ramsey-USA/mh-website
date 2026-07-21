import {
  getUniversalCta,
  getUniversalCtaSet,
  type UniversalCtaKey,
} from "@/lib/content/universal-ctas";

describe("universal-ctas", () => {
  const expectedEnglish: Record<
    UniversalCtaKey,
    { href: string; label: string }
  > = {
    primary: { href: "/contact", label: "Discuss Your Project" },
    portfolio: { href: "/projects", label: "View Project Portfolio" },
    services: { href: "/contact", label: "Schedule a Capability Review" },
    caseStudy: { href: "/contact", label: "Discuss a Similar Project" },
    publicSector: {
      href: "/contact",
      label: "Request Public-Sector Capability Review",
    },
    allServices: { href: "/services", label: "View All Services" },
    pitchDeck: {
      href: "/contact?subject=pitch-deck",
      label: "Request Pitch Deck",
    },
    publicSectorOverview: {
      href: "/public-sector",
      label: "View Public-Sector Capabilities",
    },
    capabilitiesBrief: {
      href: "/contact?subject=Request%20Federal%20Capabilities%20Brief",
      label: "Request Federal Capabilities Brief",
    },
  };

  it("returns the canonical English CTA map", () => {
    expect(getUniversalCtaSet("en")).toEqual(expectedEnglish);
  });

  it("returns Spanish CTA labels while keeping the same route targets", () => {
    const spanish = getUniversalCtaSet("es");

    expect(spanish.primary.label).toBe("Hablemos de su proyecto");
    expect(spanish.services.label).toBe(
      "Programar una revision de capacidades",
    );
    expect(spanish.publicSector.label).toBe(
      "Solicitar revision de capacidades del sector publico",
    );
    expect(spanish.pitchDeck.href).toBe(expectedEnglish.pitchDeck.href);
    expect(spanish.capabilitiesBrief.href).toBe(
      expectedEnglish.capabilitiesBrief.href,
    );
  });

  it("defaults unknown or omitted locales to English", () => {
    expect(getUniversalCta("primary")).toEqual(expectedEnglish.primary);
    expect(getUniversalCta("portfolio", "en")).toEqual(
      expectedEnglish.portfolio,
    );
  });
});
