/**
 * Tests for app/resources/safety-manual/page.tsx
 *
 * The component is a simple redirect — verifies it sends users to the public
 * Table of Contents page (which is the new public entry point for the manual).
 */

const mockRedirect = jest.fn();
jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  redirect: (path: string) => {
    mockRedirect(path);
    // next/navigation redirect throws internally; simulate that
    throw new Error(`NEXT_REDIRECT:${path}`);
  },
}));

import SafetyManualPage from "../page";

describe("SafetyManualPage", () => {
  it("redirects to the Table of Contents", () => {
    expect(() => SafetyManualPage()).toThrow(
      "NEXT_REDIRECT:/resources/safety-manual/contents",
    );
    expect(mockRedirect).toHaveBeenCalledWith(
      "/resources/safety-manual/contents",
    );
  });
});
