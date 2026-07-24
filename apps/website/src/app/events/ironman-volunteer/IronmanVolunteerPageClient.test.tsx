/**
 * @jest-environment jsdom
 */

import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { IronmanVolunteerPageClient } from "./IronmanVolunteerPageClient";

const trackClickMock = jest.fn();

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

jest.mock("@/components/navigation/Breadcrumb", () => ({
  Breadcrumb: () => <nav aria-label="Breadcrumb" />,
}));

jest.mock("@/lib/analytics/tracking", () => ({
  trackClick: (...args: unknown[]) => trackClickMock(...args),
}));

describe("IronmanVolunteerPageClient analytics", () => {
  beforeEach(() => {
    trackClickMock.mockReset();
  });

  it("tracks official IRONMAN volunteer outbound CTA clicks", () => {
    render(<IronmanVolunteerPageClient isEs={false} />);

    fireEvent.click(screen.getByText("Volunteer on IRONMAN"));

    expect(trackClickMock).toHaveBeenCalledWith(
      "events-ironman-volunteer-official-signup",
      expect.objectContaining({
        event_category: "events",
        section: "hero",
        action: "open_official_signup",
      }),
    );
  });

  it("tracks local chamber directory outbound CTA clicks", () => {
    render(<IronmanVolunteerPageClient isEs={false} />);

    fireEvent.click(screen.getByText("Local Chamber Directory"));

    expect(trackClickMock).toHaveBeenCalledWith(
      "events-ironman-volunteer-chamber-directory",
      expect.objectContaining({
        event_category: "events",
        section: "partnerships",
        action: "open_chamber_directory",
      }),
    );
  });
});
