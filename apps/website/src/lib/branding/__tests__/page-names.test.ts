import {
  buildDualSeoTitle,
  getDualPageName,
  getDualPageNameByKey,
  MH_DUAL_PHRASES,
  normalizeMhPhrase,
} from "../page-names";

describe("Dual terminology standard", () => {
  it("resolves known label aliases to dual page names", () => {
    expect(getDualPageName("Home")).toBe("Home (Command Center)");
    expect(getDualPageName("services")).toBe("Services (Operations Brief)");
    expect(getDualPageName("Contact Us")).toBe("Contact (Comms Desk)");
    expect(getDualPageName("Get in Touch")).toBe("Contact (Comms Desk)");
    expect(getDualPageName("Our Work")).toBe("Projects (Our Work)");
    expect(getDualPageName("Partners")).toBe("Partners (Allied Network)");
    expect(getDualPageName("Safety Hub")).toBe("Safety (Safety Command)");
    expect(getDualPageName("Trade Partners")).toBe("Partners (Allied Network)");
    expect(getDualPageName("Government Projects")).toBe(
      "Government (Civic Operations)",
    );
    expect(getDualPageName("Privacy Policy")).toBe(
      "Privacy Policy (Privacy Standards)",
    );
    expect(getDualPageName("Terms of Service")).toBe(
      "Terms of Service (Service Terms)",
    );
    expect(getDualPageName("Accessibility")).toBe(
      "Accessibility (Access Standards)",
    );
    expect(getDualPageName("Help Center")).toBe("Help/FAQ (Intel Brief)");
    expect(getDualPageName("Questions & Answers")).toBe(
      "Help/FAQ (Intel Brief)",
    );
    expect(getDualPageName("Safety Program")).toBe(
      "Safety Program (Program Command)",
    );
    expect(getDualPageName("Safety Manual")).toBe(
      "Safety Manual (Manual Operations)",
    );
    expect(getDualPageName("Public Sector Projects")).toBe(
      "Public Sector Projects (Civic Operations)",
    );
    expect(getDualPageName("Veteran-Led Compliance")).toBe(
      "Veteran-Led Compliance (Compliance Command)",
    );
    expect(getDualPageName("Tri-State Government Construction")).toBe(
      "Tri-State Government Construction (Regional Civic Delivery)",
    );
    expect(getDualPageName("Forms Index")).toBe("Safety Forms (Form Control)");
    expect(getDualPageName("Crew")).toBe("Our Team (Command Staff)");
  });

  it("returns original label when no dual terminology alias exists", () => {
    expect(getDualPageName("Richland, WA")).toBe("Richland, WA");
  });

  it("builds standardized dual SEO title format", () => {
    expect(
      buildDualSeoTitle("home", "Construction Planning and Delivery in WA"),
    ).toBe(
      "Home (Command Center) | Construction Planning and Delivery in WA | MH Construction",
    );
  });

  it("normalizes canonical MH phrases", () => {
    expect(normalizeMhPhrase("veteran-owned")).toBe("Veteran-Owned");
    expect(normalizeMhPhrase("veteran owned")).toBe("Veteran-Owned");
    expect(normalizeMhPhrase("veteran-owned leadership")).toBe(
      "Veteran-Owned leadership",
    );
    expect(normalizeMhPhrase("Built on Quality, Backed by Trust")).toBe(
      MH_DUAL_PHRASES.primarySlogan,
    );
    expect(normalizeMhPhrase("built on quality backed by trust")).toBe(
      MH_DUAL_PHRASES.primarySlogan,
    );
  });

  it("resolves dual page names by terminology key", () => {
    expect(getDualPageNameByKey("faq")).toBe("Help/FAQ (Intel Brief)");
    expect(getDualPageNameByKey("offline")).toBe("Offline (Connection Status)");
    expect(getDualPageNameByKey("incidentReport")).toBe(
      "Incident Report (Incident Command)",
    );
  });
});
