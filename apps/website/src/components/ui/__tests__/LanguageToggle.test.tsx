/** @jest-environment jsdom */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LanguageToggle } from "../LanguageToggle";

const mockRefresh = jest.fn();
const mockReplace = jest.fn();
const mockUsePathname = jest.fn();
const mockUseSearchParams = jest.fn();
const mockUseLocale = jest.fn();

jest.mock("next/navigation", () => ({
  useSearchParams: () => mockUseSearchParams(),
}));

jest.mock("next-intl", () => ({
  useLocale: () => mockUseLocale(),
}));

jest.mock("@/i18n/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
    refresh: mockRefresh,
  }),
  usePathname: () => mockUsePathname(),
}));

describe("LanguageToggle", () => {
  beforeEach(() => {
    mockRefresh.mockClear();
    mockReplace.mockClear();
    mockUsePathname.mockReturnValue("/contact");
    mockUseSearchParams.mockReturnValue(new URLSearchParams());
    mockUseLocale.mockReturnValue("en");
    document.cookie = "locale=en; path=/";
    document.documentElement.lang = "en";
  });

  it("uses next-intl locale state for active language button", () => {
    mockUseLocale.mockReturnValue("es");

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
    expect(mockReplace).toHaveBeenCalledWith("/contact", { locale: "es" });
    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });

  it("keeps logical pathname and query string when switching locale", async () => {
    const user = userEvent.setup();
    mockUsePathname.mockReturnValue("/services");
    mockUseSearchParams.mockReturnValue(new URLSearchParams("source=header"));
    mockUseLocale.mockReturnValue("es");
    document.cookie = "locale=es; path=/";
    document.documentElement.lang = "es";

    render(<LanguageToggle />);

    await user.click(screen.getByRole("button", { name: "EN" }));

    expect(mockReplace).toHaveBeenCalledWith("/services?source=header", {
      locale: "en",
    });
    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });
});
