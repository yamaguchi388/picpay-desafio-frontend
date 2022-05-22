import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from ".";
import { useForm } from "react-hook-form";
import { InputProps } from "./types";
import React from "react";

const CustomInput = (props: Partial<InputProps<unknown>>) => {
  const { control } = useForm();
  return (
    <Input
      control={control}
      placeholder="test-input"
      id="test-input"
      name="test-input"
      label="test-input"
      type={props.type}
      error={props.error}
      helperText={props.helperText}
    />
  );
};

describe("<Input />", () => {
  beforeEach(() => {
    render(<CustomInput />);
  });

  afterEach(() => null);

  it("should correctly render", () => {
    const input = screen.getByRole("textbox");

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  it("should correctly render with change", async () => {
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "test-unit");

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("test-unit");
  });

  it("should correctly render with type password", async () => {
    const { getByRole } = render(<CustomInput type="password" label="senha" />);

    const input = getByRole("textbox");

    await userEvent.type(input, "test-unit-password");

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("test-unit-password");
  });

  it("should correctly render with toggle type", async () => {
    const togglePassword = jest.spyOn(React, "useState");

    const { getByRole } = render(<CustomInput type="password" label="senha" />);

    const input = getByRole("textbox");

    await userEvent.type(input, "test-unit-password");
    await userEvent.click(input);

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("test-unit-password");
    expect(togglePassword).toBeCalled();
  });

  it("should correctly helptext error", () => {
    const { getByRole } = render(
      <CustomInput error={true} helperText="error-test" />
    );

    const helperText = getByRole("alert");

    expect(helperText).toBeInTheDocument();
    expect(helperText).toHaveTextContent("error-test");
  });
});
