import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { JobApplicationModal } from "../JobApplicationModal";

describe("JobApplicationModal", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  it("shows veteran application context and preselects veteran status", () => {
    render(
      <JobApplicationModal
        isOpen
        onClose={jest.fn()}
        entryPoint="Veteran Application"
      />,
    );

    expect(screen.getByText("Veteran Application")).toBeInTheDocument();
    expect(screen.getByText("Start Your Application")).toBeInTheDocument();
    expect(screen.getByLabelText(/Veteran Status/i)).toHaveValue("veteran");
  });

  it("submits the streamlined form without requiring a resume upload", async () => {
    const user = userEvent.setup();
    const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);

    render(
      <JobApplicationModal
        isOpen
        onClose={jest.fn()}
        entryPoint="General Application"
      />,
    );

    await user.type(screen.getByLabelText(/First Name/i), "Jordan");
    await user.type(screen.getByLabelText(/Last Name/i), "Lee");
    await user.type(
      screen.getByLabelText(/Email Address/i),
      "jordan@example.com",
    );
    await user.selectOptions(
      screen.getByLabelText(/Position of Interest/i),
      "Project Manager",
    );

    await user.click(screen.getByRole("button", { name: /Send Application/i }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    expect(mockFetch).toHaveBeenCalledWith(
      "/api/job-applications",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }),
    );

    const requestBody = JSON.parse(
      (mockFetch.mock.calls[0]?.[1] as RequestInit).body as string,
    );

    expect(requestBody).toMatchObject({
      firstName: "Jordan",
      lastName: "Lee",
      email: "jordan@example.com",
      position: "Project Manager",
      resumeUrl: "",
      resumeKey: "",
    });

    expect(screen.getByText("Application Received")).toBeInTheDocument();
  });

  it("calls onClose when escape is pressed", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(
      <JobApplicationModal
        isOpen
        onClose={onClose}
        entryPoint="General Inquiry"
      />,
    );

    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("resets entered data when the modal is reopened with a different entry point", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    const { rerender } = render(
      <JobApplicationModal
        isOpen
        onClose={onClose}
        entryPoint="General Inquiry"
      />,
    );

    await user.type(screen.getByLabelText(/First Name/i), "Alex");
    expect(screen.getByLabelText(/First Name/i)).toHaveValue("Alex");

    rerender(
      <JobApplicationModal
        isOpen={false}
        onClose={onClose}
        entryPoint="General Inquiry"
      />,
    );

    rerender(
      <JobApplicationModal
        isOpen
        onClose={onClose}
        entryPoint="Veteran Application"
      />,
    );

    expect(screen.getByLabelText(/First Name/i)).toHaveValue("");
    expect(screen.getByLabelText(/Veteran Status/i)).toHaveValue("veteran");
    expect(screen.getByText("Veteran Application")).toBeInTheDocument();
  });
});
