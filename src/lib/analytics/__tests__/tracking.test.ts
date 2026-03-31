import {
  initializeSession,
  trackClick,
  trackFormSubmit,
  trackPageDuration,
  trackPageView,
  trackScrollDepth,
} from "../tracking";

const trackMock = jest.fn();
const trackPageViewMock = jest.fn();
const getEnhancedTrackingPropertiesSyncMock = jest.fn();
const getDeviceInfoMock = jest.fn();
const getGeographicLocationMock = jest.fn();
const beaconPageviewMock = jest.fn();
const beaconClickMock = jest.fn();
const beaconConversionMock = jest.fn();
const beaconSessionEndMock = jest.fn();

jest.mock("../index", () => ({
  analyticsEngine: {
    track: (...args: unknown[]) => trackMock(...args),
    trackPageView: (...args: unknown[]) => trackPageViewMock(...args),
  },
}));

jest.mock("../metadata", () => ({
  getEnhancedTrackingPropertiesSync: () =>
    getEnhancedTrackingPropertiesSyncMock(),
  getDeviceInfo: () => getDeviceInfoMock(),
}));

jest.mock("../geolocation", () => ({
  getGeographicLocation: () => getGeographicLocationMock(),
}));

jest.mock("../beacon", () => ({
  beaconPageview: (...args: unknown[]) => beaconPageviewMock(...args),
  beaconClick: (...args: unknown[]) => beaconClickMock(...args),
  beaconConversion: (...args: unknown[]) => beaconConversionMock(...args),
  beaconSessionEnd: (...args: unknown[]) => beaconSessionEndMock(...args),
}));

describe("analytics tracking helpers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    getEnhancedTrackingPropertiesSyncMock.mockReturnValue({
      campaign: "spring",
      medium: "email",
    });
    getDeviceInfoMock.mockReturnValue({
      type: "desktop",
      browser: "Chrome",
      os: "Linux",
    });
    getGeographicLocationMock.mockResolvedValue({
      country: "US",
      state: "WA",
      city: "Pasco",
      source: "cloudflare",
    });

    window.history.replaceState({}, "", "/contact");
  });

  it("tracks clicks, stores them locally, and sends a beacon with location metadata", async () => {
    trackClick("hero-cta", { section: "hero" });

    expect(trackMock).toHaveBeenCalledWith(
      "user_interaction",
      expect.objectContaining({
        element: "hero-cta",
        action: "click",
        campaign: "spring",
        medium: "email",
        section: "hero",
      }),
    );

    await Promise.resolve();

    expect(
      JSON.parse(localStorage.getItem("mh_analytics_clicks") || "[]"),
    ).toEqual([
      expect.objectContaining({
        element: "hero-cta",
        page: "/contact",
        deviceType: "desktop",
        browser: "Chrome",
        os: "Linux",
        country: "US",
        state: "WA",
        city: "Pasco",
        section: "hero",
      }),
    ]);
    expect(beaconClickMock).toHaveBeenCalledWith(
      "hero-cta",
      expect.objectContaining({
        page: "/contact",
        country: "US",
        city: "Pasco",
      }),
    );
  });

  it("falls back gracefully when geolocation lookup fails", async () => {
    getGeographicLocationMock.mockRejectedValueOnce(new Error("offline"));

    trackClick("footer-link");
    await Promise.resolve();
    await Promise.resolve();

    const clicks = JSON.parse(
      localStorage.getItem("mh_analytics_clicks") || "[]",
    );
    expect(clicks[0]).toEqual(
      expect.objectContaining({
        element: "footer-link",
        deviceType: "desktop",
      }),
    );
    expect(clicks[0].country).toBeUndefined();
    expect(beaconClickMock).toHaveBeenCalledWith(
      "footer-link",
      expect.objectContaining({ page: "/contact" }),
    );
  });

  it("tracks form submissions and updates conversion counters", () => {
    trackFormSubmit("contact-form", { source: "footer" });
    trackFormSubmit("consultation-request");

    expect(trackMock).toHaveBeenNthCalledWith(
      1,
      "form_submission",
      expect.objectContaining({ formId: "contact-form", source: "footer" }),
    );
    expect(trackMock).toHaveBeenNthCalledWith(
      2,
      "form_submission",
      expect.objectContaining({ formId: "consultation-request" }),
    );

    expect(
      JSON.parse(localStorage.getItem("mh_analytics_conversions") || "{}"),
    ).toEqual({ total: 2, consultations: 1, contacts: 1 });
    expect(beaconConversionMock).toHaveBeenNthCalledWith(1, "contact");
    expect(beaconConversionMock).toHaveBeenNthCalledWith(2, "consultation");
  });

  it("tracks scroll depth, page views, and page duration with storage updates", () => {
    localStorage.setItem(
      "mh_analytics_sessions",
      JSON.stringify([
        {
          id: "session-1",
          startTime: new Date("2026-03-27T10:00:00.000Z").toISOString(),
          duration: 15,
          pageViews: 1,
        },
      ]),
    );

    trackScrollDepth(80);
    trackPageView("/veterans");
    trackPageDuration("/veterans", 45);

    expect(trackMock).toHaveBeenCalledWith(
      "user_interaction",
      expect.objectContaining({
        action: "scroll",
        depth: 80,
        page: "/contact",
      }),
    );
    expect(trackPageViewMock).toHaveBeenCalledWith("/veterans", undefined);
    expect(trackMock).toHaveBeenCalledWith(
      "user_interaction",
      expect.objectContaining({
        action: "duration",
        duration: 45,
        page: "/veterans",
      }),
    );

    expect(
      JSON.parse(localStorage.getItem("mh_analytics_pageviews") || "{}"),
    ).toEqual({
      total: 1,
      unique: 0,
      sessions: 0,
      pages: { "/veterans": 1 },
      veteran: 1,
    });
    expect(
      JSON.parse(localStorage.getItem("mh_analytics_sessions") || "[]"),
    ).toEqual([expect.objectContaining({ duration: 60, pageViews: 2 })]);
    expect(beaconPageviewMock).toHaveBeenCalledWith("/veterans");
    expect(beaconSessionEndMock).toHaveBeenCalledWith(45);
  });

  it("initializes sessions and keeps only the latest 100 entries", () => {
    const existingSessions = Array.from({ length: 100 }, (_, index) => ({
      id: `session-${index}`,
      startTime: new Date(
        `2026-03-27T10:${String(index % 60).padStart(2, "0")}:00.000Z`,
      ).toISOString(),
      duration: index,
      pageViews: 1,
    }));
    localStorage.setItem(
      "mh_analytics_sessions",
      JSON.stringify(existingSessions),
    );

    initializeSession();

    const sessions = JSON.parse(
      localStorage.getItem("mh_analytics_sessions") || "[]",
    );
    const pageViews = JSON.parse(
      localStorage.getItem("mh_analytics_pageviews") || "{}",
    );

    expect(sessions).toHaveLength(100);
    expect(sessions[0].id).toBe("session-1");
    expect(sessions[99].id).toMatch(/^session-/);
    expect(pageViews.sessions).toBe(101);
    expect(pageViews.unique).toBe(Math.floor(101 * 0.7));
  });
});
