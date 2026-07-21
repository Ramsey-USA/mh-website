import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LocaleSwitcher } from "../LocaleSwitcher";

const mockReplace = jest.fn();
const mockRefresh = jest.fn();
const mockPathname = jest.fn(() => "/");
const mockLocale = jest.fn<"en" | "es", []>(() => "en");
const mockSearchParams = jest.fn(() => new URLSearchParams());
const mockSetClientLocale = jest.fn();

jest.mock("next-intl", () => ({
  __esModule: true,
  useLocale: () => mockLocale(),
}));

jest.mock("next/navigation", () => ({
  useSearchParams: () => mockSearchParams(),
}));

jest.mock("@/i18n/navigation", () => ({
  __esModule: true,
  usePathname: () => mockPathname(),
  useRouter: () => ({
    replace: mockReplace,
    refresh: mockRefresh,
  }),
}));

jest.mock("@/lib/i18n/locale", () => ({
  SUPPORTED_LOCALES: ["en", "es"],
  setClientLocale: (next: "en" | "es") => mockSetClientLocale(next),
}));

const labels = {
  currentLanguageLabel: "Language",
  switcherLabel: "Switch language",
  english: "English",
  spanish: "Español",
};

describe("LocaleSwitcher", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPathname.mockReturnValue("/projects");
    mockLocale.mockReturnValue("en");
    mockSearchParams.mockReturnValue(new URLSearchParams("source=nav"));
  });

  it("shows text-based current locale state", () => {
    render(<LocaleSwitcher labels={labels} />);

    expect(screen.getByText("Language: English")).toBeInTheDocument();
    expect(screen.getByText("Language: English")).toHaveAttribute(
      "aria-live",
      "polite",
    );
    expect(screen.getByRole("radio", { name: "English" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(screen.getByRole("radio", { name: "Español" })).toHaveAttribute(
      "aria-checked",
      "false",
    );
  });

  it("preserves route context when translated counterpart exists", async () => {
    const user = userEvent.setup();

    render(<LocaleSwitcher labels={labels} />);

    await user.click(screen.getByRole("radio", { name: "Español" }));

    expect(mockSetClientLocale).toHaveBeenCalledWith("es");
    expect(mockReplace).toHaveBeenCalledWith("/projects?source=nav", {
      locale: "es",
    });
    expect(mockRefresh).toHaveBeenCalled();
  });

  it("falls back to homepage when Spanish counterpart is not approved", async () => {
    const user = userEvent.setup();
    mockPathname.mockReturnValue("/locations");

    render(<LocaleSwitcher labels={labels} />);

    await user.click(screen.getByRole("radio", { name: "Español" }));

    expect(mockReplace).toHaveBeenCalledWith("/?source=nav", { locale: "es" });
  });

  it("supports keyboard activation", () => {
    render(<LocaleSwitcher labels={labels} />);

    fireEvent.keyDown(screen.getByRole("radio", { name: "Español" }), {
      key: "Enter",
    });

    expect(mockReplace).toHaveBeenCalledWith("/projects?source=nav", {
      locale: "es",
    });
  });

  it("supports arrow-key locale changes within the radiogroup", () => {
    render(<LocaleSwitcher labels={labels} />);

    fireEvent.keyDown(screen.getByRole("radio", { name: "English" }), {
      key: "ArrowRight",
    });

    expect(mockSetClientLocale).toHaveBeenCalledWith("es");
    expect(mockReplace).toHaveBeenCalledWith("/projects?source=nav", {
      locale: "es",
    });
  });
});
