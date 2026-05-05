/**
 * Tests for analytics/marketing-tracking.ts
 *
 * Covers all 4 exported functions:
 * trackServiceInterest, trackProjectInterest,
 * trackJourneyMilestone, trackLandingPage
 */

jest.mock("../tracking", () => ({
  trackClick: jest.fn(),
}));

import {
  trackServiceInterest,
  trackProjectInterest,
  trackJourneyMilestone,
  trackLandingPage,
} from "../marketing-tracking";

function getTrackClickMock() {
  return jest.requireMock("../tracking").trackClick as jest.Mock;
}

beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
  window.history.replaceState({}, "", "/");
});

// ---- trackServiceInterest ----

describe("trackServiceInterest()", () => {
  it("calls trackClick with service-view element and correct properties", () => {
    trackServiceInterest("Custom Homes", "view");
    expect(getTrackClickMock()).toHaveBeenCalledWith("service-view", {
      serviceName: "Custom Homes",
      category: "service-interest",
      action: "view",
    });
  });

  it("calls trackClick with service-click element", () => {
    trackServiceInterest("Commercial Build", "click", { page: "/services" });
    expect(getTrackClickMock()).toHaveBeenCalledWith("service-click", {
      serviceName: "Commercial Build",
      category: "service-interest",
      action: "click",
      page: "/services",
    });
  });

  it("calls trackClick with service-modal_open element", () => {
    trackServiceInterest("Remodeling", "modal_open");
    expect(getTrackClickMock()).toHaveBeenCalledWith("service-modal_open", {
      serviceName: "Remodeling",
      category: "service-interest",
      action: "modal_open",
    });
  });
});

// ---- trackProjectInterest ----

describe("trackProjectInterest()", () => {
  it("calls trackClick with project-view and correct properties", () => {
    trackProjectInterest("River View Homes", "residential", "view");
    expect(getTrackClickMock()).toHaveBeenCalledWith("project-view", {
      projectTitle: "River View Homes",
      projectType: "residential",
      category: "project-interest",
      action: "view",
    });
  });

  it("calls trackClick with project-click element", () => {
    trackProjectInterest("City Hall Annex", "commercial", "click", {
      source: "portfolio",
    });
    expect(getTrackClickMock()).toHaveBeenCalledWith("project-click", {
      projectTitle: "City Hall Annex",
      projectType: "commercial",
      category: "project-interest",
      action: "click",
      source: "portfolio",
    });
  });

  it("calls trackClick with project-image_view element", () => {
    trackProjectInterest("Veterans Facility", "public", "image_view");
    expect(getTrackClickMock()).toHaveBeenCalledWith("project-image_view", {
      projectTitle: "Veterans Facility",
      projectType: "public",
      category: "project-interest",
      action: "image_view",
    });
  });
});

// ---- trackJourneyMilestone ----

describe("trackJourneyMilestone()", () => {
  it("stores milestone in localStorage", () => {
    trackJourneyMilestone("entered_site");
    const journey = JSON.parse(localStorage.getItem("mh_user_journey") ?? "[]");
    expect(journey).toHaveLength(1);
    expect(journey[0].milestone).toBe("entered_site");
    expect(journey[0].timestamp).toBeTruthy();
  });

  it("appends milestones in sequence", () => {
    trackJourneyMilestone("entered_site");
    trackJourneyMilestone("viewed_services");
    trackJourneyMilestone("viewed_contact");
    const journey = JSON.parse(localStorage.getItem("mh_user_journey") ?? "[]");
    expect(journey).toHaveLength(3);
    expect(journey[2].milestone).toBe("viewed_contact");
  });

  it("trims journey to last 50 milestones", () => {
    const existing = Array.from({ length: 50 }, (_, i) => ({
      milestone: "entered_site",
      timestamp: new Date().toISOString(),
      page: `/page-${i}`,
    }));
    localStorage.setItem("mh_user_journey", JSON.stringify(existing));
    trackJourneyMilestone("completed_form");
    const journey = JSON.parse(localStorage.getItem("mh_user_journey") ?? "[]");
    expect(journey).toHaveLength(50);
    expect(journey[49].milestone).toBe("completed_form");
  });

  it("calls trackClick with correct journey data", () => {
    trackJourneyMilestone("started_form", { formId: "contact" });
    expect(getTrackClickMock()).toHaveBeenCalledWith(
      "journey-started_form",
      expect.objectContaining({
        milestone: "started_form",
        category: "user-journey",
        formId: "contact",
      }),
    );
  });

  it("increments journeyStep on each call", () => {
    trackJourneyMilestone("entered_site");
    trackJourneyMilestone("viewed_services");
    const calls = getTrackClickMock().mock.calls;
    expect(calls[0][1].journeyStep).toBe(1);
    expect(calls[1][1].journeyStep).toBe(2);
  });
});

// ---- trackLandingPage ----

describe("trackLandingPage()", () => {
  it("records landing page on first call", () => {
    trackLandingPage("/services", "https://google.com");
    const session = JSON.parse(
      localStorage.getItem("mh_analytics_landing") ?? "{}",
    );
    expect(session.landingPage).toBe("/services");
    expect(session.referrer).toBe("https://google.com");
    expect(session.entryTime).toBeTruthy();
  });

  it("does not overwrite landing page on subsequent calls in the same session", () => {
    trackLandingPage("/services", "https://google.com");
    trackLandingPage("/about", "https://bing.com");
    const session = JSON.parse(
      localStorage.getItem("mh_analytics_landing") ?? "{}",
    );
    expect(session.landingPage).toBe("/services"); // not overwritten
  });

  it("calls trackClick with landing-page event", () => {
    trackLandingPage("/contact", "(direct)");
    expect(getTrackClickMock()).toHaveBeenCalledWith("landing-page", {
      landingPage: "/contact",
      referrer: "(direct)",
      category: "session-tracking",
    });
  });

  it("does not call trackClick on subsequent calls once landing is set", () => {
    trackLandingPage("/home", "https://google.com");
    trackLandingPage("/about", "https://bing.com");
    expect(getTrackClickMock()).toHaveBeenCalledTimes(1);
  });
});
