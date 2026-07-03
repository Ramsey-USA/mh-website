/** @jest-environment jsdom */
import { render, screen } from "@testing-library/react";

jest.mock("@/lib/i18n/locale.server", () => ({
  getServerLocale: jest.fn(async () => "en"),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

jest.mock("@/components/analytics", () => ({
  PageTrackingClient: () => null,
}));

jest.mock("@/components/seo/SeoMeta", () => ({
  StructuredData: () => null,
}));

jest.mock("@/lib/seo/breadcrumb-schema", () => ({
  generateBreadcrumbSchema: jest.fn(() => ({})),
  breadcrumbPatterns: { privacy: {} },
}));

jest.mock("@/lib/constants/company", () => ({
  COMPANY_INFO: {
    address: {
      street: "3111 N Capitol Ave",
      cityStateZip: "Pasco, WA 99301",
    },
    phone: { tel: "+15093086489", display: "(509) 308-6489" },
    email: { main: "office@mhc-gc.com" },
  },
}));

import PrivacyPolicyPage from "../page";

describe("PrivacyPolicyPage", () => {
  it("renders the Privacy Policy heading", async () => {
    render(await PrivacyPolicyPage());
    const headings = screen.getAllByRole("heading", {
      name: /Privacy Policy/i,
    });
    expect(headings.length).toBeGreaterThan(0);
  });

  it("renders contact information", async () => {
    render(await PrivacyPolicyPage());
    expect(screen.getByText("office@mhc-gc.com")).toBeInTheDocument();
  });

  it("renders back-to-home link", async () => {
    render(await PrivacyPolicyPage());
    const link = screen.getByRole("link", { name: /back to home/i });
    expect(link).toHaveAttribute("href", "/");
  });
});
