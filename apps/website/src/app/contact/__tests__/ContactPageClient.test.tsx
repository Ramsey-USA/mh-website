import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactPageClient from "../ContactPageClient";

jest.mock("next/dynamic", () => () => () => null);

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
    ...rest
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

jest.mock("@/components/analytics", () => ({
  PageTrackingClient: () => null,
}));

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

jest.mock("@/components/ui/backgrounds", () => ({
  DiagonalStripePattern: () => null,
  BrandColorBlobs: () => null,
}));

jest.mock("@/components/navigation/PageNavigation", () => ({
  PageNavigation: () => null,
}));

jest.mock("@/components/navigation/Breadcrumb", () => ({
  Breadcrumb: () => null,
}));

jest.mock("@/components/navigation/navigationConfigs", () => ({
  navigationConfigs: { contact: [] },
}));

jest.mock("@/components/pwa", () => ({
  PWAOnly: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock("@/components/ui", () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock("@/lib/pwa/offline-queue", () => ({
  saveOfflineSubmission: jest.fn(async () => undefined),
}));

describe("ContactPageClient", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window.navigator, "onLine", {
      configurable: true,
      value: true,
    });
    global.fetch = jest.fn(async () => ({ ok: true })) as jest.Mock;
  });

  function fillRequiredFields() {
    const user = userEvent.setup();

    fireEvent.change(
      screen.getByLabelText(/contact\.form\.fields\.contactName/),
      { target: { value: "Alex Rivera" } },
    );
    fireEvent.change(screen.getByLabelText(/contact\.form\.fields\.email/), {
      target: { value: "alex@example.com" },
    });
    fireEvent.change(
      screen.getByLabelText(/contact\.form\.fields\.projectType/),
      { target: { value: "commercial-construction" } },
    );
    fireEvent.change(
      screen.getByLabelText(/contact\.form\.fields\.projectLocation/),
      { target: { value: "Pasco, WA" } },
    );
    fireEvent.change(
      screen.getByLabelText(/contact\.form\.fields\.timingRange/),
      { target: { value: "1-3-months" } },
    );
    fireEvent.change(
      screen.getByLabelText(/contact\.form\.fields\.preferredResponse/),
      { target: { value: "email" } },
    );
    fireEvent.change(
      screen.getByLabelText(/contact\.form\.fields\.scopeSummary/),
      {
        target: {
          value: "Tenant improvement project for a retail space.",
        },
      },
    );

    return user;
  }

  it("routes users to dedicated pathways", () => {
    render(<ContactPageClient enableTelemetry={false} />);

    expect(
      screen.getByRole("link", { name: "contact.routing.projectRoute" }),
    ).toHaveAttribute("href", "#project-inquiry-form");
    expect(
      screen.getByRole("link", { name: "contact.routing.publicSectorRoute" }),
    ).toHaveAttribute("href", "/public-sector");
    expect(
      screen.getByRole("link", { name: "contact.routing.alliesRoute" }),
    ).toHaveAttribute("href", "/allies");
    expect(
      screen.getByRole("link", { name: "contact.routing.careersRoute" }),
    ).toHaveAttribute("href", "/careers");
    expect(
      screen.getByRole("link", { name: "contact.routing.safetyRoute" }),
    ).toHaveAttribute("href", "/safety");
  });

  it("shows required field errors with accessible associations", async () => {
    const user = userEvent.setup();
    render(<ContactPageClient enableTelemetry={false} />);

    await user.click(
      screen.getByRole("button", { name: "contact.form.submit" }),
    );

    await waitFor(() => {
      expect(
        screen.getAllByText("contact.form.errors.summary").length,
      ).toBeGreaterThan(0);
    });

    const contactNameInput = screen.getByLabelText(
      /contact\.form\.fields\.contactName/,
    );
    expect(contactNameInput).toHaveAttribute("aria-invalid", "true");
    expect(contactNameInput).toHaveAttribute(
      "aria-describedby",
      "contactName-error",
    );
    expect(screen.getByText("contact.form.errors.contactName")).toHaveAttribute(
      "id",
      "contactName-error",
    );
  });

  it("shows API failure feedback and prevents duplicate submits", async () => {
    let fetchResolver: ((value: { ok: boolean }) => void) | undefined;
    (global.fetch as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) => {
          fetchResolver = resolve as (value: { ok: boolean }) => void;
        }),
    );

    render(<ContactPageClient enableTelemetry={false} />);
    const user = fillRequiredFields();
    const submitButton = screen.getByRole("button", {
      name: "contact.form.submit",
    });

    await user.dblClick(submitButton);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(submitButton).toBeDisabled();

    if (fetchResolver) {
      fetchResolver({ ok: false });
    }

    await waitFor(() => {
      expect(
        screen.getAllByText("contact.form.errors.submitFailed").length,
      ).toBeGreaterThan(0);
    });
  });

  it("submits only expected inquiry fields to /api/contact", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: true });

    render(<ContactPageClient enableTelemetry={false} />);
    const user = fillRequiredFields();

    await user.click(
      screen.getByRole("button", { name: "contact.form.submit" }),
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    const [url, request] = (global.fetch as jest.Mock).mock.calls[0] as [
      string,
      { body?: string },
    ];

    expect(url).toBe("/api/contact");
    const parsed = JSON.parse(request.body ?? "{}");

    expect(parsed).toEqual(
      expect.objectContaining({
        name: "Alex Rivera",
        email: "alex@example.com",
        message: "Tenant improvement project for a retail space.",
        subject: "contact.form.subjectLine",
        type: "contact",
      }),
    );

    expect(parsed).not.toHaveProperty("ssn");
    expect(parsed).not.toHaveProperty("password");
    expect(parsed).not.toHaveProperty("dob");
  });
});
