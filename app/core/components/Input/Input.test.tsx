import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from ".";
import { useForm } from "react-hook-form";

const CustomInput = () => {
  const { control } = useForm();
  return (
    <Input
      control={control}
      placeholder="test-input"
      id="test-input"
      name="test-input"
      label="test-input"
    />
  );
};
describe("<Input />", () => {
  beforeEach(() => {
    render(<CustomInput />);
  });
  it("should correctly render", () => {
    const input = screen.getByLabelText("test-input");

    expect(input).toBeInTheDocument();
  });

  it("should correctly render with change", async () => {
    const input = screen.getByLabelText("test-input");

    await userEvent.type(input, "test-unit");

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("test-unit");
  });

  it("should correctly render with type password", async () => {
    const input = screen.getByLabelText("test-input");

    await userEvent.type(input, "test-unit-password");

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("test-unit-password");
  });
});
