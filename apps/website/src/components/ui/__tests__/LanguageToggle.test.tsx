/** @jest-environment jsdom */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LanguageToggle } from "../LanguageToggle";

const mockRefresh = jest.fn();
const mockReplace = jest.fn();
const mockUsePathname = jest.fn();
const mockUseSearchParams = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
    refresh: mockRefresh,
  }),
  usePathname: () => mockUsePathname(),
  useSearchParams: () => mockUseSearchParams(),
}));

describe("LanguageToggle", () => {
  beforeEach(() => {
    mockRefresh.mockClear();
    mockReplace.mockClear();
    mockUsePathname.mockReturnValue("/contact");
    mockUseSearchParams.mockReturnValue(new URLSearchParams());
    document.cookie = "locale=en; path=/";
    document.documentElement.lang = "en";
  });

  it("uses the locale cookie on mount", () => {
    document.cookie = "locale=es; path=/";

    render(<LanguageToggle />);

    const enButton = screen.getByRole("button", { name: "EN" });
    const esButton = screen.getByRole("button", { name: "ES" });

    expect(enButton).toHaveAttribute("aria-pressed", "false");
    expect(esButton).toHaveAttribute("aria-pressed", "true");
  });

  it("switches locale, updates html lang, and refreshes router", async () => {
    const user = userEvent.setup();

    render(<LanguageToggle />);

    await user.click(screen.getByRole("button", { name: "ES" }));

    expect(document.documentElement.lang).toBe("es");
    expect(document.cookie).toContain("locale=es");
    expect(mockReplace).toHaveBeenCalledWith("/contact");
    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });

  it("normalizes locale-prefixed paths before navigation", async () => {
    const user = userEvent.setup();
    mockUsePathname.mockReturnValue("/es/services");
    mockUseSearchParams.mockReturnValue(new URLSearchParams("source=header"));
    document.cookie = "locale=es; path=/";
    document.documentElement.lang = "es";

    render(<LanguageToggle />);

    await user.click(screen.getByRole("button", { name: "EN" }));

    expect(mockReplace).toHaveBeenCalledWith("/services?source=header");
    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });
});
