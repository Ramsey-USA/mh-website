import { COMPANY_INFO, EMAIL_RECIPIENTS } from "@/lib/constants/company";

describe("COMPANY_INFO", () => {
  it("has a name field", () => {
    expect(COMPANY_INFO.name).toBe("MH Construction");
  });

  describe("phone", () => {
    it("has a display field", () => {
      expect(COMPANY_INFO.phone.display).toBeTruthy();
    });

    it("tel starts with +1 (international format)", () => {
      expect(COMPANY_INFO.phone.tel).toMatch(/^\+1\d+$/);
    });

    it("tel matches the tel: link format", () => {
      expect(COMPANY_INFO.phone.tel).toBe("+15093086489");
    });

    it("raw contains only digits", () => {
      expect(COMPANY_INFO.phone.raw).toMatch(/^\d+$/);
    });
  });

  describe("email", () => {
    it("main is a valid email address", () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      expect(emailRegex.test(COMPANY_INFO.email.main)).toBe(true);
    });

    it("owner is a valid email address", () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      expect(emailRegex.test(COMPANY_INFO.email.owner)).toBe(true);
    });
  });

  describe("address", () => {
    it("has street, city, state, zip, and country fields", () => {
      expect(COMPANY_INFO.address.street).toBeTruthy();
      expect(COMPANY_INFO.address.city).toBeTruthy();
      expect(COMPANY_INFO.address.state).toBeTruthy();
      expect(COMPANY_INFO.address.zip).toBeTruthy();
      expect(COMPANY_INFO.address.country).toBeTruthy();
    });

    it("has convenience full address", () => {
      expect(COMPANY_INFO.address.full).toContain(COMPANY_INFO.address.city);
      expect(COMPANY_INFO.address.full).toContain(COMPANY_INFO.address.state);
    });

    it("stateCode matches state", () => {
      expect(COMPANY_INFO.address.stateCode).toBe(COMPANY_INFO.address.state);
    });
  });

  describe("coordinates", () => {
    it("latitude is a number", () => {
      expect(typeof COMPANY_INFO.coordinates.latitude).toBe("number");
    });

    it("longitude is a number", () => {
      expect(typeof COMPANY_INFO.coordinates.longitude).toBe("number");
    });

    it("latitude is in a plausible range for Pacific Northwest", () => {
      expect(COMPANY_INFO.coordinates.latitude).toBeGreaterThan(40);
      expect(COMPANY_INFO.coordinates.latitude).toBeLessThan(50);
    });

    it("longitude is negative (western hemisphere)", () => {
      expect(COMPANY_INFO.coordinates.longitude).toBeLessThan(0);
    });
  });

  describe("hours", () => {
    it("has weekday open and close times", () => {
      expect(COMPANY_INFO.hours.weekday.open).toBeTruthy();
      expect(COMPANY_INFO.hours.weekday.close).toBeTruthy();
      expect(COMPANY_INFO.hours.weekday.display).toBeTruthy();
    });

    it("has weekend display", () => {
      expect(COMPANY_INFO.hours.weekend.display).toBeTruthy();
    });

    it("weekend open is null (closed)", () => {
      expect(COMPANY_INFO.hours.weekend.open).toBeNull();
      expect(COMPANY_INFO.hours.weekend.close).toBeNull();
    });
  });

  describe("social", () => {
    it("has facebook URL", () => {
      expect(COMPANY_INFO.social.facebook).toMatch(/^https?:\/\//);
    });

    it("has instagram URL", () => {
      expect(COMPANY_INFO.social.instagram).toMatch(/^https?:\/\//);
    });

    it("has linkedin URL", () => {
      expect(COMPANY_INFO.social.linkedin).toMatch(/^https?:\/\//);
    });

    it("has youtube URL", () => {
      expect(COMPANY_INFO.social.youtube).toMatch(/^https?:\/\//);
    });

    it("has twitter URL", () => {
      expect(COMPANY_INFO.social.twitter).toMatch(/^https?:\/\//);
    });

    it("has twitterHandle starting with @", () => {
      expect(COMPANY_INFO.social.twitterHandle).toMatch(/^@/);
    });
  });

  describe("details", () => {
    it("has foundingYear as a number", () => {
      expect(typeof COMPANY_INFO.details.foundingYear).toBe("number");
    });

    it("veteranOwned is boolean true", () => {
      expect(COMPANY_INFO.details.veteranOwned).toBe(true);
    });

    it("licenses is an array", () => {
      expect(Array.isArray(COMPANY_INFO.details.licenses)).toBe(true);
      expect(COMPANY_INFO.details.licenses.length).toBeGreaterThan(0);
    });

    it("serviceArea is defined", () => {
      expect(COMPANY_INFO.details.serviceArea).toBeTruthy();
    });
  });

  describe("urls", () => {
    it("site is a string URL", () => {
      expect(typeof COMPANY_INFO.urls.site).toBe("string");
      expect(COMPANY_INFO.urls.site).toMatch(/^https?:\/\//);
    });

    it("getSiteUrl() returns a URL string", () => {
      const url = COMPANY_INFO.urls.getSiteUrl();
      expect(typeof url).toBe("string");
      expect(url).toMatch(/^https?:\/\//);
    });

    it("getSiteUrl() uses NEXT_PUBLIC_SITE_URL env var when set", () => {
      // jest.setup.js sets NEXT_PUBLIC_SITE_URL = "http://localhost:3000"
      expect(COMPANY_INFO.urls.getSiteUrl()).toBe("http://localhost:3000");
    });
  });
});

describe("EMAIL_RECIPIENTS", () => {
  it("has a general array", () => {
    expect(Array.isArray(EMAIL_RECIPIENTS.general)).toBe(true);
    expect(EMAIL_RECIPIENTS.general.length).toBeGreaterThan(0);
  });

  it("has a contact array", () => {
    expect(Array.isArray(EMAIL_RECIPIENTS.contact)).toBe(true);
    expect(EMAIL_RECIPIENTS.contact.length).toBeGreaterThan(0);
  });

  it("has a careers array", () => {
    expect(Array.isArray(EMAIL_RECIPIENTS.careers)).toBe(true);
    expect(EMAIL_RECIPIENTS.careers.length).toBeGreaterThan(0);
  });

  it("general contains the main company email", () => {
    expect(EMAIL_RECIPIENTS.general).toContain(COMPANY_INFO.email.main);
  });

  it("contact contains the main company email", () => {
    expect(EMAIL_RECIPIENTS.contact).toContain(COMPANY_INFO.email.main);
  });

  it("careers contains the main company email", () => {
    expect(EMAIL_RECIPIENTS.careers).toContain(COMPANY_INFO.email.main);
  });

  it("all recipient emails are valid email addresses", () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const allEmails = [
      ...EMAIL_RECIPIENTS.general,
      ...EMAIL_RECIPIENTS.contact,
      ...EMAIL_RECIPIENTS.careers,
    ];
    allEmails.forEach((email) => {
      expect(emailRegex.test(email)).toBe(true);
    });
  });
});
