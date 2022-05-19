import { ReactElement } from "react";
import { Container } from "./styles";
import { IButtonProps } from "./types";

export const Button = ({
  type,
  children,
  onClick,
}: IButtonProps): ReactElement => {
  return (
    <Container type={type} onClick={onClick}>
      {children}
    </Container>
  );
};
