import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Navigation } from "../Navigation";
import Footer from "../Footer";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => (
    <a href={typeof href === "string" ? href : "/"} {...props}>
      {children}
    </a>
  ),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src, ...props }: any) => {
    const { fill, priority, ...imgProps } = props;
    return <img alt={alt} src={src} {...imgProps} />;
  },
}));

jest.mock("@/components/ui/layout/ThemeToggle", () => ({
  ThemeToggle: ({ className }: any) => (
    <button
      type="button"
      aria-label="Switch to light mode"
      className={className}
    >
      Theme toggle
    </button>
  ),
}));

jest.mock("@/components/ui/LanguageToggle", () => ({
  LanguageToggle: ({ className }: any) => (
    <div className={className} aria-label="Language selector">
      <button type="button">EN</button>
      <button type="button">ES</button>
    </div>
  ),
}));

jest.mock("@/hooks/useLocale", () => ({
  useLocale: () => "en",
}));

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

jest.mock("@/components/analytics/TrackedContactLinks", () => ({
  TrackedPhoneLink: ({ children, ...props }: any) => (
    <a href="tel:+15093086489" {...props}>
      {children}
    </a>
  ),
  TrackedEmailLink: ({ children, ...props }: any) => (
    <a href="mailto:office@mhc-gc.com" {...props}>
      {children}
    </a>
  ),
  TrackedLocationLink: ({ children, ...props }: any) => (
    <a href="https://www.google.com/maps/search/?api=1" {...props}>
      {children}
    </a>
  ),
}));

jest.mock("@/components/ui/modals/AdminSignInModal", () => ({
  AdminSignInModal: () => null,
}));

describe("Navigation and Footer link contract", () => {
  it("keeps all key internal links wired for navbar, hamburger menu, and footer", async () => {
    const user = userEvent.setup();

    const { container } = render(
      <>
        <Navigation />
        <Footer />
      </>,
    );

    await user.click(screen.getByRole("button", { name: /open menu/i }));

    const hrefs = new Set(
      Array.from(container.querySelectorAll("a"))
        .map((link) => link.getAttribute("href"))
        .filter((href): href is string => Boolean(href)),
    );

    const expectedInternalLinks = [
      "/",
      "/about",
      "/projects",
      "/events",
      "/team",
      "/jeremy-thamert",
      "/testimonials",
      "/careers",
      "/contact",
      "/public-sector",
      "/allies",
      "/veterans",
      "/resources",
      "/faq",
      "/safety",
      "/hub",
      "/services",
      "/privacy",
      "/terms",
      "/accessibility",
      "/sitemap.xml",
      "/careers?apply=true&entryPoint=Footer%20Application",
    ];

    expectedInternalLinks.forEach((href) => {
      expect(hrefs.has(href)).toBe(true);
    });

    // Dual terminology presentation: original name on primary line, MH term on secondary line.
    expect(
      screen.getAllByRole("link", { name: /about us/i }).length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByText("Our Mission").length).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("link", { name: /home/i }).length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByText("Command Center").length).toBeGreaterThan(0);
  });
});
