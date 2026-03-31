import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../card";

describe("Card components", () => {
  it("renders Card with children", () => {
    render(<Card data-testid="card">content</Card>);
    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("Card applies custom className", () => {
    render(<Card data-testid="card" className="custom-class" />);
    expect(screen.getByTestId("card")).toHaveClass("custom-class");
  });

  it("Card forwards ref", () => {
    const ref = { current: null } as unknown as React.RefObject<HTMLDivElement>;
    render(<Card ref={ref} data-testid="card" />);
    expect(ref.current).not.toBeNull();
  });

  it("renders CardHeader with children", () => {
    render(<CardHeader data-testid="hdr">header content</CardHeader>);
    expect(screen.getByTestId("hdr")).toBeInTheDocument();
  });

  it("renders CardTitle with children", () => {
    render(<CardTitle>My Title</CardTitle>);
    expect(screen.getByText("My Title")).toBeInTheDocument();
  });

  it("renders CardDescription with children", () => {
    render(<CardDescription>A description</CardDescription>);
    expect(screen.getByText("A description")).toBeInTheDocument();
  });

  it("renders CardContent with children", () => {
    render(<CardContent data-testid="content">body</CardContent>);
    expect(screen.getByTestId("content")).toBeInTheDocument();
  });

  it("renders CardFooter with children", () => {
    render(<CardFooter data-testid="footer">footer</CardFooter>);
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("renders a full card composition", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Project Alpha</CardTitle>
          <CardDescription>Commercial build</CardDescription>
        </CardHeader>
        <CardContent>Details here</CardContent>
        <CardFooter>Actions</CardFooter>
      </Card>,
    );
    expect(screen.getByText("Project Alpha")).toBeInTheDocument();
    expect(screen.getByText("Commercial build")).toBeInTheDocument();
    expect(screen.getByText("Details here")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });
});
