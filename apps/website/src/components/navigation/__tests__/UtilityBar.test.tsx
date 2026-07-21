import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { UtilityBar } from "../UtilityBar";

jest.mock("@/i18n/navigation", () => ({
  __esModule: true,
  Link: ({ children, href, ...props }: any) => (
    <a href={typeof href === "string" ? href : "/"} {...props}>
      {children}
    </a>
  ),
}));

jest.mock("../LocaleSwitcher", () => ({
  LocaleSwitcher: () => <div>Locale Switcher</div>,
}));

jest.mock("@/components/ui/layout/ThemeToggle", () => ({
  ThemeToggle: () => <button type="button">Theme</button>,
}));

describe("UtilityBar", () => {
  it("renders core utility links and controls", () => {
    render(
      <UtilityBar
        labels={{
          utilityLabel: "Utility links",
          callLabel: "Call",
          locationLabel: "Serving",
          contactLinkLabel: "Contact",
          currentLanguageLabel: "Language",
          switcherLabel: "Switch language",
          english: "English",
          spanish: "Español",
        }}
      />,
    );

    expect(
      screen.getByRole("navigation", { name: "Utility links" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Call/i })).toHaveAttribute(
      "href",
      expect.stringMatching(/^tel:/),
    );
    expect(screen.getByText(/Serving/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "/contact",
    );
    expect(screen.getByText("Locale Switcher")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Theme" })).toBeInTheDocument();
  });
});
