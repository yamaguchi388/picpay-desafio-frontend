import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from ".";

describe("<Button />", () => {
  it("should correctly render", () => {
    render(<Button />);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
  });

  it("should correctly render with onClick", async () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick} />);

    const button = screen.getByRole("button");

    await userEvent.click(button);

    expect(handleClick).toBeCalled();
  });

  it("should correctly render with type submit", async () => {
    render(<Button type="submit" />);

    const button = screen.getByRole("button");

    expect(button).toHaveProperty("type", "submit");
  });

  it("should correctly render with type reset", async () => {
    render(<Button type="reset" />);

    const button = screen.getByRole("button");

    expect(button).toHaveProperty("type", "reset");
  });

  it("should correctly render with type button", async () => {
    render(<Button type="button" />);

    const button = screen.getByRole("button");

    expect(button).toHaveProperty("type", "button");
  });
});
