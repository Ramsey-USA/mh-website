/** @jest-environment jsdom */
import { render, screen } from "@testing-library/react";

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
  it("renders the Privacy Policy heading", () => {
    render(<PrivacyPolicyPage />);
    expect(
      screen.getByRole("heading", { name: /Privacy Policy/i }),
    ).toBeInTheDocument();
  });

  it("renders contact information", () => {
    render(<PrivacyPolicyPage />);
    expect(screen.getByText("office@mhc-gc.com")).toBeInTheDocument();
  });

  it("renders back-to-home link", () => {
    render(<PrivacyPolicyPage />);
    const link = screen.getByRole("link", { name: /back to home/i });
    expect(link).toHaveAttribute("href", "/");
  });
});
