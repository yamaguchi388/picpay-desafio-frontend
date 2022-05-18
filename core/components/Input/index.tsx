import { forwardRef, InputHTMLAttributes } from "react";
import { Container, StyledInput } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <Container>
      <StyledInput {...props} ref={ref} />
    </Container>
  );
});
Input.displayName = Input.name;
