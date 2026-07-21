/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen } from "@testing-library/react";
import {
  TrackedEmailLink,
  TrackedPhoneLink,
} from "@/lib/analytics/components/TrackedContactLinks";

const trackClickMock = jest.fn();

jest.mock("@/lib/analytics/hooks", () => ({
  useClickTracking: () => trackClickMock,
}));

describe("TrackedContactLinks", () => {
  beforeEach(() => {
    trackClickMock.mockClear();
  });

  it("tracks phone clicks without sending phone value", () => {
    render(<TrackedPhoneLink>Call</TrackedPhoneLink>);

    fireEvent.click(screen.getByRole("link", { name: /call us/i }));

    expect(trackClickMock).toHaveBeenCalledWith(
      "phone-click",
      expect.objectContaining({
        contactType: "phone",
      }),
    );

    const payload = trackClickMock.mock.calls[0]?.[1] as
      Record<string, unknown> | undefined;
    expect(payload).toBeDefined();
    expect(payload).not.toHaveProperty("phoneNumber");
  });

  it("tracks email clicks without sending email value", () => {
    render(<TrackedEmailLink>Email</TrackedEmailLink>);

    fireEvent.click(screen.getByRole("link", { name: /email us/i }));

    expect(trackClickMock).toHaveBeenCalledWith(
      "email-click",
      expect.objectContaining({
        contactType: "email",
      }),
    );

    const payload = trackClickMock.mock.calls[0]?.[1] as
      Record<string, unknown> | undefined;
    expect(payload).toBeDefined();
    expect(payload).not.toHaveProperty("emailAddress");
  });
});
