/**
 * Tests for app/resources/safety-manual/page.tsx
 *
 * The component is a simple redirect — just verifies it calls redirect("/safety").
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
  it("redirects to /safety", () => {
    expect(() => SafetyManualPage()).toThrow("NEXT_REDIRECT:/safety");
    expect(mockRedirect).toHaveBeenCalledWith("/safety");
  });
});
