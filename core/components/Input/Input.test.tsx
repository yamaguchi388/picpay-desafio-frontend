import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from ".";

describe("<Input />", () => {
  it("should correctly render", () => {
    render(
      <Input
        placeholder="test-input"
        id="test-input"
        name="test-input"
        label="test-input"
      />
    );

    const input = screen.getByLabelText("test-input");

    expect(input).toBeInTheDocument();
  });

  it("should correctly render with change", async () => {
    render(
      <Input
        placeholder="test-input"
        id="test-input"
        name="test-input"
        label="test-input"
      />
    );

    const input = screen.getByLabelText("test-input");

    await userEvent.type(input, "test-unit");

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("test-unit");
  });

  it("should correctly render with type password", async () => {
    render(
      <Input
        placeholder="test-input-password"
        id="test-input-password"
        name="test-input-password"
        label="test-input"
        type="password"
      />
    );

    const input = screen.getByLabelText("test-input");

    await userEvent.type(input, "test-unit-password");

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("test-unit-password");
  });
});
