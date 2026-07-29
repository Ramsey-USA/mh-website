import fs from "fs";
import path from "path";

describe("site voice alignment", () => {
  const rootDir = path.resolve(__dirname, "..", "..", "..", "..", "..");
  const messagesPath = path.join(rootDir, "messages", "en.json");
  const enMessages = JSON.parse(fs.readFileSync(messagesPath, "utf8"));

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
});
