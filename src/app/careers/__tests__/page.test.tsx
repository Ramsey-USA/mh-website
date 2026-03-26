import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CareersPage from "../page";

const replaceMock = jest.fn();
let mockSearchParams = new URLSearchParams();

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

jest.mock("next/dynamic", () => () => {
  return function MockDynamicComponent() {
    return null;
  };
});

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: replaceMock,
  }),
  useSearchParams: () => mockSearchParams,
}));

jest.mock("@/lib/analytics/hooks", () => ({
  usePageTracking: jest.fn(),
}));

jest.mock("@/components/ui", () => ({
  Button: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  ),
  JobApplicationModal: ({
    isOpen,
    entryPoint,
  }: {
    isOpen: boolean;
    entryPoint?: string;
  }) => (isOpen ? <div>Modal entry: {entryPoint ?? "none"}</div> : null),
  AlternatingShowcase: () => null,
}));

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

jest.mock("@/components/animations/FramerMotionComponents", () => ({
  FadeInWhenVisible: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  StaggeredFadeIn: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

jest.mock("@/components/navigation/PageNavigation", () => ({
  PageNavigation: () => null,
}));

jest.mock("@/components/navigation/Breadcrumb", () => ({
  Breadcrumb: () => null,
}));

jest.mock("@/components/navigation/navigationConfigs", () => ({
  navigationConfigs: { careers: [] },
}));

jest.mock("@/components/ui/backgrounds", () => ({
  DiagonalStripePattern: () => null,
  BrandColorBlobs: () => null,
}));

jest.mock("@/lib/data/testimonials", () => ({
  getEmployeeTestimonials: () => [],
}));

jest.mock("@/lib/data/careers", () => ({
  companyBenefits: [],
  veteranBenefits: [],
  cultureValues: [],
}));

jest.mock("@/lib/constants/company", () => ({
  COMPANY_INFO: {
    email: { main: "office@mhc-gc.com" },
    phone: { display: "(509) 308-6489", tel: "+15093086489" },
  },
}));

jest.mock("@/components/seo/SeoMeta", () => ({
  StructuredData: () => null,
}));

jest.mock("@/lib/seo/page-seo-utils", () => ({
  getCareersSEO: () => ({}),
}));

jest.mock("@/components/ui/SimpleSkeleton", () => ({
  SimpleSkeleton: () => null,
}));

jest.mock("@/lib/seo/breadcrumb-schema", () => ({
  generateBreadcrumbSchema: () => ({}),
  breadcrumbPatterns: { careers: {} },
}));

describe("CareersPage application CTAs", () => {
  beforeEach(() => {
    mockSearchParams = new URLSearchParams();
    replaceMock.mockClear();
  });

  it("opens the modal with veteran application context", async () => {
    const user = userEvent.setup();

    render(<CareersPage />);

    await user.click(screen.getByRole("button", { name: /Apply as Veteran/i }));

    expect(
      screen.getByText("Modal entry: Veteran Application"),
    ).toBeInTheDocument();
  });

  it("opens the modal with general application context", async () => {
    const user = userEvent.setup();

    render(<CareersPage />);

    await user.click(
      screen.getByRole("button", { name: /Submit Application/i }),
    );

    expect(
      screen.getByText("Modal entry: General Application"),
    ).toBeInTheDocument();
  });

  it("opens the modal with general inquiry context from the primary start button", async () => {
    const user = userEvent.setup();

    render(<CareersPage />);

    await user.click(
      screen.getAllByRole("button", { name: /Start Application/i })[0]!,
    );

    expect(
      screen.getByText("Modal entry: General Inquiry"),
    ).toBeInTheDocument();
  });

  it("opens the modal from the footer deep link query params", async () => {
    mockSearchParams = new URLSearchParams(
      "apply=true&entryPoint=Footer%20Application",
    );

    render(<CareersPage />);

    expect(
      await screen.findByText("Modal entry: Footer Application"),
    ).toBeInTheDocument();
  });
});
