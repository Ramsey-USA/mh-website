/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react";
import { SkillRatingInput } from "../SkillRatingInput";

jest.mock("@/components/ui/forms/DashboardFormField", () => ({
  DASHBOARD_LABEL_CLASS: "label",
  DASHBOARD_INPUT_CLASS: "input",
}));

describe("SkillRatingInput", () => {
  it("renders both range and number inputs with the given value", () => {
    render(
      <SkillRatingInput label="Leadership" value="65" onChange={() => {}} />,
    );

    const range = screen.getByLabelText(/Leadership skill rating/i);
    const number = screen.getByLabelText(/Leadership skill number input/i);

    expect(range).toHaveAttribute("type", "range");
    expect(range).toHaveValue("65");
    expect(number).toHaveAttribute("type", "number");
    expect(number).toHaveValue(65);
  });

  it("displays the label and the current value badge", () => {
    render(<SkillRatingInput label="Safety" value="80" onChange={() => {}} />);

    expect(screen.getByText("Safety")).toBeInTheDocument();
    expect(screen.getByText("80")).toBeInTheDocument();
  });

  it("propagates changes from the range slider", () => {
    const onChange = jest.fn();
    render(
      <SkillRatingInput label="Teamwork" value="50" onChange={onChange} />,
    );

    fireEvent.change(screen.getByLabelText(/Teamwork skill rating/i), {
      target: { value: "72" },
    });
    expect(onChange).toHaveBeenCalledWith("72");
  });

  it("propagates changes from the number input", () => {
    const onChange = jest.fn();
    render(
      <SkillRatingInput label="Innovation" value="40" onChange={onChange} />,
    );

    fireEvent.change(screen.getByLabelText(/Innovation skill number input/i), {
      target: { value: "55" },
    });
    expect(onChange).toHaveBeenCalledWith("55");
  });
});
