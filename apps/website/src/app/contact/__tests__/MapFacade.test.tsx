import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MapFacade } from "../MapFacade";

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

describe("MapFacade", () => {
  it("renders map placeholder before interaction", () => {
    render(<MapFacade />);

    expect(
      screen.getByRole("button", {
        name: /load interactive map for mh construction office location/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/click to load map/i)).toBeInTheDocument();
    expect(
      screen.queryByTitle(/mh construction office location/i),
    ).not.toBeInTheDocument();
  });

  it("loads iframe map after click", async () => {
    const user = userEvent.setup();
    render(<MapFacade />);

    await user.click(
      screen.getByRole("button", {
        name: /load interactive map for mh construction office location/i,
      }),
    );

    const map = screen.getByTitle(
      /mh construction office location - 3111 n capitol ave, pasco, wa 99301/i,
    );
    expect(map).toHaveAttribute(
      "src",
      expect.stringContaining(
        "https://maps.google.com/maps?q=3111+N+Capitol+Ave,+Pasco,+WA+99301",
      ),
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
