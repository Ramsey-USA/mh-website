import { render, screen } from "@testing-library/react";
import { Alert, AlertTitle, AlertDescription } from "../alert";

describe("Alert components", () => {
  it("renders Alert with default variant", () => {
    render(<Alert>Something happened</Alert>);
    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent("Something happened");
  });

  it("renders Alert with destructive variant", () => {
    render(<Alert variant="destructive">Danger!</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("applies custom className to Alert", () => {
    render(
      <Alert className="my-alert" data-testid="a">
        msg
      </Alert>,
    );
    expect(screen.getByTestId("a")).toHaveClass("my-alert");
  });

  it("Alert forwards ref", () => {
    const ref = { current: null } as unknown as React.RefObject<HTMLDivElement>;
    render(<Alert ref={ref}>text</Alert>);
    expect(ref.current).not.toBeNull();
  });

  it("renders AlertTitle", () => {
    render(<AlertTitle>Warning</AlertTitle>);
    expect(screen.getByText("Warning")).toBeInTheDocument();
  });

  it("renders AlertDescription", () => {
    render(<AlertDescription>Please check your input.</AlertDescription>);
    expect(screen.getByText("Please check your input.")).toBeInTheDocument();
  });

  it("renders full Alert composition", () => {
    render(
      <Alert variant="destructive">
        <AlertTitle>Submission failed</AlertTitle>
        <AlertDescription>Please try again.</AlertDescription>
      </Alert>,
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Submission failed")).toBeInTheDocument();
    expect(screen.getByText("Please try again.")).toBeInTheDocument();
  });
});
