import fs from "fs";
import path from "path";

describe("site voice alignment", () => {
  const rootDir = path.resolve(__dirname, "..", "..", "..", "..", "..");
  const messagesPath = path.join(rootDir, "messages", "en.json");
  const homeMessagesPath = path.join(rootDir, "messages", "home", "en.json");
  const enMessages = JSON.parse(fs.readFileSync(messagesPath, "utf8"));
  const homeEnMessages = JSON.parse(fs.readFileSync(homeMessagesPath, "utf8"));

  it("uses operationally grounded language across the main public-facing routes", () => {
    const aboutBody = enMessages.common.about.pageContent.body.toLowerCase();
    const servicesHeroDescription =
      enMessages.home.services.hero.sectionDescription.toLowerCase();
    const servicesSectionDescription =
      enMessages.home.services.expertise.sectionDescription.toLowerCase();
    const careersDescription =
      enMessages.careersPage.whyChoose.description.middle.toLowerCase();
    const locationsDescription =
      enMessages.locations.hero.description.toLowerCase();
    const safetyTagline = enMessages.safetyPage.hero.tagline.toLowerCase();

    expect(aboutBody).toContain("disciplined planning");
    expect(servicesHeroDescription).toContain("accountable delivery");
    expect(servicesSectionDescription).toContain("accountable");
    expect(careersDescription).toContain("accountable delivery");
    expect(locationsDescription).toContain("accountable delivery");
    expect(safetyTagline).toContain("accountable delivery");
  });

  it("surfaces the new operating-model language across home, about, and services copy", () => {
    const aboutBody = enMessages.common.about.pageContent.body.toLowerCase();
    const homeTagline = homeEnMessages.hero.tagline.toLowerCase();
    const servicesDescription =
      homeEnMessages.services.sectionDescription.toLowerCase();
    const whyPartnerDescription =
      homeEnMessages.whyPartner.sectionDescription.toLowerCase();

    expect(aboutBody).toContain("zero-gap accountability");
    expect(homeTagline).toContain("ground truth");
    expect(servicesDescription).toContain("mission-ready handoff");
    expect(whyPartnerDescription).toContain("ground truth");
  });
});
