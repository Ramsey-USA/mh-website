/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen } from "@testing-library/react";

const sendBeaconMock = jest.fn().mockReturnValue(true);
const fetchMock = jest.fn().mockResolvedValue({ ok: true });

Object.defineProperty(window.navigator, "sendBeacon", {
  configurable: true,
  value: sendBeaconMock,
});

global.fetch = fetchMock as typeof fetch;

import { TrackedBridgeButton, TrackedBridgeLink } from "../TrackedBridgeLinks";

beforeEach(() => {
  sendBeaconMock.mockClear();
  fetchMock.mockClear();
});

describe("TrackedBridgeLink", () => {
  it("sends a click beacon with the track id", () => {
    render(
      <TrackedBridgeLink href="/public-sector" trackId="bridge-public-sector">
        Public Sector
      </TrackedBridgeLink>,
    );

    fireEvent.click(screen.getByRole("link"));

    expect(sendBeaconMock).toHaveBeenCalledWith(
      "/api/analytics/collect",
      expect.any(Blob),
    );
  });
});

describe("TrackedBridgeButton", () => {
  it("renders an outline button link and sends analytics", () => {
    render(
      <TrackedBridgeButton
        href="/contact"
        trackId="bridge-contact"
        variant="outline"
      >
        Contact
      </TrackedBridgeButton>,
    );

    fireEvent.click(screen.getByRole("link", { name: "Contact" }));

    expect(sendBeaconMock).toHaveBeenCalledTimes(1);
  });
});
